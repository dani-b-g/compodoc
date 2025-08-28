const fs = require('fs-extra');

fs.copySync('src/data/api-list.json', 'dist/src/data/api-list.json');

