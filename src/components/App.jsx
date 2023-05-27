import styled from "styled-components";
import { useState } from "react";
import Calculator from "./decorative/Calculator";
import SecondCalculator from "./decorative/SecondCalculator";
import LoginWindow from "./LoginWindow";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Main from "./Main";
import useLocalStorage from "../hooks/useLocalStorage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const MainWindow = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media only screen and (min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }
`;

const App = () => {
  const [loginToken, setLoginToken] = useState("");
  const [memoryPassword, setMemoryPassword] = useLocalStorage(
    "password-memory",
    null
  );

  return (
    <>
      <Calculator />
      <SecondCalculator />
      <ThemeProvider theme={darkTheme}>
        <MainWindow>
          {loginToken === null ? (
            <LoginWindow
              setLoginToken={setLoginToken}
              memoryPassword={memoryPassword}
              setMemoryPassword={setMemoryPassword}
            />
          ) : (
            <Main
              setLoginToken={setLoginToken}
              loginToken={loginToken}
              memoryPassword={memoryPassword}
              setMemoryPassword={setMemoryPassword}
            />
          )}
        </MainWindow>
      </ThemeProvider>
    </>
  );
};

export default App;
