Summary - ************************************************************************ this is 72 characters
06/15/22:
Summary - finished symbol lookup route; started quote lookup route
Details - changed string output of error (really catch block) of stock quote lookup; moved stock quote lookup function to a separate 'quote_lookup' file under controllers folder; moved csv parsing etc. to same file to clean up routes/api.js; created 'stock_quote' file and matching route in api.js - put in filler res.json to verify it works
Goal tomorrow - research api to connect to for financial data

06/14/22 - got stock symbol lookup through csv file to work; included search for substring; included convert to lowercase string and substring so search is case sensitive
Goal tomorrow - research stock data api?

06/13/22 - got route to button working correctly; added NASDAQ dataset of 8,438 companies and tickers ready (in CSV format); got csv file parsed via papaparse
Goal to work on next - do search through csv file for stock symbol lookup

06/12/22 - started to program submit button form for stock symbol lookup - didn't have time to get very far as cut short

06/11/22 - created package.json file; got node running correctly; got index.html displaying correctly; also added gitignore so node modules don't go to github; had to redo 1/2 an hour of work because I messed up github commits
Goal for tomorrow - start to create stock symbol lookup - use controller js file

06/10/22 - created basic file structure; created basic server.js file; created basic index.html file; created basic style.css file
Goal for tomorrow - prepare package.json; get Node running correctly; get index.html displaying correctly

Plan of action:
- Create basic HTML webpage
- Create basic CSS
- Create basic javascript file for server
- Create basic javascript routes file
- Create basic javascript controller file

Implementation:
- Link up Yahoo Finance API (or equivalent)
- Get ability to select certain financial variables (free cash flow, net income, etc.)
- Compare companies?
- Graphing results?
- React front-end to check stock quote etc.?

Later options:
- Create MongoDB database of user logins - to store saved companies, etc.
- Create login / password input forms
- Hash password with bcrypt library
- Have login through Auth0? Or google?

How to run npm/node:
1. In project folder, "npm init"
2. Install packages with npm - "npm i -s express" etc.
3. Run "node server.js" or "nodemon server.js"

https://levelup.gitconnected.com/set-up-and-run-a-simple-node-server-project-38b403a3dc09
how to find objects in array: https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
how to use papaparse csv parsing: https://stackoverflow.com/questions/49752889/how-can-i-read-a-local-file-with-papa-parse
