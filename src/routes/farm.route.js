import express from 'express';

import { checkValidation } from '../middleware/validation.js';
import { isAuthenticated } from '../middleware/authenticate.js';

import {
  getAllChickens,
  createChicken,
  getChickenById,
  updateChicken,
  deleteChicken,
  chickenValidation
} from '../controller/chickens.js';

import {
  createEggRecord,
  getAllEggRecord,
  getOneEggRecord,
  updateEggRecord,
  deleteEggRecord,
  eggValidation
} from '../controller/eggs.js';

import {
  createFeedInventory,
  getAllFeedInventory,
  getOneFeedInventory,
  updateFeedInventory,
  deleteFeedInventory,
  feedValidation
} from '../controller/feedInventory.js';

const farmRouter = express.Router();

// ========== CHICKEN ==========
farmRouter.get('/chickens', getAllChickens);
farmRouter.post('/chickens', isAuthenticated, chickenValidation, checkValidation, createChicken);
farmRouter.get('/chickens/:id', getChickenById);
farmRouter.put('/chickens/:id', isAuthenticated, chickenValidation, checkValidation, updateChicken);
farmRouter.delete('/chickens/:id', isAuthenticated, deleteChicken);

// ========== EGGS ==========
farmRouter.get('/eggs', getAllEggRecord);
farmRouter.post('/eggs', isAuthenticated, eggValidation, checkValidation, createEggRecord);
farmRouter.get('/eggs/:id', getOneEggRecord);
farmRouter.put('/eggs/:id', isAuthenticated, eggValidation, checkValidation, updateEggRecord);
farmRouter.delete('/eggs/:id', isAuthenticated, deleteEggRecord);

// ========== FEED INVENTORY ==========
farmRouter.get('/feedInventory', getAllFeedInventory);
farmRouter.post(
  '/feedInventory',
  isAuthenticated,
  feedValidation,
  checkValidation,
  createFeedInventory
);
farmRouter.get('/feedInventory/:id', getOneFeedInventory);
farmRouter.put(
  '/feedInventory/:id',
  isAuthenticated,
  feedValidation,
  checkValidation,
  updateFeedInventory
);
farmRouter.delete('/feedInventory/:id', isAuthenticated, deleteFeedInventory);

export default farmRouter;
