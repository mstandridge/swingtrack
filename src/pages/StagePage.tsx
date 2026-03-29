import { useState, useRef, useCallback } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useActiveShow, useActiveTrack, useShowScenes, useShowTracks, useShowGroundPlans, useGroundPlanMarks } from '../store/selectors';

export default function StagePage() {
  const activeShow = useActiveShow();
  const activeTrack = useActiveTrack();
  const activeTrackIds = useAppStore((s) => s.activeTrackIds);
  const scenes = useShowScenes();
  const tracks = useShowTracks();
  const groundPlans = useShowGroundPlans();
  const mode = useAppStore((s) => s.mode);
  const addGroundPlan = useAppStore((s) => s.addGroundPlan);
  const deleteGroundPlan = useAppStore((s) => s.deleteGroundPlan);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedScene, setSelectedScene] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!activeShow) {
    return <div className="p-6 text-center text-gray-400 dark:text-gray-500">Select a show to get started</div>;
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const imageData = ev.target?.result as string;
      if (imageData) {
        const sceneId = selectedScene || scenes[0]?.id || '';
        const scene = scenes.find((s) => s.id === sceneId);
        const name = scene ? `A${scene.actNumber}S${scene.sceneNumber} — ${scene.name}` : file.name;
        const id = addGroundPlan(activeShow.id, sceneId, name, imageData);
        setSelectedPlanId(id);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const activePlan = groundPlans.find((gp) => gp.id === selectedPlanId) ?? groundPlans[0] ?? null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-theater-dark dark:text-gray-100">Stage View</h2>
        {mode === 'building' && (
          <div className="flex items-center gap-2">
            <select
              value={selectedScene}
              onChange={(e) => setSelectedScene(e.target.value)}
              className="text-xs border dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="">Scene for upload...</option>
              {scenes.map((sc) => (
                <option key={sc.id} value={sc.id}>A{sc.actNumber}S{sc.sceneNumber} — {sc.name}</option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 bg-theater-purple text-white rounded px-3 py-1 text-xs"
            >
              <Upload size={12} /> Upload Plan
            </button>
          </div>
        )}
      </div>

      {groundPlans.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
          <Upload size={40} className="mx-auto text-gray-300 dark:text-gray-500 mb-3" />
          <p className="text-gray-400 dark:text-gray-500 mb-1">No ground plans yet</p>
          <p className="text-xs text-gray-300 dark:text-gray-500">Upload an image of your stage layout or ground plan</p>
          {mode === 'building' && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 bg-theater-purple text-white rounded-lg px-4 py-2 text-sm"
            >
              Upload Ground Plan
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Plan selector tabs */}
          {groundPlans.length > 1 && (
            <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
              {groundPlans.map((gp) => (
                <button
                  key={gp.id}
                  onClick={() => setSelectedPlanId(gp.id)}
                  className={`text-xs px-3 py-1.5 rounded whitespace-nowrap transition ${
                    activePlan?.id === gp.id
                      ? 'bg-theater-purple text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {gp.name}
                </button>
              ))}
            </div>
          )}

          {activePlan && (
            <div className="relative">
              <GroundPlanView
                plan={activePlan}
                tracks={tracks}
                activeTrack={activeTrack}
                activeTrackIds={activeTrackIds}
                mode={mode}
              />
              {mode === 'building' && (
                <button
                  onClick={() => {
                    deleteGroundPlan(activePlan.id);
                    setSelectedPlanId(null);
                  }}
                  className="absolute top-2 right-2 bg-white/80 text-red-400 hover:text-red-600 rounded-full p-1.5"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {tracks.map((t) => {
              const isSelected = activeTrackIds.length === 0 || activeTrackIds.includes(t.id);
              return (
                <div key={t.id} className="flex items-center gap-1 text-xs">
                  <span className="w-3 h-3 rounded-full border-2" style={{
                    backgroundColor: t.color,
                    borderColor: isSelected ? '#000' : 'transparent',
                    opacity: isSelected ? 1 : 0.3,
                  }} />
                  <span className={isSelected ? 'font-bold dark:text-gray-100' : 'text-gray-300 dark:text-gray-500'}>
                    {t.characterName}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function GroundPlanView({ plan, tracks, activeTrack, activeTrackIds, mode }: {
  plan: { id: string; imageData: string; name: string };
  tracks: { id: string; characterName: string; color: string }[];
  activeTrack: { id: string; characterName: string; color: string } | null;
  activeTrackIds: string[];
  mode: string;
}) {
  const marks = useGroundPlanMarks(plan.id);
  const addStageMark = useAppStore((s) => s.addStageMark);
  const updateStageMark = useAppStore((s) => s.updateStageMark);
  const deleteStageMark = useAppStore((s) => s.deleteStageMark);
  const [dragging, setDragging] = useState<string | null>(null);
  const [editingMark, setEditingMark] = useState<string | null>(null);
  const [showArrows, setShowArrows] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPosition = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)),
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (mode !== 'building' || !activeTrack || dragging) return;
    if ((e.target as HTMLElement).closest('[data-mark]')) return;
    if ((e.target as HTMLElement).closest('[data-controls]')) return;
    const { x, y } = getPosition(e);
    addStageMark(plan.id, activeTrack.id, x, y, '');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const { x, y } = getPosition(e);
    updateStageMark(dragging, { x, y });
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const allSelected = activeTrackIds.length === 0;
  const filteredMarks = allSelected
    ? marks
    : marks.filter((m) => activeTrackIds.includes(m.trackId));

  // Group marks by track and sort by order for arrow drawing
  const marksByTrack = new Map<string, typeof filteredMarks>();
  filteredMarks.forEach((m) => {
    const existing = marksByTrack.get(m.trackId) ?? [];
    existing.push(m);
    marksByTrack.set(m.trackId, existing);
  });
  marksByTrack.forEach((arr) => arr.sort((a, b) => a.order - b.order));

  return (
    <div
      ref={containerRef}
      className="relative bg-gray-100 rounded-lg overflow-hidden cursor-crosshair select-none"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img
        src={plan.imageData}
        alt={plan.name}
        className="w-full h-auto block"
        draggable={false}
      />

      {/* SVG overlay for arrows */}
      {showArrows && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            {/* Arrow markers for each track color */}
            {tracks.map((t) => (
              <marker
                key={t.id}
                id={`arrow-${t.id}`}
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path d="M 0 0 L 8 3 L 0 6 Z" fill={t.color} />
              </marker>
            ))}
          </defs>

          {Array.from(marksByTrack.entries()).map(([trackId, sortedMarks]) => {
            const track = tracks.find((t) => t.id === trackId);
            if (!track || sortedMarks.length < 2) return null;

            return sortedMarks.slice(0, -1).map((mark, i) => {
              const next = sortedMarks[i + 1];
              // Shorten line slightly so arrow doesn't overlap the dot
              const dx = next.x - mark.x;
              const dy = next.y - mark.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              if (len === 0) return null;
              const shortenPct = Math.min(2, len * 0.15);
              const endX = next.x - (dx / len) * shortenPct;
              const endY = next.y - (dy / len) * shortenPct;
              const startX = mark.x + (dx / len) * shortenPct;
              const startY = mark.y + (dy / len) * shortenPct;

              return (
                <line
                  key={`${mark.id}-${next.id}`}
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke={track.color}
                  strokeWidth="2.5"
                  strokeDasharray="6,3"
                  opacity="0.7"
                  markerEnd={`url(#arrow-${track.id})`}
                />
              );
            });
          })}
        </svg>
      )}

      {/* Stage direction labels */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 bg-white/60 px-1 rounded" style={{ zIndex: 2 }}>US</div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 bg-white/60 px-1 rounded" style={{ zIndex: 2 }}>DS</div>
      <div className="absolute top-1/2 left-1 -translate-y-1/2 text-[10px] text-gray-400 bg-white/60 px-1 rounded" style={{ zIndex: 2 }}>SL</div>
      <div className="absolute top-1/2 right-1 -translate-y-1/2 text-[10px] text-gray-400 bg-white/60 px-1 rounded" style={{ zIndex: 2 }}>SR</div>

      {/* Marks */}
      {filteredMarks.map((mark) => {
        const track = tracks.find((t) => t.id === mark.trackId);
        if (!track) return null;
        const isEditing = editingMark === mark.id;

        return (
          <div
            key={mark.id}
            data-mark
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${mark.x}%`, top: `${mark.y}%`, zIndex: isEditing ? 20 : 3 }}
            onMouseDown={(e) => {
              if (mode !== 'building') return;
              e.stopPropagation();
              setDragging(mark.id);
            }}
          >
            {/* Numbered dot */}
            <div
              className="w-7 h-7 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold cursor-grab active:cursor-grabbing"
              style={{ backgroundColor: track.color }}
              title={`${track.characterName} #${mark.order}`}
            >
              {mark.order}
            </div>

            {/* Label */}
            {isEditing ? (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 bg-white rounded shadow-lg p-2 min-w-[160px]"
                onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={mark.label}
                  onChange={(e) => updateStageMark(mark.id, { label: e.target.value })}
                  placeholder="Position note..."
                  className="w-full text-xs border rounded px-1.5 py-1 mb-1 focus:outline-none focus:ring-1 focus:ring-theater-purple"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && setEditingMark(null)}
                />
                <label className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
                  Position #
                  <input
                    type="number"
                    min={1}
                    value={mark.order}
                    onChange={(e) => updateStageMark(mark.id, { order: Number(e.target.value) })}
                    className="w-12 border rounded px-1 py-0.5 text-center"
                  />
                </label>
                <div className="flex justify-between mt-1">
                  <button onClick={() => { deleteStageMark(mark.id); setEditingMark(null); }}
                    className="text-[10px] text-red-400 hover:text-red-600">Delete</button>
                  <button onClick={() => setEditingMark(null)}
                    className="text-[10px] text-theater-purple font-medium">Done</button>
                </div>
              </div>
            ) : (
              <div
                className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] bg-white/90 rounded px-1.5 py-0.5 whitespace-nowrap shadow cursor-pointer max-w-[120px] truncate"
                onClick={(e) => { e.stopPropagation(); if (mode === 'building') setEditingMark(mark.id); }}
              >
                {mark.label || `${track.characterName} #${mark.order}`}
              </div>
            )}
          </div>
        );
      })}

      {/* Controls overlay */}
      <div data-controls className="absolute top-2 left-2 flex gap-1" style={{ zIndex: 10 }}>
        <button
          onClick={(e) => { e.stopPropagation(); setShowArrows(!showArrows); }}
          className={`text-[10px] px-2 py-1 rounded shadow transition ${
            showArrows ? 'bg-theater-purple text-white' : 'bg-white/80 text-gray-500'
          }`}
        >
          {showArrows ? 'Arrows ON' : 'Arrows OFF'}
        </button>
      </div>

      {mode === 'building' && activeTrack && (
        <div className="absolute bottom-2 left-2 text-[10px] bg-black/50 text-white px-2 py-1 rounded" style={{ zIndex: 10 }}>
          Click to place {activeTrack.characterName} (position #{
            (filteredMarks.filter(m => m.trackId === activeTrack.id).length > 0
              ? Math.max(...filteredMarks.filter(m => m.trackId === activeTrack.id).map(m => m.order)) + 1
              : 1)
          })
        </div>
      )}
    </div>
  );
}
