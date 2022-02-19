"use strict";

class UserInput {
    static getCategories() {
        const selectedCategories = [];
        if (
            document.querySelector("input[name=category-base]:checked")
                .value === "Any"
        ) {
            return "any";
        }
        const selectedCategoryInput = document.querySelectorAll(".category");
        selectedCategoryInput.forEach((input) => {
            if (input.checked) {
                selectedCategories.push(input.value);
            }
        });
        if (selectedCategories.length === 0) {
            return "any";
        }
        return selectedCategories.join(",");
    }

    static getBlackList() {
        const selectedBlacklist = [];
        const selectedBlacklistInput = document.querySelectorAll(".blacklist");
        selectedBlacklistInput.forEach((input) => {
            if (input.checked) {
                selectedBlacklist.push(input.value);
            }
        });
        if (selectedBlacklist.length === 0) {
            return "";
        }
        return selectedBlacklist.join(",");
    }

    static getIDRange() {
        const rangeFrom = document.querySelector(".rangeFrom");
        const rangeTo = document.querySelector(".rangeTo");
        return `${rangeFrom.value}-${rangeTo.value}`;
    }

    static getJokesCount() {
        const count = +(document.querySelector(".count").value || "1");
        return count;
    }

    static getLang() {
        let select = document.getElementById("language");
        let value = select.options[select.selectedIndex].text;
        if (value === "Any") {
            return "";
        }
        return value.split(" - ")[0];
    }

    static getUserName() {
        return sessionStorage.getItem("user") || "";
    }

    static setUserName(value) {
        sessionStorage.setItem("user", value);
    }
}

export default UserInput;
