import styled from "styled-components"
import calc from "../../images/calc.png"

const Calc = styled.div`
  width: 70vh;
  height: 70vh;
  position: fixed;
  opacity: .1;
  filter: blur(8px);
  animation: spin 60s linear infinite;
  right: -20vh;
  top: 10vh;
  background: url(${calc});
  background-size: cover;
  z-index: -1;

  @keyframes spin {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }
`

const Calculator = () => {
  return <Calc/>
}

export default Calculator