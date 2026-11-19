import SceneFrame from './cinematic/SceneFrame';

const EXPERIENCE = [
  {
    role: 'Web Development Trainee',
    organization: 'Inventive Mechanics',
    period: '10 Jan 2022 – 10 Jan 2023',
    description:
      'Developed web applications and frontend interfaces using HTML, CSS and JavaScript. Worked on backend development with Node.js and MySQL, including application customization and maintenance. Used Git for version control and supported production activities.',
  },
  {
    role: 'Industrial Exposure Trainee',
    organization: 'Inventive Mechanics',
    period: '1 Jan 2025 – 1 Apr 2025',
    description: 'University industrial exposure at Inventive Mechanics.',
  },
];

export default function ExperienceSection() {
  return (
    <SceneFrame id="experience" scene={7} label="EXPERIENCE" footerTag="TRAINING / INDUSTRIAL EXPOSURE">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="hud hud--teal">07 — Experience</p>
            <h2 className="mt-4 text-h2 font-display text-text-primary">Experience</h2>
            <p className="mt-5 max-w-prose text-body text-text-secondary">
              Practical training and industrial exposure in web development.
            </p>
          </div>

          <ol className="divide-y divide-border border-y border-border lg:col-span-7">
            {EXPERIENCE.map((item, index) => (
              <li key={item.period} className="grid gap-2 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-5">
                <span className="font-mono text-caption text-brass" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="text-h4 font-display text-text-primary">{item.role}</h3>
                  <p className="mt-1 text-body-sm font-medium text-text-secondary">{item.organization}</p>
                  <p className="mt-4 text-body-sm text-text-secondary">{item.description}</p>
                </div>
                <span className="font-mono text-caption text-primary sm:text-right">{item.period}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SceneFrame>
  );
}
