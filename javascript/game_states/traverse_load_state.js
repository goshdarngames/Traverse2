( function ( traverse, undefined )
{
    let assets =
    [
        {
            asset_name : "rules_pl",

            fetch_fun :  function ( callback )
            {
                traverse.read_prolog_file ( "prolog/traverse_rules.pl",
                                            callback );
            }
        },

    ];

    traverse.LoadState = function ()
    {
        this.next_asset = 0;

        this.waiting = false;

        this.tick = function ( traverse_data )
        {
            if ( traverse_data.assets == undefined )
            {
                traverse_data.assets = {};
            }

            if ( this.waiting )
            {
                //TODO -  timeout?
                return;
            }

            if ( this.next_asset < assets.length )
            {
                let a = assets [ this.next_asset ];

                let cb = ( fetched_data ) =>
                {
                    traverse_data.assets [ a.asset_name ] = fetched_data;
                    this.waiting = false;
                };

                a.fetch_fun ( cb );
                
                this.waiting = true;

                this.next_asset += 1;
            }
            else
            {
                console.log ( "All assets loaded." );

                traverse_data.game_state = new traverse.TitleState ();
            }
        };

    };

} ( window.traverse = window.traverse || {} ))
