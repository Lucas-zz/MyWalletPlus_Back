import * as financeService from '../services/financeService.js';

export async function postFinancialEvent(req, res) {
    try {
        const { value, type } = req.body;

        if (!value || !type) {
            return res.sendStatus(422);
        }

        const financialTypes = ["INCOME", "OUTCOME"];
        if (!financialTypes.includes(type)) {
            return res.sendStatus(422);
        }

        if (value < 0) {
            return res.sendStatus(422);
        }

        await financeService.postEvent(value, type);

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getFinancialEvents(req, res) {
    try {
        const events = await financeService.getUserEvents();

        res.send(events.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getFinancialEventsSum(req, res) {
    try {
        const sum = await financeService.getFinancialEventsSum();

        res.send(sum);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}