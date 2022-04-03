import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { StoreContext } from "./context/StoreContext";

const Cart = () => {
  const history = useHistory();
  const { cart, setCart } = useContext(StoreContext);

  // Helper function to convert price (e.g: $19.99) to number (e.g.: 19.99)
  const convertPriceToNum = (price) => {
    const num = price.split("$");
    return num[1];
  };

  // Handle quantity input change by updating cart state
  const handleQuantityChange = (ev, itemId) => {
    // User input number
    const value = Number(ev.target.value);
    // Update cart state
    setCart((prevState) => {
      return prevState.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            quantity: value,
          };
        } else {
          return {
            ...item,
          };
        }
      });
    });
  };

  // Handle remove button click by updating cart state
  const handleRemoveClick = (itemId) => {
    // Update cart state
    setCart((prevState) => {
      return prevState.filter((item) => item._id !== itemId);
    });
  };

  // Handle checkout button click
  // Verify that requested quantity does not exceed item stock
  // After verification, navigate to "/checkout" using useHistory
  const handleCheckoutClick = (ev) => {
    const check = cart.every((item) => item.quantity <= item.numInStock);
    check ? history.push("/checkout") : window.alert("Invalid quantity");
  };

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    return Number(total + convertPriceToNum(item.price) * item.quantity);
  }, 0);

  return (
    <Wrapper>
      {cart.length ? (
        <CartContainer>
          <HeaderContainer>
            <HeaderName>Product</HeaderName>
            <HeaderStock>In Stock</HeaderStock>
            <HeaderPrice>Price</HeaderPrice>
            <HeaderQuantity>Quantity</HeaderQuantity>
            <HeaderTotal>Total</HeaderTotal>
          </HeaderContainer>
          {cart.map((item) => (
            <ItemContainer key={item._id}>
              <ItemImg src={item.imageSrc} />
              <ItemName>{item.name}</ItemName>
              <ItemStock>{item.numInStock}</ItemStock>
              <ItemPrice>{item.price}</ItemPrice>
              <ItemQuantity
                type="number"
                value={item.quantity}
                min={1}
                max={item.numInStock}
                onChange={(ev) => handleQuantityChange(ev, item._id)}
              />
              <ItemTotal>
                ${(item.quantity * convertPriceToNum(item.price)).toFixed(2)}
              </ItemTotal>
              <ItemRemove onClick={() => handleRemoveClick(item._id)}>
                Remove
              </ItemRemove>
            </ItemContainer>
          ))}
          <SubtotalContainer>
            Subtotal: ${subtotal.toFixed(2)}
          </SubtotalContainer>
          <CheckoutBtn onClick={handleCheckoutClick}>Checkout</CheckoutBtn>
        </CartContainer>
      ) : (
        <EmptyCartContainer>Cart is empty</EmptyCartContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px;
  border: 2px solid black;
`;

const EmptyCartContainer = styled.div``;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 400px 50px 100px 100px 250px;
  padding-bottom: 10px;
  border-bottom: 2px solid black;
`;

const HeaderName = styled.p``;

const HeaderStock = styled.p``;

const HeaderPrice = styled.p``;

const HeaderQuantity = styled.p``;

const HeaderTotal = styled.p``;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 300px 50px 100px 100px 100px 150px;
  justify-items: start;
  align-items: center;
`;

const ItemImg = styled.img`
  box-sizing: border-box;
  padding: 10px;
  width: 100px;
  height: auto;
`;

const ItemName = styled.p``;

const ItemStock = styled.p``;

const ItemPrice = styled.p``;

const ItemQuantity = styled.input``;

const ItemTotal = styled.p``;

const ItemRemove = styled.button`
  border: none;
  border-radius: 2px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const SubtotalContainer = styled.div`
  /* width: 100px; */
  height: 2rem;
  align-self: flex-end;
`;

const CheckoutBtn = styled.button`
  width: 100px;
  height: 2rem;
  align-self: flex-end;

  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

export default Cart;
