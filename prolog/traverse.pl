width(W) :-
    W=20.

height(H) :-
    H=20.

object( wall ).
object( goal ).
object( player ).


object_position( O, X, Y ) :-
    object(O),
    width(W),
    height(H),
    X>=0,
    X<W,
    Y>=0,
    Y<H.

gamestate( [] ).
gamestate( [Ob] ) :-
    Ob=[O,X1,Y1],
    object_position(O,X1,Y1),
gamestate( [Ob|Obs] ) :-
    ( 
        %Obs is empty
        Obs=[];
        
        %OR no other object at same position
        ( Ob=[O|P1],
          Obs=[[_|P2]|_],
          P1\==P2 )
    ),
    gamestate(Obs).
