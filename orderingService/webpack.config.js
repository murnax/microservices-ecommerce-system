const path = require('path');
// This helper function is not strictly necessary.
// I just don't like repeating the path.join a dozen times.
function srcPath(subdir) {
    console.log(subdir);
    return path.join(__dirname, "./", subdir);
}
module.exports = {
    resolve: {
        alias: {
            repository: srcPath('repository'),
        },
        // ...
    },
    // ...
};