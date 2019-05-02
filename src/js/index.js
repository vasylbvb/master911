import jQuery from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import slick from 'slick-carousel';

jQuery(function($) {
    //Scrollspy for changing header
    window.onscroll = function() { listenToScroll() };
    const header = $('header.main-nav');
    const sticky = header.scrollTop() + 70;

    function listenToScroll() {
        if (window.pageYOffset > sticky) {
            header.addClass("scrolled");
        } else {
            header.removeClass("scrolled");
        }
    }

    //Header Location Dropdown
    var locationArr = $("#locModal .dropdown-item");
    $(locationArr).each(function() {
        $(this).text($(this).data("name"));
    });

    $(locationArr).click(function(e) {
        e.preventDefault();
        $(locationArr).removeClass("active");
        $(this).addClass("active");
        $("#dropdownLocBtn").find(".text").text($(this).text());
        $(".navbar-location__btn").find(".text").text($(this).text());
    });

    //Header Language Dropdown
    var languageArr = $(".navbar-lang .dropdown-item");

    $(languageArr).click(function(e) {
        e.preventDefault();
        $(languageArr).removeClass("active");
        $(this).addClass("active");
        $("#dropdownLang").find(".text").text($(this).text());
    });

    //Location input autocomplete functions start
    var rajCenters = ["Бахчисарай", "Білогірськ", "Джанкой", "Кіровське", "Красногвардійське", "Красноперекопськ", "Леніне", "Нижньогірський", "Первомайське", "Роздольне", "Саки", "Сімферополь", "Совєтський", "Чорноморське", "Бар", "Бершадь", "Вінниця", "Гайсин", "Жмеринка", "Іллінці", "Калинівка", "Козятин", "Крижопіль", "Липовець", "Літин", "Могилів-Подільський", "Муровані Курилівці", "Немирів", "Оратів", "Піщанка", "Погребище", "Теплик", "Тиврів", "Томашпіль", "Тростянець", "Тульчин", "Хмільник", "Чернівці", "Чечельник", "Шаргород", "Ямпіль", "Володимир-Волинський", "Горохів", "Іваничі", "Камінь-Каширський", "Ківерці", "Ковель", "Локачі", "Луцьк", "Любешів", "Любомль", "Маневичі", "Ратне", "Рожище", "Стара Вижівка", "Турійськ", "Шацьк", "Апостолове", "Васильківка", "Верхньодніпровськ", "Дніпро", "Кривий Ріг", "Кринички", "Магдалинівка", "Межова", "Нікополь", "Новомосковськ", "Павлоград", "Петриківка", "Петропавлівка", "Покровське", "П'ятихатки", "Синельникове", "Солоне", "Софіївка", "Томаківка", "Царичанка", "Широке", "Юр'ївка", "Амвросіївка", "Бахмут", "Велика Новосілка", "Волноваха", "Нікольське", "Добропілля", "Костянтинівка", "Покровськ", "Лиман", "Мар'їнка", "Новоазовськ", "Олександрівка", "Мангуш", "Слов'янськ", "Старобешеве", "Бойківське", "Шахтарськ", "Ясинувата", "Андрушівка", "Баранівка", "Бердичів", "Брусилів", "Хорошів", "Романів", "Ємільчине", "Житомир", "Коростень", "Коростишів", "Лугини", "Любар", "Малин", "Народичі", "Новоград-Волинський", "Овруч", "Олевськ", "Попільня", "Радомишль", "Ружин", "Пулини", "Черняхів", "Чуднів", "Берегове", "Великий Березний", "Виноградів", "Воловець", "Іршава", "Міжгір'я", "Мукачеве", "Перечин", "Рахів", "Свалява", "Тячів", "Ужгород", "Хуст", "Бердянськ", "Василівка", "Велика Білозерка", "Веселе", "Вільнянськ", "Гуляйполе", "Запоріжжя", "Кам'янка-Дніпровська", "Більмак", "Мелітополь", "Михайлівка", "Новомиколаївка", "Оріхів", "Пологи", "Приазовське", "Приморськ", "Розівка", "Токмак", "Чернігівка", "Якимівка", "Богородчани", "Верховина", "Галич", "Городенка", "Долина", "Калуш", "Коломия", "Косів", "Надвірна", "Рогатин", "Рожнятів", "Снятин", "Тисмениця", "Тлумач", "Баришівка", "Біла Церква", "Богуслав", "Бориспіль", "Бородянка", "Бровари", "Васильків", "Вишгород", "Володарка", "Згурівка", "Іванків", "Кагарлик", "Київ", "Макарів", "Миронівка", "Обухів", "Переяслав-Хмельницький", "Красятичі", "Рокитне", "Сквира", "Ставище", "Тараща", "Тетіїв", "Фастів", "Яготин", "Бобринець", "Вільшанка", "Гайворон", "Голованівськ", "Добровеличківка", "Долинська", "Знам'янка", "Кропивницький", "Компаніївка", "Мала Виска", "Новгородка", "Новоархангельськ", "Новомиргород", "Новоукраїнка", "Олександрівка", "Олександрія", "Онуфріївка", "Петрове", "Світловодськ", "Благовіщенське", "Устинівка", "Антрацит", "Біловодськ", "Білокуракине", "Сорокине", "Кремінна", "Лутугине", "Марківка", "Мілове", "Новоайдар", "Новопсков", "Перевальськ", "Попасна", "Сватове", "Довжанськ", "Слов'яносербськ", "Станиця Луганська", "Старобільськ", "Троїцьке", "Броди", "Буськ", "Городок", "Дрогобич", "Жидачів", "Жовква", "Золочів", "Кам'янка-Бузька", "Миколаїв", "Мостиська", "Перемишляни", "Пустомити", "Радехів", "Самбір", "Сколе", "Сокаль", "Старий Самбір", "Стрий", "Турка", "Яворів", "Арбузинка", "Баштанка", "Березанка", "Березнегувате", "Братське", "Веселинове", "Вознесенськ", "Врадіївка", "Доманівка", "Єланець", "Миколаїв", "Казанка", "Криве Озеро", "Миколаїв", "Новий Буг", "Нова Одеса", "Очаків", "Первомайськ", "Снігурівка", "Ананьїв", "Арциз", "Балта", "Березівка", "Білгород-Дністровський", "Біляївка", "Болград", "Велика Михайлівка", "Іванівка", "Ізмаїл", "Кілія", "Кодима", "Доброслав", "Подільськ", "Окни", "Любашівка", "Миколаївка", "Овідіополь", "Рені", "Роздільна", "Саврань", "Сарата", "Тарутине", "Татарбунари", "Захарівка", "Ширяєве", "Велика Багачка", "Гадяч", "Глобине", "Гребінка", "Диканька", "Зіньків", "Карлівка", "Кобеляки", "Козельщина", "Котельва", "Кременчук", "Лохвиця", "Лубни", "Машівка", "Миргород", "Нові Санжари", "Оржиця", "Пирятин", "Полтава", "Решетилівка", "Семенівка", "Хорол", "Чорнухи", "Чутове", "Шишаки", "Березне", "Володимирець", "Гоща", "Демидівка", "Дубно", "Дубровиця", "Зарічне", "Здолбунів", "Корець", "Костопіль", "Млинів", "Острог", "Радивилів", "Рівне", "Рокитне", "Сарни", "Білопілля", "Буринь", "Велика Писарівка", "Глухів", "Конотоп", "Краснопілля", "Кролевець", "Лебедин", "Липова Долина", "Недригайлів", "Охтирка", "Путивль", "Ромни", "Середина-Буда", "Суми", "Тростянець", "Шостка", "Ямпіль", "Бережани", "Борщів", "Бучач", "Гусятин", "Заліщики", "Збараж", "Зборів", "Козова", "Кременець", "Ланівці", "Монастириська", "Підволочиськ", "Підгайці", "Теребовля", "Тернопіль", "Чортків", "Шумськ", "Балаклія", "Барвінкове", "Близнюки", "Богодухів", "Борова", "Валки", "Великий Бурлук", "Вовчанськ", "Дворічна", "Дергачі", "Зачепилівка", "Зміїв", "Золочів", "Ізюм", "Кегичівка", "Коломак", "Красноград", "Краснокутськ", "Куп'янськ", "Лозова", "Нова Водолага", "Первомайський", "Печеніги", "Сахновщина", "Харків", "Чугуїв", "Шевченкове", "Берислав", "Білозерка", "Велика Лепетиха", "Велика Олександрівка", "Верхній Рогачик", "Високопілля", "Генічеськ", "Гола Пристань", "Горностаївка", "Іванівка", "Каланчак", "Каховка", "Нижні Сірогози", "Нововоронцовка", "Новотроїцьке", "Скадовськ", "Олешки", "Чаплинка", "Білогір'я", "Віньківці", "Волочиськ", "Городок", "Деражня", "Дунаївці", "Ізяслав", "Кам'янець-Подільський", "Красилів", "Летичів", "Нова Ушиця", "Полонне", "Славута", "Старокостянтинів", "Стара Синява", "Теофіполь", "Хмельницький", "Чемерівці", "Шепетівка", "Ярмолинці", "Городище", "Драбів", "Жашків", "Звенигородка", "Золотоноша", "Кам'янка", "Канів", "Катеринопіль", "Корсунь-Шевченківський", "Лисянка", "Маньківка", "Монастирище", "Сміла", "Тальне", "Умань", "Христинівка", "Черкаси", "Чигирин", "Чорнобай", "Шпола", "Вижниця", "Герца", "Глибока", "Заставна", "Кельменці", "Кіцмань", "Новоселиця", "Путила", "Сокиряни", "Сторожинець", "Хотин", "Бахмач", "Бобровиця", "Борзна", "Варва", "Городня", "Ічня", "Козелець", "Короп", "Корюківка", "Куликівка", "Мена", "Ніжин", "Новгород-Сіверський", "Носівка", "Прилуки", "Ріпки", "Семенівка", "Сосниця", "Срібне", "Талалаївка", "Чернігів", "Сновськ"];
    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
         the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                         (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                 increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                 decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });
        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
             except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    autocomplete(document.getElementById("s-loc"), rajCenters);

    var myInp = $("#s-loc");
    $(myInp).on("input", function(e) {
        if($(this).val() != 0) {
            $(this).siblings(".clear-input").show();
            $(this).siblings("[type='submit']").show();
        } else {
            $(this).siblings(".clear-input").hide();
            $(this).siblings("[type='submit']").hide();
        }
    });

    var clearBtn = $(".region-search").find(".clear-input");
    $(clearBtn).click(function(e) {
        e.preventDefault();
        $(this).parents("form")[0].reset();
        $(this).hide();
        $(this).siblings("[type='submit']").hide();
    });
    //Location input autocomplete functions end

    //toggle region lists
    var listHasChild = $("li.has-children");
    $(listHasChild).find(".text").click(function() {
        $(this).parents(".has-children").toggleClass("opened");
    });


    /*Sliders start*/
    var orderEther = $("#orderEther"),
        counterEther = $(".order-slider__nav-counter");
    $(orderEther).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $(counterEther).html('<span class="m-text-red">' + i + '</span>/' + slick.slideCount);
    });

    $(orderEther).slick({

        infinite: false,
        slidesToShow: 2.5,
        autoplay: false,
        arrows: true,
        prevArrow: '.order-slider__nav-prev',
        nextArrow: '.order-slider__nav-next',

        responsive: [{

            breakpoint: 992,
            settings: {
                slidesToShow: 1.5
            }

        }, {

            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }

        }, {

            breakpoint: 300,
            settings: "unslick" // destroys slick

        }]
    });
    /*Sliders end*/

    //footer menus toggle
    var $width = $(window).width();

    if ($width < 992) {
        var footerTitles = $(".footer-menu__title");
        $(footerTitles).click(function(e) {
           e.preventDefault();
            $(this).parent(".footer-menu").toggleClass("opened");
        });

        /*Service steps mobile expanding*/
        var serviseSteps = $(".block-order-steps__step");
        $(serviseSteps).click(function(e) {
            e.preventDefault();
            $(serviseSteps).removeClass("opened");
            $(this).addClass("opened");
        });

        /*Advantages steps mobile expanding*/
        var advItems = $(".block-advantages__list-item");
        $(advItems).click(function(e) {
            e.preventDefault();
            $(advItems).removeClass("opened");
            $(this).addClass("opened");
        });
    }

    $(window).resize(function(){
        var $width = $(window).width();
        if ($width < 992) {
            var footerTitles = $(".footer-menu__title");
            var footerMenus = $(".footer-menu");
            $(footerMenus).removeClass("opened");
            $(footerTitles).click(function(e) {
                e.preventDefault();
                $(this).parent(".footer-menu").toggleClass("opened");
            });
        }
    });
});