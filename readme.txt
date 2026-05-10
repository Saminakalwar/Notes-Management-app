# samina-mern-10shine

in frontend :

cd samina-mern-10shine
npm create vite@latest frontend
npm install
npm install axios react-router-dom
npm run dev


basic signup :

import React from 'react'
import { useState } from 'react'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("form submitted");
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input placeholder='username' type='text' onChange={(e)=>setName(e.target.value)} value={name}></input>
        <input placeholder='email' type='text' onChange={(e)=>setEmail(e.target.value)} value={email}></input>
        <input placeholder='password' type='text' onChange={(e)=>setPassword(e.target.value)} value={password}></input>
        <button type="submit" >SignUp</button>  
        {/* on user click api shuld be called via axios hich is definedas register in authContext */}
      </form>
    </div>
  )
}

export default Signup

now e want as user click signup button register api should be called via axios 
authContext.register(-,-,-)

for this will have to :
craete axios.js
authContext
useAuth

then use here in this file 


import tailwind based on official documentation guidance 

add google fonts link in index.css

npm i react-icons


pr requested !!!


github steps to raise pr 

git clone git@github.com:Saminakalwar/samina-mern-10shine.git
cd samina-mern-10shine
git checkout develop
git pull origin develop
git checkout -b feature/login-signup-ui
git add .
git commit -m "feature: add login and signup UI with validation, passwordToggle and navbar"
git status
git push origin feature/login-signup-ui


user:{type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},

this line declares that every document using this schema must have a user field,
 which contains a valid ObjectId that references a document in the User collection. 
 This sets up a one-to-one or many-to-one relationship, depending on the context of the schema.


const dotenv = require('dotenv');
dotenv.config();
Purpose: Loads environment variables from a .env file into process.env.

By default, browsers block cross-origin requests for security reasons.

cors() tells Express: “Yes, I want to allow requests from other origins”.


Allow any frontend (open):
app.use(cors());


