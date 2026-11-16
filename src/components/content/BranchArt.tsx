import type { ReactNode } from 'react';

/** Gezeichnete Szenen pro Branche (Inline-SVG, 480 × 320). Farben über CSS-Variablen in globals.css (.art),
 *  darum passen sie sich Hell- und Dunkelmodus an. Jede Szene zeigt den Moment der Zahlung: Terminal, Funkwellen, Karte. */
export type BranchKind = 'restaurant' | 'detailhandel' | 'coiffeur' | 'praxis' | 'marktstand';

export const BRANCH_ALT: Record<BranchKind, string> = {
  restaurant: 'Zeichnung: gedeckter Tisch mit Weinglas und Kaffee, daneben ein mobiles Zahlterminal mit Beleg und eine Karte',
  detailhandel: 'Zeichnung: Ladentheke mit Kassenbildschirm und Einkaufstasche, daneben ein Zahlterminal mit Tastatur und eine Karte',
  coiffeur: 'Zeichnung: Coiffeur-Ablage mit Spiegel, Schere, Föhn und Pflegeprodukten, daneben ein mobiles Zahlterminal und eine Karte',
  praxis: 'Zeichnung: Empfang einer Praxis mit Bildschirm, Pflanze und Stethoskop, daneben ein Zahlterminal mit Tastatur und eine Karte',
  marktstand: 'Zeichnung: Marktstand mit gestreiftem Dach, Obst- und Gemüsekisten und Waage, daneben ein mobiles Zahlterminal und eine Karte',
};

export function branchKind(pfad: string): BranchKind | null {
  if (pfad.includes('restaurant')) return 'restaurant';
  if (pfad.includes('detailhandel')) return 'detailhandel';
  if (pfad.includes('coiffeur')) return 'coiffeur';
  if (pfad.includes('praxis')) return 'praxis';
  if (pfad.includes('marktstand')) return 'marktstand';
  return null;
}

/* ---------- Gemeinsame Bausteine ---------- */

const Wall = () => <rect x="36" y="26" width="408" height="216" rx="26" className="f1" />;

function Counter({ front = 'f2', children }: { front?: string; children?: ReactNode }) {
  return (
    <g>
      <rect x="40" y="252" width="400" height="90" className={`o ${front}`} />
      {children}
      <rect x="24" y="238" width="432" height="16" rx="5" className="o fw" />
    </g>
  );
}

function Terminal({ x, kind = 'mobile' }: { x: number; kind?: 'mobile' | 'printer' | 'pin' }) {
  const h = kind === 'pin' ? 124 : 108;
  const top = -h;
  return (
    <g transform={`translate(${x} 238) rotate(-5)`}>
      {kind === 'printer' && (
        <g>
          <path d={`M-13 ${top + 4} V${top - 22} l4.33 4 4.33 -4 4.34 4 4.33 -4 4.33 4 4.34 -4 V${top + 4} Z`} className="o fw" />
          <path d={`M-7 ${top - 11} H7 M-7 ${top - 4} H2`} className="ln" />
        </g>
      )}
      <rect x="-28" y={top} width="56" height={h} rx="10" className="o fd" />
      <rect x="-21" y={top + 8} width="42" height="60" rx="5" className="fw" />
      <circle cx="0" cy={top + 28} r="9.5" className="fg" />
      <path d={`M-4.4 ${top + 28} l3.2 3.2 5.6 -6.4`} className="chk" />
      <rect x="-12" y={top + 45} width="24" height="4.5" rx="2.25" className="fi" />
      <rect x="-8" y={top + 54} width="16" height="3.5" rx="1.75" className="f3" />
      {kind === 'pin' ? (
        <g className="key">
          {[0, 1, 2].map((r) => [-11, 0, 11].map((cx) => <circle key={`${r}${cx}`} cx={cx} cy={top + 82 + r * 12} r="3" />))}
        </g>
      ) : (
        <rect x="-9" y={top + 82} width="18" height="4" rx="2" className="key" />
      )}
    </g>
  );
}

function Pay({ x = 372, y = 172 }: { x?: number; y?: number }) {
  return (
    <g>
      <g transform={`translate(${x} ${y})`} className="waves">
        <path d="M0 -6 a9 9 0 0 1 0 12" />
        <path d="M7 -11 a15 15 0 0 1 0 22" />
        <path d="M14 -16 a21 21 0 0 1 0 32" />
      </g>
      <g transform={`translate(${x + 64} ${y - 8}) rotate(-14)`}>
        <g className="paycard">
          <rect x="-34" y="-22" width="68" height="44" rx="7" className="o fa" />
          <rect x="-25" y="-11" width="13" height="10" rx="2.5" className="chip" />
          <path d="M-25 10 H-3 M3 10 H13" className="cardln" />
        </g>
      </g>
    </g>
  );
}

