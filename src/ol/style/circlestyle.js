// FIXME decide default value for snapToPixel

goog.provide('ol.style.Circle');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('ol.color');
goog.require('ol.style.Fill');
goog.require('ol.style.Image');
goog.require('ol.style.ImageState');
goog.require('ol.style.Stroke');



/**
 * @constructor
 * @param {olx.style.CircleOptions=} opt_options Options.
 * @extends {ol.style.Image}
 */
ol.style.Circle = function(opt_options) {

  var options = goog.isDef(opt_options) ? opt_options : {};

  /**
   * @private
   * @type {HTMLCanvasElement}
   */
  this.canvas_ = /** @type {HTMLCanvasElement} */
      (goog.dom.createElement(goog.dom.TagName.CANVAS));

  /**
   * @private
   * @type {ol.style.Fill}
   */
  this.fill_ = goog.isDef(options.fill) ? options.fill : null;

  /**
   * @private
   * @type {number}
   */
  this.radius_ = options.radius;

  /**
   * @private
   * @type {ol.style.Stroke}
   */
  this.stroke_ = goog.isDef(options.stroke) ? options.stroke : null;

  var size = this.render_();

  goog.base(this, {
    anchor: [size / 2, size / 2],
    imageState: ol.style.ImageState.LOADED,
    rotation: 0,
    size: [size, size],
    snapToPixel: undefined,
    subtractViewRotation: false
  });

};
goog.inherits(ol.style.Circle, ol.style.Image);


/**
 * @inheritDoc
 */
ol.style.Circle.prototype.getImage = function(pixelRatio) {
  return this.canvas_;
};


/**
 * @inheritDoc
 */
ol.style.Circle.prototype.getHitDetectionImage = function(pixelRatio) {
  return this.canvas_;
};


/**
 * @inheritDoc
 */
ol.style.Circle.prototype.load = goog.nullFunction;


/**
 * @private
 * @return {number} Size.
 */
ol.style.Circle.prototype.render_ = function() {
  var canvas = this.canvas_;
  var size = 2 * this.radius_ + 1;

  if (!goog.isNull(this.stroke_) && goog.isDef(this.stroke_.width)) {
    size += this.stroke_.width;
  }

  canvas.height = size;
  canvas.width = size;

  var context = /** @type {CanvasRenderingContext2D} */
      (canvas.getContext('2d'));
  context.arc(size / 2, size / 2, this.radius_, 0, 2 * Math.PI, true);

  if (!goog.isNull(this.fill_)) {
    context.fillStyle = ol.color.asString(this.fill_.color);
    context.fill();
  }
  if (!goog.isNull(this.stroke_)) {
    context.strokeStyle = ol.color.asString(this.stroke_.color);
    context.lineWidth = goog.isDef(this.stroke_.width) ? this.stroke_.width : 1;
    context.stroke();
  }

  return size;
};
