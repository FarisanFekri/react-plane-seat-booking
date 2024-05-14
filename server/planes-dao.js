'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database('mydb.sqlite', (err) => {
    if (err) throw err;
});

function listPlanes() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM planes';
        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            else {
                const planes = rows.map((plane) => [plane.id, plane.name, plane.type]);
                resolve(planes);
            }
        });
    });
}

function listSeats(idPlane) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM seats WHERE idPlane=?';
        db.all(sql, [idPlane], (err, rows) => {
            if (err)
                reject(err)
            else {
                const seats = rows.map((seat) => [seat.seat, seat.idPlane, seat.idUser]);
                const groupedSeats = {};

                seats.forEach(seat => {
                    const startingNumber = seat[0].match(/\d+/)[0];
                    const status = (seat[2]) ? 'reserved' : 'free';

                    if (groupedSeats[startingNumber]) {
                        groupedSeats[startingNumber].push([seat[0], status]);
                    } else {
                        groupedSeats[startingNumber] = [[seat[0], status]];
                    }
                });

                const groupedSeatsArray = Object.values(groupedSeats);

                resolve(groupedSeatsArray);
            }
        });
    });
}

exports.reserveSeats = (userID, plane, listOfSeats) => {
    return new Promise((resolve, reject) => {
        // two queries for validation: seats exist and user has not yet done a booking
        const queryUser = `SELECT * FROM seats WHERE idPlane = ${plane[0]} AND idUser = ${userID}`;
        const querySeats = `SELECT * FROM seats WHERE seat IN (${listOfSeats.map(number => `'${number}'`).join(', ')}) AND idPlane = ${plane[0]}`;

        db.all(queryUser, [], (e, r) => {
            if (e) {
                reject(e);
                return;
            }

            if (r.length === 0) {
                db.all(querySeats, [], (e, res) => {
                    if (e) {
                        reject(e);
                    }

                    if (res.length === listOfSeats.length) {
                        const updateQuery = `UPDATE seats
                            SET idUser = ${userID}
                            WHERE seat IN (${listOfSeats.map(number => `'${number}'`).join(', ')})
                            AND idPlane = ${plane[0]} AND (
                            SELECT COUNT(*)
                            FROM seats
                            WHERE seat IN (${listOfSeats.map(number => `'${number}'`).join(', ')})
                                AND idUser IS NOT NULL AND idPlane = ${plane[0]}
                            ) = 0`;

                        db.run(updateQuery, [], function (err) {
                            if (err) {
                                reject(err);
                                return;
                            }

                            const modifiedRowCount = this.changes;

                            if (modifiedRowCount === 0) {
                                const unreservedseats = `SELECT * FROM seats WHERE seat IN (${listOfSeats.map(number => `'${number}'`).join(', ')})
                                AND idUser IS NOT NULL AND idPlane = ${plane[0]}`;

                                db.all(unreservedseats, [], (err, rows) => {
                                    reject({ error: 'Some seats have been already reserved by another user', alreadyreserved: rows });
                                });
                            } else if (modifiedRowCount === listOfSeats.length) {
                                resolve(modifiedRowCount);
                            } else {
                                console.log('ERROR  modification of ' + modifiedRowCount + ' instead of ' + listOfSeats.length);
                                reject({ error: 'problem of the server' });
                            }
                        });
                    } else {
                        reject({ error: 'Some seats doesn\'t exist' });
                    }
                });
            } else {
                reject({ error: 'The user already has a reservation for the current plane' });
            }
        });
    });
};

exports.cancelReservation = (userID, plane) => {
    return new Promise((resolve, reject) => {
        // two queries for validation: userid exists and plane exists
        const queryUser = `SELECT * FROM users WHERE id = ${userID}`;
        const querySeats = `SELECT * FROM planes WHERE id = ${plane[0]}`;

        db.all(queryUser, [], (e, r) => {
            if (e) {
                reject(e);
                return;
            }

            if (r.length !== 0) {
                db.all(querySeats, [], (e, reservation) => {
                    if (e) {
                        reject(e);
                    }

                    if (reservation.length === 1) {
                        const sql = `UPDATE seats SET idUser = NULL WHERE idPlane = ${plane[0]} AND idUser = ${userID}`;
                        db.run(sql, [], function (err) {
                            if (err) {
                                reject(err);
                                return;
                            }

                            const modifiedRowCount = this.changes;

                            if (modifiedRowCount === 0) {
                                reject({ error: 'User doesn\'t have any reservation' });
                            }
                            else {
                                resolve(modifiedRowCount);
                            }
                        });
                    } else {
                        reject({ error: 'Plane doesn\'t exist' });
                    }
                });
            } else {
                reject({ error: 'User doesn\'t exist' });
            }
        });
    });
};



exports.listPlanes = listPlanes;
exports.listSeats = listSeats;