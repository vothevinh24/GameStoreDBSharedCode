! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Popper = e()
}(this, function() {
    "use strict";

    function t(t) {
        return t && "[object Function]" === {}.toString.call(t)
    }

    function e(t, e) {
        if (1 !== t.nodeType) return [];
        var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
        return e ? n[e] : n
    }

    function n(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host
    }

    function i(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
            case "HTML":
            case "BODY":
                return t.ownerDocument.body;
            case "#document":
                return t.body
        }
        var r = e(t),
            o = r.overflow,
            s = r.overflowX,
            a = r.overflowY;
        return /(auto|scroll|overlay)/.test(o + a + s) ? t : i(n(t))
    }

    function r(t) {
        return 11 === t ? V : 10 === t ? K : V || K
    }

    function o(t) {
        if (!t) return document.documentElement;
        for (var n = r(10) ? document.body : null, i = t.offsetParent || null; i === n && t.nextElementSibling;) i = (t = t.nextElementSibling).offsetParent;
        var s = i && i.nodeName;
        return s && "BODY" !== s && "HTML" !== s ? -1 !== ["TH", "TD", "TABLE"].indexOf(i.nodeName) && "static" === e(i, "position") ? o(i) : i : t ? t.ownerDocument.documentElement : document.documentElement
    }

    function s(t) {
        return null === t.parentNode ? t : s(t.parentNode)
    }

    function a(t, e) {
        if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
        var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? t : e,
            r = n ? e : t,
            l = document.createRange();
        l.setStart(i, 0), l.setEnd(r, 0);
        var c = l.commonAncestorContainer;
        if (t !== c && e !== c || i.contains(r)) return function(t) {
            var e = t.nodeName;
            return "BODY" !== e && ("HTML" === e || o(t.firstElementChild) === t)
        }(c) ? c : o(c);
        var u = s(t);
        return u.host ? a(u.host, e) : a(t, s(e).host)
    }

    function l(t) {
        var e = "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
            n = t.nodeName;
        if ("BODY" === n || "HTML" === n) {
            var i = t.ownerDocument.documentElement;
            return (t.ownerDocument.scrollingElement || i)[e]
        }
        return t[e]
    }

    function c(t, e) {
        var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            i = l(e, "top"),
            r = l(e, "left"),
            o = n ? -1 : 1;
        return t.top += i * o, t.bottom += i * o, t.left += r * o, t.right += r * o, t
    }

    function u(t, e) {
        var n = "x" === e ? "Left" : "Top",
            i = "Left" == n ? "Right" : "Bottom";
        return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + i + "Width"], 10)
    }

    function h(t, e, n, i) {
        return $(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], r(10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0)
    }

    function d(t) {
        var e = t.body,
            n = t.documentElement,
            i = r(10) && getComputedStyle(n);
        return {
            height: h("Height", e, n, i),
            width: h("Width", e, n, i)
        }
    }

    function f(t) {
        return Z({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }

    function p(t) {
        var n = {};
        try {
            if (r(10)) {
                n = t.getBoundingClientRect();
                var i = l(t, "top"),
                    o = l(t, "left");
                n.top += i, n.left += o, n.bottom += i, n.right += o
            } else n = t.getBoundingClientRect()
        } catch (t) {}
        var s = {
                left: n.left,
                top: n.top,
                width: n.right - n.left,
                height: n.bottom - n.top
            },
            a = "HTML" === t.nodeName ? d(t.ownerDocument) : {},
            c = a.width || t.clientWidth || s.right - s.left,
            h = a.height || t.clientHeight || s.bottom - s.top,
            p = t.offsetWidth - c,
            g = t.offsetHeight - h;
        if (p || g) {
            var m = e(t);
            p -= u(m, "x"), g -= u(m, "y"), s.width -= p, s.height -= g
        }
        return f(s)
    }

    function g(t, n) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            s = r(10),
            a = "HTML" === n.nodeName,
            l = p(t),
            u = p(n),
            h = i(t),
            d = e(n),
            g = parseFloat(d.borderTopWidth, 10),
            m = parseFloat(d.borderLeftWidth, 10);
        o && a && (u.top = $(u.top, 0), u.left = $(u.left, 0));
        var v = f({
            top: l.top - u.top - g,
            left: l.left - u.left - m,
            width: l.width,
            height: l.height
        });
        if (v.marginTop = 0, v.marginLeft = 0, !s && a) {
            var y = parseFloat(d.marginTop, 10),
                _ = parseFloat(d.marginLeft, 10);
            v.top -= g - y, v.bottom -= g - y, v.left -= m - _, v.right -= m - _, v.marginTop = y, v.marginLeft = _
        }
        return (s && !o ? n.contains(h) : n === h && "BODY" !== h.nodeName) && (v = c(v, n)), v
    }

    function m(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            n = t.ownerDocument.documentElement,
            i = g(t, n),
            r = $(n.clientWidth, window.innerWidth || 0),
            o = $(n.clientHeight, window.innerHeight || 0),
            s = e ? 0 : l(n),
            a = e ? 0 : l(n, "left");
        return f({
            top: s - i.top + i.marginTop,
            left: a - i.left + i.marginLeft,
            width: r,
            height: o
        })
    }

    function v(t) {
        var i = t.nodeName;
        if ("BODY" === i || "HTML" === i) return !1;
        if ("fixed" === e(t, "position")) return !0;
        var r = n(t);
        return !!r && v(r)
    }

    function y(t) {
        if (!t || !t.parentElement || r()) return document.documentElement;
        for (var n = t.parentElement; n && "none" === e(n, "transform");) n = n.parentElement;
        return n || document.documentElement
    }

    function _(t, e, r, o) {
        var s = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            l = {
                top: 0,
                left: 0
            },
            c = s ? y(t) : a(t, e);
        if ("viewport" === o) l = m(c, s);
        else {
            var u;
            "scrollParent" === o ? "BODY" === (u = i(n(e))).nodeName && (u = t.ownerDocument.documentElement) : u = "window" === o ? t.ownerDocument.documentElement : o;
            var h = g(u, c, s);
            if ("HTML" !== u.nodeName || v(c)) l = h;
            else {
                var f = d(t.ownerDocument),
                    p = f.height,
                    _ = f.width;
                l.top += h.top - h.marginTop, l.bottom = p + h.top, l.left += h.left - h.marginLeft, l.right = _ + h.left
            }
        }
        var w = "number" == typeof(r = r || 0);
        return l.left += w ? r : r.left || 0, l.top += w ? r : r.top || 0, l.right -= w ? r : r.right || 0, l.bottom -= w ? r : r.bottom || 0, l
    }

    function w(t) {
        return t.width * t.height
    }

    function b(t, e, n, i, r) {
        var o = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var s = _(n, i, o, r),
            a = {
                top: {
                    width: s.width,
                    height: e.top - s.top
                },
                right: {
                    width: s.right - e.right,
                    height: s.height
                },
                bottom: {
                    width: s.width,
                    height: s.bottom - e.bottom
                },
                left: {
                    width: e.left - s.left,
                    height: s.height
                }
            },
            l = Object.keys(a).map(function(t) {
                return Z({
                    key: t
                }, a[t], {
                    area: w(a[t])
                })
            }).sort(function(t, e) {
                return e.area - t.area
            }),
            c = l.filter(function(t) {
                var e = t.width,
                    i = t.height;
                return e >= n.clientWidth && i >= n.clientHeight
            }),
            u = 0 < c.length ? c[0].key : l[0].key,
            h = t.split("-")[1];
        return u + (h ? "-" + h : "")
    }

    function x(t, e, n) {
        var i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return g(n, i ? y(e) : a(e, n), i)
    }

    function E(t) {
        var e = t.ownerDocument.defaultView.getComputedStyle(t),
            n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
            i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
        return {
            width: t.offsetWidth + i,
            height: t.offsetHeight + n
        }
    }

    function C(t) {
        var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return t.replace(/left|right|bottom|top/g, function(t) {
            return e[t]
        })
    }

    function T(t, e, n) {
        n = n.split("-")[0];
        var i = E(t),
            r = {
                width: i.width,
                height: i.height
            },
            o = -1 !== ["right", "left"].indexOf(n),
            s = o ? "top" : "left",
            a = o ? "left" : "top",
            l = o ? "height" : "width",
            c = o ? "width" : "height";
        return r[s] = e[s] + e[l] / 2 - i[l] / 2, r[a] = n === a ? e[a] - i[c] : e[C(a)], r
    }

    function S(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }

    function D(e, n, i) {
        return (void 0 === i ? e : e.slice(0, function(t, e, n) {
            if (Array.prototype.findIndex) return t.findIndex(function(t) {
                return t[e] === n
            });
            var i = S(t, function(t) {
                return t[e] === n
            });
            return t.indexOf(i)
        }(e, "name", i))).forEach(function(e) {
            e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var i = e.function || e.fn;
            e.enabled && t(i) && (n.offsets.popper = f(n.offsets.popper), n.offsets.reference = f(n.offsets.reference), n = i(n, e))
        }), n
    }

    function A(t, e) {
        return t.some(function(t) {
            var n = t.name;
            return t.enabled && n === e
        })
    }

    function N(t) {
        for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length; i++) {
            var r = e[i],
                o = r ? "" + r + n : t;
            if (void 0 !== document.body.style[o]) return o
        }
        return null
    }

    function k(t) {
        var e = t.ownerDocument;
        return e ? e.defaultView : window
    }

    function I(t, e, n, r) {
        n.updateBound = r, k(t).addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var o = i(t);
        return function t(e, n, r, o) {
            var s = "BODY" === e.nodeName,
                a = s ? e.ownerDocument.defaultView : e;
            a.addEventListener(n, r, {
                passive: !0
            }), s || t(i(a.parentNode), n, r, o), o.push(a)
        }(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n
    }

    function O() {
        var t, e;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, k(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(t) {
            t.removeEventListener("scroll", e.updateBound)
        }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e))
    }

    function j(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }

    function L(t, e) {
        Object.keys(e).forEach(function(n) {
            var i = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && j(e[n]) && (i = "px"), t.style[n] = e[n] + i
        })
    }

    function P(t, e, n) {
        var i = S(t, function(t) {
                return t.name === e
            }),
            r = !!i && t.some(function(t) {
                return t.name === n && t.enabled && t.order < i.order
            });
        if (!r) {
            var o = "`" + e + "`";
            console.warn("`" + n + "` modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
        }
        return r
    }

    function H(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            n = et.indexOf(t),
            i = et.slice(n + 1).concat(et.slice(0, n));
        return e ? i.reverse() : i
    }

    function R(t, e, n, i) {
        var r = [0, 0],
            o = -1 !== ["right", "left"].indexOf(i),
            s = t.split(/(\+|\-)/).map(function(t) {
                return t.trim()
            }),
            a = s.indexOf(S(s, function(t) {
                return -1 !== t.search(/,|\s/)
            }));
        s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            c = -1 === a ? [s] : [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))];
        return (c = c.map(function(t, i) {
            var r = (1 === i ? !o : o) ? "height" : "width",
                s = !1;
            return t.reduce(function(t, e) {
                return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e)
            }, []).map(function(t) {
                return function(t, e, n, i) {
                    var r = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        o = +r[1],
                        s = r[2];
                    if (!o) return t;
                    if (0 === s.indexOf("%")) {
                        var a;
                        switch (s) {
                            case "%p":
                                a = n;
                                break;
                            case "%":
                            case "%r":
                            default:
                                a = i
                        }
                        return f(a)[e] / 100 * o
                    }
                    return "vh" === s || "vw" === s ? ("vh" === s ? $(document.documentElement.clientHeight, window.innerHeight || 0) : $(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o : o
                }(t, r, e, n)
            })
        })).forEach(function(t, e) {
            t.forEach(function(n, i) {
                j(n) && (r[e] += n * ("-" === t[i - 1] ? -1 : 1))
            })
        }), r
    }
    for (var M = Math.min, q = Math.floor, W = Math.round, $ = Math.max, F = "undefined" != typeof window && "undefined" != typeof document, z = ["Edge", "Trident", "Firefox"], B = 0, U = 0; U < z.length; U += 1)
        if (F && 0 <= navigator.userAgent.indexOf(z[U])) {
            B = 1;
            break
        } var Q = F && window.Promise ? function(t) {
            var e = !1;
            return function() {
                e || (e = !0, window.Promise.resolve().then(function() {
                    e = !1, t()
                }))
            }
        } : function(t) {
            var e = !1;
            return function() {
                e || (e = !0, setTimeout(function() {
                    e = !1, t()
                }, B))
            }
        },
        V = F && !(!window.MSInputMethodContext || !document.documentMode),
        K = F && /MSIE 10/.test(navigator.userAgent),
        Y = function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        },
        X = function() {
            function t(t, e) {
                for (var n, i = 0; i < e.length; i++)(n = e[i]).enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
            return function(e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }(),
        G = function(t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t
        },
        Z = Object.assign || function(t) {
            for (var e, n = 1; n < arguments.length; n++)
                for (var i in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        },
        J = F && /Firefox/i.test(navigator.userAgent),
        tt = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        et = tt.slice(3),
        nt = "flip",
        it = "clockwise",
        rt = "counterclockwise",
        ot = function() {
            function e(n, i) {
                var r = this,
                    o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                Y(this, e), this.scheduleUpdate = function() {
                    return requestAnimationFrame(r.update)
                }, this.update = Q(this.update.bind(this)), this.options = Z({}, e.Defaults, o), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = n && n.jquery ? n[0] : n, this.popper = i && i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(Z({}, e.Defaults.modifiers, o.modifiers)).forEach(function(t) {
                    r.options.modifiers[t] = Z({}, e.Defaults.modifiers[t] || {}, o.modifiers ? o.modifiers[t] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
                    return Z({
                        name: t
                    }, r.options.modifiers[t])
                }).sort(function(t, e) {
                    return t.order - e.order
                }), this.modifiers.forEach(function(e) {
                    e.enabled && t(e.onLoad) && e.onLoad(r.reference, r.popper, r.options, e, r.state)
                }), this.update();
                var s = this.options.eventsEnabled;
                s && this.enableEventListeners(), this.state.eventsEnabled = s
            }
            return X(e, [{
                key: "update",
                value: function() {
                    return function() {
                        if (!this.state.isDestroyed) {
                            var t = {
                                instance: this,
                                styles: {},
                                arrowStyles: {},
                                attributes: {},
                                flipped: !1,
                                offsets: {}
                            };
                            t.offsets.reference = x(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = b(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = T(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = D(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
                        }
                    }.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return function() {
                        return this.state.isDestroyed = !0, A(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[N("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                    }.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return function() {
                        this.state.eventsEnabled || (this.state = I(this.reference, this.options, this.state, this.scheduleUpdate))
                    }.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return O.call(this)
                }
            }]), e
        }();
    return ot.Utils = ("undefined" == typeof window ? global : window).PopperUtils, ot.placements = tt, ot.Defaults = {
        placement: "bottom",
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(t) {
                    var e = t.placement,
                        n = e.split("-")[0],
                        i = e.split("-")[1];
                    if (i) {
                        var r = t.offsets,
                            o = r.reference,
                            s = r.popper,
                            a = -1 !== ["bottom", "top"].indexOf(n),
                            l = a ? "left" : "top",
                            c = a ? "width" : "height",
                            u = {
                                start: G({}, l, o[l]),
                                end: G({}, l, o[l] + o[c] - s[c])
                            };
                        t.offsets.popper = Z({}, s, u[i])
                    }
                    return t
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: function(t, e) {
                    var n, i = e.offset,
                        r = t.placement,
                        o = t.offsets,
                        s = o.popper,
                        a = o.reference,
                        l = r.split("-")[0];
                    return n = j(+i) ? [+i, 0] : R(i, s, a, l), "left" === l ? (s.top += n[0], s.left -= n[1]) : "right" === l ? (s.top += n[0], s.left += n[1]) : "top" === l ? (s.left += n[0], s.top -= n[1]) : "bottom" === l && (s.left += n[0], s.top += n[1]), t.popper = s, t
                },
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(t, e) {
                    var n = e.boundariesElement || o(t.instance.popper);
                    t.instance.reference === n && (n = o(n));
                    var i = N("transform"),
                        r = t.instance.popper.style,
                        s = r.top,
                        a = r.left,
                        l = r[i];
                    r.top = "", r.left = "", r[i] = "";
                    var c = _(t.instance.popper, t.instance.reference, e.padding, n, t.positionFixed);
                    r.top = s, r.left = a, r[i] = l, e.boundaries = c;
                    var u = e.priority,
                        h = t.offsets.popper,
                        d = {
                            primary: function(t) {
                                var n = h[t];
                                return h[t] < c[t] && !e.escapeWithReference && (n = $(h[t], c[t])), G({}, t, n)
                            },
                            secondary: function(t) {
                                var n = "right" === t ? "left" : "top",
                                    i = h[n];
                                return h[t] > c[t] && !e.escapeWithReference && (i = M(h[n], c[t] - ("right" === t ? h.width : h.height))), G({}, n, i)
                            }
                        };
                    return u.forEach(function(t) {
                        var e = -1 === ["left", "top"].indexOf(t) ? "secondary" : "primary";
                        h = Z({}, h, d[e](t))
                    }), t.offsets.popper = h, t
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(t) {
                    var e = t.offsets,
                        n = e.popper,
                        i = e.reference,
                        r = t.placement.split("-")[0],
                        o = q,
                        s = -1 !== ["top", "bottom"].indexOf(r),
                        a = s ? "right" : "bottom",
                        l = s ? "left" : "top",
                        c = s ? "width" : "height";
                    return n[a] < o(i[l]) && (t.offsets.popper[l] = o(i[l]) - n[c]), n[l] > o(i[a]) && (t.offsets.popper[l] = o(i[a])), t
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(t, n) {
                    var i;
                    if (!P(t.instance.modifiers, "arrow", "keepTogether")) return t;
                    var r = n.element;
                    if ("string" == typeof r) {
                        if (!(r = t.instance.popper.querySelector(r))) return t
                    } else if (!t.instance.popper.contains(r)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                    var o = t.placement.split("-")[0],
                        s = t.offsets,
                        a = s.popper,
                        l = s.reference,
                        c = -1 !== ["left", "right"].indexOf(o),
                        u = c ? "height" : "width",
                        h = c ? "Top" : "Left",
                        d = h.toLowerCase(),
                        p = c ? "left" : "top",
                        g = c ? "bottom" : "right",
                        m = E(r)[u];
                    l[g] - m < a[d] && (t.offsets.popper[d] -= a[d] - (l[g] - m)), l[d] + m > a[g] && (t.offsets.popper[d] += l[d] + m - a[g]), t.offsets.popper = f(t.offsets.popper);
                    var v = l[d] + l[u] / 2 - m / 2,
                        y = e(t.instance.popper),
                        _ = parseFloat(y["margin" + h], 10),
                        w = parseFloat(y["border" + h + "Width"], 10),
                        b = v - t.offsets.popper[d] - _ - w;
                    return b = $(M(a[u] - m, b), 0), t.arrowElement = r, t.offsets.arrow = (G(i = {}, d, W(b)), G(i, p, ""), i), t
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(t, e) {
                    if (A(t.instance.modifiers, "inner")) return t;
                    if (t.flipped && t.placement === t.originalPlacement) return t;
                    var n = _(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
                        i = t.placement.split("-")[0],
                        r = C(i),
                        o = t.placement.split("-")[1] || "",
                        s = [];
                    switch (e.behavior) {
                        case nt:
                            s = [i, r];
                            break;
                        case it:
                            s = H(i);
                            break;
                        case rt:
                            s = H(i, !0);
                            break;
                        default:
                            s = e.behavior
                    }
                    return s.forEach(function(a, l) {
                        if (i !== a || s.length === l + 1) return t;
                        i = t.placement.split("-")[0], r = C(i);
                        var c = t.offsets.popper,
                            u = t.offsets.reference,
                            h = q,
                            d = "left" === i && h(c.right) > h(u.left) || "right" === i && h(c.left) < h(u.right) || "top" === i && h(c.bottom) > h(u.top) || "bottom" === i && h(c.top) < h(u.bottom),
                            f = h(c.left) < h(n.left),
                            p = h(c.right) > h(n.right),
                            g = h(c.top) < h(n.top),
                            m = h(c.bottom) > h(n.bottom),
                            v = "left" === i && f || "right" === i && p || "top" === i && g || "bottom" === i && m,
                            y = -1 !== ["top", "bottom"].indexOf(i),
                            _ = !!e.flipVariations && (y && "start" === o && f || y && "end" === o && p || !y && "start" === o && g || !y && "end" === o && m),
                            w = !!e.flipVariationsByContent && (y && "start" === o && p || y && "end" === o && f || !y && "start" === o && m || !y && "end" === o && g),
                            b = _ || w;
                        (d || v || b) && (t.flipped = !0, (d || v) && (i = s[l + 1]), b && (o = function(t) {
                            return "end" === t ? "start" : "start" === t ? "end" : t
                        }(o)), t.placement = i + (o ? "-" + o : ""), t.offsets.popper = Z({}, t.offsets.popper, T(t.instance.popper, t.offsets.reference, t.placement)), t = D(t.instance.modifiers, t, "flip"))
                    }), t
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport",
                flipVariations: !1,
                flipVariationsByContent: !1
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(t) {
                    var e = t.placement,
                        n = e.split("-")[0],
                        i = t.offsets,
                        r = i.popper,
                        o = i.reference,
                        s = -1 !== ["left", "right"].indexOf(n),
                        a = -1 === ["top", "left"].indexOf(n);
                    return r[s ? "left" : "top"] = o[n] - (a ? r[s ? "width" : "height"] : 0), t.placement = C(e), t.offsets.popper = f(r), t
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(t) {
                    if (!P(t.instance.modifiers, "hide", "preventOverflow")) return t;
                    var e = t.offsets.reference,
                        n = S(t.instance.modifiers, function(t) {
                            return "preventOverflow" === t.name
                        }).boundaries;
                    if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
                        if (!0 === t.hide) return t;
                        t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === t.hide) return t;
                        t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                    }
                    return t
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(t, e) {
                    var n = e.x,
                        i = e.y,
                        r = t.offsets.popper,
                        s = S(t.instance.modifiers, function(t) {
                            return "applyStyle" === t.name
                        }).gpuAcceleration;
                    void 0 !== s && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var a, l, c = void 0 === s ? e.gpuAcceleration : s,
                        u = o(t.instance.popper),
                        h = p(u),
                        d = {
                            position: r.position
                        },
                        f = function(t, e) {
                            var n = t.offsets,
                                i = n.popper,
                                r = n.reference,
                                o = W,
                                s = function(t) {
                                    return t
                                },
                                a = o(r.width),
                                l = o(i.width),
                                c = -1 !== ["left", "right"].indexOf(t.placement),
                                u = -1 !== t.placement.indexOf("-"),
                                h = e ? c || u || a % 2 == l % 2 ? o : q : s,
                                d = e ? o : s;
                            return {
                                left: h(1 == a % 2 && 1 == l % 2 && !u && e ? i.left - 1 : i.left),
                                top: d(i.top),
                                bottom: d(i.bottom),
                                right: h(i.right)
                            }
                        }(t, 2 > window.devicePixelRatio || !J),
                        g = "bottom" === n ? "top" : "bottom",
                        m = "right" === i ? "left" : "right",
                        v = N("transform");
                    if (l = "bottom" == g ? "HTML" === u.nodeName ? -u.clientHeight + f.bottom : -h.height + f.bottom : f.top, a = "right" == m ? "HTML" === u.nodeName ? -u.clientWidth + f.right : -h.width + f.right : f.left, c && v) d[v] = "translate3d(" + a + "px, " + l + "px, 0)", d[g] = 0, d[m] = 0, d.willChange = "transform";
                    else {
                        var y = "bottom" == g ? -1 : 1,
                            _ = "right" == m ? -1 : 1;
                        d[g] = l * y, d[m] = a * _, d.willChange = g + ", " + m
                    }
                    var w = {
                        "x-placement": t.placement
                    };
                    return t.attributes = Z({}, w, t.attributes), t.styles = Z({}, d, t.styles), t.arrowStyles = Z({}, t.offsets.arrow, t.arrowStyles), t
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(t) {
                    return L(t.instance.popper, t.styles),
                        function(t, e) {
                            Object.keys(e).forEach(function(n) {
                                !1 === e[n] ? t.removeAttribute(n) : t.setAttribute(n, e[n])
                            })
                        }(t.instance.popper, t.attributes), t.arrowElement && Object.keys(t.arrowStyles).length && L(t.arrowElement, t.arrowStyles), t
                },
                onLoad: function(t, e, n, i, r) {
                    var o = x(r, e, t, n.positionFixed),
                        s = b(n.placement, o, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                    return e.setAttribute("x-placement", s), L(e, {
                        position: n.positionFixed ? "fixed" : "absolute"
                    }), n
                },
                gpuAcceleration: void 0
            }
        }
    }, ot
}),
function(t, e) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    "use strict";
    var n = [],
        i = t.document,
        r = Object.getPrototypeOf,
        o = n.slice,
        s = n.concat,
        a = n.push,
        l = n.indexOf,
        c = {},
        u = c.toString,
        h = c.hasOwnProperty,
        d = h.toString,
        f = d.call(Object),
        p = {},
        g = function(t) {
            return "function" == typeof t && "number" != typeof t.nodeType
        },
        m = function(t) {
            return null != t && t === t.window
        },
        v = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        };

    function y(t, e, n) {
        var r, o, s = (n = n || i).createElement("script");
        if (s.text = t, e)
            for (r in v)(o = e[r] || e.getAttribute && e.getAttribute(r)) && s.setAttribute(r, o);
        n.head.appendChild(s).parentNode.removeChild(s)
    }

    function _(t) {
        return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? c[u.call(t)] || "object" : typeof t
    }
    var w = "3.4.0",
        b = function(t, e) {
            return new b.fn.init(t, e)
        },
        x = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    function E(t) {
        var e = !!t && "length" in t && t.length,
            n = _(t);
        return !g(t) && !m(t) && ("array" === n || 0 === e || "number" == typeof e && 0 < e && e - 1 in t)
    }
    b.fn = b.prototype = {
        jquery: w,
        constructor: b,
        length: 0,
        toArray: function() {
            return o.call(this)
        },
        get: function(t) {
            return null == t ? o.call(this) : t < 0 ? this[t + this.length] : this[t]
        },
        pushStack: function(t) {
            var e = b.merge(this.constructor(), t);
            return e.prevObject = this, e
        },
        each: function(t) {
            return b.each(this, t)
        },
        map: function(t) {
            return this.pushStack(b.map(this, function(e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function() {
            return this.pushStack(o.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length,
                n = +t + (t < 0 ? e : 0);
            return this.pushStack(0 <= n && n < e ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: a,
        sort: n.sort,
        splice: n.splice
    }, b.extend = b.fn.extend = function() {
        var t, e, n, i, r, o, s = arguments[0] || {},
            a = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || g(s) || (s = {}), a === l && (s = this, a--); a < l; a++)
            if (null != (t = arguments[a]))
                for (e in t) i = t[e], "__proto__" !== e && s !== i && (c && i && (b.isPlainObject(i) || (r = Array.isArray(i))) ? (n = s[e], o = r && !Array.isArray(n) ? [] : r || b.isPlainObject(n) ? n : {}, r = !1, s[e] = b.extend(c, o, i)) : void 0 !== i && (s[e] = i));
        return s
    }, b.extend({
        expando: "jQuery" + (w + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isPlainObject: function(t) {
            var e, n;
            return !(!t || "[object Object]" !== u.call(t) || (e = r(t)) && ("function" != typeof(n = h.call(e, "constructor") && e.constructor) || d.call(n) !== f))
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        globalEval: function(t, e) {
            y(t, {
                nonce: e && e.nonce
            })
        },
        each: function(t, e) {
            var n, i = 0;
            if (E(t))
                for (n = t.length; i < n && !1 !== e.call(t[i], i, t[i]); i++);
            else
                for (i in t)
                    if (!1 === e.call(t[i], i, t[i])) break;
            return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(x, "")
        },
        makeArray: function(t, e) {
            var n = e || [];
            return null != t && (E(Object(t)) ? b.merge(n, "string" == typeof t ? [t] : t) : a.call(n, t)), n
        },
        inArray: function(t, e, n) {
            return null == e ? -1 : l.call(e, t, n)
        },
        merge: function(t, e) {
            for (var n = +e.length, i = 0, r = t.length; i < n; i++) t[r++] = e[i];
            return t.length = r, t
        },
        grep: function(t, e, n) {
            for (var i = [], r = 0, o = t.length, s = !n; r < o; r++) !e(t[r], r) !== s && i.push(t[r]);
            return i
        },
        map: function(t, e, n) {
            var i, r, o = 0,
                a = [];
            if (E(t))
                for (i = t.length; o < i; o++) null != (r = e(t[o], o, n)) && a.push(r);
            else
                for (o in t) null != (r = e(t[o], o, n)) && a.push(r);
            return s.apply([], a)
        },
        guid: 1,
        support: p
    }), "function" == typeof Symbol && (b.fn[Symbol.iterator] = n[Symbol.iterator]), b.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
        c["[object " + e + "]"] = e.toLowerCase()
    });
    var C = function(t) {
        var e, n, i, r, o, s, a, l, c, u, h, d, f, p, g, m, v, y, _, w = "sizzle" + 1 * new Date,
            b = t.document,
            x = 0,
            E = 0,
            C = lt(),
            T = lt(),
            S = lt(),
            D = lt(),
            A = function(t, e) {
                return t === e && (h = !0), 0
            },
            N = {}.hasOwnProperty,
            k = [],
            I = k.pop,
            O = k.push,
            j = k.push,
            L = k.slice,
            P = function(t, e) {
                for (var n = 0, i = t.length; n < i; n++)
                    if (t[n] === e) return n;
                return -1
            },
            H = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            R = "[\\x20\\t\\r\\n\\f]",
            M = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            q = "\\[" + R + "*(" + M + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + R + "*\\]",
            W = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + q + ")*)|.*)\\)|)",
            $ = new RegExp(R + "+", "g"),
            F = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
            z = new RegExp("^" + R + "*," + R + "*"),
            B = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
            U = new RegExp(R + "|>"),
            Q = new RegExp(W),
            V = new RegExp("^" + M + "$"),
            K = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                TAG: new RegExp("^(" + M + "|[*])"),
                ATTR: new RegExp("^" + q),
                PSEUDO: new RegExp("^" + W),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + H + ")$", "i"),
                needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /HTML$/i,
            X = /^(?:input|select|textarea|button)$/i,
            G = /^h\d$/i,
            Z = /^[^{]+\{\s*\[native \w/,
            J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            tt = /[+~]/,
            et = new RegExp("\\\\([\\da-f]{1,6}" + R + "?|(" + R + ")|.)", "ig"),
            nt = function(t, e, n) {
                var i = "0x" + e - 65536;
                return i != i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            },
            it = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            rt = function(t, e) {
                return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
            },
            ot = function() {
                d()
            },
            st = wt(function(t) {
                return !0 === t.disabled && "fieldset" === t.nodeName.toLowerCase()
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            j.apply(k = L.call(b.childNodes), b.childNodes), k[b.childNodes.length].nodeType
        } catch (e) {
            j = {
                apply: k.length ? function(t, e) {
                    O.apply(t, L.call(e))
                } : function(t, e) {
                    for (var n = t.length, i = 0; t[n++] = e[i++];);
                    t.length = n - 1
                }
            }
        }

        function at(t, e, i, r) {
            var o, a, c, u, h, p, v, y = e && e.ownerDocument,
                x = e ? e.nodeType : 9;
            if (i = i || [], "string" != typeof t || !t || 1 !== x && 9 !== x && 11 !== x) return i;
            if (!r && ((e ? e.ownerDocument || e : b) !== f && d(e), e = e || f, g)) {
                if (11 !== x && (h = J.exec(t)))
                    if (o = h[1]) {
                        if (9 === x) {
                            if (!(c = e.getElementById(o))) return i;
                            if (c.id === o) return i.push(c), i
                        } else if (y && (c = y.getElementById(o)) && _(e, c) && c.id === o) return i.push(c), i
                    } else {
                        if (h[2]) return j.apply(i, e.getElementsByTagName(t)), i;
                        if ((o = h[3]) && n.getElementsByClassName && e.getElementsByClassName) return j.apply(i, e.getElementsByClassName(o)), i
                    } if (n.qsa && !D[t + " "] && (!m || !m.test(t)) && (1 !== x || "object" !== e.nodeName.toLowerCase())) {
                    if (v = t, y = e, 1 === x && U.test(t)) {
                        for ((u = e.getAttribute("id")) ? u = u.replace(it, rt) : e.setAttribute("id", u = w), a = (p = s(t)).length; a--;) p[a] = "#" + u + " " + _t(p[a]);
                        v = p.join(","), y = tt.test(t) && vt(e.parentNode) || e
                    }
                    try {
                        return j.apply(i, y.querySelectorAll(v)), i
                    } catch (e) {
                        D(t, !0)
                    } finally {
                        u === w && e.removeAttribute("id")
                    }
                }
            }
            return l(t.replace(F, "$1"), e, i, r)
        }

        function lt() {
            var t = [];
            return function e(n, r) {
                return t.push(n + " ") > i.cacheLength && delete e[t.shift()], e[n + " "] = r
            }
        }

        function ct(t) {
            return t[w] = !0, t
        }

        function ut(t) {
            var e = f.createElement("fieldset");
            try {
                return !!t(e)
            } catch (t) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function ht(t, e) {
            for (var n = t.split("|"), r = n.length; r--;) i.attrHandle[n[r]] = e
        }

        function dt(t, e) {
            var n = e && t,
                i = n && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
            if (i) return i;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === e) return -1;
            return t ? 1 : -1
        }

        function ft(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }

        function pt(t) {
            return function(e) {
                var n = e.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && e.type === t
            }
        }

        function gt(t) {
            return function(e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && st(e) === t : e.disabled === t : "label" in e && e.disabled === t
            }
        }

        function mt(t) {
            return ct(function(e) {
                return e = +e, ct(function(n, i) {
                    for (var r, o = t([], n.length, e), s = o.length; s--;) n[r = o[s]] && (n[r] = !(i[r] = n[r]))
                })
            })
        }

        function vt(t) {
            return t && void 0 !== t.getElementsByTagName && t
        }
        for (e in n = at.support = {}, o = at.isXML = function(t) {
                var e = t.namespaceURI,
                    n = (t.ownerDocument || t).documentElement;
                return !Y.test(e || n && n.nodeName || "HTML")
            }, d = at.setDocument = function(t) {
                var e, r, s = t ? t.ownerDocument || t : b;
                return s !== f && 9 === s.nodeType && s.documentElement && (p = (f = s).documentElement, g = !o(f), b !== f && (r = f.defaultView) && r.top !== r && (r.addEventListener ? r.addEventListener("unload", ot, !1) : r.attachEvent && r.attachEvent("onunload", ot)), n.attributes = ut(function(t) {
                    return t.className = "i", !t.getAttribute("className")
                }), n.getElementsByTagName = ut(function(t) {
                    return t.appendChild(f.createComment("")), !t.getElementsByTagName("*").length
                }), n.getElementsByClassName = Z.test(f.getElementsByClassName), n.getById = ut(function(t) {
                    return p.appendChild(t).id = w, !f.getElementsByName || !f.getElementsByName(w).length
                }), n.getById ? (i.filter.ID = function(t) {
                    var e = t.replace(et, nt);
                    return function(t) {
                        return t.getAttribute("id") === e
                    }
                }, i.find.ID = function(t, e) {
                    if (void 0 !== e.getElementById && g) {
                        var n = e.getElementById(t);
                        return n ? [n] : []
                    }
                }) : (i.filter.ID = function(t) {
                    var e = t.replace(et, nt);
                    return function(t) {
                        var n = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                }, i.find.ID = function(t, e) {
                    if (void 0 !== e.getElementById && g) {
                        var n, i, r, o = e.getElementById(t);
                        if (o) {
                            if ((n = o.getAttributeNode("id")) && n.value === t) return [o];
                            for (r = e.getElementsByName(t), i = 0; o = r[i++];)
                                if ((n = o.getAttributeNode("id")) && n.value === t) return [o]
                        }
                        return []
                    }
                }), i.find.TAG = n.getElementsByTagName ? function(t, e) {
                    return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : n.qsa ? e.querySelectorAll(t) : void 0
                } : function(t, e) {
                    var n, i = [],
                        r = 0,
                        o = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return o
                }, i.find.CLASS = n.getElementsByClassName && function(t, e) {
                    if (void 0 !== e.getElementsByClassName && g) return e.getElementsByClassName(t)
                }, v = [], m = [], (n.qsa = Z.test(f.querySelectorAll)) && (ut(function(t) {
                    p.appendChild(t).innerHTML = "<a id='" + w + "'></a><select id='" + w + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + R + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || m.push("\\[" + R + "*(?:value|" + H + ")"), t.querySelectorAll("[id~=" + w + "-]").length || m.push("~="), t.querySelectorAll(":checked").length || m.push(":checked"), t.querySelectorAll("a#" + w + "+*").length || m.push(".#.+[+~]")
                }), ut(function(t) {
                    t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var e = f.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && m.push("name" + R + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), p.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), m.push(",.*:")
                })), (n.matchesSelector = Z.test(y = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && ut(function(t) {
                    n.disconnectedMatch = y.call(t, "*"), y.call(t, "[s!='']:x"), v.push("!=", W)
                }), m = m.length && new RegExp(m.join("|")), v = v.length && new RegExp(v.join("|")), e = Z.test(p.compareDocumentPosition), _ = e || Z.test(p.contains) ? function(t, e) {
                    var n = 9 === t.nodeType ? t.documentElement : t,
                        i = e && e.parentNode;
                    return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                } : function(t, e) {
                    if (e)
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                    return !1
                }, A = e ? function(t, e) {
                    if (t === e) return h = !0, 0;
                    var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return i || (1 & (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !n.sortDetached && e.compareDocumentPosition(t) === i ? t === f || t.ownerDocument === b && _(b, t) ? -1 : e === f || e.ownerDocument === b && _(b, e) ? 1 : u ? P(u, t) - P(u, e) : 0 : 4 & i ? -1 : 1)
                } : function(t, e) {
                    if (t === e) return h = !0, 0;
                    var n, i = 0,
                        r = t.parentNode,
                        o = e.parentNode,
                        s = [t],
                        a = [e];
                    if (!r || !o) return t === f ? -1 : e === f ? 1 : r ? -1 : o ? 1 : u ? P(u, t) - P(u, e) : 0;
                    if (r === o) return dt(t, e);
                    for (n = t; n = n.parentNode;) s.unshift(n);
                    for (n = e; n = n.parentNode;) a.unshift(n);
                    for (; s[i] === a[i];) i++;
                    return i ? dt(s[i], a[i]) : s[i] === b ? -1 : a[i] === b ? 1 : 0
                }), f
            }, at.matches = function(t, e) {
                return at(t, null, null, e)
            }, at.matchesSelector = function(t, e) {
                if ((t.ownerDocument || t) !== f && d(t), n.matchesSelector && g && !D[e + " "] && (!v || !v.test(e)) && (!m || !m.test(e))) try {
                    var i = y.call(t, e);
                    if (i || n.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
                } catch (t) {
                    D(e, !0)
                }
                return 0 < at(e, f, null, [t]).length
            }, at.contains = function(t, e) {
                return (t.ownerDocument || t) !== f && d(t), _(t, e)
            }, at.attr = function(t, e) {
                (t.ownerDocument || t) !== f && d(t);
                var r = i.attrHandle[e.toLowerCase()],
                    o = r && N.call(i.attrHandle, e.toLowerCase()) ? r(t, e, !g) : void 0;
                return void 0 !== o ? o : n.attributes || !g ? t.getAttribute(e) : (o = t.getAttributeNode(e)) && o.specified ? o.value : null
            }, at.escape = function(t) {
                return (t + "").replace(it, rt)
            }, at.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, at.uniqueSort = function(t) {
                var e, i = [],
                    r = 0,
                    o = 0;
                if (h = !n.detectDuplicates, u = !n.sortStable && t.slice(0), t.sort(A), h) {
                    for (; e = t[o++];) e === t[o] && (r = i.push(o));
                    for (; r--;) t.splice(i[r], 1)
                }
                return u = null, t
            }, r = at.getText = function(t) {
                var e, n = "",
                    i = 0,
                    o = t.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) n += r(t)
                    } else if (3 === o || 4 === o) return t.nodeValue
                } else
                    for (; e = t[i++];) n += r(e);
                return n
            }, (i = at.selectors = {
                cacheLength: 50,
                createPseudo: ct,
                match: K,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(et, nt), t[3] = (t[3] || t[4] || t[5] || "").replace(et, nt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || at.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && at.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var e, n = !t[6] && t[2];
                        return K.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && Q.test(n) && (e = s(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(et, nt).toLowerCase();
                        return "*" === t ? function() {
                            return !0
                        } : function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    },
                    CLASS: function(t) {
                        var e = C[t + " "];
                        return e || (e = new RegExp("(^|" + R + ")" + t + "(" + R + "|$)")) && C(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, e, n) {
                        return function(i) {
                            var r = at.attr(i, t);
                            return null == r ? "!=" === e : !e || (r += "", "=" === e ? r === n : "!=" === e ? r !== n : "^=" === e ? n && 0 === r.indexOf(n) : "*=" === e ? n && -1 < r.indexOf(n) : "$=" === e ? n && r.slice(-n.length) === n : "~=" === e ? -1 < (" " + r.replace($, " ") + " ").indexOf(n) : "|=" === e && (r === n || r.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(t, e, n, i, r) {
                        var o = "nth" !== t.slice(0, 3),
                            s = "last" !== t.slice(-4),
                            a = "of-type" === e;
                        return 1 === i && 0 === r ? function(t) {
                            return !!t.parentNode
                        } : function(e, n, l) {
                            var c, u, h, d, f, p, g = o !== s ? "nextSibling" : "previousSibling",
                                m = e.parentNode,
                                v = a && e.nodeName.toLowerCase(),
                                y = !l && !a,
                                _ = !1;
                            if (m) {
                                if (o) {
                                    for (; g;) {
                                        for (d = e; d = d[g];)
                                            if (a ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                                        p = g = "only" === t && !p && "nextSibling"
                                    }
                                    return !0
                                }
                                if (p = [s ? m.firstChild : m.lastChild], s && y) {
                                    for (_ = (f = (c = (u = (h = (d = m)[w] || (d[w] = {}))[d.uniqueID] || (h[d.uniqueID] = {}))[t] || [])[0] === x && c[1]) && c[2], d = f && m.childNodes[f]; d = ++f && d && d[g] || (_ = f = 0) || p.pop();)
                                        if (1 === d.nodeType && ++_ && d === e) {
                                            u[t] = [x, f, _];
                                            break
                                        }
                                } else if (y && (_ = f = (c = (u = (h = (d = e)[w] || (d[w] = {}))[d.uniqueID] || (h[d.uniqueID] = {}))[t] || [])[0] === x && c[1]), !1 === _)
                                    for (;
                                        (d = ++f && d && d[g] || (_ = f = 0) || p.pop()) && ((a ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++_ || (y && ((u = (h = d[w] || (d[w] = {}))[d.uniqueID] || (h[d.uniqueID] = {}))[t] = [x, _]), d !== e)););
                                return (_ -= r) === i || _ % i == 0 && 0 <= _ / i
                            }
                        }
                    },
                    PSEUDO: function(t, e) {
                        var n, r = i.pseudos[t] || i.setFilters[t.toLowerCase()] || at.error("unsupported pseudo: " + t);
                        return r[w] ? r(e) : 1 < r.length ? (n = [t, t, "", e], i.setFilters.hasOwnProperty(t.toLowerCase()) ? ct(function(t, n) {
                            for (var i, o = r(t, e), s = o.length; s--;) t[i = P(t, o[s])] = !(n[i] = o[s])
                        }) : function(t) {
                            return r(t, 0, n)
                        }) : r
                    }
                },
                pseudos: {
                    not: ct(function(t) {
                        var e = [],
                            n = [],
                            i = a(t.replace(F, "$1"));
                        return i[w] ? ct(function(t, e, n, r) {
                            for (var o, s = i(t, null, r, []), a = t.length; a--;)(o = s[a]) && (t[a] = !(e[a] = o))
                        }) : function(t, r, o) {
                            return e[0] = t, i(e, null, o, n), e[0] = null, !n.pop()
                        }
                    }),
                    has: ct(function(t) {
                        return function(e) {
                            return 0 < at(t, e).length
                        }
                    }),
                    contains: ct(function(t) {
                        return t = t.replace(et, nt),
                            function(e) {
                                return -1 < (e.textContent || r(e)).indexOf(t)
                            }
                    }),
                    lang: ct(function(t) {
                        return V.test(t || "") || at.error("unsupported lang: " + t), t = t.replace(et, nt).toLowerCase(),
                            function(e) {
                                var n;
                                do {
                                    if (n = g ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var n = t.location && t.location.hash;
                        return n && n.slice(1) === e.id
                    },
                    root: function(t) {
                        return t === p
                    },
                    focus: function(t) {
                        return t === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: gt(!1),
                    disabled: gt(!0),
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !i.pseudos.empty(t)
                    },
                    header: function(t) {
                        return G.test(t.nodeName)
                    },
                    input: function(t) {
                        return X.test(t.nodeName)
                    },
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function(t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: mt(function() {
                        return [0]
                    }),
                    last: mt(function(t, e) {
                        return [e - 1]
                    }),
                    eq: mt(function(t, e, n) {
                        return [n < 0 ? n + e : n]
                    }),
                    even: mt(function(t, e) {
                        for (var n = 0; n < e; n += 2) t.push(n);
                        return t
                    }),
                    odd: mt(function(t, e) {
                        for (var n = 1; n < e; n += 2) t.push(n);
                        return t
                    }),
                    lt: mt(function(t, e, n) {
                        for (var i = n < 0 ? n + e : e < n ? e : n; 0 <= --i;) t.push(i);
                        return t
                    }),
                    gt: mt(function(t, e, n) {
                        for (var i = n < 0 ? n + e : n; ++i < e;) t.push(i);
                        return t
                    })
                }
            }).pseudos.nth = i.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) i.pseudos[e] = ft(e);
        for (e in {
                submit: !0,
                reset: !0
            }) i.pseudos[e] = pt(e);

        function yt() {}

        function _t(t) {
            for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
            return i
        }

        function wt(t, e, n) {
            var i = e.dir,
                r = e.next,
                o = r || i,
                s = n && "parentNode" === o,
                a = E++;
            return e.first ? function(e, n, r) {
                for (; e = e[i];)
                    if (1 === e.nodeType || s) return t(e, n, r);
                return !1
            } : function(e, n, l) {
                var c, u, h, d = [x, a];
                if (l) {
                    for (; e = e[i];)
                        if ((1 === e.nodeType || s) && t(e, n, l)) return !0
                } else
                    for (; e = e[i];)
                        if (1 === e.nodeType || s)
                            if (u = (h = e[w] || (e[w] = {}))[e.uniqueID] || (h[e.uniqueID] = {}), r && r === e.nodeName.toLowerCase()) e = e[i] || e;
                            else {
                                if ((c = u[o]) && c[0] === x && c[1] === a) return d[2] = c[2];
                                if ((u[o] = d)[2] = t(e, n, l)) return !0
                            } return !1
            }
        }

        function bt(t) {
            return 1 < t.length ? function(e, n, i) {
                for (var r = t.length; r--;)
                    if (!t[r](e, n, i)) return !1;
                return !0
            } : t[0]
        }

        function xt(t, e, n, i, r) {
            for (var o, s = [], a = 0, l = t.length, c = null != e; a < l; a++)(o = t[a]) && (n && !n(o, i, r) || (s.push(o), c && e.push(a)));
            return s
        }

        function Et(t, e, n, i, r, o) {
            return i && !i[w] && (i = Et(i)), r && !r[w] && (r = Et(r, o)), ct(function(o, s, a, l) {
                var c, u, h, d = [],
                    f = [],
                    p = s.length,
                    g = o || function(t, e, n) {
                        for (var i = 0, r = e.length; i < r; i++) at(t, e[i], n);
                        return n
                    }(e || "*", a.nodeType ? [a] : a, []),
                    m = !t || !o && e ? g : xt(g, d, t, a, l),
                    v = n ? r || (o ? t : p || i) ? [] : s : m;
                if (n && n(m, v, a, l), i)
                    for (c = xt(v, f), i(c, [], a, l), u = c.length; u--;)(h = c[u]) && (v[f[u]] = !(m[f[u]] = h));
                if (o) {
                    if (r || t) {
                        if (r) {
                            for (c = [], u = v.length; u--;)(h = v[u]) && c.push(m[u] = h);
                            r(null, v = [], c, l)
                        }
                        for (u = v.length; u--;)(h = v[u]) && -1 < (c = r ? P(o, h) : d[u]) && (o[c] = !(s[c] = h))
                    }
                } else v = xt(v === s ? v.splice(p, v.length) : v), r ? r(null, s, v, l) : j.apply(s, v)
            })
        }

        function Ct(t) {
            for (var e, n, r, o = t.length, s = i.relative[t[0].type], a = s || i.relative[" "], l = s ? 1 : 0, u = wt(function(t) {
                    return t === e
                }, a, !0), h = wt(function(t) {
                    return -1 < P(e, t)
                }, a, !0), d = [function(t, n, i) {
                    var r = !s && (i || n !== c) || ((e = n).nodeType ? u(t, n, i) : h(t, n, i));
                    return e = null, r
                }]; l < o; l++)
                if (n = i.relative[t[l].type]) d = [wt(bt(d), n)];
                else {
                    if ((n = i.filter[t[l].type].apply(null, t[l].matches))[w]) {
                        for (r = ++l; r < o && !i.relative[t[r].type]; r++);
                        return Et(1 < l && bt(d), 1 < l && _t(t.slice(0, l - 1).concat({
                            value: " " === t[l - 2].type ? "*" : ""
                        })).replace(F, "$1"), n, l < r && Ct(t.slice(l, r)), r < o && Ct(t = t.slice(r)), r < o && _t(t))
                    }
                    d.push(n)
                } return bt(d)
        }
        return yt.prototype = i.filters = i.pseudos, i.setFilters = new yt, s = at.tokenize = function(t, e) {
            var n, r, o, s, a, l, c, u = T[t + " "];
            if (u) return e ? 0 : u.slice(0);
            for (a = t, l = [], c = i.preFilter; a;) {
                for (s in n && !(r = z.exec(a)) || (r && (a = a.slice(r[0].length) || a), l.push(o = [])), n = !1, (r = B.exec(a)) && (n = r.shift(), o.push({
                        value: n,
                        type: r[0].replace(F, " ")
                    }), a = a.slice(n.length)), i.filter) !(r = K[s].exec(a)) || c[s] && !(r = c[s](r)) || (n = r.shift(), o.push({
                    value: n,
                    type: s,
                    matches: r
                }), a = a.slice(n.length));
                if (!n) break
            }
            return e ? a.length : a ? at.error(t) : T(t, l).slice(0)
        }, a = at.compile = function(t, e) {
            var n, r, o, a, l, u, h = [],
                p = [],
                m = S[t + " "];
            if (!m) {
                for (e || (e = s(t)), n = e.length; n--;)(m = Ct(e[n]))[w] ? h.push(m) : p.push(m);
                (m = S(t, (r = p, a = 0 < (o = h).length, l = 0 < r.length, u = function(t, e, n, s, u) {
                    var h, p, m, v = 0,
                        y = "0",
                        _ = t && [],
                        w = [],
                        b = c,
                        E = t || l && i.find.TAG("*", u),
                        C = x += null == b ? 1 : Math.random() || .1,
                        T = E.length;
                    for (u && (c = e === f || e || u); y !== T && null != (h = E[y]); y++) {
                        if (l && h) {
                            for (p = 0, e || h.ownerDocument === f || (d(h), n = !g); m = r[p++];)
                                if (m(h, e || f, n)) {
                                    s.push(h);
                                    break
                                } u && (x = C)
                        }
                        a && ((h = !m && h) && v--, t && _.push(h))
                    }
                    if (v += y, a && y !== v) {
                        for (p = 0; m = o[p++];) m(_, w, e, n);
                        if (t) {
                            if (0 < v)
                                for (; y--;) _[y] || w[y] || (w[y] = I.call(s));
                            w = xt(w)
                        }
                        j.apply(s, w), u && !t && 0 < w.length && 1 < v + o.length && at.uniqueSort(s)
                    }
                    return u && (x = C, c = b), _
                }, a ? ct(u) : u))).selector = t
            }
            return m
        }, l = at.select = function(t, e, n, r) {
            var o, l, c, u, h, d = "function" == typeof t && t,
                f = !r && s(t = d.selector || t);
            if (n = n || [], 1 === f.length) {
                if (2 < (l = f[0] = f[0].slice(0)).length && "ID" === (c = l[0]).type && 9 === e.nodeType && g && i.relative[l[1].type]) {
                    if (!(e = (i.find.ID(c.matches[0].replace(et, nt), e) || [])[0])) return n;
                    d && (e = e.parentNode), t = t.slice(l.shift().value.length)
                }
                for (o = K.needsContext.test(t) ? 0 : l.length; o-- && (c = l[o], !i.relative[u = c.type]);)
                    if ((h = i.find[u]) && (r = h(c.matches[0].replace(et, nt), tt.test(l[0].type) && vt(e.parentNode) || e))) {
                        if (l.splice(o, 1), !(t = r.length && _t(l))) return j.apply(n, r), n;
                        break
                    }
            }
            return (d || a(t, f))(r, e, !g, n, !e || tt.test(t) && vt(e.parentNode) || e), n
        }, n.sortStable = w.split("").sort(A).join("") === w, n.detectDuplicates = !!h, d(), n.sortDetached = ut(function(t) {
            return 1 & t.compareDocumentPosition(f.createElement("fieldset"))
        }), ut(function(t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || ht("type|href|height|width", function(t, e, n) {
            if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), n.attributes && ut(function(t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || ht("value", function(t, e, n) {
            if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue
        }), ut(function(t) {
            return null == t.getAttribute("disabled")
        }) || ht(H, function(t, e, n) {
            var i;
            if (!n) return !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
        }), at
    }(t);
    b.find = C, b.expr = C.selectors, b.expr[":"] = b.expr.pseudos, b.uniqueSort = b.unique = C.uniqueSort, b.text = C.getText, b.isXMLDoc = C.isXML, b.contains = C.contains, b.escapeSelector = C.escape;
    var T = function(t, e, n) {
            for (var i = [], r = void 0 !== n;
                (t = t[e]) && 9 !== t.nodeType;)
                if (1 === t.nodeType) {
                    if (r && b(t).is(n)) break;
                    i.push(t)
                } return i
        },
        S = function(t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n
        },
        D = b.expr.match.needsContext;

    function A(t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
    }
    var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

    function k(t, e, n) {
        return g(e) ? b.grep(t, function(t, i) {
            return !!e.call(t, i, t) !== n
        }) : e.nodeType ? b.grep(t, function(t) {
            return t === e !== n
        }) : "string" != typeof e ? b.grep(t, function(t) {
            return -1 < l.call(e, t) !== n
        }) : b.filter(e, t, n)
    }
    b.filter = function(t, e, n) {
        var i = e[0];
        return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? b.find.matchesSelector(i, t) ? [i] : [] : b.find.matches(t, b.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, b.fn.extend({
        find: function(t) {
            var e, n, i = this.length,
                r = this;
            if ("string" != typeof t) return this.pushStack(b(t).filter(function() {
                for (e = 0; e < i; e++)
                    if (b.contains(r[e], this)) return !0
            }));
            for (n = this.pushStack([]), e = 0; e < i; e++) b.find(t, r[e], n);
            return 1 < i ? b.uniqueSort(n) : n
        },
        filter: function(t) {
            return this.pushStack(k(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(k(this, t || [], !0))
        },
        is: function(t) {
            return !!k(this, "string" == typeof t && D.test(t) ? b(t) : t || [], !1).length
        }
    });
    var I, O = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (b.fn.init = function(t, e, n) {
        var r, o;
        if (!t) return this;
        if (n = n || I, "string" == typeof t) {
            if (!(r = "<" === t[0] && ">" === t[t.length - 1] && 3 <= t.length ? [null, t, null] : O.exec(t)) || !r[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
            if (r[1]) {
                if (e = e instanceof b ? e[0] : e, b.merge(this, b.parseHTML(r[1], e && e.nodeType ? e.ownerDocument || e : i, !0)), N.test(r[1]) && b.isPlainObject(e))
                    for (r in e) g(this[r]) ? this[r](e[r]) : this.attr(r, e[r]);
                return this
            }
            return (o = i.getElementById(r[2])) && (this[0] = o, this.length = 1), this
        }
        return t.nodeType ? (this[0] = t, this.length = 1, this) : g(t) ? void 0 !== n.ready ? n.ready(t) : t(b) : b.makeArray(t, this)
    }).prototype = b.fn, I = b(i);
    var j = /^(?:parents|prev(?:Until|All))/,
        L = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function P(t, e) {
        for (;
            (t = t[e]) && 1 !== t.nodeType;);
        return t
    }
    b.fn.extend({
        has: function(t) {
            var e = b(t, this),
                n = e.length;
            return this.filter(function() {
                for (var t = 0; t < n; t++)
                    if (b.contains(this, e[t])) return !0
            })
        },
        closest: function(t, e) {
            var n, i = 0,
                r = this.length,
                o = [],
                s = "string" != typeof t && b(t);
            if (!D.test(t))
                for (; i < r; i++)
                    for (n = this[i]; n && n !== e; n = n.parentNode)
                        if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && b.find.matchesSelector(n, t))) {
                            o.push(n);
                            break
                        } return this.pushStack(1 < o.length ? b.uniqueSort(o) : o)
        },
        index: function(t) {
            return t ? "string" == typeof t ? l.call(b(t), this[0]) : l.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(b.uniqueSort(b.merge(this.get(), b(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), b.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return T(t, "parentNode")
        },
        parentsUntil: function(t, e, n) {
            return T(t, "parentNode", n)
        },
        next: function(t) {
            return P(t, "nextSibling")
        },
        prev: function(t) {
            return P(t, "previousSibling")
        },
        nextAll: function(t) {
            return T(t, "nextSibling")
        },
        prevAll: function(t) {
            return T(t, "previousSibling")
        },
        nextUntil: function(t, e, n) {
            return T(t, "nextSibling", n)
        },
        prevUntil: function(t, e, n) {
            return T(t, "previousSibling", n)
        },
        siblings: function(t) {
            return S((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return S(t.firstChild)
        },
        contents: function(t) {
            return void 0 !== t.contentDocument ? t.contentDocument : (A(t, "template") && (t = t.content || t), b.merge([], t.childNodes))
        }
    }, function(t, e) {
        b.fn[t] = function(n, i) {
            var r = b.map(this, e, n);
            return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (r = b.filter(i, r)), 1 < this.length && (L[t] || b.uniqueSort(r), j.test(t) && r.reverse()), this.pushStack(r)
        }
    });
    var H = /[^\x20\t\r\n\f]+/g;

    function R(t) {
        return t
    }

    function M(t) {
        throw t
    }

    function q(t, e, n, i) {
        var r;
        try {
            t && g(r = t.promise) ? r.call(t).done(e).fail(n) : t && g(r = t.then) ? r.call(t, e, n) : e.apply(void 0, [t].slice(i))
        } catch (t) {
            n.apply(void 0, [t])
        }
    }
    b.Callbacks = function(t) {
        var e, n;
        t = "string" == typeof t ? (e = t, n = {}, b.each(e.match(H) || [], function(t, e) {
            n[e] = !0
        }), n) : b.extend({}, t);
        var i, r, o, s, a = [],
            l = [],
            c = -1,
            u = function() {
                for (s = s || t.once, o = i = !0; l.length; c = -1)
                    for (r = l.shift(); ++c < a.length;) !1 === a[c].apply(r[0], r[1]) && t.stopOnFalse && (c = a.length, r = !1);
                t.memory || (r = !1), i = !1, s && (a = r ? [] : "")
            },
            h = {
                add: function() {
                    return a && (r && !i && (c = a.length - 1, l.push(r)), function e(n) {
                        b.each(n, function(n, i) {
                            g(i) ? t.unique && h.has(i) || a.push(i) : i && i.length && "string" !== _(i) && e(i)
                        })
                    }(arguments), r && !i && u()), this
                },
                remove: function() {
                    return b.each(arguments, function(t, e) {
                        for (var n; - 1 < (n = b.inArray(e, a, n));) a.splice(n, 1), n <= c && c--
                    }), this
                },
                has: function(t) {
                    return t ? -1 < b.inArray(t, a) : 0 < a.length
                },
                empty: function() {
                    return a && (a = []), this
                },
                disable: function() {
                    return s = l = [], a = r = "", this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return s = l = [], r || i || (a = r = ""), this
                },
                locked: function() {
                    return !!s
                },
                fireWith: function(t, e) {
                    return s || (e = [t, (e = e || []).slice ? e.slice() : e], l.push(e), i || u()), this
                },
                fire: function() {
                    return h.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return h
    }, b.extend({
        Deferred: function(e) {
            var n = [
                    ["notify", "progress", b.Callbacks("memory"), b.Callbacks("memory"), 2],
                    ["resolve", "done", b.Callbacks("once memory"), b.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", b.Callbacks("once memory"), b.Callbacks("once memory"), 1, "rejected"]
                ],
                i = "pending",
                r = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    catch: function(t) {
                        return r.then(null, t)
                    },
                    pipe: function() {
                        var t = arguments;
                        return b.Deferred(function(e) {
                            b.each(n, function(n, i) {
                                var r = g(t[i[4]]) && t[i[4]];
                                o[i[1]](function() {
                                    var t = r && r.apply(this, arguments);
                                    t && g(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[i[0] + "With"](this, r ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    then: function(e, i, r) {
                        var o = 0;

                        function s(e, n, i, r) {
                            return function() {
                                var a = this,
                                    l = arguments,
                                    c = function() {
                                        var t, c;
                                        if (!(e < o)) {
                                            if ((t = i.apply(a, l)) === n.promise()) throw new TypeError("Thenable self-resolution");
                                            c = t && ("object" == typeof t || "function" == typeof t) && t.then, g(c) ? r ? c.call(t, s(o, n, R, r), s(o, n, M, r)) : (o++, c.call(t, s(o, n, R, r), s(o, n, M, r), s(o, n, R, n.notifyWith))) : (i !== R && (a = void 0, l = [t]), (r || n.resolveWith)(a, l))
                                        }
                                    },
                                    u = r ? c : function() {
                                        try {
                                            c()
                                        } catch (t) {
                                            b.Deferred.exceptionHook && b.Deferred.exceptionHook(t, u.stackTrace), o <= e + 1 && (i !== M && (a = void 0, l = [t]), n.rejectWith(a, l))
                                        }
                                    };
                                e ? u() : (b.Deferred.getStackHook && (u.stackTrace = b.Deferred.getStackHook()), t.setTimeout(u))
                            }
                        }
                        return b.Deferred(function(t) {
                            n[0][3].add(s(0, t, g(r) ? r : R, t.notifyWith)), n[1][3].add(s(0, t, g(e) ? e : R)), n[2][3].add(s(0, t, g(i) ? i : M))
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? b.extend(t, r) : r
                    }
                },
                o = {};
            return b.each(n, function(t, e) {
                var s = e[2],
                    a = e[5];
                r[e[1]] = s.add, a && s.add(function() {
                    i = a
                }, n[3 - t][2].disable, n[3 - t][3].disable, n[0][2].lock, n[0][3].lock), s.add(e[3].fire), o[e[0]] = function() {
                    return o[e[0] + "With"](this === o ? void 0 : this, arguments), this
                }, o[e[0] + "With"] = s.fireWith
            }), r.promise(o), e && e.call(o, o), o
        },
        when: function(t) {
            var e = arguments.length,
                n = e,
                i = Array(n),
                r = o.call(arguments),
                s = b.Deferred(),
                a = function(t) {
                    return function(n) {
                        i[t] = this, r[t] = 1 < arguments.length ? o.call(arguments) : n, --e || s.resolveWith(i, r)
                    }
                };
            if (e <= 1 && (q(t, s.done(a(n)).resolve, s.reject, !e), "pending" === s.state() || g(r[n] && r[n].then))) return s.then();
            for (; n--;) q(r[n], a(n), s.reject);
            return s.promise()
        }
    });
    var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    b.Deferred.exceptionHook = function(e, n) {
        t.console && t.console.warn && e && W.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, n)
    }, b.readyException = function(e) {
        t.setTimeout(function() {
            throw e
        })
    };
    var $ = b.Deferred();

    function F() {
        i.removeEventListener("DOMContentLoaded", F), t.removeEventListener("load", F), b.ready()
    }
    b.fn.ready = function(t) {
        return $.then(t).catch(function(t) {
            b.readyException(t)
        }), this
    }, b.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(t) {
            (!0 === t ? --b.readyWait : b.isReady) || (b.isReady = !0) !== t && 0 < --b.readyWait || $.resolveWith(i, [b])
        }
    }), b.ready.then = $.then, "complete" === i.readyState || "loading" !== i.readyState && !i.documentElement.doScroll ? t.setTimeout(b.ready) : (i.addEventListener("DOMContentLoaded", F), t.addEventListener("load", F));
    var z = function(t, e, n, i, r, o, s) {
            var a = 0,
                l = t.length,
                c = null == n;
            if ("object" === _(n))
                for (a in r = !0, n) z(t, e, a, n[a], !0, o, s);
            else if (void 0 !== i && (r = !0, g(i) || (s = !0), c && (s ? (e.call(t, i), e = null) : (c = e, e = function(t, e, n) {
                    return c.call(b(t), n)
                })), e))
                for (; a < l; a++) e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
            return r ? t : c ? e.call(t) : l ? e(t[0], n) : o
        },
        B = /^-ms-/,
        U = /-([a-z])/g;

    function Q(t, e) {
        return e.toUpperCase()
    }

    function V(t) {
        return t.replace(B, "ms-").replace(U, Q)
    }
    var K = function(t) {
        return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
    };

    function Y() {
        this.expando = b.expando + Y.uid++
    }
    Y.uid = 1, Y.prototype = {
        cache: function(t) {
            var e = t[this.expando];
            return e || (e = {}, K(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                value: e,
                configurable: !0
            }))), e
        },
        set: function(t, e, n) {
            var i, r = this.cache(t);
            if ("string" == typeof e) r[V(e)] = n;
            else
                for (i in e) r[V(i)] = e[i];
            return r
        },
        get: function(t, e) {
            return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][V(e)]
        },
        access: function(t, e, n) {
            return void 0 === e || e && "string" == typeof e && void 0 === n ? this.get(t, e) : (this.set(t, e, n), void 0 !== n ? n : e)
        },
        remove: function(t, e) {
            var n, i = t[this.expando];
            if (void 0 !== i) {
                if (void 0 !== e) {
                    n = (e = Array.isArray(e) ? e.map(V) : (e = V(e)) in i ? [e] : e.match(H) || []).length;
                    for (; n--;) delete i[e[n]]
                }(void 0 === e || b.isEmptyObject(i)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
            }
        },
        hasData: function(t) {
            var e = t[this.expando];
            return void 0 !== e && !b.isEmptyObject(e)
        }
    };
    var X = new Y,
        G = new Y,
        Z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        J = /[A-Z]/g;

    function tt(t, e, n) {
        var i, r;
        if (void 0 === n && 1 === t.nodeType)
            if (i = "data-" + e.replace(J, "-$&").toLowerCase(), "string" == typeof(n = t.getAttribute(i))) {
                try {
                    n = "true" === (r = n) || "false" !== r && ("null" === r ? null : r === +r + "" ? +r : Z.test(r) ? JSON.parse(r) : r)
                } catch (t) {}
                G.set(t, e, n)
            } else n = void 0;
        return n
    }
    b.extend({
        hasData: function(t) {
            return G.hasData(t) || X.hasData(t)
        },
        data: function(t, e, n) {
            return G.access(t, e, n)
        },
        removeData: function(t, e) {
            G.remove(t, e)
        },
        _data: function(t, e, n) {
            return X.access(t, e, n)
        },
        _removeData: function(t, e) {
            X.remove(t, e)
        }
    }), b.fn.extend({
        data: function(t, e) {
            var n, i, r, o = this[0],
                s = o && o.attributes;
            if (void 0 === t) {
                if (this.length && (r = G.get(o), 1 === o.nodeType && !X.get(o, "hasDataAttrs"))) {
                    for (n = s.length; n--;) s[n] && 0 === (i = s[n].name).indexOf("data-") && (i = V(i.slice(5)), tt(o, i, r[i]));
                    X.set(o, "hasDataAttrs", !0)
                }
                return r
            }
            return "object" == typeof t ? this.each(function() {
                G.set(this, t)
            }) : z(this, function(e) {
                var n;
                if (o && void 0 === e) return void 0 !== (n = G.get(o, t)) ? n : void 0 !== (n = tt(o, t)) ? n : void 0;
                this.each(function() {
                    G.set(this, t, e)
                })
            }, null, e, 1 < arguments.length, null, !0)
        },
        removeData: function(t) {
            return this.each(function() {
                G.remove(this, t)
            })
        }
    }), b.extend({
        queue: function(t, e, n) {
            var i;
            if (t) return e = (e || "fx") + "queue", i = X.get(t, e), n && (!i || Array.isArray(n) ? i = X.access(t, e, b.makeArray(n)) : i.push(n)), i || []
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var n = b.queue(t, e),
                i = n.length,
                r = n.shift(),
                o = b._queueHooks(t, e);
            "inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), delete o.stop, r.call(t, function() {
                b.dequeue(t, e)
            }, o)), !i && o && o.empty.fire()
        },
        _queueHooks: function(t, e) {
            var n = e + "queueHooks";
            return X.get(t, n) || X.access(t, n, {
                empty: b.Callbacks("once memory").add(function() {
                    X.remove(t, [e + "queue", n])
                })
            })
        }
    }), b.fn.extend({
        queue: function(t, e) {
            var n = 2;
            return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? b.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var n = b.queue(this, t, e);
                b._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && b.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                b.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var n, i = 1,
                r = b.Deferred(),
                o = this,
                s = this.length,
                a = function() {
                    --i || r.resolveWith(o, [o])
                };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;)(n = X.get(o[s], t + "queueHooks")) && n.empty && (i++, n.empty.add(a));
            return a(), r.promise(e)
        }
    });
    var et = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        nt = new RegExp("^(?:([+-])=|)(" + et + ")([a-z%]*)$", "i"),
        it = ["Top", "Right", "Bottom", "Left"],
        rt = i.documentElement,
        ot = function(t) {
            return b.contains(t.ownerDocument, t)
        },
        st = {
            composed: !0
        };
    rt.attachShadow && (ot = function(t) {
        return b.contains(t.ownerDocument, t) || t.getRootNode(st) === t.ownerDocument
    });
    var at = function(t, e) {
            return "none" === (t = e || t).style.display || "" === t.style.display && ot(t) && "none" === b.css(t, "display")
        },
        lt = function(t, e, n, i) {
            var r, o, s = {};
            for (o in e) s[o] = t.style[o], t.style[o] = e[o];
            for (o in r = n.apply(t, i || []), e) t.style[o] = s[o];
            return r
        };

    function ct(t, e, n, i) {
        var r, o, s = 20,
            a = i ? function() {
                return i.cur()
            } : function() {
                return b.css(t, e, "")
            },
            l = a(),
            c = n && n[3] || (b.cssNumber[e] ? "" : "px"),
            u = t.nodeType && (b.cssNumber[e] || "px" !== c && +l) && nt.exec(b.css(t, e));
        if (u && u[3] !== c) {
            for (l /= 2, c = c || u[3], u = +l || 1; s--;) b.style(t, e, u + c), (1 - o) * (1 - (o = a() / l || .5)) <= 0 && (s = 0), u /= o;
            u *= 2, b.style(t, e, u + c), n = n || []
        }
        return n && (u = +u || +l || 0, r = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = u, i.end = r)), r
    }
    var ut = {};

    function ht(t, e) {
        for (var n, i, r, o, s, a, l, c = [], u = 0, h = t.length; u < h; u++)(i = t[u]).style && (n = i.style.display, e ? ("none" === n && (c[u] = X.get(i, "display") || null, c[u] || (i.style.display = "")), "" === i.style.display && at(i) && (c[u] = (l = s = o = void 0, s = (r = i).ownerDocument, a = r.nodeName, (l = ut[a]) || (o = s.body.appendChild(s.createElement(a)), l = b.css(o, "display"), o.parentNode.removeChild(o), "none" === l && (l = "block"), ut[a] = l)))) : "none" !== n && (c[u] = "none", X.set(i, "display", n)));
        for (u = 0; u < h; u++) null != c[u] && (t[u].style.display = c[u]);
        return t
    }
    b.fn.extend({
        show: function() {
            return ht(this, !0)
        },
        hide: function() {
            return ht(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                at(this) ? b(this).show() : b(this).hide()
            })
        }
    });
    var dt = /^(?:checkbox|radio)$/i,
        ft = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        pt = /^$|^module$|\/(?:java|ecma)script/i,
        gt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };

    function mt(t, e) {
        var n;
        return n = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && A(t, e) ? b.merge([t], n) : n
    }

    function vt(t, e) {
        for (var n = 0, i = t.length; n < i; n++) X.set(t[n], "globalEval", !e || X.get(e[n], "globalEval"))
    }
    gt.optgroup = gt.option, gt.tbody = gt.tfoot = gt.colgroup = gt.caption = gt.thead, gt.th = gt.td;
    var yt, _t, wt = /<|&#?\w+;/;

    function bt(t, e, n, i, r) {
        for (var o, s, a, l, c, u, h = e.createDocumentFragment(), d = [], f = 0, p = t.length; f < p; f++)
            if ((o = t[f]) || 0 === o)
                if ("object" === _(o)) b.merge(d, o.nodeType ? [o] : o);
                else if (wt.test(o)) {
            for (s = s || h.appendChild(e.createElement("div")), a = (ft.exec(o) || ["", ""])[1].toLowerCase(), l = gt[a] || gt._default, s.innerHTML = l[1] + b.htmlPrefilter(o) + l[2], u = l[0]; u--;) s = s.lastChild;
            b.merge(d, s.childNodes), (s = h.firstChild).textContent = ""
        } else d.push(e.createTextNode(o));
        for (h.textContent = "", f = 0; o = d[f++];)
            if (i && -1 < b.inArray(o, i)) r && r.push(o);
            else if (c = ot(o), s = mt(h.appendChild(o), "script"), c && vt(s), n)
            for (u = 0; o = s[u++];) pt.test(o.type || "") && n.push(o);
        return h
    }
    yt = i.createDocumentFragment().appendChild(i.createElement("div")), (_t = i.createElement("input")).setAttribute("type", "radio"), _t.setAttribute("checked", "checked"), _t.setAttribute("name", "t"), yt.appendChild(_t), p.checkClone = yt.cloneNode(!0).cloneNode(!0).lastChild.checked, yt.innerHTML = "<textarea>x</textarea>", p.noCloneChecked = !!yt.cloneNode(!0).lastChild.defaultValue;
    var xt = /^key/,
        Et = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Ct = /^([^.]*)(?:\.(.+)|)/;

    function Tt() {
        return !0
    }

    function St() {
        return !1
    }

    function Dt(t, e) {
        return t === function() {
            try {
                return i.activeElement
            } catch (t) {}
        }() == ("focus" === e)
    }

    function At(t, e, n, i, r, o) {
        var s, a;
        if ("object" == typeof e) {
            for (a in "string" != typeof n && (i = i || n, n = void 0), e) At(t, a, n, i, e[a], o);
            return t
        }
        if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), !1 === r) r = St;
        else if (!r) return t;
        return 1 === o && (s = r, (r = function(t) {
            return b().off(t), s.apply(this, arguments)
        }).guid = s.guid || (s.guid = b.guid++)), t.each(function() {
            b.event.add(this, e, r, i, n)
        })
    }

    function Nt(t, e, n) {
        n ? (X.set(t, e, !1), b.event.add(t, e, {
            namespace: !1,
            handler: function(t) {
                var i, r, s = X.get(this, e);
                if (1 & t.isTrigger && this[e]) {
                    if (s)(b.event.special[e] || {}).delegateType && t.stopPropagation();
                    else if (s = o.call(arguments), X.set(this, e, s), i = n(this, e), this[e](), s !== (r = X.get(this, e)) || i ? X.set(this, e, !1) : r = void 0, s !== r) return t.stopImmediatePropagation(), t.preventDefault(), r
                } else s && (X.set(this, e, b.event.trigger(b.extend(s.shift(), b.Event.prototype), s, this)), t.stopImmediatePropagation())
            }
        })) : b.event.add(t, e, Tt)
    }
    b.event = {
        global: {},
        add: function(t, e, n, i, r) {
            var o, s, a, l, c, u, h, d, f, p, g, m = X.get(t);
            if (m)
                for (n.handler && (n = (o = n).handler, r = o.selector), r && b.find.matchesSelector(rt, r), n.guid || (n.guid = b.guid++), (l = m.events) || (l = m.events = {}), (s = m.handle) || (s = m.handle = function(e) {
                        return void 0 !== b && b.event.triggered !== e.type ? b.event.dispatch.apply(t, arguments) : void 0
                    }), c = (e = (e || "").match(H) || [""]).length; c--;) f = g = (a = Ct.exec(e[c]) || [])[1], p = (a[2] || "").split(".").sort(), f && (h = b.event.special[f] || {}, f = (r ? h.delegateType : h.bindType) || f, h = b.event.special[f] || {}, u = b.extend({
                    type: f,
                    origType: g,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: r,
                    needsContext: r && b.expr.match.needsContext.test(r),
                    namespace: p.join(".")
                }, o), (d = l[f]) || ((d = l[f] = []).delegateCount = 0, h.setup && !1 !== h.setup.call(t, i, p, s) || t.addEventListener && t.addEventListener(f, s)), h.add && (h.add.call(t, u), u.handler.guid || (u.handler.guid = n.guid)), r ? d.splice(d.delegateCount++, 0, u) : d.push(u), b.event.global[f] = !0)
        },
        remove: function(t, e, n, i, r) {
            var o, s, a, l, c, u, h, d, f, p, g, m = X.hasData(t) && X.get(t);
            if (m && (l = m.events)) {
                for (c = (e = (e || "").match(H) || [""]).length; c--;)
                    if (f = g = (a = Ct.exec(e[c]) || [])[1], p = (a[2] || "").split(".").sort(), f) {
                        for (h = b.event.special[f] || {}, d = l[f = (i ? h.delegateType : h.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = d.length; o--;) u = d[o], !r && g !== u.origType || n && n.guid !== u.guid || a && !a.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (d.splice(o, 1), u.selector && d.delegateCount--, h.remove && h.remove.call(t, u));
                        s && !d.length && (h.teardown && !1 !== h.teardown.call(t, p, m.handle) || b.removeEvent(t, f, m.handle), delete l[f])
                    } else
                        for (f in l) b.event.remove(t, f + e[c], n, i, !0);
                b.isEmptyObject(l) && X.remove(t, "handle events")
            }
        },
        dispatch: function(t) {
            var e, n, i, r, o, s, a = b.event.fix(t),
                l = new Array(arguments.length),
                c = (X.get(this, "events") || {})[a.type] || [],
                u = b.event.special[a.type] || {};
            for (l[0] = a, e = 1; e < arguments.length; e++) l[e] = arguments[e];
            if (a.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, a)) {
                for (s = b.event.handlers.call(this, a, c), e = 0;
                    (r = s[e++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = r.elem, n = 0;
                        (o = r.handlers[n++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !1 !== o.namespace && !a.rnamespace.test(o.namespace) || (a.handleObj = o, a.data = o.data, void 0 !== (i = ((b.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, l)) && !1 === (a.result = i) && (a.preventDefault(), a.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(t, e) {
            var n, i, r, o, s, a = [],
                l = e.delegateCount,
                c = t.target;
            if (l && c.nodeType && !("click" === t.type && 1 <= t.button))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== t.type || !0 !== c.disabled)) {
                        for (o = [], s = {}, n = 0; n < l; n++) void 0 === s[r = (i = e[n]).selector + " "] && (s[r] = i.needsContext ? -1 < b(r, this).index(c) : b.find(r, this, null, [c]).length), s[r] && o.push(i);
                        o.length && a.push({
                            elem: c,
                            handlers: o
                        })
                    } return c = this, l < e.length && a.push({
                elem: c,
                handlers: e.slice(l)
            }), a
        },
        addProp: function(t, e) {
            Object.defineProperty(b.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: g(e) ? function() {
                    if (this.originalEvent) return e(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[t]
                },
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(t) {
            return t[b.expando] ? t : new b.Event(t)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(t) {
                    var e = this || t;
                    return dt.test(e.type) && e.click && A(e, "input") && void 0 === X.get(e, "click") && Nt(e, "click", Tt), !1
                },
                trigger: function(t) {
                    var e = this || t;
                    return dt.test(e.type) && e.click && A(e, "input") && void 0 === X.get(e, "click") && Nt(e, "click"), !0
                },
                _default: function(t) {
                    var e = t.target;
                    return dt.test(e.type) && e.click && A(e, "input") && X.get(e, "click") || A(e, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        }
    }, b.removeEvent = function(t, e, n) {
        t.removeEventListener && t.removeEventListener(e, n)
    }, b.Event = function(t, e) {
        if (!(this instanceof b.Event)) return new b.Event(t, e);
        t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? Tt : St, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && b.extend(this, e), this.timeStamp = t && t.timeStamp || Date.now(), this[b.expando] = !0
    }, b.Event.prototype = {
        constructor: b.Event,
        isDefaultPrevented: St,
        isPropagationStopped: St,
        isImmediatePropagationStopped: St,
        isSimulated: !1,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = Tt, t && !this.isSimulated && t.preventDefault()
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = Tt, t && !this.isSimulated && t.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = Tt, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, b.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(t) {
            var e = t.button;
            return null == t.which && xt.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && Et.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
        }
    }, b.event.addProp), b.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        b.event.special[t] = {
            setup: function() {
                return Nt(this, t, Dt), !1
            },
            trigger: function() {
                return Nt(this, t), !0
            },
            delegateType: e
        }
    }), b.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        b.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var n, i = t.relatedTarget,
                    r = t.handleObj;
                return i && (i === this || b.contains(this, i)) || (t.type = r.origType, n = r.handler.apply(this, arguments), t.type = e), n
            }
        }
    }), b.fn.extend({
        on: function(t, e, n, i) {
            return At(this, t, e, n, i)
        },
        one: function(t, e, n, i) {
            return At(this, t, e, n, i, 1)
        },
        off: function(t, e, n) {
            var i, r;
            if (t && t.preventDefault && t.handleObj) return i = t.handleObj, b(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof t) {
                for (r in t) this.off(r, e, t[r]);
                return this
            }
            return !1 !== e && "function" != typeof e || (n = e, e = void 0), !1 === n && (n = St), this.each(function() {
                b.event.remove(this, t, n, e)
            })
        }
    });
    var kt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        It = /<script|<style|<link/i,
        Ot = /checked\s*(?:[^=]|=\s*.checked.)/i,
        jt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Lt(t, e) {
        return A(t, "table") && A(11 !== e.nodeType ? e : e.firstChild, "tr") && b(t).children("tbody")[0] || t
    }

    function Pt(t) {
        return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
    }

    function Ht(t) {
        return "true/" === (t.type || "").slice(0, 5) ? t.type = t.type.slice(5) : t.removeAttribute("type"), t
    }

    function Rt(t, e) {
        var n, i, r, o, s, a, l, c;
        if (1 === e.nodeType) {
            if (X.hasData(t) && (o = X.access(t), s = X.set(e, o), c = o.events))
                for (r in delete s.handle, s.events = {}, c)
                    for (n = 0, i = c[r].length; n < i; n++) b.event.add(e, r, c[r][n]);
            G.hasData(t) && (a = G.access(t), l = b.extend({}, a), G.set(e, l))
        }
    }

    function Mt(t, e, n, i) {
        e = s.apply([], e);
        var r, o, a, l, c, u, h = 0,
            d = t.length,
            f = d - 1,
            m = e[0],
            v = g(m);
        if (v || 1 < d && "string" == typeof m && !p.checkClone && Ot.test(m)) return t.each(function(r) {
            var o = t.eq(r);
            v && (e[0] = m.call(this, r, o.html())), Mt(o, e, n, i)
        });
        if (d && (o = (r = bt(e, t[0].ownerDocument, !1, t, i)).firstChild, 1 === r.childNodes.length && (r = o), o || i)) {
            for (l = (a = b.map(mt(r, "script"), Pt)).length; h < d; h++) c = r, h !== f && (c = b.clone(c, !0, !0), l && b.merge(a, mt(c, "script"))), n.call(t[h], c, h);
            if (l)
                for (u = a[a.length - 1].ownerDocument, b.map(a, Ht), h = 0; h < l; h++) c = a[h], pt.test(c.type || "") && !X.access(c, "globalEval") && b.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? b._evalUrl && !c.noModule && b._evalUrl(c.src, {
                    nonce: c.nonce || c.getAttribute("nonce")
                }) : y(c.textContent.replace(jt, ""), c, u))
        }
        return t
    }

    function qt(t, e, n) {
        for (var i, r = e ? b.filter(e, t) : t, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || b.cleanData(mt(i)), i.parentNode && (n && ot(i) && vt(mt(i, "script")), i.parentNode.removeChild(i));
        return t
    }
    b.extend({
        htmlPrefilter: function(t) {
            return t.replace(kt, "<$1></$2>")
        },
        clone: function(t, e, n) {
            var i, r, o, s, a, l, c, u = t.cloneNode(!0),
                h = ot(t);
            if (!(p.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || b.isXMLDoc(t)))
                for (s = mt(u), i = 0, r = (o = mt(t)).length; i < r; i++) a = o[i], "input" === (c = (l = s[i]).nodeName.toLowerCase()) && dt.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
            if (e)
                if (n)
                    for (o = o || mt(t), s = s || mt(u), i = 0, r = o.length; i < r; i++) Rt(o[i], s[i]);
                else Rt(t, u);
            return 0 < (s = mt(u, "script")).length && vt(s, !h && mt(t, "script")), u
        },
        cleanData: function(t) {
            for (var e, n, i, r = b.event.special, o = 0; void 0 !== (n = t[o]); o++)
                if (K(n)) {
                    if (e = n[X.expando]) {
                        if (e.events)
                            for (i in e.events) r[i] ? b.event.remove(n, i) : b.removeEvent(n, i, e.handle);
                        n[X.expando] = void 0
                    }
                    n[G.expando] && (n[G.expando] = void 0)
                }
        }
    }), b.fn.extend({
        detach: function(t) {
            return qt(this, t, !0)
        },
        remove: function(t) {
            return qt(this, t)
        },
        text: function(t) {
            return z(this, function(t) {
                return void 0 === t ? b.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                })
            }, null, t, arguments.length)
        },
        append: function() {
            return Mt(this, arguments, function(t) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Lt(this, t).appendChild(t)
            })
        },
        prepend: function() {
            return Mt(this, arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = Lt(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return Mt(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return Mt(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (b.cleanData(mt(t, !1)), t.textContent = "");
            return this
        },
        clone: function(t, e) {
            return t = null != t && t, e = null == e ? t : e, this.map(function() {
                return b.clone(this, t, e)
            })
        },
        html: function(t) {
            return z(this, function(t) {
                var e = this[0] || {},
                    n = 0,
                    i = this.length;
                if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                if ("string" == typeof t && !It.test(t) && !gt[(ft.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = b.htmlPrefilter(t);
                    try {
                        for (; n < i; n++) 1 === (e = this[n] || {}).nodeType && (b.cleanData(mt(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (t) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = [];
            return Mt(this, arguments, function(e) {
                var n = this.parentNode;
                b.inArray(this, t) < 0 && (b.cleanData(mt(this)), n && n.replaceChild(e, this))
            }, t)
        }
    }), b.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        b.fn[t] = function(t) {
            for (var n, i = [], r = b(t), o = r.length - 1, s = 0; s <= o; s++) n = s === o ? this : this.clone(!0), b(r[s])[e](n), a.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Wt = new RegExp("^(" + et + ")(?!px)[a-z%]+$", "i"),
        $t = function(e) {
            var n = e.ownerDocument.defaultView;
            return n && n.opener || (n = t), n.getComputedStyle(e)
        },
        Ft = new RegExp(it.join("|"), "i");

    function zt(t, e, n) {
        var i, r, o, s, a = t.style;
        return (n = n || $t(t)) && ("" !== (s = n.getPropertyValue(e) || n[e]) || ot(t) || (s = b.style(t, e)), !p.pixelBoxStyles() && Wt.test(s) && Ft.test(e) && (i = a.width, r = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = r, a.maxWidth = o)), void 0 !== s ? s + "" : s
    }

    function Bt(t, e) {
        return {
            get: function() {
                if (!t()) return (this.get = e).apply(this, arguments);
                delete this.get
            }
        }
    }! function() {
        function e() {
            if (u) {
                c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", rt.appendChild(c).appendChild(u);
                var e = t.getComputedStyle(u);
                r = "1%" !== e.top, l = 12 === n(e.marginLeft), u.style.right = "60%", a = 36 === n(e.right), o = 36 === n(e.width), u.style.position = "absolute", s = 12 === n(u.offsetWidth / 3), rt.removeChild(c), u = null
            }
        }

        function n(t) {
            return Math.round(parseFloat(t))
        }
        var r, o, s, a, l, c = i.createElement("div"),
            u = i.createElement("div");
        u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", p.clearCloneStyle = "content-box" === u.style.backgroundClip, b.extend(p, {
            boxSizingReliable: function() {
                return e(), o
            },
            pixelBoxStyles: function() {
                return e(), a
            },
            pixelPosition: function() {
                return e(), r
            },
            reliableMarginLeft: function() {
                return e(), l
            },
            scrollboxSize: function() {
                return e(), s
            }
        }))
    }();
    var Ut = ["Webkit", "Moz", "ms"],
        Qt = i.createElement("div").style,
        Vt = {};

    function Kt(t) {
        return b.cssProps[t] || Vt[t] || (t in Qt ? t : Vt[t] = function(t) {
            for (var e = t[0].toUpperCase() + t.slice(1), n = Ut.length; n--;)
                if ((t = Ut[n] + e) in Qt) return t
        }(t) || t)
    }
    var Yt = /^(none|table(?!-c[ea]).+)/,
        Xt = /^--/,
        Gt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Zt = {
            letterSpacing: "0",
            fontWeight: "400"
        };

    function Jt(t, e, n) {
        var i = nt.exec(e);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : e
    }

    function te(t, e, n, i, r, o) {
        var s = "width" === e ? 1 : 0,
            a = 0,
            l = 0;
        if (n === (i ? "border" : "content")) return 0;
        for (; s < 4; s += 2) "margin" === n && (l += b.css(t, n + it[s], !0, r)), i ? ("content" === n && (l -= b.css(t, "padding" + it[s], !0, r)), "margin" !== n && (l -= b.css(t, "border" + it[s] + "Width", !0, r))) : (l += b.css(t, "padding" + it[s], !0, r), "padding" !== n ? l += b.css(t, "border" + it[s] + "Width", !0, r) : a += b.css(t, "border" + it[s] + "Width", !0, r));
        return !i && 0 <= o && (l += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - o - l - a - .5)) || 0), l
    }

    function ee(t, e, n) {
        var i = $t(t),
            r = (!p.boxSizingReliable() || n) && "border-box" === b.css(t, "boxSizing", !1, i),
            o = r,
            s = zt(t, e, i),
            a = "offset" + e[0].toUpperCase() + e.slice(1);
        if (Wt.test(s)) {
            if (!n) return s;
            s = "auto"
        }
        return (!p.boxSizingReliable() && r || "auto" === s || !parseFloat(s) && "inline" === b.css(t, "display", !1, i)) && t.getClientRects().length && (r = "border-box" === b.css(t, "boxSizing", !1, i), (o = a in t) && (s = t[a])), (s = parseFloat(s) || 0) + te(t, e, n || (r ? "border" : "content"), o, i, s) + "px"
    }

    function ne(t, e, n, i, r) {
        return new ne.prototype.init(t, e, n, i, r)
    }
    b.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var n = zt(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(t, e, n, i) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var r, o, s, a = V(e),
                    l = Xt.test(e),
                    c = t.style;
                if (l || (e = Kt(a)), s = b.cssHooks[e] || b.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (r = s.get(t, !1, i)) ? r : c[e];
                "string" == (o = typeof n) && (r = nt.exec(n)) && r[1] && (n = ct(t, e, r), o = "number"), null != n && n == n && ("number" !== o || l || (n += r && r[3] || (b.cssNumber[a] ? "" : "px")), p.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (c[e] = "inherit"), s && "set" in s && void 0 === (n = s.set(t, n, i)) || (l ? c.setProperty(e, n) : c[e] = n))
            }
        },
        css: function(t, e, n, i) {
            var r, o, s, a = V(e);
            return Xt.test(e) || (e = Kt(a)), (s = b.cssHooks[e] || b.cssHooks[a]) && "get" in s && (r = s.get(t, !0, n)), void 0 === r && (r = zt(t, e, i)), "normal" === r && e in Zt && (r = Zt[e]), "" === n || n ? (o = parseFloat(r), !0 === n || isFinite(o) ? o || 0 : r) : r
        }
    }), b.each(["height", "width"], function(t, e) {
        b.cssHooks[e] = {
            get: function(t, n, i) {
                if (n) return !Yt.test(b.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? ee(t, e, i) : lt(t, Gt, function() {
                    return ee(t, e, i)
                })
            },
            set: function(t, n, i) {
                var r, o = $t(t),
                    s = !p.scrollboxSize() && "absolute" === o.position,
                    a = (s || i) && "border-box" === b.css(t, "boxSizing", !1, o),
                    l = i ? te(t, e, i, a, o) : 0;
                return a && s && (l -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(o[e]) - te(t, e, "border", !1, o) - .5)), l && (r = nt.exec(n)) && "px" !== (r[3] || "px") && (t.style[e] = n, n = b.css(t, e)), Jt(0, n, l)
            }
        }
    }), b.cssHooks.marginLeft = Bt(p.reliableMarginLeft, function(t, e) {
        if (e) return (parseFloat(zt(t, "marginLeft")) || t.getBoundingClientRect().left - lt(t, {
            marginLeft: 0
        }, function() {
            return t.getBoundingClientRect().left
        })) + "px"
    }), b.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        b.cssHooks[t + e] = {
            expand: function(n) {
                for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[t + it[i] + e] = o[i] || o[i - 2] || o[0];
                return r
            }
        }, "margin" !== t && (b.cssHooks[t + e].set = Jt)
    }), b.fn.extend({
        css: function(t, e) {
            return z(this, function(t, e, n) {
                var i, r, o = {},
                    s = 0;
                if (Array.isArray(e)) {
                    for (i = $t(t), r = e.length; s < r; s++) o[e[s]] = b.css(t, e[s], !1, i);
                    return o
                }
                return void 0 !== n ? b.style(t, e, n) : b.css(t, e)
            }, t, e, 1 < arguments.length)
        }
    }), ((b.Tween = ne).prototype = {
        constructor: ne,
        init: function(t, e, n, i, r, o) {
            this.elem = t, this.prop = n, this.easing = r || b.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = o || (b.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var t = ne.propHooks[this.prop];
            return t && t.get ? t.get(this) : ne.propHooks._default.get(this)
        },
        run: function(t) {
            var e, n = ne.propHooks[this.prop];
            return this.options.duration ? this.pos = e = b.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : ne.propHooks._default.set(this), this
        }
    }).init.prototype = ne.prototype, (ne.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = b.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0
            },
            set: function(t) {
                b.fx.step[t.prop] ? b.fx.step[t.prop](t) : 1 !== t.elem.nodeType || !b.cssHooks[t.prop] && null == t.elem.style[Kt(t.prop)] ? t.elem[t.prop] = t.now : b.style(t.elem, t.prop, t.now + t.unit)
            }
        }
    }).scrollTop = ne.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, b.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        },
        _default: "swing"
    }, b.fx = ne.prototype.init, b.fx.step = {};
    var ie, re, oe, se, ae = /^(?:toggle|show|hide)$/,
        le = /queueHooks$/;

    function ce() {
        re && (!1 === i.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(ce) : t.setTimeout(ce, b.fx.interval), b.fx.tick())
    }

    function ue() {
        return t.setTimeout(function() {
            ie = void 0
        }), ie = Date.now()
    }

    function he(t, e) {
        var n, i = 0,
            r = {
                height: t
            };
        for (e = e ? 1 : 0; i < 4; i += 2 - e) r["margin" + (n = it[i])] = r["padding" + n] = t;
        return e && (r.opacity = r.width = t), r
    }

    function de(t, e, n) {
        for (var i, r = (fe.tweeners[e] || []).concat(fe.tweeners["*"]), o = 0, s = r.length; o < s; o++)
            if (i = r[o].call(n, e, t)) return i
    }

    function fe(t, e, n) {
        var i, r, o = 0,
            s = fe.prefilters.length,
            a = b.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (r) return !1;
                for (var e = ie || ue(), n = Math.max(0, c.startTime + c.duration - e), i = 1 - (n / c.duration || 0), o = 0, s = c.tweens.length; o < s; o++) c.tweens[o].run(i);
                return a.notifyWith(t, [c, i, n]), i < 1 && s ? n : (s || a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c]), !1)
            },
            c = a.promise({
                elem: t,
                props: b.extend({}, e),
                opts: b.extend(!0, {
                    specialEasing: {},
                    easing: b.easing._default
                }, n),
                originalProperties: e,
                originalOptions: n,
                startTime: ie || ue(),
                duration: n.duration,
                tweens: [],
                createTween: function(e, n) {
                    var i = b.Tween(t, c.opts, e, n, c.opts.specialEasing[e] || c.opts.easing);
                    return c.tweens.push(i), i
                },
                stop: function(e) {
                    var n = 0,
                        i = e ? c.tweens.length : 0;
                    if (r) return this;
                    for (r = !0; n < i; n++) c.tweens[n].run(1);
                    return e ? (a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c, e])) : a.rejectWith(t, [c, e]), this
                }
            }),
            u = c.props;
        for (function(t, e) {
                var n, i, r, o, s;
                for (n in t)
                    if (r = e[i = V(n)], o = t[n], Array.isArray(o) && (r = o[1], o = t[n] = o[0]), n !== i && (t[i] = o, delete t[n]), (s = b.cssHooks[i]) && "expand" in s)
                        for (n in o = s.expand(o), delete t[i], o) n in t || (t[n] = o[n], e[n] = r);
                    else e[i] = r
            }(u, c.opts.specialEasing); o < s; o++)
            if (i = fe.prefilters[o].call(c, t, u, c.opts)) return g(i.stop) && (b._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
        return b.map(u, de, c), g(c.opts.start) && c.opts.start.call(t, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), b.fx.timer(b.extend(l, {
            elem: t,
            anim: c,
            queue: c.opts.queue
        })), c
    }
    b.Animation = b.extend(fe, {
        tweeners: {
            "*": [function(t, e) {
                var n = this.createTween(t, e);
                return ct(n.elem, t, nt.exec(e), n), n
            }]
        },
        tweener: function(t, e) {
            g(t) ? (e = t, t = ["*"]) : t = t.match(H);
            for (var n, i = 0, r = t.length; i < r; i++) n = t[i], fe.tweeners[n] = fe.tweeners[n] || [], fe.tweeners[n].unshift(e)
        },
        prefilters: [function(t, e, n) {
            var i, r, o, s, a, l, c, u, h = "width" in e || "height" in e,
                d = this,
                f = {},
                p = t.style,
                g = t.nodeType && at(t),
                m = X.get(t, "fxshow");
            for (i in n.queue || (null == (s = b._queueHooks(t, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || a()
                }), s.unqueued++, d.always(function() {
                    d.always(function() {
                        s.unqueued--, b.queue(t, "fx").length || s.empty.fire()
                    })
                })), e)
                if (r = e[i], ae.test(r)) {
                    if (delete e[i], o = o || "toggle" === r, r === (g ? "hide" : "show")) {
                        if ("show" !== r || !m || void 0 === m[i]) continue;
                        g = !0
                    }
                    f[i] = m && m[i] || b.style(t, i)
                } if ((l = !b.isEmptyObject(e)) || !b.isEmptyObject(f))
                for (i in h && 1 === t.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY], null == (c = m && m.display) && (c = X.get(t, "display")), "none" === (u = b.css(t, "display")) && (c ? u = c : (ht([t], !0), c = t.style.display || c, u = b.css(t, "display"), ht([t]))), ("inline" === u || "inline-block" === u && null != c) && "none" === b.css(t, "float") && (l || (d.done(function() {
                        p.display = c
                    }), null == c && (u = p.display, c = "none" === u ? "" : u)), p.display = "inline-block")), n.overflow && (p.overflow = "hidden", d.always(function() {
                        p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                    })), l = !1, f) l || (m ? "hidden" in m && (g = m.hidden) : m = X.access(t, "fxshow", {
                    display: c
                }), o && (m.hidden = !g), g && ht([t], !0), d.done(function() {
                    for (i in g || ht([t]), X.remove(t, "fxshow"), f) b.style(t, i, f[i])
                })), l = de(g ? m[i] : 0, i, d), i in m || (m[i] = l.start, g && (l.end = l.start, l.start = 0))
        }],
        prefilter: function(t, e) {
            e ? fe.prefilters.unshift(t) : fe.prefilters.push(t)
        }
    }), b.speed = function(t, e, n) {
        var i = t && "object" == typeof t ? b.extend({}, t) : {
            complete: n || !n && e || g(t) && t,
            duration: t,
            easing: n && e || e && !g(e) && e
        };
        return b.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in b.fx.speeds ? i.duration = b.fx.speeds[i.duration] : i.duration = b.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
            g(i.old) && i.old.call(this), i.queue && b.dequeue(this, i.queue)
        }, i
    }, b.fn.extend({
        fadeTo: function(t, e, n, i) {
            return this.filter(at).css("opacity", 0).show().end().animate({
                opacity: e
            }, t, n, i)
        },
        animate: function(t, e, n, i) {
            var r = b.isEmptyObject(t),
                o = b.speed(e, n, i),
                s = function() {
                    var e = fe(this, b.extend({}, t), o);
                    (r || X.get(this, "finish")) && e.stop(!0)
                };
            return s.finish = s, r || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
        },
        stop: function(t, e, n) {
            var i = function(t) {
                var e = t.stop;
                delete t.stop, e(n)
            };
            return "string" != typeof t && (n = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each(function() {
                var e = !0,
                    r = null != t && t + "queueHooks",
                    o = b.timers,
                    s = X.get(this);
                if (r) s[r] && s[r].stop && i(s[r]);
                else
                    for (r in s) s[r] && s[r].stop && le.test(r) && i(s[r]);
                for (r = o.length; r--;) o[r].elem !== this || null != t && o[r].queue !== t || (o[r].anim.stop(n), e = !1, o.splice(r, 1));
                !e && n || b.dequeue(this, t)
            })
        },
        finish: function(t) {
            return !1 !== t && (t = t || "fx"), this.each(function() {
                var e, n = X.get(this),
                    i = n[t + "queue"],
                    r = n[t + "queueHooks"],
                    o = b.timers,
                    s = i ? i.length : 0;
                for (n.finish = !0, b.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                for (e = 0; e < s; e++) i[e] && i[e].finish && i[e].finish.call(this);
                delete n.finish
            })
        }
    }), b.each(["toggle", "show", "hide"], function(t, e) {
        var n = b.fn[e];
        b.fn[e] = function(t, i, r) {
            return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(he(e, !0), t, i, r)
        }
    }), b.each({
        slideDown: he("show"),
        slideUp: he("hide"),
        slideToggle: he("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(t, e) {
        b.fn[t] = function(t, n, i) {
            return this.animate(e, t, n, i)
        }
    }), b.timers = [], b.fx.tick = function() {
        var t, e = 0,
            n = b.timers;
        for (ie = Date.now(); e < n.length; e++)(t = n[e])() || n[e] !== t || n.splice(e--, 1);
        n.length || b.fx.stop(), ie = void 0
    }, b.fx.timer = function(t) {
        b.timers.push(t), b.fx.start()
    }, b.fx.interval = 13, b.fx.start = function() {
        re || (re = !0, ce())
    }, b.fx.stop = function() {
        re = null
    }, b.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, b.fn.delay = function(e, n) {
        return e = b.fx && b.fx.speeds[e] || e, n = n || "fx", this.queue(n, function(n, i) {
            var r = t.setTimeout(n, e);
            i.stop = function() {
                t.clearTimeout(r)
            }
        })
    }, oe = i.createElement("input"), se = i.createElement("select").appendChild(i.createElement("option")), oe.type = "checkbox", p.checkOn = "" !== oe.value, p.optSelected = se.selected, (oe = i.createElement("input")).value = "t", oe.type = "radio", p.radioValue = "t" === oe.value;
    var pe, ge = b.expr.attrHandle;
    b.fn.extend({
        attr: function(t, e) {
            return z(this, b.attr, t, e, 1 < arguments.length)
        },
        removeAttr: function(t) {
            return this.each(function() {
                b.removeAttr(this, t)
            })
        }
    }), b.extend({
        attr: function(t, e, n) {
            var i, r, o = t.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return void 0 === t.getAttribute ? b.prop(t, e, n) : (1 === o && b.isXMLDoc(t) || (r = b.attrHooks[e.toLowerCase()] || (b.expr.match.bool.test(e) ? pe : void 0)), void 0 !== n ? null === n ? void b.removeAttr(t, e) : r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : r && "get" in r && null !== (i = r.get(t, e)) ? i : null == (i = b.find.attr(t, e)) ? void 0 : i)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!p.radioValue && "radio" === e && A(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e), n && (t.value = n), e
                    }
                }
            }
        },
        removeAttr: function(t, e) {
            var n, i = 0,
                r = e && e.match(H);
            if (r && 1 === t.nodeType)
                for (; n = r[i++];) t.removeAttribute(n)
        }
    }), pe = {
        set: function(t, e, n) {
            return !1 === e ? b.removeAttr(t, n) : t.setAttribute(n, n), n
        }
    }, b.each(b.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var n = ge[e] || b.find.attr;
        ge[e] = function(t, e, i) {
            var r, o, s = e.toLowerCase();
            return i || (o = ge[s], ge[s] = r, r = null != n(t, e, i) ? s : null, ge[s] = o), r
        }
    });
    var me = /^(?:input|select|textarea|button)$/i,
        ve = /^(?:a|area)$/i;

    function ye(t) {
        return (t.match(H) || []).join(" ")
    }

    function _e(t) {
        return t.getAttribute && t.getAttribute("class") || ""
    }

    function we(t) {
        return Array.isArray(t) ? t : "string" == typeof t && t.match(H) || []
    }
    b.fn.extend({
        prop: function(t, e) {
            return z(this, b.prop, t, e, 1 < arguments.length)
        },
        removeProp: function(t) {
            return this.each(function() {
                delete this[b.propFix[t] || t]
            })
        }
    }), b.extend({
        prop: function(t, e, n) {
            var i, r, o = t.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && b.isXMLDoc(t) || (e = b.propFix[e] || e, r = b.propHooks[e]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : t[e] = n : r && "get" in r && null !== (i = r.get(t, e)) ? i : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = b.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : me.test(t.nodeName) || ve.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), p.optSelected || (b.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex, null
        },
        set: function(t) {
            var e = t.parentNode;
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
        }
    }), b.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        b.propFix[this.toLowerCase()] = this
    }), b.fn.extend({
        addClass: function(t) {
            var e, n, i, r, o, s, a, l = 0;
            if (g(t)) return this.each(function(e) {
                b(this).addClass(t.call(this, e, _e(this)))
            });
            if ((e = we(t)).length)
                for (; n = this[l++];)
                    if (r = _e(n), i = 1 === n.nodeType && " " + ye(r) + " ") {
                        for (s = 0; o = e[s++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                        r !== (a = ye(i)) && n.setAttribute("class", a)
                    } return this
        },
        removeClass: function(t) {
            var e, n, i, r, o, s, a, l = 0;
            if (g(t)) return this.each(function(e) {
                b(this).removeClass(t.call(this, e, _e(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ((e = we(t)).length)
                for (; n = this[l++];)
                    if (r = _e(n), i = 1 === n.nodeType && " " + ye(r) + " ") {
                        for (s = 0; o = e[s++];)
                            for (; - 1 < i.indexOf(" " + o + " ");) i = i.replace(" " + o + " ", " ");
                        r !== (a = ye(i)) && n.setAttribute("class", a)
                    } return this
        },
        toggleClass: function(t, e) {
            var n = typeof t,
                i = "string" === n || Array.isArray(t);
            return "boolean" == typeof e && i ? e ? this.addClass(t) : this.removeClass(t) : g(t) ? this.each(function(n) {
                b(this).toggleClass(t.call(this, n, _e(this), e), e)
            }) : this.each(function() {
                var e, r, o, s;
                if (i)
                    for (r = 0, o = b(this), s = we(t); e = s[r++];) o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                else void 0 !== t && "boolean" !== n || ((e = _e(this)) && X.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : X.get(this, "__className__") || ""))
            })
        },
        hasClass: function(t) {
            var e, n, i = 0;
            for (e = " " + t + " "; n = this[i++];)
                if (1 === n.nodeType && -1 < (" " + ye(_e(n)) + " ").indexOf(e)) return !0;
            return !1
        }
    });
    var be = /\r/g;
    b.fn.extend({
        val: function(t) {
            var e, n, i, r = this[0];
            return arguments.length ? (i = g(t), this.each(function(n) {
                var r;
                1 === this.nodeType && (null == (r = i ? t.call(this, n, b(this).val()) : t) ? r = "" : "number" == typeof r ? r += "" : Array.isArray(r) && (r = b.map(r, function(t) {
                    return null == t ? "" : t + ""
                })), (e = b.valHooks[this.type] || b.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r))
            })) : r ? (e = b.valHooks[r.type] || b.valHooks[r.nodeName.toLowerCase()]) && "get" in e && void 0 !== (n = e.get(r, "value")) ? n : "string" == typeof(n = r.value) ? n.replace(be, "") : null == n ? "" : n : void 0
        }
    }), b.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = b.find.attr(t, "value");
                    return null != e ? e : ye(b.text(t))
                }
            },
            select: {
                get: function(t) {
                    var e, n, i, r = t.options,
                        o = t.selectedIndex,
                        s = "select-one" === t.type,
                        a = s ? null : [],
                        l = s ? o + 1 : r.length;
                    for (i = o < 0 ? l : s ? o : 0; i < l; i++)
                        if (((n = r[i]).selected || i === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
                            if (e = b(n).val(), s) return e;
                            a.push(e)
                        } return a
                },
                set: function(t, e) {
                    for (var n, i, r = t.options, o = b.makeArray(e), s = r.length; s--;)((i = r[s]).selected = -1 < b.inArray(b.valHooks.option.get(i), o)) && (n = !0);
                    return n || (t.selectedIndex = -1), o
                }
            }
        }
    }), b.each(["radio", "checkbox"], function() {
        b.valHooks[this] = {
            set: function(t, e) {
                if (Array.isArray(e)) return t.checked = -1 < b.inArray(b(t).val(), e)
            }
        }, p.checkOn || (b.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    }), p.focusin = "onfocusin" in t;
    var xe = /^(?:focusinfocus|focusoutblur)$/,
        Ee = function(t) {
            t.stopPropagation()
        };
    b.extend(b.event, {
        trigger: function(e, n, r, o) {
            var s, a, l, c, u, d, f, p, v = [r || i],
                y = h.call(e, "type") ? e.type : e,
                _ = h.call(e, "namespace") ? e.namespace.split(".") : [];
            if (a = p = l = r = r || i, 3 !== r.nodeType && 8 !== r.nodeType && !xe.test(y + b.event.triggered) && (-1 < y.indexOf(".") && (y = (_ = y.split(".")).shift(), _.sort()), u = y.indexOf(":") < 0 && "on" + y, (e = e[b.expando] ? e : new b.Event(y, "object" == typeof e && e)).isTrigger = o ? 2 : 3, e.namespace = _.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + _.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), n = null == n ? [e] : b.makeArray(n, [e]), f = b.event.special[y] || {}, o || !f.trigger || !1 !== f.trigger.apply(r, n))) {
                if (!o && !f.noBubble && !m(r)) {
                    for (c = f.delegateType || y, xe.test(c + y) || (a = a.parentNode); a; a = a.parentNode) v.push(a), l = a;
                    l === (r.ownerDocument || i) && v.push(l.defaultView || l.parentWindow || t)
                }
                for (s = 0;
                    (a = v[s++]) && !e.isPropagationStopped();) p = a, e.type = 1 < s ? c : f.bindType || y, (d = (X.get(a, "events") || {})[e.type] && X.get(a, "handle")) && d.apply(a, n), (d = u && a[u]) && d.apply && K(a) && (e.result = d.apply(a, n), !1 === e.result && e.preventDefault());
                return e.type = y, o || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(v.pop(), n) || !K(r) || u && g(r[y]) && !m(r) && ((l = r[u]) && (r[u] = null), b.event.triggered = y, e.isPropagationStopped() && p.addEventListener(y, Ee), r[y](), e.isPropagationStopped() && p.removeEventListener(y, Ee), b.event.triggered = void 0, l && (r[u] = l)), e.result
            }
        },
        simulate: function(t, e, n) {
            var i = b.extend(new b.Event, n, {
                type: t,
                isSimulated: !0
            });
            b.event.trigger(i, null, e)
        }
    }), b.fn.extend({
        trigger: function(t, e) {
            return this.each(function() {
                b.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var n = this[0];
            if (n) return b.event.trigger(t, e, n, !0)
        }
    }), p.focusin || b.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var n = function(t) {
            b.event.simulate(e, t.target, b.event.fix(t))
        };
        b.event.special[e] = {
            setup: function() {
                var i = this.ownerDocument || this,
                    r = X.access(i, e);
                r || i.addEventListener(t, n, !0), X.access(i, e, (r || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                    r = X.access(i, e) - 1;
                r ? X.access(i, e, r) : (i.removeEventListener(t, n, !0), X.remove(i, e))
            }
        }
    });
    var Ce = t.location,
        Te = Date.now(),
        Se = /\?/;
    b.parseXML = function(e) {
        var n;
        if (!e || "string" != typeof e) return null;
        try {
            n = (new t.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || b.error("Invalid XML: " + e), n
    };
    var De = /\[\]$/,
        Ae = /\r?\n/g,
        Ne = /^(?:submit|button|image|reset|file)$/i,
        ke = /^(?:input|select|textarea|keygen)/i;

    function Ie(t, e, n, i) {
        var r;
        if (Array.isArray(e)) b.each(e, function(e, r) {
            n || De.test(t) ? i(t, r) : Ie(t + "[" + ("object" == typeof r && null != r ? e : "") + "]", r, n, i)
        });
        else if (n || "object" !== _(e)) i(t, e);
        else
            for (r in e) Ie(t + "[" + r + "]", e[r], n, i)
    }
    b.param = function(t, e) {
        var n, i = [],
            r = function(t, e) {
                var n = g(e) ? e() : e;
                i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (null == t) return "";
        if (Array.isArray(t) || t.jquery && !b.isPlainObject(t)) b.each(t, function() {
            r(this.name, this.value)
        });
        else
            for (n in t) Ie(n, t[n], e, r);
        return i.join("&")
    }, b.fn.extend({
        serialize: function() {
            return b.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = b.prop(this, "elements");
                return t ? b.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !b(this).is(":disabled") && ke.test(this.nodeName) && !Ne.test(t) && (this.checked || !dt.test(t))
            }).map(function(t, e) {
                var n = b(this).val();
                return null == n ? null : Array.isArray(n) ? b.map(n, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Ae, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: n.replace(Ae, "\r\n")
                }
            }).get()
        }
    });
    var Oe = /%20/g,
        je = /#.*$/,
        Le = /([?&])_=[^&]*/,
        Pe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        He = /^(?:GET|HEAD)$/,
        Re = /^\/\//,
        Me = {},
        qe = {},
        We = "*/".concat("*"),
        $e = i.createElement("a");

    function Fe(t) {
        return function(e, n) {
            "string" != typeof e && (n = e, e = "*");
            var i, r = 0,
                o = e.toLowerCase().match(H) || [];
            if (g(n))
                for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
        }
    }

    function ze(t, e, n, i) {
        var r = {},
            o = t === qe;

        function s(a) {
            var l;
            return r[a] = !0, b.each(t[a] || [], function(t, a) {
                var c = a(e, n, i);
                return "string" != typeof c || o || r[c] ? o ? !(l = c) : void 0 : (e.dataTypes.unshift(c), s(c), !1)
            }), l
        }
        return s(e.dataTypes[0]) || !r["*"] && s("*")
    }

    function Be(t, e) {
        var n, i, r = b.ajaxSettings.flatOptions || {};
        for (n in e) void 0 !== e[n] && ((r[n] ? t : i || (i = {}))[n] = e[n]);
        return i && b.extend(!0, t, i), t
    }
    $e.href = Ce.href, b.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ce.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ce.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": We,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": b.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? Be(Be(t, b.ajaxSettings), e) : Be(b.ajaxSettings, t)
        },
        ajaxPrefilter: Fe(Me),
        ajaxTransport: Fe(qe),
        ajax: function(e, n) {
            "object" == typeof e && (n = e, e = void 0), n = n || {};
            var r, o, s, a, l, c, u, h, d, f, p = b.ajaxSetup({}, n),
                g = p.context || p,
                m = p.context && (g.nodeType || g.jquery) ? b(g) : b.event,
                v = b.Deferred(),
                y = b.Callbacks("once memory"),
                _ = p.statusCode || {},
                w = {},
                x = {},
                E = "canceled",
                C = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (u) {
                            if (!a)
                                for (a = {}; e = Pe.exec(s);) a[e[1].toLowerCase() + " "] = (a[e[1].toLowerCase() + " "] || []).concat(e[2]);
                            e = a[t.toLowerCase() + " "]
                        }
                        return null == e ? null : e.join(", ")
                    },
                    getAllResponseHeaders: function() {
                        return u ? s : null
                    },
                    setRequestHeader: function(t, e) {
                        return null == u && (t = x[t.toLowerCase()] = x[t.toLowerCase()] || t, w[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return null == u && (p.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (u) C.always(t[C.status]);
                            else
                                for (e in t) _[e] = [_[e], t[e]];
                        return this
                    },
                    abort: function(t) {
                        var e = t || E;
                        return r && r.abort(e), T(0, e), this
                    }
                };
            if (v.promise(C), p.url = ((e || p.url || Ce.href) + "").replace(Re, Ce.protocol + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(H) || [""], null == p.crossDomain) {
                c = i.createElement("a");
                try {
                    c.href = p.url, c.href = c.href, p.crossDomain = $e.protocol + "//" + $e.host != c.protocol + "//" + c.host
                } catch (e) {
                    p.crossDomain = !0
                }
            }
            if (p.data && p.processData && "string" != typeof p.data && (p.data = b.param(p.data, p.traditional)), ze(Me, p, n, C), u) return C;
            for (d in (h = b.event && p.global) && 0 == b.active++ && b.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !He.test(p.type), o = p.url.replace(je, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Oe, "+")) : (f = p.url.slice(o.length), p.data && (p.processData || "string" == typeof p.data) && (o += (Se.test(o) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (o = o.replace(Le, "$1"), f = (Se.test(o) ? "&" : "?") + "_=" + Te++ + f), p.url = o + f), p.ifModified && (b.lastModified[o] && C.setRequestHeader("If-Modified-Since", b.lastModified[o]), b.etag[o] && C.setRequestHeader("If-None-Match", b.etag[o])), (p.data && p.hasContent && !1 !== p.contentType || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + We + "; q=0.01" : "") : p.accepts["*"]), p.headers) C.setRequestHeader(d, p.headers[d]);
            if (p.beforeSend && (!1 === p.beforeSend.call(g, C, p) || u)) return C.abort();
            if (E = "abort", y.add(p.complete), C.done(p.success), C.fail(p.error), r = ze(qe, p, n, C)) {
                if (C.readyState = 1, h && m.trigger("ajaxSend", [C, p]), u) return C;
                p.async && 0 < p.timeout && (l = t.setTimeout(function() {
                    C.abort("timeout")
                }, p.timeout));
                try {
                    u = !1, r.send(w, T)
                } catch (e) {
                    if (u) throw e;
                    T(-1, e)
                }
            } else T(-1, "No Transport");

            function T(e, n, i, a) {
                var c, d, f, w, x, E = n;
                u || (u = !0, l && t.clearTimeout(l), r = void 0, s = a || "", C.readyState = 0 < e ? 4 : 0, c = 200 <= e && e < 300 || 304 === e, i && (w = function(t, e, n) {
                    for (var i, r, o, s, a = t.contents, l = t.dataTypes;
                        "*" === l[0];) l.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
                    if (i)
                        for (r in a)
                            if (a[r] && a[r].test(i)) {
                                l.unshift(r);
                                break
                            } if (l[0] in n) o = l[0];
                    else {
                        for (r in n) {
                            if (!l[0] || t.converters[r + " " + l[0]]) {
                                o = r;
                                break
                            }
                            s || (s = r)
                        }
                        o = o || s
                    }
                    if (o) return o !== l[0] && l.unshift(o), n[o]
                }(p, C, i)), w = function(t, e, n, i) {
                    var r, o, s, a, l, c = {},
                        u = t.dataTypes.slice();
                    if (u[1])
                        for (s in t.converters) c[s.toLowerCase()] = t.converters[s];
                    for (o = u.shift(); o;)
                        if (t.responseFields[o] && (n[t.responseFields[o]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = u.shift())
                            if ("*" === o) o = l;
                            else if ("*" !== l && l !== o) {
                        if (!(s = c[l + " " + o] || c["* " + o]))
                            for (r in c)
                                if ((a = r.split(" "))[1] === o && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                                    !0 === s ? s = c[r] : !0 !== c[r] && (o = a[0], u.unshift(a[1]));
                                    break
                                } if (!0 !== s)
                            if (s && t.throws) e = s(e);
                            else try {
                                e = s(e)
                            } catch (t) {
                                return {
                                    state: "parsererror",
                                    error: s ? t : "No conversion from " + l + " to " + o
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: e
                    }
                }(p, w, C, c), c ? (p.ifModified && ((x = C.getResponseHeader("Last-Modified")) && (b.lastModified[o] = x), (x = C.getResponseHeader("etag")) && (b.etag[o] = x)), 204 === e || "HEAD" === p.type ? E = "nocontent" : 304 === e ? E = "notmodified" : (E = w.state, d = w.data, c = !(f = w.error))) : (f = E, !e && E || (E = "error", e < 0 && (e = 0))), C.status = e, C.statusText = (n || E) + "", c ? v.resolveWith(g, [d, E, C]) : v.rejectWith(g, [C, E, f]), C.statusCode(_), _ = void 0, h && m.trigger(c ? "ajaxSuccess" : "ajaxError", [C, p, c ? d : f]), y.fireWith(g, [C, E]), h && (m.trigger("ajaxComplete", [C, p]), --b.active || b.event.trigger("ajaxStop")))
            }
            return C
        },
        getJSON: function(t, e, n) {
            return b.get(t, e, n, "json")
        },
        getScript: function(t, e) {
            return b.get(t, void 0, e, "script")
        }
    }), b.each(["get", "post"], function(t, e) {
        b[e] = function(t, n, i, r) {
            return g(n) && (r = r || i, i = n, n = void 0), b.ajax(b.extend({
                url: t,
                type: e,
                dataType: r,
                data: n,
                success: i
            }, b.isPlainObject(t) && t))
        }
    }), b._evalUrl = function(t, e) {
        return b.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(t) {
                b.globalEval(t, e)
            }
        })
    }, b.fn.extend({
        wrapAll: function(t) {
            var e;
            return this[0] && (g(t) && (t = t.call(this[0])), e = b(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                return t
            }).append(this)), this
        },
        wrapInner: function(t) {
            return g(t) ? this.each(function(e) {
                b(this).wrapInner(t.call(this, e))
            }) : this.each(function() {
                var e = b(this),
                    n = e.contents();
                n.length ? n.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = g(t);
            return this.each(function(n) {
                b(this).wrapAll(e ? t.call(this, n) : t)
            })
        },
        unwrap: function(t) {
            return this.parent(t).not("body").each(function() {
                b(this).replaceWith(this.childNodes)
            }), this
        }
    }), b.expr.pseudos.hidden = function(t) {
        return !b.expr.pseudos.visible(t)
    }, b.expr.pseudos.visible = function(t) {
        return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
    }, b.ajaxSettings.xhr = function() {
        try {
            return new t.XMLHttpRequest
        } catch (t) {}
    };
    var Ue = {
            0: 200,
            1223: 204
        },
        Qe = b.ajaxSettings.xhr();
    p.cors = !!Qe && "withCredentials" in Qe, p.ajax = Qe = !!Qe, b.ajaxTransport(function(e) {
        var n, i;
        if (p.cors || Qe && !e.crossDomain) return {
            send: function(r, o) {
                var s, a = e.xhr();
                if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                    for (s in e.xhrFields) a[s] = e.xhrFields[s];
                for (s in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest"), r) a.setRequestHeader(s, r[s]);
                n = function(t) {
                    return function() {
                        n && (n = i = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, "abort" === t ? a.abort() : "error" === t ? "number" != typeof a.status ? o(0, "error") : o(a.status, a.statusText) : o(Ue[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                            binary: a.response
                        } : {
                            text: a.responseText
                        }, a.getAllResponseHeaders()))
                    }
                }, a.onload = n(), i = a.onerror = a.ontimeout = n("error"), void 0 !== a.onabort ? a.onabort = i : a.onreadystatechange = function() {
                    4 === a.readyState && t.setTimeout(function() {
                        n && i()
                    })
                }, n = n("abort");
                try {
                    a.send(e.hasContent && e.data || null)
                } catch (r) {
                    if (n) throw r
                }
            },
            abort: function() {
                n && n()
            }
        }
    }), b.ajaxPrefilter(function(t) {
        t.crossDomain && (t.contents.script = !1)
    }), b.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(t) {
                return b.globalEval(t), t
            }
        }
    }), b.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
    }), b.ajaxTransport("script", function(t) {
        var e, n;
        if (t.crossDomain || t.scriptAttrs) return {
            send: function(r, o) {
                e = b("<script>").attr(t.scriptAttrs || {}).prop({
                    charset: t.scriptCharset,
                    src: t.url
                }).on("load error", n = function(t) {
                    e.remove(), n = null, t && o("error" === t.type ? 404 : 200, t.type)
                }), i.head.appendChild(e[0])
            },
            abort: function() {
                n && n()
            }
        }
    });
    var Ve, Ke = [],
        Ye = /(=)\?(?=&|$)|\?\?/;
    b.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = Ke.pop() || b.expando + "_" + Te++;
            return this[t] = !0, t
        }
    }), b.ajaxPrefilter("json jsonp", function(e, n, i) {
        var r, o, s, a = !1 !== e.jsonp && (Ye.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ye.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = g(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Ye, "$1" + r) : !1 !== e.jsonp && (e.url += (Se.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
            return s || b.error(r + " was not called"), s[0]
        }, e.dataTypes[0] = "json", o = t[r], t[r] = function() {
            s = arguments
        }, i.always(function() {
            void 0 === o ? b(t).removeProp(r) : t[r] = o, e[r] && (e.jsonpCallback = n.jsonpCallback, Ke.push(r)), s && g(o) && o(s[0]), s = o = void 0
        }), "script"
    }), p.createHTMLDocument = ((Ve = i.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Ve.childNodes.length), b.parseHTML = function(t, e, n) {
        return "string" != typeof t ? [] : ("boolean" == typeof e && (n = e, e = !1), e || (p.createHTMLDocument ? ((r = (e = i.implementation.createHTMLDocument("")).createElement("base")).href = i.location.href, e.head.appendChild(r)) : e = i), s = !n && [], (o = N.exec(t)) ? [e.createElement(o[1])] : (o = bt([t], e, s), s && s.length && b(s).remove(), b.merge([], o.childNodes)));
        var r, o, s
    }, b.fn.load = function(t, e, n) {
        var i, r, o, s = this,
            a = t.indexOf(" ");
        return -1 < a && (i = ye(t.slice(a)), t = t.slice(0, a)), g(e) ? (n = e, e = void 0) : e && "object" == typeof e && (r = "POST"), 0 < s.length && b.ajax({
            url: t,
            type: r || "GET",
            dataType: "html",
            data: e
        }).done(function(t) {
            o = arguments, s.html(i ? b("<div>").append(b.parseHTML(t)).find(i) : t)
        }).always(n && function(t, e) {
            s.each(function() {
                n.apply(this, o || [t.responseText, e, t])
            })
        }), this
    }, b.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        b.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), b.expr.pseudos.animated = function(t) {
        return b.grep(b.timers, function(e) {
            return t === e.elem
        }).length
    }, b.offset = {
        setOffset: function(t, e, n) {
            var i, r, o, s, a, l, c = b.css(t, "position"),
                u = b(t),
                h = {};
            "static" === c && (t.style.position = "relative"), a = u.offset(), o = b.css(t, "top"), l = b.css(t, "left"), ("absolute" === c || "fixed" === c) && -1 < (o + l).indexOf("auto") ? (s = (i = u.position()).top, r = i.left) : (s = parseFloat(o) || 0, r = parseFloat(l) || 0), g(e) && (e = e.call(t, n, b.extend({}, a))), null != e.top && (h.top = e.top - a.top + s), null != e.left && (h.left = e.left - a.left + r), "using" in e ? e.using.call(t, h) : u.css(h)
        }
    }, b.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                b.offset.setOffset(this, t, e)
            });
            var e, n, i = this[0];
            return i ? i.getClientRects().length ? (e = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, {
                top: e.top + n.pageYOffset,
                left: e.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var t, e, n, i = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === b.css(i, "position")) e = i.getBoundingClientRect();
                else {
                    for (e = this.offset(), n = i.ownerDocument, t = i.offsetParent || n.documentElement; t && (t === n.body || t === n.documentElement) && "static" === b.css(t, "position");) t = t.parentNode;
                    t && t !== i && 1 === t.nodeType && ((r = b(t).offset()).top += b.css(t, "borderTopWidth", !0), r.left += b.css(t, "borderLeftWidth", !0))
                }
                return {
                    top: e.top - r.top - b.css(i, "marginTop", !0),
                    left: e.left - r.left - b.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent; t && "static" === b.css(t, "position");) t = t.offsetParent;
                return t || rt
            })
        }
    }), b.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, e) {
        var n = "pageYOffset" === e;
        b.fn[t] = function(i) {
            return z(this, function(t, i, r) {
                var o;
                if (m(t) ? o = t : 9 === t.nodeType && (o = t.defaultView), void 0 === r) return o ? o[e] : t[i];
                o ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset) : t[i] = r
            }, t, i, arguments.length)
        }
    }), b.each(["top", "left"], function(t, e) {
        b.cssHooks[e] = Bt(p.pixelPosition, function(t, n) {
            if (n) return n = zt(t, e), Wt.test(n) ? b(t).position()[e] + "px" : n
        })
    }), b.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        b.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(n, i) {
            b.fn[i] = function(r, o) {
                var s = arguments.length && (n || "boolean" != typeof r),
                    a = n || (!0 === r || !0 === o ? "margin" : "border");
                return z(this, function(e, n, r) {
                    var o;
                    return m(e) ? 0 === i.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (o = e.documentElement, Math.max(e.body["scroll" + t], o["scroll" + t], e.body["offset" + t], o["offset" + t], o["client" + t])) : void 0 === r ? b.css(e, n, a) : b.style(e, n, r, a)
                }, e, s ? r : void 0, s)
            }
        })
    }), b.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, e) {
        b.fn[e] = function(t, n) {
            return 0 < arguments.length ? this.on(e, null, t, n) : this.trigger(e)
        }
    }), b.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        }
    }), b.fn.extend({
        bind: function(t, e, n) {
            return this.on(t, null, e, n)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, n, i) {
            return this.on(e, t, n, i)
        },
        undelegate: function(t, e, n) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
        }
    }), b.proxy = function(t, e) {
        var n, i, r;
        if ("string" == typeof e && (n = t[e], e = t, t = n), g(t)) return i = o.call(arguments, 2), (r = function() {
            return t.apply(e || this, i.concat(o.call(arguments)))
        }).guid = t.guid = t.guid || b.guid++, r
    }, b.holdReady = function(t) {
        t ? b.readyWait++ : b.ready(!0)
    }, b.isArray = Array.isArray, b.parseJSON = JSON.parse, b.nodeName = A, b.isFunction = g, b.isWindow = m, b.camelCase = V, b.type = _, b.now = Date.now, b.isNumeric = function(t) {
        var e = b.type(t);
        return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return b
    });
    var Xe = t.jQuery,
        Ge = t.$;
    return b.noConflict = function(e) {
        return t.$ === b && (t.$ = Ge), e && t.jQuery === b && (t.jQuery = Xe), b
    }, e || (t.jQuery = t.$ = b), b
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, e, n) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function r(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function o(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {},
                i = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function(t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable
            }))), i.forEach(function(e) {
                var i, r, o;
                i = t, o = n[r = e], r in i ? Object.defineProperty(i, r, {
                    value: o,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : i[r] = o
            })
        }
        return t
    }
    e = e && e.hasOwnProperty("default") ? e.default : e, n = n && n.hasOwnProperty("default") ? n.default : n;
    var s = "transitionend";
    var a = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function(t) {
            for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
            return t
        },
        getSelectorFromElement: function(t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : ""
            }
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        },
        getTransitionDurationFromElement: function(t) {
            if (!t) return 0;
            var n = e(t).css("transition-duration"),
                i = e(t).css("transition-delay"),
                r = parseFloat(n),
                o = parseFloat(i);
            return r || o ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0
        },
        reflow: function(t) {
            return t.offsetHeight
        },
        triggerTransitionEnd: function(t) {
            e(t).trigger(s)
        },
        supportsTransitionEnd: function() {
            return Boolean(s)
        },
        isElement: function(t) {
            return (t[0] || t).nodeType
        },
        typeCheckConfig: function(t, e, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var r = n[i],
                        o = e[i],
                        s = o && a.isElement(o) ? "element" : (l = o, {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase());
                    if (!new RegExp(r).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + r + '".')
                } var l
        },
        findShadowRoot: function(t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? a.findShadowRoot(t.parentNode) : null;
            var e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null
        }
    };
    e.fn.emulateTransitionEnd = function(t) {
        var n = this,
            i = !1;
        return e(this).one(a.TRANSITION_END, function() {
            i = !0
        }), setTimeout(function() {
            i || a.triggerTransitionEnd(n)
        }, t), this
    }, e.event.special[a.TRANSITION_END] = {
        bindType: s,
        delegateType: s,
        handle: function(t) {
            if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var l = "alert",
        c = "bs.alert",
        u = "." + c,
        h = e.fn[l],
        d = {
            CLOSE: "close" + u,
            CLOSED: "closed" + u,
            CLICK_DATA_API: "click" + u + ".data-api"
        },
        f = function() {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.close = function(t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, n.dispose = function() {
                e.removeData(this._element, c), this._element = null
            }, n._getRootElement = function(t) {
                var n = a.getSelectorFromElement(t),
                    i = !1;
                return n && (i = document.querySelector(n)), i || (i = e(t).closest(".alert")[0]), i
            }, n._triggerCloseEvent = function(t) {
                var n = e.Event(d.CLOSE);
                return e(t).trigger(n), n
            }, n._removeElement = function(t) {
                var n = this;
                if (e(t).removeClass("show"), e(t).hasClass("fade")) {
                    var i = a.getTransitionDurationFromElement(t);
                    e(t).one(a.TRANSITION_END, function(e) {
                        return n._destroyElement(t, e)
                    }).emulateTransitionEnd(i)
                } else this._destroyElement(t)
            }, n._destroyElement = function(t) {
                e(t).detach().trigger(d.CLOSED).remove()
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = e(this),
                        r = i.data(c);
                    r || (r = new t(this), i.data(c, r)), "close" === n && r[n](this)
                })
            }, t._handleDismiss = function(t) {
                return function(e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, r(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), t
        }();
    e(document).on(d.CLICK_DATA_API, '[data-dismiss="alert"]', f._handleDismiss(new f)), e.fn[l] = f._jQueryInterface, e.fn[l].Constructor = f, e.fn[l].noConflict = function() {
        return e.fn[l] = h, f._jQueryInterface
    };
    var p = "button",
        g = "bs.button",
        m = "." + g,
        v = ".data-api",
        y = e.fn[p],
        _ = "active",
        w = '[data-toggle^="button"]',
        b = ".btn",
        x = {
            CLICK_DATA_API: "click" + m + v,
            FOCUS_BLUR_DATA_API: "focus" + m + v + " blur" + m + v
        },
        E = function() {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.toggle = function() {
                var t = !0,
                    n = !0,
                    i = e(this._element).closest('[data-toggle="buttons"]')[0];
                if (i) {
                    var r = this._element.querySelector('input:not([type="hidden"])');
                    if (r) {
                        if ("radio" === r.type)
                            if (r.checked && this._element.classList.contains(_)) t = !1;
                            else {
                                var o = i.querySelector(".active");
                                o && e(o).removeClass(_)
                            } if (t) {
                            if (r.hasAttribute("disabled") || i.hasAttribute("disabled") || r.classList.contains("disabled") || i.classList.contains("disabled")) return;
                            r.checked = !this._element.classList.contains(_), e(r).trigger("change")
                        }
                        r.focus(), n = !1
                    }
                }
                n && this._element.setAttribute("aria-pressed", !this._element.classList.contains(_)), t && e(this._element).toggleClass(_)
            }, n.dispose = function() {
                e.removeData(this._element, g), this._element = null
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = e(this).data(g);
                    i || (i = new t(this), e(this).data(g, i)), "toggle" === n && i[n]()
                })
            }, r(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), t
        }();
    e(document).on(x.CLICK_DATA_API, w, function(t) {
        t.preventDefault();
        var n = t.target;
        e(n).hasClass("btn") || (n = e(n).closest(b)), E._jQueryInterface.call(e(n), "toggle")
    }).on(x.FOCUS_BLUR_DATA_API, w, function(t) {
        var n = e(t.target).closest(b)[0];
        e(n).toggleClass("focus", /^focus(in)?$/.test(t.type))
    }), e.fn[p] = E._jQueryInterface, e.fn[p].Constructor = E, e.fn[p].noConflict = function() {
        return e.fn[p] = y, E._jQueryInterface
    };
    var C = "carousel",
        T = "bs.carousel",
        S = "." + T,
        D = ".data-api",
        A = e.fn[C],
        N = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        k = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        I = "next",
        O = "prev",
        j = {
            SLIDE: "slide" + S,
            SLID: "slid" + S,
            KEYDOWN: "keydown" + S,
            MOUSEENTER: "mouseenter" + S,
            MOUSELEAVE: "mouseleave" + S,
            TOUCHSTART: "touchstart" + S,
            TOUCHMOVE: "touchmove" + S,
            TOUCHEND: "touchend" + S,
            POINTERDOWN: "pointerdown" + S,
            POINTERUP: "pointerup" + S,
            DRAG_START: "dragstart" + S,
            LOAD_DATA_API: "load" + S + D,
            CLICK_DATA_API: "click" + S + D
        },
        L = "active",
        P = ".active.carousel-item",
        H = ".carousel-indicators",
        R = {
            TOUCH: "touch",
            PEN: "pen"
        },
        M = function() {
            function t(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(H), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }
            var n = t.prototype;
            return n.next = function() {
                this._isSliding || this._slide(I)
            }, n.nextWhenVisible = function() {
                !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next()
            }, n.prev = function() {
                this._isSliding || this._slide(O)
            }, n.pause = function(t) {
                t || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (a.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, n.cycle = function(t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, n.to = function(t) {
                var n = this;
                this._activeElement = this._element.querySelector(P);
                var i = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) e(this._element).one(j.SLID, function() {
                        return n.to(t)
                    });
                    else {
                        if (i === t) return this.pause(), void this.cycle();
                        var r = i < t ? I : O;
                        this._slide(r, this._items[t])
                    }
            }, n.dispose = function() {
                e(this._element).off(S), e.removeData(this._element, T), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, n._getConfig = function(t) {
                return t = o({}, N, t), a.typeCheckConfig(C, t, k), t
            }, n._handleSwipe = function() {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    0 < e && this.prev(), e < 0 && this.next()
                }
            }, n._addEventListeners = function() {
                var t = this;
                this._config.keyboard && e(this._element).on(j.KEYDOWN, function(e) {
                    return t._keydown(e)
                }), "hover" === this._config.pause && e(this._element).on(j.MOUSEENTER, function(e) {
                    return t.pause(e)
                }).on(j.MOUSELEAVE, function(e) {
                    return t.cycle(e)
                }), this._config.touch && this._addTouchEventListeners()
            }, n._addTouchEventListeners = function() {
                var t = this;
                if (this._touchSupported) {
                    var n = function(e) {
                            t._pointerEvent && R[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX)
                        },
                        i = function(e) {
                            t._pointerEvent && R[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function(e) {
                                return t.cycle(e)
                            }, 500 + t._config.interval))
                        };
                    e(this._element.querySelectorAll(".carousel-item img")).on(j.DRAG_START, function(t) {
                        return t.preventDefault()
                    }), this._pointerEvent ? (e(this._element).on(j.POINTERDOWN, function(t) {
                        return n(t)
                    }), e(this._element).on(j.POINTERUP, function(t) {
                        return i(t)
                    }), this._element.classList.add("pointer-event")) : (e(this._element).on(j.TOUCHSTART, function(t) {
                        return n(t)
                    }), e(this._element).on(j.TOUCHMOVE, function(e) {
                        var n;
                        (n = e).originalEvent.touches && 1 < n.originalEvent.touches.length ? t.touchDeltaX = 0 : t.touchDeltaX = n.originalEvent.touches[0].clientX - t.touchStartX
                    }), e(this._element).on(j.TOUCHEND, function(t) {
                        return i(t)
                    }))
                }
            }, n._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, n._getItemIndex = function(t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(t)
            }, n._getItemByDirection = function(t, e) {
                var n = t === I,
                    i = t === O,
                    r = this._getItemIndex(e),
                    o = this._items.length - 1;
                if ((i && 0 === r || n && r === o) && !this._config.wrap) return e;
                var s = (r + (t === O ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, n._triggerSlideEvent = function(t, n) {
                var i = this._getItemIndex(t),
                    r = this._getItemIndex(this._element.querySelector(P)),
                    o = e.Event(j.SLIDE, {
                        relatedTarget: t,
                        direction: n,
                        from: r,
                        to: i
                    });
                return e(this._element).trigger(o), o
            }, n._setActiveIndicatorElement = function(t) {
                if (this._indicatorsElement) {
                    var n = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
                    e(n).removeClass(L);
                    var i = this._indicatorsElement.children[this._getItemIndex(t)];
                    i && e(i).addClass(L)
                }
            }, n._slide = function(t, n) {
                var i, r, o, s = this,
                    l = this._element.querySelector(P),
                    c = this._getItemIndex(l),
                    u = n || l && this._getItemByDirection(t, l),
                    h = this._getItemIndex(u),
                    d = Boolean(this._interval);
                if (o = t === I ? (i = "carousel-item-left", r = "carousel-item-next", "left") : (i = "carousel-item-right", r = "carousel-item-prev", "right"), u && e(u).hasClass(L)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(u, o).isDefaultPrevented() && l && u) {
                    this._isSliding = !0, d && this.pause(), this._setActiveIndicatorElement(u);
                    var f = e.Event(j.SLID, {
                        relatedTarget: u,
                        direction: o,
                        from: c,
                        to: h
                    });
                    if (e(this._element).hasClass("slide")) {
                        e(u).addClass(r), a.reflow(u), e(l).addClass(i), e(u).addClass(i);
                        var p = parseInt(u.getAttribute("data-interval"), 10);
                        this._config.interval = p ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, p) : this._config.defaultInterval || this._config.interval;
                        var g = a.getTransitionDurationFromElement(l);
                        e(l).one(a.TRANSITION_END, function() {
                            e(u).removeClass(i + " " + r).addClass(L), e(l).removeClass(L + " " + r + " " + i), s._isSliding = !1, setTimeout(function() {
                                return e(s._element).trigger(f)
                            }, 0)
                        }).emulateTransitionEnd(g)
                    } else e(l).removeClass(L), e(u).addClass(L), this._isSliding = !1, e(this._element).trigger(f);
                    d && this.cycle()
                }
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = e(this).data(T),
                        r = o({}, N, e(this).data());
                    "object" == typeof n && (r = o({}, r, n));
                    var s = "string" == typeof n ? n : r.slide;
                    if (i || (i = new t(this, r), e(this).data(T, i)), "number" == typeof n) i.to(n);
                    else if ("string" == typeof s) {
                        if (void 0 === i[s]) throw new TypeError('No method named "' + s + '"');
                        i[s]()
                    } else r.interval && r.ride && (i.pause(), i.cycle())
                })
            }, t._dataApiClickHandler = function(n) {
                var i = a.getSelectorFromElement(this);
                if (i) {
                    var r = e(i)[0];
                    if (r && e(r).hasClass("carousel")) {
                        var s = o({}, e(r).data(), e(this).data()),
                            l = this.getAttribute("data-slide-to");
                        l && (s.interval = !1), t._jQueryInterface.call(e(r), s), l && e(r).data(T).to(l), n.preventDefault()
                    }
                }
            }, r(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return N
                }
            }]), t
        }();
    e(document).on(j.CLICK_DATA_API, "[data-slide], [data-slide-to]", M._dataApiClickHandler), e(window).on(j.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), n = 0, i = t.length; n < i; n++) {
            var r = e(t[n]);
            M._jQueryInterface.call(r, r.data())
        }
    }), e.fn[C] = M._jQueryInterface, e.fn[C].Constructor = M, e.fn[C].noConflict = function() {
        return e.fn[C] = A, M._jQueryInterface
    };
    var q = "collapse",
        W = "bs.collapse",
        $ = "." + W,
        F = e.fn[q],
        z = {
            toggle: !0,
            parent: ""
        },
        B = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        U = {
            SHOW: "show" + $,
            SHOWN: "shown" + $,
            HIDE: "hide" + $,
            HIDDEN: "hidden" + $,
            CLICK_DATA_API: "click" + $ + ".data-api"
        },
        Q = "show",
        V = "collapse",
        K = "collapsing",
        Y = "collapsed",
        X = '[data-toggle="collapse"]',
        G = function() {
            function t(t, e) {
                this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(X)), i = 0, r = n.length; i < r; i++) {
                    var o = n[i],
                        s = a.getSelectorFromElement(o),
                        l = [].slice.call(document.querySelectorAll(s)).filter(function(e) {
                            return e === t
                        });
                    null !== s && 0 < l.length && (this._selector = s, this._triggerArray.push(o))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var n = t.prototype;
            return n.toggle = function() {
                e(this._element).hasClass(Q) ? this.hide() : this.show()
            }, n.show = function() {
                var n, i, r = this;
                if (!(this._isTransitioning || e(this._element).hasClass(Q) || (this._parent && 0 === (n = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function(t) {
                        return "string" == typeof r._config.parent ? t.getAttribute("data-parent") === r._config.parent : t.classList.contains(V)
                    })).length && (n = null), n && (i = e(n).not(this._selector).data(W)) && i._isTransitioning))) {
                    var o = e.Event(U.SHOW);
                    if (e(this._element).trigger(o), !o.isDefaultPrevented()) {
                        n && (t._jQueryInterface.call(e(n).not(this._selector), "hide"), i || e(n).data(W, null));
                        var s = this._getDimension();
                        e(this._element).removeClass(V).addClass(K), this._element.style[s] = 0, this._triggerArray.length && e(this._triggerArray).removeClass(Y).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var l = "scroll" + (s[0].toUpperCase() + s.slice(1)),
                            c = a.getTransitionDurationFromElement(this._element);
                        e(this._element).one(a.TRANSITION_END, function() {
                            e(r._element).removeClass(K).addClass(V).addClass(Q), r._element.style[s] = "", r.setTransitioning(!1), e(r._element).trigger(U.SHOWN)
                        }).emulateTransitionEnd(c), this._element.style[s] = this._element[l] + "px"
                    }
                }
            }, n.hide = function() {
                var t = this;
                if (!this._isTransitioning && e(this._element).hasClass(Q)) {
                    var n = e.Event(U.HIDE);
                    if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                        var i = this._getDimension();
                        this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", a.reflow(this._element), e(this._element).addClass(K).removeClass(V).removeClass(Q);
                        var r = this._triggerArray.length;
                        if (0 < r)
                            for (var o = 0; o < r; o++) {
                                var s = this._triggerArray[o],
                                    l = a.getSelectorFromElement(s);
                                null !== l && (e([].slice.call(document.querySelectorAll(l))).hasClass(Q) || e(s).addClass(Y).attr("aria-expanded", !1))
                            }
                        this.setTransitioning(!0), this._element.style[i] = "";
                        var c = a.getTransitionDurationFromElement(this._element);
                        e(this._element).one(a.TRANSITION_END, function() {
                            t.setTransitioning(!1), e(t._element).removeClass(K).addClass(V).trigger(U.HIDDEN)
                        }).emulateTransitionEnd(c)
                    }
                }
            }, n.setTransitioning = function(t) {
                this._isTransitioning = t
            }, n.dispose = function() {
                e.removeData(this._element, W), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, n._getConfig = function(t) {
                return (t = o({}, z, t)).toggle = Boolean(t.toggle), a.typeCheckConfig(q, t, B), t
            }, n._getDimension = function() {
                return e(this._element).hasClass("width") ? "width" : "height"
            }, n._getParent = function() {
                var n, i = this;
                a.isElement(this._config.parent) ? (n = this._config.parent, void 0 !== this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent);
                var r = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    o = [].slice.call(n.querySelectorAll(r));
                return e(o).each(function(e, n) {
                    i._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n])
                }), n
            }, n._addAriaAndCollapsedClass = function(t, n) {
                var i = e(t).hasClass(Q);
                n.length && e(n).toggleClass(Y, !i).attr("aria-expanded", i)
            }, t._getTargetFromElement = function(t) {
                var e = a.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = e(this),
                        r = i.data(W),
                        s = o({}, z, i.data(), "object" == typeof n && n ? n : {});
                    if (!r && s.toggle && /show|hide/.test(n) && (s.toggle = !1), r || (r = new t(this, s), i.data(W, r)), "string" == typeof n) {
                        if (void 0 === r[n]) throw new TypeError('No method named "' + n + '"');
                        r[n]()
                    }
                })
            }, r(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return z
                }
            }]), t
        }();
    e(document).on(U.CLICK_DATA_API, X, function(t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = e(this),
            i = a.getSelectorFromElement(this),
            r = [].slice.call(document.querySelectorAll(i));
        e(r).each(function() {
            var t = e(this),
                i = t.data(W) ? "toggle" : n.data();
            G._jQueryInterface.call(t, i)
        })
    }), e.fn[q] = G._jQueryInterface, e.fn[q].Constructor = G, e.fn[q].noConflict = function() {
        return e.fn[q] = F, G._jQueryInterface
    };
    var Z = "dropdown",
        J = "bs.dropdown",
        tt = "." + J,
        et = ".data-api",
        nt = e.fn[Z],
        it = new RegExp("38|40|27"),
        rt = {
            HIDE: "hide" + tt,
            HIDDEN: "hidden" + tt,
            SHOW: "show" + tt,
            SHOWN: "shown" + tt,
            CLICK: "click" + tt,
            CLICK_DATA_API: "click" + tt + et,
            KEYDOWN_DATA_API: "keydown" + tt + et,
            KEYUP_DATA_API: "keyup" + tt + et
        },
        ot = "disabled",
        st = "show",
        at = "dropdown-menu-right",
        lt = '[data-toggle="dropdown"]',
        ct = ".dropdown-menu",
        ut = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        },
        ht = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        },
        dt = function() {
            function t(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var i = t.prototype;
            return i.toggle = function() {
                if (!this._element.disabled && !e(this._element).hasClass(ot)) {
                    var i = t._getParentFromElement(this._element),
                        r = e(this._menu).hasClass(st);
                    if (t._clearMenus(), !r) {
                        var o = {
                                relatedTarget: this._element
                            },
                            s = e.Event(rt.SHOW, o);
                        if (e(i).trigger(s), !s.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if (void 0 === n) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                var l = this._element;
                                "parent" === this._config.reference ? l = i : a.isElement(this._config.reference) && (l = this._config.reference, void 0 !== this._config.reference.jquery && (l = this._config.reference[0])), "scrollParent" !== this._config.boundary && e(i).addClass("position-static"), this._popper = new n(l, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === e(i).closest(".navbar-nav").length && e(document.body).children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass(st), e(i).toggleClass(st).trigger(e.Event(rt.SHOWN, o))
                        }
                    }
                }
            }, i.show = function() {
                if (!(this._element.disabled || e(this._element).hasClass(ot) || e(this._menu).hasClass(st))) {
                    var n = {
                            relatedTarget: this._element
                        },
                        i = e.Event(rt.SHOW, n),
                        r = t._getParentFromElement(this._element);
                    e(r).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(st), e(r).toggleClass(st).trigger(e.Event(rt.SHOWN, n)))
                }
            }, i.hide = function() {
                if (!this._element.disabled && !e(this._element).hasClass(ot) && e(this._menu).hasClass(st)) {
                    var n = {
                            relatedTarget: this._element
                        },
                        i = e.Event(rt.HIDE, n),
                        r = t._getParentFromElement(this._element);
                    e(r).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(st), e(r).toggleClass(st).trigger(e.Event(rt.HIDDEN, n)))
                }
            }, i.dispose = function() {
                e.removeData(this._element, J), e(this._element).off(tt), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, i.update = function() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, i._addEventListeners = function() {
                var t = this;
                e(this._element).on(rt.CLICK, function(e) {
                    e.preventDefault(), e.stopPropagation(), t.toggle()
                })
            }, i._getConfig = function(t) {
                return t = o({}, this.constructor.Default, e(this._element).data(), t), a.typeCheckConfig(Z, t, this.constructor.DefaultType), t
            }, i._getMenuElement = function() {
                if (!this._menu) {
                    var e = t._getParentFromElement(this._element);
                    e && (this._menu = e.querySelector(ct))
                }
                return this._menu
            }, i._getPlacement = function() {
                var t = e(this._element.parentNode),
                    n = "bottom-start";
                return t.hasClass("dropup") ? (n = "top-start", e(this._menu).hasClass(at) && (n = "top-end")) : t.hasClass("dropright") ? n = "right-start" : t.hasClass("dropleft") ? n = "left-start" : e(this._menu).hasClass(at) && (n = "bottom-end"), n
            }, i._detectNavbar = function() {
                return 0 < e(this._element).closest(".navbar").length
            }, i._getOffset = function() {
                var t = this,
                    e = {};
                return "function" == typeof this._config.offset ? e.fn = function(e) {
                    return e.offsets = o({}, e.offsets, t._config.offset(e.offsets, t._element) || {}), e
                } : e.offset = this._config.offset, e
            }, i._getPopperConfig = function() {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {
                    enabled: !1
                }), t
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = e(this).data(J);
                    if (i || (i = new t(this, "object" == typeof n ? n : null), e(this).data(J, i)), "string" == typeof n) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, t._clearMenus = function(n) {
                if (!n || 3 !== n.which && ("keyup" !== n.type || 9 === n.which))
                    for (var i = [].slice.call(document.querySelectorAll(lt)), r = 0, o = i.length; r < o; r++) {
                        var s = t._getParentFromElement(i[r]),
                            a = e(i[r]).data(J),
                            l = {
                                relatedTarget: i[r]
                            };
                        if (n && "click" === n.type && (l.clickEvent = n), a) {
                            var c = a._menu;
                            if (e(s).hasClass(st) && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "keyup" === n.type && 9 === n.which) && e.contains(s, n.target))) {
                                var u = e.Event(rt.HIDE, l);
                                e(s).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), i[r].setAttribute("aria-expanded", "false"), e(c).removeClass(st), e(s).removeClass(st).trigger(e.Event(rt.HIDDEN, l)))
                            }
                        }
                    }
            }, t._getParentFromElement = function(t) {
                var e, n = a.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, t._dataApiKeydownHandler = function(n) {
                if ((/input|textarea/i.test(n.target.tagName) ? !(32 === n.which || 27 !== n.which && (40 !== n.which && 38 !== n.which || e(n.target).closest(ct).length)) : it.test(n.which)) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !e(this).hasClass(ot))) {
                    var i = t._getParentFromElement(this),
                        r = e(i).hasClass(st);
                    if (r && (!r || 27 !== n.which && 32 !== n.which)) {
                        var o = [].slice.call(i.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"));
                        if (0 !== o.length) {
                            var s = o.indexOf(n.target);
                            38 === n.which && 0 < s && s--, 40 === n.which && s < o.length - 1 && s++, s < 0 && (s = 0), o[s].focus()
                        }
                    } else {
                        if (27 === n.which) {
                            var a = i.querySelector(lt);
                            e(a).trigger("focus")
                        }
                        e(this).trigger("click")
                    }
                }
            }, r(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return ut
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return ht
                }
            }]), t
        }();
    e(document).on(rt.KEYDOWN_DATA_API, lt, dt._dataApiKeydownHandler).on(rt.KEYDOWN_DATA_API, ct, dt._dataApiKeydownHandler).on(rt.CLICK_DATA_API + " " + rt.KEYUP_DATA_API, dt._clearMenus).on(rt.CLICK_DATA_API, lt, function(t) {
        t.preventDefault(), t.stopPropagation(), dt._jQueryInterface.call(e(this), "toggle")
    }).on(rt.CLICK_DATA_API, ".dropdown form", function(t) {
        t.stopPropagation()
    }), e.fn[Z] = dt._jQueryInterface, e.fn[Z].Constructor = dt, e.fn[Z].noConflict = function() {
        return e.fn[Z] = nt, dt._jQueryInterface
    };
    var ft = "modal",
        pt = "bs.modal",
        gt = "." + pt,
        mt = e.fn[ft],
        vt = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        yt = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        _t = {
            HIDE: "hide" + gt,
            HIDDEN: "hidden" + gt,
            SHOW: "show" + gt,
            SHOWN: "shown" + gt,
            FOCUSIN: "focusin" + gt,
            RESIZE: "resize" + gt,
            CLICK_DISMISS: "click.dismiss" + gt,
            KEYDOWN_DISMISS: "keydown.dismiss" + gt,
            MOUSEUP_DISMISS: "mouseup.dismiss" + gt,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + gt,
            CLICK_DATA_API: "click" + gt + ".data-api"
        },
        wt = "modal-open",
        bt = "fade",
        xt = "show",
        Et = ".modal-dialog",
        Ct = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        Tt = ".sticky-top",
        St = function() {
            function t(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(Et), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }
            var n = t.prototype;
            return n.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t)
            }, n.show = function(t) {
                var n = this;
                if (!this._isShown && !this._isTransitioning) {
                    e(this._element).hasClass(bt) && (this._isTransitioning = !0);
                    var i = e.Event(_t.SHOW, {
                        relatedTarget: t
                    });
                    e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on(_t.CLICK_DISMISS, '[data-dismiss="modal"]', function(t) {
                        return n.hide(t)
                    }), e(this._dialog).on(_t.MOUSEDOWN_DISMISS, function() {
                        e(n._element).one(_t.MOUSEUP_DISMISS, function(t) {
                            e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function() {
                        return n._showElement(t)
                    }))
                }
            }, n.hide = function(t) {
                var n = this;
                if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                    var i = e.Event(_t.HIDE);
                    if (e(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                        this._isShown = !1;
                        var r = e(this._element).hasClass(bt);
                        if (r && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off(_t.FOCUSIN), e(this._element).removeClass(xt), e(this._element).off(_t.CLICK_DISMISS), e(this._dialog).off(_t.MOUSEDOWN_DISMISS), r) {
                            var o = a.getTransitionDurationFromElement(this._element);
                            e(this._element).one(a.TRANSITION_END, function(t) {
                                return n._hideModal(t)
                            }).emulateTransitionEnd(o)
                        } else this._hideModal()
                    }
                }
            }, n.dispose = function() {
                [window, this._element, this._dialog].forEach(function(t) {
                    return e(t).off(gt)
                }), e(document).off(_t.FOCUSIN), e.removeData(this._element, pt), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, n.handleUpdate = function() {
                this._adjustDialog()
            }, n._getConfig = function(t) {
                return t = o({}, vt, t), a.typeCheckConfig(ft, t, yt), t
            }, n._showElement = function(t) {
                var n = this,
                    i = e(this._element).hasClass(bt);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), e(this._dialog).hasClass("modal-dialog-scrollable") ? this._dialog.querySelector(".modal-body").scrollTop = 0 : this._element.scrollTop = 0, i && a.reflow(this._element), e(this._element).addClass(xt), this._config.focus && this._enforceFocus();
                var r = e.Event(_t.SHOWN, {
                        relatedTarget: t
                    }),
                    o = function() {
                        n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(r)
                    };
                if (i) {
                    var s = a.getTransitionDurationFromElement(this._dialog);
                    e(this._dialog).one(a.TRANSITION_END, o).emulateTransitionEnd(s)
                } else o()
            }, n._enforceFocus = function() {
                var t = this;
                e(document).off(_t.FOCUSIN).on(_t.FOCUSIN, function(n) {
                    document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus()
                })
            }, n._setEscapeEvent = function() {
                var t = this;
                this._isShown && this._config.keyboard ? e(this._element).on(_t.KEYDOWN_DISMISS, function(e) {
                    27 === e.which && (e.preventDefault(), t.hide())
                }) : this._isShown || e(this._element).off(_t.KEYDOWN_DISMISS)
            }, n._setResizeEvent = function() {
                var t = this;
                this._isShown ? e(window).on(_t.RESIZE, function(e) {
                    return t.handleUpdate(e)
                }) : e(window).off(_t.RESIZE)
            }, n._hideModal = function() {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function() {
                    e(document.body).removeClass(wt), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(_t.HIDDEN)
                })
            }, n._removeBackdrop = function() {
                this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
            }, n._showBackdrop = function(t) {
                var n = this,
                    i = e(this._element).hasClass(bt) ? bt : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", i && this._backdrop.classList.add(i), e(this._backdrop).appendTo(document.body), e(this._element).on(_t.CLICK_DISMISS, function(t) {
                            n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                        }), i && a.reflow(this._backdrop), e(this._backdrop).addClass(xt), !t) return;
                    if (!i) return void t();
                    var r = a.getTransitionDurationFromElement(this._backdrop);
                    e(this._backdrop).one(a.TRANSITION_END, t).emulateTransitionEnd(r)
                } else if (!this._isShown && this._backdrop) {
                    e(this._backdrop).removeClass(xt);
                    var o = function() {
                        n._removeBackdrop(), t && t()
                    };
                    if (e(this._element).hasClass(bt)) {
                        var s = a.getTransitionDurationFromElement(this._backdrop);
                        e(this._backdrop).one(a.TRANSITION_END, o).emulateTransitionEnd(s)
                    } else o()
                } else t && t()
            }, n._adjustDialog = function() {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, n._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, n._checkScrollbar = function() {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, n._setScrollbar = function() {
                var t = this;
                if (this._isBodyOverflowing) {
                    var n = [].slice.call(document.querySelectorAll(Ct)),
                        i = [].slice.call(document.querySelectorAll(Tt));
                    e(n).each(function(n, i) {
                        var r = i.style.paddingRight,
                            o = e(i).css("padding-right");
                        e(i).data("padding-right", r).css("padding-right", parseFloat(o) + t._scrollbarWidth + "px")
                    }), e(i).each(function(n, i) {
                        var r = i.style.marginRight,
                            o = e(i).css("margin-right");
                        e(i).data("margin-right", r).css("margin-right", parseFloat(o) - t._scrollbarWidth + "px")
                    });
                    var r = document.body.style.paddingRight,
                        o = e(document.body).css("padding-right");
                    e(document.body).data("padding-right", r).css("padding-right", parseFloat(o) + this._scrollbarWidth + "px")
                }
                e(document.body).addClass(wt)
            }, n._resetScrollbar = function() {
                var t = [].slice.call(document.querySelectorAll(Ct));
                e(t).each(function(t, n) {
                    var i = e(n).data("padding-right");
                    e(n).removeData("padding-right"), n.style.paddingRight = i || ""
                });
                var n = [].slice.call(document.querySelectorAll("" + Tt));
                e(n).each(function(t, n) {
                    var i = e(n).data("margin-right");
                    void 0 !== i && e(n).css("margin-right", i).removeData("margin-right")
                });
                var i = e(document.body).data("padding-right");
                e(document.body).removeData("padding-right"), document.body.style.paddingRight = i || ""
            }, n._getScrollbarWidth = function() {
                var t = document.createElement("div");
                t.className = "modal-scrollbar-measure", document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, t._jQueryInterface = function(n, i) {
                return this.each(function() {
                    var r = e(this).data(pt),
                        s = o({}, vt, e(this).data(), "object" == typeof n && n ? n : {});
                    if (r || (r = new t(this, s), e(this).data(pt, r)), "string" == typeof n) {
                        if (void 0 === r[n]) throw new TypeError('No method named "' + n + '"');
                        r[n](i)
                    } else s.show && r.show(i)
                })
            }, r(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return vt
                }
            }]), t
        }();
    e(document).on(_t.CLICK_DATA_API, '[data-toggle="modal"]', function(t) {
        var n, i = this,
            r = a.getSelectorFromElement(this);
        r && (n = document.querySelector(r));
        var s = e(n).data(pt) ? "toggle" : o({}, e(n).data(), e(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var l = e(n).one(_t.SHOW, function(t) {
            t.isDefaultPrevented() || l.one(_t.HIDDEN, function() {
                e(i).is(":visible") && i.focus()
            })
        });
        St._jQueryInterface.call(e(n), s, this)
    }), e.fn[ft] = St._jQueryInterface, e.fn[ft].Constructor = St, e.fn[ft].noConflict = function() {
        return e.fn[ft] = mt, St._jQueryInterface
    };
    var Dt = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        At = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        Nt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;

    function kt(t, e, n) {
        if (0 === t.length) return t;
        if (n && "function" == typeof n) return n(t);
        for (var i = (new window.DOMParser).parseFromString(t, "text/html"), r = Object.keys(e), o = [].slice.call(i.body.querySelectorAll("*")), s = function(t, n) {
                var i = o[t],
                    s = i.nodeName.toLowerCase();
                if (-1 === r.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
                var a = [].slice.call(i.attributes),
                    l = [].concat(e["*"] || [], e[s] || []);
                a.forEach(function(t) {
                    (function(t, e) {
                        var n = t.nodeName.toLowerCase();
                        if (-1 !== e.indexOf(n)) return -1 === Dt.indexOf(n) || Boolean(t.nodeValue.match(At) || t.nodeValue.match(Nt));
                        for (var i = e.filter(function(t) {
                                return t instanceof RegExp
                            }), r = 0, o = i.length; r < o; r++)
                            if (n.match(i[r])) return !0;
                        return !1
                    })(t, l) || i.removeAttribute(t.nodeName)
                })
            }, a = 0, l = o.length; a < l; a++) s(a);
        return i.body.innerHTML
    }
    var It = "tooltip",
        Ot = "bs.tooltip",
        jt = "." + Ot,
        Lt = e.fn[It],
        Pt = "bs-tooltip",
        Ht = new RegExp("(^|\\s)" + Pt + "\\S+", "g"),
        Rt = ["sanitize", "whiteList", "sanitizeFn"],
        Mt = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        },
        qt = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        Wt = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            }
        },
        $t = "show",
        Ft = {
            HIDE: "hide" + jt,
            HIDDEN: "hidden" + jt,
            SHOW: "show" + jt,
            SHOWN: "shown" + jt,
            INSERTED: "inserted" + jt,
            CLICK: "click" + jt,
            FOCUSIN: "focusin" + jt,
            FOCUSOUT: "focusout" + jt,
            MOUSEENTER: "mouseenter" + jt,
            MOUSELEAVE: "mouseleave" + jt
        },
        zt = "fade",
        Bt = "show",
        Ut = "hover",
        Qt = "focus",
        Vt = function() {
            function t(t, e) {
                if (void 0 === n) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            var i = t.prototype;
            return i.enable = function() {
                this._isEnabled = !0
            }, i.disable = function() {
                this._isEnabled = !1
            }, i.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, i.toggle = function(t) {
                if (this._isEnabled)
                    if (t) {
                        var n = this.constructor.DATA_KEY,
                            i = e(t.currentTarget).data(n);
                        i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                    } else {
                        if (e(this.getTipElement()).hasClass(Bt)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, i.dispose = function() {
                clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal"), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, i.show = function() {
                var t = this;
                if ("none" === e(this.element).css("display")) throw new Error("Please use show on visible elements");
                var i = e.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    e(this.element).trigger(i);
                    var r = a.findShadowRoot(this.element),
                        o = e.contains(null !== r ? r : this.element.ownerDocument.documentElement, this.element);
                    if (i.isDefaultPrevented() || !o) return;
                    var s = this.getTipElement(),
                        l = a.getUID(this.constructor.NAME);
                    s.setAttribute("id", l), this.element.setAttribute("aria-describedby", l), this.setContent(), this.config.animation && e(s).addClass(zt);
                    var c = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
                        u = this._getAttachment(c);
                    this.addAttachmentClass(u);
                    var h = this._getContainer();
                    e(s).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(s).appendTo(h), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, s, {
                        placement: u,
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: ".arrow"
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function(e) {
                            e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
                        },
                        onUpdate: function(e) {
                            return t._handlePopperPlacementChange(e)
                        }
                    }), e(s).addClass(Bt), "ontouchstart" in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);
                    var d = function() {
                        t.config.animation && t._fixTransition();
                        var n = t._hoverState;
                        t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), "out" === n && t._leave(null, t)
                    };
                    if (e(this.tip).hasClass(zt)) {
                        var f = a.getTransitionDurationFromElement(this.tip);
                        e(this.tip).one(a.TRANSITION_END, d).emulateTransitionEnd(f)
                    } else d()
                }
            }, i.hide = function(t) {
                var n = this,
                    i = this.getTipElement(),
                    r = e.Event(this.constructor.Event.HIDE),
                    o = function() {
                        n._hoverState !== $t && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), e(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
                    };
                if (e(this.element).trigger(r), !r.isDefaultPrevented()) {
                    if (e(i).removeClass(Bt), "ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), this._activeTrigger.click = !1, this._activeTrigger[Qt] = !1, this._activeTrigger[Ut] = !1, e(this.tip).hasClass(zt)) {
                        var s = a.getTransitionDurationFromElement(i);
                        e(i).one(a.TRANSITION_END, o).emulateTransitionEnd(s)
                    } else o();
                    this._hoverState = ""
                }
            }, i.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, i.isWithContent = function() {
                return Boolean(this.getTitle())
            }, i.addAttachmentClass = function(t) {
                e(this.getTipElement()).addClass(Pt + "-" + t)
            }, i.getTipElement = function() {
                return this.tip = this.tip || e(this.config.template)[0], this.tip
            }, i.setContent = function() {
                var t = this.getTipElement();
                this.setElementContent(e(t.querySelectorAll(".tooltip-inner")), this.getTitle()), e(t).removeClass(zt + " " + Bt)
            }, i.setElementContent = function(t, n) {
                "object" != typeof n || !n.nodeType && !n.jquery ? this.config.html ? (this.config.sanitize && (n = kt(n, this.config.whiteList, this.config.sanitizeFn)), t.html(n)) : t.text(n) : this.config.html ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text())
            }, i.getTitle = function() {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, i._getOffset = function() {
                var t = this,
                    e = {};
                return "function" == typeof this.config.offset ? e.fn = function(e) {
                    return e.offsets = o({}, e.offsets, t.config.offset(e.offsets, t.element) || {}), e
                } : e.offset = this.config.offset, e
            }, i._getContainer = function() {
                return !1 === this.config.container ? document.body : a.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container)
            }, i._getAttachment = function(t) {
                return qt[t.toUpperCase()]
            }, i._setListeners = function() {
                var t = this;
                this.config.trigger.split(" ").forEach(function(n) {
                    if ("click" === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function(e) {
                        return t.toggle(e)
                    });
                    else if ("manual" !== n) {
                        var i = n === Ut ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                            r = n === Ut ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                        e(t.element).on(i, t.config.selector, function(e) {
                            return t._enter(e)
                        }).on(r, t.config.selector, function(e) {
                            return t._leave(e)
                        })
                    }
                }), e(this.element).closest(".modal").on("hide.bs.modal", function() {
                    t.element && t.hide()
                }), this.config.selector ? this.config = o({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, i._fixTitle = function() {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, i._enter = function(t, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? Qt : Ut] = !0), e(n.getTipElement()).hasClass(Bt) || n._hoverState === $t ? n._hoverState = $t : (clearTimeout(n._timeout), n._hoverState = $t, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function() {
                    n._hoverState === $t && n.show()
                }, n.config.delay.show) : n.show())
            }, i._leave = function(t, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? Qt : Ut] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = "out", n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function() {
                    "out" === n._hoverState && n.hide()
                }, n.config.delay.hide) : n.hide())
            }, i._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, i._getConfig = function(t) {
                var n = e(this.element).data();
                return Object.keys(n).forEach(function(t) {
                    -1 !== Rt.indexOf(t) && delete n[t]
                }), "number" == typeof(t = o({}, this.constructor.Default, n, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), a.typeCheckConfig(It, t, this.constructor.DefaultType), t.sanitize && (t.template = kt(t.template, t.whiteList, t.sanitizeFn)), t
            }, i._getDelegateConfig = function() {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, i._cleanTipClass = function() {
                var t = e(this.getTipElement()),
                    n = t.attr("class").match(Ht);
                null !== n && n.length && t.removeClass(n.join(""))
            }, i._handlePopperPlacementChange = function(t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, i._fixTransition = function() {
                var t = this.getTipElement(),
                    n = this.config.animation;
                null === t.getAttribute("x-placement") && (e(t).removeClass(zt), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = e(this).data(Ot),
                        r = "object" == typeof n && n;
                    if ((i || !/dispose|hide/.test(n)) && (i || (i = new t(this, r), e(this).data(Ot, i)), "string" == typeof n)) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, r(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Wt
                }
            }, {
                key: "NAME",
                get: function() {
                    return It
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Ot
                }
            }, {
                key: "Event",
                get: function() {
                    return Ft
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return jt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Mt
                }
            }]), t
        }();
    e.fn[It] = Vt._jQueryInterface, e.fn[It].Constructor = Vt, e.fn[It].noConflict = function() {
        return e.fn[It] = Lt, Vt._jQueryInterface
    };
    var Kt = "popover",
        Yt = "bs.popover",
        Xt = "." + Yt,
        Gt = e.fn[Kt],
        Zt = "bs-popover",
        Jt = new RegExp("(^|\\s)" + Zt + "\\S+", "g"),
        te = o({}, Vt.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        ee = o({}, Vt.DefaultType, {
            content: "(string|element|function)"
        }),
        ne = {
            HIDE: "hide" + Xt,
            HIDDEN: "hidden" + Xt,
            SHOW: "show" + Xt,
            SHOWN: "shown" + Xt,
            INSERTED: "inserted" + Xt,
            CLICK: "click" + Xt,
            FOCUSIN: "focusin" + Xt,
            FOCUSOUT: "focusout" + Xt,
            MOUSEENTER: "mouseenter" + Xt,
            MOUSELEAVE: "mouseleave" + Xt
        },
        ie = function(t) {
            var n, i;

            function o() {
                return t.apply(this, arguments) || this
            }
            i = t, (n = o).prototype = Object.create(i.prototype), (n.prototype.constructor = n).__proto__ = i;
            var s = o.prototype;
            return s.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, s.addAttachmentClass = function(t) {
                e(this.getTipElement()).addClass(Zt + "-" + t)
            }, s.getTipElement = function() {
                return this.tip = this.tip || e(this.config.template)[0], this.tip
            }, s.setContent = function() {
                var t = e(this.getTipElement());
                this.setElementContent(t.find(".popover-header"), this.getTitle());
                var n = this._getContent();
                "function" == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(".popover-body"), n), t.removeClass("fade show")
            }, s._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, s._cleanTipClass = function() {
                var t = e(this.getTipElement()),
                    n = t.attr("class").match(Jt);
                null !== n && 0 < n.length && t.removeClass(n.join(""))
            }, o._jQueryInterface = function(t) {
                return this.each(function() {
                    var n = e(this).data(Yt),
                        i = "object" == typeof t ? t : null;
                    if ((n || !/dispose|hide/.test(t)) && (n || (n = new o(this, i), e(this).data(Yt, n)), "string" == typeof t)) {
                        if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
                        n[t]()
                    }
                })
            }, r(o, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return te
                }
            }, {
                key: "NAME",
                get: function() {
                    return Kt
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Yt
                }
            }, {
                key: "Event",
                get: function() {
                    return ne
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Xt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return ee
                }
            }]), o
        }(Vt);
    e.fn[Kt] = ie._jQueryInterface, e.fn[Kt].Constructor = ie, e.fn[Kt].noConflict = function() {
        return e.fn[Kt] = Gt, ie._jQueryInterface
    };
    var re = "scrollspy",
        oe = "bs.scrollspy",
        se = "." + oe,
        ae = e.fn[re],
        le = {
            offset: 10,
            method: "auto",
            target: ""
        },
        ce = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        ue = {
            ACTIVATE: "activate" + se,
            SCROLL: "scroll" + se,
            LOAD_DATA_API: "load" + se + ".data-api"
        },
        he = "active",
        de = ".nav, .list-group",
        fe = ".nav-link",
        pe = ".list-group-item",
        ge = ".dropdown-item",
        me = "position",
        ve = function() {
            function t(t, n) {
                var i = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " " + fe + "," + this._config.target + " " + pe + "," + this._config.target + " " + ge, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(ue.SCROLL, function(t) {
                    return i._process(t)
                }), this.refresh(), this._process()
            }
            var n = t.prototype;
            return n.refresh = function() {
                var t = this,
                    n = this._scrollElement === this._scrollElement.window ? "offset" : me,
                    i = "auto" === this._config.method ? n : this._config.method,
                    r = i === me ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(t) {
                    var n, o = a.getSelectorFromElement(t);
                    if (o && (n = document.querySelector(o)), n) {
                        var s = n.getBoundingClientRect();
                        if (s.width || s.height) return [e(n)[i]().top + r, o]
                    }
                    return null
                }).filter(function(t) {
                    return t
                }).sort(function(t, e) {
                    return t[0] - e[0]
                }).forEach(function(e) {
                    t._offsets.push(e[0]), t._targets.push(e[1])
                })
            }, n.dispose = function() {
                e.removeData(this._element, oe), e(this._scrollElement).off(se), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, n._getConfig = function(t) {
                if ("string" != typeof(t = o({}, le, "object" == typeof t && t ? t : {})).target) {
                    var n = e(t.target).attr("id");
                    n || (n = a.getUID(re), e(t.target).attr("id", n)), t.target = "#" + n
                }
                return a.typeCheckConfig(re, t, ce), t
            }, n._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, n._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, n._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, n._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), n <= t) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var r = this._offsets.length; r--;) this._activeTarget !== this._targets[r] && t >= this._offsets[r] && (void 0 === this._offsets[r + 1] || t < this._offsets[r + 1]) && this._activate(this._targets[r])
                }
            }, n._activate = function(t) {
                this._activeTarget = t, this._clear();
                var n = this._selector.split(",").map(function(e) {
                        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                    }),
                    i = e([].slice.call(document.querySelectorAll(n.join(","))));
                i.hasClass("dropdown-item") ? (i.closest(".dropdown").find(".dropdown-toggle").addClass(he), i.addClass(he)) : (i.addClass(he), i.parents(de).prev(fe + ", " + pe).addClass(he), i.parents(de).prev(".nav-item").children(fe).addClass(he)), e(this._scrollElement).trigger(ue.ACTIVATE, {
                    relatedTarget: t
                })
            }, n._clear = function() {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function(t) {
                    return t.classList.contains(he)
                }).forEach(function(t) {
                    return t.classList.remove(he)
                })
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = e(this).data(oe);
                    if (i || (i = new t(this, "object" == typeof n && n), e(this).data(oe, i)), "string" == typeof n) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, r(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return le
                }
            }]), t
        }();
    e(window).on(ue.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), n = t.length; n--;) {
            var i = e(t[n]);
            ve._jQueryInterface.call(i, i.data())
        }
    }), e.fn[re] = ve._jQueryInterface, e.fn[re].Constructor = ve, e.fn[re].noConflict = function() {
        return e.fn[re] = ae, ve._jQueryInterface
    };
    var ye = "bs.tab",
        _e = "." + ye,
        we = e.fn.tab,
        be = {
            HIDE: "hide" + _e,
            HIDDEN: "hidden" + _e,
            SHOW: "show" + _e,
            SHOWN: "shown" + _e,
            CLICK_DATA_API: "click" + _e + ".data-api"
        },
        xe = "active",
        Ee = ".active",
        Ce = "> li > .active",
        Te = function() {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.show = function() {
                var t = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(xe) || e(this._element).hasClass("disabled"))) {
                    var n, i, r = e(this._element).closest(".nav, .list-group")[0],
                        o = a.getSelectorFromElement(this._element);
                    if (r) {
                        var s = "UL" === r.nodeName || "OL" === r.nodeName ? Ce : Ee;
                        i = (i = e.makeArray(e(r).find(s)))[i.length - 1]
                    }
                    var l = e.Event(be.HIDE, {
                            relatedTarget: this._element
                        }),
                        c = e.Event(be.SHOW, {
                            relatedTarget: i
                        });
                    if (i && e(i).trigger(l), e(this._element).trigger(c), !c.isDefaultPrevented() && !l.isDefaultPrevented()) {
                        o && (n = document.querySelector(o)), this._activate(this._element, r);
                        var u = function() {
                            var n = e.Event(be.HIDDEN, {
                                    relatedTarget: t._element
                                }),
                                r = e.Event(be.SHOWN, {
                                    relatedTarget: i
                                });
                            e(i).trigger(n), e(t._element).trigger(r)
                        };
                        n ? this._activate(n, n.parentNode, u) : u()
                    }
                }
            }, n.dispose = function() {
                e.removeData(this._element, ye), this._element = null
            }, n._activate = function(t, n, i) {
                var r = this,
                    o = (!n || "UL" !== n.nodeName && "OL" !== n.nodeName ? e(n).children(Ee) : e(n).find(Ce))[0],
                    s = i && o && e(o).hasClass("fade"),
                    l = function() {
                        return r._transitionComplete(t, o, i)
                    };
                if (o && s) {
                    var c = a.getTransitionDurationFromElement(o);
                    e(o).removeClass("show").one(a.TRANSITION_END, l).emulateTransitionEnd(c)
                } else l()
            }, n._transitionComplete = function(t, n, i) {
                if (n) {
                    e(n).removeClass(xe);
                    var r = e(n.parentNode).find("> .dropdown-menu .active")[0];
                    r && e(r).removeClass(xe), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                }
                if (e(t).addClass(xe), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), a.reflow(t), t.classList.contains("fade") && t.classList.add("show"), t.parentNode && e(t.parentNode).hasClass("dropdown-menu")) {
                    var o = e(t).closest(".dropdown")[0];
                    if (o) {
                        var s = [].slice.call(o.querySelectorAll(".dropdown-toggle"));
                        e(s).addClass(xe)
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                i && i()
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = e(this),
                        r = i.data(ye);
                    if (r || (r = new t(this), i.data(ye, r)), "string" == typeof n) {
                        if (void 0 === r[n]) throw new TypeError('No method named "' + n + '"');
                        r[n]()
                    }
                })
            }, r(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), t
        }();
    e(document).on(be.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(t) {
        t.preventDefault(), Te._jQueryInterface.call(e(this), "show")
    }), e.fn.tab = Te._jQueryInterface, e.fn.tab.Constructor = Te, e.fn.tab.noConflict = function() {
        return e.fn.tab = we, Te._jQueryInterface
    };
    var Se = "toast",
        De = "bs.toast",
        Ae = "." + De,
        Ne = e.fn[Se],
        ke = {
            CLICK_DISMISS: "click.dismiss" + Ae,
            HIDE: "hide" + Ae,
            HIDDEN: "hidden" + Ae,
            SHOW: "show" + Ae,
            SHOWN: "shown" + Ae
        },
        Ie = "show",
        Oe = "showing",
        je = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        Le = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        Pe = function() {
            function t(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
            }
            var n = t.prototype;
            return n.show = function() {
                var t = this;
                e(this._element).trigger(ke.SHOW), this._config.animation && this._element.classList.add("fade");
                var n = function() {
                    t._element.classList.remove(Oe), t._element.classList.add(Ie), e(t._element).trigger(ke.SHOWN), t._config.autohide && t.hide()
                };
                if (this._element.classList.remove("hide"), this._element.classList.add(Oe), this._config.animation) {
                    var i = a.getTransitionDurationFromElement(this._element);
                    e(this._element).one(a.TRANSITION_END, n).emulateTransitionEnd(i)
                } else n()
            }, n.hide = function(t) {
                var n = this;
                this._element.classList.contains(Ie) && (e(this._element).trigger(ke.HIDE), t ? this._close() : this._timeout = setTimeout(function() {
                    n._close()
                }, this._config.delay))
            }, n.dispose = function() {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Ie) && this._element.classList.remove(Ie), e(this._element).off(ke.CLICK_DISMISS), e.removeData(this._element, De), this._element = null, this._config = null
            }, n._getConfig = function(t) {
                return t = o({}, Le, e(this._element).data(), "object" == typeof t && t ? t : {}), a.typeCheckConfig(Se, t, this.constructor.DefaultType), t
            }, n._setListeners = function() {
                var t = this;
                e(this._element).on(ke.CLICK_DISMISS, '[data-dismiss="toast"]', function() {
                    return t.hide(!0)
                })
            }, n._close = function() {
                var t = this,
                    n = function() {
                        t._element.classList.add("hide"), e(t._element).trigger(ke.HIDDEN)
                    };
                if (this._element.classList.remove(Ie), this._config.animation) {
                    var i = a.getTransitionDurationFromElement(this._element);
                    e(this._element).one(a.TRANSITION_END, n).emulateTransitionEnd(i)
                } else n()
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = e(this),
                        r = i.data(De);
                    if (r || (r = new t(this, "object" == typeof n && n), i.data(De, r)), "string" == typeof n) {
                        if (void 0 === r[n]) throw new TypeError('No method named "' + n + '"');
                        r[n](this)
                    }
                })
            }, r(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return je
                }
            }, {
                key: "Default",
                get: function() {
                    return Le
                }
            }]), t
        }();
    e.fn[Se] = Pe._jQueryInterface, e.fn[Se].Constructor = Pe, e.fn[Se].noConflict = function() {
            return e.fn[Se] = Ne, Pe._jQueryInterface
        },
        function() {
            if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = e.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }(), t.Util = a, t.Alert = f, t.Button = E, t.Carousel = M, t.Collapse = G, t.Dropdown = dt, t.Modal = St, t.Popover = ie, t.Scrollspy = ve, t.Tab = Te, t.Toast = Pe, t.Tooltip = Vt, Object.defineProperty(t, "__esModule", {
            value: !0
        })
}),
function(t, e, n, i) {
    function r(e, n) {
        this.settings = null, this.options = t.extend({}, r.Defaults, n), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, t.each(["onResize", "onThrottledResize"], t.proxy(function(e, n) {
            this._handlers[n] = t.proxy(this[n], this)
        }, this)), t.each(r.Plugins, t.proxy(function(t, e) {
            this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
        }, this)), t.each(r.Workers, t.proxy(function(e, n) {
            this._pipe.push({
                filter: n.filter,
                run: t.proxy(n.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    r.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, r.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, r.Type = {
        Event: "event",
        State: "state"
    }, r.Plugins = {}, r.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = this.settings.margin || "",
                n = !this.settings.autoWidth,
                i = this.settings.rtl,
                r = {
                    width: "auto",
                    "margin-left": i ? e : "",
                    "margin-right": i ? "" : e
                };
            !n && this.$stage.children().css(r), t.css = r
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                n = null,
                i = this._items.length,
                r = !this.settings.autoWidth,
                o = [];
            for (t.items = {
                    merge: !1,
                    width: e
                }; i--;) n = this._mergers[i], n = this.settings.mergeFit && Math.min(n, this.settings.items) || n, t.items.merge = n > 1 || t.items.merge, o[i] = r ? e * n : this._items[i].width();
            this._widths = o
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var e = [],
                n = this._items,
                i = this.settings,
                r = Math.max(2 * i.items, 4),
                o = 2 * Math.ceil(n.length / 2),
                s = i.loop && n.length ? i.rewind ? r : Math.max(r, o) : 0,
                a = "",
                l = "";
            for (s /= 2; s > 0;) e.push(this.normalize(e.length / 2, !0)), a += n[e[e.length - 1]][0].outerHTML, e.push(this.normalize(n.length - 1 - (e.length - 1) / 2, !0)), l = n[e[e.length - 1]][0].outerHTML + l, s -= 1;
            this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, n = -1, i = 0, r = 0, o = []; ++n < e;) i = o[n - 1] || 0, r = this._widths[this.relative(n)] + this.settings.margin, o.push(i + r * t);
            this._coordinates = o
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var t = this.settings.stagePadding,
                e = this._coordinates,
                n = {
                    width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                    "padding-left": t || "",
                    "padding-right": t || ""
                };
            this.$stage.css(n)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = this._coordinates.length,
                n = !this.settings.autoWidth,
                i = this.$stage.children();
            if (n && t.items.merge)
                for (; e--;) t.css.width = this._widths[this.relative(e)], i.eq(e).css(t.css);
            else n && (t.css.width = t.items.width, i.css(t.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var t, e, n, i, r = this.settings.rtl ? 1 : -1,
                o = 2 * this.settings.stagePadding,
                s = this.coordinates(this.current()) + o,
                a = s + this.width() * r,
                l = [];
            for (n = 0, i = this._coordinates.length; n < i; n++) t = this._coordinates[n - 1] || 0, e = Math.abs(this._coordinates[n]) + o * r, (this.op(t, "<=", s) && this.op(t, ">", a) || this.op(e, "<", s) && this.op(e, ">", a)) && l.push(n);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
        }
    }], r.prototype.initializeStage = function() {
        this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ">", {
            class: this.settings.stageClass
        }).wrap(t("<div/>", {
            class: this.settings.stageOuterClass
        })), this.$element.append(this.$stage.parent()))
    }, r.prototype.initializeItems = function() {
        var e = this.$element.find(".owl-item");
        if (e.length) return this._items = e.get().map(function(e) {
            return t(e)
        }), this._mergers = this._items.map(function() {
            return 1
        }), void this.refresh();
        this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
    }, r.prototype.initialize = function() {
        var t, e, n;
        (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) && (t = this.$element.find("img"), e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : i, n = this.$element.children(e).width(), t.length && n <= 0 && this.preloadAutoWidthImages(t));
        this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, r.prototype.isVisible = function() {
        return !this.settings.checkVisibility || this.$element.is(":visible")
    }, r.prototype.setup = function() {
        var e = this.viewport(),
            n = this.options.responsive,
            i = -1,
            r = null;
        n ? (t.each(n, function(t) {
            t <= e && t > i && (i = Number(t))
        }), "function" == typeof(r = t.extend({}, this.options, n[i])).stagePadding && (r.stagePadding = r.stagePadding()), delete r.responsive, r.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i))) : r = t.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: r
            }
        }), this._breakpoint = i, this.settings = r, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, r.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, r.prototype.prepare = function(e) {
        var n = this.trigger("prepare", {
            content: e
        });
        return n.data || (n.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {
            content: n.data
        }), n.data
    }, r.prototype.update = function() {
        for (var e = 0, n = this._pipe.length, i = t.proxy(function(t) {
                return this[t]
            }, this._invalidated), r = {}; e < n;)(this._invalidated.all || t.grep(this._pipe[e].filter, i).length > 0) && this._pipe[e].run(r), e++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, r.prototype.width = function(t) {
        switch (t = t || r.Width.Default) {
            case r.Width.Inner:
            case r.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, r.prototype.refresh = function() {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, r.prototype.onThrottledResize = function() {
        e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, r.prototype.onResize = function() {
        return !!this._items.length && this._width !== this.$element.width() && !!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
    }, r.prototype.registerEventHandlers = function() {
        t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
    }, r.prototype.onDragStart = function(e) {
        var i = null;
        3 !== e.which && (t.support.transform ? i = {
            x: (i = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === i.length ? 12 : 4],
            y: i[16 === i.length ? 13 : 5]
        } : (i = this.$stage.position(), i = {
            x: this.settings.rtl ? i.left + this.$stage.width() - this.width() + this.settings.margin : i.left,
            y: i.top
        }), this.is("animating") && (t.support.transform ? this.animate(i.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = i, this._drag.stage.current = i, this._drag.pointer = this.pointer(e), t(n).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(n).one("mousemove.owl.core touchmove.owl.core", t.proxy(function(e) {
            var i = this.difference(this._drag.pointer, this.pointer(e));
            t(n).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(i.x) < Math.abs(i.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, r.prototype.onDragMove = function(t) {
        var e = null,
            n = null,
            i = null,
            r = this.difference(this._drag.pointer, this.pointer(t)),
            o = this.difference(this._drag.stage.start, r);
        this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), n = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % n + n) % n + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), n = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), i = this.settings.pullDrag ? -1 * r.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + i), n + i)), this._drag.stage.current = o, this.animate(o.x))
    }, r.prototype.onDragEnd = function(e) {
        var i = this.difference(this._drag.pointer, this.pointer(e)),
            r = this._drag.stage.current,
            o = i.x > 0 ^ this.settings.rtl ? "left" : "right";
        t(n).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== i.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(r.x, 0 !== i.x ? o : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = o, (Math.abs(i.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, r.prototype.closest = function(e, n) {
        var r = -1,
            o = this.width(),
            s = this.coordinates();
        return this.settings.freeDrag || t.each(s, t.proxy(function(t, a) {
            return "left" === n && e > a - 30 && e < a + 30 ? r = t : "right" === n && e > a - o - 30 && e < a - o + 30 ? r = t + 1 : this.op(e, "<", a) && this.op(e, ">", s[t + 1] !== i ? s[t + 1] : a - o) && (r = "left" === n ? t + 1 : t), -1 === r
        }, this)), this.settings.loop || (this.op(e, ">", s[this.minimum()]) ? r = e = this.minimum() : this.op(e, "<", s[this.maximum()]) && (r = e = this.maximum())), r
    }, r.prototype.animate = function(e) {
        var n = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), n && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
            transform: "translate3d(" + e + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
        }) : n ? this.$stage.animate({
            left: e + "px"
        }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: e + "px"
        })
    }, r.prototype.is = function(t) {
        return this._states.current[t] && this._states.current[t] > 0
    }, r.prototype.current = function(t) {
        if (t === i) return this._current;
        if (0 === this._items.length) return i;
        if (t = this.normalize(t), this._current !== t) {
            var e = this.trigger("change", {
                property: {
                    name: "position",
                    value: t
                }
            });
            e.data !== i && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, r.prototype.invalidate = function(e) {
        return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function(t, e) {
            return e
        })
    }, r.prototype.reset = function(t) {
        (t = this.normalize(t)) !== i && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, r.prototype.normalize = function(t, e) {
        var n = this._items.length,
            r = e ? 0 : this._clones.length;
        return !this.isNumeric(t) || n < 1 ? t = i : (t < 0 || t >= n + r) && (t = ((t - r / 2) % n + n) % n + r / 2), t
    }, r.prototype.relative = function(t) {
        return t -= this._clones.length / 2, this.normalize(t, !0)
    }, r.prototype.maximum = function(t) {
        var e, n, i, r = this.settings,
            o = this._coordinates.length;
        if (r.loop) o = this._clones.length / 2 + this._items.length - 1;
        else if (r.autoWidth || r.merge) {
            if (e = this._items.length)
                for (n = this._items[--e].width(), i = this.$element.width(); e-- && !((n += this._items[e].width() + this.settings.margin) > i););
            o = e + 1
        } else o = r.center ? this._items.length - 1 : this._items.length - r.items;
        return t && (o -= this._clones.length / 2), Math.max(o, 0)
    }, r.prototype.minimum = function(t) {
        return t ? 0 : this._clones.length / 2
    }, r.prototype.items = function(t) {
        return t === i ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, r.prototype.mergers = function(t) {
        return t === i ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, r.prototype.clones = function(e) {
        var n = this._clones.length / 2,
            r = n + this._items.length,
            o = function(t) {
                return t % 2 == 0 ? r + t / 2 : n - (t + 1) / 2
            };
        return e === i ? t.map(this._clones, function(t, e) {
            return o(e)
        }) : t.map(this._clones, function(t, n) {
            return t === e ? o(n) : null
        })
    }, r.prototype.speed = function(t) {
        return t !== i && (this._speed = t), this._speed
    }, r.prototype.coordinates = function(e) {
        var n, r = 1,
            o = e - 1;
        return e === i ? t.map(this._coordinates, t.proxy(function(t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (this.settings.rtl && (r = -1, o = e + 1), n = this._coordinates[e], n += (this.width() - n + (this._coordinates[o] || 0)) / 2 * r) : n = this._coordinates[o] || 0, n = Math.ceil(n))
    }, r.prototype.duration = function(t, e, n) {
        return 0 === n ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(n || this.settings.smartSpeed)
    }, r.prototype.to = function(t, e) {
        var n = this.current(),
            i = null,
            r = t - this.relative(n),
            o = (r > 0) - (r < 0),
            s = this._items.length,
            a = this.minimum(),
            l = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(r) > s / 2 && (r += -1 * o * s), (i = (((t = n + r) - a) % s + s) % s + a) !== t && i - r <= l && i - r > 0 && (n = i - r, t = i, this.reset(n))) : this.settings.rewind ? t = (t % (l += 1) + l) % l : t = Math.max(a, Math.min(l, t)), this.speed(this.duration(n, t, e)), this.current(t), this.isVisible() && this.update()
    }, r.prototype.next = function(t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, r.prototype.prev = function(t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, r.prototype.onTransitionEnd = function(t) {
        if (t !== i && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, r.prototype.viewport = function() {
        var i;
        return this.options.responsiveBaseElement !== e ? i = t(this.options.responsiveBaseElement).width() : e.innerWidth ? i = e.innerWidth : n.documentElement && n.documentElement.clientWidth ? i = n.documentElement.clientWidth : console.warn("Can not detect viewport width."), i
    }, r.prototype.replace = function(e) {
        this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function() {
            return 1 === this.nodeType
        }).each(t.proxy(function(t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, r.prototype.add = function(e, n) {
        var r = this.relative(this._current);
        n = n === i ? this._items.length : this.normalize(n, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
            content: e,
            position: n
        }), e = this.prepare(e), 0 === this._items.length || n === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[n - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[n].before(e), this._items.splice(n, 0, e), this._mergers.splice(n, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[r] && this.reset(this._items[r].index()), this.invalidate("items"), this.trigger("added", {
            content: e,
            position: n
        })
    }, r.prototype.remove = function(t) {
        (t = this.normalize(t, !0)) !== i && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, r.prototype.preloadAutoWidthImages = function(e) {
        e.each(t.proxy(function(e, n) {
            this.enter("pre-loading"), n = t(n), t(new Image).one("load", t.proxy(function(t) {
                n.attr("src", t.target.src), n.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", n.attr("src") || n.attr("data-src") || n.attr("data-src-retina"))
        }, this))
    }, r.prototype.destroy = function() {
        for (var i in this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(n).off(".owl.core"), !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[i].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, r.prototype.op = function(t, e, n) {
        var i = this.settings.rtl;
        switch (e) {
            case "<":
                return i ? t > n : t < n;
            case ">":
                return i ? t < n : t > n;
            case ">=":
                return i ? t <= n : t >= n;
            case "<=":
                return i ? t >= n : t <= n
        }
    }, r.prototype.on = function(t, e, n, i) {
        t.addEventListener ? t.addEventListener(e, n, i) : t.attachEvent && t.attachEvent("on" + e, n)
    }, r.prototype.off = function(t, e, n, i) {
        t.removeEventListener ? t.removeEventListener(e, n, i) : t.detachEvent && t.detachEvent("on" + e, n)
    }, r.prototype.trigger = function(e, n, i, o, s) {
        var a = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            l = t.camelCase(t.grep(["on", e, i], function(t) {
                return t
            }).join("-").toLowerCase()),
            c = t.Event([e, "owl", i || "carousel"].join(".").toLowerCase(), t.extend({
                relatedTarget: this
            }, a, n));
        return this._supress[e] || (t.each(this._plugins, function(t, e) {
            e.onTrigger && e.onTrigger(c)
        }), this.register({
            type: r.Type.Event,
            name: e
        }), this.$element.trigger(c), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, c)), c
    }, r.prototype.enter = function(e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
            this._states.current[e] === i && (this._states.current[e] = 0), this._states.current[e]++
        }, this))
    }, r.prototype.leave = function(e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
            this._states.current[e]--
        }, this))
    }, r.prototype.register = function(e) {
        if (e.type === r.Type.Event) {
            if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
                var n = t.event.special[e.name]._default;
                t.event.special[e.name]._default = function(t) {
                    return !n || !n.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && t.namespace.indexOf("owl") > -1 : n.apply(this, arguments)
                }, t.event.special[e.name].owl = !0
            }
        } else e.type === r.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function(n, i) {
            return t.inArray(n, this._states.tags[e.name]) === i
        }, this)))
    }, r.prototype.suppress = function(e) {
        t.each(e, t.proxy(function(t, e) {
            this._supress[e] = !0
        }, this))
    }, r.prototype.release = function(e) {
        t.each(e, t.proxy(function(t, e) {
            delete this._supress[e]
        }, this))
    }, r.prototype.pointer = function(t) {
        var n = {
            x: null,
            y: null
        };
        return (t = (t = t.originalEvent || t || e.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (n.x = t.pageX, n.y = t.pageY) : (n.x = t.clientX, n.y = t.clientY), n
    }, r.prototype.isNumeric = function(t) {
        return !isNaN(parseFloat(t))
    }, r.prototype.difference = function(t, e) {
        return {
            x: t.x - e.x,
            y: t.y - e.y
        }
    }, t.fn.owlCarousel = function(e) {
        var n = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var i = t(this),
                o = i.data("owl.carousel");
            o || (o = new r(this, "object" == typeof e && e), i.data("owl.carousel", o), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(e, n) {
                o.register({
                    type: r.Type.Event,
                    name: n
                }), o.$element.on(n + ".owl.carousel.core", t.proxy(function(t) {
                    t.namespace && t.relatedTarget !== this && (this.suppress([n]), o[n].apply(this, [].slice.call(arguments, 1)), this.release([n]))
                }, o))
            })), "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, n)
        })
    }, t.fn.owlCarousel.Constructor = r
}(window.Zepto || window.jQuery, window, document),
function(t, e, n, i) {
    var r = function(e) {
        this._core = e, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    r.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, r.prototype.watch = function() {
        this._interval || (this._visible = this._core.isVisible(), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, r.prototype.refresh = function() {
        this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, r.prototype.destroy = function() {
        var t, n;
        for (t in e.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = r
}(window.Zepto || window.jQuery, window, document),
function(t, e, n, i) {
    var r = function(e) {
        this._core = e, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function(e) {
                if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type)) {
                    var n = this._core.settings,
                        i = n.center && Math.ceil(n.items / 2) || n.items,
                        r = n.center && -1 * i || 0,
                        o = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + r,
                        s = this._core.clones().length,
                        a = t.proxy(function(t, e) {
                            this.load(e)
                        }, this);
                    for (n.lazyLoadEager > 0 && (i += n.lazyLoadEager, n.loop && (o -= n.lazyLoadEager, i++)); r++ < i;) this.load(s / 2 + this._core.relative(o)), s && t.each(this._core.clones(this._core.relative(o)), a), o++
                }
            }, this)
        }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    r.Defaults = {
        lazyLoad: !1,
        lazyLoadEager: 0
    }, r.prototype.load = function(n) {
        var i = this._core.$stage.children().eq(n),
            r = i && i.find(".owl-lazy");
        !r || t.inArray(i.get(0), this._loaded) > -1 || (r.each(t.proxy(function(n, i) {
            var r, o = t(i),
                s = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src") || o.attr("data-srcset");
            this._core.trigger("load", {
                element: o,
                url: s
            }, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function() {
                o.css("opacity", 1), this._core.trigger("loaded", {
                    element: o,
                    url: s
                }, "lazy")
            }, this)).attr("src", s) : o.is("source") ? o.one("load.owl.lazy", t.proxy(function() {
                this._core.trigger("loaded", {
                    element: o,
                    url: s
                }, "lazy")
            }, this)).attr("srcset", s) : ((r = new Image).onload = t.proxy(function() {
                o.css({
                    "background-image": 'url("' + s + '")',
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: o,
                    url: s
                }, "lazy")
            }, this), r.src = s)
        }, this)), this._loaded.push(i.get(0)))
    }, r.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Lazy = r
}(window.Zepto || window.jQuery, window, document),
function(t, e, n, i) {
    var r = function(n) {
        this._core = n, this._previousHeight = null, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && "position" === t.property.name && this.update()
            }, this),
            "loaded.owl.lazy": t.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
        var i = this;
        t(e).on("load", function() {
            i._core.settings.autoHeight && i.update()
        }), t(e).resize(function() {
            i._core.settings.autoHeight && (null != i._intervalId && clearTimeout(i._intervalId), i._intervalId = setTimeout(function() {
                i.update()
            }, 250))
        })
    };
    r.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, r.prototype.update = function() {
        var e = this._core._current,
            n = e + this._core.settings.items,
            i = this._core.settings.lazyLoad,
            r = this._core.$stage.children().toArray().slice(e, n),
            o = [],
            s = 0;
        t.each(r, function(e, n) {
            o.push(t(n).height())
        }), (s = Math.max.apply(null, o)) <= 1 && i && this._previousHeight && (s = this._previousHeight), this._previousHeight = s, this._core.$stage.parent().height(s).addClass(this._core.settings.autoHeightClass)
    }, r.prototype.destroy = function() {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = r
}(window.Zepto || window.jQuery, window, document),
function(t, e, n, i) {
    var r = function(e) {
        this._core = e, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
            }, this),
            "refreshed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && "position" === t.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                if (e.namespace) {
                    var n = t(e.content).find(".owl-video");
                    n.length && (n.css("display", "none"), this.fetch(n, t(e.content)))
                }
            }, this)
        }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
            this.play(t)
        }, this))
    };
    r.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, r.prototype.fetch = function(t, e) {
        var n = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
            i = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
            r = t.attr("data-width") || this._core.settings.videoWidth,
            o = t.attr("data-height") || this._core.settings.videoHeight,
            s = t.attr("href");
        if (!s) throw new Error("Missing video URL.");
        if ((i = s.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) n = "youtube";
        else if (i[3].indexOf("vimeo") > -1) n = "vimeo";
        else {
            if (!(i[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            n = "vzaar"
        }
        i = i[6], this._videos[s] = {
            type: n,
            id: i,
            width: r,
            height: o
        }, e.attr("data-video", s), this.thumbnail(t, this._videos[s])
    }, r.prototype.thumbnail = function(e, n) {
        var i, r, o = n.width && n.height ? "width:" + n.width + "px;height:" + n.height + "px;" : "",
            s = e.find("img"),
            a = "src",
            l = "",
            c = this._core.settings,
            u = function(n) {
                '<div class="owl-video-play-icon"></div>',
                i = c.lazyLoad ? t("<div/>", {
                    class: "owl-video-tn " + l,
                    srcType: n
                }) : t("<div/>", {
                    class: "owl-video-tn",
                    style: "opacity:1;background-image:url(" + n + ")"
                }),
                e.after(i),
                e.after('<div class="owl-video-play-icon"></div>')
            };
        if (e.wrap(t("<div/>", {
                class: "owl-video-wrapper",
                style: o
            })), this._core.settings.lazyLoad && (a = "data-src", l = "owl-lazy"), s.length) return u(s.attr(a)), s.remove(), !1;
        "youtube" === n.type ? (r = "//img.youtube.com/vi/" + n.id + "/hqdefault.jpg", u(r)) : "vimeo" === n.type ? t.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + n.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                r = t[0].thumbnail_large, u(r)
            }
        }) : "vzaar" === n.type && t.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + n.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                r = t.framegrab_url, u(r)
            }
        })
    }, r.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, r.prototype.play = function(e) {
        var n, i = t(e.target).closest("." + this._core.settings.itemClass),
            r = this._videos[i.attr("data-video")],
            o = r.width || "100%",
            s = r.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), i = this._core.items(this._core.relative(i.index())), this._core.reset(i.index()), (n = t('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')).attr("height", s), n.attr("width", o), "youtube" === r.type ? n.attr("src", "//www.youtube.com/embed/" + r.id + "?autoplay=1&rel=0&v=" + r.id) : "vimeo" === r.type ? n.attr("src", "//player.vimeo.com/video/" + r.id + "?autoplay=1") : "vzaar" === r.type && n.attr("src", "//view.vzaar.com/" + r.id + "/player?autoplay=true"), t(n).wrap('<div class="owl-video-frame" />').insertAfter(i.find(".owl-video")), this._playing = i.addClass("owl-video-playing"))
    }, r.prototype.isInFullScreen = function() {
        var e = n.fullscreenElement || n.mozFullScreenElement || n.webkitFullscreenElement;
        return e && t(e).parent().hasClass("owl-video-frame")
    }, r.prototype.destroy = function() {
        var t, e;
        for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Video = r
}(window.Zepto || window.jQuery, window, document),
function(t, e, n, i) {
    var r = function(e) {
        this.core = e, this.core.options = t.extend({}, r.Defaults, this.core.options), this.swapping = !0, this.previous = i, this.next = i, this.handlers = {
            "change.owl.carousel": t.proxy(function(t) {
                t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
                t.namespace && (this.swapping = "translated" == t.type)
            }, this),
            "translate.owl.carousel": t.proxy(function(t) {
                t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    r.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, r.prototype.swap = function() {
        if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
            this.core.speed(0);
            var e, n = t.proxy(this.clear, this),
                i = this.core.$stage.children().eq(this.previous),
                r = this.core.$stage.children().eq(this.next),
                o = this.core.settings.animateIn,
                s = this.core.settings.animateOut;
            this.core.current() !== this.previous && (s && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), i.one(t.support.animation.end, n).css({
                left: e + "px"
            }).addClass("animated owl-animated-out").addClass(s)), o && r.one(t.support.animation.end, n).addClass("animated owl-animated-in").addClass(o))
        }
    }, r.prototype.clear = function(e) {
        t(e.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, r.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Animate = r
}(window.Zepto || window.jQuery, window, document),
function(t, e, n, i) {
    var r = function(e) {
        this._core = e, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._paused && (this._time = 0)
            }, this),
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": t.proxy(function(t, e, n) {
                t.namespace && this.play(e, n)
            }, this),
            "stop.owl.autoplay": t.proxy(function(t) {
                t.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.owl.core": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.owl.core": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = t.extend({}, r.Defaults, this._core.options)
    };
    r.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, r.prototype._next = function(i) {
        this._call = e.setTimeout(t.proxy(this._next, this, i), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || n.hidden || this._core.next(i || this._core.settings.autoplaySpeed)
    }, r.prototype.read = function() {
        return (new Date).getTime() - this._time
    }, r.prototype.play = function(n, i) {
        var r;
        this._core.is("rotating") || this._core.enter("rotating"), n = n || this._core.settings.autoplayTimeout, r = Math.min(this._time % (this._timeout || n), n), this._paused ? (this._time = this.read(), this._paused = !1) : e.clearTimeout(this._call), this._time += this.read() % n - r, this._timeout = n, this._call = e.setTimeout(t.proxy(this._next, this, i), n - r)
    }, r.prototype.stop = function() {
        this._core.is("rotating") && (this._time = 0, this._paused = !0, e.clearTimeout(this._call), this._core.leave("rotating"))
    }, r.prototype.pause = function() {
        this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, e.clearTimeout(this._call))
    }, r.prototype.destroy = function() {
        var t, e;
        for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.autoplay = r
}(window.Zepto || window.jQuery, window, document),
function(t, e, n, i) {
    "use strict";
    var r = function(e) {
        this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": t.proxy(function(e) {
                e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && "position" == t.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = t.extend({}, r.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    r.Defaults = {
        nav: !1,
        navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
        navSpeed: !1,
        navElement: 'button type="button" role="presentation"',
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, r.prototype.initialize = function() {
        var e, n = this._core.settings;
        for (e in this._controls.$relative = (n.navContainer ? t(n.navContainer) : t("<div>").addClass(n.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + n.navElement + ">").addClass(n.navClass[0]).html(n.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function(t) {
                this.prev(n.navSpeed)
            }, this)), this._controls.$next = t("<" + n.navElement + ">").addClass(n.navClass[1]).html(n.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function(t) {
                this.next(n.navSpeed)
            }, this)), n.dotsData || (this._templates = [t('<button role="button">').addClass(n.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (n.dotsContainer ? t(n.dotsContainer) : t("<div>").addClass(n.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", t.proxy(function(e) {
                var i = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
                e.preventDefault(), this.to(i, n.dotsSpeed)
            }, this)), this._overrides) this._core[e] = t.proxy(this[e], this)
    }, r.prototype.destroy = function() {
        var t, e, n, i, r;
        for (t in r = this._core.settings, this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) "$relative" === e && r.navContainer ? this._controls[e].html("") : this._controls[e].remove();
        for (i in this.overides) this._core[i] = this._overrides[i];
        for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
    }, r.prototype.update = function() {
        var t, e, n = this._core.clones().length / 2,
            i = n + this._core.items().length,
            r = this._core.maximum(!0),
            o = this._core.settings,
            s = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
        if ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy)
            for (this._pages = [], t = n, e = 0, 0; t < i; t++) {
                if (e >= s || 0 === e) {
                    if (this._pages.push({
                            start: Math.min(r, t - n),
                            end: t - n + s - 1
                        }), Math.min(r, t - n) === r) break;
                    e = 0, 0
                }
                e += this._core.mergers(this._core.relative(t))
            }
    }, r.prototype.draw = function() {
        var e, n = this._core.settings,
            i = this._core.items().length <= n.items,
            r = this._core.relative(this._core.current()),
            o = n.loop || n.rewind;
        this._controls.$relative.toggleClass("disabled", !n.nav || i), n.nav && (this._controls.$previous.toggleClass("disabled", !o && r <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !o && r >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !n.dots || i), n.dots && (e = this._pages.length - this._controls.$absolute.children().length, n.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
    }, r.prototype.onTrigger = function(e) {
        var n = this._core.settings;
        e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: n && (n.center || n.autoWidth || n.dotsData ? 1 : n.dotsEach || n.items)
        }
    }, r.prototype.current = function() {
        var e = this._core.relative(this._core.current());
        return t.grep(this._pages, t.proxy(function(t, n) {
            return t.start <= e && t.end >= e
        }, this)).pop()
    }, r.prototype.getPosition = function(e) {
        var n, i, r = this._core.settings;
        return "page" == r.slideBy ? (n = t.inArray(this.current(), this._pages), i = this._pages.length, e ? ++n : --n, n = this._pages[(n % i + i) % i].start) : (n = this._core.relative(this._core.current()), i = this._core.items().length, e ? n += r.slideBy : n -= r.slideBy), n
    }, r.prototype.next = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
    }, r.prototype.prev = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
    }, r.prototype.to = function(e, n, i) {
        var r;
        !i && this._pages.length ? (r = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % r + r) % r].start, n)) : t.proxy(this._overrides.to, this._core)(e, n)
    }, t.fn.owlCarousel.Constructor.Plugins.Navigation = r
}(window.Zepto || window.jQuery, window, document),
function(t, e, n, i) {
    "use strict";
    var r = function(n) {
        this._core = n, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": t.proxy(function(n) {
                n.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                if (e.namespace) {
                    var n = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!n) return;
                    this._hashes[n] = e.content
                }
            }, this),
            "changed.owl.carousel": t.proxy(function(n) {
                if (n.namespace && "position" === n.property.name) {
                    var i = this._core.items(this._core.relative(this._core.current())),
                        r = t.map(this._hashes, function(t, e) {
                            return t === i ? e : null
                        }).join();
                    if (!r || e.location.hash.slice(1) === r) return;
                    e.location.hash = r
                }
            }, this)
        }, this._core.options = t.extend({}, r.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function(t) {
            var n = e.location.hash.substring(1),
                i = this._core.$stage.children(),
                r = this._hashes[n] && i.index(this._hashes[n]);
            void 0 !== r && r !== this._core.current() && this._core.to(this._core.relative(r), !1, !0)
        }, this))
    };
    r.Defaults = {
        URLhashListener: !1
    }, r.prototype.destroy = function() {
        var n, i;
        for (n in t(e).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(n, this._handlers[n]);
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Hash = r
}(window.Zepto || window.jQuery, window, document),
function(t, e, n, i) {
    function r(e, n) {
        var r = !1,
            o = e.charAt(0).toUpperCase() + e.slice(1);
        return t.each((e + " " + a.join(o + " ") + o).split(" "), function(t, e) {
            if (s[e] !== i) return r = !n || e, !1
        }), r
    }

    function o(t) {
        return r(t, !0)
    }
    var s = t("<support>").get(0).style,
        a = "Webkit Moz O ms".split(" "),
        l = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        c = function() {
            return !!r("transform")
        },
        u = function() {
            return !!r("perspective")
        },
        h = function() {
            return !!r("animation")
        };
    (function() {
        return !!r("transition")
    })() && (t.support.transition = new String(o("transition")), t.support.transition.end = l.transition.end[t.support.transition]), h() && (t.support.animation = new String(o("animation")), t.support.animation.end = l.animation.end[t.support.animation]), c() && (t.support.transform = new String(o("transform")), t.support.transform3d = u())
}(window.Zepto || window.jQuery, window, document),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    var e = Array.prototype.slice,
        n = Array.prototype.splice,
        i = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: "is-sticky",
            wrapperClassName: "sticky-wrapper",
            center: !1,
            getWidthFrom: "",
            widthFromWrapper: !0,
            responsiveWidth: !1,
            zIndex: "auto"
        },
        r = t(window),
        o = t(document),
        s = [],
        a = r.height(),
        l = function() {
            for (var e = r.scrollTop(), n = o.height(), i = n - a, l = e > i ? i - e : 0, c = 0, u = s.length; c < u; c++) {
                var h = s[c],
                    d = h.stickyWrapper.offset().top - h.topSpacing - l;
                if (h.stickyWrapper.css("height", h.stickyElement.outerHeight()), e <= d) null !== h.currentTop && (h.stickyElement.css({
                    width: "",
                    position: "",
                    top: "",
                    "z-index": ""
                }), h.stickyElement.parent().removeClass(h.className), h.stickyElement.trigger("sticky-end", [h]), h.currentTop = null);
                else {
                    var f, p = n - h.stickyElement.outerHeight() - h.topSpacing - h.bottomSpacing - e - l;
                    if (p < 0 ? p += h.topSpacing : p = h.topSpacing, h.currentTop !== p) h.getWidthFrom ? f = t(h.getWidthFrom).width() || null : h.widthFromWrapper && (f = h.stickyWrapper.width()), null == f && (f = h.stickyElement.width()), h.stickyElement.css("width", f).css("position", "fixed").css("top", p).css("z-index", h.zIndex), h.stickyElement.parent().addClass(h.className), null === h.currentTop ? h.stickyElement.trigger("sticky-start", [h]) : h.stickyElement.trigger("sticky-update", [h]), h.currentTop === h.topSpacing && h.currentTop > p || null === h.currentTop && p < h.topSpacing ? h.stickyElement.trigger("sticky-bottom-reached", [h]) : null !== h.currentTop && p === h.topSpacing && h.currentTop < p && h.stickyElement.trigger("sticky-bottom-unreached", [h]), h.currentTop = p;
                    var g = h.stickyWrapper.parent();
                    h.stickyElement.offset().top + h.stickyElement.outerHeight() >= g.offset().top + g.outerHeight() && h.stickyElement.offset().top <= h.topSpacing ? h.stickyElement.css("position", "absolute").css("top", "").css("bottom", 0).css("z-index", "") : h.stickyElement.css("position", "fixed").css("top", p).css("bottom", "").css("z-index", h.zIndex)
                }
            }
        },
        c = function() {
            a = r.height();
            for (var e = 0, n = s.length; e < n; e++) {
                var i = s[e],
                    o = null;
                i.getWidthFrom ? i.responsiveWidth && (o = t(i.getWidthFrom).width()) : i.widthFromWrapper && (o = i.stickyWrapper.width()), null != o && i.stickyElement.css("width", o)
            }
        },
        u = {
            init: function(e) {
                var n = t.extend({}, i, e);
                return this.each(function() {
                    var e = t(this),
                        r = e.attr("id"),
                        o = r ? r + "-" + i.wrapperClassName : i.wrapperClassName,
                        a = t("<div></div>").attr("id", o).addClass(n.wrapperClassName);
                    e.wrapAll(a);
                    var l = e.parent();
                    n.center && l.css({
                        width: e.outerWidth(),
                        marginLeft: "auto",
                        marginRight: "auto"
                    }), "right" === e.css("float") && e.css({
                        float: "none"
                    }).parent().css({
                        float: "right"
                    }), n.stickyElement = e, n.stickyWrapper = l, n.currentTop = null, s.push(n), u.setWrapperHeight(this), u.setupChangeListeners(this)
                })
            },
            setWrapperHeight: function(e) {
                var n = t(e),
                    i = n.parent();
                i && i.css("height", n.outerHeight())
            },
            setupChangeListeners: function(t) {
                window.MutationObserver ? new window.MutationObserver(function(e) {
                    (e[0].addedNodes.length || e[0].removedNodes.length) && u.setWrapperHeight(t)
                }).observe(t, {
                    subtree: !0,
                    childList: !0
                }) : (t.addEventListener("DOMNodeInserted", function() {
                    u.setWrapperHeight(t)
                }, !1), t.addEventListener("DOMNodeRemoved", function() {
                    u.setWrapperHeight(t)
                }, !1))
            },
            update: l,
            unstick: function(e) {
                return this.each(function() {
                    for (var e = t(this), i = -1, r = s.length; r-- > 0;) s[r].stickyElement.get(0) === this && (n.call(s, r, 1), i = r); - 1 !== i && (e.unwrap(), e.css({
                        width: "",
                        position: "",
                        top: "",
                        float: "",
                        "z-index": ""
                    }))
                })
            }
        };
    window.addEventListener ? (window.addEventListener("scroll", l, !1), window.addEventListener("resize", c, !1)) : window.attachEvent && (window.attachEvent("onscroll", l), window.attachEvent("onresize", c)), t.fn.sticky = function(n) {
        return u[n] ? u[n].apply(this, e.call(arguments, 1)) : "object" != typeof n && n ? void t.error("Method " + n + " does not exist on jQuery.sticky") : u.init.apply(this, arguments)
    }, t.fn.unstick = function(n) {
        return u[n] ? u[n].apply(this, e.call(arguments, 1)) : "object" != typeof n && n ? void t.error("Method " + n + " does not exist on jQuery.sticky") : u.unstick.apply(this, arguments)
    }, t(function() {
        setTimeout(l, 0)
    })
});