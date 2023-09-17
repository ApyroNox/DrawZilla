function ip2decimal(ip) {
  ip = ip.split('.');
  var e,
    w = 16777216,
    x = 65536,
    y = 256,
    a = eval(ip[0]),
    b = eval(ip[1]),
    c = eval(ip[2]),
    d = eval(ip[3]);
  e = a * w + b * x + c * y + d;
  return e;
}

function decimal2ip(ip) {
  var w = 16777216,
    x = 65536,
    y = 256,
    e = eval(ip),
    a = e / w,
    z = e - (a - (e % w) / w) * w,
    b = z / x,
    q = z - (b - (z % x) / x) * x,
    c = q / y,
    d = q - (c - (q % y) / y) * y;
  return parseInt(a) + '.' + parseInt(b) + '.' + parseInt(c) + '.' + parseInt(d);
}

var dec = ip2decimal(prompt('Enter your IP address...', '116.202.17.245'));

prompt(decimal2ip(dec) + ' will become', 'http://' + dec);

//prompt(ip2decimal("116.202.17.245"), decimal2ip("1959399925"));
