( function ( traverse, undefined )
{
    traverse.CreateState = function ( traverse_data )
    {
        this.create_data = {};

        this.create_data.state = new StartState ();

        this.tick = function ( traverse_data )
        {
            this.create_data.state.create_event
                .tick ( this.create_data, traverse_data );
        };

        let stage_clicked = function ()
        {
            this.create_data.state.create_event.stage_clicked ();
        };

        this.enter_state = function ( traverse_data )
        {
        };

        this.exit_state = function ( traverse_data )
        {
        };

        //traverse_data.pixi_app.stage.on ( 'pointerdown', stage_clicked );

    };

    let CreateEvent = function ()
    {
        this.enter = ( create_data, traverse_data ) => {};

        this.tick = ( create_data, traverse_data ) => {};

        this.stage_clicked = ( create_data, traverse_data ) => {};

        this.sprite_clicked = ( create_data, traverse_data ) => {};
    };

    let StartState = function ()
    {
        this.create_event = new CreateEvent ();

        this.create_event.tick = function ( create_data, traverse_data )
        {
            init_dom ( create_data, traverse_data );

            create_data.state = new WaitState ();
        }
    };

    let WaitState = function ()
    {
        this.create_event = new CreateEvent ();

        this.create_event.stage_clicked = 
            function ( create_data, traverse_data )
        {
            console.log ( "Click" );
        };
    };

    let init_dom = function ( create_data, traverse_data )
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


        [ "wall", "boo", "bogey" ].forEach ( ( name ) =>
        {
            let button = traverse.create_object_button ( name,
            ( n ) => 
            { 
                //TODO select object
            } );

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