/* ---------- Szenen ---------- */

function Restaurant() {
  return (
    <>
      <Wall />
      {/* Lichtkegel, Lampe, Menütafel */}
      <path d="M108 92 L70 238 H194 L156 92 Z" className="glow" />
      <path d="M132 26 V62" className="o fn" />
      <path d="M108 92 L118 62 H146 L156 92 Z" className="o fa" />
      <path d="M122 92 a10 8 0 0 0 20 0 Z" className="o fw" />
      <rect x="206" y="56" width="86" height="66" rx="7" className="o fd" />
      <path d="M220 74 H250" className="chalk" />
      <path d="M220 89 H278 M220 99 H268 M220 109 H258" className="chalk thin" />
      <Counter front="f2" />
      {/* Cloche */}
      <rect x="74" y="230" width="100" height="8" rx="4" className="o f3" />
      <path d="M84 230 a40 40 0 0 1 80 0 Z" className="o fw" />
      <circle cx="124" cy="185" r="5" className="o fw" />
      <path d="M98 218 a28 28 0 0 1 13 -19" className="hl" />
      {/* Weinglas */}
      <path d="M192 172 H220 Q221 208 206 208 Q191 208 192 172 Z" className="glass" />
      <path d="M193 190 H219 Q217 206.5 206 206.5 Q195 206.5 193 190 Z" className="fa" />
      <path d="M192 172 H220 Q221 208 206 208 Q191 208 192 172 Z M206 208 V238 M194 238 H218" className="o fn" />
      {/* Kaffee */}
      <g className="steam">
        <path d="M256 198 q-5 -6 0 -12 q5 -6 0 -12" />
        <path d="M268 198 q-5 -6 0 -12 q5 -6 0 -12" />
      </g>
      <rect x="238" y="232" width="48" height="6" rx="3" className="o fw" />
      <path d="M246 206 H278 V218 Q278 232 266 232 H258 Q246 232 246 218 Z" className="o fw" />
      <path d="M278 210 q10 0 10 7 q0 7 -10 7" className="o fn" />
      <Terminal x={340} kind="printer" />
      <Pay />
    </>
  );
}

function Detailhandel() {
  const tee = (x: number, cls: string) => (
    <g key={x}>
      <path d={`M${x} 60 v8`} className="o fn" />
      <path d={`M${x} 68 l-20 12 v7 h8 v40 h24 v-40 h8 v-7 Z`} className={`o ${cls}`} />
    </g>
  );
  return (
    <>
      <Wall />
      {/* Kleiderstange */}
      <path d="M74 26 V60 M202 26 V60" className="o fn" />
      <path d="M62 60 H214" className="o fn bar" />
      {tee(92, 'fw')}
      {tee(138, 'fa')}
      {tee(184, 'f3')}
      {/* Regal */}
      <path d="M228 120 H300" className="o fn bar" />
      <rect x="234" y="94" width="26" height="26" rx="3" className="o f3" />
      <rect x="264" y="82" width="30" height="38" rx="3" className="o fw" />
      <path d="M264 94 H294" className="o fn thin" />
      <Counter front="f2">
        <path d="M172 252 V320 M308 252 V320" className="o fn thin" />
      </Counter>
      {/* Kassenbildschirm */}
      <rect x="146" y="212" width="8" height="22" className="o f3" />
      <rect x="128" y="232" width="44" height="6" rx="3" className="o f3" />
      <rect x="102" y="150" width="96" height="64" rx="8" className="o fd" />
      {[0, 1, 2].map((i) => [0, 1].map((j) => <rect key={`${i}${j}`} x={112 + i * 26} y={160 + j * 17} width="20" height="12" rx="3" className={i === 1 && j === 0 ? 'fa' : 'tile'} />))}
      <rect x="112" y="197" width="76" height="6" rx="3" className="fw" />
      {/* Einkaufstasche */}
      <path d="M236 186 q0 -18 10 -18 q10 0 10 18" className="o fn" />
      <path d="M224 238 L228 186 H264 L268 238 Z" className="o fa" />
      <rect x="238" y="206" width="16" height="4.5" rx="2.25" className="chip" />
      <Terminal x={340} kind="pin" />
      <Pay y={166} />
    </>
  );
}

