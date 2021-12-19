import styled from "styled-components";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <DivContainer>
            <Container>
                <TextContainer>
                    <PTag>ISHAN</PTag>
                    <PTag>007</PTag>
                    <PTag>MOVIES</PTag>
                </TextContainer>                
                <ButtonContainer>
                    <StyledLink to="/login">Login</StyledLink>
                    <StyledLink to="/register">Register</StyledLink>
                </ButtonContainer>
            </Container>
                       
        </DivContainer>
    )
}

export default Home

const DivContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/images/app-background.jpg');
  display: flex;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: white;
    margin: auto;
    font-size: 100px;
`;

const PTag = styled.p`
    padding: 5px;
    margin: 0;
    display: inline;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonContainer = styled.div`
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;


const StyledLink = styled(Link)`
    padding-top: 25px;
    width: 20%;
    height: 50px;
    background-color: rgb(52,52,52);
    color: white;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    text-align: center;
    &:hover {
    background-color: rgb(85,85,85);
    
  }
`;