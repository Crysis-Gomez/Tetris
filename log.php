 <?php
  echo "start logging";
  $myFile = "log.txt";
  $fh = fopen($myFile, 'a') or die("can't open file");

  $stringData = date("Y-m-d H:i:s"). ": " . $_POST['data'] . "<br>" . "\r\n";

  echo $stringData;
  fwrite($fh, $stringData);
  fclose($fh);

?>
