( function ( traverse_pl, undefined )
{
    traverse_pl.verify_puzzle_state = function ( ps, session )
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let query = `puzzle_problem(${ps},X).`;

            session.query ( query );

            session.answer ( ( a ) =>
            {
                let msg_array = a.lookup ("X").toJavaScript();

                let msg = convert_prolog_string ( msg_array );

                resolve ( msg );

            });
        });

    };

    traverse_pl.state_after_input = function ( ps, input, session )
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let query = `puzzle_input_result(${ps}, ${input},X).`;

            session.query ( query );

            session.answer ( ( a ) =>
            {
                //get JS array representation of puzzle
                let ps = a.lookup ( "X" ).toJavaScript ();
                //TODO construct puzzle state object
                resolve ( ps );
            });
        });

    };

    let convert_prolog_string = 
        a => a.map ( c => String.fromCharCode ( c ) ).join ( "" );
} ( self.traverse_pl = self.traverse_pl || {} ))
