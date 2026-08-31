// In-Memory Rate Limiter Map
const rateLimitMap = new Map();

/**
 * Creates a rate limiting middleware
 * @param {number} windowMs - Time window in milliseconds
 * @param {number} maxRequests - Max allowed requests per IP within the window
 * @param {string} message - Custom error message
 */
export const rateLimit = ({ windowMs = 60 * 1000, maxRequests = 30, message = 'Too many requests, please try again later.' }) => {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
    const key = `${req.baseUrl || req.path}_${ip}`;
    const now = Date.now();

    const record = rateLimitMap.get(key) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count += 1;
    }

    rateLimitMap.set(key, record);

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - record.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));

    if (record.count > maxRequests) {
      return res.status(429).json({
        error: message,
        retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000)
      });
    }

    next();
  };
};

/**
 * Security Headers Middleware (similar to Helmet)
 */
export const securityHeaders = (req, res, next) => {
  // Remove X-Powered-By to prevent technology fingerprinting
  res.removeHeader('X-Powered-By');

  // Set essential defensive headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  next();
};

/**
 * Recursive input sanitizer to prevent XSS and prototype pollution
 */
export const sanitizeData = (data) => {
  if (typeof data === 'string') {
    // Strip script tags and dangerous HTML characters
    return data
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>]/g, (char) => (char === '<' ? '&lt;' : '&gt;'))
      .trim();
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }
  if (typeof data === 'object' && data !== null) {
    const clean = {};
    for (const [key, value] of Object.entries(data)) {
      // Prevent prototype pollution
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }
      clean[key] = sanitizeData(value);
    }
    return clean;
  }
  return data;
};

/**
 * Input sanitization middleware for request body and query
 */
export const sanitizeInputs = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeData(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeData(req.query);
  }
  next();
};
