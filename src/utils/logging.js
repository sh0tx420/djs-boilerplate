module.exports = {
    info: async function (content) {
        return process.stdout.write(`\u001b[1;32;1m[INFO] \u001b[0;1;37m${content}\u001b[0m\n`);
    },
    error: async function (content) {
        return process.stdout.write(`\u001b[1;31;1m[ERROR] \u001b[0;1;37m${content}\u001b[0m\n`);
    }
};
