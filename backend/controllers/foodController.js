import foodModel from "../models/foodModel.js";
import imagekit from '../config/imagekit.js'; 
import fs from 'fs'

const addFood = async (req, res) => {
    try {
        let image_url = '';
        let image_fileId = '';

        if (req.file) {
            const fileBuffer = fs.readFileSync(req.file.path);
            const result = await imagekit.upload({
                file: fileBuffer.toString('base64'),  
                fileName: req.file.originalname,
                folder: '/uploads'
            });

            image_url = result.url;     
            image_fileId = result.fileId; 
        }

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_url,
            imageFileId: image_fileId 
        });

        await food.save();
        res.json({ success: true, message: "Food Added", data: food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food" });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving food list" });
    }
};

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        if (food.imageFileId) {
            await imagekit.deleteFile(food.imageFileId);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food" });
    }
};

export { addFood, listFood, removeFood };
