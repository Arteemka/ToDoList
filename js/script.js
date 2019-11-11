const addToDOList = document.getElementsByClassName("add_button")[0];
let outputListOnPage = document.querySelector(".output-on-page");
const input = document.querySelectorAll("input");
let errorMess = document.getElementsByClassName("hide-error")[0];
const onTextIncrease = document.getElementsByClassName(
  "ul-li-nested-task increase"
)[0];
const onTextDecrease = document.getElementsByClassName(
  "ul-li-nested-task decrease"
)[0];
const onDateIncrease = document.getElementsByClassName(
  "ul-li-nested-date increase"
)[0];
const onDateDecrease = document.getElementsByClassName(
  "ul-li-nested-date decrease"
)[0];
const blockSort = document.getElementsByClassName("menu")[0];
const blockFilter = document.getElementsByClassName("filter")[0];
let text;
let date;
let list;
let masToDo = [];

function timer() {
  setTimeout(function() {
    errorMess.style.display = "none";
  }, 2000);
}

addToDOList.addEventListener("click", function() {
  let check = false;
  const i = masToDo.length;

  if (
    (input[1].value === "" || input[1].value === null) &&
    (input[0].value === "" || input[0].value === null)
  ) {
    document.getElementsByClassName("error")[0].innerHTML =
      "Вы незаполнили поле текст и дату!";
    errorMess.style.display = "block";
    input[1].style.border = "1px solid red";
    input[0].style.border = "1px solid red";
    document.querySelector(".hr").style.background = "red";
    document.querySelector(".hr").style.height = "67px";
    check = false;
    timer();
  } else if (input[1].value === "" || input[1].value === null) {
    document.getElementsByClassName("error")[0].innerHTML =
      "Вы незаполнили поле дату!";
    input[1].style.border = " 1px solid red";
    input[0].style.border = "none";
    input[0].style.borderBottom = "1px solid  #e85f5f";
    errorMess.style.display = "block";
    document.querySelector(".hr").style.height = "44px";
    document.querySelector(".hr").style.background = "red";
    timer();
  } else if (input[0].value === "" || input[0].value === null) {
    check = false;
    input[1].style.border = "none";
    input[1].style.borderBottom = "1px solid  #e85f5f";
    input[0].style.border = "1px solid  red";
    errorMess.style.display = "block";
    document.getElementsByClassName("error")[0].innerHTML =
      "Вы незаполнили поле текст!";
    document.querySelector(".hr").style.height = "44px";
    document.querySelector(".hr").style.background = "red";
    timer();
  } else {
    check = true;
    input[1].style.border = "none";
    input[0].style.border = "none";
    input[0].style.borderBottom = "1px solid  #e85f5f";
    input[1].style.borderBottom = "1px solid  #e85f5f";
    document.querySelector(".hr").style.height = "44px";
    document.querySelector(".hr").style.background = "green";
    document.getElementsByClassName("error")[0].innerHTML =
      "Данные успешно добавлены!";
    errorMess.style.display = "block";
    timer();
  }

  if (check) {
    function List(text, date) {
      this.text = text;
      this.date = date;
    }

    for (let i = 0; i < input.length; i++) {
      if (input[i].name === "name") {
        text = input[i].value;
      } else if (input[i].name === "date") {
        date = input[i].value;
      }

      list = new List(text, date);
    }

    masToDo[i] = list;
    localStorage.setItem("ToDO", JSON.stringify(masToDo));
    outputElementsOnPage();
    blockSort.style.display = "block";
    blockFilter.style.display = "block";
  }
});

function outputElementsOnPage() {
  let outText;
  let outDate;

  for (const key in masToDo) {
    outText = "";
    outDate = "";

    outText += masToDo[key].text;
    outDate += masToDo[key].date;
  }

  createFlexForPage(outText, outDate);
  clearInput();
  outputListOnPage.style.display = "block";
}

function createFlexForPage(text, date) {
  const createDivContainer = document.createElement("DIV");
  const createTableColumOutText = document.createElement("DIV");
  const createTableColumOutDate = document.createElement("DIV");
  const createTableColumOutDelete = document.createElement("DIV");

  createDivContainer.className = "flex-container2";
  outputListOnPage.appendChild(createDivContainer);

  createTableColumOutText.className = "flex-item2 on-the-text";
  createDivContainer.appendChild(createTableColumOutText);

  createTableColumOutDate.className = "flex-item2 on-the-date";
  createDivContainer.appendChild(createTableColumOutDate);

  createTableColumOutDelete.className = "flex-item2";
  createDivContainer.appendChild(createTableColumOutDelete);

  createTableColumOutText.textContent = text;
  createTableColumOutDate.textContent = date;
  createTableColumOutDelete.textContent = "X";
}

function clearInput() {
  input.forEach(item => {
    item.value = "";
  });
}

if (localStorage.getItem("ToDO") !== null) {
  masToDo = JSON.parse(localStorage.getItem("ToDO"));

  for (let i = 0; i < masToDo.length; i++) {
    const { text } = masToDo[i];
    const { date } = masToDo[i];

    createFlexForPage(text, date);
  }
}

let masSortText = [];

function sortFieldTextOnPage() {
  const getAllFieldText = outputListOnPage.querySelectorAll(".on-the-text");

  for (let i = 0; i < getAllFieldText.length; i++) {
    masSortText.push(getAllFieldText[i]);
  }
}

function outputSortTextOnPage() {
  for (let i = 0; i < masSortText.length; i++) {
    outputListOnPage.appendChild(masSortText[i].parentNode);
  }
}

