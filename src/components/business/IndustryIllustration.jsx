/**
 * Hand-authored SVG illustrations for each industry card. Intentionally
 * line-art / geometric rather than photographic: they stay crisp at any
 * size, add zero network weight, and match the turquoise-on-paper brand
 * without relying on generated or stock imagery. One scene per industry
 * slug; falls back to a neutral "building" scene for unknown slugs.
 */
const INK = "#1b1d20";
const ACCENT = "#35b5d1";
const ACCENT_SOFT = "#bfe6ef";
const PANEL = "#f1efe9";
const PANEL_2 = "#e7e3da";

const strokeBase = {
  fill: "none",
  stroke: INK,
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/** Small window grid helper — returns an array of <rect> windows. */
function windows(x, y, cols, rows, { gap = 11, size = 7, accentAt = [] } = {}) {
  const cells = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const isAccent = accentAt.some(([ac, ar]) => ac === c && ar === r);
      cells.push(
        <rect
          key={`${c}-${r}`}
          x={x + c * gap}
          y={y + r * gap}
          width={size}
          height={size}
          rx={1.5}
          fill={isAccent ? ACCENT : "#ffffff"}
          stroke={INK}
          strokeWidth={1.4}
        />
      );
    }
  }
  return cells;
}

function Ground() {
  return <line x1={36} y1={176} x2={364} y2={176} stroke={INK} strokeWidth={2} opacity={0.18} />;
}

const scenes = {
  "corporate-offices": (
    <>
      <Ground />
      <rect x={118} y={64} width={78} height={112} rx={4} fill="#ffffff" stroke={INK} strokeWidth={3} />
      <rect x={206} y={96} width={60} height={80} rx={4} fill={PANEL_2} stroke={INK} strokeWidth={3} />
      {windows(128, 76, 4, 6, { accentAt: [[1, 1], [3, 4]] })}
      {windows(214, 108, 3, 4, { accentAt: [[0, 2]] })}
      <line x1={157} y1={56} x2={157} y2={64} stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
      <circle cx={157} cy={52} r={4} fill={ACCENT} />
    </>
  ),
  education: (
    <>
      <Ground />
      {/* mortarboard cap */}
      <path d="M200 70 L270 96 L200 122 L130 96 Z" fill={ACCENT} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M200 122 C178 122 162 116 162 116 L162 140 C162 150 238 150 238 140 L238 116 C238 116 222 122 200 122 Z" fill="#ffffff" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <line x1={270} y1={96} x2={270} y2={140} {...strokeBase} />
      <circle cx={270} cy={144} r={6} fill={ACCENT} stroke={INK} strokeWidth={3} />
    </>
  ),
  healthcare: (
    <>
      <Ground />
      <rect x={150} y={74} width={100} height={102} rx={6} fill="#ffffff" stroke={INK} strokeWidth={3} />
      {/* cross */}
      <path d="M200 92 v30 M185 107 h30" stroke={ACCENT} strokeWidth={8} strokeLinecap="round" />
      {/* heartbeat */}
      <path d="M160 150 h14 l6 -14 l9 26 l7 -16 h18" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  manufacturing: (
    <>
      <Ground />
      {/* sawtooth factory roof */}
      <path d="M120 176 V116 l22 -18 V140 l22 -18 V140 l22 -18 V176 Z" fill={PANEL_2} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={210} y={92} width={22} height={84} fill="#ffffff" stroke={INK} strokeWidth={3} />
      {/* gear */}
      <g transform="translate(262 112)">
        <circle r={20} fill={ACCENT} stroke={INK} strokeWidth={3} />
        <circle r={7} fill="#ffffff" stroke={INK} strokeWidth={3} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect key={a} x={-3} y={-26} width={6} height={8} fill={INK} transform={`rotate(${a})`} />
        ))}
      </g>
    </>
  ),
  retail: (
    <>
      <Ground />
      <rect x={128} y={104} width={144} height={72} rx={4} fill="#ffffff" stroke={INK} strokeWidth={3} />
      {/* striped awning */}
      <path d="M120 104 h160 l-10 -26 h-140 Z" fill={ACCENT} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {[150, 180, 210, 240].map((x) => (
        <line key={x} x1={x} y1={78} x2={x - 4} y2={104} stroke="#ffffff" strokeWidth={3} />
      ))}
      <rect x={186} y={132} width={28} height={44} fill={PANEL_2} stroke={INK} strokeWidth={3} />
      {/* shopping bag */}
      <rect x={236} y={128} width={26} height={30} rx={3} fill="#ffffff" stroke={INK} strokeWidth={2.4} />
      <path d="M242 128 v-5 a7 7 0 0 1 14 0 v5" fill="none" stroke={INK} strokeWidth={2.4} />
    </>
  ),
  smes: (
    <>
      <Ground />
      {/* growth bars */}
      <rect x={132} y={138} width={24} height={38} rx={3} fill={PANEL_2} stroke={INK} strokeWidth={3} />
      <rect x={168} y={116} width={24} height={60} rx={3} fill="#ffffff" stroke={INK} strokeWidth={3} />
      <rect x={204} y={92} width={24} height={84} rx={3} fill={ACCENT} stroke={INK} strokeWidth={3} />
      {/* trend arrow */}
      <path d="M128 128 L176 108 L212 84 L256 70" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M256 70 l-16 2 M256 70 l-2 16" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  government: (
    <>
      <Ground />
      {/* pediment */}
      <path d="M126 96 L200 64 L274 96 Z" fill={PANEL_2} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={126} y={96} width={148} height={10} fill="#ffffff" stroke={INK} strokeWidth={3} />
      {/* columns */}
      {[138, 164, 190, 216, 242].map((x) => (
        <rect key={x} x={x} y={110} width={12} height={58} fill="#ffffff" stroke={INK} strokeWidth={2.6} />
      ))}
      <rect x={126} y={168} width={148} height={10} fill="#ffffff" stroke={INK} strokeWidth={3} />
      {/* flag */}
      <line x1={200} y1={64} x2={200} y2={46} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path d="M200 48 h18 l-5 6 l5 6 h-18 Z" fill={ACCENT} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
    </>
  ),
  "individual-customers": (
    <>
      <Ground />
      {/* house */}
      <path d="M140 118 L196 78 L252 118 Z" fill={ACCENT} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={152} y={118} width={88} height={58} fill="#ffffff" stroke={INK} strokeWidth={3} />
      <rect x={182} y={140} width={28} height={36} fill={PANEL_2} stroke={INK} strokeWidth={3} />
      {/* wifi arcs */}
      <g transform="translate(262 92)" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round">
        <path d="M-14 0 a14 14 0 0 1 28 0" />
        <path d="M-22 -8 a22 22 0 0 1 44 0" opacity={0.6} />
        <circle cx={0} cy={6} r={3.5} fill={ACCENT} stroke="none" />
      </g>
    </>
  ),
};

export default function IndustryIllustration({ slug, name, className }) {
  const scene = scenes[slug] ?? scenes["corporate-offices"];
  return (
    <svg
      viewBox="0 0 400 220"
      className={className}
      role="img"
      aria-label={`${name} illustration`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x={0} y={0} width={400} height={220} fill={PANEL} />
      {/* soft corner tint */}
      <circle cx={340} cy={36} r={70} fill={ACCENT_SOFT} opacity={0.35} />
      {scene}
    </svg>
  );
}
