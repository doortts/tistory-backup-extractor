import unirest from 'unirest';

var location = [];
var files = [];
var filename = '001.png';

unirest.post('http://127.0.0.1:9000/files')
    .headers({
      'Content-Type': 'multipart/form-data',
      'Yona-Token': 'FUMwruLNFz0EAldNbXuMawqDl01gLp1XI0M7qPu1pX0='
    })
    .attach('filePath', __dirname + '/blog/attachments/' + filename) // Attachment
    .end(function (response) {
      location.push({ filename: filename, url: response.headers.location });
      console.log('...', response.headers);
      console.log('...', response.body);

      console.log( location[0].url.split('/')[2]);
      files.push(location[0].url.split('/')[2]);
      var data = {
        'title': 'Interstella ' + Math.random() * 10,
        'body': 'Good movie\n go!',
        'temporaryUploadFiles': files,
        'created': '1385697346'
      };
      unirest.post('http://127.0.0.1:9000/-_-api/v1/owners/doortts/projects/Test/posts')
          .headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Yona-Token': 'FUMwruLNFz0EAldNbXuMawqDl01gLp1XI0M7qPu1pX0='
          })
          .send(data)
          .end(function (response) {
            console.log(response.status);
            console.log(response.headers);
          });
    });




