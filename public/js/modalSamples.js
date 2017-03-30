/*
 * Пример ооооочень длинного модала*/
var modalSamples = {
    init: function () {
        var modalApi = modalFactory.create();

        modalApi.setContent(this.html);

        $('.js-sample-long-modal').on('click', function (e) {
            modalApi.show();
        });
    },
    html: '<div class="modal modal_middle">\n    <div class="typo">\n        <div>Реферат по политологии и почвоведению</div>\n        <div><b>Тема: «Ореховатый коммунизм глазами современников»</b></div>\n        <div>Гуминовая кислота когерентна. При переходе к следующему уровню организации почвенного покрова идея правового государства представляет собой авторитаризм. Политическое учение Н. Макиавелли важно интегрирует гранулометрический анализ даже в том случае, если непосредственное наблюдение этого явления затруднительно. Англо-американский тип политической культуры слабопроницаем. Международная политика физически адсорбирует гистерезис ОГХ. Фраджипэн мгновенно перемещает прагматический авторитаризм.</div>\n\n        <div>Демократия участия предсказуема. Коллоид растягивает коммунизм. Социально-экономическое развитие, особенно в условиях политической нестабильности, постоянно.</div>\n\n        <div>Партлювация неоднозначна. Безусловно, усадка сохраняет марксизм. Кутана доказывает непромывной доиндустриальный тип политической культуры. Субъект власти неизбежен. Важным для нас является указание Маклюэна на то, что политическое учение Монтескье корреляционно означает непромывной дренаж. Коммунизм пространственно интегрирует институциональный режим</div>\n\n        <div>Реферат по политологии и почвоведению</div>\n        <div><b>Тема: «Ореховатый коммунизм глазами современников»</b></div>\n        <div>Гуминовая кислота когерентна. При переходе к следующему уровню организации почвенного покрова идея правового государства представляет собой авторитаризм. Политическое учение Н. Макиавелли важно интегрирует гранулометрический анализ даже в том случае, если непосредственное наблюдение этого явления затруднительно. Англо-американский тип политической культуры слабопроницаем. Международная политика физически адсорбирует гистерезис ОГХ. Фраджипэн мгновенно перемещает прагматический авторитаризм.</div>\n\n        <div>Демократия участия предсказуема. Коллоид растягивает коммунизм. Социально-экономическое развитие, особенно в условиях политической нестабильности, постоянно.</div>\n\n        <div>Партлювация неоднозначна. Безусловно, усадка сохраняет марксизм. Кутана доказывает непромывной доиндустриальный тип политической культуры. Субъект власти неизбежен. Важным для нас является указание Маклюэна на то, что политическое учение Монтескье корреляционно означает непромывной дренаж. Коммунизм пространственно интегрирует институциональный режим</div>\n        <div>Реферат по политологии и почвоведению</div>\n        <div><b>Тема: «Ореховатый коммунизм глазами современников»</b></div>\n        <div>Гуминовая кислота когерентна. При переходе к следующему уровню организации почвенного покрова идея правового государства представляет собой авторитаризм. Политическое учение Н. Макиавелли важно интегрирует гранулометрический анализ даже в том случае, если непосредственное наблюдение этого явления затруднительно. Англо-американский тип политической культуры слабопроницаем. Международная политика физически адсорбирует гистерезис ОГХ. Фраджипэн мгновенно перемещает прагматический авторитаризм.</div>\n\n        <div>Демократия участия предсказуема. Коллоид растягивает коммунизм. Социально-экономическое развитие, особенно в условиях политической нестабильности, постоянно.</div>\n\n        <div>Партлювация неоднозначна. Безусловно, усадка сохраняет марксизм. Кутана доказывает непромывной доиндустриальный тип политической культуры. Субъект власти неизбежен. Важным для нас является указание Маклюэна на то, что политическое учение Монтескье корреляционно означает непромывной дренаж. Коммунизм пространственно интегрирует институциональный режим</div>\n        <a href="/product.php?id=<?= htmlspecialchars($id) ?>" class="button button_standart js-close-current-modal">Закрыть</a>\n    </div>\n</div>'
};
modalSamples.init();