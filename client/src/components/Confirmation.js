import styled from "styled-components";
import { Link } from "react-router-dom";
import { FcOk } from "react-icons/fc";

const Confirmation = () => {
  return (
    <Main>
      <Wrapper>
        <h1>Your order has been received</h1>
        <FcOk size="7rem" />
        <p>Thank you for your order!</p>
        <p>
          You will receive an order confirmation email with details of your
          order.
        </p>
        <StyledLink to="/">CONTINUE SHOPPING</StyledLink>
      </Wrapper>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 45vh;
  border: 1px solid black;
  width: 800px;

  h1 {
    font-size: 32px;
    font-weight: bold;
  }

  p {
    font-size: 24px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-top: 20px;
  border: 1px solid black;
  padding: 10px;
  font-size: 20px;
  transition: background-color 0.2s ease-out 20ms;
  transition: all 0.2s ease-in-out;
  background-color: lightsalmon;

  &:hover {
    transform: scale(1.1);
  }
`;

export default Confirmation;
