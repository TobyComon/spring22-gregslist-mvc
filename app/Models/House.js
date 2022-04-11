import { generateId } from "../Utils/generateId.js"

export class House {
    constructor({ id = generateId(), bedrooms, bathrooms, year, parking, pets, img, price, description }) {
      // handle out conditions first
      if (!bedrooms || !bathrooms || !price) {
        throw new Error('You can\'t add a house without a bedroom bathroom and price')
      }
      // handle out conditions first
      if (price <= 0) {
        throw new Error('Where my money')
      }
      this.id = id
      this.bedrooms = bedrooms
      this.bathrooms = bathrooms
      this.price = price
      this.description = description || ''
      this.year = year || ''
      this.parking = parking || ''
      this.pets = pets || ''
      this.img = img || ''
    }


get CardTemplate() {
  return /*html*/`
  <div class="car col-md-4 p-4">
    <div class="bg-white shadow rounded">
      <img class="w-100 rounded-top" src="${this.img}" alt="${this.description}-image">
      <div class="p-3">
        <p class="text-center uppercase"><b>${this.bedrooms} Bed - ${this.bathrooms} Bath - ${this.year}</b></p>
        <p class="m-0">${this.description}</p>
      </div>
      <div class="p-3 d-flex justify-content-between align-items-center">
        <p class="m-0">$${this.price}</p>
        <div class="d-flex align-items-center">
          <p class="m-0">Parking:</p>
          <div class=" border border-dark" style="">${this.parking}</div>
        </div>
        <i class="mdi mdi-delete selectable" onclick="app.carsController.removeCar('${this.id}')"></i>
      </div>
    </div>
  </div>`
}
}