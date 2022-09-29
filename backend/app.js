var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use((req, res, next) => {
    if (req.protocol === 'http') {
        console.log('came through http. redirecting... https://163.152.71.223'+ req.path);
        return res.redirect(301,'https://163.152.71.223'+req.path);
    }

    next();
});

//global variables
const g_operator_id = 'operator_id_001';
const g_operator_pw = 'pw_operator';
const g_callback_url = 'http://163.152.71.223/cb';


let sql=require('./sql.js');
var mysql = require('mysql');
const exp = require('constants');
var connection = mysql.createConnection({
    database: "db-source",
    connectionLimit: 10,
    host: "163.152.71.223",
    user: "root",
    password: "hw147258369!",
    port: 3316
})

connection.connect();



app.post('/api/public', async(request, res) => {
    console.log('came to api/public '+request.body.user_id+'/'+request.body.user_pw);

    const user_id=request.body.user_id;
    const user_pw=request.body.user_pw;

    connection.query(sql['publicLogin'].query, [user_id],function(error, results, fields){

        if(results.length==0){
            console.log('no data');
            res.send('fail');
        }else {
            var cor_user_pw = results[0].user_pw;
            if(user_pw == cor_user_pw){
                console.log('success');
                res.send('success');
            }
            else {
                console.log('fail');
                res.send('fail');
            }
        }
    });
});

app.post('/api/financial', async(request, res) => {
    console.log(request.body)

    const user_id=request.body.user_id;
    const user_pw=request.body.user_pw;

    connection.query(sql['financialLogin'].query, [user_id],function(error, results, fields){
        if(results.length==0){
            console.log('no data');
            res.send('fail');
        }else {
            var cor_user_pw = results[0].user_pw;
            if(user_pw == cor_user_pw)
                res.send('success');
            else
                res.send('fail');
        }
    });
});

app.post('/api/medical', async(request, res) => {
    console.log(request.body)

    const user_id=request.body.user_id;
    const user_pw=request.body.user_pw;

    connection.query(sql['medicalLogin'].query, [user_id],function(error, results, fields){
        if(results.length==0){
            console.log('no data');
            res.send('fail');
        }else {
            var cor_user_pw = results[0].user_pw;
            if(user_pw == cor_user_pw)
                res.send('success');
            else
                res.send('fail');
        }
    });
});

app.post('/api/public/register', async(request,res) => {
    console.log(request.body)

    const user_id=request.body.user_id;
    const name=request.body.name;
    const relations=request.body.relations;
    const ssn=request.body.ssn;
    const birth=request.body.birth;
    const sex=request.body.sex;
    const address=request.body.address;

    connection.query(sql['publicRegister'].query, [user_id, name, relations, birth, ssn, sex, address],function(error, results, fields){
        if(error){
            throw error;
        }
    });

    res.send('ok');
});

app.post('/api/financial/register', async(request,res) => {
    console.log(request.body)

    const user_id=request.body.user_id;
    const ssn=request.body.ssn;
    const account=request.body.account;
    const balance=request.body.balance;
    const date_time=request.body.date_time;
    const deposit_amount=request.body.deposit_amount;
    const withdrawal_amount=request.body.withdrawal_amount;

    connection.query(sql['financialRegister'].query, [user_id, ssn, account, balance],function(error, results, fields){
        if(error){
            throw error;
        }
    });

    connection.query(sql['transactionRegister'].query, [user_id, date_time, deposit_amount, withdrawal_amount],function(error, results, fields){
        if(error){
            throw error;
        }
    });

    res.send('ok');
});

app.post('/api/medical/register', async(request,res) => {
    console.log(request.body)

    const user_id=request.body.user_id;
    const name=request.body.name;
    const sex=request.body.sex;
    const ssn=request.body.ssn;
    const date_time=request.body.date_time;
    const disease_name=request.body.disease_name;
    const disease_num=request.body.disease_num;
    const image_path=request.body.image_path;
    const recovered=request.body.recovered;

    connection.query(sql['medicalRegister'].query, [user_id, name, sex, ssn, date_time, disease_name, disease_num, image_path, recovered],function(error, results, fields){
        if(error){
            throw error;
        }
    });

    res.send('ok');
});


