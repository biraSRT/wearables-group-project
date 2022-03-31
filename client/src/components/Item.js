import styled from "styled-components";

const Item = () => {
  return (
    <>
      <Container>
        <Image>Item Image</Image>
        <Wrapper>
          <div>Item Information</div>
          <div>QTY:</div>
          <Input type="number"></Input>

          <CartButton>Add To Cart Button</CartButton>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10%;
`;

const Wrapper = styled.div`
  border: 2px solid lavender;
  margin: 50px;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 7% 0;
`;

const Image = styled.div`
  border: 4px solid purple;
  width: 5%;
  padding: 150px;
  margin: 150px;
  margin-right: 0;
`;

const Input = styled.input`
  border: 4px solid lightcyan;
  width: 20%;
  height: 20%;
  text-align: center;
`;

const CartButton = styled.button`
  border: 2px solid lightblue;
  border-radius: 5%;
  width: 35%;
  height: 45px;
  background-color: white;
  cursor: pointer;
`;

export default Item;
