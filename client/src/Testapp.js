import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './theme.css';


function Testapp() {
  const [displayToggle, setDisplayToggle] = useState(['card', 'grid', 'flex']);

  const displays = {
    card(){
      return <Container className="text-center my-5">
        <Card bg="info" text="white">
          <Card.Body>
            <Card.Title>Welcome to our Website</Card.Title>
            <Card.Text>
              Discover the beauty of React Bootstrap Layout with a stunning container component approach.
            </Card.Text>
            <Button variant="light">Learn More</Button>
          </Card.Body>
        </Card>
      </Container>
    },
    grid() {
      return <Container className="text-center my-5">
        <Row>
          <Col md={6} className="bg-primary text-white p-4">
            <h2>Column 1</h2>
            <p>This is a visually appealing layout using the grid system approach.</p>
            <Button variant="light">Click me</Button>
          </Col>
          <Col md={6} className="bg-secondary text-white p-4">
            <h2>Column 2</h2>
            <p>Responsive and stunning design to enhance user experience.</p>
            <Button variant="light">Explore</Button>
          </Col>
        </Row>
      </Container>
    },
    flex() {
      return <Container className="d-flex justify-content-around align-items-center flex-wrap my-5">
        <div className="bg-success text-white p-3 m-2">Element 1</div>
        <div className="bg-warning text-dark p-3 m-2">Element 2</div>
        <div className="bg-danger text-white p-3 m-2">Element 3</div>
        <div className="bg-info text-white p-3 m-2">Element 4</div>
      </Container>
    }
  }


	return (
    <>
    <Button variant='danger' onClick={() => setDisplayToggle(prev => [...prev.slice(1), prev[0]])}>Toggle display
    </Button>
    {displays[displayToggle[0]]()}
    </>
	);
}

export default Testapp;
