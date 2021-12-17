import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const config = require('../config/config');

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch(`${config.SERVER_URI}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if(data.user){
      localStorage.setItem('token', data.user);
      alert('Login successful');
      window.location.href = '/dashboard';
    }

    console.log('Login attempted by: '+data);
  }

  return (
    <DivContainer>
      <Form onSubmit={loginUser}>
      <Wrap>
        <FormContainer>
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </FormContainer>        
        <ButtonContainer>
          <ButtonInput type="submit" value="Login"/>
          <StyleLink to="/register">Click here to register</StyleLink>
        </ButtonContainer>
      </Wrap>        
      </Form> 
    </DivContainer>
  );
}

export default Login;


const DivContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/images/app-background.png');
  display: flex;
 
`;

const Form = styled.form`

`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100px;
  right: 150px;
  gap: 100px;
  width: 40%;
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
`;

const StyleLink = styled(Link)`
  color: darkgrey;
  font-size: 15px;
  text-align: center;
  &:hover {
      color: white;
  }
`

const ButtonInput = styled.input`
  width: 40%;
  height: 50px;
  background-color: rgb(52,52,52);
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgb(85,85,85);
  }
`;