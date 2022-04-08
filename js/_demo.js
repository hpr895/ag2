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
    config = config || {};
    var options = {
        toggle: config.toggle || false,
        activeClass: config.activeClass || 'is-active',
        buttonAttribute: config.buttonAttribute || 'data-tab-button',
        contentAttribute: config.contentAttribute || 'data-tab-content',
        afterShow: config.afterShow || false,
    };

    var $buttons;
    var $contents;

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

ag2.SidePanel = function(config) {
    config = config || {};
    var options = {
        panel: config.panel || '.js-side-panel',
        open: config.open || '.js-open-side-panel',
        close: config.close || '.js-close-side-panel',
        toggle: config.toggle || '.js-toggle-side-panel',
    };

    var $openings = document.querySelectorAll(options.open);
    var $panel = document.querySelector(options.panel);
    var $closings = document.querySelectorAll(options.close);
    var $toggles = document.querySelectorAll(options.toggle);

    var isOpened = false;

    if ($panel) {
        init();
    }

    function init() {
        setEvents();
    }

    function setEvents() {
        for (var i = 0; i < $openings.length; i++) {
            $openings[i].removeEventListener('click', onOpeningClick);
            $openings[i].addEventListener('click', onOpeningClick);
        }

        for (var i = 0; i < $closings.length; i++) {
            $closings[i].removeEventListener('click', onClosingClick);
            $closings[i].addEventListener('click', onClosingClick);
        }

        for (var i = 0; i < $toggles.length; i++) {
            $toggles[i].removeEventListener('click', onToggingClick);
            $toggles[i].addEventListener('click', onToggingClick);
        }

        document.addEventListener('keydown', onDocumentKeyDown);
    }

    function onDocumentKeyDown(e) {
        if (isOpened && e.key === 'Escape') {
            closePanel();
        }
    }

    function onOpeningClick() {
        openPanel();
    }

    function onClosingClick() {
        closePanel();
    }

    function onToggingClick() {
        togglePanel();
    }

    function togglePanel() {
        if (isOpened) {
            closePanel();
        } else {
            openPanel();
        }
    }

    function openPanel() {
        $panel.classList.add('is-opened');
        isOpened = true;
    }

    function closePanel() {
        $panel.classList.remove('is-opened');
        isOpened = false;
    }

    return {
        togglePanel: togglePanel,
        openPanel: openPanel,
        closePanel: closePanel,
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

    // mobile panel
    (function () {
        var mobilePanel = new ag2.SidePanel();
    })();
});
