'use strict';

const btnMen = document.querySelector('.header__button-gender_men'),
    btnWomen = document.querySelector('.header__button-gender_women'),
    body = document.body;

let state = {
    gender: body.classList.contains('women') ? 'women' : 'men'
};

const switchGender = (sex) => {
    switch(sex){
        case 'men':
            if(state.gender !== sex){
                state.gender = sex;
                body.classList.add('men');
                body.classList.remove('women');
            }            
            break;
        case 'women':
            if(state.gender !== sex){
                state.gender = sex;
                body.classList.add('women');
                body.classList.remove('men');
            }
            break;
    }    
};

btnMen.addEventListener('click', () => {
    switchGender('men');
});

btnWomen.addEventListener('click', () => {
    switchGender('women');
});