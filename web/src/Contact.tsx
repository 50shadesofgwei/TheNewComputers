import { useState, type ChangeEvent, type FormEvent } from 'react'
import './App.css'

const MAX_ANSWER_WORDS = 500
const MAX_NAME_LEN = 80
const MAX_LOCATION_LEN = 120
const MAX_EMAIL_LEN = 254
const JOIN_INBOX = 'jonathan@pathfinderquantum.com'
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${JOIN_INBOX}`

const QUESTIONS = [
  {
    name: 'hero',
    label: 'Who is your hero, and why?',
  },
  {
    name: 'truth',
    label: 'What important truth does hardly anyone agree with you on?',
  },
  {
    name: 'boldest',
    label: 'What is the boldest thing you’ve ever done?',
  },
] as const

const PATH = [
  { n: '01', title: 'Intro Call' },
  { n: '02', title: 'Work Session — Hardware Brainstorm' },
  { n: '03', title: 'Meet In Person' },
  { n: '04', title: '3-Month Test Run' },
  { n: '05', title: 'Found Company' },
] as const

function wordCount(text: string) {
  const parts = text.trim().match(/\S+/g)
  return parts ? parts.length : 0
}

function capitalizeFirst(text: string) {
  const i = text.search(/\S/u)
  if (i === -1) return text
  const ch = text[i]
  const upper = ch.toLocaleUpperCase()
  if (ch === upper) return text
  return text.slice(0, i) + upper + text.slice(i + 1)
}

function isNameText(value: string) {
  // Letters (any script), spaces, hyphen, apostrophe, period
  return /^[\p{L}][\p{L}\s'.-]*$/u.test(value.trim())
}

function isAgeInteger(value: string) {
  return /^(?:[1-9]|[1-9]\d|1\d{2})$/.test(value.trim())
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({
    hero: '',
    truth: '',
    boldest: '',
  })

  const onAnswerChange =
    (name: string) => (event: ChangeEvent<HTMLTextAreaElement>) => {
      const next = capitalizeFirst(event.target.value)
      if (wordCount(next) > MAX_ANSWER_WORDS) return
      setAnswers((prev) => ({ ...prev, [name]: next }))
      setError(null)
    }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return

    const form = event.currentTarget
    const data = new FormData(form)

    const nameValue = capitalizeFirst(name).trim()
    const age = String(data.get('age') ?? '').trim()
    const locationValue = capitalizeFirst(location).trim()
    const email = String(data.get('email') ?? '').trim()
    const normalizedAnswers = Object.fromEntries(
      QUESTIONS.map((q) => [q.name, capitalizeFirst(answers[q.name] ?? '').trim()]),
    )

    if (!isNameText(nameValue) || nameValue.length > MAX_NAME_LEN) {
      setError('Name must be text only (letters, spaces, hyphens, apostrophes).')
      return
    }
    if (!isAgeInteger(age)) {
      setError('Age must be a whole number between 1 and 120.')
      return
    }
    const ageN = Number(age)
    if (ageN < 1 || ageN > 120) {
      setError('Age must be a whole number between 1 and 120.')
      return
    }
    if (!locationValue || locationValue.length > MAX_LOCATION_LEN) {
      setError(`Location must be 1–${MAX_LOCATION_LEN} characters.`)
      return
    }
    if (!email || email.length > MAX_EMAIL_LEN || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      return
    }

    for (const q of QUESTIONS) {
      const text = normalizedAnswers[q.name] ?? ''
      const words = wordCount(text)
      if (!text.trim()) {
        setError('Please answer every question.')
        return
      }
      if (words > MAX_ANSWER_WORDS) {
        setError(`Each answer is capped at ${MAX_ANSWER_WORDS} words.`)
        return
      }
    }

    const body = [
      `Name: ${nameValue}`,
      `Age: ${ageN}`,
      `Location: ${locationValue}`,
      `Email: ${email}`,
      '',
      ...QUESTIONS.flatMap((q) => [
        `${q.label}`,
        normalizedAnswers[q.name],
        '',
      ]),
    ].join('\n')

    setError(null)
    setSending(true)
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: nameValue,
          email,
          _subject: `Pathfinder join — ${nameValue}`,
          _replyto: email,
          _template: 'box',
          message: body,
        }),
      })
      if (!res.ok) {
        throw new Error(`FormSubmit ${res.status}`)
      }
      setSent(true)
    } catch {
      setError(
        'Couldn’t send right now. Email jonathan@pathfinderquantum.com directly.',
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="contact">
      <header className="topbar meta">
        <a href="/">Mission Doc.</a>
        <span>The New Computers</span>
      </header>

      <main className="contact-shell">
        <div className="contact-main">
          <p className="meta contact-kicker">Join — Pathfinder</p>
          <h1>Tell us who you are.</h1>

          {sent ? (
            <p className="contact-thanks" role="status">
              Received. We’ll be in touch.
            </p>
          ) : (
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="contact-basics">
                <label>
                  <span className="meta">Name</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    autoCapitalize="words"
                    required
                    maxLength={MAX_NAME_LEN}
                    title="Letters only — spaces, hyphens, and apostrophes allowed"
                    value={name}
                    onChange={(event) => {
                      setName(capitalizeFirst(event.target.value))
                      setError(null)
                    }}
                  />
                </label>
                <label>
                  <span className="meta">Age</span>
                  <input
                    name="age"
                    type="number"
                    inputMode="numeric"
                    required
                    min={1}
                    max={120}
                    step={1}
                    onChange={() => setError(null)}
                  />
                </label>
                <label>
                  <span className="meta">Location</span>
                  <input
                    name="location"
                    type="text"
                    autoComplete="address-level2"
                    autoCapitalize="sentences"
                    required
                    maxLength={MAX_LOCATION_LEN}
                    value={location}
                    onChange={(event) => {
                      setLocation(capitalizeFirst(event.target.value))
                      setError(null)
                    }}
                  />
                </label>
                <label>
                  <span className="meta">Email</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={MAX_EMAIL_LEN}
                    onChange={() => setError(null)}
                  />
                </label>
              </div>

              <ol className="contact-questions">
                {QUESTIONS.map((q, i) => {
                  const words = wordCount(answers[q.name] ?? '')
                  return (
                    <li key={q.name}>
                      <label>
                        <span className="contact-q">
                          <span className="meta">{i + 1}.</span> {q.label}
                        </span>
                        <textarea
                          name={q.name}
                          rows={5}
                          required
                          autoCapitalize="sentences"
                          value={answers[q.name]}
                          onChange={onAnswerChange(q.name)}
                        />
                        <span
                          className={`meta contact-wordcount${
                            words >= MAX_ANSWER_WORDS ? ' is-max' : ''
                          }`}
                        >
                          {words} / {MAX_ANSWER_WORDS} words
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ol>

              {error ? (
                <p className="contact-error" role="alert">
                  {error}
                </p>
              ) : null}

              <button className="contact-submit" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send'}
              </button>
            </form>
          )}
        </div>

        <aside className="contact-path" aria-label="What happens next">
          <p className="meta contact-path-kicker">What to expect</p>
          <ol className="contact-path-list">
            {PATH.map((step) => (
              <li key={step.n} className="contact-path-step">
                <span className="meta contact-path-n">{step.n}</span>
                <h2>{step.title}</h2>
              </li>
            ))}
          </ol>
        </aside>
      </main>
    </div>
  )
}
