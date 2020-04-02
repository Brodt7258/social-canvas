import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { signOut } from '../firebase';

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;

  & > * {
    margin: 0 1rem;
  }
`;

const NavBar = () => {
  return (
    <NavContainer>
      <h4>Social Canvas</h4>
      <Link to="/">
        Home
      </Link>
      <Link to="/login">
        Login
      </Link>
      <Button variant="contained" onClick={signOut}>
        Signout
      </Button>
    </NavContainer>
  );
};

export default NavBar;
