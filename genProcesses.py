import argparse, json, random

parser = argparse.ArgumentParser()
parser.add_argument("-l","--lines",type=int,nargs="?",default=3,help="Number L of lines to generate")
parser.add_argument("-p","--processes",type=int,nargs="?",default=3,help="Number P of processes to generate")
parser.add_argument("-r","--range",type=str,nargs="?",default="2-5",help="Range string to random set the number of tasks per process")
parser.add_argument("-d","--duration",type=str,nargs="?",default="1-3",help="Range string format a-b to randomly set the duration of every task in a integer between a and b")
parser.add_argument("o",type=str,default="defaults.js",help="Output file")
args = parser.parse_args()

def formatRange(r):
    try:
        num = r.split("-")
        a = int(num[0])
        b = int(num[1])
        return a,b
    except:
        return False
    
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
        for j in range(random.randint(*formatRange(args.range))):
            ln = lline
            while ln == lline:
                ln = "LINE "+str(random.randint(0,nl-1))
            nt = {
                "owner": nproc["name"],
                "line": ln,
                "index": j,
                "duration": random.randint(*formatRange(args.duration)),
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