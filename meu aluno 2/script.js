// === DOM ===
const projectsList = document.getElementById('projects-list'); // Tabela de projetos
const newProjectForm = document.getElementById('newProjectForm'); // Formulário de novo projeto

// === Funções ===

// Função para carregar os projetos do backend
async function loadProjects() {
    projectsList.innerHTML = ''; // Limpa a tabela antes de adicionar os projetos

    try {
        const response = await fetch('http://localhost:3000/projects');
        const projects = await response.json();

        if (projects.length > 0) {
            projects.forEach(project => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${project.name}</td>
                    <td>${project.course}</td>
                    <td>${project.classGroup}</td>
                    <td>${project.shift}</td>
                    <td>${project.advisor}</td>
                    <td>
                        <div class="action-menu">
                            <button class="action-btn" onclick="togglePicker(this)">⋮</button>
                            <div class="picker-content" style="display: none;">
                                <button class="edit-btn" onclick="editProject('${project.id}')">Editar</button>
                                <button class="delete-btn" onclick="deleteProject('${project.id}')">Excluir</button>
                            </div>
                        </div>
                    </td>
                `;
                projectsList.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6">Nenhum projeto encontrado.</td>`;
            projectsList.appendChild(row);
        }
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        alert('Erro ao carregar os projetos.');
    }
}

// Função para excluir um projeto
async function deleteProject(projectId) {
    if (confirm("Tem certeza que deseja excluir o projeto?")) {
        try {
            const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Projeto excluído com sucesso!');
                loadProjects(); // Recarrega a lista de projetos
            } else {
                const error = await response.json();
                alert('Erro ao excluir o projeto: ' + error.message);
            }
        } catch (error) {
            console.error('Erro ao excluir o projeto:', error);
            alert('Erro ao excluir o projeto.');
        }
    }
}

// Função para exibir ou esconder o menu de ações
function togglePicker(button) {
    const pickerContent = button.nextElementSibling;
    pickerContent.style.display = pickerContent.style.display === 'none' ? 'block' : 'none';
}

// Função para editar um projeto
function editProject(projectId) {
    // Chamar o backend para buscar os dados do projeto, caso necessário
    // Para simplificação, o projeto já poderia estar carregado em cache ou localmente
    alert(`Funcionalidade de edição em desenvolvimento para o projeto ID: ${projectId}`);
}

// Função para salvar um novo projeto
newProjectForm.onsubmit = async function(event) {
    event.preventDefault(); // Impede o comportamento padrão de envio de formulário

    // Cria os dados do formulário
    const formData = new FormData(newProjectForm);

    try {
        const response = await fetch('http://localhost:3000/projects', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Projeto criado com sucesso!');
            const modal = document.getElementById('newProjectModal');
            modal.style.display = 'none'; // Fecha o modal
            loadProjects(); // Atualiza a lista de projetos
        } else {
            const error = await response.json();
            alert('Erro ao criar o projeto: ' + error.message);
        }
    } catch (error) {
        console.error('Erro ao criar o projeto:', error);
        alert('Erro ao criar o projeto.');
    }
};

// === Inicialização ===
// Carregar projetos ao carregar a página
document.addEventListener('DOMContentLoaded', loadProjects);
