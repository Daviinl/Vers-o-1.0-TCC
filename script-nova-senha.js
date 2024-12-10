// Função para validar e salvar a nova senha
function validateNewPasswordForm(event) {
    event.preventDefault();
    
    const password = document.getElementById('senha').value;
    const confirmPassword = document.getElementById('confirmar-senha').value;
    const resetData = JSON.parse(localStorage.getItem('resetCode'));

    if (!resetData) {
        alert('Sessão expirada. Por favor, inicie o processo novamente.');
        window.location.href = 'esqueci-senha.html';
        return false;
    }

    if (!password || !confirmPassword) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return false;
    }

    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return false;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === resetData.email);
    
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], password };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem('resetCode');
        
        alert('Senha alterada com sucesso!');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 100);
    } else {
        alert('Usuário não encontrado. Por favor, tente novamente.');
    }

    return false;
}
