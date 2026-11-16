/**
 * Faint engineering-blueprint layer for the hero background. Concrete, not
 * abstract: it schematically wires the actual stack HashTech deploys — a
 * central switch out to a server, CCTV, workstation and Wi-Fi AP, drawn in
 * thin turquoise lines with blueprint registration marks and dimension
 * ticks. Sits low-opacity on the right and is masked to fade out before it
 * reaches the headline, so it reads as texture and never fights the text.
 *
 * Pure SVG, aria-hidden, pointer-events-none. Hidden on small screens where
 * it would crowd the stacked layout.
 */
const ACCENT = "#35b5d1";

const line = {
  fill: "none",
  stroke: ACCENT,
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const thin = { ...line, strokeWidth: 1.2 };

/** Blueprint registration mark (corner crosshair). */
function Reg({ x, y }) {
  return (
    <g stroke={ACCENT} strokeWidth={1} opacity={0.7}>
      <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
      <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
    </g>
  );
}

export default function   ueprint() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[72%] opacity-[0.20] mask-[linear-gradient(to_right,transparent,black_50%)] md:block lg:w-[60%]"
    >
      <svg
        viewBox="0 0 640 520"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        {/* dimension / frame ticks */}
        <Reg x={70} y={70} />
        <Reg x={570} y={70} />
        <Reg x={70} y={450} />
        <Reg x={570} y={450} />
        <g {...thin} opacity={0.5} strokeDasharray="2 6">
          <line x1={70} y1={70} x2={570} y2={70} />
          <line x1={70} y1={450} x2={570} y2={450} />
          <line x1={70} y1={70} x2={70} y2={450} />
          <line x1={570} y1={70} x2={570} y2={450} />
        </g>

        {/* connecting topology lines (orthogonal, blueprint style) */}
        <g {...line} opacity={0.85}>
          <path d="M320 260 H190 V150" />
          <path d="M320 260 V150 H450" />
          <path d="M320 260 H470 V360" />
          <path d="M320 260 V380 H200" />
        </g>
        {/* junction dots */}
        <g fill={ACCENT} opacity={0.9}>
          {[[320, 260], [190, 150], [450, 150], [470, 360], [200, 380]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={3} />
          ))}
        </g>

        {/* central switch */}
        <g {...line}>
          <rect x={286} y={242} width={68} height={36} rx={4} />
          <circle cx={300} cy={260} r={2.2} fill={ACCENT} />
          <circle cx={312} cy={260} r={2.2} fill="none" />
          <circle cx={324} cy={260} r={2.2} fill="none" />
          <circle cx={336} cy={260} r={2.2} fill="none" />
        </g>

        {/* top-left: workstation */}
        <g {...line}>
          <rect x={160} y={110} width={60} height={40} rx={3} />
          <rect x={168} y={118} width={44} height={24} rx={1.5} {...thin} />
          <line x1={178} y1={160} x2={202} y2={160} />
        </g>

        {/* top-right: server rack */}
        <g {...line}>
          <rect x={422} y={110} width={56} height={56} rx={3} />
          <line x1={430} y1={126} x2={470} y2={126} />
          <line x1={430} y1={140} x2={470} y2={140} />
          <line x1={430} y1={154} x2={458} y2={154} />
          <circle cx={466} cy={154} r={2.4} fill={ACCENT} />
        </g>

        {/* bottom-right: CCTV camera */}
        <g {...line}>
          <rect x={446} y={344} width={48} height={22} rx={6} transform="rotate(-12 470 355)" />
          <circle cx={456} cy={351} r={5} {...thin} transform="rotate(-12 470 355)" />
          <path d="M492 366 l8 12" />
        </g>

        {/* bottom-left: Wi-Fi access point */}
        <g {...line}>
          <circle cx={200} cy={392} r={16} />
          <path d="M190 392 a10 10 0 0 1 20 0" {...thin} />
          <circle cx={200} cy={396} r={2.2} fill={ACCENT} />
        </g>

        {/* small annotation ticks on a connector */}
        <g {...thin} opacity={0.6}>
          <line x1={250} y1={255} x2={250} y2={265} />
          <line x1={280} y1={255} x2={280} y2={265} />
        </g>
      </svg>
    </div>
  );
}
