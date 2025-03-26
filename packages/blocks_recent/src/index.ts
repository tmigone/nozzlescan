import { build, deploy_local } from 'project-nozzle'
import dataset from './dataset'
import * as path from 'path'

process.env.NOZZLE_REGISTRY_SERVICE_URL = 'http://192.168.0.24:1611'

async function main() {
    const out_dir = path.resolve(__dirname, "nozzle_dist")
    const manifest_path = await build(dataset, out_dir)
    await deploy_local(manifest_path, 'http://192.168.0.24:1610')
}

main().catch(console.error)
