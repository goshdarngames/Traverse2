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

    };

    let start_tick = function ( play_data, traverse_data )
    {
        init_dom ( play_data, traverse_data );

        let walls = [ { x : 0, y : 0}, { x : 1, y : 1 } ];

        walls.forEach ( ( w ) =>
        {
            let wall_sprite = 
                new PIXI.Sprite ( traverse_data.assets.wall_texture );

            wall_sprite.position.x = w.x * 64;
            wall_sprite.position.y = w.y * 64;

            traverse_data.pixi_app.stage.addChild ( wall_sprite );
        });

        play_data.tick = () => {};
    };

    //TODO - Add a function to create wall graphics from prolog rules


    let init_dom = function ( play_data, traverse_data )
    {
        let cp = traverse_data.dom_elements.control_panel;

        cp.set_title ( "Play" );

        cp.clear_content ();

        let col = traverse.create_flex_column_div ();

        cp.add_content ( col );

        let direction_controls = traverse.create_direction_controls ();

        col.appendChild ( direction_controls.container );

        let ghost_a = traverse.create_menu_button ( 
            "Ghost A", () => console.log( "OOhhh! A" ) );

        col.appendChild ( ghost_a  );

        let ghost_b = traverse.create_menu_button ( 
            "Ghost B", () => console.log( "OOhhh! B" ) );

        col.appendChild ( ghost_b  );

        //TODO - add middle square, add action handlers

    };

} ( window.traverse = window.traverse || {} ))
