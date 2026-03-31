# How to Run the Project Locally

To run the project on your local machine, follow these steps:

1. Open a terminal (PowerShell or Command Prompt) and make sure you are in your project folder:
   ```powershell
   cd "C:\antigarvity Projects\projet federe"
   ```

2. If you haven't installed the necessary dependencies recently, install them by running:
   ```powershell
   npm install
   ```

3. Start the local development server by running:
   ```powershell
   npm run dev
   ```

4. Once the server starts, open your web browser and navigate to the local host address. It will usually be:
   [http://localhost:3000](http://localhost:3000) (or the URL it displays in the terminal).

To stop the server at any time, press `Ctrl + C` in the terminal and confirm.

---

# How to Save and Upload an Update to GitHub

When you make changes to your code and want to save them as a new version on GitHub, open your terminal (make sure you are in your project folder) and run the following commands:

### 1. Check your changes (Optional but recommended)
To see which files have been modified, run:
```powershell
git status
```

### 2. Add all your changed files
This prepares all the modified and new files to be saved:
```powershell
git add .
```
*(The dot `.` means "all files in this folder")*

### 3. Create a commit (Save a new version locally)
Save the changes with a short message describing what you did:
```powershell
git commit -m "Your descriptive message explaining what you changed"
```
*(Example: `git commit -m "Updated the homepage design and added new user instructions"`)*

### 4. Push the changes to GitHub
Upload your saved local version to your GitHub repository:
```powershell
git push
```
*(If you get an error about "no upstream branch", check what it suggests. You might need to run `git push -u origin main` or `git push -u origin master` depending on your default branch name).*
