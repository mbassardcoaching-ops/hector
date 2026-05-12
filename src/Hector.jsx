import { useState } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────── */

const AUDIENCES = [
  { id:"entrepreneurs", icon:"🚀", label:"Entrepreneurs",        sub:"Fondateurs, créateurs d'entreprise" },
  { id:"freelances",    icon:"🎨", label:"Freelances & Créatifs", sub:"Indépendants, solopreneurs" },
  { id:"cadres",        icon:"💼", label:"Cadres & Managers",     sub:"En poste ou en transition" },
  { id:"coachs",        icon:"🧭", label:"Coachs & Formateurs",   sub:"Accompagnateurs de tout bord" },
  { id:"sante",         icon:"🌿", label:"Professions de santé",  sub:"Thérapeutes, praticiens" },
  { id:"commercants",   icon:"🏪", label:"Artisans & Commerçants",sub:"TPE, métiers de bouche, retail" },
  { id:"dirigeants",    icon:"🏛️", label:"Dirigeants de PME",     sub:"Patrons, associés, gérants" },
  { id:"experts",       icon:"🔬", label:"Experts & Consultants", sub:"Juridique, finance, tech, RH" },
];

const SKILLS = [
  "Stratégie business","Vente & closing","Marketing digital","Coaching de vie",
  "Leadership","Gestion financière","Ressources humaines","Communication",
  "Création de contenu","Tech & IA","Développement personnel","Bien-être",
  "Formation","Négociation","Design & Créativité","Gestion de projet",
  "Data & Analytics","Juridique","Mindset & Performance","Personal branding",
];

const STYLES = [
  { id:"expert",         num:"01", label:"L'Expert",         desc:"Tu apportes des solutions précises et mesurables. Les gens viennent pour ta maîtrise technique." },
  { id:"inspirateur",    num:"02", label:"L'Inspirateur",    desc:"Tu changes les perspectives et crées du mouvement. Tu vends avant tout une vision." },
  { id:"accompagnateur", num:"03", label:"L'Accompagnateur", desc:"Tu es dans la relation profonde et durable. La confiance est ton capital principal." },
  { id:"pragmatique",    num:"04", label:"Le Pragmatique",   desc:"Tu vas vite et tu produis des résultats concrets. Tes clients veulent de l'action." },
];

const THEMES = [
  { accent:"#F15A22", light:"#FFF5F1", label:"Angle Expertise",      sym:"01" },
  { accent:"#0A0A0A", light:"#F2F2F2", label:"Angle Transformation",  sym:"02" },
  { accent:"#1A5FA8", light:"#EEF4FB", label:"Angle Affinité",        sym:"03" },
];

/* ─── CSS ─────────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --white:#FFFFFF; --ink:#0A0A0A; --orange:#F15A22;
  --op:#FFF5F1; --grey:#F5F5F5; --line:#E0E0E0;
  --muted:#888; --font:'Hanken Grotesk',sans-serif;
}
body{background:var(--white);}
.root{min-height:100vh;background:var(--white);font-family:var(--font);color:var(--ink);}

/* TOPBAR */
.topbar{height:64px;padding:0 40px;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid var(--ink);background:var(--white);position:sticky;top:0;z-index:10;}

/* LOGO */
.logo{display:flex;align-items:center;}
.logo-box{width:26px;height:26px;background:var(--orange);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:17px;color:var(--white);letter-spacing:-0.03em;flex-shrink:0;transition:transform 0.2s cubic-bezier(.34,1.56,.64,1);}
.logo:hover .logo-box{transform:rotate(-8deg) scale(1.1);}
.logo-text{font-weight:900;font-size:20px;letter-spacing:-0.04em;color:var(--ink);line-height:1;}
.logo-sep{font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-left:12px;padding-left:12px;border-left:1px solid var(--line);}

/* PROGRESS */
.progress{display:flex;align-items:center;gap:6px;}
.prog-step{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:var(--line);transition:color 0.2s;}
.prog-step.active{color:var(--orange);}
.prog-step.done{color:var(--ink);}
.prog-num{width:26px;height:26px;border:2px solid currentColor;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;}
.prog-step.done .prog-num{background:var(--ink);color:var(--white);border-color:var(--ink);}
.prog-step.active .prog-num{background:var(--orange);color:var(--white);border-color:var(--orange);}
.prog-sep{width:20px;height:2px;background:var(--line);transition:background 0.3s;}
.prog-sep.done{background:var(--ink);}

/* LANDING */
.landing{position:relative;min-height:calc(100vh - 64px);display:flex;align-items:center;justify-content:center;overflow:hidden;padding:60px 24px;clip-path:inset(0);}
.sh{position:absolute;pointer-events:none;z-index:0;}
.sh-sq-lg{width:120px;height:120px;border:2px solid var(--orange);opacity:.07;top:10%;right:8%;animation:spin-cw 28s linear infinite;}
.sh-sq-sm{width:40px;height:40px;background:var(--orange);opacity:.07;bottom:18%;left:8%;transform:rotate(18deg);animation:float-sh 9s ease-in-out infinite;}
.sh-dot-1{width:10px;height:10px;border-radius:50%;background:var(--ink);opacity:.12;top:30%;right:22%;animation:pulse-sh 5s ease-in-out infinite;}
.sh-dot-2{width:7px;height:7px;border-radius:50%;background:var(--orange);opacity:.28;top:65%;left:20%;animation:pulse-sh 7s ease-in-out infinite 1.2s;}
.sh-outline{width:30px;height:30px;border:2px solid var(--ink);opacity:.07;top:55%;left:8%;animation:spin-cw 22s linear infinite reverse;}
.sh-hline{width:80px;height:2px;background:var(--orange);opacity:.15;bottom:30%;right:10%;animation:float-sh 12s ease-in-out infinite reverse;}
@keyframes spin-cw{to{transform:rotate(360deg);}}
@keyframes float-sh{0%,100%{transform:translateY(0) rotate(18deg);}50%{transform:translateY(-20px) rotate(24deg);}}
@keyframes pulse-sh{0%,100%{transform:scale(1);opacity:.12;}50%{transform:scale(1.7);opacity:.28;}}
@keyframes spin{to{transform:rotate(360deg);}}

