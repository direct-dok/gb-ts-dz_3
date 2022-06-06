import { renderBlock } from './lib.js'
import Dates from './dates.js'
import SearchFormData from './SearchFormData.interface.js'
import Place from './Place.interface.js'
import { fetchData } from './utility.js'

export function renderSearchFormBlock (dateToday:string, lastDayNextMoth:string) :void {

  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" name="city" disabled value="Санкт-Петербург" />
            <input type="hidden" name="coordinates" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${Dates.calculateFutureDay(1)}" min="${dateToday}" max="${lastDayNextMoth}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${Dates.calculateFutureDay(3)}" min="${dateToday}" max="${lastDayNextMoth}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}

export function processingSearchForm(e): void {
  e.preventDefault()

  let allInputs = Array.from(
    e.target.querySelectorAll('input')
  )

  let dataSearch: SearchFormData = {
    city: '',
    checkin: '',
    checkout: '',
    price: '',
    coordinates: ''
  }

  allInputs.forEach(function(field:any) {
    dataSearch[field.name] = field.value
  })

  search(dataSearch, resultSearch)
}

export async function search(dataSearch: SearchFormData, callBack): void {
  let fetchResult = null,
      url = `http://localhost:3030/places?` +
            `checkInDate=${Date.parse(dataSearch.checkin)}&` +
            `checkOutDate=${Date.parse(dataSearch.checkout)}&` +
            `coordinates=${dataSearch.coordinates}`;

  if (dataSearch.price != null) {
    url += `&maxPrice=${dataSearch.price}`
  }

  fetchResult = await fetchData(url);

  console.log(fetchResult);

  let objPlace: Place = {
    name: '',
    image: '',
    description: '',
    remoteness: 0,
    bookedDates: []
  }
  callBack('Error', objPlace);
}

interface ResultSearch {
  (error?: Error, place?: Place): void
}

const resultSearch: ResultSearch = (error?: Error, place?: Place): void => {
  console.log('callback')
  setTimeout(function() {
    if(Math.random() < 0.5) {
      console.log(place)
    } else {
      console.error(error)
    }
  }, 1000)
  
}