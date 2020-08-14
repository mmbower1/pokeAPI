import React from 'react';
import footerLogo from '../../img/pogo-logo.png';
// styles
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo-box">
        <img src={footerLogo} alt="Full logo" className="footer__logo" />
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <div className="footer__navigation">
            <ul className="footer__list">
              <li className="footer__item">
                <a href="" className="footer__link">Company</a>
                <a href="" className="footer__link">Contact</a>
                <a href="" className="footer__link">Careers</a>
                <a href="" className="footer__link">Privacy policy</a>
                <a href="" className="footer__link">Terms</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-1-of-2">
          <p className="footer__copyright">
            Copyright &copy; 2020 https://norcal-outdoors.com/
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer;
