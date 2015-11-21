package yelp.map;

 
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.sun.jersey.api.view.Viewable;
 
@Path("/")
public class YelpService { 
 
	@GET
	@Path("/update")
	public Response getMsg() {
 
		String output = "Jersey say : ";
 
		return Response.status(200).entity(output).build();
 
	}
	
	@GET
    @Produces("text/html")
    public Viewable index() {
        return new Viewable("/index");
    }
	
	//Get all data no filter
	 @GET
     @Produces(MediaType.APPLICATION_JSON)
     @Path("/getRest") 
    public List<Restaurant> getAllRestaurants() {
		List<Restaurant> allrest = new ArrayList<Restaurant>();
		try {
			BufferedReader br = new BufferedReader(new FileReader(new File("D://Yelp_docs//output.csv")));
			String line;
			
			int count = 0; 
			
			while((line=br.readLine()) != null && count <=100000){
			if(line.contains(",,,,,,")){
				continue;
				}
				Restaurant r = new Restaurant();
				//business_id,name,schools,open,category,subcategory,is_vegetarian,review_count,stars,neighborhoods,url,photo_url,city,state,latitude,longitude
				String[] values= line.split(",");
				r.setBusiness_id(values[0]);
				r.setRating_similarity(Double.parseDouble(values[1]));
				r.setCosine_similarity(Double.parseDouble(values[2]));
				r.setUserName(values[3]);
				r.setBusinessName(values[4]);
				r.setLatitude(Double.parseDouble(values[5]));
				r.setLongitude(Double.parseDouble(values[6]));				
				allrest.add(r);
			
				count++;
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
        return allrest;
    }
	 
	 //get all restaurants of type="" subtype="" 
	/* @GET
     @Produces(MediaType.APPLICATION_JSON)
     @Path("/getRestOfType/{category}/{subcategory}") 
	 public List<Restaurant> getAllRestaurantsOfType(@PathParam("category") String category, @PathParam("subcategory") String subcategory) {
		 List<Restaurant> rest = new ArrayList<Restaurant>();
		 System.out.println("category" + category + " sub:" + subcategory);
		 try {
				BufferedReader br = new BufferedReader(new FileReader(new File("D:\\Yelp\\yelp visualization\\restaurant_annotated.csv")));
				String line;
				while((line=br.readLine()) != null){
					if(line.contains("business_id")){
						continue;
					}
					
					String[] values = line.split(",");
					if(values[4].equals(category) && values[5].equals(subcategory)){
						//business_id,name,schools,open,category,subcategory,is_vegetarian,review_count,stars,neighborhoods,url,photo_url,city,state,latitude,longitude
							Restaurant r = new Restaurant();
							r.setBusiness_id(values[0]);
							r.setName(values[1]);
							r.setSchools(values[2]);
							r.setOpen(values[3]);
							r.setCategory(values[4]);
							r.setSubcategory(values[5]);
							r.setIs_vegetarian(values[6]);
							r.setReview_count(Integer.parseInt(values[7]));
							r.setStars(Float.parseFloat(values[8]));
							r.setNeighborhoods(values[9]);
							r.setUrl(values[10]);
							r.setPhoto_url(values[11]);
							r.setCity(values[12]);
							r.setState(values[13]);
							r.setLatitude(Double.parseDouble(values[14]));
							r.setLongitude(Double.parseDouble(values[15]));
							r.setIsAmbienceGood(Integer.parseInt(values[16]));
							r.setIsFoodGood(Integer.parseInt(values[17]));
							r.setIsPriceGood(Integer.parseInt(values[18]));
							r.setIsServiceGood(Integer.parseInt(values[19]));
							rest.add(r);
					}
				} 
				
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	     return rest;
	 }*/
	 
	/* @GET
     @Produces(MediaType.APPLICATION_JSON)
     @Path("/getFilterRestOfType/{filter}") 
	 public List<Restaurant> getFilteredRestaurants(@PathParam("filter") String filter) {
		 //Restaurant,Chinese,1,1,1,1
		 List<Restaurant> rest = new ArrayList<Restaurant>();
		 String[] filterval = filter.split(",");
		 System.out.println("category" + filterval[0] + " sub:" + filterval[1] + " ambience:" + filterval[2]
				 + " food:" + filterval[3] + " price:" + filterval[4] + " service:" + filterval[5]);
		 try {
				BufferedReader br = new BufferedReader(new FileReader(new File("D:\\Yelp\\yelp visualization\\restaurant_annotated.csv")));
				String line;
				while((line=br.readLine()) != null){
					String[] values = line.split(",");
					if(line.contains("business_id") || values[16] == null || values[17] == null || values[18] == null || values[19] == null){
						continue;
					}
					
					boolean checkforfood=false;
					boolean checkforambience=false;
					boolean checkforprice=false;
					boolean checkforservice=false;
					if(filterval[2].equals("1")){
						checkforambience = true;
					} 
					if(filterval[3].equals("1")){
						checkforfood = true;
					} 
					if(filterval[4].equals("1")){
						checkforprice = true;
					} 
					if(filterval[5].equals("1")){
						checkforservice = true;
					} 
					//System.out.println("val:" + values[16] + " " + values[17] + " " + values[18] + " " + values[19]);
					//check that it satisfies filter
					if(values[4].equals(filterval[0]) && values[5].equals(filterval[1])){ 
						if(checkforambience){
							if(!values[16].equals(filterval[2])){
								continue;
							}
						}
						if(checkforfood){
							if(!values[17].equals(filterval[3])){
								continue;
							}
						}
						if(checkforprice){
							if(!values[18].equals(filterval[4])){
								continue;
							}
						}
						if(checkforservice){
							if(!values[19].equals(filterval[5])){
								continue;
							}
						}
							//business_id,name,schools,open,category,subcategory,is_vegetarian,review_count,stars,neighborhoods,url,photo_url,city,state,latitude,longitude
						
							Restaurant r = new Restaurant();
							r.setBusiness_id(values[0]);
							r.setName(values[1]);
							r.setSchools(values[2]);
							r.setOpen(values[3]);
							r.setCategory(values[4]);
							r.setSubcategory(values[5]);
							r.setIs_vegetarian(values[6]);
							r.setReview_count(Integer.parseInt(values[7]));
							r.setStars(Float.parseFloat(values[8]));
							r.setNeighborhoods(values[9]);
							r.setUrl(values[10]);
							r.setPhoto_url(values[11]);
							r.setCity(values[12]);
							r.setState(values[13]);
							r.setLatitude(Double.parseDouble(values[14]));
							r.setLongitude(Double.parseDouble(values[15]));
							r.setIsAmbienceGood(Integer.parseInt(values[16]));
							r.setIsFoodGood(Integer.parseInt(values[17]));
							r.setIsPriceGood(Integer.parseInt(values[18]));
							r.setIsServiceGood(Integer.parseInt(values[19]));
							rest.add(r);
						}
					}
				 
				
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		 
		 return rest;
	 }*/

}