var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// definisi skema untuk user model
var userSchema = mongoose.Schema({

    local            : {
        email        : { type: String, required: true, unique: true },
        password     : { type: String, required: true },
    }

});

// generate hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// cek jika password benat
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// buat model users and berikan kepada app
module.exports = mongoose.model('User', userSchema);
