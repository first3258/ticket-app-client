import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Typography } from '@mui/material';

const Task = ({ task, index }) => {
    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Typography variant='body1' fontWeight={700}>{task.title}</Typography>
            <Description>
              {task.description && <Typography variant="caption" display="block">{task.description}</Typography>}
            </Description>
            {task.contact && <Typography variant="caption" display="block" sx={{color: "#9BA4B5", textAlign:'end'}}>{task.contact}</Typography>}
          </Container>
        )}
      </Draggable>
    );
  };

export default Task;

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : '#fff')};
`;

const Description = styled.div`
  height: 60px;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`
