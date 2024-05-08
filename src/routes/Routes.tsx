/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRoutes";
import { useAppSelector } from "src/redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "src/service/firebase";
import { setUser, stopLoading } from "src/redux/reducers/auth.reducer";
import Loader from "components/Loader";
import { getAllProjects, getAllVolunteer } from "src/service/api/api.firebase";
import { setProjects } from "src/redux/reducers/project.reducer";
import { setSnack } from "src/redux/reducers/snack.reducer";
import { setVolunteers } from "src/redux/reducers/volunteer.reducer";

export default function Routes() {
  const dispatch = useDispatch();
  const { auth } = useAppSelector((state) => ({
    auth: state.auth,
  }));

  React.useEffect(() => {
    if (!auth.user) {
      const unsubscribe = onAuthStateChanged(
        firebaseAuth,
        async (currentUser) => {
          if (currentUser) {
            const userObj = {
              displayName: currentUser.displayName || "",
              email: currentUser.email || "",
              uid: currentUser.uid,
              photoURL: currentUser.photoURL || "",
              phoneNumber: currentUser.phoneNumber || "",
              accessToken: await currentUser.getIdToken(),
            };
            dispatch(setUser(userObj));
          }
          dispatch(stopLoading());
        }
      );
      return () => unsubscribe();
    }
  }, [auth.user, dispatch]);

  useEffect(() => {
    async function getData() {
      try {
        const result: any[] = await Promise.all([
          getAllProjects(),
          getAllVolunteer(),
        ]);
        return result;
      } catch (error: any) {
        dispatch(
          setSnack({ open: true, message: error.message, type: "error" })
        );
      }
    }
    if (auth.user) {
      getData()
        .then((data) => {
          if (data) {
            dispatch(setProjects(data[0]));
            dispatch(setVolunteers(data[1]));
          }
        })
        .catch((error) => {
          dispatch(
            setSnack({ open: true, message: error.message, type: "error" })
          );
        });
    }
  }, [auth.user, dispatch]);

  return (
    <div>
      {auth.loading && <Loader loading={auth.loading} />}
      {auth.user && !auth.loading && <PrivateRouter />}
      {!auth.user && !auth.loading && <PublicRouter />}
    </div>
  );
}
