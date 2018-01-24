<?php
    require '../vendor/autoload.php';

    // config the templates 
    $config = array(
        'templates.path' => '../app/views/',
    );

    $app = new \Slim\Slim($config);

    require '../app/config/routes.php';
    
    $app->run();
