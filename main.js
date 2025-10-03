let root = document.getElementById('root')
let Data;

fetch('./data/datasheet.json')
  .then(res => res.json())
  .then(data => {
    Data = data;
    displayAura(data);
  })

function displayAura(data) {
  data.auraFactors.map(item => {
    root.innerHTML += `
      <div class="auraDibba">
        <h1 class="title">${item.title}</h1>
        <select class="selection">
          <option>Please Select an option</option>
          ${Object.keys(item.factors).map(elem => `<option>${elem}</option>`).join('')}
        </select>
      </div>
    `
  })
}

function calculateAura() {
  let userDataSection = root.querySelectorAll('.selection')
  let userData = []
  let AuraResult = 0
  
  for (let item of userDataSection) {
    userData.push(item.value)
  }

  if (userData.includes('Please Select an option')) {
    alert("Ops you missed something. Please select everything and try again.")
  } else {
    for (let item of Data.auraFactors) {
      AuraResult += item.factors[userData[Data.auraFactors.indexOf(item)]]
    }

    showResult(AuraResult)
  }
}

function showResult(AuraResult) {
  let resultScreen = document.getElementById('resultScreen')
  let resultText = document.getElementById('resultText')
  
  if (AuraResult > 0) {
    resultText.textContent = `🎉 Congratulations! Your Aura is ${Math.abs(AuraResult)}`
    resultScreen.classList.remove('hidden')
    resultScreen.querySelector('.resultBox').classList.add('successTheme')
    resultScreen.querySelector('.resultBox').classList.remove('failTheme')
  } else {
    resultText.textContent = `⚡ Negative Energy Detected! Your Laura is ${Math.abs(AuraResult)}`
    resultScreen.classList.remove('hidden')
    resultScreen.querySelector('.resultBox').classList.add('failTheme')
    resultScreen.querySelector('.resultBox').classList.remove('successTheme')
  }
}

function closeResult() {
  let resultScreen = document.getElementById('resultScreen')
  resultScreen.classList.add('hidden')
}