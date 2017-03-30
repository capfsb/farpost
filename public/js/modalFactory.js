/*
 * Фабрика модалов состоит из 2-х фабрик, для инлайновых и для обычных модалов
 * Фабрики я выносить не стал, хотя они самостоятельные и могут использоваться по отдельности
 * Может возникнуть вопрос почему практически одинаковые методы _makeAPI все же задублированны
 * Отвечаю: я хотел сохранить фабрики независимыми друг от друга
 * */
var modalFactory = function () {

    var inlineModalFactory = {
        defaultConfig: {
            hideAction: false,
            $appendPoint: $('body'),
            offsetFromBottom: false,
            offsetTop: 0,
            offsetLeft: 0,
        },
        create: function (config) {
            config = $.extend($.extend({}, this.defaultConfig), config);

            var $modal = $('<div class="inline-modal"></div>');
            config.$appendPoint.append($modal);
            var $target      = $(config.target);
            var targetOffset = $target.offset();
            var targetHeight = config.offsetFromBottom ? parseInt($target.outerHeight()) : 0;
            var offsetTop    = targetOffset.top + targetHeight + config.offsetTop;
            var offsetLeft   = targetOffset.left + config.offsetLeft;
            $modal.css({
                top: offsetTop,
                left: offsetLeft
            });
            var modalAPI = this._makeAPI($modal, config);
            this._bindEvents(config, $modal, modalAPI);
            return modalAPI;
        },
        _makeAPI: function ($modal, config) {
            return {
                setContent: function (content) {
                    if (content instanceof jQuery) {
                        $modal.html('').append(content);
                    } else {
                        $modal.html(content);
                    }
                    return this;
                },

                show: function () {
                    $modal.show();
                    return this;
                },

                hide: function () {
                    if (config.hideAction == 'destroy') {
                        $modal.remove();
                    }
                    else {
                        $modal.hide();
                    }
                    return this;
                },
                destroy: function () {
                    $modal.remove();
                    return this;
                },
            };
        },
        _bindEvents: function (config, $modal, modalAPI) {
            $(document).on('click', function (e) {
                //Клик внутри модала
                var onInlineModalClick = $(e.target).closest('.inline-modal').length;
                //Клик по элементу к которому он привязан
                var onModalTargetClick = $(e.target).closest(config.target).length;
                if (!onInlineModalClick && !onModalTargetClick) {
                    modalAPI.hide();
                }
            });
            $modal.on('click', '.js-close-current-modal', function (e) {
                e.preventDefault();
                modalAPI.hide();
            });
        },

    };


    var overlayModalFactory = {
        defaultConfig: {
            hideAction: false,
            $appendPoint: $('body'),
            overlayTemplate: '<div class="overlay" style="display: none;"><div class="overlay__content"></div></div>'
        },

        create: function (config) {
            config              = $.extend($.extend({}, this.defaultConfig), config);
            var $modal          = $('<div />');
            var $overlay        = $(config.overlayTemplate);
            var $overlayContent = $overlay.find('.overlay__content');

            $overlayContent.append($modal);

            var modalAPI = this._makeAPI($overlayContent, $modal, $overlay, config);
            this._bindEvents($overlay, modalAPI);
            config.$appendPoint.append($overlay);
            return modalAPI;
        },

        _makeAPI: function ($overlayContent, $modal, $overlay, config) {
            return {
                setContent: function (content) {
                    if (content instanceof jQuery) {
                        $overlayContent.html('').append(content);
                    } else {
                        $modal.html(content);
                    }
                    return this;
                },

                show: function () {
                    $('body').addClass('no-scroll');
                    $overlay.show();
                    return this;
                },

                hide: function () {
                    $('body').removeClass('no-scroll');
                    if (config.hideAction == 'destroy') {
                        $overlay.remove();
                    }
                    else {
                        $overlay.hide();
                    }
                    return this;
                },
                destroy: function () {
                    $overlay.remove();
                    return this;
                }
            };
        },

        _bindEvents: function ($overlay, modalAPI) {
            $overlay.on('click', function closeHandler(e) {
                if (e.target === e.currentTarget || $(e.target).is('.js-close-current-modal')) {
                    e.preventDefault();
                    modalAPI.hide();
                }
            });
        },
    };

    return {
        create: function (config) {
            config = config || {};
            if (config.target) {
                return inlineModalFactory.create(config);
            } else {
                return overlayModalFactory.create(config);
            }
        },

        //Метод для тестов
        getFactories: function () {
            return {
                inlineModalFactory: inlineModalFactory,
                overlayModalFactory: overlayModalFactory,
            }
        }
    };


}();

