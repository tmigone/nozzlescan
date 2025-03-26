
const NOZZLE_REGISTRY_SERVICE_URL = process.env.NOZZLE_REGISTRY_SERVICE_URL ?? "https://nozzle.capitanbeto.xyz"

const QUERY_BLOCKS ='select * from blocks_recent.blocks order by timestamp desc limit 10'
const QUERY_BLOCK_BY_ID = 'select * from blocks_recent.blocks where block_num = ?'

async function executeQuery(query: string) {
  const headers = new Headers({
    "Content-Type": "text/plain",
  });

  const response = await fetch(NOZZLE_REGISTRY_SERVICE_URL, {
    method: "POST",
    body: query,
    headers,
  });

  const rawText = await response.text();
  const data = parseJSONLines(rawText);

  return data
}

// Generate a random Ethereum address
export function generateAddress(): string {
  return `0x${Math.random().toString(16).slice(2, 42)}`
}

// Generate a random transaction hash
export function generateTxHash(): string {
  return `0x${Math.random().toString(16).slice(2, 66)}`
}

// Generate a random block hash
export function generateBlockHash(): string {
  return `0x${Math.random().toString(16).slice(2, 66)}`
}

// Calculate time ago from a date
export function getTimeAgo(date: string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)

  if (seconds < 60) return `${seconds} secs ago`

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} mins ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hrs ago`

  const days = Math.floor(hours / 24)
  return `${days} days ago`
}

// Current ETH price
export const ethPrice = 3245.67

// Mock data for the home page
export const homePageData = {
  latestTransactions: [],
  stats: {
    ethPrice: ethPrice,
    ethPriceChange: "+2.34%",
    btcRatio: 0.06432,
    marketCap: "$389.45B",
    marketCapChange: "+1.87%",
  },
}

export async function getHomePageData() {
  const blocks = await getBlocksData()
  return {
    ...homePageData,
    latestBlocks: blocks,
  }
}

export const getBlocksData = async () => {
  return await executeQuery(QUERY_BLOCKS)
}

// Generate a block by ID
export async function getBlockById(id: string | number) {
  const blockNumber = typeof id === "string" ? Number.parseInt(id) : id
  return (await executeQuery(QUERY_BLOCK_BY_ID.replace('?', blockNumber.toString())))[0]
}

// Generate a transaction by ID
export function getTransactionById(id: string) {
  return {
    hash: id,
    status: "Success",
    blockNumber: 17173158,
    timestamp: new Date(Date.now() - Math.random() * 1000000),
    from: generateAddress(),
    to: generateAddress(),
    value: (Math.random() * 2).toFixed(4),
    transactionFee: (Math.random() * 0.01).toFixed(6),
    gasPrice: (Math.random() * 20 + 10).toFixed(2),
    gasLimit: Math.floor(Math.random() * 100000) + 21000,
    gasUsed: Math.floor(Math.random() * 100000) + 21000,
    nonce: Math.floor(Math.random() * 1000),
    input: `0x${Math.random().toString(16).slice(2, 200)}`,
  }
}

// Generate address data by ID
export function getAddressById(id: string) {
  return {
    address: id,
    balance: (Math.random() * 100).toFixed(4),
    ethValue: (Math.random() * 300000).toFixed(2),
    transactions: Array.from({ length: 20 }, (_, i) => ({
      hash: generateTxHash(),
      blockNumber: 17173158 - i,
      timestamp: new Date(Date.now() - i * 1000000),
      from: Math.random() > 0.5 ? id : generateAddress(),
      to: Math.random() > 0.5 ? generateAddress() : id,
      value: (Math.random() * 2).toFixed(4),
      txnFee: (Math.random() * 0.01).toFixed(6),
    })),
  }
}

export function parseJSONLines(jsonl: string): any[] {
  return jsonl
    .trim() // Remove extra spaces/newlines
    .split("\n") // Split by lines
    .map((line) => {
      try {
        return JSON.parse(line); // Parse each line as JSON
      } catch (error) {
        console.error("Invalid JSON:", line);
        return null; // Handle invalid JSON lines gracefully
      }
    })
    .filter((obj) => obj !== null); // Remove invalid lines
}

