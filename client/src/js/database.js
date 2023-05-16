import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
console.log('putting content to DB');
const db = await initdb();
const tx = db.transaction('jate', 'readwrite');
const store = tx.objectStore('jate');
await store.put({ content });
await tx.complete;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('grabbing content from database');
const db = await initdb();
const tx = db.transaction('jate', 'readonly');
const store = tx.objectStore('jate');
const cursor = await store.openCursor();
const result = [];
while (cursor) {
  results.push(cursor.value);
  cursor.continue();
}
await tx.complete;
return results;
}

initdb();
