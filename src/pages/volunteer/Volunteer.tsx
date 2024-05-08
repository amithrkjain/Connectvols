import Page from "components/Page";
import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "src/redux/hooks";
import VolunteerCard from "./components/VolunteerCard";

export default function Volunteer() {
  const volunteer = useAppSelector((state) => state.volunteer.data);
  return (
    <Page title="Volunteer">
      <Container>
        <h3>Volunteer</h3>
        <hr />
        <Row>
          {volunteer.map((volunteer) => (
            <Col xs={4} key={volunteer.uid}>
              <VolunteerCard {...volunteer} />
            </Col>
          ))}
        </Row>
      </Container>
    </Page>
  );
}
