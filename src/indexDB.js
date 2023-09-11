
const dbName = "StudentDB";
const dbVersion = 1;
let db=null;

const openRequest = indexedDB.open(dbName, dbVersion);

openRequest.onerror = function(event) {
  console.error("Error opening database:", event.target.error);
};
openRequest.onsuccess = function(event){
  db = event.target.result;
}
openRequest.onupgradeneeded = function(event) {
  db = event.target.result;

  
  const objectStore = db.createObjectStore("students", { keyPath: "id", autoIncrement: true });

  
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("age", "age", { unique: false });
  objectStore.createIndex("class", "class", { unique: false });
  objectStore.createIndex("address", "address", { unique: false });

  console.log("Database setup complete");
};


export class IndexDB{
    addEntity(entity, entities) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(entities, "readwrite");
        const objectStore = transaction.objectStore(entities);
        const request = objectStore.add(entity);
  
        request.onsuccess = function (event) {
          resolve(event);
        };
  
        request.onerror = function (event) {
          console.error("Error adding entity to database:", event.target.error);
          reject(event.target.error);
        };
      });
    }

     getEntities(entities) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(entities, "readonly");
        const objectStore = transaction.objectStore(entities);
        const cursorRequest = objectStore.openCursor();
        
        cursorRequest.onsuccess = function (event) {
          const cursor = event.target.result;
          if (cursor) {
            resolve(cursor); 
          } else {
            resolve(null); 
          }
        };
    
        cursorRequest.onerror = function (event) {
          reject(event.target.error); 
        };
      });
    }

    deleteEntity(id,entities){
      return new Promise((resolve,reject)=>{
      const transaction = db.transaction(entities, "readwrite");
      const objectStore = transaction.objectStore("students");
      const request = objectStore.delete(id);
      request.onsuccess = function(event) {
        resolve(event);
      }

      request.onerror = function (event) {
        console.error("Error deleting entity from database:", event.target.error);
        reject(event.target.error);
      };
      })
    }
  }


  
 
  
 