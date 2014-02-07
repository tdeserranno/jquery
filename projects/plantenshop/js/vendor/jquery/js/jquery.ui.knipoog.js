//^^^^JQUERY.UI.KNIPOOG.JS - CUSTOM WIDGET^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
(function($) {
  $.widget('ui.knipoog', {
    options: {
      location: 'top',
      color: 'black',
      bgColor: 'silver',
      speed: 'slow',
      padding: 4
    },
    _active: false,
    _destroyCalled: false,
    /**widget initialize
     * this.element bevat figure element in vorm van jQ set
     * @returns {undefined}
     */
    _create: function() {
      this.element.img = $('img', this.element);
      this.element.cap = $('figcaption', this.element);
      
      var o = this.options;
//      console.log(this.element[0].nodeName);
      //STATIC PROPERTIES
      this.element.css({
        position: 'relative',
        height: '100px'
      });
      this.element
              .cap
              .hide()
              .css({
                position: 'absolute',
                left: 0,
                width: this.element.img.width() - (o.padding * 2),
                height: '80px',
                opacity: '0.7',
                padding: o.padding
              });
      //DYNAMIC PROPERTIES
      this._CSStoepassen();
      //EVENTHANDLER
      this._setMouseHandler();
    },
    /**widget customizable properties
     * 
     * @returns {undefined}
     */
    _CSStoepassen: function() {
      this.element.cap.css({
        color: this.options.color,
        backgroundColor: this.options.bgColor
      });
      //location speciaal
      switch(this.options.location) {
        case 'top':
          this.element.cap.css({top: 0});
          break;
        case 'bottom':
          this.element.cap.css({bottom: 0});
          break;
        default:
          this.element.cap.css({top: 0});
          break;
      }
    },
    /**MouseOver event handler
     * 
     */
    _setMouseHandler: function() {
      var self = this;
      var o = self.options;
      self.element.hover(
              function() {
                self._active = true;
                self.element.cap.show('slide', {direction: 'left'},o.speed, function() {
                  
                });
              },
              function() {
                self.element.cap.hide('slide', {direction: 'left'},o.speed, function() {
                  self._active = false;
                  if (self._destroyCalled === true) {
                    self._vernietig();
                  }
                });
              });
    },
    _removeMouseHandler: function() {
      this.element.unbind('mouseenter mouseleave');
    },
    enable: function() {
      $.Widget.prototype.enable.apply(this, arguments);
      this._setMouseHandler();
    },
    disable: function() {
      $.Widget.prototype.disable.apply(this, arguments);
      this._removeMouseHandler();
    },
    _setOption: function(key, value) {
      $.Widget.prototype._setOption.apply(this, arguments);
      this._CSStoepassen();
    },
    destroy: function() {
      this._destroyCalled = true;
      if (this._active === false) {
        this._vernietig();
        this._destroyCalled = false;
      }
    },
    _vernietig: function() {
      $.Widget.prototype.destroy.call(this, arguments);
      this._removeMouseHandler();
      this.element.css({height: '180px'});
      this.element
              .cap
              .css({
                position: 'static',
                width: 'auto',
                height: 'auto',
                color: 'inherit',
                backgroundColor: 'inherit',
                opacity: '1',
                padding: 0
              })
              .show();
    }
  });//END WIDGET
})(jQuery);