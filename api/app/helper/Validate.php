<?php

namespace App\Helper;

class Validate 
{
    public static function email($email){
        return preg_match('/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9_\.\-])+\.)+([a-zA-Z]{2,4})+$/',$email) ? true : false;
    }
}