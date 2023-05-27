import styled from "styled-components";
import { parseTitle } from "../utils/parseTitle";
import { Fab } from "@mui/material";
import { FileOpen } from "@mui/icons-material";
import config from "../config";

const RecordBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  color: black;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const TitleBox = styled.div`
  width: 70%;
  padding-left: 15px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-shadow: 3px 3px 2px gray;
`;

const MainBoard = ({ records, setDate, digitsAfterDot }) => {
  let result = [];
  let date = new Date();

  for (let i = 2021; i < date.getFullYear() + 1; i++) {
    let currentYear = i.toString();

    let findResult = [];
    records.map((el) => el.day.includes(currentYear) && findResult.push(el));

    if (findResult.length > 0) {
      let mathCount = 0;

      findResult.map(
        (el) =>
          (mathCount =
            mathCount + parseFloat((el.width * el.heigth * el.count) / 10000))
      );

      result.push({
        day: currentYear,
        count: findResult.length,
        mathCount: mathCount,
      });
    }
  }

  return (
    <>
      {result.map((el) => (
        <RecordBox key={el.day}>
          <TitleBox>
            <Title>{parseTitle(el.day)}</Title>
            <br />
            Ilość wpisów: <b>{el.count}</b> | Razem:{" "}
            <b>{el.mathCount.toFixed(digitsAfterDot || 2)}</b> m<sup>2</sup>
          </TitleBox>
          <Fab
            color="primary"
            aria-label="add"
            sx={{ marginRight: "15px", zIndex: "1" }}
            onClick={() => {
              setDate({
                type: config.RDX_SETYEAR,
                payload: el.day.slice(0, 4),
              });
            }}
          >
            <FileOpen />
          </Fab>
        </RecordBox>
      ))}
    </>
  );
};

export default MainBoard;
