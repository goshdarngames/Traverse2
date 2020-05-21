self.importScripts('tau-prolog.min.js');

( function ( traverse, undefined )
{
    traverse.prolog_worker_message = function ( e )
    {
        console.log ( "Thread received message" );

        let s = self.pl.create ();

        s.consult ( e.data );

        console.log ( e.data );
        let query = "puzzle_problem([],X).";

        s.query ( query );

        s.answer ( ( a ) =>
        {
            let msg_array = a.lookup ("X").toJavaScript();

            let msg = convert_prolog_string ( msg_array );

            console.log ( msg );

        });
    };

    let convert_prolog_string = 
        a => a.map ( c => String.fromCharCode ( c ) ).join ( "" );
} ( self.traverse = self.traverse || {} ))

onmessage = ( e ) => traverse.prolog_worker_message ( e );

