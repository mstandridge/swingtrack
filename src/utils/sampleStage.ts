// Generate a simple stage ground plan as an SVG data URL
function createStageSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <!-- Background -->
    <rect width="800" height="500" fill="#f5f0e8"/>

    <!-- Stage floor -->
    <rect x="60" y="40" width="680" height="400" rx="4" fill="#e8dcc8" stroke="#8b7355" stroke-width="2"/>

    <!-- Apron / downstage curve -->
    <path d="M 60 440 Q 400 490 740 440" fill="#ddd0b8" stroke="#8b7355" stroke-width="2"/>

    <!-- Center line -->
    <line x1="400" y1="40" x2="400" y2="440" stroke="#8b7355" stroke-width="1" stroke-dasharray="8,4" opacity="0.5"/>

    <!-- Plaster line -->
    <line x1="60" y1="120" x2="740" y2="120" stroke="#8b7355" stroke-width="1" stroke-dasharray="8,4" opacity="0.5"/>

    <!-- Wing spaces - Stage Left -->
    <rect x="10" y="120" width="50" height="80" fill="#d4c4a8" stroke="#8b7355" stroke-width="1" rx="2"/>
    <text x="35" y="165" text-anchor="middle" font-size="9" fill="#8b7355" font-family="sans-serif">Wing</text>
    <rect x="10" y="220" width="50" height="80" fill="#d4c4a8" stroke="#8b7355" stroke-width="1" rx="2"/>
    <text x="35" y="265" text-anchor="middle" font-size="9" fill="#8b7355" font-family="sans-serif">Wing</text>
    <rect x="10" y="320" width="50" height="80" fill="#d4c4a8" stroke="#8b7355" stroke-width="1" rx="2"/>
    <text x="35" y="365" text-anchor="middle" font-size="9" fill="#8b7355" font-family="sans-serif">Wing</text>

    <!-- Wing spaces - Stage Right -->
    <rect x="740" y="120" width="50" height="80" fill="#d4c4a8" stroke="#8b7355" stroke-width="1" rx="2"/>
    <text x="765" y="165" text-anchor="middle" font-size="9" fill="#8b7355" font-family="sans-serif">Wing</text>
    <rect x="740" y="220" width="50" height="80" fill="#d4c4a8" stroke="#8b7355" stroke-width="1" rx="2"/>
    <text x="765" y="265" text-anchor="middle" font-size="9" fill="#8b7355" font-family="sans-serif">Wing</text>
    <rect x="740" y="320" width="50" height="80" fill="#d4c4a8" stroke="#8b7355" stroke-width="1" rx="2"/>
    <text x="765" y="365" text-anchor="middle" font-size="9" fill="#8b7355" font-family="sans-serif">Wing</text>

    <!-- Legs (masking) -->
    <rect x="60" y="170" width="15" height="10" fill="#555" rx="1"/>
    <rect x="725" y="170" width="15" height="10" fill="#555" rx="1"/>
    <rect x="60" y="270" width="15" height="10" fill="#555" rx="1"/>
    <rect x="725" y="270" width="15" height="10" fill="#555" rx="1"/>
    <rect x="60" y="370" width="15" height="10" fill="#555" rx="1"/>
    <rect x="725" y="370" width="15" height="10" fill="#555" rx="1"/>

    <!-- Theseus throne/platform (Act 1 Scene 1) -->
    <rect x="330" y="60" width="140" height="50" rx="4" fill="#c4a87a" stroke="#8b7355" stroke-width="2"/>
    <text x="400" y="88" text-anchor="middle" font-size="11" fill="#5a4a2f" font-family="sans-serif" font-weight="bold">THRONE</text>

    <!-- Steps from throne -->
    <rect x="365" y="110" width="70" height="12" rx="2" fill="#d4c4a8" stroke="#8b7355" stroke-width="1"/>

    <!-- Columns -->
    <circle cx="160" cy="140" r="12" fill="#bbb0a0" stroke="#8b7355" stroke-width="1.5"/>
    <circle cx="640" cy="140" r="12" fill="#bbb0a0" stroke="#8b7355" stroke-width="1.5"/>
    <circle cx="160" cy="300" r="12" fill="#bbb0a0" stroke="#8b7355" stroke-width="1.5"/>
    <circle cx="640" cy="300" r="12" fill="#bbb0a0" stroke="#8b7355" stroke-width="1.5"/>

    <!-- Grid labels -->
    <text x="400" y="30" text-anchor="middle" font-size="11" fill="#999" font-family="sans-serif">UPSTAGE</text>
    <text x="400" y="490" text-anchor="middle" font-size="11" fill="#999" font-family="sans-serif">DOWNSTAGE (AUDIENCE)</text>
    <text x="30" y="250" text-anchor="middle" font-size="10" fill="#999" font-family="sans-serif" transform="rotate(-90,30,250)">STAGE LEFT</text>
    <text x="785" y="250" text-anchor="middle" font-size="10" fill="#999" font-family="sans-serif" transform="rotate(90,785,250)">STAGE RIGHT</text>

    <!-- Position reference dots -->
    <circle cx="400" cy="80" r="2" fill="#ccc"/>
    <text x="400" y="75" text-anchor="middle" font-size="7" fill="#bbb" font-family="sans-serif">USC</text>
    <circle cx="400" cy="240" r="2" fill="#ccc"/>
    <text x="400" y="235" text-anchor="middle" font-size="7" fill="#bbb" font-family="sans-serif">CS</text>
    <circle cx="400" cy="400" r="2" fill="#ccc"/>
    <text x="400" y="395" text-anchor="middle" font-size="7" fill="#bbb" font-family="sans-serif">DSC</text>
    <circle cx="200" cy="400" r="2" fill="#ccc"/>
    <text x="200" y="395" text-anchor="middle" font-size="7" fill="#bbb" font-family="sans-serif">DSL</text>
    <circle cx="600" cy="400" r="2" fill="#ccc"/>
    <text x="600" y="395" text-anchor="middle" font-size="7" fill="#bbb" font-family="sans-serif">DSR</text>
    <circle cx="200" cy="80" r="2" fill="#ccc"/>
    <text x="200" y="75" text-anchor="middle" font-size="7" fill="#bbb" font-family="sans-serif">USL</text>
    <circle cx="600" cy="80" r="2" fill="#ccc"/>
    <text x="600" y="75" text-anchor="middle" font-size="7" fill="#bbb" font-family="sans-serif">USR</text>
  </svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Forest scene ground plan
function createForestSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <!-- Background -->
    <rect width="800" height="500" fill="#2d3a2d"/>

    <!-- Stage floor - forest ground -->
    <rect x="60" y="40" width="680" height="400" rx="4" fill="#3d4a35" stroke="#5a6b4a" stroke-width="2"/>

    <!-- Apron -->
    <path d="M 60 440 Q 400 490 740 440" fill="#354030" stroke="#5a6b4a" stroke-width="2"/>

    <!-- Center line (faint) -->
    <line x1="400" y1="40" x2="400" y2="440" stroke="#5a6b4a" stroke-width="1" stroke-dasharray="8,4" opacity="0.3"/>

    <!-- Wing spaces -->
    <rect x="10" y="120" width="50" height="80" fill="#2a3525" stroke="#5a6b4a" stroke-width="1" rx="2"/>
    <rect x="10" y="220" width="50" height="80" fill="#2a3525" stroke="#5a6b4a" stroke-width="1" rx="2"/>
    <rect x="10" y="320" width="50" height="80" fill="#2a3525" stroke="#5a6b4a" stroke-width="1" rx="2"/>
    <rect x="740" y="120" width="50" height="80" fill="#2a3525" stroke="#5a6b4a" stroke-width="1" rx="2"/>
    <rect x="740" y="220" width="50" height="80" fill="#2a3525" stroke="#5a6b4a" stroke-width="1" rx="2"/>
    <rect x="740" y="320" width="50" height="80" fill="#2a3525" stroke="#5a6b4a" stroke-width="1" rx="2"/>

    <!-- Trees -->
    <circle cx="120" cy="80" r="30" fill="#2a5a2a" opacity="0.7"/>
    <circle cx="680" cy="80" r="35" fill="#2a5a2a" opacity="0.7"/>
    <circle cx="100" cy="180" r="25" fill="#1f4a1f" opacity="0.6"/>
    <circle cx="700" cy="200" r="28" fill="#1f4a1f" opacity="0.6"/>
    <circle cx="130" cy="350" r="32" fill="#2a5a2a" opacity="0.5"/>
    <circle cx="670" cy="330" r="30" fill="#2a5a2a" opacity="0.5"/>
    <circle cx="300" cy="70" r="22" fill="#1f4a1f" opacity="0.5"/>
    <circle cx="520" cy="60" r="26" fill="#1f4a1f" opacity="0.5"/>

    <!-- Tree trunks -->
    <rect x="115" y="90" width="10" height="20" fill="#5a3a1a" rx="2"/>
    <rect x="675" y="95" width="10" height="20" fill="#5a3a1a" rx="2"/>
    <rect x="95" y="190" width="10" height="15" fill="#5a3a1a" rx="2"/>
    <rect x="695" y="210" width="10" height="15" fill="#5a3a1a" rx="2"/>

    <!-- Fairy mound / Titania's bower (USC) -->
    <ellipse cx="400" cy="100" rx="80" ry="35" fill="#4a5a3a" stroke="#7a8a6a" stroke-width="2"/>
    <text x="400" y="105" text-anchor="middle" font-size="11" fill="#b0c090" font-family="sans-serif" font-weight="bold">TITANIA'S BOWER</text>

    <!-- Mossy rock (DSR) -->
    <ellipse cx="580" cy="350" rx="40" ry="20" fill="#5a5a4a" stroke="#7a7a6a" stroke-width="1.5"/>
    <text x="580" y="355" text-anchor="middle" font-size="9" fill="#aaa" font-family="sans-serif">Rock</text>

    <!-- Fallen log (DSL) -->
    <rect x="160" y="370" width="80" height="12" rx="6" fill="#5a3a1a" stroke="#7a5a3a" stroke-width="1" transform="rotate(-15,200,376)"/>
    <text x="200" y="395" text-anchor="middle" font-size="9" fill="#aaa" font-family="sans-serif">Log</text>

    <!-- Clearing area (CS) -->
    <ellipse cx="400" cy="260" rx="120" ry="80" fill="#455a3a" stroke="#5a6b4a" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>
    <text x="400" y="265" text-anchor="middle" font-size="9" fill="#7a8a6a" font-family="sans-serif">Clearing</text>

    <!-- Grid labels -->
    <text x="400" y="30" text-anchor="middle" font-size="11" fill="#8a9a7a" font-family="sans-serif">UPSTAGE</text>
    <text x="400" y="490" text-anchor="middle" font-size="11" fill="#8a9a7a" font-family="sans-serif">DOWNSTAGE (AUDIENCE)</text>
    <text x="30" y="250" text-anchor="middle" font-size="10" fill="#8a9a7a" font-family="sans-serif" transform="rotate(-90,30,250)">STAGE LEFT</text>
    <text x="785" y="250" text-anchor="middle" font-size="10" fill="#8a9a7a" font-family="sans-serif" transform="rotate(90,785,250)">STAGE RIGHT</text>

    <!-- Position refs -->
    <circle cx="400" cy="100" r="2" fill="#8a9a7a"/>
    <circle cx="400" cy="260" r="2" fill="#8a9a7a"/>
    <circle cx="400" cy="400" r="2" fill="#8a9a7a"/>
  </svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export const sampleGroundPlans = [
  {
    id: 'gp-palace',
    showId: 'sample-show-1',
    sceneId: 'scene-1-1',
    name: 'A1S1 — Palace of Theseus',
    imageData: createStageSvg(),
  },
  {
    id: 'gp-forest',
    showId: 'sample-show-1',
    sceneId: 'scene-2-1',
    name: 'A2S1 — The Forest',
    imageData: createForestSvg(),
  },
];

