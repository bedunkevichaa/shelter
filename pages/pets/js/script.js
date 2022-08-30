window.addEventListener('DOMContentLoaded', () => {
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
      
      
});

// hamburger.addEventListener('click', e => {
    //     e.stopPropagation();
        
    //     toggleMenu();
    // });
    
    // document.addEventListener('click', e => {
    //     let target = e.target;
    //     let its_menu = target == navigation || navigation.contains(target);
    //     let its_hamburger = target == hamburger;
    //     let menu_is_active = navigation.classList.contains('navigation_active');
    
    //     if (!its_menu && !its_hamburger && menu_is_active) {
    //         toggleMenu();
    //     }
    // })

// let hamburger = document.querySelector('.hamburger');
// let menu = document.querySelector('.menu');

