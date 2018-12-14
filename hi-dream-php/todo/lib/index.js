function clear(){
	localStorage.clear();
	load();
}
function loadUser(){
    var jqxhr = $.get("user.php", function(json) {
        console.log(json);
        var html;
        if(json){
            html = "<a href='javascript:logout()'>"+json+"退出登陆</a>";
        }else{
            html = "<a href='javascript:nologin(\"nologin\")'>"+json+"登陆</a>"
        }
        $("#loginUser").html(html);
    })
}
function logout(){
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });
    var jqxhr = $.get("http://www.hi-dream.com/service/login.php?action=logout", function(json) {
        window.location.reload();
    })
}
function upload(){
    var collection=localStorage.getItem("todo");
    console.log("collection:"+collection);
    var jqxhr = $.post("todo.php",{todo:collection}, function(json) {
        nologin(json);
        console.log(json);
    })
}
function download(){
    var jqxhr = $.get("todo.php", function(json) {
        nologin(json);
        console.log(json);
        var data = $.parseJSON(json);
        saveData(data);
		    var form=document.getElementById("form");
		    form.reset();
		    load();
    })
}
function nologin(data){
    if(data == 'nologin'){
         window.location.href="http://www.hi-dream.com/page/login.html?redirect="+window.location.href;
    }
}
function postaction(){
	var title = document.getElementById("title");
	if(title.value == "") {
		alert("内容不能为空");
	}else{
		var data=loadData();
		var todo={"title":title.value,"done":false};
		data.push(todo);
		saveData(data);
		var form=document.getElementById("form");
		form.reset();
		load();
	}
}

function loadData(){
	var collection=localStorage.getItem("todo");
	if(collection!=null){
		return JSON.parse(collection);
	}
	else return [];
}

function saveSort(){
	var todolist=document.getElementById("todolist");
	var donelist=document.getElementById("donelist");
	var ts=todolist.getElementsByTagName("p");
	var ds=donelist.getElementsByTagName("p");
	var data=[];
	for(i=0;i<ts.length; i++){
		var todo={"title":ts[i].innerHTML,"done":false};
		data.unshift(todo);
	}
	for(i=0;i<ds.length; i++){
		var todo={"title":ds[i].innerHTML,"done":true};
		data.unshift(todo);
	}
	saveData(data);
}

function saveData(data){
	localStorage.setItem("todo",JSON.stringify(data));
}

function remove(i){
	var data=loadData();
	var todo=data.splice(i,1)[0];
	saveData(data);
	load();
}

function update(i,field,value){
	var data = loadData();
	var todo = data.splice(i,1)[0];
	todo[field] = value;
	data.splice(i,0,todo);
	saveData(data);
	load();
}

function edit(i)
{
	load();
	var p = document.getElementById("p-"+i);
	title = p.innerHTML;
	p.innerHTML="<input id='input-"+i+"' value='"+title+"' />";
	var input = document.getElementById("input-"+i);
	input.setSelectionRange(0,input.value.length);
	input.focus();
	input.onblur =function(){
		if(input.value.length == 0){
			p.innerHTML = title;
			alert("内容不能为空");
		}
		else{
			update(i,"title",input.value);
		}
	};
}

function load(){
	var todolist=document.getElementById("todolist");
	var donelist=document.getElementById("donelist");
	var collection=localStorage.getItem("todo");
	if(collection!=null){
		var data=JSON.parse(collection);
		var todoCount=0;
		var doneCount=0;
		var todoString="";
		var doneString="";
		for (var i = data.length - 1; i >= 0; i--) {
			if(data[i].done){
				doneString+="<li draggable='true'><input type='checkbox' onchange='update("+i+",\"done\",false)' checked='checked' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].title+"</p>"
				+"<a href='javascript:remove("+i+")'>-</a></li>";
				doneCount++;
			}
			else{
				todoString+="<li draggable='true'><input type='checkbox' onchange='update("+i+",\"done\",true)' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].title+"</p>"
				+"<a href='javascript:remove("+i+")'>-</a></li>";
				todoCount++;
			}
		};
		todocount.innerHTML=todoCount;
		todolist.innerHTML=todoString;
		donecount.innerHTML=doneCount;
		donelist.innerHTML=doneString;
	}
	else{
		todocount.innerHTML=0;
		todolist.innerHTML="";
		donecount.innerHTML=0;
		donelist.innerHTML="";
	}

	var lis=todolist.querySelectorAll('ol li');
	[].forEach.call(lis, function(li) {
		li.addEventListener('dragstart', handleDragStart, false);
		li.addEventListener('dragover', handleDragOver, false);
		li.addEventListener('drop', handleDrop, false);

		onmouseout =function(){
			saveSort();
		};
	});
}

window.onload=function(){
    loadUser();
    load();
};

window.addEventListener("storage",load,false);

var dragSrcEl = null;
function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}
function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); 
  }
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}
