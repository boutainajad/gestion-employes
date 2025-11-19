
export function validateForm(){
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const phoneRegex = /^[\d\s\-\+]{8,15}$/;
    
    if (!name || !email || !phone) {
        return false;
    }
    
    if (!nameRegex.test(name)) {
        alert('Le nom doit contenir uniquement des lettres (2-50 caractères)');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        alert('Format d email invalide');
        return false;
    }
    
    if (!phoneRegex.test(phone)) {
        alert('Le téléphone doit contenir 8-15 chiffres');
        return false;
    }
    
    return true;
}

export function validateexper(){
    let expItems = document.querySelectorAll('.experience-item');
    
    const textRegex = /^[a-zA-ZÀ-ÿ0-9\s\-\.]{2,100}$/;
    
    const yearRegex = /^(19|20)\d{2}$/;
    
    for (let i = 0; i < expItems.length; i++) {
        let item = expItems[i];
        let company = item.querySelector('.exp-company').value.trim();
        let position = item.querySelector('.exp-position').value.trim();
        let start = item.querySelector('.exp-start').value.trim();
        let end = item.querySelector('.exp-end').value.trim();

        if (!company || !position || !start || !end) {
            alert('Tous les champs d expérience doivent être remplis');
            return false;
        }
        
        if (!textRegex.test(company)) {
            alert('Le nom de l entreprise doit contenir 2-100 caractères valides');
            return false;
        }
        
        if (!textRegex.test(position)) {
            alert('Le poste doit contenir 2-100 caractères valides');
            return false;
        }
        
        if (!yearRegex.test(start)) {
            alert('L année de début doit être au format: 2020');
            return false;
        }
        
        if (!yearRegex.test(end)) {
            alert('L année de fin doit être au format: 2023');
            return false;
        }
        
        if (parseInt(start) > parseInt(end)) {
            alert('L année de début doit être avant l année de fin');
            return false;
        }
    }
    
    return true;
}