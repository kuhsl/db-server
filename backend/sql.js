module.exports = {
    //register data
    publicRegister : {
        query: 'insert into public_data (user_id, name, relations, birth, ssn, sex, address) ' +
                'values (?, ?, ?, ?, ?, ?, ?)'
    },
    financialRegister : {
        query: 'insert into financial_data (user_id, account, balance) ' +
                'values (?, ?, ?)'
    },
    transactionRegister : {
        query: 'insert into transaction_data (user_id, date_time, deposit_amount, withdrawal_amount) ' +
                'values (?, ?, ?, ?)'
    },
    medicalRegister : {
        query: 'insert into medical_data (user_id, name, sex, ssn, date_time, disease_name, disease_num, image_path, recovered) ' +
                'values (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    },

    //login
    publicLogin : {
        query: 'select user_pw ' +
                'from public_idpw ' +
                'where user_id=?'
    },
    financialLogin : {
        query: 'select user_pw ' +
                'from financial_idpw ' +
                'where user_id=?'
    },
    medicalLogin : {
        query: 'select user_pw ' +
                'from medical_idpw ' +
                'where user_id=?'
    },

    //save grant code
    saveGrantcode : {
        query: 'insert into ?? ' +
                'values (?, ?, ?, ?, ?, ?)'
    },

    //check grant code
    checkGrantcode : {
        query: 'select grant_code, operator_id, redirect_uri, scope, user_id, is_used ' +
                'from ?? ' +
                'where grant_code=?'
    },

    //save access token, expires in 
    saveAccessToken : {
        query: 'insert into ?? (access_token, expires_in, scope, user_id) ' +
                'values (?, ?, ?, ?)'
    },

    //save scope, user_id 
    saveRemains : {
        query: 'update ?? t, ?? g ' +
                'set t.scope=g.scope, t.user_id=g.user_id, g.is_used=? ' +
                'where g.grant_code=? and t.access_token=?'
    },

    checkAccessToken : {
        query: 'select expires_in, scope, user_id ' +
                'from ?? ' +
                'where access_token=?'
    },

}
