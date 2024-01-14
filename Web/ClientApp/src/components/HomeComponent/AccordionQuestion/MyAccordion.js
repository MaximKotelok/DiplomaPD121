import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import * as ReactBootstrap from 'react-bootstrap';

function MyAccordion() {
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Питання 1
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <img width="32px" height="32px" src="C:\Users\Dimka\Pictures\20221025_215935.jpg" className="m-3" alt="icon" />
            <p className="text-body-victorina">
              Lorem ipsum dolor amet consectetur adipisicing elit. Natus unde, ab autem quis quia sint quod accusamus
              quas possimus.
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            Питання 2
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <img width="32px" height="32px" src="C:\Users\Dimka\Pictures\20221025_215935.jpg" className="m-3" alt="icon" />
            <p className="text-body-victorina">
              Lorem ipsum dolor amet consectetur adipisicing elit. Natus unde, ab autem quis quia sint quod accusamus
              quas possimus.
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default MyAccordion;
