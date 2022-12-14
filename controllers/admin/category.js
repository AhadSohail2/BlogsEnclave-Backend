const Mongoose = require("mongoose");
const categoryModel = require("../../models/category");

exports.postCategory = async (req, res, next) => {
    const name = req.body.name;
    try {
        if (!name) {
            const error = new Error("Enter Valid Name");
            error.statusCode = 401;
            throw error;
        }
        const category = new categoryModel({
            name: name
        })
        const savedCategory = await category.save();
        res.json({
            message: `${savedCategory.name} Category Created`,
            id: savedCategory._id
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await categoryModel.find();
        res.json({
            message: "Categories Fetched",
            data: categories
        })
    } catch (err) {
        next(err)
    }
}

exports.getCategory = async (req, res, next) => {
    try {
        const id = req.body.id;
        if (!id) {
            const error = new Error("Enter Valid ID");
            error.statusCode = 401;
        }
        const ObjectId = Mongoose.Types.ObjectId(id)
        const category = await categoryModel.findById(ObjectId);
        res.json({ message: "Record Fetched", data: category });
    } catch (err) {
        next(err)
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            const error = new Error("Enter Valid ID");
            error.statusCode = 401;
        }
        const ObjectId = Mongoose.Types.ObjectId(id)
        await categoryModel.findByIdAndDelete(ObjectId);
        res.json({ message: "Record Deleted" });
    } catch (err) {
        next(err)
    }
}

exports.putCategory = async (req, res, next) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        if (!id || !name) {
            const error = new Error("Enter Valid ID  Or Name");
            error.statusCode = 401;
            throw error;
        }
        const ObjectId = Mongoose.Types.ObjectId(id)
        const category = await categoryModel.findById(ObjectId);
        category.name=name;
        await category.save();
        res.json({ message: "Record Updated" });
    } catch (err) {
        next(err)
    }
}