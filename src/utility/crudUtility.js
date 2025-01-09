import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebaseApp";

export const readCategories = (setCategories) => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef, orderBy("name", "asc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};

export const addPost = async (formData) => {
  const collectionRef = collection(db, "posts");
  const newItem = { ...formData, timestamp: serverTimestamp() };
  await addDoc(collectionRef, newItem);
};

export const readPost = (setPost, selCateg) => {
  const collectionRef = collection(db, "posts");
  console.log(selCateg);

  const q =
    selCateg.length == 0
      ? query(collectionRef, orderBy("timestamp", "desc"))
      : query(collectionRef, where("category", "in", selCateg));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    setPost(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};

export const readPosts = async (id, setPost) => {
  const docRef = doc(db, "posts", id);
  //const docSnap = await getDoc(docRef);
  const unsubscribe = onSnapshot(docRef, (snapshot) => {
    setPost({ ...snapshot.data(), id: snapshot.id });
  });

  return unsubscribe;
};

export const deletePost = async (id) => {
  const docRef = doc(db, "posts", id);
  await deleteDoc(docRef);
};

export const toggleLike = async (id, uid) => {
  const docRef = doc(db, "posts", id);

  const docSnap = await getDoc(docRef);

  const likesArr = docSnap.data().likes || [];
  if (likesArr.includes(uid)) {
    await updateDoc(docRef, { likes: likesArr.filter((p_id) => p_id != uid) });
  } else {
    await updateDoc(docRef, { likes: [...likesArr, uid] });
  }
};
