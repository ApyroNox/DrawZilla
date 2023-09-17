const DOM = {
  Element: function () {
    return document.createElement.apply(document, arguments);
  },
  TextNode: function () {
    return document.createTextNode.apply(document, arguments);
  },
  Tree: function (t, n, i) {
    let r = this.Element(t),
      e;
    if (validate.isArray(i)) e = i;
    else {
      e = [];
      for (let s = 2; s < arguments.length; s++) e.push(arguments[s]);
    }
    for (let o = 0; o < e.length; o++) {
      let u = e[o];
      'string' == typeof u ? r.appendChild(this.TextNode(u)) : u && r.append(u);
    }
    for (let a in n) 'className' == a ? (r[a] = n[a]) : r.setAttribute(a, n[a]);
    return (
      (r.appendAll = function (...t) {
        t.forEach((t) => {
          r.append(t);
        });
      }),
      r
    );
  },
};
const validate = {
  isArray: function (t) {
    return this.isA('Array', t);
  },
  isObject: function (t) {
    return !this.isUndefined(t) && null !== t && this.isA('Object', t);
  },
  isString: function (t) {
    return this.isA('String', t);
  },
  isNumber: function (t) {
    return this.isA('Number', t);
  },
  isFunction: function (t) {
    return this.isA('Function', t);
  },
  isAsyncFunction: function (t) {
    return this.isA('AsyncFunction', t);
  },
  isGeneratorFunction: function (t) {
    return this.isA('GeneratorFunction', t);
  },
  isTypedArray: function (t) {
    return (
      this.isA('Float32Array', t) ||
      this.isA('Float64Array', t) ||
      this.isA('Int16Array', t) ||
      this.isA('Int32Array', t) ||
      this.isA('Int8Array', t) ||
      this.isA('Uint16Array', t) ||
      this.isA('Uint32Array', t) ||
      this.isA('Uint8Array', t) ||
      this.isA('Uint8ClampedArray', t)
    );
  },
  isA: function (t, n) {
    return this.getType(n) === '[object ' + t + ']';
  },
  isError: function (t) {
    return !!t && (t instanceof Error || ('string' == typeof t.stack && 'string' == typeof t.message));
  },
  isUndefined: function (t) {
    return void 0 === t;
  },
  getType: function (t) {
    return Object.prototype.toString.apply(t);
  },
};

__$ = {
  unsafe: [
    '"',
    "'",
    '&',
    '<',
    '>',
    ' ',
    '¡',
    '¢',
    '£',
    '¤',
    '¥',
    '¦',
    '§',
    '¨',
    '©',
    'ª',
    '«',
    '¬',
    '­',
    '®',
    '¯',
    '°',
    '±',
    '²',
    '³',
    '´',
    'µ',
    '¶',
    '·',
    '¸',
    '¹',
    'º',
    '»',
    '¼',
    '½',
    '¾',
    '¿',
    '×',
    '÷',
    'À',
    'Á',
    'Â',
    'Ã',
    'Ä',
    'Å',
    'Æ',
    'Ç',
    'È',
    'É',
    'Ê',
    'Ë',
    'Ì',
    'Í',
    'Î',
    'Ï',
    'Ð',
    'Ñ',
    'Ò',
    'Ó',
    'Ô',
    'Õ',
    'Ö',
    'Ø',
    'Ù',
    'Ú',
    'Û',
    'Ü',
    'Ý',
    'Þ',
    'ß',
    'à',
    'á',
    'â',
    'ã',
    'ä',
    'å',
    'æ',
    'ç',
    'è',
    'é',
    'ê',
    'ë',
    'ì',
    'í',
    'î',
    'ï',
    'ð',
    'ñ',
    'ò',
    'ó',
    'ô',
    'õ',
    'ö',
    'ø',
    'ù',
    'ú',
    'û',
    'ü',
    'ý',
    'þ',
    'ÿ',
  ],
  safe: [
    '&quot;',
    '&apos;',
    '&amp;',
    '&lt;',
    '&gt;',
    '&nbsp;',
    '&iexcl;',
    '&cent;',
    '&pound;',
    '&curren;',
    '&yen;',
    '&brvbar;',
    '&sect;',
    '&uml;',
    '&copy;',
    '&ordf;',
    '&laquo;',
    '&not;',
    '&shy;',
    '&reg;',
    '&macr;',
    '&deg;',
    '&plusmn;',
    '&sup2;',
    '&sup3;',
    '&acute;',
    '&micro;',
    '&para;',
    '&middot;',
    '&cedil;',
    '&sup1;',
    '&ordm;',
    '&raquo;',
    '&frac14;',
    '&frac12;',
    '&frac34;',
    '&iquest;',
    '&times;',
    '&divide;',
    '&Agrave;',
    '&Aacute;',
    '&Acirc;',
    '&Atilde;',
    '&Auml;',
    '&Aring;',
    '&AElig;',
    '&Ccedil;',
    '&Egrave;',
    '&Eacute;',
    '&Ecirc;',
    '&Euml;',
    '&Igrave;',
    '&Iacute;',
    '&Icirc;',
    '&Iuml;',
    '&ETH;',
    '&Ntilde;',
    '&Ograve;',
    '&Oacute;',
    '&Ocirc;',
    '&Otilde;',
    '&Ouml;',
    '&Oslash;',
    '&Ugrave;',
    '&Uacute;',
    '&Ucirc;',
    '&Uuml;',
    '&Yacute;',
    '&THORN;',
    '&szlig;',
    '&agrave;',
    '&aacute;',
    '&acirc;',
    '&atilde;',
    '&auml;',
    '&aring;',
    '&aelig;',
    '&ccedil;',
    '&egrave;',
    '&eacute;',
    '&ecirc;',
    '&euml;',
    '&igrave;',
    '&iacute;',
    '&icirc;',
    '&iuml;',
    '&eth;',
    '&ntilde;',
    '&ograve;',
    '&oacute;',
    '&ocirc;',
    '&otilde;',
    '&ouml;',
    '&oslash;',
    '&ugrave;',
    '&uacute;',
    '&ucirc;',
    '&uuml;',
    '&yacute;',
    '&thorn;',
    '&yuml;',
  ],
};

function decodeHTMLComponent() {
  let input = arguments[0] || '';
  let matches = [...input.matchAll(RegExp(`${__$.safe.join('|')}`, 'g'))];
  matches.forEach((found) => {
    let index = __$.safe.indexOf(found[0]);
    let charFrom = __$.safe[index];
    let charTo = __$.unsafe[index];
    input = input.replace(charFrom, charTo);
  });
  return input;
}
function encodeHTMLComponent() {
  let input = arguments[0] || '';
  let matches = [...input.matchAll(RegExp(`${__$.unsafe.join('|')}`, 'g'))];
  matches.forEach((found) => {
    let index = __$.unsafe.indexOf(found[0]);
    let charFrom = __$.unsafe[index];
    let charTo = __$.safe[index];
    input = input.replace(charFrom, charTo);
  });
  return input;
}
function decodeHEXComponent() {
  let input = arguments[0];
  var j;
  var hexes = input.split('0x');
  var back = '';
  for (j = 1; j < hexes.length; j++) {
    var xhex = hexes[j];
    var hex = xhex.slice(1);
    back += String.fromCharCode(parseInt(hex, 16));
  }
  return back;
}
function encodeHEXComponent() {
  let input = arguments[0];
  var hex, i;

  var result = '';
  for (i = 0; i < input.length; i++) {
    hex = input.charCodeAt(i).toString(16);
    result += '0x' + ('000' + hex).slice(-4);
  }

  return result;
}
