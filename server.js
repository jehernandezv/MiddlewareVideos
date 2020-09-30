const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//statics files
app.use(express.static(path.join(__dirname,'public')));

const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/uploads'),
  filename(req,file,cb){
      cb(null,new Date().getTime() + path.extname(file.originalname));
  }   
});

app.use(multer({storage}).single('video'));


var videos = [
    {
        id:'1',
        email:'jhonn1@uptc.edu.co',
        urlMiniImg:'https://cdn.icon-icons.com/icons2/1713/PNG/512/iconfinder-videologoplayicon-3993847_112649.png',
        miniatures:["https://cnnespanol.cnn.com/wp-content/uploads/2019/12/s_64a163f16ecbb099e52f2f8271f73cbbfcfc9034be4d646f7375e4db1ca6f3d7_1573501883482_ap_19001106049831-1.jpg?quality=100&strip=info&w=320&h=240&crop=1",
                    "https://cnnespanol.cnn.com/wp-content/uploads/2019/12/s_64a163f16ecbb099e52f2f8271f73cbbfcfc9034be4d646f7375e4db1ca6f3d7_1573501883482_ap_19001106049831-1.jpg?quality=100&strip=info&w=320&h=240&crop=1",
                   "https://cnnespanol.cnn.com/wp-content/uploads/2019/12/s_64a163f16ecbb099e52f2f8271f73cbbfcfc9034be4d646f7375e4db1ca6f3d7_1573501883482_ap_19001106049831-1.jpg?quality=100&strip=info&w=320&h=240&crop=1"]
      },
      {
        id:'2',
        email:'jhonn2@uptc.edu.co',
        urlMiniImg:'https://cdn.icon-icons.com/icons2/1713/PNG/512/iconfinder-videologoplayicon-3993847_112649.png',
        miniatures:[]
      },
      {
        id:'3',
        email:'jhonn3@uptc.edu.co',
        urlMiniImg:'https://cdn.icon-icons.com/icons2/1713/PNG/512/iconfinder-videologoplayicon-3993847_112649.png',
        miniatures:["https://cnnespanol.cnn.com/wp-content/uploads/2019/12/s_64a163f16ecbb099e52f2f8271f73cbbfcfc9034be4d646f7375e4db1ca6f3d7_1573501883482_ap_19001106049831-1.jpg?quality=100&strip=info&w=320&h=240&crop=1",
        "https://cnnespanol.cnn.com/wp-content/uploads/2019/12/s_64a163f16ecbb099e52f2f8271f73cbbfcfc9034be4d646f7375e4db1ca6f3d7_1573501883482_ap_19001106049831-1.jpg?quality=100&strip=info&w=320&h=240&crop=1",
       "https://cnnespanol.cnn.com/wp-content/uploads/2019/12/s_64a163f16ecbb099e52f2f8271f73cbbfcfc9034be4d646f7375e4db1ca6f3d7_1573501883482_ap_19001106049831-1.jpg?quality=100&strip=info&w=320&h=240&crop=1"]
      }
]

app.get('/saludo', (req, res) => {
  res.json({
      message: 'Hello World!'
    });
});

app.get('/getVideos', (req, res) => {
    res.json({
        listVideos: JSON.stringify(videos)
      });
  });

app.post('/addVideo', function (req, res, next){
    var data = req;
    console.log(data);

    res.json({
        'message' : 'ha llegado el email'
    });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})