import { createContext, useState } from 'react';
import tasksMocked from '../data/database.json';

const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(tasksMocked);

    const addTask = (task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const updateTask = (id, updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) return;

        if (source.droppableId !== destination.droppableId) {
            const sourceTasks = tasks.filter(task => task.status === source.droppableId);
            const destTasks = tasks.filter(task => task.status === destination.droppableId);
            const [movedTask] = sourceTasks.splice(source.index, 1);
            movedTask.status = destination.droppableId;
            destTasks.splice(destination.index, 0, movedTask);

            setTasks(prevTasks => [
                ...prevTasks.filter(task => task.status !== source.droppableId && task.status !== destination.droppableId),
                ...sourceTasks,
                ...destTasks
            ]);
        } else {
            const columnTasks = tasks.filter(task => task.status === source.droppableId);
            const [movedTask] = columnTasks.splice(source.index, 1);
            columnTasks.splice(destination.index, 0, movedTask);

            setTasks(prevTasks => [
                ...prevTasks.filter(task => task.status !== source.droppableId),
                ...columnTasks
            ]);
        }
    };

    const value = {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        onDragEnd
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;