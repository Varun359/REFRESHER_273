"use strict";

import { fetchJokes, getApi } from "./api/fetchJokes.js";
import Joke from "./classes/Joke.js";
import TwoPartJoke from "./classes/TwoPartJoke.js";
import UserInput from "./userInput.js";

const baseURL = "https://v2.jokeapi.dev";
var jokesDict = {};


let fetchedJokes = [];

// fetching jokes from api based on form input
const buildJokes = async () => {
    const categories = UserInput.getCategories();
    const blacklist = UserInput.getBlackList();
    const idRange = UserInput.getIDRange();
    const count = UserInput.getJokesCount();
    const lang = UserInput.getLang();
    UserInput.setUserName(document.getElementById("username").value);
    console.log(categories, blacklist, idRange, count, lang);
    const params = [`idRange=${idRange}`];
    if (blacklist !== "") {
        params.push(`blacklistFlags=${blacklist}`);
    }
    if (lang !== "") {
        params.push(`lang=${lang}`);
    }

    console.log(params)
    //let [idrange, blacklistFlags] = params
    //console.log(idrange)
    //console.log(blacklistFlags)
    //console.log(getApi(baseURL)(categories, ...params), count);
    const res = await fetchJokes(getApi(baseURL)(categories, ...params), count);
    //console.log(res)
    return res;
};

// saving to local storage
const exportFavorites = (idList) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
    const username = UserInput.getUserName();
    const existingJokes = favorites[username] || [];
    var jokesDict = {};
    existingJokes.forEach((joke) => {
        jokesDict[joke.id] = joke;
    });
    idList.forEach((i) => {
        let res = fetchedJokes.find((joke) => joke.id === +i);
        if (res) {
            jokesDict[res.id] = res.asObject();
        }
    });
    console.log(jokesDict);
    const {joke1,joke2} = jokesDict;
    console.log(joke1)
    console.log(joke2)

    favorites[username] = Object.values(jokesDict);
    //console.log(JSON.stringify(favorites,null,4))
    localStorage.setItem("favorites", JSON.stringify(favorites, null, 4));
    printJokes(Object.values(jokesDict), true);
};

// get from local storage
const getFavorites = () => {
    const favorites = localStorage.getItem("favorites") || "{}";
    const username = UserInput.getUserName();
    const jokes = JSON.parse(favorites)[username] || [];
    printJokes(jokes, true);
};


// print jokes in html
const printJokes = (jokes, saved = false) => {
    let jokesArray = [];
    const favBtn = document.getElementById("fav-div");
    const jokesTitle = document.getElementById("jokeTitle");
    if (saved) {
        jokesTitle.innerHTML = "Your Favorites";
        favBtn.classList.add("hidden");
    } else {
        jokesTitle.innerHTML = "Fetched Jokes";
        favBtn.classList.remove("hidden");
    }
    if (jokes.length === 0) {
        const favDiv = document.getElementById("favorites");
        favDiv.innerHTML = `<h5 class="mt-4 text-center"> No favorites found </h5>`;
    } else {
        const favDiv = document.getElementById("favorites");
        favDiv.innerHTML = "";
        jokes.forEach((joke) => {
            let jokeObj;
            if (joke.type === "single") {
                jokeObj = new Joke(
                    joke.category,
                    joke.type,
                    joke.joke,
                    joke.flags,
                    joke.id,
                    joke.lang
                );
            } else {
                jokeObj = new TwoPartJoke(
                    joke.category,
                    joke.type,
                    joke.flags,
                    joke.setup,
                    joke.delivery,
                    joke.id,
                    joke.lang
                );
            }
            jokesArray.push(jokeObj);
        });
        
        fetchedJokes = jokesArray;
        jokesArray.forEach((joke, i) => {
            if (typeof joke === "object") {
                if (joke instanceof Joke || joke instanceof TwoPartJoke) {
                    favDiv.innerHTML += `<h5 class="mt-4">${joke
                        .printJoke()
                        .split("\n")
                        .join("</h5><h5>")}</h5>`;
                        //console.log(joke.printJoke());
                        //console.log("This is printing in the arrow function")
                }
            } else {
                console.log(joke);
            }
        });
    }
};

// fetch jokes on submit
const getJokes = () => {
    const response = buildJokes();
    response.then((jokes) => {
        console.log("\n\n\n");
        printJokes(jokes);
    });
};

// validations
var catBase = document.querySelectorAll(".category-base");
catBase.forEach((catDiv) => {
    if (catDiv.value === "Any") {
        catDiv.addEventListener("change", () => {
            if (catDiv.checked) {
                document.getElementById("custom-cat").classList.add("hidden");
            }
        });
    } else {
        catDiv.addEventListener("change", () => {
            if (catDiv.checked) {
                document
                    .getElementById("custom-cat")
                    .classList.remove("hidden");
            }
        });
    }
});


document.getElementById("language").addEventListener("change", () => {
    const range = [3, 35, 319, 6, 999, 1];
    let select = document.getElementById("language");
    let fromInput = document.querySelector(".rangeFrom");
    let toInput = document.querySelector(".rangeTo");
    let count = document.querySelector(".count");
    fromInput.setAttribute("max", range[select.selectedIndex] - 1);
    toInput.setAttribute("max", range[select.selectedIndex]);
    count.setAttribute("max", range[select.selectedIndex]);
    fromInput.setAttribute(
        "placeholder",
        `max ${range[select.selectedIndex] - 1}`
    );
    toInput.setAttribute("placeholder", `max ${range[select.selectedIndex]}`);
    count.setAttribute("placeholder", `max ${range[select.selectedIndex]}`);
});

/*document
    .getElementById("form-submit")
    .addEventListener("click", () => getJokes());
*/
document
    .getElementById("form")
    .addEventListener("submit", (e) => {
        e.preventDefault();
        getJokes()
    
    });

getFavorites();
document.getElementById("username").value = UserInput.getUserName();

document.getElementById("export-submit").addEventListener("click", () => {
    const fav = document.getElementById("fav-id");
    console.log(fav.value.split(","))
    exportFavorites(fav.value.split(","));
    fav.value = "";
});


