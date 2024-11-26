Configuração do Projeto

# 1. Clone o Repositório

Para clonar o repositório, execute:

git clone https://github.com/SEU_USUARIO/gestao-de-tcc.git
cd gestao-de-tcc

# 2. Se já houver arquivos locais sem Git iniciado

Caso você já tenha arquivos prontos no diretório local e ainda não tenha iniciado o Git, siga os passos abaixo para configurar este repositório como remoto:

# Inicie o Git no diretório
git init

# Adicione os arquivos ao controle de versão
git add .

# Faça o primeiro commit
git commit -m "Primeiro commit do projeto"

# Adicione o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/gestao-de-tcc.git

# Envie os arquivos para o repositório remoto
git push -u origin master


# 3. Instale as Dependências

Execute o comando abaixo para instalar todas as dependências listadas no package.json:

npm install


# 4. Configure o Firebase Admin SDK

•	No console do Firebase, acesse Configurações do Projeto > Contas de Serviço e baixe a chave JSON.
•	Salve o arquivo JSON no diretório do projeto e configure o Firebase Admin SDK no index.js conforme o exemplo abaixo

// index.js
const admin = require('firebase-admin');
const serviceAccount = require('./caminho/para/sua-chave.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<SEU_PROJETO>.firebaseio.com"
});


# 5. Inicie o Servidor

Para iniciar o servidor localmente, execute o seguinte comando:

node index.js

O servidor estará em execução no http://localhost:3000.


# Estrutura do Código

•	index.js: Arquivo principal onde as rotas da API e a lógica principal do servidor estão configuradas.
•	routes/: Contém as rotas principais para usuarios, projetos, cursos e turmas.
•	controllers/: Lógica de negócios para cada rota, implementando permissões e validações específicas.
•	functions/: Contém as Firebase Cloud Functions para notificações automáticas e validações adicionais.

# Rotas Principais da API

•	GET /projetos - Listar todos os projetos (para coordenadores e professores).
•	POST /projetos - Criar um projeto (apenas para alunos líderes).
•	GET /projetos/:id - Visualizar detalhes de um projeto.
•	PUT /projetos/:id - Atualizar um projeto (para coordenadores e orientadores autorizados).
•	GET /usuarios/:id/projetos - Listar projetos específicos de um aluno ou orientador.

# Firebase Cloud Functions

Utilizando Node.js para criar Cloud Functions que são executadas automaticamente para ações específicas:

•	Notificações: Envia notificações ao orientador quando o aluno atualiza um projeto.
•	Validação de Dados: Verifica se apenas coordenadores podem editar todos os projetos.
•	Automação de Tarefas: Realiza ações programadas para atualização de dados e integração com APIs externas.

# Como Contribuir

1.	Faça um fork do repositório.
2.	Crie uma nova branch com a sua funcionalidade (git checkout -b feature/funcionalidade).
3.	Commit suas alterações (git commit -m 'Adiciona nova funcionalidade').
4.	Push para a branch (git push origin feature/funcionalidade).
5.	Abra um Pull Request.

Obrigado!
