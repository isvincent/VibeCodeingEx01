'use strict';
let projects = [], selected = null, installEvent = null;
const $ = s => document.querySelector(s);
const state = { onlyFav: false };
const LEVELS = ['入門', '中階', '進階'];
const catHue = new Map();
const pad = n => String(n).padStart(3, '0');
const safe = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- storage ---------- */
function load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function store(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }
const favorites = new Set(load('vibe-favorites', []));
const saveFav = () => { store('vibe-favorites', [...favorites]); $('#favCount').textContent = favorites.size; };

/* ---------- helpers ---------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2300);
}
function terms() { return $('#search').value.trim().toLowerCase().split(/\s+/).filter(Boolean); }
function hl(text, qs) {
  let out = safe(text);
  if (!qs.length) return out;
  const re = new RegExp('(' + qs.map(q => safe(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'gi');
  return out.replace(re, '<mark>$1</mark>');
}
const star = '<svg class="ico"><use href="#i-star"/></svg>';
const levelBars = lv => { const n = LEVELS.indexOf(lv) + 1; return `<span aria-hidden="true">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`; };

/* ---------- list ---------- */
function filtered() {
  const qs = terms(), cat = $('#category').value, lev = $('#level').value;
  const list = projects.filter(p =>
    (!cat || p.category === cat) && (!lev || p.level === lev) && (!state.onlyFav || favorites.has(p.id)) &&
    qs.every(q => p._hay.includes(q)));
  const sort = $('#sort').value;
  if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hant'));
  if (sort === 'level') list.sort((a, b) => LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level) || a.id - b.id);
  if (sort === 'fav') list.sort((a, b) => Number(favorites.has(b.id)) - Number(favorites.has(a.id)) || a.id - b.id);
  return list;
}
function cardHTML(p, i, qs) {
  const on = favorites.has(p.id);
  const shown = p.fields.slice(0, 4).map(f => `<span>${hl(f, qs)}</span>`).join('');
  const more = p.fields.length > 4 ? `<span class="more">+${p.fields.length - 4}</span>` : '';
  return `<article class="card" style="--h:${catHue.get(p.category)};--i:${i}">
    <div class="illus" aria-hidden="true">${window.Illus ? Illus.illus(p, catHue.get(p.category)) : ''}</div>
    <div class="card__top">
      <span class="cat"><i></i>${safe(p.category)}</span>
      <span class="card__no">#${pad(p.id)}</span>
      <button class="fav ${on ? 'on' : ''}" data-fav="${p.id}" aria-pressed="${on}" aria-label="${on ? '取消收藏' : '收藏'}：${safe(p.title)}">${star}</button>
    </div>
    <h3><button data-open="${p.id}">${hl(p.title, qs)}</button></h3>
    <p class="card__feat">${hl(p.features.join('、'), qs)}</p>
    <div class="fields" aria-label="資料欄位">${shown}${more}</div>
    <div class="card__foot">
      <span class="level">${levelBars(p.level)}${p.level}</span>
      <span class="card__go">查看提示詞<svg class="ico"><use href="#i-arrow"/></svg></span>
    </div>
  </article>`;
}
function render(animate = false) {
  const list = filtered(), qs = terms();
  $('#count').innerHTML = `顯示 <b>${list.length}</b> / ${projects.length} 個專案`;
  $('#empty').hidden = list.length > 0;
  const box = $('#cards');
  box.innerHTML = list.map((p, i) => cardHTML(p, i, qs)).join('');
  if (animate && !reduceMotion) { box.classList.add('intro'); setTimeout(() => box.classList.remove('intro'), 1200); }
}
let debounce;
const renderSoon = () => { clearTimeout(debounce); debounce = setTimeout(() => render(), 120); };

function toggleFav(id) {
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);
  saveFav();
  return favorites.has(id);
}
function syncChips() {
  const cat = $('#category').value;
  $('#chips').querySelectorAll('.chip').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cat === cat)));
}

