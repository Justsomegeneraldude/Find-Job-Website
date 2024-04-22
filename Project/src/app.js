
const routingPaths = require('./routes/routingPaths');

// Method Override
const methodOverride = require('method-override')

const db = require('./config/db/index');

const cors =  require("cors");
const cookieParser = require("cookie-parser");
const express = require('express');
const expressHandlebars = require('express-handlebars')
require('dotenv').config({path:'./env/.env'});
const session = require('express-session')
const flash = require('connect-flash')

const app = express();

const port = process.env.PORT;


app.engine('hbs', expressHandlebars.engine({
    defaultLayout: 'main',
    extname: '.hbs',
}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded(
    {
       extended: true
    }
    
));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret:'secret',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized:false
}))
app.use(flash())

app.set('views', './views');

db.connect();

routingPaths(app);

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    'press Ctrl-C to terminate. '));
