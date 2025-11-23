export let employees = [];

export const ZONE_RULES = {
  receptionist: ['Reception Room', 'Conference Room', 'Personnel Room'],
  it: ['Servers Room', 'Conference Room', 'Personnel Room'],
  security: ['Security Room', 'Conference Room', 'Personnel Room'],
  manager: ['Conference Room', 'Reception Room', 'Servers Room', 'Security Room', 'Personnel Room', 'Archives Room'],
  cleaning: ['Conference Room', 'Reception Room', 'Servers Room', 'Security Room', 'Personnel Room'],
  other: ['Conference Room', 'Personnel Room']
};

export function setEmployees(newEmployees) {
  employees = newEmployees;
}

export function getEmployee(id) {
  console.log(employees)
  return employees.find((emp) => emp.id === id);
}

export function addEmployee(employee) {
  employees.push(employee);
  saveData();
  location.reload();
}

export function removeEmployee(id) {
  employees = employees.filter(e => e.id !== id);
  saveData();
  location.reload();
}

export function saveData() {
  return localStorage.setItem('employees', JSON.stringify(employees));
}

export function loadData() {
  const data = localStorage.getItem('employees')
  if (data) {
    employees = JSON.parse(data);
  }
  else {
    employees = [];
  }
  return employees;
}

export function canAssign(role, room) {
  if (!ZONE_RULES.hasOwnProperty(role)) return false;
  const rooms = ZONE_RULES[role];
  return rooms.includes(room);
}

export function assignEmployee(id, room, employees) {
  const employee = employees.find(e => e.id === id);

  if (!employee) return false;
  if (!canAssign(employee.role, room)) return false;

  employee.zone = room;
  return true;
}

export function unassignEmployee(id, employees) {
  const employee = employees.find(e => e.id === id);
  if (!employee) return false;

  employee.zone = null;
  return true;
}

export function getEligible(room, employees) {
  return employees.filter(emp => {
    if (emp.zone) return false;
    return canAssign(emp.role, room);
  });
}

export function getEmployeesInZone(room, employees) {
  return employees.filter(e => e.zone === room);
}