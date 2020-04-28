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

            s.query ("likes(sam,X).");

            let cb = console.log;

            s.answer ( cb );
        };

        request.send ();
    };
    
} ( window.traverse = window.traverse || {} ))
