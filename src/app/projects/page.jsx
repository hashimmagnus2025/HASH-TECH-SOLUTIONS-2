import { AlertTriangle } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Section from "@/components/ui/Section";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import ClientLogoCard from "@/components/business/ClientLogoCard";
import EnquiryCta from "@/components/business/EnquiryCta";
import { demoProjects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Projects",
  description: "A preview of the HashTech Solutions projects/case-studies layout using clearly labeled demo content, pending real case studies.",
  path: "/projects"
});
export default function ProjectsPage() {
  return <>
    <section className="border-b border-line pb-16 pt-10">
      <Container className="flex flex-col gap-8">
        <Breadcrumbs items={[{
          label: "Home",
          href: "/"
        }, {
          label: "Projects"
        }]} />
        <div className="flex flex-col gap-5">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Projects
            </span>
          </Reveal>
          <TextReveal as="h1" text="Our Respective Clients" className="max-w-3xl font-display text-4xl font-medium leading-tight text-fg sm:text-5xl" />

        </div>

      </Container>
    </section>

    <Section tone="dark">
      <StaggerGroup className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {demoProjects.map(project => <ClientLogoCard key={project.id} project={project} />)}
      </StaggerGroup>
    </Section>

    <EnquiryCta title="Want your project featured here?" description="Once work is completed and approved for sharing, it replaces one of these placeholders." />
  </>;
}
