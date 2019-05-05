<?php

/**
 * Dohledávač adres
 * @author Martin Dobry
 * @link http://webscript.cz
 * @version 1.0
 */

namespace Ruian;

class Search
{
    public $ruian;
    public $search;
    
    public function __construct() {
        $this->ruian = 'http://ags.cuzk.cz/arcgis/rest/services/RUIAN/Vyhledavaci_sluzba_nad_daty_RUIAN/MapServer/exts/GeocodeSOE/findAddressCandidates';
        $this->search = null;
    }
    
    private function file_get_contents_curl($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }
    
    public function replace($string) {
        $string = urlencode($string);
        return $string;
    }
    
    public function search() {
        $url = $this->ruian . '?SingleLine='.$this->replace($this->search).'&maxLocations=20&f=pjson';
        
        $data = $this->file_get_contents_curl($url);
        $array = json_decode($data, 1);
        
        foreach ($array['candidates'] as $key => $value)
            if($value['attributes']['Type'] == "AdresniMisto" || $value['attributes']['Type'] == "Ulice")
                $street[] = $value['address'];
        
        return json_encode($street);
    }
    
}
?>