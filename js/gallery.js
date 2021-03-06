// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	$("#photo").attr("src",mImages[mCurrentIndex].img);
	$("#location").attr("value",mImages[mCurrentIndex].location);
	$("#description").attr("value",mImages[mCurrentIndex].description);
	$("#date").attr("value",mImages[mCurrentIndex].date);

	if(mCurrentIndex < mImages.length) {
		mCurrentIndex++; 
	}
	else{ 
		mCurrentIndex = 0; 
	}; 
	console.log('swap photo');
}

//next photo 
$("#nextPhoto").on("click", () => { 
	swapPhoto(); 
	}); 

//previous photo 
$("#prevPhoto").on("click", () => { 
	mCurrentIndex = mCurrentIndex -2
	console.log(mCurrentIndex); 
	swapPhoto (); 
}); 
// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function () {
	if (mRequest.readyState ==4 && mRequest.status == 200){ 
		try { 
			var mJson= JSON.parse(mRequest.responseText); 
			for (var i=0; i <mJson.images.length; i++) { 
				mImages.push(new GalleryImage(mjson.images[i].location, mJson.images[i].description, mJson.images[i].date, mJson.images[i].img))
			} 
			}
		}
	};
	mRequest.open("GET", mUrl, true); 
	mRequest.send(); 

	// body...function_name
} 

// Array holding GalleryImage objects (see below).
var mImages = [ ];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';

//Click handler 
function handler(){ 
$('.moreIndicator').click(function() { 
	console.log(mCurrentIndex); 
	if ($(event.currentTarget).hasClass("rot90")){ 
		$(".details").slideToggle();
		$(event.currentTarget).addClass("rot270");
		$(event.currentTarget).removeClass("rot90");

	}
	else{
		$(event.currentTarget).addClass("rot90");
		$(event.currentTarget).removeClass("rot270");
		$(".details").slideToggle(); 
	}

} 
}
//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(location, description, date, img) {
	this.location =location; 
	this.description =description;
	this.date = date; 
	this.img = img; 
} 
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
}
