import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';

import realmRoutes from './src/routes/realm.routes.js';
import realmUnlockCostRoutes from './src/routes/realmUnlockCost.routes.js';
import resourceRoutes from './src/routes/resource.routes.js';
import factoryRoutes from './src/routes/factory.routes.js';
import skillRoutes from './src/routes/skill.routes.js';
import endgameRequirementRoutes from './src/routes/endgameRequirement.routes.js';
import badgeRoutes from './src/routes/badge.routes.js';
import rankingRoutes from './src/routes/ranking.routes.js';
import adminRoutes from './src/routes/admin.routes.js';

import playerResourceRoutes from './src/routes/playerResource.routes.js';
import playerFactoryRoutes from './src/routes/playerFactory.routes.js';
import playerSkillRoutes from './src/routes/playerSkill.routes.js';
import playerRealmRoutes from './src/routes/playerRealm.routes.js';
import playerStateRoutes from './src/routes/playerState.routes.js';
import playerStatsRoutes from './src/routes/playerStats.routes.js';
import playerSessionRoutes from './src/routes/playerSession.routes.js';

import gameRoutes from './src/routes/game.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get('/', (req, res) => {
  return res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use('/realms', realmRoutes);
app.use('/realm-unlock-costs', realmUnlockCostRoutes);
app.use('/resources', resourceRoutes);
app.use('/factories', factoryRoutes);
app.use('/skills', skillRoutes);
app.use('/endgame-requirements', endgameRequirementRoutes);
app.use('/badges', badgeRoutes);
app.use('/rankings', rankingRoutes);
app.use('/admin', adminRoutes);

app.use('/player/resources', playerResourceRoutes);
app.use('/player/factories', playerFactoryRoutes);
app.use('/player/skills', playerSkillRoutes);
app.use('/player/realms', playerRealmRoutes);
app.use('/player/state', playerStateRoutes);
app.use('/player/stats', playerStatsRoutes);
app.use('/player/sessions', playerSessionRoutes);

app.use('/game', gameRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API running on ${port}`);
});
