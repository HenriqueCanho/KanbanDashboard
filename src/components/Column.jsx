import { Droppable } from "react-beautiful-dnd"; // Importa o componente Droppable, responsável por definir áreas onde os itens podem ser arrastados
import TaskCard from "./TaskCard"; // Importa o componente TaskCard, que exibe as informações de cada tarefa
import TaskContext from "../context/TaskContext"; // Importa o contexto das tarefas para acessar e manipular os dados
import { useContext } from "react"; // Importa o hook useContext para utilizar o TaskContext
import styled from "@emotion/styled"; // Importa a biblioteca styled para criar componentes estilizados
import theme from "../theme/theme"; // Importa o tema para aplicar cores e estilos globais

// Define o container da coluna do Kanban
const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column; // Organiza os itens em uma coluna
    align-items: center;
    justify-content: flex-start; // Alinha os itens ao topo da coluna
    width: 18rem; // Largura da coluna
    min-width: 18rem; // Largura mínima
    height: 100%; // Ocupa toda a altura disponível
    color: ${theme.getColor('black', 0.6)}; // Cor do texto definida pelo tema
    background-color: ${theme.getColor('olive', 0.3)}; // Cor de fundo definida pelo tema
    padding: 0.5rem; // Espaçamento interno da coluna
    border-radius: 0.5rem; // Borda arredondada
`;

// Define a área onde as tarefas podem ser soltas (Droppable)
const DroppableArea = styled.div`
    height: calc(100% - 2rem); // Define a altura da área, subtraindo o espaço do título
    padding: 0.5rem; // Adiciona espaçamento interno
    width: 100%; // A área ocupa toda a largura da coluna
`;

// Componente Column que exibe uma coluna de tarefas
const Column = ({ id, title }) => {
    const { tasks, updateTask, deleteTask } = useContext(TaskContext); // Usa o contexto das tarefas para acessar e manipular tarefas

    // Função para editar uma tarefa, solicitando novo título e descrição
    const handleEditTask = (taskId) => {
        const task = tasks.find(task => task.id === taskId); // Encontra a tarefa pelo ID
        if (!task) return;

        const newTitle = prompt('Digite o novo título da tarefa', task.title); // Solicita o novo título ao usuário
        const newDescription = prompt('Digite a nova descrição da tarefa', task.description); // Solicita a nova descrição

        // Se o usuário forneceu ambos, atualiza a tarefa
        if (newTitle && newDescription) {
            updateTask(taskId, { title: newTitle, description: newDescription }); // Atualiza a tarefa no contexto
        }
    }

    // Função para deletar uma tarefa, confirmando a ação com o usuário
    const handleDeleteTask = (taskId) => {
        if (confirm('Tem certeza que deseja deletar esta tarefa?')) { // Pergunta ao usuário se ele deseja deletar
            deleteTask(taskId); // Deleta a tarefa se confirmado
        }
    }

    // Filtra as tarefas pelo status (coluna em que a tarefa está, como "pendente", "em progresso", etc.)
    const filteredTasks = tasks.filter((task) => task.status === id);

    return (
        <ColumnContainer>
            <h2>{title}</h2> {/* Exibe o título da coluna */}
            <Droppable droppableId={id} type="task" direction="vertical">
                {/* Define a área "droppable" onde as tarefas podem ser soltas */}
                {(provided, snapshot) => (
                    <DroppableArea
                        ref={provided.innerRef} // Referência para o DOM que habilita a área droppable
                        isDraggingOver={snapshot.isDraggingOver} // Aplica estilo quando a área está sendo sobreposta por uma tarefa arrastada
                        {...provided.droppableProps} // Passa as propriedades necessárias para a área droppable
                    >
                        {/* Mapeia e exibe as tarefas filtradas */}
                        {filteredTasks.map((task, index) => (
                            <TaskCard
                                key={task.id} // Define uma chave única para cada tarefa
                                id={task.id.toString()} // Passa o ID da tarefa
                                index={index} // Passa o índice da tarefa para o DnD
                                content={task} // Passa os dados da tarefa para o componente TaskCard
                                onEdit={handleEditTask} // Passa a função de editar tarefa
                                onDelete={handleDeleteTask} // Passa a função de deletar tarefa
                            />
                        ))}
                        {provided.placeholder} {/* Mantém espaço para tarefas durante a movimentação */}
                    </DroppableArea>
                )}
            </Droppable>
        </ColumnContainer>
    )
}

export default Column; // Exporta o componente Column para ser usado em outros arquivos