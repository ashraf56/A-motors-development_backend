import { Schema, model } from "mongoose";
import { Userinterface, Usermodels } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config/config";

const UserSchema = new Schema<Userinterface, Usermodels>({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }

}, {
    timestamps: true
})


UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.saltNumber))
    next()
})
UserSchema.post('save', function (doc, next) {
    doc.password = ""
    next()
})

UserSchema.statics.isPasswordmatch = async function (inputtextPassword, hashpassword) {
    return await bcrypt.compare(inputtextPassword, hashpassword)
}


const User = model<Userinterface, Usermodels>('User', UserSchema)

export default User