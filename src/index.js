import {addStudent,displayStudents} from "./indexDB.js";

const modal = document.getElementById("addStudentModal");


const modelOpenBtn = document.getElementById("addStudentButton");
modelOpenBtn.addEventListener("click",()=> {modal.style.display = "block";});

const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click",()=>{modal.style.display = "none"});


const saveStudentButton = document.getElementById("saveStudentButton");
saveStudentButton.addEventListener("click",function(event) {
    event.preventDefault(); 
  
  
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const studentClass = document.getElementById("class").value;
    const address = document.getElementById("address").value;
  
    const student = {
      name: name,
      age: parseInt(age),
      class: studentClass,
      address: address
    };
    addStudent(student, () => {
        console.log("Student added successfully.");
        modal.style.display = "none";
        displayStudents();
      }, (event) => {
        console.error("Error adding student:", event.target.error);
      });
   
  } );



displayStudents();

