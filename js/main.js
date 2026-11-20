/**
 * Security Central — Modern Enterprise Website Redesign
 * Interactive Functionality & Live Central Station Telemetry
 * Decision Maker Pitch: Dan Turner, CTO
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTelemetrySimulator();
  initTechTabs();
  initServiceFilters();
  initRiskAssessmentWizard();
  initForms();
  initSmoothScroll();
});

/* ==========================================================================
   1. NAVBAR & MOBILE NAVIGATION
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.main-navbar');
  const mobileToggle = document.querySelector('.mobile-toggle-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header background shift on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('svg');
      if (icon) {
        icon.innerHTML = isOpen 
          ? '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' 
          : '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
      }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active link spy
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. LIVE CENTRAL STATION TELEMETRY SIMULATOR
   ========================================================================== */
function initTelemetrySimulator() {
  const feedStream = document.getElementById('telemetry-stream');
  if (!feedStream) return;

  const mockEvents = [
    { type: 'CAD', class: 'cad', label: 'ASAP 911', title: 'Direct CAD Transmission • Statesville PSAP', time: 'Just now' },
    { type: 'DENALI', class: 'cad', label: 'DENALI', title: 'Subscriber Group Verified • Cancel Dispatch', time: '12s ago' },
    { type: 'FIRE', class: 'fire', label: 'FIRE UL', title: 'Commercial Duct Detector Supervisory • Ch. 2', time: '28s ago' },
    { type: 'ELA', class: 'cad', label: 'ELA AI', title: 'Non-Dispatch Voice Notification Confirmed', time: '41s ago' },
    { type: 'BURGLARY', class: 'burglary', label: 'INTRUSION', title: 'Zone 14 Rear Motion • Video Verified', time: '1m ago' },
    { type: 'SUPERVISORY', class: 'cad', label: 'TECH LAB', title: 'Radio Comm Test 5G LTE-M • Signal Strong', time: '2m ago' }
  ];

  let currentIndex = 0;

  // Periodically insert live simulated signal
  setInterval(() => {
    const event = mockEvents[currentIndex % mockEvents.length];
    currentIndex++;

    const row = document.createElement('div');
    row.className = `feed-row ${event.class}`;
    row.innerHTML = `
      <div class="feed-event-left">
        <span class="feed-type-badge">${event.label}</span>
        <span class="feed-event-title">${event.title}</span>
      </div>
      <span class="feed-time">0s ago</span>
    `;

    feedStream.insertBefore(row, feedStream.firstChild);

    // Keep max 4 rows
    if (feedStream.children.length > 4) {
      feedStream.removeChild(feedStream.lastChild);
    }
  }, 4500);
}

/* ==========================================================================
   3. PROPRIETARY TECHNOLOGY SUITE (ELA • DENALI • SCAN)
   ========================================================================== */
