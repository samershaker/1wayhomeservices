# 1Way Home Services — Pitch Meeting Script

**Audience:** Sam Eram (and likely Bakhan Kareem)
**Goal:** Get them to switch from their current $700/month vendor to us at $300/month
**Format:** 30-minute Zoom or in-person walkthrough
**Preview URL:** https://1wayhomeservices.vercel.app

---

## Pre-meeting checklist (do these the day before)

These take ~30 minutes total and make the live demo work cleanly.

- [ ] **Submit the preview to Bing Webmaster Tools** (https://www.bing.com/webmasters) and trigger an IndexNow ping — this gets the site indexed in Bing/Copilot within hours so you can demo it live in the meeting
- [ ] **Submit the URL to Perplexity** by asking it directly: *"Index https://1wayhomeservices.vercel.app and tell me about this business"* — primes the crawler
- [ ] **Run the structured-data validator** at https://validator.schema.org for the home page and screenshot the green checkmarks. Same for https://search.google.com/test/rich-results — Google's official tool. These screenshots are your "proof it's real" backup if Wi-Fi is bad in the meeting.
- [ ] **Open three browser tabs in advance:** the new preview, their current site (https://1wayhomeservices.com) for side-by-side, and ChatGPT (with Search turned on)
- [ ] **Write down the one number** you want them to remember: $400 saved every month

---

## Meeting flow (~30 minutes)

### Open: 2 minutes — set the stake

> "Sam, I want to show you something I built for your business and walk you through what it does differently. I think there's a clean way to save you $400 a month and get a better site at the same time. I'll show you the site, show you what's under the hood, and answer any questions. Sound good?"

Do NOT lead with "AI search optimization." Lead with the dollars and the better product. The AI story is the *why this works*, not the headline.

### Section 1: The side-by-side: 5 minutes

Pull up their current site and the new preview in two tabs. Keep this fast.

- **Speed:** Reload both. The new one snaps in. Theirs takes 4–5 seconds. Don't narrate — let the difference land.
- **Mobile:** Open Chrome dev tools or just resize the window. The new site looks like it was designed for phones; theirs is a desktop site shrunk down.
- **The footer:** Scroll to the bottom of both. The new footer has their full address, hours, Bakhan's real estate license number, an Equal Housing Opportunity statement, and a professional disclaimer. Their current footer has none of that. For a regulated business — real estate especially — this matters.
- **The contact form:** Show that the new form captures the lead, including the text-message opt-in their privacy policy already requires. Show that submitting it lands in their inbox.

### Section 2: The AI-search story: 8 minutes

This is the differentiator. Frame it carefully — promise what's true, not what sells better.

> "Here's what nobody else in your category is doing yet. When someone asks ChatGPT or Google's AI 'who's a good tax preparer in El Cajon?' — those tools need information they can trust and quote. Most websites give them almost nothing. Yours gives them everything."

**Live demo (have these ready to run):**

1. Open the preview's `view source` and scroll to the JSON-LD blocks. Show: their address, Bakhan's real estate license number, their Google rating with a verification date, the legal entity name. Say:
   > "This is the part the AI tools actually read. Your current site has none of this."

2. Open https://www.bing.com and search for the preview URL — show that Bing has indexed it (because of the pre-meeting submission). Now ask Copilot a "fingerprint" question:
   > "What are the office hours and address for 1Way Home Services in El Cajon?"
   Copilot pulls the answer straight from the new site, with the URL cited. **This is the live citation moment.**

3. Open ChatGPT (with web search on) and ask:
   > "Look at https://1wayhomeservices.vercel.app and tell me what real estate license number is associated with this business."
   ChatGPT reads the page in real time and quotes Bakhan's California real estate license number, 02223420. Tell Sam:
   > "That's the difference. AI tools can pick up specific facts about your business and quote them — confidently and accurately."

**Be honest about the timing:**

> "Right now this is on a temporary preview address. Citations for big general searches like 'best tax preparer San Diego' won't happen overnight — that takes weeks of search-tool crawling and reputation building. But the moment you sign and we point your real domain `1wayhomeservices.com` at this build, you inherit your domain's existing search history *plus* this new foundation, and citations follow over the next 1 to 3 months. We've done the part that other firms haven't even started."

Don't oversell. Sam's a tax guy — he'll trust calibrated honesty more than hype.

### Section 3: The money: 3 minutes

Pull up the simple table:

| | Today | With us |
|---|---|---|
| Monthly | $700 | **$300** |
| Yearly | $8,400 | **$3,600** |
| Savings | — | **$4,800/year, $14,400 over three years** |

> "And that's just the cost side. The new site should also bring in more leads — faster site, better trust signals, AI visibility that competitors don't have. The cost savings alone justify the switch, the lead growth is the upside."

### Section 4: The ask: 5 minutes

> "There are a handful of small things I need from you to finish polishing the site. None of them are blockers — the site is live and working. These would just sharpen the last details."

Walk through `INFO_NEEDED.md` (you have it open in another tab). Don't read it — point at it. Say you'll send it after the meeting so they can answer at their own pace.

### Section 5: Close: 5 minutes

> "Here's what I'd suggest. Take a few days to look at the preview yourself, click through it on your phone, show it to anyone whose opinion you trust. Then if it feels right, we set up a quick handover — about a week from your decision to the site being live on your real domain. Your current vendor gets 30 days notice, your team learns nothing — the only thing your customers notice is the site is faster and looks better."

> "Any questions before I let you go?"

End on an open question, not a closed sell.

---

## Likely objections and responses

**"Why so cheap? My current vendor is $700."**
> "Because they're charging you for old technology and a lot of overhead you don't need. I'm a small operation, I built this on modern static-site hosting that costs almost nothing to run, and I want to land you as a long-term client. The $300 includes hosting, ongoing improvements, and support. It's not a teaser rate — it's the actual cost."

**"Can my current vendor just add this AI stuff?"**
> "Maybe, but the audit I did showed their site is missing the foundation entirely — the structured business data, the publisher entity setup, the licensing disclosures. Adding AI optimization on top of that foundation is months of work, and you'd still be paying $700. I built it from scratch the right way."

**"What if I want to leave?"**
> "Month-to-month, no contract. If you ever want to leave, you take everything — the site code is yours, hosted on your accounts. I keep clients by being good, not by locking them in."

**"How fast can we be cited by ChatGPT?"**
> "For specific questions about your business — like office hours, license number, services — within days of going live on your real domain. For competitive searches like 'best tax preparer San Diego' — that's a 1 to 3 month build-up as the AI tools learn to trust the site. We've done the work that makes that timeline real instead of hopeful."

**"Who fixes things if they break?"**
> "Me. The $300 includes monitoring, fixes, and reasonable updates. Bigger projects — adding a new service line, a major redesign — are quoted separately so you know what you're paying for."

---

## After the meeting

- [ ] Send `BRIEF.md` and `INFO_NEEDED.md` by email or text within 1 hour
- [ ] Set a follow-up reminder for 3 days out — gentle, not pushy
- [ ] If they say yes, send a one-page agreement and the cancellation script for their current vendor
