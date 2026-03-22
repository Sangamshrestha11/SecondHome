import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './MaintenanceRequest.css';

const API = '/api/requests';

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });
};

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function MaintenanceRequest() {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ openTasks: 0, completedToday: 0 });
  const [form, setForm] = useState({ room_location: '', issue_description: '' });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [lastUpdated, setLastUpdated] = useState('Just now');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [reqRes, statsRes] = await Promise.all([
        axios.get(API),
        axios.get(`${API}/stats`),
      ]);
      setRequests(Array.isArray(reqRes.data) ? reqRes.data : []);
      setStats(statsRes.data);
      setLastUpdated('Just now');
    } catch {
      setError('Failed to load data. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.room_location.trim() || !form.issue_description.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await axios.post(API, form);
      setForm({ room_location: '', issue_description: '' });
      setSuccess('Request submitted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      await fetchData();
    } catch {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.patch(`${API}/${id}/resolve`);
      await fetchData();
    } catch {
      setError('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this request?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      await fetchData();
    } catch {
      setError('Failed to delete request.');
    }
  };

  return (
    <div className="mr-page">
      <div className="mr-inner">
        {/* Left: Report Form */}
        <div className="mr-left">
          <div className="form-panel">
            <h1 className="form-title">Report an Issue</h1>
            <p className="form-sub">Submit a new maintenance request to the facilities team.</p>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-card">
              <div className="form-card-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                New Request Details
              </div>

              <form onSubmit={handleSubmit} className="request-form">
                <div className="form-group">
                  <label>ROOM / LOCATION</label>
                  <div className="input-wrap">
                    <LocationIcon />
                    <input
                      type="text"
                      placeholder="e.g. Room no, Hall name"
                      value={form.room_location}
                      onChange={e => setForm({ ...form, room_location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>ISSUE DESCRIPTION</label>
                  <div className="textarea-wrap">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="textarea-icon">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <textarea
                      placeholder="Briefly describe the problem..."
                      value={form.issue_description}
                      onChange={e => setForm({ ...form, issue_description: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>

            {/* Stats */}
            <div className="stats-row">
              <div className="stat-box open">
                <div className="stat-label">OPEN TASKS</div>
                <div className="stat-number">{stats.openTasks}</div>
              </div>
              <div className="stat-box completed">
                <div className="stat-label">COMPLETED TODAY</div>
                <div className="stat-number green">{stats.completedToday}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent Reports */}
        <div className="mr-right">
          <div className="reports-panel">
            <div className="reports-header">
              <div>
                <div className="reports-title-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                  <h2 className="reports-title">Recent Reports</h2>
                </div>
                <p className="reports-sub">Real-time status of maintenance activities.</p>
              </div>
              <button className="today-btn" onClick={fetchData}>Today</button>
            </div>

            <div className="reports-list">
              {loading && requests.length === 0 ? (
                <div className="loading-state">Loading requests...</div>
              ) : requests.length === 0 ? (
                <div className="empty-state">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gray-300)', margin: '0 auto 12px' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <p>No maintenance requests yet.<br/>Submit your first request!</p>
                </div>
              ) : (
                requests.map(req => (
                  <div key={req.id} className={`report-item ${req.status === 'Resolved' ? 'resolved' : ''}`}>
                    <div className="report-icon-col">
                      <div className={`report-icon ${req.status === 'Resolved' ? 'resolved' : 'pending'}`}>
                        {req.status === 'Resolved' ? <CheckIcon /> : <ClockIcon />}
                      </div>
                    </div>
                    <div className="report-body">
                      <div className="report-location-row">
                        <LocationIcon />
                        <span className="report-location">{req.room_location}</span>
                        <span className={`report-badge ${req.status === 'Resolved' ? 'badge-resolved' : 'badge-pending'}`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="report-desc">{req.issue_description}</p>
                      <div className="report-meta">
                        Reported: {formatDate(req.reported_at)}
                      </div>
                    </div>
                    <div className="report-actions">
                      {req.status === 'Pending' && (
                        <button className="resolve-btn" onClick={() => handleResolve(req.id)}>
                          Mark Resolved
                        </button>
                      )}
                      <button className="delete-btn" onClick={() => handleDelete(req.id)} title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Legend */}
            <div className="reports-footer">
              <div className="legend">
                <span className="legend-item"><span className="legend-dot pending-dot"></span>Pending</span>
                <span className="legend-item"><span className="legend-dot resolved-dot"></span>Resolved</span>
              </div>
              <span className="last-updated">LAST UPDATED: {lastUpdated.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
