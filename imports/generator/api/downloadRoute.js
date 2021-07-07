import { Meteor } from 'meteor/meteor';
import React from 'react';
import { WebApp } from 'meteor/webapp';
import { pdf } from '/imports/pdf/core/ui/atoms';

import templates from '/imports/pdf/core/api/templates';
import { Resumes } from '/imports/core/api/models/resumes/collection';
import '/imports/pdf/core/api/registerFonts';

WebApp.connectHandlers.use('/api/get-resume', (req, res) => {
  const [resumeId, downloadKey] = req.url.split('/').slice(Math.max(req.url.split('/').length - 2, 1));
  const resume = Resumes.findOne({ _id: resumeId });
  const user = Meteor.users.findOne({ 'serviceData.downloadKey': downloadKey });
  if (!user || resume.author !== user._id) {
    res.end('Not authorized');
    return;
  }
  if (!user.serviceData.subscriptionId) {
    res.end('Need paid plan');
    return;
  }
  const Template = templates['stockholm'];
  if (req.method === 'GET') {
    const stream = pdf(<Template resume={resume} />).toBuffer();
    const chunks = [];
    stream.on('data', function(chunk) {
      chunks.push(chunk);
    });
    stream.on('end', function(){
      const file = Buffer.concat(chunks);
      res.setHeader('Content-Disposition', `attachment; filename=${resume.name || 'resume'}.pdf`);
      res.setHeader('content-type', 'application/pdf');
      res.end(file);
    });
  }
});
