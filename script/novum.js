import fetch from 'node-fetch';

import { withGoogle } from './google-adapter.js'

const SHEET_ID = '177yMyIl7Oxahb-iPu3nemjhTJ9sLl-t1svFjgoBaXaw';

function getLevels(cells) {
    let levels = {};

    cells.forEach((rowCells, row) => {
        if (rowCells[0] && !levels[rowCells[0]]) {
            levels[rowCells[0]] = row;
        }
    });

    console.log("Levels are", levels)
    return levels;
}

function getCompetenciesRow(cells, levels) {
    let level1Row = levels['1'],
        currentRow = level1Row,
        previous;

    while (previous = cells[currentRow - 1][1] != "Tracks") { currentRow-- };
    console.log("Competencies Row is ", currentRow)
    return currentRow;
}

function getCompetencies(row) {
    let competencies = {}
    row.forEach((value, index) => {
        if (value && !competencies[value]) {
            competencies[value] = {
                "displayName": value,
                "column": index,
            };
        }
    })
    console.log("Competencies", competencies);
    return competencies;
}

function generalExecutingRows(sheets) {
    sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'General - Executing!A1:X',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const cells = res.data.values;
        if (cells.length) {

            let levels = getLevels(cells)

            //Fetch Competencies
            let competenciesRow = getCompetenciesRow(cells, levels);
            let competencies = getCompetencies(cells[competenciesRow]);

        } else {
            console.log('No data found.');
        }
    });

}

function doEverything(google, auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    // getLevels(sheets);
    generalExecutingRows(sheets);
}

withGoogle(doEverything);
