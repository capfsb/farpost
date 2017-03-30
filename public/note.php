<?php
usleep(400000); //имитируем интернет
include(dirname(__FILE__) . "/NotesModel.php");
include(dirname(__FILE__) . "/View.php");


$model = new NotesModel();
$id = isset($_GET['id']) ? (int)$_GET['id'] : false;
if (!$id) {
    header('Location: /');
    die();
}
$text = $model->get($id);
//Я понимаю что это не самая точная проверка на аякс, и лучше передавать данные на прямую, например через дом переменную, но думаю для данного примера этого достаточно=)
$isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

if (!$isAjax) {
    View::layoutBegin();
} else {
    echo '<div class="modal modal_mini">';
}

View::noteModal([
    'isAjax' => $isAjax,
    'id'     => $id,
    'text'   => $text
]);

if (!$isAjax) {
    View::layoutEnd();
} else {
    echo '</div>';
}