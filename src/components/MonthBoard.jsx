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

const MonthBoard = ({ date, records, setDate, digitsAfterDot }) => {
  let result = [];

  for (let i = 1; i < 32; i++) {
    let currentDay = i.toString();
    if (currentDay.length === 1) currentDay = "0" + currentDay;

    let findResult = [];
    records.map(
      (el) =>
        el.day === date.fulldate.slice(0, 7) + "-" + currentDay &&
        findResult.push(el)
    );

    if (findResult.length > 0) {
      let mathCount = 0;

      findResult.map(
        (el) =>
          (mathCount =
            mathCount + parseFloat((el.width * el.heigth * el.count) / 10000))
      );

      result.push({
        day: date.fulldate.slice(0, 7) + "-" + currentDay,
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
            onClick={() =>
              setDate({ type: config.RDX_SETFULLDATE, payload: el.day })
            }
          >
            <FileOpen />
          </Fab>
        </RecordBox>
      ))}
    </>
  );
};

export default MonthBoard;
