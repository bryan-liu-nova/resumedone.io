import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import AWS from 'aws-sdk';

const { region, accessKeyId, secretAccessKey, Bucket } = Meteor.settings.private.s3;

AWS.config.update({ region, accessKeyId, secretAccessKey });

const S3 = new AWS.S3({
  params: { Bucket },
});

const storeS3 = ({ stream, filename }) => {
  const id = Random.id();
  const path = `${id}-${filename}`;
  return new Promise((resolve, reject) => S3.upload({
    Key: path,
    Body: stream,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'image/png',
  }, (err, data) => {
    if (err) {
      console.log(err);
      reject(err);
    }
    resolve(data);
  }),
  );
};

export const processUpload = async upload => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const { Location } = await storeS3({ stream, filename });
  return Location;
};

export const processUploadImage = async image => {
  const filename = 'photo.png';
  const stream = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""),'base64');
  const { Location } = await storeS3({ stream, filename });
  return Location;
};
