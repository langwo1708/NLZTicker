import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";
export const store=()=>getStore({name:"football-data",consistency:"strong"});
export const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store",...headers}});
export const emptyData=()=>({version:1,teams:[],matches:[],seasons:[],updatedAt:new Date().toISOString()});
export async function readData(){return await store().get("app-data",{type:"json"})||emptyData()}
export async function writeData(data){data.updatedAt=new Date().toISOString();await store().setJSON("app-data",data);return data}
const secret=()=>process.env.SESSION_SECRET||"";
const b64=x=>Buffer.from(x).toString("base64url");
export function makeToken(){const body=b64(JSON.stringify({role:"admin",exp:Date.now()+12*60*60*1000}));const sig=crypto.createHmac("sha256",secret()).update(body).digest("base64url");return body+"."+sig}
export function isAdmin(req){try{if(!secret())return false;const h=req.headers.get("authorization")||"";const token=h.startsWith("Bearer ")?h.slice(7):"";const [body,sig]=token.split(".");const expected=crypto.createHmac("sha256",secret()).update(body).digest("base64url");if(!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))return false;const p=JSON.parse(Buffer.from(body,"base64url").toString());return p.role==="admin"&&p.exp>Date.now()}catch{return false}}
export function cleanPublic(m){if(!m||!m.publicId||!m.liveEnabled)return null;return {id:m.publicId,teamName:m.teamName,opponent:m.opponent,date:m.date,location:m.location,type:m.type,age:m.age,status:m.status,timer:m.timer,events:(m.events||[]).map(e=>({type:e.type,playerName:e.playerName??null,shirtNumber:e.shirtNumber??null,minute:e.minute,elapsedSeconds:e.elapsedSeconds,period:e.period,createdAt:e.createdAt})),substitutions:(m.substitutions||[]).map(s=>({side:s.side,outPlayer:{name:s.outPlayer?.name||null,no:s.outPlayer?.no??null},inPlayer:{name:s.inPlayer?.name||null,no:s.inPlayer?.no??null},minute:s.minute,elapsedSeconds:s.elapsedSeconds,period:s.period,createdAt:s.createdAt}))}}
