( function ( traverse, undefined )
{
    traverse.init_pixi = function ( pixi, document, traverse_data )
    {
        let type="WebGL";
        
        if ( !pixi.utils.isWebGLSupported () )
        {
            type = "canvas";
        }

        pixi.utils.sayHello ( type );

        pixi_app = new pixi.Application (
        {
            width  : traverse_data.canvas_size,
            height : traverse_data.canvas_size,
            view   : document.getElementById ( "pixi_canvas" ),
            transparent : false,
            backgroundColor : 0xBBCFDD,
        });

        //pixi app events are registered with the main_loop here so that
        //when state is changed they don't need to re-register

        pixi_app.renderer.plugins.interaction
            .on ( 'pointerdown', traverse.pixi_events.stage_clicked () );

        //add pointer to main loop

        traverse_data.pixi_app.ticker.add ( () =>
        {
            traverse.main_loop ( traverse_data );
        });

        return pixi_app;
    };

    
} ( self.traverse = self.traverse || {} ))
