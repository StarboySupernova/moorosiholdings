import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import LogoStyles from '../styles/LogoStyles';

function Logo() {
  return (
    <LogoStyles to="/">
      <StaticImage 
        src="../images/moorosi-logo.jpg" 
        alt="Moorosi Holdings Logo"
        placeholder="blurred"
        objectFit="contain" /* ensure round logo isn't cut off */
      />
    </LogoStyles>
  );
}

export default Logo;