( function ( traverse, undefined )
{
    traverse.init_prolog = function ()
    {
        window.console.log ( "Initialize traverse prolog..." );

        let request = new XMLHttpRequest ();

        request.open ( 'GET', 'prolog/traverse.pl' );

        request.responseType = 'text';

        request.onload = function ()
        {
            let s = pl.create ();
            s.consult ( request.response );

            s.query ("gamestate([[wall,10,10],[player,1,2],[wall,1,2]]).");

            let cb = function( answer ) 
            { 
                console.log( pl.format_answer( answer ) ); 
            };

            s.answer ( cb );
        };

        request.send ();
    };
    
} ( window.traverse = window.traverse || {} ))
