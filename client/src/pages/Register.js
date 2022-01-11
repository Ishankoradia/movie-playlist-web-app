import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const config = require('../config/config');

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch(`${config.SERVER_URI}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await response.json();
    if(data.success){
      window.location.href = '/login';
    }

  }

  return (
    <DivContainer>
      <Form onSubmit={registerUser}>
      <Wrap>
        <FormContainer>
          <Input type="text" placeholder="Enter First Name" value={name} onChange={e => setName(e.target.value)}/>
          <Input type="email" placeholder="Enter Email Id" value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </FormContainer>
        <ButtonContainer>
          <ButtonInput type="submit" value="Register"/>
          <StyleLink to="/login">Click here to login</StyleLink>
        </ButtonContainer>  
      </Wrap>        
      </Form>
    </DivContainer>
  );
}

export default Register;

const DivContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/images/app-background.jpg');
  display: flex;
  justify-content: center;
  align-items:center;
`;

const Form = styled.form`
  width: 50%;
  @media only screen and (max-width: 768px){
    width: 80%;
  }
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Input = styled.input`
  height: 50px;
  padding-left: 20px;
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media only screen and (max-width: 768px){
    flex-direction: column;
  }
`;

const ButtonInput = styled.input`
  width: 40%;
  height: 50px;
  background-color: rgb(52,52,52);
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgb(85,85,85);
  }
  @media only screen and (max-width: 768px){
    width: 70%;
  }
`;

const StyleLink = styled(Link)`
  color: darkgrey;
  font-size: 15px;
  text-align: center;
  &:hover {
      color: white;
  }
  @media only screen and (max-width: 768px){
    font-size: 10px;
  }
`