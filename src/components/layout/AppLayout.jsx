import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'

const AppLayout = () => {
  return (
    <div>
        <Box sx={{
            display: 'flex'
        }}>
            <Sidebar />
            <Box sx={{
                p:8,
                flexGrow: 1,
                width: 'max-content',
            }}>
                <Outlet/>
            </Box>
        </Box>
    </div>
  )
}

export default AppLayout