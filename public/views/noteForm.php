<form method="post" class="<?= $isAjax ? 'js-note-submit' : '' ?>" action="/request.php" class="form">
    <div class="form__row">
        <div class="form-title">Заметка к объявлению</div>
        <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">
    </div>
    <div class="form__row">
        <textarea class="textarea" name="text"><?= htmlspecialchars($text) ?></textarea>
    </div>
    <div class="form__row">
        <button type="submit" class="button button_standart">Сохранить</button>
        <a href="/product.php?id=<?= htmlspecialchars($id) ?>" class="button button_link js-close-current-modal">Отмена</a>
    </div>
</form>