Restrict only to your frontend:
app.use(cors({
  origin: "http://localhost:5173",  // only React app can call API
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

 This code snippet securely hashes a password by first generating 
 a unique salt and then combining that salt with the plain-text 
 password using the bcrypt algorithm, resulting in a secure hash 
 suitable for storage and later comparison during user authentication.




const user = new User({ username, email, password: hashed });
await user.save();   // you need this extra step

At first line, user exists only locally (not yet in the database).
To actually save it into MongoDB, you must call await user.save().

vs //

const user = await User.create({ name, email, password: hashed });
Creates a new document and saves it immediately in MongoDB in one step.

generated token :

New Ameen Computer@DESKTOP-45M35AD MINGW64 ~
$ node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
6fa4faa34824a286f54f111598698c8f9f3e754ddc95292a1f5e78e247ddc07f6fc14c72bd76853a
256fb6827137dc8eccf2961125b336a1c90031c192eaf379


the file authMiddleware.js — is your JWT token authentication utility (also called authentication middleware).
Let’s break it down clearly 👇

🧠 What It Is

authMiddleware.js is a JWT-based authentication middleware function in Express.
It’s not a route or controller — it’s a reusable “guard” that:
Extracts the token from the Authorization header (Bearer <token>),
Verifies it using your JWT_SECRET,
Decodes it to find the user’s ID,
Fetches that user from the database,
Attaches the user to req.user,
Calls next() to allow the request to continue.

Think of authMiddleware as a security guard at the door:

It checks every visitor’s ID card (token),
If valid → lets them in,
If fake/expired → blocks access immediately.


const authHeader = req.headers.authorization || '';
is better because it’s safer, more defensive, and won’t crash your API when someone forgets to send the header 💪


npm i react-modal

react-modal is a popular React package that lets you create
 modals / popups / dialog boxes easily — for example, confirmation 
 dialogs, edit forms, or custom alerts.


 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTUyZTg0MjJkNjFlYjk3NDcwODQ1ZCIsImlhdCI6MTc1OTg1MTM1MSwiZXhwIjoxNzYwNDU2MTUxfQ.ujaaJimJ_vpyDxynUidgug0QEwTj2ZrLKGSAPJSZZLs





 PR2 commands:

 
New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/login-signup-ui)
$ git checkout develop
Switched to branch 'develop'
Your branch is up to date with 'origin/develop'.

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (develop)
$ git pull origin develop
remote: Enumerating objects: 1, done.
remote: Counting objects: 100% (1/1), done.
remote: Total 1 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (1/1), 970 bytes | 97.00 KiB/s, done.
From github.com:Saminakalwar/samina-mern-10shine
 * branch            develop    -> FETCH_HEAD
   f462a0d..567092c  develop    -> origin/develop
Updating f462a0d..567092c
Fast-forward
 .gitignore                                |  166 +-
 backend/.gitkeep                          |    1 -
 frontend/eslint.config.js                 |   29 +
 frontend/index.html                       |   13 +
 frontend/package-lock.json                | 3446 +++++++++++++++++++++++++++++
 frontend/package.json                     |   31 +
 frontend/{.gitkeep => src/App.css}        |    0
 frontend/src/App.jsx                      |   18 +
 frontend/src/components/Navbar.jsx        |   12 +
 frontend/src/components/PasswordInput.jsx |   38 +
 frontend/src/index.css                    |   30 +
 frontend/src/main.jsx                     |   13 +
 frontend/src/pages/Dashboard.jsx          |   17 +
 frontend/src/pages/Login.jsx              |   83 +
 frontend/src/pages/Signup.jsx             |   99 +
 frontend/src/utils/helper.js              |    5 +
 frontend/vite.config.js                   |   10 +
 17 files changed, 3893 insertions(+), 118 deletions(-)
 delete mode 100644 backend/.gitkeep
 create mode 100644 frontend/eslint.config.js
 create mode 100644 frontend/index.html
 create mode 100644 frontend/package-lock.json
 create mode 100644 frontend/package.json
 rename frontend/{.gitkeep => src/App.css} (100%)
 create mode 100644 frontend/src/App.jsx
 create mode 100644 frontend/src/components/Navbar.jsx
 create mode 100644 frontend/src/components/PasswordInput.jsx
 create mode 100644 frontend/src/index.css
 create mode 100644 frontend/src/main.jsx
 create mode 100644 frontend/src/pages/Dashboard.jsx
 create mode 100644 frontend/src/pages/Login.jsx
 create mode 100644 frontend/src/pages/Signup.jsx
 create mode 100644 frontend/src/utils/helper.js
 create mode 100644 frontend/vite.config.js

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (develop)
$ git checkout -b feature/frontend/auth-context
Switched to a new branch 'feature/frontend/auth-context'

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/auth-context)
$ git status
On branch feature/frontend/auth-context
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   frontend/package-lock.json
        modified:   frontend/package.json
        modified:   frontend/src/App.jsx
        modified:   frontend/src/main.jsx
        modified:   frontend/src/pages/Login.jsx
        modified:   frontend/src/pages/Signup.jsx

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        frontend/src/contexts/
        frontend/src/hooks/
        frontend/src/services/

no changes added to commit (use "git add" and/or "git commit -a")

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/auth-context)
$ git add .

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/auth-context)
$ git status
On branch feature/frontend/auth-context
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   frontend/package-lock.json
        modified:   frontend/package.json
        modified:   frontend/src/App.jsx
        new file:   frontend/src/contexts/AuthContext.jsx
        new file:   frontend/src/hooks/useAuth.js
        modified:   frontend/src/main.jsx
        modified:   frontend/src/pages/Login.jsx
        modified:   frontend/src/pages/Signup.jsx
        new file:   frontend/src/services/api.js


