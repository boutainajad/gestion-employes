
export function validateForm(){
    const form = document.getElementById('form-add-employee');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const url = document.getElementById('url').value.trim();
    
    let isValid = true;
    if (!name || !url|| !email || !phone ) {
        isValid = false;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        isValid = false;
    }
    
    if (phone.length < 8) {
        isValid = false;
    }
    
    return isValid;
    
    
}
export function validateexper(){
     let expItems = document.querySelectorAll('.experience-item');

        for (let i = 0; i < expItems.length; i++) {
            let item = expItems[i];
            let company = item.querySelector('.exp-company').value.trim();
            let position = item.querySelector('.exp-position').value.trim();
            let start = item.querySelector('.exp-start').value.trim();
            let end = item.querySelector('.exp-end').value.trim();

     let isValid = true;
    if ( !company|| !position || !start || !end) {
        isValid = false;
    }
        return isValid;
}

}