import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import SlideViewer from "./components/slideViewer/SlideViewer";
import { getLocalUserData ,getLocalToken} from "./LocalStorage/userData";
import StateContext from "./Context/App/StateContext";
import DispatchContext from "./Context/App/DispatchContext";
import { appState, appReducer } from "./Context/App/Store";
import { useImmerReducer } from "use-immer";
import Loader from "./components/loader/Loader";

const loggedInRouter = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/slides",
    element: <SlideViewer />,
  },
]);

const loggedOutRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

function App() {
  const [state, dispatch] = useImmerReducer(appReducer, appState);


  useEffect(() => {
    setTimeout(() => {
      getLocalData();
    }, 1000);
  }, []);


  const getLocalData = async () => {
    // to get user data who already logged in
    let token = await getLocalToken();
    if (token) {
      dispatch({ type: "setToken", value: token });
    } else {
      dispatch({ type: "loading", value: false });
    }
  };

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {state.loading ? (
          <Loader />
        ) : state.token ? (
          <RouterProvider router={loggedInRouter} />
        ) : (
          <RouterProvider router={loggedOutRouter} />
        )}
      </DispatchContext.Provider>
    </StateContext.Provider>

  );
}

export default App;
