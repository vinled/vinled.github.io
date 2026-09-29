/**
 * VINICIUS LEDESMA — PORTFOLIO INTERACTION ENGINE
 * Creative Technologist & AI Prototyper
 * Pure Vanilla JS — Zero dependencies, 60fps, touch & keyboard accessible
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Case Study Data Store
  // =========================================================================
  const CASE_STUDIES = {
    'windy-3d': {
      id: 'windy-3d',
      tag: 'WebGL • Three.js • Em Produção',
      title: 'Windy 3D — Visualizador Climático Interativo',
      headline: 'Reinventando a visualização meteorológica em uma experiência espacial 3D com dados ECMWF/GFS em tempo real.',
      meta: [
        { label: 'Função', value: 'Creative Technologist' },
        { label: 'Stack', value: 'Three.js, WebGL, CSS Glass, Vercel' },
        { label: 'Status', value: 'No Ar (Produção)' },
        { label: 'Modelos', value: 'ECMWF (9km) & GFS' }
      ],
      liveUrl: 'https://weather3d-nine.vercel.app/',
      sections: [
        {
          number: '01',
          title: 'O Desafio: Saindo dos Mapas 2D Estáticos',
          content: `
            <p class="case-paragraph">
              A imensa maioria dos serviços meteorológicos contemporâneos entrega dados climáticos em tabelas áridas ou mapas bidimensionais estáticos que não transmitem a real dimensão dos fluxos atmosféricos planetários.
            </p>
            <p class="case-paragraph">
              A proposta do <strong>Windy 3D</strong> foi conceber e construir uma experiência tridimensional imersiva e responsiva diretamente no navegador. O objetivo primordial era unir o rigor e a precisão de ferramentas industriais como o <em>Windy.com</em> com o refinamento estético da filosofia Apple (Glassmorphism, tipografia limpa e transições táteis).
            </p>
            <div class="case-callout">
              <div class="case-callout-title">Desafio de Engenharia</div>
              <div class="case-callout-text">
                Renderizar partículas de vento dinâmicas, camadas volumétricas e relevo esférico com WebGL mantendo 60 FPS consistentes em dispositivos desktop e mobile sem travar a interface do usuário.
              </div>
            </div>
          `
        },
        {
          number: '02',
          title: 'Design de Interface (UI) & Experiência Espacial (UX)',
          content: `
            <p class="case-paragraph">
              Para orquestrar múltiplos parâmetros atmosféricos sem poluição visual, a arquitetura da aplicação foi dividida em duas camadas fundamentais: o <strong>Globo 3D imersivo em segundo plano</strong> e um <strong>HUD de Controle Flutuante 2D (Glassmorphic)</strong>:
            </p>
            <ul class="case-list">
              <li><strong>Painel de Camadas Dinâmicas:</strong> Alternância instantânea entre fluxos de vento volumétricos, radares de chuva, descargas elétricas (raios em tempo real), heatmaps de temperatura superficial, nebulosidade e neve.</li>
              <li><strong>Contexto Brasileiro & Rios Voadores:</strong> Visualização inédita dos "Rios Voadores da Amazônia" canalizando umidade em direção ao Sudeste/Centro-Oeste, com fronteiras estaduais e cidades em 3D.</li>
              <li><strong>Card de Cidade com Gráfico Sparkline:</strong> Campo de busca preditiva com autoconsulta. Ao selecionar uma cidade (ex: Santos ou São Paulo), um card flutuante revela temperatura, umidade, vento, pressão barométrica e a curva térmica das próximas 24 horas.</li>
              <li><strong>Scrubber Temporal Interativo:</strong> Barra de reprodução estilo Apple QuickTime que permite navegar na linha do tempo meteorológica (Agora, +6h, +12h, +24h, +48h, +72h) alternando entre modelos numéricos de ponta (ECMWF vs GFS).</li>
            </ul>
          `
        },
        {
          number: '03',
          title: 'Engenharia Criativa & Arquitetura Técnica',
          content: `
            <p class="case-paragraph">
              O projeto foi concebido com uma mentalidade de engenharia modular, sem frameworks pesados para garantir velocidade instantânea de carregamento:
            </p>
            <ul class="case-list">
              <li><strong>Three.js & Shaders WebGL:</strong> Gerenciamento de cena 3D com câmera orbital desacelerada, mapeamento de textura de relevo normalizado, atmosfera luminosa e sistema de partículas com instanciamento otimizado.</li>
              <li><strong>CSS Glassmorphism de Alta Performance:</strong> Efeitos de desfoque de fundo (<code>backdrop-filter</code>) acelerados por GPU, cantos arredondados proporcionais e legendas com gradientes dinâmicos atualizados de acordo com a escala de calor ou vento ativa.</li>
              <li><strong>Pipeline CI/CD Automatizado:</strong> Repositório versionado no GitHub conectado com deploys instantâneos via Vercel Edge Network, entregando assets com baixa latência global.</li>
            </ul>
          `
        },
        {
          number: '04',
          title: 'Impacto & Resultados',
          content: `
            <p class="case-paragraph">
              O <strong>Windy 3D</strong> é uma demonstração palpável da minha capacidade como <strong>Creative Technologist</strong> de operar na convergência entre estética visual refinada e código interativo avançado. O projeto está no ar, é 100% público e funcional, provando autonomia técnica e agilidade de entrega do conceito ao deploy.
            </p>
          `
        }
      ]
    },

    'post-na-mao': {
      id: 'post-na-mao',
      tag: 'Google AI Studio • GenAI • Vibecoding',
      title: 'Post Na Mão — Webapp Imobiliário com IA',
      headline: 'Eliminando o atrito de criação para corretores com design sob medida, templates refinados e geração de copy em tempo real.',
      meta: [
        { label: 'Função', value: 'Creative Technologist & AI Prototyper' },
        { label: 'Ferramentas', value: 'Google AI Studio, LLMs, UI Design' },
        { label: 'Status', value: 'Protótipo Funcional' },
        { label: 'Abordagem', value: 'Vibecoding & Mobile-First' }
      ],
      liveUrl: 'http://postnamao.com.br',
      sections: [
        {
          number: '01',
          title: 'O Problema: A Síndrome do "Panfleto de Supermercado"',
          content: `
            <p class="case-paragraph">
              No mercado imobiliário moderno, agilidade de divulgação é o maior trunfo de um corretor. Eles captam lançamentos e coberturas na rua, mas se deparam com um bloqueio operacional diário na hora de produzir anúncios para as redes:
            </p>
            <ul class="case-list">
              <li><strong>Curva de Aprendizado Excessiva:</strong> Corretores não têm tempo nem repertório gráfico para operar ferramentas pesadas como Photoshop ou mesmo templates confusos do Canva no celular.</li>
              <li><strong>Poluição Estética Prejudicial:</strong> O resultado costuma oscilar entre fotos cruas sem dados essenciais ou artes cheias de fontes berrantes e elementos piscando — fazendo um imóvel de alto padrão parecer um panfleto de liquidação.</li>
              <li><strong>Atrito no Timing:</strong> A foto é tirada no smartphone, mas a publicação demora horas ou dias para ser diagramada, perdendo o momento quente da captação.</li>
            </ul>
          `
        },
        {
          number: '02',
          title: 'A Visão de UX & O Processo de Vibecoding',
          content: `
            <p class="case-paragraph">
              Conhecendo a rotina da corretagem e tendo forte intuição em experiência do usuário, compreendi que a resposta não era oferecer "mais botões de edição", mas sim <strong>eliminar decisões desnecessárias e entregar o resultado final com um clique</strong>.
            </p>
            <p class="case-paragraph">
              Em vez de perder meses com wireframes estáticos, adotei a metodologia de <strong>Vibecoding com o Google AI Studio</strong>. Traduzi minha intuição de produto diretamente em prompts estruturados de arquitetura e lógica funcional, iterando com LLMs em tempo recorde. A premissa: <em>o corretor preenche 3 campos e o criativo perfeito surge imediatamente na tela</em>.
            </p>
          `
        },
        {
          number: '03',
          title: 'A Solução: Design + IA em Tempo Real',
          content: `
            <p class="case-paragraph">
              O <strong>Post Na Mão</strong> é um webapp responsivo desenvolvido para funcionar com perfeição tanto na tela de um smartphone enquanto o corretor está no carro, quanto no desktop da imobiliária:
            </p>
            <ul class="case-list">
              <li><strong>Renderização Reativa em Tempo Real:</strong> Qualquer dado digitado (valor, quartos, metragem, bairro) é formatado e renderizado instantaneamente sobre a imagem com tipografia e espaçamento profissionais.</li>
              <li><strong>5 Templates Minimalistas Embutidos:</strong> Modelos pré-calibrados com princípios de design editorial de luxo (sem necessidade de ajuste manual de réguas ou margens).</li>
              <li><strong>Gerador de Copy com IA Generativa:</strong> Elimina o bloqueio criativo do profissional. A inteligência artificial consome as características do imóvel e redige uma legenda persuasiva e personalizada para o Instagram, já formatada com hashtags pertinentes.</li>
              <li><strong>Fluxo de Postagem Fricção Zero:</strong> Exportação direta em alta definição para a biblioteca do aparelho ou compartilhamento imediato no app do Instagram.</li>
            </ul>
          `
        },
        {
          number: '04',
          title: 'Impacto & Resultados',
          content: `
            <p class="case-paragraph">
              O <strong>Post Na Mão</strong> comprova a capacidade de mapear uma fricção real de negócio (B2B/B2C) e entregar um produto digital completo em tempo recorde utilizando IA generativa de forma prática, estratégica e pragmática.
            </p>
          `
        }
      ]
    }
  };

  // =========================================================================
  // 2. Ambient Particles & Fluid Background Canvas (Retina & Accessible)
  // =========================================================================
  function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let hasUserMovedMouse = false;
    let autoOscillation = 0;
    let animId = null;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    resize();

    const particleCount = window.innerWidth < 768 ? 24 : 45;
    const particles = [];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.32;
        this.vy = (Math.random() - 0.5) * 0.32;
        this.alpha = Math.random() * 0.35 + 0.12;
        this.color = Math.random() > 0.5 ? '#38bdf8' : '#818cf8';
      }

      update(parallaxFactorX, parallaxFactorY) {
        this.x += this.vx + parallaxFactorX * 0.35;
        this.y += this.vy + parallaxFactorY * 0.35;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    window.addEventListener('mousemove', (e) => {
      hasUserMovedMouse = true;
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
      resize();
      if (motionQuery.matches) {
        drawStaticScene();
      }
    });

    function drawStaticScene() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
      }
      ctx.globalAlpha = 1;
    }

    function animate() {
      if (motionQuery.matches) {
        drawStaticScene();
        return;
      }

      if (!hasUserMovedMouse) {
        autoOscillation += 0.008;
        targetMouseX = width / 2 + Math.sin(autoOscillation) * (width * 0.15);
        targetMouseY = height / 2 + Math.cos(autoOscillation * 0.7) * (height * 0.1);
      }

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxFactorX = (mouseX - width / 2) / width;
      const parallaxFactorY = (mouseY - height / 2) / height;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(parallaxFactorX, parallaxFactorY);
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#38bdf8';
            ctx.globalAlpha = (1 - dist / 110) * 0.12;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    }

    if (motionQuery.matches) {
      drawStaticScene();
    } else {
      animate();
    }

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', (e) => {
        if (e.matches) {
          if (animId) cancelAnimationFrame(animId);
          drawStaticScene();
        } else {
          animate();
        }
      });
    }
  }

  // =========================================================================
  // 3. 3D Perspective Tilt & Specular Glare (Works on Desktop & Hybrid Laptops)
  // =========================================================================
  function initCardParallax() {
    // Only enable if pointing device supports hover (mouse, trackpad)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const cards = document.querySelectorAll('[data-tilt="true"]');

    cards.forEach((card) => {
      let isHovered = false;
      let rect = null;
      let rafId = null;
      let leaveTimeout = null;
      let targetX = 0;
      let targetY = 0;

      function updateTilt() {
        if (!isHovered || !rect) return;

        const x = targetX - rect.left;
        const y = targetY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5.5; // Max 5.5deg
        const rotateY = ((x - centerX) / centerX) * 5.5;

        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`;

        rafId = null;
      }

      card.addEventListener('mouseenter', () => {
        if (leaveTimeout) {
          clearTimeout(leaveTimeout);
          leaveTimeout = null;
        }
        isHovered = true;
        rect = card.getBoundingClientRect();
        card.style.transition = 'transform 0.15s ease-out';
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        targetX = e.clientX;
        targetY = e.clientY;

        // Remove initial transition so card tracks cursor 1:1 without lag
        if (card.style.transition) {
          card.style.transition = '';
        }

        if (!rafId) {
          rafId = requestAnimationFrame(updateTilt);
        }
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

        leaveTimeout = setTimeout(() => {
          card.style.transition = '';
        }, 500);
      });
    });
  }

  // =========================================================================
  // 4. Apple-Style Case Study Sheet / Modal Engine
  // =========================================================================
  const modalBackdrop = document.getElementById('case-modal-backdrop');
  const modalSheet = document.getElementById('case-modal-sheet');
  const modalBody = document.getElementById('case-modal-content');
  const modalCloseBtn = document.getElementById('btn-close-modal');
  const modalLiveLink = document.getElementById('modal-live-link');
  let previouslyFocusedElement = null;

  function setTriggersExpanded(studyId, expanded) {
    document.querySelectorAll(`[data-open-case="${studyId}"]`).forEach((btn) => {
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  function openCaseStudy(studyId, pushHistory = true) {
    const study = CASE_STUDIES[studyId];
    if (!study || !modalBackdrop) return;

    previouslyFocusedElement = document.activeElement;

    // Render HTML content
    const metaHtml = study.meta
      .map(
        (m) => `
      <div class="case-meta-item">
        <div class="case-meta-label">${m.label}</div>
        <div class="case-meta-value">${m.value}</div>
      </div>
    `
      )
      .join('');

    const sectionsHtml = study.sections
      .map(
        (sec) => `
      <section class="case-section">
        <h3 class="case-section-title">
          <span class="number-badge">${sec.number}</span>
          <span>${sec.title}</span>
        </h3>
        ${sec.content}
      </section>
    `
      )
      .join('');

    modalBody.innerHTML = `
      <div class="case-study-hero">
        <span class="case-study-tag">${study.tag}</span>
        <h2 class="case-study-title">${study.title}</h2>
        <p class="case-paragraph" style="font-size: 1.15rem; color: #cbd5e1; font-weight: 500;">
          ${study.headline}
        </p>
      </div>

      <div class="case-study-meta-grid">
        ${metaHtml}
      </div>

      <div class="case-study-narrative">
        ${sectionsHtml}
      </div>
    `;

    // Ensure links inside case study open safely
    modalBody.querySelectorAll('a').forEach((a) => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });

    // Update bottom primary CTA
    if (modalLiveLink) {
      modalLiveLink.href = study.liveUrl;
      modalLiveLink.innerHTML = `<span>Abrir ${study.title.split('—')[0].trim()} no Ar</span> <span aria-hidden="true">↗</span>`;
    }

    // Lock body scroll with scrollbar padding preservation across desktop & fixed nav
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-offset', `${scrollbarWidth}px`);
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    setTriggersExpanded(studyId, true);

    // Focus close button for keyboard users
    setTimeout(() => {
      if (modalCloseBtn) modalCloseBtn.focus();
    }, 100);

    // Update URL hash for shareable deep link
    if (pushHistory && history.pushState) {
      history.pushState({ modalOpen: true, studyId }, '', `#case-${studyId}`);
    }
  }

  function closeCaseStudy(syncHistory = true) {
    if (!modalBackdrop || !modalBackdrop.classList.contains('is-open')) return;

    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');

    // Clean up drag styles if active
    if (modalSheet) {
      modalSheet.classList.remove('is-dragging');
      modalSheet.style.transform = '';
      modalSheet.style.transition = '';
    }

    // Restore body scroll and clear layout offset
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.documentElement.style.setProperty('--scrollbar-offset', '0px');

    // Update trigger aria-expanded
    document.querySelectorAll('[data-open-case]').forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
    });

    // Restore previous focus
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }

    // Sync history state
    if (syncHistory) {
      if (history.state && history.state.modalOpen) {
        history.back();
      } else if (window.location.hash.startsWith('#case-')) {
        if (history.replaceState) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        } else {
          window.location.hash = '';
        }
      }
    }
  }

  function initCaseModal() {
    if (!modalBackdrop) return;

    // Trigger buttons and preview wraps
    document.querySelectorAll('[data-open-case]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-open-case');
        openCaseStudy(id, true);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = btn.getAttribute('data-open-case');
          openCaseStudy(id, true);
        }
      });
    });

    // Close button
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => closeCaseStudy(true));
    }

    // Elements with data-close-modal
    document.querySelectorAll('[data-close-modal="true"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeCaseStudy(true);
      });
    });

    // Click outside modal sheet to close
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeCaseStudy(true);
      }
    });

    // Keyboard ESC & Focus Trap
    window.addEventListener('keydown', (e) => {
      if (!modalBackdrop.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeCaseStudy(true);
        return;
      }

      // Accessible Focus Trap inside modal dialog
      if (e.key === 'Tab') {
        const focusableElements = modalSheet.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || document.activeElement === modalSheet) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });

    // Touch swipe-down to dismiss on mobile iOS sheet
    if (modalSheet) {
      let touchStartY = 0;
      let currentTouchDiffY = 0;
      let isDraggingSheet = false;
      const dragHandle = modalSheet.querySelector('.sheet-drag-handle');
      const modalHeader = modalSheet.querySelector('.modal-header');

      modalSheet.addEventListener(
        'touchstart',
        (e) => {
          const target = e.target;
          const isHeaderOrHandle = (dragHandle && dragHandle.contains(target)) || (modalHeader && modalHeader.contains(target));

          if (isHeaderOrHandle || modalSheet.scrollTop <= 0) {
            touchStartY = e.touches[0].clientY;
            isDraggingSheet = true;
            currentTouchDiffY = 0;
          } else {
            isDraggingSheet = false;
          }
        },
        { passive: true }
      );

      modalSheet.addEventListener(
        'touchmove',
        (e) => {
          if (!isDraggingSheet) return;
          const touchY = e.touches[0].clientY;
          const diff = touchY - touchStartY;

          if (diff > 0) {
            currentTouchDiffY = diff;
            modalSheet.classList.add('is-dragging');
            modalSheet.style.transform = `translateY(${diff}px)`;
          } else {
            // Dragging up while at top should scroll normally
            modalSheet.classList.remove('is-dragging');
            modalSheet.style.transform = '';
          }
        },
        { passive: true }
      );

      function handleTouchEnd() {
        if (!isDraggingSheet) return;
        isDraggingSheet = false;
        modalSheet.classList.remove('is-dragging');

        if (currentTouchDiffY > 80) {
          modalSheet.style.transition = 'transform 260ms var(--spring-snappy)';
          modalSheet.style.transform = 'translateY(100%)';
          setTimeout(() => {
            closeCaseStudy(true);
            modalSheet.style.transition = '';
            modalSheet.style.transform = '';
          }, 260);
        } else if (currentTouchDiffY > 0) {
          modalSheet.style.transition = 'transform 280ms var(--spring-snappy)';
          modalSheet.style.transform = 'translateY(0)';
          setTimeout(() => {
            modalSheet.style.transition = '';
            modalSheet.style.transform = '';
          }, 280);
        }

        currentTouchDiffY = 0;
      }

      modalSheet.addEventListener('touchend', handleTouchEnd);
      modalSheet.addEventListener('touchcancel', handleTouchEnd);
    }

    // History popstate listener for back/forward navigation sync
    window.addEventListener('popstate', () => {
      const hash = window.location.hash;
      if (hash.startsWith('#case-')) {
        const studyId = hash.replace('#case-', '');
        if (CASE_STUDIES[studyId]) {
          openCaseStudy(studyId, false);
        }
      } else if (modalBackdrop.classList.contains('is-open')) {
        closeCaseStudy(false);
      }
    });

    // Check on page load for deep-link hash (e.g. #case-windy-3d)
    const initialHash = window.location.hash.replace('#case-', '');
    if (CASE_STUDIES[initialHash]) {
      setTimeout(() => openCaseStudy(initialHash, false), 250);
    }
  }

  // =========================================================================
  // 5. Apple-Style Haptic Toast Notification & Copy Engine
  // =========================================================================
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  function showToast(message, duration = 3000) {
    if (!toast) return;

    if (toastMessage) {
      toastMessage.textContent = message;
    }

    toast.classList.add('is-visible');

    if (toastTimeout) clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, duration);
  }

  function initClipboardActions() {
    document.querySelectorAll('[data-copy]').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy');
        const feedbackMsg = btn.getAttribute('data-toast') || 'Copiado para a área de transferência!';

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            // Graceful fallback for file:/// and restricted iframes
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }
          showToast(`✓ ${feedbackMsg}`);
        } catch (err) {
          showToast(`Contato: ${textToCopy}`);
        }
      });
    });
  }

  // =========================================================================
  // 6. Smooth Scroll Reveal (Intersection Observer)
  // =========================================================================
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // =========================================================================
  // 7. Dynamic Navigation Dock Elevation on Scroll
  // =========================================================================
  function initNavScroll() {
    const navIsland = document.querySelector('.nav-island');
    if (!navIsland) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navIsland.style.background = 'rgba(10, 14, 24, 0.9)';
        navIsland.style.boxShadow = '0 16px 36px -8px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.2)';
      } else {
        navIsland.style.background = 'rgba(12, 17, 28, 0.78)';
        navIsland.style.boxShadow = '0 12px 32px -8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
      }
    });
  }

  // =========================================================================
  // Initialization Lifecycle
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initAmbientCanvas();
    initCardParallax();
    initCaseModal();
    initClipboardActions();
    initScrollReveal();
    initNavScroll();
  });
})();
