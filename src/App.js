import React, { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { 
  faGit, 
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { 
  faFileAlt, 
  faEnvelope 
} from "@fortawesome/free-solid-svg-icons";

const logos = {
  django: { 
    src: require('./logos/django-logo.svg').default, 
    link: "https://www.djangoproject.com/"
  },
  docker: { 
    src: require('./logos/docker-logo.svg').default, 
    link: "https://www.docker.com/"
  },
  hardhat: { 
    src: require('./logos/hardhat-logo.svg').default, 
    link: "https://hardhat.org/"
  },
  heroku: { 
    src: require('./logos/heroku-logo.svg').default, 
    link: "https://www.heroku.com/"
  },
  jellyfin: { 
    src: require('./logos/jellyfin-logo.svg').default, 
    link: "https://jellyfin.org/"
  },
  mongodb: { 
    src: require('./logos/mongodb-logo.svg').default, 
    link: "https://www.mongodb.com/"
  },
  nginx: { 
    src: require('./logos/nginx-logo.svg').default, 
    link: "https://www.nginx.com/"
  },
  proxmox: { 
    src: require('./logos/proxmox-logo.svg').default, 
    link: "https://www.proxmox.com/"
  },
  python: { 
    src: require('./logos/python-logo.svg').default, 
    link: "https://www.python.org/"
  },
  react: { 
    src: require('./logos/react-logo.svg').default, 
    link: "https://reactjs.org/"
  },
  ubuntu: { 
    src: require('./logos/ubuntu-logo.svg').default, 
    link: "https://ubuntu.com/server/"
  },
  apache: { 
    src: require('./logos/apache-logo.svg').default, 
    link: "https://httpd.apache.org/"
  },
  samba: { 
    src: require('./logos/samba-logo.svg').default, 
    link: "https://www.samba.org/"
  },
  php: { 
    src: require('./logos/php-logo.svg').default, 
    link: "https://www.php.net/"
  },
  vaulthunters: { 
    src: require('./logos/vh-logo.svg').default, 
    link: "https://vaulthunters.gg/"
  },
  gcloud: { 
    src: require('./logos/gcloud-logo.svg').default, 
    link: "https://cloud.google.com/"
  },
  vercel: { 
    src: require('./logos/vercel-logo.svg').default, 
    link: "https://vercel.com/"
  },
  railway: { 
    src: require('./logos/railway-logo.svg').default, 
    link: "https://railway.app/"
  },
  flask: { 
    src: require('./logos/flask-logo.svg').default, 
    link: "https://flask.palletsprojects.com/en/3.0.x/"
  },
  chatgpt: { 
    src: require('./logos/ChatGPT_logo.svg').default, 
    link: "https://openai.com/"
  },
  geojson: { 
    src: require('./logos/geojson-logo.svg').default, 
    link: "https://geojson.org/"
  }
};

const projectLogos = {
  "web-production-a16c1.up.railway.app": ["django", "python", "railway"],
  "stat.mrl.dev": ["django", "python", "railway"],
  "ostier.mrl.dev": ["react", "gcloud", "vercel"],
  "ostier.top": ["react", "gcloud", "vercel"],
  "ai.mrl.dev": ["flask","python","chatgpt"],
  "plotandpray.com": ["flask","python","chatgpt"],
  "google.com": ["flask","python","chatgpt"],
};

function App() {
  const [animate, setAnimate] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [projectStatuses, setProjectStatuses] = useState({});
  const backendUrl = 'https://mrl-backend.vercel.app';

  async function checkStatus(domain) {
    try {
      const mrlUrl = `${backendUrl}/check-status?url=${encodeURIComponent(`https://${domain}`)}`
      const response = await fetch(mrlUrl);
      const data = await response.json();
      setProjectStatuses(prevStatuses => ({
        ...prevStatuses,
        [domain]: data.status,
      }));
    } catch (error) {
      setProjectStatuses(prevStatuses => ({
        ...prevStatuses,
        [domain]: 'down',
      }));
    }
  }

  function renderLogosForProject(project) {
    return (
      <>
        {renderStatusIndicator(project)}
        {projectLogos[project].map(logoName => (
          <a href={logos[logoName].link} target="_blank" rel="noopener noreferrer" key={logoName}>
            <img 
              src={logos[logoName].src} 
              alt={`${logoName} logo`} 
              style={{ height: '1em', width: 'auto', verticalAlign: 'middle', marginRight: '5px' }}
            />
          </a>
        ))}
      </>
    );
  }

  function renderStatusIndicator(domain) {
    const status = projectStatuses[domain];
    if (status === 'up') {
      return <span style={{ color: 'green', marginRight: '5px' }}>●</span>;
    } else if (status === 'down') {
      return <span style={{ color: 'red', marginRight: '5px' }}>●</span>;
    } else {
      return <span style={{ marginRight: '5px' }}>...</span>;
    }
  }  

useEffect(() => {
  Object.keys(projectLogos).forEach(domain => checkStatus(domain));
  const timer = setTimeout(() => {
    setAnimate(true);
    const nameTimer = setTimeout(() => {
      setShowName(true);
      const titleTimer = setTimeout(() => {
        setShowTitle(true);
        const socialTimer = setTimeout(() => {
          setShowSocial(true);
          const projectsTimer = setTimeout(() => {
            setShowProjects(true);
          }, 1000);
          return () => clearTimeout(projectsTimer);
        }, 1000);
        return () => clearTimeout(socialTimer);
      }, 1000);
      return () => clearTimeout(titleTimer);
    }, 1000);
    return () => clearTimeout(nameTimer);
  }, 1200);
  return () => {
    clearTimeout(timer);
  };
}, []);

  return (
    <div className={`logo-container ${animate ? 'animate' : ''}`}>
      <div className="letter">m</div>
      <div className="hidden letter">o</div>
      <div className="letter r-adjust">r</div>
      <div className="hidden letter">e</div>
      <div className="letter">l</div>
      <div className="dev">.dev</div>
      <div className={`name ${showName ? 'show-name' : ''}`}>sebastian</div>
      <div className={`title ${showTitle ? 'show-title' : ''}`}>Data analyst</div>
      <div className={`social-links ${showSocial ? 'show-social' : ''}`}>
      <a href="https://github.com/SebastianMorel" target="_blank" rel="noopener noreferrer">
        <i>
            <FontAwesomeIcon icon={faGit} />
        </i>
      </a>
      <a href="https://www.linkedin.com/in/morels/" target="_blank" rel="noopener noreferrer">
        <i>
          <FontAwesomeIcon icon={faLinkedin} />
        </i>
        </a>
        <a href="/SebastianMorelCV.pdf" target="_blank" rel="noopener noreferrer">
        <i>
          <FontAwesomeIcon icon={faFileAlt} />
          </i>
        </a>
      <a href="mailto:sebastian.morel@hotmail.se?subject=mrl.dev | <subject>">
        <i>
            <FontAwesomeIcon icon={faEnvelope} />
        </i>
      </a>
      </div>
      <div className={`projects ${showProjects ? 'show-projects' : ''}`}>
          <span className="project-title">&gt;projects</span>
          <div className="project">
          {renderLogosForProject("web-production-a16c1.up.railway.app")}
          <a href="https://stat.mrl.dev/" target="_blank" rel="noopener noreferrer">
              stat.<span className="normal-color">mrl.dev</span>
            </a> probability calculators
            <br></br>
            {renderLogosForProject("plotandpray.com")}
            <a href="https://ai.mrl.dev/" target="_blank" rel="noopener noreferrer">
              ai.<span className="normal-color">mrl.dev</span>
            </a> ai chart maker
            <br></br>
            {renderLogosForProject("ostier.top")}
            <a href="https://ostier.mrl.dev/" target="_blank" rel="noopener noreferrer">
              ostier.<span className="normal-color">mrl.dev</span>
            </a> soundtrack tier list
            <br></br>
            {renderLogosForProject("google.com")}
            <a href="https://swehome.mrl.dev/" target="_blank" rel="noopener noreferrer">
              swehome.<span className="normal-color">mrl.dev</span>
            </a> swedish housing data
        </div>
      </div>
      <SpeedInsights />
    </div>
  );
}

export default App;
