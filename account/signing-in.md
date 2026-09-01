---
description: "Password, one-time codes and SSO — and what to do when none work."
---

# Signing in

How you get into Exto, and what to do when you cannot.

<Shot src="account/login" alt="The sign-in page" pending
  caption="Sign in with email and password, or with your organisation's SSO." />

## The methods

| Method | How it works |
| --- | --- |
| **Email and password** | Sign in, then confirm with a one-time passcode. |
| **Single sign-on (SSO)** | Redirects to your organisation's identity provider. |

Which one applies is decided by your organisation, not by you. If your company
uses SSO, the password route will not accept your credentials — that is the
system working, not a broken password.

## One-time passcodes

After a password sign-in you are asked for a code. It is sent to the email
address on your account and expires quickly. Request a new one rather than
reusing an old code.

## Changing your password

Change it from your account settings. Password sign-in only — an SSO account's
password lives with your identity provider, not with Exto.

## Sign-in activity

Your sign-in history is recorded and visible to administrators under **User →
User log**. It is the first thing to check if you suspect an account has been
used by somebody else.

## When you cannot sign in

Work down this list:

1. **Right method?** Password or SSO — see above.
2. **Right tenant?** Your account may exist in one tenant and not another. See
   [Choosing a tenant](/account/tenants).
3. **Code not arriving?** Check spam, then request a new one.
4. **Access changed recently?** Ask your administrator — a group change can
   remove everything you could reach without removing the account itself.

::: tip "I can sign in but everything is empty"
That is not a sign-in problem. You are signed in with no groups granting you
anything, or you are in the wrong tenant. See
[Permissions](/concepts/permissions).
:::

## Maintenance

If the tenant is being maintained or has been decommissioned, you are shown a
page saying so rather than a sign-in error. There is nothing to retry — it is
a state, not a fault.

## Related

- [Choosing a tenant](/account/tenants)
- [Your profile](/account/profile)
