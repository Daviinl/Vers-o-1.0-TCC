// Função para validar o e-mail
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Função para validar o formulário de cadastro
function validateSignupForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;

    if (!name || !email || !password) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return false;
    }

    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return false;
    }

    const userData = { name, email, password };
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
    return false;
}
