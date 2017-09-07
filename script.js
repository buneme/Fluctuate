/*  TODO: For ikea add itemprop,
    TODO: Ebay - if no attributes found, use outer tags

*/
var tags = document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,span,a,div,td,strong,li');
for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    if(tag.innerText != "" && tag.children.length == 0){
              // Get parent id/class
              var currentTag = tag;
              var path = [];
              var counter = 0;
              do{

              	newParentTag = currentTag.parentElement;
                // Get oldTag position in parent
                var nodes = Array.prototype.slice.call(newParentTag.children );
                var pos = nodes.indexOf( currentTag );
                path[counter] = pos.toString();


                if(newParentTag.className != "" || newParentTag.id != ""){
                    tag.slot = path.join("/");
                    path.reverse();
                    tag.onclick = function(){
                        var dataArray = [];
                        dataArray.push({
                          "class" : this.className,
                          "id"  : this.id,
                          "text"  : this.innerText,
                          "tag" : this.tagName,
                          "count" : "0",
                          "parentId" : newParentTag.id,
                          "parentClass" : newParentTag.className,
                          "location" : this.slot
                        });
                        alert(JSON.stringify(dataArray));
                        this.classList.add('buneme_fluctuate');
                    }
                    break;
                }
                currentTag = newParentTag;
                counter ++;
              }while(currentTag.parentElement != null);
      }
    }
