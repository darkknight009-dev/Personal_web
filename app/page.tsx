/* eslint-disable @next/next/no-img-element */
import ScrollEffects from "../components/scroll-effects";
<<<<<<< HEAD
=======
import PortfolioAIController from "../components/portfolio-ai-controller";
import AICallTriggerButton from "../components/ai-call-trigger-button";
>>>>>>> origin/master

const projects = [
  {
    number: "01",
    type: "Healthcare / AI",
    title: "Luxe Health AI",
    year: "Jun 2025 — Jul 2025",
    thesis: "Enterprise medical image analysis with secure DICOM and Orthanc PACS workflows.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
    alt: "Retro computer and game controller on a dark desk",
    problem:
      "Healthcare systems struggle with complex medical image analysis and fragmented PACS workflows, leading to inefficiencies and delayed diagnoses.",
    solution:
      "Built an enterprise-grade platform combining AI-powered radiology analysis with DICOM/Orthanc PACS integration, designed with HIPAA compliance and scalability in mind.",
    links: [
      { label: "Live demo", href: "https://radiology-ten.vercel.app/" },
      { label: "Watch demo", href: "https://www.youtube.com/watch?v=m9hT4-A8NWg" },
    ],
    theme: "dark",
    techStack: ["Next.js", "Node.js", "Docker", "AI/ML", "Pinata Cloud", "REST APIs", "HIPAA Encryption"],
  },
  {
    number: "02",
    type: "Web3 / AI",
    title: "NeuroSync AI",
    year: "Jan 2025",
    thesis: "An AI mental-health companion designed around emotional support and Web3 privacy.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    alt: "Abstract data dashboard with charts",
    problem:
      "Mental-health support tools often compromise user privacy, creating barriers to seeking help.",
    solution:
      "Created an AI companion integrating emotional analysis with blockchain identity and decentralized storage, including crisis detection, personalized guidance, and token-based engagement.",
    links: [
      { label: "Watch demo", href: "https://www.youtube.com/watch?v=ABMIvSrTyQo" },
      { label: "Case study", href: "#contact" },
    ],
    theme: "paper",
    techStack: ["Next.js", "Pinata Cloud", "Vapi AI", "Web3", "Vercel"],
  },
  {
    number: "03",
    type: "AI tool / Healthcare",
    title: "Derma AI",
    year: "Nov 2025",
    thesis: "An AI-powered dermatology platform connecting early skin insights with structured consultations.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85",
    alt: "Architectural lines and a warm sunlit wall",
    problem:
      "Limited access to early dermatology insights and inefficient doctor-consultation processes make it harder to act early.",
    solution:
      "Developed an AI dermatology analyzer with structured appointment and case-management workflows, bridging AI analysis with real medical consultations.",
    links: [
      { label: "Live demo", href: "https://derma-ai-sandy.vercel.app/" },
      { label: "Case study", href: "#contact" },
    ],
    theme: "accent",
    techStack: ["Next.js", "Node.js", "Pinata Cloud", "AI/ML", "API Routes"],
  },
  {
    number: "04",
    type: "SaaS / community",
    title: "Hackathon Hub",
    year: "Jan 2026",
    thesis: "A centralized discovery platform for students, developers, and builders looking for their next hackathon.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
    alt: "A group collaborating around a table",
    problem:
      "Hackathons are scattered across platforms, making discovery difficult for students and developers.",
    solution:
      "Built a centralized platform with a clean interface for quick discovery, focused on builders who actively participate in hackathons.",
    links: [{ label: "Live demo", href: "https://hackathon-hub-five.vercel.app/" }, { label: "Case study", href: "#contact" }],
    theme: "dark",
    techStack: ["Next.js", "React", "Supabase", "GitHub Actions", "Vercel"],
  },
  {
    number: "05",
    type: "SaaS / wellness",
    title: "FitTracker",
    year: "Oct 2025",
    thesis: "AI-powered fitness and nutrition tracking for more personal, data-informed habit building.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85",
    alt: "A person preparing for a workout",
    problem:
      "Fragmented fitness tools lack personalization and data-driven insights for long-term habit building.",
    solution:
      "Combined AI-powered meal planning, workout management, and progress tracking with visual analytics and privacy-focused workflows.",
    links: [{ label: "Live demo", href: "https://fitness-tau-ten.vercel.app/" }, { label: "Case study", href: "#contact" }],
    theme: "paper",
    techStack: ["Next.js", "Node.js", "Supabase Auth", "MongoDB", "Shadcn"],
  },
  {
    number: "06",
    type: "SaaS / events",
    title: "Elite Events",
    year: "Sep 2025",
    thesis: "A premium college-event platform for discovery, ticketing, referrals, and loyalty rewards.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85",
    alt: "A live event with lights and a crowd",
    problem:
      "College events lack modern digital infrastructure for discovery, booking, and management.",
    solution:
      "Built an end-to-end event system with authentication, ticket booking, discounts, referrals, and loyalty rewards using a scalable split-data architecture.",
    links: [{ label: "Watch demo", href: "https://www.youtube.com/watch?v=954seioV2n0" }, { label: "Case study", href: "#contact" }],
    theme: "accent",
    techStack: ["Next.js", "Node.js", "Express.js", "Shadcn", "Vercel"],
  },
] as const;

