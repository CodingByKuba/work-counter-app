import styled from "styled-components";
import { Height, GridView, Edit, DeleteForever } from "@mui/icons-material";
import { Fab, TextField, Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";

const Info = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const InfoInside = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-style: italic;
`;
const Total = styled.div`
  font-size: 20px;
  padding-left: 15px;
  text-shadow: 3px 3px 2px gray;
`;
const Menu = styled.div`
  min-width: 20%;
  display: flex;
  align-items: end;
  justify-content: space-around;
`;

const Editor = styled.form`
  display: flex;
  gap: 10px;
  margin-left: 10px;
  width: 90%;

  @media only screen and (max-width: 500px) {
    flex-wrap: wrap;
  }
`;

const Record = ({
  data,
  handleEditRecord,
  handleDeleteRecord,
  digitsAfterDot,
}) => {
  const [openedEditor, setOpenedEditor] = useState(false);

  const widthRef = useRef(null);
  const heigthRef = useRef(null);
  const countRef = useRef(null);

  const [inputWidth, setInputWidth] = useState(undefined);
  const [inputHeigth, setInputHeigth] = useState(undefined);
  const [inputCount, setInputCount] = useState(undefined);

  useEffect(() => {
    if (openedEditor === true) {
      setInputWidth(data.width);
      setInputHeigth(data.heigth);
      setInputCount(data.count);
      heigthRef.current.focus();
    }
  }, [openedEditor]);

  return (
    <>
      <Info>
        <InfoInside>
          <span>
            <Height /> {data.heigth} cm
          </span>
          <span>
            <Height sx={{ transform: "rotate(90deg)" }} /> {data.width} cm
          </span>
          <span>
            <GridView /> {data.count}
          </span>
        </InfoInside>
        <Total>
          Razem:{" "}
          <b>
            {parseFloat(
              (data.heigth * data.width * data.count) / 10000
            ).toFixed(digitsAfterDot || 2)}{" "}
            m<sup>2</sup>
          </b>
        </Total>
      </Info>
      <Menu>
        <Fab
          size="small"
          color="primary"
          aria-label="edit"
          sx={{ zIndex: 1 }}
          onClick={() => setOpenedEditor(!openedEditor)}
        >
          <Edit />
        </Fab>
        <Fab
          size="small"
          color="secondary"
          aria-label="delete"
          sx={{ zIndex: 1 }}
          onClick={() => {
            if (window.confirm("Czy chcesz usunąć ten wpis?") === true) {
              handleDeleteRecord({ id: data._id });
            }
          }}
        >
          <DeleteForever />
        </Fab>
      </Menu>
      {openedEditor === true && (
        <Editor
          onSubmit={(e) => {
            e.preventDefault();
            handleEditRecord({
              id: data._id,
              heigth: heigthRef.current.value,
              width: widthRef.current.value,
              count: countRef.current.value,
            });
          }}
        >
          <TextField
            id="filled-basic"
            label="Długość..."
            variant="outlined"
            type="number"
            inputRef={heigthRef}
            value={inputHeigth}
            onChange={() => setInputHeigth(heigthRef.current.value)}
            sx={{ width: "120px;" }}
            InputProps={{
              endAdornment: <Height />,
            }}
          />
          <TextField
            id="filled-basic"
            label="Szerokość..."
            variant="outlined"
            type="number"
            inputRef={widthRef}
            value={inputWidth}
            onChange={() => setInputWidth(widthRef.current.value)}
            sx={{ width: "120px;" }}
            InputProps={{
              endAdornment: <Height sx={{ transform: "rotate(90deg);" }} />,
            }}
          />
          <TextField
            id="filled-basic"
            label="Ilość..."
            variant="outlined"
            type="number"
            inputRef={countRef}
            value={inputCount}
            onChange={() => setInputCount(countRef.current.value)}
            sx={{ width: "120px;" }}
            InputProps={{
              endAdornment: <GridView />,
            }}
          />
          <Button variant="contained" color="primary" type="submit">
            Edytuj
          </Button>
        </Editor>
      )}
    </>
  );
};

export default Record;
