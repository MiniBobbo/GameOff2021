export class Player {
    //The Player ID is equal to the index in the main player array. It is not a player facing variable.
    ID:number;
    
    TeamName:string;
    TeamColor:number;

    MaxMP:number = 100;
    CurrentMP:number = 100;
    RefreshMP:number = 20;

}