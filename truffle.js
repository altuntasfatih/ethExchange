module.exports = {
    contracts_build_directory: "./src/build",
    networks: {
        development: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*' // Match any network id
        }
    }
}