function Coiffeur() {
  return (
    <>
      <Wall />
      {/* Spiegel */}
      <rect x="66" y="42" width="116" height="164" rx="58" className="o fw" />
      <path d="M94 96 L128 62 M90 128 L150 68" className="hl" />
      {/* Föhn am Haken */}
      <path d="M238 60 V80" className="o fn" />
      <circle cx="238" cy="58" r="3.5" className="fi" />
      <path d="M232 110 l-5 40 q-1 9 7 9 h8 q8 0 7 -9 l-1 -40 Z" className="o fa" />
      <path d="M274 86 l16 -4 v28 l-16 -4 Z" className="o fd" />
      <rect x="212" y="80" width="62" height="32" rx="16" className="o fa" />
      <path d="M224 89 v14 M231 89 v14" className="cardln" />
      <path d="M238 159 c0 14 16 10 16 24" className="o fn" />
      <Counter front="f2" />
      {/* Glas mit Schere und Kamm */}
      <rect x="105" y="172" width="9" height="34" rx="2" transform="rotate(10 110 206)" className="o fd" />
      <circle cx="88" cy="186" r="7.5" className="o fn ring" />
      <circle cx="103" cy="186" r="7.5" className="o fn ring" />
      <path d="M91.5 192.5 L99 205 M99.5 192.5 L92 205" className="o fn" />
      <rect x="78" y="204" width="36" height="34" rx="7" className="o f3" />
      {/* Sprühflasche und Pumpflasche */}
      <rect x="137" y="193" width="10" height="10" className="o fw" />
      <path d="M138 193 q-5 4 -3 10" className="o fn" />
      <rect x="133" y="182" width="19" height="11" rx="3" className="o fd" />
      <rect x="152" y="185" width="7" height="4.5" className="o fd" />
      <rect x="130" y="202" width="24" height="36" rx="6" className="o fw" />
      <rect x="134" y="214" width="16" height="10" rx="2.5" className="fa" />
      <path d="M180 190 v-7 h-12" className="o fn" />
      <rect x="176" y="189" width="8" height="10" className="o fw" />
      <rect x="167" y="198" width="26" height="40" rx="7" className="o f2" />
      {/* Handtücher */}
      <rect x="214" y="226" width="54" height="12" rx="6" className="o fw" />
      <rect x="216" y="214" width="50" height="12" rx="6" className="o fa" />
      <rect x="218" y="202" width="46" height="12" rx="6" className="o fw" />
      <Terminal x={340} />
      <Pay />
    </>
  );
}

function Praxis() {
  return (
    <>
      <Wall />
      {/* Uhr */}
      <circle cx="92" cy="84" r="27" className="o fw" />
      <path d="M92 62 v4 M92 102 v4 M70 84 h4 M110 84 h4" className="ln" />
      <path d="M92 84 V69 M92 84 L103 91" className="o fn" />
      <circle cx="92" cy="84" r="2.5" className="fa" />
      {/* Urkunde */}
      <rect x="140" y="58" width="64" height="50" rx="5" className="o fw" />
      <path d="M150 72 H194 M150 82 H184 M150 92 H170" className="ln" />
      <circle cx="189" cy="94" r="6" className="fa" />
      {/* Stethoskop am Haken */}
      <circle cx="258" cy="50" r="3.5" className="fi" />
      <path d="M244 58 v24 a14 14 0 0 0 28 0 v-24" className="o fn tube" />
      <circle cx="244" cy="56" r="3.5" className="fi" />
      <circle cx="272" cy="56" r="3.5" className="fi" />
      <path d="M258 96 v26 q0 18 16 18" className="o fn tube" />
      <circle cx="282" cy="140" r="10" className="o fw" />
      <circle cx="282" cy="140" r="4" className="fa" />
      <Counter front="f2">
        <rect x="64" y="266" width="352" height="70" rx="10" className="f1" />
      </Counter>
      {/* Pflanze */}
      <path d="M78 212 q-24 -10 -22 -42 q22 8 22 42 Z" className="o fg" />
      <path d="M78 212 q24 -10 22 -42 q-22 8 -22 42 Z" className="o fg" />
      <path d="M78 212 q-11 -30 0 -56 q11 26 0 56 Z" className="o fg" />
      <path d="M62 238 l4 -28 h24 l4 28 Z" className="o f3" />
      {/* Bildschirm mit Terminkalender */}
      <rect x="166" y="214" width="8" height="20" className="o f3" />
      <rect x="148" y="232" width="44" height="6" rx="3" className="o f3" />
      <rect x="122" y="148" width="96" height="68" rx="8" className="o fd" />
      <rect x="132" y="158" width="76" height="6" rx="3" className="fw" />
      {[0, 1, 2, 3, 4].map((i) => [0, 1, 2].map((j) => <rect key={`${i}${j}`} x={132 + i * 16} y={171 + j * 12} width="12" height="8" rx="2" className={i === 3 && j === 1 ? 'fa' : 'tile'} />))}
      {/* Stiftebecher */}
      <path d="M241 212 l-4 -22 M249 212 l3 -27" className="o fn" />
      <path d="M245 212 v-18" className="pen" />
      <rect x="234" y="212" width="22" height="26" rx="4" className="o f3" />
      <Terminal x={340} kind="pin" />
      <Pay y={166} />
    </>
  );
}