New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/auth-context)
$ git commit -m "Add AuthContext and integrate Login/Signup with backend APIs"
[feature/frontend/auth-context 2dca782] Add AuthContext and integrate Login/Signup with backend APIs
 9 files changed, 505 insertions(+), 29 deletions(-)
 create mode 100644 frontend/src/contexts/AuthContext.jsx
 create mode 100644 frontend/src/hooks/useAuth.js
 create mode 100644 frontend/src/services/api.js

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/auth-context)
$ git status
On branch feature/frontend/auth-context
nothing to commit, working tree clean

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/auth-context)
$ git push origin feature/frontend/auth-context
Enumerating objects: 27, done.
Counting objects: 100% (27/27), done.
Delta compression using up to 8 threads
Compressing objects: 100% (14/14), done.
Writing objects: 100% (17/17), 6.86 KiB | 1.37 MiB/s, done.
Total 17 (delta 6), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (6/6), completed with 6 local objects.
remote:
remote: Create a pull request for 'feature/frontend/auth-context' on GitHub by visiting:
remote:      https://github.com/Saminakalwar/samina-mern-10shine/pull/new/feature/frontend/auth-context
remote:
To github.com:Saminakalwar/samina-mern-10shine.git
 * [new branch]      feature/frontend/auth-context -> feature/frontend/auth-context

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/auth-context)
$ ^C

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/auth-context)
$



Git tutorial :

first of all craete repo on github
copy ssh/https link from code

on local repo git bash terminal

run :

git clone "url"   //to clone repo on local machine
cd in cloned folder
ls: list of all files inside
ls -a: list of all files along with hidden files like .git


git status    //to confirm local and remote repo uptodate
 untracked : new files that git git dont know
 modified  : changed files
 staged : ready to be committed means added
 unmodified : unchanged

git add filename   //or
git add .  // adds new/changed files from ur working directory to the git staging area

git commit -m "some msg"  // it is the record of changed

after this status will show nothing to commitbut yet our code will not be on github 
to push /upload our changes to github repo from local repo

git push origin main

//now changes will be shown on github 


origin : it basically refers to the remote repo in which we r pushing our code or to which we had cloned initially in our local system
while main refers to the branch on that repo, it can be any other as well


 ok now above given all directions were about the repo we created on github and then cloned to work on locally
 what if we created project directly in our local system after creating folder which we usually do ,

so for that we use git init command to push our project repo on github

example :
create localrepo named folder and go inside it via cd 
type ls -a // will show no .git 

git init 
ls -a   // now will show .git folder 

now whatever we create inside folder like any file/ files , or we update these will be tracked by git

git status   // will display untracked files/ changes to be committed

git add .

git commit -m msg"

git status 


now to uplaod this project on github 

go on github , create repo let say "localRepo"
ignore readme
create

as we know repos on github are called as remote repos so
we  want to create new remote repo named origin 


git remote add origin "link"  //this link will be shown there to copy

on running it our origin will get set 

git remote -v   // to verify remote repo we r talking about above

git branch // to check the branch in which we r currently

git branch -M main   //to rename branch (suppose master to main)

git push origin main 

if we know our origin will remain same and we dont want to write it everytime on push then 
we can write :

git push -u origin main

now our code has been pushed !!!


so normal flow be like :
github repo => clone => changes => add => commit => push


Branches :
git branch // to check name 
git branch -M main //to rename
git checkout <branch name>  // to navigate or switch to other branch
git checkout -b <new branch name>   // to create new branch and navigate inside it 

git branch -d <branch name > //to delete branch but we must be outside of the branch to be deleted else we will not be able to do it 

now to add new feature/changes inside a feature 1 branch 
git checkout feature1

make changes in files    //let say updated index.html
*now all made changes after it will be updated in feature1 branch not main or ant other branch 

git status    //will show changes to be commited on feature1 branch

git add .

git commit -m "add new feature"

git status   // nothing to commit in feature1

now if we run :

git checkout main
// here the new added feature will be missing 

git checkout feature1
// new feature will be appeared

to push cahnges on github 

git push origin feature1


compare and pull will be appeared on github and changes will be updated on feature branch

now we want our feature to be merged on main 

Two ways :

