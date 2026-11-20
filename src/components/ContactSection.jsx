import SceneFrame from './cinematic/SceneFrame';

const CONTACT_DETAILS = [
  { label: 'Email', value: 'yashodhaariyarathne587@gmail.com', href: 'mailto:yashodhaariyarathne587@gmail.com' },
  { label: 'Email', value: 'mmw23b105@uovt.ac.lk', href: 'mailto:mmw23b105@uovt.ac.lk' },
  { label: 'Location', value: 'Kandy, Sri Lanka', href: null },
  { label: 'GitHub', value: 'github.com/dmync', href: 'https://github.com/dmync' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/yashodha-ariyarathne-413335222',
    href: 'https://www.linkedin.com/in/yashodha-ariyarathne-413335222/',
  },
];

export default function ContactSection() {
  return (
    <SceneFrame id="contact" scene={8} label="CONTACT" footerTag="CONTACT / CREDITS">
      <div className="container grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="hud hud--teal">08 — Contact</p>
          <h2 className="mt-4 text-h2 font-display text-text-primary">Contact</h2>
          <p className="mt-5 max-w-prose text-body text-text-secondary">
            I’m open to new opportunities. Feel free to reach out for collaboration, internship placements, or
            software development roles.
          </p>

          <div className="mt-10">
            <a
              href="mailto:yashodhaariyarathne587@gmail.com"
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-7 py-3 font-mono text-caption font-medium tracking-widest text-inverse-text transition-colors hover:bg-primary-hover"
            >
              Send Message
            </a>
          </div>
        </div>

        <div className="lg:col-span-6">
          <dl className="overflow-hidden rounded-md border border-border bg-background">
            {CONTACT_DETAILS.map((item, index) => (
              <div
                key={item.href ?? item.label}
                className={`grid gap-1 p-5 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-4 ${
                  index > 0 ? 'border-t border-border' : ''
                }`}
              >
                <dt className="hud">{item.label}</dt>
                <dd className="break-words text-body font-medium text-text-primary">
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:text-primary hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SceneFrame>
  );
}
