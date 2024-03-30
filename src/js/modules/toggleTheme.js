// function addToLocalStorage(value) {
//     localStorage.setItem('theme', JSON.stringify(value));
// }

// export function toggleTheme(trigger, targetSelector, theme) {
//     const active = document.querySelector(trigger);
//     const target = document.querySelector(targetSelector);

//     active.addEventListener('click', () => {
//         active.classList.toggle('active');
//         target.classList.toggle(theme);

//         const isActive = active.classList.contains('active');

//         addToLocalStorage(isActive);
//     });

//     const savedTheme = JSON.parse(localStorage.getItem('theme'));

//     if (savedTheme === true) {
//         target.classList.add(theme);
//         active.classList.add('active');
//     } else {
//         target.classList.remove(theme);
//         active.classList.remove('active');
//     }
// }
