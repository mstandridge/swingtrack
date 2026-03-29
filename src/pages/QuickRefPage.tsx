import { useAppStore } from '../store/useAppStore';
import { useActiveShow, useActiveTrack, useShowScenes, useShowTracks, useFilteredBlockingNotes, useFilteredCostumeChanges } from '../store/selectors';

export default function QuickRefPage() {
  const activeShow = useActiveShow();
  const activeTrack = useActiveTrack();
  const tracks = useShowTracks();
  const scenes = useShowScenes();
  const blockingNotes = useFilteredBlockingNotes();
  const costumeChanges = useFilteredCostumeChanges();
  const activeTrackIds = useAppStore((s) => s.activeTrackIds);

  const allSelected = activeTrackIds.length === 0;
  const multipleSelected = allSelected || activeTrackIds.length > 1;

  if (!activeShow) {
    return <div className="p-6 text-center text-gray-400">Select a show to get started</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        {!multipleSelected && activeTrack && (
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: activeTrack.color }} />
        )}
        <h2 className="text-xl font-bold text-theater-dark">
          {!multipleSelected && activeTrack ? activeTrack.characterName : 'Quick Reference'}
        </h2>
        <span className="ml-auto text-xs bg-yellow-400 text-black px-2 py-1 rounded font-medium">
          QUICK REF
        </span>
      </div>

      {scenes.length === 0 ? (
        <p className="text-gray-400 text-center">No scenes set up yet.</p>
      ) : (
        <div className="space-y-4">
          {scenes.map((scene) => {
            const sceneBlocking = blockingNotes.filter((n) => n.sceneId === scene.id);
            const sceneCostumes = costumeChanges.filter((c) => c.sceneId === scene.id);
            const hasContent = sceneBlocking.length > 0 || sceneCostumes.length > 0;

            if (!hasContent) return null;

            // Determine the border color: use single track color, or purple for multi
            const borderColor = !multipleSelected && activeTrack ? activeTrack.color : '#6b4c9a';

            return (
              <div key={scene.id} className="bg-white rounded-lg border-l-4 p-4"
                style={{ borderLeftColor: borderColor }}>
                <h3 className="font-bold text-sm mb-2">
                  <span className="text-gray-400 font-mono mr-1">A{scene.actNumber}S{scene.sceneNumber}</span>
                  {scene.name}
                </h3>

                {sceneBlocking.map((note) => {
                  const noteTrack = tracks.find((t) => t.id === note.trackId);
                  return (
                    <div key={note.id} className="mb-2">
                      {multipleSelected && noteTrack && (
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: noteTrack.color }} />
                          <span className="text-[10px] font-bold" style={{ color: noteTrack.color }}>
                            {noteTrack.characterName}
                          </span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        {note.entranceFrom && (
                          <p><span className="font-bold text-green-600">ENTER:</span> {note.entranceFrom}</p>
                        )}
                        {note.exitTo && (
                          <p><span className="font-bold text-red-500">EXIT:</span> {note.exitTo}</p>
                        )}
                        {note.startingPosition && (
                          <p><span className="font-bold text-gray-500">START:</span> {note.startingPosition}</p>
                        )}
                        {note.endingPosition && (
                          <p><span className="font-bold text-gray-500">END:</span> {note.endingPosition}</p>
                        )}
                      </div>
                      {note.props && (
                        <p className="text-sm mt-1"><span className="font-bold text-orange-500">PROPS:</span> {note.props}</p>
                      )}
                      {note.notes && (
                        <p className="text-xs text-gray-500 mt-1">{note.notes}</p>
                      )}
                    </div>
                  );
                })}

                {sceneCostumes.map((cc) => {
                  const ccTrack = tracks.find((t) => t.id === cc.trackId);
                  return (
                    <div key={cc.id} className="mt-2 bg-gray-50 rounded p-2 text-sm">
                      <div className="flex items-center gap-1.5 mb-1">
                        {multipleSelected && ccTrack && (
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ccTrack.color }} />
                        )}
                        <p className="font-bold text-theater-purple text-xs">
                          {multipleSelected && ccTrack ? `${ccTrack.characterName} — ` : ''}COSTUME #{cc.changeNumber}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {cc.location && <p><strong>Where:</strong> {cc.location}</p>}
                        {cc.timeAvailable && <p><strong>Time:</strong> {cc.timeAvailable}</p>}
                        {cc.putOn && <p><strong>On:</strong> {cc.putOn}</p>}
                        {cc.takeOff && <p><strong>Off:</strong> {cc.takeOff}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
