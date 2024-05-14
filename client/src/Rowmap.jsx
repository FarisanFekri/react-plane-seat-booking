import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Colmap from './Colmap';

function Rowmap(props) {
    return(
        <div className="cotainer text-center seats">
            {
                props.rows.map((col, i) => {
                    return <Colmap col={col} key={i} checkAuth={props.checkAuth} setCurrentauth={props.setCurrentauth} Occupiedseats={props.Occupiedseats} AddOccupiedseat={props.AddOccupiedseat} RemoveOccupiedseats={props.RemoveOccupiedseats} Alreadyreservedseats={props.Alreadyreservedseats} handleError={props.handleError} />

            })
        }
        </div>
    )
}

export default Rowmap