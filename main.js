const briefcases = []
let playerCase = {}
let prizesRemaining = []
let chosenCases = []
let bankerOffers = []
const cashAmounts = [0.01,1,5,10,25,50,
   75,100,200,300,400,
   500,750,1000,5000,10000,
   25000,50000,75000,100000,
   200000,300000,400000,500000,
   750000,1000000]

const mainStageElmt = document.querySelector("#main-stage")
const stageElmt = document.querySelector("#stage")
const displayCaseElmt = document.querySelector("#display-case")
const offerAmt = document.querySelector("#offer-amt")
const offerBtn = document.querySelector("#offer-buttons")
const directionsElmt = document.querySelector("#directions")

generateCases()
createStage()
selectCases()

// fisher-yates shuffle
function shuffleCash(cashAmounts) {
   // shallow copy
   const array = [...cashAmounts]

   for (let i = 26 - 1; i >= 1; i--) {
      let j = Math.floor(Math.random() * 26)
      let temp = array[j]
      array[j] = array[i]
      array[i] = temp
   }
   return array
}

function generateCases() {
   const shuffledCash = shuffleCash(cashAmounts)

   for (let i = 0; i < 26; i++) {      
      briefcases.push({id: i+1, cashAmount: shuffledCash[i]})  
   }
}

function createStage() {
   const prizeTable = document.querySelector("#prize-table") 
   let row = 0

   for (let i = 0; i < briefcases.length; i++) {
      // display cases  
      const newCase = document.createElement("div")
      newCase.setAttribute("id", briefcases[i].id)
      newCase.textContent = newCase.id
      newCase.classList.add("briefcase", "unopened")
      newCase.addEventListener("click", pickFirstCase)

      stageElmt.append(newCase)

      // create prize table
      if (i < 13) {
         const tr = document.createElement("tr")
         const col1 = document.createElement("td")
         const col2 = document.createElement("td")
         prizeTable.appendChild(tr)

         col1.setAttribute("class", "col-1")
         col2.setAttribute("class", "col-2")
         const rows = prizeTable.querySelectorAll("tr")
         rows[i].appendChild(col1)
         rows[i].appendChild(col2)

         const column1Cells = document.querySelectorAll(".col-1")
         const prize = formatCash(cashAmounts[i])
         const txt = document.createTextNode(prize)
         column1Cells[i].appendChild(txt)         

      }    
      
      if (i >= 13) {        
         const column2Cells = document.querySelectorAll(".col-2")
         const prize = formatCash(cashAmounts[i])
         const txt = document.createTextNode(prize)
         column2Cells[row].appendChild(txt)
         row++       
      }
   }

   const dealBtn = document.createElement("button")
   const noDealBtn = document.createElement("button")
   offerBtn.appendChild(dealBtn)
   offerBtn.appendChild(noDealBtn)
   dealBtn.textContent = "DEAL!"
   dealBtn.setAttribute("id", "deal-btn")
   dealBtn.onclick = deal
   noDealBtn.textContent = "NO DEAL!"
   noDealBtn.setAttribute("id", "no-deal-btn")

   offerBtn.style.display = "none"
   directionsElmt.textContent = "Welcome! Select a case to hold and open six cases."   
}

function pickFirstCase() {   
   let caseId = this.id   
   const casePrize = briefcases[caseId - 1].cashAmount
   playerCase = {id: caseId, cashAmount: casePrize} 

   const briefcase = document.querySelectorAll(".briefcase")
   briefcase[caseId - 1].classList.add("player-case")

   //move player picked case to display area
   const playerCaseDisplay = document.querySelector("#player-case-display")
   const pickedCase = document.getElementById(caseId)
   playerCaseDisplay.appendChild(pickedCase)
 
   briefcase.forEach(function(_case) {
      _case.removeEventListener("click", pickFirstCase)
   })
}

