function Markerlabel(opt_options) {
     // Initialization
     this.setValues(opt_options);
 
     // Here go the label styles
     var span = this.span_ = document.createElement('span');
     span.style.cssText = 'position: relative; left: -50%; top: -25px; ' +
                          'white-space: nowrap;color:black;' +
                          'padding: 2px;font-family: Arial; font-weight: lighter;' +
                          'font-size: 10px;';
 
     var div = this.div_ = document.createElement('div');
     div.appendChild(span);
     div.style.cssText = 'position: absolute; display: none';
};
 
Markerlabel.prototype = new google.maps.OverlayView();

Markerlabel.prototype.onAdd = function() {
     var pane = this.getPanes().overlayImage;
     pane.appendChild(this.div_);
 
     // Ensures the label is redrawn if the text or position is changed.
     var me = this;
     this.listeners_ = [
          google.maps.event.addListener(this, 'position_changed',
               function() { me.draw(); }),
          google.maps.event.addListener(this, 'text_changed',
               function() { me.draw(); }),
          google.maps.event.addListener(this, 'zindex_changed',
               function() { me.draw(); })
     ];
};
 
// Implement onRemove
Markerlabel.prototype.onRemove = function() {
     this.div_.parentNode.removeChild(this.div_);
 
     // Label is removed from the map, stop updating its position/text.
     for (var i = 0, I = this.listeners_.length; i < I; ++i) {
          google.maps.event.removeListener(this.listeners_[i]);
     }
};
 
// Implement draw
Markerlabel.prototype.draw = function() {
     var projection = this.getProjection();
     var position = projection.fromLatLngToDivPixel(this.get('position'));
     var div = this.div_;
     div.style.left = position.x + 'px';
     div.style.top = position.y + 'px';
     div.style.display = 'block';
     div.style.zIndex = this.get('zIndex'); //ALLOW LABEL TO OVERLAY MARKER
     this.span_.innerHTML = this.get('text').toString();
};