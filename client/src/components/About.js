import styled from "styled-components";
import TeamWork from "../team-work-dance.gif";

const About = () => {
  return (
    <AboutContainer>
      <Wrapper>
        <Title>About BNTV</Title>
        <AboutText>
          BNTV specializes in all the latest gadgets on the market. Based in
          Montreal, our organization came about at Concordia Bootcamps and we
          are the best team!
        </AboutText>
        <Image src={TeamWork} alt="team work gif" />
      </Wrapper>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-family: Georgia, serif;
`;

const Wrapper = styled.div`
  display: inline-block;
  max-width: 50%;
  text-align: center;
`;
const Title = styled.p`
  font-size: 20px;
  font-family: Georgia, serif;
  text-align: center;
  padding-bottom: 20px;
  font-weight: bold;
`;

const AboutText = styled.p``;

const Image = styled.img`
  padding-top: 20px;
`;

export default About;
