using UnityEngine;
using System.Collections;

public class Food : MonoBehaviour 
{
	string country;
	//Country of origin
	public string Country
	{
		get{return country;}
	}
	
	int lane;
	public int Lane
	{
		get{return lane;}	
	}
	
	Food(string myCountry, int myLane)
	{
		country = myCountry;
		lane = myLane;
	}
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
