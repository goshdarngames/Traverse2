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

        {
            asset_name : "boo_texture",

            fetch_fun :  function ( callback )
            {
                callback ( PIXI.Texture.from ( "assets/boo.png" ));
            }
        },

        {
            asset_name : "bogey_texture",

            fetch_fun :  function ( callback )
            {
                callback ( PIXI.Texture.from ( "assets/bogey.png" ));
            }
        },

        {
            asset_name : "wall_texture",

            fetch_fun :  function ( callback )
            {
                callback ( PIXI.Texture.from ( "assets/wall.png" ));
            }
        },

    ];

    traverse.LoadState = function ()
    {
        this.next_asset = 0;

        this.waiting = false;

        this.enter_state = function ( traverse_data )
        {
        };

        this.exit_state = function ( traverse_data )
        {
        };

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

                this.waiting = true;

                a.fetch_fun ( cb );

                this.next_asset += 1;
            }
            else
            {
                console.log ( "All assets loaded." );

                traverse.change_state ( new traverse.TitleState (), 
                                        traverse_data );
            }
        };

    };

} ( window.traverse = window.traverse || {} ))
