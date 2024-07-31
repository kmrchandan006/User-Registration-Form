const { mongodbManager,Router }=require('mimi.js');
const routes = Router();
const mongodb = new mongodbManager();
const User = mongodb.createCollection('user', {
    
        "fname": String ,
        "lname": String,
        "mobile": Number,
        "email": String,
        "address": {
          "street": String,
          "city": String,
          "country": String,
          "state": String
        },
        "id": String,
        "password": String
      
  });

  routes.get('/hello', (req, res) => {
    res.send('Hello, mimi🐹!');
  });

  routes.post('/create', (req, res) => {
    User.create(req.body).then((result) => {
      console.log(result);
        res.json(result);
        
    }).catch((err) => {
        res.json(err);
        
    });
  });
  routes.get('/read/:id', (req, res) => {
    User.findOne({id:req.params.id}).then((result) => {
        res.json(result);
        
    }).catch((err) => {
        res.json(err);
        
    });
  });
  routes.get('/getall', (req, res) => {
    User.find().then((result) => {
        res.json(result);
        
    }).catch((err) => {
        res.json(err);
        
    });
  });

  
  module.exports=routes
  