var findIndex = (atime,projection) => {
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

let projection = [
    {
        owner: "P1",
        line: "LINE 0",
        index: 0,
        duration: 30,
        start: 0,
    },
    {
        owner: "P3",
        line: "LINE 0",
        index: 0,
        duration: 30,
        start: 0,
    },
    {
        owner: "P2",
        line:"LINE 0",
        index: 1,
        duration: 60,
        start: 180,
    },
];

atime = 300;
console.log(findIndex(atime,projection));