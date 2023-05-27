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

const YearBoard = ({ date, records, setDate, digitsAfterDot }) => {
  let result = [];

  for (let i = 1; i < 13; i++) {
    let currentMonth = i.toString();
    if (currentMonth.length === 1) currentMonth = "0" + currentMonth;

    let findResult = [];
    records.map(
      (el) =>
        el.day.includes(date.fulldate.slice(0, 4) + "-" + currentMonth) &&
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
        day: date.fulldate.slice(0, 4) + "-" + currentMonth,
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
                type: config.RDX_SETMONTH,
                payload: el.day.slice(5, 7),
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

export default YearBoard;
