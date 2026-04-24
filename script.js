/* ============================================
   HERO — pré-carrega tudo, crossfade suave, 4.5s por slide
   ============================================ */
(function(){
  var items = Array.from(document.querySelectorAll('.h-item'));
  var bgA   = document.querySelector('.hero-bg-a');
  var bgB   = document.querySelector('.hero-bg-b');
  if(!items.length || !bgA || !bgB) return;

  var cur      = 0;
  var activeBg = bgA;
  var nextBg   = bgB;

  /* pré-carrega todas as imagens */
  items.forEach(function(item){
    var src = item.getAttribute('data-bg');
    if(src){ var img = new Image(); img.src = src; }
  });

  function setBg(index, first){
    var src = items[index].getAttribute('data-bg');
    items.forEach(function(i){ i.classList.remove('vis'); });
    items[index].classList.add('vis');
    if(!src) return;

    nextBg.style.transition   = 'none';
    nextBg.style.opacity      = '0';
    nextBg.style.transform    = 'scale(1.04)';
    nextBg.style.backgroundImage = "url('" + src + "')";
    void nextBg.offsetWidth; /* force reflow */

    var dur = first ? '.5s' : '1s';
    nextBg.style.transition = 'opacity '+dur+' ease, transform 6s ease';
    nextBg.style.opacity    = '1';
    nextBg.style.transform  = 'scale(1)';

    if(!first){
      var old = activeBg;
      old.style.transition = 'opacity 1s ease';
      old.style.opacity    = '0';
    }
    var tmp  = activeBg; activeBg = nextBg; nextBg = tmp;
  }

  setBg(0, true);
  setInterval(function(){ cur = (cur+1) % items.length; setBg(cur, false); }, 4500);
})();

/* ============================================
   ORBITAL
   ============================================ */
(function(){
  var stage = document.getElementById('orbStage');
  if(!stage) return;
  var steps=[
    {label:'Relacionamento',icon:'<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>',title:'Estabelecer o relacionamento',desc:'Começamos entendendo quem você é e o que espera. Sem compromisso, sem produto, sem pressão. Uma conversa de 30 minutos.',pct:16},
    {label:'Coleta',icon:'<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>',title:'Coletar as informações',desc:'Renda, gastos, investimentos, imóveis, dívidas, seguros e previdência. Quanto mais detalhe, mais preciso o diagnóstico.',pct:33},
    {label:'Análise',icon:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',title:'Analisar a situação',desc:'Raio-X completo do patrimônio. O que está funcionando, o que custa mais do que deveria e onde estão as vulnerabilidades.',pct:50},
    {label:'Recomendações',icon:'<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',title:'Desenvolver recomendações',desc:'Quanto gastar, quanto guardar, como dolarizar, como diversificar. Tudo apresentado e justificado com clareza.',pct:66},
    {label:'Implementação',icon:'<path d="M13 10V3L4 14h7v7l9-11h-7z"/>',title:'Implementar o plano',desc:'A carteira é montada pela Mont Capital com base no IPS — documento que formaliza seus objetivos e perfil de risco.',pct:83},
    {label:'Revisão',icon:'<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',title:'Monitorar e revisar',desc:'O plano não é estático. Sua vida muda, o mercado muda, as metas evoluem. Revisões periódicas garantem o alinhamento.',pct:100}
  ];
  var nodes=[],cur=0,auto;
  var W=stage.offsetWidth,R=W*.38,cx=W/2,cy=W/2;
  steps.forEach(function(s,i){
    var angle=(i/steps.length)*2*Math.PI-Math.PI/2;
    var n=document.createElement('div');
    n.className='orb-node'+(i===0?' on':'');
    n.style.left=cx+R*Math.cos(angle)+'px';
    n.style.top=cy+R*Math.sin(angle)+'px';
    n.innerHTML='<div class="orb-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+s.icon+'</svg></div><span class="orb-lbl">'+s.label+'</span>';
    n.addEventListener('click',(function(idx){return function(){clearInterval(auto);sel(idx);};})(i));
    stage.appendChild(n);nodes.push(n);
  });
  var oc=document.getElementById('orbCenter');
  if(oc) oc.addEventListener('click',function(){clearInterval(auto);sel(0);});
  function sel(i){
    cur=i;nodes.forEach(function(n,j){n.classList.toggle('on',j===i);});
    var s=steps[i],c=document.getElementById('orbCard');
    if(!c) return;
    c.style.opacity='0';c.style.transform='translateY(6px)';
    document.getElementById('orbNum').textContent='Passo '+(i+1);
    document.getElementById('orbTitle').textContent=s.title;
    document.getElementById('orbDesc').textContent=s.desc;
    document.getElementById('orbFill').style.width=s.pct+'%';
    document.getElementById('orbPct').textContent=s.pct+'%';
    setTimeout(function(){c.style.opacity='1';c.style.transform='translateY(0)';},20);
  }
  sel(0);
  auto=setInterval(function(){sel((cur+1)%steps.length);},3000);
})();

/* ============================================
   SCROLL REVEAL
   ============================================ */
(function(){
  var outside=Array.from(document.querySelectorAll('.r')).filter(function(el){return !el.closest('#hero');});
  function show(el){el.classList.add('on');}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target);}});},{threshold:0.05});
    outside.forEach(function(el){io.observe(el);});
  }
  function check(){var vh=window.innerHeight;outside.forEach(function(el){if(el.getBoundingClientRect().top<vh*.95)show(el);});}
  check();window.addEventListener('scroll',check,{passive:true});window.addEventListener('load',check);
})();

/* FAQ */
function faq(btn){
  var it=btn.parentElement,open=it.classList.contains('open');
  document.querySelectorAll('.fi2,.fi2-dark').forEach(function(i){i.classList.remove('open');});
  if(!open) it.classList.add('open');
}

/* HEADER */
(function(){
  var h=document.getElementById('siteHeader');
  if(!h) return;
  function t(){h.classList.toggle('scrolled',window.scrollY>20);}
  t();window.addEventListener('scroll',t,{passive:true});
})();

/* WHATSAPP FLOAT */
(function(){
  var btn=document.getElementById('whatsappFloat'),trigger=document.getElementById('s-zi');
  if(!btn||!trigger) return;
  var shown=false;
  function check(){
    var r=trigger.getBoundingClientRect();
    if(!shown&&r.bottom<0){btn.classList.add('wz-visible');shown=true;}
    else if(shown&&r.bottom>=0){btn.classList.remove('wz-visible');shown=false;}
  }
  window.addEventListener('scroll',check,{passive:true});check();
})();
