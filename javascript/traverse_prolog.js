( function ( traverse, undefined )
{
    //TODO - rules prolog could be run inside a web worker
    //       This would prevent the execution blocking rendering

    traverse.prolog_verify_puzzle_state = function ( ps, traverse_data )
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let ps_pl = ps.get_prolog ();

            let query = `puzzle_problem(${ps_pl},X).`;

            traverse_data.assets.rules_pl.query ( query );

            traverse_data.assets.rules_pl.answer ( ( a ) =>
            {
                let msg_array = a.lookup ("X").toJavaScript();

                let msg = convert_prolog_string ( msg_array );

                resolve ( msg );

            });
        });
    };

    let convert_prolog_string = 
        a => a.map ( c => String.fromCharCode ( c ) ).join ( "" );
} ( window.traverse = window.traverse || {} ))
