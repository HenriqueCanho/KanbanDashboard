import { createContext, useState } from 'react'; // Importa funções para criar o contexto e usar estados.
import tasksMocked from '../data/database.json'; // Importa os dados iniciais das tarefas de um arquivo JSON simulado.

const TaskContext = createContext({}); // Cria o contexto, que será usado para compartilhar o estado entre componentes.

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(tasksMocked); // Define o estado inicial das tarefas com os dados do arquivo JSON.

    // Função para adicionar uma nova tarefa à lista.
    const addTask = (task) => {
        setTasks((prevTasks) => [...prevTasks, task]); // Adiciona a nova tarefa ao final do array de tarefas.
    };

    // Função para atualizar uma tarefa existente com base no ID.
    const updateTask = (id, updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task // Se o ID da tarefa coincidir, faz o update, caso contrário, mantém a tarefa.
            )
        );
    };

    // Função para deletar uma tarefa com base no ID.
    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Remove a tarefa cujo ID corresponde ao passado como parâmetro.
    };

    // Função que lida com o fim do arraste de uma tarefa.
    const onDragEnd = (result) => {
        const { destination, source } = result; // Extrai o destino e a origem do arraste.

        if (!destination) return; // Se não houver destino (ex. fora de uma lista), cancela a operação.

        // Caso o item seja movido entre colunas diferentes.
        if (source.droppableId !== destination.droppableId) {
            const sourceTasks = tasks.filter(task => task.status === source.droppableId); // Filtra as tarefas da coluna de origem.
            const destTasks = tasks.filter(task => task.status === destination.droppableId); // Filtra as tarefas da coluna de destino.
            const [movedTask] = sourceTasks.splice(source.index, 1); // Remove a tarefa arrastada da origem.
            movedTask.status = destination.droppableId; // Atualiza o status da tarefa para o da nova coluna.
            destTasks.splice(destination.index, 0, movedTask); // Insere a tarefa na posição correta da coluna de destino.

            // Atualiza o estado das tarefas após o movimento entre colunas.
            setTasks(prevTasks => [
                ...prevTasks.filter(task => task.status !== source.droppableId && task.status !== destination.droppableId), // Remove as tarefas antigas das colunas de origem e destino.
                ...sourceTasks, // Atualiza as tarefas na coluna de origem.
                ...destTasks // Atualiza as tarefas na coluna de destino.
            ]);
        } else {
            // Se o item foi movido dentro da mesma coluna.
            const columnTasks = tasks.filter(task => task.status === source.droppableId); // Filtra as tarefas da coluna de origem.
            const [movedTask] = columnTasks.splice(source.index, 1); // Remove a tarefa da posição de origem.
            columnTasks.splice(destination.index, 0, movedTask); // Insere a tarefa na nova posição dentro da mesma coluna.

            // Atualiza o estado das tarefas apenas para a coluna modificada.
            setTasks(prevTasks => [
                ...prevTasks.filter(task => task.status !== source.droppableId), // Remove as tarefas antigas da coluna de origem.
                ...columnTasks // Atualiza as tarefas na coluna.
            ]);
        }
    };

    // Define os valores e funções que serão fornecidos pelo contexto.
    const value = {
        tasks, // O estado das tarefas.
        addTask, // Função para adicionar tarefas.
        updateTask, // Função para atualizar tarefas.
        deleteTask, // Função para deletar tarefas.
        onDragEnd // Função para lidar com o fim do arraste.
    };

    // O TaskProvider envolve os componentes filhos e fornece o contexto de tarefas a eles.
    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext; // Exporta o contexto para ser usado em outros componentes.