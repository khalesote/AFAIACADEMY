// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Deshabilitar el watcher extra
config.watchFolders = [];
config.resolver.watchFolders = [];

// Configuración adicional para Windows
config.resolver.platforms = ['native', 'android', 'ios', 'web'];
config.resolver.blockList = exclusionList([
  /firebase[\/\\]functions[\/\\].*/,
]);

module.exports = config;
