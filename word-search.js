#!/usr/bin/env node

"use strict"

const fs = require('fs');

const readStream = fs.createReadStream('/usr/share/dict/words');
let data = "";

readStream.on('data',(chunk)=>{
	data += `chunk:${chunk}`;
});

readStream.on('end',(doc)=>{
		console.log(data)

})