import React from 'react'
import { usePapaParse } from 'react-papaparse'
import fs from 'fs'
const csvFilePath = 'nasdaq_screener_061322.csv'
const file = fs.createReadStream(csvFilePath)


export function ReadRemoteFile() {
  const { readRemoteFile } = usePapaParse

  const handleReadRemoteFile = () => {
    readRemoteFile(file, {
      step: (row) => {
        console.log('Row:', row.data)
      },
      complete: (results) => {
        console.log('Reults:', results)
      }
    })
  }

  return <button onClick={() => handleReadRemoteFile()}>readRemoteFile</button>
}
