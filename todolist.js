update();
document.getElementsByClassName('addtask')[0].addEventListener('focus', function () {
    this.style.color = "black";
    this.style.background = "lightblue";
});

document.getElementsByClassName('addtask')[0].addEventListener('blur', addtaskkk);
function addtaskkk() {
    this.style.color = "black";
    this.style.background = "white";
    let tt = document.getElementById('addtaskinput').value;
    document.getElementById('s').innerHTML = tt.toUpperCase();
    document.getElementById('s').style.color = "blue";

}

document.getElementsByClassName('addtask')[0].addEventListener('input', addtaskk);
function addtaskk() {
    let tt = document.getElementById('addtaskinput').value;
    document.getElementById('s').innerHTML = tt.toUpperCase();
}

// document.getElementById('addtaskinput').addEventListener('input', function () {
//     let addtaskinput = document.getElementById('addtaskinput');
//     let letter = /^[a-zA-Z]+$/;
//     if (!addtaskinput.value.match(letter)) {
//         document.getElementsByClassName('text')[0].innerHTML = "Sorry not Allowed Numeric Numbers";
//         return false;
//     }
// });

document.getElementById('addtaskbtn').addEventListener('click', insertData);
function insertData() {
    let addtaskinput = document.getElementById('addtaskinput').value;
    if (addtaskinput.trim() != 0) {
        if (localStorage.getItem('InsertData') == null && localStorage.getItem('InsertData') == undefined) {
            arry = [];
            arry.push(addtaskinput);
            localStorage.setItem('InsertData', JSON.stringify(arry))
        } else {
            arrystr = localStorage.getItem('InsertData');
            arry = JSON.parse(arrystr);
            arry.push(addtaskinput);
            localStorage.setItem('InsertData', JSON.stringify(arry))
        }
    }

    document.getElementById('addtaskinput').value = '';
}
update();

function update() {
    if (localStorage.getItem('InsertData') == null) {
        arry = [];
        localStorage.setItem('InsertData', JSON.stringify(arry))
    } else {
        arrystr = localStorage.getItem('InsertData');
        arry = JSON.parse(arrystr);
    }

    let tablebody = document.getElementById('root');

    let str = "";
    arry.forEach((element, index) => {
        str += `
        <tr>
            <td>${index + 1}</td>
            <td>${element}</td>               
            <td><button class="btn btn-sm btn-success" onclick="editdata(${index})">Edit</button>
            <button class="btn btn-sm btn-danger" href="javascript:void(0)" onclick="itemDeleted(${index})">Delete</button>
            </td>
        </tr>`;
    })
    tablebody.innerHTML = str;

    if (str == 0) {
        let tablebodyy = document.querySelector('tr');
        tablebodyy.style.textAlign = "center";
        tablebodyy.textContent = "Sorry!!! No Data Found";
        tablebodyy.style.fontWeight = "700";
        tablebodyy.style.color = "red";

    }

}

function editdata(index) {
    let saveindex = document.getElementById('saveindex');
    let addtaskbtn = document.getElementById('addtaskbtn');
    let savetaskbtn = document.getElementById('savetaskbutton');
    let ss = saveindex.value = index;
    let arrystr = localStorage.getItem('InsertData');
    let arry = JSON.parse(arrystr);
    let add = addtaskinput.value = arry[index];
    addtaskbtn.style.display = "none";
    savetaskbtn.style.display = "inline-block";
    document.getElementById('alldelete').style.marginLeft = "50px";
    localStorage.setItem('InsertData', JSON.stringify(arry));
}

function itemDeleted(index) {
    let checkvalue = confirm("Are you Sure");
    if (checkvalue != false) {
        arrystr = localStorage.getItem('InsertData');
        arry = JSON.parse(arrystr);
        arry.splice(index, 1);
        localStorage.setItem('InsertData', JSON.stringify(arry));
    }
    update();
}

let savetaskbtn = document.getElementById("savetaskbutton");
savetaskbtn.addEventListener("click", function () {
    let addtaskbtn = document.getElementById("addtaskbtn");
    let addtaskinput = document.getElementById('addtaskinput');
    let saveIndex = document.getElementById("saveindex").value;
    let arrystr = localStorage.getItem('InsertData');
    let arry = JSON.parse(arrystr);
    let l = arry[saveIndex] = addtaskinput.value;

    localStorage.setItem('InsertData', JSON.stringify(arry));
    savetaskbtn.style.display = "none";
    addtaskbtn.style.display = "inline-block";
    addtaskinput.value = '';
});
update();

document.getElementById('alldelete').addEventListener('click', alldelete);
function alldelete() {
    let check = confirm("Are You Sure")
    if (check != false) {
        localStorage.clear();
    }
}

const searchfunction = () => {
    let filter = document.getElementById('searchbar').value.toUpperCase();
    let table = document.getElementById('root');
    let tabletr = root.getElementsByTagName('tr');

    for (var i = 0; i < tabletr.length; i++) {
        let ttd = tabletr[i].getElementsByTagName('td')[1];
        if (ttd) {
            let textvalue = ttd.textContent || ttd.innerHTML;
            if (textvalue.toUpperCase().indexOf(filter) > -1) {
                tabletr[i].style.display = "";

            } else {
                tabletr[i].style.display = "none";
            }
        }

    }

}
update();
