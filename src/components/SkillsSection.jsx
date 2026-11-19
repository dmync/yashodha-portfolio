import SceneFrame from './cinematic/SceneFrame';

const SKILL_GROUPS = [
  {
    title: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'Angular', 'Bootstrap 5', 'jQuery', 'Chart.js', 'Font Awesome', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'PHP', 'REST APIs', 'Backend Routing', 'AJAX', 'JSON'],
  },
  {
    title: 'Database',
    items: ['MySQL', 'Microsoft SQL Server'],
  },
  {
    title: 'Tools & Practices',
    items: ['Git', 'GitHub', 'Visual Studio', 'Postman', 'Figma design handoff', 'WCAG 2.2 AA accessibility'],
  },
  {
    title: 'Multimedia & Creative',
    items: ['Adobe Photoshop', 'Krita', '3ds Max'],
  },
];

export default function SkillsSection() {
  return (
    <SceneFrame id="skills" scene={5} label="CAPABILITIES" footerTag="SKILL MATRIX / 05">
      <div className="container">
        <div className="mb-10 max-w-prose">
          <p className="hud hud--teal">05 — Capabilities</p>
          <h2 className="mt-4 text-h2 font-display text-text-primary">Skills / Technologies</h2>
          <p className="mt-5 text-body text-text-secondary">
            Technologies and practices used across the projects above, with multimedia and design as supporting
            strengths.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, index) => (
            <div key={group.title} className="flex flex-col rounded-md border border-border bg-surface p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-h4 font-display text-text-primary">{group.title}</h3>
                <span className="font-mono text-caption text-brass" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-sm border border-border bg-primary-soft px-2 py-1 font-mono text-caption text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
}