onTextIncrease.addEventListener("click", function() {
  sortFieldTextOnPage();

  masToDo.sort((one, two) => {
    const oneName = one.text.toLowerCase();
    const twoName = two.text.toLowerCase();

    return oneName < twoName ? -1 : 1;
  });

  localStorage.setItem("ToDO", JSON.stringify(masToDo));
  masSortText.sort((one, two) => {
    return one.innerHTML < two.innerHTML ? -1 : 1;
  });

  outputSortTextOnPage();
  masSortText = [];
});

onTextDecrease.addEventListener("click", function() {
  sortFieldTextOnPage();

  masToDo.sort((one, two) => {
    const oneName = one.text.toLowerCase();
    const twoName = two.text.toLowerCase();

    return oneName > twoName ? -1 : 1;
  });

  localStorage.setItem("ToDO", JSON.stringify(masToDo));
  masSortText.sort((one, two) => {
    return one.innerHTML > two.innerHTML ? -1 : 1;
  });

  outputSortTextOnPage();
  masSortText = [];
});

let masSortDate = [];

function sortDateOnPage() {
  const getAllFieldDate = outputListOnPage.querySelectorAll(".on-the-date");

  for (let i = 0; i < getAllFieldDate.length; i++) {
    masSortDate.push(getAllFieldDate[i]);
  }
}

function outputSortDateOnPage() {
  for (let i = 0; i < masSortDate.length; i++) {
    outputListOnPage.appendChild(masSortDate[i].parentNode);
  }
}

function convert() {
  for (let i = 0; i < masToDo.length; i++) {
    const getItemDate = masToDo[i].date;
    const setMasDate = getItemDate.split("-");
    const convertDate = new Date(
      setMasDate[0],
      setMasDate[1] - 1,
      setMasDate[2]
    );

    masToDo[i].date = convertDate;
  }
}

function reverseConvert() {
  for (let i = 0; i < masToDo.length; i++) {
    const getItemDate = masToDo[i].date;
    const convertDate = new Date(getItemDate);
    const resultDate = [
      convertDate.getFullYear(),
      addLeadZero(convertDate.getMonth() + 1),
      addLeadZero(convertDate.getDate())
    ].join("-");

    masToDo[i].date = resultDate;
  }

  function addLeadZero(val) {
    return +val < 10 ? `0${val}` : val;
  }
}

onDateIncrease.addEventListener("click", function() {
  sortDateOnPage();
  convert();

  function sorting() {
    for (let i = 0; i < arguments.length; i++) {
      if (arguments[i] === masSortDate) {
        arguments[i].sort((one, two) => {
          const oneDate = new Date(
            one.innerHTML.split("-")[0],
            one.innerHTML.split("-")[1] - 1,
            one.innerHTML.split("-")[2]
          );
          const twoDate = new Date(
            two.innerHTML.split("-")[0],
            two.innerHTML.split("-")[1] - 1,
            two.innerHTML.split("-")[2]
          );

          return new Date(oneDate) - new Date(twoDate);
        });

        arguments[i].sort(
          (one, two) => new Date(one.date) - new Date(two.date)
        );
      }
    }
  }

  sorting(masToDo, masSortDate);

  reverseConvert();

  localStorage.setItem("ToDO", JSON.stringify(masToDo));

  outputSortDateOnPage();
  masSortDate = [];
});

onDateDecrease.addEventListener("click", function() {
  sortDateOnPage();
  convert();

  function sorting() {
    for (let i = 0; i < arguments.length; i++) {
      if (arguments[i] === masSortDate) {
        arguments[i].sort((one, two) => {
          const oneDate = new Date(
            one.innerHTML.split("-")[0],
            one.innerHTML.split("-")[1] - 1,
            one.innerHTML.split("-")[2]
          );
          const twoDate = new Date(
            two.innerHTML.split("-")[0],
            two.innerHTML.split("-")[1] - 1,
            two.innerHTML.split("-")[2]
          );

          return new Date(twoDate) - new Date(oneDate);
        });

        arguments[i].sort(
          (one, two) => new Date(two.date) - new Date(one.date)
        );
      }
    }
  }

  sorting(masToDo, masSortDate);

  reverseConvert();

  localStorage.setItem("ToDO", JSON.stringify(masToDo));

  outputSortDateOnPage();
  masSortDate = [];
});

function entryDate(val, filterElements) {
  if (val != "") {
    filterElements.forEach(item => {
      if (item.innerText.toLowerCase().indexOf(val) === -1) {
        item.parentNode.classList.add("hide");
        item.innerHTML = item.innerText;
      } else {
        let str = item.innerText;

        item.parentNode.classList.remove("hide");
        item.innerHTML = insertMArk(
          str,
          item.innerText.toLowerCase().search(val),
          val.length
        );
      }
    });
  }

  filterElements.forEach(item => {
    item.parentNode.classList.remove("hide");
    item.innerHTML = item.innerText;
  });
}

document
  .getElementsByClassName("filter-item-text")[0]
  .addEventListener("keyup", function() {
    let val = this.value.toLowerCase().trim();
    let filterElements = outputListOnPage.querySelectorAll(".on-the-text");

    entryDate(val, filterElements);
  });

document
  .getElementsByClassName("filter-item-date")[0]
  .addEventListener("keyup", function() {
    let val = this.value.toLowerCase().trim();
    let filterElements = outputListOnPage.querySelectorAll(".on-the-date");

    entryDate(val, filterElements);
  });

function insertMArk(str, pos, len) {
  return (
    str.slice(0, pos) +
    "<mark>" +
    str.slice(pos, pos + len) +
    "</mark>" +
    str.slice(pos + len)
  );
}

outputListOnPage.addEventListener("click", function(event) {
  if (event.target.textContent === "X") {
    event.target.parentNode.remove();
  } else if (event.target.parentNode.className === "flex-container2") {
    event.target.parentNode.classList.add("checked");
  } else {
    event.target.parentNode.classList.remove("checked");
  }
});
