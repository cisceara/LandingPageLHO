<?php
// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta os dados do formulário e realiza o tratamento adequado
    $nome = trim($_POST['nome']);  // Remove espaços extras antes e depois
    $telefone = trim($_POST['telefone']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);  // Sanitiza o email
    $mensagem = trim($_POST['mensagem']);  // Remove espaços extras

    // Verifica se os campos obrigatórios foram preenchidos
    if (empty($nome) || empty($telefone) || empty($email) || empty($mensagem)) {
        die("Por favor, preencha todos os campos obrigatórios.");
    }

    // Evita que o usuário insira código HTML nas entradas
    $nome = htmlspecialchars($nome, ENT_QUOTES, 'UTF-8');
    $telefone = htmlspecialchars($telefone, ENT_QUOTES, 'UTF-8');
    $mensagem = htmlspecialchars($mensagem, ENT_QUOTES, 'UTF-8');

    // Validação de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("O email informado não é válido.");
    }

    // Configuração do email
    $to = 'suportecis@sfiec.org.br';  // Destinatário
    $subject = 'Nova mensagem de contato';  // Assunto
    $message = "Você recebeu uma nova mensagem de contato:\n\n";
    $message .= "Nome: $nome\n";
    $message .= "Telefone: $telefone\n";
    $message .= "Email: $email\n";
    $message .= "Mensagem:\n$mensagem\n";

    // Cabeçalhos do email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n"; // O email do remetente
    $headers .= "Reply-To: $email" . "\r\n"; // Resposta para o email do remetente

    // Enviar o email
    if (mail($to, $subject, $message, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar mensagem. Tente novamente.";
    }
} else {
    echo "Método inválido.";
}
?>
