var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function(e) {
        var t = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
            n = 0,
            r = {},
            a = {
                manual: e.Prism && e.Prism.manual,
                disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(t) {
                        return t instanceof i ? new i(t.type, e(t.content), t.alias) : Array.isArray(t) ? t.map(e) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function(e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++n
                        }), e.__id
                    },
                    clone: function e(t, n) {
                        var r, i;
                        switch (n = n || {}, a.util.type(t)) {
                            case "Object":
                                if (n[i = a.util.objId(t)]) return n[i];
                                for (var s in r = {}, n[i] = r, t) t.hasOwnProperty(s) && (r[s] = e(t[s], n));
                                return r;
                            case "Array":
                                return n[i = a.util.objId(t)] ? n[i] : (r = [], n[i] = r, t.forEach(function(t, a) {
                                    r[a] = e(t, n)
                                }), r);
                            default:
                                return t
                        }
                    },
                    getLanguage: function(e) {
                        for (; e;) {
                            var n = t.exec(e.className);
                            if (n) return n[1].toLowerCase();
                            e = e.parentElement
                        }
                        return "none"
                    },
                    setLanguage: function(e, n) {
                        e.className = e.className.replace(RegExp(t, "gi"), ""), e.classList.add("language-" + n)
                    },
                    currentScript: function() {
                        if ("undefined" == typeof document) return null;
                        if ("currentScript" in document) return document.currentScript;
                        try {
                            throw Error()
                        } catch (e) {
                            var t = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack) || [])[1];
                            if (t) {
                                var n = document.getElementsByTagName("script");
                                for (var r in n)
                                    if (n[r].src == t) return n[r]
                            }
                            return null
                        }
                    },
                    isActive: function(e, t, n) {
                        for (var r = "no-" + t; e;) {
                            var a = e.classList;
                            if (a.contains(t)) return !0;
                            if (a.contains(r)) return !1;
                            e = e.parentElement
                        }
                        return !!n
                    }
                },
                languages: {
                    plain: r,
                    plaintext: r,
                    text: r,
                    txt: r,
                    extend: function(e, t) {
                        var n = a.util.clone(a.languages[e]);
                        for (var r in t) n[r] = t[r];
                        return n
                    },
                    insertBefore: function(e, t, n, r) {
                        var i = (r = r || a.languages)[e],
                            s = {};
                        for (var o in i)
                            if (i.hasOwnProperty(o)) {
                                if (o == t)
                                    for (var l in n) n.hasOwnProperty(l) && (s[l] = n[l]);
                                n.hasOwnProperty(o) || (s[o] = i[o])
                            }
                        var u = r[e];
                        return r[e] = s, a.languages.DFS(a.languages, function(t, n) {
                            n === u && t != e && (this[t] = s)
                        }), s
                    },
                    DFS: function e(t, n, r, i) {
                        i = i || {};
                        var s = a.util.objId;
                        for (var o in t)
                            if (t.hasOwnProperty(o)) {
                                n.call(t, o, t[o], r || o);
                                var l = t[o],
                                    u = a.util.type(l);
                                "Object" !== u || i[s(l)] ? "Array" !== u || i[s(l)] || (i[s(l)] = !0, e(l, n, o, i)) : (i[s(l)] = !0, e(l, n, null, i))
                            }
                    }
                },
                plugins: {},
                highlightAll: function(e, t) {
                    a.highlightAllUnder(document, e, t)
                },
                highlightAllUnder: function(e, t, n) {
                    var r = {
                        callback: n,
                        container: e,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    a.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), a.hooks.run("before-all-elements-highlight", r);
                    for (var i, s = 0; i = r.elements[s++];) a.highlightElement(i, !0 === t, r.callback)
                },
                highlightElement: function(t, n, r) {
                    var i = a.util.getLanguage(t),
                        s = a.languages[i];
                    a.util.setLanguage(t, i);
                    var o = t.parentElement;
                    o && "pre" === o.nodeName.toLowerCase() && a.util.setLanguage(o, i);
                    var l = {
                        element: t,
                        language: i,
                        grammar: s,
                        code: t.textContent
                    };

                    function u(e) {
                        l.highlightedCode = e, a.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, a.hooks.run("after-highlight", l), a.hooks.run("complete", l), r && r.call(l.element)
                    }
                    if (a.hooks.run("before-sanity-check", l), (o = l.element.parentElement) && "pre" === o.nodeName.toLowerCase() && !o.hasAttribute("tabindex") && o.setAttribute("tabindex", "0"), !l.code) return a.hooks.run("complete", l), void(r && r.call(l.element));
                    if (a.hooks.run("before-highlight", l), l.grammar) {
                        if (n && e.Worker) {
                            var c = new Worker(a.filename);
                            c.onmessage = function(e) {
                                u(e.data)
                            }, c.postMessage(JSON.stringify({
                                language: l.language,
                                code: l.code,
                                immediateClose: !0
                            }))
                        } else u(a.highlight(l.code, l.grammar, l.language))
                    } else u(a.util.encode(l.code))
                },
                highlight: function(e, t, n) {
                    var r = {
                        code: e,
                        grammar: t,
                        language: n
                    };
                    if (a.hooks.run("before-tokenize", r), !r.grammar) throw Error('The language "' + r.language + '" has no grammar.');
                    return r.tokens = a.tokenize(r.code, r.grammar), a.hooks.run("after-tokenize", r), i.stringify(a.util.encode(r.tokens), r.language)
                },
                tokenize: function(e, t) {
                    var n = t.rest;
                    if (n) {
                        for (var r in n) t[r] = n[r];
                        delete t.rest
                    }
                    var c = new o;
                    return l(c, c.head, e),
                        function e(t, n, r, o, c, d) {
                            for (var p in r)
                                if (r.hasOwnProperty(p) && r[p]) {
                                    var g = r[p];
                                    g = Array.isArray(g) ? g : [g];
                                    for (var m = 0; m < g.length; ++m) {
                                        if (d && d.cause == p + "," + m) return;
                                        var f = g[m],
                                            h = f.inside,
                                            v = !!f.lookbehind,
                                            b = !!f.greedy,
                                            y = f.alias;
                                        if (b && !f.pattern.global) {
                                            var $ = f.pattern.toString().match(/[imsuy]*$/)[0];
                                            f.pattern = RegExp(f.pattern.source, $ + "g")
                                        }
                                        for (var k = f.pattern || f, x = o.next, F = 0; x !== n.tail && !(d && F >= d.reach); F += x.value.length, x = x.next) {
                                            var P = x.value;
                                            if (n.length > t.length) return;
                                            if (!(P instanceof i)) {
                                                var w, A = 1;
                                                if (b) {
                                                    if (!(w = s(k, F, t, v)) || w.index >= t.length) break;
                                                    var C = w.index,
                                                        S = w.index + w[0].length,
                                                        E = F;
                                                    for (E += x.value.length; C >= E;) E += (x = x.next).value.length;
                                                    if (F = E -= x.value.length, x.value instanceof i) continue;
                                                    for (var L = x; L !== n.tail && (E < S || "string" == typeof L.value); L = L.next) A++, E += L.value.length;
                                                    A--, P = t.slice(F, E), w.index -= F
                                                } else if (!(w = s(k, 0, P, v))) continue;
                                                C = w.index;
                                                var N = w[0],
                                                    z = P.slice(0, C),
                                                    _ = P.slice(C + N.length),
                                                    T = F + P.length;
                                                d && T > d.reach && (d.reach = T);
                                                var j = x.prev;
                                                if (z && (j = l(n, j, z), F += z.length), u(n, j, A), x = l(n, j, new i(p, h ? a.tokenize(N, h) : N, y, N)), _ && l(n, x, _), A > 1) {
                                                    var M = {
                                                        cause: p + "," + m,
                                                        reach: T
                                                    };
                                                    e(t, n, r, x.prev, F, M), d && M.reach > d.reach && (d.reach = M.reach)
                                                }
                                            }
                                        }
                                    }
                                }
                        }(e, c, t, c.head, 0),
                        function(e) {
                            for (var t = [], n = e.head.next; n !== e.tail;) t.push(n.value), n = n.next;
                            return t
                        }(c)
                },
                hooks: {
                    all: {},
                    add: function(e, t) {
                        var n = a.hooks.all;
                        n[e] = n[e] || [], n[e].push(t)
                    },
                    run: function(e, t) {
                        var n = a.hooks.all[e];
                        if (n && n.length)
                            for (var r, i = 0; r = n[i++];) r(t)
                    }
                },
                Token: i
            };

        function i(e, t, n, r) {
            this.type = e, this.content = t, this.alias = n, this.length = 0 | (r || "").length
        }

        function s(e, t, n, r) {
            e.lastIndex = t;
            var a = e.exec(n);
            if (a && r && a[1]) {
                var i = a[1].length;
                a.index += i, a[0] = a[0].slice(i)
            }
            return a
        }

        function o() {
            var e = {
                    value: null,
                    prev: null,
                    next: null
                },
                t = {
                    value: null,
                    prev: e,
                    next: null
                };
            e.next = t, this.head = e, this.tail = t, this.length = 0
        }

        function l(e, t, n) {
            var r = t.next,
                a = {
                    value: n,
                    prev: t,
                    next: r
                };
            return t.next = a, r.prev = a, e.length++, a
        }

        function u(e, t, n) {
            for (var r = t.next, a = 0; a < n && r !== e.tail; a++) r = r.next;
            t.next = r, r.prev = t, e.length -= a
        }
        if (e.Prism = a, i.stringify = function e(t, n) {
                if ("string" == typeof t) return t;
                if (Array.isArray(t)) {
                    var r = "";
                    return t.forEach(function(t) {
                        r += e(t, n)
                    }), r
                }
                var i = {
                        type: t.type,
                        content: e(t.content, n),
                        tag: "span",
                        classes: ["token", t.type],
                        attributes: {},
                        language: n
                    },
                    s = t.alias;
                s && (Array.isArray(s) ? Array.prototype.push.apply(i.classes, s) : i.classes.push(s)), a.hooks.run("wrap", i);
                var o = "";
                for (var l in i.attributes) o += " " + l + '="' + (i.attributes[l] || "").replace(/"/g, "&quot;") + '"';
                return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + o + ">" + i.content + "</" + i.tag + ">"
            }, !e.document) return e.addEventListener && (a.disableWorkerMessageHandler || e.addEventListener("message", function(t) {
            var n = JSON.parse(t.data),
                r = n.language,
                i = n.code,
                s = n.immediateClose;
            e.postMessage(a.highlight(i, a.languages[r], r)), s && e.close()
        }, !1)), a;
        var c = a.util.currentScript();

        function d() {
            a.manual || a.highlightAll()
        }
        if (c && (a.filename = c.src, c.hasAttribute("data-manual") && (a.manual = !0)), !a.manual) {
            var p = document.readyState;
            "loading" === p || "interactive" === p && c && c.defer ? document.addEventListener("DOMContentLoaded", d) : window.requestAnimationFrame ? window.requestAnimationFrame(d) : window.setTimeout(d, 16)
        }
        return a
    }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism), Prism.languages.markup = {
        comment: {
            pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
            greedy: !0
        },
        prolog: {
            pattern: /<\?[\s\S]+?\?>/,
            greedy: !0
        },
        doctype: {
            pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
            greedy: !0,
            inside: {
                "internal-subset": {
                    pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: null
                },
                string: {
                    pattern: /"[^"]*"|'[^']*'/,
                    greedy: !0
                },
                punctuation: /^<!|>$|[[\]]/,
                "doctype-tag": /^DOCTYPE/i,
                name: /[^\s<>'"]+/
            }
        },
        cdata: {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            greedy: !0
        },
        tag: {
            pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
            greedy: !0,
            inside: {
                tag: {
                    pattern: /^<\/?[^\s>\/]+/,
                    inside: {
                        punctuation: /^<\/?/,
                        namespace: /^[^\s>\/:]+:/
                    }
                },
                "special-attr": [],
                "attr-value": {
                    pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                    inside: {
                        punctuation: [{
                            pattern: /^=/,
                            alias: "attr-equals"
                        }, {
                            pattern: /^(\s*)["']|["']$/,
                            lookbehind: !0
                        }]
                    }
                },
                punctuation: /\/?>/,
                "attr-name": {
                    pattern: /[^\s>\/]+/,
                    inside: {
                        namespace: /^[^\s>\/:]+:/
                    }
                }
            }
        },
        entity: [{
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
        }, /&#x?[\da-f]{1,8};/i]
    }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function(e) {
        "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
    }), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function(e, t) {
            var n = {};
            n["language-" + t] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[t]
            }, n.cdata = /^<!\[CDATA\[|\]\]>$/i;
            var r = {
                "included-cdata": {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: n
                }
            };
            r["language-" + t] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[t]
            };
            var a = {};
            a[e] = {
                pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function() {
                    return e
                }), "i"),
                lookbehind: !0,
                greedy: !0,
                inside: r
            }, Prism.languages.insertBefore("markup", "cdata", a)
        }
    }), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
        value: function(e, t) {
            Prism.languages.markup.tag.inside["special-attr"].push({
                pattern: RegExp("(^|[\"'\\s])(?:" + e + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"),
                lookbehind: !0,
                inside: {
                    "attr-name": /^[^\s=]+/,
                    "attr-value": {
                        pattern: /=[\s\S]+/,
                        inside: {
                            value: {
                                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                                lookbehind: !0,
                                alias: [t, "language-" + t],
                                inside: Prism.languages[t]
                            },
                            punctuation: [{
                                pattern: /^=/,
                                alias: "attr-equals"
                            }, /"|'/]
                        }
                    }
                }
            })
        }
    }), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml,
    function(e) {
        var t = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: RegExp("@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" + t.source + ")*?(?:;|(?=\\s*\\{))"),
                inside: {
                    rule: /^@[\w-]+/,
                    "selector-function-argument": {
                        pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                        lookbehind: !0,
                        alias: "selector"
                    },
                    keyword: {
                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                        lookbehind: !0
                    }
                }
            },
            url: {
                pattern: RegExp("\\burl\\((?:" + t.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"),
                greedy: !0,
                inside: {
                    function: /^url/i,
                    punctuation: /^\(|\)$/,
                    string: {
                        pattern: RegExp("^" + t.source + "$"),
                        alias: "url"
                    }
                }
            },
            selector: {
                pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + t.source + ")*(?=\\s*\\{)"),
                lookbehind: !0
            },
            string: {
                pattern: t,
                greedy: !0
            },
            property: {
                pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
                lookbehind: !0
            },
            important: /!important\b/i,
            function: {
                pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
                lookbehind: !0
            },
            punctuation: /[(){};:,]/
        }, e.languages.css.atrule.inside.rest = e.languages.css;
        var n = e.languages.markup;
        n && (n.tag.addInlined("style", "css"), n.tag.addAttribute("style", "css"))
    }(Prism), Prism.languages.clike = {
        comment: [{
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: !0,
            greedy: !0
        }],
        string: {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0
        },
        "class-name": {
            pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: {
                punctuation: /[.\\]/
            }
        },
        keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        boolean: /\b(?:false|true)\b/,
        function: /\b\w+(?=\()/,
        number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        punctuation: /[{}[\];(),.:]/
    }, Prism.languages.javascript = Prism.languages.extend("clike", {
        "class-name": [Prism.languages.clike["class-name"], {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: !0
        }],
        keyword: [{
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: !0
        }, {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0
        }],
        function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        number: {
            pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"),
            lookbehind: !0
        },
        operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern: RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"),
            lookbehind: !0,
            greedy: !0,
            inside: {
                "regex-source": {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: "language-regex",
                    inside: Prism.languages.regex
                },
                "regex-delimiter": /^\/|\/$/,
                "regex-flags": /^[a-z]+$/
            }
        },
        "function-variable": {
            pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: "function"
        },
        parameter: [{
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), Prism.languages.insertBefore("javascript", "string", {
        hashbang: {
            pattern: /^#!.*/,
            greedy: !0,
            alias: "comment"
        },
        "template-string": {
            pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
            greedy: !0,
            inside: {
                "template-punctuation": {
                    pattern: /^`|`$/,
                    alias: "string"
                },
                interpolation: {
                    pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                    lookbehind: !0,
                    inside: {
                        "interpolation-punctuation": {
                            pattern: /^\$\{|\}$/,
                            alias: "punctuation"
                        },
                        rest: Prism.languages.javascript
                    }
                },
                string: /[\s\S]+/
            }
        },
        "string-property": {
            pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
            lookbehind: !0,
            greedy: !0,
            alias: "property"
        }
    }), Prism.languages.insertBefore("javascript", "operator", {
        "literal-property": {
            pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
            lookbehind: !0,
            alias: "property"
        }
    }), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism.languages.js = Prism.languages.javascript,
    function() {
        if (void 0 !== Prism && "undefined" != typeof document) {
            var e = "line-numbers",
                t = /\n(?!$)/g,
                n = Prism.plugins.lineNumbers = {
                    getLine: function(t, n) {
                        if ("PRE" === t.tagName && t.classList.contains(e)) {
                            var r = t.querySelector(".line-numbers-rows");
                            if (r) {
                                var a = parseInt(t.getAttribute("data-start"), 10) || 1,
                                    i = a + (r.children.length - 1);
                                n < a && (n = a), n > i && (n = i);
                                var s = n - a;
                                return r.children[s]
                            }
                        }
                    },
                    resize: function(e) {
                        a([e])
                    },
                    assumeViewportIndependence: !0
                },
                r = void 0;
            window.addEventListener("resize", function() {
                n.assumeViewportIndependence && r === window.innerWidth || (r = window.innerWidth, a(Array.prototype.slice.call(document.querySelectorAll("pre.line-numbers"))))
            }), Prism.hooks.add("complete", function(n) {
                if (n.code) {
                    var r = n.element,
                        i = r.parentNode;
                    if (i && /pre/i.test(i.nodeName) && !r.querySelector(".line-numbers-rows") && Prism.util.isActive(r, e)) {
                        r.classList.remove(e), i.classList.add(e);
                        var s, o = n.code.match(t),
                            l = Array((o ? o.length + 1 : 1) + 1).join("<span></span>");
                        (s = document.createElement("span")).setAttribute("aria-hidden", "true"), s.className = "line-numbers-rows", s.innerHTML = l, i.hasAttribute("data-start") && (i.style.counterReset = "linenumber " + (parseInt(i.getAttribute("data-start"), 10) - 1)), n.element.appendChild(s), a([i]), Prism.hooks.run("line-numbers", n)
                    }
                }
            }), Prism.hooks.add("line-numbers", function(e) {
                e.plugins = e.plugins || {}, e.plugins.lineNumbers = !0
            })
        }

        function a(e) {
            if (0 != (e = e.filter(function(e) {
                    var t, n = ((t = e) ? window.getComputedStyle ? getComputedStyle(t) : t.currentStyle || null : null)["white-space"];
                    return "pre-wrap" === n || "pre-line" === n
                })).length) {
                var n = e.map(function(e) {
                    var n = e.querySelector("code"),
                        r = e.querySelector(".line-numbers-rows");
                    if (n && r) {
                        var a = e.querySelector(".line-numbers-sizer"),
                            i = n.textContent.split(t);
                        a || ((a = document.createElement("span")).className = "line-numbers-sizer", n.appendChild(a)), a.innerHTML = "0", a.style.display = "block";
                        var s = a.getBoundingClientRect().height;
                        return a.innerHTML = "", {
                            element: e,
                            lines: i,
                            lineHeights: [],
                            oneLinerHeight: s,
                            sizer: a
                        }
                    }
                }).filter(Boolean);
                n.forEach(function(e) {
                    var t = e.sizer,
                        n = e.lines,
                        r = e.lineHeights,
                        a = e.oneLinerHeight;
                    r[n.length - 1] = void 0, n.forEach(function(e, n) {
                        if (e && e.length > 1) {
                            var i = t.appendChild(document.createElement("span"));
                            i.style.display = "block", i.textContent = e
                        } else r[n] = a
                    })
                }), n.forEach(function(e) {
                    for (var t = e.sizer, n = e.lineHeights, r = 0, a = 0; a < n.length; a++) void 0 === n[a] && (n[a] = t.children[r++].getBoundingClientRect().height)
                }), n.forEach(function(e) {
                    var t = e.sizer,
                        n = e.element.querySelector(".line-numbers-rows");
                    t.style.display = "none", t.innerHTML = "", e.lineHeights.forEach(function(e, t) {
                        n.children[t].style.height = e + "px"
                    })
                })
            }
        }
    }(), void 0 !== Prism && "undefined" != typeof document && (Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Prism.plugins.UnescapedMarkup = !0, Prism.hooks.add("before-highlightall", function(e) {
        e.selector += ', [class*="lang-"] script[type="text/plain"], [class*="language-"] script[type="text/plain"], script[type="text/plain"][class*="lang-"], script[type="text/plain"][class*="language-"]'
    }), Prism.hooks.add("before-sanity-check", function(e) {
        var t = e.element;
        if (t.matches('script[type="text/plain"]')) {
            var n = document.createElement("code"),
                r = document.createElement("pre");
            r.className = n.className = t.className;
            var a = t.dataset;
            return Object.keys(a || {}).forEach(function(e) {
                Object.prototype.hasOwnProperty.call(a, e) && (r.dataset[e] = a[e])
            }), n.textContent = e.code = e.code.replace(/&lt;\/script(?:>|&gt;)/gi, "</script>"), r.appendChild(n), t.parentNode.replaceChild(r, t), void(e.element = n)
        }
        if (!e.code) {
            var i = t.childNodes;
            1 === i.length && "#comment" == i[0].nodeName && (t.textContent = e.code = i[0].textContent)
        }
    })),
    function() {
        if (void 0 !== Prism) {
            var e = Object.assign || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                    return e
                },
                t = {
                    "remove-trailing": "boolean",
                    "remove-indent": "boolean",
                    "left-trim": "boolean",
                    "right-trim": "boolean",
                    "break-lines": "number",
                    indent: "number",
                    "remove-initial-line-feed": "boolean",
                    "tabs-to-spaces": "number",
                    "spaces-to-tabs": "number"
                };
            n.prototype = {
                setDefaults: function(t) {
                    this.defaults = e(this.defaults, t)
                },
                normalize: function(t, n) {
                    for (var r in n = e(this.defaults, n)) {
                        var a = r.replace(/-(\w)/g, function(e, t) {
                            return t.toUpperCase()
                        });
                        "normalize" !== r && "setDefaults" !== a && n[r] && this[a] && (t = this[a].call(this, t, n[r]))
                    }
                    return t
                },
                leftTrim: function(e) {
                    return e.replace(/^\s+/, "")
                },
                rightTrim: function(e) {
                    return e.replace(/\s+$/, "")
                },
                tabsToSpaces: function(e, t) {
                    return t = 0 | t || 4, e.replace(/\t/g, Array(++t).join(" "))
                },
                spacesToTabs: function(e, t) {
                    return t = 0 | t || 4, e.replace(RegExp(" {" + t + "}", "g"), "	")
                },
                removeTrailing: function(e) {
                    return e.replace(/\s*?$/gm, "")
                },
                removeInitialLineFeed: function(e) {
                    return e.replace(/^(?:\r?\n|\r)/, "")
                },
                removeIndent: function(e) {
                    var t = e.match(/^[^\S\n\r]*(?=\S)/gm);
                    return t && t[0].length ? (t.sort(function(e, t) {
                        return e.length - t.length
                    }), t[0].length ? e.replace(RegExp("^" + t[0], "gm"), "") : e) : e
                },
                indent: function(e, t) {
                    return e.replace(/^[^\S\n\r]*(?=\S)/gm, Array(++t).join("	") + "$&")
                },
                breakLines: function(e, t) {
                    t = !0 === t ? 80 : 0 | t || 80;
                    for (var n = e.split("\n"), a = 0; a < n.length; ++a)
                        if (!(r(n[a]) <= t)) {
                            for (var i = n[a].split(/(\s+)/g), s = 0, o = 0; o < i.length; ++o) {
                                var l = r(i[o]);
                                (s += l) > t && (i[o] = "\n" + i[o], s = l)
                            }
                            n[a] = i.join("")
                        }
                    return n.join("\n")
                }
            }, "undefined" != typeof module && module.exports && (module.exports = n), Prism.plugins.NormalizeWhitespace = new n({
                "remove-trailing": !0,
                "remove-indent": !0,
                "left-trim": !0,
                "right-trim": !0
            }), Prism.hooks.add("before-sanity-check", function(e) {
                var n = Prism.plugins.NormalizeWhitespace;
                if ((!e.settings || !1 !== e.settings["whitespace-normalization"]) && Prism.util.isActive(e.element, "whitespace-normalization", !0)) {
                    if (e.element && e.element.parentNode || !e.code) {
                        var r = e.element.parentNode;
                        if (e.code && r && "pre" === r.nodeName.toLowerCase()) {
                            for (var a in null == e.settings && (e.settings = {}), t)
                                if (Object.hasOwnProperty.call(t, a)) {
                                    var i = t[a];
                                    if (r.hasAttribute("data-" + a)) try {
                                        var s = JSON.parse(r.getAttribute("data-" + a) || "true");
                                        typeof s === i && (e.settings[a] = s)
                                    } catch (o) {}
                                }
                            for (var l = r.childNodes, u = "", c = "", d = !1, p = 0; p < l.length; ++p) {
                                var g = l[p];
                                g == e.element ? d = !0 : "#text" === g.nodeName && (d ? c += g.nodeValue : u += g.nodeValue, r.removeChild(g), --p)
                            }
                            if (e.element.children.length && Prism.plugins.KeepMarkup) {
                                var m = u + e.element.innerHTML + c;
                                e.element.innerHTML = n.normalize(m, e.settings), e.code = e.element.textContent
                            } else e.code = u + e.code + c, e.code = n.normalize(e.code, e.settings)
                        }
                    } else e.code = n.normalize(e.code, e.settings)
                }
            })
        }

        function n(t) {
            this.defaults = e({}, t)
        }

        function r(e) {
            for (var t = 0, n = 0; n < e.length; ++n) 9 == e.charCodeAt(n) && (t += 3);
            return e.length + t
        }
    }(),
    function() {
        if (void 0 !== Prism && "undefined" != typeof document) {
            var e = [],
                t = {},
                n = function() {};
            Prism.plugins.toolbar = {};
            var r = Prism.plugins.toolbar.registerButton = function(n, r) {
                    var a;
                    a = "function" == typeof r ? r : function(e) {
                        var t;
                        return "function" == typeof r.onClick ? ((t = document.createElement("button")).type = "button", t.addEventListener("click", function() {
                            r.onClick.call(this, e)
                        })) : "string" == typeof r.url ? (t = document.createElement("a")).href = r.url : t = document.createElement("span"), r.className && t.classList.add(r.className), t.textContent = r.text, t
                    }, n in t ? console.warn('There is a button with the key "' + n + '" registered already.') : e.push(t[n] = a)
                },
                a = Prism.plugins.toolbar.hook = function(r) {
                    var a = r.element.parentNode;
                    if (a && /pre/i.test(a.nodeName) && !a.parentNode.classList.contains("code-toolbar")) {
                        var i = document.createElement("div");
                        i.classList.add("code-toolbar"), a.parentNode.insertBefore(i, a), i.appendChild(a);
                        var s = document.createElement("div");
                        s.classList.add("toolbar");
                        var o = e,
                            l = function(e) {
                                for (; e;) {
                                    var t = e.getAttribute("data-toolbar-order");
                                    if (null != t) return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                                    e = e.parentElement
                                }
                            }(r.element);
                        l && (o = l.map(function(e) {
                            return t[e] || n
                        })), o.forEach(function(e) {
                            var t = e(r);
                            if (t) {
                                var n = document.createElement("div");
                                n.classList.add("toolbar-item"), n.appendChild(t), s.appendChild(n)
                            }
                        }), i.appendChild(s)
                    }
                };
            r("label", function(e) {
                var t = e.element.parentNode;
                if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
                    var n, r, a = t.getAttribute("data-label");
                    try {
                        r = document.querySelector("template#" + a)
                    } catch (i) {}
                    return r ? n = r.content : (t.hasAttribute("data-url") ? (n = document.createElement("a")).href = t.getAttribute("data-url") : n = document.createElement("span"), n.textContent = a), n
                }
            }), Prism.hooks.add("complete", a)
        }
    }(),
    function() {
        function e(e) {
            var t = document.createElement("textarea");
            t.value = e.getText(), t.style.top = "0", t.style.left = "0", t.style.position = "fixed", document.body.appendChild(t), t.focus(), t.select();
            try {
                var n = document.execCommand("copy");
                setTimeout(function() {
                    n ? e.success() : e.error()
                }, 1)
            } catch (r) {
                setTimeout(function() {
                    e.error(r)
                }, 1)
            }
            document.body.removeChild(t)
        }
        void 0 !== Prism && "undefined" != typeof document && (Prism.plugins.toolbar ? Prism.plugins.toolbar.registerButton("copy-to-clipboard", function(t) {
            var n = t.element,
                r = function(e) {
                    var t = {
                        copy: "Copy",
                        "copy-error": "Press Ctrl+C to copy",
                        "copy-success": "Copied!",
                        "copy-timeout": 5e3
                    };
                    for (var n in t) {
                        for (var r = "data-prismjs-" + n, a = e; a && !a.hasAttribute(r);) a = a.parentElement;
                        a && (t[n] = a.getAttribute(r))
                    }
                    return t
                }(n),
                a = document.createElement("button");
            a.className = "copy-to-clipboard-button", a.setAttribute("type", "button");
            var i = document.createElement("span");
            return a.appendChild(i), o("copy"),
                function(t, n) {
                    t.addEventListener("click", function() {
                        var t;
                        t = n, navigator.clipboard ? navigator.clipboard.writeText(t.getText()).then(t.success, function() {
                            e(t)
                        }) : e(t)
                    })
                }(a, {
                    getText: function() {
                        return n.textContent
                    },
                    success: function() {
                        o("copy-success"), s()
                    },
                    error: function() {
                        o("copy-error"), setTimeout(function() {
                            var e;
                            e = n, window.getSelection().selectAllChildren(e)
                        }, 1), s()
                    }
                }), a;

            function s() {
                setTimeout(function() {
                    o("copy")
                }, r["copy-timeout"])
            }

            function o(e) {
                i.textContent = r[e], a.setAttribute("data-copy-state", e)
            }
        }) : console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."))
    }();