import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [currentCategory, setCurrentCategory] = useState();

  const [selectedBodyLocation, setSelectedBodyLocation] = useState();

  //create button on HomePage for each category && All category

  //Fetch api all filtered items:

  const categories = [
    "Lifestyle",
    "Entertainment",
    "Medical",
    "Fitness",
    "All categories",
  ];

  useEffect(() => {
    fetch(`/api/get-filtered-items`)
      .then((res) => res.json())
      .then((json) => {
        setSelectedCategory(json.data);
        setSelectedBodyLocation(json.data);
      });
  }, []);

  const handleChangeCategories = (ev) => {
    setCurrentCategory(ev);
    const Category = selectedCategory?.filter((category) => {
      if (ev === "All categories") {
        return selectedCategory;
      } else {
        return category.category.toUpperCase() === ev.toUpperCase();
      }
    });
    console.log(Category);
  };

  const handleChangeBodyLocation = (ev) => {
    ev.preventDefault();
    console.log(ev.target.value);
    const bodyLocation = selectedBodyLocation?.filter((location) => {
      if (ev.target.value === "body_location") {
        return selectedBodyLocation;
      } else {
        return (
          location.body_location.toUpperCase() === ev.target.value.toUpperCase()
        );
      }
    });
    console.log(bodyLocation);
  };

  return (
    <>
      <CategoryWrapper>
        {categories.map((item) => {
          return (
            <CategoryButton
              selected={item === currentCategory}
              onClick={() => {
                handleChangeCategories(item);
              }}
            >
              {item}
            </CategoryButton>
          );
        })}
      </CategoryWrapper>
      <form>
        <select onChange={handleChangeBodyLocation}>
          <option>Wear:</option>
          <option value="wrist">wrist</option>
          <option value="head">head</option>
        </select>
      </form>
    </>
  );
};

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryButton = styled.button`
  background-color: ${(props) => (props.selected ? "black" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: none;
  width: 250px;
  height: 100px;
`;

export default HomePage;
