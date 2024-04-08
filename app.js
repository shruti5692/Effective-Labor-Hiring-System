const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'edisup'
});

// Twilio credentials
const accountSid = 'AC69d87e182d88a9ad4c770522c07f7013'; //AC268dbba92f6e0cb4ef5e06dcc9665f42;   
const authToken = '5859c7b49543d8881f485e623de2365d ';     //'b10460438c12b68f49aacce0fce76fc3'
const twilioPhoneNumber = '+12525019277';                           //+12543562369

const twilio = require('twilio')(accountSid, authToken);



connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database with threadId: ' + connection.threadId);
});

// Root route
app.get("/", function (req, res) {
    //res.sendFile(__dirname + "/public/HTML/login.html");
    //res.redirect('/login');
});





app.get('/sendsms', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sms.html'));
});

// Send SMS using Twilio
app.post('/sendsms', function (req, res) {
    const phoneNumber = req.body.phoneNumber;
    const message = req.body.message;

    twilio.messages
        .create({
            body: message,
            from: twilioPhoneNumber,
            to: phoneNumber
        })
        .then(message => {
            res.send({msg:'SMS sent successfully'});
        })
        .catch(error => {
            console.error('Error sending SMS:', error);
            res.status(500).send('Error sending SMS');
        });
});


// Dashboard route 
app.get('/dashboard', (req, res) => {
    res.send('Welcome to the dashboard!');
});


app.get('/lhome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/lhome.html'));
});

app.get('/jhome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/jhome.html'));
});
app.get('/jhiring', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/jhiring.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/about.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/profile.html'));
});
app.get('/jobsearch', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/jobsearch.html'));
});
app.get('/profile1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/profile.html'));
});



// Login page route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/login.html'));
});

// Signup page route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/signup.html'));
});
// Signup route
app.post('/signup', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const address = req.body.address;
    const userType = req.body.userType;
    const skillDescription = req.body.skillDescription;
    const workstation = req.body.workstation;
    const workDescription = req.body.workDescription;
    const password = req.body.password;
    
    console.log(req.body.userType);

    // Insert user data into the database
    connection.query(
        'INSERT INTO users (firstName, lastName, phone, address, userType,skillDescription,workstation,workDescription,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [firstName, lastName, phone, address, userType,skillDescription,workstation,workDescription ,password],
        (err, results) => {
            if (err) {
               
                res.status(500).send({error:'Error signing up'});
                return;
            }

            res.send({msg:'Signup successful'});
        }
    );
});

app.get('/labours/getall', (req, res) => {
    //getAll labours
    connection.query(
        'SELECT * FROM users WHERE userType="labour"',
        (err, results) => {
            if (err) {
               
                res.status(500).send({error:'Error  While retriving labour data'});
                return;
            }
            //mySql Object to json Object
            var SimpleObject = results.map(v => Object.assign({}, v));
            res.send({msg:'Retrive Data successfully', userData:SimpleObject});
        }
    );
});


app.get('/jobprovider/getall', (req, res) => {
    //getAll labours
    connection.query(
        'SELECT * FROM users WHERE userType="jobProvider"',
        (err, results) => {
            if (err) {
               
                res.status(500).send({error:'Error  While retriving labour data'});
                return;
            }
            //mySql Object to json Object
            var SimpleObject = results.map(v => Object.assign({}, v));
            res.send({msg:'Retrive Data successfully', userData:SimpleObject});
        }
    );
});




// Login route
app.post('/login', (req , res)=>{
    var phone= req.body.phone;
    var password= req.body.password;
    
    connection.query(
        'SELECT * FROM users WHERE phone = ?',
        [phone],
        (error, results) => {
            if (error) {
                res.status(500).send({error:'Error Login up'});
                return;
            }
            if (results.length === 0) {
                res.status(500).send({error:'Incorrect Phone Number'});
                return;
            }
            const user = results[0];
            //mySql Object to json Object
            var SimpleObject = results.map(v => Object.assign({}, v));
            if (password === user.password) {
                res.send({msg:"login successful" , userData:SimpleObject});
            } else {
                res.status(500).send({error:'Incorrect password'});
                
            }
        }
    );
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});


app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});