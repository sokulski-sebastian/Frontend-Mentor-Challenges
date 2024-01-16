/* Theme */
document.addEventListener('DOMContentLoaded', function() {
    const themeInput = document.querySelector('.theme-input');
  
    themeInput.addEventListener('change', function() {
      document.body.classList.toggle('dark-theme', this.checked);
    });
});



