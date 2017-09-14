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
                      tag.slot = path.join("/");
                      path.reverse();
                      
                      
                      var parentClassPos = getClassPos(newParentTag, document);
                      var classPos = getClassPos(tag, document);
                     
                      tag.onclick = function(){
                          var dataArray = [];
                          dataArray.push({
                            "direct-parent-id" : tag.parentNode.id,
                            "direct-parent-class" : tag.parentNode.className,
                            "direct-text" : tag.innerText,
                            "clicked" : tag.tagName,
                            "classPos" : classPos,
                            "class" : this.className,
                            "id"  : this.id,
                            "text"  : this.innerText,
                            "tag" : this.tagName,
                            "count" : "0",
                            "parentTag" : newParentTag.tagName,
                            "parentId" : newParentTag.id,
                            "parentClassPos": parentClassPos,
                            "parentClass" : newParentTag.className,
                            "location" : this.slot
                          });
                          alert(JSON.stringify(dataArray));
                          this.classList.add('buneme_fluctuate');
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

function getClassPos(tag, document){
  var nodes = Array.prototype.slice.call(document.getElementsByClassName(tag.className));
  //alert(nodes.length);
  var pos = nodes.indexOf( tag );
  return pos;
}
