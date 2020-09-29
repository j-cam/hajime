var ghpages = require('gh-pages');

const myArgs = process.argv.slice(2);
console.log(`===========${myArgs[0]}=========`);


ghpages.publish('docs', {
  branch: 'prod',
  message: myArgs[0],
});


