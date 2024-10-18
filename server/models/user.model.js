const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true ,
        validate: {
            validator: function(v) {
              return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: 'Invalid email address',
          },
    },
    password: { type: String, required: true ,
        validate: {
            validator: function(v) {
              return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/.test(v);
            },
            message: 'Password must contain at least one letter, one number, and one special character',
          },
    },
    username: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer",
        required: true
    },

}, {
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;