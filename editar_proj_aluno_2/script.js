// Captura o envio do formulário
document.querySelector('.project-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os dados do formulário
    const nomeProjeto = document.getElementById('nome-projeto').value;
    const descricaoProjeto = document.getElementById('descricao-projeto').value;
    const curso = document.getElementById('curso').value;
    const turma = document.getElementById('turma').value;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (nomeProjeto && descricaoProjeto && curso && turma) {
        // Salva o projeto no localStorage
        const project = {
            nome: nomeProjeto,  
            descricao: descricaoProjeto,
            curso: curso,
            turma: turma,
            turno: "Matutino", // Coloque o valor do turno conforme necessário
            orientador: "Carlos André" // Coloque o nome do orientador conforme necessário
        };

        // Salva o projeto no localStorage
        localStorage.setItem('projeto', JSON.stringify(project));

        // Exibe o modal de sucesso
        document.getElementById('successModal').style.display = 'block';
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
});

// Fecha o modal ao clicar no botão "Ok"
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('successModal').style.display = 'none'; // Fecha o modal
});

//  upload de arquivos e atualizar o texto do botão
function handleFileUpload(input, buttonId, defaultText) {
    const button = document.getElementById(buttonId);
    const fileName = input.files.length > 0 ? input.files[0].name : defaultText;
    button.textContent = fileName;
}

// edição do link
function enableEdit() {
    const linkInput = document.getElementById('link-input');
    linkInput.removeAttribute('disabled');  // Habilita a edição do input
    linkInput.focus();  // Foca no input para que o usuário possa editar
}






