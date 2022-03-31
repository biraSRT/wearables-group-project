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
const CatLinks = styled.div``;
const StyledLink = styled(Link);

export default Sidebar;