way 1 => 
git diff <branch name>    // to compare commits, branches, files &  more to see differences in two different branches
git merge <branch name >


example if i want to compare feature1 with main
let say currently on feature branch so type:

git diff main

it will show the differences on current and main

to merge both :

git merge main   // now feature1 will be merged with main 


Way 2:

on github via PR

generally a mentor or senior developer see the main branch while others in team work on different features on feature branches
so PR lets teammates to tell others and mentor about changes u have pushed to a branch in a repo on github

then mentor review it , if sth wrong or missing he comments to resolve it before if 
everything works well then mentor simply merge it in main 


suppose we r going with way 1


so beside compare and pull request button we can set our base branch in which we want to merge our feature branch

let say here main is base and feature1 is compare to be merged in main

click create PR.


it will show conflicts or no conflicts , hence if no conflict we can merge safely 

*confirm merge will create a new commit of merging

now main is uptodate with feature1 both are same on github

now when we will come in our local project and checkout to main we will still not see the changes in local repo bcz that merging was only done at github 
hence to pull(fetch & download content) from remote changes in local repo and immediately update local repo to match that content
we use pull command

staying in main branch run:

git pull origin main

Resolving merge conflicts :when git is unable to automatically resolve differences in code bw two commits.

suppose index.html right now looks like this in both feature1 and main:

<p>This is a new repo</p>
<p>This is a new feature</p>


now lets add button in main branch index.html

<p>This is a new repo</p>
<p>This is a new feature (button) </p>

git add .
git commit -m "add button"

now checkout to feature1 branch and add dropdown at same place in index.html

git checkout feature1

<p>This is a new repo</p>
<p>This is a new feature (drodown) </p>

git add .
git commit -m "add drop down"

git diff main // will show difference 

now lets merge :

git merge main 

now it will show error in vscode which is basically merge conflict

it will show some arrows with 
accept incoming changes(main) (means the code of other branch with which we have conflict here ot will be main)

accept current change (in head / feature1)

accept both
so we will remove extra lines and simply will save the code we want which is :
<p>This is a new repo</p>
<p>This is a new feature (button) </p>
<p>This is a new feature (drodown) </p>

then simply :
git statusgit add .
git commit -m "add both features"

git status //nothing to commit

git diff main // 1 extra line on main comparison

git checkout main  // line of feature1 will be missed here 

now we want to merge our feature1 with main :

git merge feature1
//no conflict bcz no change in same line of code

push on github
git push 



Undoing changes :

Case 1: Staged changes
        git reset <filename>
        git reset

    suppose from main index.html acciedently deleted button line
    *git add .    //(mistakenly)
    *git reset index.html
    if many files then 
    *git reset

Case 2: Commited changes(for one commit)
        git reset HEAD~1                  //HEAD~1 here refers to latest commit 
                                          //this commant will reset 1 commit step back 
                                        //we will be switched to one add and commit back
        git log       //will show all commit except the one added mistakenly  

      suppose from main index.html accidently deleted button line, added and also commited it 
    *git add .    //(mistakenly)
    *git commit -m "button deleted"
    *git reset index.html
    if many files then 
    *git reset

Case 3: Commited changes (for many commits)
        git reset <commit hash>
        git reset --hard <commit hash>


        suppose previous commits :

        1 => 2 => 3 => 4(HEAD)
        from git log we will copy hash of the commit to which we wanna go back
        suppose from 4 to 1, so copy hash of 1 

        git reset < 1 hash>
        to check :
        git status
        git log


        but it will yet show the changes made after that commit ,
        if we want to even remove the changes made after commit as well 
        then,

         git reset --hard <1 hash>

        git status   // done



        FORK:
        a new repo sharing code and visibility settings with the original "upstream" repo.

        fork is a rough copy
        suppose we want to do open source contribution, we want copy of specific repo copy on our profile

        go to repo:
        select fork
        give name 
        either copy main branch or copy whole code repo



