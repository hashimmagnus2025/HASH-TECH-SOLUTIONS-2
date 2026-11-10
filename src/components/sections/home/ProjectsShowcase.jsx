import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import ClientLogoCarousel from "@/components/business/ClientLogoCarousel";
import { demoProjects } from "@/data/projects";
export default function ProjectsShowcase() {
  return <Section tone="raised" id="projects">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow="Projects" title="Our Clients" description="Layout preview using clearly labeled demo content — real project case studies replace these once available." />
        </Reveal>

        <ClientLogoCarousel projects={demoProjects} />
      </div>
    </Section>;
}
