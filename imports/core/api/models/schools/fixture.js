import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

import { Schools } from './collection';

Meteor.startup(() => {
  if (Meteor.isDevelopment && Schools.find().count() === 0) {
    const path = Assets.absoluteFilePath('Schools.xlsx');
    const workbook = XLSX.readFile(path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    let row = 2;
    let name = true;
    while (name) {
      const cellName = worksheet[`I${row}`];
      const cellCity = worksheet[`D${row}`];
      name = cellName && cellName.v || false;
      const city = cellCity && cellCity.v || false;
      if (city) {
        Schools.insert({ name, city });
      }
      row += 1;
    }
    console.log(row);
  }
});
