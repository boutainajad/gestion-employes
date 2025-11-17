import { addEmployee } from './store.js';
import {validateForm, validateexper} from './validation.js';
import { renderEmployees, addExperience } from './ui.js';

let currentZone = null;

document.addEventListener('DOMContentLoaded', function () {

    let modal = document.getElementById('modal-add');
    let btnAdd = document.querySelector('.btn-add');
    let closeBtn = document.querySelector('.close');
    let btnCancel = document.querySelector('.btn-cancel');
    let form = document.getElementById('form-add-employee');
    let photoInput = form.querySelector('input[name="photo"]');
    let photoCircle = document.querySelector('.photo-circle');

    btnAdd.addEventListener('click', function () {
        currentZone = null;
        modal.style.display = 'block';
        form.reset();
        photoCircle.innerHTML = '';
        document.getElementById('experiences-list').innerHTML = '';
    });

    let addBtns = document.querySelectorAll('.add-btn');
    for (let i = 0; i < addBtns.length; i++) {
        addBtns[i].addEventListener('click', function (e) {
            let zone = e.target.closest('.zone');
            currentZone = zone.querySelector('h3').textContent;
            modal.style.display = 'block';
            form.reset();
            photoCircle.innerHTML = '';
            document.getElementById('experiences-list').innerHTML = '';
        });
    }

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

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

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const role = document.getElementById("role").value.trim();
        const photo = document.getElementById("url").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        let experiences = [];
        let expItems = document.querySelectorAll('.experience-item');

        if (expItems.length > 0) {
        if (!validateexper()) {
            alert('Veuillez remplir tous les champs des expériences ajoutées ou les supprimer.');
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
            zone: currentZone
        };
      
        addEmployee(employee);
        if (!validateForm()){
            alert('Veuillez remplir tous les champs obligatoires.');

            return;
        }
       
        renderEmployees();
        modal.style.display = 'none';
        form.reset();
        photoCircle.innerHTML = '';
        
    });
   

    renderEmployees();
});