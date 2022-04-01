import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
  const [incomingData, setIncomingData] = useState();
  const [currentCategory, setCurrentCategory] = useState();
  const [selectedBodyLocation, setSelectedBodyLocation] = useState();
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
    fetch(`/api/get-filtered-items`)
      .then((res) => res.json())
      .then((json) => {
        setIncomingData(json.data);
      });
  }, []);

  //handleBodyLocation is for filtering out only the body_location:
  //step 1: Used a filter that filter incomingData
  //step 2: Check if the selectedBodyLocation is equal to the default value Wear
  //        if so then return all incoming data
  //step 3: Else return the specified data that is choosen from the dropdown menu and
  //        use toUpperCase() to return the value of string converted to uppercase
  //step 4: set the bodyLocation function inside a state called setFliteredSearch which then
  //        contains the function bodyLocation and return bodyLocation so you can use it in the
  //        handleFilterSearch.

  const handleBodyLocation = () => {
    const bodyLocation = incomingData?.filter((location) => {
      if (selectedBodyLocation === "Wear") {
        return incomingData;
      } else {
        return (
          location.body_location.toUpperCase() ===
          selectedBodyLocation.toUpperCase()
        );
      }
    });
    setFilteredSearch(bodyLocation);
    return bodyLocation;
  };

  //handleCategoryChange is for filtering out only the categories:
  //step 1: Used a filter to filter incomingData
  //step 2: Check if the currentCategory is equal to the default value All Categories
  //        if so then return all incoming data
  //step 3: Else return the specified data that is choosen from the sideBar buttons and
  //        use toUpperCase() to return the value of string converted to uppercase
  //step 4: set the Category function inside a state called setFliteredSearch which then
  //        contains the function Category and return Category so you can use it in the
  //        handleFilterSearch.

  const handleCategoryChange = () => {
    const Category = incomingData?.filter((category) => {
      if (currentCategory === "All Categories") {
        return incomingData;
      } else {
        return (
          category.category.toUpperCase() === currentCategory.toUpperCase()
        );
      }
    });
    setFilteredSearch(Category);
    return Category;
  };

  //handleFilterSearch is to check when you click body_location and Categories
  //indiviually and together:

  const handleFilterSearch = () => {
    if (currentCategory) {
      handleCategoryChange();
    }
    if (selectedBodyLocation) {
      handleBodyLocation();
    }
    if (currentCategory && selectedBodyLocation) {
      let search = incomingData?.filter((item) => {
        if (currentCategory === "All Categories") {
          return handleBodyLocation();
        } else {
          return (
            item.body_location.toUpperCase() ===
              selectedBodyLocation.toUpperCase() &&
            item.category.toUpperCase() === currentCategory.toUpperCase()
          );
        }
      });
      setFilteredSearch(search);
    }
  };

  useEffect(() => {
    handleFilterSearch();
  }, [selectedBodyLocation, currentCategory]);

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
              <CardContainer>
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
const CardContainer = styled.div`
  border: 2px solid lightgray;
  width: 250px;
  height: 300px;
  margin-bottom: 10px;
  text-align: center;
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
`;

export default HomePage;
// const handleChangeCategories = (ev, bodyLocation) => {
//   setCurrentCategory(ev);
//   setCurrentBodyLocation();
//   const Category = incomingData?.filter((category) => {
//     if (ev === "All Categories") {
//       return incomingData;
//     } else {
//       return category.category.toUpperCase() === ev.toUpperCase();
//     }
//   });
//   setSelectedCategory(Category);
// };

// const handleChangeBodyLocation = (ev) => {
//   ev.preventDefault();

//   if (selectedCategory) {
//     handleChangeCategories(selectedCategory, ev.target.value);
//   } else {
//     const bodyLocation = incomingData?.filter((location) => {
//       if (ev.target.value === "body_location") {
//         return incomingData;
//       } else {
//         return (
//           location.body_location.toUpperCase() === ev.target.value.toUpperCase()
//         );
//       }
//     });
//   }
//   setSelectedBodyLocation(ev.target.value);
// };
