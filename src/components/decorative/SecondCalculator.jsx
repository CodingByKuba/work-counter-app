import styled from "styled-components"
import calc from "../../images/calc2.png"

const SecondCalc = styled.div`
  width: 60vh;
  height: 60vh;
  position: fixed;
  opacity: .1;
  filter: blur(8px);
  animation: secondspin 50s ease-in-out infinite;
  left: -5vh;
  top: 25vh;
  background: url(${calc});
  background-size: cover;
  z-index: -1;

  @keyframes secondspin {
    0% {transform: rotate(350deg);}
    50% {transform: rotate(325deg);}
    100% {transform: rotate(350deg);}
  }

  @media (orientation: portrait) {
    display: none;
  }
`

const SecondCalculator = () => {
  return <SecondCalc/>
}

export default SecondCalculator