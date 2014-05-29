using UnityEngine;
using System.Collections;

public class Country : MonoBehaviour {

<<<<<<< HEAD
	short fatPoints;
	string countryName;
	int lane;

	public short FatPoints {
				set{ fatPoints = value;}
				get{ return fatPoints;}
	}

	public string CountryName {
				set{ countryName = value;}
				get{ return countryName;}
	}

	public int Lane {
				set{ lane = value;}
				get{ return lane;}
	}

	// Use this for initialization
	void Start (short fatPoints, string countryName, int lane) {
		this.fatPoints = fatPoints;
		this.countryName = countryName;
		this.lane = lane;
=======
	// Use this for initialization
	void Start () {
	
>>>>>>> 09b4cd7c44f71bd70f340339b7ce8dee8a22c940
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
