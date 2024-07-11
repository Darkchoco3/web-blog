 //errormsg
const fixerror =  (err) => {
    let errors = { name:"" , email:"" , password:""};
if(err.code === 12000) {
    errors.email = 'Email is already in use'
    return errors;
}
if(err.message === 'incorrect email') {
errors.email = 'email doess not exist'
return errors;
}
if(err.message === 'incorrect password') {
    errors.email ='email or password is incorrect';
    errors.password = 'email or password is incorrect';
    return errors;
}

    if(err.message.includes('user validation failed ')) {
Object.values(err.errors).forEach(({properties}) => {
errors[properties.path] = properties.message;

});
    }
    return errors;
    };
module.exports = fixerror;

