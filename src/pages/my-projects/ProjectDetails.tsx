/* eslint-disable @typescript-eslint/no-explicit-any */
import Page from "components/Page";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "src/redux/hooks";
import { setSnack } from "src/redux/reducers/snack.reducer";
import { getDocument } from "src/service/api/api.firebase";
import { ProjectTypes } from "utils/types/project.types";

export default function ProjectDetails() {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [projectData, setProjectData] = useState<ProjectTypes | null>(null);

  useEffect(() => {
    if (params.id) {
      getDocument("projects", params.id)
        .then(async (data) => {
          if (data) {
            setProjectData(data as ProjectTypes);
          }
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false);
          dispatch(
            setSnack({ open: true, message: error.message, type: "error" })
          );
        });
    }
  }, [params.id, dispatch]);

  return (
    <Page title="Edit Project">
      <Container>
        <h3 style={{ fontWeight: 400 }}>Project details</h3>
        {loading && (
          <div className="text-center border p-4">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {!loading && !projectData && (
          <div className="text-center p-4">
            <h2>Project not found</h2>
          </div>
        )}
        {!loading && projectData && (
          <table className="mt-4">
            <tr>
              <td className="py-2 border px-1">
                <strong>Name</strong>
              </td>
              <td className="border px-1">
                <h6>{projectData.name}</h6>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                <strong>Description</strong>
              </td>
              <td className="border p-2">{projectData.description}</td>
            </tr>
            <tr>
              <td className="border p-2">
                <strong>Required Skills</strong>
              </td>
              <td className="border p-2">
                {projectData.required_skills
                  .map((item) => item.label)
                  .join(", ")}
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                <strong>Project Owner</strong>
              </td>
              <td className="border p-2">{projectData.owner?.displayName}</td>
            </tr>
            <tr>
              <td className="border p-2">
                <strong>Time commitement</strong>
              </td>
              <td className="border p-2">{projectData.time_required}</td>
            </tr>
          </table>
        )}
      </Container>
    </Page>
  );
}
