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

} ( window.traverse = window.traverse || {} ))