import { Draggable } from "react-beautiful-dnd"; // Importa o componente Draggable para tornar o card arrastável
import styled from "@emotion/styled"; // Importa a função styled para criar componentes estilizados
import theme from "../theme/theme"; // Importa o tema para aplicar cores e estilos globais
import { useState } from "react"; // Importa o hook useState para gerenciar o estado interno do componente
import { BiHide, BiShowAlt } from "react-icons/bi"; // Importa ícones de "esconder" e "mostrar" da biblioteca react-icons

// Componente estilizado para o container do card
const CardContainer = styled.div`
    user-select: none; // Evita que o texto do card seja selecionado
    padding: 1rem; // Define o espaçamento interno
    margin: 0 0 0.5rem 0; // Adiciona margem inferior
    min-height: 3.125rem; // Define a altura mínima do card
    background-color: ${props => props.isDragging ? theme.getColor('lightGreen') : theme.getColor('black', 0.25)}; 
    // Define a cor de fundo do card dependendo se está sendo arrastado ou não
    color: white; // Cor do texto
    border-radius: 0.25rem; // Bordas arredondadas
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); // Sombra do card
    transition: all 0.3s cubic-bezier(.25,.8,.25,1); // Transição suave para efeitos de hover e arraste

    &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); // Sombra maior ao passar o mouse sobre o card
    }
`;

// Estilo para o título da tarefa
const CardTitle = styled.h3`
    font-size: 1.1rem; // Define o tamanho da fonte do título
    margin-bottom: 0.5rem; // Espaçamento inferior entre o título e a descrição
`;

// Estilo para a descrição da tarefa
const CardDescription = styled.p`
    font-size: 0.9rem; // Define o tamanho da fonte da descrição
`;

// Estilo para o container das ações do card (editar, deletar, mostrar descrição)
const CardActions = styled.div`
    display: flex; // Exibe os botões de ação em uma linha
    justify-content: space-between; // Distribui os botões com espaço entre eles
    margin-top: 0.5rem; // Espaçamento superior entre as ações e o conteúdo
`;

// Estilo para os botões de ação
const ActionButton = styled.button`
    background: none; // Remove o fundo padrão
    border: none; // Remove a borda padrão
    cursor: pointer; // Define o cursor de "mão" ao passar o mouse
    color: ${theme.getColor('black')}; // Define a cor do texto do botão
    font-size: 0.8rem; // Define o tamanho da fonte
    padding: 0.2rem 0.5rem; // Espaçamento interno do botão
    border-radius: 0.25rem; // Bordas arredondadas

    &:first-child {
        display: flex; // Exibe ícone e texto no botão de forma flexível
        align-items: center; // Alinha verticalmente os ícones e textos
        justify-content: center; // Centraliza o conteúdo
        gap: 0.5rem; // Define espaço entre o ícone e o texto
    }

    width: 100%; // Botão ocupa 100% da largura do card

    &:hover {
        background-color: ${theme.getColor('olive', 0.2)}; // Cor de fundo ao passar o mouse sobre o botão
    }
`;

// Componente TaskCard que representa uma tarefa individual
const TaskCard = ({ id, index, content, onEdit, onDelete }) => {
    const [showDescription, setShowDescription] = useState(false); // Usa o hook useState para controlar se a descrição está visível ou não

    // Função para alternar a visibilidade da descrição
    const toggleDescription = () => {
        setShowDescription(!showDescription); // Inverte o estado de visibilidade da descrição
    };

    return (
        <Draggable draggableId={id} index={index}> {/* Torna o card arrastável, passando o ID e a posição do card */}
            {(provided, snapshot) => (
                <CardContainer
                    ref={provided.innerRef} // Referência ao DOM para o DnD funcionar corretamente
                    {...provided.draggableProps} // Propriedades necessárias para tornar o card arrastável
                    {...provided.dragHandleProps} // Propriedades para controlar onde o usuário pode pegar o card para arrastar
                    isDragging={snapshot.isDragging} // Verifica se o card está sendo arrastado e aplica o estilo apropriado
                >
                    <CardTitle>{content.title}</CardTitle> {/* Exibe o título da tarefa */}
                    {showDescription && <CardDescription>{content.description}</CardDescription>} {/* Exibe a descrição da tarefa se o estado showDescription for true */}
                    <CardActions>
                        <ActionButton onClick={toggleDescription}>
                            {showDescription ? <BiHide /> : <BiShowAlt />} {/* Alterna entre os ícones de mostrar/esconder descrição */}
                        </ActionButton>
                        <ActionButton onClick={() => onEdit(id)}>Editar</ActionButton> {/* Botão para editar a tarefa */}
                        <ActionButton onClick={() => onDelete(id)}>Deletar</ActionButton> {/* Botão para deletar a tarefa */}
                    </CardActions>
                </CardContainer>
            )}
        </Draggable>
    );
};

export default TaskCard; // Exporta o componente TaskCard para ser usado em outros lugares