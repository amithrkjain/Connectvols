/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, uniqBy } from "lodash";
import { useAppDispatch } from "src/redux/hooks";
import { setProjects } from "src/redux/reducers/project.reducer";
import { setSnack } from "src/redux/reducers/snack.reducer";
import { getAllProjects, updateDocument } from "src/service/api/api.firebase";
import { ProjectChatTypes, ProjectTypes } from "utils/types/project.types";
import { UserTypes } from "utils/types/user.types";
import { v4 as uuid } from "uuid";

export default function useProjectApi() {
  const dispatch = useAppDispatch();

  async function refreshProjects() {
    const projects = await getAllProjects();
    dispatch(setProjects(projects));
  }

  async function deleteVolunteer(
    volunteers: UserTypes[],
    volunteerId: string,
    projectId: string
  ) {
    try {
      const tempVolunteers = volunteers?.filter(
        (vol) => vol.uid !== volunteerId
      );
      await updateDocument("projects", `${projectId}`, {
        volunteers: tempVolunteers,
      });
      await refreshProjects();

      dispatch(
        setSnack({
          message: "Volunteer removed",
          type: "success",
          open: true,
        })
      );
    } catch (error: any) {
      dispatch(setSnack({ message: error.message, type: "error", open: true }));
    }
  }

  async function updateChatInProject(
    message: string,
    chats: ProjectChatTypes[],
    projectId: string,
    sender: string,
    to: string
  ) {
    try {
      await updateDocument("projects", `${projectId}`, {
        chats: uniqBy(
          [
            ...chats,
            {
              sender,
              message,
              to,
              timestamp: new Date().toISOString(),
              id: uuid(),
            },
          ],
          "id"
        ),
      });
      const projects = await getAllProjects();
      dispatch(setProjects(projects));
    } catch (error: any) {
      dispatch(setSnack({ message: error.message, type: "error", open: true }));
    }
  }

  async function applyAsVolunteer(user: UserTypes, project: ProjectTypes) {
    try {
      await updateDocument("projects", `${project.id}`, {
        volunteers: uniqBy([...get(project, "volunteer", []), user], "uid"),
      });
      const projects = await getAllProjects();
      dispatch(setProjects(projects));
      dispatch(
        setSnack({
          message: "Applied as a volunteer",
          type: "success",
          open: true,
        })
      );
    } catch (error: any) {
      dispatch(setSnack({ message: error.message, type: "error", open: true }));
    }
  }

  return { deleteVolunteer, updateChatInProject, applyAsVolunteer, refreshProjects };
}