git add frontend/src/contexts/NotesContext.jsx
git add frontend/src/hooks/useNotes.js
git add frontend/src/components/EditNotes.jsx
git add frontend/src/components/NoteCard.jsx
git add frontend/src/pages/Home.jsx


git add frontend/src/App.jsx

git add frontend/src/main.jsx
git add frontend/package.json


PR 3 : notes-crud


New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/auth-context)
$ git checkout develop
Switched to branch 'develop'
Your branch is up to date with 'origin/develop'.

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (develop)
$ git pull origin develop
From github.com:Saminakalwar/samina-mern-10shine
 * branch            develop    -> FETCH_HEAD
Already up to date.

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (develop)
$ git checkout -b feature/frontend/notes-crud
Switched to a new branch 'feature/frontend/notes-crud'

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git add frontend/src/contexts/NotesContext.jsx

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git add frontend/src/hooks/useNotes.js

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git add frontend/src/components/EditNotes.jsx

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git add frontend/src/components/NoteCard.jsx

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git add frontend/src/pages/Home.jsx

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git add frontend/src/App.jsx

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git add frontend/src/main.jsx

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git status
On branch feature/frontend/notes-crud
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   frontend/src/App.jsx
        new file:   frontend/src/components/EditNotes.jsx
        new file:   frontend/src/components/NoteCard.jsx
        new file:   frontend/src/contexts/NotesContext.jsx
        new file:   frontend/src/hooks/useNotes.js
        modified:   frontend/src/main.jsx
        new file:   frontend/src/pages/Home.jsx


New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git commit -m "Feature: Implement Notes CRUD (create, edit, delete, fetch) with NotesContext, TipTap rich text editor and Home page integration"
[feature/frontend/notes-crud 6d89ccb] Feature: Implement Notes CRUD (create, edit, delete, fetch) with NotesContext, TipTap rich text editor and Home page integration
 7 files changed, 434 insertions(+), 12 deletions(-)
 create mode 100644 frontend/src/components/EditNotes.jsx
 create mode 100644 frontend/src/components/NoteCard.jsx
 create mode 100644 frontend/src/contexts/NotesContext.jsx
 create mode 100644 frontend/src/hooks/useNotes.js
 create mode 100644 frontend/src/pages/Home.jsx

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git status
On branch feature/frontend/notes-crud
nothing to commit, working tree clean

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git push origin feature/frontend/notes-crud
Enumerating objects: 22, done.
Counting objects: 100% (22/22), done.
Delta compression using up to 8 threads
Compressing objects: 100% (13/13), done.
Writing objects: 100% (15/15), 5.78 KiB | 845.00 KiB/s, done.
Total 15 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
remote:
remote: Create a pull request for 'feature/frontend/notes-crud' on GitHub by visiting:
remote:      https://github.com/Saminakalwar/samina-mern-10shine/pull/new/feature/frontend/notes-crud
remote:
To github.com:Saminakalwar/samina-mern-10shine.git
 * [new branch]      feature/frontend/notes-crud -> feature/frontend/notes-crud

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)





git add frontend/src/pages/Profile.jsx
git add frontend/src/components/Navbar.jsx
# Only if changed:
git add frontend/src/contexts/AuthContext.jsx
git add frontend/src/hooks/useAuth.js





PR 4 : profile page

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/notes-crud)
$ git checkout develop
Switched to branch 'develop'
Your branch is up to date with 'origin/develop'.

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (develop)
$ git pull origin develop
From github.com:Saminakalwar/samina-mern-10shine
 * branch            develop    -> FETCH_HEAD
Already up to date.

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (develop)
$ git checkout -b feature/frontend/profile-page
Switched to a new branch 'feature/frontend/profile-page'

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/profile-page)
$ git add frontend/src/pages/Profile.jsx

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/profile-page)
$ git add frontend/src/components/Navbar.jsx

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/profile-page)
$ git add frontend/src/App.jsx

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/profile-page)
$ git add frontend/package.json

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/profile-page)
$ git status
On branch feature/frontend/profile-page
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   frontend/package.json
        modified:   frontend/src/App.jsx
        modified:   frontend/src/components/Navbar.jsx
        new file:   frontend/src/pages/Profile.jsx


