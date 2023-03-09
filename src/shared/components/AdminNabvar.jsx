//pa crear es rafce

import React, { useContext } from 'react'
import {Nav, Navbar,Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {AuthContext} from '../../modules/auth/authContext'

export const AdminNabvar = () => {
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = ()=>{
    dispatch({type:'LOGOUT'});
    navigate('/auth', {replace:true});
  };
  return (
    <Navbar bg="light" expand="lg">
    <Container fluid>
      <Navbar.Brand href="#">logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Link to="/" className='ms-1 nav-link'>Productos</Link>
          
          <Link to="/category" className='ms-1 nav-link'>Categoria</Link>
          
          <Link to="/subcategory" className='ms-1 nav-link'>Subcategoria</Link>
        </Nav>
        <Button variant='primary' onClick={handleLogout}>
          CERRAR SESION
        </Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