/* ---------- prompt ---------- */
function buildPrompt(p){let ai=p.category==='AI 智慧自動化';let privacy=['教育與學習','社群與協作','個人生活管理','財務與物品','活動與報名'].includes(p.category);return `# Vibe Coding 專案開發提示詞｜${p.title}（第 ${String(p.id).padStart(3,'0')} 號）

## 1. 角色與任務
你是資深 Google Apps Script 全端工程師、UI/UX 設計師、資安與教學文件撰寫專家。請建立真正可部署、可操作的「${p.title}」完整專案，介面採繁體中文及台灣慣用語。不要只給概念、偽程式碼或省略重要函式。

## 2. 使用對象與視覺設計
主要使用對象：${$('#audience').value}
視覺風格：${$('#theme').value}
網站應具有卡片、圖示、即時互動回饋、空白狀態、載入動畫、操作提示、錯誤提示與成功通知。請確保文字易讀、按鈕適合觸控。

## 3. 本專案專屬核心功能
${p.features.map((f,i)=>`${i+1}. ${f}：提供對應資料輸入、編輯、查詢、狀態變更與清楚的使用者操作流程。`).join('\n')}
4. 加入 ${$('#extra').value}，圖表須能依資料更新。
5. 依專案情境設計首頁概覽、主要工作區、詳細資料頁／對話框、設定區及使用說明頁。
6. 支援資料新增、讀取、修改、刪除（CRUD），刪除前二次確認；重要操作保留稽核紀錄。
7. 為本專案提供至少 3 個具體操作情境，並設計可互動的範例資料與測試按鈕。

## 4. Google 試算表資料庫
請建立初始化函式 setupSheets()，可自動建立工作表、欄位標題及測試資料。
主要資料表建議欄位：${p.fields.join('、')}。
另建立 Settings（設定）、Logs（操作紀錄）工作表。請設計唯一 ID、時間戳記、欄位驗證、分頁查詢與資料格式，並說明每個欄位用途。使用 LockService 防止並行寫入衝突，避免逐格大量存取造成效能問題。

## 5. GAS 後端
使用 Google Apps Script、SpreadsheetApp、HtmlService 與 google.script.run 建立前後端溝通。後端必須驗證輸入資料、檢查使用權限、處理例外並回傳一致格式的結果。提供完整 Code.gs、Config.gs、Database.gs，視需求新增 Services.gs。所有需要的觸發器必須附建立與移除函式，避免重複觸發。${ai?'如使用 Gemini API，API Key 請儲存在 Script Properties，不可寫入前端；設計 API 失敗時的備援提示、用量控管與人工審核。':''}${privacy?'如涉及個資，必須設計最小權限、資料遮罩、資料保留及刪除流程；不要將私人試算表公開。':''}

## 6. RWD 互動式網頁
建立 index.html、style.html、script.html，使用 HTML5、CSS3、原生 JavaScript；可使用內嵌 SVG 圖示。支援手機 360px、平板 768px、桌機 1280px。包含搜尋、篩選、排序、表單即時驗證、載入中狀態、無障礙標籤、鍵盤操作、成功／錯誤提示、確認對話框與互動式統計圖表。請不要使用無法運作的假按鈕。

## 7. PWA 與部署架構
請提供 manifest.webmanifest、service-worker.js、192×192 與 512×512 圖示、安裝指引及離線頁面。務必區分「GitHub Pages 靜態前端」與「GAS HTML Service Web App」兩種部署方式：GAS 網址與 GitHub Pages 網址不同來源，若採 GitHub Pages 呼叫 GAS，不可假設 google.script.run 可跨網域運作，必須提供經測試可行的 API、驗證及 CORS 策略；若不適合，優先將可操作的主系統部署在 GAS Web App，GitHub Pages 作介紹入口。說明 GAS Web App 的 PWA/Service Worker 支援限制，不可宣稱兩種部署完全相同。

## 8. 操作指引（必須完整）
請以初學者可照做的方式逐步寫出：①建立 Google 試算表；②建立 Apps Script 專案；③建立及貼入每一個程式檔案；④設定 Spreadsheet ID 與必要權限；⑤執行初始化；⑥授權；⑦部署 Web App；⑧取得網址；⑨在手機及電腦操作；⑩設定觸發器（如適用）；⑪更新版本；⑫備份與排除常見錯誤。每一步提供預期結果及檢核方式。

## 9. GitHub 完整交付
提供完整資料夾樹狀結構、所有檔案的完整原始碼、README.md、部署說明、測試資料、功能驗收清單及常見問題。首頁名稱必須是 index.html。可直接上傳 GitHub 的檔案與 GAS 專案檔案請分開整理。不可將金鑰、私人試算表 ID 或個資提交至公開儲存庫。

## 10. 測試與驗收
提供至少 10 個測試案例，包含正常新增、修改、刪除、空值、重複資料、權限不足、網路錯誤、手機畫面、排程（如適用）及資料量增加。明確區分已實測與尚待部署測試的項目，絕不虛構測試成功。

請先給出系統規格與檔案架構，接著逐檔提供可直接使用的完整程式碼，最後給出部署與操作教學。若篇幅太長，請分階段輸出，並確保所有檔案都能完整取得。`}