.land-inner{position:relative;z-index:1;max-width:600px;width:100%;text-align:center;}
.land-logo-wrap{display:inline-flex;align-items:center;gap:0;margin-bottom:8px;opacity:.4;}
.land-logo-text{font-weight:900;font-size:18px;letter-spacing:-0.04em;color:var(--ink);}
.land-tagline{font-size:13px;font-weight:500;color:var(--muted);font-style:italic;margin-bottom:24px;}
.land-h{font-size:clamp(40px,7vw,72px);font-weight:900;line-height:1.0;letter-spacing:-0.04em;color:var(--ink);margin-bottom:20px;}
.land-h em{font-style:normal;color:var(--orange);}
.land-sub{font-size:16px;font-weight:400;color:var(--muted);line-height:1.8;margin-bottom:40px;}
.land-sub strong{color:var(--ink);font-weight:800;}

/* CAPTURE CARD */
.cap-card{background:var(--white);border:2px solid var(--ink);border-radius:6px;padding:36px 40px;text-align:left;box-shadow:6px 6px 0 var(--ink);transition:box-shadow 0.2s,transform 0.2s;}
.cap-card:hover{box-shadow:8px 8px 0 var(--orange);transform:translateY(-2px);}
.cap-title{font-size:17px;font-weight:900;letter-spacing:-0.02em;margin-bottom:22px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:12px;}
.form-col{display:flex;flex-direction:column;gap:6px;}
.form-lbl{font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);}
.form-inp{width:100%;border:2px solid var(--line);border-radius:4px;padding:13px 16px;font-family:var(--font);font-size:15px;font-weight:500;color:var(--ink);outline:none;transition:border-color 0.15s,box-shadow 0.15s;background:var(--white);}
.form-inp:focus{border-color:var(--orange);box-shadow:0 0 0 3px rgba(241,90,34,.1);}
.form-inp::placeholder{color:#C8C8C8;font-weight:400;}
.form-inp.inv{border-color:#DC2626;}
.form-err{font-size:12px;color:#DC2626;font-weight:600;}
.btn-go{width:100%;margin-top:4px;background:var(--orange);color:white;border:2px solid var(--orange);border-radius:4px;padding:17px 32px;font-family:var(--font);font-size:16px;font-weight:900;letter-spacing:-0.02em;cursor:pointer;transition:all 0.15s;display:flex;align-items:center;justify-content:center;gap:8px;}
.btn-go:hover{background:#D04A14;border-color:#D04A14;transform:translateY(-2px);box-shadow:4px 4px 0 var(--ink);}
.btn-go-arr{display:inline-block;transition:transform 0.2s;}
.btn-go:hover .btn-go-arr{transform:translateX(5px);}
.form-note{text-align:center;margin-top:14px;font-size:11px;font-weight:500;color:var(--muted);}

/* STATS */
.stats{display:flex;gap:28px;justify-content:center;margin-top:36px;align-items:center;}
.stat-n{font-size:28px;font-weight:900;letter-spacing:-0.04em;color:var(--orange);line-height:1;}
.stat-l{font-size:11px;font-weight:600;color:var(--muted);letter-spacing:0.04em;margin-top:4px;text-align:center;}
.stat-div{width:1px;height:36px;background:var(--line);}

/* PAGE */
.page{max-width:860px;margin:0 auto;padding:64px 32px 100px;}
.eyebrow{font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:var(--orange);margin-bottom:16px;}
.step-h{font-size:clamp(34px,5.5vw,56px);font-weight:900;line-height:1.0;letter-spacing:-0.03em;color:var(--ink);margin-bottom:16px;}
.step-h em,.step-h .hi{font-style:normal;color:var(--orange);}
.step-sub{font-size:16px;font-weight:400;color:var(--muted);max-width:500px;line-height:1.6;margin-bottom:48px;}

/* AUDIENCE GRID */
.aud-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:10px;margin-bottom:40px;}
.aud-card{background:var(--white);border:2px solid var(--line);border-radius:4px;padding:22px 18px;cursor:pointer;transition:all 0.18s cubic-bezier(.34,1.56,.64,1);text-align:left;position:relative;}
.aud-card:hover{border-color:var(--orange);transform:translateY(-3px);box-shadow:4px 4px 0 var(--orange);}
.aud-card:hover .aud-ico{transform:scale(1.25);}
.aud-card.sel{border-color:var(--orange);background:var(--op);box-shadow:4px 4px 0 var(--orange);transform:translateY(-3px);}
.aud-card.sel::after{content:'✓';position:absolute;top:10px;right:12px;font-size:12px;font-weight:900;color:var(--orange);}
.aud-ico{font-size:26px;margin-bottom:12px;line-height:1;display:block;transition:transform 0.25s cubic-bezier(.34,1.56,.64,1);}
.aud-lbl{font-size:14px;font-weight:800;color:var(--ink);margin-bottom:4px;letter-spacing:-0.01em;}
.aud-sub{font-size:12px;font-weight:400;color:var(--muted);line-height:1.4;}

/* FIELD */
.field{margin-bottom:32px;}
.field-lbl{font-size:11px;font-weight:800;letter-spacing:0.10em;text-transform:uppercase;color:var(--ink);margin-bottom:10px;display:block;}
.field-opt{font-weight:500;color:var(--muted);}
.field-hint{font-size:12px;color:var(--muted);margin-top:8px;font-style:italic;}
textarea{width:100%;background:var(--white);border:2px solid var(--line);border-radius:4px;padding:16px 18px;font-family:var(--font);font-size:15px;font-weight:400;color:var(--ink);resize:vertical;outline:none;transition:border-color 0.15s,box-shadow 0.15s;line-height:1.6;}
textarea:focus{border-color:var(--orange);box-shadow:0 0 0 3px rgba(241,90,34,.1);}
textarea::placeholder{color:#C8C8C8;}

/* SKILLS */
.skills-wrap{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;}
.skill-tag{padding:9px 18px;border:2px solid var(--line);border-radius:100px;font-size:13px;font-weight:600;color:var(--muted);background:var(--white);cursor:pointer;transition:all 0.12s;user-select:none;letter-spacing:-0.01em;}
.skill-tag:hover{border-color:var(--orange);color:var(--orange);transform:translateY(-1px);}
.skill-tag.sel{background:var(--orange);border-color:var(--orange);color:white;}

/* STYLE CARDS */
.style-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:40px;}
.style-card{background:var(--white);border:2px solid var(--line);border-radius:4px;padding:28px 24px;cursor:pointer;transition:all 0.18s cubic-bezier(.34,1.56,.64,1);}
.style-card:hover{border-color:var(--orange);box-shadow:4px 4px 0 var(--orange);transform:translateY(-3px);}
.style-card:hover .snum{color:var(--orange);}
.style-card.sel{border-color:var(--orange);background:var(--op);box-shadow:4px 4px 0 var(--orange);transform:translateY(-3px);}
.snum{font-size:11px;font-weight:800;letter-spacing:0.10em;color:var(--line);margin-bottom:16px;display:block;transition:color 0.15s;}
.style-card.sel .snum{color:var(--orange);}
.sname{font-size:24px;font-weight:900;color:var(--ink);letter-spacing:-0.03em;margin-bottom:10px;line-height:1;}
.style-card.sel .sname{color:var(--orange);}
.sdesc{font-size:13px;font-weight:400;color:var(--muted);line-height:1.55;}

/* NAV */
.fnav{display:flex;justify-content:space-between;align-items:center;padding-top:36px;border-top:2px solid var(--line);}
.btn-back{background:none;border:none;font-family:var(--font);font-size:14px;font-weight:700;color:var(--muted);cursor:pointer;transition:color 0.15s;}
.btn-back:hover{color:var(--ink);}
.btn-next{background:var(--ink);color:var(--white);border:2px solid var(--ink);border-radius:4px;padding:14px 32px;font-family:var(--font);font-size:14px;font-weight:800;cursor:pointer;transition:all 0.15s;}
.btn-next:hover{background:var(--orange);border-color:var(--orange);transform:translateY(-2px);box-shadow:4px 4px 0 var(--ink);}
.btn-next:disabled{background:var(--line);border-color:var(--line);color:var(--muted);cursor:not-allowed;transform:none;box-shadow:none;}
.btn-gen{background:var(--orange);color:white;border:2px solid var(--orange);border-radius:4px;padding:16px 36px;font-family:var(--font);font-size:15px;font-weight:900;cursor:pointer;transition:all 0.15s;display:flex;align-items:center;gap:10px;}
.btn-gen:hover{background:#D04A14;border-color:#D04A14;transform:translateY(-2px);box-shadow:4px 4px 0 var(--ink);}
.btn-gen:disabled{background:var(--line);border-color:var(--line);color:var(--muted);cursor:not-allowed;transform:none;box-shadow:none;}

/* LOADING */
.loading{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:28px;}
.spin-ring{width:52px;height:52px;border:3px solid var(--line);border-top-color:var(--orange);border-radius:50%;animation:spin .85s linear infinite;}
.load-h{font-size:30px;font-weight:900;letter-spacing:-0.03em;color:var(--ink);text-align:center;}
.load-h em{font-style:normal;color:var(--orange);}
.load-p{font-size:14px;color:var(--muted);text-align:center;}

/* RESULTS */
.results-stack{display:flex;flex-direction:column;gap:12px;}
.opt-card{background:var(--white);border:2px solid var(--line);border-radius:4px;overflow:hidden;transition:all 0.15s;}
.opt-card.featured{border-color:var(--orange);box-shadow:5px 5px 0 var(--orange);}
.opt-card:not(.featured):hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.07);}
.opt-hdr{padding:24px 28px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:16px;}
.opt-hdr:hover{background:var(--grey);}
.opt-badge{font-size:12px;font-weight:900;width:40px;height:40px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.opt-meta{flex:1;}
.opt-angle{font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:5px;}
.opt-tagline{font-size:20px;font-weight:900;color:var(--ink);letter-spacing:-0.02em;line-height:1.1;}
.opt-chev{font-size:20px;color:var(--muted);transition:transform 0.2s;flex-shrink:0;}
.opt-chev.open{transform:rotate(180deg);}
.opt-body{padding:0 28px 28px;border-top:2px solid var(--line);animation:fadeUp .2s ease;}
@keyframes fadeUp{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}

.reco-bar{display:flex;align-items:baseline;gap:8px;margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid var(--line);}
.reco-pill{display:inline-block;padding:3px 10px;background:var(--orange);color:white;border-radius:100px;font-size:10px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;flex-shrink:0;}
.reco-why{font-size:13px;font-weight:400;color:var(--muted);font-style:italic;line-height:1.5;}

.pitch-block{margin-top:20px;margin-bottom:20px;}
.dlbl{font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:7px;}
.dval{font-size:14px;font-weight:400;color:var(--ink);line-height:1.7;}
.dval.big{font-size:18px;font-weight:700;letter-spacing:-0.02em;line-height:1.4;}
.dval.hook{padding:12px 16px;border-left:4px solid currentColor;font-style:italic;font-weight:500;}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.opt-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;}
.otag{padding:4px 12px;border-radius:100px;font-size:12px;font-weight:700;}
.opt-actions{padding-top:18px;border-top:1px solid var(--line);}
.copy-btn{padding:9px 18px;border:2px solid var(--line);border-radius:4px;background:white;font-family:var(--font);font-size:12px;font-weight:700;color:var(--muted);cursor:pointer;transition:all 0.12s;}
.copy-btn:hover{border-color:var(--ink);color:var(--ink);}
.copy-btn.done{border-color:#16A34A;color:#16A34A;}

.others-sep{font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin:24px 0 12px;display:flex;align-items:center;gap:12px;}
.others-sep::after{content:'';flex:1;height:1px;background:var(--line);}

/* CTA BLOCK */
.cta-block{margin-top:48px;background:var(--ink);border-radius:4px;padding:40px 40px 28px;display:flex;flex-direction:column;gap:28px;}
.cta-top-row{display:flex;align-items:center;justify-content:space-between;gap:32px;}
.cta-l{flex:1;}
.cta-eyebrow{font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:var(--orange);margin-bottom:12px;}
.cta-title{font-size:26px;font-weight:900;letter-spacing:-0.03em;line-height:1.1;color:var(--white);margin-bottom:14px;}
.cta-title em{font-style:normal;color:var(--orange);}
.cta-sub{font-size:14px;color:#CCC;line-height:1.65;margin-bottom:24px;}
.cta-btn{display:inline-flex;align-items:center;background:var(--orange);color:white;border:none;border-radius:4px;padding:14px 26px;font-family:var(--font);font-size:14px;font-weight:800;text-decoration:none;cursor:pointer;transition:all 0.15s;}
.cta-btn:hover{background:#D04A14;transform:translateY(-2px);box-shadow:4px 4px 0 rgba(255,255,255,.15);}
.cta-proof{text-align:center;font-size:13px;font-weight:800;color:#555;letter-spacing:0.06em;padding-top:20px;border-top:1px solid #222;}
.cta-r{display:flex;flex-direction:column;align-items:center;gap:8px;flex-shrink:0;}
.cta-avatar{width:60px;height:60px;border-radius:50%;background:var(--orange);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:white;overflow:hidden;}
.cta-avatar img{width:100%;height:100%;object-fit:cover;}
.cta-name{font-size:14px;font-weight:800;color:var(--white);}
.cta-role{font-size:11px;font-weight:400;color:#666;text-align:center;}

.restart-wrap{display:flex;justify-content:center;margin-top:40px;}
.restart-btn{padding:12px 24px;background:none;border:2px solid var(--line);border-radius:4px;font-family:var(--font);font-size:13px;font-weight:700;color:var(--muted);cursor:pointer;transition:all 0.12s;}
.restart-btn:hover{border-color:var(--ink);color:var(--ink);}

.err-box{background:#FEF2F2;border:2px solid #FECACA;border-radius:4px;padding:14px 18px;font-size:14px;font-weight:500;color:#DC2626;margin-bottom:20px;}

@media(max-width:640px){
  .topbar{padding:0 20px;}
  .logo-sep,.prog-name{display:none;}
  .page{padding:40px 20px 80px;}
  .form-row,.style-grid,.two-col{grid-template-columns:1fr;}
  .aud-grid{grid-template-columns:1fr 1fr;}
  .step-h{font-size:34px;}
  .stats{gap:16px;}
  .cap-card{padding:24px 20px;}
  .land-h{font-size:38px;}
  .cta-block{flex-direction:column;padding:28px 24px;}
  .cta-r{flex-direction:row;}
}
`;

const MARTIN_PHOTO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAMgAyADASIAAhEBAxEB/8QAHAABAQEAAwEBAQAAAAAAAAAAAAECAwQFBgcI/8QAGwEBAQADAQEBAAAAAAAAAAAAAAECAwQFBgf/2gAMAwEAAhADEAAAAfWV+UfrKxVKkWBYS1kiiULLKlKAKIKCgJaMrKASqyBLKgoCSyiygEsAoKgospKrKwsqsqIsqSqk1MkBJWTCykqySwizKZmpUmpWZqGVlkllSah74+e2C2AJQmpRVQpFAtZW1FgAJkoAAqSiLKAksIKgqTUISrC0RKirCligCygpKqKMqIMkWVBUlVJZUlVJqZJLCSrMrLIsrM1KyKgTM1K94vzucpVlgUBQtSqZVUoFJFVFlotRRFhBUAlVBWSKhRFiIWRaJVQVFLmosVRQCxkASqiwCosqTUqTWagyQVBUlzSUkFmZqVmaluZqWRYkzqV78Pnc1loAoi2oqgAoUimMVbBaFARYJVRYSalZWVIiolWRTLJqZmTkmFbYGmbWmS6SpblZbm1UtABSURZkKrIqSiSzJJZSWUllSUmVmUZ1kiy2TSzCxJnUr34vzucVUoUULQCVUUgIstRYBSVUKQUDJnWSTUqRLcy4pMdHZj6E+R+d7eL9M8/8t8j0eD9p7X4T3Nmr9tv492dHT+sT819PR0fc3zu3xd/NeO69m9cdTdxTVza0lQAKCgospLMmQRVZmpWVVlZUGUkpMzUpnWVk1LJnUSZ1MnvU+czCgCspLYFCVUogAUALUFRRJVRYrOoTOs5XEvk7MfT8X4b4r2/F+/8Ai/Ee98zz9fi13+Zlu7NK5xlhWuPKubramfvetGPjOf2/SvsO/m/qfqb8FaFfnDq/Uf1HN/X8KdT4fZ1e++1dLsNW5ORyzM3lrIrL0o2t5fU37vk8OV5fXe7WM/M1PivrPo/T0IxGjlauPP6RaVcLuLbHjjm4+Xu+Pz+cOntlveHn2r6U2j9K/mzVMJcyW7W67GnF0i2uf6MV6a28XTt0uXPv32d25V2f9Ej0fXv+Yl6/0R9HPX5cz1e+9G7tN/lhz1D8vbv5M72OiO5y/mOj09F3nR48g3nk0frL74Pj2fV+I+N+d+f7Pb8fXiXxHd8nwUXoauoePf1t3WJ8Rcp2+h9vy8e+b59d8Hj7/q9fqes+p5WPRL1PzLUlbOHl66aeNNt0M7NZ0jHXVJaxcv1Z9C6L9f+U6Vfo3c16sBvYXflkrjT2bN9KrMjNMfSLM7I5aKz0dlNtrfJRPOuX53oW3Y+B8J7nkdqzU2W5ZuXxPb8o7H7Sxq5bGudLXVwR4L83bG2b3Dl2zXjfVcfMaJ59zOQ7fr3+LPvw8OPIde0a/MZ3P4yM+lR83JaVdepZ+b9Sf3PsPr31vZ9t+o7Y3jf2dJ4FBLAAAAA==";

/* ─── LOGO ─────────────────────────────────────────────────────────── */
const Logo = () => (
  <div className="logo">
    <div className="logo-box">H</div>
    <span className="logo-text">ECTOR</span>
    <span className="logo-sep">Positionnement</span>
  </div>
);

/* ─── PROGRESS ──────────────────────────────────────────────────────── */
const Progress = ({ step }) => (
  <div className="progress">
    {[{n:1,l:"Cible"},{n:2,l:"Compétences"},{n:3,l:"Style"},{n:4,l:"Toi"}].map((s,i)=>(
      <div key={s.n} style={{display:"flex",alignItems:"center",gap:6}}>
        <div className={`prog-step ${step>s.n?"done":step===s.n?"active":""}`}>
          <div className="prog-num">{step>s.n?"✓":s.n}</div>
          <span className="prog-name" style={{fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase"}}>{s.l}</span>
        </div>
        {i<3 && <div className={`prog-sep ${step>s.n?"done":""}`}/>}
      </div>
    ))}
  </div>
);

/* ─── APP ───────────────────────────────────────────────────────────── */
export default function Hector() {
  // 0=landing 1-4=steps 5=loading 6=results
  const [step,    setStep]    = useState(0);
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [fErr,    setFErr]    = useState({});
  const [err,     setErr]     = useState("");
  const [results, setResults] = useState(null);
  const [open,    setOpen]    = useState(0);
  const [copied,  setCopied]  = useState(null);

  const [sel, setSel] = useState({
    audiences:[], audienceNote:"",
    skills:[], background:"",
    style:"", phrase:"",
  });

  const toggle = (key, val) => setSel(s=>({
    ...s,
    [key]: s[key].includes(val) ? s[key].filter(x=>x!==val) : [...s[key], val],
  }));

  const submitCapture = async () => {
    const e = {};
    if (!name.trim() || name.trim().length < 2) e.name = "Ton prénom est requis";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email invalide";
    if (Object.keys(e).length) { setFErr(e); return; }
    setFErr({});
    // Send to Formspree (fire and forget — don't block the user)
    fetch("https://formspree.io/f/mrejjwwg", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ prenom: name, email: email }),
    }).catch(() => {}); // silent fail — never block the user experience
    setStep(1);
  };

  const canNext = () => {
    if (step===1) return sel.audiences.length > 0;
    if (step===2) return sel.skills.length >= 2;
    if (step===3) return sel.style !== "";
    return true; // step 4: phrase is optional
  };

  const generate = async () => {
    setStep(5); setErr("");
    try {
      const prompt = `Tu es Martin Bassard, coach business et vente spécialisé dans l'accompagnement des solopreneurs et indépendants.

Ta grille de coach — ce que tu observes systématiquement :
- La plupart des indépendants ont peur de se nicher par crainte de perdre des clients, alors que c'est exactement ce qui leur en ferait gagner
- Ils restent sur des symptômes légers au lieu d'aller chercher les douleurs profondes et viscérales de leur cible
- Leur vraie force vient presque toujours de leur ancien milieu, leurs expériences passées et leur personnalité profonde — pas de ce qu'ils croient devoir "être"
- Les mots qu'ils utilisent pour se décrire sont trop mous : il faut des mots forts, qui résonnent, qui font dire "c'est exactement moi"
- Beaucoup ont peur de s'affirmer sur une cible précise par manque de légitimité perçue
- Face à l'IA, un indépendant doit être perçu comme expert et crédible — pas hyperspécialisé, mais clairement positionné
- Le positionnement conditionne tout : la vente, le contenu, les tarifs, la confiance
- Trop de solopreneurs passent des mois voire des années à tourner en rond sur cette étape

Sur la base de ce profil, génère 3 angles de positionnement distincts pour ${name}.

PROFIL :
- Cibles visées : ${sel.audiences.join(", ")}
${sel.audienceNote ? `- Précision cible : ${sel.audienceNote}` : ""}
- Compétences : ${sel.skills.join(", ")}
${sel.background ? `- Parcours & crédibilité : ${sel.background}` : ""}
- Style naturel : ${sel.style}
${sel.phrase ? `- Ce qu'il/elle n'ose pas encore dire : "${sel.phrase}"` : ""}

Règles de rédaction :
- Utilise des mots forts et directs — évite le jargon marketing lisse
- Creuse les douleurs profondes (pas les symptômes de surface)
- Valorise le parcours antérieur comme différenciateur
- Le pitch doit sonner humain et assumé
- N'utilise JAMAIS de tirets longs (—) ni de tirets moyens (–) dans tes réponses
- Détermine l'angle LE PLUS PERTINENT selon style + compétences + cible, place-le EN PREMIER avec "recommande": true

Génère EXACTEMENT 2 angles (pas 3) :
1. L'angle le plus pertinent pour ce profil (recommande: true)
2. Un angle alternatif solide (recommande: false)

Choisis parmi : Expertise, Transformation, Affinité

Réponds UNIQUEMENT avec un objet JSON valide. Zéro texte avant ou après. Zéro backtick.
{
  "options": [
    {
      "angle": "Expertise",
      "recommande": true,
      "raison": "1 phrase qui explique pourquoi cet angle colle à ce profil précis, sans tiret long",
      "tagline": "formule courte et mémorable, 6-8 mots maximum, sans tiret long",
      "pitch": "2-3 phrases directes, commençant par J'aide ou J'accompagne, avec des mots forts, sans tiret long",
      "cible": "Portrait précis en 2 phrases sans tiret long",
      "diff": "Ce qui distingue vraiment ce positionnement, 2 phrases concrètes, sans tiret long",
      "hook": "Accroche LinkedIn 2 lignes max, sans tiret long",
      "tags": ["mot1","mot2","mot3","mot4","mot5"]
    },
    {
      "angle": "Transformation",
      "recommande": false,
      "raison": "",
      "tagline": "formule courte et mémorable, sans tiret long",
      "pitch": "2-3 phrases directes, sans tiret long",
      "cible": "Portrait précis en 2 phrases, sans tiret long",
      "diff": "2 phrases concrètes, sans tiret long",
      "hook": "2 lignes max, sans tiret long",
      "tags": ["mot1","mot2","mot3","mot4","mot5"]
    }
  ]
}`;

      const res = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  }),
});
      const json   = await res.json();
      const raw    = json.content?.find(b => b.type === "text")?.text || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResults(parsed.options || parsed);
      setOpen(0);
      setStep(6);
    } catch(e) {
      setErr("Erreur lors de la génération. Réessaie dans quelques secondes.");
      setStep(4);
    }
  };

  const copyCard = (i) => {
    const o = results[i];
    navigator.clipboard.writeText(
      `${o.angle.toUpperCase()} — ${o.tagline}\n\n${o.pitch}\n\nCible : ${o.cible}\nDifférenciateur : ${o.diff}\n\nAccroche LinkedIn :\n${o.hook}`
    );
    setCopied(i); setTimeout(() => setCopied(null), 2000);
  };

  const restart = () => {
    setStep(0); setResults(null); setErr(""); setOpen(0);
    setName(""); setEmail(""); setFErr({});
    setSel({ audiences:[], audienceNote:"", skills:[], background:"", style:"", phrase:"" });
  };

  const themeFor = (opt, i) =>
    THEMES.find(t => t.label.toLowerCase().includes(opt.angle.toLowerCase())) || THEMES[i] || THEMES[0];

  return (
    <>
      <style>{css}</style>
      <div className="root">

        {/* TOPBAR */}
        <div className="topbar">
          <Logo/>
          {step >= 1 && step <= 4 && <Progress step={step}/>}
        </div>

        {/* ── LANDING ── */}
        {step === 0 && (
          <div className="landing">
            <div className="sh sh-sq-lg"/><div className="sh sh-sq-sm"/>
            <div className="sh sh-dot-1"/><div className="sh sh-dot-2"/>
            <div className="sh sh-outline"/><div className="sh sh-hline"/>

            <div className="land-inner">
              <div className="land-logo-wrap">
                <div className="logo-box" style={{width:22,height:22,fontSize:14}}>H</div>
                <span className="land-logo-text">ECTOR</span>
              </div>
              <div className="land-tagline">L'outil qu'on aurait voulu avoir quand on se lançait.</div>

              <h1 className="land-h">Ton positionnement,<br/><em>clair</em> en 3 minutes.</h1>

              <p className="land-sub">
                3 angles distincts basés sur tes compétences<br/>
                et les tendances marché.<br/>
                <strong>100% sur-mesure.</strong>
              </p>

              <div className="cap-card">
                <div className="cap-title">Dis-moi qui tu es pour commencer</div>
                <div className="form-row">
                  <div className="form-col">
                    <label className="form-lbl">Ton prénom</label>
                    <input type="text" className={`form-inp ${fErr.name?"inv":""}`}
                      placeholder="Camille" value={name}
                      onChange={e=>setName(e.target.value)}
                      onKeyDown={e=>e.key==="Enter"&&submitCapture()}/>
                    {fErr.name && <span className="form-err">{fErr.name}</span>}
                  </div>
                  <div className="form-col">
                    <label className="form-lbl">Ton email</label>
                    <input type="text" className={`form-inp ${fErr.email?"inv":""}`}
                      placeholder="camille@exemple.fr" value={email}
                      onChange={e=>setEmail(e.target.value)}
                      onKeyDown={e=>e.key==="Enter"&&submitCapture()}/>
                    {fErr.email && <span className="form-err">{fErr.email}</span>}
                  </div>
                </div>
                <button className="btn-go" onClick={submitCapture}>
                  Trouver mon positionnement <span className="btn-go-arr">→</span>
                </button>
                <p className="form-note">🔒 Aucun spam — tes données restent confidentielles</p>
              </div>

              <div className="stats">
                <div><div className="stat-n">4</div><div className="stat-l">Questions</div></div>
                <div className="stat-div"/>
                <div><div className="stat-n">3</div><div className="stat-l">Angles distincts</div></div>
                <div className="stat-div"/>
                <div><div className="stat-n">100%</div><div className="stat-l">Sur-mesure</div></div>
              </div>
            </div>
          </div>
        )}

        {/* ── ÉTAPE 1 : CIBLE ── */}
        {step === 1 && (
          <div className="page">
            <div className="eyebrow">Étape 1 · 4</div>
            <h1 className="step-h">À qui tu veux <em>vraiment</em><br/>parler, <span className="hi">{name} ?</span></h1>
            <p className="step-sub">Ne réfléchis pas trop. Qui est la personne à qui tu aurais envie d'envoyer un message ce soir ?</p>

            <div className="aud-grid">
              {AUDIENCES.map(a => (
                <div key={a.id} className={`aud-card ${sel.audiences.includes(a.id)?"sel":""}`} onClick={()=>toggle("audiences",a.id)}>
                  <span className="aud-ico">{a.icon}</span>
                  <div className="aud-lbl">{a.label}</div>
                  <div className="aud-sub">{a.sub}</div>
                </div>
              ))}
            </div>

            <div className="field">
              <label className="field-lbl">Précise ta cible <span className="field-opt">(optionnel)</span></label>
              <textarea rows={2}
                placeholder="Ex : des coachs qui lancent leur premier programme en ligne, des dirigeants de PME familiales en transmission…"
                value={sel.audienceNote} onChange={e=>setSel(s=>({...s,audienceNote:e.target.value}))}/>
            </div>

            <div className="fnav">
              <div/>
              <button className="btn-next" onClick={()=>setStep(2)} disabled={!canNext()}>Continuer →</button>
            </div>
          </div>
        )}

        {/* ── ÉTAPE 2 : COMPÉTENCES ── */}
        {step === 2 && (
          <div className="page">
            <div className="eyebrow">Étape 2 · 4</div>
            <h1 className="step-h">Tes <em>compétences</em><br/>&amp; ton expérience</h1>
            <p className="step-sub">Sélectionne ce que tu sais vraiment faire, {name}. C'est souvent là que se cache ton différenciateur.</p>

            <div className="skills-wrap">
              {SKILLS.map(s => (
                <div key={s} className={`skill-tag ${sel.skills.includes(s)?"sel":""}`} onClick={()=>toggle("skills",s)}>{s}</div>
              ))}
            </div>

            <div className="field">
              <label className="field-lbl">Ton parcours &amp; ce qui te rend crédible</label>
              <textarea rows={3}
                placeholder="Ex : 12 ans en agence marketing, ancienne directrice commerciale, j'ai moi-même monté et vendu une boîte de 20 personnes…"
                value={sel.background} onChange={e=>setSel(s=>({...s,background:e.target.value}))}/>
            </div>

            <div className="fnav">
              <button className="btn-back" onClick={()=>setStep(1)}>← Retour</button>
              <button className="btn-next" onClick={()=>setStep(3)} disabled={!canNext()}>Continuer →</button>
            </div>
          </div>
        )}

        {/* ── ÉTAPE 3 : STYLE ── */}
        {step === 3 && (
          <div className="page">
            <div className="eyebrow">Étape 3 · 4</div>
            <h1 className="step-h">Ton <em>style</em> naturel</h1>
            <p className="step-sub">Instinctivement, {name} — qui tu es, pas qui tu crois devoir être.</p>

            <div className="style-grid">
              {STYLES.map(st => (
                <div key={st.id} className={`style-card ${sel.style===st.id?"sel":""}`} onClick={()=>setSel(s=>({...s,style:st.id}))}>
                  <span className="snum">{st.num}</span>
                  <div className="sname">{st.label}</div>
                  <div className="sdesc">{st.desc}</div>
                </div>
              ))}
            </div>

            <div className="fnav">
              <button className="btn-back" onClick={()=>setStep(2)}>← Retour</button>
              <button className="btn-next" onClick={()=>setStep(4)} disabled={!canNext()}>Continuer →</button>
            </div>
          </div>
        )}

        {/* ── ÉTAPE 4 : QUESTION PERSO ── */}
        {step === 4 && (
          <div className="page">
            <div className="eyebrow">Étape 4 · 4</div>
            <h1 className="step-h">La question<br/>qui <em>change tout</em></h1>
            <p className="step-sub">Celle qu'on pose rarement — et qui dit tout sur ton vrai positionnement.</p>

            <div className="field">
              <label className="field-lbl">Quelle est la phrase que tu n'oses pas encore dire sur ce que tu fais ?</label>
              <textarea rows={4}
                placeholder={"Ex : \"En fait je suis la seule à vraiment connaître ce secteur de l'intérieur, mais j'ose pas le dire comme ça...\" ou \"Je sais que mes clients font x3 avec moi mais je ne sais pas comment le formuler sans paraître arrogant...\""}
                value={sel.phrase} onChange={e=>setSel(s=>({...s,phrase:e.target.value}))}/>
              <div className="field-hint">Tu peux laisser vide si rien ne te vient — mais si quelque chose monte, écris-le.</div>
            </div>

            {err && <div className="err-box">{err}</div>}

            <div className="fnav">
              <button className="btn-back" onClick={()=>setStep(3)}>← Retour</button>
              <button className="btn-gen" onClick={generate}>
                <span>✦</span> Générer mes positionnements
              </button>
            </div>
          </div>
        )}

        {/* ── LOADING ── */}
        {step === 5 && (
          <div className="loading">
            <div className="spin-ring"/>
            <div className="load-h">On analyse ton profil,<br/><em>{name}…</em></div>
            <p className="load-p">Croisement de tes données avec les tendances marché</p>
          </div>
        )}

        {/* ── RÉSULTATS ── */}
        {step === 6 && results && (
          <div className="page">
            <div className="eyebrow">Ton positionnement sur-mesure</div>
            <h1 className="step-h">Voilà tes options,<br/><em>{name}</em></h1>
            <p className="step-sub" style={{marginBottom:36}}>
              Un angle privilégié pour ton profil, et une alternative à explorer.
            </p>

            <div className="results-stack">
              {results.map((opt, i) => {
                const th     = themeFor(opt, i);
                const isFeat = opt.recommande === true;
                const isOpen = open === i;

                return (
                  <div key={i}>
                    {i === 1 && <div className="others-sep">Une autre piste</div>}

                    <div className={`opt-card ${isFeat?"featured":""}`}
                      style={{borderTopWidth:3, borderTopColor:th.accent}}>

                      <div className="opt-hdr" onClick={()=>setOpen(isOpen?-1:i)}>
                        <div className="opt-badge" style={{background:th.light, color:th.accent}}>{th.sym}</div>
                        <div className="opt-meta">
                          <div className="opt-angle" style={{color:th.accent}}>{th.label}</div>
                          <div className="opt-tagline">{opt.tagline}</div>
                        </div>
                        <div className={`opt-chev ${isOpen?"open":""}`}>⌄</div>
                      </div>

                      {isOpen && (
                        <div className="opt-body">
                          {isFeat && opt.raison && (
                            <div className="reco-bar">
                              <span className="reco-pill">⭐ Recommandé</span>
                              <span className="reco-why">{opt.raison}</span>
                            </div>
                          )}

                          <div className="pitch-block">
                            <div className="dlbl">Pitch</div>
                            <div className="dval big" style={{color:th.accent}}>{opt.pitch}</div>
                          </div>

                          <div className="two-col">
                            <div>
                              <div className="dlbl">Cible</div>
                              <div className="dval">{opt.cible}</div>
                            </div>
                            <div>
                              <div className="dlbl">Ta différence</div>
                              <div className="dval">{opt.diff}</div>
                            </div>
                          </div>

                          <div style={{marginBottom:16}}>
                            <div className="dlbl">Accroche LinkedIn</div>
                            <div className="dval hook" style={{color:th.accent, borderColor:th.accent}}>{opt.hook}</div>
                          </div>

                          <div className="opt-tags">
                            {opt.tags?.map((m,j) => (
                              <span key={j} className="otag" style={{background:th.light, color:th.accent, border:`2px solid ${th.accent}30`}}>{m}</span>
                            ))}
                          </div>

                          <div className="opt-actions">
                            <button className={`copy-btn ${copied===i?"done":""}`} onClick={()=>copyCard(i)}>
                              {copied===i ? "✓ Copié !" : "Copier cet angle"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="cta-block">
              <div className="cta-top-row">
                <div className="cta-l">
                  <div className="cta-eyebrow">Tu veux aller plus loin ?</div>
                  <div className="cta-title">Détermine enfin ton<br/><em>positionnement unique</em></div>
                  <div className="cta-sub">
                    <strong>Un appel avec moi pour valider, affiner et rendre ton positionnement vraiment actionnable.</strong>
                    <br/>
                    <span style={{fontWeight:400, opacity:0.6, fontSize:13}}>(Tu peux venir sans ta CB)</span>
                  </div>
                  <a className="cta-btn" href="https://taap.it/AQvq8ed" target="_blank" rel="noopener noreferrer">
                    Réserver mon appel gratuit →
                  </a>
                </div>
                <div className="cta-r">
                  <div className="cta-avatar">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAMgAyADASIAAhEBAxEB/8QAHAABAQEAAwEBAQAAAAAAAAAAAAECAwQFBgcI/8QAGwEBAQADAQEBAAAAAAAAAAAAAAECAwQFBgf/2gAMAwEAAhADEAAAAfWV+UfrKxVKkWBYS1kiiULLKlKAKIKCgJaMrKASqyBLKgoCSyiygEsAoKgospKrKwsqsqIsqSqk1MkBJWTCykqySwizKZmpUmpWZqGVlkllSah74+e2C2AJQmpRVQpFAtZW1FgAJkoAAqSiLKAksIKgqTUISrC0RKirCligCygpKqKMqIMkWVBUlVJZUlVJqZJLCSrMrLIsrM1KyKgTM1K94vzucpVlgUBQtSqZVUoFJFVFlotRRFhBUAlVBWSKhRFiIWRaJVQVFLmosVRQCxkASqiwCosqTUqTWagyQVBUlzSUkFmZqVmaluZqWRYkzqV78Pnc1loAoi2oqgAoUimMVbBaFARYJVRYSalZWVIiolWRTLJqZmTkmFbYGmbWmS6SpblZbm1UtABSURZkKrIqSiSzJJZSWUllSUmVmUZ1kiy2TSzCxJnUr34vzucVUoUULQCVUUgIstRYBSVUKQUDJnWSTUqRLcy4pMdHZj6E+R+d7eL9M8/8t8j0eD9p7X4T3Nmr9tv492dHT+sT819PR0fc3zu3xd/NeO69m9cdTdxTVza0lQAKCgospLMmQRVZmpWVVlZUGUkpMzUpnWVk1LJnUSZ1MnvU+czCgCspLYFCVUogAUALUFRRJVRYrOoTOs5XEvk7MfT8X4b4r2/F+/8Ai/Ee98zz9fi13+Zlu7NK5xlhWuPKubramfvet8V2Oft/Uvsv558..." alt="Martin Bassard" style={{width:"100%",height:"100%",objectFit:"cover"}} />
                  </div>
                  <div className="cta-name">Martin Bassard</div>
                  <div className="cta-role">Coach vente &amp; mental</div>
                </div>
              </div>
              <div className="cta-proof">+60 indépendants accompagnés</div>
            </div>

            <div className="restart-wrap">
              <button className="restart-btn" onClick={restart}>↺ Recommencer avec un autre profil</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
