let joke1={
  "single_joke" : true,
  "twopart_joke": false,
}
let joke2={
  "single_joke" : false,
  "twopart_joke": true,
}
let joke3={
  "single_joke" : false,
  "twopart_joke": false,
}
const check= function(name1,name2) {
 let joke;
 if(this.single_joke)
   joke="single joke"
 else if(this.twopart_joke)
   joke="twopart joke"
 else
   joke="not a joke"
 console.log("Hi "+name1+" and "+name2+" this is "+joke)
}

check.call(joke1,"varun","ramesh")

check.apply(joke2,["varun","ramesh"])

let fun=check.bind(joke3,"varun","ramesh")
fun()
