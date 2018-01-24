<?php

namespace App\Resource;

use App\Resource\AbstractResource;
use App\Entity\User;

class UserResource extends AbstractResource
{
    private $salt = 'psangelov';

    private function securePassword($password){
        // stronger hash should be used
        return sha1($password.$this->salt);
    }

    public function createNew($data)
    {
        $user = new User;
        $user->setEmail($data['email']);
        $user->setPassword($this->securePassword($data['password']));
        
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();

        return $this->convertToArray($user);
    }

    public function checkEmail($email)
    {
        $user = $this->getEntityManager()
                    ->getRepository('App\Entity\User')
                    ->findOneBy(array('email' => $email));

        return $user ? true : false;
    }

    public function login($data)
    {
        $user = $this->getEntityManager()
                    ->getRepository('App\Entity\User')
                    ->findOneBy(array('email' => $data['email'],
                                      'password' => $this->securePassword($data['password'])));

        return $user ? $this->convertToArray($user) : false;
    }

    public function single($id)
    {
        $user = $this->getEntityManager()->find('App\Entity\User', $id);

        return $user;
    }

    private function convertToArray(User $user) {
        return array(
            'id' => $user->getId(),
            'email' => $user->getEmail()
        );
    }
}