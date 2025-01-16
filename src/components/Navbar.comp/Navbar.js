import React from 'react'
import styled from 'styled-components'
const Navbar = () => {
  return (
    <Nav>
            <Logo href="#">BlockFund</Logo>
            <NavMenu>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/showCampaign">Compaign</NavLink>
                <NavLink href="/createCampaign">Create Compaign</NavLink>
                <NavLink href="/withdrawl">MyCampaign</NavLink>
                <NavLink href="#contact">Blog</NavLink>
            </NavMenu>
            <NavButton>Sign Up</NavButton>  
        </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
    background-color: rgba(0, 0, 0, 0.7);
    padding: 15px 30px;
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000; 
    box-shadow: 0 4px 6px rgba(43, 170, 237, 0.5);
`;

const Logo = styled.a`
    color: #fff;
    font-size: 24px;
    text-decoration: none;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
`;

const NavLink = styled.a`
    color: #fff;
    font-size: 18px;
    margin-right: 20px;
    text-transform: uppercase;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    transition: color 0.3s ease;

    &:hover {
        color: #8AB6D6; 
    }
`;

const NavButton = styled.button`
    background-color: #1E1E2E;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    transition: background-color 0.3s ease;
    margin : 0 60px;

    &:hover {
        background-color: #476080;
    }
`;