const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".select-currency");


function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert") // Valor em reais

    const currencyValueConverted = document.querySelector(".currency-value") // Valor em Outras moedas

    const dolarToday = 5.25
    const euroToday = 5.60
    const libraToday = 6.40
    const bitcoinToday = 531417
    

    if (currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: 'currency',
            currency: 'USD'
        }).format(inputCurrencyValue / dolarToday)
    }

if (currencySelect.value == "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: 'currency',
            currency: 'GBP'
        }).format(inputCurrencyValue / libraToday)
}

    if (currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: 'currency',
            currency: 'EUR'
        }).format(inputCurrencyValue / euroToday)
}

    if (currencySelect.value == "btc") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: 'currency',
            currency: 'BTC'
        }).format(inputCurrencyValue / bitcoinToday)
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        }).format(inputCurrencyValue)
}


function changeCurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".currency-image")

    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar americano"
        currencyImage.src = './assets/dolar.png'
    }

    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro.png"

    }

    if (currencySelect.value == "libra") {
        currencyName.innerHTML = "Libra"
        currencyImage.src = "./assets/libra 1.png"

    }

    if (currencySelect.value == "btc") {
        currencyName.innerHTML = "Bitcoin"
        currencyImage.src = "./assets/bitcoin 1.png"

    }

    if (currencySelect.value == "real") {
        currencyName.innerHTML = "Real brasileiro"
        currencyImage.src = "./assets/real.png"
    }

    convertValues()
}







currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)