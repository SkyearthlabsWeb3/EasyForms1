const { upload } = require('./formStorage');
const creator = require('./creator.json');
const mongoose = require('mongoose');

const fs = require('fs');
const connectDB = require('./db');

const myUploadId = null; 


connectDB();

const collect = new mongoose.Schema({
  id : String,
  heading : String,
  userId: String,
});

const idCollection = mongoose.model('model', collect);



async function createForm(json) {
  
  console.log('json in create form ', json);
  const heading  = json.heading;

  const uploadId = await upload(json);

  

   // upload
  


   console.log("Uploaded id in formsubmit : ", uploadId);
  const myId = new idCollection({ id: uploadId , heading : heading, userId: json.userId})



myId.save()
  .then(() => {
    console.log('Document saved successfully');
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

  return uploadId;

}

module.exports = {
  createForm,
  idCollection,
 
};