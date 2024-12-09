// === DOM ===
const projectsList = document.getElementById('projects-list'); // Tabela de projetos
const newProjectForm = document.getElementById('newProjectForm'); // Formulário de novo projeto
const modal = document.getElementById('newProjectModal'); // Modal de novo projeto
const successMessage = document.getElementById('successMessage'); // Elemento de mensagem de sucesso

// === Funções ===

// Função para carregar os projetos do Firebase
async function loadProjects() {
    projectsList.innerHTML = ''; // Limpa a tabela antes de adicionar os projetos

    try {
        // Referência para a coleção 'projects' no Firebase
        const projectsRef = firebase.database().ref('projects');

        // Obtenção dos projetos do Firebase
        projectsRef.once('value', (snapshot) => {
            const projects = snapshot.val();
            if (projects) {
                Object.keys(projects).forEach(projectId => {
                    const project = projects[projectId];
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
                                    <button class="edit-btn" onclick="editProject('${projectId}')">Editar</button>
                                    <button class="delete-btn" onclick="deleteProject('${projectId}')">Excluir</button>
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
        });
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        alert('Erro ao carregar os projetos.');
    }
}

// Função para excluir um projeto
async function deleteProject(projectId) {
    if (confirm("Tem certeza que deseja excluir o projeto?")) {
        try {
            const projectRef = firebase.database().ref(`projects/${projectId}`);
            await projectRef.remove();
            alert('Projeto excluído com sucesso!');
            loadProjects(); // Recarrega a lista de projetos
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
newProjectForm.onsubmit = async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coletando os dados do formulário
    const formData = new FormData(newProjectForm);
    
    try {
        // Adicionando o projeto ao Firebase
        const newProject = {
            name: formData.get('name'),
            course: formData.get('course'),
            classGroup: formData.get('classGroup'),
            shift: formData.get('shift'),
            advisor: formData.get('advisor'),
            videoPitch: formData.get('videoPitch') ? formData.get('videoPitch') : null,
            documentTCC: formData.get('documentTCC') ? formData.get('documentTCC') : null,
            prototype: formData.get('prototype') ? formData.get('prototype') : null,
            pmCanvas: formData.get('pmCanvas') ? formData.get('pmCanvas') : null,
        };

        // Referência para a coleção de projetos no Firebase
        const projectsRef = firebase.database().ref('projects');
        const newProjectRef = projectsRef.push(); // Cria uma nova referência
        await newProjectRef.set(newProject); // Salva o projeto no Firebase

        // Exibindo a mensagem de sucesso
        successMessage.innerHTML = 'Projeto criado com sucesso!';
        successMessage.style.display = 'block'; // Exibe a mensagem
        setTimeout(() => {
            successMessage.style.display = 'none'; // Esconde a mensagem após 3 segundos
        }, 3000);

        // Fecha o modal
        modal.style.display = 'none';

        // Atualiza a lista de projetos após a criação
        loadProjects(); 
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar o projeto');
    }
};
