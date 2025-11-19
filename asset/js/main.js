import { addEmployee, employees, loadData, getEmployee, removeEmployee, saveData, canAssign, assignEmployee, unassignEmployee, getEligible, getEmployeesInZone  } from './store.js';
import { validateForm, validateexper } from './validation.js';
import { renderEmployees, addExperience } from './ui.js';

loadData();
let currentZone = null;

document.addEventListener('DOMContentLoaded', function () {
    renderEmployees();
    let modal = document.getElementById('modal-add');
    let modalRoom = document.getElementById('modal-Room');
    let btnAdd = document.querySelector('.btn-add');
    let closeBtn = document.querySelectorAll('.close');
    let btnCancel = document.querySelector('.btn-cancel');
    let form = document.getElementById('form-add-employee');
    let photoCircle = document.querySelector('.photo-circle');
    let photo = document.getElementById('photo-upload');
    let modalDetail = document.getElementById('modal-Detail');
    let expList = document.getElementById('experiences-list');




    btnAdd.addEventListener('click', function () {
        currentZone = null;
        modal.style.display = 'block';
        form.reset();
        document.getElementById('experiences-list').innerHTML = '';
    });

     let addBtns = document.querySelectorAll('.add-btn');
    for (let i = 0; i < addBtns.length; i++) {
        addBtns[i].addEventListener('click', function (e) {
            currentZone = e.target.closest('.zone').querySelector('h3').textContent;
            
            const eligible = getEligible(currentZone, employees);
            
            modalRoom.style.display = 'block';
            document.getElementById('EmployeesRoom').innerHTML = '';

            if (eligible.length === 0) {
                document.getElementById('EmployeesRoom').innerHTML = 
                    '<p style="padding:20px;color:red;text-align:center;">No eligible employees</p>';
                return;
            }

            eligible.forEach((emp) => {
                const div = document.createElement("div");
                div.className = 'employee-card';
                div.id = emp.id;
                div.innerHTML = `
                    <div class="employee-info" style="display:flex;gap:200px;align-items:center;">
                        <div style="display:flex;gap:10px;">
                            <div class="photo-circle">
                                <img src="${emp.photo}" alt="${emp.name}">
                            </div>
                            <div>
                                <strong>${emp.name}</strong><br>
                                <small>${emp.role}</small>
                            </div>
                        </div>
                        <button class="Assign-Btn" style="padding:10px 15px;background-color:green;color:white;border:none;border-radius:5px;cursor:pointer;">
                            Assign
                        </button>
                    </div>
                `;
                
                div.querySelector('.Assign-Btn').addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    const success = assignEmployee(emp.id, currentZone, employees);
                    
                    if (success) {
                        saveData();
                        renderEmployees();
                        modalRoom.style.display = 'none';
                    }
                });
                
                document.getElementById('EmployeesRoom').appendChild(div);
            });
        });
    }
function DetailModal(emp) {
    modalDetail.style.display = 'block';

    let experienceList = '';
    if (emp.experiences && emp.experiences.length > 0) {
        for (let i = 0; i < emp.experiences.length; i++) {
            const exp = emp.experiences[i];
            experienceList += `
                <li><strong>Company:</strong> ${exp.company}</li>
                <li><strong>Position:</strong> ${exp.position}</li>
                <li><strong>Start:</strong> ${exp.start}</li>
                <li><strong>End:</strong> ${exp.end}</li>
            `;
        }
    } else {
        experienceList = '<li>No experience available</li>';
    }
        const location = emp.zone ? `<strong> Location:</strong> ${emp.zone}` : '<strong> Location:</strong> Unassigned';

    document.getElementById('EmployeesDetail').innerHTML = `
        <div class="employee-info" style="display:flex;gap:200px;">
            <div style="display:flex; gap:10px;">
                <div class="photo-circle">
                    <img src="${emp.photo}" alt="Employee Photo">
                </div>
                <div>
                    <strong>${emp.name}</strong><br>
                    <small>${emp.role}</small>
                </div>
            </div>

            <div>
                <p><strong>Email:</strong> ${emp.email}</p>
                <p><strong>Phone:</strong> ${emp.phone}</p>
                <ul>
                    <strong>Experience:</strong>
                    ${experienceList}
                </ul>
            </div>
        </div>
    `;
}


    let employeeCards = document.querySelectorAll('.employee-card');
    employeeCards.forEach(card => {
        card.addEventListener("click", () => {
            const empId = Number(card.id);
            const employee = getEmployee(empId);
            DetailModal(employee);
        });
    });



    closeBtn.forEach((close) => {
        close.addEventListener('click', function () {
            modal.style.display = 'none';
            modalRoom.style.display = 'none';
            modalDetail.style.display = 'none';

        });

    })

    btnCancel.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });



    let btnAddExp = document.querySelector('.btn-add-exp');
    btnAddExp.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        addExperience();
    });
    form.addEventListener('change', function (e) {
        if (e.target && e.target.id === 'photo-upload') {
            const file = e.target.files;
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    photoCircle.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            }
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const role = document.getElementById("role").value.trim();
        const photo = document.getElementById("photo-upload").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();



        let experiences = [];
        let expItems = document.querySelectorAll('.experience-item');

        if (expItems.length > 0) {
            if (!validateexper()) {
                return;
            }
        }
        for (let i = 0; i < expItems.length; i++) {
            let item = expItems[i];
            let company = item.querySelector('.exp-company').value.trim();
            let position = item.querySelector('.exp-position').value.trim();
            let start = item.querySelector('.exp-start').value.trim();
            let end = item.querySelector('.exp-end').value.trim();

            if (company || position || start || end) {
                experiences.push({
                    company: company,
                    position: position,
                    start: start,
                    end: end
                });
            }
        }

        let employee = {
            id: Date.now(),
            name: name,
            role: role,
            photo: photo,
            email: email,
            phone: phone,
            experiences: experiences,
            zone: currentZone,
            room: null,
            
        };

        addEmployee(employee);
        if (!validateForm()) {
            return;
        }

        renderEmployees();
        modal.style.display = 'none';
        form.reset();

    });




});