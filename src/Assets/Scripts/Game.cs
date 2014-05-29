using UnityEngine;
using System.Collections.Generic;

public enum GameState
{
	MENU, GAME, HIGH_SCORE
}

public class Game : MonoBehaviour {
	
	GameState currentGameState = GAME;
	
	int numberOfLanes = 3;
	
	//How quickly the food moves across the screen
	float foodSpeed;
	
	//List of all active food on screen
	List<Food> foods = new List<Food>();
	
	//Array of runners
	Country[] countries = new Country[numberOfLanes];
	
	
	
	public Game()
	{
		
	}
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
