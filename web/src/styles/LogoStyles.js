import styled from 'styled-components';
import { Link } from 'gatsby';

export default styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px; /* Mandated size for the squircle */
  height: 55px;
  
  /* The Squircle Shape */
  border-radius: 32%; 
  overflow: hidden;
  
  /* Visual Identity */
  background: #000;
  border: 1.5px solid rgba(243, 112, 33, 0.4);
  box-shadow: 0 0 15px rgba(243, 112, 33, 0.2);
  transition: all 0.3s ease;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.08) rotate(2deg);
    border-color: var(--primary);
    box-shadow: 0 0 25px rgba(243, 112, 33, 0.5);
  }

  svg {
    font-size: 3rem;
    path {
      stroke: white;
    }
  }
`;