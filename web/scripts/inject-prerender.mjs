import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SITE = 'https://www.thenewcomputers.com'

const ROUTES = [
  {
    out: 'index.html',
    title: 'Cheap Quantum Computers',
    canonical: `${SITE}/`,
    alternate: '/index.md',
    source: 'index.md',
  },
  {
    out: 'mission/index.html',
    title: 'Out of the Lab and Into the Factory — The New Computers',
    canonical: `${SITE}/mission`,
    alternate: '/mission.md',
    source: 'mission.md',
  },
  {
    out: 'blueprints/index.html',
    title: 'Blueprints — Cheap Quantum Computers',
    canonical: `${SITE}/blueprints`,
    alternate: '/blueprints.md',
    source: 'blueprints.md',
  },
  {
    out: 'blueprints/diamond-qpu/index.html',
    title: 'Diamond QPU — Cheap Quantum Computers',
    canonical: `${SITE}/blueprints/diamond-qpu`,
    alternate: '/blueprints/diamond-qpu.md',
    source: 'blueprints/diamond-qpu.md',
  },
  {
    out: 'team/index.html',
    title: 'Team — Cheap Quantum Computers',
    canonical: `${SITE}/team`,
    alternate: '/team.md',
    source: 'team.md',
  },
  {
    out: 'join/index.html',
    title: 'Join Pathfinder — Cheap Quantum Computers',
    canonical: `${SITE}/join`,
    alternate: '/join.md',
    source: 'join.md',
  },
]

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function inline(text) {
  return escapeHtml(text)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

function mdToHtml(md) {
  const chunks = []
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  let i = 0
  let para = []

  const flushPara = () => {
    if (!para.length) return
    chunks.push(`<p>${inline(para.join(' '))}</p>`)
    para = []
  }

  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('```')) {
      flushPara()
      const fence = []
      i += 1
      while (i < lines.length && !lines[i].startsWith('```')) {
        fence.push(lines[i])
        i += 1
      }
      chunks.push(`<pre><code>${escapeHtml(fence.join('\n'))}</code></pre>`)
      i += 1
      continue
    }
    if (/^\|/.test(line)) {
      flushPara()
      const rows = []
      while (i < lines.length && /^\|/.test(lines[i])) {
        const cells = lines[i]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim())
        if (!/^[-: ]+$/.test(cells.join(''))) rows.push(cells)
        i += 1
      }
      if (rows.length) {
        const head = rows[0]
        const body = rows.slice(1)
        chunks.push(
          `<table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body
            .map(
              (r) =>
                `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`,
            )
            .join('')}</tbody></table>`,
        )
      }
      continue
    }
    const heading = line.match(/^(#{1,4})\s+(.*)$/)
    if (heading) {
      flushPara()
      const level = heading[1].length
      chunks.push(`<h${level}>${inline(heading[2])}</h${level}>`)
      i += 1
      continue
    }
    if (line.startsWith('> ')) {
      flushPara()
      const quote = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quote.push(lines[i].slice(2))
        i += 1
      }
      chunks.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`)
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      flushPara()
      const items = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^[-*]\s+/, ''))}</li>`)
        i += 1
      }
      chunks.push(`<ul>${items.join('')}</ul>`)
      continue
    }
    if (line.trim() === '') {
      flushPara()
      i += 1
      continue
    }
    para.push(line.trim())
    i += 1
  }
  flushPara()
  return chunks.join('\n')
}

const shell = await readFile(path.join(dist, 'index.html'), 'utf8')

for (const route of ROUTES) {
  const md = await readFile(path.join(dist, route.source), 'utf8')
  const article = `<article class="llm-article">\n${mdToHtml(md)}\n</article>`
  let html = shell
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`,
  )
  html = html.replace(
    /<link rel="alternate"[^>]*>/,
    `<link rel="canonical" href="${route.canonical}" />\n    <link rel="alternate" type="text/markdown" title="Markdown" href="${route.alternate}" />`,
  )
  html = html.replace(
    /<div id="llm-fallback">[\s\S]*?<\/div>/,
    `<div id="llm-fallback">\n${article}\n    </div>`,
  )
  const dest = path.join(dist, route.out)
  await mkdir(path.dirname(dest), { recursive: true })
  await writeFile(dest, html, 'utf8')
  console.log(`wrote dist/${route.out}`)
}
