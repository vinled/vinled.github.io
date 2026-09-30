/**
 * VINICIUS LEDESMA — TECH NOIR & 21ST.DEV INTERACTION ENGINE
 * Creative Technologist & AI Prototyper
 * Pure Vanilla JS — Zero dependencies, 60fps, touch & keyboard accessible
 * Bilingual Support: Portuguese (Default) & English (Dynamic Toggle)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Language State & Bilingual Dictionary
  // =========================================================================
  let currentLang = 'pt'; // Portuguese strictly by default on initial load!
  let currentOpenCaseId = null;

  const TRANSLATIONS = {
    pt: {
      nav_projects: 'Projetos',
      nav_methodology: 'Metodologia',
      nav_about: 'Sobre',
      nav_contact: 'Contato',
      nav_cta: 'Falar Direto',
      hero_status: 'Disponível para projetos remotos (Global & Brasil)',
      hero_eyebrow: 'PORTFÓLIO DE ENGENHARIA CRIATIVA & PRODUTO',
      hero_title: 'Creative Technologist & <span class="highlight-serif">AI Prototyper</span>',
      hero_subtitle: 'Construindo a ponte entre <strong>intuição de produto</strong>, <strong>inteligência artificial generativa</strong> e <strong>interfaces táteis de alto padrão</strong>. Criador de aplicações interativas em 3D e webapps rápidos com vibecoding.',
      hero_cta_explore: 'Explorar Projetos em Destaque',
      hero_cta_email: 'Copiar E-mail',
      hero_cta_whatsapp: 'WhatsApp Direto',
      metric_1_num: '8<span class="accent-cyan">+</span> Anos',
      metric_1_lbl: 'Criação Visual & Design',
      metric_2_num: 'Vibecoding',
      metric_2_lbl: 'Google AI Studio & LLMs',
      metric_3_num: '60 <span class="accent-cyan">FPS</span>',
      metric_3_lbl: 'Three.js & WebGL Shaders',
      metric_4_num: 'C1 <span class="accent-cyan">Fluente</span>',
      metric_4_lbl: 'Inglês Profissional Avançado',
      projects_tag: 'Portfólio Selecionado',
      projects_title: 'Projetos em <span class="highlight-serif">Destaque</span>',
      projects_desc: 'Aplicações web públicas, funcionais e interativas demonstrando domínio técnico em WebGL, inteligência artificial e refinamento de interface.',
      p1_status: 'Em Produção (Live)',
      p1_index: 'PROJETO 01 // 02',
      p1_headline: 'Visualizador Climático Interativo & Rios Voadores',
      p1_summary: 'Reinventando a meteorologia digital em uma experiência tridimensional imersiva diretamente no navegador. Dados climáticos globais dos modelos ECMWF e GFS traduzidos em fluxos dinâmicos de vento, relevo, radar de precipitação e acompanhamento térmico.',
      p1_f1: 'Globo 3D interativo em WebGL com iluminação solar orbital em tempo real.',
      p1_f2: 'Camada dos <strong>Rios Voadores da Amazônia</strong> e fluxo volumétrico de nuvens.',
      p1_f3: 'Busca preditiva de cidades brasileiras com curva de temperatura (sparkline 24h).',
      p1_f4: 'Controle de linha do tempo meteorológica e alternância entre ECMWF e GFS.',
      p1_btn_open: 'Abrir App no Ar',
      p1_btn_case: 'Ver Estudo de Caso Completo',
      p1_badge_study: 'Ver Estudo ↗',
      p2_status: 'Protótipo Funcional',
      p2_index: 'PROJETO 02 // 02',
      p2_headline: 'Webapp Imobiliário com IA & Vibecoding',
      p2_summary: 'Exterminando a <em>"síndrome do panfleto de supermercado"</em> no mercado imobiliário. Uma ferramenta ágil para corretores gerarem peças gráficas refinadas e descrições otimizadas para o Instagram com inteligência artificial diretamente do celular.',
      p2_f1: 'Geração e diagramação em tempo real: o corretor digita e a arte surge na hora.',
      p2_f2: '5 templates de design editorial de luxo pré-configurados sem atrito visual.',
      p2_f3: 'Gerador de copy inteligente com IA generativa para legendas do Instagram.',
      p2_f4: 'Prototipado em tempo recorde via <strong>Google AI Studio (Vibecoding)</strong>.',
      p2_btn_open: 'Visitar Projeto',
      p2_btn_case: 'Ver Estudo de Caso Completo',
      p2_badge_study: 'Ver Estudo ↗',
      bento_tag: 'Engenharia & Filosofia',
      bento_title: 'Como eu Penso & <span class="highlight-serif">Construo</span>',
      bento_desc: 'A fusão entre senso estético refinado, prototipação acelerada por IA e arquitetura web orientada à experiência final.',
      bento_1_title: 'Vibecoding & Prototipação Ágil com IA',
      bento_1_desc: 'Em vez de gastar semanas em reuniões e documentações estáticas, utilizo o Google AI Studio, Gemini e Claude para transformar intuição de produto em aplicações reais em horas. A inteligência artificial é a alavanca que acelera a prototipação sem sacrificar rigor de usabilidade.',
      bento_chip_prompt: 'Engenharia de Prompts',
      bento_chip_rapid: 'Iteração Rápida',
      bento_2_title: 'Front-End Interativo & 3D WebGL',
      bento_2_desc: 'Construção de experiências espaciais com Three.js e shaders WebGL. Código modular, leve e responsivo garantindo 60 quadros por segundo tanto no Safari iOS quanto em desktops de alta resolução.',
      bento_3_title: 'Craft Visual & Ergonomia Tátil',
      bento_3_desc: 'Bagagem sólida de mais de 8 anos em criação visual, tratamento fotográfico (Photoshop, Lightroom) e design de interfaces no Figma. Equilíbrio preciso entre o minimalismo de vidro da Apple e os containers dinâmicos do Material 3.',
      bento_chip_micro: 'Micro-interações',
      bento_4_title: 'Autonomia Remota & Resolução de Problemas',
      bento_4_desc: 'Perfil orientado à entrega assíncrona. Capacidade autodidata de aprender qualquer stack necessária, diagnosticar gargalos técnicos e colocar produtos no ar com CI/CD contínuo na Vercel e GitHub. Comunicação transparente em português e inglês fluente.',
      bento_chip_remote: 'Trabalho 100% Remoto',
      bento_chip_english: 'Inglês Avançado (C1)',
      bento_chip_critical: 'Pensamento Crítico',
      profile_role: 'Creative Technologist & AI Prototyper',
      profile_bio: 'Atuo na fronteira exata entre <strong>design visual de alto nível</strong>, <strong>engenharia de front-end</strong> e <strong>inteligência artificial generativa</strong>. Com base em Santos/SP e operando de forma 100% remota para o Brasil e exterior, dedico minha energia à construção de produtos digitais que não apenas funcionam com precisão técnica, mas proporcionam uma sensação memorável de elegância e fluidez.',
      profile_meta_location: 'Santos, SP — Brasil (100% Remoto)',
      profile_meta_lang: 'Português (Nativo) | Inglês (C1 Avançado)',
      profile_meta_avail: 'Disponibilidade imediata para novos desafios',
      contact_tag: 'Vamos Conversar?',
      contact_title: 'Pronto para dar vida à sua próxima ideia?',
      contact_desc: 'Seja para criar um protótipo com IA generativa, desenvolver uma interface 3D imersiva ou integrar uma equipe ágil global, estou à disposição.',
      contact_email_btn: 'Copiar viniciusjrl@me.com',
      contact_wa_btn: 'Chamar no WhatsApp (13) 99134-0510',
      footer_rights: '© 2026 Vinicius Ledesma. Todos os direitos reservados.',
      footer_built: 'Projetado com estética Apple HIG + Google Material 3 • Zero dependências',
      modal_header_meta: 'Estudo de Caso Detalhado',
      modal_close: 'Fechar Janela',
      modal_live_text: 'Abrir Projeto no Ar',
      toast_copied: 'E-mail copiado: viniciusjrl@me.com'
    },
    en: {
      nav_projects: 'Projects',
      nav_methodology: 'Methodology',
      nav_about: 'About',
      nav_contact: 'Contact',
      nav_cta: 'Direct Talk',
      hero_status: 'Available for remote opportunities (Global & US/EU)',
      hero_eyebrow: 'CREATIVE ENGINEERING & PRODUCT PORTFOLIO',
      hero_title: 'Creative Technologist & <span class="highlight-serif">AI Prototyper</span>',
      hero_subtitle: 'Bridging <strong>product intuition</strong>, <strong>generative AI</strong>, and <strong>high-end tactile interfaces</strong>. Creator of interactive 3D WebGL experiences and high-velocity vibecoded applications.',
      hero_cta_explore: 'Explore Featured Works',
      hero_cta_email: 'Copy E-mail',
      hero_cta_whatsapp: 'Direct WhatsApp',
      metric_1_num: '8<span class="accent-cyan">+</span> Years',
      metric_1_lbl: 'Visual Design & Craft',
      metric_2_num: 'Vibecoding',
      metric_2_lbl: 'Google AI Studio & LLMs',
      metric_3_num: '60 <span class="accent-cyan">FPS</span>',
      metric_3_lbl: 'Three.js & WebGL Shaders',
      metric_4_num: 'C1 <span class="accent-cyan">Fluent</span>',
      metric_4_lbl: 'Professional English Fluency',
      projects_tag: 'Curated Showcase',
      projects_title: 'Featured <span class="highlight-serif">Projects</span>',
      projects_desc: 'Public, interactive, and production-ready web applications showcasing technical mastery in WebGL, generative AI, and interface craft.',
      p1_status: 'In Production (Live)',
      p1_index: 'PROJECT 01 // 02',
      p1_headline: 'Interactive 3D Weather Visualizer & Flying Rivers',
      p1_summary: 'Reinventing digital meteorology into an immersive spatial experience directly in the browser. Global forecast models (ECMWF & GFS) rendered into dynamic wind streams, 3D terrain, volumetric precipitation, and thermal trends.',
      p1_f1: 'Interactive 3D WebGL globe with real-time orbital solar lighting.',
      p1_f2: 'Exclusive <strong>Amazon Flying Rivers</strong> layer with volumetric cloud moisture corridors.',
      p1_f3: 'Predictive city search with 24-hour temperature trend sparkline cards.',
      p1_f4: 'Interactive timeline playback with dual global forecast models (ECMWF vs GFS).',
      p1_btn_open: 'Launch Live App',
      p1_btn_case: 'Read Full Case Study',
      p1_badge_study: 'View Case ↗',
      p2_status: 'Functional Prototype',
      p2_index: 'PROJECT 02 // 02',
      p2_headline: 'AI Real Estate Webapp & Vibecoding',
      p2_summary: 'Eliminating the <em>"supermarket flyer syndrome"</em> in real estate marketing. A lightning-fast mobile-first webapp empowering agents to generate editorial-grade Instagram graphics and AI-optimized captions in seconds.',
      p2_f1: 'Real-time generative canvas: agents type basic specs and clean editorial graphics render instantly.',
      p2_f2: '5 built-in luxury editorial templates engineered for instant visual credibility.',
      p2_f3: 'Built-in generative copywriter crafting tailored, conversion-focused Instagram captions.',
      p2_f4: 'Prototyped and shipped at record speed using <strong>Google AI Studio (Vibecoding)</strong>.',
      p2_btn_open: 'Visit Live Project',
      p2_btn_case: 'Read Full Case Study',
      p2_badge_study: 'View Case ↗',
      bento_tag: 'Philosophy & Mindset',
      bento_title: 'How I <span class="highlight-serif">Think & Build</span>',
      bento_desc: 'Blending product intuition, AI-accelerated iteration velocity, and clean modern code without bloatware.',
      bento_1_title: 'High-Velocity Vibecoding with AI',
      bento_1_desc: 'Instead of spending weeks in meetings and static specs, I leverage Google AI Studio, Gemini, and Claude to translate product intuition into live software in hours. AI is the pragmatic lever that multiplies prototyping speed without sacrificing craft.',
      bento_chip_prompt: 'Prompt Engineering',
      bento_chip_rapid: 'Rapid Iteration',
      bento_2_title: 'Interactive Front-End & 3D WebGL',
      bento_2_desc: 'Building spatial web experiences with Three.js and WebGL shaders. Modular, lightweight, responsive code delivering a rock-solid 60 FPS on both iOS Safari and high-resolution desktop displays.',
      bento_3_title: 'Visual Craft & Tactile Ergonomics',
      bento_3_desc: '8+ years background in visual design, photo retouching (Photoshop, Lightroom), and interface craft in Figma. Balanced harmony between Apple frosted glassmorphism and Material 3 expressive dynamic containers.',
      bento_chip_micro: 'Micro-interactions',
      bento_4_title: 'Remote Autonomy & Problem Solving',
      bento_4_desc: 'Built for asynchronous, high-trust remote teams. Self-directed learner capable of picking up any stack, unblocking technical hurdles, and shipping with continuous CI/CD on Vercel and GitHub. Fluent C1 English.',
      bento_chip_remote: '100% Remote Ready',
      bento_chip_english: 'Advanced English (C1)',
      bento_chip_critical: 'Critical Thinking',
      profile_role: 'Creative Technologist & AI Prototyper',
      profile_bio: 'Operating directly at the intersection of <strong>high-craft visual design</strong>, <strong>front-end engineering</strong>, and <strong>generative artificial intelligence</strong>. Based in Santos/SP, Brazil, working 100% remotely for international and national teams, dedicated to building digital products that balance technical precision with memorable elegance.',
      profile_meta_location: 'Santos, SP — Brazil (100% Remote)',
      profile_meta_lang: 'Portuguese (Native) | English (C1 Advanced)',
      profile_meta_avail: 'Immediate availability for remote roles & projects',
      contact_tag: "Let's Talk",
      contact_title: 'Ready to bring your next idea to life?',
      contact_desc: 'Whether building an AI-powered prototype, crafting an immersive 3D interface, or joining an agile global team, I would love to connect.',
      contact_email_btn: 'Copy viniciusjrl@me.com',
      contact_wa_btn: 'Chat on WhatsApp (+55 13 99134-0510)',
      footer_rights: '© 2026 Vinicius Ledesma. All rights reserved.',
      footer_built: 'Crafted with Apple HIG + Google Material 3 aesthetics • Zero dependencies',
      modal_header_meta: 'Detailed Case Study',
      modal_close: 'Close Window',
      modal_live_text: 'Launch Live App',
      toast_copied: 'E-mail copied: viniciusjrl@me.com'
    }
  };

  // =========================================================================
  // 2. Bilingual Case Study Data Store
  // =========================================================================
  const CASE_STUDIES = {
    pt: {
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
        liveButtonText: 'Abrir Windy 3D no Ar',
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
        liveButtonText: 'Abrir Post Na Mão no Ar',
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
              <ul class="case-list">
                <li><strong>Canvas Generativo Instantâneo:</strong> Conforme o usuário preenche o nome do edifício, bairro, metragem e dormitórios, a interface renderiza a peça final em tempo real com tipografia equilibrada.</li>
                <li><strong>Templates Editoriais com Grid de Luxo:</strong> Cinco variações visuais pré-calibradas baseadas no minimalismo editorial contemporâneo, evitando que qualquer post saia desalinhado.</li>
                <li><strong>Redator Generativo de Legendas:</strong> Um modelo generativo integrado escreve o texto de copy perfeito para o Instagram com emojis comedidos, apelo persuasivo e hashtags estratégicas.</li>
              </ul>
            `
          },
          {
            number: '04',
            title: 'Impacto & Validação',
            content: `
              <p class="case-paragraph">
                O <strong>Post Na Mão</strong> exemplifica a essência do vibecoding: alavancar LLMs e ferramentas como o Google AI Studio para transformar ideias em software real com velocidade vertiginosa. O produto está ativo em <a href="http://postnamao.com.br" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline;">postnamao.com.br</a>.
              </p>
            `
          }
        ]
      }
    },

    en: {
      'windy-3d': {
        id: 'windy-3d',
        tag: 'WebGL • Three.js • In Production',
        title: 'Windy 3D — Interactive Spatial Weather Visualizer',
        headline: 'Reimagining digital meteorology into an immersive 3D spatial experience with real-time ECMWF & GFS forecast models.',
        meta: [
          { label: 'Role', value: 'Creative Technologist' },
          { label: 'Stack', value: 'Three.js, WebGL, CSS Glass, Vercel' },
          { label: 'Status', value: 'Live in Production' },
          { label: 'Models', value: 'ECMWF (9km) & GFS' }
        ],
        liveUrl: 'https://weather3d-nine.vercel.app/',
        liveButtonText: 'Launch Windy 3D Live',
        sections: [
          {
            number: '01',
            title: 'The Challenge: Moving Beyond Flat 2D Maps',
            content: `
              <p class="case-paragraph">
                Most contemporary weather forecast services present planetary data through rigid tables or flat two-dimensional satellite tiles that fail to convey the true depth of global atmospheric systems.
              </p>
              <p class="case-paragraph">
                The core premise of <strong>Windy 3D</strong> was to engineer an immersive, fluid, and hardware-accelerated spatial experience running natively in modern web browsers. The design challenge was to unite industrial data rigor (comparable to <em>Windy.com</em>) with high-craft interface elegance inspired by Apple design language.
              </p>
              <div class="case-callout">
                <div class="case-callout-title">Engineering Hurdle</div>
                <div class="case-callout-text">
                  Rendering dynamic volumetric wind particles, interactive cloud corridors, and high-res spherical terrain with WebGL while locking a rock-solid 60 FPS across both mobile devices and Retina desktop displays.
                </div>
              </div>
            `
          },
          {
            number: '02',
            title: 'Interface Design (UI) & Spatial User Experience (UX)',
            content: `
              <p class="case-paragraph">
                To present multi-layered meteorological data without cognitive overload, the system employs a two-tier spatial layout:
              </p>
              <ul class="case-list">
                <li><strong>Interactive Dynamic Layer Stack:</strong> Instant zero-delay switching between wind velocity vectors, radar precipitation, real-time lightning strikes, sea surface temperatures, cloud cover, and snow depth.</li>
                <li><strong>Brazilian Flying Rivers Corridor:</strong> A world-first visual layer illustrating the Amazonian "Flying Rivers" moisture corridor channeling humidity towards South and Southeast Brazil.</li>
                <li><strong>Predictive City Search with Sparkline Curves:</strong> Autocomplete search revealing instantaneous temperature, humidity, pressure, and an interactive 24-hour thermal trend graph.</li>
                <li><strong>Interactive Scrubber Timeline:</strong> Precision playback controls allowing forecast exploration (Now, +6h, +12h, +24h, +48h, +72h) with seamless model comparison between ECMWF and GFS.</li>
              </ul>
            `
          },
          {
            number: '03',
            title: 'Creative Engineering & Architecture',
            content: `
              <p class="case-paragraph">
                Built with zero bloated dependencies for instant loading speed:
              </p>
              <ul class="case-list">
                <li><strong>Three.js & Custom WebGL Shaders:</strong> Orbital camera controls with momentum damping, normalized elevation bump mapping, atmospheric Fresnel rim lighting, and GPU-instanced particle flows.</li>
                <li><strong>High-Performance CSS Glassmorphism:</strong> GPU-accelerated background blurs (<code>backdrop-filter</code>), proportional squircles, and dynamic color-coded temperature legends.</li>
                <li><strong>Automated CI/CD Pipeline:</strong> Continuous deployment via Vercel Edge Network connected directly to GitHub with global edge caching.</li>
              </ul>
            `
          },
          {
            number: '04',
            title: 'Impact & Takeaways',
            content: `
              <p class="case-paragraph">
                <strong>Windy 3D</strong> serves as a tangible benchmark of my capabilities as a <strong>Creative Technologist</strong> operating at the convergence of visual design refinement and advanced front-end engineering. The application is live and publicly accessible.
              </p>
            `
          }
        ]
      },

      'post-na-mao': {
        id: 'post-na-mao',
        tag: 'Google AI Studio • GenAI • Vibecoding',
        title: 'Post Na Mão — AI Real Estate Webapp',
        headline: 'Eliminating marketing friction for real estate brokers with tailored editorial design, luxury templates, and instant AI copywriting.',
        meta: [
          { label: 'Role', value: 'Creative Technologist & AI Prototyper' },
          { label: 'Tools', value: 'Google AI Studio, LLMs, UI Design' },
          { label: 'Status', value: 'Functional Prototype' },
          { label: 'Methodology', value: 'Vibecoding & Mobile-First' }
        ],
        liveUrl: 'http://postnamao.com.br',
        liveButtonText: 'Launch Post Na Mão Live',
        sections: [
          {
            number: '01',
            title: 'The Problem: The "Supermarket Flyer" Syndrome',
            content: `
              <p class="case-paragraph">
                In the competitive real estate market, agility is paramount. Agents scout premium properties and penthouses in the field, but face a daily roadblock when creating social media announcements:
              </p>
              <ul class="case-list">
                <li><strong>Steep Learning Curves:</strong> Brokers do not have the time nor the graphic training to operate heavy software like Photoshop or clunky mobile Canva templates.</li>
                <li><strong>Severe Aesthetic Degradation:</strong> Results often end up looking like cheap grocery flyers with loud fonts, neon badges, and chaotic alignments that devalue luxury real estate.</li>
                <li><strong>Lost Momentum:</strong> Photos taken on smartphones take hours or days to be packaged into marketing pieces, missing the critical window of engagement.</li>
              </ul>
            `
          },
          {
            number: '02',
            title: 'UX Vision & The Vibecoding Workflow',
            content: `
              <p class="case-paragraph">
                Leveraging deep product intuition, I realized the solution was not to give users "more editing tools", but rather to <strong>eliminate unnecessary decisions and deliver high-craft results in a single tap</strong>.
              </p>
              <p class="case-paragraph">
                Instead of losing months to static specifications, I adopted a <strong>Vibecoding methodology with Google AI Studio</strong>. I channeled design vision directly into structured architecture prompts, rapidly co-authoring the code with LLMs. The premise: <em>the broker fills 3 inputs and the graphic appears instantly</em>.
              </p>
            `
          },
          {
            number: '03',
            title: 'The Solution: Real-Time Design Engine + Generative AI',
            content: `
              <ul class="case-list">
                <li><strong>Instant Dynamic Canvas:</strong> As the agent types building details, address, square footage, and amenities, clean editorial graphics render live on screen.</li>
                <li><strong>5 Built-in Luxury Architectural Presets:</strong> Pre-calibrated typography scales, safe margins, and layout balances that make every export look like a high-end architectural magazine spread.</li>
                <li><strong>Built-in AI Copywriter:</strong> Generative models craft conversion-optimized Instagram captions with curated hashtags and engaging property descriptions.</li>
              </ul>
            `
          },
          {
            number: '04',
            title: 'Impact & Takeaways',
            content: `
              <p class="case-paragraph">
                <strong>Post Na Mão</strong> embodies the transformative speed of vibecoding: turning product intuition into working software at lightning speed without sacrificing visual craft. Live at <a href="http://postnamao.com.br" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline;">postnamao.com.br</a>.
              </p>
            `
          }
        ]
      }
    }
  };

  // =========================================================================
  // 3. Internationalization Engine (PT Default strictly preserved)
  // =========================================================================
  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;

    // Update document HTML lang attribute
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    // Update Language Toggle Pill state
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    });

    // Translate all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = TRANSLATIONS[lang][key];
      if (text !== undefined) {
        el.innerHTML = text;
      }
    });

    // If modal is currently open, re-render it in the new language seamlessly
    if (currentOpenCaseId) {
      renderCaseStudyContent(currentOpenCaseId);
    }
  }

  function initLanguageSwitch() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = btn.getAttribute('data-lang');
        if (selectedLang && selectedLang !== currentLang) {
          setLanguage(selectedLang);
        }
      });
    });
  }

  // =========================================================================
  // 4. Dot-Matrix Spotlight Canvas (21st.dev & Sci-Fi Precision)
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
    let smoothMouseX = mouseX;
    let smoothMouseY = mouseY;
    let isMouseOver = false;
    let autoAngle = 0;
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
      ctx.scale(dpr, dpr);
    }

    resize();

    window.addEventListener('resize', () => {
      resize();
    });

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOver = true;
    });

    window.addEventListener('pointerleave', () => {
      isMouseOver = false;
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse tracking
      if (!isMouseOver) {
        autoAngle += 0.012;
        mouseX = width / 2 + Math.cos(autoAngle) * (width * 0.28);
        mouseY = height / 2 + Math.sin(autoAngle * 1.5) * (height * 0.22);
      }

      smoothMouseX += (mouseX - smoothMouseX) * 0.1;
      smoothMouseY += (mouseY - smoothMouseY) * 0.1;

      const gridStep = width < 768 ? 34 : 28;
      const spotlightRadius = width < 768 ? 170 : 230;
      const spotlightRadiusSq = spotlightRadius * spotlightRadius;

      const cols = Math.ceil(width / gridStep);
      const rows = Math.ceil(height / gridStep);

      for (let r = 0; r <= rows; r++) {
        const y = r * gridStep;
        for (let c = 0; c <= cols; c++) {
          const x = c * gridStep;

          const dx = x - smoothMouseX;
          const dy = y - smoothMouseY;
          const distSq = dx * dx + dy * dy;

          let radius = 0.85;
          let alpha = 0.055;
          let rVal = 255;
          let gVal = 255;
          let bVal = 255;

          if (distSq < spotlightRadiusSq) {
            const factor = 1 - Math.sqrt(distSq) / spotlightRadius;
            const easeFactor = factor * factor; // Quadratic falloff

            radius = 0.85 + easeFactor * 1.35;
            alpha = 0.055 + easeFactor * 0.65;

            // Shift from white to electric cyan/sapphire glow near cursor
            rVal = Math.round(255 - easeFactor * 199); // 56
            gVal = Math.round(255 - easeFactor * 66);  // 189
            bVal = Math.round(255 - easeFactor * 7);   // 248
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${alpha})`;
          ctx.fill();
        }
      }

      if (!motionQuery.matches) {
        animId = requestAnimationFrame(draw);
      }
    }

    if (!motionQuery.matches) {
      animId = requestAnimationFrame(draw);
    } else {
      draw();
    }
  }

  // =========================================================================
  // 5. Dynamic Card Spotlight Cursor Interaction
  // =========================================================================
  function initCardSpotlights() {
    const cards = document.querySelectorAll('.spotlight-card, .project-card, .bento-card, .telemetry-pod');
    cards.forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--mouse-x', `-999px`);
        card.style.setProperty('--mouse-y', `-999px`);
      });
    });
  }

  // =========================================================================
  // 6. Live Santos / UTC-3 Telemetry Clock
  // =========================================================================
  function initLiveClock() {
    const clockEl = document.getElementById('live-santos-clock');
    if (!clockEl) return;

    function update() {
      const now = new Date();
      // Calculate UTC-3 (Santos, SP)
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const santosTime = new Date(utc - (3600000 * 3));
      
      const h = String(santosTime.getHours()).padStart(2, '0');
      const m = String(santosTime.getMinutes()).padStart(2, '0');
      const s = String(santosTime.getSeconds()).padStart(2, '0');
      clockEl.textContent = `${h}:${m}:${s} UTC-3`;
    }

    update();
    setInterval(update, 1000);
  }

  // =========================================================================
  // 7. Case Study HUD Modal Sheet System
  // =========================================================================
  const modalBackdrop = document.getElementById('case-modal-backdrop');
  const modalSheet = document.getElementById('case-modal-sheet');
  const modalContent = document.getElementById('case-modal-content');
  const modalCloseBtn = document.getElementById('btn-close-modal');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalLiveText = document.getElementById('modal-live-text');

  function renderCaseStudyContent(caseId) {
    const langData = CASE_STUDIES[currentLang] || CASE_STUDIES.pt;
    const caseData = langData[caseId];
    if (!caseData) return;

    currentOpenCaseId = caseId;

    // Render Hero & Metadata
    let html = `
      <div class="case-study-hero">
        <span class="case-study-tag">${caseData.tag}</span>
        <h2 class="case-study-title">${caseData.title}</h2>
        <p class="case-study-headline">${caseData.headline}</p>
      </div>

      <div class="case-meta-grid">
        ${caseData.meta.map(m => `
          <div class="case-meta-item">
            <span class="case-meta-label">${m.label}</span>
            <span class="case-meta-value">${m.value}</span>
          </div>
        `).join('')}
      </div>
    `;

    // Render Detailed Narrative Sections
    caseData.sections.forEach(sec => {
      html += `
        <div class="case-section-block">
          <h3 class="case-section-title">
            <span class="case-section-num">// ${sec.number}</span>
            <span>${sec.title}</span>
          </h3>
          ${sec.content}
        </div>
      `;
    });

    modalContent.innerHTML = html;

    // Update Sticky Modal Action Button
    if (modalLiveLink) {
      modalLiveLink.href = caseData.liveUrl;
    }
    if (modalLiveText) {
      modalLiveText.textContent = caseData.liveButtonText;
    }
  }

  function openModal(caseId) {
    if (!modalBackdrop) return;
    renderCaseStudyContent(caseId);

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => {
      if (modalCloseBtn) modalCloseBtn.focus();
    }, 100);
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentOpenCaseId = null;
  }

  function initModalListeners() {
    // Trigger buttons
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-case]');
      if (trigger) {
        e.preventDefault();
        const caseId = trigger.getAttribute('data-open-case');
        openModal(caseId);
      }

      // Close triggers
      if (e.target.closest('[data-close-modal]') || e.target === modalBackdrop) {
        closeModal();
      }
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    // Keyboard ESC to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // =========================================================================
  // 8. Apple-Style Haptic Toast Notification
  // =========================================================================
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  function initCopyButtons() {
    document.addEventListener('click', async (e) => {
      const copyBtn = e.target.closest('[data-copy]');
      if (!copyBtn) return;

      const textToCopy = copyBtn.getAttribute('data-copy');
      const toastTextPt = copyBtn.getAttribute('data-toast') || 'Copiado!';
      const toastTextEn = copyBtn.getAttribute('data-toast-en') || 'Copied!';
      const toastText = currentLang === 'en' ? toastTextEn : toastTextPt;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(toastText);
      } catch (err) {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(toastText);
      }
    });
  }

  // =========================================================================
  // 9. Intersection Observer for Scroll Reveals
  // =========================================================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // =========================================================================
  // 10. Initialization Orchestrator
  // =========================================================================
  function init() {
    // 1. Initialize strictly in Portuguese
    setLanguage('pt');

    // 2. Setup Language Switch listener
    initLanguageSwitch();

    // 3. Start Ambient Dot-Matrix Canvas
    initAmbientCanvas();

    // 4. Setup Dynamic Card Spotlights
    initCardSpotlights();

    // 5. Start Live Santos UTC-3 Clock
    initLiveClock();

    // 6. Setup Case Study Modal
    initModalListeners();

    // 7. Setup Toast & Copy Buttons
    initCopyButtons();

    // 8. Start Scroll Reveal Observer
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
