import {IndexDB} from "./indexDB.js";
import {Student} from "./student.js"
const modal = document.getElementById("addStudentModal");
const indexDB = new IndexDB();

const modelOpenBtn = document.getElementById("addStudentButton");
modelOpenBtn.addEventListener("click",()=> {modal.style.display = "block";});

const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click",()=>{modal.style.display = "none"});


const saveStudentButton = document.getElementById("saveStudentButton");
saveStudentButton.addEventListener("click",async function(event) {
    event.preventDefault(); 
  
  
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const studentClass = document.getElementById("class").value;
    const address = document.getElementById("address").value;
  
    const student = new Student();
    student.name = name;
    student.age = parseInt(age);
    student.class = studentClass;
    student.address = address;
   
    indexDB.addEntity(student,["students"]).then(displayStudents());
    
   
  } );

async function displayStudents(){
  try {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML ="";
    let cursor = await indexDB.getEntities(["students"]);
    while (cursor) {
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

      cursor = await cursor.continue();
    }
  } catch (error) {
    console.error("Error iterating and displaying students:", error);
  }
}

async function deleteStudent(studentId){
  await indexDB.deleteEntity(studentId,["students"]);
}

displayStudents();
document.getElementById("studentTable").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    const studentId = event.target.dataset.studentId;
    if (confirm("Are you sure you want to delete this student?")) {
      deleteStudent(studentId);
    }
  }
});
