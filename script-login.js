// Função para validar o login de usuários
function validateUserLoginForm(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validações básicas
    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    // Buscar usuários no localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Procurar pelo usuário
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert('Login realizado com sucesso! Bem-vindo(a) ' + user.name);
        // Redirecionar para a página principal do usuário
        window.location.href = '../meu aluno 2/index.html';
    } else {
        alert('Email ou senha incorretos!');
    }

    return false;
}
