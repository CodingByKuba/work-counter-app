import { Drawer, Fab, TextField, Switch } from "@mui/material";
import { Close } from "@mui/icons-material";
import styled from "styled-components";
import { useRef } from "react";

const Closing = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  align-items: flex-end;
  flex-direction: column;
`;

const SettingBox = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  flex-direction: column;
  border-top: 1px dotted white;
`;

const Settings = ({
  setSettingsBoxOpen,
  settingsBoxOpen,
  digitsAfterDot,
  setDigitsAfterDot,
  maxSuggestions,
  setMaxSuggestions,
  memoryPassword,
  setMemoryPassword,
}) => {
  const digitsRef = useRef(null);
  const suggestRef = useRef(null);

  return (
    <Drawer anchor="left" open={settingsBoxOpen} style={{ margin: "10px" }}>
      <Closing>
        <Fab
          size="small"
          color="secondary"
          aria-label="settings"
          onClick={() => setSettingsBoxOpen(false)}
        >
          <Close />
        </Fab>
      </Closing>
      <SettingBox>
        Miejsca po przecinku:
        <TextField
          id="filled-basic"
          variant="filled"
          type="number"
          label="Podaj ilość..."
          inputRef={digitsRef}
          value={digitsAfterDot || undefined}
          onChange={() =>
            setDigitsAfterDot(
              digitsRef.current.value > 0 ? digitsRef.current.value : 0
            )
          }
          inputProps={{
            min: "1",
            max: "10",
          }}
        />
      </SettingBox>
      <SettingBox>
        Ilość propozycji wpisów:
        <TextField
          id="filled-basic"
          variant="filled"
          type="number"
          label="Podaj ilość..."
          inputRef={suggestRef}
          value={maxSuggestions || undefined}
          onChange={() => setMaxSuggestions(suggestRef.current.value)}
          inputProps={{
            min: "1",
            max: "50",
          }}
        />
      </SettingBox>
      <SettingBox>
        Zapamiętaj hasło:
        <Switch
          checked={memoryPassword !== null ? true : false}
          onChange={() => {
            if (memoryPassword !== null) return setMemoryPassword(null);
          }}
        />
      </SettingBox>
    </Drawer>
  );
};

export default Settings;
