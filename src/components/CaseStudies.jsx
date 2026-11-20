import { useState } from 'react';
import SceneFrame from './cinematic/SceneFrame';
import BentoGrid from './BentoGrid';
import CaseStudyCard from './CaseStudyCard';
import CreativeWorkCard from './CreativeWorkCard';
import ImageLightbox from './ImageLightbox';
import VideoCard from './VideoCard';

const CASE_STUDIES = [
  {
    title: 'US Client House Auction Website',
    description:
      'Auction and bidding application built from scratch for a US client. I worked alongside a Senior Developer, translating a designer’s Figma files into Angular screens, then extended the work into the Node.js backend.',
    contributions: [
      'Angular frontend development from Figma designs',
      'Frontend UI and application screen implementation',
      'User authentication and house auction/bidding functionality',
      'Backend development contribution using Node.js',
    ],
    technologies: ['Angular', 'Node.js', 'Figma'],
    link: null,
    featured: true,
  },
  {
    title: 'Sales Performance Evaluation System',
    description:
      'University assignment developed for Life Backup, a life insurance company: a centralized platform covering six roles, hierarchy, recruitment, targets, premium invoices and performance dashboards.',
    contributions: [
      'Full-stack development with role-based login and access control',
      'Organizational hierarchy and recruitment modules',
      'Sales target, premium collection and reporting modules',
    ],
    technologies: ['PHP', 'MySQL', 'Bootstrap 5', 'Chart.js', 'AJAX'],
    link: 'https://github.com/dmync/spes',
    featured: false,
  },
  {
    title: 'Cricket Tournament Management System',
    description:
      'Two-phase university project combining a probability-based live scorecard simulation with tournament, team, player and match management, including user authentication and role management.',
    contributions: [
      'Match simulation engine and ball-by-ball event generation',
      'Live scorecard automation with AJAX updates and no page reloads',
      'Tournament and match management modules',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'AJAX', 'JSON'],
    link: 'https://github.com/dmync/CTMS',
    featured: false,
  },
  {
    title: 'PrettyPick LK — Inventory Management System',
    description:
      'A practical inventory management system developed to support product management and day-to-day operations of a small clothing resale business.',
    contributions: [
      'Product management',
      'Inventory tracking and stock adjustments',
      'Sales management',
      'Dashboard and reporting',
      'CSV export',
      'Consignment management',
      'Product image uploads',
    ],
    technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    contributionLabel: 'Features shown in the UI',
    statusLabel: 'Personal Project / Working Prototype',
    footnote: 'Authentication and database security hardening in progress.',
    link: null,
    featured: false,
  },
];

const DIAGRAMS_BY_STUDY = {
  1: [
    {
      label: 'ER',
      title: 'SPES entity-relationship diagram',
      alt: 'Entity-relationship diagram for the Sales Performance Evaluation System',
      src: '/assets/images/diagrams/spes-eer.png',
      type: 'image',
      width: 1217,
      height: 875,
      description: 'Data model for the Sales Performance Evaluation System.',
    },
    {
      label: 'Class',
      title: 'SPES class diagram',
      alt: 'Class diagram for the Sales Performance Evaluation System',
      src: '/assets/images/diagrams/spes-class.png',
      type: 'image',
      width: 1275,
      height: 987,
      description: 'Class structure for the Sales Performance Evaluation System.',
    },
    {
      label: 'Flow',
      title: 'SPES flow diagram',
      alt: 'Process flow diagram for the Sales Performance Evaluation System',
      src: '/assets/images/diagrams/spes-flow.png',
      type: 'image',
      width: 922,
      height: 1595,
      description: 'Process flow for the Sales Performance Evaluation System.',
    },
    {
      label: 'Modules',
      title: 'SPES module diagram',
      alt: 'Module diagram for the Sales Performance Evaluation System',
      src: '/assets/images/diagrams/spes-module.png',
      type: 'image',
      width: 813,
      height: 1800,
      description: 'Module breakdown for the Sales Performance Evaluation System.',
    },
  ],
  2: [
    {
      label: 'Flowchart',
      title: 'CTMS flowchart',
      alt: 'Flowchart for the Cricket Tournament Management System',
      src: '/assets/images/diagrams/ctms-flowchart.png',
      type: 'image',
      width: 1024,
      height: 1536,
      description: 'Match and tournament flow for the Cricket Tournament Management System.',
    },
  ],
};

