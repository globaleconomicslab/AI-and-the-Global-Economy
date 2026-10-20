const agenda = [
  {type:'item',time:'8.30–9.15 am',title:'Breakfast and check-in'},
  {type:'item',time:'9.15–9.25 am',title:'Welcome',speakers:[['Gita Gopinath','Gregory and Ania Coffey Professor of Economics, Harvard University and Director of the Global Economics Lab; former First Deputy Managing Director and Chief Economist of the IMF']]},
  {type:'item',time:'9.25–9.45 am',title:'Setting the stage: AI and the Global Economy',speakers:[['Kristalina Georgieva','Managing Director of the International Monetary Fund']]},
  {type:'session',no:'01',time:'9.45–11.00 am',title:'Monetary Policy and Financial Markets',file:'Session_01_Monetary Policy and Financial Markets.pdf',intro:'AI poses a significant challenge to monetary policymaking and raises concerns for financial stability. This session considers the financing of the AI buildout and the risks embedded in current market enthusiasm as well as the policy toolkit needed for an uncertain transition.',speakers:[['Ben Bernanke','Distinguished Fellow, The Brookings Institution; former Chair of the Federal Reserve Board of Governors'],['Andrew Bailey','Governor of the Bank of England and Chair of the Financial Stability Board'],['Stijn Van Nieuwerburgh','Earle W. Kazis and Benjamin Schore Professor of Real Estate and Professor of Finance, Columbia University']]},
  {type:'break',time:'11.00–11.15 am',title:'Break'},
  {type:'session',no:'02',time:'11.15 am–12.30 pm',title:'Emerging Markets and Developing Economies',file:'Session_02_Emerging Markets and Developing Economies.pdf',intro:'For emerging markets and developing economies, it remains uncertain whether AI will foster greater prosperity or widen the gap with advanced economies. The discussion focuses on adoption, infrastructure, sovereignty, labor markets, and viable growth models.',speakers:[['S. Krishnan','Secretary, Ministry of Electronics and Information Technology, Government of India'],['Bosun Tijani','Minister of Communications, Innovation and Digital Economy of the Federal Republic of Nigeria'],['Zeine Zeidane','Director of the African Department of the IMF; former Prime Minister of Mauritania']]},
  {type:'break',time:'12.30–1.30 pm',title:'Lunch'},
  {type:'session',no:'03',time:'1.30–2.45 pm',title:'Jobs, Trade and Fiscal Policy',file:'Session_03_Jobs, Trade and Fiscal Policy.pdf',intro:'AI may deliver broad-based labor market gains or concentrate economic power among capital owners. This session examines the changing geography of production, the distribution of gains, and the sequencing of intervention and redistribution.',speakers:[['Pol Antràs','Robert G. Ory Professor of Economics, Harvard University'],['Jason Furman','Aetna Professor of the Practice of Economic Policy, Harvard University; former Chairman of the Council of Economic Advisers'],['Anton Korinek','Anthropic Institute; Professor of Economics, University of Virginia (on leave)']]},
  {type:'break',time:'2.45–3.00 pm',title:'Break'},
  {type:'session',no:'04',time:'3.00–3.55 pm',title:'Global Economic Cooperation and Key Takeaways',file:'Session_04_Key_Takeaways_and_Global_Economic_Cooperation.pdf',intro:'The final session takes stock of the day’s discussions and identifies priorities for policy, research, and international coordination as the effects of AI and national policy choices extend across borders.',speakers:[['Mohammed Al-Jadaan','Minister of Finance of the Kingdom of Saudi Arabia'],['Kenneth Rogoff','Maurits C. Boas Professor of Economics, Harvard University; former Chief Economist of the IMF']]},
  {type:'item',time:'3.55–4.00 pm',title:'Concluding remarks',speakers:[['Gita Gopinath','Director of the Global Economics Lab']]}
];

const speakerMarkup = speakers => speakers.map(([name,role]) => `<li><strong>${name}</strong><small>${role}</small></li>`).join('');
const schedule = document.querySelector('#schedule');

schedule.innerHTML = agenda.map((entry,index) => {
  if (entry.type === 'break') return `<div class="agenda-break"><span class="agenda-time">${entry.time}</span><strong>${entry.title}</strong></div>`;
  if (entry.type === 'item') return `<article class="agenda-item"><div class="agenda-time">${entry.time}</div><div><h3>${entry.title}</h3>${entry.speakers ? `<ul class="agenda-speakers">${speakerMarkup(entry.speakers)}</ul>` : ''}</div></article>`;
  return `<details class="session" open><summary class="session-summary"><span class="session-no">${entry.no}</span><span><span class="session-time">${entry.time}</span><span class="session-title">${entry.title}</span></span><span class="session-chevron">+</span></summary><div class="session-body"><p>${entry.intro}</p><h4>Lead speakers</h4><ul class="speaker-list">${speakerMarkup(entry.speakers)}</ul><div class="session-actions"><a class="text-link" href="resources/${encodeURIComponent(entry.file)}" target="_blank" rel="noopener noreferrer">Open briefing ↗</a></div></div></details>`;
}).join('');

const nav = document.querySelector('.site-nav');
document.querySelector('.menu-toggle').addEventListener('click', e => {
  const open = nav.classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', open);
});

document.querySelectorAll('[data-tab]').forEach(link => link.addEventListener('click', e => {
  e.preventDefault();
  const target = e.currentTarget.dataset.tab;
  document.querySelectorAll('[data-panel]').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === target));
  document.querySelectorAll('[data-tab]').forEach(tab => {
    const active = tab.dataset.tab === target;
    tab.classList.toggle('active', active);
    tab.toggleAttribute('aria-current', active);
  });
  history.replaceState(null, '', `#${target}`);
  nav.classList.remove('open');
  window.scrollTo({top: 0, behavior: 'smooth'});
}));

const initialTab = location.hash.slice(1);
if (['home', 'logistics', 'program', 'participants'].includes(initialTab)) {
  document.querySelector(`[data-tab="${initialTab}"]`).click();
}
