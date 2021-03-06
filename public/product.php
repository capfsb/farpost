<?php
include(dirname(__FILE__) . "/NotesModel.php");
include(dirname(__FILE__) . "/View.php");
View::layoutBegin();

$productId = isset($_GET['id']) ? (int)$_GET['id'] : false; //Просто айдишник продукта
if ($productId) {
    $text = (new NotesModel())->get($productId);
    $hasNote = $text;
}
?>
<?php if ($productId): ?>
    <div class="typo">
        <div>
            <a class="js-open-note" href="/note.php?id=<?= htmlspecialchars($productId) ?>" data-note-id="<?= htmlspecialchars($productId) ?>"><?= $hasNote ? 'Изменить' : 'Добавить' ?> заметку</a>
        </div>
        <h3>Яндекс.Реферат (предствьте, что это описание товара)</h3>
        <p><b>Товар №<?= htmlspecialchars($productId) ?></b></p>
        <p>
            <a class="note js-current-inline-note js-note" href="/note.php?id=<?= htmlspecialchars($productId) ?>" data-note-id="<?= $productId ?>" <?php if (!$hasNote): ?> style="display: none;"<?php endif; ?>><?= htmlspecialchars($text) ?></a>
        </p>
        <p>Героическое мгновенно. Терминатор продолжает непреложный азимут, но кольца видны только при 40–50. Hатpиевые атомы предварительно были замечены близко с центром других комет, но инвариант изящно ищет аргумент перигелия. Астероид оспособляет первоначальный структурализм. Переживание и его претворение раскладывает на элементы центральный маятник Фуко.
        </p>
        <p>Апостериори, движение образует мимезис, это же положение обосновывал Ж.Польти в книге "Тридцать шесть драматических ситуаций". Высота вызывает драматизм. Когда речь идет о галактиках, ассоциация многопланово притягивает синтаксис искусства, таким образом, сходные законы контрастирующего развития характерны и для процессов в психике. Огpомная пылевая кома творит гений. Скоpость кометы в пеpигелии возможна. Как было показано выше, фаза создает апогей.
        </p>
        <div>
            <a class="note js-current-form-note js-note" href="/note.php?id=<?= htmlspecialchars($productId) ?>" data-note-id="<?= $productId ?>" <?php if (!$hasNote): ?> style="display: none;"<?php endif; ?>><?= htmlspecialchars($text) ?></a>
        </div>
        <p>Автоматизация просветляет трансцендентальный здравый смысл. Ощущение мира, следовательно, случайно. Закон внешнего мира, несмотря на внешние воздействия, заполняет метеорит. Символизм может быть получен из опыта. Реликтовый ледник ищет напряженный горизонт ожидания, подобный исследовательский подход к проблемам художественной типологии можно обнаружить у К.Фосслера. Миракль монотонно иллюстрирует глубокий драматизм.</p>

        <p><a class="button button_standart" href="/product.php?id=<?= rand(1, 1000) ?>">Случайный товар</a></p>
    </div>
<?php else: ?>
    <div>
        <h1>Товар не найден</h1>
        <br>
        <p>Задайте id товара например <a href="/product.php?id=1">так</a></p>
    </div>
<?php endif; ?>
<?php View::layoutEnd(); ?>

