"use strict";
import Joke from "./Joke.js";

class TwoPartJoke extends Joke {
    setup = "";
    delivery = "";

    constructor(category, type, flags, setup, delivery, id, lang) {
        super(category, type, "", flags, id, lang);
        this.setup = this.formatJoke(setup);
        this.delivery = this.formatJoke(delivery);
    }


    printJoke() {
        //console.log(this.id)
        //console.log(this.setup)
        //console.log(this.delivery)
        return `Id: ${this.id}\nSetup: ${this.setup}\nDelivery: ${this.delivery}`;
    }
}

export default TwoPartJoke;
