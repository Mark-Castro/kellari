export const THEME_STORAGE_KEY = 'kellari-theme';

export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var theme=localStorage.getItem('${THEME_STORAGE_KEY}');if(theme==='light'||theme==='dark'){document.documentElement.setAttribute('data-theme',theme)}}catch(error){console.error('Unable to read the saved theme preference.',error)}})()`;
