<?php

class NotesModel
{
    protected $storagePath;

    public function __construct()
    {
        $this->storagePath = dirname(__FILE__) . "/database";
        $this->database = json_decode(file_get_contents($this->storagePath), true) ?: [];
    }

    public function put($id, $content)
    {
        $this->database[$id] = $content;
        file_put_contents($this->storagePath, json_encode($this->database));
    }

    public function get($id)
    {
        return $this->database[$id] ?? '';
    }

}