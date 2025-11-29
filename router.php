<?php
// Simple router for PHP built-in server to support extensionless routes
// Example: /home -> home.html, /contact -> contact.html

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$docroot = __DIR__;

// Serve existing files (assets, css, js, images) directly
if ($uri !== '/' && file_exists($docroot . $uri) && is_file($docroot . $uri)) {
    return false; // let the built-in server handle it
}

// Normalize trailing slash (keep root as '/')
$normalized = rtrim($uri, '/');
if ($normalized === '') {
    $normalized = '/';
}

// Root -> home.html
if ($normalized === '/' || $normalized === '/index' || $normalized === '/home') {
    require $docroot . '/home.html';
    return true;
}

// Try .html
$htmlPath = $docroot . $normalized . '.html';
if (file_exists($htmlPath) && is_file($htmlPath)) {
    require $htmlPath;
    return true;
}

// Try .php (in case you add dynamic endpoints)
$phpPath = $docroot . $normalized . '.php';
if (file_exists($phpPath) && is_file($phpPath)) {
    require $phpPath;
    return true;
}

// Otherwise 404
http_response_code(404);
echo '404 Not Found';
return true;
