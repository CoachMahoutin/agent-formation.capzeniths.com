import { useState, useEffect } from "react";

// ── STYLE INJECTION ─────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("czf-s")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(link);
  const s = document.createElement("style");
  s.id = "czf-s";
  s.textContent = `
    .czf *{box-sizing:border-box;}
    .czf{font-family:'Outfit',sans-serif;background:#FAF8F5;min-height:100vh;color:#2D1B4E;}
    .czf-serif{font-family:'DM Serif Display',serif;}
    .czf-inp{width:100%;padding:11px 15px;border:1.5px solid rgba(45,10,62,.15);border-radius:10px;background:#fff;color:#2D1B4E;font-family:'Outfit',sans-serif;font-size:14px;outline:none;transition:all .2s;}
    .czf-inp:focus{border-color:#F5A623;box-shadow:0 0 0 3px rgba(245,166,35,.12);}
    .czf-sel{appearance:none;width:100%;padding:11px 15px;border:1.5px solid rgba(45,10,62,.15);border-radius:10px;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23F5A623' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 14px center;color:#2D1B4E;font-family:'Outfit',sans-serif;font-size:14px;outline:none;cursor:pointer;transition:all .2s;}
    .czf-sel:focus{border-color:#F5A623;box-shadow:0 0 0 3px rgba(245,166,35,.12);}
    .czf-card{background:#fff;border-radius:18px;border:1px solid rgba(45,10,62,.08);box-shadow:0 1px 4px rgba(45,10,62,.06),0 6px 20px rgba(45,10,62,.04);}
    .czf-pillar{border:1.5px solid rgba(45,10,62,.12);border-radius:13px;padding:14px 8px 10px;cursor:pointer;text-align:center;background:#fff;transition:all .2s;user-select:none;}
    .czf-pillar:hover{border-color:#F5A623;box-shadow:0 4px 14px rgba(245,166,35,.15);transform:translateY(-2px);}
    .czf-pillar.sel{border-color:#F5A623;background:#FFFBF0;box-shadow:0 4px 18px rgba(245,166,35,.22);}
    .czf-n-opt{flex:1;padding:10px 4px;text-align:center;border-radius:10px;cursor:pointer;border:1.5px solid rgba(45,10,62,.12);background:#fff;font-family:'Outfit',sans-serif;font-size:15px;font-weight:600;color:#7C6A8E;transition:all .18s;min-width:40px;}
    .czf-n-opt:hover{border-color:#F5A623;color:#F5A623;}
    .czf-n-opt.sel{border-color:#F5A623;background:#F5A623;color:#2D0A3E;}
    .czf-tab{padding:9px 20px;border-radius:100px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;cursor:pointer;border:1.5px solid transparent;transition:all .2s;background:transparent;color:#7C6A8E;}
    .czf-tab:hover{color:#F5A623;background:rgba(245,166,35,.07);}
    .czf-tab.sel{background:#F5A623;color:#2D0A3E;font-weight:600;}
    .czf-btn{background:#F5A623;color:#2D0A3E;border:none;border-radius:13px;padding:15px 32px;font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;letter-spacing:.01em;}
    .czf-btn:hover:not(:disabled){background:#E09A1A;box-shadow:0 4px 20px rgba(245,166,35,.35);transform:translateY(-1px);}
    .czf-btn:disabled{opacity:.38;cursor:not-allowed;}
    .czf-btn-sm{background:transparent;color:#7C6A8E;border:1px solid rgba(45,10,62,.15);border-radius:8px;padding:5px 12px;font-family:'Outfit',sans-serif;font-size:11px;font-weight:500;cursor:pointer;transition:all .15s;}
    .czf-btn-sm:hover{border-color:#F5A623;color:#F5A623;}
    .czf-answer{padding:11px 15px;border-radius:11px;border:1.5px solid rgba(45,10,62,.1);background:#FAFAF8;font-size:13px;color:#2D1B4E;font-family:'Outfit',sans-serif;line-height:1.5;}
    .czf-answer.ok{border-color:#10B981;background:#ECFDF5;color:#065F46;font-weight:600;}
    @keyframes czfUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes czfBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    .czf-up{animation:czfUp .4s ease forwards;}
    .czf-up1{animation:czfUp .4s .08s ease both;}
    .czf-up2{animation:czfUp .4s .16s ease both;}
    .czf-up3{animation:czfUp .4s .26s ease both;}
    @media print{.no-print{display:none!important}.czf{background:#fff}.czf-card{box-shadow:none;border:1px solid #e0d8f0;}}
  `;
  document.head.appendChild(s);
};

