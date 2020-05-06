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

        play_data.wall_graphics = 
            create_wall_graphics ( traverse_data.pixi, walls,  40 );

        traverse_data.pixi_app.stage.addChild ( play_data.wall_graphics );


        play_data.tick = () => {};
    };

    //TODO - Add a function to create wall graphics from prolog rules

    let create_wall_graphics = function ( pixi, walls, size )
    {
        let g = new pixi.Graphics ();

        g.beginFill ( 0xFF0000 );

        walls.forEach ( ( w ) =>
        {
            g.drawRect ( w.x*size, w.y*size, size, size );
        });

        return g;
    };

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
            col, "Ghost A", () => console.log( "OOhhh! A" ) );

        col.appendChild ( ghost_a  );

        let ghost_b = traverse.create_menu_button ( 
            col, "Ghost B", () => console.log( "OOhhh! B" ) );

        col.appendChild ( ghost_b  );

        //TODO - add middle square, add action handlers

    };

} ( window.traverse = window.traverse || {} ))
