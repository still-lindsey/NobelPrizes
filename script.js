"use strict";
// Please don't delete the 'use strict' line above

//Mission
//Using JavaScript in script.js, parse the Nobel Prize data to create an appealing webpage that displays the Nobel Prize winners. When you are getting started, it doesn’t need to look very pretty.


const arrayOfYearCategoryObjects = nobels["prizes"];

function cleanData(array) {
  for (let object of array) {
    for (let item of object["laureates"]) {
      if (item["motivation"] === undefined) {
        item["motivation"] = "";
      }
    }
  }
}

cleanData(arrayOfYearCategoryObjects);
console.log(arrayOfYearCategoryObjects);

function createH1() {
  let h1 = document.createElement("h1");
  h1.innerText = "Nobel Prizes and Laureates";
  h1.className = "main-heading";
  h1.id = "main-heading";
  document.body.appendChild(h1);
}

createH1();

function years(array) {
  for (let object of array) {
    let h2 = document.createElement("h2");
    let div = document.createElement("div");
    h2.innerText = object["year"];
    h2.className = "year";
    div.className = "h2";
    div.appendChild(h2);
    document.body.appendChild(div);
  }
}
years(arrayOfYearCategoryObjects);

//CLOSE!!
function removeRepeated(array) {
  //loop over array
  for (let i = array.length - 1; i > 0; i--) {
    if (array[i].textContent === array[i - 1].textContent) {
      document.body.removeChild(document.getElementsByClassName("h2")[i - 1]);
      i--;
    }
  }
  //check if item exists already
  //if so, remove it from parent
}

//call 3 times(problem w above function)
removeRepeated([].slice.call(document.body.querySelectorAll("h2")));

removeRepeated([].slice.call(document.body.querySelectorAll("h2")));

removeRepeated([].slice.call(document.body.querySelectorAll("h2")));

//FINISHED
function addCategories(array, h2Array) {
  //loop over textContent
  for (let i = 0; i < h2Array.length; i++) {
    let year = h2Array[i].textContent;
    for (let j = 0; j < array.length; j++) {
      if (array[j]["year"] === year) {
        let h3 = document.createElement("h3");
        h3.innerText = `The Nobel Prize in ${
          array[j]["category"][0].toUpperCase() +
          array[j]["category"].substring(1)
        }`;
        h3.className = `${array[j]["category"]}`;
        document
          .querySelectorAll("h2")
          [i].insertAdjacentElement("afterend", h3);
      }
    }
  }

  //loop over array
  //if textContent is in object add h3 tag
  //append text to tag
}

addCategories(
  arrayOfYearCategoryObjects,
  [].slice.call(document.body.querySelectorAll("h2"))
);

let h3Array = [].slice.call(document.body.querySelectorAll("h3"));

//FINISHED
function addOverallMotivation(array, h3Array) {
  for (let i = 0; i < h3Array.length; i++) {
    let category = h3Array[i].className; //name of cat
    let year = h3Array[i].parentElement.innerText.split("\n")[0];
    for (let j = 0; j < array.length; j++) {
      if (array[j]["category"] === category && array[j]["year"] === year) {
        if (array[j]["overallMotivation"] !== undefined) {
          let p = document.createElement("p");
          p.innerText = array[j]["overallMotivation"];
          p.className = `overall-motivation`;
          document.querySelectorAll("h3")[i].appendChild(p);
        }
      }
    }
  }
}

addOverallMotivation(arrayOfYearCategoryObjects, h3Array);

function addPeopleAndMotivation(array, h3Array) {
  for (let i = 0; i < h3Array.length; i++) {
    let category = h3Array[i].className; //name of cat
    let year = h3Array[i].parentElement.innerText.split("\n")[0];
    for (let j = 0; j < array.length; j++) {
      if (array[j]["category"] === category && array[j]["year"] === year) {
        let laureates = array[j]["laureates"];
        for (let k = 0; k < laureates.length; k++) {
          if (
            laureates[k + 1] === undefined ||
            laureates[k]["motivation"] !== laureates[k + 1]["motivation"]
          ) {
            let p = document.createElement("p");
            p.innerText = `${laureates[k]["firstname"]} ${laureates[k]["surname"]} ${laureates[k]["motivation"]}`;
            p.className = `people`;
            document.querySelectorAll("h3")[i].appendChild(p);
          } else if (
            laureates[k]["motivation"] === laureates[k + 1]["motivation"]
          ) {
            let p = document.createElement("p");
            p.innerText = `${laureates[k]["firstname"]} ${
              laureates[k]["surname"]
            } and ${laureates[k + 1]["firstname"]} ${
              laureates[k + 1]["surname"]
            } ${laureates[k]["motivation"]}`;
            p.className = `motivation`;
            document.querySelectorAll("h3")[i].appendChild(p);
            k++;
          } else {
            let p = document.createElement("p");
            p.innerText = `${laureates[k]["firstname"]} ${
              laureates[k]["surname"]
            }, ${laureates[k + 1]["firstname"]} ${
              laureates[k + 1]["surname"]
            } and ${laureates[k + 2]["firstname"]} ${
              laureates[k + 2]["surname"]
            } ${laureates[k]["motivation"]}`;
            p.className = `motivation`;
            document.querySelectorAll("h3")[i].appendChild(p);
            k = k + 2;
          }
        }
      }
    }
  }
}

addPeopleAndMotivation(arrayOfYearCategoryObjects, h3Array);

function addBottomLink() {
  let a = document.createElement("a");
  let linkText = document.createTextNode("back to top");
  a.appendChild(linkText);
  a.title = "back to top";
  a.href = "#main-heading";
  document.body.appendChild(a);
}

addBottomLink();

//adv reqs
//Add some kind of interactivity. For example:

//clicking a name goes to bio webpage on britannica

//Rainbow Unicorn Requirements 🌈 🦄
//Download another interesting public dataset from jdorfman/awesome-json-datasets. Make a beautiful webpage that displays the information in an attractive way.
