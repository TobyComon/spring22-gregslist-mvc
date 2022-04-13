import { ProxyState } from "../AppState.js";
import { getHouseform } from "../components/HouseForm.js";
import { housesService } from "../Services/HousesService.js";
import { Pop } from "../Utils/Pop.js";


function _drawHouses() {
  console.log("draw houses");
  let housesCardsTemplate = ''

  ProxyState.houses.forEach(house => housesCardsTemplate += house.CardTemplate)

  document.getElementById('listings').innerHTML = `
    <div class="row houses">
      ${housesCardsTemplate}
    </div>
  `

  document.getElementById('listing-modal-form-slot').innerHTML = getHouseform()
  document.getElementById('add-listing-modal-label').innerText = 'Add House 🏠'
}

async function _getAllHouses() {
  try {
    await housesService.getAllHouses()
  } catch (error) {
    console.error(error);
    Pop.toast(error.message, 'error')
    
  }
}

export class HousesController {
  //  Do I want to do anything on page load?
  constructor() {
    _getAllHouses()
    ProxyState.on('houses', _drawHouses)
  }

  async handleSubmit(id) {
    // DO THIS like always
    try {
      window.event.preventDefault()
      /**@type {HTMLFormElement} */
      // @ts-ignore
      const formElem = window.event.target
      const formData = {
        bedrooms:  formElem.bedrooms.value,
        bathrooms: formElem.bathrooms.value,
        price: formElem.price.value,
        levels: formElem.price.value,
        description: formElem.description.value,
        year: formElem.year.value,
        imgUrl: formElem.imgUrl.value,
      }
      debugger
      if (id == undefined){
        await housesService.addHouse(formData)
      } else{
        formData.id = id
        await housesService.editHouse(formData)
      }

      formElem.reset()

      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance(document.getElementById('add-listing-modal')).hide()

    } catch (error) {
      // show this to the user
      console.error('[ADD_HOUSE_FORM_ERROR]', error)
      Pop.toast(error.message, 'error')
    }
  }

  drawHouses() {
    _drawHouses()
    // REVIEW [epic=Mark] How could we refactor this? 
    // @ts-ignore
    bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('sidenav')).hide()
  }
}