const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => res.send('Hello World!'));

router.post('/api.sammy.imge/upload', (req, res) => {
    console.log(req.files);
    if (!req.file && !req.files) res.send({ error: 'File not found' });
    if (req.files) {
        const arrayDataImg = req.files.map((file) => ({ url: "https://sapimg.fly.dev/uploads/" + file.filename, name: file.filename }));
        res.send(arrayDataImg);
    }
});

router.get('/uploads/:img', (req, res) => {
    res.sendFile('./uploads/' + req.params.img, {
        root: path.join(__dirname, '../public')
    });
});

module.exports = router;