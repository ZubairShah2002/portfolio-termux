# 📱 Complete Beginner's Guide: Running Portfolio in Termux on Android

This guide assumes you have never used Termux before.
Every command is copy-paste ready. Follow every step in order.

---

## BEFORE YOU START — What You Need

- Android phone (any Android 7.0 or newer)
- At least 2 GB of free storage
- Internet connection (WiFi recommended)
- The `portfolio-termux.zip` file downloaded to your phone
- About 30–45 minutes of your time

---

# PART 1 — INSTALL TERMUX

---

## STEP 1 — Download Termux

```
DO NOT install Termux from the Google Play Store.
The Play Store version is outdated and broken.
```

Open your phone's browser and go to:

```
https://f-droid.org/packages/com.termux/
```

Tap **Download APK** and install it.

If your phone asks "Allow install from unknown sources" — tap **Allow**.

After installing, open Termux. You will see a black screen with a `$` symbol. That is the command line. This is where you type commands.

---

## STEP 2 — Update Termux Packages

Type this command exactly and press Enter:

```bash
pkg update && pkg upgrade -y
```

**What this does:**
- `pkg update` — refreshes the list of available packages
- `pkg upgrade -y` — installs all available updates
- `-y` means "yes to all questions" automatically

This may take 2–5 minutes. If it asks you any questions, just press Enter.

---

## STEP 3 — Install Required Tools

```bash
pkg install -y nodejs git unzip wget curl
```

**What each tool does:**
- `nodejs` — runs JavaScript/Next.js on your phone (includes npm)
- `git` — version control tool (needed later for Vercel deployment)
- `unzip` — extracts ZIP files
- `wget` — downloads files from the internet
- `curl` — another download tool

This will take 3–8 minutes depending on your internet speed.

---

## STEP 4 — Verify Node.js is Installed Correctly

```bash
node --version
```

You should see something like:

```
v20.x.x
```

Then check npm:

```bash
npm --version
```

You should see something like:

```
10.x.x
```

**If you see a version number — Node.js is working correctly.**
If you see "command not found" — go back to Step 3 and run it again.

---

# PART 2 — SET UP YOUR PROJECT FOLDER

---

## STEP 5 — Allow Termux to Access Your Files

```bash
termux-setup-storage
```

**What this does:**
A popup will appear asking for storage permission. Tap **Allow**.

This lets Termux access your Downloads folder and other folders on your phone.

After tapping Allow, wait 3 seconds, then continue.

---

## STEP 6 — Go to Your Downloads Folder

```bash
cd ~/storage/downloads
```

**What this does:**
- `cd` means "change directory" (move to a folder)
- `~/storage/downloads` is your phone's Downloads folder

---

## STEP 7 — Check That the ZIP File Is There

```bash
ls
```

**What this does:**
Lists all files in the current folder. You should see `portfolio-termux.zip` in the list.

If you do NOT see the file:
- Make sure you downloaded `portfolio-termux.zip` to your Downloads folder
- Some phones save to a subfolder — try `ls Download/` or check your file manager

---

## STEP 8 — Extract the ZIP File

```bash
unzip portfolio-termux.zip
```

**What this does:**
Extracts all project files from the ZIP into a folder called `portfolio-termux`.

You will see a long list of files being extracted. This is normal.

---

## STEP 9 — Move the Project to Your Home Folder

```bash
cp -r portfolio-termux ~/portfolio-termux
```

**What this does:**
Copies the project folder to your Termux home directory (`~/`). This is the safest place to work from in Termux.

---

## STEP 10 — Open the Project Folder

```bash
cd ~/portfolio-termux
```

**What this does:**
Moves you inside the project folder. All future commands must be run from inside this folder.

---

## STEP 11 — Confirm You Are in the Right Place

```bash
ls
```

You should see these files and folders listed:

```
app/
components/
data/
lib/
public/
package.json
next.config.js
tailwind.config.js
tsconfig.json
README.md
```

If you see these files, you are in the correct folder. 

---

# PART 3 — INSTALL PROJECT DEPENDENCIES

---

## STEP 12 — Install All npm Packages

```bash
npm install
```

**What this does:**
Downloads and installs all the JavaScript libraries the project needs (React, Next.js, Tailwind CSS, etc.).

This will take **5–15 minutes** on first run. You will see a progress bar and package names scrolling by. This is normal.

When finished, you will see:

```
added XXX packages in Xs
```

**Important:** Do NOT close Termux while this is running.

---

## STEP 13 — Verify Installation Succeeded

```bash
ls node_modules | head -10
```

**What this does:**
Shows the first 10 installed packages. If you see package names, installation worked.

