<?php

namespace App\Resource;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;
use App\Config\Settings;

abstract class AbstractResource
{
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $entityManager = null;

    /**
     * @return \Doctrine\ORM\EntityManager
     */
    public function getEntityManager()
    {
        if ($this->entityManager === null) {
            $this->entityManager = $this->createEntityManager();
        }

        return $this->entityManager;
    }

    /**
     * @return EntityManager
     */
    public function createEntityManager()
    {
        $path = array('Path/To/Entity');
        $devMode = true;

        $config = Setup::createAnnotationMetadataConfiguration($path, $devMode);

        // define credentials...
        $connectionOptions = array(
            'driver'   => Settings::$databaseDriver,
            'host'     => Settings::$databaseHost,
            'dbname'   => Settings::$databaseName,
            'user'     => Settings::$databaseUser,
            'password' => Settings::$databasePassword,
        );

        return EntityManager::create($connectionOptions, $config);
    }
}
