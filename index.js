const yargs = require("yargs/yargs");
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const http = require('http')

let city = process.argv.slice(2)

const myAPIKey = process.env.myAPIKey   
const url = `http://api.weatherapi.com/v1/current.json?key=${myAPIKey}&q=${city}&aqi=no&lang=ru`

http.get(url, (res) => {
    const {statusCode} = res
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`)
        return
    }

    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rowData)
        console.log(`Текущая температура:${parseData.current.temp_c}`)
        console.log(parseData.current.condition.text)
        console.log(`Скорость ветра:${parseData.current.wind_kph} км/ч`)
    })
}).on('error', (err) => {
    console.error(err)
})
