// ------------------ DOM ------------------
// Seleciona o modal
const modal = document.getElementById('modal');

// ------------------ Functions ------------------
// Função para abrir o modal
function openModal(event) {
    event.stopPropagation(); // Evita que o clique se propague para outros elementos
    modal.classList.remove('hidden'); // Remove a classe que oculta o modal
}

// Função para fechar o modal
function closeModal() {
    modal.classList.add('hidden'); // Adiciona a classe que oculta o modal
}
