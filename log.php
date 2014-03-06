 <?php
  $myFile = "log.txt";
  $fh = fopen($myFile, 'a') or die("can't open file");
  $date = new DateTime(null, new DateTimeZone('Europe/Amsterdam')); 
  $stringData = $date->getTimestamp() . " : "  .$_POST['data'] . "\r\n";

  echo $stringData;
  fwrite($fh, $stringData);
  fclose($fh);

?>