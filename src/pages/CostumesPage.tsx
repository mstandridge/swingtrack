import { useAppStore } from '../store/useAppStore';
import { useActiveShow, useActiveTrack, useShowScenes, useShowTracks, useFilteredCostumeChanges } from '../store/selectors';
import { Plus, Trash2 } from 'lucide-react';

export default function CostumesPage() {
  const activeShow = useActiveShow();
  const activeTrack = useActiveTrack();
  const tracks = useShowTracks();
  const scenes = useShowScenes();
  const changes = useFilteredCostumeChanges();
  const activeTrackIds = useAppStore((s) => s.activeTrackIds);
  const mode = useAppStore((s) => s.mode);
  const addCostumeChange = useAppStore((s) => s.addCostumeChange);
  const updateCostumeChange = useAppStore((s) => s.updateCostumeChange);
  const deleteCostumeChange = useAppStore((s) => s.deleteCostumeChange);

  const allSelected = activeTrackIds.length === 0;
  const multipleSelected = allSelected || activeTrackIds.length > 1;

  if (!activeShow) {
    return <div className="p-6 text-center text-gray-400 dark:text-gray-500">Select a show to get started</div>;
  }

  const handleAdd = () => {
    if (!activeTrack) return;
    addCostumeChange({
      trackId: activeTrack.id,
      showId: activeShow.id,
      sceneId: scenes[0]?.id ?? '',
      changeNumber: changes.length + 1,
      location: '',
      timeAvailable: '',
      putOn: '',
      takeOff: '',
      dressers: '',
      notes: '',
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        {!multipleSelected && activeTrack && (
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeTrack.color }} />
        )}
        <h2 className="text-lg font-bold text-theater-dark dark:text-gray-100">
          Costumes{!multipleSelected && activeTrack ? ` — ${activeTrack.characterName}` : ''}
        </h2>
      </div>

      {changes.length === 0 && mode === 'building' && (
        <p className="text-gray-400 dark:text-gray-500 text-sm text-center mb-4">No costume changes yet.</p>
      )}

      <div className="space-y-3">
        {changes.map((change) => {
          const scene = scenes.find((s) => s.id === change.sceneId);
          const changeTrack = tracks.find((t) => t.id === change.trackId);

          return (
            <div key={change.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {multipleSelected && changeTrack && (
                    <>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: changeTrack.color }} />
                      <span className="text-xs font-semibold" style={{ color: changeTrack.color }}>
                        {changeTrack.characterName}
                      </span>
                    </>
                  )}
                  <span className="text-sm font-bold text-theater-purple">
                    Change #{change.changeNumber}
                  </span>
                </div>
                {mode === 'building' && (
                  <button onClick={() => deleteCostumeChange(change.id)}
                    className="text-gray-300 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              {mode === 'building' ? (
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Scene</label>
                    <select
                      value={change.sceneId}
                      onChange={(e) => updateCostumeChange(change.id, { sceneId: e.target.value })}
                      className="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1.5 text-sm dark:bg-gray-700 dark:text-gray-100"
                    >
                      {scenes.map((sc) => (
                        <option key={sc.id} value={sc.id}>
                          A{sc.actNumber}S{sc.sceneNumber} — {sc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <PromptInput label="Where is the change?" value={change.location}
                    placeholder="Quick change SR, dressing room..."
                    onChange={(v) => updateCostumeChange(change.id, { location: v })} />
                  <PromptInput label="How much time?" value={change.timeAvailable}
                    placeholder="32 bars, 45 seconds..."
                    onChange={(v) => updateCostumeChange(change.id, { timeAvailable: v })} />
                  <PromptInput label="What goes ON?" value={change.putOn}
                    placeholder="Green dress, hat..."
                    onChange={(v) => updateCostumeChange(change.id, { putOn: v })} />
                  <PromptInput label="What comes OFF?" value={change.takeOff}
                    placeholder="Blue skirt, wig..."
                    onChange={(v) => updateCostumeChange(change.id, { takeOff: v })} />
                  <PromptInput label="Who helps? (dressers)" value={change.dressers}
                    placeholder="Dresser name..."
                    onChange={(v) => updateCostumeChange(change.id, { dressers: v })} />
                  <PromptInput label="Other notes" value={change.notes}
                    placeholder="Anything else..."
                    onChange={(v) => updateCostumeChange(change.id, { notes: v })} />
                </div>
              ) : (
                <div className="text-sm space-y-1 dark:text-gray-300">
                  {scene && <p className="text-xs text-gray-400 dark:text-gray-500">A{scene.actNumber}S{scene.sceneNumber} — {scene.name}</p>}
                  {change.location && <p><strong>Where:</strong> {change.location}</p>}
                  {change.timeAvailable && <p><strong>Time:</strong> {change.timeAvailable}</p>}
                  {change.putOn && <p><strong>Put on:</strong> {change.putOn}</p>}
                  {change.takeOff && <p><strong>Take off:</strong> {change.takeOff}</p>}
                  {change.dressers && <p><strong>Dressers:</strong> {change.dressers}</p>}
                  {change.notes && <p><strong>Notes:</strong> {change.notes}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {mode === 'building' && !multipleSelected && activeTrack && (
        <button
          onClick={handleAdd}
          className="mt-4 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-3 text-sm text-gray-500 dark:text-gray-400 hover:border-theater-purple hover:text-theater-purple transition flex items-center justify-center gap-1"
        >
          <Plus size={16} /> Add Costume Change
        </button>
      )}
      {mode === 'building' && multipleSelected && (
        <p className="text-[10px] text-gray-300 dark:text-gray-500 text-center mt-3">Select one track to add costume changes</p>
      )}
    </div>
  );
}

function PromptInput({ label, value, placeholder, onChange }: {
  label: string; value: string; placeholder: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-theater-purple dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
      />
    </div>
  );
}
