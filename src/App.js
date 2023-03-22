import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  // to get the user from the dL
  const user = useSelector(selectUser);

  // throw a login/logout action to the dL
  const dispatch = useDispatch();

  // get the currently signed-in user
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // Signed in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            name: userAuth.displayName,
            photo: userAuth.photoURL,
          })
        );
      } else {
        // User is signed out
        dispatch(logout());
      }
    });
    // return unsubscribe;
  }, [dispatch]);

  // creating the paths
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <HomeScreen /> : <LoginScreen />,
    },
    {
      path: "/profile",
      element: user ? <ProfileScreen /> : <LoginScreen />,
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
