"use strict";

export const getApi = (baseURL) => {
    return function (categories, ...params) {
        return `${baseURL}/joke/${categories}?${params.join("&")}`;
    };
};

const fetchJokesData = async (uri) => {
    return fetch(uri)
        .then((res) => {
            console.log("Successfull promise")
            console.log(res)
            return res.json();
        })
        .catch((err) => {
            console.error(`Error: ${err}`);
        });
};

export const fetchJokes = async (url, n = 1) => {
    //we cannot change the api_url because it is a const so creating a new "let" variable
    let new_api_url;
    if (!url.includes("?")) {
        new_api_url = url + "?amount=" + n;
    } else {
        new_api_url = url + "&amount=" + n;
    }

    const data = await fetchJokesData(new_api_url);
    if (n === 1) {
        return [data];
    } else {
        return data.jokes;
    }
};
