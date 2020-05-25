/**
 * Puzzle objects
 */
object( wall ).
object( bogey ).
object( boo ).

/**
 * Only allowed one of these in each puzzle
 */
unique( boo ).
unique( bodey ).

/**
 * Must be at least one of these in each puzzle
 */
required( boo ).
required( bogey ).

/**
 * Space in which puzzle objects can move
 */

width(16).
height(16).

position( [ X, Y ] ) :-
    width(W),
    height(H),
    X>=0,
    X<W,
    Y>=0,
    Y<H.

direction(up).
direction(down).
direction(left).
direction(right).

/**
 * States objects can be in.
 */

state([static]).
state([moving,Dir]):-
    direction(Dir).

/**
 * This tuple represents each object in a puzzle state.
 */
state_position_object([Ob,Pos,State]):
    object(Ob),
    position(Pos),
    state(State).

/**
 * Inputs player can make.
 */

player_controlled( boo ).
player_controlled( bogey ).

input( Ob, Dir ) :-
    player_controlled( Ob ),
    direction( D ).

%Automatic actions 
input(none). 

/**
 * Utility: True if element is not member of list
 */

not_member(_,[]).
not_member(X,[Head|Tail]) :-
    X \= Head,
    not_member( X, Tail ).

/**
 * Relates a puzzle state with a string describing a problem
 * that prevents the state from being valid.
 */
puzzle_problem( [], "No objects").
puzzle_problem( P, "Boo Missing"):-
    not_member([boo|_],P).
puzzle_problem( P, "Bogey Missing"):-
    not_member([bogey|_],P).
puzzle_problem(_,"None").

/**
 * Relating puzzle states and inputs.
 */
