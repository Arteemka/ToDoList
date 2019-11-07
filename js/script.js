const addToDOList = document.getElementsByClassName('add_button')[0];
let outputListOnPage = document.querySelector('.output-on-page');
const input = document.querySelectorAll('input');
let masToDo = [];

addToDOList.addEventListener('click', function() {

    function List(text, date) {
        this.text = text;
        this.date = date;
    }

    let text;
    let date;
    let list;
    for (let i = 0; i < input.length; i++) {

        if (input[i].name === 'name') {
            text = input[i].value;
        } else if (input[i].name === 'date') {
            date = input[i].value;
        }

        list = new List(text, date);
    }

    const i = masToDo.length;
    masToDo[i] = list;
    localStorage.setItem('ToDO', JSON.stringify(masToDo));
    outputElementsOnPage();

});

function outputElementsOnPage() {

    let outText;
    let outDate;

    for (const key in masToDo) {
        outText = '';
        outDate = '';

        outText += masToDo[key].text;
        outDate += masToDo[key].date;

    }

    createFlexForPage(outText, outDate);
    clearInput();
    outputListOnPage.style.display = 'block';
}

function createFlexForPage(text, date) {
    const createDivContainer = document.createElement('DIV');
    const createTableColumOutText = document.createElement('DIV');
    const createTableColumOutDate = document.createElement('DIV');
    const createTableColumOutDelete = document.createElement('DIV');
    


    createDivContainer.className = 'flex-container2';
    outputListOnPage.appendChild(createDivContainer);

    createTableColumOutText.className = 'flex-item2 on-the-text';
    createDivContainer.appendChild(createTableColumOutText);

    createTableColumOutDate.className = 'flex-item2 on-the-date';
    createDivContainer.appendChild(createTableColumOutDate);

    createTableColumOutDelete.className = 'flex-item2';
    createDivContainer.appendChild(createTableColumOutDelete);

    createTableColumOutText.textContent = text;
    createTableColumOutDate.textContent = date;
    createTableColumOutDelete.textContent = 'X';
}

function clearInput() {
    input.forEach((item) => {
        item.value = '';
    });
}

outputListOnPage.addEventListener('click', function(e) {
    return (e.target.parentNode.className === 'flex-container2') ?
        e.target.parentNode.classList.add('checked') :
        e.target.parentNode.classList.remove('checked');
});

outputListOnPage.addEventListener('click', function(e) {
    return (e.target.textContent === 'X') ? e.target.parentNode.remove() : false;
});

if (localStorage.getItem('ToDO') !== null) {
    masToDo = JSON.parse(localStorage.getItem('ToDO'));

    for (let i = 0; i < masToDo.length; i++) {
        const { text } = masToDo[i];
        const { date } = masToDo[i];
        createFlexForPage(text, date);
    }
}