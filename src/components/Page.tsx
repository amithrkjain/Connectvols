import { Helmet } from "react-helmet";
import "./assets/css/Account-setting-or-edit-profile.css";
import "./assets/css/Bootstrap-Chat.css";
import "./assets/css/dh-card-image-left-dark.css";
import "./assets/css/LinkedIn-like-Profile-Box.css";
import "./assets/css/Navbar-Centered-Links-icons.css";
import "./assets/css/Topbar.css";

interface PageProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Page(props: PageProps) {
  return (
    <div
      style={{
        background: "background-color: #eee;",
        minHeight: '100vh',
        minWidth: "100vw",
        marginTop: 50,
        ...props.style,
      }}
    >
      <Helmet>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      {props.children}
    </div>
  );
}
