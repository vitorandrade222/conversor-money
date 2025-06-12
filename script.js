const convertButton = document.querySelector(".convert-button");
const currencySelectFrom = document.querySelector(".select-currency-from");
const currencySelectTo = document.querySelector(".select-currency-to");
const inputField = document.querySelector(".input-currency");

const currencyValueToConvert = document.querySelectorAll(".currency-value-to-convert")[0];
const currencyValueConverted = document.querySelectorAll(".currency-value-to-convert")[1];
const currencyNameFrom = document.getElementById("currency-name");
const currencyImageFrom = document.querySelector(".currency-image");
const currencyNameTo = document.querySelector(".currency-name-2");
const currencyImageTo = document.querySelector(".currency-image-2");

let currencyData = {};

function formatCurrency(value, currency) {
    if (currency === "BTC") {
        return `${value.toFixed(8)} BTC`;
    }

    const { locale, symbol } = currencyData[currency];
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: symbol
    }).format(value);
}

function convertValues() {
    const inputCurrencyValue = parseFloat(inputField.value.replace(/[^\d,.-]/g, '').replace(',', '.'));

    const from = currencySelectFrom.value;
    const to = currencySelectTo.value;

    if (!currencyData[from] || !currencyData[to]) {
        alert("Dados ainda não carregados. Por favor, aguarde...");
        return;
    }

    if (isNaN(inputCurrencyValue)) {
        currencyValueToConvert.textContent = "Valor inválido";
        currencyValueConverted.textContent = "";
        return;
    }

    const realValue = inputCurrencyValue * currencyData[from].rate;
    const convertedValue = realValue / currencyData[to].rate;

    currencyValueToConvert.textContent = formatCurrency(inputCurrencyValue, from);
    currencyValueConverted.textContent = formatCurrency(convertedValue, to);

    currencyNameFrom.textContent = currencyData[to].name;
    currencyImageFrom.src = currencyData[to].image;

    currencyNameTo.textContent = currencyData[from].name;
    currencyImageTo.src = currencyData[from].image;
}

async function fetchCurrencyData() {
    try {
        const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL");
        const data = await response.json();

console.log(data)

        currencyData = {
            USD: {
                rate: parseFloat(data.USDBRL.high),
                name: "Dólar Americano",
                symbol: "USD",
                locale: "en-US",
                image: "./assets/dolar.png"
            },
            EUR: {
                rate: parseFloat(data.EURBRL.high),
                name: "Euro",
                symbol: "EUR",
                locale: "de-DE",
                image: "./assets/euro.png"
            },
            BRL: {
                rate: 1,
                name: "Real Brasileiro",
                symbol: "BRL",
                locale: "pt-BR",
                image: "./assets/real.png"
            },
            BTC: {
                rate: parseFloat(data.BTCBRL.high),
                name: "Bitcoin",
                symbol: "BTC",
                locale: "en-US",
                image: "./assets/bitcoin 1.png"
            },
            GBP: {
                rate: parseFloat(data.GBPBRL.high),
                name: "Libra Esterlina",
                symbol: "GBP",
                locale: "en-GB",
                image: "./assets/libra 1.png"
            }
        };

        // Adiciona os eventos apenas após os dados carregarem
        convertButton.addEventListener("click", convertValues);
        currencySelectFrom.addEventListener("change", convertValues);
        currencySelectTo.addEventListener("change", convertValues);

    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        alert("Erro ao carregar dados de câmbio.");
    }
}

fetchCurrencyData();
