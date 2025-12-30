import { getEndgameRanking, getResourceRanking } from '../models/rankingModel.js';

export async function getEndgameRankingController(req, res) {
  try {
    const limit = Number(req.query.limit) || 50;
    const ranking = await getEndgameRanking(limit);
    return res.status(200).json(ranking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

export async function getResourceRankingController(req, res) {
  try {
    const limit = Number(req.query.limit) || 50;
    const ranking = await getResourceRanking(limit);
    return res.status(200).json(ranking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
