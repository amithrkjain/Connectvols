import { useRoutes } from "react-router-dom";
import PrivateLayout from "layout/PrivateLayout";
import Profile from "pages/profile/Profile";
import Projects from "pages/projects/Projects";
import Volunteer from "pages/volunteer/Volunteer";
import MyProjects from "pages/my-projects/MyProjects";
import ProjectDetails from "pages/my-projects/ProjectDetails";
import EditProject from "pages/my-projects/EditProject";

export default function PrivateRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <PrivateLayout />,
      children: [
        { path: "/", element: <Projects /> },
        { path: "profile", element: <Profile /> },
        { path: "projects", element: <Projects /> },
        { path: "project/view/:id", element: <ProjectDetails /> },
        { path: "project/edit/:id", element: <EditProject /> },
        { path: "my-projects", element: <MyProjects /> },
        { path: "volunteer", element: <Volunteer /> },
      ],
    },
  ]);
  return routes;
}
