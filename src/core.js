
class Core{
    constructor(lines, processes){
        this.lines = lines||[];
        this.processes = processes||[];
        this.setup = false;
        this.setupLines();
    }
    log(){
        console.log("Lines:",this.lines,"\nProcesses:",this.processes);
    }
    getLines(){
        return this.lines;
    }
    getProc(){
        return this.processes;
    }
    setupLines = () => {
        this.projections = {};
        this.lines.forEach(line => {
            this.projections[line.name] = [];
        });
        this.processes.map((process, pi) => {
            let ctime = process.start;
            process.tasks.map((task,ti) => {
                let ni = 0;
                for(let i=0;i<this.projections[task.line].length;i++){
                    let atask = this.projections[task.line][i];
                    // if((atask.line===task.line) & (i<this.projections[task.line].length) & (process.tasks[ti-1].start+)){

                    // }
                }
            });
        });
    }
}
module.exports = Core;