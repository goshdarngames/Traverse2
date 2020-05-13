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

        ( traverse_data, callback ) =>
        {
            let make_sprite = 
                () => new PIXI.Sprite ( traverse_data.assets.wall_texture );

            traverse_data.wall_sprite_pool = 
                 new traverse.ObjectPool ( make_sprite, 128 ) 

            callback ();
        },

        ( traverse_data, callback ) =>
        {
            let make_sprite = 
                () => new PIXI.Sprite ( traverse_data.assets.bogey_texture );

            traverse_data.bogey_sprite_pool = 
                 new traverse.ObjectPool ( make_sprite, 8 ) 

            callback ();
        },

        ( traverse_data, callback ) =>
        {
            let make_sprite = 
                () => new PIXI.Sprite ( traverse_data.assets.boo_texture );

            traverse_data.boo_sprite_pool = 
                 new traverse.ObjectPool ( make_sprite, 8 ) 

            callback ();
        },

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
