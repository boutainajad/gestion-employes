export let employees = [];

export function setEmployees(newEmployees) {
    employees = newEmployees;
}

export function addEmployee(employee) {
    employees.push(employee);
}

export function removeEmployee(id) {
    employees = employees.filter(e => e.id !== id);
}

