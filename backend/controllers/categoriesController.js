const categoriesModel = require('../models/categoriesModel');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoriesModel.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};