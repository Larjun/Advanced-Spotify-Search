import React from 'react';
import styled from 'styled-components';
import { CgProfile} from "react-icons/cg"
import { useStateProvider } from '../utils/StateProvider';
export default function Navbar() {
  const [{userInfo}] = useStateProvider();
  return (
    <Container>
      <div className='avatar'>
        <a href='#'>
          <CgProfile/>
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </Container>

    
  ); 
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 1 rem;
  position: sticky;
  top:0 ;
  background-color: black;
  
  .avatar {
    background-color:white;
    padding: .6rem;
    
    a{
      text-decoration: none;
      color: black;
      font-weight: bold;
      font-size: 1.5rem;
      svg{
        font-size: 2rem;
        padding-right: 0.5rem;
      }
    }
    
   
    
    
  }
`;