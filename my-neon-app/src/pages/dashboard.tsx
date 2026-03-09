import { useEffect, useState } from 'react';
import { getProspects, getProspectStats, type Prospect } from '../lib/db';

const tierLabel: Record<number, string> = { 1: 'A (1st)', 2: 'B (2nd)', 3: 'C (3rd+)' };
const statusColors: Record<string, string> = {
  QUEUED: '#4caf50',
  DISCOVERED: '#ff9800',
  NOT_FIT: '#f44336',
  CONTACTED: '#2196f3',
  REPLIED: '#9c27b0',
  CLIENT: '#00bcd4',
};

export function Dashboard() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [stats, setStats] = useState<{ status: string; count: number; avg_score: number }[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, s] = await Promise.all([
          getProspects(filter || undefined),
          getProspectStats(),
        ]);
        setProspects(p);
        setStats(s as { status: string; count: number; avg_score: number }[]);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filter]);

  if (loading) return <p style={{ padding: '2rem' }}>Loading prospects...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Prospect Dashboard</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {stats.map((s) => (
          <div
            key={s.status}
            onClick={() => setFilter(filter === s.status ? '' : s.status)}
            style={{
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              background: filter === s.status ? statusColors[s.status] || '#666' : '#1e1e2e',
              color: '#fff',
              cursor: 'pointer',
              border: `2px solid ${statusColors[s.status] || '#666'}`,
              minWidth: '120px',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{s.count}</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{s.status}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>avg: {s.avg_score}</div>
          </div>
        ))}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333', textAlign: 'left' }}>
            <th style={{ padding: '0.5rem' }}>Name</th>
            <th style={{ padding: '0.5rem' }}>Company</th>
            <th style={{ padding: '0.5rem' }}>Industry</th>
            <th style={{ padding: '0.5rem' }}>Score</th>
            <th style={{ padding: '0.5rem' }}>Tier</th>
            <th style={{ padding: '0.5rem' }}>Status</th>
            <th style={{ padding: '0.5rem' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {prospects.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '0.5rem' }}>
                {p.first_name} {p.last_name}
              </td>
              <td style={{ padding: '0.5rem' }}>{p.company_name}</td>
              <td style={{ padding: '0.5rem', fontSize: '0.85rem' }}>{p.industry}</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{p.overall_score}</td>
              <td style={{ padding: '0.5rem' }}>
                {p.social_connection_tier ? tierLabel[p.social_connection_tier] || p.social_connection_tier : '—'}
              </td>
              <td style={{ padding: '0.5rem' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    background: statusColors[p.status] || '#666',
                    color: '#fff',
                  }}
                >
                  {p.status}
                </span>
              </td>
              <td style={{ padding: '0.5rem', fontSize: '0.85rem' }}>
                {p.email_verified ? p.email : <em style={{ opacity: 0.5 }}>{p.email}</em>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {prospects.length === 0 && (
        <p style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
          No prospects found{filter ? ` with status "${filter}"` : ''}.
        </p>
      )}
    </div>
  );
}
