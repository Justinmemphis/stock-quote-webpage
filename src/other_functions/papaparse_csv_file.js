import React from 'react'

import { usePapaParse } from 'react-papaparse'

const fs = require('fs')
const csvFilePath = '../controllers/nasdaq_screener_061322.csv'
const file = fs.createReadStream(csvFilePath)

export default function ReadRemoteFile() {
  const { readRemoteFile } = usePapaParse()

  const handleReadRemoteFile = () => {
    readRemoteFile(file, {
      complete: (results) => {
        console.log('-------------------')
        console.log('Results:', results)
        console.log('-------------------')
      }
    })
  }

  return <button onClick={() => handleReadRemoteFile()}>readRemoteFile</button>
}
