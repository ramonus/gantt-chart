
class Core{
    constructor(props){
        let { lines, processes, reference } = props;
        this.lines = lines||[];
        this.processes = processes||[];
        this.setup = false;
        this.reference = reference;
        this.setupLines();
        console.log("Projections:",this.projections);
        // log spaces
        this.lines.forEach(line => {
            let spaces = this._findSpaces(this.projections[line.name]);
            console.log("Spaces for",line.name,":",spaces);
        });
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
    _findSpaces = (projection) => {
        let atime = this.reference;
        let spaces = [];
        if(projection.length==0){
            spaces = [[0, "Inf"]];
        }
        projection.forEach((task,ti) => {
            if(task.start-atime>0){
                spaces.push([atime,task.start]);
                atime = task.start+task.duration;
            }else{
                atime += task.duration;
            }
            if(ti === projection.length-1){
                spaces.push([atime,"Inf"]);
            }
        });
        return spaces;
    }
    _findIndex = (atime,projection) => {
        let ind = 0;
        let found = false;
        projection.forEach((task,i) => {
            if(!found){
                if(atime<task.start){
                    ind = i;
                    found = true;
                }else if(i === projection.length-1){
                    ind = projection.length;
                    found = true;
                }
            }
        });
        return ind;
    }
    setupLines = (callback) => {
        this.projections = {};
        this.lines.forEach(line => {
            this.projections[line.name] = [];
        });
        this.processes.forEach((process, pi) => {
            let ctime = process.start;
            process.tasks.forEach((task, ti) => {
                let spaces = this._findSpaces(this.projections[task.line]);
                let atime = this.reference||0;
                let ni = -1;
                var found = false;
                spaces.forEach((space,si) => {
                    if(!found){
                        if(space[1]==="Inf"){
                            if(ctime>=space[0]){
                                atime = ctime;
                            }else{
                                atime = space[0];
                            }
                            ni = this._findIndex(atime,this.projections[task.line]);
                            found = true;
                        }else if(space[0]<=ctime&(ctime+task.duration)<=space[1]){
                            atime = ctime;
                            ni = this._findIndex(atime,this.projections[task.line]);
                            found = true;
                        }else if(ctime<space[0] & space[1]-space[0]>=task.duration){
                            atime = space[0];
                            ni = this._findIndex(atime,this.projections[task.line]);
                            found = true;
                        }else{
                            atime = spaces[si+1][0];
                        }
                    }
                });
                let nt = {...task, start: atime};
                this.projections[task.line].splice(ni,0,nt);
                ctime = atime+nt.duration;
            });
        });
        if(callback) callback();
    }
}
module.exports = Core;