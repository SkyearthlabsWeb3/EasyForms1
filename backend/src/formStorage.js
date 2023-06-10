const { SpheronClient, ProtocolEnum } = require('@spheron/storage');

const fs = require('fs');

// const spheronToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJjYmRhZmRmN2YwYzkxODhjNWU2NmMzZjcxYzA5ODY1MGFkODcyMjRiOTY5ZjFjNzE1ZjIyYjUxNDdjZjNlOGE3YjNiNGIzNjlmNmUyYWMyNDY5MmNjYzVmMDU1OTJiMGY1OWVlMjI3MTI5YTYyYmM2ODQ1NjlmMzA1ZDY3YjFkZSIsImlhdCI6MTY4MjMyOTI1MCwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.r5AvsUSs1o5HGMe5jonEizBR062yr2uVQ2eG0V64yec";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiI3NWZjMDA3MTFkNzA3MGZmOTc1MDliNGE0OTNmOWZmOWE2N2U5MWFmYjkxODZiMjQ4YTFmMjhhNDg3OTM2ZjdhYmViOTlhNTllZTYwZDJmMWJmYmYxNjU0M2FiZDU3MTliMzAxMzQ3YTJlMDk1MTFjZjRmZDg5NWI4ZTNkZTQzYiIsImlhdCI6MTY4MjUxNjI0NCwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.KiJH_8TaOe8--jjJ9fddnPGq2FyC4szbLa-lPe0gWy0";

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