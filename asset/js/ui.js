import { employees, removeEmployee, unassignEmployee, saveData } from './store.js';

export function createEmployeeCardSidebar(emp) {
    let card = document.createElement('div');
    card.className = 'employee-card';
    card.id = emp.id;

    card.innerHTML = `
        <div class="employee-info">
            <div class="photo-circle">
                <img src="${emp.photo}">
            </div>
            <strong>${emp.name}</strong>
            <small class ="roomrole">${emp.role}</small>
        </div>
        <button class="btn-delete" data-id="${emp.id}">×</button>
    `;

    let deleteBtn = card.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        removeEmployee(emp.id);
    });

    return card;
}

export function createEmployeeCard(emp) {
    let card = document.createElement('div');
    card.className = 'employee-card-room';
    card.id = emp.id;

    card.innerHTML = `
        <div class="employee-info-room">
            <strong>${emp.name}</strong>
            <small class = "roomrole">${emp.role}</small>
        </div>
        <button class="btn-unassign" data-id="${emp.id}">×</button>
    `;

    let unassignBtn = card.querySelector('.btn-unassign');
    unassignBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        unassignEmployee(emp.id, employees);
        saveData();
        location.reload();
    });

    return card;
}

export function renderEmployees() {
    let unassignedList = document.getElementById('unassigned-list');
    unassignedList.innerHTML = '';

    let zoneAreas = document.querySelectorAll('.zone .employees');
    zoneAreas.forEach((zone) => (zone.innerHTML = ''));

    employees.forEach((emp) => {
        if (emp.zone) {
            let card = createEmployeeCard(emp);
            let zones = document.querySelectorAll('.zone h3');
            zones.forEach((z) => {
                if (z.textContent === emp.zone) {
                    z.parentElement.querySelector('.employees').appendChild(card);
                }
            });
        } else {
            let card = createEmployeeCardSidebar(emp);
            unassignedList.appendChild(card);
        }
    });
}

export function addExperience() {
    let expList = document.getElementById('experiences-list');

    let expItem = document.createElement('div');
    expItem.className = 'experience-item';

    expItem.innerHTML = `
        <label>Company:</label>
        <input type="text" placeholder="Company Name" class="exp-company">

        <label>Position:</label>
        <input type="text" placeholder="Position Title" class="exp-position">

        <label>Start Year:</label>
        <input type="text" placeholder="2020" class="exp-start">

        <label>End Year:</label>
        <input type="text" placeholder="2023" class="exp-end">

        <button type="button" class="btn-remove-exp">Remove</button>
    `;

    let removeBtn = expItem.querySelector('.btn-remove-exp');
    removeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        expItem.remove();
    });

    expList.appendChild(expItem);
}