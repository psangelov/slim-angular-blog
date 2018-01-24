<?php

namespace App\Resource;

use App\Resource\AbstractResource;
use App\Entity\Article;

class ArticleResource extends AbstractResource
{

    public function articles()
    {
        $articles = $this->getEntityManager()->getRepository('App\Entity\Article')->findAll();
        $articles = array_map(function($article) {
             return $this->convertToArray($article); },
            $articles);
        $data = $articles;

        return $data;
    }

    public function single($id)
    {
        $article = $this->getEntityManager()->find('App\Entity\Article', $id);
        return $article ? $this->convertToArray($article) : false;
    }

    public function update($id,$data)
    {
        $article = $this->getEntityManager()->find('App\Entity\Article', $id);
        $article->setTitle($data['title']);
        $article->setContent($data['content']);

        $this->getEntityManager()->persist($article);
        $this->getEntityManager()->flush();

        return $this->convertToArray($article);
    }

    public function delete($id)
    {
        $article = $this->getEntityManager()->find('App\Entity\Article', $id);
        $this->getEntityManager()->remove($article);
        $this->getEntityManager()->flush();

        return true;
    }

    public function createNew($data,$user)
    {
        $article = new Article;
        $article->setTitle($data['title']);
        $article->setContent($data['content']);
        $article->setUser($user->getId());
        $article->setPublishDate(new \DateTime("now"));

        $this->getEntityManager()->persist($article);
        $this->getEntityManager()->flush();

        return $this->convertToArray($article);
    }

    private function convertToArray(Article $article) {
        return array(
            'id' => $article->getId(),
            'title' => $article->getTitle(),
            'content' => $article->getContent(),
            'publish_date' => $article->getPublishDate()->format('d-m-Y'),
            'views' => $article->getViews(),
            'user' => $article->getUser()
        );
    }
}