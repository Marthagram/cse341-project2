import Feed from '../models/feedInventory.js';

import { body } from 'express-validator';

// Define validation and sanitization rules for organization form
// Define validation rules for organization form
export const feedValidation = [
  body('feedName')
    .trim()
    .notEmpty()
    .withMessage('Feed name is required')
    .isLength({ min: 3, max: 15 })
    .withMessage('Feed name must be between 3 and 15 characters'),

  body('supplier')
    .trim()
    .notEmpty()
    .withMessage('Supplier is required')
    .isLength({ max: 40 })
    .withMessage('Supplier cannot exceed 40 characters'),

  body('purchaseDate')
    .notEmpty()
    .withMessage('Purchase date is required')
    .isISO8601()
    .withMessage('Purchase date must be YYYY-MM-DD'),

  body('quantityKg')
    .notEmpty()
    .withMessage('Quantity is required')
    .isFloat({ min: 0 })
    .withMessage('Quantity must be a positive number'),

  body('cost')
    .notEmpty()
    .withMessage('Cost is required')
    .isFloat({ min: 0 })
    .withMessage('Cost must be a positive number'),

  body('expiryDate')
    .notEmpty()
    .withMessage('Expiry date is required')
    .isISO8601()
    .withMessage('Expiry date must be YYYY-MM-DD'),

  body('location').trim().notEmpty().withMessage('Location is required')
];

// CREATE feed inventory

export async function createFeedInventory(req, res) {
  try {
    const { feedName, supplier, purchaseDate, quantityKg, cost, expiryDate, location } = req.body;

    // 1. CHECK FIRST
    const existingName = await Feed.findOne({ feedName });
    if (existingName) {
      return res.status(409).json({ message: 'Feed Name already exists' }); // 409 = Conflict
    }

    // 2. THEN CREATE
    const createFeed = await Feed.create({
      feedName,
      supplier,
      purchaseDate,
      quantityKg,
      cost,
      expiryDate,
      location
    });

    console.log(createFeed);
    res.status(201).json(createFeed);
  } catch (err) {
    // 3. Backup: catch mongo duplicate error just in case of race condition
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Feed Name already exists' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
}

// GET ALL
export async function getAllFeedInventory(req, res) {
  try {
    const feeds = await Feed.find();
    res.status(200).json(feeds); // return [] if empty, that's fine
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
// GET ONE
export async function getOneFeedInventory(req, res) {
  try {
    const feed = await Feed.findById(req.params.id);
    if (!feed) {
      return res.status(404).json('Feed not found');
    }
    res.status(200).res.json(feed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE
export async function updateFeedInventory(req, res) {
  try {
    const updateFeed = await Feed.findByIdAndUpdate(
      req.params.id,
      {
        feedName: req.body.feedName,
        supplier: req.body.supplier,
        purchaseDate: req.body.purchaseDate,
        quantityKg: req.body.quantityKg,
        cost: req.body.cost,
        expiryDate: req.body.expiryDate,
        location: req.body.location
      },
      { new: true, runValidators: true }
    );

    if (!updateFeed) {
      return res.status(404).json({ message: 'Feed not found' });
    }
    res.status(200).json(updateFeed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE
export async function deleteFeedInventory(req, res) {
  try {
    const deleteFeed = await Feed.findByIdAndDelete(req.params.id);

    if (!deleteFeed) {
      return res.status(404).res.json('id not found');
    }
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
