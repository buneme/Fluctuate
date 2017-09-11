/*  TODO: For ikea add itemprop,
    TODO: Ebay - if no attributes found, use outer tags
*/
var tags = document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,span,a,div,td,strong,li');
var excluded = [];
for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    var isBasic = false;

    if(tag.innerText != "" && tag.children.length == 0){
        isBasic = true;
    }else if(tag.innerText != "" && tag.children.length == 1){
        if(tag.children[0].children.length == 0){
        excluded[i] = tag;
          isBasic = true;
      }
    }


    if(isBasic == true){
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
                        //alert("onClick " + tag.tagName);
                            //if(tag.children.length == 0 && excluded.includes(tag.parentElement)){
                        if(tag.parentElement.innerText != tag.innerText && tag.parentElement.children.length == 1){
                        //alert("Not allow " + tag.tagName);

                            click(newParentTag);

                            //tag.parentElement.onclick.apply(tag.parentElement);
                            return;
                        }else{
                        //alert("allow " + tag.tagName);
                        }

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

function click(element){
//  alert("Now doing OnClick for " + tag.tagName);

  var parentElement = element.parentElement;
  var dataArray = [];
  // Get index
  var nodes = Array.prototype.slice.call(parentElement.children );
  var pos = nodes.indexOf( element );
  path[counter] = pos.toString();

  dataArray.push({
    "class" : element.className,
    "id"  : element.id,
    "text"  : element.innerText,
    "tag" : element.tagName,
    "count" : "0",
    "parentId" : parentElement.id,
    "parentClass" : parentElement.className,
    "location" : element.slot
  });
  alert(JSON.stringify(dataArray));
  this.classList.add('buneme_fluctuate');
}
