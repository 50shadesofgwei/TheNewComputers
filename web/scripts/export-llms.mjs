import { mkdir, writeFile, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
const SITE = 'https://www.thenewcomputers.com'

const PAGES = [
  { module: '/src/Home.tsx', out: 'index.md', title: 'Cheap Quantum Computers' },
  { module: '/src/App.tsx', out: 'mission.md', title: 'Out of the Lab and Into the Factory' },
  { module: '/src/Blueprint.tsx', out: 'blueprints.md', title: 'Blueprints' },
  {
    module: '/src/DiamondQpu.tsx',
    out: 'blueprints/diamond-qpu.md',
    title: 'Diamond QPU v2.1',
  },
  { module: '/src/Team.tsx', out: 'team.md', title: 'Team' },
  { module: '/src/Contact.tsx', out: 'join.md', title: 'Join Pathfinder' },
]

function absUrl(href) {
  if (!href) return ''
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('#')
  ) {
    return href
  }
  return href.startsWith('/') ? SITE + href : `${SITE}/${href}`
}

function decode(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCharCode(Number.parseInt(n, 16)),
    )
}

function stripTag(html, tag) {
  const re = new RegExp(`<${tag}(\\s[^>]*)?>[\\s\\S]*?</${tag}>`, 'gi')
  return html.replace(re, '')
}

function stripAriaHidden(html) {
  let prev = ''
  let out = html
  while (out !== prev) {
    prev = out
    out = out.replace(
      /<([a-zA-Z][\w:-]*)([^>]*\saria-hidden="true"[^>]*)>([\s\S]*?)<\/\1>/g,
      '',
    )
  }
  return out
}

function cellText(html) {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  )
}

function convertTables(html) {
  return html.replace(/<table[\s\S]*?<\/table>/gi, (table) => {
    const rows = [...table.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((m) => {
      const cells = [...m[0].matchAll(/<t[hd][\s\S]*?<\/t[hd]>/gi)].map((c) =>
        cellText(c[0]),
      )
      return `| ${cells.join(' | ')} |`
    })
    if (rows.length === 0) return ''
    const cols = (rows[0].match(/\|/g) || []).length - 1
    const sep = `| ${Array.from({ length: cols }, () => '---').join(' | ')} |`
    return `\n\n${rows[0]}\n${sep}\n${rows.slice(1).join('\n')}\n\n`
  })
}

function htmlToMarkdown(html) {
  let md = html
  md = stripTag(md, 'script')
  md = stripTag(md, 'style')
  md = stripTag(md, 'header')
  md = stripAriaHidden(md)
  md = md.replace(/<link\b[^>]*>/gi, '')
  md = md.replace(/<!--[\s\S]*?-->/g, '')
  md = md.replace(
    /<(header|aside|section|article|figure|figcaption|div|h[1-6]|p|ul|ol|table|blockquote|pre)(\s|>)/gi,
    '\n<$1$2',
  )
  md = md.replace(
    /<\/(header|aside|section|article|figure|figcaption|div|h[1-6]|p|ul|ol|table|blockquote|pre)>/gi,
    '</$1>\n',
  )
  md = convertTables(md)

  md = md.replace(
    /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_, code) => `\n\n\`\`\`\n${decode(code.replace(/<[^>]+>/g, ''))}\n\`\`\`\n\n`,
  )
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, code) => {
    return `\n\n\`\`\`\n${decode(code.replace(/<[^>]+>/g, ''))}\n\`\`\`\n\n`
  })

  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `\n\n# ${cellText(t)}\n\n`)
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n\n## ${cellText(t)}\n\n`)
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n\n### ${cellText(t)}\n\n`)
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `\n\n#### ${cellText(t)}\n\n`)

  md = md.replace(
    /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,
    (_, inner) =>
      `\n\n${cellText(inner)
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n')}\n\n`,
  )

  md = md.replace(
    /<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*>/gi,
    (_, alt, src) => `\n\n![${decode(alt)}](${absUrl(src)})\n\n`,
  )
  md = md.replace(
    /<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi,
    (_, src, alt) => `\n\n![${decode(alt)}](${absUrl(src)})\n\n`,
  )

  md = md.replace(
    /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, href, text) => `[${cellText(text) || absUrl(href)}](${absUrl(href)})`,
  )

  md = md.replace(/<li\b[^>]*>/gi, '\n- ')
  md = md.replace(/<\/li>/gi, '\n')
  md = md.replace(/<\/(ul|ol)>/gi, '\n')
  md = md.replace(/<(ul|ol)[^>]*>/gi, '\n')

  md = md.replace(/<br\s*\/?>/gi, '\n')
  md = md.replace(/<p[^>]*>/gi, '\n\n')
  md = md.replace(/<\/p>/gi, '\n\n')
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
  md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*')
  md = md.replace(/<sup[^>]*>([\s\S]*?)<\/sup>/gi, '^$1')
  md = md.replace(/<sub[^>]*>([\s\S]*?)<\/sub>/gi, '_$1')
  md = md.replace(/<span\b[^>]*>/gi, ' ')
  md = md.replace(/<\/span>/gi, ' ')
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
  md = md.replace(/\[[^\]]*\]\(#[^)]*\)/g, '')
  md = md.replace(/<[^>]+>/g, '')
  md = decode(md)
  md = md.replace(/\)\[/g, ') [')
  md = md.replace(/[ \t]+\n/g, '\n')
  md = md.replace(/[ \t]{2,}/g, ' ')
  md = md.replace(/\n{3,}/g, '\n\n')
  return md.trim() + '\n'
}

