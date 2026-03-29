import { useState, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useActiveShow, useActiveTrack, useShowScriptPages, useShowTracks, useScriptAnnotation } from '../store/selectors';
import { Upload, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

export default function ScriptPage() {
  const activeShow = useActiveShow();
  const activeTrack = useActiveTrack();
  const tracks = useShowTracks();
  const pages = useShowScriptPages();
  const importScript = useAppStore((s) => s.importScript);
  const mode = useAppStore((s) => s.mode);
  const [currentPage, setCurrentPage] = useState(0);
  const [pasteText, setPasteText] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [viewTrackId, setViewTrackId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!activeShow) {
    return <div className="p-6 text-center text-gray-400 dark:text-gray-500">Select a show to get started</div>;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (text) {
        importScript(activeShow.id, text);
        setShowImport(false);
        setCurrentPage(0);
      }
    };
    reader.readAsText(file);
  };

  const handlePasteImport = () => {
    if (pasteText.trim()) {
      importScript(activeShow.id, pasteText);
      setPasteText('');
      setShowImport(false);
      setCurrentPage(0);
    }
  };

  if (pages.length === 0 || showImport) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <h2 className="text-lg font-bold text-theater-dark dark:text-gray-100 mb-4">Import Script</h2>

        <input
          type="file"
          accept=".txt"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-theater-purple transition mb-4"
        >
          <Upload size={32} className="mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Upload a .txt file</p>
        </button>

        <div className="text-center text-xs text-gray-400 dark:text-gray-500 mb-4">-- or paste your script below --</div>

        <textarea
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
          placeholder="Paste your script text here..."
          rows={12}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-theater-purple dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
        />
        <button
          onClick={handlePasteImport}
          disabled={!pasteText.trim()}
          className="mt-3 w-full bg-theater-purple text-white rounded-lg py-2 text-sm font-medium disabled:opacity-40"
        >
          Import Script
        </button>
      </div>
    );
  }

  const page = pages[currentPage];

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-theater-dark dark:text-gray-100">Script</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition ${
              showNotes ? 'bg-theater-purple text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}
          >
            <MessageSquare size={12} /> Notes
          </button>
          <button
            onClick={() => setShowImport(true)}
            className="text-xs text-theater-purple hover:underline"
          >
            Re-import
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 min-h-[50vh]">
        <pre className="text-sm font-mono whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
          {page?.content}
        </pre>
      </div>

      {/* Notes panel */}
      {showNotes && page && (
        <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Page Notes</span>
            {/* Track dropdown to view other tracks' notes */}
            <div className="relative">
              <select
                value={viewTrackId ?? activeTrack?.id ?? ''}
                onChange={(e) => setViewTrackId(e.target.value || null)}
                className="text-xs bg-white dark:bg-gray-700 border dark:border-gray-600 rounded px-2 py-1 pr-6 dark:text-gray-100"
              >
                {activeTrack && (
                  <option value={activeTrack.id}>{activeTrack.characterName} (yours)</option>
                )}
                {tracks.filter(t => t.id !== activeTrack?.id).map((t) => (
                  <option key={t.id} value={t.id}>{t.characterName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Show active track's editable note */}
          {activeTrack && (
            <div className="p-3">
              <ScriptNoteEditor
                pageNumber={page.pageNumber}
                trackColor={activeTrack.color}
                trackName={activeTrack.characterName}
                editable={mode === 'building'}
              />
            </div>
          )}

          {/* Show viewed track's note (read-only) if different from active */}
          {viewTrackId && viewTrackId !== activeTrack?.id && (
            <div className="px-3 pb-3">
              <ViewOnlyNote
                pageNumber={page.pageNumber}
                trackId={viewTrackId}
                tracks={tracks}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="p-2 rounded disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage + 1} of {pages.length}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
          disabled={currentPage === pages.length - 1}
          className="p-2 rounded disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function ScriptNoteEditor({ pageNumber, trackColor, trackName, editable }: {
  pageNumber: number; trackColor: string; trackName: string; editable: boolean;
}) {
  const activeShow = useActiveShow();
  const activeTrackIds = useAppStore((s) => s.activeTrackIds);
  const primaryTrackId = activeTrackIds[0] ?? null;
  const note = useScriptAnnotation(pageNumber);
  const upsertAnnotation = useAppStore((s) => s.upsertScriptAnnotation);

  if (!activeShow || !primaryTrackId) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: trackColor }} />
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{trackName}</span>
      </div>
      {editable ? (
        <textarea
          value={note}
          onChange={(e) => upsertAnnotation(activeShow.id, primaryTrackId, pageNumber, e.target.value)}
          placeholder="Add blocking notes, reminders, choreography cues for this page..."
          rows={3}
          className="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-theater-purple resize-y dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
        />
      ) : (
        <p className="text-sm text-gray-700 dark:text-gray-300">{note || <span className="text-gray-300 dark:text-gray-500 italic">No notes</span>}</p>
      )}
    </div>
  );
}

function ViewOnlyNote({ pageNumber, trackId, tracks }: {
  pageNumber: number; trackId: string; tracks: { id: string; characterName: string; color: string }[];
}) {
  const note = useAppStore((s) =>
    s.scriptAnnotations.find(
      (a) => a.showId === s.activeShowId && a.trackId === trackId && a.pageNumber === pageNumber
    )?.note ?? ''
  );
  const track = tracks.find((t) => t.id === trackId);
  if (!track) return null;

  return (
    <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: track.color }} />
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{track.characterName}</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{note || <span className="text-gray-300 dark:text-gray-500 italic">No notes</span>}</p>
    </div>
  );
}
