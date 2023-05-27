import { useReducer, useEffect } from "react"
import styled from "styled-components"
import Record from "./Record"
import axios from "axios"
import config from "../config"
import loadingReducer from "../reducers/loadingReducer";
import { CircularProgress, Alert, Fab } from "@mui/material"
import Add from "@mui/icons-material/Add"
import MonthBoard from "./MonthBoard"
import YearBoard from "./YearBoard"
import MainBoard from './MainBoard'

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
`

const AddButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`

const Records = ({ setRecords, records, date, loginToken, setDate, digitsAfterDot, setAddBoxOpen }) => {
  const [isPending, setIsPending] = useReducer(loadingReducer, {
    success: null,
    error: null,
    loading: false
  })

  useEffect(() => {
    let timeout = setTimeout(() => setIsPending({ type: "DEFAULT" }), 1500)
    return () => clearTimeout(timeout)
  }, [isPending.error, isPending.success])

  const handleEditRecord = (data) => {
    setIsPending({ type: config.RDX_LOADING })
    axios.put(config.BASE_URL + config.ROUTE_DATA, {
      token: loginToken,
      id: data.id || '',
      width: data.width || '',
      heigth: data.heigth || '',
      count: data.count || ''
    })
    .then((response) => {
      if(response.data.error) return setIsPending({ type: config.RDX_ERROR, payload: response.data.error })
        let current = records.findIndex(el => el._id === response.data._id)
        if (current === -1) return
        let newRecords = Array.from(records)
        newRecords[current] = response.data
        setRecords(newRecords)
        setIsPending({ type: config.RDX_SUCCESS, payload: "Edytowano wpis" })
    })
    .catch((error) => {
      setIsPending({ type: config.RDX_ERROR, payload: error.message })
    })
  }

  const handleDeleteRecord = (data) => {
    setIsPending({ type: config.RDX_LOADING })
    axios.delete(config.BASE_URL + config.ROUTE_DATA, { data: {
      token: loginToken,
      id: data.id || ''
    }})
    .then((response) => {
      if(response.data.error) return setIsPending({ type: config.RDX_ERROR, payload: response.data.error })
        let newRecords = Array.from(records)
        newRecords = newRecords.filter(el => el._id !== data.id)
        setRecords(newRecords)
        setIsPending({ type: config.RDX_SUCCESS, payload: "Usunięto wpis" })
    })
    .catch((error) => {
      setIsPending({ type: config.RDX_ERROR, payload: error.message })
    })
  }

  return (
    <div>
      {isPending.loading === true && <CircularProgress/>}
      {isPending.error !== null && <Alert severity="error"
      >{isPending.error}</Alert>}
      {isPending.success !== null && <Alert severity="success"
      >{isPending.success}</Alert>}
      {(date.fulldate !== null && date.fulldate.length === 10) && records.map((el, index) => el.day === date.fulldate && 
      <RecordBox key={index}>
        <Record data={el} handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} digitsAfterDot={digitsAfterDot}/>
      </RecordBox>
      )}
      {(date.fulldate !== null && date.fulldate.length === 10) && 
      <AddButton>
        <Fab color="success" aria-label="add" onClick={() => setAddBoxOpen(true)} 
        sx={{ zIndex: "0"}}>
          <Add/>
        </Fab>
      </AddButton>}
      {(date.fulldate !== null && date.fulldate.length === 7) && 
      <MonthBoard records={records} date={date} setDate={setDate}  digitsAfterDot={digitsAfterDot}/>
      }
      {(date.fulldate !== null && date.fulldate.length === 4) && 
      <YearBoard records={records} date={date} setDate={setDate}  digitsAfterDot={digitsAfterDot}/>
      }
      {(date.fulldate === null) && 
      <MainBoard records={records} date={date} setDate={setDate}  digitsAfterDot={digitsAfterDot}/>
      }
    </div>
  )
}

export default Records