New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/profile-page)
$ git commit -m "✨ Feature: Add Profile page and improved Navbar with user dropdown and logout functionality"
[feature/frontend/profile-page b700637] ✨ Feature: Add Profile page and improved Navbar with user dropdown and logout functionality
 4 files changed, 201 insertions(+), 9 deletions(-)
 create mode 100644 frontend/src/pages/Profile.jsx

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/profile-page)
$ git status
On branch feature/frontend/profile-page
nothing to commit, working tree clean

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/profile-page)
$ git push origin feature/frontend/profile-page
Enumerating objects: 18, done.
Counting objects: 100% (18/18), done.
Delta compression using up to 8 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (10/10), 3.24 KiB | 663.00 KiB/s, done.
Total 10 (delta 5), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (5/5), completed with 5 local objects.
remote:
remote: Create a pull request for 'feature/frontend/profile-page' on GitHub by visiting:
remote:      https://github.com/Saminakalwar/samina-mern-10shine/pull/new/feature/frontend/profile-page
remote:
To github.com:Saminakalwar/samina-mern-10shine.git
 * [new branch]      feature/frontend/profile-page -> feature/frontend/profile-page

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/profile-page)








PR 5


New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/profile-page)
$ git checkout develop
Switched to branch 'develop'
Your branch is up to date with 'origin/develop'.

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (develop)
$ git pull origin develop
From github.com:Saminakalwar/samina-mern-10shine
 * branch            develop    -> FETCH_HEAD
Already up to date.

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (develop)
$ git checkout -b feature/frontend/UI-polish
Switched to a new branch 'feature/frontend/UI-polish'

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/UI-polish)
$ git add frontend/src/index.css

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/UI-polish)
$ git commit -m "UI Polish: Improve Tailwind structure, theme colors, and TipTap editor styling"
[feature/frontend/UI-polish d817a76] UI Polish: Improve Tailwind structure, theme colors, and TipTap editor styling
 1 file changed, 49 insertions(+), 3 deletions(-)

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/UI-polish)
$ git status
On branch feature/frontend/UI-polish
nothing to commit, working tree clean

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/UI-polish)
$ git log
commit d817a76b7f3c24e95fd56fd96ae580b3a17c0071 (HEAD -> feature/frontend/UI-polish)
Author: Saminakalwar <saminakalwar9@gmail.com>
Date:   Sat Oct 11 17:17:59 2025 +0500

    UI Polish: Improve Tailwind structure, theme colors, and TipTap editor styling

commit 567092c421a183442b4a90f08618b4a9acb5432c (origin/develop, develop)
Merge: f462a0d c5baf3b
Author: Muhammad Noman <105278793+nomanyousuf-10P@users.noreply.github.com>
Date:   Fri Oct 3 15:32:07 2025 +0500

    Merge pull request #1 from Saminakalwar/feature/login-signup-ui

    feature: add login and signup UI with validation, passwordToggle and …

commit c5baf3b73353512a91fd93c54452bd024628be21 (origin/feature/login-signup-ui, feature/login-signup-ui)
Author: Saminakalwar <saminakalwar9@gmail.com>
Date:   Wed Oct 1 16:29:29 2025 +0500

    feature: add login and signup UI with validation, passwordToggle and navbar

commit f462a0d0bb39ed51a19d8d852d8d96efb62e1827 (origin/main, origin/HEAD, main)
Author: Saminakalwar <saminakalwar9@gmail.com>
Date:   Sat Sep 20 10:34:48 2025 +0500

    Add backend and frontend folders with .gitkeep files

