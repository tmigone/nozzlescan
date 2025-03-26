import Link from "next/link"
import { Search, ArrowRight, ArrowDown, Copy, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getAddressById, getTimeAgo, ethPrice } from "@/lib/data"

export default function AddressPage({ params }: { params: { id: string } }) {
  const addressId = params.id

  // Get address data from our mock data
  const address = getAddressById(addressId)

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
          <h1 className="text-2xl font-bold">Address</h1>
          <div className="flex items-center mt-2 break-all">
            {addressId}
            <Button variant="ghost" size="sm" className="ml-2">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <QrCode className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Overview:</div>
                <div className="font-medium text-xl">{address.balance} ETH</div>
                <div className="text-sm text-gray-500">
                  ${address.ethValue} (@ ${ethPrice.toLocaleString()}/ETH)
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">ETH Value:</div>
                  <div className="font-medium">${address.ethValue}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Token Holdings:</div>
                  <div className="font-medium">
                    <Link href="#" className="text-blue-600 hover:text-blue-800">
                      View Tokens
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="transactions" className="mb-6">
          <TabsList className="grid grid-cols-4 md:w-auto md:inline-grid">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="internal">Internal Txns</TabsTrigger>
            <TabsTrigger value="erc20">ERC-20 Tokens</TabsTrigger>
            <TabsTrigger value="nft">NFT Transfers</TabsTrigger>
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
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Txn Hash</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Block</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Age</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">From</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500"></th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">To</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Value</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Txn Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {address.transactions && address.transactions.map((tx, i) => {
                        const timeAgo = getTimeAgo(tx.timestamp)
                        const isOutgoing = tx.from === addressId

                        return (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <Link href={`/tx/${tx.hash}`} className="text-blue-600 hover:text-blue-800">
                                {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 8)}
                              </Link>
                            </td>
                            <td className="px-4 py-3">
                              <Link href={`/block/${tx.blockNumber}`} className="text-blue-600 hover:text-blue-800">
                                {tx.blockNumber}
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">{timeAgo}</td>
                            <td className="px-4 py-3">
                              {isOutgoing ? (
                                <span className="font-medium">
                                  {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}
                                </span>
                              ) : (
                                <Link href={`/address/${tx.from}`} className="text-blue-600 hover:text-blue-800">
                                  {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}
                                </Link>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {isOutgoing ? (
                                <ArrowRight className="h-4 w-4 text-red-500" />
                              ) : (
                                <ArrowDown className="h-4 w-4 text-green-500" />
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {!isOutgoing ? (
                                <span className="font-medium">
                                  {tx.to.substring(0, 6)}...{tx.to.substring(tx.to.length - 4)}
                                </span>
                              ) : (
                                <Link href={`/address/${tx.to}`} className="text-blue-600 hover:text-blue-800">
                                  {tx.to.substring(0, 6)}...{tx.to.substring(tx.to.length - 4)}
                                </Link>
                              )}
                            </td>
                            <td className="px-4 py-3">{tx.value} ETH</td>
                            <td className="px-4 py-3">{tx.txnFee} ETH</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination className="mt-6">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="internal">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 text-center py-8">No internal transactions found</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="erc20">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 text-center py-8">No ERC-20 token transfers found</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="nft">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 text-center py-8">No NFT transfers found</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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

