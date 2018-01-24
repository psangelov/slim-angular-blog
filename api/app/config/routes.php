<?php
    
/* ROUTES - should be moved to seperate file */
$app->group('/api', function () use ($app) {
    // User group
    $app->group('/user', function () use ($app) {
        // register
        $app->post('/register', 'App\Controller\ApiController::userRegisterAction');
        // login
            $app->post('/login', 'App\Controller\ApiController::userLoginAction');
    });
    // Blog group
    $app->group('/article', function () use ($app) {
        // create
        $app->post('/create', 'App\Controller\ApiController::articleCreateAction');
        // edit
        $app->post('/edit/:id', 'App\Controller\ApiController::articleEditAction');
        // delete
        $app->post('/delete', 'App\Controller\ApiController::articleDeleteAction');
        // list
        $app->get('/list', 'App\Controller\ApiController::articleListAction');
        // view
        $app->get('/view/:id', 'App\Controller\ApiController::articleViewAction');
    });
});
/* END OF ROUTES */