import { DragDropContext } from "react-beautiful-dnd"; // Importa o contexto para habilitar a funcionalidade de arrastar e soltar
import Column from "./Column"; // Importa o componente de Coluna, responsável por cada coluna do Kanban
import TaskContext from "../context/TaskContext"; // Importa o contexto das tarefas, onde as informações das tarefas são armazenadas
import { useContext } from "react"; // Importa o hook useContext para usar o contexto de tarefas
import styled from "@emotion/styled"; // Importa o módulo styled da Emotion para estilizar os componentes
import theme from "../theme/theme"; // Importa o arquivo de tema para definir cores e estilos globais
import { v4 as uuidv4 } from 'uuid'; // Importa a biblioteca uuid para gerar IDs únicos para as tarefas
import Chart from "./Chart"; // Importa o componente Chart, que exibe gráficos das tarefas

// Define o container principal do Kanban
const KanbanContainer = styled.div`
    display: flex;
    flex-direction: column; // Coloca os elementos um abaixo do outro
    align-items: center; // Centraliza os elementos no eixo horizontal
    justify-content: flex-start; // Alinha os itens ao topo
    width: 100vw; // Largura total da tela
    min-width: 52rem; // Define a largura mínima do container
    height: 100vh; // Altura total da tela
    background-color: ${theme.getColor('background')}; // Usa a cor de fundo definida no tema

    @media (max-width: 768px) { // Aplica estilos para telas menores que 768px
        flex-direction: column; 
        align-items: center;
        padding: 1rem; // Adiciona padding ao container
        min-width: 100%; // A largura mínima passa a ser 100% da tela
    }
`;

// Estiliza a barra de navegação no topo
const Nav = styled.nav`
    position: sticky; // Mantém o elemento fixo ao rolar a página
    top: 0; // Fixa no topo
    z-index: 1000; // Garante que o nav fique acima de outros elementos
    display: flex;
    flex-direction: row; // Coloca os elementos em linha
    align-items: center;
    justify-content: space-between; // Espaça os elementos da barra de navegação
    width: 100%; 
    min-width: 52rem;
    height: 3.375rem; // Define a altura da barra de navegação
    padding: 0 1.5rem; // Adiciona padding nas laterais
    background-color: white; // Define a cor de fundo branca
    color: ${theme.getColor('black', 0.6)}; // Cor do texto
    border-bottom: 1px solid ${theme.getColor('lightGreen')}; // Adiciona uma borda inferior

    h1 {
        font-size: 2rem; // Tamanho da fonte do título
        font-weight: 700; // Peso da fonte
    }

    img {
        height: 2.5rem; // Define a altura da logo
    }

    button {
        background-color: ${theme.getColor('olive')}; // Define a cor do botão
        color: white; // Cor do texto do botão
        border: none; // Remove a borda
        border-radius: 0.25rem; // Define bordas arredondadas
        padding: 0.5rem 1rem; // Padding interno do botão
        cursor: pointer; // Muda o cursor ao passar sobre o botão

        :hover { // Estilos aplicados quando o botão for "hovered"
            background-color: ${theme.getColor('olive', 0.85)};
        }
    }

    @media (max-width: 768px) { // Estilos para telas menores
        flex-direction: column; // Altera para exibir os elementos em coluna
        align-items: center;
        padding: 2rem;
        min-width: 100%;
        padding-bottom: 8rem;

        h1 {
            font-size: 1.5rem; // Diminui o tamanho da fonte do título
        }

        img {
            height: 2rem; // Reduz a altura da logo
        }

        button {
            padding: 0.4rem 0.8rem; // Ajusta o padding do botão
        }
    }
`;

// Define o container para os elementos principais (colunas e gráfico)
const Container = styled.div`
    display: flex;
    flex-direction: row; // Coloca as colunas lado a lado
    flex-wrap: wrap; // Permite que os itens quebrem linha se necessário
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    min-width: 52rem;
    height: calc(100% - 3.375rem); // Calcula a altura disponível subtraindo a altura do Nav
    padding: 2rem;
    gap: 1.5rem; // Espaçamento entre colunas
    overflow-y: auto; // Adiciona barra de rolagem vertical se necessário

    @media (max-width: 768px) { // Estilos para telas menores
        flex-direction: column; // Altera para exibir os elementos em coluna
        align-items: center;
        padding: 1rem;
        padding-top: 8rem;
        gap: 1rem;
        min-width: 100%;
    }
`;

// Define o container para as colunas do Kanban
const ColumnsContainer = styled.div`
    display: flex;
    flex-direction: row; // Exibe as colunas lado a lado
    align-items: flex-start;
    justify-content: center;
    gap: 1.5rem; // Espaçamento entre as colunas
    flex: 1; // As colunas ocupam todo o espaço disponível
    min-width: 52rem;

    @media (max-width: 768px) { // Para telas menores
        flex-direction: column; // Exibe as colunas uma abaixo da outra
        gap: 1rem;
        min-width: 100%;
    }
`;

// Define o container para o gráfico
const ChartContainer = styled.div`
    flex: 1; // O gráfico ocupa o espaço disponível
    min-width: 300px; // Largura mínima
    max-width: 500px; // Largura máxima
    color: ${theme.getColor('black', 0.6)}; // Cor do texto

    @media (max-width: 768px) { // Estilos para telas menores
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        min-width: 100%;
        max-width: 100%;
    }
`;

// Função principal do componente Kanban
const Kanban = () => {
    const { onDragEnd, addTask, tasks } = useContext(TaskContext); // Usa o contexto de tarefas

    // Função para adicionar uma nova tarefa
    const handleAddTask = () => {
        const newTask = {
            id: uuidv4(), // Gera um ID único para a nova tarefa
            title: 'Nova tarefa', // Título da nova tarefa
            description: 'Descrição da nova tarefa', // Descrição da nova tarefa
            status: 'pending', // Define o status inicial como "pendente"
        }
        addTask(newTask); // Adiciona a tarefa ao contexto
    }

    // Função que retorna o número de tarefas com um status específico
    const getTaskCount = (status) => {
        return tasks.filter(task => task.status === status).length; // Filtra e conta as tarefas pelo status
    }

    return (
        <KanbanContainer>
            {/* Barra de navegação */}
            <Nav>
                <img src="cotefacil.png" alt="Cotefacil logo" /> {/* Exibe a logo */}
                <h1>Dashboard de Tarefas</h1> {/* Exibe o título do dashboard */}
                <button onClick={handleAddTask}>Adicionar tarefa</button> {/* Botão para adicionar uma nova tarefa */}
            </Nav>

            {/* Contexto de arrastar e soltar */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    {/* Colunas do Kanban */}
                    <ColumnsContainer>
                        {/* Coluna de tarefas pendentes */}
                        <Column id="pending" title={`Pendente (${getTaskCount('pending')})`} />
                        {/* Coluna de tarefas em progresso */}
                        <Column id="in_progress" title={`Em progresso (${getTaskCount('in_progress')})`} />
                        {/* Coluna de tarefas concluídas */}
                        <Column id="completed" title={`Concluída (${getTaskCount('completed')})`} />
                    </ColumnsContainer>
                    {/* Container para o gráfico */}
                    <ChartContainer>
                        <Chart /> {/* Exibe o gráfico */}
                    </ChartContainer>
                </Container>
            </DragDropContext>
        </KanbanContainer>
    )
}

export default Kanban; // Exporta o componente para uso em outros arquivos