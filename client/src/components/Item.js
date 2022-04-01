import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { StoreContext } from "./context/StoreContext";

const Item = () => {
  const { cart, setCart } = useContext(StoreContext);
  console.log(cart);

  const [quantity, setQuantity] = useState(0);

  const [selectedItem, setSelectedItem] = useState();

  const { _id } = useParams();

  //Fetch api for single item to display item info:

  useEffect(() => {
    fetch(`/api/get-items/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        setSelectedItem(json.data);
      });
  }, []);

  //handleChange for Quantity Change:

  const handleChange = (ev) => {
    setQuantity(ev.target.value);
  };

  //handleClick

  const handleClick = (ev, itemId) => {
    if (quantity < 1 || quantity > selectedItem.numInStock) {
      return window.alert("Invalid Quantity");
    } else {
      const check = cart.filter((item) => {
        return item._id === itemId;
      });
      if (check.length) {
        setCart((prev) => {
          return prev.map((item) => {
            if (item._id === itemId) {
              console.log("item already exists");
              return {
                ...item,
                quantity: Number(item.quantity) + Number(quantity),
              };
            } else {
              console.log("just pass along");
              return {
                ...item,
              };
            }
          });
        });
      } else {
        setCart((prev)=>{
          const tempCart = [...prev];
          tempCart.push({ ...selectedItem, quantity: quantity });
          return tempCart
        });
      }
    }
  };
  return (
    <>
      {selectedItem && (
        <Container>
          <Image src={selectedItem.imageSrc} />

          <Wrapper>
            <ItemName>{selectedItem.name}</ItemName>
            <Category>{selectedItem.category}</Category>
            <Price>{selectedItem.price}</Price>

            <Quantity>QTY:</Quantity>
            <div>In Stock {selectedItem.numInStock}</div>
            <Input
              name="quantity"
              type="number"
              min="1"
              max={selectedItem.numInStock}
              onChange={handleChange}
            ></Input>
            <CartButton onClick={(ev) => handleClick(ev, selectedItem._id)}>
              Add To Cart Button
            </CartButton>
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

const Quantity = styled.div`
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
