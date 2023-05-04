import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';


const Column = ({ column, tasks }) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
                    {
                        (provided, snapshot) => {
                            return <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {
                                    tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)
                                }
                                {provided.placeholder}
                            </TaskList>
                        }
                    }
                </Droppable>
    </Container>
  );
};

export default Column;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#fff')};
  flex-grow: 1;
  min-height: 100px;
  width: 250px;
`;