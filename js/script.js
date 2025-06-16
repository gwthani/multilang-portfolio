const select = document.getElementById('lang-select');
const defaultLang = localStorage.getItem('lang') || 'en';

async function loadLocale(lang) {
  const res = await fetch(`locales/${lang}.json`);
  return res.json();
}

function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keys = el.getAttribute('data-i18n').split('.');
    let text = translations;
    keys.forEach(key => { text = text[key]; });
    el.textContent = text;
  });
  document.documentElement.dir = select.value === 'ar' ? 'rtl' : 'ltr';
}

select.value = defaultLang;
select.addEventListener('change', async () => {
  const lang = select.value;
  localStorage.setItem('lang', lang);
  const translations = await loadLocale(lang);
  applyTranslations(translations);
});

// Initial load
loadLocale(defaultLang).then(translations => applyTranslations(translations));
