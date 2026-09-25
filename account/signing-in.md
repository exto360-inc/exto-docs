---
description: "Signing in with Exto ID, and what each failure means."
---

# Signing in

::: tip Who can do this
Anyone with an account. You cannot sign yourself up — an administrator creates
your account and you arrive by invitation.
:::

Exto signs you in through **Exto ID**, a single sign-in shared across the Exto
suite. You enter your email, and Exto ID works out which organisation you belong
to and how your organisation authenticates.

<Shot src="account/login" alt="The Exto ID sign-in page"
  caption="Sign in to continue — one email field, and the rest follows from it." />

## Steps

1. Open your organisation's Exto address.
2. You are taken to **Sign in to continue**.
3. Enter your **email address** and choose **Continue**.
4. Authenticate however your organisation is set up — a password, a one-time
   code, or your company's own identity provider.
5. You are returned to Exto and land on your home page.

## Why it asks for your email first

That single field does the work. Exto ID uses your email's domain to find your
organisation, then sends you to whichever sign-in method that organisation
uses — so nobody has to know in advance whether their company uses a password
or single sign-on.

It also means one identity across every Exto product. Signing in once is
enough.

## Where you land

Your **landing page** is chosen by an administrator — often
[My tasks](/work/my-tasks), sometimes a dashboard. If none is set, you land on
Projects.

If you have access to more than one **tenant**, you are asked which to use
first. See [Choosing a tenant](/account/tenants).

## When it does not work

| What you see | What it means |
| --- | --- |
| **Redirecting to secure sign-in…** that does not finish | Exto ID could not be reached. Wait, then reload. |
| Your email is not recognised | The account does not exist, or it was created under a different address. |
| Authentication succeeds, but Exto rejects you | Your account exists in Exto ID but has no access to this instance. An administrator has to grant it. |
| A **maintenance** page | The instance is down deliberately. Wait. |
| A **decommissioned** notice | That instance is gone. Ask your administrator where to go. |
| You get in, but nothing looks right | Check which [tenant](/account/tenants) you are in. |

::: warning Signing out of Exto is not signing out of Exto ID
Because the sign-in is shared, leaving Exto does not end your Exto ID session.
On a shared machine, sign out of Exto ID itself.
:::

## Staying signed in

Your session ends after a period of inactivity and you are asked to sign in
again. This is a security setting, not a fault, and the threshold is set for
your instance rather than by you.

## Related

- [Choosing a tenant](/account/tenants)
- [Your profile](/account/profile)
- [How do I sign in, and what if I can't?](/recipes/account/sign-in)
