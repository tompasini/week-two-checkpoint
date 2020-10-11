let honeyPot = 0

let clickUpgrades = {
  spoon: {
    price: 5,
    quantity: 0,
    modifier: 1
  },
  shovel: {
    price: 20,
    quantity: 0,
    modifier: 5
  }
}

let automaticUpgrades = {
  electronicSuctionPump: {
    price: 10,
    quantity: 0,
    modifier: 1
  },
  extractor: {
    price: 100,
    quantity: 0,
    modifier: 5
  }
}

function harvest() {
  let spoonModifier = (clickUpgrades.spoon.quantity * clickUpgrades.spoon.modifier)
  let shovelModifier = (clickUpgrades.shovel.quantity * clickUpgrades.shovel.modifier)
  honeyPot += (1 + spoonModifier + shovelModifier)
  console.log(honeyPot)
  update()
}

function buySpoon() {
  if (honeyPot >= 5) {

    clickUpgrades.spoon.quantity++
    honeyPot -= (clickUpgrades.spoon.price)
    clickUpgrades.spoon.price++
  }
  update()
}

function buyShovel() {
  if (honeyPot >= 20) {

    clickUpgrades.shovel.quantity++
    honeyPot -= (clickUpgrades.shovel.price)
    clickUpgrades.shovel.price++
  }
  update()
}

function buyElectronicSuctionPump() {
  if (honeyPot >= 10) {
    automaticUpgrades.electronicSuctionPump.quantity++
    honeyPot -= (automaticUpgrades.electronicSuctionPump.price)
    automaticUpgrades.electronicSuctionPump.price++
    if ((automaticUpgrades.extractor.quantity >= 1) || (automaticUpgrades.electronicSuctionPump.quantity >= 2)) {
      console.log("another interval not needed.")
    } else {

      startInterval()
    }
  }
  update()

}

function buyExtractor() {
  if (honeyPot >= 100) {
    automaticUpgrades.extractor.quantity++
    honeyPot -= (automaticUpgrades.extractor.price)
    automaticUpgrades.extractor.price++
    if ((automaticUpgrades.electronicSuctionPump.quantity >= 1) || (automaticUpgrades.extractor.quantity >= 2)) {
      console.log("another interval not needed.")
    } else {

      startInterval()
    }
  }
  update()
}


function startInterval() {
  setInterval(collectAutoUpgrades, 3000)
}

//needs to iterate over automaticUpgrades
//and total the quantity of each automaticUpgrade times their modifier, and add that value to honeyPot
//for/in need for objects in a dictionary.
function collectAutoUpgrades() {
  for (let key in automaticUpgrades) {
    let autoUpgrade = automaticUpgrades[key]
    let upgrade = autoUpgrade.quantity * autoUpgrade.modifier

    honeyPot += upgrade
  }
  update()
}

function update() {

  let honeyPotCountElem = document.getElementById('honeypot-count')
  let spoonCountElem = document.getElementById('spoon-count')
  let pumpCountElem = document.getElementById('pump-count')
  let shovelCountElem = document.getElementById('shovel-count')
  let extractorCountElem = document.getElementById('extractor-count')
  let spoonPriceElem = document.getElementById('spoon-price')
  let pumpPriceElem = document.getElementById('pump-price')
  let shovelPriceElem = document.getElementById('shovel-price')
  let extractorPriceElem = document.getElementById('extractor-price')

  honeyPotCountElem.innerText = honeyPot.toString()
  spoonCountElem.innerText = (clickUpgrades.spoon.quantity).toString()
  pumpCountElem.innerText = (automaticUpgrades.electronicSuctionPump.quantity).toString()
  shovelCountElem.innerText = (clickUpgrades.shovel.quantity).toString()
  extractorCountElem.innerText = (automaticUpgrades.extractor.quantity).toString()

  spoonPriceElem.innerText = (clickUpgrades.spoon.price).toString()
  pumpPriceElem.innerText = (automaticUpgrades.electronicSuctionPump.price).toString()
  shovelPriceElem.innerText = (clickUpgrades.shovel.price).toString()
  extractorPriceElem.innerText = (automaticUpgrades.extractor.price).toString()

}

update()

