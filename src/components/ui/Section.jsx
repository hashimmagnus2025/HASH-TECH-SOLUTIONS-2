import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
const toneClasses = {
  dark: "bg-ink text-fg",
  light: "bg-paper text-ink-fg",
  raised: "bg-surface text-fg",
  contrast: "bg-ink-soft text-fg-on-dark"
};

/**
 * Standardizes the vertical rhythm and background/border treatment shared
 * by every homepage and page section, so individual sections only need to
 * define their own content.
 */
export default function Section({
  id,
  tone = "dark",
  border = true,
  containerClassName,
  className,
  children
}) {
  const borderClass = tone === "light" ? "border-t border-paper-line" : tone === "contrast" ? "border-t border-line-on-dark" : "border-t border-line";
  return <section id={id} className={cn("py-20 md:py-28", toneClasses[tone], border && borderClass, className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>;
}
