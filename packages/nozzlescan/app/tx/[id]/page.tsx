import Link from "next/link"
import { Search, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTransactionById, getTimeAgo } from "@/lib/data"

export default function TransactionPage({ params }: { params: { id: string } }) {
  const txId = params.id

  // Get transaction data from our mock data
  const tx = getTransactionById(txId)

  const timeAgo = getTimeAgo(tx.timestamp)
  const formattedDate = tx.timestamp.toLocaleString()

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
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Transaction Details</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Transaction Hash:</div>
                <div className="font-medium break-all">{tx.hash}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Status:</div>
                <div className="flex items-center">
                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {tx.status}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Block:</div>
                <div className="font-medium">
                  <Link href={`/block/${tx.blockNumber}`} className="text-blue-600 hover:text-blue-800">
                    {tx.blockNumber}
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Timestamp:</div>
                <div className="font-medium">
                  {timeAgo} ({formattedDate})
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm text-gray-500 mb-1">From:</div>
                <div className="font-medium break-all">
                  <Link href={`/address/${tx.from}`} className="text-blue-600 hover:text-blue-800">
                    {tx.from}
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">To:</div>
                <div className="font-medium break-all">
                  <Link href={`/address/${tx.to}`} className="text-blue-600 hover:text-blue-800">
                    {tx.to}
                  </Link>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm text-gray-500 mb-1">Value:</div>
                <div className="font-medium">{tx.value} ETH</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Transaction Fee:</div>
                <div className="font-medium">{tx.transactionFee} ETH</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Gas Price:</div>
                <div className="font-medium">{tx.gasPrice} Gwei</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Gas Limit:</div>
                  <div className="font-medium">{tx.gasLimit.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Gas Used:</div>
                  <div className="font-medium">
                    {tx.gasUsed.toLocaleString()} ({((tx.gasUsed / tx.gasLimit) * 100).toFixed(2)}%)
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Nonce:</div>
                <div className="font-medium">{tx.nonce}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <pre className="text-xs">{tx.input}</pre>
            </div>
          </CardContent>
        </Card>
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

