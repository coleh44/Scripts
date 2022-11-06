app.beginUndoGroup("Beat to Marker"); //for undoing

var threshold = 41; //if higher than threshold, add marker (CHANGE THIS BASED ON SONG)
var comp = app.project.activeItem; //sets composition
var audioLayer = comp.selectedLayers[0]; //sets layer

app.executeCommand(app.findMenuCommandId("Convert Audio to Keyframes")); //executes the convert audio to keyframe cmd
nullLayer = comp.layer(1); //sets nullLayer

var property = nullLayer.effect(3).property(1);
createMarkers(property, nullLayer, threshold, audioLayer); //runs the create markers cmd with Both Channels Slider property, nullLayer keyLayer, and threshold 

app.endUndoGroup(); 

function createMarkers(property, keyLayer, threshold, audioLayer) {
    var count = 0;
    for(var i = 1; i < property.numKeys; i++) {
        if(property.keyValue(i) >= threshold) {
            count  = count +1;
            createMarker(audioLayer.property("ADBE Marker"), property.keyTime(i-1), count);
        }
    }
}

function createMarker(markerProperty, markerTime, count) {
    var marker= new MarkerValue("");
    markerProperty.setValueAtTime(markerTime, marker);
}
    
    


        
        
        
   
    