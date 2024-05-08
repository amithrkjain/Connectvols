/* eslint-disable @typescript-eslint/no-explicit-any */
import Page from "components/Page";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "src/redux/hooks";
import CreateProjectModal from "./components/CreateProjectModal";
import ProjectCard from "pages/my-projects/components/ProjectCard";

export default function MyProjects() {
  const { user, projects } = useAppSelector((state) => ({
    user: state.auth.user,
    projects: state.projects.data,
  }));
  const [showAddProject, setShowAddProject] = useState(false);
  const handleClose = () => setShowAddProject(false);

  return (
    <Page title="My Projects">
      <Container>
        <CreateProjectModal open={showAddProject} onClose={handleClose} />
        <h3 style={{ fontWeight: 400 }}>My Projects</h3>
        <hr />
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => setShowAddProject(true)}
        >
          Create New Project
        </Button>
        <Row>
          {projects
            .filter((project) => project.owner.uid === user?.uid)
            .map((project) => (
              <Col key={project.id} xs={4} className="mb-4">
                <ProjectCard {...project} />
              </Col>
            ))}
        </Row>
      </Container>
    </Page>
  );
}