function updatePrompt(flash) {
  const t = $('#prompt');
  t.value = buildPrompt(selected);
  $('#promptLen').textContent = `${t.value.length.toLocaleString()} 字`;
  if (flash && !reduceMotion) { t.classList.remove('updated'); void t.offsetWidth; t.classList.add('updated'); }
}
function syncModalFav() {
  const on = favorites.has(selected.id), b = $('#modalFav');
  b.setAttribute('aria-pressed', String(on));
  b.setAttribute('aria-label', on ? '取消收藏' : '收藏');
}
function openProject(id, { updateHash = true } = {}) {
  selected = projects.find(p => p.id === id);
  if (!selected) return;
  const d = $('#detail');
  d.style.setProperty('--h', catHue.get(selected.category));
  $('#modalCat').innerHTML = `<span class="cat" style="--c:oklch(var(--cat-l) var(--cat-c) ${catHue.get(selected.category)});--cs:oklch(var(--cat-soft-l) var(--cat-soft-c) ${catHue.get(selected.category)})"><i></i>${safe(selected.category)}</span><span class="mono">#${pad(id)}</span><span class="level" style="--c:var(--brand)">${levelBars(selected.level)}${selected.level}</span>`;
  $('#modalTitle').textContent = selected.title;
  $('#modalIllus').innerHTML = window.Illus ? Illus.illus(selected, catHue.get(selected.category)) : '';
  $('#featureList').innerHTML = selected.features.map(f => `<li>${safe(f)}</li>`).join('');
  $('#fieldList').innerHTML = selected.fields.map(f => `<span>${safe(f)}</span>`).join('');
  syncModalFav();
  updatePrompt(false);
  $('#prompt').scrollTop = 0;
  if (!d.open) d.showModal();
  if (updateHash) history.replaceState(null, '', `#p-${pad(id)}`);
}
function clearHash() { if (/^#p-\d+$/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search); }
function openFromHash() {
  const m = location.hash.match(/^#p-(\d+)$/);
  if (m) openProject(Number(m[1]), { updateHash: false });
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy'); ta.remove(); return ok;
  }
}
async function copyPrompt() {
  const ok = await copyText($('#prompt').value), b = $('#copy');
  if (!ok) { toast('無法自動複製，請手動選取文字'); return; }
  b.classList.add('done');
  b.querySelector('use').setAttribute('href', '#i-check');
  b.querySelector('span').textContent = '已複製！貼到 AI 對話框即可';
  setTimeout(() => { b.classList.remove('done'); b.querySelector('use').setAttribute('href', '#i-copy'); b.querySelector('span').textContent = '複製完整提示詞'; }, 1800);
}
function downloadPrompt() {
  const blob = new Blob(['﻿' + $('#prompt').value], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = `VibeCoding-${pad(selected.id)}-${selected.title}.txt`; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('已下載提示詞 .txt');
}
function randomProject() {
  const pool = filtered().length ? filtered() : projects;
  openProject(pool[Math.floor(Math.random() * pool.length)].id);
}

/* ---------- hero sheet demo ---------- */
function startSheet() {
  const grid = $('#sheetGrid'), out = $('#sheetPrompt'), name = $('#sheetName');
  let timer, idx = Math.floor(Math.random() * projects.length);
  const widths = ['62%', '80%', '48%', '70%', '55%', '76%'];
  const HUES = [25, 80, 150, 200, 265, 320];
  function draw(p) {
    const n = Math.min(p.fields.length, matchMedia('(max-width:640px)').matches ? 4 : 6);
    grid.style.gridTemplateColumns = `32px repeat(${n}, minmax(0,1fr))`;
    let h = '<span class="col"></span>';
    for (let c = 0; c < n; c++) h += `<span class="col c${c + 1}">${'ABCDEF'[c]}</span>`;
    h += '<span class="rown">1</span>' + p.fields.slice(0, n).map((f, c) => `<span class="hd c${c + 1}" style="--h:${HUES[c]}">${safe(f)}</span>`).join('');
    for (let r = 2; r <= 4; r++) {
      h += `<span class="rown">${r}</span>`;
      for (let c = 0; c < n; c++) h += `<span class="sk c${c + 1}" style="--w:${widths[(r + c) % 6]};--h:${HUES[c]}"></span>`;
    }
    grid.innerHTML = h;
    name.textContent = `#${pad(p.id)} ${p.title}`;
    const lines = [
      `<b># ${safe(p.title)}</b>`,
      `分類：${safe(p.category)}｜難度：${p.level}`,
      `核心功能：${safe(p.features.join('、'))}`,
      `資料欄位：${safe(p.fields.join('、'))}`,
      `→ 產生 10 節完整開發提示詞`
    ];
    if (reduceMotion) { out.innerHTML = lines.join('\n'); return; }
    // type out plain text, then swap in formatted lines
    const plain = lines.map(l => l.replace(/<[^>]+>/g, '')).join('\n').replace(/&amp;/g, '&');
    let i = 0;
    (function type() {
      i += 2;
      if (i < plain.length) { out.innerHTML = safe(plain.slice(0, i)) + '<span class="caret"></span>'; timer = setTimeout(type, 22); }
      else { out.innerHTML = lines.join('\n') + '<span class="caret"></span>'; timer = setTimeout(next, 3200); }
    })();
  }
  function next() {
    if (document.hidden) { timer = setTimeout(next, 1000); return; }
    idx = (idx + 1 + Math.floor(Math.random() * 7)) % projects.length;
    grid.style.opacity = 0;
    setTimeout(() => { draw(projects[idx]); grid.style.opacity = 1; }, 250);
  }
  draw(projects[idx]);
  if (reduceMotion) return;
}

/* ---------- theme ---------- */
function setupTheme() {
  $('#themeToggle').addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const nxt = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nxt;
    try { localStorage.setItem('vibe-theme', nxt); } catch {}
  });
}

/* ---------- init ---------- */
async function init() {
  try {
    const r = await fetch('./projects.json');
    if (!r.ok) throw Error('無法讀取資料');
    projects = await r.json();
  } catch (e) {
    $('#cards').innerHTML = '<div class="empty"><p class="empty__title">資料載入失敗</p><p>請透過 GitHub Pages 或本機 HTTP 伺服器（例如 <code>python -m http.server</code>）開啟網站。</p></div>';
    console.error(e); return;
  }
  projects.forEach(p => { p._hay = [p.title, p.category, p.level, ...p.features, ...p.fields].join(' ').toLowerCase(); });
  const cats = [...new Set(projects.map(p => p.category))];
  cats.forEach((c, i) => catHue.set(c, Math.round((265 + i * 36) % 360)));
  $('#statTotal').textContent = projects.length;
  $('#statCats').textContent = cats.length;
  $('#category').insertAdjacentHTML('beforeend', cats.map(c => `<option value="${safe(c)}">${safe(c)}</option>`).join(''));
  const count = c => projects.filter(p => p.category === c).length;
  $('#chips').innerHTML = `<button class="chip" data-cat="" aria-pressed="true">全部<small>${projects.length}</small></button>` +
    cats.map(c => `<button class="chip chip--cat" data-cat="${safe(c)}" aria-pressed="false" style="--h:${catHue.get(c)}"><i></i>${safe(c)}<small>${count(c)}</small></button>`).join('');
  $('#favCount').textContent = favorites.size;
  render(true);
  startSheet();
  openFromHash();
}

/* events */
$('#search').addEventListener('input', renderSoon);
['category', 'level', 'sort'].forEach(id => $('#' + id).addEventListener('change', () => { if (id === 'category') syncChips(); render(); }));
$('#chips').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  $('#category').value = b.dataset.cat; syncChips(); render();
});
$('#cards').addEventListener('click', e => {
  const f = e.target.closest('[data-fav]');
  if (f) {
    const on = toggleFav(Number(f.dataset.fav));
    f.classList.toggle('on', on); f.setAttribute('aria-pressed', String(on));
    f.setAttribute('aria-label', (on ? '取消收藏' : '收藏') + f.getAttribute('aria-label').replace(/^.*?：/, '：'));
    f.classList.remove('pop'); void f.offsetWidth; if (on) f.classList.add('pop');
    toast(on ? '已加入收藏' : '已取消收藏');
    if (state.onlyFav || $('#sort').value === 'fav') render();
    return;
  }
  const card = e.target.closest('.card');
  if (card) openProject(Number(card.querySelector('[data-open]').dataset.open));
});
$('#onlyFav').addEventListener('click', () => {
  state.onlyFav = !state.onlyFav;
  $('#onlyFav').setAttribute('aria-pressed', String(state.onlyFav));
  render();
});
$('#resetFilters').addEventListener('click', () => {
  $('#search').value = ''; $('#category').value = ''; $('#level').value = ''; state.onlyFav = false;
  $('#onlyFav').setAttribute('aria-pressed', 'false'); syncChips(); render();
});
document.querySelectorAll('[data-random]').forEach(b => b.addEventListener('click', randomProject));
$('#close').addEventListener('click', () => $('#detail').close());
$('#detail').addEventListener('click', e => { if (e.target === $('#detail')) $('#detail').close(); });
$('#detail').addEventListener('close', clearHash);
$('#modalFav').addEventListener('click', () => { const on = toggleFav(selected.id); syncModalFav(); toast(on ? '已加入收藏' : '已取消收藏'); render(); });
$('#shareLink').addEventListener('click', async () => {
  const url = location.href.split('#')[0] + `#p-${pad(selected.id)}`;
  toast(await copyText(url) ? '已複製專案連結，可直接分享' : '無法複製連結');
});
['audience', 'theme', 'extra'].forEach(id => $('#' + id).addEventListener('change', () => updatePrompt(true)));
$('#copy').addEventListener('click', copyPrompt);
$('#download').addEventListener('click', downloadPrompt);
window.addEventListener('hashchange', openFromHash);
document.addEventListener('keydown', e => {
  if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !$('#detail').open) {
    e.preventDefault(); $('#search').focus();
  }
});
const toolbar = document.querySelector('.toolbar');
window.addEventListener('scroll', () => {
  const top = parseFloat(getComputedStyle(toolbar).top);
  toolbar.classList.toggle('stuck', toolbar.getBoundingClientRect().top <= top + 1);
}, { passive: true });
setupTheme();
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvent = e; $('#install').hidden = false; });
$('#install').addEventListener('click', async () => {
  if (!installEvent) return;
  installEvent.prompt(); await installEvent.userChoice; installEvent = null; $('#install').hidden = true;
});
if ('serviceWorker' in navigator && location.protocol.startsWith('http'))
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(console.warn));
init();
