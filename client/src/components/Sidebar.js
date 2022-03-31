import styled from "styled-components";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Wrapper>
      <CatLinks>
        <StyledLink>Lifestyle</StyledLink>
        <StyledLink>Entertainment</StyledLink>
        <StyledLink>Medical</StyledLink>
        <StyledLink>Fitness</StyledLink>
        <StyledLink>All categories</StyledLink>
      </CatLinks>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CatLinks = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 275px;
  margin-left: 80px;
  margin-top: 50px;
`;

const StyledLink = styled(Link)`
  position: relative;
  font-size: 20px;
  padding: 20px;
  text-decoration: none;
  font-family: Georgia, serif;
  color: black;
`;

export default Sidebar;
