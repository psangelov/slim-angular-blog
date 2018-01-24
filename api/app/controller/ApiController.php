<?php
namespace App\Controller;

use App\Helper\Validate;
use App\Resource\UserResource;
use App\Resource\ArticleResource;

class ApiController extends AbstractController {
    

    public static function userRegisterAction()
    {
        global $app;
        $post = json_decode($app->request->getBody(),true);
        // first lets check if we have all the required fields
        if (!isset($post['email']) || !isset($post['password']) || !isset($post['repeat'])) {
            $returnData = ['message' => 'All fields are required to register!'];
            return self::buildResponse($returnData,400);
        }

        // check if passwords match
        if ($post['password'] !== $post['repeat']) {
            $returnData = ['message' => 'Passwords does not match!'];
            return self::buildResponse($returnData,400);
        }

        //check if email is valid
        if (!Validate::email($post['email'])) {
            $returnData = ['message' => 'Email is not valid!'];
            return self::buildResponse($returnData,400);
        }

        // init the user resource
        $userResource = new UserResource;
        // let's check if the user email is not already registerd
        if ($userResource->checkEmail($post['email'])) {
            $returnData = ['message' => 'A user with this email is alredy registered. Try to login!'];
            return self::buildResponse($returnData,400);
        }

        // data is ok, let's make a new user
        $userResource->createNew($post);

        $returnData = ['message' => 'User was successfully created, you can now login!'];
        return self::buildResponse($returnData,200);

    }

    public static function userLoginAction()
    {
        global $app;
        $post = json_decode($app->request->getBody(),true);

        //check if email is valid
        if (!Validate::email($post['email'])) {
            $returnData = ['message' => 'Email is not valid!'];
            return self::buildResponse($returnData,400);
        }

        // init the user resource
        $userResource = new UserResource;

        // try to login
        if ($loginUser = $userResource->login($post)) {
            return self::buildResponse($loginUser,200);
        } else {
            $returnData = ['message' => 'User not found. Wrong email or password!'];
            return self::buildResponse($returnData,400);
        }
    }

    public static function articleCreateAction()
    {
        global $app;
        $post = json_decode($app->request->getBody(),true);

        // first lets check if we have all the required fields
        if (!isset($post['title']) || !isset($post['content']) || !isset($post['user'])) {
            $returnData = ['message' => 'All fields are required to create a new article!'];
            return self::buildResponse($returnData,400);
        }

        // init the user resource
        $userResource = new UserResource;
        if (!$user = $userResource->single($post['user'])) {
            $returnData = ['message' => 'User not found!'];
            return self::buildResponse($returnData,200);
        }

        // init the article resource
        $articleResource = new ArticleResource;

        // data is ok, let's make a new article
        $articleResource->createNew($post,$user);

        $returnData = ['message' => 'Article was successfully created!'];
        return self::buildResponse($returnData,200);
    }

    public static function articleEditAction($id)
    {
        global $app;
        $post = json_decode($app->request->getBody(),true);

        // first lets check if we have all the required fields
        if (!isset($post['title']) || !isset($post['content']) || !isset($post['user'])) {
            $returnData = ['message' => 'All fields are required to create a new article!'];
            return self::buildResponse($returnData,400);
        }

        // init the article resource
        $articleResource = new ArticleResource;

        if (!$article = $articleResource->single($id)){
            $returnData = ['message' => 'Article doest not exist!'];
            return self::buildResponse($returnData,400);
        }

        // check for ownership
        if ($article['user'] != $post['user']){
            $returnData = ['message' => 'This article is not yours to update!'];
            return self::buildResponse($returnData,400);
        }

        // data is ok, let's make a new article
        $articleResource->update($id,$post);

        $returnData = ['message' => 'Article was successfully updated!'];
        return self::buildResponse($returnData,200);
    }

    public static function articleDeleteAction()
    {
        global $app;
        $post = json_decode($app->request->getBody(),true);
        $articleResource = new ArticleResource;

        if (!$article = $articleResource->single($post['article'])){
            $returnData = ['message' => 'Article doest not exist!'];
            return self::buildResponse($returnData,400);
        }

        // check for ownership
        if ($article['user'] != $post['user']){
            $returnData = ['message' => 'This article is not yours to delete!'];
            return self::buildResponse($returnData,400);
        }

        if ($articleResource->delete($post['article'])) {
            $returnData = ['message' => 'Article was deleted successfully!'];
            return self::buildResponse($returnData,200);
        } else {
            $returnData = ['message' => 'Unknown error!'];
            return self::buildResponse($returnData,400);
        }
        
    }

    public static function articleListAction()
    {
        global $app;
        $articleResource = new ArticleResource;
        $articles = $articleResource->articles();

        return self::buildResponse($articles,200);
    }

    public static function articleViewAction($id)
    {
        global $app;

        $articleResource = new ArticleResource;
        if (!$article = $articleResource->single($id)){
            $returnData = ['message' => 'Article doest not exist!'];
            return self::buildResponse($returnData,400);
        }

        return self::buildResponse($article,200);
    }
}