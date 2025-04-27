<?php
// Файлы phpmailer
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

$title = 'Заявка с сайта';

foreach ($_POST as $key => $value) {
  if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
    $body .= "
      " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
        <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
      </tr>
      ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth = true;

  $mail->Host = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username = 'roman_sharapov1337@mail.com'; // Логин на почте
  $mail->Password = 'V1FXsguyC2wPgPiBXy6W'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;

  $mail->setFrom('roman_sharapov1337@mail.com', 'Заявка с сайта'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('roman_sharapov1337@mail.com');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();

} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
