/*
 Протестим, что совпадают стандартные настройки модалов, и порождаемые объекты имеют нужный интерфейс
 */
var unitTests = {
    init: function () {
        this._events();
    },
    _events: function () {
        $('.js-run-modal-test').on('click', $.proxy(this, '_runTestHandler'));
        if (location.pathname == '/' && location.search) {
            this._runTestHandler();
        }
    },
    isRun: false,
    _runTestHandler: function () {
        if (this.isRun) {
            return;
        }
        this.isRun = true;
        var self   = this;

        $('body').append('<div id="qunit"></div><div id="qunit-fixture"></div>');
        $('head').append('<link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.3.0.css">');

        var script    = document.createElement('script');
        script.src    = "//code.jquery.com/qunit/qunit-2.3.0.js"
        script.onload = function () {
            self._testBody();
        };

        document.body.appendChild(script);
    },

    _testBody: function () {
        QUnit.module("inlineModalFactory", function () {
            var inlineFactory = modalFactory.getFactories().inlineModalFactory;

            var inlineDefaultConfig = {
                hideAction: false,
                $appendPoint: $('body'),
                offsetFromBottom: false,
                offsetTop: 0,
                offsetLeft: 0,
            };

            var inlineModalInterface = {
                hide: {},
                show: {},
                destroy: {},
                setContent: {},
            };

            var modalAPI = inlineFactory.create({target: $('body')});

            QUnit.test("Дефолтные настройки", function (assert) {
                assert.propEqual(inlineFactory.defaultConfig, inlineDefaultConfig, "В порядке");
            });

            QUnit.test("Апи модала", function (assert) {
                assert.propEqual(modalAPI, inlineModalInterface, "В порядке");
            });
        });


        QUnit.module("overlayModalFactory", function () {
            var overlayModalFactory  = modalFactory.getFactories().overlayModalFactory;
            var overlayDefaultConfig = {
                hideAction: false,
                $appendPoint: $('body'),
                overlayTemplate: '<div class="overlay" style="display: none;"><div class="overlay__content"></div></div>'
            };

            var overlayModalInterface = {
                hide: {},
                show: {},
                destroy: {},
                setContent: {},
            };

            var modalAPI = overlayModalFactory.create();

            QUnit.test("Дефолтные настройки", function (assert) {
                assert.propEqual(overlayModalFactory.defaultConfig, overlayDefaultConfig, "В порядке");
            });

            QUnit.test("Апи модала", function (assert) {
                assert.propEqual(modalAPI, overlayModalInterface, "В порядке");
            });

        });
    }
};
unitTests.init();