import React from "react";
import "./Footer.css";
import ig from "../images/Ig.svg";
import { NavLink } from "react-router-dom";
import mail from "../images/Mail.svg";
import location from "../images/Location.svg";
import phone from "../images/Phone.svg";
import footerLine from "../images/Line 1.svg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footerImg" />
      <div className="footerTopDiv">
        <div className="footerMainHeading">
          <span>Find the plants that suit you!</span>
        </div>

        <div className="footerBottomHeading">
          <span>
            Subscribe to forager to receive monthly plant tips, store updates,
            promotions and more
          </span>
        </div>
      </div>

      <div className="footerBottomDiv">
        <div className="footerBottomLeftDiv">
          <div className="footerBottomLeftContent">
            <div className="footerContent">
              <span>
                flourish together get the plants makes you happy
              </span>
            </div>

            <div className="footerIconDiv">
              {/* <img src={twitter} alt="twitter" /> */}
              <img src={ig} alt="ig" />
              {/* <img src={fb} alt="fb" /> */}
              {/* <img src={youTube} alt="youtube" /> */}
            </div>
          </div>
        </div>

        <div className="footerBottomRightDiv">
          <div className="linkContainer">
            <span>Quick Links</span>
            <div className="linkContents">
              <NavLink to="/plants/All">
                <span>All Plants</span>
              </NavLink>
            </div>
          </div>

          <div className="footerContactContainer">
            <span>Contact us</span>
            <div className="footerContactContents">
              <div className="footerContactContent">
                <img src={mail} alt="mail" />
                <span>purakkat.rainbowgardens@gmail.com</span>
              </div>

              <div className="footerContactContent">
                <img src={location} alt="mail" />
                <span>
                Kumbalam South Junction 
                <br />
                Ernakulam, Kerala 
                <br />
                682506
                </span>
              </div>

              <div className="footerContactContent">
                <img src={phone} alt="mail" />
                <span>7012351551</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footerCcDiv">
        <div className="footerLineContainer">
          <img src={footerLine} alt="footerLine" />
        </div>

        <div className="ccSpan">
          <span>© Rainbow Gardens 2024</span>
        </div>
      </div>
    </div>
  );
}
