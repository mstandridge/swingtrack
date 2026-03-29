import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useActiveShow, useShowTracks, useShowScenes } from '../store/selectors';

const PRESET_COLORS = [
  '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
  '#9b59b6', '#1abc9c', '#e67e22', '#e84393',
  '#00b894', '#6c5ce7', '#fd79a8', '#fdcb6e',
];

export default function ShowSetup() {
  const activeShow = useActiveShow();
  const tracks = useShowTracks();
  const scenes = useShowScenes();
  const addTrack = useAppStore((s) => s.addTrack);
  const deleteTrack = useAppStore((s) => s.deleteTrack);
  const addScene = useAppStore((s) => s.addScene);
  const deleteScene = useAppStore((s) => s.deleteScene);
  const navigate = useNavigate();

  const [charName, setCharName] = useState('');
  const [charColor, setCharColor] = useState(PRESET_COLORS[0]);
  const [sceneName, setSceneName] = useState('');
  const [actNum, setActNum] = useState(1);
  const [sceneNum, setSceneNum] = useState(1);

  if (!activeShow) {
    navigate('/');
    return null;
  }

  const handleAddTrack = () => {
    const name = charName.trim();
    if (!name) return;
    addTrack(activeShow.id, name, charColor);
    setCharName('');
    const nextIdx = (tracks.length + 1) % PRESET_COLORS.length;
    setCharColor(PRESET_COLORS[nextIdx]);
  };

  const handleAddScene = () => {
    const name = sceneName.trim();
    if (!name) return;
    addScene(activeShow.id, actNum, sceneNum, name);
    setSceneName('');
    setSceneNum(sceneNum + 1);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold text-theater-dark dark:text-gray-100 mb-1">{activeShow.name}</h2>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">Set up your tracks and scenes</p>

      {/* Tracks */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          Character Tracks
        </h3>
        <div className="flex gap-2 mb-3">
          <input
            type="color"
            value={charColor}
            onChange={(e) => setCharColor(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer border-0"
          />
          <input
            type="text"
            placeholder="Character name..."
            value={charName}
            onChange={(e) => setCharName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTrack()}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-theater-purple dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
          />
          <button
            onClick={handleAddTrack}
            disabled={!charName.trim()}
            className="bg-theater-purple text-white rounded-lg px-3 py-2 text-sm disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setCharColor(c)}
              className={`w-6 h-6 rounded-full border-2 transition ${
                charColor === c ? 'border-gray-800 dark:border-white scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="space-y-1">
          {tracks.map((t) => (
            <div key={t.id} className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 px-3 py-2">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: t.color }} />
              <span className="flex-1 text-sm font-medium dark:text-gray-100">{t.characterName}</span>
              <button onClick={() => deleteTrack(t.id)} className="text-gray-300 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Scenes */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          Scenes
        </h3>
        <div className="flex gap-2 mb-3">
          <select
            value={actNum}
            onChange={(e) => setActNum(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2 text-sm dark:bg-gray-700 dark:text-gray-100"
          >
            <option value={1}>Act 1</option>
            <option value={2}>Act 2</option>
          </select>
          <input
            type="number"
            min={1}
            value={sceneNum}
            onChange={(e) => setSceneNum(Number(e.target.value))}
            className="w-16 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2 text-sm text-center dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="text"
            placeholder="Scene name / number..."
            value={sceneName}
            onChange={(e) => setSceneName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddScene()}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-theater-purple dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
          />
          <button
            onClick={handleAddScene}
            disabled={!sceneName.trim()}
            className="bg-theater-purple text-white rounded-lg px-3 py-2 text-sm disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="space-y-1">
          {scenes.map((sc) => (
            <div key={sc.id} className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 px-3 py-2">
              <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                A{sc.actNumber}S{sc.sceneNumber}
              </span>
              <span className="flex-1 text-sm dark:text-gray-300">{sc.name}</span>
              <button onClick={() => deleteScene(sc.id)} className="text-gray-300 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={() => navigate('/blocking')}
        disabled={tracks.length === 0 || scenes.length === 0}
        className="w-full bg-theater-purple text-white rounded-lg px-4 py-3 font-medium disabled:opacity-40 flex items-center justify-center gap-2"
      >
        Start Building Notes <ArrowRight size={16} />
      </button>
    </div>
  );
}
