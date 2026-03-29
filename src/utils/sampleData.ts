import type { Show, Track, Scene, BlockingNote, CostumeChange } from '../types';

const SHOW_ID = 'sample-show-1';

export const sampleShow: Show = {
  id: SHOW_ID,
  name: 'A Midsummer Night\'s Dream',
  createdAt: '2026-03-29T00:00:00Z',
  updatedAt: '2026-03-29T00:00:00Z',
};

export const sampleTracks: Track[] = [
  { id: 'track-hermia', showId: SHOW_ID, characterName: 'Hermia', color: '#e74c3c', displayOrder: 0 },
  { id: 'track-helena', showId: SHOW_ID, characterName: 'Helena', color: '#3498db', displayOrder: 1 },
  { id: 'track-lysander', showId: SHOW_ID, characterName: 'Lysander', color: '#2ecc71', displayOrder: 2 },
  { id: 'track-demetrius', showId: SHOW_ID, characterName: 'Demetrius', color: '#f39c12', displayOrder: 3 },
  { id: 'track-bottom', showId: SHOW_ID, characterName: 'Bottom', color: '#9b59b6', displayOrder: 4 },
  { id: 'track-puck', showId: SHOW_ID, characterName: 'Puck', color: '#1abc9c', displayOrder: 5 },
  { id: 'track-oberon', showId: SHOW_ID, characterName: 'Oberon', color: '#e67e22', displayOrder: 6 },
  { id: 'track-titania', showId: SHOW_ID, characterName: 'Titania', color: '#e84393', displayOrder: 7 },
];

export const sampleScenes: Scene[] = [
  { id: 'scene-1-1', showId: SHOW_ID, actNumber: 1, sceneNumber: 1, name: 'Palace of Theseus' },
  { id: 'scene-1-2', showId: SHOW_ID, actNumber: 1, sceneNumber: 2, name: 'Quince\'s Cottage' },
  { id: 'scene-2-1', showId: SHOW_ID, actNumber: 2, sceneNumber: 1, name: 'The Wood - Fairy Meeting' },
  { id: 'scene-2-2', showId: SHOW_ID, actNumber: 2, sceneNumber: 2, name: 'The Wood - Lovers Chase' },
  { id: 'scene-3-1', showId: SHOW_ID, actNumber: 3, sceneNumber: 1, name: 'The Wood - Rehearsal & Transformation' },
  { id: 'scene-3-2', showId: SHOW_ID, actNumber: 3, sceneNumber: 2, name: 'The Wood - Love Juice Chaos' },
  { id: 'scene-4-1', showId: SHOW_ID, actNumber: 4, sceneNumber: 1, name: 'The Wood - Awakening' },
  { id: 'scene-5-1', showId: SHOW_ID, actNumber: 5, sceneNumber: 1, name: 'Palace - Pyramus & Thisbe' },
];

