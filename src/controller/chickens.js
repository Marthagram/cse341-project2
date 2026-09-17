import Chicken from '../models/chickens.js';

// create a new chicken record

export async function createChicken(req, res) {
  try {
    const { tagId, breed, hatchDate, gender, weight, healthStatus, coopId } = req.body;
    const chicken = new Chicken({ tagId, breed, hatchDate, gender, weight, healthStatus, coopId });
    await chicken.save();
    res.status(201).json(chicken);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get all chickens
export async function getAllChickens(req, res) {
  try {
    const chickens = await Chicken.find();
    res.status(200).json(chickens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get a chicken RECORD

export async function getChickenById(req, res) {
  try {
    const chicken = await Chicken.findById(req.params.id);
    if (!chicken) {
      return res.status(404).json({ message: 'Chicken not found' });
    }
    res.status(200).json(chicken);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE a chicken record

export async function updateChicken(req, res) {
  try {
    const chickenUpdate = await Chicken.findByIdAndUpdate(
      req.params.id,
      {
        tagId: req.body.tagId,
        breed: req.body.breed,
        hatchDate: req.body.hatchDate,
        gender: req.body.gender,
        weight: req.body.weight,
        healthStatus: req.body.healthStatus,
        coopId: req.body.coopId
      },
      { new: true, runValidators: true }
    );

    if (!chickenUpdate) {
      return res.status(404).json({ message: 'Chicken not found' });
    }
    res.status(200).json(chickenUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// DELETE a chicken record
export async function deleteChicken(req, res) {
  try {
    const chickenDelete = await Chicken.findByIdAndDelete(req.params.id);
    if (!chickenDelete) {
      return res.status(404).json({ message: 'Chicken not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
