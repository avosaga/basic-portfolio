module.exports = {
    env: {
        browser: true,
        es2021: true,
        "jest/globals": true
    },
    extends: ["standard"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["jest"],
    rules: {
        indent: ["error", 4],
        "space-before-function-paren": 0
    }
}
