self.importScripts ( "traverse_prolog.js" );

onmessage = function ( e )
{
    console.log ( "Thread received message" );
    postMessage ( e.data );

    self.traverse [ e.data.func ] ( ... e.data.args );
};

