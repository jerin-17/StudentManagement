console.log("I am in v2");
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


export function addStudent(student, successCallback, errorCallback) {
    const openRequest = indexedDB.open(dbName, dbVersion);
  
    openRequest.onsuccess = function(event) {
      const db = event.target.result;
  
      const transaction = db.transaction(["students"], "readwrite");
      const objectStore = transaction.objectStore("students");
      const request = objectStore.add(student);
  
      request.onsuccess = function(event) {
        console.log("Student added to database:", student);
        if (typeof successCallback === "function") {
          successCallback(event);
        }
      };
  
      request.onerror = function(event) {
        console.error("Error adding student:", event.target.error);
        if (typeof errorCallback === "function") {
          errorCallback(event);
        }
      };
    };
  
    openRequest.onerror = function(event) {
      console.error("Error opening database:", event.target.error);
      if (typeof errorCallback === "function") {
        errorCallback(event);
      }
    };
  }

  export function displayStudents() {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML ="";
    const dbName = "StudentDB";
    const dbVersion = 1;
    const openRequest = indexedDB.open(dbName, dbVersion);
  
    openRequest.onerror = function (event) {
      console.error("Error opening database:", event.target.error);
    };
  
    openRequest.onsuccess = function (event) {
      const db = event.target.result;
  

      const transaction = db.transaction(["students"], "readonly");
      const objectStore = transaction.objectStore("students");
  

      const cursorRequest = objectStore.openCursor();
  
      cursorRequest.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {

          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${cursor.value.name}</td>
            <td>${cursor.value.age}</td>
            <td>${cursor.value.class}</td>
            <td>${cursor.value.address}</td>
            <td>
            <button class="delete-button" data-student-id="${cursor.value.id}">Delete</button>
          </td>
          `;
  
          tableBody.appendChild(row);
  
          cursor.continue();
        }
      };
  
      cursorRequest.onerror = function (event) {
        console.error("Error retrieving data:", event.target.error);
      };
    };
  }
  

function deleteStudent(studentId) {
   
    const dbName = "StudentDB";
    const dbVersion = 1;
    const openRequest = indexedDB.open(dbName, dbVersion);
    openRequest.onsuccess = function (event) {
      console.log('onsuccess')
      const db = event.target.result;
  
      const transaction = db.transaction(["students"], "readwrite");
      const objectStore = transaction.objectStore("students");
      const deleteRequest = objectStore.delete(+studentId);
     
      deleteRequest.onsuccess = function () {
        console.log(`Student with ID ${studentId} deleted successfully.`);
        displayStudents();

      };
  
      deleteRequest.onerror = function (event) {
        console.error(`Error deleting student with ID ${studentId}:`, event.target.error);
       
      };
    };

    openRequest.onerror = function(event) {
        console.error("Error opening database:", event.target.error);
        if (typeof errorCallback === "function") {
          errorCallback(event);
        }
      };


  }
  function deleteV2(studentId){
    const transaction = db.transaction(["students"], "readwrite");
    const objectStore = transaction.objectStore("students");
    const deleteRequest = objectStore.delete(+studentId);
    deleteRequest.onsuccess = function () {
      displayStudents();
    };
  }
  
  document.getElementById("studentTable").addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
      const studentId = event.target.dataset.studentId;
      if (confirm("Are you sure you want to delete this student?")) {
        deleteStudent(studentId);
      }
    }
  });
  
 