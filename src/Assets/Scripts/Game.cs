using UnityEngine;
using System.Collections.Generic;

public enum GameState
{
	MENU, GAME, HIGH_SCORE
};

public class Game : MonoBehaviour {

	public GameState currentGameState = GameState.GAME;
	public int numberOfLanes = 3;
	
	//How quickly the food moves across the screen
	public float foodSpeed;
	
	//List of all active food on screen
	List<Food> foods = new List<Food>();
	
	//Array of runners
	Country[] countries = new Country[3];
	
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
