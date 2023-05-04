import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import assets from '../assets';
import EditIcon from '@mui/icons-material/Edit';
import ModalForm from './ModalForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 300,
      padding: '20px',
    },
  },
}));

const TableTicket = ({rows}) =>  {
    const [filterStatus, setFilterStatus] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState();

    const handleClose = () => {
      setOpen(false);
    };
    const columns = [
      { field: 'title', headerName: 'Title', width: 130, sortable: false, },
      { field: 'description', headerName: 'Description', width: 300, sortable: false, },
      { field: 'updatedAt', headerName: 'Updated At', width: 200 },
      { field: 'status', headerName: 'Status', sortable: false, 
        renderCell: (params) => (
          <span style={{
              color: 'white',
              backgroundColor: assets.colors[params.value.toLowerCase()],
              borderRadius: '10px',
              padding: '0.4rem 0.6rem',
             }}>
            {params.value}
          </span>
        ),
      },
      {
        field: 'edit',
        headerName: 'Edit',
        sortable: false,
        width: 30,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
              <button 
                style={{
                  border: 'none',
                }}
                onClick={() => 
                  {
                    setOpen(true) 
                    setId(params.id)
                  }
                }>
                  <EditIcon />
              </button>
          );
        },
      },
    ];
    const handleFilterChange = (event) => {
      setFilterStatus(event.target.value);
    };

    const classes = useStyles();
    const tickets = rows
    .filter(row => !filterStatus || row.status.includes(filterStatus))
    .map((row) => {
      return {
        ...row,
        id: row._id,
        updatedAt: format(new Date(row.updatedAt), 'dd/MM/yyyy HH:mm')
      }
  })

    
  return (
    <div className={classes.root}>
      <TextField
        label="Filter by Status"
        value={filterStatus}
        onChange={handleFilterChange}
        size='small'
        sx={{pb: 1}}
      />
      <DataGrid
        rows={tickets}
        columns={columns}
        paginationModel={{ page: 0, pageSize: 10 }}
        disableRowSelectionOnClick
        disableColumnMenu
      />
      <ModalForm open={open} handleClose={handleClose} id={id} editMode={true}/>
    </div>
  );
}

export default TableTicket

