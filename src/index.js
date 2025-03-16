import axios from 'axios';
// Функція для отримання всіх студентів
const tbody = document.querySelector('#students-table-body');
const formUP = document.querySelector('#Up-student-form');

async function getStudents() {
  const { data } = await axios.get('http://localhost:3000/students');
  // твій код
  console.log(data);
  renderStudents(data);
}
getStudents();

// Функція для відображення студентів у таблиці

function renderStudents(students) {
  const markup =
    students &&
    students
      .map(students => {
        return `
        <tr>
        <td>${students.id}</td>
        <td>${students.name}</td>
        <td>${students.age}</td>
        <td>${students.course}</td>
        <td>${students.skills}</td>
        <td>${students.email}</td>
        <td>${students.isEnrolled}</td>
        <td>
        <button class="del" id="${students.id}">del</button>
        <button class="up" id="${students.id}">UP</button>
        </td>
       </tr>
       `;
      })
      .join(' ');
  tbody.insertAdjacentHTML('beforeend', markup);

  // твій код
}

// Функція для додавання нового студента

function addStudent(e) {
  // твій код
}

// Функція для оновлення студента

async function updateStudent(id) {
  formUP.style.display = 'block';

  formUP.addEventListener('submit', async e => {
    e.preventDefault();
    name = formUP.elements.name.value;
    age = formUP.elements.age.value;
    course = formUP.elements.course.value;
    skills = formUP.elements.skills.value;
    email = formUP.elements.email.value;

    console.log(age, course, skills, email);
    console.log(formUP.elements);
    const UP = await axios.patch(`http://localhost:3000/students/${id}`, {
      name,
      age,
      course,
      skills,
      email,
    });

    tbody.innerHTML = '';
    await getStudents();
    formUP.style.display = 'none';
    formUP.reset();
  });
}

// твій код

// Функція для видалення студента
tbody.addEventListener('click', e => {
  if (e.target.classList.contains('del')) {
    deleteStudent(e.target.id);
  }
  if (e.target.classList.contains('up')) {
    updateStudent(e.target.id);
  }
});
async function deleteStudent(id) {
  await axios.delete(`http://localhost:3000/students/${id}`);
  tbody.innerHTML = '';
  await getStudents();
}
// твій код
