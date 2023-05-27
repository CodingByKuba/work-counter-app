import { Backdrop, TextField, Fab, Button, CircularProgress, Alert, Drawer, Chip } from "@mui/material"
import { Close, Assistant, EmergencyRecordingSharp } from "@mui/icons-material"
import { useRef, useEffect, useState, useReducer } from "react"
import loadingReducer from "../reducers/loadingReducer"
import config from "../config"
import axios from "axios"
import { Height, GridView } from "@mui/icons-material"
import styled from "styled-components"
import { getToday } from "../utils/getToday"

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const SuggestionButtonOpen = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
`

const DrawerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
`

const DrawerOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
`

const Add = ({ setDate, date, setAddBoxOpen, addBoxOpen, loginToken, setRecords, records, maxSuggestions }) => {
  const dateRef = useRef(null)
  const widthRef = useRef(null)
  const heigthRef = useRef(null)
  const countRef = useRef(null)

  const [inputDate, setInputDate] = useState(undefined)
  const [inputWidth, setInputWidth] = useState(undefined)
  const [inputHeigth, setInputHeigth] = useState(undefined)
  const [inputCount, setInputCount] = useState(undefined)

  const [suggestionsBox, setSuggestionsBox] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  const [isPending, setIsPending] = useReducer(loadingReducer, {
    error: null,
    success: null,
    loading: false
  })

  useEffect(() => {
    addBoxOpen === true && heigthRef.current.focus()
    if(date.fulldate === null) {
      /*let now = new Date()

      let month = now.getMonth()+1
      month = month.toString()
      month = month.length === 1 ? "0" + month.toString() : month

      let day = now.getDate()
      day = day.toString()
      day = day.length === 1 ? "0" + day.toString() : day*/
      let now = getToday()

      addBoxOpen === true && setDate({ type: config.RDX_SETFULLDATE, payload: now })
      setInputDate(now)
      return
    }
    if(date.fulldate.length === 10) setInputDate(date.fulldate)
  }, [date.fulldate, addBoxOpen])

  useEffect(() => {
    setInputWidth('')
    setInputHeigth('')
    setInputCount('')
    heigthRef.current.focus()

    let timeout = setTimeout(() => {
      setIsPending({ type: "DEFAULT"})
    },1000)

    return () => clearTimeout(timeout)
  }, [isPending.success])

  useEffect(() => {
    handleSetSuggestions()
  }, [records, maxSuggestions])

  const handleAddRecord = () => {
    axios.post(config.BASE_URL + config.ROUTE_DATA, {
      token: loginToken,
      width: inputWidth,
      heigth: inputHeigth,
      count: inputCount,
      day: inputDate
    })
    .then((response) => {
      if(response.data.error) return setIsPending({ type: config.RDX_ERROR, payload: response.data.error})
      setIsPending({ type: config.RDX_SUCCESS, payload: "Dodano wpis"})
      setRecords(prevRecords => [...prevRecords, response.data])
    })
    .catch((error) => {
      setIsPending({ type: config.RDX_ERROR, payload: error.message})
    })
  }

  const handleSetSuggestions = () => {
    setSuggestions([])
    if(!records) return
    let countMax = maxSuggestions || 15
    let shuffledRecords = Array.from(records).sort(() => Math.random() - 0.5)

    for(let i = 0; i < countMax; i++) {
      if(!shuffledRecords[i]) return
      setSuggestions(prevSuggestions => 
        [...prevSuggestions, shuffledRecords[i]])
    }
  }

  return (
    <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={addBoxOpen}>
      <Wrap>
        {isPending.loading === true && <CircularProgress/>}
        {isPending.error !== null && <Alert severity="error"
        onClick={() => setIsPending({ type: "DEFAULT"})}>{isPending.error}</Alert>}
        {isPending.success !== null && <Alert severity="success"
        onClick={() => setIsPending({ type: "DEFAULT"})}>{isPending.success}</Alert>}
        <Fab color="secondary" aria-label="close-add" onClick={() => setAddBoxOpen(false)}>
          <Close/>
        </Fab>
      <Form onSubmit={(e) => {
        e.preventDefault()
        handleAddRecord()
      }}>
      <TextField id="filled-basic" label="Długość..." variant="outlined" type="number" 
      inputRef={heigthRef} value={inputHeigth} onChange={() => setInputHeigth(heigthRef.current.value)} 
      InputProps={{
        endAdornment: <Height/>,
      }}/>
      <TextField id="filled-basic" label="Szerokość..." variant="outlined" type="number" 
      inputRef={widthRef} value={inputWidth} onChange={() => setInputWidth(widthRef.current.value)} 
      InputProps={{
        endAdornment: <Height sx={{ transform: "rotate(90deg);"}}/>,
      }}/>
      <TextField id="filled-basic" label="Ilość..." variant="outlined" type="number" 
      inputRef={countRef} value={inputCount} onChange={() => setInputCount(countRef.current.value)}
      InputProps={{
        endAdornment: <GridView/>,
      }}/>
      <TextField id="filled-basic" variant="filled" type="date" inputRef={dateRef} 
      value={inputDate} onChange={() => {
        setDate({ type: config.RDX_SETFULLDATE, payload: dateRef.current.value })
        setInputDate(dateRef.current.value)
      }} inputProps={{
        max: getToday()
      }} />
      <Button variant="contained" color="primary" type="submit">Dodaj</Button>
      </Form>
      <SuggestionButtonOpen>
        <Fab color="primary" aria-label="suggest-open" onClick={() => setSuggestionsBox(true)}>
          <Assistant/>
        </Fab>
      </SuggestionButtonOpen>
      <Drawer
        anchor="bottom"
        open={suggestionsBox}>
          <DrawerContent>
            <Fab color="secondary" aria-label="close-add" onClick={() => setSuggestionsBox(false)}>
              <Close/>
            </Fab>
            <DrawerOptions>
              {suggestions.length > 0 && suggestions.map((el, index) => 
              <Chip key={index} label={`${el.heigth} x ${el.width}`} variant="outlined" 
              onClick={() => {
                setSuggestionsBox(false)
                setInputHeigth(el.heigth)
                setInputWidth(el.width)
                countRef.current.focus()
              }}/>  )}
            </DrawerOptions>
          </DrawerContent>
      </Drawer>
      </Wrap>
    </Backdrop>
  )
}

export default Add