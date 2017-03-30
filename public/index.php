<?php
include(dirname(__FILE__) . "/View.php");
View::layoutBegin();
?>
<div class="typo">
    <h3>Тестовое задание, Поплаухин Денис Дмитриевич</h3>
    <p>Несколько ссылок на заглушки товаров: <a href="/product.php?id=10">Товар №10</a>,
        <a href="/product.php?id=20">Товар №20</a>,
        <a href="/product.php?id=30">Товар №30</a>. Модал с заметками ждёт тебя там!
    </p>
    <p>Работает как с включённым, так и с выключенным JS, так что не стесняйтесь его отключать</p>
    <p>Мобилкой считается все, что разрешением меньше 500px</p>
    <button class="button button_standart js-sample-long-modal">Пример очень длинного модала</button>
    <div>
        <button class="button button_standart js-run-modal-test">Тесты на QUnite</button>
    </div>
</div>

<?php
View::layoutEnd();
?>

