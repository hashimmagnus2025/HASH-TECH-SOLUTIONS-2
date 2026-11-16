/**
 * AMC / preventive-maintenance illustration — a protective shield with a
 * maintenance gear and a verified check, echoing "someone is on the hook
 * to check before something breaks." Line-art, theme colours, no external
 * image weight. Transparent background so it sits inside the AMC panel.
 */
const INK = "#1b1d20";
const ACCENT = "#35b5d1";
const ACCENT_SOFT = "#bfe6ef";

export default function AmcIllustration({ className }) {
  return (
    <svg
      viewBox="0 0 320 220"
      className={className}
      role="img"
      aria-label="Annual Maintenance Contract — proactive protection and scheduled servicing"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx={232} cy={60} r={64} fill={ACCENT_SOFT} opacity={0.28} />

      {/* shield */}
      <path
        d="M160 34 L228 56 V112 C228 158 196 182 160 196 C124 182 92 158 92 112 V56 Z"
        fill="#ffffff"
        stroke={INK}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <path
        d="M160 34 L228 56 V112 C228 158 196 182 160 196 Z"
        fill={ACCENT}
        opacity={0.12}
      />

      {/* check mark */}
      <path
        d="M132 110 l20 22 l40 -46"
        fill="none"
        stroke={ACCENT}
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* maintenance gear, bottom-right overlapping shield edge */}
      <g transform="translate(214 160)">
        <circle r={26} fill="#ffffff" stroke={INK} strokeWidth={3.5} />
        <circle r={9} fill="#ffffff" stroke={INK} strokeWidth={3} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect key={a} x={-3.5} y={-34} width={7} height={10} rx={1.5} fill={INK} transform={`rotate(${a})`} />
        ))}
        <circle r={26} fill={ACCENT} opacity={0.1} />
      </g>
    </svg>
  );
}
