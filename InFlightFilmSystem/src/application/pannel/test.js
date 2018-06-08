var testInit = {
  init: function() {
    this.initbtn();
  },
  initbtn: function() {
    $("#testdiv").hide();
    $("#hide_btn").click(function(event) {
      $("body").append("<div>test add</div>");
      $("#testdiv").hide(300);
    });
    $("#show_btn").click(function(event) {
      $("#testdiv").show(300);
    });
  }
}
$(document).ready(function() {
  testInit.init();
});