import styled from "styled-components";
import { Fab, CircularProgress, Alert, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import Add from "./Add";
import { useState, useReducer, useEffect } from "react";
import dateReducer from "../reducers/dateReducer";
import loadingReducer from "../reducers/loadingReducer";
import config from "../config";
import axios from "axios";
import { parseTitle } from "../utils/parseTitle";
import Records from "./Records";
import useLocalStorage from "../hooks/useLocalStorage";
import Settings from "./Settings";

const Window = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  z-index: 999;
`;

const RightTopMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  gap: 6px;
  padding-top: 6px;
  padding-right: 6px;
  z-index: 999;

  @media only screen and (min-width: 1200px) {
    right: calc((100% - 1200px) / 2);
  }
`;

const LeftTitle = styled.header`
  position: fixed;
  padding: 5px;
  font-size: 40px;
  text-shadow: 3px 3px 2px gray;
  top: 0;
  left: 0;
  z-index: 999;

  @media only screen and (min-width: 1200px) {
    left: calc((100% - 1200px) / 2);
  }

  @media only screen and (max-width: 500px) {
    font-size: calc(100vw * 0.05);
  }
`;

const TopBackground = styled.div`
  position: fixed;
  z-index: 999;
  height: 60px;
  top: 0;
  width: 100%;
  background: linear-gradient(black, black, black, black, black, transparent);

  @media only screen and (min-width: 1200px) {
    width: 1200px;
  }
`;

const initialState = {
  day: null,
  month: null,
  year: null,
  fulldate: null,
};

const Main = ({
  setLoginToken,
  loginToken,
  memoryPassword,
  setMemoryPassword,
}) => {
  const [addBoxOpen, setAddBoxOpen] = useState(false);
  const [settingsBoxOpen, setSettingsBoxOpen] = useState(false);
  const [date, setDate] = useReducer(dateReducer, initialState);
  const [records, setRecords] = useState([]);
  const [pending, setPending] = useReducer(loadingReducer, {
    error: null,
    success: null,
    loading: false,
  });

  //SETTINGS
  const [digitsAfterDot, setDigitsAfterDot] = useLocalStorage("digits", 3);
  const [maxSuggestions, setMaxSuggestions] = useLocalStorage("maxsuggest", 15);

  useEffect(() => {
    handleGetRecords();
  }, []);

  const handleGetRecords = () => {
    setRecords([]);
    setPending({ type: config.RDX_LOADING });
    axios
      .post(config.BASE_URL + config.ROUTE_LOAD, {
        token: loginToken,
      })
      .then((response) => {
        if (response.data.error)
          return setPending({
            type: config.RDX_ERROR,
            payload: response.data.error,
          });
        setRecords(response.data);
        setPending({ type: "DEFAULT" });
      })
      .catch((error) => {
        console.log(error);
        setPending({
          type: config.RDX_ERROR,
          payload:
            "Nie udało się wczytać danych, kliknij aby spróbować załadować jeszcze raz lub przeloguj się",
        });
      });
  };

  const handleLogout = () => {
    axios
      .delete(config.BASE_URL + config.ROUTE_LOGIN)
      .then((response) => {
        setLoginToken(null);
      })
      .catch((error) => {
        setLoginToken(null);
      });
  };

  return (
    <Window>
      <TopBackground />
      <LeftTitle>{parseTitle(date.fulldate)}</LeftTitle>
      <RightTopMenu>
        <Fab
          color="success"
          aria-label="add"
          onClick={() => setAddBoxOpen(true)}
        >
          <AddIcon />
        </Fab>
        <Fab
          color="primary"
          aria-label="settings"
          onClick={() => setSettingsBoxOpen(true)}
        >
          <SettingsIcon />
        </Fab>
        <Fab
          color="secondary"
          aria-label="logout"
          onClick={() => handleLogout()}
        >
          <LogoutIcon />
        </Fab>
      </RightTopMenu>
      {date.fulldate !== null && (
        <Button onClick={() => setDate({ type: config.RDX_BACK })}>
          Cofnij
        </Button>
      )}

      {records !== null && (
        <Records
          records={records}
          date={date}
          loginToken={loginToken}
          setRecords={setRecords}
          setDate={setDate}
          digitsAfterDot={digitsAfterDot}
          setAddBoxOpen={setAddBoxOpen}
        />
      )}

      {pending.loading === true && <CircularProgress />}
      {pending.error !== null && (
        <Alert severity="error" onClick={() => handleGetRecords()}>
          {pending.error}
        </Alert>
      )}
      <Add
        setDate={setDate}
        date={date}
        setAddBoxOpen={setAddBoxOpen}
        addBoxOpen={addBoxOpen}
        loginToken={loginToken}
        setRecords={setRecords}
        records={records}
        maxSuggestions={maxSuggestions}
      />
      <Settings
        settingsBoxOpen={settingsBoxOpen}
        setSettingsBoxOpen={setSettingsBoxOpen}
        digitsAfterDot={digitsAfterDot}
        setDigitsAfterDot={setDigitsAfterDot}
        maxSuggestions={maxSuggestions}
        setMaxSuggestions={setMaxSuggestions}
        memoryPassword={memoryPassword}
        setMemoryPassword={setMemoryPassword}
      />
    </Window>
  );
};

export default Main;