If `node_modules` folder is empty or missing, run `npm install` again.

---

# PART 4 — RUN THE PROJECT

---

## STEP 14 — Start the Development Server

```bash
npm run dev
```

**What this does:**
Starts the Next.js development server on your phone.

Wait about 10–20 seconds. When you see this message, the server is ready:

```
▲ Next.js 14.x.x
- Local:   http://localhost:3000
✓ Ready in Xs
```

**The server is now running on your phone!**

Do NOT close Termux. The server keeps running as long as Termux is open.

---

# PART 5 — OPEN THE WEBSITE

---

## STEP 15 — Open the Portfolio on YOUR Phone

Open any browser on your phone (Chrome, Firefox, etc.) and type:

```
http://localhost:3000
```

You should see the beautiful dark cinematic portfolio website load.

**If the page does not load:**
- Make sure the terminal still shows "Ready" (do not close Termux)
- Try `http://127.0.0.1:3000` instead
- Wait 30 more seconds and try again

---

## STEP 16 — Open the Admin Panel on YOUR Phone

In your browser, go to:

```
http://localhost:3000/admin/login
```

Login with:

```
Email:    admin@portfolio.dev
Password: admin123
```

You will be taken to the admin dashboard where you can edit everything.

---

# PART 6 — ACCESS FROM ANOTHER DEVICE ON SAME WIFI

---

## STEP 17 — Find Your Phone's Local IP Address

Open a NEW Termux session (swipe from left edge to open drawer, tap "+") OR press Ctrl+C to stop the server first, then run:

```bash
ifconfig
```

Look for a line that shows `wlan0` and find the `inet` address. It will look like:

```
inet 192.168.1.XXX
```

That number (e.g. `192.168.1.105`) is your phone's local IP address. Write it down.

If `ifconfig` is not found, try:

```bash
ip addr show wlan0
```

Look for `inet` followed by numbers like `192.168.x.x`.

---

## STEP 18 — Start Server So Other Devices Can Access It

Stop the server first (press Ctrl+C), then start it with:

```bash
npm run dev -- --hostname 0.0.0.0
```

**What this does:**
The `--hostname 0.0.0.0` flag makes the server listen on all network interfaces, not just localhost. This allows other devices on the same WiFi to connect.

---

## STEP 19 — Open From Another Device

On your laptop, tablet, or another phone connected to the **same WiFi**, open a browser and go to:

```
http://192.168.1.XXX:3000
```

Replace `192.168.1.XXX` with the IP address you found in Step 17.

Example: If your IP was `192.168.1.105`, go to:

```
http://192.168.1.105:3000
```

---

# PART 7 — COMMON ERRORS AND HOW TO FIX THEM

---

## ERROR FIX 1 — "EACCES: permission denied"

```bash
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
```

Then run `npm install` again.

---

## ERROR FIX 2 — "ENOSPC: no space left on device"

Your phone's storage is full. Free up space:

```bash
npm cache clean --force
```

Then delete unused files from your phone using your file manager, and try `npm install` again.

---

## ERROR FIX 3 — "Cannot find module" or "Module not found"

The node_modules folder is missing or broken. Fix it:

```bash
rm -rf node_modules
npm install
```

**What this does:**
- Deletes all installed packages
- Reinstalls everything fresh

---

## ERROR FIX 4 — "Port 3000 is already in use"

Something is already running on port 3000. Either kill it:

```bash
npx kill-port 3000
```

Or use a different port (see Part 8 below).

---

## ERROR FIX 5 — "next: not found" or "command not found"

```bash
npm install
npm run dev
```

The next package was not installed. Running `npm install` again will fix it.

---

## ERROR FIX 6 — Termux closes or crashes

Termux can be killed by Android's battery optimization. To prevent this:

1. Go to Android Settings → Apps → Termux
2. Tap Battery → Select "Unrestricted" or "No restrictions"
3. Also go to Settings → Battery → Background app limits → exclude Termux

Then reopen Termux and run:

```bash
cd ~/portfolio-termux
npm run dev
```

---

## ERROR FIX 7 — "ENOMEM: not enough memory"

Your phone ran out of RAM. Close other apps and try again:

```bash
npm run dev
```

If it still fails, enable swap (virtual memory):

```bash
pkg install -y zram-swap
swapon
```

Then try again.

---

## ERROR FIX 8 — npm install hangs or is very slow

Kill it (Ctrl+C) and set a faster npm registry:

```bash
npm config set registry https://registry.npmmirror.com
npm install
```

---

## ERROR FIX 9 — "SyntaxError: Unexpected token"

This usually means a file was corrupted. Re-extract the ZIP:

