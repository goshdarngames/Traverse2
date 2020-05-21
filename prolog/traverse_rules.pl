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

not_member(_,[]).

not_member(X,[Head|Tail]) :-
    X \= Head,
    not_member( X, Tail ).

puzzle_problem( [], "No objects").

puzzle_problem( P, "Boo Missing"):-
    not_member([boo|_],P).

puzzle_problem( P, "Bogey Missing"):-
    not_member([bogey|_],P).

puzzle_problem(_,"None").


