# 🛡️ Why Cloudflare is Blocking the RPC Endpoint

## What's Happening

When Hardhat tries to connect to `https://odyssey.storyrpc.io`, Cloudflare is intercepting the request and blocking it because:

### 1. **Bot Detection** 🤖
- Hardhat makes **direct HTTP requests** (not from a browser)
- Cloudflare sees this as **automated/bot traffic**
- No browser headers (User-Agent, cookies, etc.)
- Cloudflare's bot protection flags it as suspicious

### 2. **Missing Browser Headers** 🌐
Browsers send headers like:
- `User-Agent: Mozilla/5.0...`
- `Accept: text/html,application/xhtml+xml...`
- `Accept-Language: en-US,en;q=0.9`
- Cookies and session data

Hardhat sends:
- Simple JSON-RPC requests
- Minimal headers
- No browser fingerprint

### 3. **IP-Based Blocking** 🚫
- Your IP (`105.113.67.33`) might be flagged
- Could be from a datacenter/VPS
- Previous automated requests from same IP
- Geographic location restrictions

### 4. **Rate Limiting** ⏱️
- Too many requests from same IP
- Rapid connection attempts
- Pattern matching automated tools

---

## Why This Happens

Cloudflare protects websites from:
- DDoS attacks
- Bot traffic
- Scraping
- Automated abuse

But it can also block legitimate tools like:
- Hardhat
- Foundry
- Other development tools
- API clients

---

## Solutions

### Solution 1: Add Browser Headers to Hardhat ⭐ (Best)

We can configure Hardhat to send browser-like headers:

```typescript
// hardhat.config.ts
networks: {
  odyssey: {
    url: process.env.RPC_URL || "https://odyssey.storyrpc.io",
    chainId: 1516,
    httpHeaders: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "Accept": "application/json",
      "Accept-Language": "en-US,en;q=0.9",
    },
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  },
}
```

### Solution 2: Use Alternative RPC Endpoint

Check Story Protocol for:
- Alternative RPC URLs
- Community-maintained endpoints
- Public RPC providers

### Solution 3: Contact Story Protocol

Ask them to:
- Whitelist your IP
- Provide alternative RPC endpoint
- Add exception for development tools
- Give you a dedicated RPC URL

### Solution 4: Use VPN/Proxy

If it's IP-based:
- Try different network
- Use VPN
- Use mobile hotspot
- Change IP address

### Solution 5: Wait and Retry

Cloudflare blocks can be temporary:
- Wait 10-30 minutes
- Try again
- Blocks might auto-expire

---

## Quick Fix: Add Headers

Let me update the Hardhat config to include browser headers:

