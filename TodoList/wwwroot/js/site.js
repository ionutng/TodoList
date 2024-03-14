const uri = 'api/todoitems';
let todoItems = [];

function getItems() {
    fetch(uri)
        .then(res => res.json())
        .then(data => displayItems(data))
        .catch(err => console.error('Unable to get the items.', err));
}

function displayItems(data) {
    const tBodyTodoItems = document.querySelector('#todoItems');
    tBodyTodoItems.innerHTML = '';

    displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;
        isCompleteCheckbox.classList.add('form-check-input');

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onClick', `displayEditForm(${item.id})`);
        editButton.classList.add('btn', 'btn-warning');

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onClick', `deleteItem(${item.id})`);
        deleteButton.classList.add('btn', 'btn-danger');

        let tr = tBodyTodoItems.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(item.name);
        td1.classList.add('align-middle');
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        td2.classList.add('align-middle');
        td2.appendChild(isCompleteCheckbox);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    todoItems = data;
}

function addItem() {
    const addNameTb = document.querySelector('#addName');

    const item = {
        name: addNameTb.value.trim(),
        isComplete: false
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(res => res.json())
        .then(() => {
            getItems();
            addNameTb.value = '';
        })
        .catch(err => console.err('Unable to add the item.', err));
}

function updateItem() {
    const itemId = document.querySelector('#editId').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.querySelector('#editName').value.trim(),
        isComplete: document.querySelector('#editIsComplete').checked
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(res => res.json(0))
        .error(err => console.error('Unable to update the item.', err));

    closeInput();
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(err => console.err('Unable to delete the item.', err));
}

function displayCount(itemCount) {
    const name = itemCount === 1 ? 'Todo Item' : 'Todo Items';

    document.querySelector('#counter').innerText = `${itemCount} ${name}`;
}

function displayEditForm(id) {
    const item = todoItems.find(item => item.id === id);

    document.querySelector('#editId').value = item.id;
    document.querySelector('#editName').value = item.name;
    document.querySelector('#editIsComplete').checked = item.isComplete;
    document.querySelector('#editForm').style.display = 'block';
}

function closeInput() {
    document.querySelector('#editForm').style.display = 'none';
}