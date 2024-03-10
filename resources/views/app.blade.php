<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @viteReactRefresh
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>React Laravel</title>
    @auth
    <meta id="session-meta" name="session-token" content="{{ csrf_token() }}">
    @endauth
    <meta id="csrf-meta" name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    @vite('resources/js/react/app.jsx')
</head>
<body>
<div id="app"></div>
</body>
</html>