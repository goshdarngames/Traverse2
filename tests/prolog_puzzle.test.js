let pl = require ( "tau-prolog" );

let fs = require("fs").promises;

require ( "../javascript/traverse_prolog" );

//Wrapping the prolog answer in a promise allows jest to wait on the
//asynchronous code from the prolog system
let answer_promise = ( session ) => new Promise ( resolve =>
{
    session.answer ( ( a ) => resolve ( a ) );
});

test ( "Get libs", async () =>
{
    expect ( pl ).toBeDefined ();
    
    expect ( traverse ).toBeDefined ();

    const pl_data = await fs.readFile (  
        "./prolog/traverse_rules.pl", "utf8" );

    let session = pl.create ();

    let answer = undefined;

    session.consult ( pl_data );

    session.query ( "object(bad_object)." );
    answer = await answer_promise ( session );

    for ( const query of [ "boo", "bogey", "wall" ] )
    {
        session.query ( `(${query}).` );
        answer = await answer_promise ( session );

        expect ( answer ).toBeDefined ();
    }

});
