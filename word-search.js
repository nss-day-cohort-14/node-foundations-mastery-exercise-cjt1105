#!/usr/bin/env node

"use strict"
// set up inital constants
const fs = require('fs'),
es = require('event-stream'),
[,,searchTerm] = process.argv,
stream = fs.createReadStream('/usr/share/dict/words','UTF8'),
limitTen = require('./limit-ten').tStream;
//check if user entered search term
if(searchTerm === undefined){
	process.stdout.write(`Usage: 10.js [search term]\n`)
}
// if search term entered
if(searchTerm != undefined){
	//Open read stream to read dictionary terms
	stream
	.pipe(es.split())
	//find words that begin with search term
	.pipe(es.map((item, cb) => {
		let word = item.toString();
		let letters = word.substring(0, searchTerm.length);
		if (letters.match(searchTerm)) {
			cb(null, item);
		} else{
			cb();
		}
	}))
	//get first ten resuts and write
	.pipe(limitTen)
	.pipe(process.stdout)
}