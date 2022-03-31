import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import Item from "./Item";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import Error from "./Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/item/:_id">
            <Item />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
          <Route path="">404: Oops!</Route>
          <Error />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
