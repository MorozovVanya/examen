document.addEventListener('DOMContentLoaded', function () {
    // кнопка наверх
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // код для пагинации
    const routes = document.querySelectorAll('#rout tr');
    const itemsPerPage = 1;
    let currentPage = 1;

    showPage(currentPage);
    highlightPage(currentPage);

    function showPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        routes.forEach((route, index) => {
            if (index >= startIndex && index < endIndex) {
                route.style.display = 'table-row';
            } else {
                route.style.display = 'none';
            }
        });
    }

    function highlightPage(page) {
        const pageLinks = document.querySelectorAll('.pagination a.page-link');
        pageLinks.forEach(link => {
            link.classList.remove('active');
        });

        const currentPageLink = document.getElementById(`page${page}`);
        if (currentPageLink) {
            currentPageLink.classList.add('active');
        }
    }

    function handlePaginationClick(event) {
        event.preventDefault();

        const targetPage = parseInt(event.target.innerText);

        if (!isNaN(targetPage)) {
            currentPage = targetPage;
            showPage(currentPage);
            highlightPage(currentPage);
        } else if (event.target.getAttribute('aria-label') === 'Next') {
            currentPage++;
            showPage(currentPage);
            highlightPage(currentPage);
        } else if (event.target.getAttribute('aria-label') === 'Previous' && currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            highlightPage(currentPage);
        }
    }

    const paginationLinks = document.querySelectorAll('.pagination a.page-link');
    paginationLinks.forEach(link => {
        link.addEventListener('click', handlePaginationClick);
    });

    //next prev
    const nextPageLink = document.getElementById('nextPage');
    nextPageLink.addEventListener('click', handlePaginationClick);

    const prevPageLink = document.getElementById('prevPage');
    prevPageLink.addEventListener('click', handlePaginationClick);

    // код для карты
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    const page4 = document.getElementById('page4');
    const page5 = document.getElementById('page5');
    const page6 = document.getElementById('page6');
    const page7 = document.getElementById('page7');
    const mapContainer = document.getElementById('mapContainer');
    const mapIframe = document.getElementById('mapIframe');

    page1.addEventListener('click', function () {
        mapContainer.style.display = 'block';
        mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.261963245058!2d37.61887453608665!3d55.75395140479863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5a738fa419%3A0x7c347d506b52311f!2z0JrRgNCw0YHQvdCw0Y8g0J_Qu9C-0YnQsNC00Yw!5e0!3m2!1sru!2sru!4v1705098695996!5m2!1sru!2sru";
    });

    page2.addEventListener('click', function () {
        mapContainer.style.display = 'block';
        mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35924.15051657956!2d37.58025015377532!3d55.75399580785329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54b08f8fdcbc3%3A0x4375cd8bcd701ff0!2z0KbQtdC90YLRgNCw0LvRjNC90YvQuSDQv9Cw0YDQuiDQutGD0LvRjNGC0YPRgNGLINC4INC-0YLQtNGL0YXQsCDQuNC8LiDQnC7Qk9C-0YDRjNC60L7Qs28!5e0!3m2!1sru!2sru!4v1705098778825!5m2!1sru!2sru";
    });

    page3.addEventListener('click', function () {
        mapContainer.style.display = 'block';
        mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2240.5944998956716!2d37.61706649414032!3d55.834997316341784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414acbfa40bd4301%3A0xb0e9dd3e35a58046!2z0J_QsNCy0LjQu9GM0L7QvSDihJYzNCDQmtC-0YHQvNC-0YE!5e0!3m2!1sru!2sru!4v1705098846032!5m2!1sru!2sru";
    });

    page4.addEventListener('click', function () {
        mapContainer.style.display = 'block';
        mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18003.770305283375!2d37.6482662403221!3d55.66340433198213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414ab3708655957b%3A0xba3820b94be825e!2z0JzRg9C30LXQuS3Ql9Cw0L_QvtCy0LXQtNC90LjQuiDQmtC-0LvQvtC80LXQvdGB0LrQvtC1!5e0!3m2!1sru!2sru!4v1705098900894!5m2!1sru!2sru";
    });

    page5.addEventListener('click', function () {
        mapContainer.style.display = 'block';
        mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71860.28983434406!2d37.433371597265605!3d55.747487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54bb3fad60d3f%3A0x602662a00f59780a!2z0JzQtdC80L7RgNC40LDQu9GM0L3QsNGPINC60LLQsNGA0YLQuNGA0LAg0JAu0KEuINCf0YPRiNC60LjQvdCw!5e0!3m2!1sru!2sru!4v1705098935573!5m2!1sru!2sru";
    });

    page6.addEventListener('click', function () {
        mapContainer.style.display = 'block';
        mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.434307522817!2d37.612704594110575!3d55.75095732273733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1705098960837!5m2!1sru!2sru";
    });

    page7.addEventListener('click', function () {
        mapContainer.style.display = 'block';
        mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2253.443956354642!2d37.68357367707982!3d55.611690402851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414ab3cc65ff1f95%3A0x6261499f9a7afd91!2z0JzRg9C30LXQuS3Qt9Cw0L_QvtCy0LXQtNC90LjQuiDQptCw0YDQuNGG0YvQvdC-!5e0!3m2!1sru!2sru!4v1705098984243!5m2!1sru!2sru";
    });
});

                
                var guidesInfo = {
                    "Иванов Иван Иванович": "Опытный гид с богатым опытом в проведении экскурсий. Знает много интересных фактов о истории и культуре Москвы. Знание языков:Русский,Английский. Стаж работы: 3 года",
                    "Петрова Екатерина Петровна": "Энтузиастка и любительница искусства. Специализируется на экскурсиях по музеям и художественным галереям.Знание языков:Русский,Английский,Французский. Стаж работы: 10 лет",
                    "Александров Алексей Сергеевич": "Эксперт в истории архитектуры. Специализируется на экскурсиях по историческим зданиям и памятникам архитектуры.Знание языков:Русский,Французский. Стаж работы: 7 лет",
                    "Плоткина Мария Александровна": "Профессиональный гид с фокусом на природные достопримечательности и парки. Отлично разбирается в природе и окружающей средеЗнание языков:Русский. Стаж работы: 4 года."
                };
                
                function showGuideInfo() {
                    var guideSelect = document.getElementById("guideSelect");
                    var selectedGuide = guideSelect.options[guideSelect.selectedIndex].value;
                
                   
                    var guideInfoBlock = document.getElementById("guideInfo");
                    guideInfoBlock.innerHTML = "Информация о гиде: " + guidesInfo[selectedGuide];
                    
                }
<button1 onclick="scrollToTop()">Наверх</button1>
// ymaps.ready(init);

// function init() {
//     var myMap = new ymaps.Map("map",  {
//             center: [55.76, 37.64],
//             zoom: 10,
//             controls: ["routePanelControl"]
//         }, {
//             searchControlProvider: 'yandex#search'
//         }),
//             objectManager = new ymaps.ObjectManager({
//                 // Чтобы метки начали кластеризоваться, выставляем опцию.
//                 clusterize: true,
//                 // ObjectManager принимает те же опции, что и кластеризатор.
//                 gridSize: 32,
//                 clusterDisableClickZoom: true
//         });

//         myGeoObject = new ymaps.GeoObject({
//             // Описание геометрии.
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