const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('apex_auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `HTTP error ${response.status}`);
  }
  return data;
}

export const api = {
  // Auth
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  demoLogin: (role) => request('/auth/demo-login', { method: 'POST', body: JSON.stringify({ role }) }),
  getMe: () => request('/auth/me'),

  // Audit
  submitAudit: (formData) => request('/audit/submit', { method: 'POST', body: JSON.stringify(formData) }),
  getAuditById: (id) => request(`/audit/${id}`),
  getAllAudits: () => request('/audit/all'),

  // Leads & CRM
  getLeads: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/leads${query ? `?${query}` : ''}`);
  },
  getLeadById: (id) => request(`/leads/${id}`),
  createLead: (leadData) => request('/leads', { method: 'POST', body: JSON.stringify(leadData) }),
  updateLead: (id, data) => request(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateLeadStage: (id, stage, notes) => request(`/leads/${id}/stage`, { method: 'PATCH', body: JSON.stringify({ stage, notes }) }),
  addInteraction: (id, interaction) => request(`/leads/${id}/interactions`, { method: 'POST', body: JSON.stringify(interaction) }),
  deleteLead: (id) => request(`/leads/${id}`, { method: 'DELETE' }),
  resetSeedData: () => request('/leads/reset-seed', { method: 'POST' }),

  // Bookings
  getAvailableSlots: (date, timezone) => {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (timezone) params.append('timezone', timezone);
    return request(`/bookings/slots?${params.toString()}`);
  },
  bookCall: (bookingData) => request('/bookings/book', { method: 'POST', body: JSON.stringify(bookingData) }),
  getBookings: () => request('/bookings'),
  updateBookingStatus: (id, status) => request(`/bookings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Sequences
  getSequences: () => request('/sequences'),
  triggerSequence: (leadId, sequenceId) => request('/sequences/trigger', { method: 'POST', body: JSON.stringify({ leadId, sequenceId }) }),
  updateSequence: (id, data) => request(`/sequences/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Outreach
  getOutreachTemplates: () => request('/outreach/templates'),
  generateOutreach: (params) => request('/outreach/generate', { method: 'POST', body: JSON.stringify(params) }),

  // Analytics
  getAnalytics: () => request('/analytics/overview')
};
