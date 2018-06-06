console.log("Hello");
var express = require('express');
var http = require('http');


var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/keyboard', function(req, res){
    const menu={
        'type':'buttons',
        'buttons':['가격조회','수급정보','정보']
    };
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(menu));

});

app.post('/message',function(req,res){
    var msg=req.body.content;
    console.log('전달받은 메시지: '+msg);
    
    var send={};
    switch(msg){
        case'가격조회':
            send={
                'message':{
                    'text':'가격조회 선택!'
                }
            }
            break;
        case '수급정보':
            send={
                'message':{
                    'text':'수급정보 선택!'
                }
            }
            break;
        case '정보':
            send={
                'message':{
                    'text':'이츠톡톡!'
                },
                keyboard:{
                    'type':'buttons',
                    'buttons':['test1','test2']
                }
            }
            break;
        default:
            send={
                'message':{
                    'text':'알 수 없음'
                }
            }
            break;
    }
    res.json(send);
});

http.createServer(app).listen(9090,function(){
    console.log('서버 실행 중..');
});