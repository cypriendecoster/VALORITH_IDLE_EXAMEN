import { getAllEndgameRequirements } from '../models/endgameRequirementModel.js';

export async function getEndgameRequirementsController(req, res) {
  try {
    const requirements = await getAllEndgameRequirements();
    return res.status(200).json(requirements);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