```bash
cd ~/storage/downloads
rm -rf ~/portfolio-termux
unzip -o portfolio-termux.zip
cp -r portfolio-termux ~/portfolio-termux
cd ~/portfolio-termux
npm install
npm run dev
```

---

## ERROR FIX 10 — White/blank page in browser

```bash
npm run dev
```

Then in your browser:
1. Press the three dots menu → tap **"Clear browsing data"**
2. Select **"Cached images and files"**
3. Tap **Clear data**
4. Go back to `http://localhost:3000`

Or try opening in a private/incognito tab.

---

# PART 8 — CHANGE THE PORT

---

## STEP 20 — Run on a Different Port

If port 3000 is busy, use any other port number (like 3001, 4000, 8080):

```bash
npm run dev -- --port 3001
```

Then open your browser at:

```
http://localhost:3001
```

For another device on WiFi:

```
http://192.168.1.XXX:3001
```

---

# PART 9 — STOP AND RESTART THE SERVER

---

## STEP 21 — Stop the Server

Press these keys in Termux:

```
Ctrl + C
```

(Hold the Ctrl key on the Termux keyboard and press C)

You will see `^C` appear and the server will stop.

---

## STEP 22 — Restart the Server

After stopping, start it again:

```bash
npm run dev
```

That is all you need to restart.

---

# PART 10 — REINSTALL DEPENDENCIES

---

## STEP 23 — Clean Reinstall (if packages are broken)

```bash
cd ~/portfolio-termux
rm -rf node_modules
rm -f package-lock.json
npm install
```

**What this does:**
1. Deletes all installed packages (`node_modules`)
2. Deletes the lock file
3. Reinstalls everything fresh from scratch

This takes 5–15 minutes but always fixes dependency problems.

---

# PART 11 — CLEAR CACHE

---

## STEP 24 — Clear Next.js Cache (if page is blank or broken)

```bash
cd ~/portfolio-termux
rm -rf .next
npm run dev
```

**What this does:**
- Deletes the Next.js build cache (`.next` folder)
- Rebuilds everything fresh when the server starts

The first startup after this will be slower (30–60 seconds) because it rebuilds.

---

## STEP 25 — Clear npm Cache

```bash
npm cache clean --force
```

**What this does:**
Clears npm's global download cache. Use this if npm install keeps failing.

---

# PART 12 — BUILD PRODUCTION VERSION

---

## STEP 26 — Build for Production

```bash
cd ~/portfolio-termux
npm run build
```

**What this does:**
Creates an optimized, minified production build. This is faster and smaller than the development version.

The build takes 2–5 minutes. When finished you will see a summary of all pages.

---

## STEP 27 — Run the Production Build

```bash
npm run start
```

**What this does:**
Runs the production-optimized version. Use this instead of `npm run dev` when you want maximum performance.

---

## STEP 28 — Open the Production Site

Same URL as before:

```
http://localhost:3000
```

The production version loads faster and uses less RAM than development mode.

---

# PART 13 — CUSTOMIZE YOUR PORTFOLIO CONTENT

---

## STEP 29 — Edit Your Personal Information

Open the data file in a text editor. In Termux, use nano:

```bash
nano ~/portfolio-termux/data/mock.ts
```

You will see the file content. Use arrow keys to navigate.

Find these sections and replace with your own info:

```typescript
// Find this and change to YOUR info:
export const mockProfile = {
  name: 'Zubair Shah',        // ← Change to your name
  title: 'Staff Software Engineer',  // ← Your job title
  tagline: 'I engineer systems...',  // ← Your tagline
  bio: '8+ years building...',       // ← Your bio
  email: 'alex@devportfolio.io',     // ← Your email
  github: 'github.com/alexchen',     // ← Your GitHub
  linkedin: 'linkedin.com/in/alexchen', // ← Your LinkedIn
  available: true,           // ← false if not looking for work
}
```

**To save in nano:**
1. Press `Ctrl + X`
2. Press `Y` to confirm saving
3. Press `Enter`

Then restart the server to see your changes:

```bash
npm run dev
```

---

## STEP 30 — Change Admin Password

Open `data/mock.ts`:

```bash
nano ~/portfolio-termux/data/mock.ts
```

Scroll to the very bottom and find:

```typescript
export const ADMIN_EMAIL = 'admin@portfolio.dev'
export const ADMIN_PASSWORD = 'admin123'
```

Change to your own email and password:

```typescript
export const ADMIN_EMAIL = 'your@email.com'
export const ADMIN_PASSWORD = 'yourStrongPassword123'
```

Save (Ctrl+X, Y, Enter) and restart the server.

---

