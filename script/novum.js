import fetch from 'node-fetch';
import fs from 'fs';

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

    // console.log("Levels are", levels)
    return levels;
}

function getCompetenciesRow(cells, levels) {
    let level1Row = levels['1'].start,
        currentRow = level1Row,
        previous;

    while (previous = cells[currentRow - 1][1] != "Tracks") { currentRow-- };
    // console.log("Competencies Row is ", currentRow)
    return currentRow;
}

function asConstant(string) {
    return string.toUpperCase().replace(/\s+/, '_');
}

function getCompetencies(row, category) {
    let competencies = {}
    row.forEach((value, index) => {
        const key = asConstant(value || "");
        if (key && !competencies[key]) {
            competencies[key] = {
                "displayName": value,
                "column": index,
                "category": category
            };
        }
    })
    // console.log("Competencies", competencies);
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
                let behaviour, practice;
                if (behaviour = cells[row][competency.column]) {
                    milestone.signals.push(behaviour);
                }
                if (practice = cells[row][competency.column + 1]) {
                    milestone.examples.push(practice);
                }
            }
            // console.log("Milestone", milestone);
            competency.milestones.push(milestone);
        })
    }

    // console.log("Competencies", competencies)
}

function getCompetenciesFor(sheets, sheetTitle) {

    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: sheetTitle + '!A1:X',
        }, (err, res) => {
            if (err) reject(err);
            const cells = res.data.values;
            let competencies;
            if (cells.length) {

                let levels = getLevels(cells)

                //Fetch Competencies
                let competenciesRow = getCompetenciesRow(cells, levels);
                competencies = getCompetencies(cells[competenciesRow], sheetTitle);

                hydrateCompetencies(cells, levels, competencies);

            } else {
                competencies = {};
            }
            resolve(competencies);
        });
    });
}

function doEverything(google, auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    Promise.all(
        ['Executing', 'Changing', 'Mentoring', 'Eng Fundamentals', 'Eng Building'].map(sheetTitle => getCompetenciesFor(sheets, sheetTitle))
    ).then(values => {
        return values.reduce((acc, current) => {
            console.log("ACC", acc);
            console.log("CURRENT", current);
            return Object.assign(acc, current);
        })
    }).then(competencies => {
        return new Promise((resolve, reject) => {

            let keys = Object.keys(competencies);

            let asString = "export const novumKeys = " + JSON.stringify(keys, null, 2) + "\n\n" +
                "export const novumTracks = " + JSON.stringify(competencies, null, 2);
            console.log(asString);
            fs.writeFile("novumConstants.js", asString, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    });
}

withGoogle(doEverything);

