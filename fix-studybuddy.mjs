#!/usr/bin/env node
/** StudyBuddy: fix React is not defined. No third-party packages required. */
import {readFile,writeFile,mkdir,copyFile,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

async function exists(p){try{await access(p);return true}catch{return false}}
async function main(){
  const args=process.argv.slice(2);
  const explicit=args.find(x=>!x.startsWith('--'));
  const here=path.dirname(fileURLToPath(import.meta.url));
  const candidates=explicit?[path.resolve(explicit)]:[process.cwd(),here,path.join(process.cwd(),'studybuddy-react'),path.join(here,'studybuddy-react'),path.dirname(here)];
  let root;
  for(const dir of candidates){if(await exists(path.join(dir,'src/pages/Home.jsx'))&&await exists(path.join(dir,'package.json'))){root=dir;break}}
  if(!root)throw new Error('Khong tim thay du an. Dat file .mjs cung thu muc package.json, hoac chay: node fix-studybuddy.mjs "DUONG_DAN_DU_AN"');
  const pages=['Home','Flashcards','Quiz','Chat'];
  const changes=[];
  for(const name of pages){
    const relative='src/pages/'+name+'.jsx';
    const file=path.join(root,relative);
    const original=await readFile(file,'utf8');
    let content=original;
    if(!(/import\s+React\s*[,\s]/.test(content)||/import\s+\*\s+as\s+React\s+from/.test(content))){
      const pattern=/import\s*\{\s*useEffect\s*,\s*useRef\s*\}\s*from\s*(['"])react\1\s*;/;
      if(!pattern.test(content))throw new Error('Cau truc '+relative+' khac ban goc; dung lai de tranh sua nham.');
      content=content.replace(pattern,"import React, {useEffect,useRef} from 'react';");
    }
    for(const [from,to] of Object.entries({oninput:'onInput',viewbox:'viewBox',preserveaspectratio:'preserveAspectRatio','stroke-linecap':'strokeLinecap','stroke-width':'strokeWidth','fill-opacity':'fillOpacity'})){
      content=content.replace(new RegExp('\\b'+from+'=', 'g'),to+'=');
    }
    if(content!==original)changes.push({file,relative,content});
    else console.log('[OK] '+relative+' da duoc cap nhat.');
  }
  if(changes.length){
    const backup=path.join(root,'.studybuddy-backups','fix-react-'+new Date().toISOString().replace(/[:.]/g,'-'));
    for(const item of changes){const target=path.join(backup,item.relative);await mkdir(path.dirname(target),{recursive:true});await copyFile(item.file,target)}
    for(const item of changes){await writeFile(item.file,item.content,'utf8');console.log('[FIXED] '+item.relative)}
    console.log('Da sao luu tai: '+backup);
  }else console.log('Ban sua da duoc ap dung truoc do.');
  if(args.includes('--no-build')){console.log('Hay chay npm run build truoc khi cap nhat hosting.');return}
  if(!(await exists(path.join(root,'node_modules/vite/package.json')))){
    console.log('Da sua source. Can chay npm install va npm run build trong thu muc du an.');return;
  }
  console.log('Dang build lai du an...');
  const result=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['run','build'],{cwd:root,stdio:'inherit',shell:process.platform==='win32'});
  if(result.error)throw result.error;
  if(result.status!==0)throw new Error('Da sua import, nhung build chua thanh cong. Xem loi ben tren; ban sao luu van duoc giu.');
  console.log('HOAN TAT. Chay npm run dev de xem; neu dung hosting, upload lai NOI DUNG dist va nhan Ctrl+F5.');
}
main().catch(error=>{console.error('\nLOI: '+error.message);process.exitCode=1});
