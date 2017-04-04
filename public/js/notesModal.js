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
    $currentPageFormNote: $('.js-current-form-note'),
    $currentPageResponsiveNote: $('.js-current-inline-note'),
    $allNotesOpeners: $('.js-open-note'),
    submitFormSelector: '.js-note-submit',
    previousAjaxModalRequest: false,

    //Единственная точка входа
    init: function () {
        this._events();
    },

    _events: function () {
        this.$currentPageFormNote.on('click', $.proxy(this, '_openFormNote'));
        this.$currentPageResponsiveNote.on('click', $.proxy(this, '_openResponsiveModal'));
        this.$allNotesOpeners.on('click', $.proxy(this, '_openOverlayed'));
        $(document).on('submit', this.submitFormSelector, $.proxy(this, '_submitFormHandler'));
    },

    _openResponsiveModal: function (e) {
        var isMobile = $(window).width() <= 500;
        if (isMobile) {
            this._openOverlayed(e);
        } else {
            this._openInline(e)
        }
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


    _openFormNote: function (e) {
        e.preventDefault();
        var $inlineTarget = $(e.currentTarget);
        if ($inlineTarget.next().length) {
            this._destroyCurrentModal();
            return;
        }
        var noteId = this._getNoteId(e);
        if (!noteId) {
            return;
        }
        this._setCurrentModal(modalFactory.create({
            target: $inlineTarget,
            hideAction: 'destroy',
            $appendPoint: $inlineTarget.parent(),
            addClass: 'inline-modal_in-content'
        }));
        this._ajaxGetModalContent(e, noteId);
    },

    _openInline: function (e) {
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
        $('.js-note[data-note-id=' + parseInt(JSON.id) + ']').toggle(hasText).text(JSON.text);
        this.$allNotesOpeners.text(hasText ? 'Изменить заметку' : 'Добавить заметку');
    }
};
notesModal.init();