function Marktstand() {
  return (
    <>
      <Wall />
      {/* Pfosten und Dach */}
      <rect x="50" y="46" width="9" height="194" className="o f3" />
      <rect x="421" y="46" width="9" height="194" className="o f3" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path key={i} d={`M${36 + 51 * i} 42 h51 v40 a25.5 25.5 0 0 1 -51 0 Z`} className={`o ${i % 2 ? 'fw' : 'fa'}`} />
      ))}
      <rect x="28" y="32" width="424" height="14" rx="7" className="o f3" />
      {/* Preistafel */}
      <path d="M238 110 V122 M282 110 V122" className="o fn" />
      <rect x="224" y="122" width="72" height="32" rx="5" className="o fd" />
      <path d="M235 133 H272" className="chalk" />
      <path d="M235 143 H260" className="chalk thin" />
      <Counter front="f2">
        <path d="M40 278 H440 M40 302 H440" className="o fn thin" />
      </Counter>
      {/* Kiste Äpfel */}
      <path d="M118 210 V176" className="o fn" />
      <rect x="118" y="168" width="26" height="15" rx="2.5" className="o fw" />
      <path d="M123 175.5 H139" className="ln" />
      <circle cx="84" cy="204" r="12.5" className="o fa" />
      <circle cx="108" cy="200" r="12.5" className="o fa" />
      <circle cx="133" cy="204" r="12.5" className="o fa" />
      <path d="M84 191 q2 -6 6 -7 M108 187 q2 -6 6 -7" className="o fn thin" />
      <rect x="66" y="208" width="86" height="30" rx="3" className="o f3" />
      <path d="M66 223 H152 M80 208 V238 M138 208 V238" className="o fn thin" />
      {/* Kiste Salat */}
      <circle cx="178" cy="204" r="13" className="o fg" />
      <circle cx="199" cy="198" r="13" className="o fg" />
      <circle cx="220" cy="204" r="13" className="o fg" />
      <rect x="162" y="208" width="76" height="30" rx="3" className="o f3" />
      <path d="M162 223 H238 M176 208 V238 M224 208 V238" className="o fn thin" />
      {/* Waage */}
      <circle cx="268" cy="190" r="9" className="o fa" />
      <circle cx="285" cy="190" r="9" className="o fa" />
      <path d="M250 199 H302 q-4 9 -26 9 q-22 0 -26 -9 Z" className="o fw" />
      <rect x="272" y="207" width="8" height="18" className="o f3" />
      <rect x="254" y="224" width="44" height="14" rx="4" className="o fw" />
      <rect x="262" y="228.5" width="28" height="5" rx="2.5" className="fd" />
      <Terminal x={340} />
      <Pay />
    </>
  );
}

const SCENES: Record<BranchKind, () => ReactNode> = { restaurant: Restaurant, detailhandel: Detailhandel, coiffeur: Coiffeur, praxis: Praxis, marktstand: Marktstand };

export function BranchArt({ kind, decorative = false }: { kind: BranchKind; decorative?: boolean }) {
  const Scene = SCENES[kind];
  return (
    <svg className="art" viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': BRANCH_ALT[kind] })}>
      <Scene />
    </svg>
  );
}

/** Drei Szenen als gefächerte Karten, für den Kopf der Branchen-Übersicht. */
export function BranchStack() {
  return (
    <div className="art-stack" role="img" aria-label="Zeichnungen: Zahlterminal im Coiffeursalon, im Laden und im Restaurant">
      <div className="art-card a">
        <BranchArt kind="coiffeur" decorative />
      </div>
      <div className="art-card b">
        <BranchArt kind="detailhandel" decorative />
      </div>
      <div className="art-card c">
        <BranchArt kind="restaurant" decorative />
      </div>
    </div>
  );
}