const VIDEO_PRODUCTION = [
  {
    src: '/assets/video/MMW-23-B1-05.mp4',
    poster: '/assets/video/posters/poster-care-film.jpg',
    title: 'Care is also a way of saying “I love you”',
    role: 'Script, direction and editing',
    tool: 'Video production',
    width: 1280,
    height: 720,
  },
  {
    src: '/assets/video/MMW-23-B1-05-MOV.mp4',
    poster: '/assets/video/posters/poster-music-video.jpg',
    title: 'Music Video',
    role: 'Course production edit',
    tool: 'Video editing',
    width: 1280,
    height: 720,
  },
  {
    src: '/assets/video/MMW-23-B1-05-BTS.mp4',
    poster: '/assets/video/posters/poster-behind-scenes.jpg',
    title: 'Behind the Scenes',
    role: 'Behind-the-scenes footage',
    tool: 'Video production',
    width: 1280,
    height: 720,
  },
];

const CREATIVE_GROUPS = [
  {
    label: 'Digital Art & Graphic Design',
    items: [
      {
        type: 'image',
        category: 'Krita',
        title: 'Child with Ball',
        role: 'Character study',
        alt: 'Digital illustration of a child with a ball',
        src: '/assets/images/creative/krita-child-ball.png',
        width: 1280,
        height: 720,
        description: 'Character illustration created in Krita.',
      },
      {
        type: 'image',
        category: 'Krita',
        title: 'Walk Cycle',
        role: 'Animation study frames',
        alt: 'Walk cycle frames drawn in Krita',
        src: '/assets/images/creative/krita-walkcycle.png',
        width: 1280,
        height: 1024,
        description: 'Walk cycle study drawn in Krita.',
      },
      {
        type: 'image',
        category: 'Krita',
        title: 'Rose',
        role: 'Painting study',
        alt: 'Digital painting of a rose created in Krita',
        src: '/assets/images/creative/krita-rose.png',
        width: 1280,
        height: 1024,
        description: 'Digital painting created in Krita.',
      },
      {
        type: 'image',
        category: 'Krita',
        title: 'Staircase',
        role: 'Perspective study',
        alt: 'Digital illustration of a staircase created in Krita',
        src: '/assets/images/creative/krita-staircase.png',
        width: 1280,
        height: 720,
        description: 'Perspective study created in Krita.',
      },
      {
        type: 'image',
        category: 'Photoshop',
        title: 'Video Production Poster',
        role: 'Poster layout and compositing',
        alt: 'Poster design for video production coursework created in Photoshop',
        src: '/assets/images/creative/photoshop-MMW-23-B1-05.png',
        width: 1400,
        height: 1400,
        description: 'Poster layout and compositing created in Photoshop.',
      },
    ],
  },
  {
    label: '2D/3D & VFX',
    wide: true,
    items: [
      {
        type: 'video',
        category: '2D/3D',
        title: 'Animate Clip',
        role: 'Short animation study',
        alt: 'Short 2D animation clip',
        src: '/assets/images/creative/2d3d-animate.mp4',
        width: 720,
        height: 480,
        description: 'Short animation study with a matching still available for future cover use.',
      },
      {
        type: 'video',
        category: 'VFX',
        title: 'CV Clip',
        role: 'Short 3D/VFX study',
        alt: 'Short 3D and visual effects clip',
        src: '/assets/images/creative/2d3d-cv.mp4',
        width: 720,
        height: 480,
        description: 'Short 3D/VFX study with a matching still available for future cover use.',
      },
    ],
  },
  {
    label: 'UI/UX Design',
    items: [
      {
        type: 'image',
        category: 'UI/UX',
        title: 'Gates & Fences — Before',
        role: 'Original interface',
        alt: 'Original Gates and Fences interface screen',
        src: '/assets/images/uiux/gates-before.png',
        width: 1179,
        height: 1400,
        description: 'Original Gates and Fences interface screen.',
      },
      {
        type: 'image',
        category: 'UI/UX',
        title: 'Gates & Fences — After 1',
        role: 'Redesigned interface',
        alt: 'First redesigned Gates and Fences interface screen',
        src: '/assets/images/uiux/gates-after-1.png',
        width: 1600,
        height: 900,
        description: 'First redesigned Gates and Fences interface screen.',
      },
      {
        type: 'image',
        category: 'UI/UX',
        title: 'Gates & Fences — After 2',
        role: 'Redesigned interface',
        alt: 'Second redesigned Gates and Fences interface screen',
        src: '/assets/images/uiux/gates-after-2.png',
        width: 1600,
        height: 900,
        description: 'Second redesigned Gates and Fences interface screen.',
      },
      {
        type: 'image',
        category: 'UI/UX',
        title: 'Gates & Fences — After 3',
        role: 'Redesigned interface',
        alt: 'Third redesigned Gates and Fences interface screen',
        src: '/assets/images/uiux/gates-after-3.png',
        width: 1600,
        height: 900,
        description: 'Third redesigned Gates and Fences interface screen.',
      },
    ],
  },
];

