/**
 * "Single accountable partner" illustration for the About section — a
 * central HashTech hub wired to the four things the company actually
 * handles: computers, networking, CCTV and servers. Line-art, theme
 * colours, no external image weight.
 */
const INK = "#1b1d20";
const ACCENT = "#35b5d1";
const ACCENT_SOFT = "#bfe6ef";
const PANEL = "#f4f1ec";

const node = { fill: "#ffffff", stroke: INK, strokeWidth: 3 };

export default function PartnerIllustration({ className }) {
  return (
    <svg
      viewBox="0 0 480 300"
      className={className}
      role="img"
      aria-label="HashTech Solutions as a single accountable technology partner"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x={0} y={0} width={480} height={300} rx={18} fill={PANEL} />
      <circle cx={400} cy={56} r={90} fill={ACCENT_SOFT} opacity={0.3} />

      {/* connector lines (drawn first, behind nodes) */}
      <g stroke={INK} strokeWidth={2.4} strokeLinecap="round" opacity={0.55}>
        <line x1={240} y1={150} x2={110} y2={78} />
        <line x1={240} y1={150} x2={372} y2={78} />
        <line x1={240} y1={150} x2={104} y2={226} />
        <line x1={240} y1={150} x2={376} y2={226} />
      </g>
      <g fill={ACCENT}>
        <circle cx={175} cy={114} r={3.5} />
        <circle cx={306} cy={114} r={3.5} />
        <circle cx={172} cy={188} r={3.5} />
        <circle cx={308} cy={188} r={3.5} />
      </g>

      {/* central hub */}
      <circle cx={240} cy={150} r={40} fill={ACCENT} stroke={INK} strokeWidth={3} />
      <circle cx={240} cy={150} r={40} fill="none" stroke="#ffffff" strokeWidth={1.4} opacity={0.5} />
      <path d="M224 150 h32 M240 134 v32" stroke="#ffffff" strokeWidth={4} strokeLinecap="round" />

      {/* top-left: laptop */}
      <g>
        <rect x={74} y={54} width={72} height={44} rx={4} {...node} />
        <rect x={82} y={62} width={56} height={28} rx={2} fill={PANEL} stroke={INK} strokeWidth={2} />
        <rect x={66} y={98} width={88} height={8} rx={3} {...node} />
      </g>

      {/* top-right: network router / switch */}
      <g>
        <rect x={336} y={56} width={76} height={40} rx={6} {...node} />
        <circle cx={352} cy={76} r={3} fill={ACCENT} />
        <circle cx={366} cy={76} r={3} fill={INK} />
        <circle cx={380} cy={76} r={3} fill={INK} />
        <line x1={360} y1={44} x2={360} y2={56} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
        <line x1={388} y1={40} x2={388} y2={56} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
      </g>

      {/* bottom-left: CCTV camera */}
      <g>
        <rect x={62} y={210} width={70} height={30} rx={8} {...node} transform="rotate(-12 97 225)" />
        <circle cx={78} cy={222} r={7} fill={PANEL} stroke={INK} strokeWidth={2.4} transform="rotate(-12 97 225)" />
        <line x1={118} y1={238} x2={128} y2={252} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      </g>

      {/* bottom-right: server rack */}
      <g>
        <rect x={346} y={204} width={60} height={62} rx={5} {...node} />
        {[214, 230, 246].map((y) => (
          <g key={y}>
            <rect x={354} y={y} width={44} height={10} rx={2} fill={PANEL} stroke={INK} strokeWidth={1.8} />
            <circle cx={391} cy={y + 5} r={2.4} fill={ACCENT} />
          </g>
        ))}
      </g>
    </svg>
  );
}
