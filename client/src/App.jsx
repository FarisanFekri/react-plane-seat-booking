import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { listPlanes, listSeats, checkLogin, doLogout, addReservation, cancelReservation } from './API.js';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Visualize from "./Visualize";
import Mainpage from './Mainpage.jsx';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Login } from './Login.jsx';
import { Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


function App() {

  //FAKE DATA
  // const [currentplane, setCurrentplane] = useState(undefined);
  // const [seats, setSeats] = useState([[["10A", "free"], ["5H", "occupied"], ["6J", "reserved"]]]);
  // const [planes, setPlanes] = useState(["Plane 1", "Plane 2", "Plane 3"]);
  // const [checkAuth, setCurrentauth] = useState(false);

  const [currentplane, setCurrentplane] = useState(undefined);
  const [seats, setSeats] = useState(undefined);
  const [planes, setPlanes] = useState(undefined);
  const [checkAuth, setCurrentauth] = useState(false);
  const [user, setUser] = useState(undefined);
  const [Occupiedseats, setOccupiedseats] = useState([]);
  const [errormessage, setErrormessage] = useState(undefined);
  const [Alreadyreservedseats, setAlreadyreservedseats] = useState([]);

  const validateLogin = async (username, password) => {
    const user = await checkLogin(username, password);
    setUser(user);
    setCurrentauth(true);
  }

  const handleLogout = async () => {
    await doLogout();
    setUser(undefined);
    setCurrentauth(false);
    setOccupiedseats([]);
  }

  //For one occupied seat
  const AddOccupiedseat = (currentseat) => {
    setOccupiedseats([...Occupiedseats, currentseat])
  };

  //For two occupied seats
  const AddOccupiedseats = (currentseat) => {
    setOccupiedseats([...Occupiedseats, ...currentseat])
  };

    const handleError = (errormessage) => {
      // setErrormessage(JSON.stringify(errormessage));
      setErrormessage(errormessage) 
      setTimeout(() => {
        setErrormessage(undefined)
      }, 3000);
    }

  const RemoveOccupiedseats = (currentseat) => {
    const updatedOccupiedseats = Occupiedseats.filter(seat => seat !== currentseat);
    setOccupiedseats(updatedOccupiedseats);
  };

  const AddReservation = async () => {
    try {
      await addReservation(currentplane, Occupiedseats);
      setOccupiedseats([]); // Clear the Occupiedseats state immediately
    } catch (errormessage) {
      if (errormessage.error === 'Some seats have been already reserved by another user') {
        setAlreadyreservedseats(errormessage.alreadyreserved.map((seat) => seat.seat));
        setTimeout(() => {
          setAlreadyreservedseats([]);
          listSeats(currentplane[0])
            .then((seat) => setSeats(seat))
            .catch((err) => handleError(err.error));
        }, 5000); //only for 5 seconds
      }
      else
        handleError(errormessage.error);
    }
    finally {
      // Request the updated seats from the server
      setOccupiedseats([]);
      const updatedSeats = await listSeats(currentplane[0]);
      setSeats(updatedSeats); // Update the seats state with the updated data
    }
  };

  const CancelReservation = async () => {
    try {
      await cancelReservation(currentplane);
    }
    catch (err) {
      handleError(err.error);
    }
    finally {
      listSeats(currentplane[0])
        .then((seat) => setSeats(seat))
        .catch((err) => handleError(err.error));
    }
  };

  useEffect(() => {
    listPlanes().then((list) => {
      setPlanes(list)
    }).catch((errormessage) => handleError(errormessage.error));
  }, []);

  useEffect(() => {
    if (currentplane) {
      listSeats(currentplane[0]).then((seats) =>
        setSeats(seats))
        .catch((errormessage) => handleError(errormessage.error));
    }
  }, [currentplane]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout user={user} handleLogout={handleLogout} errormessage={errormessage} />}>
          <Route path="/" element={<Mainpage planes={planes} currentplane={currentplane} setCurrentplane={setCurrentplane} setSeats={setSeats} seats={seats} setCurrentauth={setCurrentauth} checkAuth={checkAuth} Occupiedseats={Occupiedseats} setOccupiedseats={setOccupiedseats} AddOccupiedseat={AddOccupiedseat} RemoveOccupiedseats={RemoveOccupiedseats} AddOccupiedseats={AddOccupiedseats} AddReservation={AddReservation} Alreadyreservedseats={Alreadyreservedseats} CancelReservation={CancelReservation} handleError={handleError} errormessage={errormessage}/>} />
          <Route path="/login" element={<Login validateLogin={validateLogin} />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}


function MainLayout(props) {
  return <>
    <header>
      <Navbar sticky="top" variant="dark" expand="lg" className="airport-navbar mb-3">
        <Container>
          <Navbar.Brand><Link to="/" className="navbar-brand" onClick={() => { props.setSeats(undefined); props.setOccupiedseats([]); handleCancel() }} >Polito Airport</Link></Navbar.Brand>
          <Navbar.Text>
            {props.user ? (
              <span>
                {props.user.name} <Link onClick={props.handleLogout}>Logout</Link>
              </span>
            ) : (
              <Link to="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </Link>
            )}
          </Navbar.Text>
        </Container>
      </Navbar>
    </header>
    <main>
      <Container>
        <Outlet />
      </Container>
    </main>

  </>
}

export default App
