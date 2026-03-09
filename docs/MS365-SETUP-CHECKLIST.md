# Microsoft 365 Setup Checklist — Dobeu Tech Solutions

This checklist covers the MS365 E5 developer tenant configuration required for the sales funnel. The Make.com connection "Dobeu.net" (jeremyw@dobeu.net) is already configured. These steps verify and complete the remaining setup.

---

## 1. Tenant & Entra ID App Registration

Required for Microsoft Graph API access (contacts sync with Make.com).

- [ ] Confirm tenant is active at [portal.azure.com](https://portal.azure.com) under account jeremyw@dobeu.net
- [ ] Navigate to **Entra ID > App registrations** — confirm a registration for the funnel exists (or create one named `dobeutech-sales-funnel`)
- [ ] Under the app registration, go to **API permissions** and add the following **Microsoft Graph** delegated permissions:
  - [ ] `Contacts.ReadWrite`
  - [ ] `Calendars.ReadWrite`
  - [ ] `Mail.Read`
  - [ ] `User.Read`
- [ ] Click **Grant admin consent** for the tenant
- [ ] Note the **Application (client) ID** and **Directory (tenant) ID** — store in `.env` as `MS365_CLIENT_ID` and `MS365_TENANT_ID`
- [ ] Create a **client secret** under **Certificates & secrets** — store as `MS365_CLIENT_SECRET` in `.env` (never commit)

---

## 2. SharePoint Sites

- [ ] Open [sharepoint.com](https://sharepoint.com) as jeremyw@dobeu.net
- [ ] Confirm or create the following team sites:
  - [ ] **Operations** — general business ops, SOPs, meeting notes
  - [ ] **Projects** — client project tracking, deliverables
  - [ ] **Finance** — invoices, billing, restricted to owner only (set permissions: remove all members except Jeremy)
- [ ] Verify Jeremy is the owner of all three sites

---

## 3. Shared Excel Workbook (Prospects Mirror)

A lightweight Excel mirror of the Neon `prospects` table for manual review and offline access.

- [ ] Create a new Excel workbook named `Prospects-Mirror.xlsx` on the **Operations** SharePoint site (or OneDrive for Business)
- [ ] Add columns matching key prospect fields: `company_name`, `domain`, `contact_name`, `contact_email`, `industry`, `city`, `overall_score`, `status`, `batch_week`
- [ ] Share the workbook link with the Make.com "Dobeu.net" connection for automated updates
- [ ] Confirm Make.com can write rows to the workbook via the Microsoft 365 Excel module

---

## 4. Make.com — Dobeu.net Connection Verification

The "Dobeu.net" connection in Make.com (jeremyw@dobeu.net) must have the correct scopes.

- [ ] Log in to [make.com](https://make.com) under team ID 315584
- [ ] Go to **Connections** and open the **Dobeu.net** Microsoft connection
- [ ] Verify the connection status shows **Connected** (not expired)
- [ ] Confirm the connection has authorized the **Contacts** API scope:
  - [ ] Test with a simple "List Contacts" module in a draft scenario
  - [ ] If scope is missing, reconnect the connection and re-authorize with Contacts scope checked
- [ ] Verify the **Excel / SharePoint** modules can access the Operations site workbook created in Step 3

---

## 5. Email Deliverability — SPF & DKIM for dobeu.net

Required before sending any outreach from jeremyw@dobeu.net or hello@dobeu.net.

- [ ] Log in to the DNS provider for `dobeu.net`
- [ ] **SPF record** — add or verify a TXT record:
  ```
  v=spf1 include:spf.protection.outlook.com -all
  ```
  (Use `~all` softfail if you also send from Customer.io — confirm Customer.io's SPF include is also present)
- [ ] **DKIM** — in Microsoft 365 admin center, go to **Security > Email & collaboration > Policies & rules > Threat policies > DomainKeys Identified Mail (DKIM)**
  - [ ] Enable DKIM for `dobeu.net`
  - [ ] Copy the two CNAME records provided and add them to DNS
  - [ ] Wait for propagation (up to 48 hours), then verify status shows **Enabled**
- [ ] **DMARC** (recommended) — add a TXT record for `_dmarc.dobeu.net`:
  ```
  v=DMARC1; p=none; rua=mailto:jeremyw@dobeu.net
  ```
  Start with `p=none` to monitor before enforcing.
- [ ] Test deliverability at [mail-tester.com](https://mail-tester.com) — target score 9+/10

---

## 6. Inbound Mailbox / Alias

- [ ] In Microsoft 365 admin center, create a shared mailbox or alias: `hello@dobeu.net`
- [ ] Grant jeremyw@dobeu.net **Full Access** and **Send As** permissions on the shared mailbox
- [ ] Confirm inbound mail to `hello@dobeu.net` appears in Outlook for Jeremy
- [ ] Optional: Set up a Make.com scenario to watch `hello@dobeu.net` for survey reply keywords and create a `analytics_events` record when a prospect replies

---

## Notes

- MS365 E5 developer tenant has a 90-day renewable license — renew via [developer.microsoft.com/en-us/microsoft-365/dev-program](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
- All credentials go in `.env` — never hardcode or commit
- The Make.com "Dobeu.net" connection handles auth via OAuth — no need to store MS365 tokens separately for Make.com flows
