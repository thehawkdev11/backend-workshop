// const uuid = require('uuid');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [{
    id:'u1',
    name:"raheem",
    email:'test@test.com',
    password:'testing'
}];

const getUsers = (req,res,next)=>{
    res.json({users:DUMMY_USERS});
};

const signup = (req,res,next)=>{
    const {id,name,email,password} = req.body;

    const createdUser = {
        id,
        name,
        email,
        password
    }

    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: createdUser});
};

const login = (req,res,next)=>{

    const {email, password} = req.body;

    const identifiedUser = DUMMY_USERS.find(u=> u.email === email);
    if(!identifiedUser){
        throw new HttpError('User is not identified, check your email',401);
    }

    res.json({message:"Login succesful!!!!!"});

};

exports.getUsers =getUsers;
exports.signup = signup;
exports.login=login;