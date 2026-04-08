import { Link } from "gatsby";
import React from "react";
import { menu } from "../constants/menu";
import { socialLinks } from "../constants/socialLinks";
import { FooterStyles } from "../styles/FooterStyles";
import Logo from "./Logo";
import ParagraphText from "./typography/ParagraphText";

function Footer() {
  return (
    <FooterStyles>
      <div className="container">
        <Logo />
        <ParagraphText className="footer__text">
          "Diginotive Solutions (Private) Limited is a Zimbabwe-based Research
          and Development company specialising in ICT, educational technology,
          and AI content development. We empower businesses and organisations
          through innovative problem-solving rooted in thorough research and
          custom technological solutions tailored to the African context."
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
          © Diginotive | EST. 2019 | {new Date().getFullYear()} | All rights
          reserved
        </ParagraphText>
      </div>
    </FooterStyles>
  );
}

export default Footer;
