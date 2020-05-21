( function ( traverse, undefined )
{
    //TODO - rules prolog could be run inside a web worker
    //       This would prevent the execution blocking rendering

    //TODO - receive prolog string rather than puzzle state object
    
    //TODO - move this code to the worker - only access prolog through
    //       worker

    traverse.prolog_verify_puzzle_state = function ( ps, session )
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let ps_pl = ps.get_prolog ();

            let query = `puzzle_problem(${ps_pl},X).`;

            session.query ( query );

            session.answer ( ( a ) =>
            {
                let msg_array = a.lookup ("X").toJavaScript();

                let msg = convert_prolog_string ( msg_array );

                resolve ( msg );

            });
        });

        traverse.prolog_test = function ( a, b, c ) 
        { 
            return console.log ( `${a} ${b} ${c}` );
        };
    };

    let convert_prolog_string = 
        a => a.map ( c => String.fromCharCode ( c ) ).join ( "" );
} ( window.traverse = window.traverse || {} ))
