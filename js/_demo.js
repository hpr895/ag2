StickyHeader = function (selector) {
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

Tabs = function(buttonSelector, contentSelector, config) {
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

SidePanel = function(config) {
    config = config || {};
    var options = {
        panel: config.panel || '.js-side-panel',
        overlay: config.overlay || '.js-side-panel-overlay',
        open: config.open || '.js-open-side-panel',
        close: config.close || '.js-close-side-panel',
        toggle: config.toggle || '.js-toggle-side-panel',
        closeOutside: true,
        onClose: config.onClose || false,
        blockScroll: config.blockScroll || true,
    };

    var $panel = document.querySelector(options.panel);
    var $overlay = document.querySelector(options.overlay);
    var $openings = document.querySelectorAll(options.open);
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
        document.addEventListener('click', onDocumentClick);
    }

    function onDocumentKeyDown(e) {
        if (isOpened && e.key === 'Escape') {
            closePanel();
        }
    }

    function onDocumentClick(e) {
        if (isOpened && options.closeOutside) {
            var onPanel = e.target.matches(options.panel) || e.target.closest(options.panel);
            var onOpener = e.target.matches(options.open) || e.target.closest(options.open);
            var onToggler = e.target.matches(options.toggle) || e.target.closest(options.toggle);

            if (!onPanel && !onOpener && !onToggler) {
                closePanel();
            }
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
        isOpened = true;
        $panel.classList.add('is-opened');

        if ($overlay) {
            $overlay.classList.add('is-active');
        }

        if (options.blockScroll) {
            document.documentElement.classList.add('is-side-panel-opened');
        }
    }

    function closePanel() {
        isOpened = false;
        $panel.classList.remove('is-opened');

        if ($overlay) {
            $overlay.classList.remove('is-active');
        }

        if (options.onClose) {
            options.onClose.call(this);
        }

        if (options.blockScroll) {
            document.documentElement.classList.remove('is-side-panel-opened');
        }
    }

    return {
        togglePanel: togglePanel,
        openPanel: openPanel,
        closePanel: closePanel,
        options: options,
    };
}

MobileMenuArrows = function(selector) {
    var $arrows = document.querySelectorAll(selector);

    init();

    function init() {
        setEvents();
    }

    function setEvents() {
        for (var i = 0; i < $arrows.length; i++) {
            $arrows[i].removeEventListener('click', onArrowClick);
            $arrows[i].addEventListener('click', onArrowClick);
        }
    }

    function onArrowClick(e) {
        toggleMenu(e.target);
    }

    function toggleMenu($arrow) {
        var $li = $arrow.closest('li');

        if ($li.classList.contains('is-opened')) {
            closeMenu($arrow);
        } else {
            openMenu($arrow);
        }
    }

    function openMenu($arrow) {
        var $li = $arrow.closest('li');

        $arrow.classList.add('is-active');
        $li.classList.add('is-opened');
    }

    function closeMenu($arrow) {
        var $li = $arrow.closest('li');

        $arrow.classList.remove('is-active');
        $li.classList.remove('is-opened');
    }

    function closeAll() {
        for (var i = 0; i < $arrows.length; i++) {
            closeMenu($arrows[i]);
        }
    }

    return {
        closeAll: closeAll,
    };
};

document.addEventListener('DOMContentLoaded', function () {
    // sticky
    (function () {
        var stickyHeader = new StickyHeader('.js-sticky-header');

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
        var tabs = new Tabs('.js-tab-button', '.js-tab-content');
    })();

    // mobile panel
    (function () {
        var mobilePanel = new SidePanel();
        var mobileMenuArrows = new MobileMenuArrows('.js-mobile-menu-arrow');

        mobilePanel.options.onClose = function() {
            mobileMenuArrows.closeAll();
        }
    })();
});
