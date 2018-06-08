$(function(){
  $("#LoginButton").bind("click",(e) => {
    let username=$("#username").val()
    let pwd=$("#pwd").val();
    ClickLock($("#LoginButton"),"登录中...");
    login(username,pwd);
  });
  const ApiRoot='https://weapp.sweesper.com/';
  const Apilogin="admin/auth/login";
  var login=function(username,pwd){

    console.log(username,pwd)
    //ajax
    $.ajax({
      url: ApiRoot+Apilogin,
      type: 'POST',
      headers:{
        'x-nideshop-token':"",
        'Content-Type':'application/x-www-form-urlencoded',
        'charset':'utf-8'
      },
      data: {"username": username,"password":pwd},
    })
    .done(function(res) {
      console.log(res);
      if(res.errno==1001){
        ClickUnlock($("#LoginButton"),"登录失败","登录");
      }else
      if(res.errno==400 || res.errno==401){
        ClickUnlock($("#LoginButton"),"用户名或密码错误","登录");
      }else
      if(res.errno==0){
        //登录成功
        $.cookie("token",res.data.token);
        ClickUnlock($("#LoginButton"),"登录成功","登录");
        self.location="index.html";
      }else{
        ClickUnlock($("#LoginButton"),"登录失败","登录");
      }
    })
    .fail(function(err) {
      console.log("Login Error: ",err);
    });
    // if (self.fetch){
    //   var LoginInit = {
    //             method: 'post',
    //             headers: {
    //               'x-nideshop-token':"",
    //               'Content-Type':'application/x-www-form-urlencoded',
    //               'charset':'utf-8'
    //             },
    //             body:{"username":username,"password":pwd}
    //          };
    //   fetch(ApiRoot+Apilogin,LoginInit).then((res) => {
    //       console.log(res);
    //       if(res.status==200){
    //         ClickUnlock($("#LoginButton"),"登录成功","登录");
    //         //self.location="index.html";
    //       }else{
    //         ClickUnlock($("#LoginButton"),"登录失败","登录");
    //       }
    //   }).catch((error)=>{
    //     console.log("Login Error: ",error);
    //     ClickUnlock($("#LoginButton"),"服务器出现错误","登录");
    //   });
    // }
  }

  var ClickLock=function(el,text){
    $(el).text(text);
    $(el).attr("disabled",true);
  };
  var ClickUnlock=function(el,text,text2){
    $(el).text(text);
    $(el).removeAttr('disabled');
    setTimeout(function(){$(el).text(text2);},1000);
  };
});
