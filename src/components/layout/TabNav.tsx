import { NavLink } from 'react-router-dom';
import { FileText, MapPin, Shirt, Zap, Map } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const tabs = [
  { to: '/script', label: 'Script', icon: FileText },
  { to: '/blocking', label: 'Blocking', icon: MapPin },
  { to: '/stage', label: 'Stage', icon: Map },
  { to: '/costumes', label: 'Costumes', icon: Shirt },
  { to: '/quickref', label: 'Quick Ref', icon: Zap },
];

export default function TabNav() {
  const activeShowId = useAppStore((s) => s.activeShowId);

  if (!activeShowId) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around py-1 fixed bottom-0 left-0 right-0 z-50">
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium transition ${
              isActive ? 'text-theater-purple dark:text-purple-400' : 'text-gray-400 dark:text-gray-500'
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
