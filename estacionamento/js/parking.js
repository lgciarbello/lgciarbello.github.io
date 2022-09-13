// DATA STRUCTURES
//    (parkInfo)
//     vehicle: object vehicle;
//     parked: boolean;
//     entranceTime: number;
//     exitTime: number;

let parkHistory = [];

class Parking{
    #numVacancy;

    constructor(){
        this.#numVacancy = 20;
    }

    set numVacancy(numVacancy){
        this.#numVacancy = numVacancy;
    }

    get numVacancy(){
        return this.#numVacancy;
    }

    park(vehicle, entranceTime){
        let parkInfo = {};
        
        if(this.#numVacancy > 0){
            parkInfo.vehicle = vehicle;
            parkInfo.parked = true;
            parkInfo.entranceTime = entranceTime;

            console.log(parkHistory);
            
            if(parkHistory == null)
                parkHistory = [];

            console.log(parkHistory);

            parkHistory.push(parkInfo);

            this.#numVacancy -= 1;

            console.log(this.#numVacancy);
            return 1;
            
        }
        return 0;
    }

    releaseVehicle(vehicleId, exitTime){
        if(this.#numVacancy != 0){
                
            let index = parkHistory.findIndex(parkInfo => parkInfo.vehicle.id == vehicleId);
            console.log(index);

            parkHistory[index].parked = false;
            parkHistory[index].exitTime = exitTime;

            this.#numVacancy += 1;
            return 1;
        }
        return 0;
    }

    generateReport(){
        let data = '';

        if(parkHistory.length > 0){
            data = ` <thead><tr>
                        <th scope="col">Tipo do Veiculo</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Placa</th>
                        <th scope="col">Cor</th>
                        <th scope="col">Proprietário</th>
                        <th scope="col">Hora de Entrada</th>
                        <th scope="col">Hora de Saida</th>
                    </tr></thead>`;
            
            data += `<tbody>`
            for(let parkInfo of parkHistory){
                let entranceHour = Math.trunc(parkInfo.entranceTime/60);
                let entranceMin = Math.trunc(parkInfo.entranceTime%60);
                let exitHour = Math.trunc(parkInfo.exitTime/60);
                let exitMin = (parkInfo.exitTime%60);
                let type;

                if(parkInfo.vehicle.numDoors)
                    type = 'Carro';
                else
                    type = 'Moto';

                data += `<tr>                  
                            <td>${type}</td>
                            <td>${parkInfo.vehicle.brand}</td>
                            <td>${parkInfo.vehicle.licensePlate}</td>
                            <td>${parkInfo.vehicle.color}</td>
                            <td>${parkInfo.vehicle.owner}</td>
                            <td>${entranceHour}h${entranceMin}</td>
                            <td>${exitHour}h${exitMin}</td>
                        </tr>`
            }
            data += `</tbody>`

        }else
            data = `<p class="p-2">Não foram registrados veículos.</p>`;

        return data;
    }

    getBalance(){
        let balance = 0;

        for(let parkInfo of parkHistory){
            if(!parkInfo.parked){
                let entranceTime = parkInfo.entranceTime;
                let exitTime = parkInfo.exitTime;

                balance += parkInfo.vehicle.computePayedAmount(entranceTime, exitTime);
            }
        }
        return balance;
    }
}

class Vehicle{
    #id;
    #licensePlate;
    #brand;
    #color;
    #owner;

    constructor(id, licensePlate, brand, color, owner){
        this.#id = id;
        this.#licensePlate = licensePlate;
        this.#brand = brand;
        this.#color = color;
        this.#owner = owner;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get licensePlate(){
        return this.#licensePlate;
    }

    set licensePlate(licensePlate){
        this.#licensePlate = licensePlate;
    }

    get brand(){
        return this.#brand;
    }

    set brand(brand){
        this.#brand = brand;
    }

    get color(){
        return this.#color;
    }

    set color(color){
        this.#color = color;
    }

    get owner(){
        return this.#owner;
    }

    set owner(owner){
        this.#owner = owner;
    }
}

class Motorcycle extends Vehicle{
    constructor(id, licensePlate, brand, color, owner){
        super(id, licensePlate, brand, color, owner);
    }

    computePayedAmount(entranceTime, departureTime){
        duration = departureTime - entranceTime;

        if(duration > 30){
            if(duration <= 120){
                return duration/60 * 2;
            }else
                return 10;
        }else{
            return 0;
        }
    }
}

class Car extends Vehicle{
    #numDoors;

    constructor(id, licensePlate, brand, color, owner, numDoors){
        super(id, licensePlate, brand, color, owner);
        this.#numDoors = numDoors;
    }   

    get numDoors(){
        return this.#numDoors;
    }

    set numDoors(numDoors){
        this.#numDoors = numDoors;
    }

    computePayedAmount(entranceTime, exitTime){
        duration = exitTime - entranceTime;

        if(duration > 15){
            if(duration <= 120){
                return duration/60 * 4;
            }else
                return 20;
        }else{
            return 0;
        }
    }
}
