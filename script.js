const kategoriSelect = document.getElementById('kategori');
const unitConverterDiv = document.getElementById('unit-converter');
const unitFromSelect = document.getElementById('unit-from');
const unitToSelect = document.getElementById('unit-to');
const inputValue = document.getElementById('input-value');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');

const units = {
    panjang: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        milimeter: 1000,
        mil: 0.000621371,
        yard: 1.09361,
        kaki: 3.28084,
        inci: 39.3701
    },
    luas: {
        'meter persegi': 1,
        'kilometer persegi': 0.000001,
        'hektar': 0.0001,
        'are': 0.01,
        'mil persegi': 3.861e-7,
        'yard persegi': 1.19599,
        'kaki persegi': 10.7639,
        'inci persegi': 1550
    },
    volume: {
        'liter': 1,
        'mililiter': 1000,
        'meter kubik': 0.001,
        'gallon': 0.264172,
        'quart': 1.05669,
        'pint': 2.11338,
        'cup': 4.22675,
        'ounce cairan': 33.814,
        'sendok makan': 66.6667,
        'sendok teh': 200
    },
    massa: {
        'kilogram': 1,
        'gram': 1000,
        'miligram': 1000000,
        'ton': 0.001,
        'pound': 2.20462,
        'ounce': 35.274
    },
    kecepatan: {
        'meter/detik': 1,
        'kilometer/jam': 3.6,
        'mil/jam': 2.23694,
        'knot': 1.94384,
        'kaki/detik': 3.28084
    },
    waktu: {
        'detik': 1,
        'menit': 0.0166667,
        'jam': 0.000277778,
        'hari': 1.1574e-5,
        'minggu': 1.6534e-6,
        'bulan': 3.8052e-7,
        'tahun': 3.1689e-8
    },
    suhu: {
        'Celsius': 'C',
        'Fahrenheit': 'F',
        'Kelvin': 'K'
    }
};

kategoriSelect.addEventListener('change', () => {
    const kategori = kategoriSelect.value;
    if (kategori) {
        unitConverterDiv.style.display = 'block';
        populateUnits(kategori);
    } else {
        unitConverterDiv.style.display = 'none';
    }
    resultDiv.textContent = '';
    inputValue.value = '';
});

function populateUnits(kategori) {
    unitFromSelect.innerHTML = '';
    unitToSelect.innerHTML = '';
    const unitKeys = Object.keys(units[kategori]);
    unitKeys.forEach(unit => {
        const optionFrom = document.createElement('option');
        optionFrom.value = unit;
        optionFrom.textContent = unit;
        unitFromSelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = unit;
        optionTo.textContent = unit;
        unitToSelect.appendChild(optionTo);
    });
}

convertBtn.addEventListener('click', () => {
    const kategori = kategoriSelect.value;
    const fromUnit = unitFromSelect.value;
    const toUnit = unitToSelect.value;
    const value = parseFloat(inputValue.value);

    if (isNaN(value)) {
        resultDiv.textContent = 'Masukkan nilai yang valid!';
        return;
    }

    let result;
    if (kategori === 'suhu') {
        result = convertTemperature(value, fromUnit, toUnit);
    } else {
        const fromFactor = units[kategori][fromUnit];
        const toFactor = units[kategori][toUnit];
        result = (value / fromFactor) * toFactor;
        result = result.toFixed(4);
    }

    resultDiv.textContent = `${value} ${fromUnit} = ${result} ${toUnit}`;
});

function convertTemperature(value, from, to) {
    let result;
    if (from === to) {
        result = value;
    } else if (from === 'Celsius') {
        if (to === 'Fahrenheit') {
            result = (value * 9/5) + 32;
        } else if (to === 'Kelvin') {
            result = value + 273.15;
        }
    } else if (from === 'Fahrenheit') {
        if (to === 'Celsius') {
            result = (value - 32) * 5/9;
        } else if (to === 'Kelvin') {
            result = (value - 32) * 5/9 + 273.15;
        }
    } else if (from === 'Kelvin') {
        if (to === 'Celsius') {
            result = value - 273.15;
        } else if (to === 'Fahrenheit') {
            result = (value - 273.15) * 9/5 + 32;
        }
    }
    return result.toFixed(2);
}
