#!/usr/bin/env node -r esm
import lcp from '../lib/index';
import commandLineArgs from 'command-line-args';

const optionDefinitions = [
	{ name: 'port', alias: 'p', type: Number, defaultValue: 8010 },
	{
		name: 'proxyPath',
		type: String,
		defaultValue: '/proxy',
	},
	{ name: 'targetUrl', type: String },
	// the file which will be loaded for multi-target configuration
	{ name: 'config', alias: 'c', type: String },
	{ name: 'credentials', type: Boolean, defaultValue: false },
	{
          name: "methods",
          type: Array,
          defaultValue: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "PROPFIND", "MKCOL", "COPY", "MOVE", "LOCK", "UNLOCK", "OPTIONS", "PROPPATCH", "REPORT", "VERSION-CONTROL"],
        }
];

try {
	const options = commandLineArgs(optionDefinitions);
	const hasConfigFile =
		options.config && typeof options.config === 'string' && options.config.length > 0;

	if (hasConfigFile) {
		options.multiProxyConfigs = jsonfile.readFileSync(options.config);
	}

	if (!options.targetUrl && !hasConfigFile) {
		throw new Error('--targetUrl or --config is required');
	}
	lcp.startProxy(options);
} catch (error) {
	console.error(error);
}
