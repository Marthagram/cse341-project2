import Egg from '../models/eggs.js';

// CREATE
export const createEggRecord = async (req, res) => {
  try {
    const { chickenId, layDate, weight, grade, quality, sold, price } = req.body;

    // REMOVED the chickenId exists check - one chicken can lay many eggs!
    // If you want unique tag per egg, check egg _id not chickenId

    const createER = await Egg.create({
      chickenId,
      layDate,
      weight,
      grade,
      quality,
      sold,
      price
    });

    console.log(createER);
    res.status(201).json(createER);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'chicken Id already exists' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getAllEggRecord = async (req, res) => {
  try {
    const eggs = await Egg.find();
    if (!eggs || eggs.length === 0) {
      return res.status(404).json({ message: 'Eggs Record not found' });
    }
    res.status(200).json(eggs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
export async function getOneEggRecord(req, res) {
  try {
    const egg = await Egg.findById(req.params.id); // FIXED: was Egg shadowing + wrong method
    if (!egg) {
      return res.status(404).json({ message: 'Egg Record not found' });
    }
    res.status(200).json(egg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE
export async function updateEggRecord(req, res) {
  try {
    const updateER = await Egg.findByIdAndUpdate(
      req.params.id,
      {
        layDate: req.body.layDate,
        weight: req.body.weight,
        grade: req.body.grade,
        quality: req.body.quality,
        sold: req.body.sold,
        price: req.body.price
      },
      { new: true, runValidators: true } // FIXED: was newValidators
    );

    if (!updateER) {
      return res.status(404).json({ message: 'Egg Record not found' });
    }
    res.status(200).json(updateER);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// DELETE
export async function deleteEggRecord(req, res) {
  try {
    const deleteER = await Egg.findByIdAndDelete(req.params.id);

    if (!deleteER) {
      return res.status(404).json({ message: 'Id not found' });
    }

    res.status(200).json(deleteER);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
