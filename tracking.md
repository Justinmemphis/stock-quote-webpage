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