app.post('/api/public/authenticate', async(request, res) => {
    console.log('came to api/public/authenticate '+request.body.user_id+'/'+request.body.user_pw);

    const user_id=request.body.user_id;
    const user_pw=request.body.user_pw;

    connection.query(sql['publicLogin'].query, [user_id],function(error, results, fields){
        if(results.length==0){
            console.log('no data');
            res.send('fail');
        }else {
            var cor_user_pw = results[0].user_pw;
            if(user_pw == cor_user_pw){
                ret=user_id;
                console.log('success');
                res.send('success');
            }
            else {
                console.log('fail');
                res.send('fail');
            }
        }
    });
});


app.post('/api/financial/authenticate', async(request, res) => {
    console.log(request.body)

    const user_id=request.body.user_id;
    const user_pw=request.body.user_pw;

    connection.query(sql['financialLogin'].query, [user_id],function(error, results, fields){
        if(results.length==0){
            console.log('no data');
            res.send('fail');
        }else {
            var cor_user_pw = results[0].user_pw;
            if(user_pw == cor_user_pw)
                res.send('success');
            else
                res.send('fail');
        }
    });
});

app.post('/api/medical/authenticate', async(request, res) => {
    console.log(request.body)

    const user_id=request.body.user_id;
    const user_pw=request.body.user_pw;

    connection.query(sql['medicalLogin'].query, [user_id],function(error, results, fields){
        if(results.length==0){
            console.log('no data');
            res.send('fail');
        } else {
            var cor_user_pw = results[0].user_pw;
            if(user_pw == cor_user_pw)
                res.send('success');
            else
                res.send('fail');
        }
    });
});

app.post('/api/:scope/authorize', async(request, res) => {
    const response_type = request.body.response_type;
    const operator_id = request.body.operator_id;
    const redirect_uri = request.body.redirect_uri;
    const scope = request.body.scope;
    const user_id = request.body.user_id;
    var grant_code="";
    var g_table=scope+'_grant_code_list';

    if(!(response_type == 'authorization_code')) { /* error response */ res.send('fail');}//a
    else if(!(operator_id == g_operator_id)) { /* error response */ res.send('fail'); }//b
    else if(!(redirect_uri == g_callback_url)) { /* error response */ res.send('fail'); }//c
    else if(!(scope == request.params.scope)) { /* error response */ res.send('fail');}//d-1
    else {
        grant_code = gen_random_string();//e

        //f
        connection.query(sql['saveGrantcode'].query, [g_table, grant_code, operator_id, redirect_uri, scope, user_id ,'N'],function(error, results, fields){
            if(error){
                throw error;
            }
        });

        res.send(grant_code);
    }
});


app.post('/api/:scope/token', async(request, res) => {
    var is_successful=true;
    var headers=request.headers;
    let [ _, auth_encoded] = headers['authorization'].split(' ');
    
    const grant_type = request.body.grant_type;
    const grant_code = request.body.code;
    const redirect_uri = request.body.redirect_uri;
    const scope = request.params.scope;

    //a check operation authentication
    if(!check_authorization(auth_encoded)){ is_successful=false; }
    
    //b check grant type
    if(!check_grant_type(grant_type)){ is_successful=false; }

    //c-f compare grantcode
    if(!(check_grant_code(scope, grant_code, redirect_uri))){ is_successful=false; }

    //g-i update database with newly generated token
    if(!(ret=grant_access_token(scope, grant_code))){ is_successful=false; }

    
    //j send HTTP response with user_id, expires_in
    if(is_successful){
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.end(JSON.stringify({'access_token' : ret.access_token, 'expires_in' : ret.expires_in}));
    }else{
        res.status(400);
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.end(JSON.stringify({'error' : 'invalid_request'}));
    }
});

app.get('/api/:scope/resource', async(request, res) => {
    //a parse request body
    var is_successful=true;
    const get_token = request.query.token;
    const wanted_scope = request.query.data;
    const scope = request.params.scope;
    var queries;
    var resources={};
    var ret_json={};

    console.log(get_token,'/',wanted_scope);
    //b check access token
    if(!(check_access_token(scope, get_token, wanted_scope))){ is_successful=false; }
    
    //c grant resource data
    if(!(queries=gen_queries(scope, wanted_scope, get_token))){ is_successful=false; }

    for([key,value] of Object.entries(queries)){
        ret_json[key]=await get_resources_json(key,value,queries);
    }
    
    resources[wanted_scope]=ret_json;
    resources=JSON.stringify(resources);
    console.log(resources);
    
    // http response
    if(is_successful){
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.end(resources);
    }else{
        res.status(400);
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.end(JSON.stringify({'error' : 'invalid_request'}));
    }
});

