import { join } from 'path'
import { readdirSync } from 'fs'
import { build, analyzeMetafile } from 'esbuild'

async function main() {
    const entryPoints = readdirSync('src')
        .filter(x => !x.includes('__snapshots__') && !x.includes('.test.js'))
        .map(x => join('src', x))

    const result = await build({
        entryPoints,
        outdir: 'dist',
        bundle: true,
        minify: true,
        platform: 'neutral',
        target: ['es2022'],
        sourcemap: true,
        metafile: true
    })

    console.log(await analyzeMetafile(result.metafile))
}

main()
