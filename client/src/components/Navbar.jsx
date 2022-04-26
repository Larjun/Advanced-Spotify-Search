import React, { useState } from 'react'
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg'
import { useStateProvider } from '../utils/StateProvider';

export default function Navbar() {
  const [{userInfo }] = useStateProvider();
  return (
    <Container>
      <div className='avatar'>
        <a href="#">
          <CgProfile />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 2rem;
  margin-top: 5px;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;

  .avatar {
    background-color: black;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding-right: 0.65rem;
    padding-left: 0.4rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-size: 1rem;
      cursor: auto;
      font-size: 0.95rem;
      svg {
        font-size: 1.4rem;
      }
    }
  }
`;
