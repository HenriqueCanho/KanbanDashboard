import { Pie } from "react-chartjs-2";
// Importa o componente Pie da biblioteca react-chartjs-2 para criar gráficos de pizza.

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
// Importa as partes necessárias da biblioteca Chart.js para configurar o gráfico.

import { useContext } from 'react';
// Importa o hook useContext para acessar o contexto das tarefas.

import TaskContext from '../context/TaskContext';
// Importa o contexto das tarefas, que contém as informações das tarefas.

ChartJS.register(ArcElement, Tooltip, Legend);
// Registra os elementos necessários do Chart.js para que possam ser utilizados no gráfico.

const Chart = () => {
    const { tasks } = useContext(TaskContext);
    // Usa o hook useContext para acessar as tarefas do contexto.

    const taskCounts = {
        pending: tasks.filter(task => task.status === 'pending').length,
        in_progress: tasks.filter(task => task.status === 'in_progress').length,
        completed: tasks.filter(task => task.status === 'completed').length
    };
    // Cria um objeto taskCounts que conta quantas tarefas estão em cada status (pendente, em progresso, concluída).

    return (
        <div>
            <h1>Gráfico de Tarefas</h1>
            {/* Título do gráfico */}
            <Pie
                data={{
                    labels: ['Pendente', 'Em progresso', 'Concluída'],
                    // Rótulos para cada fatia do gráfico de pizza.
                    datasets: [{
                        label: 'Quantidade de tarefas',
                        data: [taskCounts.pending, taskCounts.in_progress, taskCounts.completed],
                        // Dados a serem exibidos no gráfico, correspondendo ao número de tarefas em cada status.
                        backgroundColor: ['#36A2EB', '#FFD700', '#4CAF50']
                        // Cores de fundo para cada fatia do gráfico.
                    }]
                }}
            />
        </div>
    )
}

export default Chart;
// Exporta o componente Chart para ser usado em outros arquivos.