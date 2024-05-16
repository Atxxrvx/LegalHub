const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "User"
    },
    address: {
        type: String
    },
    mobileNo: {
        type: String
    },
    userCases: [
        {
            type: mongoose.Types.ObjectId
        }
    ]

})


UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

const UserCollection = mongoose.model('user', UserSchema)

module.exports = UserCollection