const timeline = [
  {
    year: "Aug 2026 — now",
    title: "AI/ML Trainee · Programming.com",
    copy: "Building AI agents and production-level RAG agents for practical, real-world workflows.",
  },
  {
    year: "15+ hackathons",
    title: "Builder, finalist & mentor",
    copy: "Earned Top 3 and Top 5 finishes, represented my college at Microsoft through a Code Cubicals hackathon, won cash prizes, and mentored students and builders.",
  },
  {
    year: "2023 — Aug 2027",
    title: "B.E. Computer Science Engineering",
    copy: "Studying at Chitkara University and learning through projects, experimentation, hackathons, and practical problem-solving.",
  },
] as const;

const resumeHref = "https://drive.google.com/file/d/13skx2-VL11mANXA0kPz5IQru5JgZUzA4/view";

function ArrowLink({ label, href }: { label: string; href: string }) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {label} <span>↗</span>
    </a>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className={`project-card project-card-${project.theme} reveal-up`}>
      <div className="project-visual">
        <img src={project.image} alt={project.alt} />
        <span className="project-number">{project.number}</span>
        <span className="project-type">{project.type}</span>
      </div>
      <div className="project-body">
        <div className="project-topline">
          <h3>{project.title}</h3>
          <span className="project-year">{project.year}</span>
        </div>
        <p className="project-thesis">{project.thesis}</p>
        <div className="project-tech" aria-label={`${project.title} technology stack`}>
          {project.techStack.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <details className="project-details">
          <summary>
            Read the build story <span>+</span>
          </summary>
          <div className="details-copy">
            <p>
              <b>Problem:</b> {project.problem}
            </p>
            <p>
              <b>Solution:</b> {project.solution}
            </p>
          </div>
        </details>
        <div className="project-links">
          {project.links.map((link) => (
            <ArrowLink key={link.label} label={link.label} href={link.href} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
<<<<<<< HEAD
=======
      <PortfolioAIController />
>>>>>>> origin/master
      <div className="noise" aria-hidden="true" />
      <div className="cursor" aria-hidden="true">
        <span />
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to the top">
          <span className="brand-mark">IR</span>
          <span className="brand-copy">
            ishaan
            <br />
            rai<span className="brand-dot">.</span>
          </span>
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#about" data-nav-link>
            About
          </a>
          <a href="#work" data-nav-link>
            Work
          </a>
          <a href="#journey" data-nav-link>
            Journey
          </a>
          <a href="#contact" data-nav-link>
            Contact
          </a>
        </nav>

<<<<<<< HEAD
        <a className="header-cta" href="#contact" data-magnetic>
          <span>Let’s talk</span>
          <span className="arrow">↗</span>
        </a>
=======
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <AICallTriggerButton variant="header" />
          <a className="header-cta" href="#contact" data-magnetic>
            <span>Let’s talk</span>
            <span className="arrow">↗</span>
          </a>
        </div>
>>>>>>> origin/master
      </header>

      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-meta eyebrow-row reveal-up">
              <p>
              <span className="status-dot" /> Open to opportunities and collaborations
            </p>
            <p className="meta-right">AI/ML trainee · RAG builder · explorer</p>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow reveal-up">A living portfolio / India / 2026</p>
              <h1 id="hero-title" className="hero-title reveal-up">
                I turn <em>curiosity</em>
                <br />
                into useful
                <br />
                AI solutions<span className="title-mark">✳</span>
              </h1>
              <p className="hero-intro reveal-up">
                I’m Ishaan Rai, an AI/ML Trainee at Programming.com and a final-year computer science
                student who loves solving real-world problems with technology that can actually ship.
              </p>
              <div className="hero-actions reveal-up">
                <a className="button button-primary" href="#work" data-magnetic>
                  <span>See selected work</span>
                  <span className="button-icon">↓</span>
                </a>
<<<<<<< HEAD
=======
                <AICallTriggerButton variant="hero" />
>>>>>>> origin/master
                <a className="text-link" href={resumeHref} target="_blank" rel="noreferrer">
                  Download résumé <span>↗</span>
                </a>
              </div>
            </div>

            <div className="hero-stage" aria-label="A visual collage representing an adventurous AI creator">
              <div className="hero-orbit orbit-one" aria-hidden="true" />
              <div className="hero-orbit orbit-two" aria-hidden="true" />
              <div className="hero-orbit orbit-three" aria-hidden="true" />
              <div className="hero-card hero-card-main parallax-card">
                <img src="/ishaan.jpg" alt="Ishaan Rai" />
                <div className="image-tint" />
                <div className="hero-card-caption">
                  <span>Field note / Ishaan Rai</span>
                  <span>Build boldly</span>
                </div>
              </div>
              <div className="hero-card hero-card-small parallax-card">
                <img
                  src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=85"
                  alt="A foggy forest landscape"
                />
                <span className="small-card-label">
                  go somewhere
                  <br />
                  <em>new</em>
                </span>
              </div>
              <div className="hero-stamp">
                <span>build with</span>
                <strong>intent</strong>
                <span>solve what matters</span>
              </div>
              <div className="hero-scroll-note">
                <span className="scroll-line" />
                <span>Scroll to wander</span>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-label="What I do">
          <div className="ticker-track">
            <span>AI/ML</span>
            <i>✳</i>
            <span>hackathons</span>
            <i>✳</i>
            <span>new tools</span>
            <i>✳</i>
            <span>hiking trails</span>
            <i>✳</i>
            <span>AI/ML</span>
            <i>✳</i>
            <span>music</span>
            <i>✳</i>
            <span>real-world builds</span>
            <i>✳</i>
            <span>travel</span>
            <i>✳</i>
          </div>
        </div>

        <section id="about" className="about section-shell section-pad" aria-labelledby="about-title">
          <div className="section-heading reveal-up">
            <p className="eyebrow">01 / The person behind the pixels</p>
            <p className="section-index">A little context</p>
          </div>

          <div className="about-grid">
            <div className="about-lead reveal-up">
            <p className="display-quote" id="about-title">
                “Build boldly. Solve what <em>matters.</em>”
              </p>
              <div className="about-signature">
                Ishaan Rai<span>✳</span>
              </div>
            </div>

            <div className="about-copy reveal-up">
              <p>
                I’m Ishaan Rai, an AI/ML developer and final-year computer science student. Hackathons
                pulled me into building, and emerging AI tools keep pulling me toward the next problem
                worth solving.
              </p>
              <p>
                I enjoy turning ideas into real-world products, mentoring students and builders at
                hackathons, and learning by making. Outside the screen, you’ll usually find me
                travelling, hiking, tracking a new trail, training at the gym, or listening to
                Hindi, English, and Punjabi romantic and pop music.
              </p>
              <div className="about-facts">
                <div className="fact">
                  <span className="fact-number">01</span>
                  <span className="fact-label">
                    15+ hackathons
                    <br />
                    participated
                  </span>
                </div>
                <div className="fact">
                  <span className="fact-number">02</span>
                  <span className="fact-label">
                    2 client
                    <br />
                    projects
                  </span>
                </div>
                <div className="fact">
                  <span className="fact-number">03</span>
                  <span className="fact-label">
                    Top 3 & Top 5
                    <br />
                    finishes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="signal-section section-shell" aria-label="Current signals">
          <div className="signal-grid reveal-up">
            <div className="signal-card signal-card-large">
              <span className="eyebrow">Currently tracking</span>
              <div className="signal-title-row">
                <h2>
                  What’s
                  <br />
                  <em>next?</em>
                </h2>
                <span className="signal-arrow">↗</span>
              </div>
              <p>Emerging AI tools, intelligent workflows, and practical products that solve real problems.</p>
              <div className="signal-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="signal-card signal-card-music">
              <span className="eyebrow">Now playing / moodboard</span>
              <div className="record-art">
                <div className="record-ring ring-a" />
                <div className="record-ring ring-b" />
                <div className="record-center">♪</div>
              </div>
              <div className="music-copy">
                <strong>Soft chaos, good lyrics</strong>
                <span>Hindi · English · Punjabi romance and pop</span>
              </div>
              <div className="waveform" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="signal-card signal-card-tools">
              <span className="eyebrow">Tools I keep close</span>
              <div className="tool-list">
                <span>
                  01 <b>RAG agents</b>
                </span>
                <span>
                  02 <b>AI workflows</b>
                </span>
                <span>
                  03 <b>APIs & backends</b>
                </span>
                <span>
                  04 <b>Hackathon builds</b>
                </span>
              </div>
              <div className="tool-note">Always one hackathon, trail, or new tool away from a new obsession.</div>
            </div>
          </div>
        </section>

        <section id="work" className="work section-shell section-pad" aria-labelledby="work-title">
          <div className="section-heading reveal-up">
            <p className="eyebrow">02 / Selected experiments</p>
            <p className="section-index">Problem → solution → signal</p>
          </div>

          <div className="work-intro">
            <h2 id="work-title" className="section-title reveal-up">
              Things I’ve
              <br />
              <em>made real.</em>
            </h2>
            <p className="section-description reveal-up">
              Real projects from my journey through AI, backend systems, SaaS, healthcare, Web3,
              and hackathon-driven building. Each one carries the problem, the solution, and the
              tools that made it possible.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <ProjectCard key={project.number} project={project} />
            ))}
          </div>
        </section>

        <section className="youtube-section section-shell section-pad" aria-labelledby="youtube-title">
          <div className="section-heading reveal-up">
            <p className="eyebrow">03 / Out in the open</p>
            <p className="section-index">The creator side</p>
          </div>
          <div className="creator-grid">
            <div className="creator-copy reveal-up">
              <p className="eyebrow">YouTube / learning in public</p>
              <h2 id="youtube-title">
                The messy
                <br />
                <em>middle</em> is the story.
              </h2>
              <p>
                I share what I’m learning about emerging AI tools, practical development, hackathons,
                and the experiments that happen between “this could be interesting” and “it actually works.”
              </p>
              <a className="button button-outline" href="https://www.youtube.com/watch?v=m9hT4-A8NWg" target="_blank" rel="noreferrer" data-magnetic>
                <span>Visit the channel</span>
                <span className="button-icon">↗</span>
              </a>
            </div>
            <a
              className="video-feature reveal-up"
              href="https://www.youtube.com/watch?v=m9hT4-A8NWg"
              target="_blank"
              rel="noreferrer"
              aria-label="Watch the latest field note"
            >
              <img
                src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1400&q=85"
                alt="A vintage camera resting on a desk"
              />
              <span className="video-overlay" />
              <span className="video-play">▶</span>
              <span className="video-caption">
                <span>Latest field note</span>
                <strong>AI ideas that actually ship</strong>
              </span>
            </a>
          </div>
        </section>

        <section id="journey" className="journey section-shell section-pad" aria-labelledby="journey-title">
          <div className="section-heading reveal-up">
            <p className="eyebrow">04 / The route so far</p>
            <p className="section-index">Still becoming</p>
          </div>
          <div className="journey-grid">
            <div className="journey-heading reveal-up">
              <h2 id="journey-title">
                A few
                <br />
                <em>chapters.</em>
              </h2>
              <p>
                From a computer science degree and hackathons to AI/ML development, mentorship,
                travel, and the next problem worth solving.
              </p>
            </div>
            <div className="timeline">
              {timeline.map((item) => (
                <div className="timeline-item reveal-up" key={item.year}>
                  <span className="timeline-year">{item.year}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact section-shell section-pad" aria-labelledby="contact-title">
          <div className="contact-frame reveal-up">
            <div className="contact-topline">
              <span className="eyebrow">05 / Next chapter</span>
              <span className="contact-stamp">Open to good energy</span>
            </div>
            <h2 id="contact-title">
              Let’s build
              <br />
              <em>something that matters.</em>
            </h2>
            <p>
              Open to full-time AI/ML, backend, frontend, and full-stack roles; project and
              technical product management; data science and data analysis; consulting; freelance
              work; and mentoring builders through their next hackathon.
            </p>
            <a className="contact-email" href="mailto:ishaanrai18@gmail.com">
              ishaanrai18@gmail.com <span>↗</span>
            </a>
            <div className="contact-links">
              <ArrowLink label="GitHub" href="https://github.com/Ishaan-Rai09" />
              <ArrowLink label="LinkedIn" href="https://www.linkedin.com/in/ishaan-rai/" />
              <ArrowLink label="YouTube" href="https://www.youtube.com/watch?v=m9hT4-A8NWg" />
              <ArrowLink label="Email" href="mailto:ishaanrai18@gmail.com" />
              <ArrowLink label="Résumé" href={resumeHref} />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <span>© 2026 Ishaan Rai</span>
        <span>Designed for motion, built for meaningful work.</span>
        <a href="#top">Back to top ↑</a>
      </footer>

      <ScrollEffects />
    </>
  );
}
