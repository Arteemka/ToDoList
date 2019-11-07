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
    


    createDivContainer.className = 'flex-container2';
    outputListOnPage.appendChild(createDivContainer);

    createTableColumOutText.className = 'flex-item2 on-the-text';
    createDivContainer.appendChild(createTableColumOutText);

    createTableColumOutDate.className = 'flex-item2 on-the-date';
    createDivContainer.appendChild(createTableColumOutDate);

    createTableColumOutText.textContent = text;
    createTableColumOutDate.textContent = date;
}

function clearInput() {
    input.forEach((item) => {
        item.value = '';
    });
}