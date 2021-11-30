import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Header from "../mainComponents/Header";
import Footer from "../mainComponents/Footer";

import AllUsers from "../pages/allUsers/AllUsers.js";
import Connect from "../pages/connect/Connect.js";
import Forum from "../pages/forum/Forum.js";
import MyProfil from "../pages/myProfil/MyProfil.js";

const Routes = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Connect} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/allusers" component={AllUsers} />
          <Route exact path="/myprofil" component={MyProfil} />
          <Redirect to="/" />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default Routes;

//* En version 6 de react-router-dom, la syntaxe est la suivante :
// Avec appel de Routes à la place de Switch :

/*  <Routes>
      <Route exact path="/" element={<TestOne />} />
      <Route path="/test" element={<TestTwo />} />
      <Route path="/autre" element={<TestThree />} />
    </Routes> */
