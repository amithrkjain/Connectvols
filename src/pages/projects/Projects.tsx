import ProjectCard from "../my-projects/components/ProjectCard";
import { Row, Col, Container } from "react-bootstrap";
import Page from "components/Page";
import { useAppSelector } from "src/redux/hooks";

export default function Projects() {
  const projects = useAppSelector((state) => state.projects.data);
  return (
    <Page title="Projects">
      <Container>
        <h2>Projects</h2>
        <hr className="mb-4" />
        <Row>
          {projects.map((project, index) => (
            <Col xs={4} key={index}>
              <ProjectCard {...project} />
            </Col>
          ))}
        </Row>
      </Container>
    </Page>
  );
}
