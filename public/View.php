<?php

class View
{
    static public function layoutBegin()
    {
        include(dirname(__FILE__) . "/views/layoutBegin.php");
    }

    static public function noteModal($data)
    {
        extract($data);
        include(dirname(__FILE__) . "/views/noteForm.php");
    }

    static public function layoutEnd()
    {
        include(dirname(__FILE__) . "/views/layoutEnd.php");
    }
}