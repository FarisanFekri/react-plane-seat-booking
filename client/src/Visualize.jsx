import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Seats from "./Colmap"
import Rowmap from "./Rowmap"
import currentplane from "./App"
import { Form, Card } from 'react-bootstrap';
import { useEffect } from 'react';

function Visualize(props) {
    let AirPlane = props.currentplane[1];
    let numberOccupiedseats = props.Occupiedseats.length;
    const [requestedSeats, setRequestedseats] = useState('please enter the numbers of seat you want to book');
    // number of rows x number of elements in a row
    const [numberOfseats, setNumberOfseats] = useState(props.seats.length * props.seats[0].length);
    const [numberAvailableseats, setnumberAvailableseats] = useState(0);
    const [numberReservedseats, setnumberReservedseats] = useState(0);

    useEffect(() => {
        let available = 0;
        let reserved = 0;

        for (const row of props.seats) {
            for (const seat of row) {
                switch (seat[1]) {
                    case 'free': available++; break;
                    case 'reserved': reserved++; break;
                }
            }
        }

        setnumberAvailableseats(available);
        setnumberReservedseats(reserved);
    }, [props.seats]);


    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission
        if (requestedSeats > numberAvailableseats) {
            props.handleError("Number of requested seats exceeds available seats.");
        } else if (requestedSeats > numberAvailableseats - numberOccupiedseats) {
            props.handleError("No more seats available.");
        }
        else {
            props.handleError(undefined); // Clear error message if no error
            let count = 0;
            let availableSeats = []

            for (const row of props.seats) {
                for (const seat of row) {
                    //stop when you have reached the requested number of seats
                    if (seat[1] === 'free' && !props.Occupiedseats.includes(seat[0]) && count < requestedSeats) {
                        availableSeats.push(seat[0]);
                        count++;
                    }
                }
            }

            props.AddOccupiedseats(availableSeats);
        }
    };

    const handleCancel = (event) => {
        props.setCurrentplane(undefined);
    }
    return (
        <>
            <Row>
                <Form>
                    <Form.Group className="mb-3">
                        <Row className="row">
                            <Col className="col-2">
                                <Form.Label style={{ fontSize: '18px', fontFamily: 'Roboto Condensed', fontWeight: 'bold' }}>Automatic Reservation</Form.Label>
                            </Col>
                        </Row>
                        {props.checkAuth ?
                            <Row className="mb-3">
                                <Col className="col-3">
                                    <Form.Control
                                        type="number"
                                        value={requestedSeats}
                                        onChange={(ev) => { setRequestedseats(ev.target.value) }}
                                        placeholder="Choose the number of seats"
                                    />
                                </Col>
                                <Col className="col-1">
                                    <Button
                                        className='btn btn-info'
                                        type="button"
                                        onClick={handleSubmit}
                                        style={{ borderRadius: '5px', padding: '5px 20px', fontSize: '13px' }}
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                            : <></>
                        }
                        {props.checkAuth ?
                            <Row>
                                <Col>
                                    <div className="mb-4">
                                        <div className="row">
                                            <div className="col-2">
                                                <Button
                                                    className="button2 rounded-pill"
                                                    type="button"
                                                    style={{
                                                        borderRadius: '5px',
                                                        padding: '5px 20px',
                                                        fontSize: '13px'
                                                    }}
                                                    onClick={() => { props.AddReservation() }}
                                                    disabled={props.Occupiedseats.length === 0}
                                                >
                                                    Reserve chosen seats
                                                </Button>
                                            </div>
                                            <div className="col-2">
                                                <Button
                                                    className="button5 rounded-pill"
                                                    type="button"
                                                    style={{
                                                        borderRadius: '5px',
                                                        padding: '5px 20px',
                                                        fontSize: '13px'
                                                    }}
                                                    onClick={() => { props.setSeats(undefined); props.setOccupiedseats([]); handleCancel() }}
                                                >
                                                    Return to main page
                                                </Button>
                                            </div>
                                            <div className="col-2">
                                                <Button
                                                    className="button6 rounded-pill"
                                                    type="button"
                                                    style={{
                                                        borderRadius: '5px',
                                                        padding: '5px 20px',
                                                        fontSize: '13px'
                                                    }}
                                                    onClick={() => { props.setOccupiedseats([]) }}
                                                >
                                                    Remove chosen seats
                                                </Button>
                                            </div>
                                            <div className="col-2">
                                                <Button
                                                    className="button3 rounded-pill"
                                                    type="button"
                                                    style={{
                                                        borderRadius: '5px',
                                                        padding: '5px 20px',
                                                        fontSize: '13px'
                                                    }}
                                                    onClick={() => { props.CancelReservation() }}
                                                >
                                                    Cancel reserved seats
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            :
                            <Button
                                className="button5 rounded-pill"
                                type="button"
                                style={{
                                    borderRadius: '5px',
                                    padding: '5px 20px',
                                    fontSize: '13px'
                                }}
                                onClick={() => { props.setSeats(undefined); props.setOccupiedseats([]); handleCancel() }}
                            >
                                Return to main page
                            </Button>
                        }
                    </Form.Group>
                </Form>
                <div className="fancy-box-content col-4">
                    <Row>
                        <Col>
                            <p className="fancy-box-text">{numberOfseats} total seats</p>
                        </Col>
                        <Col>
                            <p className="fancy-box-text">{numberOccupiedseats} chosen {numberOccupiedseats === 1 ? 'seat' : 'seats'}</p>
                        </Col>
                        <Col>
                            <p className="fancy-box-text">{numberAvailableseats} available {numberAvailableseats === 1 ? 'seat' : 'seats'}</p>
                        </Col>
                        <Col>
                            <p className="fancy-box-text">{numberReservedseats} booked {numberReservedseats === 1 ? 'seat' : 'seats'}</p>
                        </Col>
                    </Row>
                </div>

            </Row>
            <Row>
                {props.errormessage ? (
                    <div className='alert alert-dark blinking-font narrow-alert' role='alert'>
                        <p className='error-message text-center mb-0'>{props.errormessage}</p>
                    </div>
                ) : (
                    <></>
                )}
            </Row>
            <Col className="col-9" id="main-content">
                <h1 className="label label-default" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700 }}>{AirPlane}</h1>
                <Rowmap rows={props.list} checkAuth={props.checkAuth} setCurrentauth={props.setCurrentauth} Occupiedseats={props.Occupiedseats} AddOccupiedseat={props.AddOccupiedseat} RemoveOccupiedseats={props.RemoveOccupiedseats} Alreadyreservedseats={props.Alreadyreservedseats} handleError={props.handleError} />
            </Col>





        </>
    )
}

export default Visualize