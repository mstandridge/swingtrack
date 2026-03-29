import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import HomePage from './pages/HomePage';
import ShowSetup from './pages/ShowSetup';
import ScriptPage from './pages/ScriptPage';
import BlockingPage from './pages/BlockingPage';
import CostumesPage from './pages/CostumesPage';
import StagePage from './pages/StagePage';
import QuickRefPage from './pages/QuickRefPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/setup" element={<ShowSetup />} />
          <Route path="/script" element={<ScriptPage />} />
          <Route path="/blocking" element={<BlockingPage />} />
          <Route path="/stage" element={<StagePage />} />
          <Route path="/costumes" element={<CostumesPage />} />
          <Route path="/quickref" element={<QuickRefPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
