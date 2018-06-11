var express=require('express')
var app=express();
var bodyParser = require('body-parser');
var fs=require('fs');

app.locals.pretty=true;
app.set('views','./view_file');
app.set('view engine','jade');

app.use(bodyParser.urlencoded({extended: false}));

app.get('/topic/new',function(req,res){
    res.render('new');
});
app.get('/topic',function(req,res){
    res.render('view');
});
app.post('/topic',function(req,res){
    var title=req.body.title;
    var description=req.body.description;
    fs.writeFile('data/'+title,description,function(err){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.send('Success');
    });
});

app.listen(9090,function(){
    console.log('Connected,9090 port!')
})
