import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import TaskContext from "../context/TaskContext";
import { useContext } from "react";
import styled from "@emotion/styled";
import theme from "../theme/theme";

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 18rem;
    min-width: 18rem;
    height: 100%;
    color: ${theme.getColor('black', 0.6)};
    background-color: ${theme.getColor('olive', 0.3)};
    padding: 0.5rem;
    border-radius: 0.5rem;
`;

const DroppableArea = styled.div`
    height: calc(100% - 2rem); // Subtracting the approximate height of the title
    padding: 0.5rem;
    width: 100%;
`;

const Column = ({ id, title }) => {
    const { tasks, updateTask, deleteTask } = useContext(TaskContext);

    const handleEditTask = (taskId) => {
        const task = tasks.find(task => task.id === taskId);
        if (!task) return;

        const newTitle = prompt('Digite o novo título da tarefa', task.title);
        const newDescription = prompt('Digite a nova descrição da tarefa', task.description);

        if (newTitle && newDescription) {
            updateTask(taskId, { title: newTitle, description: newDescription });
        }
    }

    const handleDeleteTask = (taskId) => {
        if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
            deleteTask(taskId);
        }
    }

    const filteredTasks = tasks.filter((task) => task.status === id);

    return (
        <ColumnContainer>
            <h2>{title}</h2>
            <Droppable droppableId={id} type="task" direction="vertical">
                {(provided, snapshot) => (
                    <DroppableArea
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}
                    >
                        {filteredTasks.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                id={task.id.toString()}
                                index={index}
                                content={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask} />
                        ))}
                        {provided.placeholder}
                    </DroppableArea>
                )}
            </Droppable>
        </ColumnContainer>
    )
}

export default Column;