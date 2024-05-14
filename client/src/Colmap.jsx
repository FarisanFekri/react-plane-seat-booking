import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Rowmap from './Rowmap';

function Colmap(props) {
    return (
        <Row>
            {props.col.map((seat, i) => {
                let statusClass = 'test';

                if (props.Alreadyreservedseats.includes(seat[0])) {
                    statusClass = statusClass.concat(' button-85');
                }
                else {
                    switch (seat[1]) {
                        case 'free':
                            if (props.Occupiedseats.includes(seat[0]))
                                statusClass = statusClass.concat(' button8');
                            else
                                statusClass = statusClass.concat(' button1');
                            break;
                        case 'reserved':
                            statusClass = statusClass.concat(' button7');
                            break;
                        default:
                            statusClass = statusClass.concat(' button1');
                            break;
                    }
                }
                let condition = seat[1] === "free" && props.Occupiedseats.includes(seat[0]);
                let style = {
                    borderRadius: '5px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }

                return (
                    <Col key={i} style={{ marginBottom: '10px' }}>
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                            <Button
                                onClick={() => (condition ? props.RemoveOccupiedseats(seat[0]) : props.AddOccupiedseat(seat[0]))}
                                className={`${statusClass} ${!props.checkAuth || seat[1] === 'reserved' ? 'disabled-button' : ''}`}
                                disabled={!props.checkAuth || seat[1] === 'reserved'}
                                style={{
                                    borderRadius: '5px',
                                    padding: '8px 16px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {seat[0]}
                            </Button>
                        </div>
                    </Col>
                );
            })}
        </Row>
    )
}

export default Colmap