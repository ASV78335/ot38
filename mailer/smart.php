<?php 

$json = file_get_contents('php://input');

$arr = json_decode($json, JSON_UNESCAPED_UNICODE);

$name = $arr['name'];
$phone = $arr['phone'];
$email = $arr['email'];


// $message = $arr['name'] . ';  ' . $arr['phone'] . '; ' . $arr['email'];
// $file = fopen('token_data.json','w+');
// fwrite($file, $message);
// fclose($file);


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                            	// Enable verbose debug output

$mail->isSMTP();                                    	// Set mailer to use SMTP
$mail->Host = '';	  						// Specify main and backup SMTP servers
$mail->SMTPAuth = false;                             	// Enable SMTP authentication
$mail->Username = '';        			// Наш логин
$mail->Password = '';                       	// Наш пароль от ящика
$mail->SMTPSecure = '';                          	// Enable TLS encryption, `ssl` also accepted
$mail->Port = 25;                                  	// TCP port to connect to
 
$mail->setFrom('', 'Test');				// От кого письмо 
$mail->addAddress('');   				// Add a recipient
//$mail->addAddress('ellen@example.com');           	// Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');     	// Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  	// Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные: <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . ' <br>';


if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>