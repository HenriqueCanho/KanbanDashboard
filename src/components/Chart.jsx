import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
    const { tasks } = useContext(TaskContext);

    const taskCounts = {
        pending: tasks.filter(task => task.status === 'pending').length,
        in_progress: tasks.filter(task => task.status === 'in_progress').length,
        completed: tasks.filter(task => task.status === 'completed').length
    };

    return (
        <div>
            <h1>Gráfico de Tarefas</h1>
            <Pie
                data={{
                    labels: ['Pendente', 'Em progresso', 'Concluída'],
                    datasets: [{
                        label: 'Quantidade de tarefas',
                        data: [taskCounts.pending, taskCounts.in_progress, taskCounts.completed],
                        backgroundColor: ['#36A2EB', '#FFD700', '#4CAF50']
                    }]
                }}
            />
        </div>
    )
}

export default Chart;