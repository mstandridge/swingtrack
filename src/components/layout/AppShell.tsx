import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import TabNav from './TabNav';
import { useAppStore } from '../../store/useAppStore';

export default function AppShell() {
  const darkMode = useAppStore((s) => s.darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <TopBar />
        <main className="flex-1 pb-20 overflow-y-auto">
          <Outlet />
        </main>
        <TabNav />
      </div>
    </div>
  );
}
