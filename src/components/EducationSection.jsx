import SceneFrame from './cinematic/SceneFrame';

const EDUCATION = [
  {
    title: 'B.Tech in Multimedia and Web Technology',
    organization: 'University of Vocational Technology',
    period: '2024 – Present',
    detail: 'Undergraduate',
  },
  {
    title: 'NVQ Level 5 in Information Technology',
    organization: 'Vocational Training Authority',
    period: '2020 – 2022',
    detail: 'Diploma (NVQ Level 5)',
  },
  {
    title: 'AAT Foundation Level',
    organization: 'AAT Sri Lanka',
    period: '2017',
    detail: 'Foundation',
  },
  {
    title: 'A. Rathnayake Central College',
    organization: 'G.C.E. O/L — 2016 · G.C.E. A/L — 2019',
    period: '2016 / 2019',
    detail: 'Secondary education',
  },
];

const CERTIFICATIONS = [
  {
    title: 'AWS Academy Graduate – Cloud Foundations',
    organization: 'AWS Academy',
    period: 'August 2026',
  },
  {
    title: 'AWS Academy Graduate – Cloud Architecting',
    organization: 'AWS Academy',
    period: 'September 2026',
  },
];

export default function EducationSection() {
  return (
    <SceneFrame id="education" scene={6} label="BACKGROUND" footerTag="EDUCATION / CERTIFICATIONS">
      <div className="container">
        <div className="mb-10 max-w-prose">
          <p className="hud hud--teal">06 — Background</p>
          <h2 className="mt-4 text-h2 font-display text-text-primary">Education &amp; Certifications</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h3 className="hud hud--brass">Education</h3>
            <ol className="mt-5 divide-y divide-border border-y border-border">
              {EDUCATION.map((item, index) => (
                <li
                  key={item.title}
                  className="grid gap-2 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-5"
                >
                  <span className="font-mono text-caption text-brass" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-h4 font-display text-text-primary">{item.title}</h4>
                    <p className="mt-1 text-body-sm text-text-secondary">{item.organization}</p>
                    <p className="mt-1 text-caption text-text-muted">{item.detail}</p>
                  </div>
                  <span className="font-mono text-caption text-primary sm:text-right">{item.period}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-4">
            <h3 className="hud hud--brass">Certifications</h3>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {CERTIFICATIONS.map((cert, index) => (
                <li key={cert.title} className="grid gap-2 py-5 sm:grid-cols-[auto_1fr] sm:gap-4">
                  <span className="font-mono text-caption text-brass" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-h4 font-display leading-1.35 text-text-primary">{cert.title}</h4>
                    <p className="mt-2 text-body-sm text-text-secondary">{cert.organization}</p>
                    <p className="mt-1 font-mono text-caption text-primary">{cert.period}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
