import styled from 'styled-components';

export const HeroSectionStyles = styled.div`
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  .container {
    height: 100%;
    z-index: 2;
  }
  .hero__wrapper {
    width: 100%;
    height: 100%;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 60%;
      height: 100%;
      background: linear-gradient(135deg, #0A1128 0%, rgba(10, 17, 40, 0) 100%); 
      z-index: -1;
    }
    .left {
      width: 55%;
      padding: 100px 0 50px 0;
      animation: fadeUp 1s ease-out forwards;
      .hero__heading {
        max-width: 550px;
        font-size: 4rem;
        font-family: 'Poppins', sans-serif;
        font-weight: '700';
        margin: 0.5rem 0;
        line-height: 1.2;
        background: linear-gradient(to right, #ffffff, var(--primary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .hero__text {
        max-width: 450px;
        font-size: 1.6rem;
        margin-top: 1.5rem;
        color: var(--white-1);
      }
      .hero__button {
        margin-top: 2.5rem;
      }
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      width: 50%;
      height: 100%;
      z-index: 1;
      animation: fadeUp 1.2s ease-out forwards;
      .hero__image {
        width: 100%;
        height: 100%;
        mask-image: linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
        -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
      }
    }
  }
