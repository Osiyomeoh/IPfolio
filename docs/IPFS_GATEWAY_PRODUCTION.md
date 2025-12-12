# 🌐 IPFS Gateway Configuration for Production

## Current Gateway Setup

IPfolio currently uses **Pinata's public gateway** for accessing IPFS files:
- URL: `https://gateway.pinata.cloud/ipfs/{cid}`

---

## Gateway Options for Production

### Option 1: Pinata Public Gateway (Current) ✅

**URL:** `https://gateway.pinata.cloud/ipfs/{cid}`

**Pros:**
- ✅ Free to use
- ✅ Fast CDN-backed
- ✅ Reliable
- ✅ No additional setup needed
- ✅ Works immediately

**Cons:**
- ⚠️ Public gateway (anyone can access)
- ⚠️ Rate limits on free tier
- ⚠️ Not dedicated to your account

**Best For:**
- Development
- Hackathon demos
- Small projects
- Free tier usage

---

### Option 2: Pinata Dedicated Gateway (Recommended for Production) ⭐

**URL:** `https://your-subdomain.mypinata.cloud/ipfs/{cid}`

**Setup:**
1. Go to Pinata Dashboard
2. Navigate to **Gateway** section
3. Create dedicated gateway
4. Choose subdomain (e.g., `ipfolio.mypinata.cloud`)
5. Configure settings

**Pros:**
- ✅ Custom domain
- ✅ Better performance
- ✅ Higher rate limits
- ✅ More reliable
- ✅ Professional appearance
- ✅ Better caching

**Cons:**
- ⚠️ Requires paid Pinata plan ($20+/month)
- ⚠️ Additional setup needed

**Best For:**
- Production applications
- High traffic
- Professional deployments
- Custom branding

**Cost:**
- Pinata Pro: $20/month (includes dedicated gateway)
- Pinata Enterprise: Custom pricing

---

### Option 3: Public IPFS Gateways (Free Alternatives)

**Options:**
- `https://ipfs.io/ipfs/{cid}` - Official IPFS gateway
- `https://cloudflare-ipfs.com/ipfs/{cid}` - Cloudflare gateway
- `https://dweb.link/ipfs/{cid}` - Protocol Labs gateway

**Pros:**
- ✅ Completely free
- ✅ No rate limits (usually)
- ✅ Decentralized
- ✅ Multiple options

**Cons:**
- ⚠️ Can be slower
- ⚠️ Less reliable
- ⚠️ No custom domain
- ⚠️ No control over caching

**Best For:**
- Fallback options
- Backup gateways
- Free alternatives

---

### Option 4: Self-Hosted Gateway

**Setup:**
- Run your own IPFS node
- Configure gateway
- Point to your domain

**Pros:**
- ✅ Full control
- ✅ Custom domain
- ✅ No third-party dependencies

**Cons:**
- ⚠️ Infrastructure costs
- ⚠️ Maintenance required
- ⚠️ Technical complexity

**Best For:**
- Enterprise deployments
- High security requirements
- Full control needed

---

## Recommended Production Setup

### For Hackathon/Demo:

**Use:** Pinata Public Gateway
```typescript
url: `https://gateway.pinata.cloud/ipfs/${cid}`
```

**Why:**
- Free
- Fast setup
- Works immediately
- Good enough for demo

---

### For Production:

**Use:** Pinata Dedicated Gateway
```typescript
url: `https://indigo-recent-clam-436.mypinata.cloud/ipfs/${cid}`
```

**Configured in:** `frontend/.env`
```bash
REACT_APP_PINATA_GATEWAY=https://indigo-recent-clam-436.mypinata.cloud
```

**Why:**
- Better performance
- Custom domain
- Professional
- Higher limits

---

## Implementation: Configurable Gateway

Let's update the IPFS service to support configurable gateways:

### Environment Variable:

Add to `.env`:
```bash
# Pinata Gateway (optional, defaults to public gateway)
REACT_APP_PINATA_GATEWAY=https://gateway.pinata.cloud
# Or for dedicated gateway:
# REACT_APP_PINATA_GATEWAY=https://ipfolio.mypinata.cloud
```

### Code Update:

```typescript
const GATEWAY = process.env.REACT_APP_PINATA_GATEWAY || 'https://gateway.pinata.cloud';
return {
  cid,
  url: `${GATEWAY}/ipfs/${cid}`,
};
```

---

## Gateway URL Examples

### Current (Public Gateway):
```
https://gateway.pinata.cloud/ipfs/QmABC123...
```

### Dedicated Gateway:
```
https://ipfolio.mypinata.cloud/ipfs/QmABC123...
```

### Public IPFS Gateway:
```
https://ipfs.io/ipfs/QmABC123...
```

### Cloudflare Gateway:
```
https://cloudflare-ipfs.com/ipfs/QmABC123...
```

---

## Multi-Gateway Fallback Strategy

For maximum reliability, you can implement fallback gateways:

```typescript
const gateways = [
  'https://gateway.pinata.cloud',
  'https://ipfs.io',
  'https://cloudflare-ipfs.com',
];

// Try first gateway, fallback to others if needed
const getIPFSURL = (cid: string) => {
  return `${gateways[0]}/ipfs/${cid}`;
};
```

---

## Production Checklist

### For Hackathon:
- [x] Use Pinata public gateway
- [x] No additional setup needed
- [x] Works immediately

### For Production:
- [ ] Upgrade to Pinata Pro ($20/month)
- [ ] Create dedicated gateway
- [ ] Update gateway URL in code
- [ ] Test gateway performance
- [ ] Set up monitoring
- [ ] Configure caching

---

## Cost Comparison

### Free Tier:
- **Gateway:** Public Pinata gateway
- **Cost:** $0/month
- **Limits:** Standard rate limits
- **Best for:** Development, demos

### Paid Tier:
- **Gateway:** Dedicated Pinata gateway
- **Cost:** $20/month (Pinata Pro)
- **Limits:** Higher rate limits
- **Best for:** Production

---

## Quick Answer

**For Hackathon/Demo:**
- Use: `https://gateway.pinata.cloud/ipfs/{cid}`
- No setup needed
- Free
- Works immediately

**For Production:**
- Use: `https://your-subdomain.mypinata.cloud/ipfs/{cid}`
- Requires Pinata Pro ($20/month)
- Better performance
- Custom domain

---

**The current setup (public gateway) is perfect for hackathon!** 🚀

