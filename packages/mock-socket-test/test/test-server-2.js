const net = require('net');
const createDefer = require('../src/defer');

const defer = createDefer();

const logs = [];
const server = net.createServer(function (s) {
    console.log('2/connected event received', s.address());
   


   
    // just close the client socket after 2 sec of connecting
    /*setTimeout(()=>{
        console.log('2/socket.end called (before)')
        s.end(()=>{
            console.log('2/socket.end (1) called (after)')
            console.log('2/socket.end (1) called (after) destroyed flag', s.destroyed);
            console.log(`2/socket end (1) called (after) pending flag:${s.pending}`); // true when it is end
        });
       //s.destroy();
    }, 2000);*/
    
    //s.pipe(s);
    s.on('end', () => {
        console.log('2/end event received')
        console.log(`2/end destroyed flag:${s.destroyed}`); // true when it is end
        console.log(`2/end pending flag:${s.pending}`); // true when it is end
    });

    s.on('close', err => {
        console.log('2/close event received', err)
        console.log(`2/close destroyed flag:${s.destroyed}`); // true when it is end
    });

    s.on('finish', err => {
        console.log('2/finish event received', err)
        console.log(`2/finish destroyed flag:${s.destroyed}`); // true when it is end
        // lets strip the "error" event handler from the socket first
        // s.removeAllListeners('error'); , if this is done before there s.write, a global EPIPE error is emitted
        //s.write('some test'); // -> still error event will be called after the close
    });

    s.on('error', err => {
        console.log(`2/error event  received: "${JSON.stringify(err)}"`)
    });

    s.on('data', data => {
        console.log('2/data/ received', data.length, data);
        
    });
    // if you write, make sure the "client" counterparty has a on("data") event otherwise "end" and "close" will not fire properly
    //s.write('Echo server\r\n');
});

server.listen(8088, '0.0.0.0', function() {
    console.log('listen callback, this = server ?', this === server);
    console.log('listen callback, server.listening=', server.listening)
});

server.on('error', err0 => {
    logs.push(`/server/error [${String(err0 ||'')}]`);
});
let cnt = 1;
server.on('close', err0 => {
    const a = cnt;
    logs.push(`/server/event/close ${cnt++} event has (optional) error:[${String(err0 || '')}], listening=${server.listening}`);
    defer(()=> logs.push(`defer from event.close ${a}`));
});


setTimeout(()=>{
    let cntx = 1;
    console.log('===server.close going to call===')
    console.log(`1.server.listening=${server.listening}`)
    server.close(err => {
        const a = cntx;
        logs.push(`/server/callback/close${cntx++}: ${String(err || '')}`);
        defer(()=> logs.push(`defer from callback server.close:${a}`));
    });
    console.log(`2.server.listening=${server.listening}`)
    server.close(err => {
        const a = cntx;
        logs.push(`/server/callback/close${cntx++}: ${String(err || '')}`);
        defer(()=> logs.push(`defer from callback server.close:${a}`));
    });
    
    console.log(`3.server.listening=${server.listening}`)
    console.log('===server.close called====')
    logs.push('after calling 2 closes');
},5000);


setTimeout(()=>{
    console.log(`\t${logs.join('\n\t')}`);
}, 12000);
