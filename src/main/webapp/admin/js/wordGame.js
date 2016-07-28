    Ext.QuickTips.init();
    
   	Ext.onReady(function(){
	var qrUrl = path + "/wordGame!";
	var order;
    store = new Ext.data.Store({
		url : qrUrl+"getWordGameList.action",
		reader : new Ext.data.JsonReader({
			fields : [
				{name:  'name'},
				{name : 'id'}
			]
		}),
		remoteSort : true
	});
	store.load({params:{start:0,limit:20}});
    
	columnBreakList=new Ext.grid.ColumnModel(
        [
        	new Ext.grid.RowNumberer(),
        	{header:"游戏列表",align:'center',dataIndex:"name",sortable:true}, 
            {header:"操作",align:'center',dataIndex:"id",
            renderer: function (value, meta, record) {

            			var formatStr = "<input id = 'bt_edit_" + record.get('id')
							+ "' onclick=\"editWordGame('" + record.get('id')
							+ "','" + record.get('name') +"');\" type='button' value='编辑' width ='15px'/>&nbsp;&nbsp;"; 

            			var deleteBtn = "<input id = 'bt_delete_" + record.get('id')
							+ "' onclick=\"deleteWordGame('" + record.get('id')
							+ "');\" type='button' value='删除' width ='15px'/>&nbsp;&nbsp;";
									            			
        				var resultStr = String.format(formatStr);
        				return "<div>" + resultStr+deleteBtn + "</div>";
    				  }
            }
        ] 
    ); 
    
    breakListGridPanel = new Ext.grid.EditorGridPanel({
		region:'center',
		viewConfig: {
            forceFit: true // 让grid的列自动填满grid的整个宽度，不用一列一列的设定宽度。
        },
        cm:columnBreakList, 
        store:store
    });
    
    addButton = new Ext.Button({
    	region:'south',
    	text : "新增文字游戏",
    	height:40,
    	iconCls : "addButton",　　
    	id:"addButton", 
    	handler : function() {
    		addWordGame();
    	}
    });
    
    listPanel = new Ext.Panel({
  		region:'west',
  		title:'文字闯关列表',  
		layout:'border',
		border:false,
		width:320,
		items:[breakListGridPanel,
		       addButton]
	});
    
  	wordGamePanelWestPanel = new Ext.Panel({
        border:false,
  		style: 'margin:20px'
	});
  	
  	wordGamePanelWest = new Ext.Panel({
  		region:'west',
        border:false,
        width :'30%',
        heigth:'100%',
		items:[wordGamePanelWestPanel]
	});
  	
  	formPanelEast =  new Ext.form.FormPanel({
     	 border:false,
         items: [
                 {xtype:"tbtext", width:360,text: "层级内容编辑",style:"font-size:medium;font-weight:bold;text-align: center;"},
                 {xtype:"displayfield", width:180,id: "serialNo", fieldLabel: "题目编号"},
                 {xtype:"field", width:180,id: "title", fieldLabel: "题目名称", inputType: "input"},
                 {xtype:"textarea", width:180,id: "content", fieldLabel: "文字内容", inputType: "text"},
	             {xtype:"combo", 
	              width:180,
	              id: "option0", 
	              fieldLabel: "选项0",  
	              store:new Ext.data.SimpleStore({
	                 fields:['value','text'],
	                 data:[
	                 ['1','无效'],
	                 ['2','进入下一题'],
	                 ['3','进入指定题'],
	                ]
	              }),
	              emptyText:'请选择',
	              displayField:'text',
	              valueField:'value',
	              mode:'local',
	              forceSelection: true,
	              typeAhead: true,
	  			  triggerAction: 'all',
	  			  selectOnFocus:true,//用户不能自己输入,只能选择列表中有的记录
	  			  allowBlank:true,
	  			  editable:false,
	              listeners:{
	                    select: function(combo ,record,value) {
	                       //所触发事件的执行内容
	                       console.log("2");
	                    }
	              }
	             },
	              {xtype:"combo", 
	            	  width:180,
	            	  id: "option1", 
	            	  fieldLabel: "选项1",  
	            	  store:new Ext.data.SimpleStore({
	            		  fields:['value','text'],
	            		  data:[
	       	                 ['1','无效'],
	       	                 ['2','进入下一题'],
	       	                 ['3','进入指定题'],
	       	                ]
	            	  }),
	            	  emptyText:'请选择',
		              displayField:'text',
		              valueField:'value',
		              mode:'local',
		              forceSelection: true,
		              typeAhead: true,
		  			  triggerAction: 'all',
		  			  selectOnFocus:true,//用户不能自己输入,只能选择列表中有的记录
		  			  allowBlank:true,
		  			  editable:false,
		              listeners:{
		                    select: function(combo ,record,value) {
		                       //所触发事件的执行内容
		                       console.log("2");
		                    }
		              }
	             },
            	  {xtype:"combo", 
            		  width:180,
            		  id: "option2", 
            		  fieldLabel: "选项2",  
            		  store:new Ext.data.SimpleStore({
            			  fields:['value','text'],
            			  data:[
           	                 ['1','无效'],
           	                 ['2','进入下一题'],
           	                 ['3','进入指定题'],
           	                ]
            		  }),
            		  emptyText:'请选择',
    	              displayField:'text',
    	              valueField:'value',
    	              mode:'local',
    	              forceSelection: true,
    	              typeAhead: true,
    	  			  triggerAction: 'all',
    	  			  selectOnFocus:true,//用户不能自己输入,只能选择列表中有的记录
    	  			  allowBlank:true,
    	  			  editable:false,
    	              listeners:{
    	                    select: function(combo ,record,value) {
    	                       //所触发事件的执行内容
    	                       console.log("2");
    	                    }
    	              }
	             },
        		  {xtype:"combo", 
        			  width:180,
        			  id: "option3", 
        			  fieldLabel: "选项3",  
        			  store:new Ext.data.SimpleStore({
        				  fields:['value','text'],
        				  data:[
        		                 ['1','无效'],
        		                 ['2','进入下一题'],
        		                 ['3','进入指定题'],
        		                ]
        			  }),
        			  emptyText:'请选择',
    	              displayField:'text',
    	              valueField:'value',
    	              mode:'local',
    	              forceSelection: true,
    	              typeAhead: true,
    	  			  triggerAction: 'all',
    	  			  selectOnFocus:true,//用户不能自己输入,只能选择列表中有的记录
    	  			  allowBlank:true,
    	  			  editable:false,
    	              listeners:{
    	                    select: function(combo ,record,value) {
    	                       //所触发事件的执行内容
    	                       console.log("2");
    	                    }
    	              }
	             },
    			  {xtype:"combo", 
    				  width:180,
    				  id: "option4", 
    				  fieldLabel: "选项4",  
    				  store:new Ext.data.SimpleStore({
    					  fields:['value','text'],
    					  data:[
    			                 ['1','无效'],
    			                 ['2','进入下一题'],
    			                 ['3','进入指定题'],
    			                ]
    				  }),
    				  emptyText:'请选择',
    	              displayField:'text',
    	              valueField:'value',
    	              mode:'local',
    	              forceSelection: true,
    	              typeAhead: true,
    	  			  triggerAction: 'all',
    	  			  selectOnFocus:true,//用户不能自己输入,只能选择列表中有的记录
    	  			  allowBlank:true,
    	  			  editable:false,
    	              listeners:{
    	                    select: function(combo ,record,value) {
    	                       //所触发事件的执行内容
    	                       console.log("2");
    	                    }
    	              }
	             },
			  {xtype:"textarea", width:180,id: "endMessage", fieldLabel: "结束提示语", inputType: "text"}
			  
         ],
         style: 'padding:20px',
         buttons:[{xtype:"button",id: "3dd22",text : '保存',listeners:{
			  click:function(){
				  Ext.Ajax.request({
					  url : path + "/wordGame!editWordGameContent.action",
					  method : 'post',
					  params : {
						  serialNo : Ext.getCmp('serialNo').getValue(),
						  title : Ext.getCmp('title').getValue(),
						  content : Ext.getCmp('content').getValue(),
						  option0 : Ext.getCmp('option0').getValue(),
						  option1 : Ext.getCmp('option1').getValue(),
						  option2 : Ext.getCmp('option2').getValue(),
						  option3 : Ext.getCmp('option3').getValue(),
						  option4 : Ext.getCmp('option4').getValue(),
						  endMessage : Ext.getCmp('endMessage').getValue(),
						  wordGameId : localWordGameId
					  },
					  success : function(response, options) {
						   Ext.Msg.alert('提示', '保存成功'); 
					  },
					  failure : function() {
						   Ext.Msg.alert('提示', '保存失败'); 
					  }
		 		});
			  }
		  	}
		  },
		  {xtype:"button",id: "3dd2112",text : '取消',listeners:{
			  click:function(){
				  wordGamePanelEast.hide();
			  }
		  	}
		  }],
		  buttonAlign : 'center'
      });
  	
  	wordGamePanelEast = new Ext.Panel({
  		region:'center',
        items: [formPanelEast]
	});
  	wordGamePanelEast.hide();
  	
  	wordGamePanel = new Ext.Panel({
  		region:'center',
  		title:'文字闯关编辑器',  
		layout:'border',
		border:false,
		items:[wordGamePanelWest,
		       wordGamePanelEast]
	});
  	
  	// 默认不显示
    wordGamePanel.hide();
  	
   viewport=new Ext.Viewport({
       enableTabScroll:true,
       layout:'border',
       defaultType: 'Viewport',
       items:[
           listPanel,
           wordGamePanel
   	   ]
   });
   });
   
   function reloadData(){
		store.reload({
			params: {start:0,limit:20},
			callback: function(records, options, success){
// console.log(records);
			},
			scope: store
		});
	}
	
    function addWordGame(){
    	var _fileForm =  new Ext.form.FormPanel({
            frame: true,
            autoHeight: true,
            labelWidth: 80,
            labelAlign: "right",
            bodyStyle:"text-align:left",
            border : false,
            items: [
               {xtype:"textfield", width:180,id: "gameName", fieldLabel: "游戏名称"},
            ],
         });
    	
    	var _importPanel = new Ext.Panel({
    		layout : "fit",
    		layoutConfig : {
    			animate : true
    		},
    		items : [_fileForm],
    		buttons : [{
    			id : "btn_import_wordclass",
    			text : "保存",
    			handler : function() {
    				var name = Ext.getCmp('gameName').getValue();
    				if(typeof(name) == "undefined" || name  == ""){
    					Ext.Msg.alert('提示', '请填写游戏名称');
    					return;
    				}
    				Ext.Ajax.request({
    					  url : path + "/wordGame!addWordGame.action",
    					  method : 'post',
    					  params : {
    						  name:name,
    					  },
    					  success : function(response, options) {
    					   var o = Ext.util.JSON.decode(response.responseText);
    					   if(o.i_type && "success"== o.i_type){
    						   Ext.Msg.alert("success",'保存成功！',function(){  
   								newWin.close();
   								reloadData();
    						   });
    					   }else{
    					   	   Ext.Msg.alert('提示', o.i_msg); 
    					   }
    					  },
    					  failure : function() {
    						  Ext.Msg.alert('提示', '操作失败'); 
    					  }
    		 		});
    				
    			}
    		}]
    	});
    	
    	newWin = new Ext.Window({
    		width : 520,
    		height:110,
    		title : '新增文字游戏',
    		defaults : {// 表示该窗口中所有子元素的特性
    			border : false
    		},
    		plain : true,// 方角 默认
    		modal : true,
    		shim : true,
    		collapsible : true,// 折叠
    		closable : true, // 关闭
    		closeAction: 'close',
    		resizable : false,// 改变大小
    		draggable : true,// 拖动
    		minimizable : false,// 最小化
    		maximizable : false,// 最大化
    		animCollapse : true,
    		constrainHeader : true,
    		autoHeight : false,
    		items : [_importPanel]
    	});
		newWin.show();
    }
    
	function deleteWordGame(id){
		Ext.Msg.confirm('删除游戏', '确定删除该游戏吗?',function (button,text){if(button == 'yes'){
			Ext.Ajax.request({
				  url : path + "/wordGame!deleteWordGame.action",
				  method : 'post',
				  params : {
					  id:id
				  },
				  success : function(response, options) {
				   var o = Ext.util.JSON.decode(response.responseText);
				   if(o.i_type && "success"== o.i_type){
					   reloadData();
				   }else{
				   	   Ext.Msg.alert('提示', o.i_msg); 
				   }
				  },
				  failure : function() {
					  Ext.Msg.alert('提示', '删除失败'); 
				  }
	 		});
		}});
		
	}
	
	//保存被选中的游戏id
	var localWordGameId;
	function editWordGame(id,name){
		localWordGameId = id;
		
		wordGamePanelWestPanel.removeAll(true);
		wordGamePanelWestPanel.doLayout();
		if(wordGameTreePanel){
			wordGameTreePanel.destroy();
		}
		
		if(wordGamePanel.hidden){
			wordGamePanel.show();
		}
		
		formPanel =  new Ext.form.FormPanel({
	    	border:false,
	        items: [
	           {xtype:"field", width:180,id: "oldpwd", fieldLabel: "名称", inputType: "input",value:name},
	           {xtype:"displayfield", width:180,id: "oldpwdes2t", fieldLabel: "ID(KEY)",value:id},
	           {xtype:"tbtext",id: "oldpwdesdt", text : "预览",style:"font-size:medium;font-weight:bold;text-align: center;"}
	        ]
	     });
		
		northPanel = new Ext.Panel({
	  		region:'north',
	  		width:'100%',
	        border:false,
			items:[formPanel]
		});
		
	 	wordGameTreePanel = new Ext.tree.TreePanel({
	  		 region:'center',
	  		 animate : true,
	         border:false,
	         loader: new Ext.tree.TreeLoader({
				        url: path+'/wordGame!getWordGameTree.action',
				        requestMethod: 'GET',
				        baseParams : {
							  id:id
						  }
    		 }),
			 root: new Ext.tree.AsyncTreeNode({
			    id: 'id',
			    text: name,
			    expanded: true
			 }),
			 buttons: [{text: '保存' ,width:70,height:20,handler:function (){
				
			       }},{text: '清空全部' ,width:70,height:20,handler:function (){
			                gridForm.getForm().submit({
				        	  url : 'bookinput.do?actionsign=input', 
				        	  method : 'post'
				        });
				   }}],
		     listeners: {
		        click: function(node,e){
		        	//显示右部编辑部分
		        	wordGamePanelEast.show();
		        	//发请求查询题目详情
		        	Ext.Ajax.request({
  					  url : path + "/wordGame!queryWordGameContent.action",
  					  method : 'post',
  					  params : {
  						  gameId : localWordGameId,
  						  questionId : node.id
  					  },
  					  success : function(response, options) {
  						  var o = Ext.util.JSON.decode(response.responseText);
  						  Ext.getCmp("serialNo").setValue(o.serialNo);
			        	  Ext.getCmp("title").setValue(o.title);
			        	  Ext.getCmp("content").setValue(o.content);
			        	  Ext.getCmp("option0").setValue(o.option0);
			        	  Ext.getCmp("option1").setValue(o.option1);
			        	  Ext.getCmp("option2").setValue(o.option2);
			        	  Ext.getCmp("option3").setValue(o.option3);
			        	  Ext.getCmp("option4").setValue(o.option4);
			        	  Ext.getCmp("content").setValue(o.content);
			        	  Ext.getCmp("endMessage").setValue(o.endMessage);
  					  },
  					  failure : function() {
  						  Ext.Msg.alert('提示', '查询失败'); 
  					  }
  		 		});
		        }
		     },
			 buttonAlign : 'center'
		});
	 	
		wordGamePanelWestPanel.add(northPanel);
	 	wordGamePanelWestPanel.add(wordGameTreePanel);
	 	wordGamePanelWestPanel.doLayout();
	}
