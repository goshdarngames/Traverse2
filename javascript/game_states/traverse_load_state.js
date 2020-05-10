( function ( traverse, undefined )
{
    let loading_jobs =
    [
        ( traverse_data, callback ) =>
        {
            traverse.read_prolog_file ( "prolog/traverse_rules.pl",
                ( session ) => 
                {
                    traverse_data.assets.rules_pl = session;
                    callback ();
                });
        },

        ( traverse_data, callback ) =>
        {
            traverse_data.assets.boo_texture =
                PIXI.Texture.from ( "assets/boo.png" );

            callback ();
        },

        ( traverse_data, callback ) =>
        {
            traverse_data.assets.bogey_texture =
                PIXI.Texture.from ( "assets/bogey.png" );

            callback ();
        },

        ( traverse_data, callback ) =>
        {
            traverse_data.assets.wall_texture =
                PIXI.Texture.from ( "assets/wall.png" );

            callback ();
        },
/*
        {
            asset_name : "wall_sprite_pool",

            fetch_fun :  function ( callback )
            {
                let make_sprite = 
                    () => new PIXI.Sprite ( traverse.assets.wall_texture );

                callback ( new traverse.ObjectPool ( make_sprite, 128 ) );
            }
        },
*/
    ];

    traverse.LoadState = function ()
    {
        this.next_job = 0;

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

            if ( this.next_job < loading_jobs.length )
            {
                let job = loading_jobs [ this.next_job ];

                let cb = () => this.waiting = false;

                this.waiting = true;

                job ( traverse_data, cb );

                this.next_job += 1;
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
