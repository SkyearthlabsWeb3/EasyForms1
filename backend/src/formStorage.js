const { SpheronClient, ProtocolEnum } = require('@spheron/storage');

const fs = require('fs');

// const spheronToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJjYmRhZmRmN2YwYzkxODhjNWU2NmMzZjcxYzA5ODY1MGFkODcyMjRiOTY5ZjFjNzE1ZjIyYjUxNDdjZjNlOGE3YjNiNGIzNjlmNmUyYWMyNDY5MmNjYzVmMDU1OTJiMGY1OWVlMjI3MTI5YTYyYmM2ODQ1NjlmMzA1ZDY3YjFkZSIsImlhdCI6MTY4MjMyOTI1MCwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.r5AvsUSs1o5HGMe5jonEizBR062yr2uVQ2eG0V64yec";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJhZTU3YmZhNTNiYWU4ZDdiMzA0OTZjYzdiNzNmNWY1MWE2Njg5ZDk2YmVmYzM5ZTM1MDgzOGJlODViNGE0ODViMTRkNTZhMzBkZDEzNmViZjUyOGM2NmQzZDIzZTZlN2I2ZTE0YjcwZWNhNjZmNGE1YWJhOWYwMTYyYzBjYWMxZCIsImlhdCI6MTY4Nzk1MjY3NywiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.QPKPNurh4U_D_YezcNR7YBGZ7BOdWtalCsCknfeQgEY";

const client = new SpheronClient({ token });

const filePath = "./temp/test1.json";

let currentlyUploaded = 0;

const name = "testUpload";


async function upload(form) {
  let up;
  // form = {"Lorem isoum dollar sit":["option 1","option 2"]};
  fs.unlinkSync(filePath);

  fs.writeFileSync('./temp/test1.json', JSON.stringify(form), {flag: 'wx'});

  // const stream = fs.createWriteStream('./test1.json');
  // console.log('form ', form);
  // stream.write(JSON.stringify(form));
  // stream.end();

 
  try{
  const {  bucketId, protocolLink, dynamicLinks } = await client.upload(
    filePath,
    {
      protocol: ProtocolEnum.IPFS, // Only works with IPFS and Filecoin uploads
      name,
      onUploadInitiated: (uploadId) => {
        console.log(`Upload with id ${uploadId} started...`);
        up = uploadId;
      },
      onChunkUploaded: (uploadedSize, totalSize) => {
        currentlyUploaded += uploadedSize;
        console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
      },
    }
  ); console.log(protocolLink);
  console.log("UploadId ::", up);
  } catch(error){
       console.log("error :" , error);
  }
   
 


 

  return up;

  // const response =  await client.getUpload("644a260f20277a0012e9a51d");
  // console.log('reponse : ',response);
}

module.exports = {
  upload,

}

// upload().then((res) => console.log(res)).catch((err) => console.log(err));

// Upload with id 644a260f20277a0012e9a51d started...
// Uploaded 66 of 66 Bytes.
//   undefined