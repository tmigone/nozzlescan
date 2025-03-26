import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getBlockById, getTimeAgo } from "@/lib/data"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"

export default async function BlockPage({ params }: { params: { id: string } }) {
  const blockId = params.id

  const block = await getBlockById(blockId)

  const timeAgo = getTimeAgo(block.timestamp)
  const formattedDate = block.timestamp.toLocaleString()

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
              <Link href="/blocks" className="text-blue-600 font-medium">
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Block #{block.block_num}</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Block Height:</div>
                  <div className="flex items-center">
                    <span className="font-medium">{block.block_num}</span>
                    <div className="flex items-center ml-4">
                      <Link href={`/block/${block.block_num - 1}`} className="text-blue-600 hover:text-blue-800 mr-2">
                        <Button variant="outline" size="sm">
                          &lt; Prev
                        </Button>
                      </Link>
                      <Link href={`/block/${block.block_num + 1}`} className="text-blue-600 hover:text-blue-800">
                        <Button variant="outline" size="sm">
                          Next &gt;
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Timestamp:</div>
                  <div className="font-medium">
                    {timeAgo} ({formattedDate})
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Transactions:</div>
                  <div className="font-medium">
                    <Link href="#transactions" className="text-blue-600 hover:text-blue-800">
                      {block.transactions ? block.transactions.length : "N/A"} transactions
                    </Link>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Fee Recipient:</div>
                  <div className="font-medium">
                    <Link href={`/address/0x${block.miner}`} className="text-blue-600 hover:text-blue-800">
                      0x{block.miner}
                    </Link>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Block Reward:</div>
                  <div className="font-medium">0.5 ETH</div>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Gas Used:</div>
                  <div className="font-medium">
                    {block.gas_used.toLocaleString()} ({((block.gas_used / block.gas_limit) * 100).toFixed(2)}%)
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Gas Limit:</div>
                  <div className="font-medium">{block.gas_limit.toLocaleString()}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Base Fee Per Gas:</div>
                  <div className="font-medium">{block.base_fee_per_gas} Gwei</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Hash:</div>
                  <div className="font-medium break-all">0x{block.hash}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Parent Hash:</div>
                  <div className="font-medium break-all">
                    <Link href={`/block/${block.block_num - 1}`} className="text-blue-600 hover:text-blue-800">
                      0x{block.parent_hash}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div id="transactions" className="mb-6">
          <Tabs defaultValue="transactions">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Transaction Hash</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">From</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">To</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Value</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {block.transactions && block.transactions.map((tx: { hash: string; from: string; to: string; value: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; fee: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }, i: Key | null | undefined) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <Link href={`/tx/${tx.hash}`} className="text-blue-600 hover:text-blue-800">
                                {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 8)}
                              </Link>
                            </td>
                            <td className="px-4 py-3">
                              <Link href={`/address/${tx.from}`} className="text-blue-600 hover:text-blue-800">
                                {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}
                              </Link>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <ArrowRight className="h-3 w-3 mr-2 text-gray-400" />
                                <Link href={`/address/${tx.to}`} className="text-blue-600 hover:text-blue-800">
                                  {tx.to.substring(0, 6)}...{tx.to.substring(tx.to.length - 4)}
                                </Link>
                              </div>
                            </td>
                            <td className="px-4 py-3">{tx.value} ETH</td>
                            <td className="px-4 py-3">{tx.fee} ETH</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comments">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-500 text-center py-8">No comments found for this block</p>
                </CardContent>
              </Card>
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

