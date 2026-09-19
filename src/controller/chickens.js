import Chicken from '../models/chickens.js';

import { body } from 'express-validator';

// Define validation and sanitization rules for organization form
// Define validation rules for organization form
export const chickenValidation = [
  body('tagId')
    .trim()
    .notEmpty()
    .withMessage('tagId is required')
    .isAlphanumeric()
    .withMessage('tagId must be alphanumeric')
    .isLength({ min: 3, max: 15 })
    .withMessage('tagId must be between 3 and 15 characters'),

  body('breed')
    .trim()
    .notEmpty()
    .withMessage('breed is required')
    .isLength({ max: 50 })
    .withMessage('breed cannot exceed 50 characters'),

  body('hatchDate')
    .notEmpty()
    .withMessage('hatch date is required')
    .isISO8601()
    .withMessage('hatch date must be YYYY-MM-DD')
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error('hatch date cannot be in the future');
      }
      return true;
    }),

  body('gender')
    .notEmpty()
    .withMessage('gender is required')
    .toLowerCase()
    .isIn(['male', 'female'])
    .withMessage('gender must be male or female'),

  body('weight')
    .notEmpty()
    .withMessage('body weight is required')
    .isFloat({ min: 0.1, max: 9 })
    .withMessage('weight must be a number between 0.1 and 9 kg'),

  body('healthStatus')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('healthStatus is required')
    .isIn(['healthy', 'sick', 'recovering', 'deceased'])
    .withMessage('invalid healthStatus'),

  body('coopId')
    .trim()
    .notEmpty()
    .withMessage('coopId is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('coopId must be 3-20 chars')
];

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
