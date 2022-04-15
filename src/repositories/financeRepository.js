import connection from '../database.js';

export async function createEvent(userId, value, type) {
    return await connection.query(`
        INSERT INTO 
            "financialEvents"("userId", "value", "type")
        VALUES ($1, $2, $3) 
    `, [userId, value, type]
    );
}

export async function getEvents(userId) {
    return await connection.query(`
        SELECT
            *
        FROM
            "financialEvents"
        WHERE
            "userId"=$1
        ORDER BY
            "id"
        DESC
        `, [userId]
    );
}