( function ( traverse, undefined )
{
    traverse.TitleState = function ()
    {
        let start = function ( traverse_data )
        {
            let cp = traverse_data.dom_elements.control_panel;
            
            cp.set_title ( "Main Menu" );

            cp.clear_content ();

            let col = traverse.create_flex_column_div ();

            cp.add_content ( col );

            let button_cb = function ( next_scene )
            {
                traverse.change_state ( next_scene, traverse_data );
            };

            let play_button = traverse.create_menu_button ( 
                "Play", () => button_cb ( 
                    new traverse.PlayState () ) );

            col.appendChild ( play_button );

            let create_button = traverse.create_menu_button ( 
                "Create", () => button_cb ( 
                    new traverse.CreateState () ) );

            col.appendChild ( create_button  );

            let level_select_button = traverse.create_menu_button ( 
                "Level Select", () => button_cb ( "LS" ) );
            
            col.appendChild ( level_select_button  );

            //TODO Animated title screen
            this.tick = () => {};

        };

        this.tick = start;

        this.enter_state = function ( traverse_data )
        {
        };

        this.exit_state = function ( traverse_data )
        {
        };

    };

} ( window.traverse = window.traverse || {} ))
