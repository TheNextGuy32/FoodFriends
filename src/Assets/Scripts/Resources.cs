using UnityEngine;
using System.Collections.Generic;

public class Resources : MonoBehaviour 
{
	public Dictionary<string, string> foods;
	public Dictionary<string, string> materials;
	private int[] highScores;
	
	/// <summary>
	/// Start this instance.
	/// </summary>
	void Start () 
	{
		
	}
	
	/// <summary>
	/// Update this instance.
	/// </summary>
	void Update () 
	{
	
	}

	// Property for foods
	public Dictionary<string, string> Foods
	{
		get {return foods;}
	}

	public Dictionary<string, string> Materials
	{
		get {return materials;}
	}

	public void addFood(string key, string value)
	{
		foods.Add(key, value);
	}

	public void addMaterial(string key, string value)
	{
		materials.Add (key, value);
	}

	public string getFoodByKey(string key)
	{
		if (this.foods.ContainsKey (key))
			return this.foods [key];
		else
			return null;
	}

	public string getMaterialByKey(string key)
	{
		if (this.materials.ContainsKey (key))
			return this.materials [key];
		else
			return null;
	}
}