function check_authorization(auth_encoded){
    if(!(typeof(auth_encoded)=='string'))
        return false;
    
    var auth=Buffer.from(auth_encoded,"base64").toString("utf8"); //a-1
    var strings=auth.split(':'); //a-2

    if(!(strings[0]==g_operator_id && strings[1]==g_operator_pw)){ //a-3,a-4
        console.log('ERROR: not proper operator id/pw');
        return false;
    }

    return true;
}

function check_grant_type(grant_type){
    if(!(grant_type=='authorization_code'))
        return false;

    return true;
}

function check_grant_code(scope, grant_code, redirect_uri){
    var g_table = scope +'_grant_code_list';
    connection.query(sql['checkGrantcode'].query, [g_table, grant_code],function(error, results, fields){
        if(results.length==0){
            console.log('ERROR: no corresponding data');
            return false;
        } else {
            if(!(results[0].operator_id==g_operator_id)){
                console.log('ERROR: wrong operator id');
                return false;
            }
            if(!(results[0].is_used=='N')){
                console.log('ERROR: grantcode has been already used.');
                return false;
            }
            if(!(results[0].redirect_uri==redirect_uri)){
                console.log('ERROR: redirect uris are not identical.');
                return false;
            }
        }
    });

    return true;
}

function grant_access_token(scope, grant_code){

    console.log(grant_code);
    var access_token=gen_random_string();
    var expires_in=Math.floor(new Date().getTime() / 1000)+3600;
    var t_table = scope +'_token_list';
    var g_table = scope +'_grant_code_list';
    
    console.log(access_token,'/',expires_in);

    connection.query(sql['saveAccessToken'].query, [t_table, access_token, expires_in, '-', '-'],function(error, results, fields){
        if(error){
            console.log('ERROR: loading record failed.');
            return false;
        }
    });

    connection.query(sql['saveRemains'].query, [t_table, g_table, 'Y', grant_code, access_token],function(error, results, fields){
        if(error){
            console.log('ERROR: loading record failed.');
            return false;
        }
    });

    console.log('access token has been granted successfully.');
    return { 'access_token':access_token, 'expires_in':expires_in };
}

function check_access_token(scope, get_token, wanted_scope){
    var t_table = scope +'_token_list';

    //b-1
    connection.query(sql['checkAccessToken'].query, [t_table, get_token],function(error, results, fields){
        if(results.length==0){
            console.log('ERROR: no corresponding data');
            return false;
        }
        //b-2
        if(!(Math.floor(new Date().getTime() / 1000) < results[0].expires_in)){
            console.log('ERROR: expired token');
            return false;
        }
        //b-3
        if(!(results[0].scope+'_data' == wanted_scope)){
            console.log('ERROR: not proper scope');
            return false;
        }
    });
    return true;
}


function gen_random_string() {
    var random_src = 'abcdefghijklmnopqrstuvwxyz123456789';
    var random_22 = "";
    var random_len = random_src.length;
    for( var i=0; i<22; i++) {
        random_22 += random_src.charAt(Math.floor(Math.random() * random_len));
    }
    console.log(random_22);
    return random_22; 
}

function gen_queries(scope, wanted_scope, get_token){
    var queries = {};

    if(wanted_scope == 'financial_data'){
        var query_transaction = 'select * from ' +
                                'transaction_data ' +
                                'where user_id = (select user_id from '+scope+'_token_list where access_token = \''+get_token+'\')';
        
        var query_financial = 'select * from ' +
                                'financial_data ' +
                                'where user_id = (select user_id from '+scope+'_token_list where access_token = \''+get_token+'\')';
        
        queries['transaction_data'] = query_transaction;
        queries['financial_data'] = query_financial;
    }else{
        var query = 'select * from ' +
                    wanted_scope +
                    ' where user_id = (select user_id from '+scope+'_token_list where access_token = \''+get_token+'\')';
        queries[wanted_scope] = query;
    }
    
    return queries;
};

function get_resources_json(key, value, queries){
    return new Promise((resolve, reject) => {

        connection.query(value,function(error, results, fields){
            results=JSON.parse(JSON.stringify(results));
            console.log('result:',results);
            
            if(results.length==0){
                console.log('ERROR: no corresponding data');
                return false;
            } else {
                var data = [];
                for( var i=0; i<results.length; i++ ){ data.push(results[i]); console.log(data); }
            }
            
            resolve(data);
        });
    });
}

module.exports = app;

