// directives/v-right-click.js
export default {
  mounted(el, binding) {
    el._rightClickHandler = (event) => {
      event.preventDefault();  // Verhindert das Standard-Kontextmenü
      if (typeof binding.value === 'function') {
        binding.value(event);  // Ruft die Methode auf, die in der Komponente definiert ist
      }
    };
    el.addEventListener('contextmenu', el._rightClickHandler);
  },
  unmounted(el) {
    el.removeEventListener('contextmenu', el._rightClickHandler);
  }
};
