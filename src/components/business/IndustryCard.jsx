import IconBox from "@/components/ui/IconBox";
import IndustryIllustration from "@/components/business/IndustryIllustration";
export default function IndustryCard({
  industry
}) {
  const Icon = industry.icon;
  return <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-(--shadow-elevated)">
      <div className="relative aspect-video w-full overflow-hidden border-b border-line">
        <IndustryIllustration slug={industry.slug} name={industry.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4">
          <IconBox icon={Icon} />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <h3 className="font-display text-lg font-medium text-fg">{industry.name}</h3>
        <p className="text-sm leading-relaxed text-fg-muted">{industry.description}</p>
        <ul className="mt-2 flex flex-col gap-2">
          {industry.solutions.map(solution => <li key={solution} className="flex gap-2 text-sm text-fg-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
              {solution}
            </li>)}
        </ul>
      </div>
    </div>;
}
