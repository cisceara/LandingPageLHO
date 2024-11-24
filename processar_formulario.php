<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST['nome']);  
    $telefone = trim($_POST['telefone']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);  
    $mensagem = trim($_POST['mensagem']); 

    if (empty($nome) || empty($telefone) || empty($email) || empty($mensagem)) {
        echo json_encode(["status" => "error", "message" => "Por favor, preencha todos os campos obrigatórios."]);
        exit;
    }

    $nome = htmlspecialchars($nome, ENT_QUOTES, 'UTF-8');
    $telefone = htmlspecialchars($telefone, ENT_QUOTES, 'UTF-8');
    $mensagem = htmlspecialchars($mensagem, ENT_QUOTES, 'UTF-8');

    // Validação de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "O email informado não é válido."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Configuração do SMTP
        $mail->isSMTP();  
        $mail->Host = 'smtp.gmail.com';  
        $mail->SMTPAuth = true; 
        $mail->Username = 'math.mill01@gmail.com';  // E-mail do Gmail que vai processar os dados;
        $mail->Password = 'zsiblzsotejiiilm';  // Senha do Gmail (ou  "Senhas de app" caso tenha verificação de duas etapas;
        $mail->Port = 587; 

        $mail->setFrom($email, $nome);  // Remetente
        $mail->addAddress('math.mill01@gmail.com');  // Destinatário

        $mail->isHTML(false);  
        $mail->Subject = 'Contato_LandingPage - LHO'; 
        $mail->Body = "Solicitação gerada através do formulário na LandingPage do LHO, dados do usuário:\n\n";
        $mail->Body .= "Nome: $nome\n";
        $mail->Body .= "Telefone: $telefone\n";
        $mail->Body .= "Email: $email\n";
        $mail->Body .= "Mensagem:\n$mensagem\n";

        // Enviar o e-mail
        $mail->send();
        echo json_encode(["status" => "success", "message" => "Mensagem enviada com sucesso!"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Erro ao enviar a mensagem. Erro: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método inválido."]);
}
?>
