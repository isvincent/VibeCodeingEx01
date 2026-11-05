'use strict';
/* 每個專案的示意插圖：主圖示 + 副圖示 + 應用畫面版型，全部以 SVG 即時繪製，隨分類色與深淺模式變色 */
(function () {
  const I = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    cake: '<path d="M4 20h16v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path d="M4 15.5c2 1.5 4 1.5 5.3 0 1.4 1.5 4 1.5 5.4 0 1.3 1.5 3.3 1.5 5.3 0M12 11V7.5"/><path d="M12 3.5c1 1 1 2.2 0 3-1-.8-1-2 0-3z"/>',
    gift: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8c-1.5-3-5-3.5-5-1.2C7 8 9.5 8 12 8s5 0 5-1.2C17 4.5 13.5 5 12 8z"/>',
    news: '<rect x="3" y="4" width="15" height="16" rx="2"/><path d="M18 8h3v10a2 2 0 0 1-2 2M7 8h7M7 12h7M7 16h4"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle class="f" cx="8.5" cy="14.5" r="1.2"/><circle class="f" cx="12.5" cy="14.5" r="1.2"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 11h6M9 14.5h6M9 18h3.5"/>',
    certificate: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M7 8h10M7 11h5"/><circle cx="16" cy="16.5" r="3"/><path d="m14.5 19.2-.6 2.8 2.1-1 2.1 1-.6-2.8"/>',
    check: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="m8 12.2 3 3 5-6"/>',
    toggle: '<rect x="2.5" y="7" width="19" height="10" rx="5"/><circle class="f" cx="16.5" cy="12" r="3"/>',
    chart: '<path d="M4 4v16h16"/><path d="M8.5 16v-4M12.5 16V8M16.5 16v-6"/>',
    list: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="m3.5 6 1.3 1.3L7 5M3.5 12l1.3 1.3L7 11"/><circle cx="5" cy="18" r="1.4"/>',
    cart: '<path d="M3 4h2.2l2.3 11h10.7l2-8H6.2"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
    flame: '<path d="M12 21c-3.8 0-6.5-2.6-6.5-6 0-3.5 3-5.5 3.5-9 2 1.2 3 3 3 4.5 1-1 1.5-2 1.5-3.5 2.5 1.8 4.5 4.6 4.5 8 0 3.4-2.5 6-6 6z"/>',
    pill: '<rect x="2.8" y="8.5" width="18.4" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="m8.5 8.5 7 7"/>',
    tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
    shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
    home: '<path d="M4 11 12 4l8 7"/><path d="M6 9.5V20h12V9.5M10 20v-5h4v5"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.5"/>',
    idcard: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 16c.8-1.8 5.2-1.8 6 0M14 10h4M14 13.5h3"/>',
    smile: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 14.5c1.8 2 5.2 2 7 0"/><circle class="f" cx="9" cy="9.8" r="1.2"/><circle class="f" cx="15" cy="9.8" r="1.2"/>',
    form: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.8h6V4M8.5 10h7M8.5 14h7M8.5 18h4"/>',
    qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2.5v2.5H14zM18 18h2v2h-2zM14 19.5h1.5M19 14h1"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.2 2"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10.5 21v-4h3v4"/>',
    laptop: '<rect x="5" y="5" width="14" height="10" rx="1.5"/><path d="M3 19h18l-2-4H5z"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19c.5-3.5 2.8-5 5.5-5s5 1.5 5.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14.2c2.2.1 3.6 1.6 4 4.8"/>',
    bowl: '<path d="M3.5 11h17a8.5 8.5 0 0 1-17 0z"/><path d="M8 8c0-1.5 1-1.5 1-3.5M12 8c0-1.5 1-1.5 1-3.5M16 8c0-1.5 1-1.5 1-3.5"/>',
    heart: '<path d="M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.5 4.3 4.3 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10z"/>',
    star: '<path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/>',
    ticket: '<path d="M3.5 6.5h17v3.5a2 2 0 0 0 0 4v3.5h-17V14a2 2 0 0 0 0-4z"/><path d="M14.5 7v2M14.5 11v2M14.5 15v2"/>',
    pencil: '<path d="m4 20 1-4L16 5l3 3L8 19z"/><path d="m14 7 3 3"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    quiz: '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5v.5"/><circle class="f" cx="12" cy="16.8" r="1.1"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
    dice: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle class="f" cx="8.5" cy="8.5" r="1.4"/><circle class="f" cx="12" cy="12" r="1.4"/><circle class="f" cx="15.5" cy="15.5" r="1.4"/>',
    vote: '<path d="M4 13h16v7H4z"/><path d="M8 13V4.5h8V13"/><path d="m10 9 1.5 1.5L14 8"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20.5h6M10 17h4v3.5h-4z"/>',
    share: '<circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="m8.3 10.8 6.4-3.6M8.3 13.2l6.4 3.6"/>',
    book: '<path d="M12 6.5c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5z"/><path d="M12 6.5v13"/>',
    medal: '<circle cx="12" cy="14.5" r="5"/><path d="M9 10 6.5 3h4L12 6.5 13.5 3h4L15 10"/><path d="m12 12.5.8 1.5 1.6.2-1.2 1.1.3 1.6-1.5-.8-1.5.8.3-1.6-1.2-1.1 1.6-.2z"/>',
    barcode: '<path d="M4 6v12M7 6v12M10.5 6v12M14 6v12M17 6v12M20 6v12"/><path d="M5.5 6v12M15.5 6v12" stroke-width=".9"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L11.5 19.5a2.1 2.1 0 0 1-3-3z"/><path d="M14.7 6.3 17 4l3 3-2.3 2.3"/>',
    compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    wallet: '<path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1z"/><path d="M4 7l11-3v3"/><circle class="f" cx="16" cy="13.5" r="1.3"/>',
    coin: '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.2c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2 0 2.8 5.5 1.5 5.5 4.5 0 1.2-1.2 2-2.8 2-1.2 0-2.3-.6-2.7-1.6M12 6v1.5M12 16.5V18"/>',
    repeat: '<path d="M4.5 12a7 7 0 0 1 12-5l2 2M19.5 12a7 7 0 0 1-12 5l-2-2"/><path d="M18.5 4v5h-5M5.5 20v-5h5"/>',
    gauge: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 17 4-5"/><circle class="f" cx="12" cy="17" r="1.5"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><circle class="f" cx="9" cy="12" r="1.1"/><circle class="f" cx="12" cy="12" r="1.1"/><circle class="f" cx="15" cy="12" r="1.1"/><circle class="f" cx="9" cy="16" r="1.1"/><circle class="f" cx="12" cy="16" r="1.1"/><circle class="f" cx="15" cy="16" r="1.1"/>',
    box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
    apple: '<path d="M12 8.5c-2-1.5-6-1-6 3.5S9 20.5 12 19.5c3 1 6-3 6-7.5s-4-5-6-3.5z"/><path d="M12 8.5c0-2 1-3.5 3-4"/>',
    tag: '<path d="M3.5 12.5V4H12l8.5 8.5-8 8z"/><circle cx="8" cy="8.5" r="1.4"/>',
    car: '<path d="M4 16v-4l2-5h12l2 5v4z"/><path d="M4 12h16"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/>',
    trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    pie: '<path d="M11 4a8 8 0 1 0 9 9h-9z"/><path d="M14 2.8A8 8 0 0 1 21.2 10H14z"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle class="f" cx="12" cy="12" r="1.3"/>',
    filter: '<path d="M4 5h16l-6 7.5V19l-4-2v-4.5z"/>',
    layers: '<path d="m12 4 9 4.5-9 4.5-9-4.5z"/><path d="m3 13 9 4.5 9-4.5"/>',
    table: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15"/>',
    filedown: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M12 10v6m0 0-2.5-2.5M12 16l2.5-2.5"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
    send: '<path d="M21 3 3 10.5l7 2.5 2.5 7z"/><path d="m10 13 11-10"/>',
    cards: '<rect x="8" y="3.5" width="12" height="15" rx="2"/><path d="M5 7v11.5a2 2 0 0 0 2 2h9"/>',
    quote: '<path d="M5 17.5c0-4.5 1-7.5 4.5-9M5 13h4v4.5H5zM13 17.5c0-4.5 1-7.5 4.5-9M13 13h4v4.5h-4z"/>',
    pot: '<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M2.5 10h19M9 7c0-1 1-1 1-2.5M14 7c0-1 1-1 1-2.5"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',
    scissors: '<circle cx="6.5" cy="7" r="2.5"/><circle cx="6.5" cy="17" r="2.5"/><path d="M8.6 8.5 20 17M8.6 15.5 20 7"/>',
    timeline: '<path d="M6 4v16"/><circle cx="6" cy="7" r="2"/><circle cx="6" cy="17" r="2"/><path d="M11 7h9M11 17h7M11 12h5"/>',
    kanban: '<rect x="3.5" y="4" width="5" height="15" rx="1.2"/><rect x="9.5" y="4" width="5" height="9" rx="1.2"/><rect x="15.5" y="4" width="5" height="12" rx="1.2"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    contact: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M8.5 16.5c.7-2 6.3-2 7 0M3 7h2M3 12h2M3 17h2"/>',
    swap: '<path d="M4 8h15l-3.5-3.5M20 16H5l3.5 3.5"/>',
    megaphone: '<path d="M4 10v4h3l8 4V6l-8 4z"/><path d="M18 9.5a3.5 3.5 0 0 1 0 5M7 14l1.5 5H11l-1-4"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    alert: '<path d="M12 4 2.8 19.5h18.4z"/><path d="M12 10v4.5"/><circle class="f" cx="12" cy="17" r="1.1"/>',
    sparkle: '<path d="M11 3c.8 4.2 2.8 6.2 7 7-4.2.8-6.2 2.8-7 7-.8-4.2-2.8-6.2-7-7 4.2-.8 6.2-2.8 7-7z"/><path d="M19 15c.3 1.5 1 2.2 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.3 2.2-1 2.5-2.5z"/>',
    lang: '<path d="M4 6h9M8.5 4v2M6 6c.5 3.5 2.5 6 6 7.5M11 6c-.5 3.5-2.5 6-6 7.5"/><path d="m13 20.5 3.5-8 3.5 8M14.2 18h4.6"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3.5" y="13" width="4" height="6" rx="1.5"/><rect x="16.5" y="13" width="4" height="6" rx="1.5"/><path d="M18.5 19c0 1.5-2 2.5-5 2.5"/>'
  };

  /* id: [主圖示, 副圖示, 畫面版型] */
  const M = {
    1: ['cake', 'mail', 'list'], 2: ['gift', 'mail', 'cards'], 3: ['news', 'send', 'doc'], 4: ['receipt', 'bell', 'list'], 5: ['calendar', 'bell', 'calendar'],
    6: ['doc', 'mail', 'form'], 7: ['certificate', 'send', 'doc'], 8: ['check', 'alert', 'list'], 9: ['toggle', 'mail', 'form'], 10: ['chart', 'send', 'bars'],
    11: ['list', 'check', 'list'], 12: ['cart', 'users', 'list'], 13: ['calendar', 'home', 'calendar'], 14: ['flame', 'check', 'calendar'], 15: ['pill', 'bell', 'list'],
    16: ['shield', 'tv', 'list'], 17: ['home', 'check', 'list'], 18: ['pin', 'wallet', 'timeline'], 19: ['idcard', 'clock', 'list'], 20: ['smile', 'pencil', 'calendar'],
    21: ['form', 'users', 'form'], 22: ['qr', 'check', 'bars'], 23: ['clock', 'chart', 'table'], 24: ['building', 'calendar', 'calendar'], 25: ['laptop', 'clock', 'table'],
    26: ['users', 'bell', 'rank'], 27: ['bowl', 'pie', 'pie'], 28: ['heart', 'calendar', 'table'], 29: ['star', 'chart', 'bars'], 30: ['ticket', 'gift', 'cards'],
    31: ['pencil', 'check', 'list'], 32: ['folder', 'star', 'timeline'], 33: ['quiz', 'check', 'form'], 34: ['grid', 'users', 'seats'], 35: ['dice', 'users', 'cards'],
    36: ['vote', 'chart', 'bars'], 37: ['flag', 'trend', 'line'], 38: ['trophy', 'star', 'rank'], 39: ['share', 'folder', 'cards'], 40: ['flag', 'users', 'board'],
    41: ['book', 'star', 'cards'], 42: ['medal', 'book', 'seats'], 43: ['book', 'send', 'form'], 44: ['book', 'clock', 'list'], 45: ['book', 'bell', 'list'],
    46: ['qr', 'star', 'seats'], 47: ['barcode', 'check', 'table'], 48: ['trophy', 'book', 'rank'], 49: ['wrench', 'image', 'form'], 50: ['compass', 'qr', 'timeline'],
    51: ['wallet', 'pie', 'pie'], 52: ['coin', 'users', 'bars'], 53: ['repeat', 'bell', 'list'], 54: ['gauge', 'alert', 'bars'], 55: ['calc', 'users', 'table'],
    56: ['box', 'home', 'table'], 57: ['apple', 'clock', 'list'], 58: ['tag', 'coin', 'cards'], 59: ['car', 'wrench', 'timeline'], 60: ['tag', 'trend', 'line'],
    61: ['form', 'chart', 'bars'], 62: ['table', 'pie', 'pie'], 63: ['users', 'trend', 'line'], 64: ['chat', 'check', 'list'], 65: ['clock', 'chart', 'bars'],
    66: ['target', 'trend', 'line'], 67: ['filter', 'table', 'table'], 68: ['layers', 'table', 'table'], 69: ['table', 'chart', 'bars'], 70: ['filedown', 'chart', 'doc'],
    71: ['code', 'pencil', 'doc'], 72: ['bookmark', 'tag', 'list'], 73: ['send', 'calendar', 'doc'], 74: ['cards', 'bulb', 'cards'], 75: ['quote', 'dice', 'doc'],
    76: ['pot', 'heart', 'cards'], 77: ['quiz', 'chat', 'list'], 78: ['image', 'star', 'cards'], 79: ['scissors', 'bookmark', 'doc'], 80: ['timeline', 'image', 'timeline'],
    81: ['kanban', 'users', 'board'], 82: ['chat', 'check', 'doc'], 83: ['bulb', 'vote', 'bars'], 84: ['users', 'idcard', 'table'], 85: ['contact', 'filter', 'list'],
    86: ['swap', 'calendar', 'table'], 87: ['box', 'check', 'list'], 88: ['megaphone', 'check', 'doc'], 89: ['eye', 'check', 'form'], 90: ['alert', 'image', 'timeline'],
    91: ['lang', 'sparkle', 'cards'], 92: ['sparkle', 'doc', 'doc'], 93: ['mail', 'sparkle', 'chat'], 94: ['filter', 'sparkle', 'board'], 95: ['quiz', 'sparkle', 'form'],
    96: ['bulb', 'sparkle', 'line'], 97: ['sparkle', 'bulb', 'cards'], 98: ['headset', 'sparkle', 'chat'], 99: ['mic', 'sparkle', 'doc'], 100: ['chart', 'sparkle', 'doc']
  };

  function rng(seed) { // mulberry32
    return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  const r1 = n => Math.round(n * 10) / 10;

  /* 視窗內容區：x 162–290、y 46–124 */
  function screen(type, R) {
    const X = 162, Y = 46, W = 128, H = 78;
    let s = '';
    const bar = (x, y, w, cls = 'il-s', h = 6) => `<rect class="${cls}" x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${h}" rx="${h / 2}"/>`;
    switch (type) {
      case 'list':
        for (let i = 0; i < 4; i++) {
          const y = Y + 4 + i * 19, done = R() > .45;
          s += `<rect class="${done ? 'il-a' : 'il-o'}" x="${X}" y="${y - 3}" width="12" height="12" rx="3"/>`;
          if (done) s += `<path class="il-tick" d="m${X + 3} ${y + 3} 2.5 2.5 4.5-5"/>`;
          s += bar(X + 20, y + .5, 50 + R() * 50, done ? 'il-s' : 'il-b');
        }
        break;
      case 'cards':
        for (let i = 0; i < 4; i++) {
          const x = X + (i % 2) * 66, y = Y + Math.floor(i / 2) * 40;
          s += `<rect class="il-p" x="${x}" y="${y}" width="60" height="34" rx="6"/><rect class="${i === 0 ? 'il-a' : 'il-b'}" x="${x}" y="${y}" width="60" height="14" rx="6"/>` + bar(x + 6, y + 21, 26 + R() * 20, 'il-s', 5);
        }
        break;
      case 'doc':
        s += bar(X, Y + 2, 80, 'il-a', 9);
        for (let i = 0; i < 5; i++) s += bar(X, Y + 20 + i * 12, i === 4 ? 50 : 100 + R() * 26);
        break;
      case 'calendar':
        for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
          const k = R(), cls = k > .86 ? 'il-a' : k > .7 ? 'il-b' : 'il-p';
          s += `<rect class="${cls}" x="${X + c * 21.5}" y="${Y + r * 20}" width="17" height="16" rx="4"/>`;
        }
        break;
      case 'form':
        for (let i = 0; i < 3; i++) { s += bar(X, Y + i * 22, 30, 'il-s', 5) + `<rect class="il-p" x="${X}" y="${Y + 8 + i * 22}" width="${W}" height="10" rx="4"/>`; }
        s += `<rect class="il-a" x="${X + W - 46}" y="${Y + 68}" width="46" height="11" rx="5.5"/>`;
        break;
      case 'bars':
        for (let i = 0; i < 6; i++) { const h = 18 + R() * 56; s += `<rect class="${i === 3 ? 'il-a' : 'il-b'}" x="${X + 4 + i * 21}" y="${r1(Y + H - h)}" width="13" height="${r1(h)}" rx="3"/>`; }
        s += `<path class="il-axis" d="M${X} ${Y + H + .5}h${W}"/>`;
        break;
      case 'line': {
        let pts = [];
        for (let i = 0; i < 7; i++) pts.push([X + i * (W / 6), Y + 12 + (1 - i / 6) * 40 + (R() - .5) * 26]);
        const d = pts.map((p, i) => (i ? 'L' : 'M') + r1(p[0]) + ' ' + r1(p[1])).join('');
        s += `<path class="il-area" d="${d}L${X + W} ${Y + H}L${X} ${Y + H}Z"/><path class="il-line" d="${d}"/>`;
        const last = pts[pts.length - 1];
        s += `<circle class="il-a" cx="${r1(last[0])}" cy="${r1(last[1])}" r="4.5"/>`;
        break;
      }
      case 'pie': {
        const cx = X + 36, cy = Y + 39, rr = 30, a = .25 + R() * .3, b = a + .2 + R() * .2;
        const pt = t => [r1(cx + rr * Math.sin(t * 2 * Math.PI)), r1(cy - rr * Math.cos(t * 2 * Math.PI))];
        const arc = (t0, t1, cls) => { const p0 = pt(t0), p1 = pt(t1); return `<path class="${cls}" d="M${cx} ${cy}L${p0[0]} ${p0[1]}A${rr} ${rr} 0 ${t1 - t0 > .5 ? 1 : 0} 1 ${p1[0]} ${p1[1]}Z"/>`; };
        s += arc(0, a, 'il-a') + arc(a, b, 'il-c2') + arc(b, 1, 'il-b') + `<circle class="il-hole" cx="${cx}" cy="${cy}" r="13"/>`;
        s += [['il-a', 0], ['il-c2', 1], ['il-b', 2]].map(([c, i]) => `<rect class="${c}" x="${X + 82}" y="${Y + 18 + i * 16}" width="8" height="8" rx="2"/>` + bar(X + 94, Y + 19 + i * 16, 22 + R() * 12)).join('');
        break;
      }
      case 'table':
        for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++)
          s += `<rect class="${r === 0 ? 'il-b' : (R() > .85 ? 'il-a' : 'il-p')}" x="${X + c * 32.5}" y="${Y + r * 16}" width="30" height="13" rx="2.5"/>`;
        break;
      case 'rank':
        for (let i = 0; i < 4; i++) {
          const w = 108 - i * 22 - R() * 8;
          s += `<circle class="${i === 0 ? 'il-c2' : 'il-b'}" cx="${X + 6}" cy="${Y + 8 + i * 19}" r="6"/><rect class="${i === 0 ? 'il-a' : 'il-b'}" x="${X + 18}" y="${Y + 3 + i * 19}" width="${r1(w)}" height="10" rx="5"/>`;
        }
        break;
      case 'timeline':
        s += `<path class="il-axis" d="M${X + 8} ${Y}v${H}"/>`;
        for (let i = 0; i < 3; i++) {
          const y = Y + 10 + i * 27;
          s += `<circle class="${i === 1 ? 'il-a' : 'il-b'}" cx="${X + 8}" cy="${y}" r="6"/>` + `<rect class="il-p" x="${X + 22}" y="${y - 9}" width="${W - 22}" height="18" rx="5"/>` + bar(X + 29, y - 3, 40 + R() * 45);
        }
        break;
      case 'seats':
        for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
          const k = R();
          s += `<circle class="${k > .7 ? 'il-a' : k > .45 ? 'il-b' : 'il-p'}" cx="${X + 10 + c * 21.5}" cy="${Y + 10 + r * 19.5}" r="7.5"/>`;
        }
        break;
      case 'board':
        for (let c = 0; c < 3; c++) {
          const x = X + c * 44;
          s += `<rect class="il-p" x="${x}" y="${Y}" width="40" height="${H}" rx="6"/>` + bar(x + 6, Y + 6, 20, c === 2 ? 'il-a' : 'il-s', 5);
          const n = 1 + Math.floor(R() * 3);
          for (let k = 0; k < n; k++) s += `<rect class="${c === 1 && k === 0 ? 'il-a' : 'il-b'}" x="${x + 5}" y="${Y + 17 + k * 19}" width="30" height="15" rx="4"/>`;
        }
        break;
      case 'chat':
        s += `<rect class="il-p" x="${X}" y="${Y}" width="84" height="18" rx="9"/>` + bar(X + 8, Y + 6, 54);
        s += `<rect class="il-a" x="${X + W - 90}" y="${Y + 26}" width="90" height="26" rx="10"/>`;
        s += `<rect class="il-p" x="${X}" y="${Y + 60}" width="64" height="18" rx="9"/>` + bar(X + 8, Y + 66, 36);
        s += `<path class="il-spark" d="M${X + W - 10} ${Y + 64}l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>`;
        break;
    }
    return s;
  }

  function illus(p, hue) {
    const [main, sub, layout] = M[p.id] || ['doc', 'star', 'doc'];
    const R = rng(p.id * 9973);
    const h2 = (hue + 150 + Math.round(R() * 40)) % 360;
    let deco = '';
    for (let i = 0; i < 5; i++) {
      const x = r1(12 + R() * 120), y = r1(12 + R() * 120), k = R();
      deco += k > .55 ? `<circle class="il-dot" cx="${x}" cy="${y}" r="${r1(2 + R() * 3)}"/>`
        : `<path class="il-plus" d="M${x - 4} ${y}h8M${x} ${y - 4}v8"/>`;
    }
    return `<svg viewBox="0 0 320 150" aria-hidden="true" focusable="false" style="--h2:${h2}" preserveAspectRatio="xMidYMid slice">
<rect class="il-bg" width="320" height="150"/>
<circle class="il-glow" cx="${r1(260 + R() * 40)}" cy="${r1(10 + R() * 20)}" r="70"/>
<circle class="il-glow2" cx="${r1(20 + R() * 40)}" cy="${r1(130 + R() * 20)}" r="60"/>
${deco}
<g class="il-win"><rect x="148" y="22" width="156" height="114" rx="12"/><path d="M148 36h156" class="il-winbar"/><circle cx="159" cy="29" r="2.4" class="il-wd1"/><circle cx="167" cy="29" r="2.4" class="il-wd2"/><circle cx="175" cy="29" r="2.4" class="il-wd3"/></g>
${screen(layout, R)}
<circle class="il-ring" cx="80" cy="76" r="55"/>
<circle class="il-badge" cx="80" cy="76" r="42"/>
<g class="il-ico" transform="translate(54 50) scale(2.17)">${I[main]}</g>
<circle class="il-badge2" cx="120" cy="112" r="17"/>
<g class="il-ico2" transform="translate(109.2 101.2) scale(.9)">${I[sub]}</g>
</svg>`;
  }
  window.Illus = { illus };
})();
