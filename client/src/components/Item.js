import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Item = () => {
  const [item, setItem] = useState();

  const { _id } = useParams();

  //Fetch api for single item to display item info

  useEffect(() => {
    fetch(`/api/get-items/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        setItem(json.data);
      });
  }, []);

  return (
    <>
      {item && (
        <Container>
          <Image src={item.imageSrc} />

          <Wrapper>
            <ItemName>{item.name}</ItemName>
            <Category>{item.category}</Category>
            <Price>{item.price}</Price>

            <Qunatity>QTY:</Qunatity>
            <div>In Stock {item.numInStock}</div>
            <Input
              name="quantity"
              type="number"
              min="1"
              max={item.numInStock}
            ></Input>
            <CartButton>Add To Cart Button</CartButton>
          </Wrapper>
        </Container>
      )}
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
  border: 2px solid black;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 3% 0;
`;

const Image = styled.img`
  padding: 100px;
  margin: 90px;
  margin-right: 0;
`;

const ItemName = styled.div`
  padding: 8% 0;
  margin-bottom: 30px;
  text-align: center;
`;

const Price = styled.div`
  width: 85%;
  text-align: center;
  border-bottom: 2px solid lightgray;
  margin-bottom: 30px;
  padding-bottom: 20px;
`;

const Qunatity = styled.div`
  margin-bottom: 15px;
`;
const Category = styled.div`
  margin-bottom: 50px;
`;

const Input = styled.input`
  border: 2px solid lightgray;
  width: 20%;
  height: 30%;
  text-align: center;
  margin-top: 30px;
`;

const CartButton = styled.button`
  border: none;
  border-radius: 6%;
  width: 35%;
  height: 80px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-top: 50px;
`;

export default Item;
