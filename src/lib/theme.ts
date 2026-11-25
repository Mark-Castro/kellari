export const THEME_STORAGE_KEY = 'kellari-theme';

export const THEME_BOOTSTRAP_SCRIPT = `(function(){var theme=null;try{theme=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(error){console.error('Unable to read the saved theme preference.',error)}if(theme!=='light'&&theme!=='dark'){theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',theme)})()`;
