# Presentation Domain

URL: https://lvmh-partnership.projectrhapsody.com

Hosting provider: Firebase. GitHub stores source code only.
Firebase project: project-rhapsody-eb1bc.
Dedicated hosting site (pending creation): rhapsody-lvmh-partnership.

Exact DNS records are pending Firebase authentication and custom-domain setup.
Do not add the earlier proposed GitHub Pages CNAME; that configuration was removed.

Configure only the lvmh-partnership host in the projectrhapsody.com zone (no
hyphen). Do not enable forwarding or change root-domain, www, or email records.
After DNS verification, Firebase provisions the HTTPS certificate.

Deploy only this site using:
`firebase deploy --only hosting:rhapsody-lvmh-partnership --project project-rhapsody-eb1bc`

The hosted presentation will be public; noindex is not access control.
