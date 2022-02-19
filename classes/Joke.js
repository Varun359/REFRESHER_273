"use strict";

class Joke {
    category = "";
    type = "";
    joke = "";
    flags = {};
    id = 0;
    lang = "";

    constructor(category, type, joke, flags, id, lang) {
        Object.assign(this,{category,type,joke:this.formatJoke(joke),flags,id,lang,})
    }

    
    formatJoke(joke) {
        if (joke.includes("//")) {
            console.log(joke)
            return joke.slice(4, joke.length - 1);
        }
        return joke;
    }

    printJoke() {
        console.log(this.flags)
        let {explicit,nsfw} = this.flags;
        console.log(explicit)
        console.log(nsfw)
        return `Id: ${this.id}\n${this.joke}`;
    }

    asObject() {
        return { ...this };
    }
}

export default Joke;
