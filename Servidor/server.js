const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const path = require('path');
const cors = require('cors');

// Configuração do Firebase Admin
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://senai-repositorio.firebaseio.com'
});

const db = admin.firestore();

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './uploads';
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Inicializa o servidor Express
const app = express();
app.use(cors());
app.use(express.json());

// Testa a conexão com o Firestore
db.collection('projects')
    .get()
    .then(snapshot => {
        console.log(`Conexão com Firestore estabelecida. Projetos encontrados: ${snapshot.size}`);
    })
    .catch(error => {
        console.error('Erro ao conectar ao Firestore:', error);
    });

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
            console.log('Body recebido:', req.body); // Log dos dados enviados
            console.log('Files recebidos:', req.files); // Log dos arquivos enviados

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

            const docRef = await db.collection('projects').add(projectData);
            console.log(`Projeto salvo com ID: ${docRef.id}`);

            res.status(201).json({ id: docRef.id, message: 'Projeto criado com sucesso!' });
        } catch (error) {
            console.error('Erro ao criar o projeto:', error);
            res.status(500).json({ message: 'Erro ao criar o projeto' });
        }
    }
);

// Inicia o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
