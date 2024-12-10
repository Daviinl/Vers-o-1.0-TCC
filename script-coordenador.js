// Função para validar o login de coordenador com credenciais fixas
function validateCoordinatorLoginForm(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validações básicas
    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    // Verificação das credenciais fixas para coordenador
    const coordinatorEmail = 'coordenador@gmail.com';
    const coordinatorPassword = '123456';

    if (email === coordinatorEmail && password === coordinatorPassword) {
        alert('Login de coordenador realizado com sucesso! Bem-vindo(a) Coordenador(a)');
        // Redirecionar para a página do coordenador
        window.location.href = '../menu_cordenador/index.html';
    } else {
        alert('Email ou senha de coordenador incorretos!');
    }

    return false;
}
