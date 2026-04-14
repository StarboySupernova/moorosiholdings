const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root{
    --primary: #00D2FF; /* Neon Cyan for AI/Tech feel */
    --secondary: #007BFF; /* Deep Tech Blue */
    --darkBlue: #0A1128; 
    --darkPurple: #1A0B2E;
    --black-1: #040814; /* Extremely dark blue/black background */
    --black-2: #0B1325; /* Slightly lighter card background */
    --white-1: #E2E8F0;
    --gray: #8A98B0;
    --grey: var(--gray);
    --white: white;
    --black: black;
  }
  html{
    font-size: 10px;
    scroll-behavior: smooth;
  }
  
  body{
    min-height: 100vh;
    line-height: 1.5;
    width: 100%;
    font-family: 'Inter', sans-serif;
    background: var(--black-1);
    color: var(--white);
  }
  a{
    text-decoration: none;
    color: var(--white);
  }
  .container{
    max-width: 1200px;
    margin: 0 auto;
    width: 90%;
  }
  img, svg{
    height: 100%;
    width: 100%;
  }
  li, ul{
    list-style: none;
  }

  /* Global Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes glowPulse {
    0% { box-shadow: 0 0 5px rgba(0, 210, 255, 0.2); }
    50% { box-shadow: 0 0 20px rgba(0, 210, 255, 0.6); }
    100% { box-shadow: 0 0 5px rgba(0, 210, 255, 0.2); }
  }
`;

export default GlobalStyles;