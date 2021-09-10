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

//set divs to variable name

const navbar = document.getElementById("navbar");
const title = document.getElementById("title");
const content = document.getElementById("content");

//add navbar
const cat = [
  "Economics",
  "Peace",
  "Medicine",
  "Literature",
  "Chemistry",
  "Physics",
];

function addNav() {
  for (let item of cat) {
    let button = document.createElement("button");
    button.innerText = item;
    button.id = item;
    button.className = "nav";
    button.setAttribute("id", item);
    button.href = `#${item}`;
    navbar.appendChild(button);
  }
}

addNav();

function createH1() {
  let h1 = document.createElement("button");
  h1.innerText = "Nobel Prizes and Laureates";
  h1.className = "main-heading";
  h1.id = "main-heading";
  title.appendChild(h1);
}

createH1();

function years(array) {
  for (let object of array) {
    let h2 = document.createElement("h2");
    let div = document.createElement("div");
    h2.innerText = object["year"];
    h2.id = object["year"];
    h2.className = "year";
    div.className = "h2";
    div.appendChild(h2);
    content.appendChild(div);
  }
}
years(arrayOfYearCategoryObjects);

//CLOSE!!
function removeRepeated(array) {
  //loop over array
  for (let i = array.length - 1; i > 0; i--) {
    if (array[i].textContent === array[i - 1].textContent) {
      content.removeChild(document.getElementsByClassName("h2")[i - 1]);
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
function displayCategories(array, h2Array) {
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

displayCategories(
  arrayOfYearCategoryObjects,
  [].slice.call(document.body.querySelectorAll("h2"))
);

const h3Array = [].slice.call(document.body.querySelectorAll("h3"));

const h2Array = [].slice.call(document.body.querySelectorAll("h2"));

//FINISHED
function displayOverallMotivation(array, h3Array) {
  console.log("running display motivation");
  let year;
  for (let i = 0; i < h3Array.length; i++) {
    let category = h3Array[i].className; //name of cat
    console.log(category);
    console.log(i);
    year = h3Array[i].parentElement.firstChild.innerHTML;
    console.log(year); //problem area
    for (let j = 0; j < array.length; j++) {
      if (array[j]["category"] === category && array[j]["year"] === year) {
        console.log(true);
        if (array[j]["overallMotivation"] !== undefined) {
          console.log(true);
          let p = document.createElement("p");
          p.innerText = array[j]["overallMotivation"];
          p.className = `overall-motivation`;
          document.querySelectorAll("h3")[i].appendChild(p);
        }
      }
    }
  }
}

displayOverallMotivation(arrayOfYearCategoryObjects, h3Array);

function displayAllPeopleAndMotivation(array, h3Array) {
  for (let i = 0; i < h3Array.length; i++) {
    let category = h3Array[i].className; //name of cat
    let year = h3Array[i].parentElement.firstChild.innerHTML;
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
          } else if (laureates[k + 2] === undefined) {
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
            }, and ${laureates[k + 2]["firstname"]} ${
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

displayAllPeopleAndMotivation(arrayOfYearCategoryObjects, h3Array);

//make buttons event listeners

const buttons = document.getElementsByClassName("nav");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () =>
    displayWinnersByCategory(buttons[i].id)
  );
}
console.log(buttons);

//not showing info under text
const mainHead = document.getElementById("main-heading");
mainHead.addEventListener("click", () => {
  clearContent();
  years(arrayOfYearCategoryObjects);
  removeRepeated([].slice.call(document.body.querySelectorAll("h2")));

  removeRepeated([].slice.call(document.body.querySelectorAll("h2")));

  removeRepeated([].slice.call(document.body.querySelectorAll("h2")));

  displayCategories(
    arrayOfYearCategoryObjects,
    [].slice.call(document.body.querySelectorAll("h2"))
  );
  displayOverallMotivation(arrayOfYearCategoryObjects, h3Array);

  displayAllPeopleAndMotivation(arrayOfYearCategoryObjects, h3Array);
});

//function to clear content area in order to only disaply info from one category
function clearContent() {
  content.innerHTML = "";
}
// A function that displays winners by category
//NOT FINISHED
function displayWinnersByCategory(category) {
  console.log(category);
  clearContent();

  let h2 = document.createElement("h2");
  h2.innerText = `The Nobel Prize in ${category}`;
  content.appendChild(h2);

  // Create a drop down list
  let select = document.createElement("select");
  select.id = "year-select";
  // when it's changed, invoke toggleYearFilter
  select.addEventListener("change", (e) => toggleYearFilter(e.target.value));
  let option = document.createElement("option");
  option.value = "all";
  option.text = "All Years";
  select.appendChild(option);

  content.appendChild(select);

  //Loop array of novels.prizes
  for (let i = 0; i < arrayOfYearCategoryObjects.length; i++) {
    //If category matches categoryName(a variable passed by button's id)
    //append it to <div id="content">
    //STUCK HERE
    if (
      arrayOfYearCategoryObjects[i]["category"].toUpperCase() ===
      category.toUpperCase()
    ) {
      console.log("here");
      //== Year ==//
      // create <div> with class attributes & custom attribute
      // year-div is div of year and
      let yearDiv = document.createElement("div");
      yearDiv.setAttribute("class", "year-div");
      yearDiv.id = "yearDiv";
      yearDiv.setAttribute("data-year", arrayOfYearCategoryObjects[i]["year"]);

      content.appendChild(yearDiv);

      let h3 = document.createElement("h3");
      h3.setAttribute("class", "year");
      h3.innerText = `${arrayOfYearCategoryObjects[i].year}`;
      h3.id = `${arrayOfYearCategoryObjects[i].year}`;

      yearDiv.appendChild(h3);

      //Settings for drop down list

      let select = document.querySelector("select");
      let option = document.createElement("option");
      option.value = arrayOfYearCategoryObjects[i]["year"];
      option.text = arrayOfYearCategoryObjects[i]["year"];
      select.appendChild(option);

      //Loop laureates and append them to <div id="content">
      let year = arrayOfYearCategoryObjects[i]["year"];
      let laureates = nobels.prizes[i].laureates;
      for (let k = 0; k < nobels.prizes[i].laureates.length; k++) {
        if (
          laureates[k + 1] === undefined ||
          laureates[k]["motivation"] !== laureates[k + 1]["motivation"]
        ) {
          let p = document.createElement("p");
          p.innerText = `${laureates[k]["firstname"]} ${laureates[k]["surname"]} ${laureates[k]["motivation"]}`;
          p.className = `people`;
          document.getElementById(year).appendChild(p);
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
          document.getElementById(year).appendChild(p);
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
          document.yearDiv.appendChild(p);
          k = k + 2;
        }
      }
      content.appendChild(yearDiv);
    }
  }
}

function toggleYearFilter(year) {
  if (year != "all") {
    // all div without data-year attribue equal year
    let list = document.querySelectorAll(
      `div[data-year]:not([data-year="${year}"])`
    );
    for (let i = 0; i < list.length; ++i) {
      list[i].classList.add("hide");
    }

    // remove hide on year to show
    let show = document.querySelector(`div[data-year="${year}"]`);
    show.classList.remove("hide");
  } else {
    // if all show all, remove all hide
    const list = document.querySelectorAll(`div[data-year]`);
    for (var i = 0; i < list.length; ++i) {
      list[i].classList.remove("hide");
    }
  }
}

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
