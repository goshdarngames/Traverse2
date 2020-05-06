( function ( traverse, undefined )
{
    traverse.read_prolog_file = function ( url, callback )
    {
        window.console.log ( `Read prolog: ${url}` );

        let request = new XMLHttpRequest ();

        request.open ( 'GET', url );

        request.responseType = 'text';

        request.onload = function ()
        {
            let s = pl.create ();
            s.consult ( request.response );

            callback ( s );
        };

        request.send ();

    };
} ( window.traverse = window.traverse || {} ))
