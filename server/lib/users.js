/* eslint-disable no-await-in-loop */
const userId = require('./userId');
const { v4: uuidv4 } = require('uuid');

const users = {};

// Random ID until the ID is not in use
async function randomID() {
    let id = uuidv4();
    while (id in users) {
        await Promise.delay(5);
        id = uuidv4();
    }
    return id;
}

exports.create = async(socket) => {
    const id = await randomID();
    users[id] = socket;
    return id;
};

exports.get = (id) => users[id];

exports.remove = (id) => delete users[id];