# Step 1 — Call /auth/login with the user-id header
$response = Invoke-WebRequest `
    -Uri "http://localhost:8081/auth/login" `
    -Headers @{ "X-User-Id" = "testuser123" }

Write-Host "Raw response:"
Write-Host $response.Content
Write-Host ""

# Step 2 — Extract the auth_url cleanly
$json = $response.Content | ConvertFrom-Json
$authUrl = $json.auth_url

Write-Host "Extracted auth URL:"
Write-Host $authUrl
Write-Host ""

# Step 3 — Open it in browser
Write-Host "Opening Spotify authorization page..."
Start-Process $authUrl
