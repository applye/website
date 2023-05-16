const fs = require('fs');
const path = require("path");
const pathUrl = './source/_posts';
const fileList = fs.readdirSync('./source/_posts');
for(let file of fileList) {
  let filePath = path.join(pathUrl, file);
  if(fs.existsSync(filePath)) {
    const fileStr = fs.readFileSync(filePath, 'utf-8').toString();
    const str = fileStr.replaceAll('https://cdn.jsdelivr.ren/gh/879733672/images@cdn/img/', 'https://raw.githubusercontent.com/879733672/images/cdn/img/');
    fs.writeFileSync(filePath, str);
  }
}