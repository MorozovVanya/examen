const domain = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru';
const key = 'ef0418a8-1e05-4a47-915c-2cec9d083720';

function pluralize(n, content) {
    let result = content[2];
    n = Math.abs(n) % 100;
    let nt = n % 10;
    if (n >= 10 && n <= 20) result = content[2];
    else if (nt > 1 && nt < 5) result = content[0];
    else if (nt == 1) result = content[1];

    return `${n} ${result}`;
}

function createAlert(text, type) {
    const cnt = document.getElementById('alerts').appendChild(
        document.createElement('div')
    );
    const raw = `
        <div class="alert alert-${type} alert-dismissible" role="alert" >
            <div>${text}</div>
            <button class="btn-close" data-bs-dismiss="alert"></button>
        </div>`;
    cnt.insertAdjacentHTML("beforeend", raw);
}

function showModal(guideData, routeData, modal) {
    const orderCnt = document.getElementById('order-body');
    const orderBtn = document.getElementById('order-send');

    orderCnt.innerHTML = '';

    let form = new FormData();
    form.set('guide_id', guideData.id);
    form.set('route_id', routeData.id);
    form.set('date', NaN);
    form.set('duration', 1);
    form.set('persons', 1);
    form.set('price', NaN);
    form.set('optionFirst', 0);
    form.set('optionSecond', 0);
    const raw = `
        <div class="row">ФИО гида: ${guideData.name}</div>
        <div class="row">Название маршрута: ${routeData.name}</div>
        <div class="row">
            <div>Дата:<div>
            <input type="date" class="form-control" data-name="date">
        </div>
        <div class="row">
            <div>Время:<div>
            <input type="time"class="form-control" data-name="time">
        </div>
        <div class="row">
            <div>Длительность:<div>
            <select class="form-control" data-name="duration">
                <option value="1" selected>1 Час</option>
                <option value="2">2 Часа</option>
                <option value="3">3 Часа</option>
            </select>
        </div>
        <div class="row">
            <div>Число человек:<div>
            <input
                type="number"
                value="1"
                class="form-control"
                min="1"
                max="20"
                data-name="persons"
            >
        </div>
        <div class="row">
            <div>Дополнительные опции:<div>
            <div>
                <input
                    type="checkbox"
                    id="featureA"
                    class="form-check-input"
                    data-name="optionFirst"
                >
                <label for="featureA" class="form-check-label">
                    Использовать скидку для пенсионеров
                </label>
                <p class="form-text">Стоимость уменьшается на 25%</p>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="featureB"
                    class="form-check-input"
                    data-name="optionSecond"
                >
                <label for="featureB" class="form-check-label">
                    Легкие закуски и горячие напитки во время экскурсии
                </label>
                <p class="form-text">
                    Увеличивают стоимость на 1000 рублей за каждого посетителя
                </p>
            </div>
        </div>
        
        <div class="row">
            <div>Cтоимость: <span id="order-price">NaN<span><div>
        </div>
    `;
    orderCnt.insertAdjacentHTML("beforeend", raw);
    const orderPrice = document.getElementById('order-price');

    orderCnt.onchange = (e) => {
        switch (e.target.dataset['name']) {
            case 'date':
                form.set('date', e.target.value);
                break;
            case 'time':
                form.set('time', e.target.value);
                break;
            case 'duration':
                form.set('duration', e.target.value);
                break;
            case 'persons':
                form.set('persons', e.target.value);
                break;
            case 'optionFirst':
                form.set('optionFirst', (e.target.checked ? 1 : 0));
                break;
            case 'optionSecond':
                form.set('optionSecond', (e.target.checked ? 1 : 0));
                break;
            default:
                return;
        }

        const date = form.get('date');
        const day = new Date(date).getDay();

        const time = form.get('time') ?? '';
        const hour = parseInt(time.split(':')[0]);
        const isMorning = (hour >= 9 && hour <= 12);
        const isEvening = (hour >= 20 && hour <= 23);

        const persons = parseInt(form.get('persons'));

        let priceForN = 0;
        if (isNaN(persons))
            priceForN = NaN;
        if (persons >= 5)
            priceForN = 1000;
        else if (persons >= 10)
            priceForN = 1500;

        let duration = parseInt(form.get('duration'));

        let price = guideData.pricePerHour
            * duration
            * ((isNaN(day) || isNaN(hour)) ? NaN : 1)
            * ((day == 0 || day == 6) ? 1.5 : 1)
            + (isMorning ? 400 : 0)
            + (isEvening ? 1000 : 0)
            + priceForN;

        if (form.get('optionFirst') == 1) {
            price -= parseInt(price * 0.25);
        }
        if (form.get('optionSecond') == 1) {
            price += persons * 1000;
        }

        form.set('price', price);

        if (isNaN(form.get('price'))) {
            orderPrice.textContent = 'NaN';
        } else {
            orderPrice.textContent = `${price}р`;
        }

    };

    orderBtn.onclick = () => {
        if (isNaN(form.get('price'))) return;

        modal.toggle();
        addOrder(form);
    };
}

