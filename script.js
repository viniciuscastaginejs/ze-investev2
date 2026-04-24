/* ============================================
   HERO — TEXTO ROTATIVO + BACKGROUND DINÂMICO
   ============================================ */
(function(){
  var items = Array.from(document.querySelectorAll('.h-item'));
  var bgA = document.querySelector('.hero-bg-a');
  var bgB = document.querySelector('.hero-bg-b');

  if(!items.length || !bgA || !bgB) return;

  var cur = 0;
  var activeBg = bgA;
  var nextBg = bgB;

  function setBg(index){
    var bg = items[index].getAttribute('data-bg');
    if(!bg) return;

    var img = new Image();

    img.onload = function(){
      items.forEach(function(i){ i.classList.remove('vis'); });
      items[index].classList.add('vis');

      nextBg.style.backgroundImage = "url('" + bg + "')";
      nextBg.classList.add('is-active');
      activeBg.classList.remove('is-active');

      /* reset scale para disparar o Ken Burns */
      nextBg.style.transition = 'none';
      nextBg.style.transform = 'scale(1.08)';
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){
          nextBg.style.transition = 'transform 6s ease, opacity .7s ease';
          nextBg.style.transform = 'scale(1)';
        });
      });

      var temp = activeBg;
      activeBg = nextBg;
      nextBg = temp;
    };

    img.onerror = function(){
      /* se imagem não carregar, troca o texto mesmo assim */
      items.forEach(function(i){ i.classList.remove('vis'); });
      items[index].classList.add('vis');
    };

    img.src = bg;
  }

  setBg(cur);

  setInterval(function(){
    cur = (cur + 1) % items.length;
    setBg(cur);
  }, 2800);
})();

/* ============================================
   ORBITAL — METODOLOGIA INTERATIVA
   ============================================ */
(function(){
  var stage = document.getElementById('orbStage');
  if(!stage) return;

  var steps = [
    {
      label:'Relacionamento',
      icon:'<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>',
      title:'Estabelecer o relacionamento',
      desc:'Começamos entendendo quem você é e o que espera. Sem compromisso, sem produto, sem pressão. Uma conversa de 30 minutos.',
      pct:16
    },
    {
      label:'Coleta',
      icon:'<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>',
      title:'Coletar as informações',
      desc:'Renda, gastos, investimentos, imóveis, dívidas, seguros e previdência. Quanto mais detalhe, mais preciso o diagnóstico.',
      pct:33
    },
    {
      label:'Análise',
      icon:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
      title:'Analisar a situação',
      desc:'Raio-X completo do patrimônio. O que está funcionando, o que custa mais do que deveria e onde estão as vulnerabilidades.',
      pct:50
    },
    {
      label:'Recomendações',
      icon:'<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
      title:'Desenvolver recomendações',
      desc:'Quanto gastar, quanto guardar, como dolarizar, como diversificar. Tudo apresentado e justificado com clareza.',
      pct:66
    },
    {
      label:'Implementação',
      icon:'<path d="M13 10V3L4 14h7v7l9-11h-7z"/>',
      title:'Implementar o plano',
      desc:'A carteira é montada pela Mont Capital com base no IPS — documento que formaliza seus objetivos e perfil de risco.',
      pct:83
    },
    {
      label:'Revisão',
      icon:'<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
      title:'Monitorar e revisar',
      desc:'O plano não é estático. Sua vida muda, o mercado muda, as metas evoluem. Revisões periódicas garantem o alinhamento.',
      pct:100
    }
  ];

  var nodes = [], cur = 0, auto;
  var W = stage.offsetWidth;
  var R = W * 0.38;
  var cx = W / 2, cy = W / 2;

  steps.forEach(function(s, i){
    var angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2;
    var x = cx + R * Math.cos(angle);
    var y = cy + R * Math.sin(angle);
    var n = document.createElement('div');
    n.className = 'orb-node' + (i === 0 ? ' on' : '');
    n.style.left = x + 'px';
    n.style.top  = y + 'px';
    n.innerHTML  = '<div class="orb-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + s.icon + '</svg></div><span class="orb-lbl">' + s.label + '</span>';
    n.addEventListener('click', (function(idx){ return function(){ clearInterval(auto); sel(idx); }; })(i));
    stage.appendChild(n);
    nodes.push(n);
  });

  var orbCenter = document.getElementById('orbCenter');
  if(orbCenter){
    orbCenter.addEventListener('click', function(){ clearInterval(auto); sel(0); });
  }

  function sel(i){
    cur = i;
    nodes.forEach(function(n, j){ n.classList.toggle('on', j === i); });
    var s = steps[i];
    var c = document.getElementById('orbCard');
    if(!c) return;
    c.style.opacity = '0';
    c.style.transform = 'translateY(6px)';
    document.getElementById('orbNum').textContent   = 'Passo ' + (i + 1);
    document.getElementById('orbTitle').textContent = s.title;
    document.getElementById('orbDesc').textContent  = s.desc;
    document.getElementById('orbFill').style.width  = s.pct + '%';
    document.getElementById('orbPct').textContent   = s.pct + '%';
    setTimeout(function(){
      c.style.opacity   = '1';
      c.style.transform = 'translateY(0)';
    }, 20);
  }

  sel(0);
  auto = setInterval(function(){ sel((cur + 1) % steps.length); }, 3000);
})();

