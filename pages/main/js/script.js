
import { petsData } from "../js/pets.js";

const arrPets = Array.from(petsData);
// 	for (let i = 0; i < 3; i++) {
// 		arrPets.forEach(element => console.log(element));
// 	}
console.log(arrPets.length);




  
    //Burger menu
    const navigation = document.querySelector('.navigation'),
          navigationItem = document.querySelectorAll('.navigation__item'),
          hamburger = document.querySelector('.hamburger'),
          logo = document.querySelector('.logo'),
          body = document.querySelector('body');
          
    // open-close menu function      
    const toggleMenu = function() {
        body.classList.toggle('overflow-hidden');
        navigation.classList.toggle('navigation_active');
        logo.classList.toggle('logo_active');
        hamburger.classList.toggle('hamburger_active');
    }   

    // click to hamburger icon
    hamburger.addEventListener('click', () => {
        toggleMenu();
    });

    // click to menu items
    navigationItem.forEach(item => {
        item.addEventListener('click', () => {
            toggleMenu();
        });
    });
    
    // close menu if pressed Esc key
    document.addEventListener('keydown', function(e) {
        if( e.keyCode == 27 && navigation.classList.contains('navigation_active')){ // код клавиши Escape, но можно использовать e.key
            //navigation.style.display = 'none';
            toggleMenu();
        }
    });

    // close menu if click was out of menu & hamburger
    document.addEventListener( 'click', (e) => {
        const withinBoundariesNav = e.composedPath().includes(navigation),
              withinBoundariesHamburger = e.composedPath().includes(hamburger);
     
        if ( ! withinBoundariesNav && ! withinBoundariesHamburger && navigation.classList.contains('navigation_active') ) {
            toggleMenu(); 
        }
    });
    
    // Cards

    class MenuCard {
		constructor(name, img, btn, type, breed, description, age, inoculations, diseases, parasites, parentSelector) {
			this.name = name; 
			this.img = img;
			this.btn = btn;
			this.type = type;
			this.breed = breed;
			this.description = description; 
			this.age = age;
			this.inoculations = [inoculations];
			this.diseases = [diseases];
			this.parasites = [parasites];
			this.parent = document.querySelector(parentSelector);
		}

		render() {
			const element = document.createElement('div');
			element.innerHTML = `
				<div class="card pets__slider">
					<img src=${this.img} alt=${this.name}>
					<div class="pets__slider_label">${this.name}</div>
					<button data-model class="btn btn_learn">Learn more</button>
				</div>
			`;
			//this.parent.append(element)
		}
    }

	// petsData.forEach(({img, name}) => {
	// 	new MenuCard(img, name, ".card").render();
	// });
	

    //Slider
    const BTN_LEFT = document.querySelector("#btn-left");
    const BTN_RIGHT = document.querySelector("#btn-right");
    const CAROUSEL = document.querySelector("#carousel");
    const ITEM_LEFT = document.querySelector("#item-left");
    const ITEM_RIGHT = document.querySelector("#item-right");
    
    const createCardTemplate = () => {
		const card = document.createElement("div");
		card.classList.add("card");
		return card;
    }
    
    const moveLeft = () => {
		CAROUSEL.classList.add("transition-left");
		BTN_LEFT.removeEventListener("click", moveLeft);
		BTN_RIGHT.removeEventListener("click", moveRight);
    };
    
    const moveRight = () => {
		CAROUSEL.classList.add("transition-right");
		BTN_LEFT.removeEventListener("click", moveLeft);
		BTN_RIGHT.removeEventListener("click", moveRight);
    };
    
    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
    
    CAROUSEL.addEventListener("animationend", (animationEvent) => {
		let changedItem;
		if (animationEvent.animationName === "move-left") {
			CAROUSEL.classList.remove("transition-left");
			changedItem = ITEM_LEFT;
			document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;
		} else {
			CAROUSEL.classList.remove("transition-right");
			changedItem = ITEM_RIGHT;
			document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
		}
		
		changedItem.innerHTML = "";
		for (let i = 0; i < 3; i++) {
			//card = createCardTemplate();
			let rnd = Math.floor(Math.random() * 8);

			const element = document.createElement('div');
			//element.classList.add("card");
			
			element.innerHTML = `
				<div class="card pets__slider ${arrPets[rnd].name}">
					<img src=${arrPets[rnd].img} alt=${arrPets[rnd].name}>
					<div class="pets__slider_label">${arrPets[rnd].name}</div>
					<button data-modal class="btn btn_learn ${arrPets[rnd].name}">Learn more</button>
				</div>
			`;
			//card.innerText = Math.floor(Math.random() * 8);
			changedItem.appendChild(element);

			let arr = [];
			arr = arr + arrPets[rnd].name;

			console.log(arr);
		}
		
		
		
		BTN_LEFT.addEventListener("click", moveLeft);
		BTN_RIGHT.addEventListener("click", moveRight);

		
		const modalTrigger = document.querySelectorAll('.card');
          
		modalTrigger.forEach(btn => {
			btn.addEventListener('click', openModal);
		});


		function openModal() {

			const modal = document.querySelector('.modal');
			const elementModal = document.createElement('div');
			const card = document.querySelector('.card');

			console.log(card);

			elementModal.classList.add("modal__wrap");
			elementModal.id = "modal__wrap";
			
			elementModal.innerHTML = "";
			for (let i=0; i<arrPets.length; i++) {

				if (card.classList.contains(`${arrPets[i].name}`)) {
				
					elementModal.innerHTML = `
						<div class="modal__img"><img src=${arrPets[i].img} alt=${arrPets[i].name}></div>
						<div class="modal__info">
							<div class="modal__name">${arrPets[i].name}</div>
							<div class="modal__type">${arrPets[i].type} - ${arrPets[i].breed}</div>
							<div class="modal__descr">${arrPets[i].description}</div>
							<ul class="modal__list">
								<li class="modal__list__item"><span>Age:</span> ${arrPets[i].age}</li>
								<li class="modal__list__item"><span>Inoculations:</span> ${arrPets[i].inoculations}</li>
								<li class="modal__list__item"><span>Diseases:</span> ${arrPets[i].diseases}</li>
								<li class="modal__list__item"><span>Parasites:</span> ${arrPets[i].parasites}</li>
							</ul>
						</div>
					`;
					modal.appendChild(elementModal);
				}
			}

			modal.classList.add('show');
			modal.classList.remove('hide');
			overlay.classList.add('show');
			overlay.classList.remove('hide');
			document.body.style.overflow = 'hidden';
			
		}
	 	
		
    });

    //Modal

	const modalTrigger = document.querySelectorAll('.card'),
          modal = document.querySelector('.modal'),
		  overlay = document.querySelector('.overlay'),
		  modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {

		let el = document.getElementById('modal__wrap');
		el.remove();
        modal.classList.add('hide');
		overlay.classList.add('hide');
        modal.classList.remove('show');
		overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
		overlay.classList.add('show');
        overlay.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });



