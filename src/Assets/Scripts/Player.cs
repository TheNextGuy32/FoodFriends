using UnityEngine;
using System.Collections;

public class player : MonoBehaviour {

	//Score of current Player
	private int _score;

	public int score{

		get{ return _score;}
		set{ _score = value;}

	}
	//Timer of current Player
	private Time _timer;



	//Name of current Player
	private string _name;

	public string name{

		get{ return _name;}
		set{ _name = value;}

	}



	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
