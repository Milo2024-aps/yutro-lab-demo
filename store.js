import {validCaseId} from './data.js';
export const DEMO_ACCOUNT_ID='DEMO-GOOGLE-1';
export const isSignedIn=s=>s.session===true&&s.accountId===DEMO_ACCOUNT_ID;
export function startSession(s){s.accountId=DEMO_ACCOUNT_ID;s.session=true;}
export function endSession(s){s.session=false;}
export const requiresSession=route=>!['','home','about','free','access','case','catalog'].includes(route||'');
export const KEY='yutro-demo-v2';
export const CONTENT_KEY='yutro-content-v2';
export const LEGACY_KEYS=['yutro-demo-v1','yutro-content'];
export function empty(){return {version:2,session:false,accountId:null,fullAccess:false,progress:{},favorites:[],orders:[],interests:[],migrationNotice:false};}
const ids=value=>Array.isArray(value)?[...new Set(value.filter(validCaseId))]:[];
export function read(storage){
 try{
  const raw=JSON.parse(storage.getItem(KEY));
  if(!raw||raw.version!==2){const s=empty();s.migrationNotice=LEGACY_KEYS.some(key=>storage.getItem(key)!==null);return s;}
  const s=empty();s.accountId=raw.accountId===DEMO_ACCOUNT_ID?DEMO_ACCOUNT_ID:null;s.session=raw.session===true&&s.accountId===DEMO_ACCOUNT_ID;s.fullAccess=raw.fullAccess===true;s.migrationNotice=raw.migrationNotice===true;s.favorites=ids(raw.favorites);s.interests=ids(raw.interests);
  if(raw.progress&&typeof raw.progress==='object'&&!Array.isArray(raw.progress)){
   for(const [id,value] of Object.entries(raw.progress))if(validCaseId(id)&&Array.isArray(value))s.progress[id]=[...new Set(value.filter(i=>Number.isInteger(i)&&i>=0&&i<20))];
  }
  s.orders=s.fullAccess?[{id:'DEMO-FULL-1',product:'full-access',accountId:DEMO_ACCOUNT_ID}]:[];
  return s;
 }catch{return empty();}
}
export function write(storage,state){try{storage.setItem(KEY,JSON.stringify(state));return true}catch{return false}}
export function canAccess(s,c){return Boolean(isSignedIn(s)&&c&&(c.type==='free'||c.type==='premium'&&s.fullAccess));}
export function checkoutOutcome(s,type){
 if(!isSignedIn(s)||!['success','cancel','error'].includes(type))return false;
 if(type==='success'){s.fullAccess=true;s.orders=[{id:'DEMO-FULL-1',product:'full-access',accountId:DEMO_ACCOUNT_ID}];}
 return true;
}
export function complete(s,id,index){if(!isSignedIn(s)||!validCaseId(id)||!Number.isInteger(index)||index<0||index>=20)return false;s.progress[id]=[...new Set([...(Array.isArray(s.progress[id])?s.progress[id]:[]),index])];return true;}
export function reset(storage){let ok=true;for(const key of [KEY,CONTENT_KEY,...LEGACY_KEYS]){try{storage.removeItem(key)}catch{ok=false}}return ok;}

export function receiptForResult(s,type,offer){
 if(!isSignedIn(s)||type!=='success'||!s.fullAccess||!s.orders.some(o=>o?.id==='DEMO-FULL-1'&&o.product==='full-access'&&o.accountId===s.accountId))return null;
 return {id:'DEMO-FULL-1',accountId:s.accountId,product:offer.title,illustrativeAmount:offer.illustrativePrice,currency:offer.currency,label:'SIMULADO / sin validez tributaria / no se realizó cobro'};
}
