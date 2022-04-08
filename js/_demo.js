var StickyHeader = function (selector) {
    var $sticky = document.querySelector(selector);
    var $padding = $sticky.parentNode;

    if ($sticky && $padding) {
        setEvents();
        refresh();
    }

    function setEvents() {
        window.addEventListener('scroll', refresh);
        window.addEventListener('resize', refresh);
    }

    function refresh() {
        var paddingOffset = $padding.getBoundingClientRect().top;
        var elHeight = $sticky.clientHeight;

        if (paddingOffset < 0) {
            $sticky.classList.add('is-stuck');
            $padding.style.paddingBottom = elHeight + 'px';
        } else {
            $sticky.classList.remove('is-stuck');
            $padding.style.paddingBottom = 0;
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var stickyHeader = new StickyHeader('.js-sticky-header');

        var stickyEl = new Sticksy('.js-sticky-sidebar', {
            topSpacing: document.querySelector('.js-sticky-header').clientHeight,
        });
    })();
});
