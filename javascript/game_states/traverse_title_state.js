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
                traverse.change_state ( next_scene );
            };

            let play_button = traverse.create_menu_button ( 
                col, "Play", () => button_cb ( new traverse.PlayState () ) );

            col.appendChild ( play_button );

            let create_button = traverse.create_menu_button ( 
                col, "Create", () => button_cb ( "Create_B" ) );

            col.appendChild ( create_button  );

            let level_select_button = traverse.create_menu_button ( 
                col, "Level Select", () => button_cb ( "LS" ) );
            
            col.appendChild ( level_select_button  );

            //TODO Animated title screen
            this.tick = () => {};

        };

        this.tick = start;

    };

} ( window.traverse = window.traverse || {} ))
