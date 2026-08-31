import React, { createContext, useContext, useState } from 'react';

const FunnelContext = createContext(null);

function safeJsonParse(val, fallback = null) {
  if (!val) return fallback;
  try {
    return JSON.parse(val);
  } catch (e) {
    return fallback;
  }
}

export const FunnelProvider = ({ children }) => {
  const [latestAudit, setLatestAudit] = useState(() => {
    return safeJsonParse(sessionStorage.getItem('apex_latest_audit'));
  });

  const [activeLead, setActiveLead] = useState(null);

  const saveAuditResult = (auditData) => {
    setLatestAudit(auditData);
    try {
      sessionStorage.setItem('apex_latest_audit', JSON.stringify(auditData));
    } catch (e) {
      console.warn('SessionStorage quota exceeded or disabled:', e);
    }
  };

  return (
    <FunnelContext.Provider value={{ latestAudit, saveAuditResult, activeLead, setActiveLead }}>
      {children}
    </FunnelContext.Provider>
  );
};

export const useFunnel = () => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnel must be used within a FunnelProvider');
  }
  return context;
};
