export function addPrefixNull(number:number) :string | number {
    return number < 10 ? '0' + number : number
}

export async function fetchData(url) {
    let response = await fetch(url);
    let responseText = await response.text();
    let arrayResult = JSON.parse(responseText)

    return arrayResult;
}

export function getTimestamp (data: String) {
    return Date.parse(data);
}

export function addListenerForElements(event, elements, callBack) {
    elements = Array.from(elements)
    console.log(elements)
    elements.forEach(function(elem) {
        elem.addEventListener(event, callBack)
    })
    
}

export function checkPageElements(selector) {
    return document.querySelectorAll(selector)
}

export function getDataJson(stringJson: String, keys: Array<String>): Object {
    let object = JSON.parse(stringJson),
        objectResult = {};

    keys.forEach(function(elem) {
        objectResult[elem] = object[elem];
    })
    return objectResult;
}