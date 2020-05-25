( function ( traverse, undefined )
{
    traverse.TestState = function ( initial_puzzle_state, traverse_data )
    {
        let test_data = {};

        test_data.state = new StartState ();

        this.tick = function ( traverse_data )
        {
            test_data.state.test_event
                .tick ( test_data, traverse_data );
        };

        this.enter_state = function ( traverse_data )
        {
        };

        this.exit_state = function ( traverse_data )
        {
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

        let direction_controls = traverse.create_direction_controls ();

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
                ( n ) => { console.log ( n ); } );

            obj_div.appendChild ( button );

        });

    
    };

} ( window.traverse = window.traverse || {} ))
