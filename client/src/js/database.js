import { openDB } from "idb";

//Initialize database
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// A method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Updated the database");
  const textEditorDb = await openDB("jate", 1);
  const tx = textEditorDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, jate: content });
  const result = await request;
  console.log("Text edited and saved to the database");
};

// A method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all text from the database");
  const textEditorDb = await openDB("jate", 1);
  const tx = textEditorDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
