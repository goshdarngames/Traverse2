( function ( traverse, undefined )
{
    traverse.TestState = function ( initial_puzzle_state, traverse_data )
    {
        let test_data = {};

        test_data.state = new StartState ();

        test_data.puzzle_object_graphics = new Map ();

        test_data.initial_puzzle_state = initial_puzzle_state;

        test_data.puzzle_state = undefined;

        this.tick = function ( traverse_data )
        {
            test_data.state.test_event
                .tick ( test_data, traverse_data );
        };

        this.enter_state = function ( traverse_data )
        {
            this.set_puzzle_state ( undefined, initial_puzzle_state );
        };

        this.exit_state = function ( traverse_data )
        {
        };

        //TODO move this logic to state state?
        this.set_puzzle_state = function ( old_state, new_state )
        {
            if ( old_state != undefined )
            {
                //TODO keep graphics that have not changed
            }
            else
            {
                test_data.puzzle_state = new_state;


                new_state.get_objects ().forEach ( o =>
                {
                    let po_graphics = o.get_graphics ( traverse_data );

                    po_graphics.enable ( 
                        traverse_data.scale_coord ( o.position.x ),
                        traverse_data.scale_coord ( o.position.y ),
                        traverse_data
                    );

                });

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
    let TestEvent = function ()
    {
        this.enter = ( test_data, traverse_data ) => {};

        this.tick = ( test_data, traverse_data ) => {};

        this.dir_button_clicked = ( dir ) => {};

    };

    /************************************************************************
     * Start State
     * - Initialize data and DOM interface
     ***********************************************************************/

    let StartState = function ()
    {
        this.test_event = new TestEvent ();

        this.test_event.tick = ( test_data, traverse_data ) =>
        {

            test_data.puzzle_state = new traverse.PuzzleState ();

            init_dom ( test_data, traverse_data );

            test_data.state = new InputWaitState ();

        }
    };

    //TODO make this re-usable between play and test
    let init_dom = function ( test_data, traverse_data )
    {
        let cp = traverse_data.dom_elements.control_panel;

        cp.set_title ( "Test" );

        cp.clear_content ();

        let root_div = traverse.create_flex_column_div ();

        cp.add_content ( root_div );

        let dir_button_cb = ( dir ) =>
        {
            test_data.state.test_event.dir_button_clicked ( dir );
        };

        let direction_controls = traverse
            .create_direction_controls ( dir_button_cb );

        root_div.appendChild ( direction_controls.container );

        let obj_div = document.createElement ( "DIV" );

        obj_div.classList.add ( "flex_row" );
        obj_div.classList.add ( "flex_centered" );

        root_div.appendChild ( obj_div );

        //TODO move to shared dom file
        [ traverse.PuzzleObjects.Types.Bogey, 
          traverse.PuzzleObjects.Types.Boo ]
            .forEach ( ( template ) =>
        {
            let button = traverse.create_object_button ( template,
                ( n ) => test_data.test_event.dir_button_clicked ( n ) );

            obj_div.appendChild ( button );

        });

        let edit_button = 
            traverse.create_menu_button ( "Edit", 
            ()=>
            {
                let create_state = 
                    new traverse.CreateState ( 
                        test_data.initial_puzzle_state, traverse_data );

                traverse.change_state ( create_state, traverse_data );
            } );

        root_div.appendChild ( edit_button );
    
    };

    /************************************************************************
     * Input Wait State
     * - Waiting for input from user or proceeding if 'none' is a valid
     *   input.
     ***********************************************************************/

    let InputWaitState = function ()
    {
        this.test_event = new TestEvent ();

        this.test_event.dir_button_clicked = ( dir ) => console.log ( dir );

        this.test_event.tick = ( test_data, traverse_data ) =>
        {

            this.test_event.tick = () => {};
        }

         
    };


} ( window.traverse = window.traverse || {} ))
