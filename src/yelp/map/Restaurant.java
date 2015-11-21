package yelp.map;


import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Restaurant {
	 
	String business_id;
	double Rating_similarity;
	double Cosine_similarity;
	String UserName;
	String BusinessName;
	double latitude;
	double longitude;
	
	public Restaurant() {}

	public Restaurant(String business_id, String UserName, 
			  double latitude, double longitude, double Rating_similarity, double Cosine_similarity, String BusinessName) {
		super();
		this.business_id = business_id;
		this.UserName = UserName;
		this.Rating_similarity = Rating_similarity;
		this.Cosine_similarity = Cosine_similarity;
		this.BusinessName = BusinessName;
		this.latitude = latitude;
		this.longitude = longitude;
		}

	public String getBusiness_id() {
		return business_id;
	}

	public void setBusiness_id(String business_id) {
		this.business_id = business_id;
	}

	public double getRating_similarity() {
		return Rating_similarity;
	}

	public void setRating_similarity(double rating_similarity) {
		Rating_similarity = rating_similarity;
	}

	public double getCosine_similarity() {
		return Cosine_similarity;
	}

	public void setCosine_similarity(double cosine_similarity) {
		Cosine_similarity = cosine_similarity;
	}

	public String getUserName() {
		return UserName;
	}

	public void setUserName(String userName) {
		UserName = userName;
	}

	public String getBusinessName() {
		return BusinessName;
	}

	public void setBusinessName(String businessName) {
		BusinessName = businessName;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	
}
