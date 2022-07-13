/*
import React from 'react';
import { useState, useEffect } from 'react';

const Papa = require('papaparse')
const fs = require('fs')
const csvFilePath = './nasdaq_screener_061322.csv'

let csvData = []
Papa.parse(file, {
  header: true,
  step: function(result) {
    csvData.push(result.data)
  },
  complete: function(results, file) {
    console.log('Complete', csvData.length, 'records.')
  }
})

function StockSymbolLookup() {
  let userCompany = req.body.company_name_button
  try {
    let newAnswer = csvData.find(x => x.Name.toLowerCase().includes(userCompany.toLowerCase()))
    return res.json({
      'Your Input': userCompany,
      'Company Name': newAnswer.Name,
      'Stock Symbol': newAnswer.Symbol
    })
  } catch (err) {
    console.log('Error - catch block')
    res.json({
      'Your Input': userCompany,
      'Error': 'No such company found.'
    })
  }
}

export default StockSymbolLookup
*/
