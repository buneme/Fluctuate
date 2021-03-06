var tags = document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,span,a,div,td,strong,li');
for (var i = 0; i < tags.length; i++) {
  (function () {
      var tag = tags[i];
      if(tag.innerText != "" && tag.children.length <= 1){
                // Get parent id/class
                var currentTag = tag;
                var path = [];
                var counter = 0;
                do{
                  var newParentTag = currentTag.parentNode;
                  // Get oldTag position in parent
                  var nodes = Array.prototype.slice.call(newParentTag.children );
                  var pos = nodes.indexOf( currentTag );
                  path[counter] = pos.toString();


                  if(newParentTag.className != "" || newParentTag.id != ""){
                      tag.slot = path.join("-");
                      path.reverse();


                      var parentClassPos = getClassPos(newParentTag, document);
                      var classPos = getClassPos(tag, document);

                      tag.onclick = function(){
                          var dataArray = [];
                          dataArray.push({
                            "direct-parent-id" : tag.parentNode.id,
                            "direct-parent-class" : tag.parentNode.className,
                            "direct-text" : tag.innerText,
                            "clicked" : tag.tagName.toLowerCase(),
                            "classPos" : classPos,
                            "class" : this.className,
                            "id"  : this.id,
                            "text"  : this.innerText,
                            "tag" : this.tagName.toLowerCase(),
                            "count" : "0",
                            "parentTag" : newParentTag.tagName.toLowerCase(),
                            "parentId" : newParentTag.id,
                            "parentClassPos": parentClassPos,
                            "parentClass" : newParentTag.className,
                            "location" : this.slot
                          });
                          alert(JSON.stringify(dataArray));
                          /*if(!onSecondStep()){
                            this.classList.add('buneme_fluctuate');
                          }*/
                          event.stopPropagation()
                      }
                      break;
                  }
                  currentTag = newParentTag;
                  counter ++;
                }while(currentTag.parentNode != null);
        }
  }()); // immediate invocation
}

function onSecondStep(){
  var tags = document.querySelectorAll('.buneme_fluctuate');
  var length = tags.length;
  for (var i = 0; i < tags.length; i++) {
    tags[i].classList.remove('buneme_fluctuate');
  }

  if(length == 0){
    return false;
  }else{
    return true;
  }
}

function getClassPos(tag, document){
  if(typeof tag.className  === "undefined" || tag.className == "" || tag.className == "undefined"){
  	//console.log("1st: " + typeof tag.className  === "undefined" + " Second " +  tag.className == "" + " third " + tag.className == "undefined");
    return -1;
  }
  try {
    var className = "." + tag.className.split(" ").join(".");
    do{
    className = className.replace("..",".");
    }while(className.includes(".."));
    var elements = document.querySelectorAll(tag.tagName.toLowerCase() + className);
    var nodes = Array.prototype.slice.call(elements);
    var pos = nodes.indexOf( tag );
    return pos;
  }catch(err) {
    //console.log(err.message);
    return -1;
  }
}
