import { defineDataset } from 'project-nozzle'

export default defineDataset((ctx) => ({
    name: "blocks_recent",
    version: "0.1.0",
    dependencies: {
        eth_rpc: {
            owner: "graphprotocol",
            name: "eth_rpc",
            version: "0.1.0",
        },
    },
    tables: {
        blocks: {
            sql: `select * from eth_rpc.blocks where block_num > 20000000`
        },
    },
    udfs: {}
}));
