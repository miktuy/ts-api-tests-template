module.exports = {
    require: [
        'ts-node/register',
        'dotenv/config'
    ],
    spec: './tests/**/*.test.ts',
    slow: 50000,
    timeout: 60000,
    reporter: 'mocha-multi-reporters',
    reporterOptions: [
        'configFile=reporterConfig.json'
    ]
}