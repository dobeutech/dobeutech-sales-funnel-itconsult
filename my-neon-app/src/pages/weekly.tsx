import { useEffect, useState } from 'react';
import { getWeeklyStats } from '../lib/db';
import { Link } from 'react-router-dom';

interface WeeklyStats {
  total_prospects: number;
  queued: number;
  contacted: number;
  replied: number;
  clients: number;
  avg_score: number;
  surveys_completed: number;
}

interface RecentActivity {
  id: string;
  first_name: string;
  last_name: string;
  company_name: string;
  status: string;
  overall_score: number;
  updated_at: string;
}

export function Weekly() {
  const [stats, setStats] = useState<WeeklyStats | null>(null);
  const [recent, setRecent] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWeeklyStats();
        setStats(data.stats as WeeklyStats);
        setRecent(data.recent as RecentActivity[]);
      } catch (err) {
        console.error('Failed to load weekly stats:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>Loading weekly report...</p>;
  if (!stats) return <p style={{ padding: '2rem' }}>Failed to load data.</p>;

  const funnel = [
    { label: 'Total Prospects', value: stats.total_prospects, color: '#78909c' },
    { label: 'Queued', value: stats.queued, color: '#4caf50' },
    { label: 'Contacted', value: stats.contacted, color: '#2196f3' },
    { label: 'Replied', value: stats.replied, color: '#9c27b0' },
    { label: 'Clients', value: stats.clients, color: '#00bcd4' },
  ];

  const conversionRate =
    stats.contacted > 0
      ? ((stats.replied / stats.contacted) * 100).toFixed(1)
      : '0';

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Weekly Report</h1>
        <Link to="/dashboard" style={{ color: '#4fc3f7' }}>
          Full Dashboard
        </Link>
      </div>

      {/* Funnel Overview */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
      >
        {funnel.map((f) => (
          <div
            key={f.label}
            style={{
              flex: '1 1 150px',
              padding: '1.25rem',
              borderRadius: '8px',
              background: '#1e1e2e',
              border: `2px solid ${f.color}`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: f.color }}>
              {f.value}
            </div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{f.label}</div>
          </div>
        ))}
      </div>

      {/* Key Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ padding: '1.25rem', borderRadius: '8px', background: '#1e1e2e' }}>
          <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>Avg Score</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.avg_score}</div>
        </div>
        <div style={{ padding: '1.25rem', borderRadius: '8px', background: '#1e1e2e' }}>
          <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>Reply Rate</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{conversionRate}%</div>
        </div>
        <div style={{ padding: '1.25rem', borderRadius: '8px', background: '#1e1e2e' }}>
          <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>Surveys Completed</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.surveys_completed}</div>
        </div>
      </div>

      {/* Recent Activity */}
      <h2 style={{ marginBottom: '1rem' }}>Recent Activity</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333', textAlign: 'left' }}>
            <th style={{ padding: '0.5rem' }}>Name</th>
            <th style={{ padding: '0.5rem' }}>Company</th>
            <th style={{ padding: '0.5rem' }}>Score</th>
            <th style={{ padding: '0.5rem' }}>Status</th>
            <th style={{ padding: '0.5rem' }}>Updated</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((r) => (
            <tr key={r.id} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '0.5rem' }}>
                {r.first_name} {r.last_name}
              </td>
              <td style={{ padding: '0.5rem' }}>{r.company_name}</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{r.overall_score}</td>
              <td style={{ padding: '0.5rem' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    background:
                      r.status === 'QUEUED'
                        ? '#4caf50'
                        : r.status === 'CONTACTED'
                          ? '#2196f3'
                          : r.status === 'REPLIED'
                            ? '#9c27b0'
                            : r.status === 'CLIENT'
                              ? '#00bcd4'
                              : '#666',
                    color: '#fff',
                  }}
                >
                  {r.status}
                </span>
              </td>
              <td style={{ padding: '0.5rem', fontSize: '0.85rem', opacity: 0.6 }}>
                {new Date(r.updated_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
