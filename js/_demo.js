var ag2 = {};

ag2.StickyHeader = function (selector) {
    var $sticky = document.querySelector(selector);
    var $padding = $sticky.parentNode;

    if ($sticky && $padding) {
        init();
    }

    function init() {
        setEvents();
        refresh();
    }

    function setEvents() {
        window.removeEventListener('scroll', refresh);
        window.addEventListener('scroll', refresh);

        window.removeEventListener('resize', refresh);
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

    return {
        init: init,
    };
};

ag2.Tabs = function(buttonSelector, contentSelector, config) {
    var $buttons;
    var $contents;

    config = config || {};
    var options = {
        toggle: config.toggle || false,
        activeClass: config.activeClass || 'is-active',
        buttonAttribute: config.buttonAttribute || 'data-tab-button',
        contentAttribute: config.contentAttribute || 'data-tab-content',
        afterShow: config.afterShow || false,
    };

    init();

    function init() {
        setElements();
        setEvents();
    }

    function setElements() {
        $buttons = document.querySelectorAll(buttonSelector);
        $contents = document.querySelectorAll(contentSelector);
    }

    function setEvents() {
        for (var i = 0; i < $buttons.length; i++) {
            $buttons[i].removeEventListener('click', onTabClick);
            $buttons[i].addEventListener('click', onTabClick);
        }
    }

    function onTabClick() {
        setTab(this.getAttribute(options.buttonAttribute));
    }

    function setTab(dataId) {
        var $activatedTab = false;
        var $activatedContent = false;

        for (var i = 0; i < $buttons.length; i++) {
            if ($buttons[i].getAttribute(options.buttonAttribute) == dataId) {
                if (config.toggle && $buttons[i].classList.contains(options.activeClass)) {
                    $buttons[i].classList.remove(options.activeClass);
                } else {
                    $buttons[i].classList.add(options.activeClass);
                    $activatedTab = $buttons[i];
                }
            } else {
                $buttons[i].classList.remove(options.activeClass);
            }
        }

        for (var i = 0; i < $contents.length; i++) {
            if ($contents[i].getAttribute(options.contentAttribute) == dataId) {
                if (config.toggle && $contents[i].classList.contains(options.activeClass)) {
                    $contents[i].classList.remove(options.activeClass);
                } else {
                    $contents[i].classList.add(options.activeClass);
                    $activatedContent = $contents[i];
                }
            } else {
                $contents[i].classList.remove(options.activeClass);
            }
        }

        if (config.afterShow) {
            // console.log(config.afterShow);
            config.afterShow.call(this, dataId, $activatedTab, $activatedContent);
        }
    }

    return {
        init: init,
        setTab: setTab,
    };
}

document.addEventListener('DOMContentLoaded', function () {
    // sticky
    (function () {
        var stickyHeader = new ag2.StickyHeader('.js-sticky-header');

        var stickyEl = new Sticksy('.js-sticky-sidebar', {
            topSpacing: document.querySelector('.js-sticky-header').clientHeight,
        });
    })();

    // lazy load
    (function () {
        var lazyLoadInstance = new LazyLoad();
    })();

    // tabs
    (function () {
        var tabs = new ag2.Tabs('.js-tab-button', '.js-tab-content');
    })();
});
