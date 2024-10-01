import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import theme from "../theme/theme";
import { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";

const CardContainer = styled.div`
    user-select: none;
    padding: 1rem;
    margin: 0 0 0.5rem 0;
    min-height: 3.125rem;
    background-color: ${props => props.isDragging ? theme.getColor('lightGreen') : theme.getColor('black', 0.25)};
    color: white;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

    &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
`;

const CardTitle = styled.h3`
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
    font-size: 0.9rem;
`;

const CardActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${theme.getColor('black')};
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;

    &:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    width: 100%;

    &:hover {
        background-color: ${theme.getColor('olive', 0.2)};
    }
`;

const TaskCard = ({ id, index, content, onEdit, onDelete }) => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <CardContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                >
                    <CardTitle>{content.title}</CardTitle>
                    {showDescription && <CardDescription>{content.description}</CardDescription>}
                    <CardActions>
                        <ActionButton onClick={toggleDescription}>
                            {showDescription ? <BiHide /> : <BiShowAlt />}
                        </ActionButton>
                        <ActionButton onClick={() => onEdit(id)}>Editar</ActionButton>
                        <ActionButton onClick={() => onDelete(id)}>Deletar</ActionButton>
                    </CardActions>
                </CardContainer>
            )}
        </Draggable>
    );
};

export default TaskCard;