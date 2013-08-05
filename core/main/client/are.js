//
// Copyright (c) 2006-2013 Wade Alcorn - wade@bindshell.net
// Browser Exploitation Framework (BeEF) - http://beefproject.com
// See the file 'doc/COPYING' for copying permission
//

beef.are = {
  ruleEngine: null,
  are_session:{
     // Commands we can try to execute
     'command_queue': new Array(),
     // If modules fail what should we do? retry?
     'failed_modules':new Array(),
     // What we know about the browser
     'current_state': {},
     'current_module': null,
     // This might be useful for modules that have the same dependencies
     'retry': false
  },
  rules:[
    {
      "name" : "can_continue",
      "condition" : function(current_module, command_queue, failed_modules){
          console.log(command_queue);
          return !current_module && (command_queue.length > 0 || (failed_modules.length > 0 && retry)) ;
      },
      "consequence" : function(command_queue, current_module, retry){
          this.current_module = this.command_queue.pop();
      }
    },
    {
      "name" : "no_deps",
      "condition" : function(current_module){
          //peek at the module to see if it can just run
          return current_module && (current_module.deps === null || current_module.deps === undefined );
       },
      "consequence" : function(current_module){
        console.log("module executing");
        try{
          this.current_module.execute();
        } catch(ex){
           console.log("Module misbehaviour" + ex.toString());
        }
          this.current_module = null;
      }
    },
    {
      "name" : "has_dependency",
      "condition" : function(current_module,current_state){
          return false;
      },
       "consequence" : function(current_module){
          this.current_module.execute();
          this.current_module = null;
      }
    }
  ],

  init: function(){
   var Jools = require('jools');
   this.ruleEngine = new Jools(this.rules);
   setInterval(beef.are.execute, 10 * 1000);
  },

  push: function(module){
    this.are_session.command_queue.push(module);
  },

  execute: function(callback){
    beef.are.ruleEngine.execute(beef.are.are_session);
  },

  update: function(cmd_result){
    //Have we been init'd
    //debugger;
    if(this.ruleEngine && this.are_session){
       var data = JSON.parse(cmd_result.data);
       for (var key in data){
        this.are_session.current_state[key] = data[key];
      }
    }
     console.log(this.are_session.current_state);
  }
};

beef.regCmp("beef.are");
