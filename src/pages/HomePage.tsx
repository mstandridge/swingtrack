import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Play, Settings } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function HomePage() {
  const shows = useAppStore((s) => s.shows);
  const createShow = useAppStore((s) => s.createShow);
  const deleteShow = useAppStore((s) => s.deleteShow);
  const setActiveShow = useAppStore((s) => s.setActiveShow);
  const loadDemo = useAppStore((s) => s.loadDemo);
  const clearAllData = useAppStore((s) => s.clearAllData);
  const navigate = useNavigate();
  const [newName, setNewName] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const handleCreate = () => {
    const name = newName.trim();
    if (!name) return;
    createShow(name);
    setNewName('');
    navigate('/setup');
  };

  const handleSelect = (id: string) => {
    setActiveShow(id);
    navigate('/blocking');
  };

  const handleLoadDemo = () => {
    loadDemo();
    navigate('/blocking');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-theater-dark mb-2">BackStagePal</h2>
        <p className="text-gray-500">Your tracks, organized.</p>
      </div>

      {/* Create new show */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New show name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-theater-purple"
        />
        <button
          onClick={handleCreate}
          disabled={!newName.trim()}
          className="bg-theater-purple text-white rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40 flex items-center gap-1"
        >
          <Plus size={16} /> Create
        </button>
      </div>

      {/* Show list */}
      {shows.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-6">
            Create your first show to get started!
          </p>
          <button
            onClick={handleLoadDemo}
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 rounded-lg px-4 py-2 text-sm hover:bg-gray-200 transition"
          >
            <Play size={14} /> Try Demo (A Midsummer Night's Dream)
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-2 mb-6">
            {shows.map((show) => (
              <div
                key={show.id}
                className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-4 py-3 hover:border-theater-purple transition cursor-pointer"
                onClick={() => handleSelect(show.id)}
              >
                <span className="font-medium text-theater-dark">{show.name}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteShow(show.id); }}
                  className="text-gray-300 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Settings */}
          <div className="border-t border-gray-100 pt-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition"
            >
              <Settings size={12} /> Settings
            </button>

            {showSettings && (
              <div className="mt-3 space-y-2">
                <button
                  onClick={handleLoadDemo}
                  className="w-full text-left text-xs bg-gray-50 rounded px-3 py-2 text-gray-500 hover:bg-gray-100 transition"
                >
                  Load demo show (A Midsummer Night's Dream)
                </button>
                <button
                  onClick={() => {
                    if (confirm('This will delete ALL your shows and data. Are you sure?')) {
                      clearAllData();
                    }
                  }}
                  className="w-full text-left text-xs bg-red-50 rounded px-3 py-2 text-red-400 hover:bg-red-100 transition"
                >
                  Clear all data and start fresh
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
