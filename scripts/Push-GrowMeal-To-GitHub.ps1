param(
  [Parameter(Mandatory=$false)]
  [string]$ZipPath = "$HOME\Downloads\growmeal-platform-github-ready.zip",
  [Parameter(Mandatory=$false)]
  [string]$WorkDir = "C:\AI-STUDIO\GrowMeal\growmeal-platform"
)

$ErrorActionPreference = "Stop"
$RepoUrl = "https://github.com/Profgabby/growmeal-platform.git"

Write-Host "GrowMeal dedicated repository import" -ForegroundColor Green
Write-Host "Target: $RepoUrl"

if (-not (Test-Path $ZipPath)) {
  throw "ZIP not found: $ZipPath. Download growmeal-platform-github-ready.zip and rerun with -ZipPath <full path>."
}

if (Test-Path $WorkDir) {
  $backup = "$WorkDir-backup-$(Get-Date -Format yyyyMMdd-HHmmss)"
  Write-Host "Existing work directory found. Moving it to $backup"
  Move-Item $WorkDir $backup
}

New-Item -ItemType Directory -Force -Path (Split-Path $WorkDir -Parent) | Out-Null
Expand-Archive -Path $ZipPath -DestinationPath $WorkDir -Force
Set-Location $WorkDir

if (-not (Test-Path ".git")) {
  git init
  git add .
  git commit -m "Import GrowMeal Pass 8 platform"
}

git branch -M main

$existingRemote = git remote 2>$null
if ($existingRemote -contains "origin") {
  git remote set-url origin $RepoUrl
} else {
  git remote add origin $RepoUrl
}

Write-Host "Fetching remote bootstrap commit..."
git fetch origin main

$remoteMain = git rev-parse --verify origin/main 2>$null
if ($LASTEXITCODE -eq 0) {
  git merge-base --is-ancestor origin/main HEAD 2>$null
  if ($LASTEXITCODE -ne 0) {
    git merge -s ours origin/main --allow-unrelated-histories -m "Merge GitHub repository bootstrap"
  }
}

Write-Host "Local verification..."
$tracked = (git ls-files | Measure-Object).Count
Write-Host "Tracked files: $tracked"
if ($tracked -lt 500) {
  throw "Unexpected tracked-file count ($tracked). Stopping before push."
}

Write-Host "Pushing complete GrowMeal platform to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "Push complete." -ForegroundColor Green
Write-Host "Repository: https://github.com/Profgabby/growmeal-platform"
