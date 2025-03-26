import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getBlocksData, getTimeAgo } from "@/lib/data"

export default async function BlocksPage() {
  // Replace the mock data declaration with this line
  const blocks = await getBlocksData()

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
        <Card>
          <CardHeader>
            <CardTitle>Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Block</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Age</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Txn</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fee Recipient</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Gas Used</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Gas Limit</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Reward</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {blocks.map((block) => {
                    const timeAgo = getTimeAgo(block.timestamp)
                    return (
                      <tr key={block.block_num} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <Link href={`/block/${block.block_num}`} className="text-blue-600 hover:text-blue-800">
                            {block.block_num}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{timeAgo}</td>
                        <td className="px-4 py-3 text-sm">{block.txns}</td>
                        <td className="px-4 py-3 text-sm">
                          <Link href={`/address/0x${block.miner}`} className="text-blue-600 hover:text-blue-800">
                            0x{block.miner.substring(0, 4)}...{block.miner.substring(block.miner.length - 4)}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {(block.gas_used / 1000000).toFixed(2)}M ({((block.gas_used / block.gas_limit) * 100).toFixed(2)}
                          %)
                        </td>
                        <td className="px-4 py-3 text-sm">{(block.gas_limit / 1000000).toFixed(2)}M</td>
                        <td className="px-4 py-3 text-sm">{block.reward} ETH</td>
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
                  <PaginationLink href="#">2</PaginationLink>
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

