import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import LogoStyles from '../styles/LogoStyles';

function Logo() {
  return (
    <LogoStyles to="/">
      <StaticImage 
        src="../images/moorosi-logo.png" 
        alt="Moorosi Holdings Logo"
        placeholder="blurred"
        objectFit="cover" /* This ensures the logo fills the squircle */
      />
    </LogoStyles>
  );
}

export default Logo;