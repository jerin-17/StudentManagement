(()=>{"use strict";const e="StudentDB",t=indexedDB.open(e,1);function n(){const e=document.querySelector("#studentTable tbody");e.innerHTML="";const t=indexedDB.open("StudentDB",1);t.onerror=function(e){console.error("Error opening database:",e.target.error)},t.onsuccess=function(t){const n=t.target.result.transaction(["students"],"readonly").objectStore("students").openCursor();n.onsuccess=function(t){const n=t.target.result;if(n){const t=document.createElement("tr");t.innerHTML=`\n            <td>${n.value.name}</td>\n            <td>${n.value.age}</td>\n            <td>${n.value.class}</td>\n            <td>${n.value.address}</td>\n            <td>\n            <button class="delete-button" data-student-id="${n.value.id}">Delete</button>\n          </td>\n          `,e.appendChild(t),n.continue()}},n.onerror=function(e){console.error("Error retrieving data:",e.target.error)}}}t.onerror=function(e){console.error("Error opening database:",e.target.error)},t.onupgradeneeded=function(e){const t=e.target.result.createObjectStore("students",{keyPath:"id",autoIncrement:!0});t.createIndex("name","name",{unique:!1}),t.createIndex("age","age",{unique:!1}),t.createIndex("class","class",{unique:!1}),t.createIndex("address","address",{unique:!1}),console.log("Database setup complete")},document.getElementById("studentTable").addEventListener("click",(function(e){if(e.target.classList.contains("delete-button")){const t=e.target.dataset.studentId;confirm("Are you sure you want to delete this student?")&&function(e){const t=indexedDB.open("StudentDB",1);t.onsuccess=function(t){const o=t.target.result.transaction(["students"],"readwrite"),r=o.objectStore("students").delete(e);r.onsuccess=function(){console.log(`Student with ID ${e} deleted successfully.`),o.commit(),n()},r.onerror=function(t){console.error(`Error deleting student with ID ${e}:`,t.target.error),t.target.closest("tr").remove()}},t.onerror=function(e){console.error("Error opening database:",e.target.error),"function"==typeof errorCallback&&errorCallback(e)}}(t)}}));const o=document.getElementById("addStudentModal");document.getElementById("addStudentButton").addEventListener("click",(()=>{o.style.display="block"})),document.getElementById("closeModal").addEventListener("click",(()=>{o.style.display="none"})),document.getElementById("saveStudentButton").addEventListener("click",(function(t){t.preventDefault();const r=document.getElementById("name").value,s=document.getElementById("age").value,d=document.getElementById("class").value,a=document.getElementById("address").value;!function(t,n,o){const r=indexedDB.open(e,1);r.onsuccess=function(e){const r=e.target.result.transaction(["students"],"readwrite").objectStore("students").add(t);r.onsuccess=function(e){console.log("Student added to database:",t),n()},r.onerror=function(e){console.error("Error adding student:",e.target.error),o(e)}},r.onerror=function(e){console.error("Error opening database:",e.target.error),o(e)}}({name:r,age:parseInt(s),class:d,address:a},(()=>{console.log("Student added successfully."),o.style.display="none",n()}),(e=>{console.error("Error adding student:",e.target.error)}))})),n()})();