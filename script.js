// script.js
document.addEventListener('DOMContentLoaded', () => {

    // Cursor Logic
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorTrail.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme =
            document.body.dataset.theme === 'light' ? 'dark' : 'light';
        themeToggle.innerHTML = document.body.dataset.theme === 'light'
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    });

    // Particles.js Config
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#2ecc71' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });

    // Campus Projects Data
    const campusProjects = [
        {
            title: "Leave Management System",
            description: "A system built with React.js to manage employee leave requests efficiently.",
            technologies: ["JavaScript", "Java", "HTML"]
        },
        {
            title: "Security Vulnerability Assessment",
            description: "Conducted a risk assessment identifying security vulnerabilities in a construction firm's system.",
            technologies: ["Java", "Cybersecurity", "Risk Management"]
        },
        {
            title: "Project Management System",
            description: "A system developed for Rohan Construction Firm to improve their project efficiency by 30%.",
            technologies: ["Python", "Google Cloud", "Firebase"]
        }
    ];

    const campusContainer = document.getElementById('campus-projects-container');
    campusProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        campusContainer.appendChild(projectCard);
    });

    // GitHub Repositories
    async function fetchGitHubRepos() {
        try {
            const response = await fetch('https://api.github.com/users/HiranthaDs/repos');
            const repos = await response.json();
            return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        } catch (error) {
            console.error('Error fetching repositories:', error);
            return [];
        }
    }

    const githubContainer = document.getElementById('github-repos-container');
    fetchGitHubRepos().then(repos => {
        repos.forEach(repo => {
            const repoCard = createProjectCard(repo, true);
            githubContainer.appendChild(repoCard);
        });
    });

    // Create Project Cards with 3D Hover Effect
    function createProjectCard(project, isGitHub = false) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${isGitHub ? project.name : project.title}</h3>
            <p>${isGitHub ? project.description : project.description}</p>
            <div class="skills">
                ${isGitHub ? `<span class="skill-tag">${project.language || 'N/A'}</span>` : project.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
            </div>
        `;
        if (isGitHub) card.setAttribute('onclick', `window.open('${project.html_url}', '_blank')`);

        // 3D Hover Effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = (x - rect.width / 2) / 10;
            const rotateX = -(y - rect.height / 2) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });

        return card;
    }

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your message! I will respond shortly.');
                contactForm.reset();
            } else {
                alert('Oops! There was a problem sending your message. Please try again.');
            }
        }).catch(error => {
            alert('There was a network issue. Please try again later.');
        });
    });
});
