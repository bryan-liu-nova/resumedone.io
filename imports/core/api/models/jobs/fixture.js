import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

import { Jobs } from './collection';

Meteor.startup(() => {
  if (Meteor.isDevelopment && Jobs.find().count() === 0) {
    const path = Assets.absoluteFilePath('Skillswizedit.xlsx');
    const workbook = XLSX.readFile(path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    let row = 2;
    let title = true;
    while (title) {
      const cellJob = worksheet[`C${row}`];
      title = cellJob && cellJob.v || false;
      if (title) {
        Jobs.upsert({ title }, { $set: { title } });
      }
      row += 1;
    }
  }
});
