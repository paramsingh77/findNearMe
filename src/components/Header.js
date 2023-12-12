 import React from 'react'
import '../images/login.png' 
import "./Header.css";
import exitLogo from "../images/1-avatar.svg";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
		<div className="flex parent-class">
			<div className="sideList">
				<ul className='sideone'>
					<li>Places</li>
					<li> | </li>
					<li>Downtown</li>
				</ul>
			</div>
				<div className="logo" ><Link to={'/'} style={{ textDecoration: "none"  , color: "black"}}>Find Near Me</Link></div>
			
			
			<div className="login">
			  <img  className='exitlogo' src={exitLogo} alt='img' />
			</div>
		</div>
	);
}

export default Header
