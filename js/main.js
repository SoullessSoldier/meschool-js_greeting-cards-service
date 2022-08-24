
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

const createDownloadLink = async () => {
    cardLink.textContent = '';
    const wrapper = document.querySelector('.card__wrapper')    
    await html2canvas(wrapper)
     .then(canvas => {        
        const a = document.createElement('a');		 
		cardLink.append(a); 
	    a.download = "greeting.png";
        a.textContent = 'Сохранить открытку';
		const img=canvas.toDataURL("image/png");
        a.href = img;
	});
}


const getData = () => fetch('./db.json').then(response => response.json());

const getDataToCard = async () => {
    getData()
    .then(result => {
        changeContent('image');
        changeContent('text');
                
    })        
};

const getRandomForArr = (arr) => {
    const arrLength = arr.length;
    return arr[Math.floor(Math.random() * arrLength)]
};

const changeContent = (typeContent) => {
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
    })        
 }

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
    getDataToCard();    
};

btnMen.addEventListener('click', () => {
    switchGender('men');
    createDownloadLink()
});

btnWomen.addEventListener('click', () => {
    switchGender('women');
    createDownloadLink()
});

btnChangeText.addEventListener('click', () => {
    changeContent('text');
    createDownloadLink()
})

btnChangeImage.addEventListener('click', () => {
    changeContent('image');
    createDownloadLink()
})

getDataToCard();
setTimeout(createDownloadLink, 1000)