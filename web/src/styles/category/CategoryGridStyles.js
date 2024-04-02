import styled from 'styled-components';

export const CategoryGridStyles = styled.div`
  display: grid;
  margin-top: 3.5rem;
  display: grid;
  gap: 5rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
`;

export const ValueGridStyles = styled.div`
  display: grid;
  margin-top: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  ); /* Reduced the minimum width to 250px */
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(150px, 1fr)
    ); /* Adjusted for smaller screens */
    gap: 2rem;
  }
`;
