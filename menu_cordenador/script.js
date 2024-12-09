 // Configuração do Firebase
 const firebaseConfig = {
    apiKey: "AIzaSyBTTxYIK2na2grLO5eXMYkU9KRp4Qn2NUE",
    authDomain: "senai-repositorio.firebaseapp.com",
    projectId: "senai-repositorio",
    storageBucket: "senai-repositorio.firebasestorage.app",
    messagingSenderId: "756646440176",
    appId: "1:756646440176:web:2053be8d7dbb2b50cb6635"
  };

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

const projectsList = document.getElementById('projects-list');

// Função para carregar os projetos do Firebase
async function loadProjects() {
    projectsList.innerHTML = ''; // Limpa a lista de projetos

    try {
        const projectsRef = database.ref('projects');
        const snapshot = await projectsRef.get();

        if (snapshot.exists()) {
            const projects = snapshot.val();
            Object.keys(projects).forEach(projectId => {
                const project = projects[projectId];
                const row = document.createElement('tr');
                row.setAttribute('data-id', projectId);
                row.innerHTML = `
                    <td>
                        <div class="project-link" onclick="handleProjectClick('${projectId}')">
                            <i class="fa-regular fa-folder-open"></i> ${project.name}
                        </div>
                    </td>
                    <td>${project.course}</td>
                    <td>${project.classGroup}</td>
                    <td>${project.shift}</td>
                    <td>${project.advisor}</td>
                    <td class="options-column">
                        <button class="options-btn" onclick="togglePicker(this)">...</button>
                        <div class="dropdown-menu hidden">
                            <button class="edit-btn" onclick="editProject('${projectId}')">Editar</button>
                            <button class="delete-btn" onclick="deleteProject('${projectId}')">Excluir</button>
                        </div>
                    </td>
                `;
                projectsList.appendChild(row);
            });
        } else {
            projectsList.innerHTML = '<tr><td colspan="6">Nenhum projeto encontrado.</td></tr>';
        }
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        alert('Erro ao carregar os projetos.');
    }
}

// Função para editar um projeto
async function editProject(projectId) {
    const projectRef = database.ref('projects/' + projectId);
    const snapshot = await projectRef.get();
    const project = snapshot.val();

    if (project) {
        const newName = prompt("Novo nome do projeto:", project.name);
        const newCourse = prompt("Novo curso:", project.course);
        const newClassGroup = prompt("Nova turma:", project.classGroup);
        const newShift = prompt("Novo turno:", project.shift);
        const newAdvisor = prompt("Novo orientador:", project.advisor);

        if (newName && newCourse && newClassGroup && newShift && newAdvisor) {
            // Atualizar no Firebase
            await projectRef.update({
                name: newName,
                course: newCourse,
                classGroup: newClassGroup,
                shift: newShift,
                advisor: newAdvisor
            });

            alert('Projeto atualizado com sucesso!');
            loadProjects(); // Recarregar a lista de projetos
        } else {
            alert('Todos os campos são obrigatórios.');
        }
    }
}

// Função para excluir um projeto
async function deleteProject(projectId) {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
        const projectRef = database.ref('projects/' + projectId);
        await projectRef.remove();

        alert('Projeto excluído com sucesso!');
        loadProjects(); // Recarregar a lista de projetos
    }
}

// Função para mostrar ou esconder as opções de editar/excluir
function togglePicker(button) {
    const pickerContent = button.nextElementSibling;
    pickerContent.style.display = pickerContent.style.display === 'none' ? 'block' : 'none';
}

// Chamada para carregar os projetos ao iniciar
loadProjects();