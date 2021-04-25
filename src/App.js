import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUp from "./containers/SignUp";
import BookTaxi from "./containers/BookTaxi";
import PickupNow from "./containers/PickupNow";

// TODO: handle is user authenticated
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignUp />
        </Route>
        <Route exact path="/book-taxi">
          <BookTaxi />
        </Route>
        <Route exact path="/pickup-now">
          <PickupNow />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
