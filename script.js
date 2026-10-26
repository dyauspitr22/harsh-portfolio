/**
 * Harsh Kumar Mishra | AI & ML Engineer Portfolio
 * Interactive Functionality & Dynamic Demos
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME TOGGLE (Dark / Light mode)
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('harsh_portfolio_theme') || 'dark';

  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('harsh_portfolio_theme', newTheme);
    });
  }

  // 2. MOBILE HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. DYNAMIC TYPEWRITER EFFECT
  const typewriterElement = document.getElementById('typewriter');
  const phrases = [
    'Autonomous LangChain Agents',
    'Sub-500ms Vision Pipelines',
    'Table-Aware Scientific RAG',
    'Exogenous Time Series Models',
    'High-Throughput ML Services'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1600; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing new phrase
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // 4. ANIMATED METRICS COUNTERS
  const metricNumbers = document.querySelectorAll('.metric-number');
  const metricFloat = document.querySelector('.metric-number-float');

  let metricsAnimated = false;

  function animateCounters() {
    metricNumbers.forEach(elem => {
      const target = parseInt(elem.getAttribute('data-target'), 10);
      let count = 0;
      const speed = target / 40;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          elem.textContent = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          elem.textContent = target;
        }
      };
      updateCount();
    });

    if (metricFloat) {
      const targetFloat = parseFloat(metricFloat.getAttribute('data-target'));
      let countFloat = 0;
      const step = targetFloat / 40;

      const updateFloat = () => {
        countFloat += step;
        if (countFloat < targetFloat) {
          metricFloat.textContent = countFloat.toFixed(2);
          requestAnimationFrame(updateFloat);
        } else {
          metricFloat.textContent = targetFloat.toFixed(2);
        }
      };
      updateFloat();
    }
  }

  const metricsSection = document.querySelector('.metrics-grid');
  if (metricsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !metricsAnimated) {
          animateCounters();
          metricsAnimated = true;
        }
      });
    }, { threshold: 0.3 });

    observer.observe(metricsSection);
  }

  // 5. PROJECT FILTERING
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. MODALS ARCHITECTURE DEEP DIVE
  const modalOpenBtns = document.querySelectorAll('.btn-open-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
  const backdrop = document.getElementById('modal-backdrop');
  const modals = document.querySelectorAll('.project-modal');

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (!targetModal) return;

    backdrop.classList.add('active');
    targetModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('active');
    modals.forEach(modal => modal.classList.remove('active'));
    document.body.style.overflow = '';
  }

  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 7. INTERACTIVE MINTZY AGENT PLAYGROUND
  const terminalLogs = document.getElementById('terminal-logs');
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const clearBtn = document.getElementById('agent-clear-btn');
  const promptPills = document.querySelectorAll('.agent-query-pill');

  const agentSimulations = {
    stocks: {
      query: "Suggest 2 banking stocks with Balanced risk for the next 10 days",
      steps: [
        {
          type: 'thought',
          text: "Thought: The user is requesting a 10-day banking stock recommendation with a defined risk preference ('Balanced'). I will formulate a PredictAction tool call passing tickers [HDFCBANK, KOTAKBANK] to the time-series forecasting model."
        },
        {
          type: 'action',
          text: `Action: Invoke PredictEngine tool with JSON payload:\n{\n  "action_type": "predict",\n  "given": {\n    "tickers": ["HDFCBANK", "KOTAKBANK"],\n    "time_frame": "10_days"\n  },\n  "parameters": ["RSI_14", "BollingerBands", "Comprehensive_RRR"],\n  "user_profile": {"risk": "Balanced"}\n}`
        },
        {
          type: 'observation',
          text: "Observation: Model evaluated. HDFCBANK: RSI 46.2 (Neutral-Bullish accumulation), projected return +3.4% with Sharpe 1.42. KOTAKBANK: Low volatility baseline, support consolidated at ₹1,780, projected upside +2.8%."
        },
        {
          type: 'answer',
          text: "LangChain ReAct Agent Response:\n\nBased on your Balanced risk appetite over the next 10 days:\n\n1. HDFCBANK: Currently demonstrating healthy consolidation above primary EMA supports with an RSI of 46.2. Projected upside target: +3.4%.\n2. KOTAKBANK: Stable risk-return profile (Sharpe 1.42) with a favorable Risk-Reward Ratio (RRR 1:2.4). Projected upside target: +2.8%.\n\nRisk Advisory: Maintain strict stop-loss at lower Bollinger band boundaries."
        }
      ]
    },
    table: {
      query: "Extract Q3 financial performance table from uploaded earnings report",
      steps: [
        {
          type: 'thought',
          text: "Thought: User requested tabular financial data from an uploaded corporate earnings PDF. I need to query the Pinecone vector index partitioned under user_id='investor_902' with table extraction metadata flags."
        },
        {
          type: 'action',
          text: `Action: PineconeVectorSearch with filter:\n{\n  "namespace": "user_session_49f8",\n  "metadata_filter": {"has_table": true, "doc_section": "Financial_Highlights_Q3"}\n}`
        },
        {
          type: 'observation',
          text: "Observation: 1 matching document found. Extracted 4x5 table markdown: [Revenue: $4.2B (+12% YoY), Operating Margin: 24.5%, Net Income: $1.02B, Diluted EPS: $1.84 vs $1.72 est]."
        },
        {
          type: 'answer',
          text: "LangChain ReAct Agent Response:\n\nExtracted Q3 Financial Summary Table:\n-------------------------------------------------\nMetric               Q3 Actual       YoY Change\n-------------------------------------------------\nTotal Revenue        $4.20 Billion   +12.0%\nOperating Margin     24.5%           +180 bps\nNet Income           $1.02 Billion   +14.2%\nDiluted EPS          $1.84           +7.0% (Beat by $0.12)\n-------------------------------------------------\nSynthesis: Solid operational execution driven by cloud revenue expansion and gross margin improvement."
        }
      ]
    },
    risk: {
      query: "Evaluate risk profile for high-volatility tech assets",
      steps: [
        {
          type: 'thought',
          text: "Thought: User wants risk evaluation for high-volatility technology assets. I must first trigger ClarifyAction to verify the user's maximum acceptable portfolio drawdown before executing speculative screening."
        },
        {
          type: 'action',
          text: `Action: Invoke ClarifyAction:\n{\n  "action_type": "clarify",\n  "field": "user_risk_tolerance.max_drawdown",\n  "reason": "High-volatility tech screening requires drawdown threshold (e.g., -10%, -20%, or unconstrained)."\n}`
        },
        {
          type: 'observation',
          text: "Observation: User selected benchmark tolerance: Moderate-High (20% max trailing drawdown threshold)."
        },
        {
          type: 'answer',
          text: "LangChain ReAct Agent Response:\n\nPortfolio Risk Assessment Applied:\n- Benchmark Drawdown Tolerance: 20%\n- Volatility Filter (Beta > 1.35): Tech basket filtered to 3 assets meeting 1.8+ Sharpe and healthy free-cash-flow yield.\n- Agent Recommendation: Size position to ≤ 15% of total capital to protect from sector-wide rate repricing."
        }
      ]
    }
  };

  let isAgentRunning = false;

  function appendLog(type, text, isCustom = false) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}-log`;

    if (type === 'query') {
      entry.innerHTML = `<span style="color:#64748b;">User &gt;</span> ${escapeHtml(text)}`;
    } else {
      entry.innerText = text;
    }

    terminalLogs.appendChild(entry);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
  }

  function escapeHtml(string) {
    return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  async function runSimulation(simData) {
    if (isAgentRunning) return;
    isAgentRunning = true;

    appendLog('query', simData.query);

    for (const step of simData.steps) {
      await new Promise(r => setTimeout(r, 650));
      appendLog(step.type, step.text);
    }

    isAgentRunning = false;
  }

  promptPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const key = pill.getAttribute('data-query');
      if (agentSimulations[key]) {
        runSimulation(agentSimulations[key]);
      }
    });
  });

  if (terminalForm) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userText = terminalInput.value.trim();
      if (!userText || isAgentRunning) return;

      terminalInput.value = '';

      // Match closest or provide dynamic generic ReAct flow
      let chosenKey = 'stocks';
      const lower = userText.toLowerCase();
      if (lower.includes('table') || lower.includes('report') || lower.includes('pdf')) {
        chosenKey = 'table';
      } else if (lower.includes('risk') || lower.includes('volat') || lower.includes('drawdown')) {
        chosenKey = 'risk';
      }

      const customSim = {
        query: userText,
        steps: [
          {
            type: 'thought',
            text: `Thought: Analyzing query '${userText}'. Querying session memory and matching with LangChain registered tools [PredictEngine, VectorSearch, ConsultAction].`
          },
          ...agentSimulations[chosenKey].steps.slice(1)
        ]
      };

      runSimulation(customSim);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      terminalLogs.innerHTML = `
        <div class="log-entry system-msg">
          <span class="log-prefix">[AGENT INITIALIZED]</span> LangChain ReAct agent loaded with tools: <code>[WebSearch, PredictEngine, VectorRetriever, TableParser]</code>. Memory bound to Pinecone namespace <code>user_session_49f8</code>.
        </div>
        <div class="log-entry prompt-hint">
          &gt; Select an example prompt above or type in the input below to test the agent loop...
        </div>
      `;
    });
  }

  // 8. COPY EMAIL TO CLIPBOARD
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('mishraharsh008@gmail.com').then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('mishraharsh008@gmail.com');
      });
    });
  }

  // 9. CONTACT FORM
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      formFeedback.className = 'form-feedback success';
      formFeedback.textContent = `Thank you, ${name}! Your email client will now open to deliver your message.`;

      // Trigger mailto with prefilled fields
      const mailtoUri = `mailto:mishraharsh008@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
      window.location.href = mailtoUri;

      setTimeout(() => {
        contactForm.reset();
      }, 2000);
    });
  }

  // 10. ACTIVE NAVIGATION SPY ON SCROLL
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 11. SUBTLE BACKGROUND PARTICLES CANVAS
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 45);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const particleColor = isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(14, 165, 233, 0.25)';
      const lineColor = isDark ? 'rgba(129, 140, 248, 0.08)' : 'rgba(99, 102, 241, 0.05)';

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }
});
