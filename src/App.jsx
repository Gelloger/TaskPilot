import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CareLevel from './pages/CareLevel';
import TaskMonitor from './pages/TaskMonitor';
import TaskDetail from './pages/TaskDetail';
import Stats from './pages/Stats';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="care-level" element={<CareLevel />} />
          <Route path="task-monitor" element={<TaskMonitor />} />
          <Route path="task-monitor/:taskId" element={<TaskDetail />} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
