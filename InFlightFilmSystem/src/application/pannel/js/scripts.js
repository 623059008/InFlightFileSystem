try {
  var PageBackGround = 8; //背景
  var Language = 0; //中文
  var Cache_Config = {};
  var Cache_Movie = [];
  var InFlightMovie = {
    init: function() {
      var that = this;
      Notify.init($("#head_notify"));
      this.page_open();
      this.welcome();
      this.movie();
      this.help();
      this.play_page();
      this.renderCss();
      this.renderText();
      $("body").keydown(function(event) {
        that.keyDonwControl(event);
      });
    },
    page_open: function(name) {
      $("#loading_dimmer").show();
      setTimeout("$(\"#loading_dimmer\").hide();", 300)
      name = name || "";
      var pages = ["welcome_page", "movies_page", "help_page", "play_page", "style_page"];
      var pid;
      for (var i = 0; i < pages.length; i++) {
        pid = "#" + pages[i];
        $(pid).hide();
      }
      if (name == "") {
        $("#welcome_page").fadeIn(300);
      } else if (name[0] != "#") {
        $("#" + name).fadeIn(300);
      } else {
        $(name).fadeIn(300);
      }

    },
    renderText: function() {
      var that = this;
      $("#render_everything").hide();
      $("#render_everything").click(function(event) {
        //页面渲染开始时,向Java获取movie_info并渲染
        try {
          if (Cache_Movie.length == 0) {
            var movie_info = window.openAppUtil.getMovieInfo();
            movie_info = JSON.parse(movie_info);
            Cache_Config = movie_info;
          } else {
            var movie_info = Cache_Movie;
          }
          var movie_info = window.openAppUtil.getMovieInfo();
          movie_info = JSON.parse(movie_info);
          var htmlstr = that.getMovieHtml(movie_info);
          $("#movie_content").empty();
          $("#movie_content").append(htmlstr);
          that.bind_movie_click(movie_info);
          $("#movie_content").css("weight", (Math.round(movie_info.length / 2) * 300) + "px");
          $("#movie_content").css("height", "auto");
          $('#movie_content').css("background", "inherit");
          $('#movie_content').css("background-repeat", "repeat-x");
          $("#movie_content").css("overflow-x", "auto");
          $("#movie_content").css("overflow-y", "hidden");
        } catch (e) {
          log("Error: Wrong format in MovieInfo. " + e);
          //使用静态数据渲染
          var movie_info = [{
            "movie_id": 0,
            "movie_name": "Deadpool_(film)",
            "movie_img": "0.jpg",
            "empty": true,
            "star": "Ryan Reynolds Morena Baccarin Ed Skrein T.J. Miller Gina Carano Brianna Hildebrand",
            "movie_intro": "Deadpool is a 2016 American superhero film based on the Marvel Comics character of the same name, distributed by 20th Century Fox. It is the eighth installment of the X-Men film series, and the first standalone Deadpool film. Directed by Tim Miller from a screenplay by Rhett Reese and Paul Wernick, the film stars Ryan Reynolds in the title role alongside Morena Baccarin, Ed Skrein, T.J. Miller, Gina Carano, and Brianna Hildebrand. In the film, Wade Wilson hunts down the man who gave him mutant abilities, but also a scarred physical appearance, as the antihero Deadpool.",
            "src": "0.mp4",
            "director": "Tim Miller"
          }, {
            "movie_id": 1,
            "movie_name": "Deadpool_2",
            "movie_img": "1.jpg",
            "empty": true,
            "star": "Ryan Reynolds Josh Brolin Morena Baccarin Julian Dennison Zazie Beetz T.J. Miller Brianna Hildebrand Jack Kesy",
            "movie_intro": "Deadpool 2 is a 2018 American superhero film based on the Marvel Comics character Deadpool, distributed by 20th Century Fox. It is the eleventh installment in the X-Men film series, and a direct sequel to the 2016 film Deadpool. The film is directed by David Leitch from a script by Rhett Reese, Paul Wernick, and Ryan Reynolds, with Reynolds starring in the title role alongside Josh Brolin, Morena Baccarin, Julian Dennison, Zazie Beetz, T.J. Miller, Brianna Hildebrand, and Jack Kesy. In the film, Deadpool forms the team X-Force to protect a young mutant from the time-traveling soldier Cable.",
            "src": "1.mp4",
            "director": "David Leitch"
          }, {
            "movie_id": 2,
            "movie_name": "Iron Man",
            "movie_img": "2.jpg",
            "empty": true,
            "movie_intro": "Iron Man is a fictional superhero appearing in American comic books published by Marvel Comics. The character was created by writer and editor Stan Lee, developed by scripter Larry Lieber, and designed by artists Don Heck and Jack Kirby. The character made his first appearance in Tales of Suspense #39 (cover dated March 1963).",
            "src": "2.mp4"
          }, {
            "movie_id": 3,
            "movie_name": "Iron Man 2",
            "movie_img": "3.jpg",
            "empty": true,
            "star": "Robert Downey Jr. Gwyneth Paltrow Don Cheadle Scarlett Johansson Sam Rockwell Mickey Rourke Samuel L. Jackson",
            "movie_intro": "Iron Man 2 is a 2010 American superhero film based on the Marvel Comics character Iron Man, produced by Marvel Studios and distributed by Paramount Pictures.[N 1] It is the sequel to 2008's Iron Man, and is the third film in the Marvel Cinematic Universe (MCU). Directed by Jon Favreau and written by Justin Theroux, the film stars Robert Downey Jr. as Tony Stark / Iron Man, alongside Gwyneth Paltrow, Don Cheadle, Scarlett Johansson, Sam Rockwell, Mickey Rourke, and Samuel L. Jackson. Six months after the events of Iron Man, Tony Stark is resisting calls by the United States government to hand over the Iron Man technology while also combating his declining health from the arc reactor in his chest. Meanwhile, rogue Russian scientist Ivan Vanko has developed the same technology and built weapons of his own in order to pursue a vendetta against the Stark family, in the process joining forces with Stark's business rival, Justin Hammer.",
            "src": "3.mp4",
            "director": "Jon Favreau"
          }, {
            "movie_id": 4,
            "movie_name": "Iron Man 3",
            "movie_img": "4.jpg",
            "empty": true,
            "star": "Robert Downey Jr. Gwyneth Paltrow Don Cheadle Guy Pearce Rebecca Hall Stephanie Szostak James Badge Dale Jon Favreau Ben Kingsley",
            "movie_intro": "Iron Man 3 (stylized onscreen as Iron Man Three) is a 2013 American[4] superhero film based on the Marvel Comics character Iron Man, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures.1 It is the sequel to 2008's Iron Man and 2010's Iron Man 2, and the seventh film in the Marvel Cinematic Universe (MCU). The film was directed by Shane Black from a screenplay he co-wrote with Drew Pearce, and stars Robert Downey Jr. as Tony Stark / Iron Man, alongside Gwyneth Paltrow, Don Cheadle, Guy Pearce, Rebecca Hall, Stephanie Szostak, James Badge Dale, Jon Favreau, and Ben Kingsley. In Iron Man 3, Tony Stark deals with posttraumatic stress disorder caused by the events of The Avengers, while investigating a string of terrorist attacks led by the mysterious Mandarin, and comes into a conflict with an old enemy: Aldrich Killian.",
            "src": "4.mp4",
            "director": "Shane Black"
          }, {
            "movie_id": 5,
            "movie_name": "The Avengers",
            "movie_img": "5.jpg",
            "empty": true,
            "star": "Robert Downey Jr. Chris Evans Mark Ruffalo Chris Hemsworth Scarlett Johansson Jeremy Renner Tom Hiddleston Clark Gregg Cobie Smulders Stellan Skarsgård Samuel L. Jackson",
            "movie_intro": "Marvel's The Avengers[6] (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland),[3][7] or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures.[N 1] It is the sixth film in the Marvel Cinematic Universe (MCU). The film was written and directed by Joss Whedon and features an ensemble cast that includes Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, and Jeremy Renner as the titular Avengers team, alongside Tom Hiddleston, Clark Gregg, Cobie Smulders, Stellan Skarsgård, and Samuel L. Jackson. In the film, Nick Fury, director of the peacekeeping organization S.H.I.E.L.D., recruits Tony Stark, Captain America, the Hulk, and Thor to form a team that must stop Thor's brother Loki from subjugating Earth.",
            "src": "5.mp4",
            "director": "Joss Whedon"
          }, {
            "movie_id": 6,
            "movie_name": "Avengers: Age of Ultron",
            "movie_img": "6.jpg",
            "empty": true,
            "star": "Robert Downey Jr. Chris Hemsworth Mark Ruffalo Chris Evans Scarlett Johansson Jeremy Renner Don Cheadle Aaron Taylor-Johnson Elizabeth Olsen Paul Bettany Cobie Smulders Anthony Mackie Hayley Atwell Idris Elba Stellan Skarsgård James Spader Samuel L. Jackson",
            "movie_intro": "Avengers: Age of Ultron is a 2015 American superhero film based on the Marvel Comics superhero team the Avengers, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the sequel to 2012's The Avengers and the eleventh film in the Marvel Cinematic Universe (MCU). The film was written and directed by Joss Whedon and features an ensemble cast that includes Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans, Scarlett Johansson, Jeremy Renner, Don Cheadle, Aaron Taylor-Johnson, Elizabeth Olsen, Paul Bettany, Cobie Smulders, Anthony Mackie, Hayley Atwell, Idris Elba, Stellan Skarsgård, James Spader, and Samuel L. Jackson. In Avengers: Age of Ultron, the Avengers fight Ultron, an artificial intelligence obsessed with causing human extinction.",
            "src": "6.mp4",
            "director": "Joss Whedon"
          }, {
            "movie_id": 7,
            "movie_name": "Avengers: Infinity War",
            "movie_img": "7.jpg",
            "empty": true,
            "star": "Robert Downey Jr. Chris Hemsworth Mark Ruffalo Chris Evans Scarlett Johansson Benedict Cumberbatch Don Cheadle Tom Holland Chadwick Boseman Paul Bettany Elizabeth Olsen Anthony Mackie Sebastian Stan Danai Gurira Letitia Wright Dave Bautista Zoe Saldana Josh Brolin Chris Pratt",
            "movie_intro": "Avengers: Infinity War is a 2018 American superhero film based on the Marvel Comics superhero team the Avengers, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the sequel to 2012's The Avengers and 2015's Avengers: Age of Ultron, and the nineteenth film in the Marvel Cinematic Universe (MCU). The film is directed by Anthony and Joe Russo, written by Christopher Markus and Stephen McFeely, and features an ensemble cast including Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans, Scarlett Johansson, Benedict Cumberbatch, Don Cheadle, Tom Holland, Chadwick Boseman, Paul Bettany, Elizabeth Olsen, Anthony Mackie, Sebastian Stan, Danai Gurira, Letitia Wright, Dave Bautista, Zoe Saldana, Josh Brolin, and Chris Pratt. In Avengers: Infinity War, the Avengers and the Guardians of the Galaxy attempt to stop Thanos from amassing the all-powerful Infinity Stones.",
            "src": "7.mp4",
            "director": "Anthony Russo Joe Russo"
          }, {
            "movie_id": 8,
            "movie_name": "Thor",
            "movie_img": "8.jpg",
            "empty": true,
            "star": "Chris Hemsworth Natalie Portman Tom Hiddleston Stellan Skarsgård Colm Feore Ray Stevenson Idris Elba Kat Dennings Rene Russo Anthony Hopkins",
            "movie_intro": "Thor is a 2011 American superhero film based on the Marvel Comics character of the same name, produced by Marvel Studios and distributed by Paramount Pictures.[N 1] It is the fourth film in the Marvel Cinematic Universe (MCU). The film was directed by Kenneth Branagh, written by the writing team of Ashley Edward Miller and Zack Stentz along with Don Payne, and stars Chris Hemsworth as the title character, alongside Natalie Portman, Tom Hiddleston, Stellan Skarsgård, Colm Feore, Ray Stevenson, Idris Elba, Kat Dennings, Rene Russo, and Anthony Hopkins. The film sees Thor banished to Earth from Asgard, stripped of his powers and his hammer Mjölnir, after reigniting a dormant war. As his brother Loki plots to take the Asgardian throne, Thor must prove himself worthy.",
            "src": "8.mp4",
            "director": "Kenneth Branagh"
          }, {
            "movie_id": 9,
            "movie_name": "Thor 2",
            "movie_img": "9.jpg",
            "empty": true,
            "star": "Chris Hemsworth Natalie Portman Tom Hiddleston Anthony Hopkins Stellan Skarsgård Idris Elba Christopher Eccleston Adewale Akinnuoye-Agbaje Kat Dennings Ray Stevenson Zachary Levi Tadanobu Asano Jaimie Alexander Rene Russo",
            "movie_intro": "Thor: The Dark World is a 2013 American superhero film based on the Marvel Comics character Thor, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the sequel to 2011's Thor and the eighth film in the Marvel Cinematic Universe (MCU). The film was directed by Alan Taylor, with a screenplay by Christopher Yost and the writing team of Christopher Markus and Stephen McFeely.[5] It stars Chris Hemsworth as Thor, alongside Natalie Portman, Tom Hiddleston, Anthony Hopkins, Stellan Skarsgård, Idris Elba, Christopher Eccleston, Adewale Akinnuoye-Agbaje, Kat Dennings, Ray Stevenson, Zachary Levi, Tadanobu Asano, Jaimie Alexander, and Rene Russo. In Thor: The Dark World, Thor teams up with Loki to save the Nine Realms from the Dark Elves led by the vengeful Malekith, who intends to plunge the universe into darkness.",
            "src": "9.mp4",
            "director": "Alan Taylor"
          }, {
            "movie_id": 10,
            "movie_name": "Thor 3: Ragnarok",
            "movie_img": "10.jpg",
            "empty": true,
            "star": "Chris Hemsworth Tom Hiddleston Cate Blanchett Idris Elba Jeff Goldblum Tessa Thompson Karl Urban Mark Ruffalo Anthony Hopkins",
            "movie_intro": "Thor: Ragnarok is a 2017 American superhero film based on the Marvel Comics character Thor, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the sequel to 2011's Thor and 2013's Thor: The Dark World, and is the seventeenth film in the Marvel Cinematic Universe (MCU). The film is directed by Taika Waititi from a screenplay by Eric Pearson and the writing team of Craig Kyle and Christopher Yost, and stars Chris Hemsworth as Thor alongside Tom Hiddleston, Cate Blanchett, Idris Elba, Jeff Goldblum, Tessa Thompson, Karl Urban, Mark Ruffalo, and Anthony Hopkins. In Thor: Ragnarok, Thor must escape the alien planet Sakaar in time to save Asgard from Hela and the impending Ragnarök.",
            "src": "10.mp4",
            "director": "Taika Waititi"
          }, {
            "movie_id": 11,
            "movie_name": "Jupiter Ascending",
            "movie_img": "11.jpg",
            "empty": true,
            "star": "Channing Tatum Mila Kunis Sean Bean Eddie Redmayne Douglas Booth",
            "movie_intro": "Jupiter Ascending is a 2015 space opera[4] film written, produced and directed by The Wachowskis. Starring Channing Tatum, Mila Kunis, Sean Bean and Eddie Redmayne, the film is centered on Jupiter Jones (Kunis), an ordinary cleaning woman, and Caine Wise (Tatum), an interplanetary warrior who informs Jones that her destiny extends beyond Earth. Supporting cast member Douglas Booth has described the film's fictional universe as a cross between The Matrix and Star Wars,[5][6][7] while Kunis identified indulgence[8] and consumerism as its underlying themes.[9][10][11]",
            "src": "11.mp4",
            "director": "The Wachowskis"
          }, {
            "movie_id": 12,
            "movie_name": "The Hulk",
            "movie_img": "12.jpg",
            "empty": true,
            "star": "Eric Bana Jennifer Connelly Sam Elliott Josh Lucas Nick Nolte",
            "movie_intro": "Hulk is a 2003 American superhero film based on the fictional Marvel Comics character of the same name. Ang Lee directed the film, which stars Eric Bana as Dr. Bruce Banner, as well as Jennifer Connelly, Sam Elliott, Josh Lucas, and Nick Nolte. The film explores the origins of Bruce Banner, who after a lab accident involving gamma radiation finds himself able to turn into a huge green-skinned monster whenever he gets angry, while he is pursued by the United States military and comes into a conflict with his father.",
            "src": "12.mp4",
            "director": "Ang Lee"
          }, {
            "movie_id": 13,
            "movie_name": "The Incredible Hulk",
            "movie_img": "13.jpg",
            "empty": true,
            "star": "Edward Norton Liv Tyler Tim Roth Tim Blake Nelson Ty Burrell William Hurt",
            "movie_intro": "The Incredible Hulk is a 2008 American superhero film based on the Marvel Comics character the Hulk, produced by Marvel Studios and distributed by Universal Pictures. It is the second film in the Marvel Cinematic Universe (MCU). The film was directed by Louis Leterrier, with a screenplay by Zak Penn. It stars Edward Norton as Bruce Banner, alongside Liv Tyler, Tim Roth, Tim Blake Nelson, Ty Burrell, and William Hurt. In The Incredible Hulk, Bruce Banner becomes the Hulk as an unwitting pawn in a military scheme to reinvigorate the supersoldier program through gamma radiation. On the run, he attempts to cure himself of the Hulk before he is captured by General Thaddeus Ross, but his worst fears are realized when power-hungry soldier Emil Blonsky becomes a similar, but more bestial creature.",
            "src": "13.mp4",
            "director": "Louis Leterrier"
          }, {
            "movie_id": 14,
            "movie_name": "The_Amazing_Spider-Man",
            "movie_img": "14.jpg",
            "empty": true,
            "movie_intro": "The Amazing Spider-Man is an American comic book series published by Marvel Comics, featuring the fictional superhero Spider-Man as its main protagonist. Being in the mainstream continuity of the franchise, it began publication in 1963 as a monthly periodical and was published continuously, with a brief interruption in 1995, until its relaunch with a new numbering order in 1999. In 2003 the series reverted to the numbering order of the first volume. The title has occasionally been published biweekly, and was published three times a month from 2008 to 2010. A film named after the comic was released July 3, 2012.",
            "src": "14.mp4"
          }, {
            "movie_id": 15,
            "movie_name": "Spider-Man: Homecoming",
            "movie_img": "15.jpg",
            "empty": true,
            "star": "Tom Holland Michael Keaton Jon Favreau Zendaya Donald Glover Tyne Daly Marisa Tomei Robert Downey Jr.",
            "movie_intro": "Spider-Man: Homecoming is a 2017 American superhero film based on the Marvel Comics character Spider-Man, co-produced by Columbia Pictures and Marvel Studios, and distributed by Sony Pictures Releasing. It is the second Spider-Man film reboot and the sixteenth film in the Marvel Cinematic Universe (MCU). The film is directed by Jon Watts, from a screenplay by the writing teams of Jonathan Goldstein and John Francis Daley, Watts and Christopher Ford, and Chris McKenna and Erik Sommers. Tom Holland stars as Peter Parker / Spider-Man, alongside Michael Keaton, Jon Favreau, Zendaya, Donald Glover, Tyne Daly, Marisa Tomei, and Robert Downey Jr. In Spider-Man: Homecoming, Peter Parker tries to balance high school life with being Spider-Man, while facing the Vulture.",
            "src": "15.mp4",
            "director": "Jon Watts"
          }, {
            "movie_id": 16,
            "movie_name": "Guardians of the Galaxy",
            "movie_img": "16.jpg",
            "empty": true,
            "star": "Chris Pratt Zoe Saldana Dave Bautista Vin Diesel Bradley Cooper Lee Pace Michael Rooker Karen Gillan Djimon Hounsou John C. Reilly Glenn Close Benicio del Toro",
            "movie_intro": "Guardians of the Galaxy (retroactively referred to as Guardians of the Galaxy Vol. 1)[4][5] is a 2014 American superhero film based on the Marvel Comics superhero team of the same name, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the tenth film in the Marvel Cinematic Universe (MCU). The film was directed by James Gunn, who wrote the screenplay with Nicole Perlman, and features an ensemble cast including Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel, and Bradley Cooper as the titular Guardians, along with Lee Pace, Michael Rooker, Karen Gillan, Djimon Hounsou, John C. Reilly, Glenn Close, and Benicio del Toro. In Guardians of the Galaxy, Peter Quill forms an uneasy alliance with a group of extraterrestrial criminals who are fleeing after stealing a powerful artifact.",
            "src": "16.mp4",
            "director": "James Gunn"
          }, {
            "movie_id": 17,
            "movie_name": "Guardians_of_the_Galaxy_Vol._2",
            "movie_img": "17.jpg",
            "empty": true,
            "star": "Chris Pratt Zoe Saldana Dave Bautista Vin Diesel Bradley Cooper Michael Rooker Karen Gillan Pom Klementieff Elizabeth Debicki Chris Sullivan Sean Gunn Sylvester Stallone Kurt Russell",
            "movie_intro": "Guardians of the Galaxy Vol. 2 is a 2017 American superhero film based on the Marvel Comics superhero team Guardians of the Galaxy, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the sequel to 2014's Guardians of the Galaxy and the fifteenth film in the Marvel Cinematic Universe (MCU). Written and directed by James Gunn, the film stars an ensemble cast featuring Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel, Bradley Cooper, Michael Rooker, Karen Gillan, Pom Klementieff, Elizabeth Debicki, Chris Sullivan, Sean Gunn, Sylvester Stallone, and Kurt Russell. In Guardians of the Galaxy Vol. 2, the Guardians travel throughout the cosmos as they help Peter Quill learn more about his mysterious parentage.",
            "src": "17.mp4",
            "director": "James Gunn"
          }, {
            "movie_id": 18,
            "movie_name": "Black Panther",
            "movie_img": "18.jpg",
            "empty": true,
            "star": "Chadwick Boseman Michael B. Jordan Lupita Nyong'o Danai Gurira Martin Freeman Daniel Kaluuya Letitia Wright Winston Duke Angela Bassett Forest Whitaker Andy Serkis",
            "movie_intro": "Black Panther is a 2018 American superhero film based on the Marvel Comics character of the same name. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is the eighteenth film in the Marvel Cinematic Universe (MCU). The film is directed by Ryan Coogler, who co-wrote the screenplay with Joe Robert Cole, and stars Chadwick Boseman as T'Challa / Black Panther, alongside Michael B. Jordan, Lupita Nyong'o, Danai Gurira, Martin Freeman, Daniel Kaluuya, Letitia Wright, Winston Duke, Angela Bassett, Forest Whitaker, and Andy Serkis. In Black Panther, T'Challa is crowned king of Wakanda following his father's death, but his sovereignty is soon challenged by a new adversary who plans to abandon the country's isolationist policies and begin a global revolution.",
            "src": "18.mp4",
            "director": "Ryan Coogler"
          }, {
            "movie_id": 19,
            "movie_name": "Ant-Man",
            "movie_img": "19.jpg",
            "empty": true,
            "star": "Paul Rudd Evangeline Lilly Corey Stoll Bobby Cannavale Michael Peña Tip \"T.I.\" Harris Anthony Mackie Wood Harris Judy Greer David Dastmalchian Michael Douglas",
            "movie_intro": "Ant-Man is a 2015 American superhero film based on the Marvel Comics characters of the same name: Scott Lang and Hank Pym. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is the twelfth film in the Marvel Cinematic Universe (MCU). The film was directed by Peyton Reed, with a screenplay by the writing teams of Edgar Wright and Joe Cornish, and Adam McKay and Paul Rudd. It stars Rudd as Scott Lang / Ant-Man, alongside Evangeline Lilly, Corey Stoll, Bobby Cannavale, Michael Peña, Tip \"T.I.\" Harris, Anthony Mackie, Wood Harris, Judy Greer, David Dastmalchian, and Michael Douglas as Hank Pym. In Ant-Man, Lang must help defend Pym's Ant-Man shrinking technology and plot a heist with worldwide ramifications.",
            "src": "19.mp4",
            "director": "Peyton Reed"
          }, {
            "movie_id": 20,
            "movie_name": "Ant-Man_and_the_Wasp",
            "movie_img": "20.jpg",
            "empty": true,
            "star": "Paul Rudd Evangeline Lilly Michael Peña Walton Goggins Bobby Cannavale Judy Greer Tip \"T.I.\" Harris David Dastmalchian Hannah John-Kamen Abby Ryder Fortson Randall Park Michelle Pfeiffer Laurence Fishburne Michael Douglas",
            "movie_intro": "Ant-Man and the Wasp is an upcoming American superhero film based on the Marvel Comics characters Scott Lang / Ant-Man and Hope van Dyne / Wasp. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is intended to be the sequel to 2015's Ant-Man, and the twentieth film in the Marvel Cinematic Universe (MCU). The film is directed by Peyton Reed and written by the writing teams of Chris McKenna and Erik Sommers, and Paul Rudd, Andrew Barrer and Gabriel Ferrari. It stars Rudd as Lang and Evangeline Lilly as Van Dyne, alongside Michael Peña, Walton Goggins, Bobby Cannavale, Judy Greer, Tip \"T.I.\" Harris, David Dastmalchian, Hannah John-Kamen, Abby Ryder Fortson, Randall Park, Michelle Pfeiffer, Laurence Fishburne, and Michael Douglas. In Ant-Man and the Wasp, the titular pair team up to embark on a new mission from Hank Pym.",
            "src": "20.mp4",
            "director": "Peyton Reed"
          }, {
            "movie_id": 21,
            "movie_name": "Doctor Strange",
            "movie_img": "21.jpg",
            "empty": true,
            "movie_intro": "Doctor Stephen Vincent Strange is a fictional superhero appearing in American comic books published by Marvel Comics. Created by artist Steve Ditko and writer Stan Lee,[1] the character first appeared in Strange Tales #110 (cover-dated July 1963). Doctor Strange serves as the Sorcerer Supreme, the primary protector of Earth against magical and mystical threats. Inspired by stories of black magic and Chandu the Magician, Strange was created during the Silver Age of Comic Books to bring a different kind of character and themes of mysticism to Marvel Comics.",
            "src": "21.mp4"
          }];
          var htmlstr = that.getMovieHtml(movie_info);
          $("#movie_content").empty();
          $("#movie_content").append(htmlstr);
          that.bind_movie_click(movie_info);
          $("#movie_content").css("height", (Math.round(movie_info.length / 2) * 600) + "px");
          $('#movie_content').css("background", "inherit");
          $('#movie_content').css("background-repeat", "repeat-y");
        }
        //Render Language Text
        try {
          if (Cache_Config["language_btn"] == undefined) {
            var config = window.openAppUtil.getAllText();
            config = JSON.parse(config);
            Cache_Config = config;
          } else {
            var config = Cache_Config;
          }
          for (var i in config) {
            var eid = "#" + i;
            var text = Language == 0 ? config[i]["zh-text"] : config[i]["en-text"];
            $(eid).text(text);
          }
        } catch (e) {
          log(e);
          //使用静态数据渲染
          config = {
            "msg_close1": {
              "html": "button",
              "zh-text": "×",
              "en-text": ""
            },
            "movies_btn": {
              "html": "button",
              "zh-text": "点播电影",
              "en-text": "Movie"
            },
            "help_btn": {
              "html": "button",
              "zh-text": "使用帮助",
              "en-text": "Help"
            },
            "style_btn": {
              "html": "button",
              "zh-text": "设置",
              "en-text": "Setting"
            },
            "exit_btn": {
              "html": "button",
              "zh-text": "退出应用",
              "en-text": "Exit"
            },
            "movies_page_back": {
              "html": "button",
              "zh-text": "返回",
              "en-text": "Back"
            },
            "help_page_back": {
              "html": "button",
              "zh-text": "返回",
              "en-text": "Back"
            },
            "style_page_back": {
              "html": "button",
              "zh-text": "返回",
              "en-text": "Back"
            },
            "language_btn": {
              "html": "button",
              "zh-text": "中文",
              "en-text": "English"
            },
            "update_movie_info_btn": {
              "html": "button",
              "zh-text": "更新电影",
              "en-text": "Update Movie"
            },
            "render_everything": {
              "html": "button",
              "zh-text": "渲染所有",
              "en-text": ""
            },
            "loading_text": {
              "html": "span",
              "zh-text": "加载中",
              "en-text": "Loading"
            },
            "movies_page_header_text": {
              "html": "span",
              "zh-text": "电影点播",
              "en-text": "Movies"
            },
            "help_page_header_text": {
              "html": "span",
              "zh-text": "使用介绍",
              "en-text": "Help Introduction"
            },
            "style_page_header_text": {
              "html": "span",
              "zh-text": "设置",
              "en-text": "Setting"
            },
            "language_config": {
              "html": "span",
              "zh-text": "语言",
              "en-text": "Language"
            },
            "background_config": {
              "html": "span",
              "zh-text": "背景",
              "en-text": "Background Color"
            },
            "update_movie_info": {
              "html": "span",
              "zh-text": "更新电影(需要网络)",
              "en-text": "Update Movie(With Network)"
            },
            "movie_title_info": {
              "html": "span",
              "zh-text": "视频标题",
              "en-text": "Movie-Title"
            },
            "welcome_text": {
              "html": "h1",
              "zh-text": "航空电影播放系统",
              "en-text": "In Flight Movie System"
            }
          };
          for (var i in config) {
            var eid = "#" + i;
            var text = Language == 0 ? config[i]["zh-text"] : config[i]["en-text"];
            $(eid).text(text);
          }
        }
        //Render Css Setting Background.
        that.style_page();
      });
      setTimeout("$(\"#render_everything\").trigger('click')", 1000);
    },
    renderCss: function() {
      var that = this;
      //隐藏调试面板
      $("#console_div").hide();
      //背景渲染
      that.backgroundChange()
    },
    backgroundChange: function() {
      var pages = ["welcome_page", "movies_page", "help_page", "play_page", "style_page"];
      var page_background = {
        "橘橙|Juicy Orange": "radial-gradient(circle at 1.98% 17.04%, #FF8008, transparent 100%), radial-gradient(circle at 98.02% 71.05%, #FFC837, transparent 100%), radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "海市蜃楼|Mirage": "radial-gradient(circle at 1.98% 93.98%, #16222A, transparent 100%),radial-gradient(circle at 98.02% 93.03%, #3A6073, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "淡紫|Kashmir": "radial-gradient(circle at 1.98% 93.03%, #614385, transparent 100%),radial-gradient(circle at 98.02% 6.97%, #516395, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "莫吉托|Mojito": "radial-gradient(circle at 1.98% 78.99%, #1D976C, transparent 100%),radial-gradient(circle at 98.02% 27.98%, #93F9B9, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "玫瑰|Rose Water": "radial-gradient(circle at 1.98% 76.03%, #E55D87, transparent 100%),radial-gradient(circle at 98.02% 89.97%, #5FC3E4, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "柠檬|Lemon Twist": "radial-gradient(circle at 1.98% 85.01%, #3CA55C, transparent 100%),radial-gradient(circle at 98.02% 27.03%, #B5AC49, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "马提尼|Martini": "radial-gradient(circle at 1.98% 83.95%, #FDFC47, transparent 100%),radial-gradient(circle at 98.02% 59.03%, #24FE41, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "海滨|Shore": "radial-gradient(circle at 1.98% 33.05%, #70e1f5, transparent 100%),radial-gradient(circle at 98.02% 0.95%, #ffd194, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
      }
      //渲染页面背景
      var bg = "url(\"../../../../config/" + (PageBackGround > 7 ? 7 : PageBackGround) + ".jpg\") repeat-y";
      if (bg.length <= 0) bg = "url('../../../../config/0.jpg')";
      try {
        for (var i = 0; i < pages.length; i++) {
          var pid = "#" + pages[i];
          $(pid).css("background", bg);
          $(pid).css("background-size", "100% 500%");
        }
      } catch (e) {
        log(e);
      }
    },
    welcome: function() {
      var that = this;
      $("#movies_btn").click(function(event) {
        that.page_open("movies_page");
      });
      $("#style_btn").click(function(event) {
        that.page_open("style_page");
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
      $("#movies_page_header_trigger").mouseover(function(event) {
        if ($("#movies_page_header").css("opacity") == 0) {
          $("#movies_page_header").css("opacity", 1);
        }
      });
      $("#movies_page_header").mouseleave(function(event) {
        $("#movies_page_header").css("opacity", 0);
      });
    },
    play_page: function() {
      var that = this;
      $("#play_page_back").click(function(event) {
        document.getElementById("vids").pause();
        that.page_open("movies_page");
      });
    },
    help: function() {
      var that = this;
      $("#help_page_back").click(function(event) {
        that.page_open("welcome_page");
      });
    },
    style_page: function() {
      var that = this;
      $("#style_page_back").unbind('click').click(function(event) {
        that.page_open("welcome_page");
      });
      $("#language_btn").click(function(event) {
        $(this).hide();
        $("#loading_dimmer").show();
        setTimeout("$(\"#loading_dimmer\").hide();$('#language_btn').show();", 1000);
        if (Language == 0) {
          Language = 1;
          //渲染英文
          that.renderText();
        } else {
          Language = 0;
          //渲染中文
          that.renderText();
        }
      });
      $("#update_movie_info_btn").unbind('click').click(function(event) {
        $(this).hide();
        setTimeout("$('#update_movie_info_btn').show()", 1000 * 60 * 5);
        try {
          var movie_info = window.openAppUtil.updateMovieInfo();
          Cache_Movie = movie_info;
          that.renderText();
        } catch (e) {
          log(e);
        }
      });
      //render Background checked div
      var page_background = {
        "艳橙|Juicy Orange": "radial-gradient(circle at 1.98% 17.04%, #FF8008, transparent 100%), radial-gradient(circle at 98.02% 71.05%, #FFC837, transparent 100%), radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "海市蜃楼|Mirage": "radial-gradient(circle at 1.98% 93.98%, #16222A, transparent 100%),radial-gradient(circle at 98.02% 93.03%, #3A6073, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "淡紫|Kashmir": "radial-gradient(circle at 1.98% 93.03%, #614385, transparent 100%),radial-gradient(circle at 98.02% 6.97%, #516395, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "莫吉托|Mojito": "radial-gradient(circle at 1.98% 78.99%, #1D976C, transparent 100%),radial-gradient(circle at 98.02% 27.98%, #93F9B9, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "玫瑰|Rose Water": "radial-gradient(circle at 1.98% 76.03%, #E55D87, transparent 100%),radial-gradient(circle at 98.02% 89.97%, #5FC3E4, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "柠檬|Lemon Twist": "radial-gradient(circle at 1.98% 85.01%, #3CA55C, transparent 100%),radial-gradient(circle at 98.02% 27.03%, #B5AC49, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "马提尼|Martini": "radial-gradient(circle at 1.98% 83.95%, #FDFC47, transparent 100%),radial-gradient(circle at 98.02% 59.03%, #24FE41, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
        "海滨|Shore": "radial-gradient(circle at 1.98% 33.05%, #70e1f5, transparent 100%),radial-gradient(circle at 98.02% 0.95%, #ffd194, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
      };
      var htmlstr = that.getBackgroundCheckHtml(page_background);
      $("#background_config_div").empty();
      $("#background_config_div").append(htmlstr);
      that.bind_backgroundchange_click(page_background);
    },
    getMovieHtml: function(data) {
      if (data.lenght <= 0) return "";
      var strVar = '';
      var strVar = "<div class=\"ui link cards\">\n";
      for (var i = 0; i < data.length; i++) {
        if (data[i] == null) continue;
        if (data[i]["movie_name"] == undefined) data[i]["movie_name"] = "";
        if (data[i]["director"] == undefined) data[i]["director"] = "";
        if (data[i]["star"] == undefined) data[i]["star"] = "";
        if (data[i]["movie_intro"] == undefined) data[i]["movie_intro"] = "";
        var m_name = ((data[i]["movie_name"].length > 15) ? (data[i]["movie_name"].substr(0, 15) + "...") : (data[i]["movie_name"]));
        var m_star = data[i]["director"] + "," + data[i]["star"].replace(" ", ",");
        m_star = (m_star.length > 40) ? (m_star.substr(0, 40) + "...") : (m_star);
        strVar += "          <div class=\"card\" style=\"width:300px;overflow:hidden;margin-right:8%;\" id=\"movie_" + data[i]["movie_id"] + "\">\n";
        strVar += "            <div class=\"image\" id=\"movie_imgdiv_" + data[i]["movie_id"] + "\" style=\"width:300px;height:400px;\">\n";
        strVar += "              <img id=\"movie_img_" + data[i]["movie_id"] + "\" src=\"" + (data[i]["movie_img"].indexOf("http") == -1 ? ("../../../../image/" + data[i]["movie_img"]) : (data[i]["movie_img"])) + "\" id=\"movie_img_" + data[i]["movie_id"] + "\" title=\"" + m_name + "\" style=\"width:300px;height:400px;\">\n";
        strVar += "            <\/div>\n";
        strVar += "            <div class=\"image\" style=\"display:none;font-size:0.8em;width:300px;height:400px;padding:1%;\" id=\"movie_desc_" + data[i]["movie_id"] + "\">\n";
        strVar += (data[i]["movie_intro"].length > 588) ? (data[i]["movie_intro"].substr(0, 588) + "...") : (data[i]["movie_intro"]);
        strVar += "            <\/div>\n";
        strVar += "            <div class=\"content\">\n";
        strVar += "              <div class=\"header\" style=\"background:#fff;\" id=\"movie_name_" + data[i]["movie_id"] + "\">" + m_name + "<\/div>\n";
        strVar += "              <div class=\"meta\">\n";
        strVar += "                <span id=\"movie_star_" + data[i]["movie_id"] + "\" data-content=\"" + (data[i]["director"] + " " + data[i]["star"]) + "\">" + m_star + "<\/span>\n";
        strVar += "              <\/div>\n";
        strVar += "          <div class=\"\" style=\"width:100%;bottom:20px;\">\n";
        strVar += "            <button class=\"ui inverted teal button\" id=\"movie_Desc_" + data[i]["movie_id"] + "\">" + (Language == 0 ? "简介" : "Desc") + "<\/button>\n";
        strVar += "            <button class=\"ui inverted green button\" id=\"movie_play_" + data[i]["movie_id"] + "\">" + (Language == 0 ? "播放" : "Watch") + "<\/button>\n";
        strVar += "          <\/div>\n";
        strVar += "            <\/div>\n";
        strVar += "          <\/div>\n";

      }
      strVar += "        <\/div>\n";
      return strVar;
    },
    bind_movie_click: function(data) {
      var that = this;
      for (var i = 0; i < data.length; i++) {
        var mid = data[i]["movie_id"];
        var mopenid = "#movie_img_" + data[i]["movie_id"];
        var playbtn = "#movie_play_" + data[i]["movie_id"];
        var descbtn = "#movie_Desc_" + data[i]['movie_id'];
        (function(mid, moid, playid, descid, movie_json) {
          $(moid).unbind('click').click(function(event) {
            that.renderPlay(movie_json);
            that.page_open("play_page");
          });
          $(playid).unbind('click').click(function(event) {
            that.renderPlay(movie_json);
            that.page_open("play_page");
          });
          $(descid).unbind('click').click(function(event) {
            if ($(this).html() == "Desc") {
              $(this).html("Image");
              $("#movie_imgdiv_" + mid).css("display", "none");
              $('#movie_desc_' + mid).css("display", "block");
              return;
            }
            if ($(this).html() == "Image") {
              $(this).html("Desc");
              $('#movie_desc_' + mid).css("display", "none");
              $("#movie_imgdiv_" + mid).css("display", "block");
              return;
            }
            if ($(this).html() == "简介") {
              $(this).html("图片");
              $("#movie_imgdiv_" + mid).css("display", "none");
              $('#movie_desc_' + mid).css("display", "block");
              return;
            }
            if ($(this).html() == "图片") {
              $(this).html("简介");
              $('#movie_desc_' + mid).css("display", "none");
              $("#movie_imgdiv_" + mid).css("display", "block");
              return;
            }

          });
        })(mid, mopenid, playbtn, descbtn, data[i]);
      }
    },
    getBackgroundCheckHtml: function(data) {
      var htmlstr = "";
      htmlstr += "<div class=\"ui eight cards\" style='margin-left:2%;'>\n";
      var id = 0;
      var name = "";
      for (var i in data) {
        if (Language == 0)
          name = i.substr(0, i.indexOf("|"));
        else
          name = i.substr(i.indexOf("|") + 1, i.length);
        htmlstr += "<a class=\"card\" style=\"width:11%;font-size:0.4em;\" id=\"changeBg_" + id + "\">\n";
        htmlstr += "<div class=\"image\">\n";
        htmlstr += "<img src=\"../../../../config/" + id + ".jpg\">\n";
        htmlstr += "<\/div>\n";
        htmlstr += "<div class=\"description\" style=\"font-size:2em;\">" + name + "<\/div>\n";
        htmlstr += "<\/a>\n";
        id++;
      }
      htmlstr += "</div>";
      return htmlstr;
    },
    bind_backgroundchange_click: function(data) {
      var that = this;
      var id = 0;
      for (var i in data) {
        var bgid = "#changeBg_" + id;
        (function(bgid, id, that) {
          $(bgid).unbind('click').click(function(event) {
            PageBackGround = id;
            that.backgroundChange();
          });
        })(bgid, id, that);
        id++;
      }
    },
    renderPlay: function(data) {
      try {
        var vids = document.getElementById("vids");
        vids.src = "../../../../movie/" + data.src;
        $("#nTime").html("00:00:00");
        $("#pass").css("display", "block");
        $("#movie_title_info").text(data["movie_name"] + "--" + data["movie_intro"]);
        var sskd = $(".controls").width(); /*替换原来的764*/
        /*点击暂停图标的时候*/
        $("#pass").click(function() {
          $(this).css({
            display: "none"
          });
          $("#ztbf").attr("class", "glyphicon glyphicon-pause")
          try {
            vids.play();
          } catch (e) {
            log("视频无法播放.The video does not exist.");
          }
        });
        /*点击控制按钮里面的暂停图标的时候*/
        $("#ztbf").click(function() {
          if ($("#ztbf").attr("class") == "glyphicon glyphicon-play") {
            try {
              vids.play();
            } catch (e) {
              log("视频无法播放.The video does not exist.");
            }
            $("#ztbf").attr("class", "glyphicon glyphicon-pause");
          } else {
            vids.pause();
            $("#ztbf").attr("class", "glyphicon glyphicon-play");
          }
        });
        /*不论任何途径只要是暂停或者播放*/
        vids.onplay = function() {
          $("#pass").css({
            display: "none"
          });
          $("#ztbf").attr("class", "glyphicon glyphicon-pause");
        }
        vids.onpause = function() {
          $("#pass").css({
            display: "block"
          });
          $("#ztbf").attr("class", "glyphicon glyphicon-play");
          $("#pBar").on('mouseup', function() {
            $(this).off('mousemove')
          });
        }

        /*当前时间/总的时间(canplay方法开始)*/
        try {

          vids.addEventListener("canplay", function() {
            var aTime = numFormat(vids.duration);
            $("#aTime").html(aTime);
            /*第一步,进度条跟着时间动(鼠标点下的时候)*/
          });
          vids.addEventListener("timeupdate", function() {
            sskd = $(".controls").width()
            if (vids.buffered.length > 0) {
              var hc = (vids.buffered.end(0) / vids.duration) * sskd;
              $("#buff").css({
                width: hc + 'px'
              });
              var nTime = numFormat(vids.currentTime);
              $("#nTime").html(nTime);
              /*当前的时间比上总的时间乘以总的长度*/
              var nLengh = (vids.currentTime / vids.duration) * (sskd - 20);
              $("#pBar_move").css({
                width: nLengh + 'px'
              });
            }
          });
          /*第二步,点击时的进度条*/
          $("#pBar").mousedown(function(e) {
            var cLk = e.clientX; /*点击距离(点击在进度条区域)*/
            var pJl = $("#pBar").offset().left; /*获取进度条距离左边的距离*/
            var mLengh = cLk - pJl; /*移动的距离*/
            if (mLengh >= (sskd - 20)) {
              mLengh = (sskd - 20)
            }
            $("#pBar_move").css({
              width: mLengh + 'px'
            });
            var cTime1 = mLengh / (sskd - 20) * vids.duration;
            vids.currentTime = cTime1;
            var cTime2 = numFormat(cTime1);
            $("#nTime").html(cTime2); /*改变html的显示时间*/
            /*---------------------------------鼠标拖拽的距离---------------------------------------*/
            $(".controls").on('mousemove', function(e) {
              vids.pause();
              $("#ztbf").attr("class", "glyphicon glyphicon-play");
              var newLeft = e.clientX - pJl; /*拖拽的距离*/
              if (newLeft <= 0) {
                newLeft = 0;
              }
              if (newLeft >= (sskd - 20)) {
                newLeft = (sskd - 20)
              }
              var cTime3 = newLeft / (sskd - 20) * vids.duration;
              var cTime4 = numFormat(cTime3);
              $("#pBar_move").css({
                width: newLeft + 'px'
              });
              vids.currentTime = cTime3;
              $("#nTime").html(cTime4);
            }) /*拖拽结束*/
            /*----------------------------------鼠标松开----------------------------------------*/
            $(".controls").on('mouseup', function() {
              $(".controls").off('mousemove');
            }) /*松开结束*/
          }); /*mousedown方法结束*/
        } catch (e) {
          log(e);
        }
        /*音量加减*/
        vBtn.onmousedown = function(ev) {
          var ev = ev || window.event;
          var xs = ev.clientX - this.offsetLeft;
          vBtn.onmousemove = function(ev) {
            var newLefts = ev.clientX - xs;
            if (newLefts <= 0) {
              newLefts = 0;
            } else if (newLefts >= vBar.offsetWidth - vBtn.offsetWidth) {
              newLefts = vBar.offsetWidth - vBtn.offsetWidth;
            }
            vBtn.style.left = newLefts + "px";
            vBar_in.style.width = (newLefts + 5) + "px";
            var prop = newLefts / (vBar.offsetWidth - vBtn.offsetWidth);
            vids.volume = prop;
            //静音改变音量图标
            if (!vids.volume) {
              $("#volume-icon").attr("class", "glyphicon glyphicon-volume-off");
            } else {
              $("#volume-icon").attr("class", "glyphicon glyphicon-volume-up");
            }
          }
          vBtn.onmouseup = function() {
            vBtn.onmousemove = null;
            vBtn.onmouseup = null;
          }
        }
      } catch (e) {
        var Notify_options = {
          status: "danger",
          text: "Error: Play Movie failed. " + e,
          click: msg_click,
          type: 1
        };
        var msg = new Notify(Notify_options);
      }
    },
    keyDonwControl: function(event) {
      var that = this;
      var keyCode = event.which;
      var vids = document.getElementById("vids");
      if ($("#play_page").css("display") != "none") {
        if (keyCode === 37) {
          vids.currentTime -= 10;
        }
        if (keyCode === 39) {
          vids.currentTime += 10;
        }
        /*第一次播放,按下回车键*/
        if (keyCode == 13 && $("#pass").css("display") != "none") {
          $("#pass").css({
            display: "none"
          });
          $("#ztbf").attr("class", "glyphicon glyphicon-pause")
          try {
            vids.play();
          } catch (e) {
            log("视频无法播放.The video does not exist.");
          }
        }
        /*----暂停播放(点击键盘空格的时候)----*/
        if (keyCode === 32) {
          if (vids.paused) {
            try {
              vids.play();
              $("#pass").css("display", "none");
            } catch (e) {
              log("视频无法播放.The video does not exist.");
            }
            $("#ztbf").attr("class", "glyphicon glyphicon-pause")
          } else {
            vids.pause();
            $("#pass").css("display", "block");
            $("#ztbf").attr("class", "glyphicon glyphicon-play")
          }
        }
        /*-----------退出播放-----------*/
        if (keyCode === 27) {
          vids.pause();
          that.page_open("movies_page");
        }
        return;
      }
      if ($("#movies_page").css("display") != "none") {
        if (keyCode == 27) {
          that.page_open("welcome_page");
        }
        if (keyCode == 40) {
          var next = false;
          $("#movies_page").find("button").each(function(index, el) {
            if ($(el).is(":focus") && next == false) {
              $(el).blur();
              $("#movies_page").find("button").each(function(ind, ele) {
                if (ind == index + 1) {
                  $(ele).focus();
                  next = true;
                  return;
                }
              });
              if (next) return;
            }
          });
          if (next) return;
          $("#movies_page").find("button").each(function(index, el) {
            if (index == 0) {
              $(el).focus();
              return;
            }
          });
        }
        if (keyCode == 38) {
          var pre = false;
          $("#movies_page").find("button").each(function(index, el) {
            if ($(el).is(":focus") && pre == false) {
              $(el).blur();
              $("#movies_page").find("button").each(function(ind, ele) {
                if (ind == index - 1) {
                  $(ele).focus();
                  pre = true;
                  return;
                }
              });
              if (pre) return;
            }
          });
          if (pre) return;
          var len = $("#movies_page").find("button").length;
          $("#movies_page").find("button")[len - 1].focus();
        }
        return;
      }
      if ($("#welcome_page").css("display") != "none") {
        if (keyCode == 27) {
          $("#exit_btn").trigger('click');
        }
        if (keyCode == 40) {
          var next = false;
          $("#welcome_page").find("button").each(function(index, el) {
            if ($(el).is(":focus") && next == false) {
              $(el).blur();
              $("#welcome_page").find("button").each(function(ind, ele) {
                if (ind == index + 1) {
                  $(ele).focus();
                  next = true;
                  return;
                }
              });
              if (next) return;
            }
          });
          if (next) return;
          $("#welcome_page").find("button").each(function(index, el) {
            if (index == 0) {
              $(el).focus();
              return;
            }
          });
        }
        if (keyCode == 38) {
          var pre = false;
          $("#welcome_page").find("button").each(function(index, el) {
            if ($(el).is(":focus") && pre == false) {
              $(el).blur();
              $("#welcome_page").find("button").each(function(ind, ele) {
                if (ind == index - 1) {
                  $(ele).focus();
                  pre = true;
                  return;
                }
              });
              if (pre) return;
            }
          });
          if (pre) return;
          var len = $("#welcome_page").find("button").length;
          $("#welcome_page").find("button")[len - 1].focus();
        }
        return;
      }
    }
  }
} catch (e) {
  log(e);
}

function cssOutput() {
  try {
    var cssjson = {};
    $("button").each(function(index, el) {
      if ($(el).attr("id") != undefined) {
        var eid = $(el).attr("id");
        cssjson[eid] = {
          "html": "button",
          "zh-text": $(el).text() == undefined ? "" : $(el).text().replace(/(^\s*)|(\s*$)/g, ""),
          "en-text": ""
        };
      }
    });
    $("p").each(function(index, el) {
      if ($(el).attr("id") != undefined) {
        var eid = $(el).attr("id");
        cssjson[eid] = {
          "html": "p",
          "zh-text": $(el).text() == undefined ? "" : $(el).text().replace(/(^\s*)|(\s*$)/g, ""),
          "en-text": ""
        };
      }
    });
    $("span").each(function(index, el) {
      if ($(el).attr("id") != undefined) {
        var eid = $(el).attr("id");
        cssjson[eid] = {
          "html": "span",
          "zh-text": $(el).text() == undefined ? "" : $(el).text().replace(/(^\s*)|(\s*$)/g, ""),
          "en-text": ""
        };
      }
    });
    $("h1").each(function(index, el) {
      if ($(el).attr("id") != undefined) {
        var eid = $(el).attr("id");
        cssjson[eid] = {
          "html": "h1",
          "zh-text": $(el).text() == undefined ? "" : $(el).text().replace(/(^\s*)|(\s*$)/g, ""),
          "en-text": ""
        };
      }
    });
    $("#console_div").show();
    $("#console_div").append(JSON.stringify(cssjson));
    if (openAppUtil.isApp()) {
      log("In App.Prepare to write.")
      //openAppUtil.writeStyleJson(JSON.stringify(cssjson));
    }
  } catch (e) {
    log(e);
  }
}
$(document).ready(function() {
  InFlightMovie.init();
  // setTimeout("cssOutput()", 1000);
  //2s 不动隐藏鼠标
  $(function() {
    var timer;
    var hidding = false;
    var coords = [];
    $(document).mousemove(function(event) {
      coords = showCoords(event, this);
      if (hidding) {
        hidding = false;
        $(".controls").fadeIn(300);
        $(".list_right").fadeIn(300);
        $(".title_top").fadeIn(300);
      } else {
        if (timer)
          clearTimeout(timer);
        timer = setTimeout(function() {
          if (coords.length > 0) {
            var oldcoords = coords;
            coords = showCoords(event, this);
            // console.log("check cursor");
            if (Math.abs(oldcoords[0] - coords[0]) < 15 && Math.abs(oldcoords[1] - coords[1] < 15)) {
              hidding = true;
              if ($("#play_page").css("display") != "none") {
                $(".controls").fadeOut(300);
                $(".list_right").fadeOut(300);
                $(".title_top").fadeOut(300);
              }
              clearTimeout(timer);
            }
          } else {
            coords = showCoords(event, this);
          }
        }, 2000);
      }
    });
  });
});

function ktui() {
  vids.currentTime -= 10;
}

function kjin() {
  vids.currentTime += 10;
}

function msg_click() {}

function numFormat(time) {
  /*时间转换*/
  time = parseInt(time);
  var h = addZero(Math.floor(time / 3600));
  var m = addZero(Math.floor((time % 3600) / 60));
  var s = addZero(Math.floor(time % 60));
  return h + ":" + m + ":" + s;
}

function addZero(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return '' + num;
  }
}

function showCoords(e, obj) {
  var e = window.event || e;
  var arCoords = [parseInt(e.clientX, 10), parseInt(e.clientY, 10)];
  return arCoords;
}


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
    console.log(info)
  }
}