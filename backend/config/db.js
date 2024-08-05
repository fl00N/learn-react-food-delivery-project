import mongoose from "mongoose";

export const connectDB = async () =>  {
    await mongoose.connect('mongodb+srv://flooN-:barabarabara@cluster0.wnp34xy.mongodb.net/food-delivery').then(() => console.log('DB Connected'))
}