export const sampleStageMarks = [
  // === Palace scene (A1S1) ===

  // Hermia: enters SR → kneels DC → crosses to Lysander DSL → exits SL
  { id: 'sm-hermia-p1', groundPlanId: 'gp-palace', trackId: 'track-hermia', x: 82, y: 45, label: 'Enter with Egeus', order: 1 },
  { id: 'sm-hermia-p2', groundPlanId: 'gp-palace', trackId: 'track-hermia', x: 50, y: 60, label: 'Kneel before Theseus', order: 2 },
  { id: 'sm-hermia-p3', groundPlanId: 'gp-palace', trackId: 'track-hermia', x: 30, y: 75, label: 'Cross to Lysander', order: 3 },
  { id: 'sm-hermia-p4', groundPlanId: 'gp-palace', trackId: 'track-hermia', x: 12, y: 80, label: 'Exit SL together', order: 4 },

  // Lysander: enters SR → pleads case CS → retreats → DSL with Hermia → exits SL
  { id: 'sm-lysander-p1', groundPlanId: 'gp-palace', trackId: 'track-lysander', x: 78, y: 48, label: 'Enter SR', order: 1 },
  { id: 'sm-lysander-p2', groundPlanId: 'gp-palace', trackId: 'track-lysander', x: 50, y: 50, label: 'Step forward, plead case', order: 2 },
  { id: 'sm-lysander-p3', groundPlanId: 'gp-palace', trackId: 'track-lysander', x: 35, y: 70, label: 'Wait DSL', order: 3 },
  { id: 'sm-lysander-p4', groundPlanId: 'gp-palace', trackId: 'track-lysander', x: 12, y: 78, label: 'Exit SL with Hermia', order: 4 },

  // Demetrius: enters SR → stands near Egeus → exits SR with adults
  { id: 'sm-demetrius-p1', groundPlanId: 'gp-palace', trackId: 'track-demetrius', x: 80, y: 42, label: 'Enter SR with Egeus', order: 1 },
  { id: 'sm-demetrius-p2', groundPlanId: 'gp-palace', trackId: 'track-demetrius', x: 42, y: 48, label: 'Stand ground, smug', order: 2 },
  { id: 'sm-demetrius-p3', groundPlanId: 'gp-palace', trackId: 'track-demetrius', x: 85, y: 40, label: 'Exit SR with Theseus', order: 3 },

  // Helena: enters SR alone → CS with lovers → monologue DS → exits SR
  { id: 'sm-helena-p1', groundPlanId: 'gp-palace', trackId: 'track-helena', x: 82, y: 55, label: 'Enter SR alone', order: 1 },
  { id: 'sm-helena-p2', groundPlanId: 'gp-palace', trackId: 'track-helena', x: 50, y: 55, label: 'Learn escape plan', order: 2 },
  { id: 'sm-helena-p3', groundPlanId: 'gp-palace', trackId: 'track-helena', x: 55, y: 80, label: 'Monologue DS', order: 3 },
  { id: 'sm-helena-p4', groundPlanId: 'gp-palace', trackId: 'track-helena', x: 88, y: 75, label: 'Exit SR to find Demetrius', order: 4 },

  // === Forest scene (A2S1+) ===

  // Puck: enters USL → bounces through clearing → exits USR for flower
  { id: 'sm-puck-f1', groundPlanId: 'gp-forest', trackId: 'track-puck', x: 15, y: 18, label: 'Enter USL, playful', order: 1 },
  { id: 'sm-puck-f2', groundPlanId: 'gp-forest', trackId: 'track-puck', x: 35, y: 45, label: 'Describe pranks CS', order: 2 },
  { id: 'sm-puck-f3', groundPlanId: 'gp-forest', trackId: 'track-puck', x: 55, y: 35, label: 'Get orders from Oberon', order: 3 },
  { id: 'sm-puck-f4', groundPlanId: 'gp-forest', trackId: 'track-puck', x: 88, y: 15, label: 'Exit USR for flower', order: 4 },

  // Oberon: hidden USR → crosses to confront Titania → retreats USR
  { id: 'sm-oberon-f1', groundPlanId: 'gp-forest', trackId: 'track-oberon', x: 82, y: 18, label: 'Hidden USR', order: 1 },
  { id: 'sm-oberon-f2', groundPlanId: 'gp-forest', trackId: 'track-oberon', x: 55, y: 30, label: 'Confront Titania', order: 2 },
  { id: 'sm-oberon-f3', groundPlanId: 'gp-forest', trackId: 'track-oberon', x: 78, y: 22, label: 'Retreat, plot revenge', order: 3 },

  // Titania: in bower → confronts Oberon → returns to bower
  { id: 'sm-titania-f1', groundPlanId: 'gp-forest', trackId: 'track-titania', x: 50, y: 20, label: 'In bower', order: 1 },
  { id: 'sm-titania-f2', groundPlanId: 'gp-forest', trackId: 'track-titania', x: 45, y: 35, label: 'Confront Oberon', order: 2 },
  { id: 'sm-titania-f3', groundPlanId: 'gp-forest', trackId: 'track-titania', x: 50, y: 22, label: 'Return to bower, sleep', order: 3 },

  // Hermia: asleep → wakes → searches → exits SL
  { id: 'sm-hermia-f1', groundPlanId: 'gp-forest', trackId: 'track-hermia', x: 42, y: 40, label: 'Asleep on ground', order: 1 },
  { id: 'sm-hermia-f2', groundPlanId: 'gp-forest', trackId: 'track-hermia', x: 48, y: 50, label: 'Wake up, panicked', order: 2 },
  { id: 'sm-hermia-f3', groundPlanId: 'gp-forest', trackId: 'track-hermia', x: 40, y: 60, label: 'Search for Lysander', order: 3 },
  { id: 'sm-hermia-f4', groundPlanId: 'gp-forest', trackId: 'track-hermia', x: 12, y: 65, label: 'Exit SL chasing', order: 4 },

  // Lysander: asleep → Puck applies juice → sees Helena → chases SL
  { id: 'sm-lysander-f1', groundPlanId: 'gp-forest', trackId: 'track-lysander', x: 48, y: 42, label: 'Asleep near Hermia', order: 1 },
  { id: 'sm-lysander-f2', groundPlanId: 'gp-forest', trackId: 'track-lysander', x: 52, y: 50, label: 'Wake (love juice!)', order: 2 },
  { id: 'sm-lysander-f3', groundPlanId: 'gp-forest', trackId: 'track-lysander', x: 65, y: 60, label: 'See Helena, declare love', order: 3 },
  { id: 'sm-lysander-f4', groundPlanId: 'gp-forest', trackId: 'track-lysander', x: 15, y: 70, label: 'Chase Helena off SL', order: 4 },

  // Helena: enters SR chasing Demetrius → crosses CS → runs off SL
  { id: 'sm-helena-f1', groundPlanId: 'gp-forest', trackId: 'track-helena', x: 88, y: 55, label: 'Enter SR chasing Demetrius', order: 1 },
  { id: 'sm-helena-f2', groundPlanId: 'gp-forest', trackId: 'track-helena', x: 60, y: 55, label: 'Demetrius rejects her', order: 2 },
  { id: 'sm-helena-f3', groundPlanId: 'gp-forest', trackId: 'track-helena', x: 50, y: 58, label: 'Lysander wakes, pursues her', order: 3 },
  { id: 'sm-helena-f4', groundPlanId: 'gp-forest', trackId: 'track-helena', x: 15, y: 60, label: 'Run off SL confused', order: 4 },

  // Demetrius: enters SR → tries to lose Helena → exits SR into woods
  { id: 'sm-demetrius-f1', groundPlanId: 'gp-forest', trackId: 'track-demetrius', x: 85, y: 50, label: 'Enter SR, annoyed', order: 1 },
  { id: 'sm-demetrius-f2', groundPlanId: 'gp-forest', trackId: 'track-demetrius', x: 65, y: 55, label: 'Reject Helena CS', order: 2 },
  { id: 'sm-demetrius-f3', groundPlanId: 'gp-forest', trackId: 'track-demetrius', x: 82, y: 40, label: 'Exit SR into woods', order: 3 },

  // Bottom: enters SR → rehearses CS → exits SR → returns with donkey head → runs off SL
  { id: 'sm-bottom-f1', groundPlanId: 'gp-forest', trackId: 'track-bottom', x: 85, y: 52, label: 'Enter SR for rehearsal', order: 1 },
  { id: 'sm-bottom-f2', groundPlanId: 'gp-forest', trackId: 'track-bottom', x: 50, y: 52, label: 'Rehearse in clearing', order: 2 },
  { id: 'sm-bottom-f3', groundPlanId: 'gp-forest', trackId: 'track-bottom', x: 82, y: 48, label: 'Exit SR for "cue"', order: 3 },
  { id: 'sm-bottom-f4', groundPlanId: 'gp-forest', trackId: 'track-bottom', x: 55, y: 50, label: 'Return with DONKEY HEAD', order: 4 },
  { id: 'sm-bottom-f5', groundPlanId: 'gp-forest', trackId: 'track-bottom', x: 15, y: 55, label: 'Run off SL in panic', order: 5 },
];
