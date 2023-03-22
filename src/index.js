const express = require('express');
const multer = require('multer');
const path = require('path');
const Routers = require("./routes/home");

//Initialization
const app = express();

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname.slice(-5));
    }
});

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(multer({
    storage
}).array('file', 6));
app.use(express.json());
app.use(Routers);

app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
});