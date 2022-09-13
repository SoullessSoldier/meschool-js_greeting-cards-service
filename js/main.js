
import './html2canvas.min.js';

const btnMen = document.querySelector('.header__button-gender_men'),
    btnWomen = document.querySelector('.header__button-gender_women'),
    body = document.body,
    cardText = document.querySelector('.card__text'),
    cardImage = document.querySelector('.card__image'),
    btnChangeText = document.querySelector('.header__button-change_text'),
    btnChangeImage = document.querySelector('.header__button-change_image'),
    cardLink = document.querySelector('.card__link');

let state = {
    gender: body.classList.contains('women') ? 'women' : 'men'
};

const showLoader = (parentElement, show = true) => {
    if (show){
        const section = document.createElement('section');
        section.id = 'loader-section';
        const loader = document.createElement('div');
        loader.classList.add('loader', 'loader-3');
        const dotArray = [];
        for (let i = 1; i <= 3; i++){
            const elem = document.createElement('div');
            elem.classList.add('dot', `dot${i}`);
            dotArray.push(elem);
        }
        loader.append(...dotArray);
        section.append(loader);
        parentElement.append(section);
    } else {
        const loaderSection = document.querySelector('#loader-section');
        loaderSection.remove();
    }
};

const createDownloadLink = async () => {
    cardLink.textContent = '';
    showLoader(cardLink, true);  
    const wrapper = document.querySelector('.card__wrapper');    
    await html2canvas(wrapper)
     .then(canvas => {
        const a = document.createElement('a');
	    a.download = "greeting.png";
        a.textContent = 'Сохранить открытку';
		const img=canvas.toDataURL("image/png");
        a.href = img;         
        setTimeout(() => {
            showLoader(cardLink, false);
            cardLink.append(a);
        }, 1500);
	});
    /* вариант с открытием рисунка в новом окне
    const newWindow = window.open(
        '',
        '',
        `width=840,height=520,top=${(screen.height / 2) - 520 / 2},left=${(screen.width / 2) - 840 / 2}`
    );
    html2canvas(wrapper).then(canvas => {
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';
        newWindow.document.body.append(canvas)

    });
    */
};


const getData = () => fetch('./db.json').then(response => response.json());

const getDataToCard = async () => {
    getData()
    .then(() => {
        changeContent('image');
        changeContent('text');                
    });        
};

const getRandomForArr = (arr) => {
    const arrLength = arr.length;
    return arr[Math.floor(Math.random() * arrLength)];
};

const changeContent = (typeContent) => {
    cardLink.textContent = '';
    getData()
    .then(result => {
        switch(typeContent){
            case 'text':
                state.text = getRandomForArr(result.text[state.gender]);
                cardText.style.color = state.photo.includes('black') ? '#FFFFFF' : '#000000';
                cardText.innerHTML = state.text.replaceAll('\n', '<br>');
                break;
            case 'image':
                state.photo = getRandomForArr(result.photo[state.gender]);
                cardText.style.color = state.photo.includes('black') ? '#FFFFFF' : '#000000';  
                cardImage.src = `./img/cards/${state.photo}`;
        }         
    });        
 };

const switchGender = (sex) => {
    cardLink.textContent = '';
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
    getDataToCard();    
};

btnMen.addEventListener('click', () => {
    switchGender('men');
    setTimeout(createDownloadLink, 1000);
});

btnWomen.addEventListener('click', () => {
    switchGender('women');
    setTimeout(createDownloadLink, 1000);
});

btnChangeText.addEventListener('click', () => {
    changeContent('text');
    setTimeout(createDownloadLink, 1000);
});

btnChangeImage.addEventListener('click', () => {
    changeContent('image');
    setTimeout(createDownloadLink, 1000);
});

getDataToCard();
setTimeout(createDownloadLink, 1000);