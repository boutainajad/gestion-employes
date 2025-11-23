export function validateForm(){
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+]{8,15}$/;
    
    let errorMessage = '';
    
    if (!name || !email || !phone) {
        errorMessage = 'Tous les champs sont obligatoires';
    } else if (!nameRegex.test(name)) {
        errorMessage = 'Le nom doit contenir uniquement des lettres (2-50 caractères)';
    } else if (!emailRegex.test(email)) {
        errorMessage = "Format d'email invalide";
    } else if (!phoneRegex.test(phone)) {
        errorMessage = 'Le téléphone doit contenir 8-15 chiffres';
    }
    
    if (errorMessage) {
        showError(errorMessage);
        return false;
    }
    
    return true;
}

export function validateexper(){
    let expItems = document.querySelectorAll('.experience-item');
    
    const textRegex = /^[a-zA-ZÀ-ÿ0-9\s\-\.]{2,100}$/;
    const yearRegex = /^(19|20)\d{2}$/;
    
    let errorMessage = '';
    
    for (let i = 0; i < expItems.length; i++) {
        let item = expItems[i];
        let company = item.querySelector('.exp-company').value.trim();
        let position = item.querySelector('.exp-position').value.trim();
        let start = item.querySelector('.exp-start').value.trim();
        let end = item.querySelector('.exp-end').value.trim();

        if (!company || !position || !start || !end) {
            errorMessage = "Tous les champs d'expérience doivent être remplis";
            break;
        } else if (!textRegex.test(company)) {
            errorMessage = "Le nom de l'entreprise doit contenir 2-100 caractères valides";
            break;
        } else if (!textRegex.test(position)) {
            errorMessage = 'Le poste doit contenir 2-100 caractères valides';
            break;
        } else if (!yearRegex.test(start)) {
            errorMessage = "L'année de début doit être au format: 2020";
            break;
        } else if (!yearRegex.test(end)) {
            errorMessage = "L'année de fin doit être au format: 2023";
            break;
        } else if (parseInt(start) > parseInt(end)) {
            errorMessage = "L'année de début doit être avant l'année de fin";
            break;
        }
    }
    
    if (errorMessage) {
        showError(errorMessage);
        return false;
    }
    
    return true;
}

function showError(message) {
    let errorDiv = document.getElementById('error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.className = 'error-message';
        const modalAdd = document.getElementById('modal-add');
        const modalContent = modalAdd.querySelector('.modal-content');
        modalContent.insertBefore(
            errorDiv, 
            document.querySelector('#form-add-employee')
        );
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    

}