import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

import { Suggestions } from './collection';
import { Jobs } from '../jobs/collection';

Meteor.startup(() => {
  // if (Meteor.isDevelopment && Suggestions.find().count() === 0) {
    [
      { file: 'Skillswizedit.xlsx', type: 'skill' },
      { file: 'Exwizedit.xlsx', type: 'experience' },
      { file: 'Edwizedit.xlsx', type: 'education' },
      { file: 'Summwizedit.xlsx', type: 'summary' },
    ].forEach(({ file, type }) => {
      if(Meteor.isDevelopment && Suggestions.find({ type }).count() === 0) {
        const path = Assets.absoluteFilePath(file);
        const workbook = XLSX.readFile(path);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let row = 2;
        let job = true;
        while (job) {
          const cellJob = worksheet[`C${row}`];
          const cellText = worksheet[`D${row}`];
          job = cellJob && cellJob.v || false;
          const text = cellText && cellText.v || false;
          if (text && text !== '') {
            Suggestions.insert({ text, job, type });
          }
          row += 1;
        }
        console.log(type, row);
      }
    });
  // }
});
