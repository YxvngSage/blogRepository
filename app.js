const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Blog = require('./api/models/blog');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExtension(file.mimetype)}`)
    },
  })
let upload = multer({dest: 'uploads/'});

function getExtension(mimeType){
    switch(mimeType){
        case 'image/png':
            return '.png';
        case 'image/jpeg':
            return '.jpeg'
    }
}
mongoose.connect('mongodb+srv://admin:3yPFUw4mQF0zSRuQ@cluster0.tpe3m.mongodb.net/blogDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.use(express.json());
app.use(cors());

app.get('/', (request,response) => {
    Blog.find().sort({'_id': -1}).exec().then(docs => {
        response.send(docs);
       });
});

app.get('/newPost/:post_id',(request,response) => {
    Blog.findById(request.params.post_id).exec().then(doc => {response.send(doc)});
});

app.post('/post', upload.single('post_image'), (request,response) => {
    let date = new Date();
    let newPost = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: request.body.title,
        content: request.body.content,
        post_image: request.file.path.replace('\\','/'),
        added_date: `${date.toLocaleTimeString().replace(/:\d+ /, ' ')}`
    });
    newPost.save().then(result => {
        response.json(result);
    });
});

app.listen(3000, () => {console.log('Listening...')});