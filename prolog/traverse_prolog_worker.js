self.importScripts('tau-prolog.min.js');

( function ( traverse, undefined )
{
    traverse.prolog_worker_message = function ( e )
    {
        console.log ( "Thread received message" );
        postMessage ( e.data );
    };
} ( self.traverse = self.traverse || {} ))

onmessage = ( e ) => traverse.prolog_worker_message ( e );

