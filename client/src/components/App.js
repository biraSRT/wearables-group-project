import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import Item from "./Item";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";

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
          <Route exact path="/item">
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
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
