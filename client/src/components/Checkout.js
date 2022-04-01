import { useContext, useState } from "react";
import styled from "styled-components";

import { StoreContext } from "./context/StoreContext";

const Checkout = () => {
  const { cart } = useContext(StoreContext);

  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    province: "",
    postCode: "",
    country: "",
    creditCard: "",
    expiration: "",
  });

  // Helper function to convert price (e.g: $19.99) to number (e.g.: 19.99)
  const convertPriceToNum = (price) => {
    const num = price.split("$");
    return num[1];
  };

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    return Number(total + convertPriceToNum(item.price) * item.quantity);
  }, 0);

  // Handle form submit
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleChange = (ev) => {
    const value = ev.target.value;
    const key = ev.target.id;
    setOrderForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <Wrapper>
      <SummaryContainer>
        <HeaderContainer>In Cart</HeaderContainer>
        {cart.map((item) => (
          <ItemContainer key={item._id}>
            <ItemImg src={item.imageSrc} />
            <ItemInfo>
              <ItemName>{item.name}</ItemName>
              <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
              <ItemTotal>
                ${(item.quantity * convertPriceToNum(item.price)).toFixed(2)}
              </ItemTotal>
            </ItemInfo>
          </ItemContainer>
        ))}
        <SubtotalContainer>Subtotal: ${subtotal.toFixed(2)}</SubtotalContainer>
      </SummaryContainer>
      <Form onSubmit={handleSubmit}>
        <FormName>Order Form</FormName>
        <InputContainer>
          <StyledLabel htmlFor="name">Name: </StyledLabel>
          <StyledInput
            type="text"
            id="name"
            value={orderForm.name}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="email">Email: </StyledLabel>
          <StyledInput
            type="text"
            id="email"
            value={orderForm.name}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="address">Address: </StyledLabel>
          <StyledInput
            type="text"
            id="address"
            value={orderForm.address}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="city">City: </StyledLabel>
          <StyledInput
            type="text"
            id="city"
            value={orderForm.city}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="province">Province: </StyledLabel>
          <StyledInput
            type="text"
            id="province"
            value={orderForm.province}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="postCode">Postal Code: </StyledLabel>
          <StyledInput
            type="text"
            id="postCode"
            value={orderForm.postCode}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="country">Country: </StyledLabel>
          <StyledInput
            type="text"
            id="country"
            value={orderForm.country}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="creditCard">Credit Card: </StyledLabel>
          <StyledInput
            type="text"
            id="creditCard"
            value={orderForm.creditCard}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="expiration">Expiration: </StyledLabel>
          <StyledInput
            type="text"
            id="expiration"
            value={orderForm.expiration}
            onChange={handleChange}
          />
        </InputContainer>
        <Submit type="submit" value="Place Order" />
      </Form>
      {/* <div>Order Detail</div>
      <div>Form (name, address, email, credit card)</div>
      <div>Back to cart button</div>
      <div>Place order button</div> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: flex-start;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 2px solid black;
`;

const HeaderContainer = styled.p`
  padding-bottom: 10px;
  border-bottom: 2px solid black;
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 200px;
  justify-items: start;
  align-items: center;
`;

const ItemImg = styled.img`
  box-sizing: border-box;
  padding: 10px;
  width: 100px;
  height: auto;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ItemName = styled.p``;

const ItemQuantity = styled.p``;

const ItemTotal = styled.p``;

const SubtotalContainer = styled.div`
  height: 2rem;
  align-self: flex-end;
`;

const Form = styled.form`
  padding: 20px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormName = styled.p`
  padding-bottom: 10px;
  border-bottom: 2px solid black;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const StyledLabel = styled.label``;

const StyledInput = styled.input``;

const Submit = styled.input`
  height: 2rem;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

export default Checkout;
