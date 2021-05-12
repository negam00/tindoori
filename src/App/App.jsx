import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import { AuthProvider } from "../Auth";
import PrivateRoute from "../PrivateRoute";
import CreateRecipe from "../CreateRecipe/CreateRecipe";
import Registration from "../Registration/Registration";

function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/add-recipe" component={CreateRecipe} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
      </Router>
    </AuthProvider>
  );
}

export default App;
