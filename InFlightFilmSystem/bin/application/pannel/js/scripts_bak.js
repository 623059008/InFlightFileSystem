try {
  var InFlightMovie = {
    init: function() {
      Notify.init($("#head_notify"));
      this.page_open();
      this.welcome();
      this.movie();
      this.help();
      this.renderCss();
      this.renderText();
    },
    page_open: function(name) {
      name = name || "";
      var pages = ["welcome_page", "movies_page", "help_page"];
      var pid;
      for (var i = 0; i < pages.length; i++) {
        pid = "#" + pages[i];
        $(pid).hide();
      }
      if (name == "") {
        $("#welcome_page").show(300);
      } else if (name[0] != "#") {
        $("#" + name).show(300);
      } else {
        $(name).show(300);
      }
      console.log("open " + name);
    },
    renderText: function() {
      $("#render_everything").hide();
      $("#render_everything").click(function(event) {
        //页面渲染开始时,向Java获取movie_info并渲染
        try {
          var movie_info = window.openAppUtil.getMovieInfo();
          movie_info = JSON.parse(movie_info);
          log(typeof(movie_info));
          var htmlstr = getMovieHtml(movie_info);
          $("#movie_content").empty();
          $("#movie_content").append(htmlstr);
        } catch (e) {
          var Notify_options = {
            status: "danger",
            text: "Error: Wrong format in MovieInfo. " + e,
            click: msg_click,
            type: 1
          };
          var msg = new Notify(Notify_options);
        }
      });
      setTimeout("$(\"#render_everything\").trigger('click')", 1000);
    },
    renderCss: function() {
      //donothing
    },
    welcome: function() {
      var that = this;
      $("#movies_btn").click(function(event) {
        that.page_open("movies_page");
      });
      $("#help_btn").click(function(event) {
        that.page_open("help_page");
      });
      $("#exit_btn").click(function(event) {
        try {
          window.openAppUtil.exit();
        } catch (e) {
          var Notify_options = {
            status: "danger",
            text: "Error: Not in App. " + e,
            click: msg_click,
            type: 1
          };
          var msg = new Notify(Notify_options);
        }
      });
    },
    movie: function() {
      var that = this;
      $("#movies_page_back").click(function(event) {
        that.page_open("welcome_page");
      });
    },
    help: function() {
      var that = this;
      $("#help_page_back").click(function(event) {
        that.page_open("welcome_page");
      });
    },
    getMovieHtml(data) {
      if (data.lenght <= 0) return "";
      var htmlstr = "<div class=\"col-md-7 wthree_agile-movies_list\">\n";;
      for (var i = 0; i < data.length; i++) {
        htmlstr += "  <div class=\"w3l-movie-gride-agile\" id=\"m_item" + data[i]["movie_id"] + "\">\n";
        htmlstr += "    <a class=\"hvr-sweep-to-bottom\" id=\"m_open" + data[i]["movie_id"] + "\"><img src=\"" + data[i]["movie_img"] + "\" title=\"Movies Pro\" class=\"img-responsive\" alt=\"图片缺失\">\n";
        htmlstr += "      <div class=\"w3l-action-icon\"><i class=\"fa fa-play-circle-o\" aria-hidden=\"true\"><\/i><\/div>\n";
        htmlstr += "    <\/a>\n";
        htmlstr += "    <div class=\"mid-1 agileits_w3layouts_mid_1_home\">\n";
        htmlstr += "      <div class=\"w3l-movie-text\">\n";
        htmlstr += "        <h6><a id=\"m_name" + data[i]["movie_id"] + "\">" + data[i]["movie_name"] + " <\/a><\/h6>\n";
        htmlstr += "      <\/div>\n";
        htmlstr += "      <div class=\"mid-2 agile_mid_2_home\">\n";
        htmlstr += "        <p>" + data[i]["movie_intro"] + "<\/p>\n";
        htmlstr += "        <div class=\"clearfix\"><\/div>\n";
        htmlstr += "      <\/div>\n";
        htmlstr += "    <\/div>\n";
        htmlstr += "    <div class=\"ribben\">\n";
        htmlstr += "      <p>" + data[i]["class"] + "<\/p>\n";
        htmlstr += "    <\/div>\n";
        htmlstr += "  <\/div>\n";
      }
      htmlstr += "<\/div>\n";
      return htmlstr;
    },
  }
} catch (e) {
  log(e);
}
$(document).ready(function() {
  InFlightMovie.init();
});

function msg_click() {}

function log(info) {
  try {
    if (openAppUtil.isApp()) {
      if (info == undefined && info.length <= 0) {
        info = "undefined";
      }
      var Notify_options = {
        status: "info",
        text: info,
        click: msg_click,
        type: 1
      };
      var msg = new Notify(Notify_options);
    } else {
      console.log(info);
    }
  } catch (e) {
    var Notify_options = {
      status: "danger",
      text: "Not in App. " + info + " " + e,
      click: msg_click,
      type: 1
    };
    var msg = new Notify(Notify_options);
  }
}