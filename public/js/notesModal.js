/*
 * TL;DR Модал существует, только пока виден.
 *
 * Модал в опредёленный момент времени, может быть только один
 * При открытии другого модала для заметок предыдущий будет уничтожен, при закрытии модала, он также будет уничтожен
 * Содержимое модала я решил запрашивать каждый раз при открытии модала
 * Способ позиционирования внутри оверлея я выбрал такой, т.к. точно знаю что он хорошо работает в IE9
 * */

var notesModal = {
    modal: false,
    $currentPageNote: $('.js-current-inline-note'),
    $allNotesOpeners: $('.js-open-note'),
    submitFormSelector: '.js-note-submit',
    previousAjaxModalRequest: false,

    //Единственная точка входа
    init: function () {
        this._events();
    },

    _events: function () {
        this.$currentPageNote.on('click', $.proxy(this, '_openInline'));
        this.$allNotesOpeners.on('click', $.proxy(this, '_openOverlayed'));
        $(document).on('submit', this.submitFormSelector, $.proxy(this, '_submitFormHandler'));
    },


    _openOverlayed: function (e) {
        e.preventDefault();
        var noteId = this._getNoteId(e);
        if (!noteId) {
            return;
        }
        this._setCurrentModal(modalFactory.create({hideAction: 'destroy'}));
        this._ajaxGetModalContent(e, noteId);
    },

    _openInline: function (e) {
        //Переопределим поведение для инлайнового модала
        //Проверяем что это мобильный телефон, это должен быть глобальный объект, например baza.isMobile(), но я не стал выносить
        var isModile = $(window).width() <= 500;
        if (isModile) {
            this._openOverlayed(e);
            return;
        }

        e.preventDefault();
        var $inlineTarget = $(e.currentTarget);
        var noteId        = this._getNoteId(e);
        if (!noteId) {
            return;
        }
        this._setCurrentModal(modalFactory.create({
            target: $inlineTarget,
            hideAction: 'destroy',
        }));
        this._ajaxGetModalContent(e, noteId);
    },

    _getNoteId: function (e) {
        var $listener = $(e.currentTarget);
        var noteId    = $listener.data('noteId');
        return noteId;
    },

    //Получаем модал с сервера
    _ajaxGetModalContent: function (e, noteId) {
        var self      = this;
        var $listener = $(e.currentTarget);
        $listener.addClass('preloader');

        //Если идет реквест мы его убьем
        this.previousAjaxModalRequest && this.previousAjaxModalRequest.abort();
        this.previousAjaxModalRequest = $.get('/note.php', {
            id: noteId
        }).done(function (content) {
            self.modal && self.modal.setContent(content).show();
        }).always(function () {
            $listener.removeClass('preloader')
        });
    },

    //При создании модала запоминаем его, чтобы в последстии уничтожить
    _setCurrentModal: function (modal) {
        this._destroyCurrentModal();
        this.modal = modal;
    },

    _destroyCurrentModal: function () {
        if (this.modal && this.modal.destroy) {
            this.modal.destroy();
            this.modal = false;
        }
    },

    _submitFormHandler: function (e) {
        e.preventDefault();
        var $noteForm = $(e.currentTarget);
        var $target   = $noteForm.find(':submit');
        $target.addClass('preloader');
        $.post($noteForm.attr('action'), $noteForm.serialize())
            .done($.proxy(this, '_saveResponseAction'))
            .always(function () {
                $target.removeClass('preloader');
            })
    },

    _saveResponseAction: function (JSON) {
        var hasText = !!JSON.text;
        this._destroyCurrentModal();
        this.$currentPageNote.toggle(hasText).html(JSON.text);
        this.$allNotesOpeners.text(hasText ? 'Изменить заметку' : 'Добавить заметку');
    }
};
notesModal.init();