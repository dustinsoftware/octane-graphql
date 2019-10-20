const loadedStylesheets = [];

export function loadCss(path) {
  if (loadedStylesheets.includes(path)) {
    return;
  }

  loadedStylesheets.push(path);

  let linkTag = document.createElement('link');
  linkTag.href = path;
  linkTag.rel = "stylesheet";
  document.head.appendChild(linkTag);
}