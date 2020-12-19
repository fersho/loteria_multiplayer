#!/usr/bin/env bash
cd /srv/loteria
rm -r node_modules/*
npm install
node_modules/.bin/webpack --config=src/client/js/webpack-config.js
node /srv/loteria/src/webServer/startServer.js