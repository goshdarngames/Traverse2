( function ( traverse, undefined )
{
    traverse.PlayState = function ()
    {
        this.play_data = {};

        this.play_data.tick = start_tick;

        this.tick = function ( traverse_data )
        {
            this.play_data.tick ( this.play_data, traverse_data );
        };

        this.enter_state = function ( traverse_data )
        {
        };

        this.exit_state = function ( traverse_data )
        {
        };

    };

    let start_tick = function ( play_data, traverse_data )
    {
        init_dom ( play_data, traverse_data );

        let walls = [ { x : 0, y : 0}, 
                      { x : 1, y : 5 },
                      { x : 8, y : 1 },
                      { x : 5, y : 3 },
                      { x : 6, y : 4 },
                      { x : 4, y : 4 },
                      { x : 6, y : 8 },
                      { x : 12, y : 14 },
                      { x : 9, y : 11 },
                      { x : 9, y : 11 },
                      { x : 9, y : 8 },
                      { x : 3, y : 18 },
                      { x : 1, y : 8 },
                      { x : 15, y : 15 },
        ];

        //TODO - move this to a shared objects function
        let add_sprite = ( texture, x, y ) =>
        {
            let sprite = new PIXI.Sprite ( texture );

            sprite.position.x = traverse_data.scale_coord ( x );
            sprite.position.y = traverse_data.scale_coord ( y );

            traverse_data.pixi_app.stage.addChild ( sprite );
        };

        walls.forEach ( ( w ) =>
        {
             add_sprite ( traverse_data.assets.wall_texture, w.x, w.y );
        });

        add_sprite ( traverse_data.assets.boo_texture, 10, 10 );

        add_sprite ( traverse_data.assets.bogey_texture, 3, 4 );

        play_data.tick = () => {};
    };

    //TODO - Add a function to create wall graphics from prolog rules


    let init_dom = function ( play_data, traverse_data )
    {
        let cp = traverse_data.dom_elements.control_panel;

        cp.set_title ( "Play" );

        cp.clear_content ();

        let root_div = traverse.create_flex_column_div ();

        cp.add_content ( root_div );

        let direction_controls = traverse.create_direction_controls ();

        root_div.appendChild ( direction_controls.container );

        let obj_div = document.createElement ( "DIV" );

        obj_div.classList.add ( "flex_row" );
        obj_div.classList.add ( "flex_centered" );

        root_div.appendChild ( obj_div );

        [ "boo", "bogey" ].forEach ( ( name ) =>
        {
            let button = traverse.create_object_button ( name,
                ( n ) => { console.log ( n ); } );

            obj_div.appendChild ( button );

        });

    

        //TODO - add middle square, add action handlers

    };

} ( window.traverse = window.traverse || {} ))
