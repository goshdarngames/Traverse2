( function ( traverse, undefined )
{
    traverse.init_pixi = function ( pixi, document )
    {
        let type="WebGL";
        
        if ( !pixi.utils.isWebGLSupported () )
        {
            type = "canvas";
        }

        pixi.utils.sayHello ( type );

        pixi_app = new pixi.Application (
        {
            width  : 800,
            height : 800
        });

        document.body.appendChild ( pixi_app.view );

        return pixi_app;
    };

    
} ( window.traverse = window.traverse || {} ))
