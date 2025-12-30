import { getAllFactories, getFactoriesByRealm } from '../models/factoryModel.js';

export async function getFactoriesController(req, res) {
    try {
        const factories = await getAllFactories();
        return res.status(200).json(factories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

export async function getFactoriesByRealmController(req, res) {
    try {
        const { realmId } = req.params;
        if (!realmId) {
            return res.status(400).json({ message: 'Missing realmId'});
        }

        const factories = await getFactoriesByRealm(realmId);
        return res.status(200).json(factories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

