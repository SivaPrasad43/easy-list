import { FaInstagram,FaTwitter,FaGithub,FaTelegram } from "react-icons/fa";

import BuildNShip from '../../assets/Purple_B_Logo.png'

import './Footer.scss'

function Footer() {
  return (
    <div className="footer">
    <a href="https://buildnship.in/">
      <img src={BuildNShip} alt="logo" />
    </a>
    <div className="social-container">
      <a href="https://twitter.com/buildnship/"><FaTwitter size={20}/></a>
      <a href="https://instagram.com/buildnship?igshid=YmMyMTA2M2Y="><FaInstagram size={20}/></a>
      <a href="https://github.com/BuildNShip"><FaGithub size={20}/></a>
      <a href="https://t.me/buildnship"><FaTelegram size={20}/></a>
    </div>
  </div>
  )
}

export default Footer
