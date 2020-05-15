( function ( traverse, undefined )
{
    traverse.CreateState = function ( traverse_data )
    {
        this.traverse_data = traverse_data;

        //TODO - define puzzle_state as a parameter.  Pass {} from title
        this.create_data = {};

        //associate puzzle objects with their graphics systems
        this.create_data.puzzle_object_graphics = new Map ();

        this.create_data.state = new StartState ();

        this.tick = function ( traverse_data )
        {
            this.create_data.state.create_event
                .tick ( this.create_data, traverse_data );
        };

        this.stage_clicked = function ( e )
        {
            this.create_data.state.create_event
                .stage_clicked ( e, this.create_data, this.traverse_data );
        };

        this.enter_state = function ( traverse_data )
        {
            traverse_data.pixi_app.renderer.plugins.interaction
                .on ( 'pointerdown', 
                    ( e ) => 
                    { 
                        this.stage_clicked ( e ); 
                    });
        };

        this.exit_state = function ( traverse_data )
        {
            let g_iter = this.create_data.puzzle_object_graphics.values ();

            for ( const puzzle_graphics of g_iter )
            {
                puzzle_graphics.disable ( traverse_data );
                traverse_data.wall_graphics_pool.push ( puzzle_graphics );
            }
        };
    };

    /**
     * Each state is expected to store a reference to this component.
     *
     * When an event is fired the appropriate method will be called in this
     * object.  
     *
     * States can override the events with their own arrow functions.
     */
    let CreateEvent = function ()
    {
        this.enter = ( create_data, traverse_data ) => {};

        this.tick = ( create_data, traverse_data ) => {};

        this.stage_clicked = ( e, create_data, traverse_data ) => {};

        this.sprite_clicked = ( create_data, traverse_data ) => {};

        this.build_obj_button_clicked = 
            ( template, create_data, traverse_data ) => {};
    };


    /************************************************************************
     * Start State
     * - Initialize data and DOM interface
     ***********************************************************************/

    let StartState = function ()
    {
        this.create_event = new CreateEvent ();

        this.create_event.tick = ( create_data, traverse_data ) =>
        {

            create_data.puzzle_state = new traverse.PuzzleState ();

            create_data.build_objects = 
                new Set ( [ traverse.PuzzleObjects.Wall,
                            traverse.PuzzleObjects.Bogey,
                            traverse.PuzzleObjects.Boo ] );

            init_dom ( create_data, traverse_data );

            create_data.state = new WaitState ();
        }
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


        create_data.build_objects.forEach ( ( template ) =>
        {
            let button = traverse.create_object_button ( template,
            () => 
            { 
                create_data.state.create_event
                    .build_obj_button_clicked ( 
                        template, create_data, traverse_data );

            } );

            build_div.appendChild ( button );

        });

        let test_button = 
            traverse.create_menu_button ( "Test", 
            ()=>
            {
                let test_state = 
                    new traverse.TestState ( create_data, traverse_data );

                traverse.change_state ( test_state, traverse_data );
            } );

        root_div.appendChild ( test_button );

        let verify_button = 
            traverse.create_menu_button ( "Verify", 
            ()=>
            {
                //TODO make create event
                console.log ( "Verify" ); 
            } );

        root_div.appendChild ( verify_button );

        let share_button = 
            traverse.create_menu_button ( "Share", ()=>{} );

        root_div.appendChild ( share_button );

    };

    /************************************************************************
     * Wait State
     * - No build object selected
     ***********************************************************************/

    let WaitState = function ()
    {
        this.create_event = new CreateEvent ();

        this.create_event.build_obj_button_clicked =
            ( template, create_data, traverse_data ) =>
        {
            create_data.state = new ObjectSelectedState ( template );
        };
    };

    /************************************************************************
     * Object Selected State
     * -An object has been selected in the control panel. waiting for
     *  input on the stage
     ***********************************************************************/

    let ObjectSelectedState = function ( template )
    {
        this.template = template;

        this.create_event = new CreateEvent ();

        this.create_event.stage_clicked = 
            ( e, create_data, traverse_data ) =>
        {
            let grid_x = 
                traverse_data.scale_screen_pos ( e.data.global.x );
            let grid_y = 
                traverse_data.scale_screen_pos ( e.data.global.y );

            let puzzle_ob = 
                new traverse.PuzzleObject ( this.template, grid_x, grid_y );

            add_puzzle_object ( puzzle_ob, create_data, traverse_data );
        }

        this.create_event.build_obj_button_clicked =
            ( template, create_data, traverse_data ) =>
        {
            this.template = template;
        };
    };

    /************************************************************************
     * Puzzle State Management
     ***********************************************************************/

    let add_puzzle_object =
        function ( puzzle_ob, create_data, traverse_data )
    {
        remove_puzzle_object_at ( puzzle_ob.x, puzzle_ob.y, 
                                  create_data, traverse_data );

        remove_existing_unique ( puzzle_ob.name, 
                                 create_data, traverse_data );

        let po_graphics = puzzle_ob.get_graphics ( traverse_data );

        po_graphics.enable ( 
            traverse_data.scale_coord ( puzzle_ob.x ),
            traverse_data.scale_coord ( puzzle_ob.y ),
            traverse_data
        );

        create_data.puzzle_object_graphics.set ( puzzle_ob, po_graphics );

        create_data.puzzle_state.add_object ( puzzle_ob ); 
    };

    let remove_puzzle_ob = function ( puzzle_ob, create_data, traverse_data )
    {
        create_data.puzzle_state.remove_object ( puzzle_ob );

        let graphics = create_data.puzzle_object_graphics.get ( puzzle_ob );

        graphics.disable ( traverse_data );

        create_data.puzzle_object_graphics.delete ( puzzle_ob );
    };

    let remove_puzzle_object_at =
        function ( x, y, create_data, traverse_data )
    {
        let puzzle_ob = create_data.puzzle_state.get_object_at_pos ( x, y );

        if ( puzzle_ob == undefined )
        {
            return;
        }

        remove_puzzle_ob ( puzzle_ob, create_data, traverse_data );

    };

    let remove_existing_unique = function ( name, 
                                            create_data, traverse_data )
    {
        let puzzle_ob = create_data.puzzle_state.get_unique_object ( name );

        if ( puzzle_ob == undefined )
        {
            return;
        }

        remove_puzzle_ob ( puzzle_ob, create_data, traverse_data );
    };

} ( window.traverse = window.traverse || {} ))

