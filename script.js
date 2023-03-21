document.addEventListener('DOMContentLoaded', function() {
  // Get the input field, button, and list
  const input = document.getElementById('item');
  const addButton = document.getElementById('add-button');
  const list = document.getElementById('list');

  // Create an empty array to store the tasks
  let tasks = [];

  // Add event listener for Add button
  addButton.addEventListener('click', function(e) {
    e.preventDefault();

    // Get the input value and trim whitespace
    const inputValue = input.value.trim();

    // If input is not empty, add task to array and update UI
    if (inputValue !== '') {
      tasks.push(inputValue);
      input.value = '';
      updateUI();
    }
  });

  // Update UI to display tasks
  function updateUI() {
    // Clear existing list
    list.innerHTML = '';

    // Create a new list item for each task
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];

      // Create new list item and text node
      const listItem = document.createElement('li');
      const textNode = document.createElement('span');
      textNode.textContent = task;

      // Create edit button and add event listener
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function() {
        editTask(i, listItem, textNode);
      });

      // Create delete button and add event listener
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        deleteTask(i);
      });


      // Append text node and buttons to list item
      listItem.appendChild(textNode);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      // Append list item to list
      list.appendChild(listItem);
    }
  }

  // Delete task from array and update UI
  function deleteTask(index) {
    tasks.splice(index, 1);
    updateUI();
  }

  // Edit task in array and update UI
  function editTask(index, listItem, textNode) {
    // Replace text node with input field
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = textNode.textContent;
    listItem.replaceChild(inputField, textNode);

    // Replace edit button with save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    listItem.replaceChild(saveButton, listItem.childNodes[1]);

    // Update task in array and text node in UI on Save button click
    saveButton.addEventListener('click', function() {
      const newTask = inputField.value.trim();

      // If input is not empty, update task in array and text node in UI
      if (newTask !== '') {
        tasks[index] = newTask;
        listItem.replaceChild(textNode, inputField);
        saveButton.textContent = 'Edit';
        updateUI();
      }
    });
  }


  // Function to update the time
function updateTime() {
	// Create a new Date object
	var currentDate = new Date();

	// Get the day of the week (0-6)
	var dayOfWeek = currentDate.getDay();

	// Define an array of days of the week
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	// Get the name of the day of the week
	var dayName = days[dayOfWeek];

	// Get the current time
	var currentTime = currentDate.toLocaleTimeString();

	// Add the day and time to an HTML element
	document.getElementById('date').innerHTML = dayName + ' ' + currentTime;
}

// Call the updateTime function every second
setInterval(updateTime, 1000);

  // Call updateUI() on page load
  updateUI();
});