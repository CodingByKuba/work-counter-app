import styled from "styled-components";
import {
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Alert,
  Switch,
} from "@mui/material";
import { Lock, LockOpen } from "@mui/icons-material";
import { useState, useRef, useReducer, useEffect } from "react";
import loadingReducer from "../reducers/loadingReducer";
import config from "../config";
import axios from "axios";

const LoginWindowWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Window = styled.header`
  width: 90%;
  display: flex;
  align-items: center;
  text-align: center;
  gap: 12px;
  justify-content: center;
  flex-direction: column;
  padding: 12px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.3);

  @media (orientation: landscape) {
    width: 35%;
  }
`;

const initialState = {
  success: null,
  error: null,
  loading: false,
};

const LoginWindow = ({ setLoginToken, memoryPassword, setMemoryPassword }) => {
  const [passwordHidden, setPasswordHidden] = useState("password");
  const passwordRef = useRef(null);
  const [state, dispatch] = useReducer(loadingReducer, initialState);
  const [tempToken, setTempToken] = useState(null);
  const [rememberPassword, setRememberPassword] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (tempToken === null) return;
      setLoginToken(tempToken);
    }, 1000);

    return () => clearTimeout(timeout); // eslint-disable-next-line
  }, [state.success]);

  useEffect(() => {
    if (memoryPassword !== null) setRememberPassword(true);
  }, []);

  const handleChangeHiddenPassword = (e) => {
    if (e.type === "mouseup" || e.type === "mouseout") {
      setPasswordHidden("password");
      passwordRef.current.focus();
    }
    if (e.type === "mousedown") setPasswordHidden("text");
  };

  const handleLogin = () => {
    if (passwordRef.current.value === "")
      return dispatch({
        type: config.RDX_ERROR,
        payload: "Nie wprowadzono hasła",
      });
    dispatch({ type: config.RDX_LOADING });
    axios
      .post(config.BASE_URL + config.ROUTE_LOGIN, {
        password: passwordRef.current.value,
      })
      .then((response) => {
        if (response.data.error)
          return dispatch({
            type: config.RDX_ERROR,
            payload: response.data.error,
          });
        if (response.data.token) setTempToken(response.data.token);
        rememberPassword === true &&
          setMemoryPassword(passwordRef.current.value);
        dispatch({ type: config.RDX_SUCCESS, payload: "Zalogowano poprawnie" });
      })
      .catch((error) => {
        dispatch({ type: config.RDX_ERROR, payload: error.message });
      });
  };

  return (
    <LoginWindowWrap>
      <Window>
        <h2>Logowanie</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            id="filled-basic"
            label="Wprowadź hasło..."
            variant="outlined"
            type={passwordHidden}
            inputRef={passwordRef}
            defaultValue={memoryPassword || undefined}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  style={{ cursor: "pointer" }}
                  onMouseDown={(e) => handleChangeHiddenPassword(e)}
                  onMouseUp={(e) => handleChangeHiddenPassword(e)}
                  onMouseOut={(e) => handleChangeHiddenPassword(e)}
                >
                  {passwordHidden === "password" ? <Lock /> : <LockOpen />}
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Zaloguj
          </Button>
          <br />
          <br />
          Zapamiętaj hasło:
          <Switch
            checked={rememberPassword}
            onChange={() => {
              if (memoryPassword !== null || rememberPassword === true) {
                setMemoryPassword(null);
                setRememberPassword(false);
                return;
              }
              setRememberPassword(true);
            }}
          />
        </form>
        {state.loading === true && <CircularProgress />}
        {state.error !== null && <Alert severity="error">{state.error}</Alert>}
        {state.success !== null && (
          <Alert severity="success">{state.success}</Alert>
        )}
      </Window>
    </LoginWindowWrap>
  );
};

export default LoginWindow;
