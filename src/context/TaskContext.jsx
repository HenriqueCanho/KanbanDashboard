import { createContext, useState } from 'react';
// Importa as funções createContext e useState do React para criar um contexto e gerenciar o estado.

import tasksMocked from '../data/database.json';
// Importa um conjunto de tarefas mockadas de um arquivo JSON.

const TaskContext = createContext({});
// Cria um contexto vazio para gerenciar tarefas.

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(tasksMocked);
    // Define o estado das tarefas, inicializando com os dados mockados.

    const addTask = (task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };
    // Função para adicionar uma nova tarefa ao estado.

    const updateTask = (id, updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task
            )
        );
    };
    // Função para atualizar uma tarefa existente com base no ID.

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };
    // Função para deletar uma tarefa com base no ID.

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) return;
        // Se não houver um destino definido, encerra a função.

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
            // Lida com a movimentação de tarefas entre colunas.
        } else {
            const columnTasks = tasks.filter(task => task.status === source.droppableId);
            const [movedTask] = columnTasks.splice(source.index, 1);
            columnTasks.splice(destination.index, 0, movedTask);

            setTasks(prevTasks => [
                ...prevTasks.filter(task => task.status !== source.droppableId),
                ...columnTasks
            ]);
            // Lida com a movimentação de tarefas dentro da mesma coluna.
        }
    };

    const value = {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        onDragEnd
    };
    // Define o valor que será fornecido pelo contexto, incluindo tarefas e funções de manipulação.

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
// Retorna o provider do contexto com o valor definido e envolve os filhos.

export default TaskContext;
// Exporta o contexto para que outros componentes possam usá-lo.