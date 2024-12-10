// Função para validar o formulário "Esqueci a Senha"
function validateForgotPasswordForm(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;

    if (!email) {
        alert('Por favor, insira seu e-mail.');
        return false;
    }
    if (!validateEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return false;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (!userExists) {
        alert('Email não encontrado no sistema.');
        return false;
    }

    const code = Math.floor(1000 + Math.random() * 9000);
    
    localStorage.setItem('resetCode', JSON.stringify({ email, code, timestamp: new Date().getTime() }));

    alert(`Código de verificação: ${code}`);
    window.location.href = 'codigo.html';
    
    return false;
}
