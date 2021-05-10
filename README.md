# Prudential Email Template System
 
***This is a simple build system that we use to maintain and update code in support of email communication at Prudential.***

## Usage

1. Clone this repository using `gh repo clone maxpalmer-pru/prudential-email-system`

2. Run one of the following grunt tasks:
- `grunt`: to assemble the various code snippets and layouts into the *dist* directory.
- `grunt watch`: This will watch all the SCSS, layout, and partials files for changes and rebuild the templates as you work on them.
– `grunt deploy`: This will zip the `/dist` directory for deployment to an internal server, or emailing to a colleague.

## Files you'll start with in this package

`src/css:` This is compiled CSS that gets inserted into the layouts. You won't need to touch this.

`images:` Placeholder images for the layouts and snippets. Add any images to this directory that you will need for testing or deployment.

`includes:` These are handlebars partials that get compiled into the final layouts and snippets directory.

`layouts:` These are layout files that node-assemble pieces together from the handlebars files.

`non-dist-partials:` This is helper code for the purposes of piecing together the snippets and layouts, that don't get distributed to the email production teams.

`sass:` These are the SCSS files that are compiled into our final CSS directory.

`coding-guide.html:` This is a guide for the email production teams to gain some tips and insight into how these templates are to be used on production.


### Files will compile into `/dist`:

`dw:` These snippets are compiled for use as Dreamweaver snippets, for teams that still want them.

`layouts:` These are layout files, simple enough.

`layouts/all-modules.html:` This layout file is meant to display all available modules, for the purposes of testing. We usually run this file through Litmus each time we make a module addition. ***Note: You will have to manually add new snippets to `src/layouts/all-modules.html` for it to show up here.***

`modules:` This is where all the modules will compile into. These modules can be distributed to production teams for deployment into new emails.

## Test modules
Test files from `src/includes/test` and `src/layouts/test` will compile into `/test/layouts` or `/test/modules/`. These are code snippets that aren't ready for deployment. 

## Contributing

Currently, this repo is private and limited to individuals who are specifically involved in the development of the email template code at Prudential.