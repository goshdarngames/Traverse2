( function ( traverse, undefined )
{
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