export const sampleBlockingNotes: BlockingNote[] = [
  // Hermia
  {
    id: 'bn-hermia-1', trackId: 'track-hermia', showId: SHOW_ID, sceneId: 'scene-1-1', pageNumber: null,
    entranceFrom: 'SR with Egeus, Lysander, Demetrius',
    exitTo: 'SL with Lysander after court clears',
    startingPosition: 'DC, kneeling before Theseus',
    endingPosition: 'DSL with Lysander',
    crossingPattern: 'Cross to Lysander after Theseus exits, then DSL together',
    notes: 'Stay defiant but respectful when addressing Theseus. Big moment: "So will I grow, so live, so die, my lord"',
    props: '',
  },
  {
    id: 'bn-hermia-2', trackId: 'track-hermia', showId: SHOW_ID, sceneId: 'scene-2-2', pageNumber: null,
    entranceFrom: 'USR through trees',
    exitTo: 'SL chasing after Lysander',
    startingPosition: 'Asleep USC on forest floor',
    endingPosition: 'DSL',
    crossingPattern: 'Wake up, search frantically CS, then chase SL',
    notes: 'Wake up alone and panicked. Lysander is gone. Build from confusion to fear.',
    props: '',
  },
  {
    id: 'bn-hermia-3', trackId: 'track-hermia', showId: SHOW_ID, sceneId: 'scene-3-2', pageNumber: null,
    entranceFrom: 'SL running',
    exitTo: 'SR after the fight, collapse from exhaustion',
    startingPosition: 'DSL',
    endingPosition: 'CSR on the ground asleep',
    crossingPattern: 'Confront Helena CS, nearly fight, separated by Lysander, cross SR, fall asleep',
    notes: 'The big fight with Helena. Remember: she is furious AND heartbroken. "Little" comments hit hard.',
    props: '',
  },
  // Helena
  {
    id: 'bn-helena-1', trackId: 'track-helena', showId: SHOW_ID, sceneId: 'scene-1-1', pageNumber: null,
    entranceFrom: 'SR alone, after court exits',
    exitTo: 'SR to follow Demetrius to the wood',
    startingPosition: 'CSR',
    endingPosition: 'DSR',
    crossingPattern: 'Enter to Hermia & Lysander CS, they share plan and exit, monologue moving DS',
    notes: 'Desperate energy. Decides to tell Demetrius about Hermia\'s plan to win his favor.',
    props: '',
  },
  {
    id: 'bn-helena-2', trackId: 'track-helena', showId: SHOW_ID, sceneId: 'scene-2-2', pageNumber: null,
    entranceFrom: 'SR chasing Demetrius',
    exitTo: 'SL running from both men',
    startingPosition: 'DSR',
    endingPosition: 'DSL',
    crossingPattern: 'Chase Demetrius SR to CS, then when Lysander wakes and pursues her, back away to SL',
    notes: 'Goes from chasing to being chased. Thinks they are mocking her. Build the confusion.',
    props: '',
  },
  {
    id: 'bn-helena-3', trackId: 'track-helena', showId: SHOW_ID, sceneId: 'scene-3-2', pageNumber: null,
    entranceFrom: 'SL with Lysander and Demetrius fighting over her',
    exitTo: 'SR, collapse from exhaustion',
    startingPosition: 'CSL',
    endingPosition: 'CSR on the ground asleep',
    crossingPattern: 'Backed CS by both men, then confronted by Hermia, cross SR trying to escape, fall asleep',
    notes: 'Helena thinks EVERYONE is pranking her. Both men love her now and she doesn\'t believe it.',
    props: '',
  },
  // Lysander
  {
    id: 'bn-lysander-1', trackId: 'track-lysander', showId: SHOW_ID, sceneId: 'scene-1-1', pageNumber: null,
    entranceFrom: 'SR with Egeus, Hermia, Demetrius',
    exitTo: 'SL with Hermia',
    startingPosition: 'CSR behind Hermia',
    endingPosition: 'DSL holding Hermia',
    crossingPattern: 'Step forward to plead case CS, retreat back, then after court exits cross to Hermia DSL',
    notes: 'Make the case confidently. "I am, my lord, as well derived as he"',
    props: '',
  },
  {
    id: 'bn-lysander-2', trackId: 'track-lysander', showId: SHOW_ID, sceneId: 'scene-2-2', pageNumber: null,
    entranceFrom: 'Already onstage asleep USC with Hermia',
    exitTo: 'SL chasing Helena',
    startingPosition: 'USC on forest floor',
    endingPosition: 'Off SL',
    crossingPattern: 'Wake when Puck applies juice, see Helena, cross DS to her declaring love',
    notes: 'Under the love spell now. Completely abandon Hermia. Total 180.',
    props: '',
  },
  // Demetrius
  {
    id: 'bn-demetrius-1', trackId: 'track-demetrius', showId: SHOW_ID, sceneId: 'scene-1-1', pageNumber: null,
    entranceFrom: 'SR with Egeus, Hermia, Lysander',
    exitTo: 'SR with Egeus and Theseus',
    startingPosition: 'CSL near Egeus',
    endingPosition: 'Off SR',
    crossingPattern: 'Stand ground CS, smug, exit with the adults',
    notes: 'Confident, entitled. Egeus is on your side. "Relent, sweet Hermia"',
    props: '',
  },
  // Bottom
  {
    id: 'bn-bottom-1', trackId: 'track-bottom', showId: SHOW_ID, sceneId: 'scene-1-2', pageNumber: null,
    entranceFrom: 'SR with the mechanicals',
    exitTo: 'SL all together to rehearse in the wood',
    startingPosition: 'CS, takes over the room immediately',
    endingPosition: 'CS leading everyone out',
    crossingPattern: 'Big cross DSC for each character he volunteers to play',
    notes: 'Biggest energy in the room. Volunteers for EVERY part. "Let me play the lion too!"',
    props: 'Scroll (Quince has the cast list)',
  },
  {
    id: 'bn-bottom-2', trackId: 'track-bottom', showId: SHOW_ID, sceneId: 'scene-3-1', pageNumber: null,
    entranceFrom: 'SR with mechanicals for rehearsal',
    exitTo: 'SL running with donkey head, chased offstage',
    startingPosition: 'CS rehearsing',
    endingPosition: 'Off SL in a panic',
    crossingPattern: 'Rehearse CS, exit through trees SR for "cue", return with donkey head, chaos, run off SL',
    notes: 'THE transformation. Puck gives you the donkey head offstage SR. Come back confused why everyone is screaming.',
    props: 'Donkey head (put on during SR exit)',
  },
  // Puck
  {
    id: 'bn-puck-1', trackId: 'track-puck', showId: SHOW_ID, sceneId: 'scene-2-1', pageNumber: null,
    entranceFrom: 'USL from the trees, playful',
    exitTo: 'USR to find the flower',
    startingPosition: 'USL',
    endingPosition: 'Off USR',
    crossingPattern: 'Bounce around the stage while describing pranks, then exit USR on Oberon\'s orders',
    notes: 'First entrance! Establish the mischief energy. "I am that merry wanderer of the night"',
    props: '',
  },
  {
    id: 'bn-puck-2', trackId: 'track-puck', showId: SHOW_ID, sceneId: 'scene-2-2', pageNumber: null,
    entranceFrom: 'USR with the magic flower',
    exitTo: 'USL after applying love juice to the WRONG Athenian',
    startingPosition: 'USR',
    endingPosition: 'Off USL',
    crossingPattern: 'Creep DS to sleeping Lysander, apply juice, exit USL satisfied (but wrong person!)',
    notes: 'You think you got the right one. Oberon said Athenian garments. Oops.',
    props: 'Magic flower / love juice vial',
  },
];

