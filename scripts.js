// Função para validar o formulário de login
function validateLoginForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }
    if (!validateEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return false;
    }

    alert('Login realizado com sucesso!');
    return true;
}

// Função para validar o formulário de cadastro
// Função para validar o formulário de cadastro
function validateSignupForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;

    // Validações
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

    // Criar objeto com dados do usuário
    const userData = {
        name: name,
        email: email,
        password: password
    };

    // Salvar no localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
    return false;
}

// Função para validar o login
function validateLoginForm(event) {
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
        // Aqui você pode redirecionar para a página principal
        // window.location.href = 'home.html';
    } else {
        alert('Email ou senha incorretos!');
    }

    return false;
}

// Função para verificar se o email já está cadastrado
function isEmailRegistered(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
}

// Função utilitária para validar e-mail
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Função para validar o formulário "Esqueci a Senha"
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

    // Verifica se o email está cadastrado
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (!userExists) {
        alert('Email não encontrado no sistema.');
        return false;
    }

    // Gerar código aleatório de 4 dígitos
    const code = Math.floor(1000 + Math.random() * 9000);
    
    // Salvar o código e email no localStorage para verificação posterior
    localStorage.setItem('resetCode', JSON.stringify({
        email: email,
        code: code,
        timestamp: new Date().getTime()
    }));

    alert(`Código de verificação: ${code}`);
    
    // Redirecionar para a página de verificação de código
    window.location.href = 'codigo.html';
    
    return false;
}


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

    // Verifica se o código tem 4 dígitos
    if (code.length !== 4) {
        alert('O código deve ter 4 dígitos.');
        return false;
    }

    // Verifica se o código está correto
    if (code === resetData.code.toString()) {
        alert('Código verificado com sucesso!');
        window.location.href = 'nova-senha.html';
    } else {
        alert('Código inválido. Tente novamente.');
    }

    return false;
}


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

    // Buscar usuários do localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Encontrar o usuário pelo email
    const userIndex = users.findIndex(user => user.email === resetData.email);
    
    if (userIndex !== -1) {
        // Atualizar a senha do usuário
        users[userIndex] = {
            ...users[userIndex],
            password: password
        };
        
        // Salvar a lista atualizada no localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Limpar o código de reset
        localStorage.removeItem('resetCode');
        
        alert('Senha alterada com sucesso!');
        
        // Redirecionar para login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 100);
    } else {
        alert('Usuário não encontrado. Por favor, tente novamente.');
    }

    return false;
}

// Função utilitária para validar e-mail
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
