( function ( traverse, undefined )
{
    traverse.PuzzleObject = function ( type, x, y )
    {
        this.type = type;
        this.x = x;
        this.y = y;
    };

    traverse.PuzzleState = function ( object_list )
    {
        this.object_list = object_list;

        this.is_valid ()
        {
        };
    };

    traverse.valid_puzzle_state = function ( s )
    {
        //TODO - check traverse rules prolog
        return false;
    };
} ( window.traverse = window.traverse || {} ))

