var Sticky = function (selector, padding, config) {
    var $sticky = document.querySelector(selector);
    var $padding = document.querySelector(padding);

    var paddingOffset;
    var elHeight;

    config = config || {}
    var options = {
        dynamic: config.dynamic || true,
        offset: config.offset || 0,
        translate: config.translate || false,
        track: config.track ? document.querySelector('config.track') : false,
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

            // currentTrackOffset = config.track.clientHeight
        var negativeOffset

        if (paddingOffset < options.offset) {
            $sticky.classList.add('is-stuck');

            if (options.translate) {
                $sticky.style.transform = 'translateY(' + (window.scrollY - $sticky.clientHeight) + 'px)';
            } else {
                $padding.style.paddingBottom = elHeight + 'px';
            }
        } else {
            $sticky.classList.remove('is-stuck');
            $padding.style.paddingBottom = 0;
            $sticky.style.transform = 'translateY(0)';
        }
    }

    function setValues() {
        paddingOffset = getTopOffset($padding);
        elHeight = $sticky.clientHeight;
    }

    function getTopOffset($el) {
        return $el.getBoundingClientRect().top;
    }

    // function calcoffsetFromTrack() {

    // }
};

document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var stickyHeader = new Sticky('.js-sticky-header', '.js-sticky-header-padding');

        var stickySidebar = new Sticky('.js-sticky-sidebar', '.js-sticky-sidebar-padding', {
            offset: document.querySelector('.js-sticky-header').clientHeight,
            translate: true,
            track: 'js-sticky-sidebar-track',
        });
    })();
});
