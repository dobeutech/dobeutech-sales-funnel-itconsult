import { Link } from 'react-router-dom';

const services = [
  {
    title: 'SEO & Google Visibility',
    description:
      'Audit and fix the issues keeping your business hidden on Google. Most local businesses have 3-5 quick wins that cost nothing to fix.',
    icon: '🔍',
  },
  {
    title: 'Website Modernization',
    description:
      'Clean, mobile-friendly redesigns that load fast and convert visitors into customers. No bloat, no subscriptions.',
    icon: '💻',
  },
  {
    title: 'Business Automation',
    description:
      'Stop doing manually what software can handle — invoicing, scheduling, follow-ups, and customer communication.',
    icon: '⚡',
  },
  {
    title: 'Tech Strategy & Consulting',
    description:
      'A 30-minute call to map out what tools you actually need and what you can drop. Clear, honest advice.',
    icon: '🗺️',
  },
];

const testimonialStyle: React.CSSProperties = {
  background: '#1a1a2e',
  borderRadius: '12px',
  padding: '1.5rem',
  borderLeft: '4px solid #4fc3f7',
  fontStyle: 'italic',
  lineHeight: 1.6,
};

export function Brand() {
  return (
    <div style={{ color: '#e0e0e0', background: '#0d0d1a', minHeight: '100vh' }}>
      {/* Hero */}
      <header
        style={{
          padding: '4rem 2rem 3rem',
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4fc3f7, #1976d2)',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          JW
        </div>
        <h1 style={{ fontSize: '2.4rem', margin: '0 0 0.5rem', color: '#fff' }}>
          Jeremy Wilson
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.7, margin: '0 0 1rem' }}>
          IT Consultant &amp; Web Strategist — Monmouth County, NJ
        </p>
        <p
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.7,
            maxWidth: '650px',
            margin: '0 auto 2rem',
          }}
        >
          I help small businesses in New Jersey get found online, look professional,
          and stop wasting time on tech that doesn't work. No jargon, no upsells —
          just practical solutions that fit your budget.
        </p>
        <a
          href="https://form.typeform.com/to/hbsD5HU9?utm_source=brand_site&utm_medium=web&utm_campaign=organic"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.9rem 2rem',
            background: 'linear-gradient(135deg, #4fc3f7, #1976d2)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          Take the Free Business Survey
        </a>
        <p style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: '0.75rem' }}>
          3 minutes — first 50 get a free service
        </p>
      </header>

      {/* Services */}
      <section
        style={{
          padding: '3rem 2rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.8rem',
            marginBottom: '2rem',
            color: '#fff',
          }}
        >
          What I Do
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {services.map((s) => (
            <div
              key={s.title}
              style={{
                background: '#1a1a2e',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #2a2a4a',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{s.icon}</div>
              <h3 style={{ margin: '0 0 0.5rem', color: '#4fc3f7', fontSize: '1.1rem' }}>
                {s.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.8 }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section
        style={{
          padding: '3rem 2rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.8rem',
            marginBottom: '2rem',
            color: '#fff',
          }}
        >
          Why Local Businesses Work With Me
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={testimonialStyle}>
            "Jeremy took one look at our Google listing and fixed three things we'd had wrong
            for years. We started getting calls the same week."
            <div style={{ marginTop: '0.5rem', fontStyle: 'normal', opacity: 0.6, fontSize: '0.9rem' }}>
              — Local contractor, Red Bank NJ
            </div>
          </div>
          <div style={testimonialStyle}>
            "No pushy sales pitch. He showed us exactly what was broken, fixed it, and
            explained what we could handle ourselves going forward."
            <div style={{ marginTop: '0.5rem', fontStyle: 'normal', opacity: 0.6, fontSize: '0.9rem' }}>
              — Accounting firm owner, Middletown NJ
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        style={{
          padding: '3rem 2rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            color: '#fff',
          }}
        >
          About Me
        </h2>
        <div style={{ lineHeight: 1.8, fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
          <p>
            I'm the founder of{' '}
            <a href="https://dobeu.net" target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7' }}>
              Dobeu Tech Solutions
            </a>
            , based in Long Branch, NJ. I've spent years helping small businesses
            cut through the noise of overpriced agencies and unnecessary software.
          </p>
          <p>
            My approach is simple: look at what you have, find what's broken or missing,
            fix the biggest wins first, and teach you how to maintain it. I work with
            skilled tradespeople, accountants, restaurants, medical offices, and
            anyone who knows their craft but needs help getting visible online.
          </p>
          <p>
            When I'm not auditing Google listings, you'll find me exploring the Jersey
            Shore or tinkering with automation workflows.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '3rem 2rem 4rem',
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '1rem' }}>
          Ready to see what's costing you customers?
        </h2>
        <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
          Take the 3-minute survey and get a free audit — no strings attached.
        </p>
        <a
          href="https://form.typeform.com/to/hbsD5HU9?utm_source=brand_site&utm_medium=web&utm_campaign=organic"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.9rem 2rem',
            background: 'linear-gradient(135deg, #4fc3f7, #1976d2)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          Start the Free Survey
        </a>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid #2a2a4a',
          padding: '2rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          opacity: 0.5,
        }}
      >
        <p>
          Dobeu Tech Solutions — Long Branch, NJ |{' '}
          <a href="mailto:jeremyw@dobeu.net" style={{ color: '#4fc3f7' }}>
            jeremyw@dobeu.net
          </a>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <Link to="/" style={{ color: '#4fc3f7', textDecoration: 'none' }}>
            Admin
          </Link>
        </p>
      </footer>
    </div>
  );
}
