# next-static-export-fix-csp-quotes

Fixes the incorrectly escaped quotes in the meta content security policy tag on next.js static exports.

## The problem

Next.JS builds a static export using `next export`. Next's static export feature does not support 
the [Security Headers](https://nextjs.org/docs/advanced-features/security-headers) feature of Next, so the solution to 
adding a content security policy is to write it in `_document.ts`.

Unfortunately, due to React's automatic string escaping, any content security policy added into `_document.ts` will be 
improperly escaped, leading this this:

```html
<meta http-equiv="Content-Security-Policy" content="default-src &#x27;self&#x27; &#x27;unsafe-eval&#x27;"/>
```

This is due to a long-standing known issue in React:

- https://github.com/facebook/react/issues/13838
- https://github.com/vercel/next.js/issues/2006

## The fix

This tool searches for html files in the `./out` directory of a next.js export, and fixes all occurrances of ` &#x27;` to 
replace them to `'` so that the content security can be parsed by browsers.

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-eval'"/>
```

# Installation

```sh
npm install --save-dev git+ssh://git@github.com:datalink/next-static-export-fix-csp-quotes
```

# Usage

In your `package.json`, add it to the end of your build process as follows:

```json
{
  "scripts": {
    "build": "next build && next export && next-static-export-fix-csp-quotes",
  }
}

```

When building, you will see the following additional output:

```
Scanning dirdctory ./out for html files
Updating 404.html
Fixed 8 occurrances
Updating page.html
Fixed 8 occurrances
Updating app.html
Fixed 8 occurrances
Updating index.html
Fixed 8 occurrances
Done
```

# Licence & Warranty

This is licensed under the MIT licence, and can be freely used. There is no warranty; use at your own risk.

# Caveats & Bugs

- This has not been testing on windows
- There are no unit tests yet
