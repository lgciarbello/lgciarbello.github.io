let id = 0;

window.onload = () => {
    updateTable();
}

function addContact(){
    let contact = {};

    if(localStorage.getItem('id') == null)
        localStorage.setItem('id',JSON.stringify('0'));
    else
        id = localStorage.getItem('id');

    contact.id = id++;
    localStorage.setItem('id', JSON.stringify(id));

    contact.name = document.getElementById('input-name').value;
    contact.number = document.getElementById('input-phone').value;

    if(contact.name != '' && contact.number != '') {
        localStorage.setItem(contact.id, JSON.stringify(contact));
        updateTable();
    }
}

function updateTable(){
    let tableBody = document.getElementById('table-data');
    let allContacts = createObjList();
    let data = '';
    console.log(allContacts);

    allContacts.sort(function(a, b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    })

    for(let contact of allContacts){
        data += `<tr><td>${contact.name}</td>
        <td>${contact.number}</td>
        <td>remover intruso</td></tr>`;
    }

    console.log(data);
    tableBody.innerHTML = data;
}

function createObjList(){
    let allKeys = Object.keys(localStorage);
    let nKeys = allKeys.length;
    let objList = [];

    for(let i = 0, j = 0; i < nKeys; i++) {
        if(localStorage.getItem('id') != localStorage.getItem(allKeys[i])){
            objList[j] = JSON.parse(localStorage.getItem(allKeys[i]));
            j++;
        }
    }

    objList.sort(function(a, b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    })

    return objList;
}

function searchContact(){
    let allContacts = createObjList();

    var input, filter, tbody, tr, a, i;
    input = document.getElementById('search-box');
    filter = input.value.toUpperCase();
    tbody = document.getElementById("table-data");
    tr = tbody.getElementsByTagName('tr');
    
    for (i = 0; i < allContacts.length; i++) {
        currentName = allContacts[i].name;
        if (currentName.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

