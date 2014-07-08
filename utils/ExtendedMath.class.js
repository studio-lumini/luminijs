function ExtendedMath()
{
	
}

ExtendedMath.sign = function(x)
{
	if (x < 0)
		return -1;
	else if (x > 0)
		return 1;
	else
		return 0;
};

ExtendedMath.round = function(x, n)
{
	if (x.toString().indexOf('.') == -1)
		return x;
	if (n == 0)
		return Math.round(x);
	
	var integerPart = x.toString().split('.')[0];
	var decimalPart = x.toString().split('.')[1];
	decimalPart = decimalPart.substring(0, n);
	
	if (decimalPart.length == 0)
		return parseInt(integerPart);
	else
		return parseFloat(integerPart + '.' + decimalPart);
};
