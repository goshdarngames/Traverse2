//TODO create prolog session
onmessage = function ( e )
{
    console.log ( "Thread received message" );
    postMessage ( e.data );
};