// ── LOGO SVG ─────────────────────────────────────────────────────
const Logo = ({ height = 34, dark = false }) => (
  <svg viewBox="0 0 210 60" height={height} style={{ display:"block" }} xmlns="http://www.w3.org/2000/svg" aria-label="CapZeniths">
    {/* Cercle aubergine */}
    <circle cx="30" cy="30" r="28" fill="#2D0A3E"/>
    {/* 3 barres ascendantes */}
    <rect x="14" y="37" width="9" height="9"  rx="1.5" fill="#F5A623"/>
    <rect x="26" y="28" width="9" height="18" rx="1.5" fill="#F5A623"/>
    <rect x="38" y="18" width="9" height="28" rx="1.5" fill="#F5A623"/>
    {/* Étoile au sommet de la 3e barre */}
    <polygon points="42.5,6.5 43.8,10.2 47.7,10.3 44.6,12.7 45.7,16.5 42.5,14.2 39.3,16.5 40.4,12.7 37.3,10.3 41.2,10.2" fill="#F5A623"/>
    {/* Texte */}
    <text x="66" y="41" fontFamily="'Outfit',sans-serif" fontSize="25" fontWeight="700" fill="#F5A623">Cap</text>
    <text x="109" y="41" fontFamily="'Outfit',sans-serif" fontSize="25" fontWeight="700" fill={dark ? "#C4B8E8" : "#9B8ED4"}>Zeniths</text>
  </svg>
);

// ── DONNÉES ─────────────────────────────────────────────────────
const PILLIERS = [
  {id:"cash",icon:"💰",label:"Cash"},
  {id:"strategie",icon:"🎯",label:"Stratégie"},
  {id:"clients",icon:"🤝",label:"Clients"},
  {id:"equipe",icon:"👥",label:"Équipe"},
  {id:"risques",icon:"⚠️",label:"Risques"},
  {id:"croissance",icon:"📈",label:"Croissance"},
  {id:"resilience",icon:"🛡️",label:"Résilience"},
];
const NIVEAUX   = [{id:"debutant",label:"Débutant"},{id:"intermediaire",label:"Intermédiaire"},{id:"avance",label:"Avancé"}];
const PROFILS   = [{id:"creation",label:"En création"},{id:"difficulte",label:"En difficulté"},{id:"croissance",label:"En croissance"},{id:"reconversion",label:"Reconversion"}];

// ── API ──────────────────────────────────────────────────────────
const MODULE_SYS = `Tu es l'Agent Formation de CapZeniths, cabinet spécialisé en prévention défaillance business pour dirigeants TPE/PME français. Méthode des 7 piliers. Style : direct, anti-bullshit, tutoiement, exemples concrets. Orienté action immédiate.
RÉPONDS EN JSON VALIDE sans backticks.
{"module":{"titre":"<titre engageant max 60 chars>","pilier":"<pilier>","resume":"<2-3 phrases percutantes>","objectifs":["<objectif actionnable 1>","<objectif 2>","<objectif 3>"],"prerequis":"<prérequis>","competences":["<compétence 1>","<compétence 2>"]},"seances":[{"numero":1,"titre":"<titre>","duree":"60 min","objectif":"<objectif>","plan":["<point 1>","<point 2>","<point 3>"],"activite":"<exercice pratique>","livrable":"<livrable concret>"}]}`;

const QUIZ_SYS = `Tu es l'Agent Formation de CapZeniths. Crée un quiz de 8 questions sur le module fourni. Questions pour dirigeants TPE/PME. RÉPONDS EN JSON VALIDE sans backticks.
{"quiz":[{"q":"<question>","choix":["A. ...","B. ...","C. ...","D. ..."],"rep":"A","explication":"<explication courte>"}]}`;

const callAPI = async (system, content) => {
  const res = await fetch("/api/analyze", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system,messages:[{role:"user",content}]}),
  });
  const data = await res.json();
  return JSON.parse((data.content?.[0]?.text||"").replace(/```json|```/g,"").trim());
};

const LOADS = ["Analyse du brief…","Conception du module…","Rédaction des séances…","Génération du quiz…","Finalisation du programme…"];