export const sampleCostumeChanges: CostumeChange[] = [
  // Hermia
  {
    id: 'cc-hermia-1', trackId: 'track-hermia', showId: SHOW_ID, sceneId: 'scene-1-1',
    changeNumber: 1, location: 'Pre-set', timeAvailable: 'Pre-show',
    putOn: 'Court dress (rose/red), heeled shoes, hair up with pins',
    takeOff: '', dressers: '', notes: 'Top of show look. Noble, put-together.',
  },
  {
    id: 'cc-hermia-2', trackId: 'track-hermia', showId: SHOW_ID, sceneId: 'scene-2-1',
    changeNumber: 2, location: 'Quick change SR',
    timeAvailable: '45 seconds during scene change',
    putOn: 'Forest dress (simpler, earth tones), boots, hair half-down',
    takeOff: 'Court dress, heeled shoes, hair pins',
    dressers: 'Dresser 1 SR', notes: 'Running away look. Less formal. Pre-set boots SR.',
  },
  {
    id: 'cc-hermia-3', trackId: 'track-hermia', showId: SHOW_ID, sceneId: 'scene-5-1',
    changeNumber: 3, location: 'Quick change SL',
    timeAvailable: 'During Act 4 scene transition, ~1 min',
    putOn: 'Wedding dress (white/gold), clean shoes, hair freshly up',
    takeOff: 'Forest dress (now dirty/torn), boots',
    dressers: 'Dresser 2 SL', notes: 'Happy ending look. Everything resolved.',
  },
  // Helena
  {
    id: 'cc-helena-1', trackId: 'track-helena', showId: SHOW_ID, sceneId: 'scene-1-1',
    changeNumber: 1, location: 'Pre-set', timeAvailable: 'Pre-show',
    putOn: 'Court dress (blue), heeled shoes, hair styled',
    takeOff: '', dressers: '', notes: 'Matches Hermia in formality but blue palette.',
  },
  {
    id: 'cc-helena-2', trackId: 'track-helena', showId: SHOW_ID, sceneId: 'scene-2-2',
    changeNumber: 2, location: 'Quick change SR',
    timeAvailable: '30 seconds',
    putOn: 'Forest look (blue/grey, more disheveled), flats',
    takeOff: 'Court dress, heeled shoes',
    dressers: 'Dresser 1 SR', notes: 'She\'s been chasing Demetrius through the forest. Should look like it.',
  },
  // Bottom
  {
    id: 'cc-bottom-1', trackId: 'track-bottom', showId: SHOW_ID, sceneId: 'scene-1-2',
    changeNumber: 1, location: 'Pre-set', timeAvailable: 'Pre-show',
    putOn: 'Weaver work clothes, apron, cap',
    takeOff: '', dressers: '', notes: 'Working class look. Proudest guy in the room.',
  },
  {
    id: 'cc-bottom-2', trackId: 'track-bottom', showId: SHOW_ID, sceneId: 'scene-3-1',
    changeNumber: 2, location: 'Quick change SR behind trees',
    timeAvailable: '15 seconds during brief exit',
    putOn: 'DONKEY HEAD over existing costume',
    takeOff: 'Cap',
    dressers: 'Dresser 3 SR', notes: 'THE CHANGE. Must be fast. Dresser hands head, you pull it on, re-enter immediately.',
  },
  {
    id: 'cc-bottom-3', trackId: 'track-bottom', showId: SHOW_ID, sceneId: 'scene-4-1',
    changeNumber: 3, location: 'Onstage (Titania removes it)',
    timeAvailable: 'During scene',
    putOn: 'Flower crown from Titania (stays on through end)',
    takeOff: 'Donkey head (Titania/Oberon lifts it off)',
    dressers: 'Titania actress helps', notes: 'Staged removal. Titania cradles the head off. Emotional moment.',
  },
];
