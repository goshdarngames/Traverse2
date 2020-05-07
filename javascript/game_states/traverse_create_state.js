( function ( traverse, undefined )
{
    traverse.CreateState = function ( traverse_data )
    {
        this.create_data = {};

        this.create_data.tick = start_tick;

        this.tick = function ( traverse_data )
        {
            this.create_data.tick ( this.create_data, traverse_data );
        };


    };

    let start_tick = function ( create_data, traverse_data )
    {
        init_dom ( create_data, traverse_data );

        create_data.tick = () => {};
    };

    let init_dom = function ( play_data, traverse_data )
    {
        let cp = traverse_data.dom_elements.control_panel;

        cp.set_title ( "Create" );

        cp.clear_content ();

        let root_div = traverse.create_flex_column_div ();
        
        cp.add_content ( root_div );

        let build_div = document.createElement ( "DIV" );

        build_div.classList.add ( "flex_row" );
        build_div.classList.add ( "flex_centered" );

        root_div.appendChild ( build_div );


        //TODO - move object button creation to dom input file
        [ "wall", "boo", "bogey" ].forEach ( ( name ) =>
        {
            let button = document.createElement ( "INPUT" );

            button.type = "image";
            
            button.alt = name;

            button.classList.add ( "create_object_button" );

            button.src = `assets/${name}.png`;

            //button.onclick = click_cb;

            build_div.appendChild ( button );

        });

        let test_button = 
            traverse.create_menu_button ( "Test", ()=>{} );

        root_div.appendChild ( test_button );

        let share_button = 
            traverse.create_menu_button ( "Share", ()=>{} );

        root_div.appendChild ( share_button );

    };


} ( window.traverse = window.traverse || {} ))

