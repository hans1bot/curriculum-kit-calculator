import {
  require_react
} from "./chunk-32E4H3EV.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/use-debounce/dist/index.module.js
var import_react = __toESM(require_react());
function c(e2, u2, c2) {
  var i2 = this, a2 = (0, import_react.useRef)(null), o2 = (0, import_react.useRef)(0), f = (0, import_react.useRef)(null), l = (0, import_react.useRef)([]), v = (0, import_react.useRef)(), m = (0, import_react.useRef)(), d = (0, import_react.useRef)(e2), g = (0, import_react.useRef)(true);
  d.current = e2;
  var p = "undefined" != typeof window, w = !u2 && 0 !== u2 && p;
  if ("function" != typeof e2) throw new TypeError("Expected a function");
  u2 = +u2 || 0;
  var s = !!(c2 = c2 || {}).leading, x = !("trailing" in c2) || !!c2.trailing, h = "maxWait" in c2, y = "debounceOnServer" in c2 && !!c2.debounceOnServer, F = h ? Math.max(+c2.maxWait || 0, u2) : null;
  (0, import_react.useEffect)(function() {
    return g.current = true, function() {
      g.current = false;
    };
  }, []);
  var A = (0, import_react.useMemo)(function() {
    var r2 = function(r3) {
      var n3 = l.current, t3 = v.current;
      return l.current = v.current = null, o2.current = r3, m.current = d.current.apply(t3, n3);
    }, n2 = function(r3, n3) {
      w && cancelAnimationFrame(f.current), f.current = w ? requestAnimationFrame(r3) : setTimeout(r3, n3);
    }, t2 = function(r3) {
      if (!g.current) return false;
      var n3 = r3 - a2.current;
      return !a2.current || n3 >= u2 || n3 < 0 || h && r3 - o2.current >= F;
    }, e3 = function(n3) {
      return f.current = null, x && l.current ? r2(n3) : (l.current = v.current = null, m.current);
    }, c3 = function r3() {
      var c4 = Date.now();
      if (t2(c4)) return e3(c4);
      if (g.current) {
        var i3 = u2 - (c4 - a2.current), f2 = h ? Math.min(i3, F - (c4 - o2.current)) : i3;
        n2(r3, f2);
      }
    }, A2 = function() {
      if (p || y) {
        var e4 = Date.now(), d2 = t2(e4);
        if (l.current = [].slice.call(arguments), v.current = i2, a2.current = e4, d2) {
          if (!f.current && g.current) return o2.current = a2.current, n2(c3, u2), s ? r2(a2.current) : m.current;
          if (h) return n2(c3, u2), r2(a2.current);
        }
        return f.current || n2(c3, u2), m.current;
      }
    };
    return A2.cancel = function() {
      f.current && (w ? cancelAnimationFrame(f.current) : clearTimeout(f.current)), o2.current = 0, l.current = a2.current = v.current = f.current = null;
    }, A2.isPending = function() {
      return !!f.current;
    }, A2.flush = function() {
      return f.current ? e3(Date.now()) : m.current;
    }, A2;
  }, [s, h, u2, F, x, w, p, y]);
  return A;
}
function i(r2, n2) {
  return r2 === n2;
}
function a(n2, t2, a2) {
  var o2 = a2 && a2.equalityFn || i, f = (0, import_react.useRef)(n2), l = (0, import_react.useState)({})[1], v = c((0, import_react.useCallback)(function(r2) {
    f.current = r2, l({});
  }, [l]), t2, a2), m = (0, import_react.useRef)(n2);
  return o2(m.current, n2) || (v(n2), m.current = n2), [f.current, v];
}
function o(r2, n2, t2) {
  var e2 = void 0 === t2 ? {} : t2, u2 = e2.leading, i2 = e2.trailing;
  return c(r2, n2, { maxWait: n2, leading: void 0 === u2 || u2, trailing: void 0 === i2 || i2 });
}
export {
  a as useDebounce,
  c as useDebouncedCallback,
  o as useThrottledCallback
};
//# sourceMappingURL=use-debounce.js.map
