const express = require('express');
const nodemailer = require('nodemailer');
const app = express();


const bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extendent: true}))
app.use(express.json())


let login = process.env.login || ''
let password = process.env.password || ''

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'asa121asaasa@gmail.com',
        pass: 'asa121asa'
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

app.get('/', (req, res) => {
    res.send('Hello World')
});
let port = process.env.PORT || 3010

app.listen(port, () => {
    console.log('port 3010')
})
