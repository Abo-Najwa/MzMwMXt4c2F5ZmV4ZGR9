
document.getElementById("lllp").addEventListener(("click"), function() {
    document.getElementById("lllp").innerHTML = "You clicked me!";
    window.location.href = "forbyfor.html";
});

let arr = [1, 2, 3, 4, 5];
let obj = { name: "xsayfex", age: 30 };


function cryptoThisUp(data) {
    if (Array.isArray(data)) {
        return data.map(item => {
            return {
                value: item,
                encrypted: btoa(item.toString())
            };
        });
    } else if (typeof data === 'object' && data !== null) {
        return Object.keys(data).reduce((acc, key) => {
            acc[key] = {
                value: data[key],
                encrypted: btoa(data[key].toString())
            };
            return acc;
        }, {});
    } else {
        throw new Error("Input must be an array or an object");
    }
}


console.log(cryptoThisUp(arr));
cryptoThisUp(obj);