function selectCases() {  
   const caseUnopened = document.querySelectorAll(".unopened")
   caseUnopened.forEach(function(_case) {       
         _case.addEventListener("click", openCase)  
   })
}

function openCase() {   
   const noDealBtn = document.querySelector("#no-deal-btn")
   const caseId = this.id

   if (playerCase.id != caseId) {
      const casePrize = briefcases[caseId - 1].cashAmount
      let selectedCase = document.getElementById(caseId)      
      selectedCase.textContent = formatCash(casePrize)
      selectedCase.classList.add("opened")
      selectedCase.classList.remove("unopened")
      selectedCase.removeEventListener("click", openCase)
      chosenCases.push({id: caseId, cashAmount: casePrize})

      //update prize table
      const prizeTable = document.querySelector("#prize-table")
      const prizeTableNodes = prizeTable.querySelectorAll("td")

      for (let i = 0; i < prizeTableNodes.length; i++) {
         let prize = prizeTableNodes[i].innerText         
         if (prize === formatCash(casePrize)) {
            prizeTableNodes[i].classList.add("eliminated")
         }
      }
      
      if (chosenCases.length === 6) {
         makeOffer()         
         noDealBtn.onclick = function() {
            directionsElmt.textContent = `Open five cases.`
            offerBtn.style.display = "none"
            offerAmt.style.display = "none"            
         selectCases()
         }          
      }
      if (chosenCases.length === 11) {
         makeOffer()
         noDealBtn.onclick = function() {
            directionsElmt.textContent = `Open four cases.`
            offerBtn.style.display = "none"
            offerAmt.style.display = "none"            
         selectCases()
         }      
      }
      if (chosenCases.length === 15) {
         makeOffer()
         noDealBtn.onclick = function() {
            directionsElmt.textContent = `Open three cases.`
            offerBtn.style.display = "none"
            offerAmt.style.display = "none"            
         selectCases()
         }       
      }
      if (chosenCases.length === 18) {
         makeOffer()
         noDealBtn.onclick = function() {
            directionsElmt.textContent = `Open two cases.`
            offerBtn.style.display = "none"
            offerAmt.style.display = "none"            
         selectCases()
         }      
      }
      if (chosenCases.length === 20) {
         makeOffer()
         noDealBtn.onclick = function() {
            directionsElmt.textContent = `Open one case.`
            offerBtn.style.display = "none"
            offerAmt.style.display = "none"
         selectCases()
         }      
      }
      if (chosenCases.length === 21) {
         makeOffer()
         noDealBtn.onclick = function() {
            directionsElmt.textContent = `Open one case.`
            offerBtn.style.display = "none"
            offerAmt.style.display = "none"
         selectCases()
         }
      }
      if (chosenCases.length === 22) {
         makeOffer()
         noDealBtn.onclick = function() {
            directionsElmt.textContent = `Open one case.`
            offerBtn.style.display = "none"
            offerAmt.style.display = "none"
         selectCases() 
         }
      }
      if (chosenCases.length === 23) {
         makeOffer()
         noDealBtn.onclick = function() {
            directionsElmt.textContent = `Open one more case.`
            offerBtn.style.display = "none"
            offerAmt.style.display = "none"
         selectCases() 
         }  
      }
      if (chosenCases.length === 24) {
         makeOffer()
         noDealBtn.onclick = function() {
            directionsElmt.textContent = `Two cases remain! You have two options 1. Open your case from the right or 2. Open the last case on the stage. Good luck!`
            offerBtn.style.display = "none"
            offerAmt.style.display = "none"
         }         
         selectLastCase()         
      }
   }
}

