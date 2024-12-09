const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const path = require('path');
const cors = require('cors'); // Importa o pacote CORS

// Corrigindo o caminho para o arquivo de credenciais
const serviceAccount = require('./firebase-service-account.json'); // Remova a extensão extra

// Inicialize o Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://senai-repositorio.firebaseio.com' // URL correta
});

const db = admin.firestore();

// Configuração do storage do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define a pasta onde os arquivos serão salvos
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        // Gera um nome único para cada arquivo
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Criação do middleware do multer
const upload = multer({ storage });

// Inicializa o servidor Express
const app = express();

// Configura o middleware para habilitar CORS
app.use(cors());

// Configura o middleware para lidar com JSON
app.use(express.json());

// Rota para criar novo projeto
app.post(
    '/projects',
    upload.fields([
        { name: 'videoPitch', maxCount: 1 },
        { name: 'documentTCC', maxCount: 1 },
        { name: 'prototype', maxCount: 1 },
        { name: 'pmCanvas', maxCount: 1 }
    ]),
    async (req, res) => {
        try {
            const projectData = {
                name: req.body.name,
                course: req.body.course,
                classGroup: req.body.classGroup,
                shift: req.body.shift,
                advisor: req.body.advisor,
                videoPitch: req.files['videoPitch'] ? req.files['videoPitch'][0].path : null,
                documentTCC: req.files['documentTCC'] ? req.files['documentTCC'][0].path : null,
                prototype: req.files['prototype'] ? req.files['prototype'][0].path : null,
                pmCanvas: req.files['pmCanvas'] ? req.files['pmCanvas'][0].path : null,
                createdAt: new Date()
            };

            // Salvar o projeto no Firebase Firestore
            const docRef = await db.collection('projects').add(projectData);
            res.status(201).json({ id: docRef.id, message: 'Projeto criado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar o projeto' });
        }
    }
);

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
