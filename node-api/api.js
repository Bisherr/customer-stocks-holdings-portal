const app = require('express')()
const xlsx = require('node-xlsx')
const camelCase = require('lodash.camelcase')

const port = 3003

// eslint-disable-next-line n/no-path-concat
const data = xlsx.parse(__dirname + '/assets/prototype_access.xlsx', {
  cellDates: true
})

const rawData = data[0]?.data
const pivotData = data[1]?.data

const convertToCamelCase = (item) => camelCase(item)

const rawDataKeyNames = rawData[0].map(convertToCamelCase)
const pivotDataKeyNames = pivotData[0].map(convertToCamelCase)

const extractObjectFromArray = (keys) => (row, rowIndex) => {
  const obj = { id: rowIndex + 1 }

  row.forEach((item, index) => {
    obj[keys[index]] = item
  })

  return obj
}

const filteredRawData = rawData
  .slice(1, rawData.length)
  .map(extractObjectFromArray(rawDataKeyNames))
const filteredPivotData = pivotData
  .slice(1, pivotData.length - 1)
  .map(extractObjectFromArray(pivotDataKeyNames))

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/data', (req, res) => res.status(200).send(filteredRawData))

app.get('/pivot', (req, res) => res.status(200).send(filteredPivotData))

app.listen(port, () => console.log('App is running'))
