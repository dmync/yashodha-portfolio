import SceneFrame from './cinematic/SceneFrame';
import BentoGrid from './BentoGrid';
import ProjectCard from './ProjectCard';

const PROJECTS = [
  {
    title: 'US Client House Auction Website',
    description:
      'Collaborated with a Senior Developer to build a house auction and bidding web application from scratch for a US client. Developed the Angular frontend from a Figma design, implementing the UI and screens for user authentication and auction/bidding, then contributed to the Node.js backend.',
    technologies: ['Angular', 'Node.js', 'Figma handoff'],
    link: null,
    footnote: 'Developed for a US client — not publicly released',
    featured: true,
  },
  {
    title: 'Sales Performance Evaluation System (SPES)',
    description:
      'A centralized sales performance management system for a life insurance company, with role-based access across six user roles, organizational hierarchy, recruitment, monthly sales targets, premium collection invoices, and Chart.js reporting.',
    technologies: ['PHP', 'MySQL', 'Bootstrap 5', 'Chart.js', 'AJAX'],
    link: 'https://github.com/dmync/spes',
    linkLabel: 'View source on GitHub',
    featured: false,
  },
  {
    title: 'Cricket Tournament Management System (CTMS)',
    description:
      'A tournament management system with live scorecard test automation: a probability-based simulation engine generates ball-by-ball events and updates the scorecard through AJAX without page reloads, alongside tournament, team, player and match management.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'AJAX', 'JSON'],
    link: 'https://github.com/dmync/CTMS',
    linkLabel: 'View source on GitHub',
    featured: false,
  },
];

const SUPPORTING_PROJECT = {
  title: 'PrettyPick LK — Inventory Management System',
  description:
    'A practical inventory management system developed to support product management and day-to-day operations of a small clothing resale business.',
  technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  features: [
    'Product management',
    'Inventory tracking and stock adjustments',
    'Sales management',
    'Dashboard and reporting',
    'CSV export',
    'Consignment management',
    'Product image uploads',
  ],
  link: null,
  footnote: 'Authentication and database security hardening in progress.',
  featured: false,
};

export default function FeaturedProjects() {
  return (
    <SceneFrame id="featured-projects" scene={3} label="FEATURES" tag="FEATURES / 04">
      <div className="container">
        <div className="mb-12 max-w-prose">
          <p className="hud hud--teal">03 — Selected work</p>
          <h2 className="mt-4 text-h2 font-display text-text-primary">Featured Projects</h2>
          <p className="mt-4 text-body text-text-secondary">
            Three selected software projects, plus one clearly labelled personal prototype.
          </p>
        </div>

        <BentoGrid label="Featured projects">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} index={index} {...project} />
          ))}
        </BentoGrid>

        <div className="mt-12 border-t border-border pt-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-caption font-semibold uppercase tracking-widest text-text-muted">
                Personal project / working prototype
              </p>
              <p className="mt-1 text-body-sm text-text-secondary">
                Supporting work, kept separate from the three selected projects above.
              </p>
            </div>
            <span className="rounded-sm bg-primary-soft px-2.5 py-1 text-caption font-semibold uppercase tracking-wider text-primary">
              Supporting
            </span>
          </div>

          <BentoGrid label="Personal project — supporting work">
            <ProjectCard index={PROJECTS.length} {...SUPPORTING_PROJECT} />
          </BentoGrid>
        </div>
      </div>
    </SceneFrame>
  );
}
