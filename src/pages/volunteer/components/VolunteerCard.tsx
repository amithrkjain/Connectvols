import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { UserTypes } from "utils/types/user.types";

function VolunteerCard(props: UserTypes) {
  const [showDetails, setShowDetails] = useState(false);
  const handleClose = () => setShowDetails(false);
  return (
    <div>
      <Modal show={showDetails} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Img variant="top" className="mb-2" src={props.photoURL} />
          <table>
            <tbody>
              <tr>
                <td className="p-2 border">UID</td>
                <td className="p-2 border">{props.uid}</td>
              </tr>
              <tr>
                <td className="p-2 border">Full Name</td>
                <td className="p-2 border">{props.displayName}</td>
              </tr>
              <tr>
                <td className="p-2 border">Email</td>
                <td className="p-2 border">{props.email}</td>
              </tr>
              <tr>
                <td className="p-2 border">Phone Number</td>
                <td className="p-2 border">{props.phoneNumber}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Card style={{ width: "100%" }}>
        <Card.Img variant="top" src={props.photoURL} />
        <Card.Body>
          <Card.Title>{props.displayName}</Card.Title>
          <Card.Text>{props.email}</Card.Text>
          <Button variant="primary" onClick={() => setShowDetails(true)}>
            View Profile
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VolunteerCard;
