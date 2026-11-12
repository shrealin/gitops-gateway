import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

// Check both authored content and generated pages/search bundles. This is a
// backstop for common identifiers, not a replacement for publication review.
const rules = [
  {
    label: 'private IPv4 address',
    pattern: /(?<![\d.])(?:10(?:\.\d{1,3}){3}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2}|192\.168(?:\.\d{1,3}){2})(?:\/\d{1,2})?(?![\d.])/u,
  },
  {
    label: 'cloud account ARN',
    pattern: /acs:(?:ram|sts)::\d{12,20}:/u,
  },
  {
    label: 'specific legal entity or business division',
    pattern: /[\p{Script=Han}]{2,}(?:股份有限公司|有限责任公司|有限公司|事业部)/u,
  },
  {
    label: 'private key or cloud credential',
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bLTAI[A-Za-z0-9]{12,}\b/u,
  },
]

const textExtensions = new Set(['.md', '.vue', '.ts', '.mts', '.js', '.json', '.html', '.css', '.svg', '.txt'])
const generatedDirectories = new Set(['dist', 'cache', '.temp'])

async function collect(directory, source) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      if (source && generatedDirectories.has(entry.name)) continue
      files.push(...await collect(file, source))
    } else if (textExtensions.has(path.extname(file))) files.push(file)
  }
  return files
}

const includeBuild = process.argv.includes('--built')
const files = ['README.md', ...await collect('docs', true)]
if (includeBuild) files.push(...await collect('docs/.vitepress/dist', false))

let issues = 0
for (const file of files) {
  const text = await readFile(file, 'utf8')
  for (const rule of rules) {
    if (!rule.pattern.test(text)) continue
    // Do not print the matched value into a public CI log.
    console.error(`${file}: remove ${rule.label} before publishing`)
    issues++
  }
}

if (issues) {
  console.error(`Public content check failed (${issues} finding(s)).`)
  process.exitCode = 1
} else {
  console.log(`Public content check passed (${files.length} source/build files).`)
}
