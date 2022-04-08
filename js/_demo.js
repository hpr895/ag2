var Sticky = function (selector, padding, config) {
    var $sticky = document.querySelector(selector);
    var $padding = document.querySelector(padding);

    var paddingOffset;
    var elHeight;

    config = config || {}
    var options = {
        dynamic: config.dynamic || true,
        offset: config.offset || 0,
    };

    if ($sticky && $padding) {
        setEvents();
        setValues();
        refresh();
    }

    function setEvents() {
        window.addEventListener('scroll', refresh);
        window.addEventListener('resize', refresh);
    }

    function refresh() {
        if (options.dynamic) {
            setValues();
        }

        if (paddingOffset < options.offset) {
            $sticky.classList.add('is-stuck');
            $padding.style.paddingBottom = elHeight + 'px';
            $sticky.style.transform = 'translateY(' + (window.scrollY) + 'px)';
        } else {
            $sticky.classList.remove('is-stuck');
            $padding.style.paddingBottom = 0;
        }
    }

    function setValues() {
        paddingOffset = getTopOffset($padding);
        elHeight = $sticky.clientHeight;
    }

    function getTopOffset($el) {
        return $el.getBoundingClientRect().top;
    }
};

document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var stickyHeader = new Sticky('.js-sticky-header', '.js-sticky-header-padding');

        var stickySidebar = new Sticky('.js-sticky-sidebar', '.js-sticky-sidebar-padding', {
            offset: document.querySelector('.js-sticky-header').clientHeight,
        });
    })();
});
