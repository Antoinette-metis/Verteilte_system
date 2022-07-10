const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
//var mysql = require('mysql2');
var handlebars = require("handlebars");
var fs = require("fs");
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var request = require('request');
//const { parse } = require('querystring');
var resultArray
var patientendaten
var patient
var arztdaten;
var arzt;
/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mateda04",
   database:'apa-system'
});*/
const app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        getShortComment(comment) {
            if (comment.length < 64) {
                return comment;
            }

            return comment.substring(0, 64) + '...';
        }
    }
}));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('index', {
        posts: [
            {
                author: 'Janith Kasun',
                image: 'https://picsum.photos/500/500',
                comments: [
                    'This is the first comment',
                    'This is the second comment',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
                ]
            }, 
            {
                author: 'John Doe',
                image: 'https://picsum.photos/500/500?2',
                comments: [
                ]
            }
        ]
    });
});
app.get('/registerApotheke', function (req, res){
    res.render('registerApotheke');
    console.log(req.method);
});


app.get('/registerkunde', function (req, res){
    res.render('registerkunde');
});

app.get('/loginApotheke', function (req, res){
    res.render('loginApotheke');
});

app.get('/loginKunde', function (req, res){
    res.render('loginKunde');
});

app.get('/ApothekeAnsicht', function (req, res){
    res.render('ApothekeAnsicht');
});

app.get('/KundeAnsicht', function (req, res){
    res.render('KundeAnsicht');
});

app.get('/listmedikamenteApotheke', function (req, res){
    var request = require('request');
    var data ; 
    var options = {
        'method': 'GET',
        'url': 'http://localhost:8090/items',
        'headers': {
        }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    var items;
    resultArray = JSON.parse(response.body)
    console.log(resultArray);
    //data = {items:response.body};
    data = {items:resultArray};
    //console.log(data);
    res.render('listmedikamenteApotheke', data);
    }); 
});


 app.post('/registerApotheke', urlencodedParser, function (req, res){
    // Handle post info...
    console.log('POST');
    const userDetails=req.body;
    console.log(req.body);
   //console.log(userDetails );
    //var sql = 'INSERT INTO artz SET ?';
    var request = require('request');
    //var rp = require('request-promise');

    var usern = req.body.nachname
    var mail = req.body.emailadresse
    var PW = req.body.passwort
   
    
    var requestData= {
        request: {
            email: mail,
            username: usern,
            password: PW
        }
        };
    console.log(requestData); 
    var options = {
        'method': 'POST',
        'url': 'http://localhost:8080/users',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": mail,
          "username": usern,
          "password": PW
        })
      
      };
      request(options, function (error, response) {
        if (error)
        {
            res.render('registerApoteke');
            throw new Error(error);
        } 
        res.render('loginApotheke');
        console.log(response.body);
      });    
   
   
}); 

app.post('/registerkunde', urlencodedParser, function (req, res){
    // Handle post info...
    console.log('POST');
    const userDetails=req.body;
    console.log(req.body);
   //console.log(userDetails );
    //var sql = 'INSERT INTO artz SET ?';
    var request = require('request');
    //var rp = require('request-promise');

    var usern = req.body.nachname
    var mail = req.body.emailadresse
    var PW = req.body.passwort
   
    
    var requestData= {
        request: {
            email: mail,
            username: usern,
            password: PW
        }
        };
    console.log(requestData); 
    var options = {
        'method': 'POST',
        'url': 'http://localhost:8080/users',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": mail,
          "username": usern,
          "password": PW
        })
      
      };
      request(options, function (error, response) {
        if (error)
        {
            res.render('registerKunde');
            throw new Error(error);
        } 
        res.render('loginKunde');
        console.log(response.body);
      });    
        
    });

app.post('/ApothekeAnsicht', urlencodedParser, function (req, res){
        // Handle post info...
        console.log('POST');
        const userDetails=req.body;
        console.log(req.body);
       //console.log(userDetails );
        //var sql = 'INSERT INTO artz SET ?';
        var request = require('request');
        //var rp = require('request-promise');
    
        var medname = req.body.medikamentename
        var price = req.body.medikamentepreis
        var amount = req.body.Anzahl
        var description = req.body.Beschreibung
       
        
        var requestData= {
            request: {
                medikamentename: medname,
                medikamentepreis: price,
                Anzahl:amount,
                Beschreibung:description
            }
            };
        console.log(requestData); 
        var options = {
            'method': 'POST',
            'url': 'http://localhost:8090/items',
            //'url': 'localhost:8090/items',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "name": medname,
              "description": description,
              "price": price,
              "amount": amount
            })
          
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            res.render('ApothekeAnsicht');
          });  

        });




//router.post("delete/items/:id", deleteItems); // This is reached when the client calls post('delete/user/1a2b3c4d'). The id is read with req.params.id
app.get('/items/delete/:id', urlencodedParser, function (req, res){
    console.log(req.params.id);
    var options = {
        'method': 'DELETE',
        'url': 'http://localhost:8090/items/'+String(req.params.id),
        'headers': {
        },
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.render('ApothekeAnsicht');
      });    

});

// Login endpoint
app.get('/login', function (req, res) {
    var mail = req.body.emailadresse
    var PW = req.body.passwort
    authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
    
  });
var users 
async function authenticate({ username, password }) {
    var request = require('request');
    var options = {
    'method': 'GET',
    'url': 'localhost:8080/',
    'headers': {
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    users = response.body
    });
    const user = users.find(u => u.emailadresse === emailadresse && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

function authenticate(req, res, next) {
   authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}



  // Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
  });

app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});