import { generateId } from "../Utils/generateId.js"

export class House {
    constructor(data) {
      this.id = data.id
      this.bedrooms = data.bedrooms || ''
      this.bathrooms = data.bathrooms || ''
      this.price = data.price || 0
      this.description = data.description || ''
      this.year = data.year || ''
      this.levels = data.levels || ''
      this.imgUrl = data.imgUrl || ''
    }


get CardTemplate() {
  return /*html*/`
  <div class="car col-md-4 p-4">
    <div class="bg-white shadow rounded">
      <img class="w-100 rounded-top" src="${this.imgUrl}" alt="${this.description}-image">
      <div class="p-3">
        <p class="text-center uppercase"><b>${this.bedrooms} Bed - ${this.bathrooms} Bath - ${this.year}</b></p>
        <p class="m-0">${this.description}</p>
      </div>
      <div class="p-3 d-flex justify-content-between align-items-center">
        <p class="m-0">$${this.price}</p>
        <div class="d-flex align-items-center">
          <p class="m-0">Levels: </p>
          <div class="" style="">${this.levels}</div>
        </div>
        <i class="mdi mdi-delete selectable" onclick="app.housesController.removeHouse('${this.id}')"></i>
      </div>
    </div>
  </div>`
}
}