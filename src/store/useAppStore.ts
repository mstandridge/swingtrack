import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Show, Track, Scene, ScriptPage, BlockingNote, CostumeChange, ScriptAnnotation, GroundPlan, StageMark, AppMode } from '../types';
import { generateId } from '../utils/id';
import { sampleShow, sampleTracks, sampleScenes, sampleBlockingNotes, sampleCostumeChanges } from '../utils/sampleData';
import { sampleGroundPlans, sampleStageMarks } from '../utils/sampleStage';

interface AppState {
  shows: Show[];
  tracks: Track[];
  scenes: Scene[];
  scriptPages: ScriptPage[];
  blockingNotes: BlockingNote[];
  costumeChanges: CostumeChange[];
  scriptAnnotations: ScriptAnnotation[];
  groundPlans: GroundPlan[];
  stageMarks: StageMark[];

  activeShowId: string | null;
  activeTrackIds: string[]; // empty = all tracks
  mode: AppMode;

  // Show actions
  createShow: (name: string) => string;
  deleteShow: (id: string) => void;
  setActiveShow: (id: string | null) => void;

  // Track actions
  addTrack: (showId: string, characterName: string, color: string) => void;
  deleteTrack: (id: string) => void;
  toggleTrack: (id: string) => void;
  selectAllTracks: () => void;
  selectOneTrack: (id: string) => void;

  // Scene actions
  addScene: (showId: string, actNumber: number, sceneNumber: number, name: string) => void;
  deleteScene: (id: string) => void;

  // Script actions
  importScript: (showId: string, text: string) => void;

  // Blocking actions
  addBlockingNote: (note: Omit<BlockingNote, 'id'>) => void;
  updateBlockingNote: (id: string, updates: Partial<BlockingNote>) => void;
  deleteBlockingNote: (id: string) => void;

  // Costume actions
  addCostumeChange: (change: Omit<CostumeChange, 'id'>) => void;
  updateCostumeChange: (id: string, updates: Partial<CostumeChange>) => void;
  deleteCostumeChange: (id: string) => void;

  // Script annotation actions
  upsertScriptAnnotation: (showId: string, trackId: string, pageNumber: number, note: string) => void;

  // Ground plan actions
  addGroundPlan: (showId: string, sceneId: string, name: string, imageData: string) => string;
  deleteGroundPlan: (id: string) => void;
  addStageMark: (groundPlanId: string, trackId: string, x: number, y: number, label: string) => void;
  updateStageMark: (id: string, updates: Partial<StageMark>) => void;
  deleteStageMark: (id: string) => void;

  // Mode
  setMode: (mode: AppMode) => void;

  // Data management
  loadDemo: () => void;
  clearAllData: () => void;
}

