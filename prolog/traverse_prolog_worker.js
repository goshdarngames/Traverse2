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

        self.onmessage = ( e ) => traverse_pl.expect_command ( e );
    };

    traverse_pl.expect_command = function ( e )
    {
        switch ( e.data.command )
        {
            case ( "verify_puzzle_state" ) :

                verify_puzzle_state ( e.data.ps );
                break;

            default :

                throw "Unknown command.";
                break;
        }
    };

    let verify_puzzle_state = async function ( ps )
    {
        let answer = await traverse_pl.verify_puzzle_state ( ps, session );

        self.postMessage ( answer );
    };


} ( self.traverse_pl = self.traverse_pl || {} ))

self.onmessage = ( e ) => traverse_pl.expect_rules ( e );