commit bbbcbe4276efcb7c735c67db16d3e71e491cc66c
Author: CodeCrafter2001 <130890130+Saminakalwar@users.noreply.github.com>
Date:   Sat Sep 20 10:07:58 2025 +0500

    Initial commit

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/UI-polish)
$ git push origin feature/frontend/UI-polish
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Delta compression using up to 8 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (5/5), 1.16 KiB | 596.00 KiB/s, done.
Total 5 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
remote:
remote: Create a pull request for 'feature/frontend/UI-polish' on GitHub by visiting:
remote:      https://github.com/Saminakalwar/samina-mern-10shine/pull/new/feature/frontend/UI-polish
remote:
To github.com:Saminakalwar/samina-mern-10shine.git
 * [new branch]      feature/frontend/UI-polish -> feature/frontend/UI-polish

New Ameen Computer@DESKTOP-45M35AD MINGW64 /e/10Pearls/MERN/mern-10shine-to-push-on-github/samina-mern-10shine (feature/frontend/UI-polish)
$





# Step 1: Switch to develop and pull latest code
git checkout develop
git pull origin develop

# Step 2: Create a new backend setup feature branch
git checkout -b feature/backend/setup-server-db

# Step 3: Stage files for PR6
git add backend/server.js \
backend/src/config/db.js \
backend/src/logger/logger.js \
backend/.env.example \
backend/package.json

# Step 4: Commit
git commit -m "Setup backend server with Express, MongoDB connection, and basic logger"

# Step 5: Push branch
git push origin feature/backend/setup-server-db




pr7


git checkout develop
git pull origin develop
git checkout -b feature/backend/auth-api

git add src/controllers/authController.js src/routes/authRoutes.js src/models/User.js src/utils/jwt.js src/utils/validator.js
git commit -m "Add user authentication (register, login, get-user) APIs"
git push origin feature/backend/auth-api


 modified:   frontend/src/App.jsx
        modified:   frontend/src/contexts/NotesContext.jsx
        new file:   frontend/src/contexts/ProfileContext.jsx
        modified:   frontend/src/contexts/authContext.jsx
        new file:   frontend/src/hooks/useProfile.jsx
        modified:   frontend/src/index.css
        modified:   frontend/src/main.jsx
        modified:   frontend/src/pages/Profile.jsx


pr8

git checkout develop
git pull origin develop
git checkout -b feature/backend/notes-api

git add src/controllers/noteController.js src/models/Note.js src/routes/noteRoutes.js
git commit -m "Add notes CRUD endpoints (create, read, update, delete)"
git push origin feature/backend/notes-api


git checkout develop
git pull origin develop
git checkout -b feature/backend/middleware

git add src/middleware/authMiddleware.js src/middleware/errorMiddleware.js
git commit -m "Add auth and global error middleware"
git push origin feature/backend/middleware

pr#16


 git checkout develop 
 git pull origin develop 
  git checkout -b feature/backend/profile-api 
   git add src/config/cloudinary.js src/controllers/profileController.js src/routes/profileRoutes.js src/models/User.js server.js 
    git commit -m "Add profile management APIs (profile data, picture upload, and account deletion)"
     git push origin feature/backend/profile-api


server.js
noteController
authController
authMiddleware





Testing :

Unit testing with mocha & Changes

Mocha : testing framework 

npm install --save-dev mocha

i ran : 
npm i mocha --save-dev   (from tutorial)

1. npm install --save-dev mocha chai supertest nyc
(from gpt)
2. npm audit fix
3. npx mocha --version
4. npx nyc --version

added in package.json to free from writing in console again & again:

 "test": "mocha --timeout 10000 --exit",
  "coverage": "nyc npm test"

  will automatically run tests

  now it looks :

    "scripts": {
    "test": "mocha --timeout 10000 --exit",
    "coverage": "nyc npm test",
    "dev": "cross-env NODE_ENV=development nodemon server.js",
    "start": "node server.js"
  },



now backend/tests/
  auth.test.js
  notes.test.js



now understanding chae library:

describe('my first test case', function(){
  it('value check 3', function(){
    assert.equal([1,2,3].indexOf(3),2)
  })

    it('value check 2', function(){
    assert.equal([1,2,3].indexOf(2),1)
  })

})

true
true


