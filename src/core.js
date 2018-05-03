import React from 'react';

class Core{
    constructor(lines, processes){
        this.lines = lines||[];
        this.processes = processes||[];
    }
    log(){
        console.log("Lines:",this.lines,"\nProcesses:",this.processes);
    }
}
module.exports = Core;