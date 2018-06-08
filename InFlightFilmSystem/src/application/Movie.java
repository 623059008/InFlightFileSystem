package application;

import org.json.JSONObject;

public class Movie extends JSONObject {
    private Integer movie_id;
    private String movie_intro;
    private String director;
    private String star;
    private String src;
    private String movie_img;
    private String movie_name;
    public String getMovie_name() {
		return movie_name;
	}
    public void setMovie_name(String movie_name) {
		this.movie_name=movie_name;
	}
    public Integer getMovie_id() {
		return movie_id;
	}

	public void setMovie_id(Integer movie_id) {
		this.movie_id = movie_id;
	}

	public String getMovie_intro() {
		return movie_intro;
	}

	public void setMovie_intro(String movie_intro) {
		this.movie_intro = movie_intro;
	}

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		this.src = src;
	}

	public String getMovie_img() {
		return movie_img;
	}

	public void setMovie_img(String movie_img) {
		this.movie_img = movie_img;
	}

	public String getDirector(){
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getStar() {
        return star;
    }

    public void setStar(String star) {
        this.star = star;
    }
}
