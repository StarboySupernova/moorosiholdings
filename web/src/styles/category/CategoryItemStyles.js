import styled from 'styled-components';

export const CategoryItemStyles = styled.div`
  background: var(--black-2);
  padding: 3rem 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    border-color: rgba(0, 210, 255, 0.3);
  }

  .title {
    margin-bottom: 1.5rem;
  }
  .text {
    margin-bottom: 2.5rem;
    color: var(--white-1);
  }
  .custom-image {
    max-width: 100%;
    max-height: 250px;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }
`;