# Local CORS Proxy

Simple proxy to bypass CORS issues. This was built as a local dev only solution to enable prototyping against existing APIs without having to worry about CORS.

This module was built to solve the issue of getting this error:

```
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:4200' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disable
```

## Getting Started

```sh
npm install -g @bjesuiter/local-cors-proxy
```

Or install as dev-dependency & add script to your project

```sh
npm i -D @bjesuiter/local-cors-proxy
```

```json
 "scripts": {
   "proxy": "lcp --targetUrl https://cat-fact.herokuapp.com"
 }
```

**Simple Example**

uses [Cat Facts API](https://alexwohlbruck.github.io/cat-facts/docs/)
(you need to register to this api first on the website: https://cat-fact.herokuapp.com)

API endpoint that we want to request that has CORS issues:

```
https://cat-fact.herokuapp.com/facts
```

Start Proxy:

```
lcp --targetUrl https://cat-fact.herokuapp.com
```

Then in your client code, new API endpoint:

```
http://localhost:8010/proxy/facts
```

End result will be a request to `https://cat-fact.herokuapp.com/facts` without the CORS issues!

## How to try

## Options

| Option        | Example               | Default |
| ------------- | --------------------- | ------: |
| --targetUrl   | https://www.google.ie |         |
| --proxyPath   | /foo                  |  /proxy |
| --port        | 8010                  |    8010 |
| --credentials | (no value needed)     |   false |
| --config      | ./services.json       |         |

- Your origin (for examle http://localhost:4200) is not needed to be set
  because it will be taken from the request to this proxy server automatically

### --targetUrl

The real base url of the api you want to connect to

### --proxyPath

The path on your proxy which redirects to your target url.
For example:

```
http://localhost:4200/proxy redirects to  https://www.yourdomain.ie (without the /proxy)
```

### --port

The port on which this local cors proxy should listen

### --credentials

If your http/https request from your client app has the option 'sendWithCredentials' activated,
it will send any authentication cookies with the request.
If this option is activated, you need to pass 'true' to this --credentials option,
otherwise your CORS-enabled Response will be wrong.

Note: I remember this out of my head, please search for your own if in doubt.

You may see the following error message, which indicates that you need to enable this --credentials option:

```
TODO: insert Browser error message here
```

### --config

This config flag allows to pass in a path for a json file (typically named services.json), which contains the following structure:

```json
{
	"/api1": {
		"target": "https://my-first-api.yourdomain.ie",
		"pathRewrite": { "^/api1": "" }
	},
	"/second-api": {
		"target": "https://some-other-api.yourdomain.ie",
		"pathRewrite": { "^/second-api": "" }
	}
}
```

- The Key in this Map is like the --proxyPath cli option
- The 'target' property is like the --targetUrl cli option
- The 'pathRewrite' property will remove your proxyPath part from the resulting request to your real api

This allows you to pipe multiple different APIs through this proxy and distinguish them by the proxyPath.

You can use the cli options together with the --config option, they will be merged.
However, it's recommended to insert all proxyPath mappings into the config, once created, to have all proxyPaths registered in one place.

## Improvements

- Find api to test this with

## Changelog

### Next

- switch completely to http-proxy-middleware to avoid manually requesting the target api, which improves stability

### 1.1.1-BETA.2

- replaced 'request' package with 'gaxios'
- Integrated gaxios request with express request/response pattern

### 1.1.1-BETA.1

- Forked from Version 1.1.0 from Gary Meehan
- replaced 'request' package with 'axios'
