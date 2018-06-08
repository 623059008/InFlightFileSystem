package application;

import java.awt.List;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

import javax.swing.text.html.HTMLDocument.Iterator;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.concurrent.Worker;
import javafx.concurrent.Worker.State;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.control.ScrollPane;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import javafx.stage.StageStyle;
import netscape.javascript.JSObject;

public class Main extends Application {
	@Override
	public void start(final Stage stage) {
		stage.setWidth(802);
		stage.setHeight(602);
		final WebView browser = new WebView();
		final WebEngine webEngine = browser.getEngine();

		ScrollPane scrollPane = new ScrollPane();
		scrollPane.setContent(browser);

		final OpenAppUtil openAppUtil = new OpenAppUtil();
		webEngine.getLoadWorker().stateProperty().addListener(new ChangeListener<State>() {
			@Override
			public void changed(ObservableValue ov, State oldState, State newState) {
				if (newState == Worker.State.SUCCEEDED) {
					stage.setTitle(webEngine.getLocation());
					JSObject win = (JSObject) webEngine.executeScript("window");
					win.setMember("openAppUtil", openAppUtil);
				}
				// else if (newState == Worker.State.FAILED){
				// System.out.println(newState);
				// }
				// else{
				// System.out.println(newState);
				// }
			}
		});
		String path = System.getProperty("user.dir");
		path.replace("\\\\", "/");
		path += "/src/application/pannel/index.html";
		path = "file:///" + path;

		webEngine.load(path);
		Scene scene = new Scene(browser, 1000, 800);
		scene.setRoot(scrollPane);
		stage.setScene(scene);
		stage.setTitle("In Flight Film System");
		stage.initStyle(StageStyle.UNDECORATED);
		stage.show();
	}
/**
 * Get Json Data from file like {[{}]}.
 * @param fpath
 * @param list_name
 * @return
 */
	public JSONArray getJsonData(String fpath, String list_name) {
		String path = System.getProperty("user.dir");
		path.replace("\\\\", "/");
		path = path.substring(0, path.lastIndexOf("\\") + 1);
		path += fpath;
		if (path.contains(":")) {
			// path = path.substring(6);// 1
			path = path.replace("file:/", "");// 2
		}
		JSONArray arr = null;
		try {
			String data = FileUtils.readFileToString(new File(path), "UTF-8");
			JSONObject jsonObject = new JSONObject(data);
			arr = (JSONArray) jsonObject.get(list_name);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return arr;
	}
	public JSONObject getJsonData(String fpath) {
		String path = System.getProperty("user.dir");
		path.replace("\\\\", "/");
		path = path.substring(0, path.lastIndexOf("\\") + 1);
		path += fpath;
		if (path.contains(":")) {
			// path = path.substring(6);// 1
			path = path.replace("file:/", "");// 2
		}
		JSONObject jsonObject = null;
		try {
			String data = FileUtils.readFileToString(new File(path), "UTF-8");
			 jsonObject = new JSONObject(data);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
	}
	public String getMovieInfoFromWiki(){
		String path = System.getProperty("user.dir");
		path.replace("\\\\", "/");
		path = path.substring(0, path.lastIndexOf("\\") + 1);
		path += "movie_info/movie_list.json";
		if (path.contains(":")) {
			// path = path.substring(6);// 1
			path = path.replace("file:/", "");// 2
		}
		File file = new File(path);
		try {
			String content = FileUtils.readFileToString(file,  "UTF-8");
			JSONArray movie_names = new JSONArray(content);

			path = System.getProperty("user.dir");
			path.replace("\\\\", "/");
			path = path.substring(0, path.lastIndexOf("\\") + 1);
			path += "movie_info/";
			if (path.contains(":")) {
				// path = path.substring(6);// 1
				path = path.replace("file:/", "");// 2
			}
			JSONObject movie_info=null;
			JSONArray movie_infos=new JSONArray();
			for (int i = 0; i < movie_names.length(); i++) {
				movie_info	= Search.target(i,path, (String) movie_names.get(i));
				movie_infos.put(movie_info);
			}
			JSONObject movie = new JSONObject();
			movie.put("movie_info",movie_infos);
			path = System.getProperty("user.dir");
			path.replace("\\\\", "/");
			path = path.substring(0, path.lastIndexOf("\\") + 1);
			path += "movie_info/movie.json";
			if (path.contains(":")) {
				// path = path.substring(6);// 1
				path = path.replace("file:/", "");// 2
			}
			FileUtils.write(new File(path), movie.toString(), "UTF-8", false);

			return movie.toString();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	public static void main(String[] args) {
		launch(args);
//		new Main().getMovieInfoFromWiki();
	}

	// JavaScript interface object
	public class OpenAppUtil {
		final String callback = "success";

		public void exit() {
			Platform.exit();
		}

		public String getMovieInfo() {
			JSONArray movie_info = new Main().getJsonData("movie_info/movie.json", "movie_info");
			return movie_info.toString();
		}

		public boolean isApp() {
			return true;
		}
		public String updateMovieInfo(){
			return new Main().getMovieInfoFromWiki();
		}
		public String getAllText(){
			JSONObject config = new Main().getJsonData("config/config.json");
			return config.toString();
		}
		public void writeStyleJson(String s) {
			String path = getClass().getClassLoader().getResource("config/config.json").toString();
			path = path.replace("\\", "/");
			if (path.contains(":")) {
				// path = path.substring(6);// 1
				path = path.replace("file:/", "");// 2
			}
			try {
				FileUtils.write(new File(path), s, "UTF-8", true);
				System.out.println("Write Finished.");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
