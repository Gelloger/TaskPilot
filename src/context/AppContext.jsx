import { createContext, useContext, useState } from 'react';
import { projects as initialProjects, tasks as initialTasks } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedProjectId, setSelectedProjectId] = useState('p1');
  const [botRunning, setBotRunning] = useState(false);
  const [botCompleted, setBotCompleted] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const updateCareLevel = (projectId, level) => {
    setProjects(prev =>
      prev.map(p => p.id === projectId ? { ...p, careLevel: level } : p)
    );
  };

  const runBot = async () => {
    setBotRunning(true);
    setBotCompleted(false);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setBotRunning(false);
    setBotCompleted(true);
  };

  const resetBot = () => {
    setBotCompleted(false);
  };

  const updateDraftStatus = (taskId, status) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId && t.aiDraft
          ? { ...t, aiDraft: { ...t.aiDraft, status } }
          : t
      )
    );
  };

  return (
    <AppContext.Provider value={{
      projects,
      tasks,
      selectedProjectId,
      setSelectedProjectId,
      selectedProject,
      botRunning,
      botCompleted,
      runBot,
      resetBot,
      updateCareLevel,
      updateDraftStatus,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
