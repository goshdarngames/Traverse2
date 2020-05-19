%gridsize
width(16).
height(16).

%puzzle objects
object( wall ).
object( bogey ).
object( boo ).

%only allowed one of these in each puzzle
unique( boo ).
unique( bodey ).

%must be at least one of these in each puzzle
required( boo ).
required( bogey ).

position( [ X, Y ] ) :-
    width(W),
    height(H),
    X>=0,
    X<W,
    Y>=0,
    Y<H.

puzzle_problem([boo, bogey], "Prolog said yes").
puzzle_problem(_,"Prolog said no.").


%object_position( O, P ) :-
%    object(O),
%    position(P).
%
%gamestate( [] ).
%gamestate( [Ob] ) :-
%    Ob=[O,X1,Y1],
%    object_position(O,X1,Y1),
%gamestate( [Ob|Obs] ) :-
%    ( 
%        %Obs is empty
%        Obs=[];
%        
%        %OR no other object at same position
%        ( Ob=[O|P1],
%          Obs=[[_|P2]|_],
%          P1\==P2 )
%    ),
%    gamestate(Obs).
