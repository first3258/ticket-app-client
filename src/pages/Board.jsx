import React, { useEffect, useState } from 'react'
import Column from '../components/Board/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux'
import ticketApi from '../api/ticketApi';
import { setTickets, updateTicket } from '../redux/slice/ticketSlice';
import styled from 'styled-components';
import Loading from '../components/Loading';

const Board = () => {
  const mapStatus = new Map();
  mapStatus.set('column-1', 'pending');
  mapStatus.set('column-2', 'accepted');
  mapStatus.set('column-3', 'resolved');
  mapStatus.set('column-4', 'rejected');

  const dispatch = useDispatch()
  const [state, setState] = useState()

  useEffect(() => {
    const getTickets = async () => {
      try {
        const res = await ticketApi.findAllTicket()
        await dispatch(setTickets(res))
        setState({
          columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
          tasks: Object.values(res).reduce((acc, ticket) => {
            acc[ticket._id] = {
              ...ticket,
              id: ticket._id
            };
            return acc;
          }, {}),
          columns: {
            'column-1': {
              id: 'column-1',
              title: '😁 Pending',
              taskIds: res.filter(res => res.status === 'pending').map(res => res._id),
            },
            'column-2': {
              id: 'column-2',
              title: '😆 Accepted',
              taskIds: res.filter(res => res.status === 'accepted').map(res => res._id),
            },
            'column-3': {
              id: 'column-3',
              title: '😅 Resolved',
              taskIds: res.filter(res => res.status === 'resolved').map(res => res._id),
            },
            'column-4': {
              id: 'column-4',
              title: '😂 Rejected',
              taskIds: res.filter(res => res.status === 'rejected').map(res => res._id),
            },
          }
        })
        console.log(state)
      } catch (err) {
        console.log(err)
      }
    }
    getTickets()
  }, [])

  const onDragEnd = async(result) => {
    console.log(result)
    const { destination, source, draggableId } = result
    if(!destination) return

    if(destination.droppableId === source.droppableId && destination.index === source.index) return

    const start = state.columns[source.droppableId]
    const finish = state.columns[destination.droppableId]

    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
  
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      }
  
      setState(newState)
      return
    }

    // Move another column
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }
    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    
    //update to API
    const newStatus = mapStatus.get(destination.droppableId)
    const res = await ticketApi.updateTicket(draggableId, {
      status: newStatus
    })
    dispatch(updateTicket(res))
    setState(newState)

  }

  if (!state) {
    return <Loading fullHeight/>;
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Container>
        {state.columnOrder.map(columnId => {
          const columns = state.columns[columnId]
          const tasks = columns.taskIds.map(taskId => state.tasks[taskId])
          return <Column key={columns.id} column={columns} tasks={tasks} />
        })}
      </Container>
    </DragDropContext>
  );
}

export default Board;

const Container = styled.div`
  display: flex;
`