import {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { TextField, FormControl, Select, MenuItem, Button, DialogTitle, DialogContent, Dialog, Grid, FormLabel, FormHelperText } from '@mui/material';
import ticketApi from '../api/ticketApi';
import { useDispatch } from 'react-redux'
import { addTicket, updateTicket } from '../redux/slice/ticketSlice'
import { useSelector } from 'react-redux';

const options = [
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' }
];


const ModalForm = ({open, handleClose, id, editMode}) => {
    const [formValues, setFormValues] = useState({});
    const tickets = useSelector((state) => state.ticket)
    const initValue = tickets.find(ticket => ticket._id === id )
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
          title: initValue?.title || '',
          description: initValue?.description || '',
          contact: initValue?.contact || '',
          information: initValue?.information || '',
          status: initValue?.status || ''
        }
      });
    const dispatch = useDispatch()
    const onSubmit = async(data) => {
        if (editMode) {
            const res = await ticketApi.updateTicket(id, data)
            dispatch(updateTicket(res))
        } else {
            const res = await ticketApi.createTicket(data)
            dispatch(addTicket(res))
        }
        reset()
        handleClose()
    };

    useEffect(() => {
        const initValue = tickets.find(ticket => ticket._id === id);
        setFormValues(initValue || {});
    }, [id, tickets]);

    useEffect(() => {
        reset(formValues);
      }, [formValues, reset]);


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Ticket 🚀</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal" size='small'>
                                <TextField
                                    {...register("title", {required: true})}
                                    error={Boolean(errors.title)}
                                    label="Title"
                                    name="title"
                                    size="small"
                                    helperText={errors.title && 'Title is required'}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    {...register("description")}
                                    label="Description"
                                    multiline
                                    rows={4}
                                    name="description"
                                    size="small"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    {...register("contact")}
                                    label="Contact"
                                    name="contact"
                                    size="small"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    {...register("information")}
                                    label="Information"
                                    name="information"
                                    size="small"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <FormLabel>Status</FormLabel>
                                <Select
                                    {...register("status", {required: true})}
                                    error={Boolean(errors.status)}
                                    labelId="status"
                                    id="status"
                                    name="status"
                                    placeholder="Select an option"
                                    size="small"
                                    defaultValue={initValue?.status || ''} 
                                >
                                    
                                {options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                                </Select>
                                {errors.status && <FormHelperText sx={{color: "#d32f2f"}}>Status is required</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {editMode ? <>Save</> : <>Submit</>}
                            </Button>
                        </Grid>
                    </Grid>
                </form>           
            </DialogContent>
           
        </Dialog>
    )
}

export default ModalForm