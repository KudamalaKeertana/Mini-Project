// Fetch currencies from the API
fetch('https://open.er-api.com/v6/latest')
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        const fromCurrencySelect = document.getElementById('fromCurrency');
        const toCurrencySelect = document.getElementById('toCurrency');

        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromCurrencySelect.appendChild(option.cloneNode(true));
            toCurrencySelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching currencies:', error);
    });

function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;
    const resultElement = document.getElementById('result');

    fetch(`https://open.er-api.com/v6/latest`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency] / data.rates[fromCurrency];
            const result = amount * rate;
            resultElement.textContent = `${amount} ${fromCurrency} is equal to ${result.toFixed(2)} ${toCurrency}.`;
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            resultElement.textContent = 'Error converting currency. Please try again.';
        });
}
