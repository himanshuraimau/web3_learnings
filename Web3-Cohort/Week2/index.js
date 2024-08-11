function nametoBytes(name){
    return new Uint8Array([...name].map(c =>c.charCodeAt(0)));  //converts string to bytes
    // using map function to iterate over each character in the string
    // how map works here:
    // 1. map function takes each character in the string
    // 2. converts it to its ASCII value
    // 3. returns the ASCII value
}

var name = "hello i am ram";
const n = nametoBytes(name);
console.log(n);

function arraytoHex(byteArray){
    let s = '';
    for(let i=0; i<byteArray.length; i++){
        s += byteArray[i].toString(16).padStart(2, '0');
    }
    return s;
}



const byteArray = new Uint8Array([104, 101, 108, 108, 111, 32, 105, 32, 97, 109, 32, 114, 97, 109]);
const hextString = arraytoHex(byteArray);
console.log(hextString);