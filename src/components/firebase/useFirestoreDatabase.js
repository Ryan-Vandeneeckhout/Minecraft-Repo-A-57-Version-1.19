import { useState, useEffect, useRef } from "react";
import { db } from "./config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useCollection = (c, _q) => {
  // Connect and query FireStore collections for Project MNPC//

  const [databaseFirestore, setDatabaseFirestore] = useState(null);
  const q = useRef(_q).current;

  useEffect(() => {
    let ref = collection(db, c);

    if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setDatabaseFirestore(results);
    });

    return () => unsub();
  }, [c, q]);

  return { databaseFirestore };
};
