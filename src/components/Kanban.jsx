import { DragDropContext } from "react-beautiful-dnd"; // Biblioteca para arrastar e soltar itens
import Column from "./Column"; // Componente de coluna Kanban
import TaskContext from "../context/TaskContext"; // Contexto que gerencia as tarefas
import { useContext } from "react"; // Hook para usar o contexto
import styled from "@emotion/styled"; // Biblioteca para estilizar componentes
import theme from "../theme/theme"; // Arquivo de tema para cores e estilos
import { v4 as uuidv4 } from 'uuid'; // Gera IDs únicos
import Chart from "./Chart"; // Componente de gráfico

// Estilização do container principal do Kanban
const KanbanContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    min-width: 52rem;
    height: 100vh;
    background-color: ${theme.getColor('background')};

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        min-width: 100%;
    }
`;

// Estilização da barra de navegação (header) do Kanban
const Nav = styled.nav`
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-width: 52rem;
    height: 3.375rem;
    padding: 0 1.5rem;
    background-color: white;
    color: ${theme.getColor('black', 0.6)};
    border-bottom: 1px solid ${theme.getColor('lightGreen')};

    h1 {
        font-size: 2rem;
        font-weight: 700;
    }

    img {
        height: 2.5rem;
    }

    button {
        background-color: ${theme.getColor('olive')};
        color: white;
        border: none;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        cursor: pointer;

        :hover {
            background-color: ${theme.getColor('olive', 0.85)};
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        min-width: 100%;
        padding-bottom: 8rem;
        h1 {
            font-size: 1.5rem;
            margin-up: 2rem;
        }
        img {
            height: 2rem;
        }
        button {
            padding: 0.4rem 0.8rem;
        }
    }
`;

// Container principal que organiza as colunas e o gráfico
const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    min-width: 52rem;
    height: calc(100% - 3.375rem);
    padding: 2rem;
    gap: 1.5rem;
    overflow-y: auto;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        padding-top: 8rem;
        gap: 1rem;
        min-width: 100%;
    }
`;

// Container das colunas do Kanban
const ColumnsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 1.5rem;
    flex: 1;
    min-width: 52rem;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
        min-width: 100%;
    }
`;

// Container do gráfico
const ChartContainer = styled.div`
    flex: 1;
    min-width: 300px;
    max-width: 500px;
    color: ${theme.getColor('black', 0.6)};

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        min-width: 100%;
        max-width: 100%;
    }
`;

// Componente Kanban principal
const Kanban = () => {
    const { onDragEnd, addTask, tasks } = useContext(TaskContext); // Usa o contexto das tarefas

    // Função para adicionar uma nova tarefa
    const handleAddTask = () => {
        const newTask = {
            id: uuidv4(), // Gera um ID único para a nova tarefa
            title: 'Nova tarefa',
            description: 'Descrição da nova tarefa',
            status: 'pending', // Define a tarefa como pendente
        }
        addTask(newTask); // Chama a função para adicionar a tarefa no contexto
    }

    // Função para contar o número de tarefas por status
    const getTaskCount = (status) => {
        return tasks.filter(task => task.status === status).length;
    }

    // JSX que define a estrutura do Kanban
    return (
        <KanbanContainer>
            <Nav>
                <img src="cotefacil.png" alt="Cotefacil logo" /> {/* Logo */}
                <h1>Dashboard de Tarefas</h1> {/* Título */}
                <button onClick={handleAddTask}>Adicionar tarefa</button> {/* Botão para adicionar tarefa */}
            </Nav>

            {/* DragDropContext envolve o sistema de colunas para arrastar e soltar */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    <ColumnsContainer>
                        <Column id="pending" title={`Pendente (${getTaskCount('pending')})`} /> {/* Coluna de tarefas pendentes */}
                        <Column id="in_progress" title={`Em progresso (${getTaskCount('in_progress')})`} /> {/* Coluna de tarefas em progresso */}
                        <Column id="completed" title={`Concluída (${getTaskCount('completed')})`} /> {/* Coluna de tarefas concluídas */}
                    </ColumnsContainer>
                    <ChartContainer>
                        <Chart /> {/* Componente de gráfico */}
                    </ChartContainer>
                </Container>
            </DragDropContext>
        </KanbanContainer>
    )
}

export default Kanban; // Exporta o componente para uso em outros arquivos