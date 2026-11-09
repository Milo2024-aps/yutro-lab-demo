import {elevatorCase} from './elevator-content.js';
import {veoCase} from './veo-content.js';
export const seedCases = [
  elevatorCase,
  veoCase,
  {
    "id": "tennis",
    "title": "Tenis",
    "category": "Deporte",
    "subtitle": "Arcilla, pasto y cemento.",
    "description": "Final audiovisual aprobado. Proceso y recursos reservados al acceso completo simulado. Lección y prompts de producción pendientes de revisión editorial.",
    "type": "premium",
    "art": "tennis",
    "editorialStatus": "pending",
    "steps": []
  },
  {
    "id": "tablet",
    "title": "Tablet",
    "category": "Producto",
    "subtitle": "Una pantalla. Otra posibilidad.",
    "description": "Final audiovisual aprobado. Proceso y recursos reservados al acceso completo simulado. Lección y prompts de producción pendientes de revisión editorial.",
    "type": "premium",
    "art": "tablet",
    "editorialStatus": "pending",
    "steps": []
  },
  {
    "id": "sin-cuerpo",
    "title": "Sin cuerpo",
    "category": "Narrativa",
    "subtitle": "Lo que no ves también cuenta.",
    "description": "Final audiovisual aprobado. Proceso y recursos reservados al acceso completo simulado. Lección y prompts de producción pendientes de revisión editorial.",
    "type": "premium",
    "art": "body",
    "editorialStatus": "pending",
    "steps": []
  },
  {
    "id": "nike",
    "title": "Basketball",
    "category": "Deporte",
    "subtitle": "Del barrio a la cancha.",
    "description": "Final audiovisual aprobado. Proceso y recursos reservados al acceso completo simulado. Lección y prompts de producción pendientes de revisión editorial.",
    "type": "premium",
    "art": "nike",
    "editorialStatus": "pending",
    "steps": []
  }
];
export const FREE_IDS = ['midjourney-kling','veo3-flow'];
export const RETIRED_IDS = ['ejercicio-encuadre','ejercicio-direccion'];
export const isPending = c => c?.editorialStatus === 'pending';
export const demoPrompt='EJEMPLO DIDÁCTICO — no es un prompt de producción de Milo. Describe un objeto simple sin marcas, un fondo neutro y una única fuente de luz. Propón dos encuadres y explica la intención de cada uno.';
export function makePractice(id){
 const framing=id==='ejercicio-encuadre';
 return {
  expected:framing?'Una ficha con dos propuestas del mismo objeto: una vista general y un detalle. La ilustración es una referencia conceptual de demo, no un resultado generado con este prompt.':'Una ficha con dos propuestas de luz y fondo, una elección y su motivo. La ilustración es una muestra conceptual de demo, no un resultado garantizado.',
  requirements:'Un objeto cotidiano sin marca y una hoja o editor de texto. Opcional: una herramienta de IA de tu elección. No necesitas pagar ni subir archivos personales.',
  prompt:framing?'EJERCICIO DEMO. Objeto: [OBJETO]. Intención: [INTENCIÓN]. Propón dos encuadres: una vista general que muestre el contexto y un detalle que destaque una cualidad. Mantén el mismo objeto, luz y fondo. Describe cada opción en dos frases y explica qué comunica. No incluyas marcas.':'EJERCICIO DEMO. Objeto: [OBJETO]. Intención: [CALMA O ENERGÍA]. Propón dos combinaciones de luz y fondo para comunicar esa intención. Mantén el objeto y el encuadre. Describe qué cambia, qué se mantiene y por qué elegirías cada propuesta. No incluyas marcas.',
  why:framing?'El prompt mantiene objeto, luz y fondo constantes para comparar una decisión: el encuadre. Así puedes explicar qué aporta la vista general y qué aporta el detalle.':'Al fijar objeto y encuadre, puedes comparar luz y fondo sin mezclar demasiados cambios. La explicación te ayuda a relacionar una elección con su intención.',
  variables:framing?'Cambia [OBJETO] e [INTENCIÓN]. Para una segunda prueba, conserva esos valores y cambia solo la distancia del encuadre.':'Cambia [OBJETO] y la intención entre calma o energía. Después prueba solo un cambio de fondo o de luz.',
  errors:framing?'Si las propuestas son casi iguales, pide que una muestre contexto y la otra solo un detalle. Si cambias varias cosas a la vez, vuelve a fijar luz y fondo antes de comparar.':'Si la respuesta es vaga, pide una fuente de luz y un fondo concretos. Si no puedes explicar la diferencia, conserva una variable y vuelve a comparar las dos alternativas.'
 };
}
export function validCaseId(id){
 return typeof id==='string' && id.length<=80 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) && !Object.hasOwn(Object.prototype,id);
}
export function validCases(value){
 if(!Array.isArray(value)||value.length<6||value.length>30||value.filter(c=>c?.type==='free').length!==2)return false;
 if(!seedCases.every(base=>value.some(c=>c?.id===base.id&&c.type===base.type)))return false;
 const ids=new Set(),text=(v,max)=>typeof v==='string'&&v.trim().length>0&&v.length<max;
 return value.every(c=>{
  if(!c||typeof c!=='object'||!validCaseId(c.id)||ids.has(c.id)||RETIRED_IDS.includes(c.id))return false;
  ids.add(c.id);
  const fixed=seedCases.find(base=>base.id===c.id);
  if(fixed){
   if(c.referenceUrl!==fixed.referenceUrl)return false;
   if(fixed.type==='free'){
    if(c.editorialStatus!==fixed.editorialStatus||c.lessonVersion!==fixed.lessonVersion||JSON.stringify(c.steps)!==JSON.stringify(fixed.steps)||JSON.stringify(c.practice)!==JSON.stringify(fixed.practice))return false;
   }else if(!isPending(c)||c.steps?.length!==0||Object.hasOwn(c,'practice'))return false;
  }
  return ['title','category','subtitle','description'].every(k=>text(c[k],2000))
   &&(!Object.hasOwn(c,'learning')||text(c.learning,500))
   &&['free','premium','development'].includes(c.type)&&['tennis','body','tablet','nike'].includes(c.art)
   &&(!Object.hasOwn(c,'price'))&&(!Object.hasOwn(c,'status'))&&Array.isArray(c.steps)&&c.steps.length<=20
   &&(isPending(c)||c.type==='development'?c.steps.length===0&&!Object.hasOwn(c,'practice'):c.steps.length>0&&c.practice&&['expected','requirements','prompt','why','variables','errors'].every(k=>text(c.practice[k],5000)))
   &&c.steps.every(s=>s&&typeof s==='object'&&text(s.title,200)&&text(s.body,5000));
 });
}
// Preserve added valid projects; the six agreed projects replace stale editorial definitions.
// The original local JSON is not overwritten automatically.
export function reconcileCatalog(value){
 if(validCases(value))return value;
 const result=structuredClone(seedCases);
 if(Array.isArray(value))for(const c of value){
  if(!c||seedCases.some(base=>base.id===c.id)||RETIRED_IDS.includes(c.id))continue;
  if(validCases([...result,c]))result.push(c);
 }
 return result;
}