function withTitle(title, body) {
  if (body.startsWith('# ')) return body
  return `# ${title}\n\n${body}`
}

const INDEX = `# Cheap Quantum Computers

> Pathfinder Quantum (The New Computers) builds cheap, manufacturable quantum computers.

The visual site is a JavaScript app. Agents should read the markdown pages listed in [llms.txt](${SITE}/llms.txt).

## Contents

- [Mission essay](${SITE}/mission.md) — Out of the Lab and Into the Factory
- [Diamond QPU spec](${SITE}/blueprints/diamond-qpu.md) — NV-centre tabletop quantum computer, v2.1
- [Blueprints](${SITE}/blueprints.md) — hardware designs
- [Team](${SITE}/team.md)
- [Join](${SITE}/join.md) — technical cofounder

Contact: [jonathan@pathfinderquantum.com](mailto:jonathan@pathfinderquantum.com)
`

const LLMS = `# Cheap Quantum Computers

> Pathfinder Quantum (The New Computers) is building cheap, manufacturable quantum computers. This site holds the mission essay and the hardware blueprints.

The human site is a client-rendered React app, so HTML routes are empty without JavaScript. Use the markdown pages below. They are generated from the same source as the visual pages.

## Pages

- [Site overview](${SITE}/index.md): What this project is and where the documents live
- [Mission](${SITE}/mission.md): Out of the Lab and Into the Factory — the full essay
- [Diamond QPU](${SITE}/blueprints/diamond-qpu.md): Pathfinder Diamond QPU v2.1, an NV-centre tabletop quantum computer on an RFSoC4x2 with silicon photonics
- [Blueprints](${SITE}/blueprints.md): Index of hardware designs

## Optional

- [Team](${SITE}/team.md): Recruiting posters
- [Join](${SITE}/join.md): Technical cofounder form
- [On-Chip Ion Trap paper](https://www.zk50.io/papers/pathfinder-pic-chip.pdf): Pathfinder PIC ion-trap design
- [Interactive 3D Diamond QPU bench](${SITE}/diamond-qpu-3d): Browser viewer, not a text document
`

const ROBOTS = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${SITE}/sitemap.xml
`

function sitemapXml(paths) {
  const urls = paths
    .map(
      (loc) => `  <url>
    <loc>${SITE}${loc}</loc>
  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  await mkdir(path.join(publicDir, 'blueprints'), { recursive: true })

  const bodies = []
  for (const page of PAGES) {
    const mod = await vite.ssrLoadModule(page.module)
    const Component = mod.default
    const html = renderToString(createElement(Component))
    const md =
      page.out === 'index.md'
        ? INDEX
        : withTitle(page.title, htmlToMarkdown(html))
    const dest = path.join(publicDir, page.out)
    await mkdir(path.dirname(dest), { recursive: true })
    await writeFile(dest, md, 'utf8')
    bodies.push({ out: page.out, md })
    console.log(`wrote public/${page.out} (${md.split(/\s+/).length} words)`)
  }

  await writeFile(path.join(publicDir, 'llms.txt'), LLMS, 'utf8')
  await writeFile(
    path.join(publicDir, 'llms-full.txt'),
    bodies.map((b) => b.md.trim()).join('\n\n---\n\n') + '\n',
    'utf8',
  )
  await writeFile(path.join(publicDir, 'robots.txt'), ROBOTS, 'utf8')
  await writeFile(
    path.join(publicDir, 'sitemap.xml'),
    sitemapXml([
      '/',
      '/mission',
      '/blueprints',
      '/blueprints/diamond-qpu',
      '/team',
      '/join',
      '/llms.txt',
      '/.well-known/llms.txt',
      '/index.md',
      '/mission.md',
      '/blueprints.md',
      '/blueprints/diamond-qpu.md',
      '/team.md',
      '/join.md',
    ]),
    'utf8',
  )

  await mkdir(path.join(publicDir, '.well-known'), { recursive: true })
  await writeFile(path.join(publicDir, '.well-known/llms.txt'), LLMS, 'utf8')

  try {
    await unlink(path.join(publicDir, 'mission.txt'))
  } catch {
    // old draft; ignore if already gone
  }
} finally {
  await vite.close()
}
