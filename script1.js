let people = [];
let selectedItemIndex;
const nameInput = document.getElementById('name-input-area');
const lastNameInput = document.getElementById('last-name-input-area');
const ageInput = document.getElementById('age-input-area');
const countryInput = document.getElementById('country-input-area');
const cityInput = document.getElementById('city-input-area');
const checkboxInput = document.getElementById('checkbox-input-area');
const selectionText = document.getElementById('all-selected');
const deleteSelectedsButton = document.getElementById(
  'delete-selecteds-button'
);
const person1 = {
  name: 'Apo',
  surname: 'Başal',
  age: 25,
  selected: false,
  country: 'Turkey',
  city: 'Istanbul',
};

people.push(person1);
const person2 = {
  name: 'Fatih',
  surname: 'Kucuk',
  age: 25,
  selected: false,
  country: 'Turkey',
  city: 'Istanbul',
};

people.push(person2);
updateView();

function addButtonClicked() {
  const nameInputIsValid = validate(nameInput.id);
  const lastNameInputIsValid = validate(lastNameInput.id);
  const ageInputIsValid = validate(ageInput.id);
  const countryInputIsValid = validate(countryInput.id);
  const cityInputIsValid = validate(cityInput.id);

  // if (!nameInputIsValid || !lastNameInputIsValid || !ageInputIsValid) return;

  if (
    nameInputIsValid &&
    lastNameInputIsValid &&
    ageInputIsValid &&
    countryInputIsValid &&
    cityInputIsValid
  ) {
    const person = {
      name: nameInput.value,
      surname: lastNameInput.value,
      age: ageInput.value,
      country: countryInput.value,
      city: cityInput.value,
      selected: false,
    };

    people.push(person);

    updateView();
    clearForm();
  }
}

function clearForm() {
  nameInput.value = '';
  lastNameInput.value = '';
  ageInput.value = '';
  countryInput.value = '';
  cityInput.value = '';
}

function validate(elementId, color = 'red') {
  const element = document.getElementById(elementId);
  let isValid = true;

  if (element.value === '') {
    element.style.borderColor = color;
    isValid = false;
  } else {
    element.style.borderColor = 'initial';
  }
  return isValid;
}

function deleteButtonClicked(i) {
  selectedItemIndex = i;
  openPopup();
  document.getElementById('page').style.opacity = 0.1;
}

function openPopup() {
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('page').style.opacity = 1;
}

function confirm() {
  people.splice(selectedItemIndex, 1);
  updateView();
  document.getElementById('popup').style.display = 'none';
  document.getElementById('page').style.opacity = 1;
}

function updateView(tableItems = people) {
  let allRows = '';
  tableItems.forEach((person, i) => {
    allRows += `<tr>
      <td>
        <input id="checkbox-input-area" type="checkbox" ${
          person.selected ? 'checked' : ''
        } onchange="toggleCheckBox(event.target.checked, ${i})" />
      </td>
      <td>${i + 1}</td>
      <td>${person.name}</td>
      <td>${person.surname}</td>
      <td>${person.age}</td>
      <td>${person.country}</td>
      <td>${person.city}</td>
      <td>
        <button onClick="deleteButtonClicked(${i})">Delete</button>
      </td>
    <tr>
    `;
  });
  document.getElementById('table-body').innerHTML = allRows;

  const isAnyItemSelected = people.some((person) => person.selected);
  showDeleteButton(isAnyItemSelected);

  const isAllSelected = people.every((person) => person.selected);
  showAllSelectedText(isAllSelected);

  let selectedItems = people.filter((person) => person.selected === true);
  setSelectedItemText(selectedItems.length, people.length);
}

// DRY --> Don't repeat yourself
function toggleCheckBox(isSelected, i) {
  people[i].selected = isSelected;
  updateView();
}

function showDeleteButton(shouldShow) {
  if (shouldShow) deleteSelectedsButton.style.display = 'block';
  else deleteSelectedsButton.style.display = 'none';

  // shouldShow
  //   ? (deleteSelectedsButton.style.display = 'block')
  //   : (deleteSelectedsButton.style.display = 'none');
}
function showAllSelectedText(shouldShowText) {
  shouldShowText
    ? (selectionText.style.display = 'block')
    : (selectionText.style.display = 'none');
}

function deleteSelectedsButtonClicked() {
  people = people.filter((person) => {
    return person.selected === false;
  });

  updateView();
}

function setSelectedItemText(selectedItemCount, totalItemCount) {
  document.getElementById(
    'alan'
  ).innerHTML = `${selectedItemCount} / ${totalItemCount}`;
}

function filterTable(value, field, type = 'text') {
  let filteredItems = [];
  if (type === 'text') {
    filteredItems = people.filter((person) => {
      return person[field].toLowerCase().includes(value.toLowerCase());
    });
  } else if (type === 'number') {
    filteredItems = people.filter((person) => {
      return person[field] == value;
    });
  }

  updateView(filteredItems);
}

function selectAll(isSelected) {
  people.forEach((person) => {
    person.selected = isSelected;
  });
  updateView();

  // const elements = document.querySelectorAll('#checkbox-input-area');
  // elements.forEach((el) => {
  //   if (isSelected) el.setAttribute('checked', isSelected);
  //   else el.removeAttribute('checked');
  // });
}
