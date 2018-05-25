
class Core{
    constructor(props){
        let { lines, processes, reference } = props;
        this.lines = lines||[];
        this.processes = processes||[];
        this.setup = false;
        this.reference = reference;
        this.setupLines();
    }
    log(){
        console.log("Lines:",this.lines,"\nProcesses:",this.processes);
    }
    genOptions(){
        let options = {
            lines: {},
            processes: {},
        };
        this.lines.forEach( line => {
            options.lines[line.name] = line.options;
        });
        this.processes.forEach( proc => {
            options.processes[proc.name] = proc.options;
        });
        return options;
    }
    getLines(){
        return this.lines;
    }
    getReference(){
        return this.reference;
    }
    getProc(){
        return this.processes;
    }
    getProjections = (b) => {
        if(b){
            this.setupLines(() => {
                return this.projections;
            });
        }else{
            return this.projections;
        }
    }
    setupLines = (callback) => {
        console.log("Setting up lines...");
        this.projections = {};
        this.lines.forEach(line => {
            this.projections[line.name] = [];
        });
        console.log("Projections created");
        console.log("Processes:",this.processes);
        this.processes.forEach((process, pi) => {
            console.log("Working on process:",process);
            let ctime = process.start;
            process.tasks.forEach((task, ti) => {
                console.log("Working on task:",task);
                let ni = 0, nt, atime = ctime;
                for(let i=0;i<this.projections[task.line].length;i++){
                    let atask = this.projections[task.line][i];
                    let a,b,c;
                    a = (atask.start - atime) >= task.duration;
                    b = i === this.projections[task.line].length-1;
                    if(a){
                        nt = {...task,
                            start: atime,
                        };
                        ni = i;
                        break;
                    }else if(b){
                        atime = atask.start+atask.duration;
                        let st;
                        if(atime>=ctime){
                            st = atime;
                        }else{
                            st = ctime;
                        }
                        nt = {...task,
                            start: st,
                        };
                        ni = i+1;
                        break;
                    }
                    atime = atask.start+atask.duration;
                }
                if(atime == ctime){
                    nt = {...task,
                        start: ctime,
                    };
                }
                this.projections[task.line].splice(ni,0,nt);
                ctime = nt.start+nt.duration;
                console.log("Constructed, ni:",ni,"ntask:",nt);
            });
        });
        if(callback) callback();
        console.log("Projections:",this.projections);
    }
}
module.exports = Core;