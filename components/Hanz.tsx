'use client';
import {useEffect,useRef,useState, type FormEvent} from 'react';
import {copy,models,pictures,contactNumber,type Lang} from '@/lib/content';
import gsap from 'gsap';
import {isValidPhone,whatsappUrl} from '@/lib/enquiry';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

type Selection={model:number;finish:number;engraving:number;layout:number;motif:number;quantity:number;inscription:string;dates:string};
const initial:Selection={model:0,finish:0,engraving:0,layout:0,motif:0,quantity:1,inscription:'',dates:''};
function Arrow(){return <span aria-hidden="true">↗</span>}
function Story({lang,reduced}:{lang:Lang;reduced:boolean}){
 const root=useRef<HTMLElement>(null); const t=copy[lang];
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  const mm=gsap.matchMedia();
  const ctx=gsap.context(()=>{mm.add({mobile:'(max-width: 700px)',desktop:'(min-width: 701px)',osReduce:'(prefers-reduced-motion: reduce)'},context=>{
   if(reduced||context.conditions?.osReduce)return;
   const mobile=!!context.conditions?.mobile;
   const sceneEls=gsap.utils.toArray<HTMLElement>('.scene');
   gsap.set(sceneEls.slice(1),{autoAlpha:0,y:28});
   gsap.set('.story-wordmark',{autoAlpha:1});
   gsap.set('.main-stone',{xPercent:-50,yPercent:-50,rotation:-4,scale:1});
   gsap.set('.side-stone',{autoAlpha:0,xPercent:-50,yPercent:-50,scale:.72});
   gsap.set('.detail-plane',{autoAlpha:0,scale:1.08});
   gsap.set('.callouts',{autoAlpha:0});
   const tl=gsap.timeline({defaults:{ease:'power1.inOut'},scrollTrigger:{trigger:root.current,start:'top top',end:()=>`+=${window.innerHeight*(mobile?5.5:6.7)}`,pin:true,scrub:.55,invalidateOnRefresh:true,id:'hanz-story'}});
   tl.to('.main-stone',{rotation:-1,scale:1.07,duration:.7},0)
     .to('.scene-0',{autoAlpha:0,y:-28,duration:.35},.85)
     .to('.story-wordmark',{xPercent:-18,autoAlpha:0,duration:.6},.85)
     .to('.main-stone',{x:()=>mobile?window.innerWidth*.19:window.innerWidth*.23,y:()=>mobile?60:0,scale:mobile?.84:1.05,rotation:4,rotationY:-9,duration:.9},.85)
     .to('.scene-1',{autoAlpha:1,y:0,duration:.45},1.15)
     .to('.callouts',{autoAlpha:1,duration:.4},1.4)
     .to('.main-stone',{rotation:2,scale:mobile?.9:1.1,duration:.65},1.65)
     .to('.scene-1,.callouts',{autoAlpha:0,y:-18,duration:.35},2.15)
     .to('.main-stone',{autoAlpha:0,scale:1.45,duration:.65},2.15)
     .to('.detail-plane',{autoAlpha:1,scale:1,duration:.7},2.3)
     .to('.scene-2',{autoAlpha:1,y:0,duration:.4},2.6)
     .to('.detail-plane',{xPercent:-4,scale:1.13,duration:.9},2.8)
     .to('.scene-2,.detail-plane',{autoAlpha:0,duration:.4},3.55)
     .to('.stage-ground',{backgroundColor:'#eeede7',duration:.6},3.55)
     .set('.main-stone',{x:0,y:mobile?80:65,rotation:0,rotationY:0,scale:mobile?.6:.67},3.7)
     .to('.main-stone',{autoAlpha:1,duration:.5},3.8)
     .set('.stone-white',{x:()=>-window.innerWidth*(mobile?.29:.25),y:mobile?100:80,rotation:-5},3.7)
     .set('.stone-black',{x:()=>window.innerWidth*(mobile?.29:.25),y:mobile?80:40,rotation:5},3.7)
     .to('.side-stone',{autoAlpha:1,scale:mobile?.48:.6,duration:.6},3.9)
     .to('.scene-3',{autoAlpha:1,y:0,duration:.4},4.0)
     .to('.side-stone',{rotation:0,duration:.8},4.35)
     .to('.scene-3,.side-stone',{autoAlpha:0,duration:.4},5)
     .to('.main-stone',{x:()=>mobile?0:-window.innerWidth*.24,y:mobile?100:30,scale:mobile?.72:.83,rotation:-2,duration:.75},5)
     .to('.scene-4',{autoAlpha:1,y:0,duration:.45},5.45)
     .to('.story-inscription',{autoAlpha:1,duration:.5},5.5)
     .to('.scene-4,.story-inscription',{autoAlpha:0,duration:.35},6.15)
     .to('.main-stone',{x:()=>mobile?window.innerWidth*.23:window.innerWidth*.29,scale:mobile?.7:.82,rotation:4,duration:.7},6.15)
     .to('.scene-5',{autoAlpha:1,y:0,duration:.45},6.55)
     .to('.main-stone',{rotation:1,duration:.7},6.85);
  });},root);
  return()=>{mm.revert();ctx.revert()};
 },[reduced]);
 return <section className={`story ${reduced?'static-story':''}`} ref={root} aria-label={lang==='ms'?'Kisah HANZ':'The HANZ story'}>
  <div className="stage-ground"/>
  <h1 className="story-wordmark">HANZ<span className="sr-only"> Batu Nisan</span></h1>
  <div className="detail-plane"><img src="/images/detail.webp" alt="" width="1536" height="1024"/></div>
  <div className="stone main-stone"><img src="/images/seri.webp" width="1024" height="1536" alt={lang==='ms'?'Batu nisan Seri bermahkota, granit kelabu':'Seri crowned Malaysian granite grave marker'} fetchPriority="high"/><span className="story-inscription">{t.sample}</span></div>
  <div className="stone side-stone stone-white"><img src="/images/murni.webp" alt="" width="1024" height="1536"/></div>
  <div className="stone side-stone stone-black"><img src="/images/warisan.webp" alt="" width="1024" height="1536"/></div>
  {t.scenes.map((s,i)=><div key={i} className={`scene scene-${i}`}>
   {i===0?<><div className="hero-note"><p>{t.intro}</p><a className="text-link" href="#collections">{t.explore} <Arrow/></a></div><p className="hero-category">Batu Nisan<br/>{lang==='ms'?'Warisan dalam bentuk.':'Heritage in form.'}</p></>:<><h2>{s[0]}<br/>{s[1]}</h2><p>{s[2]}</p>{i===5&&<a className="button" href="#collections">{t.nav[0]} <Arrow/></a>}</>}
  </div>)}
  <div className="callouts"><span>{t.shape}</span><span>{t.edge}</span><span>{t.face}</span></div>
 </section>
}

