self.importScripts('tau-prolog.min.js');
self.importScripts('traverse_prolog.js');

( function ( traverse_pl, undefined )
{
    let session = undefined;

    //When the worker is created it expects the first message to be
    //a string containing prolog rules.
    traverse_pl.expect_rules = function ( e )
    {
        session = self.pl.create ();

        session.consult ( e.data );

        console.log ( "Prolog rules loaded in web worker." );

        self.onmessage = ( e ) => expect_verify_puzzle ( e );
    };

    traverse_pl.expect_verify_puzzle = function ( e )
    {
        console.log ( e.data );
        let query = e.query;

    };

    let convert_prolog_string = 
        a => a.map ( c => String.fromCharCode ( c ) ).join ( "" );

} ( self.traverse_pl = self.traverse_pl || {} ))

self.onmessage = ( e ) => traverse_pl.expect_rules ( e );

