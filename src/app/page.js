"use client";

import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path) => `${basePath}${path}`;

const skillTabs = {
  frontend: [
    { icon: "fa-code", title: "HTML", text: "Semantic, accessible page structure.", filter: "html" },
    { icon: "fa-palette", title: "CSS", text: "Responsive layouts, animations, and visual systems.", filter: "css" },
    { icon: "fa-bolt", title: "JavaScript", text: "Interactive interfaces and dynamic browser behavior.", filter: "js" },
    { icon: "fa-mobile-screen", title: "Responsive Design", text: "Mobile-first UI that adapts cleanly.", filter: "responsive" },
  ],
  backend: [
    { icon: "fa-wordpress", title: "WordPress", text: "Custom websites with ACF fields, CPT structure, and scalable content workflows.", filter: "wordpress", brand: true },
    { icon: "fa-wand-magic-sparkles", title: "Elementor", text: "Building polished WordPress pages with flexible visual layouts.", filter: "elementor" },
    { icon: "fa-gears", title: "Dynamic Pages", text: "Reusable templates for data-driven pages.", filter: "dynamic" },
    { icon: "fa-mug-hot", title: "Java", text: "Object-oriented programming and backend logic.", filter: "java" },
  ],
  dbms: [
    { icon: "fa-database", title: "MySQL", text: "Queries, schemas, and practical data handling.", filter: "mysql" },
  ],
  ai: [
    { icon: "fa-python", title: "Python", text: "Programming, automation, and problem solving.", filter: "python", brand: true },
    { icon: "fa-chart-line", title: "Machine Learning", text: "Predictive modeling and applied analysis.", filter: "ml" },
    { icon: "fa-brain", title: "AI Concepts", text: "Interest in intelligent systems and workflows.", filter: "ai" },
    { icon: "fa-github", title: "GitHub", text: "Version control and project publishing.", filter: "github", brand: true },
  ],
};

const projects = [
  {
    title: "Personal Portfolio",
    image: asset("/images/project1.png"),
    alt: "Portfolio Website",
    description:
      "Designed and built a responsive personal portfolio to present my skills, education, projects, CV, and contact options in one polished website.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    skills: ["html", "css", "js", "responsive"],
  },
  {
    title: "United Car Removal",
    image: asset("/images/project2.png"),
    alt: "United Car Removal Website",
    description:
      "Built a dynamic WordPress website using Elementor, ACF, CPT, and reusable templates so service and location pages can be managed efficiently.",
    tags: ["WordPress", "Elementor", "ACF", "CPT"],
    skills: ["wordpress", "elementor", "acf", "cpt", "dynamic", "responsive"],
    live: "https://unitedcarremoval.com.au/staging5/",
  },
  {
    title: "Stock Price Prediction",
    image: asset("/images/project3.png"),
    alt: "Stock Price Prediction Project",
    description:
      "Developed a Python and machine learning research project to analyze historical stock data and explore forecasting methods for market trends.",
    tags: ["Python", "Machine Learning", "AI", "Research"],
    skills: ["python", "ml", "ai", "stock", "research", "data"],
    live: "https://ieeexplore.ieee.org/abstract/document/10306948",
    github: "https://github.com/santoshparki/Stockprice-prediction",
    githubLabel: "GitHub",
    liveLabel: "Research Paper",
  },
];

