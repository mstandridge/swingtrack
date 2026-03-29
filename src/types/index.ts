export interface Show {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Track {
  id: string;
  showId: string;
  characterName: string;
  color: string;
  displayOrder: number;
}

export interface Scene {
  id: string;
  showId: string;
  actNumber: number;
  sceneNumber: number;
  name: string;
}

export interface ScriptPage {
  id: string;
  showId: string;
  pageNumber: number;
  content: string;
  sceneId: string | null;
}

export interface BlockingNote {
  id: string;
  trackId: string;
  showId: string;
  sceneId: string;
  pageNumber: number | null;
  entranceFrom: string;
  exitTo: string;
  startingPosition: string;
  endingPosition: string;
  crossingPattern: string;
  notes: string;
  props: string;
}

export interface ChoreographyNote {
  id: string;
  trackId: string;
  showId: string;
  sceneId: string;
  audioTimestamp: number;
  counts: string;
  movement: string;
  formation: string;
  notes: string;
}

export interface CostumeChange {
  id: string;
  trackId: string;
  showId: string;
  sceneId: string;
  changeNumber: number;
  location: string;
  timeAvailable: string;
  putOn: string;
  takeOff: string;
  dressers: string;
  notes: string;
}

export interface ScriptAnnotation {
  id: string;
  showId: string;
  trackId: string;
  pageNumber: number;
  note: string;
}

export interface GroundPlan {
  id: string;
  showId: string;
  sceneId: string;
  imageData: string; // base64 data URL of uploaded image
  name: string;
}

export interface StageMark {
  id: string;
  groundPlanId: string;
  trackId: string;
  x: number; // 0-100 percentage position
  y: number; // 0-100 percentage position
  label: string;
  order: number; // sequence number for movement path
}

export type AppMode = 'building' | 'reference';
