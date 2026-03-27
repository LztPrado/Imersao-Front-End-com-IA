// ========== GERENCIADOR DE TEMA =========

const STORAGE_KEY = "netflix-theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

// Detecta a preferência de tema do sistema
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK_THEME
    : LIGHT_THEME;
}

// Obtém o tema salvo no localStorage ou usa a preferência do sistema
function getSavedTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved || getSystemTheme();
}

// Atualiza o ícone do toggle
function updateToggleIcon(theme) {
  const icon = document.querySelector(".toggle-icon");
  if (icon) {
    icon.textContent = theme === DARK_THEME ? "🌙" : "☀️";
  }
}

// Define o tema na página
function setTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
  updateToggleIcon(theme);
}

// Alterna entre temas
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  setTheme(newTheme);
}

// Inicializa o tema
function initTheme() {
  const theme = getSavedTheme();
  setTheme(theme);
}

// Adiciona evento ao botão de toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".theme-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleTheme);
  }

  // Inicializa o tema
  initTheme();
});

// Listen para mudanças na preferência do sistema
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    // Se não houver tema salvo, segue a preferência do sistema
    if (!localStorage.getItem(STORAGE_KEY)) {
      const theme = e.matches ? DARK_THEME : LIGHT_THEME;
      setTheme(theme);
    }
  });
