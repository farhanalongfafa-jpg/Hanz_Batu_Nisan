import {spawn} from 'node:child_process';
const args=process.argv.slice(2); const i=args.indexOf('--port');
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','0.0.0.0','--port',i>=0?args[i+1]:'3000'],{stdio:'inherit'});
for(const s of ['SIGINT','SIGTERM']) process.on(s,()=>child.kill(s));
child.on('exit',code=>process.exit(code??0));
