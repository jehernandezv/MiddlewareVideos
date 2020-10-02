const express = require('express')
const app = express()
const port = process.argv[2];
const nameQueue = process.argv[3];
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const amqp = require('amqplib');
const fs = require('fs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//statics files
app.use(express.static(path.join(__dirname,'public')));

const storage = null
app.use(multer({storage}).single('video'));


async function subscriber(email, dataFile){
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel();

  await channel.assertQueue(nameQueue);

  const message = {
    email:email
    //dataFile:dataFile
  }

  const sent = await channel.sendToQueue(nameQueue, Buffer.from(
    JSON.stringify(message)
  ))

    sent ?
      console.log(`send message to "${nameQueue}"  queue ` , message) :
      console.log(`Fails sending message to "${nameQueue}" queue ` , message)
}


app.get('/saludo', (req, res) => {
  res.json({
      message: 'Hello World!'
    });
});

app.post('/addVideo', function (req, res, next){
    var data = req;
    //console.log(data);

    const email = data.body.email;
    const file = data.file;
    //console.log(email);
    console.log(file);



    subscriber(email, file).catch(error => {
      console.error(error)
      process.exit(1)
    })
    res.json({
        'message' : 'ha llegado el email'
    });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})