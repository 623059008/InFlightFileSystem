package application;

import org.json.JSONArray;
import org.json.JSONObject;

public class Search {

    /**
     *
     * @param targetDirectory pic download path
     * @param jArray input
     * @return after change
     */
    public static JSONObject target (Integer id,String targetDirectory, String film){
        Scrape scrape = new Scrape();
        Movie movie = new Movie();
        movie.setMovie_id(id);
        movie.setMovie_name(film);
        JSONObject jObject=null;
            try{
            	jObject=scrape.scrape(id, "https://en.wikipedia.org/wiki/" + film + "_(film)", targetDirectory, movie);
                return jObject;
            } catch (Exception e){
            }
            try {
            	jObject=scrape.scrape(id-1, "https://en.wikipedia.org/wiki/" + film, targetDirectory, movie);
                return jObject;
            } catch (Exception e){
            }
        return jObject;
    }
}
