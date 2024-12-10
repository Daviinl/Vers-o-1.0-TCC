// === DOM ===
const projectsList = document.getElementById('projects-list'); // Lista de projetos
const newProjectForm = document.getElementById('newProjectForm'); // Formulário de novo projeto
const modal = document.getElementById('newProjectModal'); // Modal
const successMessage = document.getElementById('successMessage'); // Mensagem de sucesso
let currentStep = 1; // Controle do passo no modal

// Botões do modal
document.getElementById('newProjectButton').onclick = () => { modal.style.display = 'block'; };
document.getElementById('closeModal').onclick = () => { modal.style.display = 'none'; };
window.onclick = (event) => { if (event.target === modal) modal.style.display = 'none'; };

// Navegação do modal
document.getElementById('nextStep').onclick = () => {
    if (currentStep === 1) {
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
        currentStep++;
        document.getElementById('prevStep').style.display = 'inline-block';
        document.getElementById('nextStep').style.display = 'none';
        document.getElementById('submitForm').style.display = 'inline-block';
    }
};

document.getElementById('prevStep').onclick = () => {
    if (currentStep === 2) {
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step1').classList.add('active');
        currentStep--;
        document.getElementById('prevStep').style.display = 'none';
        document.getElementById('nextStep').style.display = 'inline-block';
        document.getElementById('submitForm').style.display = 'none';
    }
};

// Função para carregar projetos
async function loadProjects() {
    projectsList.innerHTML = '<tr><td colspan="6">Carregando...</td></tr>';
    try {
        const projectsRef = firebase.database().ref('projects');
        projectsRef.once('value', (snapshot) => {
            const projects = snapshot.val();
            projectsList.innerHTML = '';
            if (projects) {
                Object.keys(projects).forEach(id => {
                    const project = projects[id];
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${project.name}</td>
                        <td>${project.course}</td>
                        <td>${project.classGroup}</td>
                        <td>${project.shift}</td>
                        <td>${project.advisor}</td>
                        <td>
                            <button onclick="editProject('${id}')">Editar</button>
                            <button onclick="deleteProject('${id}')">Excluir</button>
                        </td>`;
                    projectsList.appendChild(row);
                });
            } else {
                projectsList.innerHTML = '<tr><td colspan="6">Nenhum projeto encontrado.</td></tr>';
            }
        });
    } catch (error) {
        alert('Erro ao carregar os projetos.');
        console.error(error);
    }
}

// Função para editar um projeto (em desenvolvimento)
function editProject(projectId) {
    alert(`Funcionalidade de edição em desenvolvimento para o projeto ID: ${projectId}`);
}

// Função para excluir um projeto
async function deleteProject(projectId) {
    if (confirm("Tem certeza que deseja excluir o projeto?")) {
        try {
            const projectRef = firebase.database().ref(`projects/${projectId}`);
            await projectRef.remove();
            alert('Projeto excluído com sucesso!');
            loadProjects();
        } catch (error) {
            alert('Erro ao excluir o projeto.');
            console.error(error);
        }
    }
}

// Submissão do formulário
newProjectForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(newProjectForm);
    try {
        const projectsRef = firebase.database().ref('projects');
        await projectsRef.push(Object.fromEntries(formData.entries()));
        successMessage.style.display = 'block';
        setTimeout(() => { successMessage.style.display = 'none'; }, 3000);
        modal.style.display = 'none';
        loadProjects();
    } catch (error) {
        alert('Erro ao salvar o projeto.');
        console.error(error);
    }
};

// Carrega os projetos ao carregar a página
loadProjects();
