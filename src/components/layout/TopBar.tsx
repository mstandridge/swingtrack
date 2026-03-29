import { useAppStore } from '../../store/useAppStore';
import { useActiveShow, useShowTracks } from '../../store/selectors';
import { Users } from 'lucide-react';

export default function TopBar() {
  const shows = useAppStore((s) => s.shows);
  const activeShowId = useAppStore((s) => s.activeShowId);
  const activeTrackIds = useAppStore((s) => s.activeTrackIds);
  const mode = useAppStore((s) => s.mode);
  const setActiveShow = useAppStore((s) => s.setActiveShow);
  const toggleTrack = useAppStore((s) => s.toggleTrack);
  const selectAllTracks = useAppStore((s) => s.selectAllTracks);
  const setMode = useAppStore((s) => s.setMode);
  const activeShow = useActiveShow();
  const tracks = useShowTracks();

  const allSelected = activeTrackIds.length === 0;

  return (
    <header className="bg-theater-dark text-white">
      {/* Top row: logo, show selector, mode toggle */}
      <div className="px-4 py-3 flex items-center gap-3">
        <h1 className="text-lg font-bold tracking-wide mr-auto">SwingTrack</h1>

        {shows.length > 0 && (
          <select
            value={activeShowId ?? ''}
            onChange={(e) => setActiveShow(e.target.value || null)}
            className="bg-white/10 text-white rounded px-2 py-1 text-sm"
          >
            <option value="">Select show...</option>
            {shows.map((sh) => (
              <option key={sh.id} value={sh.id}>{sh.name}</option>
            ))}
          </select>
        )}

        {activeShow && (
          <button
            onClick={() => setMode(mode === 'building' ? 'reference' : 'building')}
            className={`rounded px-3 py-1 text-sm font-medium transition ${
              mode === 'reference'
                ? 'bg-yellow-400 text-black'
                : 'bg-white/10 text-white'
            }`}
          >
            {mode === 'building' ? 'Building' : 'Quick Ref'}
          </button>
        )}
      </div>

      {/* Track selector row */}
      {activeShow && tracks.length > 0 && (
        <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto">
          {/* All tracks button */}
          <button
            onClick={selectAllTracks}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition whitespace-nowrap ${
              allSelected
                ? 'bg-white text-theater-dark'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Users size={12} />
            All
          </button>

          {/* Individual track buttons */}
          {tracks.map((t) => {
            const isSelected = allSelected || activeTrackIds.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggleTrack(t.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition whitespace-nowrap ${
                  isSelected
                    ? 'ring-2 ring-white shadow-lg'
                    : 'opacity-40 hover:opacity-70'
                }`}
                style={{
                  backgroundColor: isSelected ? t.color : `${t.color}44`,
                  color: 'white',
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/50"
                  style={{ backgroundColor: t.color }}
                />
                {t.characterName}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