function displayGuideTable(data, routeData) { 
    document.getElementById('guidesSection').classList.remove('d-none');
    const cnt = document.getElementById('guide');
    cnt.innerHTML = '';
    cnt.scrollIntoView({ behavior: 'smooth' });

    for (let element of data) {
        const guideCnt = cnt.appendChild(
            document.createElement('tr')
        );

        const workExperience = pluralize(
            element.workExperience,
            ['года', 'год', 'лет']
        );

        let row = `
            <td class="p-2 border">
                <i class="bi bi-people-fill"></i>
            </td>
            <td class="p-2 border">${element.name}</td>
            <td class="p-2 border d-none d-sm-table-cell">
                ${element.language}
            </td>
            <td class="p-2 border d-none d-md-table-cell">${workExperience}</td>
            <td class="p-2 border">${element.pricePerHour}р/час</td>`;
        guideCnt.insertAdjacentHTML("beforeend", row);
        

        const routeChoiseCnt = guideCnt.appendChild(
            document.createElement('td')
        );
        routeChoiseCnt.className = 'p-2 border';

        const routeChoise = routeChoiseCnt.appendChild(
            document.createElement('button')
        );
        routeChoise.className = 'btn btn-light';
        routeChoise.textContent = 'Выбрать';
        routeChoise.onclick = () => {
            let modal = new bootstrap.Modal('#guideModal');
            modal.toggle();

            showModal(element, routeData, modal);
        };
    }
}

function displayRouteTable(data) {
    const cnt = document.getElementById('rout');
    cnt.innerHTML = '';
    let i = 0;
    for (let element of data) {
        const routeCnt = cnt.appendChild(
            document.createElement('tr')
        );
        let row = `
            <td class="p-3 border">${element.name}</td>
            <td class="p-3 d-none d-md-table-cell border">
                ${element.description}
            </td>
            <td class="p-3 d-none d-lg-table-cell border">
                ${element.mainObject}
            </td>`;
        routeCnt.insertAdjacentHTML("beforeend", row);

        const routeChoise = routeCnt.appendChild(
            document.createElement('button')
        );
        routeChoise.className = 'btn btn-light';
        routeChoise.textContent = 'Выбрать';
        routeChoise.onclick = () => {
            getGuidesData(element);
        };
        i++;
        
        // Если добавлено более 9 маршрутов, скрыть остальные
        if (i >= 10) {
            routeCnt.style.display = 'none';
        }
    }
}
// document.addEventListener('DOMContentLoaded', function () {
//     const mapContainer = document.getElementById('mapContainer');
//     const toggleMapButton = document.getElementById('toggleMap');

//     toggleMapButton.addEventListener('click', function () {
//         if (mapContainer.style.display === 'none') {
//             mapContainer.style.display = 'block';
//             toggleMapButton.innerText = 'Скрыть карту';
//         } else {
//             mapContainer.style.display = 'none';
//             toggleMapButton.innerText = 'Показать карту';
//         }
//     });
// });





function getGuidesData(routeData) {
    fetch(
        `${domain}/api/routes/${routeData.id}/guides?api_key=${key}`
    )
        .then((response) => { 
            if (!response.ok) { 
                throw new Error(`Ошибка ${response.status}`); 
            } 
            return response.json(); 
        }) 
        .then((data) => { 
            console.log(data);
            displayGuideTable(data, routeData);
        })
        .catch(e => console.log(e));
}

function addOrder(data) {
    fetch(
        `${domain}/api/orders?api_key=${key}`,
        { method: 'POST', body: data}
    )
        .then((response) => { 
            if (!response.ok) { 
                throw new Error(`Ошибка ${response.status}`); 
            } 
            return response.json();
        }) 
        .then((data) => {
            console.log(data);
            createAlert(
                'Заявка успешно создана',
                'success'
            );
        })
        .catch(e => {
            console.log(e);
            createAlert(
                'Во время заполнения заявки произошла ошибка. Попробуйте снова',
                'warning'
            );
        });
}

function getRouteData() { 
    fetch(
        `${domain}/api/routes?api_key=${key}`
    )
        .then((response) => { 
            if (!response.ok) { 
                throw new Error(`Ошибка ${response.status}`); 
            } 
            return response.json(); 
        }) 
        .then((data) => { 
            console.log(data); 
            displayRouteTable(data);
        })
        .catch(e => console.log(e));
}
// function setLanguage() {
//     let items = JSON.parse(sessionStorage.getItem('guides'));
//     let select = document.getElementById('languages');
//     select.innerHTML = '';
//     let uniqueLanguages = ['Основной объект', ...new Set(items.map(item => item.language))];
//     for (let language of uniqueLanguages) {
//         let option = document.createElement("option");
//         option.innerHTML = language;
//         option.setAttribute("value", language);
//         select.appendChild(option);
//     }
// }
// function setterObj() {
//     let items = JSON.parse(sessionStorage.getItem('routes'));
//     let select = document.getElementById('objects');
//     select.innerHTML = '';
//     let uniqueObjects = ['Основной объект', ...new Set(items.map(item => item.mainObject))];
//     for (let obj of uniqueObjects) {
//         let option = document.createElement("option");
//         option.innerHTML = obj;
//         option.setAttribute("value", obj);
//         select.appendChild(option);
//     }
// }

// function init() {
//     var myMap = new ymaps.Map("map",  {
//             center: [55.76, 37.64],
//             zoom: 10,
//             controls: ["routePanelControl"]
//         }, {
//             searchControlProvider: 'yandex#search'
//         }),
//             objectManager = new ymaps.ObjectManager({
//                 clusterize: true,
//                 gridSize: 32,
//                 clusterDisableClickZoom: true
//         });

//         myGeoObject = new ymaps.GeoObject({
//             geometry: {
//                 type: "Point",
//                 coordinates: [55.8, 37.8]
//             },
           
//         });
        
//         $.ajax('./js/coordinate.json').done(function (response) {
//             let geoData = [];
//             for(i = 7; i < response.length; i++){
//                 geoData.push(response[i].geoData.coordinates);
//             }
//             console.log(geoData)
//             myMap.geoObjects
//                 .add(myGeoObject)   
//                 .add(new ymaps.Placemark(geoData[1]));  
//                 console.log(geoData[1]);XMLDocument
//         });
//     }

// Вызов функции для получения данных о маршрутах
getRouteData();
