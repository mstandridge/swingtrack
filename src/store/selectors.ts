import { useShallow } from 'zustand/shallow';
import { useAppStore } from './useAppStore';

export const useActiveShow = () =>
  useAppStore((s) => s.shows.find((sh) => sh.id === s.activeShowId) ?? null);

// Returns the first selected track (primary track for editing)
export const useActiveTrack = () =>
  useAppStore((s) => {
    if (s.activeTrackIds.length === 0) return null;
    return s.tracks.find((t) => t.id === s.activeTrackIds[0]) ?? null;
  });

// Are all tracks selected? (empty array = all)
export const useAllTracksSelected = () =>
  useAppStore((s) => s.activeTrackIds.length === 0);

// Is a specific track selected?
export const useIsTrackSelected = (trackId: string) =>
  useAppStore((s) => s.activeTrackIds.length === 0 || s.activeTrackIds.includes(trackId));

export const useShowTracks = () =>
  useAppStore(
    useShallow((s) => s.tracks
      .filter((t) => t.showId === s.activeShowId)
      .sort((a, b) => a.displayOrder - b.displayOrder)
    )
  );

export const useShowScenes = () =>
  useAppStore(
    useShallow((s) => s.scenes
      .filter((sc) => sc.showId === s.activeShowId)
      .sort((a, b) => a.actNumber - b.actNumber || a.sceneNumber - b.sceneNumber)
    )
  );

export const useFilteredBlockingNotes = () =>
  useAppStore(
    useShallow((s) => {
      const trackFilter = s.activeTrackIds.length === 0
        ? s.tracks.filter((t) => t.showId === s.activeShowId).map((t) => t.id)
        : s.activeTrackIds;
      return s.blockingNotes.filter((bn) =>
        bn.showId === s.activeShowId && trackFilter.includes(bn.trackId)
      );
    })
  );

export const useFilteredCostumeChanges = () =>
  useAppStore(
    useShallow((s) => {
      const trackFilter = s.activeTrackIds.length === 0
        ? s.tracks.filter((t) => t.showId === s.activeShowId).map((t) => t.id)
        : s.activeTrackIds;
      return s.costumeChanges
        .filter((cc) => cc.showId === s.activeShowId && trackFilter.includes(cc.trackId))
        .sort((a, b) => a.changeNumber - b.changeNumber);
    })
  );

export const useShowScriptPages = () =>
  useAppStore(
    useShallow((s) => s.scriptPages
      .filter((sp) => sp.showId === s.activeShowId)
      .sort((a, b) => a.pageNumber - b.pageNumber)
    )
  );

export const useScriptAnnotation = (pageNumber: number) =>
  useAppStore((s) => {
    const primaryTrackId = s.activeTrackIds[0] ?? null;
    if (!primaryTrackId) return '';
    return s.scriptAnnotations.find(
      (a) => a.showId === s.activeShowId && a.trackId === primaryTrackId && a.pageNumber === pageNumber
    )?.note ?? '';
  });

export const useShowGroundPlans = () =>
  useAppStore(
    useShallow((s) => s.groundPlans.filter((gp) => gp.showId === s.activeShowId))
  );

export const useGroundPlanMarks = (groundPlanId: string) =>
  useAppStore(
    useShallow((s) => s.stageMarks.filter((sm) => sm.groundPlanId === groundPlanId))
  );
