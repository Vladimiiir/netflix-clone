import React, { useEffect, useState } from "react";
import "./PlansScreen.css";
import db from "../firebase";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  // create product state to pull out from firebase db
  const [products, setProducts] = useState();
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  // to get role, current period start, current period end
  useEffect(() => {
    const q = query(collection(db, "customers", user.uid, "subscriptions"));

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_start:
            subscription.data().current_period_start.seconds,
          current_period_end: subscription.data().current_period_end.seconds,
        });
      });
    });
  }, [user.uid]);

  // 1
  useEffect(() => {
    const q = query(collection(db, "products"), where("active", "==", true));

    onSnapshot(q, (querySnapshot) => {
      const products = {};

      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();

        const productDocRef = doc(db, "products", productDoc.id);
        // REFERENCE NA productDoc zde musi byt a tu potom použit v getDoc collection
        const priceSnap = await getDocs(collection(productDocRef, "prices"));

        priceSnap.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id, // price_1MnQDSC718EcoTNcpXH6A5JR
            priceData: price.data(), // all data in field
          };
        });
      });
      setProducts(products);
    });
  }, []);

  // console.log(products);
  // console.log(user);
  console.log(subscription);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin, // go back to original screen if success transaction
        cancel_url: window.location.origin, // go back to original screen if canceled transaction
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        // we have session -> let's redirect to Checkout
        const stripe = await loadStripe(
          "pk_test_51MnOeyC718EcoTNc8560nv9Hb14qt5q4EDb85SXZ25ekPhgmPlun1GVdIFKnoIe7UDfLYGkngOnnobtrybOiPyrk00eixKVT13"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      {subscription && (
        <>
          <h3>
            Plans (Current Plan:{" "}
            {subscription.role.charAt(0).toUpperCase() +
              subscription.role.slice(1)}
            )
          </h3>
          <h5>
            Renewal Date:{" "}
            {new Date(
              subscription?.current_period_end * 1000
            ).toLocaleDateString()}
          </h5>
        </>
      )}
      {products &&
        Object.entries(products).map(([productId, productData]) => {
          // TODO: Add some logic to check if the user's subscription is active
          const isCurrentPackage = productData.name
            ?.toLowerCase()
            .includes(subscription?.role);
          return (
            <div
              key={productId}
              className={`${
                isCurrentPackage && "plansScreen__options--disabled"
              } plansScreen__options`}
            >
              <div className="plansScreen__info">
                <h5>{productData.name}</h5>
                <h6>{productData.description}</h6>
              </div>
              <button
                onClick={() =>
                  !isCurrentPackage && loadCheckout(productData.prices.priceId)
                }
              >
                {isCurrentPackage ? "Current Package" : "Subscribe"}
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default PlansScreen;
