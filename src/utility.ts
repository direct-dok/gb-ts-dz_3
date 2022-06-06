export function addPrefixNull(number:number) :string | number {
    return number < 10 ? '0' + number : number
}

export async function fetchData(url) {
    let response = await fetch(url);
    let responseText = await response.text();
    let arrayResult = JSON.parse(responseText)
  
    return arrayResult;
  }