export default function CaseStudies() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <>
      <SceneFrame id="case-studies" scene={4} label="RECORDS" tag="RECORDS / 04" footerTag="SOFTWARE / PRIMARY">
        <div className="container">
          <div className="mb-12 max-w-prose">
            <p className="hud hud--teal">04 — In detail</p>
            <h2 className="mt-4 text-h2 font-display text-text-primary">Case Study Records</h2>
            <p className="mt-4 text-body text-text-secondary">
              A closer look at the four projects featured above: the scope, my contributions, and the technologies involved.
              Supporting creative work follows below.
            </p>
          </div>

          <BentoGrid label="Case studies">
            {CASE_STUDIES.map((study, index) => (
              <CaseStudyCard
                key={study.title}
                index={index}
                {...study}
                media={DIAGRAMS_BY_STUDY[index]}
                onMediaOpen={setActiveItem}
              />
            ))}
          </BentoGrid>

          <div id="creative-work" className="mt-16 border-t border-dashed border-border pt-10">
            <div className="border-l-2 border-border bg-surface px-4 py-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
                <p className="hud hud--brass">SUPPORTING REEL / NOT PRIMARY WORK</p>
                <p className="hud">SUB-REEL 04A</p>
              </div>
              <div className="mt-3 max-w-prose">
                <h3 className="font-display text-h4 text-text-secondary">Creative Work</h3>
                <p className="mt-1 text-body-sm text-text-muted">
                  Selected work across video, illustration, 3D/VFX and interface design.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <p className="hud">VIDEO PRODUCTION / 04</p>
                <p className="mt-1 text-caption text-text-muted">Use the native controls to play each clip.</p>
                <div
                  role="list"
                  aria-label="Video production"
                  className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                >
                  {VIDEO_PRODUCTION.map((video) => (
                    <VideoCard key={video.src} {...video} />
                  ))}
                </div>
              </div>

              {CREATIVE_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="hud">{group.label}</p>
                  <div
                    role="list"
                    aria-label={group.label}
                    className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                  >
                    {group.items.map((item) => (
                      <CreativeWorkCard
                        key={item.src}
                        item={item}
                        onOpen={setActiveItem}
                        wide={Boolean(group.wide)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SceneFrame>

      <ImageLightbox item={activeItem} onClose={() => setActiveItem(null)} />
    </>
  );
}
