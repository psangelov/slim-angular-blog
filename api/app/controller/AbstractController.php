<?php

namespace App\Controller;

abstract class AbstractController
{

    public function __construct()
    {
        
    }

    final protected static function buildResponse($returnData, $code = 200)
    {
        global $app;

        $app->response()->status($code);
        $app->response()->header('Content-Type', 'application/json');
        $app->response()->write(json_encode($returnData));

        return $app->response();
    }

}