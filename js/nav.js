const nav = document.querySelector('.nav-strip');

if (nav) {
    let lastScrollY = window.scrollY;
    const scrollThreshold = 8;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const difference = currentScrollY - lastScrollY;

        // Always show at the top
        if (currentScrollY <= 0) {
            nav.classList.remove('nav-hidden');
            lastScrollY = currentScrollY;
            return;
        }

        // Ignore tiny movements
        if (Math.abs(difference) < scrollThreshold) {
            return;
        }

        if (difference > 0) {
            // Scrolling down → hide
            nav.classList.add('nav-hidden');
        } else {
            // Scrolling up → show
            nav.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
    });
}

function toggleDrawer(id) {
    const drawer = document.getElementById(id);
    drawer.classList.toggle('open');
}

/* ─── PAGE TRANSITIONS ─── */

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('a[href]').forEach(link => {

        const href = link.getAttribute('href');

        if (
            !href ||
            href.startsWith('#') ||
            href.startsWith('http') ||
            href.startsWith('mailto:') ||
            link.target === '_blank' ||
            link.hasAttribute('data-architecture')
        ) {
            return;
        }

        link.addEventListener('click', event => {

            event.preventDefault();

            document.body.classList.add('page-leaving');

            setTimeout(() => {
                window.location.href = href;
            }, 350);

        });

    });

});

// ─── ARCHITECTURE MODAL ───

const architectureLink = document.querySelector('[data-architecture]');
const architectureModal = document.querySelector('#architectureModal');

if (architectureLink && architectureModal) {

    const architectureIframe =
        architectureModal.querySelector('iframe');

    const architectureClose =
        architectureModal.querySelector('.architecture-close');

    const architectureBackdrop =
        architectureModal.querySelector('.architecture-backdrop');


    function openArchitecture() {

        architectureIframe.src = architectureLink.href;

        architectureModal.classList.add('open');
        architectureModal.setAttribute('aria-hidden', 'false');

        document.body.classList.add('modal-open');
    }


    function closeArchitecture() {

        architectureModal.classList.remove('open');
        architectureModal.setAttribute('aria-hidden', 'true');

        document.body.classList.remove('modal-open');

        setTimeout(() => {
            architectureIframe.src = '';
        }, 400);
    }


    architectureLink.addEventListener('click', (event) => {

        event.preventDefault();

        openArchitecture();

    });


    architectureClose.addEventListener('click', closeArchitecture);


    architectureBackdrop.addEventListener('click', closeArchitecture);


    document.addEventListener('keydown', (event) => {

        if (event.key === 'Escape') {
            closeArchitecture();
        }

    });

}
