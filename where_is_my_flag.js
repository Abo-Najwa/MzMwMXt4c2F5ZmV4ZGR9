

//make algorithm to find flag in array and object


function findFlag(data) {
    if (Array.isArray(data)) {
        return data.find(item => item === 'flag{xsayfex_flag_dark_web_example}');
    } else if (typeof data === 'object' && data !== null) {
        return Object.values(data).find(value => value === 'flag{example_flag}');
    } else {
        throw new Error("Input must be an array or an object");
    }
}


console.log(findFlag(['hello', 'world', 'flag{xsayfex_flag_dark_web_example}']));
