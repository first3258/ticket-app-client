import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { useState } from 'react'
import { Container } from '@mui/material'
import ticketApi from '../api/ticketApi'
import { setTickets } from '../redux/slice/ticketSlice'
import { useDispatch, useSelector } from 'react-redux'
import TableTicket from '../components/TableTicket'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const tickets = useSelector((state) => state.ticket)
  const dispatch = useDispatch()

  useEffect(() => {
    const getTickets = async () => {
      try {
        const res = await ticketApi.findAllTicket()
        dispatch(setTickets(res))
        setLoading(false)
      }catch(err) {
        console.log(err)
      }
    }
    getTickets()
  }, [])
  return (
    loading ? (
      <Loading fullHeight/>
    ) : 
    <Container component='main' >
      <TableTicket rows={tickets} />
    </Container>
  )
}

export default Home

