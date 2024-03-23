import mongoose from "mongoose";

const { Schema, model } = mongoose;

const accountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const acc = model("acc", accountSchema);

export default acc;
