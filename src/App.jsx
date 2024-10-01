// Importa o componente Kanban, o provedor de contexto de tarefas, e o provedor de tema.
import Kanban from "./components/Kanban"; // Componente principal do quadro Kanban.
import { TaskProvider } from "./context/TaskContext"; // Provedor de contexto para gerenciar tarefas.
import { ThemeProvider } from '@emotion/react'; // Provedor de tema para estilização com Emotion.
import theme from './theme/theme'; // Importa o tema definido em outro arquivo.

function App() {
  // Componente principal da aplicação.
  return (
    // Envolve a aplicação em um provedor de tema para aplicar estilos consistentes.
    <ThemeProvider theme={theme}>
      {/* Envolve o componente Kanban em um provedor de contexto de tarefas. */}
      <TaskProvider>
        {/* Renderiza o componente Kanban que representa o quadro de tarefas. */}
        <Kanban />
      </TaskProvider>
    </ThemeProvider>
  );
}

// Exporta o componente App para ser utilizado como entrada da aplicação.
export default App;