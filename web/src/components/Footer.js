import { Link } from 'gatsby';
import React from 'react';
import { menu } from '../constants/menu';
import { socialLinks } from '../constants/socialLinks';
import { FooterStyles } from '../styles/FooterStyles';
import Logo from './Logo';
import ParagraphText from './typography/ParagraphText';

function Footer() {
  return (
    <FooterStyles>
      <div className="container">
        <Logo />
        <ParagraphText className="footer__text">
          "At Disaster Environmental Management Trust (DEMT), our mission is to protect communities and ecosystems in the face of environmental challenges. We are dedicated to developing innovative solutions for disaster response, environmental conservation, and sustainable recovery. Through collaborative efforts, and grass roots community engagement, we work tirelessly to mitigate environmental risks and support resilient communities. Join us in our commitment to creating a safer, more sustainable future. Together, we can make a meaningful difference in environmental management and disaster preparedness."
        </ParagraphText>
        <ul className="footer__menuList">
          {menu.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <ul className="footer__socialList">
          {socialLinks.map((item) => (
            <li key={item.name}>
              <a href={item.url}>{item.icon}</a>
            </li>
          ))}
        </ul>
        <ParagraphText className="copyright">
          P.O. Box 42, Mutoko Rural District, Zimbabwe
        </ParagraphText>
        <ParagraphText className="copyright">
          © DEMT | EST. 2019 | {new Date().getFullYear()} | All rights reserved
        </ParagraphText>
      </div>
    </FooterStyles>
  );
}

export default Footer;
