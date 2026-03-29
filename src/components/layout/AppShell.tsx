import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import TabNav from './TabNav';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBar />
      <main className="flex-1 pb-20 overflow-y-auto">
        <Outlet />
      </main>
      <TabNav />
    </div>
  );
}
