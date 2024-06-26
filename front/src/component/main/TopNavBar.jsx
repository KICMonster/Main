import React, { useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import '../../App.css'

function TopNavBar() {

  return (
    <Navbar className='navbar expand' >

      <Nav className="mr-auto" style={{paddingLeft:" 0px"}}>
      <Dropdown style={{paddingLeft:" 0px"}}>
          <Dropdown.Toggle variant="transparent" style={{paddingLeft:" 0px"}} >
            칵테일
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/ViewPage">칵테일</Dropdown.Item>
            <Dropdown.Item as={Link} to="/customcocktail">나만의 칵테일</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="transparent" >
            정보
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/history">역사</Dropdown.Item>
            <Dropdown.Item as={Link} to="/craft/mensuration">튜토리얼</Dropdown.Item>
            <Dropdown.Item as={Link} to="/trendNews">뉴스</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="transparent" >
            컨텐츠
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/tastestart">취향 조사</Dropdown.Item>
            <Dropdown.Item as={Link} to="/mapsearch">칵테일 바 찾기</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
      <Link to='/chart'>순위</Link>
    </Navbar>

  );
}


export default TopNavBar;
