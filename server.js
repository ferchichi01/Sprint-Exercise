// We’ll declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const sprintlist = require('./controllers/sprintlist');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const router = express.Router();


// Connect mongoose to our database
mongoose.connection.openUri(config.database);



//Initialize our app variable
const app = express();

//Declaring Port
const port = 3000;

//Middleware for CORS
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.send("Invalid page");
})

//Routing all HTTP requests to /sprintlist to sprintlist controller


//swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/sprintlist',sprintlist);
//app.use('/', router);

//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});