# next-static-export-fix-csp-quotes

Fixes the incorrectly escaped quotes in the meta content security policy tag on next.js static exports.

When building Next.JS builds a static export using `next export`, any content security policy added into `_document.ts` will be improperly escaped, leading this this:

```html
<meta http-equiv="Content-Security-Policy" content="default-src &#x27;self&#x27; &#x27;unsafe-eval&#x27;"/>
```

This tool searches for html files in the `./out` directory of a next.js export, and fixes all occurrances of ` &#x27;` to replace them to `'` so that the content security can be parsed by browsers.

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-eval'"/>
```

# Installation

```sh
npm install --save-dev next-static-export-fix-csp-quotes
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
Updating [groupId].html
Fixed 8 occurrances
Updating app.html
Fixed 8 occurrances
Updating index.html
Fixed 8 occurrances
Updating r.html
Fixed 8 occurrances
Updating system.html
Fixed 8 occurrances
Updating test.html
Fixed 8 occurrances
Done
```

# Licence & Warranty

This is licensed under the MIT licence, and can be freely used. There is no warranty; use at your own risk.

# Caveats & Bugs

- This has not been testing on windows
- There are no unit tests yet
