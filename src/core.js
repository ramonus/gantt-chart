
class Core{
    constructor(props){
        let { lines, processes, reference } = props;
        this.lines = lines||[];
        this.processes = processes||[];
        this.setup = false;
        this.reference = reference;
        this.setupLines();
        console.log("Projections:",this.projections);
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
        this.projections = {};
        this.lines.forEach(line => {
            this.projections[line.name] = [];
        });
        this.processes.forEach((process, pi) => {
            let ctime = process.start;
            process.tasks.forEach((task, ti) => {
                let ni = 0, nt, atime = ctime;
                for(let i=0;i<this.projections[task.line].length;i++){
                    let atask = this.projections[task.line][i];
                    let a,b;
                    a = (atask.start - atime) >= task.duration;
                    b = i === this.projections[task.line].length-1;
                    if(a){
                        nt = {...task,
                            start: atime,
                        };
                        ni = i;
                        atime = nt.start+nt.duration;
                        if(nt.owner==="P17"&(nt.index===1|nt.index===2)){
                            console.log("Case a, atime:",atime);
                        }
                        break;
                    }else if(b){
                        let nat = atask.start+atask.duration;
                        let st;
                        if(nat>=ctime){
                            st = nat;
                        }else{
                            st = ctime;
                        }
                        nt = {...task,
                            start: st,
                        };
                        ni = i+1;
                        if(nt.owner==="P17"&(nt.index===1|nt.index===2)){
                            console.log("Case !a and b");
                        }
                        atime = nt.start+nt.duration;
                        break;
                    }
                    atime = atask.start+atask.duration;
                }
                if(atime === ctime){
                    nt = {...task,
                        start: ctime,
                    };
                }
                if(nt.owner==="P17"&(nt.index===1|nt.index===2)){
                    console.log(nt,ctime);
                }
                this.projections[task.line].splice(ni,0,nt);
                ctime = nt.start+nt.duration;
            });
        });
        if(callback) callback();
    }
}
module.exports = Core;