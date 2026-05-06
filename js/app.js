document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentRole = null; // 'priest' or 'deacon'
    let currentService = 'divineLiturgy';

    // DOM Elements
    const landingView = document.getElementById('landing-view');
    const dashboardView = document.getElementById('dashboard-view');
    const roleButtons = document.querySelectorAll('.role-card');
    const backButton = document.getElementById('back-button');
    const currentRoleTitle = document.getElementById('current-role-title');
    const navButtons = document.querySelectorAll('.nav-btn');
    const serviceTitle = document.getElementById('service-title');
    const serviceContent = document.getElementById('service-content');

    // Navigation Labels mapping
    const serviceLabels = {
        divineLiturgy: 'Divine Liturgy',
        hierarchical: 'Hierarchical Divine Liturgy',
        vespers: 'Vespers (Great & Daily)',
        robloxManners: 'Roblox Context & Manners'
    };

    // --- Event Listeners ---

    // Role Selection
    roleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const role = btn.getAttribute('data-role');
            selectRole(role);
        });
    });

    // Back Button
    backButton.addEventListener('click', () => {
        showLandingView();
    });

    // Service Navigation
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Load content
            const service = btn.getAttribute('data-service');
            loadContent(service);
        });
    });

    // --- Core Functions ---

    function selectRole(role) {
        currentRole = role;
        
        // Update UI
        currentRoleTitle.textContent = role.charAt(0).toUpperCase() + role.slice(1);
        
        // Reset navigation to default (Divine Liturgy)
        navButtons.forEach(b => b.classList.remove('active'));
        document.querySelector('[data-service="divineLiturgy"]').classList.add('active');
        
        // Load initial content
        loadContent('divineLiturgy');

        // Switch views
        showDashboardView();
    }

    function loadContent(service) {
        currentService = service;
        
        // Update Title
        serviceTitle.textContent = serviceLabels[service];

        // Fade out content slightly for transition
        serviceContent.style.opacity = 0;
        serviceContent.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            // Inject content from content.js
            if (studyContent[currentRole] && studyContent[currentRole][currentService]) {
                serviceContent.innerHTML = studyContent[currentRole][currentService];
            } else {
                serviceContent.innerHTML = '<p>Content coming soon...</p>';
            }

            // Trigger reflow
            void serviceContent.offsetWidth;

            // Fade in
            serviceContent.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            serviceContent.style.opacity = 1;
            serviceContent.style.transform = 'translateY(0)';
        }, 200); // Wait for fade out
    }

    function showDashboardView() {
        landingView.classList.remove('active');
        
        // Add small delay to let landing fade out before showing dashboard
        setTimeout(() => {
            dashboardView.classList.add('active');
        }, 200);
    }

    function showLandingView() {
        dashboardView.classList.remove('active');
        
        // Add small delay
        setTimeout(() => {
            landingView.classList.add('active');
        }, 200);
    }
});