now using chae:

assert:

import ..;
var assert = chai.assert;
var should = chai.should;
var expect = chai.expect;


describe("",function(){

  let username = "Ali";
  let myList = {
  item:[{id:1, name: "sarim"}], title: "users list"
}

  it("check string",function(){
    assert.typeOf(username, 'string');
  });

    it("equal match",function(){
    assert.equal(username, 'Ali');
  });

  it("length measure",function(){
    assert.lengthOf(myList.item, 1);
  });


})

in case multiple folders for tests , u can choose what to run by :
scripts:{
 // "test" : "mocha 'test-case/**/*.spec.js"
   "test" : "mocha 'tests/**/*.test.js"
}



####### Should ########

describe("should Check",function(){
  let username = "Ali";
  let myList = {
  item:[{id:1, name: "sarim"}], title: "users list"
}

it("check string", function(){
  username.should.be.a('string');
})

it("equal check", function(){
  username.should.equal('Ali');
})

  it("length measure",function(){
   myList.should.have.property('item').with.lengthOf(1);
  });

})



###### Expect #######

describe("", function(){
  let username = "Ali";
  let myList = {
  item:[{id:1, name: "sarim"}], 
  title: "users list",
  address: {
    country: "Pakistan",
    phone: ["1317367", "03252636"]
  }
}

it("match string", function(){
  expect(username).to.be.a("string");
})

it("equal check", function(){
  expect(username).to.equal('Ali');
})

it("length check", function(){
  expect(username).to.lengthOf(3);
})

  it("object length measure",function(){
   expect(myList).to.have.property('item').with.lengthOf(1);
  });

  it("api object match",function(){
   expect(myList).to.have.all.keys('item', 'title', 'address');
  });

  it("phone",function(){
   expect(myList).to.have.nested.property('address.phone[0]');
  });
  
  it("country name",function(){
   expect(myList).to.have.nested.include({'address.country': 'Pakistan'});
  });


}) 



now as i have to test only APIs , 

will have to use:
chai-http

npm install --save-dev chai-http

npm install chai-http@4.3.0 --save-dev

npm install mocha chai supertest --save-dev

we replaced chai-http with modern supertest bcz of compatibility issue.
Using SUPER TEST, we trigger a HTTP requests and then store the response in a variable.



Mocha needs to know when your test has finished running, 
especially if it involves asynchronous operations (like database calls or API requests).

There are two ways to tell Mocha a test is complete:
1. Using done() callback:
    Test starts running.
    API call takes time (async).
    Mocha would not know when it’s done unless you call done().
    When you call done(), Mocha moves to the next test.


2. Using async/await (modern way — preferred)       

    Mocha automatically waits for the async function to finish 
    — no need to call done() manually.



Before():  Runs Once Before All Tests

To prepare the environment before tests start.
Commonly used to:
    Connect to a database.
    Clear old test data.
    Set up authentication tokens.
    Start the server (if not already started)



after() — Runs Once After All Tests

To clean up resources after all tests have run.
Commonly used to:

    Close database connections.
    Stop the server.
    Delete test data or temporary files.



Async-await:

async function always returns a promise.
await pauses the execution of its surroundings async function until the promise is settled.

 
so the functions we think will take time to execute, we will put them inside async function with await keyword before them, 
while if there r multiple such functions with diferent data we can define the order of exection by own.
 

"Better explained :

An async function always returns a Promise — even if it doesn’t explicitly return one.
The await keyword can only be used inside an async function. It pauses the execution of that function until the awaited Promise is resolved (fulfilled) or rejected.
We use await before any function or operation that takes time (like API calls, database queries, or file reads).
If we have multiple asynchronous operations, we can:
Run them sequentially using multiple await statements (each waits for the previous one to finish).
Or run them in parallel using Promise.all() if they are independent.
"




subject:(Reset your password) OR "Notes App Support"






server.js
logger.js
profileController
profileRoutes
package.json
.env.example
User.js
cloudinary.js
upload.js





 