const TRACK_COLORS = [
  '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
  '#9b59b6', '#1abc9c', '#e67e22', '#e84393',
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      shows: [],
      tracks: [],
      scenes: [],
      scriptPages: [],
      blockingNotes: [],
      costumeChanges: [],
      scriptAnnotations: [],
      groundPlans: [],
      stageMarks: [],

      activeShowId: null,
      activeTrackIds: [],
      mode: 'building',

      createShow: (name) => {
        const id = generateId();
        const now = new Date().toISOString();
        set((s) => ({
          shows: [...s.shows, { id, name, createdAt: now, updatedAt: now }],
          activeShowId: id,
          activeTrackIds: [],
        }));
        return id;
      },

      deleteShow: (id) => set((s) => ({
        shows: s.shows.filter((sh) => sh.id !== id),
        tracks: s.tracks.filter((t) => t.showId !== id),
        scenes: s.scenes.filter((sc) => sc.showId !== id),
        scriptPages: s.scriptPages.filter((sp) => sp.showId !== id),
        blockingNotes: s.blockingNotes.filter((bn) => bn.showId !== id),
        costumeChanges: s.costumeChanges.filter((cc) => cc.showId !== id),
        scriptAnnotations: s.scriptAnnotations.filter((a) => a.showId !== id),
        groundPlans: s.groundPlans.filter((gp) => gp.showId !== id),
        stageMarks: s.stageMarks.filter((sm) => {
          const planIds = s.groundPlans.filter((gp) => gp.showId === id).map((gp) => gp.id);
          return !planIds.includes(sm.groundPlanId);
        }),
        activeShowId: s.activeShowId === id ? null : s.activeShowId,
        activeTrackIds: s.activeShowId === id ? [] : s.activeTrackIds,
      })),

      setActiveShow: (id) => set({ activeShowId: id, activeTrackIds: [] }),

      addTrack: (showId, characterName, color) => {
        const tracks = get().tracks.filter((t) => t.showId === showId);
        set((s) => ({
          tracks: [...s.tracks, {
            id: generateId(),
            showId,
            characterName,
            color: color || TRACK_COLORS[tracks.length % TRACK_COLORS.length],
            displayOrder: tracks.length,
          }],
        }));
      },

      deleteTrack: (id) => set((s) => ({
        tracks: s.tracks.filter((t) => t.id !== id),
        blockingNotes: s.blockingNotes.filter((bn) => bn.trackId !== id),
        costumeChanges: s.costumeChanges.filter((cc) => cc.trackId !== id),
        activeTrackIds: s.activeTrackIds.filter((tid) => tid !== id),
      })),

      toggleTrack: (id) => set((s) => {
        const isActive = s.activeTrackIds.includes(id);
        return {
          activeTrackIds: isActive
            ? s.activeTrackIds.filter((tid) => tid !== id)
            : [...s.activeTrackIds, id],
        };
      }),

      selectAllTracks: () => set({ activeTrackIds: [] }),

      selectOneTrack: (id) => set({ activeTrackIds: [id] }),

      addScene: (showId, actNumber, sceneNumber, name) => set((s) => ({
        scenes: [...s.scenes, { id: generateId(), showId, actNumber, sceneNumber, name }],
      })),

      deleteScene: (id) => set((s) => ({
        scenes: s.scenes.filter((sc) => sc.id !== id),
        blockingNotes: s.blockingNotes.filter((bn) => bn.sceneId !== id),
        costumeChanges: s.costumeChanges.filter((cc) => cc.sceneId !== id),
      })),

      importScript: (showId, text) => {
        const lines = text.split('\n');
        const linesPerPage = 40;
        const pages: ScriptPage[] = [];
        for (let i = 0; i < lines.length; i += linesPerPage) {
          pages.push({
            id: generateId(),
            showId,
            pageNumber: Math.floor(i / linesPerPage) + 1,
            content: lines.slice(i, i + linesPerPage).join('\n'),
            sceneId: null,
          });
        }
        set((s) => ({
          scriptPages: [
            ...s.scriptPages.filter((sp) => sp.showId !== showId),
            ...pages,
          ],
        }));
      },

      addBlockingNote: (note) => set((s) => ({
        blockingNotes: [...s.blockingNotes, { ...note, id: generateId() }],
      })),

      updateBlockingNote: (id, updates) => set((s) => ({
        blockingNotes: s.blockingNotes.map((bn) =>
          bn.id === id ? { ...bn, ...updates } : bn
        ),
      })),

      deleteBlockingNote: (id) => set((s) => ({
        blockingNotes: s.blockingNotes.filter((bn) => bn.id !== id),
      })),

      addCostumeChange: (change) => set((s) => ({
        costumeChanges: [...s.costumeChanges, { ...change, id: generateId() }],
      })),

      updateCostumeChange: (id, updates) => set((s) => ({
        costumeChanges: s.costumeChanges.map((cc) =>
          cc.id === id ? { ...cc, ...updates } : cc
        ),
      })),

      deleteCostumeChange: (id) => set((s) => ({
        costumeChanges: s.costumeChanges.filter((cc) => cc.id !== id),
      })),

      upsertScriptAnnotation: (showId, trackId, pageNumber, note) => set((s) => {
        const existing = s.scriptAnnotations.find(
          (a) => a.showId === showId && a.trackId === trackId && a.pageNumber === pageNumber
        );
        if (existing) {
          return {
            scriptAnnotations: s.scriptAnnotations.map((a) =>
              a.id === existing.id ? { ...a, note } : a
            ),
          };
        }
        return {
          scriptAnnotations: [...s.scriptAnnotations, {
            id: generateId(), showId, trackId, pageNumber, note,
          }],
        };
      }),

      addGroundPlan: (showId, sceneId, name, imageData) => {
        const id = generateId();
        set((s) => ({
          groundPlans: [...s.groundPlans, { id, showId, sceneId, imageData, name }],
        }));
        return id;
      },

      deleteGroundPlan: (id) => set((s) => ({
        groundPlans: s.groundPlans.filter((gp) => gp.id !== id),
        stageMarks: s.stageMarks.filter((sm) => sm.groundPlanId !== id),
      })),

      addStageMark: (groundPlanId, trackId, x, y, label) => {
        const existing = get().stageMarks.filter(
          (sm) => sm.groundPlanId === groundPlanId && sm.trackId === trackId
        );
        const nextOrder = existing.length > 0
          ? Math.max(...existing.map((sm) => sm.order)) + 1
          : 1;
        set((s) => ({
          stageMarks: [...s.stageMarks, { id: generateId(), groundPlanId, trackId, x, y, label, order: nextOrder }],
        }));
      },

      updateStageMark: (id, updates) => set((s) => ({
        stageMarks: s.stageMarks.map((sm) =>
          sm.id === id ? { ...sm, ...updates } : sm
        ),
      })),

      deleteStageMark: (id) => set((s) => ({
        stageMarks: s.stageMarks.filter((sm) => sm.id !== id),
      })),

      setMode: (mode) => set({ mode }),

      loadDemo: () => {
        set({
          shows: [sampleShow],
          tracks: [...sampleTracks],
          scenes: [...sampleScenes],
          scriptPages: [],
          blockingNotes: [...sampleBlockingNotes],
          costumeChanges: [...sampleCostumeChanges],
          scriptAnnotations: [],
          groundPlans: [...sampleGroundPlans],
          stageMarks: [...sampleStageMarks],
          activeShowId: sampleShow.id,
          activeTrackIds: [sampleTracks[0].id],
          mode: 'building',
        });
        // Load sample script in background
        fetch('/sample-script.txt')
          .then((r) => r.text())
          .then((text) => { if (text) get().importScript(sampleShow.id, text); })
          .catch(() => {});
      },

      clearAllData: () => set({
        shows: [],
        tracks: [],
        scenes: [],
        scriptPages: [],
        blockingNotes: [],
        costumeChanges: [],
        scriptAnnotations: [],
        groundPlans: [],
        stageMarks: [],
        activeShowId: null,
        activeTrackIds: [],
        mode: 'building',
      }),
    }),
    {
      name: 'swingtrack-storage',
      version: 2,
      migrate: (persisted: unknown, version: number) => {
        const state = persisted as Record<string, unknown>;
        // v0/v1 → v2: activeTrackId (string|null) → activeTrackIds (string[])
        if (version < 2) {
          const oldId = state.activeTrackId as string | null;
          state.activeTrackIds = oldId ? [oldId] : [];
          delete state.activeTrackId;
          // Ensure new arrays exist
          if (!state.scriptAnnotations) state.scriptAnnotations = [];
          if (!state.groundPlans) state.groundPlans = [];
          if (!state.stageMarks) state.stageMarks = [];
        }
        return state;
      },
    }
  )
);
