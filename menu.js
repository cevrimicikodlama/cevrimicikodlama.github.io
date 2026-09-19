document.addEventListener('DOMContentLoaded', function () {
    const toggler = document.querySelector('.navbar-toggler');
    const menu = document.querySelector('#navbarNav');

    if (!toggler || !menu) return;

    const setMenuState = function (isOpen) {
        menu.classList.toggle('show', isOpen);
        toggler.classList.toggle('collapsed', !isOpen);
        toggler.setAttribute('aria-expanded', String(isOpen));
    };

    toggler.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        setMenuState(!menu.classList.contains('show'));
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 991) {
                setMenuState(false);
            }
        });
    });

    document.addEventListener('click', function (event) {
        const clickedInsideMenu = menu.contains(event.target);
        const clickedToggler = toggler.contains(event.target);

        if (!clickedInsideMenu && !clickedToggler) {
            setMenuState(false);
        }
    });
});
