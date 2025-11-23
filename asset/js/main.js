import { addEmployee, employees, loadData, getEmployee,  saveData, assignEmployee, getEligible} from './store.js';

import { validateForm, validateexper } from './validation.js';
import { renderEmployees, addExperience } from './ui.js';

loadData();
let currentZone = null;

document.addEventListener('DOMContentLoaded', function () {

    renderEmployees();
    attachCardEvents();
    ChambreObligatoire();

    let modal = document.getElementById('modal-add');
    let modalRoom = document.getElementById('modal-Room');
    let modalDetail = document.getElementById('modal-Detail');

    let btnAdd = document.querySelector('.btn-add');
    let closeBtn = document.querySelectorAll('.close');
    let btnCancel = document.querySelector('.btn-cancel');
    let form = document.getElementById('form-add-employee');

    let photoInput = document.getElementById('photo-upload');


    btnAdd.addEventListener('click', function () {
        currentZone = null;
        modal.style.display = 'block';
        form.reset();
        document.getElementById('experiences-list').innerHTML = '';
    });

  
    let addBtns = document.querySelectorAll('.add-btn');
    addBtns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            currentZone = e.target.closest('.zone').querySelector('h3').textContent;

            const eligible = getEligible(currentZone, employees);

            modalRoom.style.display = 'block';
            let list = document.getElementById('EmployeesRoom');
            list.innerHTML = '';

            if (eligible.length === 0) {
                list.innerHTML =
                    '<p style="padding:20px;color:red;text-align:center;">No eligible employees</p>';
                return;
            }

            eligible.forEach((emp) => {
                const div = document.createElement('div');
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

                div.querySelector('.Assign-Btn').addEventListener('click', function (e) {
                    e.stopPropagation();

                    const success = assignEmployee(emp.id, currentZone, employees);

                    if (success) {
                        saveData();
                        renderEmployees();
                        attachCardEvents();
                        ChambreObligatoire();
                        modalRoom.style.display = 'none';
                    }
                });

                list.appendChild(div);
            });
        });
    });

  
    function DetailModal(emp) {
        modalDetail.style.display = 'block';

        let experienceList = '';
        if (emp.experiences && emp.experiences.length > 0) {
            emp.experiences.forEach((exp) => {
                experienceList += `
                    <li><strong>Company:</strong> ${exp.company}</li>
                    <li><strong>Position:</strong> ${exp.position}</li>
                    <li><strong>Start:</strong> ${exp.start}</li>
                    <li><strong>End:</strong> ${exp.end}</li>
                `;
            });
        } else {
            experienceList = '<li>No experience available</li>';
        }

        const loc = emp.zone
            ? `<strong> Location:</strong> ${emp.zone}`
            : '<strong> Location:</strong> Unassigned';

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
                    <p>${loc}</p>
                    <ul>
                        <strong>Experience:</strong>
                        ${experienceList}
                    </ul>
                </div>
            </div>
        `;
    }

    
    function attachCardEvents() {
        let cards = document.querySelectorAll('.employee-card');

        cards.forEach((card) => {
            card.addEventListener('click', function () {
                const empId = Number(card.id);
                const employee = getEmployee(empId);
                DetailModal(employee);
            });
        });
    }

    function hideErrorMessage() {
        let errorDiv = document.getElementById('error-message');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }
    
    closeBtn.forEach((close) => {
        close.addEventListener('click', function () {
            modal.style.display = 'none';
            modalRoom.style.display = 'none';
            modalDetail.style.display = 'none';
            hideErrorMessage();
        });
    });
    
    btnCancel.addEventListener('click', function () {
        modal.style.display = 'none';
        hideErrorMessage();
    });

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            hideErrorMessage();
        }
    });

  
    let btnAddExp = document.querySelector('.btn-add-exp');
    btnAddExp.addEventListener('click', function (e) {
        e.preventDefault();
        addExperience();
    });

  
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) return;

        let experiences = [];
        let expItems = document.querySelectorAll('.experience-item');

        if (expItems.length > 0 && !validateexper()) return;

        expItems.forEach((item) => {
            let company = item.querySelector('.exp-company').value.trim();
            let position = item.querySelector('.exp-position').value.trim();
            let start = item.querySelector('.exp-start').value.trim();
            let end = item.querySelector('.exp-end').value.trim();

            if (company || position || start || end) {
                experiences.push({ company, position, start, end });
            }
        });

        let employee = {
            id: Date.now(),
            name: document.getElementById('name').value.trim(),
            role: document.getElementById('role').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            photo: photoInput.value.trim() || 'https://via.placeholder.com/100',
            experiences: experiences,
            zone: null,
            room: null
        };

        addEmployee(employee);
        saveData();
        renderEmployees();
        attachCardEvents();
        ChambreObligatoire();
        modal.style.display = 'none';
        form.reset();
    });

    
    function ChambreObligatoire() {
        const zones = [
            { box: '.zone-security', list: '.security' },
            { box: '.zone-reception', list: '.reception' },
            { box: '.zone-servers', list: '.servers' },
            { box: '.zone-archives', list: '.archives' }
        ];

        zones.forEach((z) => {
            const zoneBox = document.querySelector(z.box);
            const list = document.querySelector(z.list);

            if (list.children.length > 0) {
                zoneBox.classList.remove('zone-obligatoire');
            } else {
                zoneBox.classList.add('zone-obligatoire');
            }
        });
    }
});