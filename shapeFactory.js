function ShapeFactory(){};

ShapeFactory.prototype.ShapeClass = Shape;

ShapeFactory.prototype.createShape = function ( options ) {

	this.ShapeClass = Shape;

	return new this.ShapeClass(options);
};
