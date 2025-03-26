import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getHomePageData, getTimeAgo } from "@/lib/data"

export default async function Home() {
  const homePageData = await getHomePageData()
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                NozzleScan
              </Link>
              <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">Mainnet</Badge>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/blocks" className="text-gray-600 hover:text-blue-600">
                Blockchain
              </Link>
              <Link href="/tokens" className="text-gray-600 hover:text-blue-600">
                Tokens
              </Link>
              <Link href="/nfts" className="text-gray-600 hover:text-blue-600">
                NFTs
              </Link>
              <Link href="/stats" className="text-gray-600 hover:text-blue-600">
                Stats
              </Link>
              <Button variant="outline" className="text-blue-600 border-blue-600">
                Connect
              </Button>
            </div>
          </div>
          <div className="mt-4 flex">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Button className="ml-2 bg-blue-600 hover:bg-blue-700">Search</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Ethereum Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-2xl font-bold">${homePageData.stats.ethPrice.toLocaleString()}</span>
                <Badge className="ml-2 bg-green-100 text-green-800">{homePageData.stats.ethPriceChange}</Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">@ {homePageData.stats.btcRatio} BTC</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Market Cap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-2xl font-bold">{homePageData.stats.marketCap}</span>
                <Badge className="ml-2 bg-green-100 text-green-800">{homePageData.stats.marketCapChange}</Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">Updated 2 mins ago</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="latest-blocks">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="latest-blocks">Latest Blocks</TabsTrigger>
              <TabsTrigger value="latest-transactions">Latest Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="latest-blocks" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {homePageData.latestBlocks.map((block, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div>
                          <div className="flex items-center">
                            <div className="bg-blue-100 text-blue-800 rounded-md p-2 mr-3">
                              <span className="font-medium">Bk</span>
                            </div>
                            <div>
                              <Link
                                href={`/block/${block.block_num}`}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                {block.block_num}
                              </Link>
                              <p className="text-sm text-gray-500">{getTimeAgo(block.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div>
                            <span className="text-sm">
                              Miner{" "}
                              <Link href={`/address/0x${block.miner}`} className="text-blue-600 hover:text-blue-800">
                                0x{block.miner.substring(0, 6)}...{block.miner.substring(block.miner.length - 4)}
                              </Link>
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">{block.txns ? block.txns : "N/A"} txns</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4 text-center">
                <Link href="/blocks" className="text-blue-600 hover:text-blue-800">
                  View all blocks →
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="latest-transactions" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {homePageData.latestTransactions && homePageData.latestTransactions.map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div>
                          <div className="flex items-center">
                            <div className="bg-blue-100 text-blue-800 rounded-md p-2 mr-3">
                              <span className="font-medium">Tx</span>
                            </div>
                            <div>
                              <Link href={`/tx/${tx.hash}`} className="text-blue-600 hover:text-blue-800 font-medium">
                                {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 8)}
                              </Link>
                              <p className="text-sm text-gray-500">{getTimeAgo(tx.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">
                            From{" "}
                            <Link href={`/address/${tx.from}`} className="text-blue-600 hover:text-blue-800">
                              {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500">{tx.value} ETH</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4 text-center">
                <Link href="/txs" className="text-blue-600 hover:text-blue-800">
                  View all transactions →
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-lg font-bold text-blue-600">NozzleScan</h3>
              <p className="text-sm text-gray-600 mt-2">© 2025 NozzleScan</p>
            </div>
            <div className="mt-4 md:mt-0">
              <h4 className="font-medium">Resources</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                  API Documentation
                </Link>
                <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                  Knowledge Base
                </Link>
                <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                  Newsletter
                </Link>
                <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                  Network Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

