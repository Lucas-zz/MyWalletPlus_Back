import * as financeRepository from '../repositories/financeRepository.js';

export async function postEvent(value, type) {
    const { id: userId } = res.locals.user;

    await financeRepository.createEvent(userId, value, type);
}

export async function getUserEvents() {
    const { id: userId } = res.locals.user;

    return await financeRepository.getEvents(userId);
}

export async function getEventsSum() {
    const { id: userId } = res.locals.user;

    const events = await financeRepository.getEvents(userId);

    const sum = events.rows.reduce(
        (total, event) =>
            event.type === "INCOME" ? total + event.value : total - event.value,
        0
    );

    return { sum };
}