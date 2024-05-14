const APIURL = 'http://localhost:3001/api';

async function listPlanes() {
    try {
        const response = await fetch(APIURL + '/planes');
        if (response.ok) {
            const planes = await response.json();
            return planes;
        } else {
            const message = await response.text();
            throw new Error("Application error");
        }
    } catch (error) {
        throw new Error("Network error")
    }
}

async function listSeats(currentplane) {
    try {
        const response = await fetch(APIURL + `/seats/` + currentplane);
        if (response.ok) {
            const seats = await response.json();
            return seats;
        } else {
            const message = await response.text();
            throw new Error("Application error");
        }
    } catch (error) {
        throw new Error("Network error")
    }
}

async function checkLogin(username, password) {
    try {
        const response = await fetch(APIURL + '/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (response.ok) {
            return await response.json();
        } else {
            const message = await response.text();
            throw message;
        }
    } catch (error) {
        throw err;
    }
}

async function doLogout() {
    try {
        const response = await fetch(APIURL + '/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            return true;
        } else {
            const message = await response.text();
            throw message;
        }
    } catch (error) {
        throw err;
    }
}

async function addReservation(idPlane, seats) {
    try {

        const response = await fetch(APIURL + '/submission', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plane: idPlane,
                seats: seats
            }),
        });

        if (response.ok) {
            return true;
        } else {
            const message = await response.json();
            throw message;
        }
    } catch (err) {
        throw err;

    }
}

async function cancelReservation(idPlane) {
    try {
        const response = await fetch(APIURL + '/cancellation', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plane: idPlane
            }),
        });

        if (response.ok) {
            return true;
        } else {
            const message = await response.json();
            throw message;
        }
    } catch (err) {
        throw err;

    }
}

export { listPlanes, listSeats, checkLogin, doLogout, addReservation, cancelReservation};