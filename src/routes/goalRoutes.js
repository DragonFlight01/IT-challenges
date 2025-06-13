import express from 'express';
import { getCommunityGoalsRecent } from '../controllers/goalController.js';

const router = express.Router();

router.get('/', getCommunityGoalsRecent);

export default router;
