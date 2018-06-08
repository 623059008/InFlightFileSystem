package application;

import org.apache.commons.io.FilenameUtils;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.*;
import java.net.URL;

public class Scrape {

    /**
     * scrape info and pic of movie from wikipedia(zh)
     * @param en lang=en->url
     * @param targetDirectory pic download path
     * @throws IOException
     */
    public JSONObject scrape(Integer id, String en, String targetDirectory, Movie movie) throws IOException{
        Document doc = Jsoup.connect(en).get();
        Elements tables = doc.select("table.infobox");
        Elements pics = tables.select("img[src]");
        for (Element t: tables){
            Elements rows = t.select("tbody tr");
            for (Element r: rows){
                Elements pros = r.select("th");
                Elements objs = r.select("td");
                for (Element pro: pros){
                    if (pro.text().matches("Directed by")){
                        for (Element obj: objs){
                            if (null != obj.text()){
                                movie.setDirector(obj.text());
                            }
                        }
                    } else if (pro.text().matches("Starring")){
                        for (Element obj: objs){
                            if (null != obj.text()){
                                movie.setStar(obj.text());
                            }
                        }
                    }
                }
            }
        }
        Elements paras = doc.select("p");
        movie.setMovie_intro(paras.get(0).text());
        movie.setMovie_img(movie.getMovie_id().toString()+".jpg");
        movie.setSrc(movie.getMovie_id().toString()+".mp4");
        JSONObject JMovie = new JSONObject(movie);
        downloadImage(movie.getMovie_id(), "https:" + pics.get(0).attr("src"), new File(targetDirectory).getAbsolutePath());
        return JMovie;
    }

    /**
     * download pic from target url
     * @param sourceUrl url of pic
     * @param targetDirectory pic download path
     * @throws IOException
     */
    public static void downloadImage(Integer id, String sourceUrl, String targetDirectory) throws IOException{
        URL imageUrl = new URL(sourceUrl);
        targetDirectory = targetDirectory.substring(0, targetDirectory.lastIndexOf("\\") + 1);
        targetDirectory += "image/";
        try (InputStream imageReader = new BufferedInputStream(imageUrl.openStream());
                OutputStream imageWriter = new BufferedOutputStream(new FileOutputStream(targetDirectory + File.separator
                        + id.toString() + ".jpg"));){
               int readByte;
               while ((readByte = imageReader.read()) != -1){
                   imageWriter.write(readByte);
               }
           }
    }

}
