import { useState } from "react";
import { Card, Form, Offcanvas } from "react-bootstrap";
import { useAppSelector } from "src/redux/hooks";
import { ProjectChatTypes } from "utils/types/project.types";
import { Icon } from "@iconify/react";

interface ChatTypes {
  open: boolean;
  onClose: () => void;
  chats?: ProjectChatTypes[];
  updateChatInProject(message: string): Promise<void>;
}
export default function Chat({
  open,
  onClose,
  chats,
  updateChatInProject,
}: ChatTypes) {
  const user = useAppSelector((state) => state.auth.user);
  const [message, setMessage] = useState("");
  const onKeyDown = () => {
    updateChatInProject(message);
    setMessage("");
  };
  return (
    <Offcanvas show={open} onHide={onClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Conversation</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="border d-flex flex-column justify-content-between">
        <div
          id="chat-container"
          style={{
            minHeight: "calc(100vh - 180px)",
            maxHeight: "calc(100vh - 180px)",
            overflowY: "auto",
          }}
        >
          {chats?.map((chat, index) => (
            <Card key={index}>
              {chat.sender !== user?.uid ? (
                <Card.Body
                  className="p-2 d-flex align-items-center"
                  style={{ background: "lightgray" }}
                >
                  <Icon
                    className="me-1 shadow"
                    style={{ fontSize: 20, color: "gray", borderRadius: "50%" }}
                    icon="eos-icons:admin"
                  />{" "}
                  {chat.message}
                </Card.Body>
              ) : (
                <Card.Body className="p-2 d-flex align-items-center">
                  <Icon
                    className="me-1 shadow"
                    style={{ fontSize: 20, color: "gray", borderRadius: "50%" }}
                    icon="ph:user-bold"
                  />
                  {chat.message}
                </Card.Body>
              )}
            </Card>
          ))}
        </div>
        <div>
          <hr />
          <Form.Control
            type="text"
            id="chat"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onKeyDown();
              }
            }}
            placeholder="Type your message here"
            aria-describedby="passwordHelpBlock"
          />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