const navItems = [
  ["about", "About"],
  ["services", "Services"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["projects", "Projects"],
  ["contact", "Contact"],
];

const stats = [
  ["3+", "Featured projects"],
  ["10+", "Core technologies"],
  ["2023", "CSE graduate"],
];

const services = [
  {
    icon: "fa-display",
    title: "Responsive Websites",
    text: "Portfolio, business, and landing pages that look clean on mobile, tablet, and desktop.",
  },
  {
    icon: "fa-wordpress",
    title: "WordPress Development",
    text: "Elementor websites with ACF, CPT, reusable templates, and manageable content structure.",
    brand: true,
  },
  {
    icon: "fa-screwdriver-wrench",
    title: "Website Improvements",
    text: "Frontend fixes, UI polish, content updates, speed improvements, and layout refinements.",
  },
  {
    icon: "fa-brain",
    title: "AI/ML Projects",
    text: "Python-based academic and practical projects involving data analysis and machine learning concepts.",
  },
];

export default function HomePage() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("frontend");
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      document.querySelector(".navbar")?.classList.toggle("scrolled", window.scrollY > 36);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    const fadeElements = document.querySelectorAll(".scroll-fade");
    if ("IntersectionObserver" in window && fadeElements.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
          });
        },
        { threshold: 0.16 }
      );
      fadeElements.forEach((el) => observer.observe(el));
      return () => {
        window.removeEventListener("scroll", onScroll);
        observer.disconnect();
      };
    }

    fadeElements.forEach((el) => el.classList.add("visible"));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  const filteredProjects = selectedSkill
    ? projects.filter((project) => project.skills.includes(selectedSkill))
    : projects;

  const filterMessage = selectedSkill
    ? `${filteredProjects.length} project${filteredProjects.length === 1 ? "" : "s"} using ${selectedSkill.toUpperCase()}`
    : "Showing all featured projects";

  const handleSkillClick = (filter) => {
    setSelectedSkill(filter);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  return (
    <>
      <header className="hero" id="home" style={{ "--hero-bg": `url("${asset("/images/profile.jpg")}")` }}>
        <nav className="navbar" aria-label="Primary navigation">
          <a href="#home" className="logo logo-badge" onClick={() => setMenuOpen(false)}>
            SP
          </a>

          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
          </button>

          <ul className={`nav-links ${menuOpen ? "show-menu" : ""}`}>
            {navItems.map(([href, label]) => (
              <li key={href}>
                <a href={`#${href}`} className="nav-item" onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="theme-toggle"
            type="button"
            aria-label="Toggle dark mode"
            onClick={() => setDark((prev) => !prev)}
          >
            <i className={`fa-solid ${dark ? "fa-sun" : "fa-moon"}`} />
          </button>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <p className="eyebrow">Available for web development work</p>
            <h1>Santosh Parki</h1>
            <p className="mini-tag">B.Tech CSE Graduate</p>
            <h2>
              Web Developer specializing in <span>WordPress, responsive frontend, and AI/ML projects.</span>
            </h2>
            <p className="desc">
              I build clean websites and practical technology projects for people who need reliable,
              user-friendly digital solutions. Based in Nepal and open to remote opportunities.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                <i className="fa-solid fa-briefcase" /> View Projects
              </a>
              <a href="#contact" className="btn btn-outline">
                <i className="fa-solid fa-paper-plane" /> Contact Me
              </a>
              <a href={asset("/Santosh_kumar_Parki.pdf")} className="btn btn-light" download>
                <i className="fa-solid fa-download" /> Download CV
              </a>
            </div>

            <div className="hero-stats" aria-label="Portfolio highlights">
              {stats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-image" aria-label="Santosh Parki profile">
            <img src={asset("/images/profile.jpg")} alt="Santosh Parki" className="main-img" />
            <div className="profile-card">
              <span className="status-dot" />
              <div>
                <strong>Web Developer</strong>
                <p>WordPress, frontend, AI/ML</p>
              </div>
            </div>
            <div className="grad-card">
              <img src={asset("/images/graduation.jpg")} alt="Graduation ceremony" className="grad-img" />
              <p>Graduation 2023</p>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="section about-section">
        <div className="section-heading">
          <p className="section-kicker">About</p>
          <h2>Driven by practical learning and useful digital products.</h2>
        </div>

        <div className="about-box scroll-fade">
          <p>
            I am <strong>Santosh Parki</strong> from <strong>Darchula, Nepal</strong>. I grew up in Kuchkaot
            and completed my education up to grade 10 in Mahendranagar, where I built the discipline and
            curiosity that still guide how I learn today.
          </p>
          <p>
            After grade 12 at United Academy in Kathmandu, I earned the <strong>SII Scholarship</strong> and
            completed my bachelor&apos;s degree in <strong>Computer Science and Engineering</strong>.
          </p>
          <p>
            I now focus on web development, especially responsive interfaces, WordPress implementation, and
            applied AI/ML projects that solve clear problems.
          </p>

          <div className="about-highlights">
            <div className="highlight-card">
              <i className="fa-solid fa-location-dot" />
              <h3>From</h3>
              <p>Darchula, Nepal</p>
            </div>
            <div className="highlight-card">
              <i className="fa-solid fa-graduation-cap" />
              <h3>Education</h3>
              <p>Bachelor in Computer Science &amp; Engineering</p>
            </div>
            <div className="highlight-card">
              <i className="fa-solid fa-laptop-code" />
              <h3>Focus</h3>
              <p>Web Development, AI &amp; ML</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="section-heading">
          <p className="section-kicker">Services</p>
          <h2>What I can do for your website or project.</h2>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card scroll-fade" key={service.title}>
              <span className="service-icon">
                <i className={`${service.brand ? "fa-brands" : "fa-solid"} ${service.icon}`} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="container">
          <div className="section-heading inverse">
            <p className="section-kicker">Skills</p>
            <h2>Tools I use to turn ideas into working experiences.</h2>
          </div>

          <div className="skills-tabs" role="tablist" aria-label="Skill categories">
            {Object.keys(skillTabs).map((key) => (
              <button
                key={key}
                className={`tab-btn ${activeTab === key ? "active" : ""}`}
                onClick={() => setActiveTab(key)}
                type="button"
              >
                {key === "dbms" ? "DBMS" : key === "ai" ? "AI" : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          <div className="skills-display">
            {Object.entries(skillTabs).map(([key, items]) => (
              <div key={key} className={`skills-group ${activeTab === key ? "active" : ""}`}>
                <div className="skills-container">
                  {items.map((item) => (
                    <button
                      key={item.title}
                      className={`skill-card scroll-fade ${selectedSkill === item.filter ? "active-skill" : ""}`}
                      type="button"
                      onClick={() => handleSkillClick(item.filter)}
                    >
                      <span className="skill-icon">
                        <i className={`${item.brand ? "fa-brands" : "fa-solid"} ${item.icon}`} />
                      </span>
                      <span className="skill-title">{item.title}</span>
                      <span className="skill-text">{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="section education-section">
        <div className="section-heading">
          <p className="section-kicker">Education</p>
          <h2>Academic path with steady technical growth.</h2>
        </div>

        <div className="education-container">
          <div className="education-card scroll-fade" style={{ "--progress": "89%" }}>
            <span className="edu-icon"><i className="fa-solid fa-school" /></span>
            <h3>SEE (Grade 10)</h3>
            <p>Kanchan Vidya Mandir, Mahendranagar</p>
            <span className="grade">GPA: 3.55 / 4.0</span>
            <div className="edu-progress"><span /></div>
            <span className="year">Passout: 2017</span>
          </div>

          <div className="education-card scroll-fade" style={{ "--progress": "76%" }}>
            <span className="edu-icon"><i className="fa-solid fa-flask" /></span>
            <h3>+2 Science</h3>
            <p>United Academy, Kathmandu</p>
            <span className="grade">GPA: 3.05 / 4.0</span>
            <div className="edu-progress"><span /></div>
            <span className="year">Passout: 2019</span>
          </div>

          <div className="education-card scroll-fade highlight" style={{ "--progress": "83%" }}>
            <span className="edu-icon"><i className="fa-solid fa-graduation-cap" /></span>
            <h3>Bachelor in CSE</h3>
            <p>Jain University, Bangalore</p>
            <span className="grade">CGPA: 8.29 / 10</span>
            <div className="edu-progress"><span /></div>
            <span className="year">Passout: 2023</span>
            <span className="scholarship">SII Scholarship Recipient</span>
          </div>
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="section-heading inverse">
            <p className="section-kicker">Projects</p>
            <h2>Selected work with a practical, build-first mindset.</h2>
          </div>

          <div className="projects-controls">
            <button
              className={!selectedSkill ? "active" : ""}
              type="button"
              onClick={() => setSelectedSkill(null)}
            >
              All Projects
            </button>
            <p className="filter-info">{filterMessage}</p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => {
              const visible = !selectedSkill || project.skills.includes(selectedSkill);
              return (
                <article
                  key={project.title}
                  className={`project-card scroll-fade ${visible ? "active-project" : "hidden"}`}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.alt} />
                    <span className="project-overlay">View Project</span>
                  </div>
                  <div className="project-content">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                    <div className="project-tags">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="project-buttons">
                      {project.live && (
                        <a href={project.live} target="_blank" className="btn live-btn" rel="noreferrer">
                          <i className="fa-solid fa-arrow-up-right-from-square" />
                          {project.liveLabel || "Live Demo"}
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" className="btn github-btn" rel="noreferrer">
                          <i className="fa-brands fa-github" />
                          {project.githubLabel || "GitHub"}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="section-heading">
          <p className="section-kicker">Contact</p>
          <h2>Have a website idea or project? Feel free to contact me.</h2>
        </div>

        <div className="contact-wrapper scroll-fade">
          <div className="contact-info-card">
            <h3>Get in touch</h3>
            <a href="mailto:parkisantosh42@gmail.com"><i className="fa-solid fa-envelope" /> parkisantosh42@gmail.com</a>
            <a href="tel:+9779767439314"><i className="fa-solid fa-phone" /> +977-9767439314</a>
            <a href="tel:+9779765083687"><i className="fa-solid fa-phone" /> +977-9765083687</a>
            <p><i className="fa-solid fa-location-dot" /> Darchula, Nepal</p>

            <a
              className="whatsapp-cta"
              href="https://wa.me/9779767439314?text=Hi%20Santosh%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp" /> Chat on WhatsApp
            </a>

            <div className="social-links">
              <a href="https://wa.me/9779767439314" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" /></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
              <a href="https://www.linkedin.com/in/santosh-kumar-parki-911995206?" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
              <a href="https://github.com/santoshparki" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github" /></a>
            </div>
          </div>

          <form
            className="contact-form"
            action="https://formspree.io/f/xwvwwkbg"
            method="POST"
          >
            <input type="hidden" name="_subject" value="New portfolio contact message" />
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" name="phone" placeholder="Enter your phone number" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" placeholder="Write your message here..." required />
            </div>
            <button type="submit" className="btn btn-primary form-btn">
              <i className="fa-solid fa-paper-plane" /> Send Message
            </button>
            <p className="form-success">
              Your message will be sent securely through Formspree. For faster communication, use WhatsApp.
            </p>
          </form>
        </div>
      </section>

      <footer>
        <p>© 2026 Santosh Kumar Parki. All Rights Reserved.</p>
      </footer>
    </>
  );
}