export default function Hanz(){
 const [lang,setLang]=useState<Lang>('ms'); const [reduced,setReduced]=useState(false);const [menu,setMenu]=useState(false);
 const [s,setS]=useState<Selection>(initial);const [ready,setReady]=useState(false);const [status,setStatus]=useState('');
 const [person,setPerson]=useState({name:'',phone:'',location:'',notes:'',consent:false});
 const t=copy[lang]; const summaryRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{try{const saved=localStorage.getItem('hanz-language');if(saved==='en'||saved==='ms')setLang(saved);setReduced(localStorage.getItem('hanz-reduced')==='true')}catch{}},[]);
 useEffect(()=>{document.documentElement.lang=lang;try{localStorage.setItem('hanz-language',lang)}catch{}},[lang]);
 function change<K extends keyof Selection>(key:K,value:Selection[K]){setS(v=>({...v,[key]:value}));setReady(false)}
 function choose(i:number){setS(v=>({...v,model:i,finish:i}));setReady(false);document.getElementById('personalise')?.scrollIntoView({behavior:'auto'})}
 const fields=[[t.model,models[s.model]],[t.finish,t.finishes[s.finish]],[t.engraving,t.engravings[s.engraving]],[t.layout,t.layouts[s.layout]],[t.motif,t.motifs[s.motif]],[t.quantity,t.quantities[s.quantity]],[t.inscription,s.inscription||t.noName],[t.dates,s.dates||t.noName]];
 const summary=[lang==='ms'?'Salam, saya ingin mendapatkan sebut harga HANZ.':'Hello, I would like a quotation from HANZ.','',...fields.map(([a,b])=>`${a}: ${b}`),'',`${t.name}: ${person.name}`,`${t.phone}: ${person.phone}`,`${t.location}: ${person.location||t.noName}`,`${t.notes}: ${person.notes||t.noName}`].join('\n');
 function prepare(e:FormEvent){e.preventDefault();if(!person.name.trim()||!isValidPhone(person.phone)||!person.consent){setStatus(t.required);return}setReady(true);setStatus('');setTimeout(()=>{summaryRef.current?.scrollIntoView({behavior:'auto',block:'center'});summaryRef.current?.focus()},50)}
 function download(){const url=URL.createObjectURL(new Blob([summary],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='HANZ-enquiry.txt';a.click();URL.revokeObjectURL(url);setStatus(t.saved)}
 function toggleMotion(){setReduced(v=>{try{localStorage.setItem('hanz-reduced',String(!v))}catch{}return !v})}
 return <>
  <a className="skip-link" href="#collections">{t.skip}</a>
  <header className="header"><a className="logo" href="#top" aria-label="HANZ">HANZ<span>Batu Nisan</span></a><nav className={menu?'nav open':'nav'} aria-label={lang==='ms'?'Navigasi utama':'Main navigation'}>{['collections','personalise','guide'].map((id,i)=><a href={`#${id}`} key={id} onClick={()=>setMenu(false)}>{t.nav[i]}</a>)}</nav><div className="header-actions"><div className="language" aria-label={lang==='ms'?'Bahasa':'Language'}><button lang="ms" aria-pressed={lang==='ms'} onClick={()=>{setLang('ms');setStatus('')}}>BM</button><span>/</span><button lang="en" aria-pressed={lang==='en'} onClick={()=>{setLang('en');setStatus('')}}>EN</button></div><a className="header-quote" href="#enquiry">{t.quote} <Arrow/></a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu}>{menu?t.close:t.menu}</button></div></header>
  <main id="top"><Story lang={lang} reduced={reduced}/>
   <section id="collections" className="collections section-pad"><div className="section-intro"><h2>{t.collections}</h2><p>{t.collectionIntro}</p></div><div className="collection-band">{models.map((m,i)=><article className={`collection collection-${i}`} key={m}><div className="collection-heading"><h3>{m}</h3><p>{t.materials[i]}</p></div><button className="product-select" onClick={()=>choose(i)} aria-label={`${t.choose}: ${m}`}><img src={'/images/'+pictures[i]} width="1024" height="1536" alt={`${m}, ${t.materials[i]}`} loading="lazy"/></button><div className="collection-bottom"><p>{t.desc[i]}</p><button className="text-link" onClick={()=>choose(i)}>{t.choose} <Arrow/></button></div></article>)}</div><p className="small muted">{t.visualNote}</p></section>
   <section className="material-feature"><img src="/images/detail.webp" width="1536" height="1024" alt={lang==='ms'?'Butiran kristal dan tepi granit dari dekat':'Close detail of granite grain and beveled edge'} loading="lazy"/><div><h2>{t.detailTitle}</h2><p>{t.detailText}</p></div></section>
   <section id="personalise" className="config section-pad"><div className="section-intro"><h2>{t.configTitle}</h2><p>{t.configIntro}</p></div><div className="config-grid"><div className="preview-column"><div className="product-preview"><img src={'/images/'+pictures[s.model]} width="1024" height="1536" alt={`${t.preview}: ${models[s.model]}`} loading="lazy"/><div className={`engraving-preview ${s.engraving===1?'classic':''} ${s.layout===1?'align-left':''} ${s.motif===1?'framed':''}`} dir="auto"><span>{s.inscription||t.sample}</span><small>{s.dates}</small></div><span className="preview-name">{models[s.model]}</span></div><p className="small">{t.previewNote}</p></div><div className="config-controls">
    <fieldset><legend>{t.model}</legend><div className="choice-row">{models.map((m,i)=><button key={m} aria-pressed={s.model===i} onClick={()=>change('model',i)}>{m}</button>)}</div></fieldset>
    <fieldset><legend>{t.finish}</legend><div className="finish-grid">{t.finishes.map((f,i)=><button key={i} aria-pressed={s.finish===i} onClick={()=>change('finish',i)}><i className={`swatch swatch-${i}`} aria-hidden="true"/>{f}</button>)}</div><p className="small muted">{t.finishNote}</p></fieldset>
    <div className="form-two"><label>{t.engraving}<select value={s.engraving} onChange={e=>change('engraving',+e.target.value)}>{t.engravings.map((v,i)=><option key={i} value={i}>{v}</option>)}</select></label><label>{t.layout}<select value={s.layout} onChange={e=>change('layout',+e.target.value)}>{t.layouts.map((v,i)=><option key={i} value={i}>{v}</option>)}</select></label><label>{t.motif}<select value={s.motif} onChange={e=>change('motif',+e.target.value)}>{t.motifs.map((v,i)=><option key={i} value={i}>{v}</option>)}</select></label><label>{t.quantity}<select value={s.quantity} onChange={e=>change('quantity',+e.target.value)}>{t.quantities.map((v,i)=><option key={i} value={i}>{v}</option>)}</select></label></div>
    <label>{t.inscription}<input value={s.inscription} onChange={e=>change('inscription',e.target.value)} placeholder={t.inscriptionPlaceholder} maxLength={90} dir="auto"/></label><label>{t.dates}<textarea rows={2} value={s.dates} onChange={e=>change('dates',e.target.value)} placeholder={t.datesPlaceholder} maxLength={160} dir="auto"/></label><p className="small muted">{t.customScript}</p><a href="#enquiry" className="button dark">{t.continue} <Arrow/></a>
   </div></div></section>
   <section id="guide" className="process section-pad"><h2>{t.processTitle}</h2><div className="process-steps">{t.steps.map(([a,b],i)=><div className={`process-step step-${i}`} key={i}><h3>{a}</h3><p>{b}</p></div>)}</div></section>
   <section className="assurance section-pad"><h2>{t.whyTitle}</h2><div><p>{t.whyText}</p><ul>{t.promises.map(p=><li key={p}>{p}</li>)}</ul></div></section>
   <section className="faq section-pad"><h2>{t.faqTitle}</h2>{t.faqs.map(([q,a])=><div className="faq-row" key={q}><h3>{q}</h3><p>{a}</p></div>)}</section>
   <section id="enquiry" className="enquiry section-pad"><div className="enquiry-intro"><h2>{t.enquiryTitle}</h2><p>{t.enquiryIntro}</p><a className="text-link" href={`https://wa.me/${contactNumber}?text=${encodeURIComponent(lang==='ms'?'Salam, saya ingin bertanya tentang batu nisan HANZ.':'Hello, I would like to enquire about HANZ batu nisan.')}`} target="_blank" rel="noopener noreferrer">WhatsApp +60 11-7017 1942 <Arrow/></a><div className="selection-summary"><h3>{t.selection}</h3><dl>{fields.slice(0,6).map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><a href="#personalise" className="text-link">{t.edit}</a></div></div><form onSubmit={prepare} className="enquiry-form"><label>{t.name} *<input required autoComplete="name" maxLength={100} value={person.name} onChange={e=>{setPerson({...person,name:e.target.value});setReady(false)}}/></label><label>{t.phone} *<input required type="tel" autoComplete="tel" placeholder="+60" maxLength={22} value={person.phone} onChange={e=>{setPerson({...person,phone:e.target.value});setReady(false)}}/></label><label>{t.location}<input autoComplete="address-level2" maxLength={200} value={person.location} onChange={e=>{setPerson({...person,location:e.target.value});setReady(false)}}/></label><label>{t.notes}<textarea rows={4} maxLength={1200} placeholder={t.notesPlaceholder} value={person.notes} onChange={e=>{setPerson({...person,notes:e.target.value});setReady(false)}}/></label><label className="consent"><input type="checkbox" required checked={person.consent} onChange={e=>{setPerson({...person,consent:e.target.checked});setReady(false)}}/><span>{t.consent}</span></label><p className="small muted">{t.privacy}</p><button className="button" type="submit">{t.review} <Arrow/></button><p role="status">{status}</p></form>
    {ready&&<div className="ready-panel" ref={summaryRef} tabIndex={-1}><h3>{t.ready}</h3><p>{t.readyText}</p><pre>{summary}</pre><div className="ready-actions"><a className="button dark" href={whatsappUrl(contactNumber,summary)} target="_blank" rel="noopener noreferrer">{t.send} <Arrow/></a><button className="text-link" type="button" onClick={download}>{t.download}</button><button className="text-link" type="button" onClick={()=>setReady(false)}>{t.edit}</button></div></div>}
   </section>
  </main>
  <footer className="footer section-pad"><div className="footer-top"><p>{t.footer}</p><button className="text-link" onClick={toggleMotion}>{reduced?t.motionOn:t.motion}</button><a href="#top">{t.back}</a></div><div className="footer-wordmark" aria-hidden="true">HANZ</div><div className="footer-bottom"><span>© {new Date().getFullYear()} HANZ Batu Nisan</span><p>{t.footerNote}</p><span>Bahasa Malaysia / English</span></div></footer>
  <a className="mobile-cta" href="#enquiry">{t.quote} <Arrow/></a>
  <noscript><div className="noscript">{t.noScript} <a href={`https://wa.me/${contactNumber}`}>WhatsApp HANZ</a></div></noscript>
 </>
}
