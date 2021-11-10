import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/main.css";
import Header from "./react/mainComponents/Header";
import Footer from "./react/mainComponents/Footer";

import RegistredUser from "./react/pageComponents/homePage/RegistredUser";
import NewUser from "./react/pageComponents/homePage/NewUser";
import Forum from "./react/pageComponents/forumPage/Forum";
import InstantCom from "./react/pageComponents/forumPage/InstantCom";
import Organization from "./react/pageComponents/organizationPage/Organization";
import ShowProfile from "./react/pageComponents/organizationPage/ShowProfile";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={RegistredUser} />
          <Route path="/newuser" component={NewUser} />
          <Route path="/forum">
            <Forum />
            <InstantCom />
          </Route>
          <Route exact path="/organization">
            <Organization />
          </Route>
          <Route path="/organization/:id">
            <Organization />
            <ShowProfile />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

//* En version 6 de react-router-dom, la syntaxe est la suivante :
// Avec appel de Routes à la place de Switch :

/*  <Routes>
      <Route exact path="/" element={<TestOne />} />
      <Route path="/test" element={<TestTwo />} />
      <Route path="/autre" element={<TestThree />} />
    </Routes> */
