/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Button,
  Accordion,
  Row,
  Col,
  ListGroup,
  CloseButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "src/redux/hooks";
import { ProjectTypes } from "utils/types/project.types";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Chat from "./Chat";
import useProjectApi from "utils/hooks/useProjectApi";
import AdminChat from "./AdminChat";

export default function ProjectCard(props: ProjectTypes) {
  const {
    deleteVolunteer,
    applyAsVolunteer,
    updateChatInProject,
    refreshProjects,
  } = useProjectApi();
  const [showChat, setShowChat] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const [selectedChat, setSelectedChat] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showAdminChat, setShowAdminChat] = useState(false);

  function selectChat(id: string) {
    setSelectedUser(id);
    setShowAdminChat(true);
    refreshProjects();
  }

  useEffect(() => {
    if (selectedUser) {
      const tempChat: any = props.chats?.filter(
        (chat) => chat.sender === selectedUser || chat.to === selectedUser
      );
      setSelectedChat(tempChat);
    }
  }, [selectedUser, props.chats]);

  return (
    <Card style={{ width: "380px" }}>
      <Chat
        open={showChat}
        updateChatInProject={(message: string) =>
          updateChatInProject(
            message,
            props.chats || [],
            props.id,
            user?.uid || "",
            props.owner.uid
          )
        }
        chats={props.chats}
        onClose={() => setShowChat(false)}
      />
      <AdminChat
        open={showAdminChat}
        chats={selectedChat}
        onClose={() => setShowAdminChat(false)}
        updateChatInProject={(message: string) =>
          updateChatInProject(
            message,
            props.chats || [],
            props.id,
            `${user?.uid}`,
            selectedUser
          )
        }
      />
      <Card.Body>
        <Card.Title>
          <h4>{props.name}</h4>
        </Card.Title>
        <Card.Text className="mt-2">{props.description}</Card.Text>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>LOCATION</Accordion.Header>
            <Accordion.Body>{props.location}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>SKILLS</Accordion.Header>
            <Accordion.Body>
              {props.required_skills.map((skill, index) => (
                <span key={index}>{skill.value}, </span>
              ))}
            </Accordion.Body>
          </Accordion.Item>
          {user?.uid === props.owner.uid && (
            <Accordion.Item eventKey="2">
              <Accordion.Header>VOLUNTEERS</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {props.volunteers?.map((volunteer) => (
                    <ListGroup.Item
                      key={volunteer.uid}
                      className="d-flex justify-content-between"
                    >
                      {volunteer.displayName}
                      <div className="d-flex align-items-center">
                        <Icon
                          onClick={() => selectChat(volunteer.uid)}
                          icon="mingcute:chat-2-fill"
                          style={{
                            fontSize: 25,
                            marginRight: 12,
                            cursor: "pointer",
                            color: "gray",
                          }}
                        />
                        <CloseButton
                          onClick={() =>
                            deleteVolunteer(
                              props.volunteers || [],
                              volunteer.uid,
                              props.id
                            )
                          }
                        />
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
        {props.owner.uid !== user?.uid && (
          <Button
            onClick={() => {
              setShowChat(true)
              refreshProjects();
            }}
            className="mt-3"
            style={{ width: "100%" }}
          >
            <Icon icon="grommet-icons:chat" className="me-2" />
            Chat with owner
          </Button>
        )}
        <Row className="mt-3">
          <Col xs={6}>
            {user?.uid === props.owner.uid ? (
              <Link to={`/project/edit/${props.id}`}>
                <Button
                  variant="primary"
                  style={{ height: "100%", width: "100%" }}
                >
                  Edit Project
                </Button>
              </Link>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  if (user) applyAsVolunteer(user, props);
                }}
                style={{ height: "100%", width: "100%" }}
              >
                Apply as a Volunteer
              </Button>
            )}
          </Col>
          <Col>
            <Link to={`/project/view/${props.id}`}>
              <Button variant="light" style={{ height: "100%", width: "100%" }}>
                View Project
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