/* ============================================
   SCROLL REVEAL
   ============================================ */
(function(){
  var all     = Array.from(document.querySelectorAll('.r'));
  var outside = all.filter(function(el){ return !el.closest('#hero'); });

  function show(el){ el.classList.add('on'); }

  function check(){
    var vh = window.innerHeight;
    outside.forEach(function(el){
      if(el.getBoundingClientRect().top < vh * 0.95) show(el);
    });
  }

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ show(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.05 });
    outside.forEach(function(el){ io.observe(el); });
  }

  check();
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('load',   check);
})();

/* ============================================
   FAQ
   ============================================ */
function faq(btn){
  var it   = btn.parentElement;
  var open = it.classList.contains('open');
  /* fecha todos os items de FAQ (light e dark) */
  document.querySelectorAll('.fi2, .fi2-dark').forEach(function(i){ i.classList.remove('open'); });
  if(!open) it.classList.add('open');
}

/* ============================================
   GALLERY CAROUSEL
   ============================================ */
(function(){
  var track   = document.getElementById('galTrack');
  var prevBtn = document.getElementById('galPrev');
  var nextBtn = document.getElementById('galNext');
  var dots    = Array.from(document.querySelectorAll('.gal-dot'));
  if(!track) return;

  var items  = Array.from(track.querySelectorAll('.gal-item'));
  var total  = items.length;
  var cur    = 0;
  var itemW  = 0;
  var gap    = 20;

  function getItemW(){ if(items[0]) itemW = items[0].offsetWidth; }
  getItemW();
  window.addEventListener('resize', function(){ getItemW(); goTo(cur, false); });

  function goTo(idx, animate){
    if(typeof animate === 'undefined') animate = true;
    cur = Math.max(0, Math.min(idx, total - 1));
    var offset = cur * (itemW + gap);
    track.style.transition = animate ? 'transform .55s cubic-bezier(.25,.46,.45,.94)' : 'none';
    track.style.transform  = 'translateX(-' + offset + 'px)';
    prevBtn.disabled = cur === 0;
    nextBtn.disabled = cur === total - 1;
    dots.forEach(function(d, i){ d.classList.toggle('on', i === cur); });
  }

  prevBtn.addEventListener('click', function(){ goTo(cur - 1); });
  nextBtn.addEventListener('click', function(){ goTo(cur + 1); });
  dots.forEach(function(d){
    d.addEventListener('click', function(){ goTo(parseInt(d.dataset.idx)); });
  });

  /* Drag / Swipe */
  var startX = 0, isDragging = false, dragOffset = 0;

  track.addEventListener('mousedown', function(e){
    isDragging = true; startX = e.clientX;
    track.style.transition = 'none';
  });
  window.addEventListener('mousemove', function(e){
    if(!isDragging) return;
    dragOffset = e.clientX - startX;
    var base = cur * (itemW + gap);
    track.style.transform = 'translateX(-' + (base - dragOffset) + 'px)';
  });
  window.addEventListener('mouseup', function(){
    if(!isDragging) return;
    isDragging = false;
    if(dragOffset < -60) goTo(cur + 1);
    else if(dragOffset > 60) goTo(cur - 1);
    else goTo(cur);
    dragOffset = 0;
  });

  track.addEventListener('touchstart', function(e){
    startX = e.touches[0].clientX; isDragging = true;
    track.style.transition = 'none';
  }, { passive: true });
  track.addEventListener('touchmove', function(e){
    if(!isDragging) return;
    dragOffset = e.touches[0].clientX - startX;
    var base = cur * (itemW + gap);
    track.style.transform = 'translateX(-' + (base - dragOffset) + 'px)';
  }, { passive: true });
  track.addEventListener('touchend', function(){
    if(!isDragging) return;
    isDragging = false;
    if(dragOffset < -60) goTo(cur + 1);
    else if(dragOffset > 60) goTo(cur - 1);
    else goTo(cur);
    dragOffset = 0;
  });

  goTo(0, false);
})();

/* ============================================
   HEADER SCROLL — GLASSMORPHISM ACUMULADO
   (header sempre visível com fundo azul)
   ============================================ */
(function(){
  var header = document.getElementById('siteHeader');
  if(!header) return;

  function toggleHeader(){
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  toggleHeader();
  window.addEventListener('scroll', toggleHeader, { passive: true });
})();

/* ============================================
   WHATSAPP FLOAT — aparece após rolar além da
   Seção 2 (#s-zi)
   ============================================ */
(function(){
  var btn = document.getElementById('whatsappFloat');
  var trigger = document.getElementById('s-zi');
  if(!btn || !trigger) return;

  var shown = false;

  function checkVisibility(){
    var rect = trigger.getBoundingClientRect();
    /* mostra quando o FINAL da seção 2 passa pelo topo da viewport */
    if(!shown && rect.bottom < 0){
      btn.classList.add('wz-visible');
      shown = true;
    } else if(shown && rect.bottom >= 0){
      btn.classList.remove('wz-visible');
      shown = false;
    }
  }

  window.addEventListener('scroll', checkVisibility, { passive: true });
  checkVisibility();
})();
