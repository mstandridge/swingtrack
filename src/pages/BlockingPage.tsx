import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useActiveShow, useActiveTrack, useShowScenes, useShowTracks, useFilteredBlockingNotes } from '../store/selectors';
import { Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';

export default function BlockingPage() {
  const activeShow = useActiveShow();
  const activeTrack = useActiveTrack();
  const tracks = useShowTracks();
  const scenes = useShowScenes();
  const notes = useFilteredBlockingNotes();
  const activeTrackIds = useAppStore((s) => s.activeTrackIds);
  const mode = useAppStore((s) => s.mode);
  const addBlockingNote = useAppStore((s) => s.addBlockingNote);
  const updateBlockingNote = useAppStore((s) => s.updateBlockingNote);
  const deleteBlockingNote = useAppStore((s) => s.deleteBlockingNote);
  const [expandedScene, setExpandedScene] = useState<string | null>(null);

  const allSelected = activeTrackIds.length === 0;
  const multipleSelected = allSelected || activeTrackIds.length > 1;

  if (!activeShow) {
    return <div className="p-6 text-center text-gray-400">Select a show to get started</div>;
  }

  const getNotesForScene = (sceneId: string) =>
    notes.filter((n) => n.sceneId === sceneId);

  const getTrackForNote = (trackId: string) =>
    tracks.find((t) => t.id === trackId);

  const handleAddNote = (sceneId: string) => {
    if (!activeTrack) return;
    addBlockingNote({
      trackId: activeTrack.id,
      showId: activeShow.id,
      sceneId,
      pageNumber: null,
      entranceFrom: '',
      exitTo: '',
      startingPosition: '',
      endingPosition: '',
      crossingPattern: '',
      notes: '',
      props: '',
    });
    setExpandedScene(sceneId);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        {!multipleSelected && activeTrack && (
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeTrack.color }} />
        )}
        <h2 className="text-lg font-bold text-theater-dark">
          Blocking{!multipleSelected && activeTrack ? ` — ${activeTrack.characterName}` : ''}
        </h2>
      </div>

      {scenes.length === 0 ? (
        <p className="text-gray-400 text-sm text-center">No scenes yet. Go to show setup to add scenes.</p>
      ) : (
        <div className="space-y-3">
          {scenes.map((scene) => {
            const sceneNotes = getNotesForScene(scene.id);
            const isExpanded = expandedScene === scene.id;

            return (
              <div key={scene.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedScene(isExpanded ? null : scene.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <div>
                    <span className="text-xs text-gray-400 font-mono mr-2">
                      A{scene.actNumber}S{scene.sceneNumber}
                    </span>
                    <span className="font-medium text-sm">{scene.name}</span>
                    {sceneNotes.length > 0 && (
                      <span className="ml-2 text-xs bg-theater-purple/10 text-theater-purple rounded-full px-2 py-0.5">
                        {sceneNotes.length} note{sceneNotes.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                    {sceneNotes.map((note) => {
                      const noteTrack = getTrackForNote(note.trackId);
                      return (
                        <div key={note.id} className="mt-3 space-y-2">
                          {/* Show track badge when viewing multiple tracks */}
                          {multipleSelected && noteTrack && (
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: noteTrack.color }} />
                              <span className="text-xs font-semibold" style={{ color: noteTrack.color }}>
                                {noteTrack.characterName}
                              </span>
                            </div>
                          )}
                          {mode === 'building' ? (
                            <>
                              <PromptInput label="Entrance from?" value={note.entranceFrom}
                                placeholder="SL, SR, UC, DC..."
                                onChange={(v) => updateBlockingNote(note.id, { entranceFrom: v })} />
                              <PromptInput label="Exit to?" value={note.exitTo}
                                placeholder="SL, SR, UC, DC..."
                                onChange={(v) => updateBlockingNote(note.id, { exitTo: v })} />
                              <PromptInput label="Starting position?" value={note.startingPosition}
                                placeholder="Where do you start on stage?"
                                onChange={(v) => updateBlockingNote(note.id, { startingPosition: v })} />
                              <PromptInput label="Ending position?" value={note.endingPosition}
                                placeholder="Where do you end up?"
                                onChange={(v) => updateBlockingNote(note.id, { endingPosition: v })} />
                              <PromptInput label="Crossing / movement?" value={note.crossingPattern}
                                placeholder="Cross DS to SR..."
                                onChange={(v) => updateBlockingNote(note.id, { crossingPattern: v })} />
                              <PromptInput label="Props?" value={note.props}
                                placeholder="What do you carry on/off?"
                                onChange={(v) => updateBlockingNote(note.id, { props: v })} />
                              <PromptInput label="Other notes" value={note.notes}
                                placeholder="Anything else to remember..."
                                onChange={(v) => updateBlockingNote(note.id, { notes: v })} />
                              <button onClick={() => deleteBlockingNote(note.id)}
                                className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 mt-1">
                                <Trash2 size={12} /> Remove
                              </button>
                            </>
                          ) : (
                            <div className="text-sm space-y-1">
                              {note.entranceFrom && <p><strong>Enter:</strong> {note.entranceFrom}</p>}
                              {note.exitTo && <p><strong>Exit:</strong> {note.exitTo}</p>}
                              {note.startingPosition && <p><strong>Start:</strong> {note.startingPosition}</p>}
                              {note.endingPosition && <p><strong>End:</strong> {note.endingPosition}</p>}
                              {note.crossingPattern && <p><strong>Cross:</strong> {note.crossingPattern}</p>}
                              {note.props && <p><strong>Props:</strong> {note.props}</p>}
                              {note.notes && <p><strong>Notes:</strong> {note.notes}</p>}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {mode === 'building' && activeTrack && !multipleSelected && (
                      <button
                        onClick={() => handleAddNote(scene.id)}
                        className="flex items-center gap-1 text-xs text-theater-purple hover:text-theater-purple/80 mt-2"
                      >
                        <Plus size={14} /> Add blocking note
                      </button>
                    )}
                    {mode === 'building' && multipleSelected && (
                      <p className="text-[10px] text-gray-300 mt-2">Select one track to add notes</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PromptInput({ label, value, placeholder, onChange }: {
  label: string; value: string; placeholder: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-theater-purple"
      />
    </div>
  );
}
