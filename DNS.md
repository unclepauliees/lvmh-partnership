# Presentation Domain

URL: https://lvmh-partnership.projectrhapsody.com

In the DNS zone for **projectrhapsody.com** (no hyphen), add:

| Type | Name / Host | Value / Points to | TTL |
| --- | --- | --- | --- |
| CNAME | lvmh-partnership | unclepauliees.github.io | 1 hour |

Do not include https:// or a path in the value. Do not enable forwarding.
Do not change root-domain, www, or email records. If this host already has a
record, inspect it before replacing anything.

The custom hostname is registered in this repository's GitHub Pages settings.
After DNS propagates, GitHub provisions HTTPS. Enable Enforce HTTPS once the
certificate is available. The site is public, even though the deck is marked
Confidential; noindex is not access control.