# PART 14 — DEPLOY ONLINE FOR FREE WITH VERCEL

Deploy your portfolio so the whole internet can see it — for free.

---

## STEP 31 — Create a GitHub Account

Go to `https://github.com` in your phone browser and create a free account if you do not have one.

---

## STEP 32 — Create a Vercel Account

Go to `https://vercel.com` and sign up with your GitHub account. It is free.

---

## STEP 33 — Install Git in Termux (if not done)

```bash
pkg install -y git
```

---

## STEP 34 — Configure Git with Your Info

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

Replace "Your Name" and "your@email.com" with your real info.

---

## STEP 35 — Initialize Git in Your Project

```bash
cd ~/portfolio-termux
git init
git add .
git commit -m "Initial portfolio commit"
```

**What this does:**
- `git init` — starts tracking your project with git
- `git add .` — stages all files
- `git commit -m "..."` — saves a snapshot of your project

---

## STEP 36 — Create a New GitHub Repository

1. Open `https://github.com` in your browser
2. Tap the `+` button → **New repository**
3. Name it `portfolio` (or anything you like)
4. Keep it **Public**
5. Do NOT check "Initialize with README"
6. Tap **Create repository**

GitHub will show you a page with commands. Copy the repository URL — it looks like:

```
https://github.com/yourusername/portfolio.git
```

---

## STEP 37 — Connect Your Project to GitHub

In Termux, run (replace the URL with your actual repository URL):

```bash
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

GitHub will ask for your username and password.

**Important:** GitHub no longer accepts your account password for pushing. You need a Personal Access Token instead:

1. Go to `https://github.com/settings/tokens`
2. Click **Generate new token (classic)**
3. Give it a name, set expiry to 90 days
4. Check the `repo` checkbox
5. Click **Generate token**
6. Copy the token (it starts with `ghp_...`)

When Termux asks for your password, paste this token instead of your password.

---

## STEP 38 — Deploy to Vercel

Install the Vercel CLI:

```bash
npm install -g vercel
```

Then deploy:

```bash
cd ~/portfolio-termux
vercel
```

Follow the prompts:
- **Set up and deploy?** → Press Y + Enter
- **Which scope?** → Select your username, press Enter
- **Link to existing project?** → Press N + Enter
- **What's your project name?** → Type `portfolio` or any name, press Enter
- **In which directory is your code located?** → Press Enter (it defaults to `./`)
- **Want to modify settings?** → Press N + Enter

Vercel will build and deploy. When done, you will see:

```
🎉  Deployed to Production: https://portfolio-xyz.vercel.app
```

**Your portfolio is now live on the internet!**

---

## STEP 39 — Deploy Updates (Every Time You Change Something)

When you edit your content and want to update the live site:

```bash
cd ~/portfolio-termux
git add .
git commit -m "Update portfolio content"
git push
vercel --prod
```

Or just connect Vercel to GitHub and it auto-deploys on every push.

---

## STEP 40 — Set a Custom Domain (Optional)

1. Go to `https://vercel.com/dashboard`
2. Click your project
3. Go to **Settings** → **Domains**
4. Add your domain (e.g. `yourname.com`)
5. Follow the instructions to update your domain's DNS settings

Free domains are available at: `https://www.freenom.com` or `https://freedns.afraid.org`

---

# QUICK REFERENCE CHEAT SHEET

---

## Daily Use Commands

```bash
# Go to project folder
cd ~/portfolio-termux

# Start development server
npm run dev

# Open in browser
http://localhost:3000

# Open admin panel
http://localhost:3000/admin/login

# Admin login
Email:    admin@portfolio.dev
Password: admin123

# Stop server
Ctrl + C

# Restart server
npm run dev

# Access from another device (same WiFi)
http://YOUR_PHONE_IP:3000
```

---

## Fix Commands

```bash
# Fix broken dependencies
rm -rf node_modules && npm install

# Fix blank page
rm -rf .next && npm run dev

# Fix port busy error
npm run dev -- --port 3001

# Fix storage full
npm cache clean --force

# Find your IP address
ifconfig

# Start on all network interfaces (for other devices)
npm run dev -- --hostname 0.0.0.0
```

---

## Edit Content

```bash
# Edit your name, bio, projects, etc.
nano ~/portfolio-termux/data/mock.ts

# Save in nano: Ctrl+X → Y → Enter
```

---

## Deploy

```bash
# Push to GitHub
git add . && git commit -m "update" && git push

# Deploy to Vercel
vercel --prod
```

---

*This guide was written for Android ARM64 with Termux.*
*No Prisma. No database. No native binaries. Just pure Next.js.*
*Everything runs on your phone with zero server required.*
