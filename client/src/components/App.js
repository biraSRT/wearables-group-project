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
