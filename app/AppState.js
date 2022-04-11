import { Car } from "./Models/Car.js"
import { House } from "./Models/House.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  houses = []
  /** @type {import('./Models/Car').Car[]} */
  cars = [
    new Car({
      color: 'red',
      description: 'This is my test car',
      img: 'https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/wp-content/uploads/2017/03/1988_Accord_3rd_Generation.jpg?resize=980:*',
      make: 'Honda',
      model: 'Accord',
      mileage: '289000',
      price: 5500,
      year: 1988
    })
  ]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