// ── COMPOSANT PRINCIPAL ──────────────────────────────────────────
export default function AgentFormation() {
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState({pilier:"",titre:"",niveau:"intermediaire",nbSeances:"2",profil:"difficulte"});
  const [result, setResult] = useState(null);
  const [tab, setTab]       = useState("module");
  const [loading, setLoading] = useState(false);
  const [lmsg, setLmsg]     = useState("");
  const [lpct, setLpct]     = useState(0);
  const [err, setErr]       = useState("");
  const [copied, setCopied] = useState(null);

  useEffect(() => { injectStyles(); }, []);

  const sf = (k,v) => setForm(f=>({...f,[k]:v}));
  const P  = PILLIERS.find(p=>p.id===form.pilier);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(()=>setCopied(null), 2200);
  };

  const generate = async () => {
    if (!form.pilier)      { setErr("Sélectionne un pilier."); return; }
    if (!form.titre.trim()){ setErr("Renseigne un thème."); return; }
    setErr(""); setLoading(true); setStep(2);
    let mi = 0; setLmsg(LOADS[0]); setLpct(8);
    const iv = setInterval(()=>{ mi=Math.min(mi+1,LOADS.length-1); setLmsg(LOADS[mi]); setLpct(Math.round((mi/(LOADS.length-1))*80)); }, 2200);
    try {
      const pLabel = P?.label;
      const niv    = NIVEAUX.find(x=>x.id===form.niveau)?.label;
      const prof   = PROFILS.find(x=>x.id===form.profil)?.label;
      const msg    = `Pilier : ${pLabel}\nThème : ${form.titre}\nNiveau : ${niv}\nNombre de séances : ${form.nbSeances}\nProfil : ${prof}\nGénère la fiche module + ${form.nbSeances} séance(s).`;
      const mod    = await callAPI(MODULE_SYS, msg);
      setLmsg(LOADS[3]); setLpct(72);
      const qzMsg  = `Module : ${mod.module?.titre}\nPilier : ${pLabel}\nObjectifs : ${(mod.module?.objectifs||[]).join(", ")}`;
      const qz     = await callAPI(QUIZ_SYS, qzMsg);
      clearInterval(iv); setLpct(100);
      setResult({ module:mod.module, seances:mod.seances||[], quiz:qz.quiz||[] });
      setTimeout(()=>setStep(3), 400);
    } catch(e) {
      clearInterval(iv); setErr("Erreur de génération. Réessaie."); setStep(1);
    } finally { setLoading(false); }
  };

  // ── CHARGEMENT ──
  if (step === 2) return (
    <div className="czf" style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"2rem"}}>
      <div className="czf-card czf-up" style={{padding:"52px 44px",textAlign:"center",maxWidth:420,width:"100%"}}>
        <div style={{marginBottom:28,display:"flex",justifyContent:"center"}}><Logo height={40}/></div>
        <div className="czf-serif" style={{fontSize:22,color:"#2D0A3E",marginBottom:8,fontStyle:"italic"}}>Génération en cours</div>
        <div style={{fontSize:14,color:"#7C6A8E",marginBottom:36,lineHeight:1.6}}>{lmsg}</div>
        <div style={{height:3,background:"rgba(245,166,35,.15)",borderRadius:2,overflow:"hidden",marginBottom:12}}>
          <div style={{height:"100%",background:"#F5A623",borderRadius:2,width:`${lpct}%`,transition:"width .6s cubic-bezier(.4,0,.2,1)",transformOrigin:"left"}}/>
        </div>
        <div style={{fontSize:13,color:"#B8A898",fontWeight:600}}>{lpct}%</div>
      </div>
    </div>
  );

  // ── RÉSULTATS ──
  if (step === 3 && result) {
    const { module, seances, quiz } = result;
    const moduleTxt   = `${module?.titre}\n\n${module?.resume}\n\nObjectifs :\n${(module?.objectifs||[]).map(o=>`• ${o}`).join("\n")}\n\nPrérequis : ${module?.prerequis}\n\nCompétences :\n${(module?.competences||[]).map(c=>`• ${c}`).join("\n")}`;
    const seancesTxt  = seances.map(s=>`Séance ${s.numero} — ${s.titre}\nObjectif : ${s.objectif}\nPlan : ${(s.plan||[]).join(" | ")}\nActivité : ${s.activite}\nLivrable : ${s.livrable}`).join("\n\n");
    const quizTxt     = quiz.map((q,i)=>`${i+1}. ${q.q}\n${(q.choix||[]).join("\n")}\n→ ${q.rep} — ${q.explication}`).join("\n\n");

    return (
      <div className="czf">
        {/* Navbar */}
        <div className="no-print" style={{background:"#FFF8E8",padding:"0 24px",position:"sticky",borderBottom:"2px solid #F5A623",top:0,zIndex:100}}>
          <div style={{maxWidth:780,margin:"0 auto",height:58,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Logo height={32} dark/>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:11,fontWeight:500,letterSpacing:".1em",color:"rgba(45,10,62,.45)",textTransform:"uppercase"}}>Agent Formation</span>
              <span style={{width:1,height:14,background:"rgba(255,255,255,.15)"}}/>
              <button onClick={()=>{setStep(1);setResult(null);setTab("module");}} className="czf-btn-sm no-print" style={{color:"#7C6A8E",borderColor:"rgba(45,10,62,.2)"}}>← Nouveau</button>
            </div>
          </div>
        </div>

        <div style={{maxWidth:780,margin:"0 auto",padding:"40px 24px"}}>

          {/* En-tête résultat */}
          <div className="czf-up" style={{marginBottom:32}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <span style={{background:"#F5A623",color:"#2D0A3E",fontSize:11,fontWeight:700,letterSpacing:".08em",padding:"3px 10px",borderRadius:20}}>{P?.icon} {module?.pilier?.toUpperCase()}</span>
              <span style={{fontSize:11,color:"#B8A898"}}>{seances.length} séance{seances.length>1?"s":""} · {quiz.length} questions</span>
            </div>
            <div className="czf-serif" style={{fontSize:32,color:"#2D0A3E",lineHeight:1.2}}>{module?.titre}</div>
          </div>

          {/* Tabs */}
          <div className="no-print" style={{display:"flex",gap:6,marginBottom:32}}>
            {[{id:"module",label:"📋 Module"},{id:"seances",label:"🎓 Séances"},{id:"quiz",label:"❓ Quiz"}].map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} className={`czf-tab${tab===t.id?" sel":""}`}>{t.label}</button>
            ))}
          </div>

          {/* MODULE */}
          {tab==="module" && (
            <div className="czf-up1">
              <div className="czf-card" style={{padding:"30px 34px",marginBottom:16,borderTop:"4px solid #F5A623"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",color:"#B8A898",textTransform:"uppercase"}}>Résumé</div>
                  <button onClick={()=>copy(moduleTxt,"mod")} className="czf-btn-sm no-print" style={copied==="mod"?{borderColor:"#10B981",color:"#10B981"}:{}}>{copied==="mod"?"✓ Copié":"Copier"}</button>
                </div>
                <p style={{fontSize:15,lineHeight:1.85,color:"#2D1B4E",margin:0}}>{module?.resume}</p>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                <div className="czf-card" style={{padding:"24px 26px"}}>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",color:"#F5A623",marginBottom:16,textTransform:"uppercase"}}>Objectifs</div>
                  {(module?.objectifs||[]).map((o,i)=>(
                    <div key={i} style={{display:"flex",gap:12,marginBottom:10}}>
                      <span style={{width:22,height:22,borderRadius:"50%",background:"#F5A623",color:"#2D0A3E",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{i+1}</span>
                      <span style={{fontSize:13,color:"#3D2A5C",lineHeight:1.65}}>{o}</span>
                    </div>
                  ))}
                </div>
                <div className="czf-card" style={{padding:"24px 26px"}}>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",color:"#10B981",marginBottom:16,textTransform:"uppercase"}}>Compétences acquises</div>
                  {(module?.competences||[]).map((c,i)=>(
                    <div key={i} style={{display:"flex",gap:12,marginBottom:10}}>
                      <span style={{color:"#10B981",fontSize:16,flexShrink:0}}>✓</span>
                      <span style={{fontSize:13,color:"#3D2A5C",lineHeight:1.65}}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {module?.prerequis && (
                <div className="czf-card" style={{padding:"14px 26px",borderLeft:"4px solid rgba(245,166,35,.3)",display:"flex",gap:12,alignItems:"center"}}>
                  <span style={{fontSize:10,fontWeight:700,letterSpacing:".12em",color:"#B8A898",textTransform:"uppercase",flexShrink:0}}>Prérequis</span>
                  <span style={{fontSize:13,color:"#7C6A8E"}}>{module?.prerequis}</span>
                </div>
              )}
            </div>
          )}

          {/* SÉANCES */}
          {tab==="seances" && (
            <div className="czf-up1">
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:18,gap:8}}>
                <button onClick={()=>copy(seancesTxt,"sea")} className="czf-btn-sm no-print" style={copied==="sea"?{borderColor:"#10B981",color:"#10B981"}:{}}>{copied==="sea"?"✓ Copié":"Copier tout"}</button>
                <button onClick={()=>window.print()} className="czf-btn-sm no-print">🖨 PDF</button>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:20}}>
                {seances.map((s,i)=>(
                  <div key={i} className="czf-card" style={{overflow:"hidden"}}>
                    {/* Header séance */}
                    <div style={{background:"#2D0A3E",padding:"20px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{display:"flex",alignItems:"center",gap:16}}>
                        <div style={{width:38,height:38,borderRadius:"50%",background:"#F5A623",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:"#2D0A3E",flexShrink:0}}>{s.numero}</div>
                        <div>
                          <div className="czf-serif" style={{fontSize:19,color:"#F0E8FC",fontStyle:"italic"}}>{s.titre}</div>
                          <div style={{fontSize:11,color:"rgba(245,166,35,.6)",marginTop:3,fontWeight:500}}>{s.duree} · {s.objectif}</div>
                        </div>
                      </div>
                    </div>
                    {/* Corps séance */}
                    <div style={{padding:"24px 28px"}}>
                      <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",color:"#B8A898",marginBottom:14,textTransform:"uppercase"}}>Plan de séance</div>
                      <div style={{marginBottom:22}}>
                        {(s.plan||[]).map((p,j)=>(
                          <div key={j} style={{display:"flex",gap:14,marginBottom:9}}>
                            <span style={{fontSize:11,fontWeight:700,color:"rgba(245,166,35,.5)",minWidth:20}}>{j+1}.</span>
                            <span style={{fontSize:14,color:"#3D2A5C",lineHeight:1.65}}>{p}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                        <div style={{background:"#FFF8F0",borderRadius:13,padding:"16px 18px",border:"1.5px solid rgba(245,166,35,.2)"}}>
                          <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",color:"#F5A623",marginBottom:8,textTransform:"uppercase"}}>Activité pratique</div>
                          <div style={{fontSize:13,color:"#3D2A5C",lineHeight:1.65}}>{s.activite}</div>
                        </div>
                        <div style={{background:"#F0FDF8",borderRadius:13,padding:"16px 18px",border:"1.5px solid rgba(16,185,129,.15)"}}>
                          <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",color:"#10B981",marginBottom:8,textTransform:"uppercase"}}>Livrable</div>
                          <div style={{fontSize:13,color:"#3D2A5C",lineHeight:1.65}}>{s.livrable}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUIZ */}
          {tab==="quiz" && (
            <div className="czf-up1">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{background:"#F5A623",color:"#2D0A3E",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20}}>{quiz.length} questions</span>
                  <span style={{fontSize:12,color:"#B8A898"}}>· pilier {module?.pilier}</span>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>copy(quizTxt,"qz")} className="czf-btn-sm no-print" style={copied==="qz"?{borderColor:"#10B981",color:"#10B981"}:{}}>{copied==="qz"?"✓ Copié":"Copier"}</button>
                  <button onClick={()=>window.print()} className="czf-btn-sm no-print">🖨 PDF</button>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                {quiz.map((q,i)=>(
                  <div key={i} className="czf-card" style={{padding:"24px 28px"}}>
                    <div style={{display:"flex",gap:18,marginBottom:16}}>
                      <div className="czf-serif" style={{fontSize:32,color:"rgba(245,166,35,.25)",fontWeight:400,lineHeight:1,flexShrink:0,marginTop:2}}>{String(i+1).padStart(2,"0")}</div>
                      <div style={{fontSize:15,fontWeight:500,color:"#2D1B4E",lineHeight:1.65,paddingTop:6}}>{q.q}</div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                      {(q.choix||[]).map((c,j)=>{
                        const L = String.fromCharCode(65+j);
                        return <div key={j} className={`czf-answer${q.rep===L?" ok":""}`}>{q.rep===L?"✓ ":""}{c}</div>;
                      })}
                    </div>
                    {q.explication && (
                      <div style={{background:"#FFF8F0",borderRadius:10,padding:"10px 15px",borderLeft:"3px solid #F5A623"}}>
                        <span style={{fontSize:12,color:"#7C6A8E",fontStyle:"italic"}}>💡 {q.explication}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── FORMULAIRE ──
  return (
    <div className="czf">
      {/* Navbar */}
      <div style={{background:"#FFF8E8",padding:"0 24px",borderBottom:"2px solid #F5A623"}}> 
        <div style={{maxWidth:680,margin:"0 auto",height:58,display:"flex",alignItems:"center"}}>
          <Logo height={32} dark/>
        </div>
      </div>

      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#2D0A3E 0%,#1A0652 100%)",padding:"52px 24px 60px"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <div className="czf-up" style={{fontSize:11,fontWeight:700,letterSpacing:".16em",color:"rgba(245,166,35,.55)",textTransform:"uppercase",marginBottom:12}}>Agent Formation</div>
          <div className="czf-serif czf-up1" style={{fontSize:40,color:"#F0E8FC",lineHeight:1.15,marginBottom:12}}>
            Créer votre programme<br/>
            <span style={{fontStyle:"italic",color:"rgba(245,166,35,.75)"}}>de formation</span>
          </div>
          <div className="czf-up2" style={{fontSize:14,color:"rgba(240,232,252,.5)",maxWidth:460,lineHeight:1.75}}>
            Renseignez le brief — l'agent génère la fiche module, les séances structurées et le quiz d'évaluation en 30 secondes.
          </div>
        </div>
      </div>

      {/* Carte formulaire */}
      <div style={{maxWidth:680,margin:"-26px auto 0",padding:"0 20px 56px",position:"relative",zIndex:1}}>
        <div className="czf-card czf-up3" style={{padding:"34px 34px 38px"}}>

          {/* Piliers */}
          <div style={{marginBottom:26}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:".14em",color:"#B8A898",marginBottom:14,textTransform:"uppercase"}}>Pilier CapZeniths</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {PILLIERS.map(p=>(
                <div key={p.id} onClick={()=>sf("pilier",p.id)} className={`czf-pillar${form.pilier===p.id?" sel":""}`}>
                  <div style={{fontSize:22,marginBottom:6}}>{p.icon}</div>
                  <div style={{fontSize:11,fontWeight:600,color:form.pilier===p.id?"#F5A623":"#7C6A8E",letterSpacing:".02em"}}>{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Thème */}
          <div style={{marginBottom:22}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:".14em",color:"#B8A898",marginBottom:9,textTransform:"uppercase"}}>Thème du module</div>
            <input className="czf-inp" value={form.titre} onChange={e=>sf("titre",e.target.value)} placeholder="Ex. : Gérer sa trésorerie en période de crise"/>
          </div>

          {/* Options */}
          <div style={{display:"grid",gridTemplateColumns:"auto 1fr 1fr",gap:18,marginBottom:30,alignItems:"start"}}>
            <div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".14em",color:"#B8A898",marginBottom:9,textTransform:"uppercase"}}>Séances</div>
              <div style={{display:"flex",gap:6}}>
                {["1","2","3","4"].map(n=>(
                  <div key={n} onClick={()=>sf("nbSeances",n)} className={`czf-n-opt${form.nbSeances===n?" sel":""}`}>{n}</div>
                ))}
              </div>
            </div>
            <div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".14em",color:"#B8A898",marginBottom:9,textTransform:"uppercase"}}>Niveau</div>
              <select className="czf-sel" value={form.niveau} onChange={e=>sf("niveau",e.target.value)}>
                {NIVEAUX.map(n=><option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
            </div>
            <div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".14em",color:"#B8A898",marginBottom:9,textTransform:"uppercase"}}>Profil apprenant</div>
              <select className="czf-sel" value={form.profil} onChange={e=>sf("profil",e.target.value)}>
                {PROFILS.map(p=><option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </div>
          </div>

          {err && <div style={{fontSize:13,color:"#991B1B",marginBottom:18,padding:"10px 15px",background:"#FEE2E2",borderRadius:10}}>⚠️ {err}</div>}

          <div style={{display:"flex",alignItems:"center",gap:18}}>
            <button className="czf-btn" onClick={generate} disabled={!form.pilier||!form.titre}>
              → Générer le programme complet
            </button>
            {P && <span style={{fontSize:12,color:"#B8A898"}}>{P.icon} {P.label} · {form.nbSeances} séance{Number(form.nbSeances)>1?"s":""}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
