
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';


const dbPromise = sqlite.open({
    filename: './taxi_queue.db',
    driver: sqlite3.Database
});

export async function joinQueue() {
    const db = await dbPromise;
    await db.run('UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count + 1');
}

export async function leaveQueue() {
    const db = await dbPromise;
    await db.run('UPDATE taxi_queue SET passenger_queue_count = CASE WHEN passenger_queue_count > 0 THEN passenger_queue_count - 1 ELSE 0 END');
}

export async function joinTaxiQueue() {
    const db = await dbPromise;
    await db.run('UPDATE taxi_queue SET taxi_queue_count = taxi_queue_count + 1');
}

export async function queueLength() {
    const db = await dbPromise;
    const result = await db.get('SELECT passenger_queue_count FROM taxi_queue');
    return result.passenger_queue_count;
}

export async function taxiQueueLength() {
    const db = await dbPromise;
    const result = await db.get('SELECT taxi_queue_count FROM taxi_queue');
    return result.taxi_queue_count;
}

export async function taxiDepart() {
    const db = await dbPromise;
    const passengerCount = await queueLength();
    if (passengerCount >= 12) {
        await db.run('UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count - 12, taxi_queue_count = taxi_queue_count - 1');
    }
}

