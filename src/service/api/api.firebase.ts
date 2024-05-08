/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  doc,
  getDocs,
  collection,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export async function getCollections(table: string) {
  const querySnapshot = await getDocs(collection(db, table));
  const result: any[] = [];
  querySnapshot.forEach((doc) => {
    result.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return result;
}

export async function getDocument(table: string, id: string) {
  console.log({
    table, id
  })
  const docRef = doc(db, table, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function updateDocument(table: string, id: string, data: any) {
  const docRef = doc(db, table, id);
  await updateDoc(docRef, data);
}

export async function getProfile(id: string) {
  return getDocument("users", id);
}

export async function getMyProjects(id: string) {
  const q = query(collection(db, "projects"), where("owner", "==", id));
  const querySnapshot = await getDocs(q);
  const result: any[] = [];
  querySnapshot.forEach((doc) => result.push(doc.data()));
  return result;
}

export async function getAllProjects() {
  return getCollections("projects");
}

export async function getAllVolunteer() {
  return getCollections("users");
}