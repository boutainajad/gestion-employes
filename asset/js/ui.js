import { employees, removeEmployee } from './store.js';

export function createEmployeeCard(emp) {
    let card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
        <div class="employee-info">
            <strong>${emp.name}</strong>
            <small>${emp.role}</small>
        </div>
        <button class="btn-delete" data-id="${emp.id}">×</button>
    `;
    
    let deleteBtn = card.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', function() {
        removeEmployee(emp.id);
        renderEmployees();
    });
    
    return card;
}

export function renderEmployees() {
    let unassignedList = document.getElementById('unassigned-list');
    unassignedList.innerHTML = '';
    
    let allZones = document.querySelectorAll('.zone .employees');
    for (let i = 0; i < allZones.length; i++) {
        allZones[i].innerHTML = '';
    }
    
    for (let i = 0; i < employees.length; i++) {
        let emp = employees[i];
        let card = createEmployeeCard(emp);
        
        if (emp.zone) {
            let allH3 = document.querySelectorAll('.zone h3');
            for (let j = 0; j < allH3.length; j++) {
                if (allH3[j].textContent === emp.zone) {
                    let zoneEmployees = allH3[j].parentElement.querySelector('.employees');
                    zoneEmployees.appendChild(card);
                    break;
                }
            }
        } else {
            unassignedList.appendChild(card);
        }
    }
}

export function addExperience() {
    let expList = document.getElementById('experiences-list');
    
    let expItem = document.createElement('div');
    expItem.className = 'experience-item';
    expItem.innerHTML = `
        <label>Company:</label>
        <input  type="text" placeholder="Company Name" class="exp-company">
        
        <label>Position:</label>
        <input  type="text" placeholder="Position Title" class="exp-position">
        
        <label>Start Year:</label>
        <input  type="text" placeholder="2020" class="exp-start">
        
        <label>End Year:</label>
        <input  type="text" placeholder="2023" class="exp-end">
        
        <button type="button" class="btn-remove-exp">Remove</button>
    `;
    
    expList.appendChild(expItem);
    
    
    
   
    
    let removeBtn = expItem.querySelector('.btn-remove-exp');
    removeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        expItem.remove();
    });
}
