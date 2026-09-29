/**
 * VINICIUS LEDESMA — PORTFOLIO INTERACTION ENGINE
 * Creative Technologist & AI Prototyper
 * Pure Vanilla JS — Zero dependencies, 60fps, touch & keyboard accessible
 * Bilingual Support: Portuguese (Default) & English (Dynamic Toggle)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Language State & Full Bilingual Dictionary
  // =========================================================================
  let currentLang = 'pt'; // Portuguese by default as requested!
  let currentOpenCaseId = null;

  const TRANSLATIONS = {
    pt: {
      nav_projects: 'Projetos',
      nav_methodology: 'Metodologia',
      nav_about: 'Sobre',
      nav_contact: 'Contato',
      nav_cta: 'Falar Direto',
      hero_status: 'Disponível para projetos remotos (Global & Brasil)',
      hero_title: 'Creative Technologist & <span class="highlight-gradient">AI Prototyper</span>',
      hero_subtitle: 'Construindo a ponte entre <strong>intuição de produto</strong>, <strong>inteligência artificial generativa</strong> e <strong>interfaces táteis de alto padrão</strong>. Criador de aplicações interativas em 3D e webapps rápidos com vibecoding.',
      hero_cta_explore: 'Explorar Projetos em Destaque',
      hero_cta_email: 'Copiar E-mail',
      hero_cta_whatsapp: 'WhatsApp Direto',
      metric_1_num: '8<span class="accent">+</span> Anos',
      metric_1_lbl: 'Criação Visual & Design',
      metric_2_num: '100<span class="accent">%</span>',
      metric_2_lbl: 'Foco Remoto & Ágil',
      metric_3_num: 'C1 <span class="accent">Fluente</span>',
      metric_3_lbl: 'Inglês Profissional Avançado',
      metric_4_num: '0 <span class="accent">Atrito</span>',
      metric_4_lbl: 'Do Insight ao Deploy Real',
      projects_tag: 'Portfólio Selecionado',
      projects_title: 'Projetos em <span class="text-gradient">Destaque</span>',
      projects_desc: 'Aplicações web públicas, funcionais e interativas demonstrando domínio técnico em WebGL, inteligência artificial e refinamento de interface.',
      p1_status: 'Em Produção (Live)',
      p1_index: 'PROJETO 01 / 02',
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
      p2_index: 'PROJETO 02 / 02',
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
      bento_title: 'Como eu Penso & <span class="text-gradient">Construo</span>',
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
      hero_title: 'Creative Technologist & <span class="highlight-gradient">AI Prototyper</span>',
      hero_subtitle: 'Bridging <strong>product intuition</strong>, <strong>generative AI</strong>, and <strong>high-end tactile interfaces</strong>. Creator of interactive 3D WebGL experiences and high-velocity vibecoded applications.',
      hero_cta_explore: 'Explore Featured Works',
      hero_cta_email: 'Copy E-mail',
      hero_cta_whatsapp: 'Direct WhatsApp',
      metric_1_num: '8<span class="accent">+</span> Years',
      metric_1_lbl: 'Visual Design & Craft',
      metric_2_num: '100<span class="accent">%</span>',
      metric_2_lbl: 'Remote & Agile Focus',
      metric_3_num: 'C1 <span class="accent">Fluent</span>',
      metric_3_lbl: 'Professional English Fluency',
      metric_4_num: 'Zero <span class="accent">Friction</span>',
      metric_4_lbl: 'From Insight to Live Deploy',
      projects_tag: 'Curated Showcase',
      projects_title: 'Featured <span class="text-gradient">Projects</span>',
      projects_desc: 'Public, interactive, and production-ready web applications showcasing technical mastery in WebGL, generative AI, and interface craft.',
      p1_status: 'In Production (Live)',
      p1_index: 'PROJECT 01 / 02',
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
      p2_index: 'PROJECT 02 / 02',
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
      bento_title: 'How I <span class="text-gradient">Think & Build</span>',
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
    },

    en: {
      'windy-3d': {
        id: 'windy-3d',
        tag: 'WebGL • Three.js • In Production',
        title: 'Windy 3D — Interactive Spatial Weather Visualizer',
        headline: 'Reimagining digital meteorology into an immersive 3D spatial experience with real-time ECMWF & GFS forecast models.',
        meta: [
          { label: 'Role', value: 'Creative Technologist & Front-End Prototyper' },
          { label: 'Stack', value: 'Three.js, WebGL, CSS Glass, Vercel' },
          { label: 'Status', value: 'Live in Production' },
          { label: 'Models', value: 'ECMWF (9km) & GFS (22km)' }
        ],
        liveUrl: 'https://weather3d-nine.vercel.app/',
        liveButtonText: 'Launch Windy 3D Live',
        sections: [
          {
            number: '01',
            title: 'The Challenge: Moving Beyond Static 2D Maps',
            content: `
              <p class="case-paragraph">
                The vast majority of modern meteorological portals deliver atmospheric data in dry tabular formats or flat 2D maps that fail to convey the majestic scale and momentum of planetary airflow systems.
              </p>
              <p class="case-paragraph">
                The premise of <strong>Windy 3D</strong> was to conceptualize and engineer an immersive spatial experience directly inside the browser. The core objective was uniting the technical precision of industrial tools like <em>Windy.com</em> with the tactile refinement of Apple design philosophy (glassmorphic depth, crisp typography, and fluid spring physics).
              </p>
              <div class="case-callout">
                <div class="case-callout-title">Engineering Hurdle</div>
                <div class="case-callout-text">
                  Rendering dynamic airflow particles, volumetric cloud layers, and spherical elevation relief in WebGL while sustaining a rock-solid 60 FPS across both desktop and mobile devices without frame drops.
                </div>
              </div>
            `
          },
          {
            number: '02',
            title: 'Interface Design (UI) & Spatial Experience (UX)',
            content: `
              <p class="case-paragraph">
                To orchestrate complex meteorological layers without overwhelming the viewport, the architecture was segmented into two symbiotic planes: an <strong>immersive 3D planetary canvas</strong> and an <strong>Apple-style floating glassmorphic HUD</strong>:
              </p>
              <ul class="case-list">
                <li><strong>Dynamic Multi-Layer Deck:</strong> Real-time switching between wind vectors, volumetric precipitation radars, live lightning discharges, surface heatmaps, cloud layers, and snowfall.</li>
                <li><strong>Amazon Flying Rivers & Regional Geography:</strong> Dedicated visualization of the moisture corridors ("Rios Voadores") transporting vapor from the Amazon basin across South America, rendered with 3D territorial borders and city markers.</li>
                <li><strong>Predictive City Search with Sparklines:</strong> Search input with real-time telemetry. Selecting a city instantly reveals atmospheric conditions alongside a 24-hour temperature trend sparkline graph.</li>
                <li><strong>Interactive Timeline Scrubber:</strong> Playback controls allowing users to scrub forward (+6h, +12h, +24h, +48h, +72h) with seamless switching between global numerical models (ECMWF vs GFS).</li>
              </ul>
            `
          },
          {
            number: '03',
            title: 'Creative Engineering & Technical Architecture',
            content: `
              <p class="case-paragraph">
                Engineered with a lean, zero-bloat modular philosophy to achieve instant sub-second initial load:
              </p>
              <ul class="case-list">
                <li><strong>Three.js & WebGL Shaders:</strong> Scene graph management with damped orbital camera kinematics, normalized bump-mapping, dynamic atmospheric scattering, and instanced particle systems.</li>
                <li><strong>Hardware-Accelerated CSS Glassmorphism:</strong> GPU-composited <code>backdrop-filter</code> blurs, squircle radius containers, and dynamic gradient legends adapting to active weather layers.</li>
                <li><strong>Automated CI/CD Pipeline:</strong> Versioned on GitHub and deployed directly via Vercel Edge Network for low-latency worldwide delivery.</li>
              </ul>
            `
          },
          {
            number: '04',
            title: 'Impact & Results',
            content: `
              <p class="case-paragraph">
                <strong>Windy 3D</strong> serves as tangible proof of my capability as a <strong>Creative Technologist</strong> to bridge high-craft visual aesthetics and advanced front-end engineering. Live, public, and production-tested.
              </p>
            `
          }
        ]
      },

      'post-na-mao': {
        id: 'post-na-mao',
        tag: 'Google AI Studio • GenAI • Vibecoding',
        title: 'Post Na Mão — AI-Powered Real Estate Webapp',
        headline: 'Eliminating creation friction for real estate brokers with tailored layouts, luxury templates, and real-time AI copywriting.',
        meta: [
          { label: 'Role', value: 'Creative Technologist & AI Prototyper' },
          { label: 'Tools', value: 'Google AI Studio, LLMs, UI Design' },
          { label: 'Status', value: 'Functional Prototype' },
          { label: 'Approach', value: 'Vibecoding & Mobile-First' }
        ],
        liveUrl: 'http://postnamao.com.br',
        liveButtonText: 'Visit Post Na Mão Live',
        sections: [
          {
            number: '01',
            title: 'The Problem: The "Supermarket Flyer" Syndrome',
            content: `
              <p class="case-paragraph">
                In real estate, speed to market is paramount. Brokers scout properties in the field, but encounter daily operational friction when creating marketing assets for social media:
              </p>
              <ul class="case-list">
                <li><strong>Steep Learning Curves:</strong> Brokers lack the graphic design expertise to navigate complex desktop tools like Photoshop or cluttered Canva templates on smartphones.</li>
                <li><strong>Visual Pollution:</strong> The outcome frequently swings between raw photos lacking essential specs or loud graphics filled with flashing price tags that make premium penthouses look like clearance flyers.</li>
                <li><strong>Timing Friction:</strong> Photos are captured instantly on mobile, but publishing gets delayed for days, losing buyer momentum.</li>
              </ul>
            `
          },
          {
            number: '02',
            title: 'UX Intuition & The Vibecoding Workflow',
            content: `
              <p class="case-paragraph">
                Understanding broker routines and possessing strong user experience intuition, I realized the solution was not giving users "more complex editor buttons", but rather <strong>eliminating unnecessary decisions and delivering finished, editorial-grade creative in a single tap</strong>.
              </p>
              <p class="case-paragraph">
                Instead of spending months on static mockups, I embraced <strong>Vibecoding with Google AI Studio</strong>. I translated product intuition directly into structured prompts and functional UI logic, iterating with frontier LLMs in record time. The premise: <em>the broker types 3 specs and the tailored graphic generates immediately</em>.
              </p>
            `
          },
          {
            number: '03',
            title: 'The Solution: Real-Time Design + Generative AI',
            content: `
              <p class="case-paragraph">
                <strong>Post Na Mão</strong> was built mobile-first to operate smoothly whether a broker is parked in their car or sitting at their office desk:
              </p>
              <ul class="case-list">
                <li><strong>Instant Reactive Canvas:</strong> Any entered spec (price, rooms, square footage, neighborhood) formats and renders in real time over property photography with editorial typography and luxury margins.</li>
                <li><strong>5 Built-in Luxury Templates:</strong> Pre-calibrated layouts adhering to high-end real estate aesthetics with zero manual measuring needed.</li>
                <li><strong>Generative AI Copywriter:</strong> Eliminates creative burnout. The AI consumes property attributes and writes engaging, persuasive Instagram captions formatted with relevant market hashtags.</li>
                <li><strong>Zero-Friction Publishing Flow:</strong> Direct high-resolution export to the mobile camera roll or instant 1-tap share to the Instagram app.</li>
              </ul>
            `
          },
          {
            number: '04',
            title: 'Impact & Results',
            content: `
              <p class="case-paragraph">
                <strong>Post Na Mão</strong> proves the capability to identify real business friction (B2B/B2C) and rapidly ship an end-to-end digital product leveraging generative AI strategically, pragmatically, and with product craft.
              </p>
            `
          }
        ]
      }
    }
  };

  // =========================================================================
  // 3. Ambient Particles & Fluid Background Canvas (Retina & Accessible)
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
      ctx.scale(dpr, dpr);
    }

    resize();

    const particles = [];
    const isMobile = width < 768;
    const particleCount = isMobile ? 24 : 45;

    const palette = ['#38bdf8', '#818cf8', '#a855f7', '#34d399'];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.size = Math.random() * 2 + 1;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.alpha = Math.random() * 0.45 + 0.15;
        this.originX = this.x;
        this.originY = this.y;
      }

      update(parallaxX, parallaxY) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.renderX = this.x + parallaxX * (this.size * 5);
        this.renderY = this.y + parallaxY * (this.size * 5);
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.renderX, this.renderY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    window.addEventListener(
      'mousemove',
      (e) => {
        hasUserMovedMouse = true;
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
      },
      { passive: true }
    );

    window.addEventListener(
      'resize',
      () => {
        resize();
      },
      { passive: true }
    );

    function animate() {
      if (motionQuery.matches) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      if (!hasUserMovedMouse) {
        autoOscillation += 0.015;
        targetMouseX = width / 2 + Math.sin(autoOscillation) * (width * 0.15);
        targetMouseY = height / 2 + Math.cos(autoOscillation * 0.7) * (height * 0.1);
      }

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      const parallaxFactorX = (mouseX - width / 2) / width;
      const parallaxFactorY = (mouseY - height / 2) / height;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(parallaxFactorX, parallaxFactorY);
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.renderX - p2.renderX;
          const dy = p1.renderY - p2.renderY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.renderX, p1.renderY);
            ctx.lineTo(p2.renderX, p2.renderY);
            ctx.strokeStyle = '#38bdf8';
            ctx.globalAlpha = (1 - dist / 100) * 0.1;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    }

    animate();

    motionQuery.addEventListener('change', (e) => {
      if (e.matches) {
        if (animId) cancelAnimationFrame(animId);
        ctx.clearRect(0, 0, width, height);
      } else {
        animate();
      }
    });
  }

  // =========================================================================
  // 4. 3D Perspective Tilt & Specular Glare (Apple Glass Effect)
  // =========================================================================
  function initCardParallax() {
    const hasHoverCapability = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHoverCapability) return;

    const cards = document.querySelectorAll('[data-tilt="true"]');

    cards.forEach((card) => {
      let isHovered = false;
      let rafId = null;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        card.style.transition = 'transform 120ms cubic-bezier(0.2, 0.9, 0.4, 1), box-shadow 250ms ease';
      });

      card.addEventListener(
        'mousemove',
        (e) => {
          if (!isHovered) return;

          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4.5;
            const rotateY = ((x - centerX) / centerX) * 4.5;

            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
          });
        },
        { passive: true }
      );

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transition = 'transform 500ms var(--spring-snappy), box-shadow 500ms ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // =========================================================================
  // 5. Apple-Style Case Study Sheet / Modal Engine (Bilingual)
  // =========================================================================
  const modalBackdrop = document.getElementById('case-modal-backdrop');
  const modalSheet = document.getElementById('case-modal-sheet');
  const modalCloseBtn = document.getElementById('btn-close-modal');
  const modalBody = document.getElementById('case-modal-content');
  const modalLiveLink = document.getElementById('modal-live-link');
  let previouslyFocusedElement = null;

  function setTriggersExpanded(studyId, isExpanded) {
    document.querySelectorAll(`[data-open-case="${studyId}"]`).forEach((btn) => {
      btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  function openCaseStudy(studyId, pushHistory = true) {
    const studiesForLang = CASE_STUDIES[currentLang] || CASE_STUDIES.pt;
    const study = studiesForLang[studyId] || CASE_STUDIES.pt[studyId];
    if (!study || !modalBackdrop || !modalBody) return;

    currentOpenCaseId = studyId;
    previouslyFocusedElement = document.activeElement;

    // Build metadata rows
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
      const liveBtnLabel = study.liveButtonText || (currentLang === 'en' ? 'Launch Live App' : 'Abrir Projeto no Ar');
      modalLiveLink.innerHTML = `<span>${liveBtnLabel}</span> <span aria-hidden="true">↗</span>`;
    }

    // Lock body scroll with scrollbar compensation
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

    const closedId = currentOpenCaseId;
    currentOpenCaseId = null;

    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');

    if (modalSheet) {
      modalSheet.classList.remove('is-dragging');
      modalSheet.style.transform = '';
      modalSheet.style.transition = '';
    }

    // Restore body scroll and clear layout offset
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.documentElement.style.setProperty('--scrollbar-offset', '0px');

    if (closedId) {
      setTriggersExpanded(closedId, false);
    }

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

    // History popstate listener
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.modalOpen && e.state.studyId) {
        openCaseStudy(e.state.studyId, false);
      } else {
        if (modalBackdrop.classList.contains('is-open')) {
          closeCaseStudy(false);
        }
      }
    });

    // Touch swipe-down to dismiss on mobile iOS sheet
    if (modalSheet) {
      let touchStartY = 0;
      let touchStartX = 0;
      let currentTouchDiffY = 0;
      let isDraggingSheet = false;
      let hasDeterminedDirection = false;
      let isVerticalDrag = false;

      const handleArea = modalSheet.querySelector('.sheet-drag-handle') || modalSheet.querySelector('.modal-header');

      modalSheet.addEventListener(
        'touchstart',
        (e) => {
          if (e.touches.length !== 1) return;
          const touch = e.touches[0];
          touchStartY = touch.clientY;
          touchStartX = touch.clientX;
          currentTouchDiffY = 0;
          hasDeterminedDirection = false;
          isVerticalDrag = false;

          const isOverHandle = handleArea && handleArea.contains(e.target);
          const isAtTop = modalSheet.scrollTop <= 1;

          if (isOverHandle || isAtTop) {
            isDraggingSheet = true;
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
          const touch = e.touches[0];
          const diffX = Math.abs(touch.clientX - touchStartX);
          const diffY = touch.clientY - touchStartY;

          if (!hasDeterminedDirection) {
            if (diffX > 10 && diffX > Math.abs(diffY)) {
              isDraggingSheet = false;
              return;
            }
            if (diffY > 8) {
              hasDeterminedDirection = true;
              isVerticalDrag = true;
              modalSheet.classList.add('is-dragging');
            }
          }

          if (isVerticalDrag) {
            currentTouchDiffY = Math.max(0, diffY);
            const dampedY = Math.pow(currentTouchDiffY, 0.92);
            modalSheet.style.transform = `translateY(${dampedY}px)`;
          }
        },
        { passive: true }
      );

      const finishDrag = () => {
        if (!isDraggingSheet && !isVerticalDrag) return;

        isDraggingSheet = false;
        modalSheet.classList.remove('is-dragging');

        if (currentTouchDiffY > 85) {
          modalSheet.style.transition = 'transform 260ms cubic-bezier(0.32, 0.72, 0, 1)';
          modalSheet.style.transform = 'translateY(100%)';
          setTimeout(() => {
            closeCaseStudy(true);
            modalSheet.style.transform = '';
            modalSheet.style.transition = '';
          }, 260);
        } else {
          modalSheet.style.transition = 'transform 320ms var(--spring-snappy)';
          modalSheet.style.transform = 'translateY(0px)';
          setTimeout(() => {
            modalSheet.style.transform = '';
            modalSheet.style.transition = '';
          }, 320);
        }

        currentTouchDiffY = 0;
        isVerticalDrag = false;
        hasDeterminedDirection = false;
      };

      modalSheet.addEventListener('touchend', finishDrag, { passive: true });
      modalSheet.addEventListener('touchcancel', finishDrag, { passive: true });
    }

    // Check on page load for deep-link hash (e.g. #case-windy-3d)
    const hash = window.location.hash.replace('#case-', '');
    if (CASE_STUDIES.pt[hash] || (CASE_STUDIES.en && CASE_STUDIES.en[hash])) {
      setTimeout(() => openCaseStudy(hash, false), 350);
    }
  }

  // =========================================================================
  // 6. Language Switcher Engine
  // =========================================================================
  function setLanguage(lang) {
    if (lang !== 'pt' && lang !== 'en') return;
    currentLang = lang;

    // Update document HTML lang attribute
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

    // Update button states
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const isTarget = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    });

    // Update all text nodes marked with data-i18n
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.pt;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // If modal is currently open, seamlessly re-render it in the new language
    if (currentOpenCaseId && modalBackdrop && modalBackdrop.classList.contains('is-open')) {
      openCaseStudy(currentOpenCaseId, false);
    }
  }

  function initLanguageSwitch() {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = btn.getAttribute('data-lang');
        setLanguage(selectedLang);
      });
    });

    // Default is ALWAYS Portuguese on open, as requested
    setLanguage('pt');
  }

  // =========================================================================
  // 7. Apple-Style Haptic Toast Notification & Copy Engine
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
        const feedbackMsg =
          currentLang === 'en'
            ? btn.getAttribute('data-toast-en') || 'Copied to clipboard: ' + textToCopy
            : btn.getAttribute('data-toast') || 'Copiado para a área de transferência: ' + textToCopy;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
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
          showToast(`Contato / Contact: ${textToCopy}`);
        }
      });
    });
  }

  // =========================================================================
  // 8. Smooth Scroll Reveal (Intersection Observer)
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
  // 9. Dynamic Navigation Dock Elevation on Scroll
  // =========================================================================
  function initNavScroll() {
    const navIsland = document.querySelector('.nav-island');
    if (!navIsland) return;

    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 40) {
          navIsland.style.background = 'rgba(10, 14, 24, 0.9)';
          navIsland.style.boxShadow = '0 16px 36px -8px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.2)';
        } else {
          navIsland.style.background = 'rgba(12, 17, 28, 0.78)';
          navIsland.style.boxShadow = '0 12px 32px -8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        }
      },
      { passive: true }
    );
  }

  // =========================================================================
  // Initialization Lifecycle
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initAmbientCanvas();
    initCardParallax();
    initCaseModal();
    initLanguageSwitch();
    initClipboardActions();
    initScrollReveal();
    initNavScroll();
  });
})();
