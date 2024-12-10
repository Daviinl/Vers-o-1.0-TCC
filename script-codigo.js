// Função para validar o código
function validateCodeForm(event) {
    event.preventDefault();
    
    const code = document.getElementById('codigo').value;
    const resetData = JSON.parse(localStorage.getItem('resetCode'));

    if (!resetData) {
        alert('Sessão expirada. Por favor, solicite um novo código.');
        window.location.href = 'esqueci-senha.html';
        return false;
    }

    if (!code) {
        alert('Por favor, insira o código enviado para seu e-mail.');
        return false;
    }

    if (code.length !== 4) {
        alert('O código deve ter 4 dígitos.');
        return false;
    }

    if (code === resetData.code.toString()) {
        alert('Código verificado com sucesso!');
        window.location.href = 'nova-senha.html';
    } else {
        alert('Código inválido. Tente novamente.');
    }

    return false;
}
