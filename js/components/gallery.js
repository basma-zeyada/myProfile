var items = [];
var imagesJson, currentImageKey;

function HideImageViewer(){
  $(".image-viewer").hide()
}

$(function(){
  $(".image-viewer .close").on("click", function(e){
    e.preventDefault();
    HideImageViewer()
  })

  $(document).on("keyup",function(e) {
    if (e.key === "Escape") {
      HideImageViewer()
    }
  })

  $(".image-viewer .prev, .image-viewer .next").on("click", function(e){
    e.preventDefault()
    ChangeImage($(e.target),currentImageKey)
  })
})

$.getJSON("/js/data/images.json", function(json) {
  imagesJson = json
  $.each( json, function( key, val ) {
    DrawGalleryPreview(key,val)
  });
});

function DrawGalleryPreview(key,image){
  var listItem = "<li class='col-4 p-1'>\
                    <a class='d-block h-100' onclick='ViewImage("+key+","+image.id+")'>\
                      <img src='"+image.src+"' class='img-fill' alt='"+image.name+"'>\
                    </a>\
                  </li>"
  items.push(listItem);

  $(".gallery-preview").append(listItem)
}

function GetImageData(json, id) {
  return json.filter(function(json) {
    return (json['id'] == id);
  })[0];
}


function ViewImage(key,id){
  var image = GetImageData(imagesJson,id);
  $(".image-viewer").show()
  $("#image-src").attr("src",image.src)
  $(".image-viewer .post-body").html("<p>"+image.description+"<p>")
  $(".image-viewer .post-date").text(image.date_posted)
  currentImageKey = key
}

function ChangeImage(trigger,key){
  var image;
  var keys = Object.keys(imagesJson);
  // Get the index of the key Josh
  var index = (keys.indexOf(key.toString()));

  if (trigger.hasClass("next") && index < keys.length-1){
    var nextImageKey = keys[index+1];
    image = imagesJson[nextImageKey];
    index++
    ViewImage(index,image.id)
  }if (trigger.hasClass("prev") && index > 0){
    var prevImageKey = keys[index-1];
    image = imagesJson[prevImageKey];
    index--
    ViewImage(index,image.id)
  }
}
