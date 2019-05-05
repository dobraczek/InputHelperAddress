<?php

/**
 * Dohledávaè adres
 * @author Martin Dobry
 * @link http://webscript.cz
 * @version 1.0
 */

if($_POST['search'])
{
    include "Ruian.php";
    $search = new Ruian\Search();
    $search->search = $_POST['search'];
    echo $search->search();
}
?>