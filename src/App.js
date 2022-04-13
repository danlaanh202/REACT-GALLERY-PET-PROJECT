import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Routes,
} from "react-router-dom";
import { routes } from "./Config/routes";
import { AuthProvider } from "./Context";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            );
          })}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
