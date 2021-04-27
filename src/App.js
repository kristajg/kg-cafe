import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUp from "./containers/SignUp";
import BookTaxi from "./containers/BookTaxi";
import PickupNow from "./containers/PickupNow";
import PickupLater from "./containers/PickupLater";
import Verification from "./containers/Verification";

// TODO: handle is user authenticated
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignUp />
        </Route>
        <Route exact path="/verification">
          <Verification />
        </Route>
        <Route exact path="/book-taxi">
          <BookTaxi />
        </Route>
        <Route exact path="/pickup-now">
          <PickupNow />
        </Route>
        <Route exact path="/pickup-later">
          <PickupLater />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
