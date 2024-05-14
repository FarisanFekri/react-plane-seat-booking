import { Button, Col, Container, Row } from 'react-bootstrap';
import Visualize from './Visualize';

function Mainpage(props) {
    return (
        <Container>
            <Row>
                <h1 style={{ fontSize: '36px', fontFamily: 'Arial', fontWeight: 'bold' }}>Airplane Seats</h1>
            </Row>
            <Row>
                {props.currentplane && props.seats ? (
                    <Visualize
                        list={props.seats}
                        seats={props.seats}
                        checkAuth={props.checkAuth}
                        setCurrentauth={props.setCurrentauth}
                        setCurrentplane={props.setCurrentplane}
                        currentplane={props.currentplane}
                        Occupiedseats={props.Occupiedseats}
                        AddOccupiedseat={props.AddOccupiedseat}
                        setOccupiedseats = {props.setOccupiedseats}
                        RemoveOccupiedseats={props.RemoveOccupiedseats}
                        AddOccupiedseats = {props.AddOccupiedseats}
                        AddReservation = {props.AddReservation}
                        Alreadyreservedseats={props.Alreadyreservedseats}
                        CancelReservation={props.CancelReservation}
                        setSeats={props.setSeats}
                        handleError={props.handleError}
                        errormessage={props.errormessage}
                    />
                ) : props.planes ? (
                    props.planes.map((plane, i) => (
                        <div key={i} className="mb-3">
                            <Button
                                onClick={() => props.setCurrentplane(plane)}
                                className="btn-custom"
                            >
                                {plane[1]}
                            </Button>
                        </div>
                    ))
                ) : (
                    <h1>Loading</h1>
                )}
            </Row>
        </Container>
    )
}

export default Mainpage;