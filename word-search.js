#!/usr/bin/env node

"use strict"

const fs = require('fs'),
transform = require('stream').Transform,
es = require('event-stream'),
[,,args] = process.argv,
stream = fs.createReadStream('/usr/share/dict/words','UTF8');

let data = "",
count = null;

stream.pipe(es.split())
.pipe(es.map((item, cb) => {
	let word = item.toString();
	let letters = word.substring(0, args.length);
	if (letters.match(args)&& count <= 10) {
		count ++;
		cb(null, `${word}\n`);
	}
	cb();
}))
.pipe(process.stdout)