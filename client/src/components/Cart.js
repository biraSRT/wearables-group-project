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
    // // User input number
    // const value = Number(ev.target.value);
    // // Update cart state
    // setCart((prevState) => {
    //   return prevState.map((item) => {
    //     if (item._id === itemId) {
    //       return {
    //         ...item,
    //         quantity: value,
    //       };
    //     } else {
    //       return {
    //         ...item,
    //       };
    //     }
    //   });
    // });
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
  // After verification, navigates to "/checkout" using useHistory
  const handleCheckoutClick = (ev) => {
    cart.forEach((item) => {
      if (item.quantity > item.numInStock) {
        window.alert(
          `${item.name}: Only ${item.numInStock} available in stock.`
        );
      }
    });
    history.push("/checkout");
  };

  return (
    <Wrapper>
      {cart.length ? (
        <CartContainer>
          <div>Cart Header</div>
          {cart.map((item) => (
            <ItemContainer key={item._id}>
              <ItemImg src={item.imageSrc} />
              <ItemName>{item.name}</ItemName>
              <ItemStock>{item.numInStock}</ItemStock>
              <ItemPrice>{item.price}</ItemPrice>
              <ItemQuantity
                type="number"
                value={item.quantity}
                min={0}
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

          <CheckoutBtn onClick={handleCheckoutClick}>
            Checkout button
          </CheckoutBtn>
        </CartContainer>
      ) : (
        <EmptyCartContainer>Cart is empty</EmptyCartContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CartContainer = styled.div``;

const EmptyCartContainer = styled.div``;

const ItemContainer = styled.div`
  display: flex;
  gap: 20px;
  max-width: 1000px;
`;

const ItemImg = styled.img`
  width: 100px;
`;

const ItemName = styled.p``;

const ItemStock = styled.p``;

const ItemPrice = styled.p``;

const ItemQuantity = styled.input``;

const ItemTotal = styled.p``;

const ItemRemove = styled.button``;

const CheckoutBtn = styled.button``;

export default Cart;
