import styled from "styled-components";
import { GiMountedKnight } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import watches from "../watches.jpg";

const Header = () => {
  return (
    <Wrapper>
      <Logo to="/">
        <GiMountedKnight />
        BNTV.
      </Logo>
      <Links>
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/cart">
          <FaShoppingCart /> Cart
        </StyledLink>
      </Links>
    </Wrapper>
  );
};

const Logo = styled(Link)`
  font-size: 60px;
  font-family: Georgia, serif;
  font-weight: bold;
  margin: 20px;
  text-decoration: none;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  background-image: url(${watches});
  padding: 20px;
  margin: 10px;
`;

const Links = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 20px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  font-family: Georgia, serif;
  font-weight: bold;
  margin-right: 50px; ;
`;

export default Header;
