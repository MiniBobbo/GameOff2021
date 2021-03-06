# GameOff2021
GameOff 2021 entry tentitively titled BugLords.

Bug themed turn based strategy game similar to the Master of Monsters game for the Sega Genesis, or at least that's where I played it.

Each team is led by a BugLord who can summon new units and cast spells.  These BugLords move very slowly and if they are defeated the player loses.

# Glossary
Player - One actor who interacts with the game.  This may be a human or a CPU.
Magic Points (MP) - A consumable resource that belongs to the Player.  This is normally used by BugLords to summon new units and cast spells, but it might be used by units also sometimes.  Not sure yet. 
Team - A team is a collection of Units that are under the control of a single player.  Teams are normally led by a BugLord, but in the case of neutral units they may not be.
Unit - A single individual entity on the board that is controlled by one player.  Each unit has a movement step and an action step that can be performed each turn with some exceptions.  
Board - The playable area of a game.  The board is made up of undividual spaces arranged in a grid.
Space - A single location on the game Baord.  It has a terrain type that affects movement and possibly interactions.
Action - An action is something that can be done by units.  Normally a Unit gets a Move Action and an Interact Action. 
BugLord - The player avatar.  The BugLords are the most important units and if they are defeated the player loses the game.  BugLords are special in that they have a summon action that can be taken multile times a turn to create new units on the board.  
Move Action - A unit can move around the board acording to their movement values and the terrain.  
Interaction Action - A unit can affect the board in some way.  This normally is attacking another unit, but they could also cast a spell or take a special action. This is a stupid name and will not be player facing.  

# Unit Stats

HP - Current and Max.  When a unit is reduced to 0 HP they are removed from the board.
Armor - Incoming damage from physical attacks is reduced by this amount.
Magic Resist - Incoming damage from magic attacks is reduced by this amount.  
Movement - How far a unit can move a turn.  Measured in spaces.
Movement Type - How a unit moves (ground, flight, burrow, etc.)
Melee Attack - A Units melee attack.  This is optional.
Ranged Attack - A Units ranged attack.  This is optional.
Skills - A catch all area that changes the way this unit acts.  For instance, the Swift skill may let a unit take the Move Action after the Interact Action, which is normally not allowed.

# Attacks
Damage - How much damage the attack will do if it hits
Number -  The number of times the Unit attacks in one Interact Action.
Base Accuracy - How likely the unit is to hit.  This may be affected by spells, terrain, skills, or anything else.
Type - Physical, magical

# Overview

The game is played in a series of turns.  Each player (human or computer controlled) gets a chance to activate each of their units on the board.  
A normal game has two main game states.  The first is the Strategy Scene where the player can select their units and take Actions.  The player can look around the board and interact with their units.  When two units from different teams are next to each other on the Board they can attack each other with their Interaction Action.   In this case the game moves to the Battle Scene.

The second state is the Battle Scene where two Units battle.  The attacker chooses the type of attack they want to use (melee or ranged) and the defender has to respond with that same type of attack if they are able.  Each Unit gets to make their Attack Number of attacks starting with the attacker.  After the attackers first attack if the defender still has HP remaining they respond with an attack.  If the attacker still has HP and attacks remaining they respond and so on until one Unit is defeated or both units have exhausted all their attacks.

# Strategy Scene
Phase 1 - Create a board.  Fill board with generic locations.  Display those locations to the screen.
Phase 2 - Place a generic unit on the board and move it around.
Phase 3 - Units only get one move.  End Turn button added.  After new turn units get their actions back.
Phase 4 - Units can attack units from the other team(s) with melee or ranged attacks.  Starts the battle scene.  Gets the message back when the battle scene is complete.
Phase 5 - BugLord added.  BugLord can summon other units. 

In for these objects, x and y are always the pixel locations and xx and yy are the board locations.

# Battle Scene
Phase 1 - The battle is resolved and the results are communicated back to the calling scene.

The battle scene launches and goes through a common loop and then returns control to the Strategy Scene.  This is the basic loop:
- Initialize (only on first run) - Sprites are created.  States are set.  Events are created.
- Positioning - Sprites are positioned, units are loaded.  NextStep loop is started.
    - NextStep  
        - Determines if the battlescene should be ended (both units out of attacks or one is defeated.)
        - Determines who is the next to attack and who defends
        - If the attacker has attacks left, generate the results of the attack, then launch the sprites attack event.
        - The sprite handles its own attack animation and fires the ResolveAttack event on the BattleScene when contact should be made.
        - The ResolveAttack event applies the results of the attack to the defender, plays any animations, and then when it is complete launches the Finish event, which restarts the NextStep loop.


# Strategy Scene State Manager
The strategy scene state manager is going to manage the rather complicated UI states of the Strategy Scene.  The State that the game is in is going to change around all the listeners that are active.  For instance, if we are in the select state, when we hover over a unit we will get information about that unit.  From the Select state we can interact with the buttons (like the end turn button) and transition to the EndTurn state.  If the player clicks on one of their units we go into the UnitSelected state and display the options for that unit.

States
Move a unit = Selection (pick a unit) -> UnitSelected (pick move from options) ->  ChooseMoveLocation (click on a spot) -> Wait (Wait for move to complete) -> Selection


    Selection -> EndTurn, UnitSelected
    UnitSelected -> ChooseMove
    EndTurn,
    Summon,
    ChooseMoveLocation,
    ChooseAttack,
    Wait

