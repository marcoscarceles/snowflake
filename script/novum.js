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

    let asArray = Object.entries(levels);
    asArray.forEach((entry, index) => {
        let [key, start] = entry;
        let end = (index < asArray.length - 1) ? levels[asArray[index + 1][0]] : cells.length
        levels[key] = { start: start, end: end }
    })

    console.log("Levels are", levels)
    return levels;
}

function getCompetenciesRow(cells, levels) {
    let level1Row = levels['1'].start,
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

function hydrateCompetencies(cells, levels, competencies) {

    let competenciesRow = getCompetenciesRow(cells, levels)

    for (let [key, competency] of Object.entries(competencies)) {

        // Description
        competency.description = cells[competenciesRow + 1][competency.column]

        // Milestones
        competency.milestones = competency.milestones || [];
        Object.values(levels).forEach(level => {
            let levelDescription = level.start,
                levelDetails = level.start + 2

            let milestone = {
                summary: "",
                signals: [],
                examples: []
            };
            milestone.summary = cells[level.start][competency.column]
            for (let row = levelDetails; row < level.end; row++) {
                let behaviour, practice
                if (behaviour = cells[row][competency.column]) {
                    milestone.signals.push(behaviour)
                }
                if (practice = cells[row][competency.column]) {
                    milestone.examples.push(practice)
                }
            }
            console.log("Milestone", milestone);
            competency.milestones.push(milestone)
        })
    }

    console.log("Competencies", competencies)
}

function generalExecutingRows(sheets) {
    sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Executing!A1:X',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const cells = res.data.values;
        if (cells.length) {

            let levels = getLevels(cells)

            //Fetch Competencies
            let competenciesRow = getCompetenciesRow(cells, levels);
            let competencies = getCompetencies(cells[competenciesRow]);

            hydrateCompetencies(cells, levels, competencies);

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
