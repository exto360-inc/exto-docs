---
description: "The Console Account page: your name, contact details, password, MFA, notifications and access."
---

# Managing your account

::: tip Who can do this
Anyone, for themselves, whatever their role. Every user has an Account page.
:::

Your name, email, password and sign-in methods are not edited in Exto — they
live in **Console**, on the **Account** page. This is where you manage your own
identity: your name, contact details, password, multi-factor authentication,
notifications and access.

## Opening it

From Exto, open your [profile](/account/profile) and follow the **Console** link
at the bottom of the panel. In Console, open the **Account** page from the user
menu at the top right or, in the Customer Portal, from the **Account** entry in
the sidebar.

## Layout

The page has a left column with the sections you can edit, and a right-hand
**Account Changes** activity log listing recent changes to your account, grouped
by date.

## Profile

Your personal information.

- **Username** — read-only, set when your account was created.
- **First Name**, **Last Name**, **Nickname**, **Display Name** — all editable.
  Click **Edit Profile**, change what you need, and click **Save**.

Below the names is **Contact Information**:

- **Email** — your primary email, with a verified or unverified badge. If it is
  unverified, a **Resend verification** action is available.
- **Phone** — optional. Add, edit, remove and verify it with the buttons
  provided. Clicking **Verify** sends a verification SMS.

## User Attributes

For customer users only. If your customer has defined custom user attributes —
company, department, cost centre and so on — they appear here. If you belong to
more than one customer organisation, an organisation switcher lets you fill in
the attributes for each one separately.

Edit the fields and click **Save Attributes**.

## Password

You cannot change your password inline — passwords are managed by the identity
provider. Click **Send Password Reset Email** and a reset link is emailed to
you. After clicking it there is a one-minute cooldown before you can request
another.

## Multi-factor authentication

From this section you can:

- See which MFA methods are enabled on your account.
- **Set up Authenticator App** (TOTP).
- **Enable Email OTP**.
- **Add Passkey**.
- Remove any method. A confirmation step makes sure you do not lock yourself out.

What each method is, how to enrol in it, and what to do if you lose your device
are covered in [Multi-factor authentication](/account/multi-factor-authentication).

## Notifications

::: info Internal operators only
Customer portal users do not see this panel — their notifications are managed
at the customer level.
:::

Choose which event categories send you notifications, and on which channels.

| Categories | Channels |
| --- | --- |
| Operations, Discrepancies, Billing, Infrastructure, General | In-app and email |

Each subscription has two toggles, one per channel. Subscriptions marked
**Required** are mandatory for your role and cannot be turned off.

## Tenant Access

A read-only list of the tenants you are assigned to, with your role in each. To
add or change an assignment, ask a customer admin. Switching between them in
Exto is covered in [Choosing a tenant](/account/tenants).

## Identity Provider Links

A read-only list of the external identity providers — Google, Microsoft, custom
OIDC — linked to your account. Useful if you sign in via SSO and need to confirm
which external account maps to your identity.

## Account Changes

The right-hand column: a reverse-chronological audit of changes to your own
account — what changed, when, and who made the change. Check it if you suspect
an unauthorised change.

Changes made by an operator show the operator's initials. System events show a
generic system marker.

## Related

- [Your profile](/account/profile) — the settings that do live in Exto
- [Multi-factor authentication](/account/multi-factor-authentication)
- [Signing in](/account/signing-in)
- [Choosing a tenant](/account/tenants)
