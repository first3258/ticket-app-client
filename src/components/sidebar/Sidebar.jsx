import { Box, Drawer, IconButton, List, ListItem, ListItemButton, Typography, ListItemText } from '@mui/material'
import React from 'react'
import assets from '../../assets'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModalForm from '../ModalForm';

const Sidebar = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <Drawer    
            container={window.document.body}
            variant='permanent'
            open={true}
            sx={{
            width: 250,
            height: '100vh',
            '& > div': { borderRight: 'none' },
            }}
        >
            <List
                disablePadding
                sx={{
                    width: 250,
                    height: '100vh',
                    backgroundColor: assets.colors.navbar
                }}
            >
                <ListItem sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 4,
                    pb: 4
                }}>
                    <Typography variant='body1' fontWeight={700} letterSpacing={4} >
                        TICKET APP
                    </Typography>
                </ListItem>
                <ListItemButton onClick={handleClickOpen}>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant='body1' fontWeight={700} sx={{color: assets.colors.white}}>
                            Create Ticket
                        </Typography>
                        <IconButton sx={{color: assets.colors.navbarText}}>
                            <AddBoxIcon />
                        </IconButton>
                    </Box>
                </ListItemButton>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/">
                        <Typography variant='body1' fontWeight={700} sx={{color: assets.colors.white}}>
                            Home
                        </Typography>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/board">
                        <Typography variant='body1' fontWeight={700} sx={{color: assets.colors.white}}>
                            Board
                        </Typography>
                    </ListItemButton>
                </ListItem>
            </List>
            <ModalForm open={open} handleClose={handleClose} />
        </Drawer>
    )
}

export default Sidebar