const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const app = express();
const mysql = require("promise-mysql");
const fileUpload = require('express-fileupload');
const csrfProtection = csurf({ cookie: true });

const corsOptions = {
    origin: 'http://localhost:5173', // Spécifie l'origine autorisée
    credentials: true, // Permet l'envoi de credentials cross-origin
  };

require('dotenv').config();

app.use(fileUpload({ createParentPath: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });

let config;

if (!process.env.HOST) {
    config = require("./config-offline");
} else {
    config = require("./config-online");
}

const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD || config.db.password;

mysql.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
})
.then((db) => {
    setInterval(async () => {
        await db.query("SELECT 1");
    }, 10000);
    
    app.use((req, res, next) => {
        req.db = db;
        next();
    });

    app.get('/', (req, res, next) => {
        res.json({ status: 200, msg: "connexion a la racine ok" });
    });
    
    const userRoutes = require("./routes/userRoutes");
    const productRoutes = require("./routes/productRoutes");
    const classRoutes = require("./routes/classRoutes");
    const orderRoutes = require("./routes/orderRoutes");
    const orderDetailRoutes = require("./routes/orderDetailRoutes");
    const libraryRoutes = require("./routes/libraryRoutes");
    const itemRoutes = require("./routes/itemRoutes");
    const searchRoutes = require('./routes/searchRoutes');
    const authRoutes = require('./routes/authRoutes');
    const adultVerifyRoutes = require('./routes/adultVerifyRoutes');
    const stripeRoutes = require('./routes/stripeRoutes');


    userRoutes(app, db);
    productRoutes(app, db);
    classRoutes(app, db);
    orderRoutes(app, db);
    orderDetailRoutes(app, db);
    libraryRoutes(app, db);
    itemRoutes(app, db);
    searchRoutes(app, db);
    authRoutes(app,db);
    adultVerifyRoutes(app,db);
    stripeRoutes(app,db);
})
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
});