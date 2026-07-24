personal.js
===========

To add personal details to this CV sinply create a file in this directory called `personal.js` with the following
structure:

```javascript
export const details = {
  email: "<your email>",
  phone: "<your phone number",
  address: {
    url: "<a gio link to your address>",
    text: "<your address>"
  },
  website: {
    url: "<the url to your website",
    text: "<the name for the link your your website or leave blank to just use the URL>"
  }
}
```