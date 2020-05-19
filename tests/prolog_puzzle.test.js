let pl = require ( "tau-prolog" );

let fs = require("fs").promises;

require ( "../javascript/traverse_prolog" );

test ( "Get libs", async () =>
{
    expect ( pl ).toBeDefined ();
    
    expect ( traverse ).toBeDefined ();

    const pl_data = await fs.readFile (  
        "./prolog/traverse_rules.pl", "utf8" );

    console.log ( pl_data );
});
