import { defineDataset } from 'project-nozzle'

export default defineDataset((ctx) => ({
    name: "transfers_eth_mainnet",
    version: "0.1.0",
    dependencies: {
        eth_rpc: {
            owner: "graphprotocol",
            name: "eth_rpc",
            version: "0.1.0",
        },
    },
    tables: {
        erc20_transfers: {
            sql: `select t.block_num,
                t.timestamp,
                t.event['from'] as from,
                t.event['to'] as to,
                t.event['value'] as value,
                t.address as contract_address
    from(select l.block_num,
                l.timestamp,
                evm_decode(l.topic1, l.topic2, l.topic3, l.data, 'Transfer(address indexed from, address indexed to, uint256 value)') as event,
                l.address
            from eth_rpc.logs l
            where l.topic0 = evm_topic('Transfer(address indexed from, address indexed to, uint256 value)')) t
`
        },
    },
    udfs: {}
}));
