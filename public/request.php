<?php
usleep(400000); //имитируем интернет

include(dirname(__FILE__) . "/NotesModel.php");

$id = isset($_POST['id']) ? (int)$_POST['id'] : false;
$text = isset($_POST['text']) ? $_POST['text'] : false;
$isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

if ($id) {
    $model = new NotesModel();
    $model->put($id, $text);
    if ($isAjax) {
        header('Content-Type: application/json');
        echo json_encode([
            'text' => $text
        ]);
        die();
    }
} else {
    if ($isAjax) {
        header('Content-Type: application/json');
        echo json_encode([
            'error' => 'error'
        ]);
        die();
    }
}
if ($id) {
    header("Location: /product.php?id=$id");
} else {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
}