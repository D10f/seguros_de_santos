<?php

if (!isset($_POST)) {
  return;
}

declare(strict_types=1);

require_once( './config.php' );
require 'vendor/autoload.php';

use \SendGrid\Mail\Mail;

  $contact_subject = 'Ha recibido una notification de ' . $_POST['subject'];

  $contact_message = '<h1>Has recibido una notificacion de:</h1>
  <ul>
    <li>Nombre ' . $_POST['name'] . '</li>
    <li>Email ' . $_POST['email'] . '</li>
    <li>Telefono ' . $_POST['phone'] . '</li>
    <li>Mensaje ' . $_POST['message'] . '</li>
  </ul>';

$email = new Mail();
$email->setFrom('serpivolant_umbonal@simplelogin.fr', 'Notificaciones Web Seguros C de Santos');
$email->setSubject($contact_subject);
$email->addTo('devsojourn@pm.me', 'Example Sender');
$email->addContent('text/html', $contact_message);

//$sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));
$sendgrid = new \SendGrid(SENDGRID_API_KEY);
try {
    $response = $sendgrid->send($email);
    printf("Response status: %d\n\n", $response->statusCode());

        $headers = array_filter($response->headers());
        echo "Response Headers\n\n";
        foreach ($headers as $header) {
        echo '- ' . $header . "\n";
    }
} catch (Exception $e) {
    echo 'Caught exception: '. $e->getMessage() ."\n";
}
