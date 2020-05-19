( function ( traverse, undefined )
{
    traverse.read_prolog_file = function ( url, callback )
    {
        //TODO - load state should make AJAX request - this func should
        //       only accept a string
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

    traverse.prolog_verify_puzzle_state = 
        function ( ps, success_cb, fail_cb, traverse_data )
    {
        let ps_pl = ps.get_prolog ();

        let query = `puzzle_problem(${ps_pl},X).`;

        traverse_data.assets.rules_pl.query ( query );

        traverse_data.assets.rules_pl.answer ( ( a ) =>
        {
            //TODO move prolog queries to the prolog js file

            let msg_array = a.lookup ("X").toJavaScript();

            let msg = convert_prolog_string ( msg_array );

            fail_cb ( msg );

        } );

    };

    let convert_prolog_string = 
        a => a.map ( c => String.fromCharCode ( c ) ).join ( "" );
} ( window.traverse = window.traverse || {} ))
