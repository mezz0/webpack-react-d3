import * as React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import "./app.scss";

const App: React.FC<WithProps> = () => {
  return (
    <Router>
      <NavBar />
      <div id="wrapper">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

interface WithProps {}
