#!/usr/bin/env node

"use strict"

const fs = require('fs'),
es = require('event-stream'),
[,,searchTerm] = process.argv,
stream = fs.createReadStream('/usr/share/dict/words','UTF8'),
limitTen = require('./limit-ten').tStream;

if(searchTerm === undefined){
	process.stdout.write(`Usage: 10.js [search term]\n`)
}

if(searchTerm != undefined){
	stream
	.pipe(es.split())
	.pipe(es.map((item, cb) => {
		let word = item.toString();
		let letters = word.substring(0, searchTerm.length);
		if (letters.match(searchTerm)) {
			cb(null, item);
		} else{
			cb();
		}
	}))
	.pipe(limitTen)
	.pipe(process.stdout)
}