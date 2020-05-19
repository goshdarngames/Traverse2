( function ( traverse, undefined )
{
    let make_puzzle_object_pool = 
        function ( object_data, callback, traverse_data, )
    {
        let make_sprite = () => new PIXI.Sprite ( object_data.texture );

        traverse_data [ object_data.sprite_pool_key ] = 
             new traverse.ObjectPool ( make_sprite, object_data.pool_size ) 

        let make_graphics = () => new object_data.graphics_constructor ();

        traverse_data [ object_data.graphics_pool_key ] = 
             new traverse.ObjectPool ( make_graphics, 
                                       object_data.pool_size );

        callback ();
    };

    let loading_jobs =
    [
        ( callback, traverse_data ) =>
        {
            let url = "prolog/traverse_rules.pl";

            window.console.log ( `Read prolog: ${url}` );

            let request = new XMLHttpRequest ();

            request.open ( 'GET', url );

            request.responseType = 'text';

            request.onload = function ()
            {
                let session = pl.create ();
                session.consult ( request.response );

                traverse_data.assets.rules_pl = session;

                callback ( );
            };

            request.send ();
        },

        ( callback, traverse_data ) =>
        {
            traverse_data.assets.boo_texture =
                PIXI.Texture.from ( "assets/boo.png" );

            callback ();
        },

        ( callback, traverse_data ) =>
        {
            traverse_data.assets.bogey_texture =
                PIXI.Texture.from ( "assets/bogey.png" );

            callback ();
        },

        ( callback, traverse_data ) =>
        {
            traverse_data.assets.wall_texture =
                PIXI.Texture.from ( "assets/wall.png" );

            callback ();
        },

        ( callback, traverse_data ) =>
        {
            let object_data = 
            {
                texture                 : traverse_data.assets.wall_texture,
                sprite_pool_key         : "wall_sprite_pool",
                pool_size               : 128,

                graphics_constructor    :
                    traverse.puzzle_object_graphics.WallGraphics,

                graphics_pool_key       : "wall_graphics_pool"

            };

            make_puzzle_object_pool ( object_data, callback, traverse_data );
        },

        ( callback, traverse_data ) =>
        {
            let object_data = 
            {
                texture                 : traverse_data.assets.boo_texture,
                sprite_pool_key         : "boo_sprite_pool",
                pool_size               : 8,

                graphics_constructor    :
                    traverse.puzzle_object_graphics.BooGraphics,

                graphics_pool_key       : "boo_graphics_pool"

            };

            make_puzzle_object_pool ( object_data, callback, traverse_data );
        },

        ( callback, traverse_data ) =>
        {
            let object_data = 
            {
                texture                 : traverse_data.assets.bogey_texture,
                sprite_pool_key         : "bogey_sprite_pool",
                pool_size               : 8,

                graphics_constructor    :
                    traverse.puzzle_object_graphics.BogeyGraphics,

                graphics_pool_key       : "bogey_graphics_pool"

            };

            make_puzzle_object_pool ( object_data, callback, traverse_data );
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

            //TODO convert jobs to promises and make async
            if ( this.next_job < loading_jobs.length )
            {
                let job = loading_jobs [ this.next_job ];

                let callback = () => this.waiting = false;

                this.waiting = true;

                job ( callback, traverse_data );

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
