let p;

window.onload = () => {
    p = new Parking();
}

function validatePark(){
    let vehicle;
    let historyLenght = parkHistory.length;

    console.log(parkHistory.length);

    let licensePlate = document.getElementById("licenseInput").value;
    let brand = document.getElementById("brandInput").value;
    let color = document.getElementById("colorInput").value;
    let owner = document.getElementById("ownerInput").value;

    if(document.getElementById("carRadio").checked){
        let doorsAmount = document.getElementById("doorsSelect").value;
        vehicle = new Car(historyLenght, licensePlate, brand, color, owner, doorsAmount);
    }else{
        vehicle = new Motorcycle(historyLenght, licensePlate, brand, color, owner);
    }

    p.park(vehicle, formatCurrTime());
}

function onClickRelease(){
    let select = document.getElementById("vehicleSelect");
    let data = '';

    console.log(parkHistory);

    for(let parkInfo of parkHistory){
        console.log(parkInfo);
        if(parkInfo.parked)
            data += `<option value="${parkInfo.vehicle.id}">${parkInfo.vehicle.licensePlate} (${parkInfo.vehicle.owner})</option>`;
    }

    console.log(data);

    select.innerHTML = data;
}

function validateRelease(){
    let vehicleId = document.getElementById('vehicleSelect').value;

    p.releaseVehicle(vehicleId, formatCurrTime());
}

function onClickReport(){
    let table = document.getElementById("reportTable");
    let data = p.generateReport();
    table.innerHTML = data;
}

function formatCurrTime(){
    let date = new Date();
    let time;

    time = date.getHours() * 60;
    time += date.getMinutes();
    console.log(time);

    return time;
}

function onClickBalance(){
    var modal = document.getElementById("balanceField");
    var data = `<h2 class="m-2">R$ ${p.getBalance()},00</h2>`;
    modal.innerHTML = data;
}

function addMotorcycleAttribute() {
    var modal = document.getElementById("parkModal");
    var option;
    if (document.getElementById("carRadio").checked) {
        option =`
            <label for="selectDoors" class="form-label">Quantidade de portas</label>
            <select name="doorsAmount" class="form-select" aria-label="Default select" id="selectDoors">>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
            </select>`;
    } else option= ``;
    modal.innerHTML = option;
}