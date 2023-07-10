const { upload } = require('./formStorage');
const creator = require('./creator.json');
const mongoose = require('mongoose');

const fs = require('fs');
const connectDB = require('./db');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJhZTU3YmZhNTNiYWU4ZDdiMzA0OTZjYzdiNzNmNWY1MWE2Njg5ZDk2YmVmYzM5ZTM1MDgzOGJlODViNGE0ODViMTRkNTZhMzBkZDEzNmViZjUyOGM2NmQzZDIzZTZlN2I2ZTE0YjcwZWNhNjZmNGE1YWJhOWYwMTYyYzBjYWMxZCIsImlhdCI6MTY4Nzk1MjY3NywiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.QPKPNurh4U_D_YezcNR7YBGZ7BOdWtalCsCknfeQgEY";

const { SpheronClient, ProtocolEnum } = require('@spheron/storage');
const client = new SpheronClient({ token });
const myUploadId = null; 


// connectDB();

const respSchema = new mongoose.Schema({
  id : String,
  key:String,
  questionId : String,
  key: String
});

const responseId = mongoose.model('responses', respSchema);



async function sendResponse(json) {
  console.log('json in create form ', json);
  const uploadId = await upload(json);

   // upload
  


   console.log("Uploaded id in formsubmit : ", uploadId);
   const forkey = await client.getUpload(uploadId);
  const myId = new responseId({ id: uploadId, questionId : json.questionId, key:forkey.protocolLink});



myId.save()
  .then(() => {
    console.log('Response saved successfully');
  })
  .catch((err) => {
    console.error(err);
  });



  // ?
  fs.unlinkSync('./creator.json');

  const appendedArray = creator.uploadIds.push(uploadId);
  const strigifyCreatorData = creator;
  console.log(JSON.stringify(strigifyCreatorData));
  fs.writeFileSync('./creator.json', JSON.stringify(creator), { 'flag': 'wx' });


}

module.exports = {
    sendResponse,
    responseId,
};