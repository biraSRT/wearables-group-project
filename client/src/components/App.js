import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import Item from "./Item";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import Error from "./Error";
import About from "./About";
import Sidebar from "./Sidebar";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Sidebar />
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
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
          <Route path="/error">
            <Error />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
