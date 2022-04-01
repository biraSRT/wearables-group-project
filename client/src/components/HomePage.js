import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
  const [currentCategory, setCurrentCategory] = useState("Medical");
  const [selectedBodyLocation, setSelectedBodyLocation] = useState("Wrist");
  const [filteredSearch, setFilteredSearch] = useState();

  //Created a array for categories
  const categories = [
    "Lifestyle",
    "Entertainment",
    "Medical",
    "Fitness",
    "All Categories",
  ];

  //Fetch api all filtered items and set it in setIncomingData:

  useEffect(() => {
    fetch(
      `/api/get-filtered-items/?category=${currentCategory}&body_location=${selectedBodyLocation}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setFilteredSearch(json.data);
      });
  }, [currentCategory, selectedBodyLocation]);

  return (
    <>
      <Wrapper>
        <NavBarContainer>
          {categories.map((item) => {
            return (
              <CategoryButton
                selected={item === currentCategory}
                onClick={() => {
                  setCurrentCategory(item);
                }}
              >
                {item}
              </CategoryButton>
            );
          })}{" "}
          <form>
            <SelectBodyLocationMenu
              onChange={(e) => {
                setSelectedBodyLocation(e.target.value);
              }}
              defaultValue="Wrist"
            >
              <option value="Wear:">Wear:</option>
              <option value="Wrist">Wrist</option>
              <option value="Head">Head</option>
              <option value="Waist">Waist</option>
              <option value="Neck">Neck</option>
              <option value="Torso">Torso</option>
            </SelectBodyLocationMenu>
          </form>{" "}
        </NavBarContainer>
        <ItemContainer>
          {filteredSearch?.map((category) => {
            console.log(filteredSearch);
            return (
              <CardContainer path to={`/item/${category._id}`}>
                <CardImage src={category.imageSrc} />
                <CardInfo>
                  <div>
                    <CardName>{category.name}</CardName>
                  </div>
                  <div>
                    <CardPrice>{category.price}</CardPrice>
                  </div>
                </CardInfo>
              </CardContainer>
            );
          })}
        </ItemContainer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const SelectBodyLocationMenu = styled.select`
  border: 2px solid red;
  width: 100%;
  text-align: center;
  height: 50px;
  border: none;
  background-color: ${(props) => (props.selected ? "black" : "lightgrey")};
  color: black;
`;
const CardContainer = styled(Link)`
  border: 2px solid lightgray;
  width: 250px;
  height: 300px;
  margin-bottom: 10px;
  text-align: center;
  text-decoration: none;
  color: black;
  font-family: Georgia, serif;
  font-size: 13px;
`;
const CardImage = styled.img`
  width: 100%;
  height: 60%;
  object-fit: contain;
`;

const CardInfo = styled.div`
  background-color: lightgray;
  line-height: 170%;
  height: 39%;
`;

const CardName = styled.div``;

const CardPrice = styled.div``;

const ItemContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const NavBarContainer = styled.div`
  width: 10%;
  min-width: 150px;
`;

const CategoryButton = styled.button`
  background-color: ${(props) => (props.selected ? "black" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: none;
  width: 100%;
  height: 100px;
  font-size: 17px;
`;

export default HomePage;
