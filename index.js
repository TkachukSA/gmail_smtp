/*
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();


const bodyParser = require('body-parser')
const cors = require('cors');


app.use(cors());
app.use(bodyParser.urlencoded({extendent: true}))
app.use(express.json())


let smtp_login = process.env.smtp_login || " "
let smtp_password = process.env.smtp_password || '--'

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_login,
        pass: smtp_password
    }
})

app.post('/sendMessge', async (req, res) => {

    let {
        email,
        message,
        name
    } = req.body
    let info = await transporter.sendMail({
        form: "my profile page",
        to: "crafta.net@gmail.com",
        subject: "hr wonts me",
        html: `<b>message from Portfolio page</b>
       <div>
          name: ${name}
       </div>
       <div>
          from: ${email}
        </div>
        <div>
          message: ${message}
        </div>
`
    })
    res.send('ok')
    res.send(console.log(req.body))

})
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.get('/', (req, res) => {
    res.send('Hello World')
});
let port = process.env.PORT || 3010

app.listen(port, () => {
    console.log('port 3010')
})
*/
const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3010

app.use(cors({
    origin: ['http://localhost:3000']
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



let smtp_login = process.env.SMTP_LOGIN || "---";
let smtp_password = process.env.SMTP_PASSWORD || "---";

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: smtp_login, // generated ethereal user
            pass: smtp_password, // generated ethereal password
        },
    });

    let {name, email, message } = req.body;
    // send mail with defined transport object

    let info = await transporter.sendMail({
        from: 'HR', // sender address
        to: "crafta.net@gmail.com", // list of receivers
        subject: 'HR WANTS ME', // Subject Line

        html: `<b>Message to my portfolio page</b>
    <div>
        name: ${name}
    </div>
    <div>
        email: ${email}
    </div>
    <div>
       ${message}
    </div>`
    });
    res.send('Ok')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})