const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userData = require('./src/model/UserData');
const bookData = require('./src/model/BookData');

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

VerifyToken = (req,res,next) =>
{
    if (!req.headers.authorization)
    {
        return res.status(401).send('unauthorized');
    }
    let token = req.headers.authorization.split('')[1];
    if (token=='null')
    {
        return res.status(401).send('unauthorized');
    }
    let payload = jwt.verify(token, 'secretKey');
    console.log(payload);
    if (!payload)
    {
        return res.status(401).send('unauthorized');
    }
    req.email = payload.subject;
    next() 
}

app.get("/', (req,res) =>
{
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

	res.sendFile('src/login.html', {root: '../AngLibrary'});
}

app.post("/signup", (req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    // if (!errors.isEmpty())
    //     {
    //         return res.status(422).jsonp(errors.array());
    //     }
    //     else
        
            user = new userData(
                {
                    username: req.body.user.username,
                    email: req.body.user.email,
                    password: req.body.user.password
                }
            );
            user.save();
        
});

app.post("/login", (req,res,next) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    
    let userdata = req.body.user;
    userData.findOne(
        {
            username: userdata.username
        }
    )
    .then(user =>
        {
            userDb = user;
        })
    .catch(err =>
        {
            console.log(err);
        });

    if (userDb==undefined)
    {
        res.status(404).send({msg: "Not Found"});
    }
    else
    {
        var msg = "";
        var isValid = false;
        if (!(bcrypt.compareSync(userdata.password, userDb.password)))
        {
            msg = "invalid password";
            res.status(200).send({isValid, msg});
        }
        else
        {
            let payload = {subject: userDb.email+userDb.password};
            let token = jwt.sign(payload, 'secretKey');
            isValid = true;
            msg = "Login Successfull";
            res.status(200).send({token, userDb, isValid, msg});
        }
    }    
});

app.post("/update", (req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    
    bookData.updateOne(
        {$and: [{title: req.body.book.title}, {author: req.body.book.author}]},
        {$set: {
            user: req.body.user.username,
            title: req.body.book.title, 
            author: req.body.book.author,
            genre: req.body.book.genre,
            img: req.body.book.img}
        },
        {upsert: true}
    , (err) =>
    {
        res.status(200).send({err});
    });
});

app.get("/books", (req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    bookData.find()
    .then(books =>
        {
            res.send(books);
        })
});

app.get("/books/:id", (req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    bookData.findOne(
        {
            _id: req.params.id
        }
    )
    .then(book =>
        {
            res.send(book);
        })
});

app.post("/delete", (req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    bookData.deleteMany(
        {$and: [{title: req.body.book.title}, {author: req.body.book.author}]}
    , (err) =>
    {
        res.status(200).send({err});
    });
})


app.listen(port);
