#!/usr/bin/env node

"use strict"

const fs = require('fs'),
es = require('event-stream'),
[,,args] = process.argv,
stream = fs.createReadStream('/usr/share/dict/words','UTF8'),
tStream = require('./limit-ten').tStream;
let data = "",
count = null;

if(args === undefined){
	process.stdout.write(`Usage: 10.js [search term]\n`)
}

if(args != undefined){
	stream
	.pipe(es.split())
	.pipe(es.map((item, cb) => {
		let word = item.toString();
		let letters = word.substring(0, args.length);
		if (letters.match(args)) {
			cb(null, item);
		} else{
			cb();
		}
	}))
	.pipe(tStream)
	.pipe(process.stdout)
}