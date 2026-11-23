// 言語切り替え（日本語・English・한국어）
// 日本語の文章はHTMLにそのまま書いてあって、英語と韓国語は i18n-en.js / i18n-ko.js から差し替える
(() => {
  const LANGS = ["ja", "en", "ko"];
  const NAMES = { ja: "日本語", en: "English", ko: "한국어" };
  const TITLES = {
    ja: "エアドロ太郎のFlareノート｜ツール",
    en: "eadorotarou's Flare Note | Tools",
    ko: "eadorotarou의 Flare 노트 | 도구",
  };
  const DESCS = {
    ja: "Flare Networkの機能（FTSOv2・FAssets・Smart Accounts・セキュア乱数・委任）をブラウザだけで体験できる、エアドロ太郎が個人で運営する非公式ツール集。ウォレット接続不要。",
    en: "Unofficial tools by eadorotarou to try Flare Network's features (FTSOv2, FAssets, Smart Accounts, secure randomness, delegation) right in your browser. No wallet needed.",
    ko: "Flare Network의 기능(FTSOv2·FAssets·Smart Accounts·보안 난수·위임)을 브라우저만으로 체험할 수 있는, eadorotarou가 운영하는 비공식 도구 모음. 지갑 연결 불필요.",
  };
  const ATTRS = ["placeholder", "title", "aria-label"];
  const orig = {}, origAttr = {};
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (!(k in orig)) orig[k] = el.innerHTML;
  });
  ATTRS.forEach(a => document.querySelectorAll(`[data-i18n-${a}]`).forEach(el => {
    const k = el.getAttribute(`data-i18n-${a}`);
    if (!(k in origAttr)) origAttr[k] = el.getAttribute(a);
  }));

  const listeners = [];
  let current = "ja";
  function pick() {
    try { const s = localStorage.getItem("fjLang"); if (LANGS.includes(s)) return s; } catch (e) {}
    const n = (navigator.languages && navigator.languages[0]) || navigator.language || "ja";
    if (/^ja/i.test(n)) return "ja";
    if (/^ko/i.test(n)) return "ko";
    return "en";
  }
  function apply(lang, save) {
    if (!LANGS.includes(lang)) lang = "ja";
    const dict = (window.I18N && window.I18N[lang]) || {};
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.getAttribute("data-i18n");
      const html = lang === "ja" ? orig[k] : (dict[k] != null ? dict[k] : orig[k]);
      if (el.innerHTML !== html) el.innerHTML = html;
    });
    ATTRS.forEach(a => document.querySelectorAll(`[data-i18n-${a}]`).forEach(el => {
      const k = el.getAttribute(`data-i18n-${a}`);
      el.setAttribute(a, lang === "ja" ? origAttr[k] : (dict[k] != null ? dict[k] : origAttr[k]));
    }));
    document.documentElement.lang = lang;
    document.title = (window.FJ_TITLE_PREFIX || "") + TITLES[lang];
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", DESCS[lang]);
    const cur = document.getElementById("langCur");
    if (cur) cur.textContent = NAMES[lang];
    document.querySelectorAll("#langMenu [data-lang]").forEach(b => b.setAttribute("aria-current", b.dataset.lang === lang ? "true" : "false"));
    current = lang;
    if (save) { try { localStorage.setItem("fjLang", lang); } catch (e) {} }
    listeners.forEach(fn => { try { fn(lang); } catch (e) { console.error(e); } });
  }
  window.FJ_I18N = {
    get lang() { return current; },
    set: (l) => apply(l, true),
    onChange: (fn) => listeners.push(fn),
  };

  // 言語メニュー
  const btn = document.getElementById("langBtn"), menu = document.getElementById("langMenu");
  if (btn && menu) {
    btn.addEventListener("click", (e) => { e.stopPropagation(); menu.hidden = !menu.hidden; btn.setAttribute("aria-expanded", String(!menu.hidden)); });
    menu.addEventListener("click", (e) => {
      const b = e.target.closest("[data-lang]");
      if (!b) return;
      apply(b.dataset.lang, true);
      menu.hidden = true; btn.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("click", () => { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); } });
  }
  apply(pick(), false);
})();
