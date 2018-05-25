import argparse, json, random

parser = argparse.ArgumentParser()
parser.add_argument("-l","--lines",type=int,nargs="?",default=3,help="Number L of lines to generate")
parser.add_argument("-p","--processes",type=int,nargs="?",default=3,help="Number P of processes to generate")
parser.add_argument("o",type=str,default="defaults.js",help="Output file")
args = parser.parse_args()

def main():
    nl = args.lines
    np = args.processes
    lines = []
    for i in range(nl):
        nline = {
            "name": "LINE " + str(i),
            "workingHours": "24",
            "workingDays": "all",
        }
        lines.append(nline)
    processes = []
    for i in range(np):
        nproc = {
            "name": "P"+str(i),
            "start": 0,
            "options": {
                "color": "rgb("+str(random.random()*255)+","+str(random.random()*255)+","+str(random.random()*255)+")",
            },
            "tasks": []
        }
        lline = ""
        for j in range(random.randint(2,5)):
            ln = lline
            while ln == lline:
                ln = "LINE "+str(random.randint(0,nl-1))
            nt = {
                "owner": nproc["name"],
                "line": ln,
                "index": j,
                "duration": random.randint(1,6)*30,
            }
            lline = ln
            nproc["tasks"].append(nt)
        processes.append(nproc)
    print("Generated {} lines and {} processes:\n".format(nl,np))
    s = "var exports = module.exports;\n"
    s += "exports.processes = "+json.dumps(processes)+";\n"
    s += "exports.lines = "+json.dumps(lines)+";\n"
    with open(args.o, 'w') as f:
        f.write(s)
    print("Saved to "+args.o)

if __name__=="__main__":
    main()