function initTechTabs() {
  const tabButtons = document.querySelectorAll('.platform-tab-button');
  const panels = document.querySelectorAll('.tech-panel-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPlatform = btn.getAttribute('data-platform');

      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`panel-${targetPlatform}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Interactive Denali button demonstration
  const denaliCancel = document.querySelector('.btn-denali-cancel');
  const denaliDispatch = document.querySelector('.btn-denali-dispatch');
  const denaliStatus = document.getElementById('denali-status-text');

  if (denaliCancel && denaliStatus) {
    denaliCancel.addEventListener('click', () => {
      denaliStatus.innerHTML = '<span style="color: #38bdf8; font-weight: bold;">✓ Dispatch Cancelled by Keyholder (False Alarm Reported)</span>';
      showToast('Denali: Alarm cancelled by authorized contact. Dispatch withheld.');
    });
  }

  if (denaliDispatch && denaliStatus) {
    denaliDispatch.addEventListener('click', () => {
      denaliStatus.innerHTML = '<span style="color: #ef4444; font-weight: bold;">🚨 Emergency Dispatch Requested! Relaying to 911 via ASAP-to-PSAP...</span>';
      showToast('Denali: Immediate emergency dispatch transmitted to central station.');
    });
  }
}

/* ==========================================================================
   4. SOLUTIONS & SERVICES FILTERING
   ========================================================================== */
function initServiceFilters() {
  const filterButtons = document.querySelectorAll('.service-tab-btn');
  const cards = document.querySelectorAll('.service-detail-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE RISK ASSESSMENT & DEALER FIT WIZARD
   ========================================================================== */
function initRiskAssessmentWizard() {
  const wizardNodes = document.querySelectorAll('.wizard-step-node');
  const wizardSteps = document.querySelectorAll('.wizard-step-content');
  const btnNext = document.getElementById('wizard-btn-next');
  const btnPrev = document.getElementById('wizard-btn-prev');
  const wizardSummary = document.getElementById('wizard-assessment-summary');

  let currentStep = 1;
  const totalSteps = 4;

  // Selectable tiles handling
  const selectionTiles = document.querySelectorAll('.selection-tile');
  selectionTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const parentGroup = tile.closest('.selection-tiles-grid');
      const isMulti = parentGroup.hasAttribute('data-multi-select');

      if (!isMulti) {
        parentGroup.querySelectorAll('.selection-tile').forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
      } else {
        tile.classList.toggle('selected');
      }
    });
  });

  function showStep(stepIndex) {
    wizardSteps.forEach((step, idx) => {
      step.classList.toggle('active', idx + 1 === stepIndex);
    });

    wizardNodes.forEach((node, idx) => {
      const nodeStep = idx + 1;
      node.classList.remove('active', 'completed');
      if (nodeStep === stepIndex) {
        node.classList.add('active');
      } else if (nodeStep < stepIndex) {
        node.classList.add('completed');
      }
    });

    // Button states
    if (btnPrev) {
      btnPrev.style.visibility = stepIndex === 1 ? 'hidden' : 'visible';
    }

    if (btnNext) {
      if (stepIndex === totalSteps) {
        btnNext.textContent = 'Submit Assessment & Request Consultation';
        btnNext.classList.add('btn-primary');
        calculateAssessmentSummary();
      } else {
        btnNext.textContent = 'Continue to Next Step →';
      }
    }
  }

  function calculateAssessmentSummary() {
    if (!wizardSummary) return;

    // Gather selected elements
    const selectedScale = document.querySelector('#step-1 .selection-tile.selected .tile-title');
    const scaleText = selectedScale ? selectedScale.textContent.trim() : 'Standard Dealer Tier';

    const selectedServices = Array.from(document.querySelectorAll('#step-2 .selection-tile.selected .tile-title'))
      .map(t => t.textContent.trim());

    const servicesText = selectedServices.length > 0 
      ? selectedServices.join(', ') 
      : 'Wholesale Monitoring & Business Services';

    wizardSummary.innerHTML = `
      <div style="background: rgba(2, 132, 199, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 10px; padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="color: #38bdf8; font-size: 1rem; margin-bottom: 0.5rem; font-weight: 800;">Preliminary Evaluation Match</h4>
        <p style="font-size: 0.875rem; color: #cbd5e1; line-height: 1.5;">
          <strong>Account Scale:</strong> ${scaleText}<br/>
          <strong>Requested Capabilities:</strong> ${servicesText}<br/>
          <strong>Central Station Fit:</strong> <span style="color: #10b981; font-weight: bold;">100% UL 827 / TMA Five Diamond Eligible</span>
        </p>
      </div>
    `;
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      } else {
        // Form submission simulated
        const nameField = document.getElementById('wizard-contact-name');
        const companyField = document.getElementById('wizard-company-name');
        const emailField = document.getElementById('wizard-contact-email');

        if (!nameField.value.trim() || !companyField.value.trim() || !emailField.value.trim()) {
          showToast('Please fill in required contact fields.', true);
          return;
        }

        showToast('Consultation Request Prepared for CTO Dan Turner & Onboarding Team!');
        
        const wizardContainer = document.querySelector('.assessment-container');
        if (wizardContainer) {
          wizardContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem;">
              <div style="width: 64px; height: 64px; background: rgba(16, 185, 129, 0.2); border: 2px solid #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #10b981; font-size: 2rem;">
                ✓
              </div>
              <h3 style="font-size: 1.75rem; color: #ffffff; font-weight: 800; margin-bottom: 0.75rem;">Risk Assessment & Proposal Request Generated</h3>
              <p style="color: #cbd5e1; max-width: 580px; margin: 0 auto 1.75rem; font-size: 1rem; line-height: 1.6;">
                Thank you, <strong>${nameField.value}</strong> of <strong>${companyField.value}</strong>. Your custom dealer migration profile and redundancy requirements have been cataloged for demonstration review.
              </p>
              <div style="background: rgba(13, 30, 61, 0.7); border: 1px solid var(--border-light); border-radius: 12px; max-width: 500px; margin: 0 auto 2rem; padding: 1.25rem; font-size: 0.8125rem; color: var(--text-secondary); text-align: left;">
                <p><strong>Primary Operations:</strong> Statesville, NC (HQ) • Knoxville, TN • Anderson, SC</p>
                <p><strong>Toll-Free Dealer Support:</strong> 1-800-438-4171</p>
                <p><strong>Executive Reviewer:</strong> Dan Turner, Chief Technology Officer</p>
              </div>
              <button class="btn btn-secondary" onclick="location.reload()">Start New Assessment</button>
            </div>
          `;
        }
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
  }
}

/* ==========================================================================
   6. CONTACT FORM & DEMO VALIDATION
   ========================================================================== */
function initForms() {
  const contactForm = document.getElementById('general-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;

      if (!name || !email) {
        showToast('Please provide your name and email.', true);
        return;
      }

      showToast(`Thank you, ${name}! Your consultation inquiry has been logged.`);
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   7. SMOOTH SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   8. TOAST NOTIFICATIONS HELPER
   ========================================================================== */
function showToast(message, isError = false) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.style.borderColor = isError ? 'var(--crimson-alert)' : 'var(--blue-light)';
  toast.innerHTML = `
    <span style="color: ${isError ? '#ef4444' : '#38bdf8'}; font-weight: bold;">
      ${isError ? '⚠' : 'ℹ'}
    </span>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