function makeOffer() {
   directionsElmt.textContent = ""
   const briefcase = document.querySelectorAll(".briefcase")
 
   briefcase.forEach(function(_case) {       
         _case.removeEventListener("click", openCase)  
   })

   // reset array
   prizesRemaining = []
   const casesRemaining = document.querySelectorAll(".unopened")
   casesRemaining.forEach(function(_case) {
      let caseId = _case.id
      let casePrize = briefcases[caseId - 1].cashAmount
      prizesRemaining.push({id: caseId, cashAmount: casePrize})

   })
   
   let prizes = []
   prizesRemaining.forEach(function(prize) {      
      prizes.push(prize.cashAmount)
   })
  
   let bankOffer = Math.round(calcOffer(prizes, prizes.length))
   bankerOffers.push(bankOffer)

   offerAmt.style.display = "inline"
   offerBtn.style.display = "inline"
   offerAmt.textContent = `${formatCash(bankOffer)}`

   const bankOffersElmt = document.querySelector("#banker-offers")
   offerDisplay = document.createElement("p")
   offerDisplay.textContent = `Round ${bankerOffers.length}: ${formatCash(bankerOffers[bankerOffers.length-1])}`
   bankOffersElmt.append(offerDisplay)      
}

// expected value algorithm
function calcOffer(array, lengthOfArray) {
   const prb = (1 / lengthOfArray)

   let sum = 0
   for (let i = 0; i < lengthOfArray; i++) {
      sum += array[i] * prb
   }
   return sum
}

function deal() {
   const winnings = bankerOffers[bankerOffers.length - 1]
   let congrats = ""
   if (winnings > playerCase.cashAmount) {
      congrats = "Congrats"
   } else {
      congrats = "What a shame"
   }
   let message = `${congrats}, you won ${formatCash(winnings)}! Your case had ${formatCash(playerCase.cashAmount)}!`
   offerBtn.style.display = "none"
   directionsElmt.textContent = message

   // open players case
   const selectedCase = document.getElementById(playerCase.id)      
   selectedCase.textContent = formatCash(playerCase.cashAmount)
   selectedCase.classList.add("opened")
   selectedCase.classList.remove("unopened")
   gameOver()
}

function formatCash(cash) {
   const dollarUS = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0   
   })
   return dollarUS.format(cash)
}

function selectLastCase() {
   
   const unopenedCaseElmt = document.querySelectorAll(".unopened")
   unopenedCaseElmt.forEach(function(_case) {
      _case.addEventListener("click", openLastCase) 
   })  
}

function openLastCase() {
   const caseId = this.id

   const casePrize = briefcases[caseId - 1].cashAmount
   let selectedCase = document.getElementById(caseId)      
   selectedCase.textContent = formatCash(casePrize)
   selectedCase.classList.add("opened")
   selectedCase.classList.remove("unopened")

   // open players case
   const playersCase = document.getElementById(playerCase.id)      
   playersCase.textContent = formatCash(playerCase.cashAmount)
   playersCase.classList.add("opened")
   playersCase.classList.remove("unopened")

   chosenCases.push({id: caseId, cashAmount: casePrize})

   if (chosenCases.length === 25) {
      if (playerCase.id === caseId) {
         directionsElmt.textContent  = `You won ${formatCash(playerCase.cashAmount)}!`
      } else {
         const casePrize = briefcases[caseId - 1].cashAmount
         directionsElmt.textContent = `You won ${formatCash(casePrize)}!  Your selected case had ${formatCash(playerCase.cashAmount)}!`
      }
      gameOver()
   }

   //update prize table
   const prizeTable = document.querySelector("#prize-table")
   const prizeTableNodes = prizeTable.querySelectorAll("td")

   for (let i = 0; i < prizeTableNodes.length; i++) {
      let prize = prizeTableNodes[i].innerText         
      if (prize === formatCash(casePrize)) {
         prizeTableNodes[i].classList.add("case-won")
      } 
   }   
}

function gameOver() {
   const briefcase = document.querySelectorAll(".briefcase")
    
   briefcase.forEach(function(_case) {
      _case.removeEventListener("click", openLastCase)
      _case.removeEventListener("click", openCase) 
   })
}