
import express from "express";
import * as taxiSql from './taxi.sql.js';

const app = express();

app.use(express.static('public'))
app.use(express.json());

const PORT = process.env.PORT || 4015;

app.post('/api/passenger/join', async (req, res) => {
    await taxiSql.joinQueue();
    res.json({
        message: 'join queue'
    })
});

app.post('/api/passenger/leave', async (req, res) => {
    await taxiSql.leaveQueue();
    res.json({
        message: 'leave queue'
    })
});

app.post('/api/taxi/join', async (req, res) => {
    await taxiSql.joinTaxiQueue();
    res.json({
        message: 'join taxi queue'
    })
});

app.post('/api/taxi/depart', async (req, res) => {
    await taxiSql.taxiDepart();
    res.json({
        message: 'taxi depart from queue'
    })
});

app.get('/api/passenger/queue', async (req, res) => {
    const queueCount = await taxiSql.queueLength();
    res.json({
        queueCount: queueCount
    })
});

app.get('/api/taxi/queue', async (req, res) => {
    const taxiQueueCount = await taxiSql.taxiQueueLength();
    res.json({
        queueCount: taxiQueueCount
    })
});
app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))