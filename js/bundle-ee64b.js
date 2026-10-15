"use strict";
(() => {
  var e = Object.defineProperty,
    t = Object.defineProperties,
    i = Object.getOwnPropertyDescriptor,
    n = Object.getOwnPropertyDescriptors,
    s = Object.getOwnPropertySymbols,
    a = Object.getPrototypeOf,
    r = Object.prototype.hasOwnProperty,
    o = Object.prototype.propertyIsEnumerable,
    l = Reflect.get,
    h = (t, i, n) =>
      i in t
        ? e(t, i, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (t[i] = n),
    c = (e, t) => {
      for (var i in t || (t = {})) r.call(t, i) && h(e, i, t[i]);
      if (s) for (var i of s(t)) o.call(t, i) && h(e, i, t[i]);
      return e;
    },
    d = (e, i) => t(e, n(i)),
    u = (t, n, s, a) => {
      for (
        var r, o = a > 1 ? void 0 : a ? i(n, s) : n, l = t.length - 1;
        l >= 0;
        l--
      )
        (r = t[l]) && (o = (a ? r(n, s, o) : r(o)) || o);
      return a && o && e(n, s, o), o;
    },
    p = (e, t, i) => (h(e, "symbol" != typeof t ? t + "" : t, i), i),
    g = (e, t, i) => {
      if (!t.has(e)) throw TypeError("Cannot " + i);
    },
    f = (e, t, i) => (
      g(e, t, "read from private field"), i ? i.call(e) : t.get(e)
    ),
    m = (e, t, i) => {
      if (t.has(e))
        throw TypeError("Cannot add the same private member more than once");
      t instanceof WeakSet ? t.add(e) : t.set(e, i);
    },
    y = (e, t, i, n) => (
      g(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i
    ),
    v = (e, t, i) => l(a(e), i, t),
    _ = (e, t, i) =>
      new Promise((n, s) => {
        var a = (e) => {
          try {
            o(i.next(e));
          } catch (e) {
            s(e);
          }
        },
          r = (e) => {
            try {
              o(i.throw(e));
            } catch (e) {
              s(e);
            }
          },
          o = (e) =>
            e.done ? n(e.value) : Promise.resolve(e.value).then(a, r);
        o((i = i.apply(e, t)).next());
      }),
    I = {
      tileWidth: 271,
      tileHeight: 333,
      tileStep: 2,
      scale: 1,
      debug: !1,
      localTestQuestion: 0,
      openGuide: !0,
      breakpoint: 0,
      allowedOrigins: [
        "https://vitamahjong.io",
        "https://www.vitamahjong.io",
        "http://localhost:5173",
        "http://localhost:2999",
        "http://10.10.23.158:5173",
        "http://10.10.13.155:5173",
      ],
      times: { normal: { shuffle: 1, hint: 1 }, dc: { shuffle: 0, hint: 0 } },
      skipHome: !0,
    },
    S = !1,
    L = 1,
    A = "",
    E = function (e) {
      const t = [];
      let i = 0;
      for (let n = 0; n < e.length; n++) {
        let s = e.charCodeAt(n);
        s < 128
          ? (t[i++] = s)
          : s < 2048
            ? ((t[i++] = (s >> 6) | 192), (t[i++] = (63 & s) | 128))
            : 55296 == (64512 & s) &&
              n + 1 < e.length &&
              56320 == (64512 & e.charCodeAt(n + 1))
              ? ((s = 65536 + ((1023 & s) << 10) + (1023 & e.charCodeAt(++n))),
                (t[i++] = (s >> 18) | 240),
                (t[i++] = ((s >> 12) & 63) | 128),
                (t[i++] = ((s >> 6) & 63) | 128),
                (t[i++] = (63 & s) | 128))
              : ((t[i++] = (s >> 12) | 224),
                (t[i++] = ((s >> 6) & 63) | 128),
                (t[i++] = (63 & s) | 128));
      }
      return t;
    },
    C = {
      byteToCharMap_: null,
      charToByteMap_: null,
      byteToCharMapWebSafe_: null,
      charToByteMapWebSafe_: null,
      ENCODED_VALS_BASE:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + "+/=";
      },
      get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + "-_.";
      },
      HAS_NATIVE_SUPPORT: "function" == typeof atob,
      encodeByteArray(e, t) {
        if (!Array.isArray(e))
          throw Error("encodeByteArray takes an array as a parameter");
        this.init_();
        const i = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
          n = [];
        for (let t = 0; t < e.length; t += 3) {
          const s = e[t],
            a = t + 1 < e.length,
            r = a ? e[t + 1] : 0,
            o = t + 2 < e.length,
            l = o ? e[t + 2] : 0,
            h = s >> 2,
            c = ((3 & s) << 4) | (r >> 4);
          let d = ((15 & r) << 2) | (l >> 6),
            u = 63 & l;
          o || ((u = 64), a || (d = 64)), n.push(i[h], i[c], i[d], i[u]);
        }
        return n.join("");
      },
      encodeString(e, t) {
        return this.HAS_NATIVE_SUPPORT && !t
          ? btoa(e)
          : this.encodeByteArray(E(e), t);
      },
      decodeString(e, t) {
        return this.HAS_NATIVE_SUPPORT && !t
          ? atob(e)
          : (function (e) {
            const t = [];
            let i = 0,
              n = 0;
            for (; i < e.length;) {
              const s = e[i++];
              if (s < 128) t[n++] = String.fromCharCode(s);
              else if (s > 191 && s < 224) {
                const a = e[i++];
                t[n++] = String.fromCharCode(((31 & s) << 6) | (63 & a));
              } else if (s > 239 && s < 365) {
                const a =
                  (((7 & s) << 18) |
                    ((63 & e[i++]) << 12) |
                    ((63 & e[i++]) << 6) |
                    (63 & e[i++])) -
                  65536;
                (t[n++] = String.fromCharCode(55296 + (a >> 10))),
                  (t[n++] = String.fromCharCode(56320 + (1023 & a)));
              } else {
                const a = e[i++],
                  r = e[i++];
                t[n++] = String.fromCharCode(
                  ((15 & s) << 12) | ((63 & a) << 6) | (63 & r)
                );
              }
            }
            return t.join("");
          })(this.decodeStringToByteArray(e, t));
      },
      decodeStringToByteArray(e, t) {
        this.init_();
        const i = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
          n = [];
        for (let t = 0; t < e.length;) {
          const s = i[e.charAt(t++)],
            a = t < e.length ? i[e.charAt(t)] : 0;
          ++t;
          const r = t < e.length ? i[e.charAt(t)] : 64;
          ++t;
          const o = t < e.length ? i[e.charAt(t)] : 64;
          if ((++t, null == s || null == a || null == r || null == o))
            throw new w();
          const l = (s << 2) | (a >> 4);
          if ((n.push(l), 64 !== r)) {
            const e = ((a << 4) & 240) | (r >> 2);
            if ((n.push(e), 64 !== o)) {
              const e = ((r << 6) & 192) | o;
              n.push(e);
            }
          }
        }
        return n;
      },
      init_() {
        if (!this.byteToCharMap_) {
          (this.byteToCharMap_ = {}),
            (this.charToByteMap_ = {}),
            (this.byteToCharMapWebSafe_ = {}),
            (this.charToByteMapWebSafe_ = {});
          for (let e = 0; e < this.ENCODED_VALS.length; e++)
            (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
              (this.charToByteMap_[this.byteToCharMap_[e]] = e),
              (this.byteToCharMapWebSafe_[e] =
                this.ENCODED_VALS_WEBSAFE.charAt(e)),
              (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
              e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
                (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
        }
      },
    },
    w = class extends Error {
      constructor() {
        super(...arguments), (this.name = "DecodeBase64StringError");
      }
    },
    b = function (e) {
      return (function (e) {
        const t = E(e);
        return C.encodeByteArray(t, !0);
      })(e).replace(/\./g, "");
    },
    T = function (e) {
      try {
        return C.decodeString(e, !0);
      } catch (e) {
        console.error("base64Decode failed: ", e);
      }
      return null;
    };
  var M = () =>
    (function () {
      if ("undefined" != typeof self) return self;
      if ("undefined" != typeof window) return window;
      if ("undefined" != typeof global) return global;
      throw new Error("Unable to locate global object.");
    })().__FIREBASE_DEFAULTS__,
    D = () => {
      try {
        return (
          M() ||
          (() => {
            if ("undefined" == typeof process || void 0 === process.env) return;
            const e = process.env.__FIREBASE_DEFAULTS__;
            return e ? JSON.parse(e) : void 0;
          })() ||
          (() => {
            if ("undefined" == typeof document) return;
            let e;
            try {
              e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
            } catch (e) {
              return;
            }
            const t = e && T(e[1]);
            return t && JSON.parse(t);
          })()
        );
      } catch (e) {
        return void console.info(
          `Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`
        );
      }
    },
    k = () => {
      var e;
      return null === (e = D()) || void 0 === e ? void 0 : e.config;
    },
    B = (e) => {
      var t;
      return null === (t = D()) || void 0 === t ? void 0 : t[`_${e}`];
    },
    O = class {
      constructor() {
        (this.reject = () => { }),
          (this.resolve = () => { }),
          (this.promise = new Promise((e, t) => {
            (this.resolve = e), (this.reject = t);
          }));
      }
      wrapCallback(e) {
        return (t, i) => {
          t ? this.reject(t) : this.resolve(i),
            "function" == typeof e &&
            (this.promise.catch(() => { }), 1 === e.length ? e(t) : e(t, i));
        };
      }
    };
  function P() {
    return "undefined" != typeof navigator &&
      "string" == typeof navigator.userAgent
      ? navigator.userAgent
      : "";
  }
  function R() {
    const e =
      "object" == typeof chrome
        ? chrome.runtime
        : "object" == typeof browser
          ? browser.runtime
          : void 0;
    return "object" == typeof e && void 0 !== e.id;
  }
  function N() {
    try {
      return "object" == typeof indexedDB;
    } catch (e) {
      return !1;
    }
  }
  function x() {
    return new Promise((e, t) => {
      try {
        let i = !0;
        const n = "validate-browser-context-for-indexeddb-analytics-module",
          s = self.indexedDB.open(n);
        (s.onsuccess = () => {
          s.result.close(), i || self.indexedDB.deleteDatabase(n), e(!0);
        }),
          (s.onupgradeneeded = () => {
            i = !1;
          }),
          (s.onerror = () => {
            var e;
            t(
              (null === (e = s.error) || void 0 === e ? void 0 : e.message) ||
              ""
            );
          });
      } catch (e) {
        t(e);
      }
    });
  }
  function F() {
    return !("undefined" == typeof navigator || !navigator.cookieEnabled);
  }
  var H = class e extends Error {
    constructor(t, i, n) {
      super(i),
        (this.code = t),
        (this.customData = n),
        (this.name = "FirebaseError"),
        Object.setPrototypeOf(this, e.prototype),
        Error.captureStackTrace &&
        Error.captureStackTrace(this, G.prototype.create);
    }
  },
    G = class {
      constructor(e, t, i) {
        (this.service = e), (this.serviceName = t), (this.errors = i);
      }
      create(e, ...t) {
        const i = t[0] || {},
          n = `${this.service}/${e}`,
          s = this.errors[e],
          a = s
            ? (function (e, t) {
              return e.replace(U, (e, i) => {
                const n = t[i];
                return null != n ? String(n) : `<${i}?>`;
              });
            })(s, i)
            : "Error",
          r = `${this.serviceName}: ${a} (${n}).`;
        return new H(n, r, i);
      }
    };
  var U = /\{\$([^}]+)}/g;
  function K(e, t) {
    if (e === t) return !0;
    const i = Object.keys(e),
      n = Object.keys(t);
    for (const s of i) {
      if (!n.includes(s)) return !1;
      const i = e[s],
        a = t[s];
      if (V(i) && V(a)) {
        if (!K(i, a)) return !1;
      } else if (i !== a) return !1;
    }
    for (const e of n) if (!i.includes(e)) return !1;
    return !0;
  }
  function V(e) {
    return null !== e && "object" == typeof e;
  }
  function J(e) {
    const t = [];
    for (const [i, n] of Object.entries(e))
      Array.isArray(n)
        ? n.forEach((e) => {
          t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e));
        })
        : t.push(encodeURIComponent(i) + "=" + encodeURIComponent(n));
    return t.length ? "&" + t.join("&") : "";
  }
  function W(e) {
    const t = {};
    return (
      e
        .replace(/^\?/, "")
        .split("&")
        .forEach((e) => {
          if (e) {
            const [i, n] = e.split("=");
            t[decodeURIComponent(i)] = decodeURIComponent(n);
          }
        }),
      t
    );
  }
  function j(e) {
    const t = e.indexOf("?");
    if (!t) return "";
    const i = e.indexOf("#", t);
    return e.substring(t, i > 0 ? i : void 0);
  }
  var q = class {
    constructor(e, t) {
      (this.observers = []),
        (this.unsubscribes = []),
        (this.observerCount = 0),
        (this.task = Promise.resolve()),
        (this.finalized = !1),
        (this.onNoObservers = t),
        this.task
          .then(() => {
            e(this);
          })
          .catch((e) => {
            this.error(e);
          });
    }
    next(e) {
      this.forEachObserver((t) => {
        t.next(e);
      });
    }
    error(e) {
      this.forEachObserver((t) => {
        t.error(e);
      }),
        this.close(e);
    }
    complete() {
      this.forEachObserver((e) => {
        e.complete();
      }),
        this.close();
    }
    subscribe(e, t, i) {
      let n;
      if (void 0 === e && void 0 === t && void 0 === i)
        throw new Error("Missing Observer.");
      (n = (function (e, t) {
        if ("object" != typeof e || null === e) return !1;
        for (const i of t) if (i in e && "function" == typeof e[i]) return !0;
        return !1;
      })(e, ["next", "error", "complete"])
        ? e
        : { next: e, error: t, complete: i }),
        void 0 === n.next && (n.next = Y),
        void 0 === n.error && (n.error = Y),
        void 0 === n.complete && (n.complete = Y);
      const s = this.unsubscribeOne.bind(this, this.observers.length);
      return (
        this.finalized &&
        this.task.then(() => {
          try {
            this.finalError ? n.error(this.finalError) : n.complete();
          } catch (e) { }
        }),
        this.observers.push(n),
        s
      );
    }
    unsubscribeOne(e) {
      void 0 !== this.observers &&
        void 0 !== this.observers[e] &&
        (delete this.observers[e],
          (this.observerCount -= 1),
          0 === this.observerCount &&
          void 0 !== this.onNoObservers &&
          this.onNoObservers(this));
    }
    forEachObserver(e) {
      if (!this.finalized)
        for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e);
    }
    sendOne(e, t) {
      this.task.then(() => {
        if (void 0 !== this.observers && void 0 !== this.observers[e])
          try {
            t(this.observers[e]);
          } catch (e) {
            "undefined" != typeof console && console.error && console.error(e);
          }
      });
    }
    close(e) {
      this.finalized ||
        ((this.finalized = !0),
          void 0 !== e && (this.finalError = e),
          this.task.then(() => {
            (this.observers = void 0), (this.onNoObservers = void 0);
          }));
    }
  };
  function Y() { }
  function z(e, t = 1e3, i = 2) {
    const n = t * Math.pow(i, e),
      s = Math.round(0.5 * n * (Math.random() - 0.5) * 2);
    return Math.min(144e5, n + s);
  }
  function Q(e) {
    return e && e._delegate ? e._delegate : e;
  }
  var $ = class {
    constructor(e, t, i) {
      (this.name = e),
        (this.instanceFactory = t),
        (this.type = i),
        (this.multipleInstances = !1),
        (this.serviceProps = {}),
        (this.instantiationMode = "LAZY"),
        (this.onInstanceCreated = null);
    }
    setInstantiationMode(e) {
      return (this.instantiationMode = e), this;
    }
    setMultipleInstances(e) {
      return (this.multipleInstances = e), this;
    }
    setServiceProps(e) {
      return (this.serviceProps = e), this;
    }
    setInstanceCreatedCallback(e) {
      return (this.onInstanceCreated = e), this;
    }
  },
    Z = "[DEFAULT]",
    X = class {
      constructor(e, t) {
        (this.name = e),
          (this.container = t),
          (this.component = null),
          (this.instances = new Map()),
          (this.instancesDeferred = new Map()),
          (this.instancesOptions = new Map()),
          (this.onInitCallbacks = new Map());
      }
      get(e) {
        const t = this.normalizeInstanceIdentifier(e);
        if (!this.instancesDeferred.has(t)) {
          const e = new O();
          if (
            (this.instancesDeferred.set(t, e),
              this.isInitialized(t) || this.shouldAutoInitialize())
          )
            try {
              const i = this.getOrInitializeService({ instanceIdentifier: t });
              i && e.resolve(i);
            } catch (e) { }
        }
        return this.instancesDeferred.get(t).promise;
      }
      getImmediate(e) {
        var t;
        const i = this.normalizeInstanceIdentifier(
          null == e ? void 0 : e.identifier
        ),
          n =
            null !== (t = null == e ? void 0 : e.optional) && void 0 !== t && t;
        if (!this.isInitialized(i) && !this.shouldAutoInitialize()) {
          if (n) return null;
          throw Error(`Service ${this.name} is not available`);
        }
        try {
          return this.getOrInitializeService({ instanceIdentifier: i });
        } catch (e) {
          if (n) return null;
          throw e;
        }
      }
      getComponent() {
        return this.component;
      }
      setComponent(e) {
        if (e.name !== this.name)
          throw Error(
            `Mismatching Component ${e.name} for Provider ${this.name}.`
          );
        if (this.component)
          throw Error(`Component for ${this.name} has already been provided`);
        if (((this.component = e), this.shouldAutoInitialize())) {
          if (
            (function (e) {
              return "EAGER" === e.instantiationMode;
            })(e)
          )
            try {
              this.getOrInitializeService({ instanceIdentifier: Z });
            } catch (e) { }
          for (const [e, t] of this.instancesDeferred.entries()) {
            const i = this.normalizeInstanceIdentifier(e);
            try {
              const e = this.getOrInitializeService({ instanceIdentifier: i });
              t.resolve(e);
            } catch (e) { }
          }
        }
      }
      clearInstance(e = Z) {
        this.instancesDeferred.delete(e),
          this.instancesOptions.delete(e),
          this.instances.delete(e);
      }
      delete() {
        return _(this, null, function* () {
          const e = Array.from(this.instances.values());
          yield Promise.all([
            ...e.filter((e) => "INTERNAL" in e).map((e) => e.INTERNAL.delete()),
            ...e.filter((e) => "_delete" in e).map((e) => e._delete()),
          ]);
        });
      }
      isComponentSet() {
        return null != this.component;
      }
      isInitialized(e = Z) {
        return this.instances.has(e);
      }
      getOptions(e = Z) {
        return this.instancesOptions.get(e) || {};
      }
      initialize(e = {}) {
        const { options: t = {} } = e,
          i = this.normalizeInstanceIdentifier(e.instanceIdentifier);
        if (this.isInitialized(i))
          throw Error(`${this.name}(${i}) has already been initialized`);
        if (!this.isComponentSet())
          throw Error(`Component ${this.name} has not been registered yet`);
        const n = this.getOrInitializeService({
          instanceIdentifier: i,
          options: t,
        });
        for (const [e, t] of this.instancesDeferred.entries()) {
          i === this.normalizeInstanceIdentifier(e) && t.resolve(n);
        }
        return n;
      }
      onInit(e, t) {
        var i;
        const n = this.normalizeInstanceIdentifier(t),
          s =
            null !== (i = this.onInitCallbacks.get(n)) && void 0 !== i
              ? i
              : new Set();
        s.add(e), this.onInitCallbacks.set(n, s);
        const a = this.instances.get(n);
        return (
          a && e(a, n),
          () => {
            s.delete(e);
          }
        );
      }
      invokeOnInitCallbacks(e, t) {
        const i = this.onInitCallbacks.get(t);
        if (i)
          for (const n of i)
            try {
              n(e, t);
            } catch (e) { }
      }
      getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
        let i = this.instances.get(e);
        if (
          !i &&
          this.component &&
          ((i = this.component.instanceFactory(this.container, {
            instanceIdentifier: ((n = e), n === Z ? void 0 : n),
            options: t,
          })),
            this.instances.set(e, i),
            this.instancesOptions.set(e, t),
            this.invokeOnInitCallbacks(i, e),
            this.component.onInstanceCreated)
        )
          try {
            this.component.onInstanceCreated(this.container, e, i);
          } catch (e) { }
        var n;
        return i || null;
      }
      normalizeInstanceIdentifier(e = Z) {
        return this.component ? (this.component.multipleInstances ? e : Z) : e;
      }
      shouldAutoInitialize() {
        return (
          !!this.component && "EXPLICIT" !== this.component.instantiationMode
        );
      }
    };
  var ee,
    te,
    ie = class {
      constructor(e) {
        (this.name = e), (this.providers = new Map());
      }
      addComponent(e) {
        const t = this.getProvider(e.name);
        if (t.isComponentSet())
          throw new Error(
            `Component ${e.name} has already been registered with ${this.name}`
          );
        t.setComponent(e);
      }
      addOrOverwriteComponent(e) {
        this.getProvider(e.name).isComponentSet() &&
          this.providers.delete(e.name),
          this.addComponent(e);
      }
      getProvider(e) {
        if (this.providers.has(e)) return this.providers.get(e);
        const t = new X(e, this);
        return this.providers.set(e, t), t;
      }
      getProviders() {
        return Array.from(this.providers.values());
      }
    },
    ne = [];
  ((te = ee || (ee = {}))[(te.DEBUG = 0)] = "DEBUG"),
    (te[(te.VERBOSE = 1)] = "VERBOSE"),
    (te[(te.INFO = 2)] = "INFO"),
    (te[(te.WARN = 3)] = "WARN"),
    (te[(te.ERROR = 4)] = "ERROR"),
    (te[(te.SILENT = 5)] = "SILENT");
  var se,
    ae,
    re = {
      debug: ee.DEBUG,
      verbose: ee.VERBOSE,
      info: ee.INFO,
      warn: ee.WARN,
      error: ee.ERROR,
      silent: ee.SILENT,
    },
    oe = ee.INFO,
    le = {
      [ee.DEBUG]: "log",
      [ee.VERBOSE]: "log",
      [ee.INFO]: "info",
      [ee.WARN]: "warn",
      [ee.ERROR]: "error",
    },
    he = (e, t, ...i) => {
      if (t < e.logLevel) return;
      const n = new Date().toISOString(),
        s = le[t];
      if (!s)
        throw new Error(
          `Attempted to log a message with an invalid logType (value: ${t})`
        );
      console[s](`[${n}]  ${e.name}:`, ...i);
    },
    ce = class {
      constructor(e) {
        (this.name = e),
          (this._logLevel = oe),
          (this._logHandler = he),
          (this._userLogHandler = null),
          ne.push(this);
      }
      get logLevel() {
        return this._logLevel;
      }
      set logLevel(e) {
        if (!(e in ee))
          throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
        this._logLevel = e;
      }
      setLogLevel(e) {
        this._logLevel = "string" == typeof e ? re[e] : e;
      }
      get logHandler() {
        return this._logHandler;
      }
      set logHandler(e) {
        if ("function" != typeof e)
          throw new TypeError(
            "Value assigned to `logHandler` must be a function"
          );
        this._logHandler = e;
      }
      get userLogHandler() {
        return this._userLogHandler;
      }
      set userLogHandler(e) {
        this._userLogHandler = e;
      }
      debug(...e) {
        this._userLogHandler && this._userLogHandler(this, ee.DEBUG, ...e),
          this._logHandler(this, ee.DEBUG, ...e);
      }
      log(...e) {
        this._userLogHandler && this._userLogHandler(this, ee.VERBOSE, ...e),
          this._logHandler(this, ee.VERBOSE, ...e);
      }
      info(...e) {
        this._userLogHandler && this._userLogHandler(this, ee.INFO, ...e),
          this._logHandler(this, ee.INFO, ...e);
      }
      warn(...e) {
        this._userLogHandler && this._userLogHandler(this, ee.WARN, ...e),
          this._logHandler(this, ee.WARN, ...e);
      }
      error(...e) {
        this._userLogHandler && this._userLogHandler(this, ee.ERROR, ...e),
          this._logHandler(this, ee.ERROR, ...e);
      }
    };
  var de = new WeakMap(),
    ue = new WeakMap(),
    pe = new WeakMap(),
    ge = new WeakMap(),
    fe = new WeakMap();
  var me = {
    get(e, t, i) {
      if (e instanceof IDBTransaction) {
        if ("done" === t) return ue.get(e);
        if ("objectStoreNames" === t) return e.objectStoreNames || pe.get(e);
        if ("store" === t)
          return i.objectStoreNames[1]
            ? void 0
            : i.objectStore(i.objectStoreNames[0]);
      }
      return _e(e[t]);
    },
    set: (e, t, i) => ((e[t] = i), !0),
    has: (e, t) =>
      (e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
      t in e,
  };
  function ye(e) {
    return e !== IDBDatabase.prototype.transaction ||
      "objectStoreNames" in IDBTransaction.prototype
      ? (
        ae ||
        (ae = [
          IDBCursor.prototype.advance,
          IDBCursor.prototype.continue,
          IDBCursor.prototype.continuePrimaryKey,
        ])
      ).includes(e)
        ? function (...t) {
          return e.apply(Ie(this), t), _e(de.get(this));
        }
        : function (...t) {
          return _e(e.apply(Ie(this), t));
        }
      : function (t, ...i) {
        const n = e.call(Ie(this), t, ...i);
        return pe.set(n, t.sort ? t.sort() : [t]), _e(n);
      };
  }
  function ve(e) {
    return "function" == typeof e
      ? ye(e)
      : (e instanceof IDBTransaction &&
        (function (e) {
          if (ue.has(e)) return;
          const t = new Promise((t, i) => {
            const n = () => {
              e.removeEventListener("complete", s),
                e.removeEventListener("error", a),
                e.removeEventListener("abort", a);
            },
              s = () => {
                t(), n();
              },
              a = () => {
                i(e.error || new DOMException("AbortError", "AbortError")),
                  n();
              };
            e.addEventListener("complete", s),
              e.addEventListener("error", a),
              e.addEventListener("abort", a);
          });
          ue.set(e, t);
        })(e),
        (t = e),
        (
          se ||
          (se = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
          ])
        ).some((e) => t instanceof e)
          ? new Proxy(e, me)
          : e);
    var t;
  }
  function _e(e) {
    if (e instanceof IDBRequest)
      return (function (e) {
        const t = new Promise((t, i) => {
          const n = () => {
            e.removeEventListener("success", s),
              e.removeEventListener("error", a);
          },
            s = () => {
              t(_e(e.result)), n();
            },
            a = () => {
              i(e.error), n();
            };
          e.addEventListener("success", s), e.addEventListener("error", a);
        });
        return (
          t
            .then((t) => {
              t instanceof IDBCursor && de.set(t, e);
            })
            .catch(() => { }),
          fe.set(t, e),
          t
        );
      })(e);
    if (ge.has(e)) return ge.get(e);
    const t = ve(e);
    return t !== e && (ge.set(e, t), fe.set(t, e)), t;
  }
  var Ie = (e) => fe.get(e);
  function Se(
    e,
    t,
    { blocked: i, upgrade: n, blocking: s, terminated: a } = {}
  ) {
    const r = indexedDB.open(e, t),
      o = _e(r);
    return (
      n &&
      r.addEventListener("upgradeneeded", (e) => {
        n(_e(r.result), e.oldVersion, e.newVersion, _e(r.transaction), e);
      }),
      i &&
      r.addEventListener("blocked", (e) => i(e.oldVersion, e.newVersion, e)),
      o
        .then((e) => {
          a && e.addEventListener("close", () => a()),
            s &&
            e.addEventListener("versionchange", (e) =>
              s(e.oldVersion, e.newVersion, e)
            );
        })
        .catch(() => { }),
      o
    );
  }
  var Le = ["get", "getKey", "getAll", "getAllKeys", "count"],
    Ae = ["put", "add", "delete", "clear"],
    Ee = new Map();
  function Ce(e, t) {
    if (!(e instanceof IDBDatabase) || t in e || "string" != typeof t) return;
    if (Ee.get(t)) return Ee.get(t);
    const i = t.replace(/FromIndex$/, ""),
      n = t !== i,
      s = Ae.includes(i);
    if (
      !(i in (n ? IDBIndex : IDBObjectStore).prototype) ||
      (!s && !Le.includes(i))
    )
      return;
    const a = function (e, ...t) {
      return _(this, null, function* () {
        const a = this.transaction(e, s ? "readwrite" : "readonly");
        let r = a.store;
        return (
          n && (r = r.index(t.shift())),
          (yield Promise.all([r[i](...t), s && a.done]))[0]
        );
      });
    };
    return Ee.set(t, a), a;
  }
  me = ((e) =>
    d(c({}, e), {
      get: (t, i, n) => Ce(t, i) || e.get(t, i, n),
      has: (t, i) => !!Ce(t, i) || e.has(t, i),
    }))(me);
  var we = class {
    constructor(e) {
      this.container = e;
    }
    getPlatformInfoString() {
      return this.container
        .getProviders()
        .map((e) => {
          if (
            (function (e) {
              const t = e.getComponent();
              return "VERSION" === (null == t ? void 0 : t.type);
            })(e)
          ) {
            const t = e.getImmediate();
            return `${t.library}/${t.version}`;
          }
          return null;
        })
        .filter((e) => e)
        .join(" ");
    }
  };
  var be = "@firebase/app",
    Te = "0.11.4",
    Me = new ce("@firebase/app"),
    De = "@firebase/app-compat",
    ke = "@firebase/analytics-compat",
    Be = "@firebase/analytics",
    Oe = "@firebase/app-check-compat",
    Pe = "@firebase/app-check",
    Re = "@firebase/auth",
    Ne = "@firebase/auth-compat",
    xe = "@firebase/database",
    Fe = "@firebase/data-connect",
    He = "@firebase/database-compat",
    Ge = "@firebase/functions",
    Ue = "@firebase/functions-compat",
    Ke = "@firebase/installations",
    Ve = "@firebase/installations-compat",
    Je = "@firebase/messaging",
    We = "@firebase/messaging-compat",
    je = "@firebase/performance",
    qe = "@firebase/performance-compat",
    Ye = "@firebase/remote-config",
    ze = "@firebase/remote-config-compat",
    Qe = "@firebase/storage",
    $e = "@firebase/storage-compat",
    Ze = "@firebase/firestore",
    Xe = "@firebase/vertexai",
    et = "@firebase/firestore-compat",
    tt = "firebase",
    it = "[DEFAULT]",
    nt = {
      [be]: "fire-core",
      [De]: "fire-core-compat",
      [Be]: "fire-analytics",
      [ke]: "fire-analytics-compat",
      [Pe]: "fire-app-check",
      [Oe]: "fire-app-check-compat",
      [Re]: "fire-auth",
      [Ne]: "fire-auth-compat",
      [xe]: "fire-rtdb",
      [Fe]: "fire-data-connect",
      [He]: "fire-rtdb-compat",
      [Ge]: "fire-fn",
      [Ue]: "fire-fn-compat",
      [Ke]: "fire-iid",
      [Ve]: "fire-iid-compat",
      [Je]: "fire-fcm",
      [We]: "fire-fcm-compat",
      [je]: "fire-perf",
      [qe]: "fire-perf-compat",
      [Ye]: "fire-rc",
      [ze]: "fire-rc-compat",
      [Qe]: "fire-gcs",
      [$e]: "fire-gcs-compat",
      [Ze]: "fire-fst",
      [et]: "fire-fst-compat",
      [Xe]: "fire-vertex",
      "fire-js": "fire-js",
      [tt]: "fire-js-all",
    },
    st = new Map(),
    at = new Map(),
    rt = new Map();
  function ot(e, t) {
    try {
      e.container.addComponent(t);
    } catch (i) {
      Me.debug(
        `Component ${t.name} failed to register with FirebaseApp ${e.name}`,
        i
      );
    }
  }
  function lt(e) {
    const t = e.name;
    if (rt.has(t))
      return (
        Me.debug(`There were multiple attempts to register component ${t}.`), !1
      );
    rt.set(t, e);
    for (const t of st.values()) ot(t, e);
    for (const t of at.values()) ot(t, e);
    return !0;
  }
  function ht(e, t) {
    const i = e.container
      .getProvider("heartbeat")
      .getImmediate({ optional: !0 });
    return i && i.triggerHeartbeat(), e.container.getProvider(t);
  }
  function ct(e) {
    return null != e && void 0 !== e.settings;
  }
  var dt = new G("app", "Firebase", {
    "no-app":
      "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}'",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "server-app-deleted": "Firebase Server App has been deleted",
    "no-options":
      "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "idb-open":
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get":
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set":
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete":
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    "finalization-registry-not-supported":
      "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
    "invalid-server-app-environment":
      "FirebaseServerApp is not for use in browser environments.",
  }),
    ut = class {
      constructor(e, t, i) {
        (this._isDeleted = !1),
          (this._options = Object.assign({}, e)),
          (this._config = Object.assign({}, t)),
          (this._name = t.name),
          (this._automaticDataCollectionEnabled =
            t.automaticDataCollectionEnabled),
          (this._container = i),
          this.container.addComponent(new $("app", () => this, "PUBLIC"));
      }
      get automaticDataCollectionEnabled() {
        return this.checkDestroyed(), this._automaticDataCollectionEnabled;
      }
      set automaticDataCollectionEnabled(e) {
        this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
      }
      get name() {
        return this.checkDestroyed(), this._name;
      }
      get options() {
        return this.checkDestroyed(), this._options;
      }
      get config() {
        return this.checkDestroyed(), this._config;
      }
      get container() {
        return this._container;
      }
      get isDeleted() {
        return this._isDeleted;
      }
      set isDeleted(e) {
        this._isDeleted = e;
      }
      checkDestroyed() {
        if (this.isDeleted)
          throw dt.create("app-deleted", { appName: this._name });
      }
    },
    pt = "11.6.0";
  function gt(e, t = {}) {
    let i = e;
    if ("object" != typeof t) {
      t = { name: t };
    }
    const n = Object.assign(
      { name: it, automaticDataCollectionEnabled: !1 },
      t
    ),
      s = n.name;
    if ("string" != typeof s || !s)
      throw dt.create("bad-app-name", { appName: String(s) });
    if ((i || (i = k()), !i)) throw dt.create("no-options");
    const a = st.get(s);
    if (a) {
      if (K(i, a.options) && K(n, a.config)) return a;
      throw dt.create("duplicate-app", { appName: s });
    }
    const r = new ie(s);
    for (const e of rt.values()) r.addComponent(e);
    const o = new ut(i, n, r);
    return st.set(s, o), o;
  }
  function ft(e = it) {
    const t = st.get(e);
    if (!t && e === it && k()) return gt();
    if (!t) throw dt.create("no-app", { appName: e });
    return t;
  }
  function mt(e, t, i) {
    var n;
    let s = null !== (n = nt[e]) && void 0 !== n ? n : e;
    i && (s += `-${i}`);
    const a = s.match(/\s|\//),
      r = t.match(/\s|\//);
    if (a || r) {
      const e = [`Unable to register library "${s}" with version "${t}":`];
      return (
        a &&
        e.push(
          `library name "${s}" contains illegal characters (whitespace or "/")`
        ),
        a && r && e.push("and"),
        r &&
        e.push(
          `version name "${t}" contains illegal characters (whitespace or "/")`
        ),
        void Me.warn(e.join(" "))
      );
    }
    lt(new $(`${s}-version`, () => ({ library: s, version: t }), "VERSION"));
  }
  var yt = "firebase-heartbeat-store",
    vt = null;
  function _t() {
    return (
      vt ||
      (vt = Se("firebase-heartbeat-database", 1, {
        upgrade: (e, t) => {
          if (0 === t)
            try {
              e.createObjectStore(yt);
            } catch (e) {
              console.warn(e);
            }
        },
      }).catch((e) => {
        throw dt.create("idb-open", { originalErrorMessage: e.message });
      })),
      vt
    );
  }
  function It(e, t) {
    return _(this, null, function* () {
      try {
        const i = (yield _t()).transaction(yt, "readwrite"),
          n = i.objectStore(yt);
        yield n.put(t, St(e)), yield i.done;
      } catch (e) {
        if (e instanceof H) Me.warn(e.message);
        else {
          const t = dt.create("idb-set", {
            originalErrorMessage: null == e ? void 0 : e.message,
          });
          Me.warn(t.message);
        }
      }
    });
  }
  function St(e) {
    return `${e.name}!${e.options.appId}`;
  }
  var Lt = class {
    constructor(e) {
      (this.container = e), (this._heartbeatsCache = null);
      const t = this.container.getProvider("app").getImmediate();
      (this._storage = new Ct(t)),
        (this._heartbeatsCachePromise = this._storage
          .read()
          .then((e) => ((this._heartbeatsCache = e), e)));
    }
    triggerHeartbeat() {
      return _(this, null, function* () {
        var e, t;
        try {
          const i = this.container
            .getProvider("platform-logger")
            .getImmediate()
            .getPlatformInfoString(),
            n = At();
          if (
            null ==
            (null === (e = this._heartbeatsCache) || void 0 === e
              ? void 0
              : e.heartbeats) &&
            ((this._heartbeatsCache = yield this._heartbeatsCachePromise),
              null ==
              (null === (t = this._heartbeatsCache) || void 0 === t
                ? void 0
                : t.heartbeats))
          )
            return;
          if (
            this._heartbeatsCache.lastSentHeartbeatDate === n ||
            this._heartbeatsCache.heartbeats.some((e) => e.date === n)
          )
            return;
          if (
            (this._heartbeatsCache.heartbeats.push({ date: n, agent: i }),
              this._heartbeatsCache.heartbeats.length > 30)
          ) {
            const e = (function (e) {
              if (0 === e.length) return -1;
              let t = 0,
                i = e[0].date;
              for (let n = 1; n < e.length; n++)
                e[n].date < i && ((i = e[n].date), (t = n));
              return t;
            })(this._heartbeatsCache.heartbeats);
            this._heartbeatsCache.heartbeats.splice(e, 1);
          }
          return this._storage.overwrite(this._heartbeatsCache);
        } catch (e) {
          Me.warn(e);
        }
      });
    }
    getHeartbeatsHeader() {
      return _(this, null, function* () {
        var e;
        try {
          if (
            (null === this._heartbeatsCache &&
              (yield this._heartbeatsCachePromise),
              null ==
              (null === (e = this._heartbeatsCache) || void 0 === e
                ? void 0
                : e.heartbeats) ||
              0 === this._heartbeatsCache.heartbeats.length)
          )
            return "";
          const t = At(),
            { heartbeatsToSend: i, unsentEntries: n } = (function (
              e,
              t = 1024
            ) {
              const i = [];
              let n = e.slice();
              for (const s of e) {
                const e = i.find((e) => e.agent === s.agent);
                if (e) {
                  if ((e.dates.push(s.date), wt(i) > t)) {
                    e.dates.pop();
                    break;
                  }
                } else if (
                  (i.push({ agent: s.agent, dates: [s.date] }), wt(i) > t)
                ) {
                  i.pop();
                  break;
                }
                n = n.slice(1);
              }
              return { heartbeatsToSend: i, unsentEntries: n };
            })(this._heartbeatsCache.heartbeats),
            s = b(JSON.stringify({ version: 2, heartbeats: i }));
          return (
            (this._heartbeatsCache.lastSentHeartbeatDate = t),
            n.length > 0
              ? ((this._heartbeatsCache.heartbeats = n),
                yield this._storage.overwrite(this._heartbeatsCache))
              : ((this._heartbeatsCache.heartbeats = []),
                this._storage.overwrite(this._heartbeatsCache)),
            s
          );
        } catch (e) {
          return Me.warn(e), "";
        }
      });
    }
  };
  function At() {
    return new Date().toISOString().substring(0, 10);
  }
  var Et,
    Ct = class {
      constructor(e) {
        (this.app = e),
          (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
      }
      runIndexedDBEnvironmentCheck() {
        return _(this, null, function* () {
          return (
            !!N() &&
            x()
              .then(() => !0)
              .catch(() => !1)
          );
        });
      }
      read() {
        return _(this, null, function* () {
          if (yield this._canUseIndexedDBPromise) {
            const e = yield (function (e) {
              return _(this, null, function* () {
                try {
                  const t = (yield _t()).transaction(yt),
                    i = yield t.objectStore(yt).get(St(e));
                  return yield t.done, i;
                } catch (e) {
                  if (e instanceof H) Me.warn(e.message);
                  else {
                    const t = dt.create("idb-get", {
                      originalErrorMessage: null == e ? void 0 : e.message,
                    });
                    Me.warn(t.message);
                  }
                }
              });
            })(this.app);
            return (null == e ? void 0 : e.heartbeats) ? e : { heartbeats: [] };
          }
          return { heartbeats: [] };
        });
      }
      overwrite(e) {
        return _(this, null, function* () {
          var t;
          if (yield this._canUseIndexedDBPromise) {
            const i = yield this.read();
            return It(this.app, {
              lastSentHeartbeatDate:
                null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
                  ? t
                  : i.lastSentHeartbeatDate,
              heartbeats: e.heartbeats,
            });
          }
        });
      }
      add(e) {
        return _(this, null, function* () {
          var t;
          if (yield this._canUseIndexedDBPromise) {
            const i = yield this.read();
            return It(this.app, {
              lastSentHeartbeatDate:
                null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
                  ? t
                  : i.lastSentHeartbeatDate,
              heartbeats: [...i.heartbeats, ...e.heartbeats],
            });
          }
        });
      }
    };
  function wt(e) {
    return b(JSON.stringify({ version: 2, heartbeats: e })).length;
  }
  (Et = ""),
    lt(new $("platform-logger", (e) => new we(e), "PRIVATE")),
    lt(new $("heartbeat", (e) => new Lt(e), "PRIVATE")),
    mt(be, Te, Et),
    mt(be, Te, "esm2017"),
    mt("fire-js", "");
  var bt = "@firebase/installations",
    Tt = "0.6.13",
    Mt = 1e4,
    Dt = `w:${Tt}`,
    kt = "FIS_v2",
    Bt = 36e5,
    Ot = new G("installations", "Installations", {
      "missing-app-config-values":
        'Missing App configuration value: "{$valueName}"',
      "not-registered": "Firebase Installation is not registered.",
      "installation-not-found": "Firebase Installation not found.",
      "request-failed":
        '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
      "app-offline": "Could not process request. Application offline.",
      "delete-pending-registration":
        "Can't delete installation while there is a pending registration request.",
    });
  function Pt(e) {
    return e instanceof H && e.code.includes("request-failed");
  }
  function Rt({ projectId: e }) {
    return `https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`;
  }
  function Nt(e) {
    return {
      token: e.token,
      requestStatus: 2,
      expiresIn: ((t = e.expiresIn), Number(t.replace("s", "000"))),
      creationTime: Date.now(),
    };
    var t;
  }
  function xt(e, t) {
    return _(this, null, function* () {
      const i = (yield t.json()).error;
      return Ot.create("request-failed", {
        requestName: e,
        serverCode: i.code,
        serverMessage: i.message,
        serverStatus: i.status,
      });
    });
  }
  function Ft({ apiKey: e }) {
    return new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-goog-api-key": e,
    });
  }
  function Ht(e, { refreshToken: t }) {
    const i = Ft(e);
    return (
      i.append(
        "Authorization",
        (function (e) {
          return `${kt} ${e}`;
        })(t)
      ),
      i
    );
  }
  function Gt(e) {
    return _(this, null, function* () {
      const t = yield e();
      return t.status >= 500 && t.status < 600 ? e() : t;
    });
  }
  function Ut(e) {
    return new Promise((t) => {
      setTimeout(t, e);
    });
  }
  var Kt = /^[cdef][\w-]{21}$/;
  function Vt() {
    try {
      const e = new Uint8Array(17);
      (self.crypto || self.msCrypto).getRandomValues(e),
        (e[0] = 112 + (e[0] % 16));
      const t = (function (e) {
        const t =
          ((i = e),
            btoa(String.fromCharCode(...i))
              .replace(/\+/g, "-")
              .replace(/\//g, "_"));
        var i;
        return t.substr(0, 22);
      })(e);
      return Kt.test(t) ? t : "";
    } catch (e) {
      return "";
    }
  }
  function Jt(e) {
    return `${e.appName}!${e.appId}`;
  }
  var Wt = new Map();
  function jt(e, t) {
    const i = Jt(e);
    qt(i, t),
      (function (e, t) {
        const i = (function () {
          !Yt &&
            "BroadcastChannel" in self &&
            ((Yt = new BroadcastChannel("[Firebase] FID Change")).onmessage = (
              e
            ) => {
              qt(e.data.key, e.data.fid);
            });
          return Yt;
        })();
        i && i.postMessage({ key: e, fid: t });
        0 === Wt.size && Yt && (Yt.close(), (Yt = null));
      })(i, t);
  }
  function qt(e, t) {
    const i = Wt.get(e);
    if (i) for (const e of i) e(t);
  }
  var Yt = null;
  var zt = "firebase-installations-store",
    Qt = null;
  function $t() {
    return (
      Qt ||
      (Qt = Se("firebase-installations-database", 1, {
        upgrade: (e, t) => {
          if (0 === t) e.createObjectStore(zt);
        },
      })),
      Qt
    );
  }
  function Zt(e, t) {
    return _(this, null, function* () {
      const i = Jt(e),
        n = (yield $t()).transaction(zt, "readwrite"),
        s = n.objectStore(zt),
        a = yield s.get(i);
      return (
        yield s.put(t, i),
        yield n.done,
        (a && a.fid === t.fid) || jt(e, t.fid),
        t
      );
    });
  }
  function Xt(e) {
    return _(this, null, function* () {
      const t = Jt(e),
        i = (yield $t()).transaction(zt, "readwrite");
      yield i.objectStore(zt).delete(t), yield i.done;
    });
  }
  function ei(e, t) {
    return _(this, null, function* () {
      const i = Jt(e),
        n = (yield $t()).transaction(zt, "readwrite"),
        s = n.objectStore(zt),
        a = yield s.get(i),
        r = t(a);
      return (
        void 0 === r ? yield s.delete(i) : yield s.put(r, i),
        yield n.done,
        !r || (a && a.fid === r.fid) || jt(e, r.fid),
        r
      );
    });
  }
  function ti(e) {
    return _(this, null, function* () {
      let t;
      const i = yield ei(e.appConfig, (i) => {
        const n = (function (e) {
          const t = e || { fid: Vt(), registrationStatus: 0 };
          return si(t);
        })(i),
          s = (function (e, t) {
            if (0 === t.registrationStatus) {
              if (!navigator.onLine) {
                return {
                  installationEntry: t,
                  registrationPromise: Promise.reject(Ot.create("app-offline")),
                };
              }
              const i = {
                fid: t.fid,
                registrationStatus: 1,
                registrationTime: Date.now(),
              },
                n = (function (e, t) {
                  return _(this, null, function* () {
                    try {
                      const i = yield (function (e, t) {
                        return _(
                          this,
                          arguments,
                          function* (
                            { appConfig: e, heartbeatServiceProvider: t },
                            { fid: i }
                          ) {
                            const n = Rt(e),
                              s = Ft(e),
                              a = t.getImmediate({ optional: !0 });
                            if (a) {
                              const e = yield a.getHeartbeatsHeader();
                              e && s.append("x-firebase-client", e);
                            }
                            const r = {
                              fid: i,
                              authVersion: kt,
                              appId: e.appId,
                              sdkVersion: Dt,
                            },
                              o = {
                                method: "POST",
                                headers: s,
                                body: JSON.stringify(r),
                              },
                              l = yield Gt(() => fetch(n, o));
                            if (l.ok) {
                              const e = yield l.json();
                              return {
                                fid: e.fid || i,
                                registrationStatus: 2,
                                refreshToken: e.refreshToken,
                                authToken: Nt(e.authToken),
                              };
                            }
                            throw yield xt("Create Installation", l);
                          }
                        );
                      })(e, t);
                      return Zt(e.appConfig, i);
                    } catch (i) {
                      throw (
                        (Pt(i) && 409 === i.customData.serverCode
                          ? yield Xt(e.appConfig)
                          : yield Zt(e.appConfig, {
                            fid: t.fid,
                            registrationStatus: 0,
                          }),
                          i)
                      );
                    }
                  });
                })(e, i);
              return { installationEntry: i, registrationPromise: n };
            }
            return 1 === t.registrationStatus
              ? { installationEntry: t, registrationPromise: ii(e) }
              : { installationEntry: t };
          })(e, n);
        return (t = s.registrationPromise), s.installationEntry;
      });
      return "" === i.fid
        ? { installationEntry: yield t }
        : { installationEntry: i, registrationPromise: t };
    });
  }
  function ii(e) {
    return _(this, null, function* () {
      let t = yield ni(e.appConfig);
      for (; 1 === t.registrationStatus;)
        yield Ut(100), (t = yield ni(e.appConfig));
      if (0 === t.registrationStatus) {
        const { installationEntry: t, registrationPromise: i } = yield ti(e);
        return i || t;
      }
      return t;
    });
  }
  function ni(e) {
    return ei(e, (e) => {
      if (!e) throw Ot.create("installation-not-found");
      return si(e);
    });
  }
  function si(e) {
    return 1 === (t = e).registrationStatus &&
      t.registrationTime + Mt < Date.now()
      ? { fid: e.fid, registrationStatus: 0 }
      : e;
    var t;
  }
  function ai(e, t) {
    return _(
      this,
      arguments,
      function* ({ appConfig: e, heartbeatServiceProvider: t }, i) {
        const n = (function (e, { fid: t }) {
          return `${Rt(e)}/${t}/authTokens:generate`;
        })(e, i),
          s = Ht(e, i),
          a = t.getImmediate({ optional: !0 });
        if (a) {
          const e = yield a.getHeartbeatsHeader();
          e && s.append("x-firebase-client", e);
        }
        const r = { installation: { sdkVersion: Dt, appId: e.appId } },
          o = { method: "POST", headers: s, body: JSON.stringify(r) },
          l = yield Gt(() => fetch(n, o));
        if (l.ok) {
          return Nt(yield l.json());
        }
        throw yield xt("Generate Auth Token", l);
      }
    );
  }
  function ri(e, t = !1) {
    return _(this, null, function* () {
      let i;
      const n = yield ei(e.appConfig, (n) => {
        if (!li(n)) throw Ot.create("not-registered");
        const s = n.authToken;
        if (
          !t &&
          (function (e) {
            return (
              2 === e.requestStatus &&
              !(function (e) {
                const t = Date.now();
                return (
                  t < e.creationTime || e.creationTime + e.expiresIn < t + Bt
                );
              })(e)
            );
          })(s)
        )
          return n;
        if (1 === s.requestStatus)
          return (
            (i = (function (e, t) {
              return _(this, null, function* () {
                let i = yield oi(e.appConfig);
                for (; 1 === i.authToken.requestStatus;)
                  yield Ut(100), (i = yield oi(e.appConfig));
                const n = i.authToken;
                return 0 === n.requestStatus ? ri(e, t) : n;
              });
            })(e, t)),
            n
          );
        {
          if (!navigator.onLine) throw Ot.create("app-offline");
          const t = (function (e) {
            const t = { requestStatus: 1, requestTime: Date.now() };
            return Object.assign(Object.assign({}, e), { authToken: t });
          })(n);
          return (
            (i = (function (e, t) {
              return _(this, null, function* () {
                try {
                  const i = yield ai(e, t),
                    n = Object.assign(Object.assign({}, t), { authToken: i });
                  return yield Zt(e.appConfig, n), i;
                } catch (i) {
                  if (
                    !Pt(i) ||
                    (401 !== i.customData.serverCode &&
                      404 !== i.customData.serverCode)
                  ) {
                    const i = Object.assign(Object.assign({}, t), {
                      authToken: { requestStatus: 0 },
                    });
                    yield Zt(e.appConfig, i);
                  } else yield Xt(e.appConfig);
                  throw i;
                }
              });
            })(e, t)),
            t
          );
        }
      });
      return i ? yield i : n.authToken;
    });
  }
  function oi(e) {
    return ei(e, (e) => {
      if (!li(e)) throw Ot.create("not-registered");
      const t = e.authToken;
      return 1 === (i = t).requestStatus && i.requestTime + Mt < Date.now()
        ? Object.assign(Object.assign({}, e), {
          authToken: { requestStatus: 0 },
        })
        : e;
      var i;
    });
  }
  function li(e) {
    return void 0 !== e && 2 === e.registrationStatus;
  }
  function hi(e, t = !1) {
    return _(this, null, function* () {
      const i = e;
      yield (function (e) {
        return _(this, null, function* () {
          const { registrationPromise: t } = yield ti(e);
          t && (yield t);
        });
      })(i);
      return (yield ri(i, t)).token;
    });
  }
  function ci(e) {
    return Ot.create("missing-app-config-values", { valueName: e });
  }
  var di = "installations",
    ui = (e) => {
      const t = ht(e.getProvider("app").getImmediate(), di).getImmediate();
      return {
        getId: () =>
          (function (e) {
            return _(this, null, function* () {
              const t = e,
                { installationEntry: i, registrationPromise: n } = yield ti(t);
              return (
                n ? n.catch(console.error) : ri(t).catch(console.error), i.fid
              );
            });
          })(t),
        getToken: (e) => hi(t, e),
      };
    };
  lt(
    new $(
      di,
      (e) => {
        const t = e.getProvider("app").getImmediate(),
          i = (function (e) {
            if (!e || !e.options) throw ci("App Configuration");
            if (!e.name) throw ci("App Name");
            const t = ["projectId", "apiKey", "appId"];
            for (const i of t) if (!e.options[i]) throw ci(i);
            return {
              appName: e.name,
              projectId: e.options.projectId,
              apiKey: e.options.apiKey,
              appId: e.options.appId,
            };
          })(t);
        return {
          app: t,
          appConfig: i,
          heartbeatServiceProvider: ht(t, "heartbeat"),
          _delete: () => Promise.resolve(),
        };
      },
      "PUBLIC"
    )
  ),
    lt(new $("installations-internal", ui, "PRIVATE")),
    mt(bt, Tt),
    mt(bt, Tt, "esm2017");
  var pi = "analytics",
    gi = "https://www.googletagmanager.com/gtag/js",
    fi = new ce("@firebase/analytics"),
    mi = new G("analytics", "Analytics", {
      "already-exists":
        "A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",
      "already-initialized":
        "initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.",
      "already-initialized-settings":
        "Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",
      "interop-component-reg-failed":
        "Firebase Analytics Interop Component failed to instantiate: {$reason}",
      "invalid-analytics-context":
        "Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
      "indexeddb-unavailable":
        "IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
      "fetch-throttle":
        "The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",
      "config-fetch-failed":
        "Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",
      "no-api-key":
        'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',
      "no-app-id":
        'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',
      "no-client-id": 'The "client_id" field is empty.',
      "invalid-gtag-resource":
        "Trusted Types detected an invalid gtag resource: {$gtagURL}.",
    });
  function yi(e) {
    if (!e.startsWith(gi)) {
      const t = mi.create("invalid-gtag-resource", { gtagURL: e });
      return fi.warn(t.message), "";
    }
    return e;
  }
  function vi(e) {
    return Promise.all(e.map((e) => e.catch((e) => e)));
  }
  function _i(e, t) {
    const i = (function (e, t) {
      let i;
      return (
        window.trustedTypes && (i = window.trustedTypes.createPolicy(e, t)), i
      );
    })("firebase-js-sdk-policy", { createScriptURL: yi }),
      n = document.createElement("script"),
      s = `${gi}?l=${e}&id=${t}`;
    (n.src = i ? (null == i ? void 0 : i.createScriptURL(s)) : s),
      (n.async = !0),
      document.head.appendChild(n);
  }
  function Ii(e, t, i, n) {
    return function (s, ...a) {
      return _(this, null, function* () {
        try {
          if ("event" === s) {
            const [n, s] = a;
            yield (function (e, t, i, n, s) {
              return _(this, null, function* () {
                try {
                  let a = [];
                  if (s && s.send_to) {
                    let e = s.send_to;
                    Array.isArray(e) || (e = [e]);
                    const n = yield vi(i);
                    for (const i of e) {
                      const e = n.find((e) => e.measurementId === i),
                        s = e && t[e.appId];
                      if (!s) {
                        a = [];
                        break;
                      }
                      a.push(s);
                    }
                  }
                  0 === a.length && (a = Object.values(t)),
                    yield Promise.all(a),
                    e("event", n, s || {});
                } catch (e) {
                  fi.error(e);
                }
              });
            })(e, t, i, n, s);
          } else if ("config" === s) {
            const [s, r] = a;
            yield (function (e, t, i, n, s, a) {
              return _(this, null, function* () {
                const r = n[s];
                try {
                  if (r) yield t[r];
                  else {
                    const e = (yield vi(i)).find((e) => e.measurementId === s);
                    e && (yield t[e.appId]);
                  }
                } catch (e) {
                  fi.error(e);
                }
                e("config", s, a);
              });
            })(e, t, i, n, s, r);
          } else if ("consent" === s) {
            const [t, i] = a;
            e("consent", t, i);
          } else if ("get" === s) {
            const [t, i, n] = a;
            e("get", t, i, n);
          } else if ("set" === s) {
            const [t] = a;
            e("set", t);
          } else e(s, ...a);
        } catch (e) {
          fi.error(e);
        }
      });
    };
  }
  var Si = new (class {
    constructor(e = {}, t = 1e3) {
      (this.throttleMetadata = e), (this.intervalMillis = t);
    }
    getThrottleMetadata(e) {
      return this.throttleMetadata[e];
    }
    setThrottleMetadata(e, t) {
      this.throttleMetadata[e] = t;
    }
    deleteThrottleMetadata(e) {
      delete this.throttleMetadata[e];
    }
  })();
  function Li(e) {
    return new Headers({ Accept: "application/json", "x-goog-api-key": e });
  }
  function Ai(e) {
    return _(this, arguments, function* (e, t = Si, i) {
      const { appId: n, apiKey: s, measurementId: a } = e.options;
      if (!n) throw mi.create("no-app-id");
      if (!s) {
        if (a) return { measurementId: a, appId: n };
        throw mi.create("no-api-key");
      }
      const r = t.getThrottleMetadata(n) || {
        backoffCount: 0,
        throttleEndTimeMillis: Date.now(),
      },
        o = new bi();
      return (
        setTimeout(
          () =>
            _(this, null, function* () {
              o.abort();
            }),
          void 0 !== i ? i : 6e4
        ),
        Ei({ appId: n, apiKey: s, measurementId: a }, r, o, t)
      );
    });
  }
  function Ei(e, t, i) {
    return _(
      this,
      arguments,
      function* (e, { throttleEndTimeMillis: t, backoffCount: i }, n, s = Si) {
        var a;
        const { appId: r, measurementId: o } = e;
        try {
          yield (function (e, t) {
            return new Promise((i, n) => {
              const s = Math.max(t - Date.now(), 0),
                a = setTimeout(i, s);
              e.addEventListener(() => {
                clearTimeout(a),
                  n(mi.create("fetch-throttle", { throttleEndTimeMillis: t }));
              });
            });
          })(n, t);
        } catch (e) {
          if (o)
            return (
              fi.warn(
                `Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null == e ? void 0 : e.message
                }]`
              ),
              { appId: r, measurementId: o }
            );
          throw e;
        }
        try {
          const t = yield (function (e) {
            return _(this, null, function* () {
              var t;
              const { appId: i, apiKey: n } = e,
                s = { method: "GET", headers: Li(n) },
                a =
                  "https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace(
                    "{app-id}",
                    i
                  ),
                r = yield fetch(a, s);
              if (200 !== r.status && 304 !== r.status) {
                let e = "";
                try {
                  const i = yield r.json();
                  (null === (t = i.error) || void 0 === t
                    ? void 0
                    : t.message) && (e = i.error.message);
                } catch (e) { }
                throw mi.create("config-fetch-failed", {
                  httpStatus: r.status,
                  responseMessage: e,
                });
              }
              return r.json();
            });
          })(e);
          return s.deleteThrottleMetadata(r), t;
        } catch (t) {
          const l = t;
          if (
            !(function (e) {
              if (!(e instanceof H && e.customData)) return !1;
              const t = Number(e.customData.httpStatus);
              return 429 === t || 500 === t || 503 === t || 504 === t;
            })(l)
          ) {
            if ((s.deleteThrottleMetadata(r), o))
              return (
                fi.warn(
                  `Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null == l ? void 0 : l.message
                  }]`
                ),
                { appId: r, measurementId: o }
              );
            throw t;
          }
          const h =
            503 ===
              Number(
                null === (a = null == l ? void 0 : l.customData) || void 0 === a
                  ? void 0
                  : a.httpStatus
              )
              ? z(i, s.intervalMillis, 30)
              : z(i, s.intervalMillis),
            c = { throttleEndTimeMillis: Date.now() + h, backoffCount: i + 1 };
          return (
            s.setThrottleMetadata(r, c),
            fi.debug(`Calling attemptFetch again in ${h} millis`),
            Ei(e, c, n, s)
          );
        }
      }
    );
  }
  var Ci,
    wi,
    bi = class {
      constructor() {
        this.listeners = [];
      }
      addEventListener(e) {
        this.listeners.push(e);
      }
      abort() {
        this.listeners.forEach((e) => e());
      }
    };
  function Ti(e, t, i, n, s, a, r) {
    return _(this, null, function* () {
      var o;
      const l = Ai(e);
      l
        .then((t) => {
          (i[t.measurementId] = t.appId),
            e.options.measurementId &&
            t.measurementId !== e.options.measurementId &&
            fi.warn(
              `The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`
            );
        })
        .catch((e) => fi.error(e)),
        t.push(l);
      const h = (function () {
        return _(this, null, function* () {
          if (!N())
            return (
              fi.warn(
                mi.create("indexeddb-unavailable", {
                  errorInfo:
                    "IndexedDB is not available in this environment.",
                }).message
              ),
              !1
            );
          try {
            yield x();
          } catch (e) {
            return (
              fi.warn(
                mi.create("indexeddb-unavailable", {
                  errorInfo: null == e ? void 0 : e.toString(),
                }).message
              ),
              !1
            );
          }
          return !0;
        });
      })().then((e) => (e ? n.getId() : void 0)),
        [c, d] = yield Promise.all([l, h]);
      (function (e) {
        const t = window.document.getElementsByTagName("script");
        for (const i of Object.values(t))
          if (i.src && i.src.includes(gi) && i.src.includes(e)) return i;
        return null;
      })(a) || _i(a, c.measurementId),
        wi && (s("consent", "default", wi), (wi = void 0)),
        s("js", new Date());
      const u =
        null !== (o = null == r ? void 0 : r.config) && void 0 !== o ? o : {};
      return (
        (u.origin = "firebase"),
        (u.update = !0),
        null != d && (u.firebase_id = d),
        s("config", c.measurementId, u),
        Ci && (s("set", Ci), (Ci = void 0)),
        c.measurementId
      );
    });
  }
  var Mi,
    Di,
    ki = class {
      constructor(e) {
        this.app = e;
      }
      _delete() {
        return delete Bi[this.app.options.appId], Promise.resolve();
      }
    },
    Bi = {},
    Oi = [],
    Pi = {},
    Ri = "dataLayer",
    Ni = !1;
  function xi(e, t, i) {
    !(function () {
      const e = [];
      if (
        (R() && e.push("This is a browser extension environment."),
          F() || e.push("Cookies are not available."),
          e.length > 0)
      ) {
        const t = e.map((e, t) => `(${t + 1}) ${e}`).join(" "),
          i = mi.create("invalid-analytics-context", { errorInfo: t });
        fi.warn(i.message);
      }
    })();
    const n = e.options.appId;
    if (!n) throw mi.create("no-app-id");
    if (!e.options.apiKey) {
      if (!e.options.measurementId) throw mi.create("no-api-key");
      fi.warn(
        `The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`
      );
    }
    if (null != Bi[n]) throw mi.create("already-exists", { id: n });
    if (!Ni) {
      !(function (e) {
        let t = [];
        Array.isArray(window[e]) ? (t = window[e]) : (window[e] = t);
      })(Ri);
      const { wrappedGtag: e, gtagCore: t } = (function (e, t, i, n, s) {
        let a = function (...e) {
          window[n].push(arguments);
        };
        return (
          window[s] && "function" == typeof window[s] && (a = window[s]),
          (window[s] = Ii(a, e, t, i)),
          { gtagCore: a, wrappedGtag: window[s] }
        );
      })(Bi, Oi, Pi, Ri, "gtag");
      (Di = e), (Mi = t), (Ni = !0);
    }
    Bi[n] = Ti(e, Oi, Pi, t, Mi, Ri, i);
    return new ki(e);
  }
  function Fi(e = ft()) {
    const t = ht((e = Q(e)), pi);
    return t.isInitialized()
      ? t.getImmediate()
      : (function (e, t = {}) {
        const i = ht(e, pi);
        if (i.isInitialized()) {
          const e = i.getImmediate();
          if (K(t, i.getOptions())) return e;
          throw mi.create("already-initialized");
        }
        const n = i.initialize({ options: t });
        return n;
      })(e);
  }
  function Hi(e, t, i, n) {
    (e = Q(e)),
      (function (e, t, i, n, s) {
        return _(this, null, function* () {
          if (s && s.global) e("event", i, n);
          else {
            const s = yield t,
              a = Object.assign(Object.assign({}, n), { send_to: s });
            e("event", i, a);
          }
        });
      })(Di, Bi[e.app.options.appId], t, i, n).catch((e) => fi.error(e));
  }
  var Gi = "@firebase/analytics",
    Ui = "0.10.12";
  lt(
    new $(
      pi,
      (e, { options: t }) =>
        xi(
          e.getProvider("app").getImmediate(),
          e.getProvider("installations-internal").getImmediate(),
          t
        ),
      "PUBLIC"
    )
  ),
    lt(
      new $(
        "analytics-internal",
        function (e) {
          try {
            const t = e.getProvider(pi).getImmediate();
            return { logEvent: (e, i, n) => Hi(t, e, i, n) };
          } catch (e) {
            throw mi.create("interop-component-reg-failed", { reason: e });
          }
        },
        "PRIVATE"
      )
    ),
    mt(Gi, Ui),
    mt(Gi, Ui, "esm2017");
  function Ki(e, t) {
    var i = {};
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        t.indexOf(n) < 0 &&
        (i[n] = e[n]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
      var s = 0;
      for (n = Object.getOwnPropertySymbols(e); s < n.length; s++)
        t.indexOf(n[s]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[s]) &&
          (i[n[s]] = e[n[s]]);
    }
    return i;
  }
  function Vi() {
    return {
      "dependent-sdk-initialized-before-auth":
        "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
    };
  }
  mt("firebase", "11.6.0", "app");
  var Ji = Vi,
    Wi = new G("auth", "Firebase", {
      "dependent-sdk-initialized-before-auth":
        "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
    }),
    ji = new ce("@firebase/auth");
  function qi(e, ...t) {
    ji.logLevel <= ee.ERROR && ji.error(`Auth (${pt}): ${e}`, ...t);
  }
  function Yi(e, ...t) {
    throw Zi(e, ...t);
  }
  function zi(e, ...t) {
    return Zi(e, ...t);
  }
  function Qi(e, t, i) {
    const n = Object.assign(Object.assign({}, Ji()), { [t]: i });
    return new G("auth", "Firebase", n).create(t, { appName: e.name });
  }
  function $i(e) {
    return Qi(
      e,
      "operation-not-supported-in-this-environment",
      "Operations that alter the current user are not supported in conjunction with FirebaseServerApp"
    );
  }
  function Zi(e, ...t) {
    if ("string" != typeof e) {
      const i = t[0],
        n = [...t.slice(1)];
      return n[0] && (n[0].appName = e.name), e._errorFactory.create(i, ...n);
    }
    return Wi.create(e, ...t);
  }
  function Xi(e, t, ...i) {
    if (!e) throw Zi(t, ...i);
  }
  function en(e) {
    const t = "INTERNAL ASSERTION FAILED: " + e;
    throw (qi(t), new Error(t));
  }
  function tn(e, t) {
    e || en(t);
  }
  function nn() {
    var e;
    return (
      ("undefined" != typeof self &&
        (null === (e = self.location) || void 0 === e ? void 0 : e.href)) ||
      ""
    );
  }
  function sn() {
    var e;
    return (
      ("undefined" != typeof self &&
        (null === (e = self.location) || void 0 === e ? void 0 : e.protocol)) ||
      null
    );
  }
  function an() {
    return (
      "undefined" == typeof navigator ||
      !navigator ||
      !("onLine" in navigator) ||
      "boolean" != typeof navigator.onLine ||
      ("http:" !== sn() &&
        "https:" !== sn() &&
        !R() &&
        !("connection" in navigator)) ||
      navigator.onLine
    );
  }
  var rn = class {
    constructor(e, t) {
      (this.shortDelay = e),
        (this.longDelay = t),
        tn(t > e, "Short delay should be less than long delay!"),
        (this.isMobile =
          ("undefined" != typeof window &&
            !!(window.cordova || window.phonegap || window.PhoneGap) &&
            /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(P())) ||
          ("object" == typeof navigator &&
            "ReactNative" === navigator.product));
    }
    get() {
      return an()
        ? this.isMobile
          ? this.longDelay
          : this.shortDelay
        : Math.min(5e3, this.shortDelay);
    }
  };
  function on(e, t) {
    tn(e.emulator, "Emulator should always be set here");
    const { url: i } = e.emulator;
    return t ? `${i}${t.startsWith("/") ? t.slice(1) : t}` : i;
  }
  var ln = class {
    static initialize(e, t, i) {
      (this.fetchImpl = e),
        t && (this.headersImpl = t),
        i && (this.responseImpl = i);
    }
    static fetch() {
      return this.fetchImpl
        ? this.fetchImpl
        : "undefined" != typeof self && "fetch" in self
          ? self.fetch
          : "undefined" != typeof globalThis && globalThis.fetch
            ? globalThis.fetch
            : "undefined" != typeof fetch
              ? fetch
              : void en(
                "Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
              );
    }
    static headers() {
      return this.headersImpl
        ? this.headersImpl
        : "undefined" != typeof self && "Headers" in self
          ? self.Headers
          : "undefined" != typeof globalThis && globalThis.Headers
            ? globalThis.Headers
            : "undefined" != typeof Headers
              ? Headers
              : void en(
                "Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
              );
    }
    static response() {
      return this.responseImpl
        ? this.responseImpl
        : "undefined" != typeof self && "Response" in self
          ? self.Response
          : "undefined" != typeof globalThis && globalThis.Response
            ? globalThis.Response
            : "undefined" != typeof Response
              ? Response
              : void en(
                "Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
              );
    }
  },
    hn = {
      CREDENTIAL_MISMATCH: "custom-token-mismatch",
      MISSING_CUSTOM_TOKEN: "internal-error",
      INVALID_IDENTIFIER: "invalid-email",
      MISSING_CONTINUE_URI: "internal-error",
      INVALID_PASSWORD: "wrong-password",
      MISSING_PASSWORD: "missing-password",
      INVALID_LOGIN_CREDENTIALS: "invalid-credential",
      EMAIL_EXISTS: "email-already-in-use",
      PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
      INVALID_IDP_RESPONSE: "invalid-credential",
      INVALID_PENDING_TOKEN: "invalid-credential",
      FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
      MISSING_REQ_TYPE: "internal-error",
      EMAIL_NOT_FOUND: "user-not-found",
      RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
      EXPIRED_OOB_CODE: "expired-action-code",
      INVALID_OOB_CODE: "invalid-action-code",
      MISSING_OOB_CODE: "internal-error",
      CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
      INVALID_ID_TOKEN: "invalid-user-token",
      TOKEN_EXPIRED: "user-token-expired",
      USER_NOT_FOUND: "user-token-expired",
      TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
      PASSWORD_DOES_NOT_MEET_REQUIREMENTS:
        "password-does-not-meet-requirements",
      INVALID_CODE: "invalid-verification-code",
      INVALID_SESSION_INFO: "invalid-verification-id",
      INVALID_TEMPORARY_PROOF: "invalid-credential",
      MISSING_SESSION_INFO: "missing-verification-id",
      SESSION_EXPIRED: "code-expired",
      MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
      UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
      INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
      ADMIN_ONLY_OPERATION: "admin-restricted-operation",
      INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
      MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
      MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
      MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
      SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
      SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
      BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
      RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
      MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
      INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
      INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
      MISSING_CLIENT_TYPE: "missing-client-type",
      MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
      INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
      INVALID_REQ_TYPE: "invalid-req-type",
    },
    cn = [
      "/v1/accounts:signInWithCustomToken",
      "/v1/accounts:signInWithEmailLink",
      "/v1/accounts:signInWithIdp",
      "/v1/accounts:signInWithPassword",
      "/v1/accounts:signInWithPhoneNumber",
      "/v1/token",
    ],
    dn = new rn(3e4, 6e4);
  function un(e, t) {
    return e.tenantId && !t.tenantId
      ? Object.assign(Object.assign({}, t), { tenantId: e.tenantId })
      : t;
  }
  function pn(e, t, i, n) {
    return _(this, arguments, function* (e, t, i, n, s = {}) {
      return gn(e, s, () =>
        _(this, null, function* () {
          let s = {},
            a = {};
          n && ("GET" === t ? (a = n) : (s = { body: JSON.stringify(n) }));
          const r = J(Object.assign({ key: e.config.apiKey }, a)).slice(1),
            o = yield e._getAdditionalHeaders();
          (o["Content-Type"] = "application/json"),
            e.languageCode && (o["X-Firebase-Locale"] = e.languageCode);
          const l = Object.assign({ method: t, headers: o }, s);
          return (
            ("undefined" != typeof navigator &&
              "Cloudflare-Workers" === navigator.userAgent) ||
            (l.referrerPolicy = "no-referrer"),
            ln.fetch()(yield mn(e, e.config.apiHost, i, r), l)
          );
        })
      );
    });
  }
  function gn(e, t, i) {
    return _(this, null, function* () {
      e._canInitEmulator = !1;
      const n = Object.assign(Object.assign({}, hn), t);
      try {
        const t = new vn(e),
          s = yield Promise.race([i(), t.promise]);
        t.clearNetworkTimeout();
        const a = yield s.json();
        if ("needConfirmation" in a)
          throw _n(e, "account-exists-with-different-credential", a);
        if (s.ok && !("errorMessage" in a)) return a;
        {
          const t = s.ok ? a.errorMessage : a.error.message,
            [i, r] = t.split(" : ");
          if ("FEDERATED_USER_ID_ALREADY_LINKED" === i)
            throw _n(e, "credential-already-in-use", a);
          if ("EMAIL_EXISTS" === i) throw _n(e, "email-already-in-use", a);
          if ("USER_DISABLED" === i) throw _n(e, "user-disabled", a);
          const o = n[i] || i.toLowerCase().replace(/[_\s]+/g, "-");
          if (r) throw Qi(e, o, r);
          Yi(e, o);
        }
      } catch (t) {
        if (t instanceof H) throw t;
        Yi(e, "network-request-failed", { message: String(t) });
      }
    });
  }
  function fn(e, t, i, n) {
    return _(this, arguments, function* (e, t, i, n, s = {}) {
      const a = yield pn(e, t, i, n, s);
      return (
        "mfaPendingCredential" in a &&
        Yi(e, "multi-factor-auth-required", { _serverResponse: a }),
        a
      );
    });
  }
  function mn(e, t, i, n) {
    return _(this, null, function* () {
      const s = `${t}${i}?${n}`,
        a = e,
        r = a.config.emulator
          ? on(e.config, s)
          : `${e.config.apiScheme}://${s}`;
      if (
        cn.includes(i) &&
        (yield a._persistenceManagerAvailable,
          "COOKIE" === a._getPersistenceType())
      ) {
        return a._getPersistence()._getFinalTarget(r).toString();
      }
      return r;
    });
  }
  function yn(e) {
    switch (e) {
      case "ENFORCE":
        return "ENFORCE";
      case "AUDIT":
        return "AUDIT";
      case "OFF":
        return "OFF";
      default:
        return "ENFORCEMENT_STATE_UNSPECIFIED";
    }
  }
  var vn = class {
    clearNetworkTimeout() {
      clearTimeout(this.timer);
    }
    constructor(e) {
      (this.auth = e),
        (this.timer = null),
        (this.promise = new Promise((e, t) => {
          this.timer = setTimeout(
            () => t(zi(this.auth, "network-request-failed")),
            dn.get()
          );
        }));
    }
  };
  function _n(e, t, i) {
    const n = { appName: e.name };
    i.email && (n.email = i.email),
      i.phoneNumber && (n.phoneNumber = i.phoneNumber);
    const s = zi(e, t, n);
    return (s.customData._tokenResponse = i), s;
  }
  function In(e) {
    return void 0 !== e && void 0 !== e.enterprise;
  }
  var Sn = class {
    constructor(e) {
      if (
        ((this.siteKey = ""),
          (this.recaptchaEnforcementState = []),
          void 0 === e.recaptchaKey)
      )
        throw new Error("recaptchaKey undefined");
      (this.siteKey = e.recaptchaKey.split("/")[3]),
        (this.recaptchaEnforcementState = e.recaptchaEnforcementState);
    }
    getProviderEnforcementState(e) {
      if (
        !this.recaptchaEnforcementState ||
        0 === this.recaptchaEnforcementState.length
      )
        return null;
      for (const t of this.recaptchaEnforcementState)
        if (t.provider && t.provider === e) return yn(t.enforcementState);
      return null;
    }
    isProviderEnabled(e) {
      return (
        "ENFORCE" === this.getProviderEnforcementState(e) ||
        "AUDIT" === this.getProviderEnforcementState(e)
      );
    }
    isAnyProviderEnabled() {
      return (
        this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER") ||
        this.isProviderEnabled("PHONE_PROVIDER")
      );
    }
  };
  function Ln(e, t) {
    return _(this, null, function* () {
      return pn(e, "GET", "/v2/recaptchaConfig", un(e, t));
    });
  }
  function An(e, t) {
    return _(this, null, function* () {
      return pn(e, "POST", "/v1/accounts:lookup", t);
    });
  }
  function En(e) {
    if (e)
      try {
        const t = new Date(Number(e));
        if (!isNaN(t.getTime())) return t.toUTCString();
      } catch (e) { }
  }
  function Cn(e) {
    return 1e3 * Number(e);
  }
  function wn(e) {
    const [t, i, n] = e.split(".");
    if (void 0 === t || void 0 === i || void 0 === n)
      return qi("JWT malformed, contained fewer than 3 sections"), null;
    try {
      const e = T(i);
      return e
        ? JSON.parse(e)
        : (qi("Failed to decode base64 JWT payload"), null);
    } catch (e) {
      return (
        qi(
          "Caught error parsing JWT payload as JSON",
          null == e ? void 0 : e.toString()
        ),
        null
      );
    }
  }
  function bn(e) {
    const t = wn(e);
    return (
      Xi(t, "internal-error"),
      Xi(void 0 !== t.exp, "internal-error"),
      Xi(void 0 !== t.iat, "internal-error"),
      Number(t.exp) - Number(t.iat)
    );
  }
  function Tn(e, t, i = !1) {
    return _(this, null, function* () {
      if (i) return t;
      try {
        return yield t;
      } catch (t) {
        throw (
          (t instanceof H &&
            (function ({ code: e }) {
              return (
                "auth/user-disabled" === e || "auth/user-token-expired" === e
              );
            })(t) &&
            e.auth.currentUser === e &&
            (yield e.auth.signOut()),
            t)
        );
      }
    });
  }
  var Mn = class {
    constructor(e) {
      (this.user = e),
        (this.isRunning = !1),
        (this.timerId = null),
        (this.errorBackoff = 3e4);
    }
    _start() {
      this.isRunning || ((this.isRunning = !0), this.schedule());
    }
    _stop() {
      this.isRunning &&
        ((this.isRunning = !1),
          null !== this.timerId && clearTimeout(this.timerId));
    }
    getInterval(e) {
      var t;
      if (e) {
        const e = this.errorBackoff;
        return (this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4)), e;
      }
      {
        this.errorBackoff = 3e4;
        const e =
          (null !== (t = this.user.stsTokenManager.expirationTime) &&
            void 0 !== t
            ? t
            : 0) -
          Date.now() -
          3e5;
        return Math.max(0, e);
      }
    }
    schedule(e = !1) {
      if (!this.isRunning) return;
      const t = this.getInterval(e);
      this.timerId = setTimeout(
        () =>
          _(this, null, function* () {
            yield this.iteration();
          }),
        t
      );
    }
    iteration() {
      return _(this, null, function* () {
        try {
          yield this.user.getIdToken(!0);
        } catch (e) {
          return void (
            "auth/network-request-failed" === (null == e ? void 0 : e.code) &&
            this.schedule(!0)
          );
        }
        this.schedule();
      });
    }
  },
    Dn = class {
      constructor(e, t) {
        (this.createdAt = e), (this.lastLoginAt = t), this._initializeTime();
      }
      _initializeTime() {
        (this.lastSignInTime = En(this.lastLoginAt)),
          (this.creationTime = En(this.createdAt));
      }
      _copy(e) {
        (this.createdAt = e.createdAt),
          (this.lastLoginAt = e.lastLoginAt),
          this._initializeTime();
      }
      toJSON() {
        return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
      }
    };
  function kn(e) {
    return _(this, null, function* () {
      var t;
      const i = e.auth,
        n = yield e.getIdToken(),
        s = yield Tn(e, An(i, { idToken: n }));
      Xi(null == s ? void 0 : s.users.length, i, "internal-error");
      const a = s.users[0];
      e._notifyReloadListener(a);
      const r = (
        null === (t = a.providerUserInfo) || void 0 === t ? void 0 : t.length
      )
        ? Bn(a.providerUserInfo)
        : [],
        o =
          ((l = e.providerData),
            (h = r),
            [
              ...l.filter((e) => !h.some((t) => t.providerId === e.providerId)),
              ...h,
            ]);
      var l, h;
      const c = e.isAnonymous,
        d = !((e.email && a.passwordHash) || (null == o ? void 0 : o.length)),
        u = !!c && d,
        p = {
          uid: a.localId,
          displayName: a.displayName || null,
          photoURL: a.photoUrl || null,
          email: a.email || null,
          emailVerified: a.emailVerified || !1,
          phoneNumber: a.phoneNumber || null,
          tenantId: a.tenantId || null,
          providerData: o,
          metadata: new Dn(a.createdAt, a.lastLoginAt),
          isAnonymous: u,
        };
      Object.assign(e, p);
    });
  }
  function Bn(e) {
    return e.map((e) => {
      var { providerId: t } = e,
        i = Ki(e, ["providerId"]);
      return {
        providerId: t,
        uid: i.rawId || "",
        displayName: i.displayName || null,
        email: i.email || null,
        phoneNumber: i.phoneNumber || null,
        photoURL: i.photoUrl || null,
      };
    });
  }
  var On = class e {
    constructor() {
      (this.refreshToken = null),
        (this.accessToken = null),
        (this.expirationTime = null);
    }
    get isExpired() {
      return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
    }
    updateFromServerResponse(e) {
      Xi(e.idToken, "internal-error"),
        Xi(void 0 !== e.idToken, "internal-error"),
        Xi(void 0 !== e.refreshToken, "internal-error");
      const t =
        "expiresIn" in e && void 0 !== e.expiresIn
          ? Number(e.expiresIn)
          : bn(e.idToken);
      this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
    }
    updateFromIdToken(e) {
      Xi(0 !== e.length, "internal-error");
      const t = bn(e);
      this.updateTokensAndExpiration(e, null, t);
    }
    getToken(e, t = !1) {
      return _(this, null, function* () {
        return t || !this.accessToken || this.isExpired
          ? (Xi(this.refreshToken, e, "user-token-expired"),
            this.refreshToken
              ? (yield this.refresh(e, this.refreshToken), this.accessToken)
              : null)
          : this.accessToken;
      });
    }
    clearRefreshToken() {
      this.refreshToken = null;
    }
    refresh(e, t) {
      return _(this, null, function* () {
        const {
          accessToken: i,
          refreshToken: n,
          expiresIn: s,
        } = yield (function (e, t) {
          return _(this, null, function* () {
            const i = yield gn(e, {}, () =>
              _(this, null, function* () {
                const i = J({
                  grant_type: "refresh_token",
                  refresh_token: t,
                }).slice(1),
                  { tokenApiHost: n, apiKey: s } = e.config,
                  a = yield mn(e, n, "/v1/token", `key=${s}`),
                  r = yield e._getAdditionalHeaders();
                return (
                  (r["Content-Type"] = "application/x-www-form-urlencoded"),
                  ln.fetch()(a, { method: "POST", headers: r, body: i })
                );
              })
            );
            return {
              accessToken: i.access_token,
              expiresIn: i.expires_in,
              refreshToken: i.refresh_token,
            };
          });
        })(e, t);
        this.updateTokensAndExpiration(i, n, Number(s));
      });
    }
    updateTokensAndExpiration(e, t, i) {
      (this.refreshToken = t || null),
        (this.accessToken = e || null),
        (this.expirationTime = Date.now() + 1e3 * i);
    }
    static fromJSON(t, i) {
      const { refreshToken: n, accessToken: s, expirationTime: a } = i,
        r = new e();
      return (
        n &&
        (Xi("string" == typeof n, "internal-error", { appName: t }),
          (r.refreshToken = n)),
        s &&
        (Xi("string" == typeof s, "internal-error", { appName: t }),
          (r.accessToken = s)),
        a &&
        (Xi("number" == typeof a, "internal-error", { appName: t }),
          (r.expirationTime = a)),
        r
      );
    }
    toJSON() {
      return {
        refreshToken: this.refreshToken,
        accessToken: this.accessToken,
        expirationTime: this.expirationTime,
      };
    }
    _assign(e) {
      (this.accessToken = e.accessToken),
        (this.refreshToken = e.refreshToken),
        (this.expirationTime = e.expirationTime);
    }
    _clone() {
      return Object.assign(new e(), this.toJSON());
    }
    _performRefresh() {
      return en("not implemented");
    }
  };
  function Pn(e, t) {
    Xi("string" == typeof e || void 0 === e, "internal-error", { appName: t });
  }
  var Rn = class e {
    constructor(e) {
      var { uid: t, auth: i, stsTokenManager: n } = e,
        s = Ki(e, ["uid", "auth", "stsTokenManager"]);
      (this.providerId = "firebase"),
        (this.proactiveRefresh = new Mn(this)),
        (this.reloadUserInfo = null),
        (this.reloadListener = null),
        (this.uid = t),
        (this.auth = i),
        (this.stsTokenManager = n),
        (this.accessToken = n.accessToken),
        (this.displayName = s.displayName || null),
        (this.email = s.email || null),
        (this.emailVerified = s.emailVerified || !1),
        (this.phoneNumber = s.phoneNumber || null),
        (this.photoURL = s.photoURL || null),
        (this.isAnonymous = s.isAnonymous || !1),
        (this.tenantId = s.tenantId || null),
        (this.providerData = s.providerData ? [...s.providerData] : []),
        (this.metadata = new Dn(
          s.createdAt || void 0,
          s.lastLoginAt || void 0
        ));
    }
    getIdToken(e) {
      return _(this, null, function* () {
        const t = yield Tn(this, this.stsTokenManager.getToken(this.auth, e));
        return (
          Xi(t, this.auth, "internal-error"),
          this.accessToken !== t &&
          ((this.accessToken = t),
            yield this.auth._persistUserIfCurrent(this),
            this.auth._notifyListenersIfCurrent(this)),
          t
        );
      });
    }
    getIdTokenResult(e) {
      return (function (e, t = !1) {
        return _(this, null, function* () {
          const i = Q(e),
            n = yield i.getIdToken(t),
            s = wn(n);
          Xi(s && s.exp && s.auth_time && s.iat, i.auth, "internal-error");
          const a = "object" == typeof s.firebase ? s.firebase : void 0,
            r = null == a ? void 0 : a.sign_in_provider;
          return {
            claims: s,
            token: n,
            authTime: En(Cn(s.auth_time)),
            issuedAtTime: En(Cn(s.iat)),
            expirationTime: En(Cn(s.exp)),
            signInProvider: r || null,
            signInSecondFactor:
              (null == a ? void 0 : a.sign_in_second_factor) || null,
          };
        });
      })(this, e);
    }
    reload() {
      return (function (e) {
        return _(this, null, function* () {
          const t = Q(e);
          yield kn(t),
            yield t.auth._persistUserIfCurrent(t),
            t.auth._notifyListenersIfCurrent(t);
        });
      })(this);
    }
    _assign(e) {
      this !== e &&
        (Xi(this.uid === e.uid, this.auth, "internal-error"),
          (this.displayName = e.displayName),
          (this.photoURL = e.photoURL),
          (this.email = e.email),
          (this.emailVerified = e.emailVerified),
          (this.phoneNumber = e.phoneNumber),
          (this.isAnonymous = e.isAnonymous),
          (this.tenantId = e.tenantId),
          (this.providerData = e.providerData.map((e) => Object.assign({}, e))),
          this.metadata._copy(e.metadata),
          this.stsTokenManager._assign(e.stsTokenManager));
    }
    _clone(t) {
      const i = new e(
        Object.assign(Object.assign({}, this), {
          auth: t,
          stsTokenManager: this.stsTokenManager._clone(),
        })
      );
      return i.metadata._copy(this.metadata), i;
    }
    _onReload(e) {
      Xi(!this.reloadListener, this.auth, "internal-error"),
        (this.reloadListener = e),
        this.reloadUserInfo &&
        (this._notifyReloadListener(this.reloadUserInfo),
          (this.reloadUserInfo = null));
    }
    _notifyReloadListener(e) {
      this.reloadListener
        ? this.reloadListener(e)
        : (this.reloadUserInfo = e);
    }
    _startProactiveRefresh() {
      this.proactiveRefresh._start();
    }
    _stopProactiveRefresh() {
      this.proactiveRefresh._stop();
    }
    _updateTokensIfNecessary(e, t = !1) {
      return _(this, null, function* () {
        let i = !1;
        e.idToken &&
          e.idToken !== this.stsTokenManager.accessToken &&
          (this.stsTokenManager.updateFromServerResponse(e), (i = !0)),
          t && (yield kn(this)),
          yield this.auth._persistUserIfCurrent(this),
          i && this.auth._notifyListenersIfCurrent(this);
      });
    }
    delete() {
      return _(this, null, function* () {
        if (ct(this.auth.app)) return Promise.reject($i(this.auth));
        const e = yield this.getIdToken();
        return (
          yield Tn(
            this,
            (function (e, t) {
              return _(this, null, function* () {
                return pn(e, "POST", "/v1/accounts:delete", t);
              });
            })(this.auth, { idToken: e })
          ),
          this.stsTokenManager.clearRefreshToken(),
          this.auth.signOut()
        );
      });
    }
    toJSON() {
      return Object.assign(
        Object.assign(
          {
            uid: this.uid,
            email: this.email || void 0,
            emailVerified: this.emailVerified,
            displayName: this.displayName || void 0,
            isAnonymous: this.isAnonymous,
            photoURL: this.photoURL || void 0,
            phoneNumber: this.phoneNumber || void 0,
            tenantId: this.tenantId || void 0,
            providerData: this.providerData.map((e) => Object.assign({}, e)),
            stsTokenManager: this.stsTokenManager.toJSON(),
            _redirectEventId: this._redirectEventId,
          },
          this.metadata.toJSON()
        ),
        { apiKey: this.auth.config.apiKey, appName: this.auth.name }
      );
    }
    get refreshToken() {
      return this.stsTokenManager.refreshToken || "";
    }
    static _fromJSON(t, i) {
      var n, s, a, r, o, l, h, c;
      const d = null !== (n = i.displayName) && void 0 !== n ? n : void 0,
        u = null !== (s = i.email) && void 0 !== s ? s : void 0,
        p = null !== (a = i.phoneNumber) && void 0 !== a ? a : void 0,
        g = null !== (r = i.photoURL) && void 0 !== r ? r : void 0,
        f = null !== (o = i.tenantId) && void 0 !== o ? o : void 0,
        m = null !== (l = i._redirectEventId) && void 0 !== l ? l : void 0,
        y = null !== (h = i.createdAt) && void 0 !== h ? h : void 0,
        v = null !== (c = i.lastLoginAt) && void 0 !== c ? c : void 0,
        {
          uid: _,
          emailVerified: I,
          isAnonymous: S,
          providerData: L,
          stsTokenManager: A,
        } = i;
      Xi(_ && A, t, "internal-error");
      const E = On.fromJSON(this.name, A);
      Xi("string" == typeof _, t, "internal-error"),
        Pn(d, t.name),
        Pn(u, t.name),
        Xi("boolean" == typeof I, t, "internal-error"),
        Xi("boolean" == typeof S, t, "internal-error"),
        Pn(p, t.name),
        Pn(g, t.name),
        Pn(f, t.name),
        Pn(m, t.name),
        Pn(y, t.name),
        Pn(v, t.name);
      const C = new e({
        uid: _,
        auth: t,
        email: u,
        emailVerified: I,
        displayName: d,
        isAnonymous: S,
        photoURL: g,
        phoneNumber: p,
        tenantId: f,
        stsTokenManager: E,
        createdAt: y,
        lastLoginAt: v,
      });
      return (
        L &&
        Array.isArray(L) &&
        (C.providerData = L.map((e) => Object.assign({}, e))),
        m && (C._redirectEventId = m),
        C
      );
    }
    static _fromIdTokenResponse(t, i, n = !1) {
      return _(this, null, function* () {
        const s = new On();
        s.updateFromServerResponse(i);
        const a = new e({
          uid: i.localId,
          auth: t,
          stsTokenManager: s,
          isAnonymous: n,
        });
        return yield kn(a), a;
      });
    }
    static _fromGetAccountInfoResponse(t, i, n) {
      return _(this, null, function* () {
        const s = i.users[0];
        Xi(void 0 !== s.localId, "internal-error");
        const a = void 0 !== s.providerUserInfo ? Bn(s.providerUserInfo) : [],
          r = !(
            (s.email && s.passwordHash) ||
            (null == a ? void 0 : a.length)
          ),
          o = new On();
        o.updateFromIdToken(n);
        const l = new e({
          uid: s.localId,
          auth: t,
          stsTokenManager: o,
          isAnonymous: r,
        }),
          h = {
            uid: s.localId,
            displayName: s.displayName || null,
            photoURL: s.photoUrl || null,
            email: s.email || null,
            emailVerified: s.emailVerified || !1,
            phoneNumber: s.phoneNumber || null,
            tenantId: s.tenantId || null,
            providerData: a,
            metadata: new Dn(s.createdAt, s.lastLoginAt),
            isAnonymous: !(
              (s.email && s.passwordHash) ||
              (null == a ? void 0 : a.length)
            ),
          };
        return Object.assign(l, h), l;
      });
    }
  },
    Nn = new Map();
  function xn(e) {
    tn(e instanceof Function, "Expected a class definition");
    let t = Nn.get(e);
    return t
      ? (tn(t instanceof e, "Instance stored in cache mismatched with class"),
        t)
      : ((t = new e()), Nn.set(e, t), t);
  }
  var Fn = class {
    constructor() {
      (this.type = "NONE"), (this.storage = {});
    }
    _isAvailable() {
      return _(this, null, function* () {
        return !0;
      });
    }
    _set(e, t) {
      return _(this, null, function* () {
        this.storage[e] = t;
      });
    }
    _get(e) {
      return _(this, null, function* () {
        const t = this.storage[e];
        return void 0 === t ? null : t;
      });
    }
    _remove(e) {
      return _(this, null, function* () {
        delete this.storage[e];
      });
    }
    _addListener(e, t) { }
    _removeListener(e, t) { }
  };
  Fn.type = "NONE";
  var Hn = Fn;
  function Gn(e, t, i) {
    return `firebase:${e}:${t}:${i}`;
  }
  var Un = class e {
    constructor(e, t, i) {
      (this.persistence = e), (this.auth = t), (this.userKey = i);
      const { config: n, name: s } = this.auth;
      (this.fullUserKey = Gn(this.userKey, n.apiKey, s)),
        (this.fullPersistenceKey = Gn("persistence", n.apiKey, s)),
        (this.boundEventHandler = t._onStorageEvent.bind(t)),
        this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
    }
    setCurrentUser(e) {
      return this.persistence._set(this.fullUserKey, e.toJSON());
    }
    getCurrentUser() {
      return _(this, null, function* () {
        const e = yield this.persistence._get(this.fullUserKey);
        if (!e) return null;
        if ("string" == typeof e) {
          const t = yield An(this.auth, { idToken: e }).catch(() => { });
          return t ? Rn._fromGetAccountInfoResponse(this.auth, t, e) : null;
        }
        return Rn._fromJSON(this.auth, e);
      });
    }
    removeCurrentUser() {
      return this.persistence._remove(this.fullUserKey);
    }
    savePersistenceForRedirect() {
      return this.persistence._set(
        this.fullPersistenceKey,
        this.persistence.type
      );
    }
    setPersistence(e) {
      return _(this, null, function* () {
        if (this.persistence === e) return;
        const t = yield this.getCurrentUser();
        return (
          yield this.removeCurrentUser(),
          (this.persistence = e),
          t ? this.setCurrentUser(t) : void 0
        );
      });
    }
    delete() {
      this.persistence._removeListener(
        this.fullUserKey,
        this.boundEventHandler
      );
    }
    static create(t, i, n = "authUser") {
      return _(this, null, function* () {
        if (!i.length) return new e(xn(Hn), t, n);
        const s = (yield Promise.all(
          i.map((e) =>
            _(this, null, function* () {
              if (yield e._isAvailable()) return e;
            })
          )
        )).filter((e) => e);
        let a = s[0] || xn(Hn);
        const r = Gn(n, t.config.apiKey, t.name);
        let o = null;
        for (const e of i)
          try {
            const i = yield e._get(r);
            if (i) {
              let n;
              if ("string" == typeof i) {
                const e = yield An(t, { idToken: i }).catch(() => { });
                if (!e) break;
                n = yield Rn._fromGetAccountInfoResponse(t, e, i);
              } else n = Rn._fromJSON(t, i);
              e !== a && (o = n), (a = e);
              break;
            }
          } catch (e) { }
        const l = s.filter((e) => e._shouldAllowMigration);
        return a._shouldAllowMigration && l.length
          ? ((a = l[0]),
            o && (yield a._set(r, o.toJSON())),
            yield Promise.all(
              i.map((e) =>
                _(this, null, function* () {
                  if (e !== a)
                    try {
                      yield e._remove(r);
                    } catch (e) { }
                })
              )
            ),
            new e(a, t, n))
          : new e(a, t, n);
      });
    }
  };
  function Kn(e) {
    const t = e.toLowerCase();
    if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/"))
      return "Opera";
    if (jn(t)) return "IEMobile";
    if (t.includes("msie") || t.includes("trident/")) return "IE";
    if (t.includes("edge/")) return "Edge";
    if (Vn(t)) return "Firefox";
    if (t.includes("silk/")) return "Silk";
    if (Yn(t)) return "Blackberry";
    if (zn(t)) return "Webos";
    if (Jn(t)) return "Safari";
    if ((t.includes("chrome/") || Wn(t)) && !t.includes("edge/"))
      return "Chrome";
    if (qn(t)) return "Android";
    {
      const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
        i = e.match(t);
      if (2 === (null == i ? void 0 : i.length)) return i[1];
    }
    return "Other";
  }
  function Vn(e = P()) {
    return /firefox\//i.test(e);
  }
  function Jn(e = P()) {
    const t = e.toLowerCase();
    return (
      t.includes("safari/") &&
      !t.includes("chrome/") &&
      !t.includes("crios/") &&
      !t.includes("android")
    );
  }
  function Wn(e = P()) {
    return /crios\//i.test(e);
  }
  function jn(e = P()) {
    return /iemobile/i.test(e);
  }
  function qn(e = P()) {
    return /android/i.test(e);
  }
  function Yn(e = P()) {
    return /blackberry/i.test(e);
  }
  function zn(e = P()) {
    return /webos/i.test(e);
  }
  function Qn(e = P()) {
    return (
      /iphone|ipad|ipod/i.test(e) || (/macintosh/i.test(e) && /mobile/i.test(e))
    );
  }
  function $n() {
    return (
      (function () {
        const e = P();
        return e.indexOf("MSIE ") >= 0 || e.indexOf("Trident/") >= 0;
      })() && 10 === document.documentMode
    );
  }
  function Zn(e = P()) {
    return (
      Qn(e) || qn(e) || zn(e) || Yn(e) || /windows phone/i.test(e) || jn(e)
    );
  }
  function Xn(e, t = []) {
    let i;
    switch (e) {
      case "Browser":
        i = Kn(P());
        break;
      case "Worker":
        i = `${Kn(P())}-${e}`;
        break;
      default:
        i = e;
    }
    const n = t.length ? t.join(",") : "FirebaseCore-web";
    return `${i}/JsCore/${pt}/${n}`;
  }
  var es = class {
    constructor(e) {
      (this.auth = e), (this.queue = []);
    }
    pushCallback(e, t) {
      const i = (t) =>
        new Promise((i, n) => {
          try {
            i(e(t));
          } catch (e) {
            n(e);
          }
        });
      (i.onAbort = t), this.queue.push(i);
      const n = this.queue.length - 1;
      return () => {
        this.queue[n] = () => Promise.resolve();
      };
    }
    runMiddleware(e) {
      return _(this, null, function* () {
        if (this.auth.currentUser === e) return;
        const t = [];
        try {
          for (const i of this.queue)
            yield i(e), i.onAbort && t.push(i.onAbort);
        } catch (e) {
          t.reverse();
          for (const e of t)
            try {
              e();
            } catch (e) { }
          throw this.auth._errorFactory.create("login-blocked", {
            originalMessage: null == e ? void 0 : e.message,
          });
        }
      });
    }
  };
  var ts = class {
    constructor(e) {
      var t, i, n, s;
      const a = e.customStrengthOptions;
      (this.customStrengthOptions = {}),
        (this.customStrengthOptions.minPasswordLength =
          null !== (t = a.minPasswordLength) && void 0 !== t ? t : 6),
        a.maxPasswordLength &&
        (this.customStrengthOptions.maxPasswordLength =
          a.maxPasswordLength),
        void 0 !== a.containsLowercaseCharacter &&
        (this.customStrengthOptions.containsLowercaseLetter =
          a.containsLowercaseCharacter),
        void 0 !== a.containsUppercaseCharacter &&
        (this.customStrengthOptions.containsUppercaseLetter =
          a.containsUppercaseCharacter),
        void 0 !== a.containsNumericCharacter &&
        (this.customStrengthOptions.containsNumericCharacter =
          a.containsNumericCharacter),
        void 0 !== a.containsNonAlphanumericCharacter &&
        (this.customStrengthOptions.containsNonAlphanumericCharacter =
          a.containsNonAlphanumericCharacter),
        (this.enforcementState = e.enforcementState),
        "ENFORCEMENT_STATE_UNSPECIFIED" === this.enforcementState &&
        (this.enforcementState = "OFF"),
        (this.allowedNonAlphanumericCharacters =
          null !==
            (n =
              null === (i = e.allowedNonAlphanumericCharacters) ||
                void 0 === i
                ? void 0
                : i.join("")) && void 0 !== n
            ? n
            : ""),
        (this.forceUpgradeOnSignin =
          null !== (s = e.forceUpgradeOnSignin) && void 0 !== s && s),
        (this.schemaVersion = e.schemaVersion);
    }
    validatePassword(e) {
      var t, i, n, s, a, r;
      const o = { isValid: !0, passwordPolicy: this };
      return (
        this.validatePasswordLengthOptions(e, o),
        this.validatePasswordCharacterOptions(e, o),
        o.isValid &&
        (o.isValid =
          null === (t = o.meetsMinPasswordLength) || void 0 === t || t),
        o.isValid &&
        (o.isValid =
          null === (i = o.meetsMaxPasswordLength) || void 0 === i || i),
        o.isValid &&
        (o.isValid =
          null === (n = o.containsLowercaseLetter) || void 0 === n || n),
        o.isValid &&
        (o.isValid =
          null === (s = o.containsUppercaseLetter) || void 0 === s || s),
        o.isValid &&
        (o.isValid =
          null === (a = o.containsNumericCharacter) || void 0 === a || a),
        o.isValid &&
        (o.isValid =
          null === (r = o.containsNonAlphanumericCharacter) ||
          void 0 === r ||
          r),
        o
      );
    }
    validatePasswordLengthOptions(e, t) {
      const i = this.customStrengthOptions.minPasswordLength,
        n = this.customStrengthOptions.maxPasswordLength;
      i && (t.meetsMinPasswordLength = e.length >= i),
        n && (t.meetsMaxPasswordLength = e.length <= n);
    }
    validatePasswordCharacterOptions(e, t) {
      let i;
      this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
      for (let n = 0; n < e.length; n++)
        (i = e.charAt(n)),
          this.updatePasswordCharacterOptionsStatuses(
            t,
            i >= "a" && i <= "z",
            i >= "A" && i <= "Z",
            i >= "0" && i <= "9",
            this.allowedNonAlphanumericCharacters.includes(i)
          );
    }
    updatePasswordCharacterOptionsStatuses(e, t, i, n, s) {
      this.customStrengthOptions.containsLowercaseLetter &&
        (e.containsLowercaseLetter || (e.containsLowercaseLetter = t)),
        this.customStrengthOptions.containsUppercaseLetter &&
        (e.containsUppercaseLetter || (e.containsUppercaseLetter = i)),
        this.customStrengthOptions.containsNumericCharacter &&
        (e.containsNumericCharacter || (e.containsNumericCharacter = n)),
        this.customStrengthOptions.containsNonAlphanumericCharacter &&
        (e.containsNonAlphanumericCharacter ||
          (e.containsNonAlphanumericCharacter = s));
    }
  },
    is = class {
      constructor(e, t, i, n) {
        (this.app = e),
          (this.heartbeatServiceProvider = t),
          (this.appCheckServiceProvider = i),
          (this.config = n),
          (this.currentUser = null),
          (this.emulatorConfig = null),
          (this.operations = Promise.resolve()),
          (this.authStateSubscription = new ss(this)),
          (this.idTokenSubscription = new ss(this)),
          (this.beforeStateQueue = new es(this)),
          (this.redirectUser = null),
          (this.isProactiveRefreshEnabled = !1),
          (this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
          (this._canInitEmulator = !0),
          (this._isInitialized = !1),
          (this._deleted = !1),
          (this._initializationPromise = null),
          (this._popupRedirectResolver = null),
          (this._errorFactory = Wi),
          (this._agentRecaptchaConfig = null),
          (this._tenantRecaptchaConfigs = {}),
          (this._projectPasswordPolicy = null),
          (this._tenantPasswordPolicies = {}),
          (this._resolvePersistenceManagerAvailable = void 0),
          (this.lastNotifiedUid = void 0),
          (this.languageCode = null),
          (this.tenantId = null),
          (this.settings = { appVerificationDisabledForTesting: !1 }),
          (this.frameworks = []),
          (this.name = e.name),
          (this.clientVersion = n.sdkClientVersion),
          (this._persistenceManagerAvailable = new Promise(
            (e) => (this._resolvePersistenceManagerAvailable = e)
          ));
      }
      _initializeWithPersistence(e, t) {
        return (
          t && (this._popupRedirectResolver = xn(t)),
          (this._initializationPromise = this.queue(() =>
            _(this, null, function* () {
              var i, n, s;
              if (
                !this._deleted &&
                ((this.persistenceManager = yield Un.create(this, e)),
                  null === (i = this._resolvePersistenceManagerAvailable) ||
                  void 0 === i ||
                  i.call(this),
                  !this._deleted)
              ) {
                if (
                  null === (n = this._popupRedirectResolver) || void 0 === n
                    ? void 0
                    : n._shouldInitProactively
                )
                  try {
                    yield this._popupRedirectResolver._initialize(this);
                  } catch (e) { }
                yield this.initializeCurrentUser(t),
                  (this.lastNotifiedUid =
                    (null === (s = this.currentUser) || void 0 === s
                      ? void 0
                      : s.uid) || null),
                  this._deleted || (this._isInitialized = !0);
              }
            })
          )),
          this._initializationPromise
        );
      }
      _onStorageEvent() {
        return _(this, null, function* () {
          if (this._deleted) return;
          const e = yield this.assertedPersistence.getCurrentUser();
          return this.currentUser || e
            ? this.currentUser && e && this.currentUser.uid === e.uid
              ? (this._currentUser._assign(e),
                void (yield this.currentUser.getIdToken()))
              : void (yield this._updateCurrentUser(e, !0))
            : void 0;
        });
      }
      initializeCurrentUserFromIdToken(e) {
        return _(this, null, function* () {
          try {
            const t = yield An(this, { idToken: e }),
              i = yield Rn._fromGetAccountInfoResponse(this, t, e);
            yield this.directlySetCurrentUser(i);
          } catch (e) {
            console.warn(
              "FirebaseServerApp could not login user with provided authIdToken: ",
              e
            ),
              yield this.directlySetCurrentUser(null);
          }
        });
      }
      initializeCurrentUser(e) {
        return _(this, null, function* () {
          var t;
          if (ct(this.app)) {
            const e = this.app.settings.authIdToken;
            return e
              ? new Promise((t) => {
                setTimeout(() =>
                  this.initializeCurrentUserFromIdToken(e).then(t, t)
                );
              })
              : this.directlySetCurrentUser(null);
          }
          const i = yield this.assertedPersistence.getCurrentUser();
          let n = i,
            s = !1;
          if (e && this.config.authDomain) {
            yield this.getOrInitRedirectPersistenceManager();
            const i =
              null === (t = this.redirectUser) || void 0 === t
                ? void 0
                : t._redirectEventId,
              a = null == n ? void 0 : n._redirectEventId,
              r = yield this.tryRedirectSignIn(e);
            (i && i !== a) ||
              !(null == r ? void 0 : r.user) ||
              ((n = r.user), (s = !0));
          }
          if (!n) return this.directlySetCurrentUser(null);
          if (!n._redirectEventId) {
            if (s)
              try {
                yield this.beforeStateQueue.runMiddleware(n);
              } catch (e) {
                (n = i),
                  this._popupRedirectResolver._overrideRedirectResult(
                    this,
                    () => Promise.reject(e)
                  );
              }
            return n
              ? this.reloadAndSetCurrentUserOrClear(n)
              : this.directlySetCurrentUser(null);
          }
          return (
            Xi(this._popupRedirectResolver, this, "argument-error"),
            yield this.getOrInitRedirectPersistenceManager(),
            this.redirectUser &&
              this.redirectUser._redirectEventId === n._redirectEventId
              ? this.directlySetCurrentUser(n)
              : this.reloadAndSetCurrentUserOrClear(n)
          );
        });
      }
      tryRedirectSignIn(e) {
        return _(this, null, function* () {
          let t = null;
          try {
            t = yield this._popupRedirectResolver._completeRedirectFn(
              this,
              e,
              !0
            );
          } catch (e) {
            yield this._setRedirectUser(null);
          }
          return t;
        });
      }
      reloadAndSetCurrentUserOrClear(e) {
        return _(this, null, function* () {
          try {
            yield kn(e);
          } catch (e) {
            if ("auth/network-request-failed" !== (null == e ? void 0 : e.code))
              return this.directlySetCurrentUser(null);
          }
          return this.directlySetCurrentUser(e);
        });
      }
      useDeviceLanguage() {
        this.languageCode = (function () {
          if ("undefined" == typeof navigator) return null;
          const e = navigator;
          return (e.languages && e.languages[0]) || e.language || null;
        })();
      }
      _delete() {
        return _(this, null, function* () {
          this._deleted = !0;
        });
      }
      updateCurrentUser(e) {
        return _(this, null, function* () {
          if (ct(this.app)) return Promise.reject($i(this));
          const t = e ? Q(e) : null;
          return (
            t &&
            Xi(
              t.auth.config.apiKey === this.config.apiKey,
              this,
              "invalid-user-token"
            ),
            this._updateCurrentUser(t && t._clone(this))
          );
        });
      }
      _updateCurrentUser(e, t = !1) {
        return _(this, null, function* () {
          if (!this._deleted)
            return (
              e && Xi(this.tenantId === e.tenantId, this, "tenant-id-mismatch"),
              t || (yield this.beforeStateQueue.runMiddleware(e)),
              this.queue(() =>
                _(this, null, function* () {
                  yield this.directlySetCurrentUser(e),
                    this.notifyAuthListeners();
                })
              )
            );
        });
      }
      signOut() {
        return _(this, null, function* () {
          return ct(this.app)
            ? Promise.reject($i(this))
            : (yield this.beforeStateQueue.runMiddleware(null),
              (this.redirectPersistenceManager ||
                this._popupRedirectResolver) &&
              (yield this._setRedirectUser(null)),
              this._updateCurrentUser(null, !0));
        });
      }
      setPersistence(e) {
        return ct(this.app)
          ? Promise.reject($i(this))
          : this.queue(() =>
            _(this, null, function* () {
              yield this.assertedPersistence.setPersistence(xn(e));
            })
          );
      }
      _getRecaptchaConfig() {
        return null == this.tenantId
          ? this._agentRecaptchaConfig
          : this._tenantRecaptchaConfigs[this.tenantId];
      }
      validatePassword(e) {
        return _(this, null, function* () {
          this._getPasswordPolicyInternal() ||
            (yield this._updatePasswordPolicy());
          const t = this._getPasswordPolicyInternal();
          return t.schemaVersion !==
            this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION
            ? Promise.reject(
              this._errorFactory.create(
                "unsupported-password-policy-schema-version",
                {}
              )
            )
            : t.validatePassword(e);
        });
      }
      _getPasswordPolicyInternal() {
        return null === this.tenantId
          ? this._projectPasswordPolicy
          : this._tenantPasswordPolicies[this.tenantId];
      }
      _updatePasswordPolicy() {
        return _(this, null, function* () {
          const e = yield (function (e) {
            return _(this, arguments, function* (e, t = {}) {
              return pn(e, "GET", "/v2/passwordPolicy", un(e, t));
            });
          })(this),
            t = new ts(e);
          null === this.tenantId
            ? (this._projectPasswordPolicy = t)
            : (this._tenantPasswordPolicies[this.tenantId] = t);
        });
      }
      _getPersistenceType() {
        return this.assertedPersistence.persistence.type;
      }
      _getPersistence() {
        return this.assertedPersistence.persistence;
      }
      _updateErrorMap(e) {
        this._errorFactory = new G("auth", "Firebase", e());
      }
      onAuthStateChanged(e, t, i) {
        return this.registerStateListener(this.authStateSubscription, e, t, i);
      }
      beforeAuthStateChanged(e, t) {
        return this.beforeStateQueue.pushCallback(e, t);
      }
      onIdTokenChanged(e, t, i) {
        return this.registerStateListener(this.idTokenSubscription, e, t, i);
      }
      authStateReady() {
        return new Promise((e, t) => {
          if (this.currentUser) e();
          else {
            const i = this.onAuthStateChanged(() => {
              i(), e();
            }, t);
          }
        });
      }
      revokeAccessToken(e) {
        return _(this, null, function* () {
          if (this.currentUser) {
            const t = yield this.currentUser.getIdToken(),
              i = {
                providerId: "apple.com",
                tokenType: "ACCESS_TOKEN",
                token: e,
                idToken: t,
              };
            null != this.tenantId && (i.tenantId = this.tenantId),
              yield (function (e, t) {
                return _(this, null, function* () {
                  return pn(e, "POST", "/v2/accounts:revokeToken", un(e, t));
                });
              })(this, i);
          }
        });
      }
      toJSON() {
        var e;
        return {
          apiKey: this.config.apiKey,
          authDomain: this.config.authDomain,
          appName: this.name,
          currentUser:
            null === (e = this._currentUser) || void 0 === e
              ? void 0
              : e.toJSON(),
        };
      }
      _setRedirectUser(e, t) {
        return _(this, null, function* () {
          const i = yield this.getOrInitRedirectPersistenceManager(t);
          return null === e ? i.removeCurrentUser() : i.setCurrentUser(e);
        });
      }
      getOrInitRedirectPersistenceManager(e) {
        return _(this, null, function* () {
          if (!this.redirectPersistenceManager) {
            const t = (e && xn(e)) || this._popupRedirectResolver;
            Xi(t, this, "argument-error"),
              (this.redirectPersistenceManager = yield Un.create(
                this,
                [xn(t._redirectPersistence)],
                "redirectUser"
              )),
              (this.redirectUser =
                yield this.redirectPersistenceManager.getCurrentUser());
          }
          return this.redirectPersistenceManager;
        });
      }
      _redirectUserForId(e) {
        return _(this, null, function* () {
          var t, i;
          return (
            this._isInitialized &&
            (yield this.queue(() => _(this, null, function* () { }))),
            (null === (t = this._currentUser) || void 0 === t
              ? void 0
              : t._redirectEventId) === e
              ? this._currentUser
              : (null === (i = this.redirectUser) || void 0 === i
                ? void 0
                : i._redirectEventId) === e
                ? this.redirectUser
                : null
          );
        });
      }
      _persistUserIfCurrent(e) {
        return _(this, null, function* () {
          if (e === this.currentUser)
            return this.queue(() =>
              _(this, null, function* () {
                return this.directlySetCurrentUser(e);
              })
            );
        });
      }
      _notifyListenersIfCurrent(e) {
        e === this.currentUser && this.notifyAuthListeners();
      }
      _key() {
        return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
      }
      _startProactiveRefresh() {
        (this.isProactiveRefreshEnabled = !0),
          this.currentUser && this._currentUser._startProactiveRefresh();
      }
      _stopProactiveRefresh() {
        (this.isProactiveRefreshEnabled = !1),
          this.currentUser && this._currentUser._stopProactiveRefresh();
      }
      get _currentUser() {
        return this.currentUser;
      }
      notifyAuthListeners() {
        var e, t;
        if (!this._isInitialized) return;
        this.idTokenSubscription.next(this.currentUser);
        const i =
          null !==
            (t =
              null === (e = this.currentUser) || void 0 === e
                ? void 0
                : e.uid) && void 0 !== t
            ? t
            : null;
        this.lastNotifiedUid !== i &&
          ((this.lastNotifiedUid = i),
            this.authStateSubscription.next(this.currentUser));
      }
      registerStateListener(e, t, i, n) {
        if (this._deleted) return () => { };
        const s = "function" == typeof t ? t : t.next.bind(t);
        let a = !1;
        const r = this._isInitialized
          ? Promise.resolve()
          : this._initializationPromise;
        if (
          (Xi(r, this, "internal-error"),
            r.then(() => {
              a || s(this.currentUser);
            }),
            "function" == typeof t)
        ) {
          const s = e.addObserver(t, i, n);
          return () => {
            (a = !0), s();
          };
        }
        {
          const i = e.addObserver(t);
          return () => {
            (a = !0), i();
          };
        }
      }
      directlySetCurrentUser(e) {
        return _(this, null, function* () {
          this.currentUser &&
            this.currentUser !== e &&
            this._currentUser._stopProactiveRefresh(),
            e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(),
            (this.currentUser = e),
            e
              ? yield this.assertedPersistence.setCurrentUser(e)
              : yield this.assertedPersistence.removeCurrentUser();
        });
      }
      queue(e) {
        return (this.operations = this.operations.then(e, e)), this.operations;
      }
      get assertedPersistence() {
        return (
          Xi(this.persistenceManager, this, "internal-error"),
          this.persistenceManager
        );
      }
      _logFramework(e) {
        e &&
          !this.frameworks.includes(e) &&
          (this.frameworks.push(e),
            this.frameworks.sort(),
            (this.clientVersion = Xn(
              this.config.clientPlatform,
              this._getFrameworks()
            )));
      }
      _getFrameworks() {
        return this.frameworks;
      }
      _getAdditionalHeaders() {
        return _(this, null, function* () {
          var e;
          const t = { "X-Client-Version": this.clientVersion };
          this.app.options.appId &&
            (t["X-Firebase-gmpid"] = this.app.options.appId);
          const i = yield null ===
            (e = this.heartbeatServiceProvider.getImmediate({
              optional: !0,
            })) || void 0 === e
            ? void 0
            : e.getHeartbeatsHeader();
          i && (t["X-Firebase-Client"] = i);
          const n = yield this._getAppCheckToken();
          return n && (t["X-Firebase-AppCheck"] = n), t;
        });
      }
      _getAppCheckToken() {
        return _(this, null, function* () {
          var e;
          if (ct(this.app) && this.app.settings.appCheckToken)
            return this.app.settings.appCheckToken;
          const t = yield null ===
            (e = this.appCheckServiceProvider.getImmediate({ optional: !0 })) ||
            void 0 === e
            ? void 0
            : e.getToken();
          return (
            (null == t ? void 0 : t.error) &&
            (function (e, ...t) {
              ji.logLevel <= ee.WARN && ji.warn(`Auth (${pt}): ${e}`, ...t);
            })(`Error while retrieving App Check token: ${t.error}`),
            null == t ? void 0 : t.token
          );
        });
      }
    };
  function ns(e) {
    return Q(e);
  }
  var ss = class {
    constructor(e) {
      (this.auth = e),
        (this.observer = null),
        (this.addObserver = (function (e, t) {
          const i = new q(e, t);
          return i.subscribe.bind(i);
        })((e) => (this.observer = e)));
    }
    get next() {
      return (
        Xi(this.observer, this.auth, "internal-error"),
        this.observer.next.bind(this.observer)
      );
    }
  },
    as = {
      loadJS() {
        return _(this, null, function* () {
          throw new Error("Unable to load external scripts");
        });
      },
      recaptchaV2Script: "",
      recaptchaEnterpriseScript: "",
      gapiScript: "",
    };
  function rs(e) {
    return as.loadJS(e);
  }
  function os(e) {
    return `__${e}${Math.floor(1e6 * Math.random())}`;
  }
  var ls = class {
    constructor() {
      this.enterprise = new hs();
    }
    ready(e) {
      e();
    }
    execute(e, t) {
      return Promise.resolve("token");
    }
    render(e, t) {
      return "";
    }
  },
    hs = class {
      ready(e) {
        e();
      }
      execute(e, t) {
        return Promise.resolve("token");
      }
      render(e, t) {
        return "";
      }
    },
    cs = "NO_RECAPTCHA",
    ds = class {
      constructor(e) {
        (this.type = "recaptcha-enterprise"), (this.auth = ns(e));
      }
      verify(e = "verify", t = !1) {
        return _(this, null, function* () {
          function i(t, i, n) {
            const s = window.grecaptcha;
            In(s)
              ? s.enterprise.ready(() => {
                s.enterprise
                  .execute(t, { action: e })
                  .then((e) => {
                    i(e);
                  })
                  .catch(() => {
                    i(cs);
                  });
              })
              : n(Error("No reCAPTCHA enterprise script loaded."));
          }
          if (this.auth.settings.appVerificationDisabledForTesting) {
            return new ls().execute("siteKey", { action: "verify" });
          }
          return new Promise((e, n) => {
            (function (e) {
              return _(this, null, function* () {
                if (!t) {
                  if (null == e.tenantId && null != e._agentRecaptchaConfig)
                    return e._agentRecaptchaConfig.siteKey;
                  if (
                    null != e.tenantId &&
                    void 0 !== e._tenantRecaptchaConfigs[e.tenantId]
                  )
                    return e._tenantRecaptchaConfigs[e.tenantId].siteKey;
                }
                return new Promise((t, i) =>
                  _(this, null, function* () {
                    Ln(e, {
                      clientType: "CLIENT_TYPE_WEB",
                      version: "RECAPTCHA_ENTERPRISE",
                    })
                      .then((n) => {
                        if (void 0 !== n.recaptchaKey) {
                          const i = new Sn(n);
                          return (
                            null == e.tenantId
                              ? (e._agentRecaptchaConfig = i)
                              : (e._tenantRecaptchaConfigs[e.tenantId] = i),
                            t(i.siteKey)
                          );
                        }
                        i(new Error("recaptcha Enterprise site key undefined"));
                      })
                      .catch((e) => {
                        i(e);
                      });
                  })
                );
              });
            })(this.auth)
              .then((s) => {
                if (!t && In(window.grecaptcha)) i(s, e, n);
                else {
                  if ("undefined" == typeof window)
                    return void n(
                      new Error(
                        "RecaptchaVerifier is only supported in browser"
                      )
                    );
                  let t = as.recaptchaEnterpriseScript;
                  0 !== t.length && (t += s),
                    rs(t)
                      .then(() => {
                        i(s, e, n);
                      })
                      .catch((e) => {
                        n(e);
                      });
                }
              })
              .catch((e) => {
                n(e);
              });
          });
        });
      }
    };
  function us(e, t, i, n = !1, s = !1) {
    return _(this, null, function* () {
      const a = new ds(e);
      let r;
      if (s) r = cs;
      else
        try {
          r = yield a.verify(i);
        } catch (e) {
          r = yield a.verify(i, !0);
        }
      const o = Object.assign({}, t);
      if ("mfaSmsEnrollment" === i || "mfaSmsSignIn" === i) {
        if ("phoneEnrollmentInfo" in o) {
          const e = o.phoneEnrollmentInfo.phoneNumber,
            t = o.phoneEnrollmentInfo.recaptchaToken;
          Object.assign(o, {
            phoneEnrollmentInfo: {
              phoneNumber: e,
              recaptchaToken: t,
              captchaResponse: r,
              clientType: "CLIENT_TYPE_WEB",
              recaptchaVersion: "RECAPTCHA_ENTERPRISE",
            },
          });
        } else if ("phoneSignInInfo" in o) {
          const e = o.phoneSignInInfo.recaptchaToken;
          Object.assign(o, {
            phoneSignInInfo: {
              recaptchaToken: e,
              captchaResponse: r,
              clientType: "CLIENT_TYPE_WEB",
              recaptchaVersion: "RECAPTCHA_ENTERPRISE",
            },
          });
        }
        return o;
      }
      return (
        n
          ? Object.assign(o, { captchaResp: r })
          : Object.assign(o, { captchaResponse: r }),
        Object.assign(o, { clientType: "CLIENT_TYPE_WEB" }),
        Object.assign(o, { recaptchaVersion: "RECAPTCHA_ENTERPRISE" }),
        o
      );
    });
  }
  function ps(e, t, i, n, s) {
    return _(this, null, function* () {
      var a, r;
      if ("EMAIL_PASSWORD_PROVIDER" === s) {
        if (
          null === (a = e._getRecaptchaConfig()) || void 0 === a
            ? void 0
            : a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")
        ) {
          const s = yield us(e, t, i, "getOobCode" === i);
          return n(e, s);
        }
        return n(e, t).catch((s) =>
          _(this, null, function* () {
            if ("auth/missing-recaptcha-token" === s.code) {
              console.log(
                `${i} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`
              );
              const s = yield us(e, t, i, "getOobCode" === i);
              return n(e, s);
            }
            return Promise.reject(s);
          })
        );
      }
      if ("PHONE_PROVIDER" === s) {
        if (
          null === (r = e._getRecaptchaConfig()) || void 0 === r
            ? void 0
            : r.isProviderEnabled("PHONE_PROVIDER")
        ) {
          const s = yield us(e, t, i);
          return n(e, s).catch((s) =>
            _(this, null, function* () {
              var a;
              if (
                "AUDIT" ===
                (null === (a = e._getRecaptchaConfig()) || void 0 === a
                  ? void 0
                  : a.getProviderEnforcementState("PHONE_PROVIDER")) &&
                ("auth/missing-recaptcha-token" === s.code ||
                  "auth/invalid-app-credential" === s.code)
              ) {
                console.log(
                  `Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${i} flow.`
                );
                const s = yield us(e, t, i, !1, !0);
                return n(e, s);
              }
              return Promise.reject(s);
            })
          );
        }
        {
          const s = yield us(e, t, i, !1, !0);
          return n(e, s);
        }
      }
      return Promise.reject(s + " provider is not supported.");
    });
  }
  function gs(e, t, i) {
    const n = ns(e);
    Xi(/^https?:\/\//.test(t), n, "invalid-emulator-scheme");
    const s = !!(null == i ? void 0 : i.disableWarnings),
      a = fs(t),
      { host: r, port: o } = (function (e) {
        const t = fs(e),
          i = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
        if (!i) return { host: "", port: null };
        const n = i[2].split("@").pop() || "",
          s = /^(\[[^\]]+\])(:|$)/.exec(n);
        if (s) {
          const e = s[1];
          return { host: e, port: ms(n.substr(e.length + 1)) };
        }
        {
          const [e, t] = n.split(":");
          return { host: e, port: ms(t) };
        }
      })(t),
      l = { url: `${a}//${r}${null === o ? "" : `:${o}`}/` },
      h = Object.freeze({
        host: r,
        port: o,
        protocol: a.replace(":", ""),
        options: Object.freeze({ disableWarnings: s }),
      });
    if (!n._canInitEmulator)
      return (
        Xi(n.config.emulator && n.emulatorConfig, n, "emulator-config-failed"),
        void Xi(
          K(l, n.config.emulator) && K(h, n.emulatorConfig),
          n,
          "emulator-config-failed"
        )
      );
    (n.config.emulator = l),
      (n.emulatorConfig = h),
      (n.settings.appVerificationDisabledForTesting = !0),
      s ||
      (function () {
        function e() {
          const e = document.createElement("p"),
            t = e.style;
          (e.innerText =
            "Running in emulator mode. Do not use with production credentials."),
            (t.position = "fixed"),
            (t.width = "100%"),
            (t.backgroundColor = "#ffffff"),
            (t.border = ".1em solid #000000"),
            (t.color = "#b50000"),
            (t.bottom = "0px"),
            (t.left = "0px"),
            (t.margin = "0px"),
            (t.zIndex = "10000"),
            (t.textAlign = "center"),
            e.classList.add("firebase-emulator-warning"),
            document.body.appendChild(e);
        }
        "undefined" != typeof console &&
          "function" == typeof console.info &&
          console.info(
            "WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."
          );
        "undefined" != typeof window &&
          "undefined" != typeof document &&
          ("loading" === document.readyState
            ? window.addEventListener("DOMContentLoaded", e)
            : e());
      })();
  }
  function fs(e) {
    const t = e.indexOf(":");
    return t < 0 ? "" : e.substr(0, t + 1);
  }
  function ms(e) {
    if (!e) return null;
    const t = Number(e);
    return isNaN(t) ? null : t;
  }
  var ys = class {
    constructor(e, t) {
      (this.providerId = e), (this.signInMethod = t);
    }
    toJSON() {
      return en("not implemented");
    }
    _getIdTokenResponse(e) {
      return en("not implemented");
    }
    _linkToIdToken(e, t) {
      return en("not implemented");
    }
    _getReauthenticationResolver(e) {
      return en("not implemented");
    }
  };
  function vs(e, t) {
    return _(this, null, function* () {
      return pn(e, "POST", "/v1/accounts:signUp", t);
    });
  }
  function _s(e, t) {
    return _(this, null, function* () {
      return fn(e, "POST", "/v1/accounts:signInWithPassword", un(e, t));
    });
  }
  var Is = class e extends ys {
    constructor(e, t, i, n = null) {
      super("password", i),
        (this._email = e),
        (this._password = t),
        (this._tenantId = n);
    }
    static _fromEmailAndPassword(t, i) {
      return new e(t, i, "password");
    }
    static _fromEmailAndCode(t, i, n = null) {
      return new e(t, i, "emailLink", n);
    }
    toJSON() {
      return {
        email: this._email,
        password: this._password,
        signInMethod: this.signInMethod,
        tenantId: this._tenantId,
      };
    }
    static fromJSON(e) {
      const t = "string" == typeof e ? JSON.parse(e) : e;
      if ((null == t ? void 0 : t.email) && (null == t ? void 0 : t.password)) {
        if ("password" === t.signInMethod)
          return this._fromEmailAndPassword(t.email, t.password);
        if ("emailLink" === t.signInMethod)
          return this._fromEmailAndCode(t.email, t.password, t.tenantId);
      }
      return null;
    }
    _getIdTokenResponse(e) {
      return _(this, null, function* () {
        switch (this.signInMethod) {
          case "password":
            const t = {
              returnSecureToken: !0,
              email: this._email,
              password: this._password,
              clientType: "CLIENT_TYPE_WEB",
            };
            return ps(
              e,
              t,
              "signInWithPassword",
              _s,
              "EMAIL_PASSWORD_PROVIDER"
            );
          case "emailLink":
            return (function (e, t) {
              return _(this, null, function* () {
                return fn(
                  e,
                  "POST",
                  "/v1/accounts:signInWithEmailLink",
                  un(e, t)
                );
              });
            })(e, { email: this._email, oobCode: this._password });
          default:
            Yi(e, "internal-error");
        }
      });
    }
    _linkToIdToken(e, t) {
      return _(this, null, function* () {
        switch (this.signInMethod) {
          case "password":
            const i = {
              idToken: t,
              returnSecureToken: !0,
              email: this._email,
              password: this._password,
              clientType: "CLIENT_TYPE_WEB",
            };
            return ps(e, i, "signUpPassword", vs, "EMAIL_PASSWORD_PROVIDER");
          case "emailLink":
            return (function (e, t) {
              return _(this, null, function* () {
                return fn(
                  e,
                  "POST",
                  "/v1/accounts:signInWithEmailLink",
                  un(e, t)
                );
              });
            })(e, { idToken: t, email: this._email, oobCode: this._password });
          default:
            Yi(e, "internal-error");
        }
      });
    }
    _getReauthenticationResolver(e) {
      return this._getIdTokenResponse(e);
    }
  };
  function Ss(e, t) {
    return _(this, null, function* () {
      return fn(e, "POST", "/v1/accounts:signInWithIdp", un(e, t));
    });
  }
  var Ls = class e extends ys {
    constructor() {
      super(...arguments), (this.pendingToken = null);
    }
    static _fromParams(t) {
      const i = new e(t.providerId, t.signInMethod);
      return (
        t.idToken || t.accessToken
          ? (t.idToken && (i.idToken = t.idToken),
            t.accessToken && (i.accessToken = t.accessToken),
            t.nonce && !t.pendingToken && (i.nonce = t.nonce),
            t.pendingToken && (i.pendingToken = t.pendingToken))
          : t.oauthToken && t.oauthTokenSecret
            ? ((i.accessToken = t.oauthToken), (i.secret = t.oauthTokenSecret))
            : Yi("argument-error"),
        i
      );
    }
    toJSON() {
      return {
        idToken: this.idToken,
        accessToken: this.accessToken,
        secret: this.secret,
        nonce: this.nonce,
        pendingToken: this.pendingToken,
        providerId: this.providerId,
        signInMethod: this.signInMethod,
      };
    }
    static fromJSON(t) {
      const i = "string" == typeof t ? JSON.parse(t) : t,
        { providerId: n, signInMethod: s } = i,
        a = Ki(i, ["providerId", "signInMethod"]);
      if (!n || !s) return null;
      const r = new e(n, s);
      return (
        (r.idToken = a.idToken || void 0),
        (r.accessToken = a.accessToken || void 0),
        (r.secret = a.secret),
        (r.nonce = a.nonce),
        (r.pendingToken = a.pendingToken || null),
        r
      );
    }
    _getIdTokenResponse(e) {
      return Ss(e, this.buildRequest());
    }
    _linkToIdToken(e, t) {
      const i = this.buildRequest();
      return (i.idToken = t), Ss(e, i);
    }
    _getReauthenticationResolver(e) {
      const t = this.buildRequest();
      return (t.autoCreate = !1), Ss(e, t);
    }
    buildRequest() {
      const e = { requestUri: "http://localhost", returnSecureToken: !0 };
      if (this.pendingToken) e.pendingToken = this.pendingToken;
      else {
        const t = {};
        this.idToken && (t.id_token = this.idToken),
          this.accessToken && (t.access_token = this.accessToken),
          this.secret && (t.oauth_token_secret = this.secret),
          (t.providerId = this.providerId),
          this.nonce && !this.pendingToken && (t.nonce = this.nonce),
          (e.postBody = J(t));
      }
      return e;
    }
  };
  function As(e, t) {
    return _(this, null, function* () {
      return pn(e, "POST", "/v1/accounts:sendVerificationCode", un(e, t));
    });
  }
  var Es = { USER_NOT_FOUND: "user-not-found" };
  var Cs = class e extends ys {
    constructor(e) {
      super("phone", "phone"), (this.params = e);
    }
    static _fromVerification(t, i) {
      return new e({ verificationId: t, verificationCode: i });
    }
    static _fromTokenResponse(t, i) {
      return new e({ phoneNumber: t, temporaryProof: i });
    }
    _getIdTokenResponse(e) {
      return (function (e, t) {
        return _(this, null, function* () {
          return fn(e, "POST", "/v1/accounts:signInWithPhoneNumber", un(e, t));
        });
      })(e, this._makeVerificationRequest());
    }
    _linkToIdToken(e, t) {
      return (function (e, t) {
        return _(this, null, function* () {
          const i = yield fn(
            e,
            "POST",
            "/v1/accounts:signInWithPhoneNumber",
            un(e, t)
          );
          if (i.temporaryProof)
            throw _n(e, "account-exists-with-different-credential", i);
          return i;
        });
      })(e, Object.assign({ idToken: t }, this._makeVerificationRequest()));
    }
    _getReauthenticationResolver(e) {
      return (function (e, t) {
        return _(this, null, function* () {
          const i = Object.assign(Object.assign({}, t), {
            operation: "REAUTH",
          });
          return fn(
            e,
            "POST",
            "/v1/accounts:signInWithPhoneNumber",
            un(e, i),
            Es
          );
        });
      })(e, this._makeVerificationRequest());
    }
    _makeVerificationRequest() {
      const {
        temporaryProof: e,
        phoneNumber: t,
        verificationId: i,
        verificationCode: n,
      } = this.params;
      return e && t
        ? { temporaryProof: e, phoneNumber: t }
        : { sessionInfo: i, code: n };
    }
    toJSON() {
      const e = { providerId: this.providerId };
      return (
        this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber),
        this.params.temporaryProof &&
        (e.temporaryProof = this.params.temporaryProof),
        this.params.verificationCode &&
        (e.verificationCode = this.params.verificationCode),
        this.params.verificationId &&
        (e.verificationId = this.params.verificationId),
        e
      );
    }
    static fromJSON(t) {
      "string" == typeof t && (t = JSON.parse(t));
      const {
        verificationId: i,
        verificationCode: n,
        phoneNumber: s,
        temporaryProof: a,
      } = t;
      return n || i || s || a
        ? new e({
          verificationId: i,
          verificationCode: n,
          phoneNumber: s,
          temporaryProof: a,
        })
        : null;
    }
  };
  var ws = class e {
    constructor(e) {
      var t, i, n, s, a, r;
      const o = W(j(e)),
        l = null !== (t = o.apiKey) && void 0 !== t ? t : null,
        h = null !== (i = o.oobCode) && void 0 !== i ? i : null,
        c = (function (e) {
          switch (e) {
            case "recoverEmail":
              return "RECOVER_EMAIL";
            case "resetPassword":
              return "PASSWORD_RESET";
            case "signIn":
              return "EMAIL_SIGNIN";
            case "verifyEmail":
              return "VERIFY_EMAIL";
            case "verifyAndChangeEmail":
              return "VERIFY_AND_CHANGE_EMAIL";
            case "revertSecondFactorAddition":
              return "REVERT_SECOND_FACTOR_ADDITION";
            default:
              return null;
          }
        })(null !== (n = o.mode) && void 0 !== n ? n : null);
      Xi(l && h && c, "argument-error"),
        (this.apiKey = l),
        (this.operation = c),
        (this.code = h),
        (this.continueUrl =
          null !== (s = o.continueUrl) && void 0 !== s ? s : null),
        (this.languageCode =
          null !== (a = o.languageCode) && void 0 !== a ? a : null),
        (this.tenantId =
          null !== (r = o.tenantId) && void 0 !== r ? r : null);
    }
    static parseLink(t) {
      const i = (function (e) {
        const t = W(j(e)).link,
          i = t ? W(j(t)).deep_link_id : null,
          n = W(j(e)).deep_link_id;
        return (n ? W(j(n)).link : null) || n || i || t || e;
      })(t);
      try {
        return new e(i);
      } catch (e) {
        return null;
      }
    }
  },
    bs = class e {
      constructor() {
        this.providerId = e.PROVIDER_ID;
      }
      static credential(e, t) {
        return Is._fromEmailAndPassword(e, t);
      }
      static credentialWithLink(e, t) {
        const i = ws.parseLink(t);
        return (
          Xi(i, "argument-error"), Is._fromEmailAndCode(e, i.code, i.tenantId)
        );
      }
    };
  (bs.PROVIDER_ID = "password"),
    (bs.EMAIL_PASSWORD_SIGN_IN_METHOD = "password"),
    (bs.EMAIL_LINK_SIGN_IN_METHOD = "emailLink");
  var Ts = class {
    constructor(e) {
      (this.providerId = e),
        (this.defaultLanguageCode = null),
        (this.customParameters = {});
    }
    setDefaultLanguage(e) {
      this.defaultLanguageCode = e;
    }
    setCustomParameters(e) {
      return (this.customParameters = e), this;
    }
    getCustomParameters() {
      return this.customParameters;
    }
  },
    Ms = class extends Ts {
      constructor() {
        super(...arguments), (this.scopes = []);
      }
      addScope(e) {
        return this.scopes.includes(e) || this.scopes.push(e), this;
      }
      getScopes() {
        return [...this.scopes];
      }
    },
    Ds = class e extends Ms {
      constructor() {
        super("facebook.com");
      }
      static credential(t) {
        return Ls._fromParams({
          providerId: e.PROVIDER_ID,
          signInMethod: e.FACEBOOK_SIGN_IN_METHOD,
          accessToken: t,
        });
      }
      static credentialFromResult(t) {
        return e.credentialFromTaggedObject(t);
      }
      static credentialFromError(t) {
        return e.credentialFromTaggedObject(t.customData || {});
      }
      static credentialFromTaggedObject({ _tokenResponse: t }) {
        if (!t || !("oauthAccessToken" in t)) return null;
        if (!t.oauthAccessToken) return null;
        try {
          return e.credential(t.oauthAccessToken);
        } catch (e) {
          return null;
        }
      }
    };
  (Ds.FACEBOOK_SIGN_IN_METHOD = "facebook.com"),
    (Ds.PROVIDER_ID = "facebook.com");
  var ks = class e extends Ms {
    constructor() {
      super("google.com"), this.addScope("profile");
    }
    static credential(t, i) {
      return Ls._fromParams({
        providerId: e.PROVIDER_ID,
        signInMethod: e.GOOGLE_SIGN_IN_METHOD,
        idToken: t,
        accessToken: i,
      });
    }
    static credentialFromResult(t) {
      return e.credentialFromTaggedObject(t);
    }
    static credentialFromError(t) {
      return e.credentialFromTaggedObject(t.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: t }) {
      if (!t) return null;
      const { oauthIdToken: i, oauthAccessToken: n } = t;
      if (!i && !n) return null;
      try {
        return e.credential(i, n);
      } catch (e) {
        return null;
      }
    }
  };
  (ks.GOOGLE_SIGN_IN_METHOD = "google.com"), (ks.PROVIDER_ID = "google.com");
  var Bs = class e extends Ms {
    constructor() {
      super("github.com");
    }
    static credential(t) {
      return Ls._fromParams({
        providerId: e.PROVIDER_ID,
        signInMethod: e.GITHUB_SIGN_IN_METHOD,
        accessToken: t,
      });
    }
    static credentialFromResult(t) {
      return e.credentialFromTaggedObject(t);
    }
    static credentialFromError(t) {
      return e.credentialFromTaggedObject(t.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: t }) {
      if (!t || !("oauthAccessToken" in t)) return null;
      if (!t.oauthAccessToken) return null;
      try {
        return e.credential(t.oauthAccessToken);
      } catch (e) {
        return null;
      }
    }
  };
  (Bs.GITHUB_SIGN_IN_METHOD = "github.com"), (Bs.PROVIDER_ID = "github.com");
  var Os = class e extends Ms {
    constructor() {
      super("twitter.com");
    }
    static credential(t, i) {
      return Ls._fromParams({
        providerId: e.PROVIDER_ID,
        signInMethod: e.TWITTER_SIGN_IN_METHOD,
        oauthToken: t,
        oauthTokenSecret: i,
      });
    }
    static credentialFromResult(t) {
      return e.credentialFromTaggedObject(t);
    }
    static credentialFromError(t) {
      return e.credentialFromTaggedObject(t.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: t }) {
      if (!t) return null;
      const { oauthAccessToken: i, oauthTokenSecret: n } = t;
      if (!i || !n) return null;
      try {
        return e.credential(i, n);
      } catch (e) {
        return null;
      }
    }
  };
  (Os.TWITTER_SIGN_IN_METHOD = "twitter.com"), (Os.PROVIDER_ID = "twitter.com");
  var Ps = class e {
    constructor(e) {
      (this.user = e.user),
        (this.providerId = e.providerId),
        (this._tokenResponse = e._tokenResponse),
        (this.operationType = e.operationType);
    }
    static _fromIdTokenResponse(t, i, n, s = !1) {
      return _(this, null, function* () {
        const a = yield Rn._fromIdTokenResponse(t, n, s),
          r = Rs(n);
        return new e({
          user: a,
          providerId: r,
          _tokenResponse: n,
          operationType: i,
        });
      });
    }
    static _forOperation(t, i, n) {
      return _(this, null, function* () {
        yield t._updateTokensIfNecessary(n, !0);
        const s = Rs(n);
        return new e({
          user: t,
          providerId: s,
          _tokenResponse: n,
          operationType: i,
        });
      });
    }
  };
  function Rs(e) {
    return e.providerId ? e.providerId : "phoneNumber" in e ? "phone" : null;
  }
  var Ns = class e extends H {
    constructor(t, i, n, s) {
      var a;
      super(i.code, i.message),
        (this.operationType = n),
        (this.user = s),
        Object.setPrototypeOf(this, e.prototype),
        (this.customData = {
          appName: t.name,
          tenantId: null !== (a = t.tenantId) && void 0 !== a ? a : void 0,
          _serverResponse: i.customData._serverResponse,
          operationType: n,
        });
    }
    static _fromErrorAndOperation(t, i, n, s) {
      return new e(t, i, n, s);
    }
  };
  function xs(e, t, i, n) {
    return (
      "reauthenticate" === t
        ? i._getReauthenticationResolver(e)
        : i._getIdTokenResponse(e)
    ).catch((i) => {
      if ("auth/multi-factor-auth-required" === i.code)
        throw Ns._fromErrorAndOperation(e, i, t, n);
      throw i;
    });
  }
  function Fs(e, t) {
    return pn(e, "POST", "/v2/accounts/mfaEnrollment:start", un(e, t));
  }
  var Hs = "__sak",
    Gs = class {
      constructor(e, t) {
        (this.storageRetriever = e), (this.type = t);
      }
      _isAvailable() {
        try {
          return this.storage
            ? (this.storage.setItem(Hs, "1"),
              this.storage.removeItem(Hs),
              Promise.resolve(!0))
            : Promise.resolve(!1);
        } catch (e) {
          return Promise.resolve(!1);
        }
      }
      _set(e, t) {
        return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve();
      }
      _get(e) {
        const t = this.storage.getItem(e);
        return Promise.resolve(t ? JSON.parse(t) : null);
      }
      _remove(e) {
        return this.storage.removeItem(e), Promise.resolve();
      }
      get storage() {
        return this.storageRetriever();
      }
    },
    Us = class e extends Gs {
      constructor() {
        super(() => window.localStorage, "LOCAL"),
          (this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
          (this.listeners = {}),
          (this.localCache = {}),
          (this.pollTimer = null),
          (this.fallbackToPolling = Zn()),
          (this._shouldAllowMigration = !0);
      }
      forAllChangedKeys(e) {
        for (const t of Object.keys(this.listeners)) {
          const i = this.storage.getItem(t),
            n = this.localCache[t];
          i !== n && e(t, n, i);
        }
      }
      onStorageEvent(e, t = !1) {
        if (!e.key)
          return void this.forAllChangedKeys((e, t, i) => {
            this.notifyListeners(e, i);
          });
        const i = e.key;
        t ? this.detachListener() : this.stopPolling();
        const n = () => {
          const e = this.storage.getItem(i);
          (t || this.localCache[i] !== e) && this.notifyListeners(i, e);
        },
          s = this.storage.getItem(i);
        $n() && s !== e.newValue && e.newValue !== e.oldValue
          ? setTimeout(n, 10)
          : n();
      }
      notifyListeners(e, t) {
        this.localCache[e] = t;
        const i = this.listeners[e];
        if (i) for (const e of Array.from(i)) e(t ? JSON.parse(t) : t);
      }
      startPolling() {
        this.stopPolling(),
          (this.pollTimer = setInterval(() => {
            this.forAllChangedKeys((e, t, i) => {
              this.onStorageEvent(
                new StorageEvent("storage", {
                  key: e,
                  oldValue: t,
                  newValue: i,
                }),
                !0
              );
            });
          }, 1e3));
      }
      stopPolling() {
        this.pollTimer &&
          (clearInterval(this.pollTimer), (this.pollTimer = null));
      }
      attachListener() {
        window.addEventListener("storage", this.boundEventHandler);
      }
      detachListener() {
        window.removeEventListener("storage", this.boundEventHandler);
      }
      _addListener(e, t) {
        0 === Object.keys(this.listeners).length &&
          (this.fallbackToPolling
            ? this.startPolling()
            : this.attachListener()),
          this.listeners[e] ||
          ((this.listeners[e] = new Set()),
            (this.localCache[e] = this.storage.getItem(e))),
          this.listeners[e].add(t);
      }
      _removeListener(e, t) {
        this.listeners[e] &&
          (this.listeners[e].delete(t),
            0 === this.listeners[e].size && delete this.listeners[e]),
          0 === Object.keys(this.listeners).length &&
          (this.detachListener(), this.stopPolling());
      }
      _set(t, i) {
        return _(this, null, function* () {
          yield v(e.prototype, this, "_set").call(this, t, i),
            (this.localCache[t] = JSON.stringify(i));
        });
      }
      _get(t) {
        return _(this, null, function* () {
          const i = yield v(e.prototype, this, "_get").call(this, t);
          return (this.localCache[t] = JSON.stringify(i)), i;
        });
      }
      _remove(t) {
        return _(this, null, function* () {
          yield v(e.prototype, this, "_remove").call(this, t),
            delete this.localCache[t];
        });
      }
    };
  Us.type = "LOCAL";
  var Ks = Us;
  var Vs = class extends Gs {
    constructor() {
      super(() => window.sessionStorage, "SESSION");
    }
    _addListener(e, t) { }
    _removeListener(e, t) { }
  };
  Vs.type = "SESSION";
  var Js = Vs;
  var Ws = class e {
    constructor(e) {
      (this.eventTarget = e),
        (this.handlersMap = {}),
        (this.boundEventHandler = this.handleEvent.bind(this));
    }
    static _getInstance(t) {
      const i = this.receivers.find((e) => e.isListeningto(t));
      if (i) return i;
      const n = new e(t);
      return this.receivers.push(n), n;
    }
    isListeningto(e) {
      return this.eventTarget === e;
    }
    handleEvent(e) {
      return _(this, null, function* () {
        const t = e,
          { eventId: i, eventType: n, data: s } = t.data,
          a = this.handlersMap[n];
        if (!(null == a ? void 0 : a.size)) return;
        t.ports[0].postMessage({ status: "ack", eventId: i, eventType: n });
        const r = Array.from(a).map((e) =>
          _(this, null, function* () {
            return e(t.origin, s);
          })
        ),
          o = yield (function (e) {
            return Promise.all(
              e.map((e) =>
                _(this, null, function* () {
                  try {
                    return { fulfilled: !0, value: yield e };
                  } catch (e) {
                    return { fulfilled: !1, reason: e };
                  }
                })
              )
            );
          })(r);
        t.ports[0].postMessage({
          status: "done",
          eventId: i,
          eventType: n,
          response: o,
        });
      });
    }
    _subscribe(e, t) {
      0 === Object.keys(this.handlersMap).length &&
        this.eventTarget.addEventListener("message", this.boundEventHandler),
        this.handlersMap[e] || (this.handlersMap[e] = new Set()),
        this.handlersMap[e].add(t);
    }
    _unsubscribe(e, t) {
      this.handlersMap[e] && t && this.handlersMap[e].delete(t),
        (t && 0 !== this.handlersMap[e].size) || delete this.handlersMap[e],
        0 === Object.keys(this.handlersMap).length &&
        this.eventTarget.removeEventListener(
          "message",
          this.boundEventHandler
        );
    }
  };
  function js(e = "", t = 10) {
    let i = "";
    for (let e = 0; e < t; e++) i += Math.floor(10 * Math.random());
    return e + i;
  }
  Ws.receivers = [];
  var qs = class {
    constructor(e) {
      (this.target = e), (this.handlers = new Set());
    }
    removeMessageHandler(e) {
      e.messageChannel &&
        (e.messageChannel.port1.removeEventListener("message", e.onMessage),
          e.messageChannel.port1.close()),
        this.handlers.delete(e);
    }
    _send(e, t, i = 50) {
      return _(this, null, function* () {
        const n =
          "undefined" != typeof MessageChannel ? new MessageChannel() : null;
        if (!n) throw new Error("connection_unavailable");
        let s, a;
        return new Promise((r, o) => {
          const l = js("", 20);
          n.port1.start();
          const h = setTimeout(() => {
            o(new Error("unsupported_event"));
          }, i);
          (a = {
            messageChannel: n,
            onMessage(e) {
              const t = e;
              if (t.data.eventId === l)
                switch (t.data.status) {
                  case "ack":
                    clearTimeout(h),
                      (s = setTimeout(() => {
                        o(new Error("timeout"));
                      }, 3e3));
                    break;
                  case "done":
                    clearTimeout(s), r(t.data.response);
                    break;
                  default:
                    clearTimeout(h),
                      clearTimeout(s),
                      o(new Error("invalid_response"));
                }
            },
          }),
            this.handlers.add(a),
            n.port1.addEventListener("message", a.onMessage),
            this.target.postMessage({ eventType: e, eventId: l, data: t }, [
              n.port2,
            ]);
        }).finally(() => {
          a && this.removeMessageHandler(a);
        });
      });
    }
  };
  function Ys() {
    return window;
  }
  function zs() {
    return (
      void 0 !== Ys().WorkerGlobalScope &&
      "function" == typeof Ys().importScripts
    );
  }
  var Qs = "firebaseLocalStorageDb",
    $s = "firebaseLocalStorage",
    Zs = "fbase_key",
    Xs = class {
      constructor(e) {
        this.request = e;
      }
      toPromise() {
        return new Promise((e, t) => {
          this.request.addEventListener("success", () => {
            e(this.request.result);
          }),
            this.request.addEventListener("error", () => {
              t(this.request.error);
            });
        });
      }
    };
  function ea(e, t) {
    return e.transaction([$s], t ? "readwrite" : "readonly").objectStore($s);
  }
  function ta() {
    const e = indexedDB.open(Qs, 1);
    return new Promise((t, i) => {
      e.addEventListener("error", () => {
        i(e.error);
      }),
        e.addEventListener("upgradeneeded", () => {
          const t = e.result;
          try {
            t.createObjectStore($s, { keyPath: Zs });
          } catch (e) {
            i(e);
          }
        }),
        e.addEventListener("success", () =>
          _(this, null, function* () {
            const i = e.result;
            i.objectStoreNames.contains($s)
              ? t(i)
              : (i.close(),
                yield (function () {
                  const e = indexedDB.deleteDatabase(Qs);
                  return new Xs(e).toPromise();
                })(),
                t(yield ta()));
          })
        );
    });
  }
  function ia(e, t, i) {
    return _(this, null, function* () {
      const n = ea(e, !0).put({ [Zs]: t, value: i });
      return new Xs(n).toPromise();
    });
  }
  function na(e, t) {
    const i = ea(e, !0).delete(t);
    return new Xs(i).toPromise();
  }
  var sa = class {
    constructor() {
      (this.type = "LOCAL"),
        (this._shouldAllowMigration = !0),
        (this.listeners = {}),
        (this.localCache = {}),
        (this.pollTimer = null),
        (this.pendingWrites = 0),
        (this.receiver = null),
        (this.sender = null),
        (this.serviceWorkerReceiverAvailable = !1),
        (this.activeServiceWorker = null),
        (this._workerInitializationPromise =
          this.initializeServiceWorkerMessaging().then(
            () => { },
            () => { }
          ));
    }
    _openDb() {
      return _(this, null, function* () {
        return this.db || (this.db = yield ta()), this.db;
      });
    }
    _withRetries(e) {
      return _(this, null, function* () {
        let t = 0;
        for (; ;)
          try {
            const t = yield this._openDb();
            return yield e(t);
          } catch (e) {
            if (t++ > 3) throw e;
            this.db && (this.db.close(), (this.db = void 0));
          }
      });
    }
    initializeServiceWorkerMessaging() {
      return _(this, null, function* () {
        return zs() ? this.initializeReceiver() : this.initializeSender();
      });
    }
    initializeReceiver() {
      return _(this, null, function* () {
        (this.receiver = Ws._getInstance(zs() ? self : null)),
          this.receiver._subscribe("keyChanged", (e, t) =>
            _(this, null, function* () {
              return { keyProcessed: (yield this._poll()).includes(t.key) };
            })
          ),
          this.receiver._subscribe("ping", (e, t) =>
            _(this, null, function* () {
              return ["keyChanged"];
            })
          );
      });
    }
    initializeSender() {
      return _(this, null, function* () {
        var e, t;
        if (
          ((this.activeServiceWorker = yield (function () {
            return _(this, null, function* () {
              if (
                !(null === navigator || void 0 === navigator
                  ? void 0
                  : navigator.serviceWorker)
              )
                return null;
              try {
                return (yield navigator.serviceWorker.ready).active;
              } catch (e) {
                return null;
              }
            });
          })()),
            !this.activeServiceWorker)
        )
          return;
        this.sender = new qs(this.activeServiceWorker);
        const i = yield this.sender._send("ping", {}, 800);
        i &&
          (null === (e = i[0]) || void 0 === e ? void 0 : e.fulfilled) &&
          (null === (t = i[0]) || void 0 === t
            ? void 0
            : t.value.includes("keyChanged")) &&
          (this.serviceWorkerReceiverAvailable = !0);
      });
    }
    notifyServiceWorker(e) {
      return _(this, null, function* () {
        var t;
        if (
          this.sender &&
          this.activeServiceWorker &&
          ((null ===
            (t =
              null === navigator || void 0 === navigator
                ? void 0
                : navigator.serviceWorker) || void 0 === t
            ? void 0
            : t.controller) || null) === this.activeServiceWorker
        )
          try {
            yield this.sender._send(
              "keyChanged",
              { key: e },
              this.serviceWorkerReceiverAvailable ? 800 : 50
            );
          } catch (t) { }
      });
    }
    _isAvailable() {
      return _(this, null, function* () {
        try {
          if (!indexedDB) return !1;
          const e = yield ta();
          return yield ia(e, Hs, "1"), yield na(e, Hs), !0;
        } catch (e) { }
        return !1;
      });
    }
    _withPendingWrite(e) {
      return _(this, null, function* () {
        this.pendingWrites++;
        try {
          yield e();
        } finally {
          this.pendingWrites--;
        }
      });
    }
    _set(e, t) {
      return _(this, null, function* () {
        return this._withPendingWrite(() =>
          _(this, null, function* () {
            return (
              yield this._withRetries((i) => ia(i, e, t)),
              (this.localCache[e] = t),
              this.notifyServiceWorker(e)
            );
          })
        );
      });
    }
    _get(e) {
      return _(this, null, function* () {
        const t = yield this._withRetries((t) =>
          (function (e, t) {
            return _(this, null, function* () {
              const i = ea(e, !1).get(t),
                n = yield new Xs(i).toPromise();
              return void 0 === n ? null : n.value;
            });
          })(t, e)
        );
        return (this.localCache[e] = t), t;
      });
    }
    _remove(e) {
      return _(this, null, function* () {
        return this._withPendingWrite(() =>
          _(this, null, function* () {
            return (
              yield this._withRetries((t) => na(t, e)),
              delete this.localCache[e],
              this.notifyServiceWorker(e)
            );
          })
        );
      });
    }
    _poll() {
      return _(this, null, function* () {
        const e = yield this._withRetries((e) => {
          const t = ea(e, !1).getAll();
          return new Xs(t).toPromise();
        });
        if (!e) return [];
        if (0 !== this.pendingWrites) return [];
        const t = [],
          i = new Set();
        if (0 !== e.length)
          for (const { fbase_key: n, value: s } of e)
            i.add(n),
              JSON.stringify(this.localCache[n]) !== JSON.stringify(s) &&
              (this.notifyListeners(n, s), t.push(n));
        for (const e of Object.keys(this.localCache))
          this.localCache[e] &&
            !i.has(e) &&
            (this.notifyListeners(e, null), t.push(e));
        return t;
      });
    }
    notifyListeners(e, t) {
      this.localCache[e] = t;
      const i = this.listeners[e];
      if (i) for (const e of Array.from(i)) e(t);
    }
    startPolling() {
      this.stopPolling(),
        (this.pollTimer = setInterval(
          () =>
            _(this, null, function* () {
              return this._poll();
            }),
          800
        ));
    }
    stopPolling() {
      this.pollTimer &&
        (clearInterval(this.pollTimer), (this.pollTimer = null));
    }
    _addListener(e, t) {
      0 === Object.keys(this.listeners).length && this.startPolling(),
        this.listeners[e] || ((this.listeners[e] = new Set()), this._get(e)),
        this.listeners[e].add(t);
    }
    _removeListener(e, t) {
      this.listeners[e] &&
        (this.listeners[e].delete(t),
          0 === this.listeners[e].size && delete this.listeners[e]),
        0 === Object.keys(this.listeners).length && this.stopPolling();
    }
  };
  sa.type = "LOCAL";
  var aa = sa;
  function ra(e, t) {
    return pn(e, "POST", "/v2/accounts/mfaSignIn:start", un(e, t));
  }
  os("rcb"), new rn(3e4, 6e4);
  var oa = "recaptcha";
  function la(e, t, i) {
    return _(this, null, function* () {
      var n;
      if (!e._getRecaptchaConfig())
        try {
          yield (function (e) {
            return _(this, null, function* () {
              const t = ns(e),
                i = yield Ln(t, {
                  clientType: "CLIENT_TYPE_WEB",
                  version: "RECAPTCHA_ENTERPRISE",
                }),
                n = new Sn(i);
              null == t.tenantId
                ? (t._agentRecaptchaConfig = n)
                : (t._tenantRecaptchaConfigs[t.tenantId] = n),
                n.isAnyProviderEnabled() && new ds(t).verify();
            });
          })(e);
        } catch (e) {
          console.log(
            "Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification."
          );
        }
      try {
        let s;
        if (
          ((s = "string" == typeof t ? { phoneNumber: t } : t), "session" in s)
        ) {
          const t = s.session;
          if ("phoneNumber" in s) {
            Xi("enroll" === t.type, e, "internal-error");
            const n = {
              idToken: t.credential,
              phoneEnrollmentInfo: {
                phoneNumber: s.phoneNumber,
                clientType: "CLIENT_TYPE_WEB",
              },
            },
              a = ps(
                e,
                n,
                "mfaSmsEnrollment",
                (e, t) =>
                  _(this, null, function* () {
                    if (t.phoneEnrollmentInfo.captchaResponse === cs) {
                      Xi(
                        (null == i ? void 0 : i.type) === oa,
                        e,
                        "argument-error"
                      );
                      const n = yield ha(e, t, i);
                      return Fs(e, n);
                    }
                    return Fs(e, t);
                  }),
                "PHONE_PROVIDER"
              );
            return (yield a.catch((e) => Promise.reject(e))).phoneSessionInfo
              .sessionInfo;
          }
          {
            Xi("signin" === t.type, e, "internal-error");
            const a =
              (null === (n = s.multiFactorHint) || void 0 === n
                ? void 0
                : n.uid) || s.multiFactorUid;
            Xi(a, e, "missing-multi-factor-info");
            const r = {
              mfaPendingCredential: t.credential,
              mfaEnrollmentId: a,
              phoneSignInInfo: { clientType: "CLIENT_TYPE_WEB" },
            },
              o = ps(
                e,
                r,
                "mfaSmsSignIn",
                (e, t) =>
                  _(this, null, function* () {
                    if (t.phoneSignInInfo.captchaResponse === cs) {
                      Xi(
                        (null == i ? void 0 : i.type) === oa,
                        e,
                        "argument-error"
                      );
                      const n = yield ha(e, t, i);
                      return ra(e, n);
                    }
                    return ra(e, t);
                  }),
                "PHONE_PROVIDER"
              );
            return (yield o.catch((e) => Promise.reject(e))).phoneResponseInfo
              .sessionInfo;
          }
        }
        {
          const t = {
            phoneNumber: s.phoneNumber,
            clientType: "CLIENT_TYPE_WEB",
          },
            n = ps(
              e,
              t,
              "sendVerificationCode",
              (e, t) =>
                _(this, null, function* () {
                  if (t.captchaResponse === cs) {
                    Xi(
                      (null == i ? void 0 : i.type) === oa,
                      e,
                      "argument-error"
                    );
                    const n = yield ha(e, t, i);
                    return As(e, n);
                  }
                  return As(e, t);
                }),
              "PHONE_PROVIDER"
            );
          return (yield n.catch((e) => Promise.reject(e))).sessionInfo;
        }
      } finally {
        null == i || i._reset();
      }
    });
  }
  function ha(e, t, i) {
    return _(this, null, function* () {
      Xi(i.type === oa, e, "argument-error");
      const n = yield i.verify();
      Xi("string" == typeof n, e, "argument-error");
      const s = Object.assign({}, t);
      if ("phoneEnrollmentInfo" in s) {
        const e = s.phoneEnrollmentInfo.phoneNumber,
          t = s.phoneEnrollmentInfo.captchaResponse,
          i = s.phoneEnrollmentInfo.clientType,
          a = s.phoneEnrollmentInfo.recaptchaVersion;
        return (
          Object.assign(s, {
            phoneEnrollmentInfo: {
              phoneNumber: e,
              recaptchaToken: n,
              captchaResponse: t,
              clientType: i,
              recaptchaVersion: a,
            },
          }),
          s
        );
      }
      if ("phoneSignInInfo" in s) {
        const e = s.phoneSignInInfo.captchaResponse,
          t = s.phoneSignInInfo.clientType,
          i = s.phoneSignInInfo.recaptchaVersion;
        return (
          Object.assign(s, {
            phoneSignInInfo: {
              recaptchaToken: n,
              captchaResponse: e,
              clientType: t,
              recaptchaVersion: i,
            },
          }),
          s
        );
      }
      return Object.assign(s, { recaptchaToken: n }), s;
    });
  }
  var ca = class e {
    constructor(t) {
      (this.providerId = e.PROVIDER_ID), (this.auth = ns(t));
    }
    verifyPhoneNumber(e, t) {
      return la(this.auth, e, Q(t));
    }
    static credential(e, t) {
      return Cs._fromVerification(e, t);
    }
    static credentialFromResult(t) {
      const i = t;
      return e.credentialFromTaggedObject(i);
    }
    static credentialFromError(t) {
      return e.credentialFromTaggedObject(t.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
      if (!e) return null;
      const { phoneNumber: t, temporaryProof: i } = e;
      return t && i ? Cs._fromTokenResponse(t, i) : null;
    }
  };
  (ca.PROVIDER_ID = "phone"), (ca.PHONE_SIGN_IN_METHOD = "phone");
  var da = class extends ys {
    constructor(e) {
      super("custom", "custom"), (this.params = e);
    }
    _getIdTokenResponse(e) {
      return Ss(e, this._buildIdpRequest());
    }
    _linkToIdToken(e, t) {
      return Ss(e, this._buildIdpRequest(t));
    }
    _getReauthenticationResolver(e) {
      return Ss(e, this._buildIdpRequest());
    }
    _buildIdpRequest(e) {
      const t = {
        requestUri: this.params.requestUri,
        sessionId: this.params.sessionId,
        postBody: this.params.postBody,
        tenantId: this.params.tenantId,
        pendingToken: this.params.pendingToken,
        returnSecureToken: !0,
        returnIdpCredential: !0,
      };
      return e && (t.idToken = e), t;
    }
  };
  function ua(e) {
    return (function (e, t, i = !1) {
      return _(this, null, function* () {
        if (ct(e.app)) return Promise.reject($i(e));
        const n = "signIn",
          s = yield xs(e, n, t),
          a = yield Ps._fromIdTokenResponse(e, n, s);
        return i || (yield e._updateCurrentUser(a.user)), a;
      });
    })(e.auth, new da(e), e.bypassAuthState);
  }
  function pa(e) {
    const { auth: t, user: i } = e;
    return (
      Xi(i, t, "internal-error"),
      (function (e, t, i = !1) {
        return _(this, null, function* () {
          const { auth: n } = e;
          if (ct(n.app)) return Promise.reject($i(n));
          const s = "reauthenticate";
          try {
            const a = yield Tn(e, xs(n, s, t, e), i);
            Xi(a.idToken, n, "internal-error");
            const r = wn(a.idToken);
            Xi(r, n, "internal-error");
            const { sub: o } = r;
            return (
              Xi(e.uid === o, n, "user-mismatch"), Ps._forOperation(e, s, a)
            );
          } catch (e) {
            throw (
              ("auth/user-not-found" === (null == e ? void 0 : e.code) &&
                Yi(n, "user-mismatch"),
                e)
            );
          }
        });
      })(i, new da(e), e.bypassAuthState)
    );
  }
  function ga(e) {
    return _(this, null, function* () {
      const { auth: t, user: i } = e;
      return (
        Xi(i, t, "internal-error"),
        (function (e, t, i = !1) {
          return _(this, null, function* () {
            const n = yield Tn(
              e,
              t._linkToIdToken(e.auth, yield e.getIdToken()),
              i
            );
            return Ps._forOperation(e, "link", n);
          });
        })(i, new da(e), e.bypassAuthState)
      );
    });
  }
  var fa = class {
    constructor(e, t, i, n, s = !1) {
      (this.auth = e),
        (this.resolver = i),
        (this.user = n),
        (this.bypassAuthState = s),
        (this.pendingPromise = null),
        (this.eventManager = null),
        (this.filter = Array.isArray(t) ? t : [t]);
    }
    execute() {
      return new Promise((e, t) =>
        _(this, null, function* () {
          this.pendingPromise = { resolve: e, reject: t };
          try {
            (this.eventManager = yield this.resolver._initialize(this.auth)),
              yield this.onExecution(),
              this.eventManager.registerConsumer(this);
          } catch (e) {
            this.reject(e);
          }
        })
      );
    }
    onAuthEvent(e) {
      return _(this, null, function* () {
        const {
          urlResponse: t,
          sessionId: i,
          postBody: n,
          tenantId: s,
          error: a,
          type: r,
        } = e;
        if (a) return void this.reject(a);
        const o = {
          auth: this.auth,
          requestUri: t,
          sessionId: i,
          tenantId: s || void 0,
          postBody: n || void 0,
          user: this.user,
          bypassAuthState: this.bypassAuthState,
        };
        try {
          this.resolve(yield this.getIdpTask(r)(o));
        } catch (e) {
          this.reject(e);
        }
      });
    }
    onError(e) {
      this.reject(e);
    }
    getIdpTask(e) {
      switch (e) {
        case "signInViaPopup":
        case "signInViaRedirect":
          return ua;
        case "linkViaPopup":
        case "linkViaRedirect":
          return ga;
        case "reauthViaPopup":
        case "reauthViaRedirect":
          return pa;
        default:
          Yi(this.auth, "internal-error");
      }
    }
    resolve(e) {
      tn(this.pendingPromise, "Pending promise was never set"),
        this.pendingPromise.resolve(e),
        this.unregisterAndCleanUp();
    }
    reject(e) {
      tn(this.pendingPromise, "Pending promise was never set"),
        this.pendingPromise.reject(e),
        this.unregisterAndCleanUp();
    }
    unregisterAndCleanUp() {
      this.eventManager && this.eventManager.unregisterConsumer(this),
        (this.pendingPromise = null),
        this.cleanUp();
    }
  },
    ma = new rn(2e3, 1e4);
  (class e extends fa {
    constructor(t, i, n, s, a) {
      super(t, i, s, a),
        (this.provider = n),
        (this.authWindow = null),
        (this.pollId = null),
        e.currentPopupAction && e.currentPopupAction.cancel(),
        (e.currentPopupAction = this);
    }
    executeNotNull() {
      return _(this, null, function* () {
        const e = yield this.execute();
        return Xi(e, this.auth, "internal-error"), e;
      });
    }
    onExecution() {
      return _(this, null, function* () {
        tn(1 === this.filter.length, "Popup operations only handle one event");
        const e = js();
        (this.authWindow = yield this.resolver._openPopup(
          this.auth,
          this.provider,
          this.filter[0],
          e
        )),
          (this.authWindow.associatedEvent = e),
          this.resolver._originValidation(this.auth).catch((e) => {
            this.reject(e);
          }),
          this.resolver._isIframeWebStorageSupported(this.auth, (e) => {
            e || this.reject(zi(this.auth, "web-storage-unsupported"));
          }),
          this.pollUserCancellation();
      });
    }
    get eventId() {
      var e;
      return (
        (null === (e = this.authWindow) || void 0 === e
          ? void 0
          : e.associatedEvent) || null
      );
    }
    cancel() {
      this.reject(zi(this.auth, "cancelled-popup-request"));
    }
    cleanUp() {
      this.authWindow && this.authWindow.close(),
        this.pollId && window.clearTimeout(this.pollId),
        (this.authWindow = null),
        (this.pollId = null),
        (e.currentPopupAction = null);
    }
    pollUserCancellation() {
      const e = () => {
        var t, i;
        (
          null ===
            (i =
              null === (t = this.authWindow) || void 0 === t
                ? void 0
                : t.window) || void 0 === i
            ? void 0
            : i.closed
        )
          ? (this.pollId = window.setTimeout(() => {
            (this.pollId = null),
              this.reject(zi(this.auth, "popup-closed-by-user"));
          }, 8e3))
          : (this.pollId = window.setTimeout(e, ma.get()));
      };
      e();
    }
  }.currentPopupAction = null);
  var ya = "pendingRedirect",
    va = new Map(),
    _a = class e extends fa {
      constructor(e, t, i = !1) {
        super(
          e,
          [
            "signInViaRedirect",
            "linkViaRedirect",
            "reauthViaRedirect",
            "unknown",
          ],
          t,
          void 0,
          i
        ),
          (this.eventId = null);
      }
      execute() {
        return _(this, null, function* () {
          let t = va.get(this.auth._key());
          if (!t) {
            try {
              const i = (yield (function (e, t) {
                return _(this, null, function* () {
                  const i = (function (e) {
                    return Gn(ya, e.config.apiKey, e.name);
                  })(t),
                    n = (function (e) {
                      return xn(e._redirectPersistence);
                    })(e);
                  if (!(yield n._isAvailable())) return !1;
                  const s = "true" === (yield n._get(i));
                  return yield n._remove(i), s;
                });
              })(this.resolver, this.auth))
                ? yield v(e.prototype, this, "execute").call(this)
                : null;
              t = () => Promise.resolve(i);
            } catch (e) {
              t = () => Promise.reject(e);
            }
            va.set(this.auth._key(), t);
          }
          return (
            this.bypassAuthState ||
            va.set(this.auth._key(), () => Promise.resolve(null)),
            t()
          );
        });
      }
      onAuthEvent(t) {
        return _(this, null, function* () {
          if ("signInViaRedirect" === t.type)
            return v(e.prototype, this, "onAuthEvent").call(this, t);
          if ("unknown" !== t.type) {
            if (t.eventId) {
              const i = yield this.auth._redirectUserForId(t.eventId);
              if (i)
                return (
                  (this.user = i),
                  v(e.prototype, this, "onAuthEvent").call(this, t)
                );
              this.resolve(null);
            }
          } else this.resolve(null);
        });
      }
      onExecution() {
        return _(this, null, function* () { });
      }
      cleanUp() { }
    };
  function Ia(e, t) {
    va.set(e._key(), t);
  }
  function Sa(e, t, i = !1) {
    return _(this, null, function* () {
      if (ct(e.app)) return Promise.reject($i(e));
      const n = ns(e),
        s = (function (e, t) {
          return t
            ? xn(t)
            : (Xi(e._popupRedirectResolver, e, "argument-error"),
              e._popupRedirectResolver);
        })(n, t),
        a = new _a(n, s, i),
        r = yield a.execute();
      return (
        r &&
        !i &&
        (delete r.user._redirectEventId,
          yield n._persistUserIfCurrent(r.user),
          yield n._setRedirectUser(null, t)),
        r
      );
    });
  }
  var La = class {
    constructor(e) {
      (this.auth = e),
        (this.cachedEventUids = new Set()),
        (this.consumers = new Set()),
        (this.queuedRedirectEvent = null),
        (this.hasHandledPotentialRedirect = !1),
        (this.lastProcessedEventTime = Date.now());
    }
    registerConsumer(e) {
      this.consumers.add(e),
        this.queuedRedirectEvent &&
        this.isEventForConsumer(this.queuedRedirectEvent, e) &&
        (this.sendToConsumer(this.queuedRedirectEvent, e),
          this.saveEventToCache(this.queuedRedirectEvent),
          (this.queuedRedirectEvent = null));
    }
    unregisterConsumer(e) {
      this.consumers.delete(e);
    }
    onEvent(e) {
      if (this.hasEventBeenHandled(e)) return !1;
      let t = !1;
      return (
        this.consumers.forEach((i) => {
          this.isEventForConsumer(e, i) &&
            ((t = !0), this.sendToConsumer(e, i), this.saveEventToCache(e));
        }),
        this.hasHandledPotentialRedirect ||
        !(function (e) {
          switch (e.type) {
            case "signInViaRedirect":
            case "linkViaRedirect":
            case "reauthViaRedirect":
              return !0;
            case "unknown":
              return Ea(e);
            default:
              return !1;
          }
        })(e) ||
        ((this.hasHandledPotentialRedirect = !0),
          t || ((this.queuedRedirectEvent = e), (t = !0))),
        t
      );
    }
    sendToConsumer(e, t) {
      var i;
      if (e.error && !Ea(e)) {
        const n =
          (null === (i = e.error.code) || void 0 === i
            ? void 0
            : i.split("auth/")[1]) || "internal-error";
        t.onError(zi(this.auth, n));
      } else t.onAuthEvent(e);
    }
    isEventForConsumer(e, t) {
      const i = null === t.eventId || (!!e.eventId && e.eventId === t.eventId);
      return t.filter.includes(e.type) && i;
    }
    hasEventBeenHandled(e) {
      return (
        Date.now() - this.lastProcessedEventTime >= 6e5 &&
        this.cachedEventUids.clear(),
        this.cachedEventUids.has(Aa(e))
      );
    }
    saveEventToCache(e) {
      this.cachedEventUids.add(Aa(e)),
        (this.lastProcessedEventTime = Date.now());
    }
  };
  function Aa(e) {
    return [e.type, e.eventId, e.sessionId, e.tenantId]
      .filter((e) => e)
      .join("-");
  }
  function Ea({ type: e, error: t }) {
    return (
      "unknown" === e && "auth/no-auth-event" === (null == t ? void 0 : t.code)
    );
  }
  var Ca = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    wa = /^https?/;
  function ba(e) {
    return _(this, null, function* () {
      if (e.config.emulator) return;
      const { authorizedDomains: t } = yield (function (e) {
        return _(this, arguments, function* (e, t = {}) {
          return pn(e, "GET", "/v1/projects", t);
        });
      })(e);
      for (const e of t)
        try {
          if (Ta(e)) return;
        } catch (e) { }
      Yi(e, "unauthorized-domain");
    });
  }
  function Ta(e) {
    const t = nn(),
      { protocol: i, hostname: n } = new URL(t);
    if (e.startsWith("chrome-extension://")) {
      const s = new URL(e);
      return "" === s.hostname && "" === n
        ? "chrome-extension:" === i &&
        e.replace("chrome-extension://", "") ===
        t.replace("chrome-extension://", "")
        : "chrome-extension:" === i && s.hostname === n;
    }
    if (!wa.test(i)) return !1;
    if (Ca.test(e)) return n === e;
    const s = e.replace(/\./g, "\\.");
    return new RegExp("^(.+\\." + s + "|" + s + ")$", "i").test(n);
  }
  var Ma = new rn(3e4, 6e4);
  function Da() {
    const e = Ys().___jsl;
    if (null == e ? void 0 : e.H)
      for (const t of Object.keys(e.H))
        if (
          ((e.H[t].r = e.H[t].r || []),
            (e.H[t].L = e.H[t].L || []),
            (e.H[t].r = [...e.H[t].L]),
            e.CP)
        )
          for (let t = 0; t < e.CP.length; t++) e.CP[t] = null;
  }
  function ka(e) {
    return new Promise((t, i) => {
      var n, s, a;
      function r() {
        Da(),
          gapi.load("gapi.iframes", {
            callback: () => {
              t(gapi.iframes.getContext());
            },
            ontimeout: () => {
              Da(), i(zi(e, "network-request-failed"));
            },
            timeout: Ma.get(),
          });
      }
      if (
        null ===
          (s = null === (n = Ys().gapi) || void 0 === n ? void 0 : n.iframes) ||
          void 0 === s
          ? void 0
          : s.Iframe
      )
        t(gapi.iframes.getContext());
      else {
        if (!(null === (a = Ys().gapi) || void 0 === a ? void 0 : a.load)) {
          const t = os("iframefcb");
          return (
            (Ys()[t] = () => {
              gapi.load ? r() : i(zi(e, "network-request-failed"));
            }),
            rs(`${as.gapiScript}?onload=${t}`).catch((e) => i(e))
          );
        }
        r();
      }
    }).catch((e) => {
      throw ((Ba = null), e);
    });
  }
  var Ba = null;
  var Oa = new rn(5e3, 15e3),
    Pa = {
      style: {
        position: "absolute",
        top: "-100px",
        width: "1px",
        height: "1px",
      },
      "aria-hidden": "true",
      tabindex: "-1",
    },
    Ra = new Map([
      ["identitytoolkit.googleapis.com", "p"],
      ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
      ["test-identitytoolkit.sandbox.googleapis.com", "t"],
    ]);
  function Na(e) {
    const t = e.config;
    Xi(t.authDomain, e, "auth-domain-config-required");
    const i = t.emulator
      ? on(t, "emulator/auth/iframe")
      : `https://${e.config.authDomain}/__/auth/iframe`,
      n = { apiKey: t.apiKey, appName: e.name, v: pt },
      s = Ra.get(e.config.apiHost);
    s && (n.eid = s);
    const a = e._getFrameworks();
    return a.length && (n.fw = a.join(",")), `${i}?${J(n).slice(1)}`;
  }
  function xa(e) {
    return _(this, null, function* () {
      const t = yield (function (e) {
        return (Ba = Ba || ka(e));
      })(e),
        i = Ys().gapi;
      return (
        Xi(i, e, "internal-error"),
        t.open(
          {
            where: document.body,
            url: Na(e),
            messageHandlersFilter: i.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
            attributes: Pa,
            dontclear: !0,
          },
          (t) =>
            new Promise((i, n) =>
              _(this, null, function* () {
                yield t.restyle({ setHideOnLeave: !1 });
                const s = zi(e, "network-request-failed"),
                  a = Ys().setTimeout(() => {
                    n(s);
                  }, Oa.get());
                function r() {
                  Ys().clearTimeout(a), i(t);
                }
                t.ping(r).then(r, () => {
                  n(s);
                });
              })
            )
        )
      );
    });
  }
  var Fa = {
    location: "yes",
    resizable: "yes",
    statusbar: "yes",
    toolbar: "no",
  },
    Ha = class {
      constructor(e) {
        (this.window = e), (this.associatedEvent = null);
      }
      close() {
        if (this.window)
          try {
            this.window.close();
          } catch (e) { }
      }
    };
  function Ga(e, t, i, n = 500, s = 600) {
    const a = Math.max((window.screen.availHeight - s) / 2, 0).toString(),
      r = Math.max((window.screen.availWidth - n) / 2, 0).toString();
    let o = "";
    const l = Object.assign(Object.assign({}, Fa), {
      width: n.toString(),
      height: s.toString(),
      top: a,
      left: r,
    }),
      h = P().toLowerCase();
    i && (o = Wn(h) ? "_blank" : i),
      Vn(h) && ((t = t || "http://localhost"), (l.scrollbars = "yes"));
    const c = Object.entries(l).reduce((e, [t, i]) => `${e}${t}=${i},`, "");
    if (
      (function (e = P()) {
        var t;
        return (
          Qn(e) &&
          !!(null === (t = window.navigator) || void 0 === t
            ? void 0
            : t.standalone)
        );
      })(h) &&
      "_self" !== o
    )
      return (
        (function (e, t) {
          const i = document.createElement("a");
          (i.href = e), (i.target = t);
          const n = document.createEvent("MouseEvent");
          n.initMouseEvent(
            "click",
            !0,
            !0,
            window,
            1,
            0,
            0,
            0,
            0,
            !1,
            !1,
            !1,
            !1,
            1,
            null
          ),
            i.dispatchEvent(n);
        })(t || "", o),
        new Ha(null)
      );
    const d = window.open(t || "", o, c);
    Xi(d, e, "popup-blocked");
    try {
      d.focus();
    } catch (e) { }
    return new Ha(d);
  }
  var Ua = "__/auth/handler",
    Ka = "emulator/auth/handler",
    Va = encodeURIComponent("fac");
  function Ja(e, t, i, n, s, a) {
    return _(this, null, function* () {
      Xi(e.config.authDomain, e, "auth-domain-config-required"),
        Xi(e.config.apiKey, e, "invalid-api-key");
      const r = {
        apiKey: e.config.apiKey,
        appName: e.name,
        authType: i,
        redirectUrl: n,
        v: pt,
        eventId: s,
      };
      if (t instanceof Ts) {
        t.setDefaultLanguage(e.languageCode),
          (r.providerId = t.providerId || ""),
          (function (e) {
            for (const t in e)
              if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
            return !0;
          })(t.getCustomParameters()) ||
          (r.customParameters = JSON.stringify(t.getCustomParameters()));
        for (const [e, t] of Object.entries(a || {})) r[e] = t;
      }
      if (t instanceof Ms) {
        const e = t.getScopes().filter((e) => "" !== e);
        e.length > 0 && (r.scopes = e.join(","));
      }
      e.tenantId && (r.tid = e.tenantId);
      const o = r;
      for (const e of Object.keys(o)) void 0 === o[e] && delete o[e];
      const l = yield e._getAppCheckToken(),
        h = l ? `#${Va}=${encodeURIComponent(l)}` : "";
      return `${(function ({ config: e }) {
        if (!e.emulator) return `https://${e.authDomain}/${Ua}`;
        return on(e, Ka);
      })(e)}?${J(o).slice(1)}${h}`;
    });
  }
  var Wa = "webStorageSupport",
    ja = class {
      constructor() {
        (this.eventManagers = {}),
          (this.iframes = {}),
          (this.originValidationPromises = {}),
          (this._redirectPersistence = Js),
          (this._completeRedirectFn = Sa),
          (this._overrideRedirectResult = Ia);
      }
      _openPopup(e, t, i, n) {
        return _(this, null, function* () {
          var s;
          tn(
            null === (s = this.eventManagers[e._key()]) || void 0 === s
              ? void 0
              : s.manager,
            "_initialize() not called before _openPopup()"
          );
          const a = yield Ja(e, t, i, nn(), n);
          return Ga(e, a, js());
        });
      }
      _openRedirect(e, t, i, n) {
        return _(this, null, function* () {
          yield this._originValidation(e);
          return (
            (function (e) {
              Ys().location.href = e;
            })(yield Ja(e, t, i, nn(), n)),
            new Promise(() => { })
          );
        });
      }
      _initialize(e) {
        const t = e._key();
        if (this.eventManagers[t]) {
          const { manager: e, promise: i } = this.eventManagers[t];
          return e
            ? Promise.resolve(e)
            : (tn(i, "If manager is not set, promise should be"), i);
        }
        const i = this.initAndGetManager(e);
        return (
          (this.eventManagers[t] = { promise: i }),
          i.catch(() => {
            delete this.eventManagers[t];
          }),
          i
        );
      }
      initAndGetManager(e) {
        return _(this, null, function* () {
          const t = yield xa(e),
            i = new La(e);
          return (
            t.register(
              "authEvent",
              (t) => {
                Xi(null == t ? void 0 : t.authEvent, e, "invalid-auth-event");
                return { status: i.onEvent(t.authEvent) ? "ACK" : "ERROR" };
              },
              gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
            ),
            (this.eventManagers[e._key()] = { manager: i }),
            (this.iframes[e._key()] = t),
            i
          );
        });
      }
      _isIframeWebStorageSupported(e, t) {
        this.iframes[e._key()].send(
          Wa,
          { type: Wa },
          (i) => {
            var n;
            const s =
              null === (n = null == i ? void 0 : i[0]) || void 0 === n
                ? void 0
                : n[Wa];
            void 0 !== s && t(!!s), Yi(e, "internal-error");
          },
          gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
        );
      }
      _originValidation(e) {
        const t = e._key();
        return (
          this.originValidationPromises[t] ||
          (this.originValidationPromises[t] = ba(e)),
          this.originValidationPromises[t]
        );
      }
      get _shouldInitProactively() {
        return Zn() || Jn() || Qn();
      }
    };
  var qa = "@firebase/auth",
    Ya = "1.10.0",
    za = class {
      constructor(e) {
        (this.auth = e), (this.internalListeners = new Map());
      }
      getUid() {
        var e;
        return (
          this.assertAuthConfigured(),
          (null === (e = this.auth.currentUser) || void 0 === e
            ? void 0
            : e.uid) || null
        );
      }
      getToken(e) {
        return _(this, null, function* () {
          if (
            (this.assertAuthConfigured(),
              yield this.auth._initializationPromise,
              !this.auth.currentUser)
          )
            return null;
          return { accessToken: yield this.auth.currentUser.getIdToken(e) };
        });
      }
      addAuthTokenListener(e) {
        if ((this.assertAuthConfigured(), this.internalListeners.has(e)))
          return;
        const t = this.auth.onIdTokenChanged((t) => {
          e((null == t ? void 0 : t.stsTokenManager.accessToken) || null);
        });
        this.internalListeners.set(e, t), this.updateProactiveRefresh();
      }
      removeAuthTokenListener(e) {
        this.assertAuthConfigured();
        const t = this.internalListeners.get(e);
        t &&
          (this.internalListeners.delete(e),
            t(),
            this.updateProactiveRefresh());
      }
      assertAuthConfigured() {
        Xi(
          this.auth._initializationPromise,
          "dependent-sdk-initialized-before-auth"
        );
      }
      updateProactiveRefresh() {
        this.internalListeners.size > 0
          ? this.auth._startProactiveRefresh()
          : this.auth._stopProactiveRefresh();
      }
    };
  var Qa,
    $a,
    Za,
    Xa = B("authIdTokenMaxAge") || 300,
    er = null;
  (as = {
    loadJS: (e) =>
      new Promise((t, i) => {
        const n = document.createElement("script");
        var s, a;
        n.setAttribute("src", e),
          (n.onload = t),
          (n.onerror = (e) => {
            const t = zi("internal-error");
            (t.customData = e), i(t);
          }),
          (n.type = "text/javascript"),
          (n.charset = "UTF-8"),
          (null !==
            (a =
              null === (s = document.getElementsByTagName("head")) ||
                void 0 === s
                ? void 0
                : s[0]) && void 0 !== a
            ? a
            : document
          ).appendChild(n);
      }),
    gapiScript: "https://apis.google.com/js/api.js",
    recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
    recaptchaEnterpriseScript:
      "https://www.google.com/recaptcha/enterprise.js?render=",
  }),
    (Qa = "Browser"),
    lt(
      new $(
        "auth",
        (e, { options: t }) => {
          const i = e.getProvider("app").getImmediate(),
            n = e.getProvider("heartbeat"),
            s = e.getProvider("app-check-internal"),
            { apiKey: a, authDomain: r } = i.options;
          Xi(a && !a.includes(":"), "invalid-api-key", { appName: i.name });
          const o = {
            apiKey: a,
            authDomain: r,
            clientPlatform: Qa,
            apiHost: "identitytoolkit.googleapis.com",
            tokenApiHost: "securetoken.googleapis.com",
            apiScheme: "https",
            sdkClientVersion: Xn(Qa),
          },
            l = new is(i, n, s, o);
          return (
            (function (e, t) {
              const i = (null == t ? void 0 : t.persistence) || [],
                n = (Array.isArray(i) ? i : [i]).map(xn);
              (null == t ? void 0 : t.errorMap) &&
                e._updateErrorMap(t.errorMap),
                e._initializeWithPersistence(
                  n,
                  null == t ? void 0 : t.popupRedirectResolver
                );
            })(l, t),
            l
          );
        },
        "PUBLIC"
      )
        .setInstantiationMode("EXPLICIT")
        .setInstanceCreatedCallback((e, t, i) => {
          e.getProvider("auth-internal").initialize();
        })
    ),
    lt(
      new $(
        "auth-internal",
        (e) => {
          const t = ns(e.getProvider("auth").getImmediate());
          return new za(t);
        },
        "PRIVATE"
      ).setInstantiationMode("EXPLICIT")
    ),
    mt(
      qa,
      Ya,
      (function (e) {
        switch (e) {
          case "Node":
            return "node";
          case "ReactNative":
            return "rn";
          case "Worker":
            return "webworker";
          case "Cordova":
            return "cordova";
          case "WebExtension":
            return "web-extension";
          default:
            return;
        }
      })(Qa)
    ),
    mt(qa, Ya, "esm2017");
  var tr = function () {
    var e =
      self.performance &&
      performance.getEntriesByType &&
      performance.getEntriesByType("navigation")[0];
    if (e && e.responseStart > 0 && e.responseStart < performance.now())
      return e;
  },
    ir = function (e) {
      if ("loading" === document.readyState) return "loading";
      var t = tr();
      if (t) {
        if (e < t.domInteractive) return "loading";
        if (
          0 === t.domContentLoadedEventStart ||
          e < t.domContentLoadedEventStart
        )
          return "dom-interactive";
        if (0 === t.domComplete || e < t.domComplete)
          return "dom-content-loaded";
      }
      return "complete";
    },
    nr = function (e) {
      var t = e.nodeName;
      return 1 === e.nodeType
        ? t.toLowerCase()
        : t.toUpperCase().replace(/^#/, "");
    },
    sr = function (e, t) {
      var i = "";
      try {
        for (; e && 9 !== e.nodeType;) {
          var n = e,
            s = n.id
              ? "#" + n.id
              : nr(n) +
              (n.classList &&
                n.classList.value &&
                n.classList.value.trim() &&
                n.classList.value.trim().length
                ? "." + n.classList.value.trim().replace(/\s+/g, ".")
                : "");
          if (i.length + s.length > (t || 100) - 1) return i || s;
          if (((i = i ? s + ">" + i : s), n.id)) break;
          e = n.parentNode;
        }
      } catch (e) { }
      return i;
    },
    ar = -1,
    rr = function (e) {
      addEventListener(
        "pageshow",
        function (t) {
          t.persisted && ((ar = t.timeStamp), e(t));
        },
        !0
      );
    },
    or = function () {
      var e = tr();
      return (e && e.activationStart) || 0;
    },
    lr = function (e, t) {
      var i = tr(),
        n = "navigate";
      return (
        ar >= 0
          ? (n = "back-forward-cache")
          : i &&
          (document.prerendering || or() > 0
            ? (n = "prerender")
            : document.wasDiscarded
              ? (n = "restore")
              : i.type && (n = i.type.replace(/_/g, "-"))),
        {
          name: e,
          value: void 0 === t ? -1 : t,
          rating: "good",
          delta: 0,
          entries: [],
          id: "v4-"
            .concat(Date.now(), "-")
            .concat(Math.floor(8999999999999 * Math.random()) + 1e12),
          navigationType: n,
        }
      );
    },
    hr = function (e, t, i) {
      try {
        if (PerformanceObserver.supportedEntryTypes.includes(e)) {
          var n = new PerformanceObserver(function (e) {
            Promise.resolve().then(function () {
              t(e.getEntries());
            });
          });
          return (
            n.observe(Object.assign({ type: e, buffered: !0 }, i || {})), n
          );
        }
      } catch (e) { }
    },
    cr = function (e, t, i, n) {
      var s, a;
      return function (r) {
        var o, l;
        t.value >= 0 &&
          (r || n) &&
          ((a = t.value - (s || 0)) || void 0 === s) &&
          ((s = t.value),
            (t.delta = a),
            (t.rating =
              (o = t.value) > (l = i)[1]
                ? "poor"
                : o > l[0]
                  ? "needs-improvement"
                  : "good"),
            e(t));
      };
    },
    dr = function (e) {
      requestAnimationFrame(function () {
        return requestAnimationFrame(function () {
          return e();
        });
      });
    },
    ur = function (e) {
      document.addEventListener("visibilitychange", function () {
        "hidden" === document.visibilityState && e();
      });
    },
    pr = function (e) {
      var t = !1;
      return function () {
        t || (e(), (t = !0));
      };
    },
    gr = -1,
    fr = function () {
      return "hidden" !== document.visibilityState || document.prerendering
        ? 1 / 0
        : 0;
    },
    mr = function (e) {
      "hidden" === document.visibilityState &&
        gr > -1 &&
        ((gr = "visibilitychange" === e.type ? e.timeStamp : 0), vr());
    },
    yr = function () {
      addEventListener("visibilitychange", mr, !0),
        addEventListener("prerenderingchange", mr, !0);
    },
    vr = function () {
      removeEventListener("visibilitychange", mr, !0),
        removeEventListener("prerenderingchange", mr, !0);
    },
    _r = function () {
      return (
        gr < 0 &&
        ((gr = fr()),
          yr(),
          rr(function () {
            setTimeout(function () {
              (gr = fr()), yr();
            }, 0);
          })),
        {
          get firstHiddenTime() {
            return gr;
          },
        }
      );
    },
    Ir = function (e) {
      document.prerendering
        ? addEventListener(
          "prerenderingchange",
          function () {
            return e();
          },
          !0
        )
        : e();
    },
    Sr = [1800, 3e3],
    Lr = [0.1, 0.25],
    Ar = function (e, t) {
      var i, n;
      (i = function (t) {
        var i = (function (e) {
          var t,
            i = {};
          if (e.entries.length) {
            var n = e.entries.reduce(function (e, t) {
              return e && e.value > t.value ? e : t;
            });
            if (n && n.sources && n.sources.length) {
              var s =
                (t = n.sources).find(function (e) {
                  return e.node && 1 === e.node.nodeType;
                }) || t[0];
              s &&
                (i = {
                  largestShiftTarget: sr(s.node),
                  largestShiftTime: n.startTime,
                  largestShiftValue: n.value,
                  largestShiftSource: s,
                  largestShiftEntry: n,
                  loadState: ir(n.startTime),
                });
            }
          }
          return Object.assign(e, { attribution: i });
        })(t);
        e(i);
      }),
        (n = (n = t) || {}),
        (function (e, t) {
          (t = t || {}),
            Ir(function () {
              var i,
                n = _r(),
                s = lr("FCP"),
                a = hr("paint", function (e) {
                  e.forEach(function (e) {
                    "first-contentful-paint" === e.name &&
                      (a.disconnect(),
                        e.startTime < n.firstHiddenTime &&
                        ((s.value = Math.max(e.startTime - or(), 0)),
                          s.entries.push(e),
                          i(!0)));
                  });
                });
              a &&
                ((i = cr(e, s, Sr, t.reportAllChanges)),
                  rr(function (n) {
                    (s = lr("FCP")),
                      (i = cr(e, s, Sr, t.reportAllChanges)),
                      dr(function () {
                        (s.value = performance.now() - n.timeStamp), i(!0);
                      });
                  }));
            });
        })(
          pr(function () {
            var e,
              t = lr("CLS", 0),
              s = 0,
              a = [],
              r = function (i) {
                i.forEach(function (e) {
                  if (!e.hadRecentInput) {
                    var t = a[0],
                      i = a[a.length - 1];
                    s &&
                      e.startTime - i.startTime < 1e3 &&
                      e.startTime - t.startTime < 5e3
                      ? ((s += e.value), a.push(e))
                      : ((s = e.value), (a = [e]));
                  }
                }),
                  s > t.value && ((t.value = s), (t.entries = a), e());
              },
              o = hr("layout-shift", r);
            o &&
              ((e = cr(i, t, Lr, n.reportAllChanges)),
                ur(function () {
                  r(o.takeRecords()), e(!0);
                }),
                rr(function () {
                  (s = 0),
                    (t = lr("CLS", 0)),
                    (e = cr(i, t, Lr, n.reportAllChanges)),
                    dr(function () {
                      return e();
                    });
                }),
                setTimeout(e, 0));
          })
        );
    },
    Er = 0,
    Cr = 1 / 0,
    wr = 0,
    br = function (e) {
      e.forEach(function (e) {
        e.interactionId &&
          ((Cr = Math.min(Cr, e.interactionId)),
            (wr = Math.max(wr, e.interactionId)),
            (Er = wr ? (wr - Cr) / 7 + 1 : 0));
      });
    },
    Tr = function () {
      return $a ? Er : performance.interactionCount || 0;
    },
    Mr = [],
    Dr = new Map(),
    kr = 0,
    Br = [],
    Or = function (e) {
      if (
        (Br.forEach(function (t) {
          return t(e);
        }),
          e.interactionId || "first-input" === e.entryType)
      ) {
        var t = Mr[Mr.length - 1],
          i = Dr.get(e.interactionId);
        if (i || Mr.length < 10 || e.duration > t.latency) {
          if (i)
            e.duration > i.latency
              ? ((i.entries = [e]), (i.latency = e.duration))
              : e.duration === i.latency &&
              e.startTime === i.entries[0].startTime &&
              i.entries.push(e);
          else {
            var n = { id: e.interactionId, latency: e.duration, entries: [e] };
            Dr.set(n.id, n), Mr.push(n);
          }
          Mr.sort(function (e, t) {
            return t.latency - e.latency;
          }),
            Mr.length > 10 &&
            Mr.splice(10).forEach(function (e) {
              return Dr.delete(e.id);
            });
        }
      }
    },
    Pr = function (e) {
      var t = self.requestIdleCallback || self.setTimeout,
        i = -1;
      return (
        (e = pr(e)),
        "hidden" === document.visibilityState ? e() : ((i = t(e)), ur(e)),
        i
      );
    },
    Rr = [200, 500],
    Nr = function (e, t) {
      "PerformanceEventTiming" in self &&
        "interactionId" in PerformanceEventTiming.prototype &&
        ((t = t || {}),
          Ir(function () {
            var i;
            "interactionCount" in performance ||
              $a ||
              ($a = hr("event", br, {
                type: "event",
                buffered: !0,
                durationThreshold: 0,
              }));
            var n,
              s = lr("INP"),
              a = function (e) {
                Pr(function () {
                  e.forEach(Or);
                  var t = (function () {
                    var e = Math.min(Mr.length - 1, Math.floor((Tr() - kr) / 50));
                    return Mr[e];
                  })();
                  t &&
                    t.latency !== s.value &&
                    ((s.value = t.latency), (s.entries = t.entries), n());
                });
              },
              r = hr("event", a, {
                durationThreshold:
                  null !== (i = t.durationThreshold) && void 0 !== i ? i : 40,
              });
            (n = cr(e, s, Rr, t.reportAllChanges)),
              r &&
              (r.observe({ type: "first-input", buffered: !0 }),
                ur(function () {
                  a(r.takeRecords()), n(!0);
                }),
                rr(function () {
                  (kr = Tr()),
                    (Mr.length = 0),
                    Dr.clear(),
                    (s = lr("INP")),
                    (n = cr(e, s, Rr, t.reportAllChanges));
                }));
          }));
    },
    xr = [],
    Fr = [],
    Hr = 0,
    Gr = new WeakMap(),
    Ur = new Map(),
    Kr = -1,
    Vr = function (e) {
      (xr = xr.concat(e)), Jr();
    },
    Jr = function () {
      Kr < 0 && (Kr = Pr(Wr));
    },
    Wr = function () {
      Ur.size > 10 &&
        Ur.forEach(function (e, t) {
          Dr.has(t) || Ur.delete(t);
        });
      var e = Mr.map(function (e) {
        return Gr.get(e.entries[0]);
      }),
        t = Fr.length - 50;
      Fr = Fr.filter(function (i, n) {
        return n >= t || e.includes(i);
      });
      for (var i = new Set(), n = 0; n < Fr.length; n++) {
        var s = Fr[n];
        Yr(s.startTime, s.processingEnd).forEach(function (e) {
          i.add(e);
        });
      }
      var a = xr.length - 1 - 50;
      (xr = xr.filter(function (e, t) {
        return (e.startTime > Hr && t > a) || i.has(e);
      })),
        (Kr = -1);
    };
  Br.push(
    function (e) {
      e.interactionId &&
        e.target &&
        !Ur.has(e.interactionId) &&
        Ur.set(e.interactionId, e.target);
    },
    function (e) {
      var t,
        i = e.startTime + e.duration;
      Hr = Math.max(Hr, e.processingEnd);
      for (var n = Fr.length - 1; n >= 0; n--) {
        var s = Fr[n];
        if (Math.abs(i - s.renderTime) <= 8) {
          ((t = s).startTime = Math.min(e.startTime, t.startTime)),
            (t.processingStart = Math.min(
              e.processingStart,
              t.processingStart
            )),
            (t.processingEnd = Math.max(e.processingEnd, t.processingEnd)),
            t.entries.push(e);
          break;
        }
      }
      t ||
        ((t = {
          startTime: e.startTime,
          processingStart: e.processingStart,
          processingEnd: e.processingEnd,
          renderTime: i,
          entries: [e],
        }),
          Fr.push(t)),
        (e.interactionId || "first-input" === e.entryType) && Gr.set(e, t),
        Jr();
    }
  );
  var jr,
    qr,
    Yr = function (e, t) {
      for (var i, n = [], s = 0; (i = xr[s]); s++)
        if (!(i.startTime + i.duration < e)) {
          if (i.startTime > t) break;
          n.push(i);
        }
      return n;
    },
    zr = function (e, t) {
      Za || (Za = hr("long-animation-frame", Vr)),
        Nr(function (t) {
          var i,
            n,
            s,
            a,
            r,
            o,
            l,
            h,
            c,
            d,
            u,
            p,
            g =
              ((n = (i = t).entries[0]),
                (s = Gr.get(n)),
                (a = n.processingStart),
                (r = s.processingEnd),
                (o = s.entries.sort(function (e, t) {
                  return e.processingStart - t.processingStart;
                })),
                (l = Yr(n.startTime, r)),
                (h = i.entries.find(function (e) {
                  return e.target;
                })),
                (c = (h && h.target) || Ur.get(n.interactionId)),
                (d = [n.startTime + n.duration, r].concat(
                  l.map(function (e) {
                    return e.startTime + e.duration;
                  })
                )),
                (u = Math.max.apply(Math, d)),
                (p = {
                  interactionTarget: sr(c),
                  interactionTargetElement: c,
                  interactionType: n.name.startsWith("key")
                    ? "keyboard"
                    : "pointer",
                  interactionTime: n.startTime,
                  nextPaintTime: u,
                  processedEventEntries: o,
                  longAnimationFrameEntries: l,
                  inputDelay: a - n.startTime,
                  processingDuration: r - a,
                  presentationDelay: Math.max(u - r, 0),
                  loadState: ir(n.startTime),
                }),
                Object.assign(i, { attribution: p }));
          e(g);
        }, t);
    },
    Qr = [2500, 4e3],
    $r = {},
    Zr = function (e, t) {
      var i, n;
      (i = function (t) {
        var i = (function (e) {
          var t = {
            timeToFirstByte: 0,
            resourceLoadDelay: 0,
            resourceLoadDuration: 0,
            elementRenderDelay: e.value,
          };
          if (e.entries.length) {
            var i = tr();
            if (i) {
              var n = i.activationStart || 0,
                s = e.entries[e.entries.length - 1],
                a =
                  s.url &&
                  performance.getEntriesByType("resource").filter(function (e) {
                    return e.name === s.url;
                  })[0],
                r = Math.max(0, i.responseStart - n),
                o = Math.max(r, a ? (a.requestStart || a.startTime) - n : 0),
                l = Math.max(o, a ? a.responseEnd - n : 0),
                h = Math.max(l, s.startTime - n);
              (t = {
                element: sr(s.element),
                timeToFirstByte: r,
                resourceLoadDelay: o - r,
                resourceLoadDuration: l - o,
                elementRenderDelay: h - l,
                navigationEntry: i,
                lcpEntry: s,
              }),
                s.url && (t.url = s.url),
                a && (t.lcpResourceEntry = a);
            }
          }
          return Object.assign(e, { attribution: t });
        })(t);
        e(i);
      }),
        (n = (n = t) || {}),
        Ir(function () {
          var e,
            t = _r(),
            s = lr("LCP"),
            a = function (i) {
              n.reportAllChanges || (i = i.slice(-1)),
                i.forEach(function (i) {
                  i.startTime < t.firstHiddenTime &&
                    ((s.value = Math.max(i.startTime - or(), 0)),
                      (s.entries = [i]),
                      e());
                });
            },
            r = hr("largest-contentful-paint", a);
          if (r) {
            e = cr(i, s, Qr, n.reportAllChanges);
            var o = pr(function () {
              $r[s.id] ||
                (a(r.takeRecords()), r.disconnect(), ($r[s.id] = !0), e(!0));
            });
            ["keydown", "click"].forEach(function (e) {
              addEventListener(
                e,
                function () {
                  return Pr(o);
                },
                { once: !0, capture: !0 }
              );
            }),
              ur(o),
              rr(function (t) {
                (s = lr("LCP")),
                  (e = cr(i, s, Qr, n.reportAllChanges)),
                  dr(function () {
                    (s.value = performance.now() - t.timeStamp),
                      ($r[s.id] = !0),
                      e(!0);
                  });
              });
          }
        });
    },
    Xr = "@firebase/performance",
    eo = "0.7.2",
    to = eo,
    io = "FB-PERF-TRACE-MEASURE",
    no = "_wt_",
    so = "_fcp",
    ao = "_fid",
    ro = "_lcp",
    oo = "_inp",
    lo = "_cls",
    ho = "@firebase/performance/config",
    co = "@firebase/performance/configexpire",
    uo = "Performance",
    po = new G("performance", uo, {
      "trace started": "Trace {$traceName} was started before.",
      "trace stopped": "Trace {$traceName} is not running.",
      "nonpositive trace startTime":
        "Trace {$traceName} startTime should be positive.",
      "nonpositive trace duration":
        "Trace {$traceName} duration should be positive.",
      "no window": "Window is not available.",
      "no app id": "App id is not available.",
      "no project id": "Project id is not available.",
      "no api key": "Api key is not available.",
      "invalid cc log": "Attempted to queue invalid cc event",
      "FB not default":
        "Performance can only start when Firebase app instance is the default one.",
      "RC response not ok": "RC response is not ok",
      "invalid attribute name": "Attribute name {$attributeName} is invalid.",
      "invalid attribute value":
        "Attribute value {$attributeValue} is invalid.",
      "invalid custom metric name":
        "Custom metric name {$customMetricName} is invalid",
      "invalid String merger input":
        "Input for String merger is invalid, contact support team to resolve.",
      "already initialized":
        "initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance.",
    }),
    go = new ce(uo);
  go.logLevel = ee.INFO;
  var fo,
    mo,
    yo = class e {
      constructor(e) {
        if (((this.window = e), !e)) throw po.create("no window");
        (this.performance = e.performance),
          (this.PerformanceObserver = e.PerformanceObserver),
          (this.windowLocation = e.location),
          (this.navigator = e.navigator),
          (this.document = e.document),
          this.navigator &&
          this.navigator.cookieEnabled &&
          (this.localStorage = e.localStorage),
          e.perfMetrics &&
          e.perfMetrics.onFirstInputDelay &&
          (this.onFirstInputDelay = e.perfMetrics.onFirstInputDelay),
          (this.onLCP = Zr),
          (this.onINP = zr),
          (this.onCLS = Ar);
      }
      getUrl() {
        return this.windowLocation.href.split("?")[0];
      }
      mark(e) {
        this.performance && this.performance.mark && this.performance.mark(e);
      }
      measure(e, t, i) {
        this.performance &&
          this.performance.measure &&
          this.performance.measure(e, t, i);
      }
      getEntriesByType(e) {
        return this.performance && this.performance.getEntriesByType
          ? this.performance.getEntriesByType(e)
          : [];
      }
      getEntriesByName(e) {
        return this.performance && this.performance.getEntriesByName
          ? this.performance.getEntriesByName(e)
          : [];
      }
      getTimeOrigin() {
        return (
          this.performance &&
          (this.performance.timeOrigin ||
            this.performance.timing.navigationStart)
        );
      }
      requiredApisAvailable() {
        return fetch && Promise && F()
          ? !!N() ||
          (go.info("IndexedDB is not supported by current browser"), !1)
          : (go.info(
            "Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."
          ),
            !1);
      }
      setupObserver(e, t) {
        if (!this.PerformanceObserver) return;
        new this.PerformanceObserver((e) => {
          for (const i of e.getEntries()) t(i);
        }).observe({ entryTypes: [e] });
      }
      static getInstance() {
        return void 0 === jr && (jr = new e(qr)), jr;
      }
    };
  function vo() {
    return fo;
  }
  function _o(e, t) {
    const i = e.length - t.length;
    if (i < 0 || i > 1) throw po.create("invalid String merger input");
    const n = [];
    for (let i = 0; i < e.length; i++)
      n.push(e.charAt(i)), t.length > i && n.push(t.charAt(i));
    return n.join("");
  }
  var Io,
    So,
    Lo = class e {
      constructor() {
        (this.instrumentationEnabled = !0),
          (this.dataCollectionEnabled = !0),
          (this.loggingEnabled = !1),
          (this.tracesSamplingRate = 1),
          (this.networkRequestsSamplingRate = 1),
          (this.logEndPointUrl =
            "https://firebaselogging.googleapis.com/v0cc/log?format=json_proto"),
          (this.flTransportEndpointUrl = _o(
            "hts/frbslgigp.ogepscmv/ieo/eaylg",
            "tp:/ieaeogn-agolai.o/1frlglgc/o"
          )),
          (this.transportKey = _o(
            "AzSC8r6ReiGqFMyfvgow",
            "Iayx0u-XT3vksVM-pIV"
          )),
          (this.logSource = 462),
          (this.logTraceAfterSampling = !1),
          (this.logNetworkAfterSampling = !1),
          (this.configTimeToLive = 12);
      }
      getFlTransportFullUrl() {
        return this.flTransportEndpointUrl.concat("?key=", this.transportKey);
      }
      static getInstance() {
        return void 0 === mo && (mo = new e()), mo;
      }
    };
  ((So = Io || (Io = {}))[(So.UNKNOWN = 0)] = "UNKNOWN"),
    (So[(So.VISIBLE = 1)] = "VISIBLE"),
    (So[(So.HIDDEN = 2)] = "HIDDEN");
  var Ao = ["firebase_", "google_", "ga_"],
    Eo = new RegExp("^[a-zA-Z]\\w*$");
  function Co() {
    const e = yo.getInstance().navigator;
    return (null == e ? void 0 : e.serviceWorker)
      ? e.serviceWorker.controller
        ? 2
        : 3
      : 1;
  }
  function wo() {
    switch (yo.getInstance().document.visibilityState) {
      case "visible":
        return Io.VISIBLE;
      case "hidden":
        return Io.HIDDEN;
      default:
        return Io.UNKNOWN;
    }
  }
  function bo() {
    const e = yo.getInstance().navigator.connection;
    switch (e && e.effectiveType) {
      case "slow-2g":
        return 1;
      case "2g":
        return 2;
      case "3g":
        return 3;
      case "4g":
        return 4;
      default:
        return 0;
    }
  }
  function To(e) {
    var t;
    const i = null === (t = e.options) || void 0 === t ? void 0 : t.appId;
    if (!i) throw po.create("no app id");
    return i;
  }
  var Mo = "0.0.1",
    Do = { loggingEnabled: !0 },
    ko = "FIREBASE_INSTALLATIONS_AUTH";
  function Bo(e, t) {
    const i = (function () {
      const e = yo.getInstance().localStorage;
      if (!e) return;
      const t = e.getItem(co);
      if (!(t && ((i = t), Number(i) > Date.now()))) return;
      var i;
      const n = e.getItem(ho);
      if (!n) return;
      try {
        return JSON.parse(n);
      } catch (e) {
        return;
      }
    })();
    return i
      ? (Po(i), Promise.resolve())
      : (function (e, t) {
        return (function (e) {
          const t = e.getToken();
          return t.then((e) => { }), t;
        })(e.installations)
          .then((i) => {
            const n = (function (e) {
              var t;
              const i =
                null === (t = e.options) || void 0 === t
                  ? void 0
                  : t.projectId;
              if (!i) throw po.create("no project id");
              return i;
            })(e.app),
              s = (function (e) {
                var t;
                const i =
                  null === (t = e.options) || void 0 === t
                    ? void 0
                    : t.apiKey;
                if (!i) throw po.create("no api key");
                return i;
              })(e.app),
              a = new Request(
                `https://firebaseremoteconfig.googleapis.com/v1/projects/${n}/namespaces/fireperf:fetch?key=${s}`,
                {
                  method: "POST",
                  headers: { Authorization: `${ko} ${i}` },
                  body: JSON.stringify({
                    app_instance_id: t,
                    app_instance_id_token: i,
                    app_id: To(e.app),
                    app_version: to,
                    sdk_version: Mo,
                  }),
                }
              );
            return fetch(a).then((e) => {
              if (e.ok) return e.json();
              throw po.create("RC response not ok");
            });
          })
          .catch(() => {
            go.info(Oo);
          });
      })(e, t)
        .then(Po)
        .then(
          (e) =>
            (function (e) {
              const t = yo.getInstance().localStorage;
              if (!e || !t) return;
              t.setItem(ho, JSON.stringify(e)),
                t.setItem(
                  co,
                  String(
                    Date.now() +
                    60 * Lo.getInstance().configTimeToLive * 60 * 1e3
                  )
                );
            })(e),
          () => { }
        );
  }
  var Oo = "Could not fetch config, will use default configs";
  function Po(e) {
    if (!e) return e;
    const t = Lo.getInstance(),
      i = e.entries || {};
    return (
      void 0 !== i.fpr_enabled
        ? (t.loggingEnabled = "true" === String(i.fpr_enabled))
        : (t.loggingEnabled = Do.loggingEnabled),
      i.fpr_log_source
        ? (t.logSource = Number(i.fpr_log_source))
        : Do.logSource && (t.logSource = Do.logSource),
      i.fpr_log_endpoint_url
        ? (t.logEndPointUrl = i.fpr_log_endpoint_url)
        : Do.logEndPointUrl && (t.logEndPointUrl = Do.logEndPointUrl),
      i.fpr_log_transport_key
        ? (t.transportKey = i.fpr_log_transport_key)
        : Do.transportKey && (t.transportKey = Do.transportKey),
      void 0 !== i.fpr_vc_network_request_sampling_rate
        ? (t.networkRequestsSamplingRate = Number(
          i.fpr_vc_network_request_sampling_rate
        ))
        : void 0 !== Do.networkRequestsSamplingRate &&
        (t.networkRequestsSamplingRate = Do.networkRequestsSamplingRate),
      void 0 !== i.fpr_vc_trace_sampling_rate
        ? (t.tracesSamplingRate = Number(i.fpr_vc_trace_sampling_rate))
        : void 0 !== Do.tracesSamplingRate &&
        (t.tracesSamplingRate = Do.tracesSamplingRate),
      (t.logTraceAfterSampling = Ro(t.tracesSamplingRate)),
      (t.logNetworkAfterSampling = Ro(t.networkRequestsSamplingRate)),
      e
    );
  }
  function Ro(e) {
    return Math.random() <= e;
  }
  var No,
    xo = 1;
  function Fo(e) {
    return (
      (xo = 2),
      (No =
        No ||
        (function (e) {
          return (function () {
            const e = yo.getInstance().document;
            return new Promise((t) => {
              if (e && "complete" !== e.readyState) {
                const i = () => {
                  "complete" === e.readyState &&
                    (e.removeEventListener("readystatechange", i), t());
                };
                e.addEventListener("readystatechange", i);
              } else t();
            });
          })()
            .then(() =>
              (function (e) {
                const t = e.getId();
                return (
                  t.then((e) => {
                    fo = e;
                  }),
                  t
                );
              })(e.installations)
            )
            .then((t) => Bo(e, t))
            .then(
              () => Ho(),
              () => Ho()
            );
        })(e)),
      No
    );
  }
  function Ho() {
    xo = 3;
  }
  var Go,
    Uo = 3,
    Ko = [],
    Vo = !1;
  function Jo(e) {
    setTimeout(() => {
      Uo <= 0 || (Ko.length > 0 && Wo(), Jo(1e4));
    }, e);
  }
  function Wo() {
    const e = Ko.splice(0, 1e3),
      t = e.map((e) => ({
        source_extension_json_proto3: e.message,
        event_time_ms: String(e.eventTime),
      }));
    (function (e) {
      const t = Lo.getInstance().getFlTransportFullUrl(),
        i = JSON.stringify(e);
      return navigator.sendBeacon && navigator.sendBeacon(t, i)
        ? Promise.resolve()
        : fetch(t, { method: "POST", body: i, keepalive: !0 }).then();
    })({
      request_time_ms: String(Date.now()),
      client_info: { client_type: 1, js_client_info: {} },
      log_source: Lo.getInstance().logSource,
      log_event: t,
    })
      .then(() => {
        Uo = 3;
      })
      .catch(() => {
        (Ko = [...e, ...Ko]), Uo--, go.info(`Tries left: ${Uo}.`), Jo(1e4);
      });
  }
  function jo(e) {
    return (...t) => {
      !(function (e) {
        if (!e.eventTime || !e.message) throw po.create("invalid cc log");
        Ko = [...Ko, e];
      })({ message: e(...t), eventTime: Date.now() });
    };
  }
  function qo() {
    for (; Ko.length > 0;) Wo();
  }
  function Yo(e, t) {
    Go || (Go = { send: jo($o), flush: qo }), Go.send(e, t);
  }
  function zo(e) {
    const t = Lo.getInstance();
    (!t.instrumentationEnabled && e.isAuto) ||
      ((t.dataCollectionEnabled || e.isAuto) &&
        yo.getInstance().requiredApisAvailable() &&
        (3 === xo
          ? Qo(e)
          : Fo(e.performanceController).then(
            () => Qo(e),
            () => Qo(e)
          )));
  }
  function Qo(e) {
    if (!vo()) return;
    const t = Lo.getInstance();
    t.loggingEnabled && t.logTraceAfterSampling && Yo(e, 1);
  }
  function $o(e, t) {
    return 0 === t
      ? (function (e) {
        const t = {
          url: e.url,
          http_method: e.httpMethod || 0,
          http_response_code: 200,
          response_payload_bytes: e.responsePayloadBytes,
          client_start_time_us: e.startTimeUs,
          time_to_response_initiated_us: e.timeToResponseInitiatedUs,
          time_to_response_completed_us: e.timeToResponseCompletedUs,
        },
          i = {
            application_info: Zo(e.performanceController.app),
            network_request_metric: t,
          };
        return JSON.stringify(i);
      })(e)
      : (function (e) {
        const t = {
          name: e.name,
          is_auto: e.isAuto,
          client_start_time_us: e.startTimeUs,
          duration_us: e.durationUs,
        };
        0 !== Object.keys(e.counters).length && (t.counters = e.counters);
        const i = e.getAttributes();
        0 !== Object.keys(i).length && (t.custom_attributes = i);
        const n = {
          application_info: Zo(e.performanceController.app),
          trace_metric: t,
        };
        return JSON.stringify(n);
      })(e);
  }
  function Zo(e) {
    return {
      google_app_id: To(e),
      app_instance_id: vo(),
      web_app_info: {
        sdk_version: to,
        page_url: yo.getInstance().getUrl(),
        service_worker_status: Co(),
        visibility_state: wo(),
        effective_connection_type: bo(),
      },
      application_process_state: 0,
    };
  }
  function Xo(e, t) {
    const i = t;
    if (!i || void 0 === i.responseStart) return;
    const n = yo.getInstance().getTimeOrigin(),
      s = Math.floor(1e3 * (i.startTime + n)),
      a = i.responseStart
        ? Math.floor(1e3 * (i.responseStart - i.startTime))
        : void 0,
      r = Math.floor(1e3 * (i.responseEnd - i.startTime));
    !(function (e) {
      const t = Lo.getInstance();
      if (!t.instrumentationEnabled) return;
      const i = e.url,
        n = t.logEndPointUrl.split("?")[0],
        s = t.flTransportEndpointUrl.split("?")[0];
      i !== n &&
        i !== s &&
        t.loggingEnabled &&
        t.logNetworkAfterSampling &&
        Yo(e, 0);
    })({
      performanceController: e,
      url: i.name && i.name.split("?")[0],
      responsePayloadBytes: i.transferSize,
      startTimeUs: s,
      timeToResponseInitiatedUs: a,
      timeToResponseCompletedUs: r,
    });
  }
  var el = ["_fp", so, ao, ro, lo, oo];
  var tl,
    il = class e {
      constructor(e, t, i = !1, n) {
        (this.performanceController = e),
          (this.name = t),
          (this.isAuto = i),
          (this.state = 1),
          (this.customAttributes = {}),
          (this.counters = {}),
          (this.api = yo.getInstance()),
          (this.randomId = Math.floor(1e6 * Math.random())),
          this.isAuto ||
          ((this.traceStartMark = `FB-PERF-TRACE-START-${this.randomId}-${this.name}`),
            (this.traceStopMark = `FB-PERF-TRACE-STOP-${this.randomId}-${this.name}`),
            (this.traceMeasure = n || `${io}-${this.randomId}-${this.name}`),
            n && this.calculateTraceMetrics());
      }
      start() {
        if (1 !== this.state)
          throw po.create("trace started", { traceName: this.name });
        this.api.mark(this.traceStartMark), (this.state = 2);
      }
      stop() {
        if (2 !== this.state)
          throw po.create("trace stopped", { traceName: this.name });
        (this.state = 3),
          this.api.mark(this.traceStopMark),
          this.api.measure(
            this.traceMeasure,
            this.traceStartMark,
            this.traceStopMark
          ),
          this.calculateTraceMetrics(),
          zo(this);
      }
      record(e, t, i) {
        if (e <= 0)
          throw po.create("nonpositive trace startTime", {
            traceName: this.name,
          });
        if (t <= 0)
          throw po.create("nonpositive trace duration", {
            traceName: this.name,
          });
        if (
          ((this.durationUs = Math.floor(1e3 * t)),
            (this.startTimeUs = Math.floor(1e3 * e)),
            i &&
            i.attributes &&
            (this.customAttributes = Object.assign({}, i.attributes)),
            i && i.metrics)
        )
          for (const e of Object.keys(i.metrics))
            isNaN(Number(i.metrics[e])) ||
              (this.counters[e] = Math.floor(Number(i.metrics[e])));
        zo(this);
      }
      incrementMetric(e, t = 1) {
        void 0 === this.counters[e]
          ? this.putMetric(e, t)
          : this.putMetric(e, this.counters[e] + t);
      }
      putMetric(e, t) {
        if (
          ((i = e),
            (n = this.name),
            0 === i.length ||
            i.length > 100 ||
            (!(n && n.startsWith(no) && el.indexOf(i) > -1) &&
              i.startsWith("_")))
        )
          throw po.create("invalid custom metric name", {
            customMetricName: e,
          });
        var i, n;
        this.counters[e] = (function (e) {
          const t = Math.floor(e);
          return (
            t < e &&
            go.info(
              `Metric value should be an Integer, setting the value as : ${t}.`
            ),
            t
          );
        })(null != t ? t : 0);
      }
      getMetric(e) {
        return this.counters[e] || 0;
      }
      putAttribute(e, t) {
        const i = !(
          0 === (n = e).length ||
          n.length > 40 ||
          Ao.some((e) => n.startsWith(e)) ||
          !n.match(Eo)
        );
        var n;
        const s = (function (e) {
          return 0 !== e.length && e.length <= 100;
        })(t);
        if (i && s) this.customAttributes[e] = t;
        else {
          if (!i)
            throw po.create("invalid attribute name", { attributeName: e });
          if (!s)
            throw po.create("invalid attribute value", { attributeValue: t });
        }
      }
      getAttribute(e) {
        return this.customAttributes[e];
      }
      removeAttribute(e) {
        void 0 !== this.customAttributes[e] && delete this.customAttributes[e];
      }
      getAttributes() {
        return Object.assign({}, this.customAttributes);
      }
      setStartTime(e) {
        this.startTimeUs = e;
      }
      setDuration(e) {
        this.durationUs = e;
      }
      calculateTraceMetrics() {
        const e = this.api.getEntriesByName(this.traceMeasure),
          t = e && e[0];
        t &&
          ((this.durationUs = Math.floor(1e3 * t.duration)),
            (this.startTimeUs = Math.floor(
              1e3 * (t.startTime + this.api.getTimeOrigin())
            )));
      }
      static createOobTrace(t, i, n, s, a) {
        const r = yo.getInstance().getUrl();
        if (!r) return;
        const o = new e(t, no + r, !0),
          l = Math.floor(1e3 * yo.getInstance().getTimeOrigin());
        o.setStartTime(l),
          i &&
          i[0] &&
          (o.setDuration(Math.floor(1e3 * i[0].duration)),
            o.putMetric(
              "domInteractive",
              Math.floor(1e3 * i[0].domInteractive)
            ),
            o.putMetric(
              "domContentLoadedEventEnd",
              Math.floor(1e3 * i[0].domContentLoadedEventEnd)
            ),
            o.putMetric("loadEventEnd", Math.floor(1e3 * i[0].loadEventEnd)));
        if (n) {
          const e = n.find((e) => "first-paint" === e.name);
          e && e.startTime && o.putMetric("_fp", Math.floor(1e3 * e.startTime));
          const t = n.find((e) => "first-contentful-paint" === e.name);
          t && t.startTime && o.putMetric(so, Math.floor(1e3 * t.startTime)),
            a && o.putMetric(ao, Math.floor(1e3 * a));
        }
        this.addWebVitalMetric(o, ro, "lcp_element", s.lcp),
          this.addWebVitalMetric(o, lo, "cls_largestShiftTarget", s.cls),
          this.addWebVitalMetric(o, oo, "inp_interactionTarget", s.inp),
          zo(o),
          Go && Go.flush();
      }
      static addWebVitalMetric(e, t, i, n) {
        n &&
          (e.putMetric(t, Math.floor(1e3 * n.value)),
            n.elementAttribution && e.putAttribute(i, n.elementAttribution));
      }
      static createUserTimingTrace(t, i) {
        zo(new e(t, i, !1, i));
      }
    },
    nl = {},
    sl = !1;
  function al(e) {
    vo() &&
      (setTimeout(
        () =>
          (function (e) {
            const t = yo.getInstance();
            "onpagehide" in window
              ? t.document.addEventListener("pagehide", () => ol(e))
              : t.document.addEventListener("unload", () => ol(e));
            t.document.addEventListener("visibilitychange", () => {
              "hidden" === t.document.visibilityState && ol(e);
            }),
              t.onFirstInputDelay &&
              t.onFirstInputDelay((e) => {
                tl = e;
              });
            t.onLCP((e) => {
              var t;
              nl.lcp = {
                value: e.value,
                elementAttribution:
                  null === (t = e.attribution) || void 0 === t
                    ? void 0
                    : t.element,
              };
            }),
              t.onCLS((e) => {
                var t;
                nl.cls = {
                  value: e.value,
                  elementAttribution:
                    null === (t = e.attribution) || void 0 === t
                      ? void 0
                      : t.largestShiftTarget,
                };
              }),
              t.onINP((e) => {
                var t;
                nl.inp = {
                  value: e.value,
                  elementAttribution:
                    null === (t = e.attribution) || void 0 === t
                      ? void 0
                      : t.interactionTarget,
                };
              });
          })(e),
        0
      ),
        setTimeout(
          () =>
            (function (e) {
              const t = yo.getInstance(),
                i = t.getEntriesByType("resource");
              for (const t of i) Xo(e, t);
              t.setupObserver("resource", (t) => Xo(e, t));
            })(e),
          0
        ),
        setTimeout(
          () =>
            (function (e) {
              const t = yo.getInstance(),
                i = t.getEntriesByType("measure");
              for (const t of i) rl(e, t);
              t.setupObserver("measure", (t) => rl(e, t));
            })(e),
          0
        ));
  }
  function rl(e, t) {
    const i = t.name;
    i.substring(0, 21) !== io && il.createUserTimingTrace(e, i);
  }
  function ol(e) {
    if (!sl) {
      sl = !0;
      const t = yo.getInstance(),
        i = t.getEntriesByType("navigation"),
        n = t.getEntriesByType("paint");
      setTimeout(() => {
        il.createOobTrace(e, i, n, nl, tl);
      }, 0);
    }
  }
  var ll = class {
    constructor(e, t) {
      (this.app = e), (this.installations = t), (this.initialized = !1);
    }
    _init(e) {
      this.initialized ||
        (void 0 !== (null == e ? void 0 : e.dataCollectionEnabled) &&
          (this.dataCollectionEnabled = e.dataCollectionEnabled),
          void 0 !== (null == e ? void 0 : e.instrumentationEnabled) &&
          (this.instrumentationEnabled = e.instrumentationEnabled),
          yo.getInstance().requiredApisAvailable()
            ? x()
              .then((e) => {
                e &&
                  (Vo || (Jo(5500), (Vo = !0)),
                    Fo(this).then(
                      () => al(this),
                      () => al(this)
                    ),
                    (this.initialized = !0));
              })
              .catch((e) => {
                go.info(`Environment doesn't support IndexedDB: ${e}`);
              })
            : go.info(
              'Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'
            ));
    }
    set instrumentationEnabled(e) {
      Lo.getInstance().instrumentationEnabled = e;
    }
    get instrumentationEnabled() {
      return Lo.getInstance().instrumentationEnabled;
    }
    set dataCollectionEnabled(e) {
      Lo.getInstance().dataCollectionEnabled = e;
    }
    get dataCollectionEnabled() {
      return Lo.getInstance().dataCollectionEnabled;
    }
  };
  lt(
    new $(
      "performance",
      (e, { options: t }) => {
        const i = e.getProvider("app").getImmediate(),
          n = e.getProvider("installations-internal").getImmediate();
        if ("[DEFAULT]" !== i.name) throw po.create("FB not default");
        if ("undefined" == typeof window) throw po.create("no window");
        var s;
        (s = window), (qr = s);
        const a = new ll(i, n);
        return a._init(t), a;
      },
      "PUBLIC"
    )
  ),
    mt(Xr, eo),
    mt(Xr, eo, "esm2017");
  var hl,
    cl = [];
  for (let e = 0; e < 256; ++e) cl.push((e + 256).toString(16).slice(1));
  var dl = new Uint8Array(16);
  var ul = {
    randomUUID:
      "undefined" != typeof crypto &&
      crypto.randomUUID &&
      crypto.randomUUID.bind(crypto),
  };
  var pl = function (e, t, i) {
    var n, s, a;
    if (ul.randomUUID && !t && !e) return ul.randomUUID();
    const r =
      null !=
        (a =
          null != (s = (e = e || {}).random)
            ? s
            : null == (n = e.rng)
              ? void 0
              : n.call(e))
        ? a
        : (function () {
          if (!hl) {
            if ("undefined" == typeof crypto || !crypto.getRandomValues)
              throw new Error(
                "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
              );
            hl = crypto.getRandomValues.bind(crypto);
          }
          return hl(dl);
        })();
    if (r.length < 16) throw new Error("Random bytes length must be >= 16");
    if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), t)) {
      if ((i = i || 0) < 0 || i + 16 > t.length)
        throw new RangeError(
          `UUID byte range ${i}:${i + 15} is out of buffer bounds`
        );
      for (let e = 0; e < 16; ++e) t[i + e] = r[e];
      return t;
    }
    return (function (e, t = 0) {
      return (
        cl[e[t + 0]] +
        cl[e[t + 1]] +
        cl[e[t + 2]] +
        cl[e[t + 3]] +
        "-" +
        cl[e[t + 4]] +
        cl[e[t + 5]] +
        "-" +
        cl[e[t + 6]] +
        cl[e[t + 7]] +
        "-" +
        cl[e[t + 8]] +
        cl[e[t + 9]] +
        "-" +
        cl[e[t + 10]] +
        cl[e[t + 11]] +
        cl[e[t + 12]] +
        cl[e[t + 13]] +
        cl[e[t + 14]] +
        cl[e[t + 15]]
      ).toLowerCase();
    })(r);
  },
    gl = null,
    fl = null,
    ml = null,
    yl = !1,
    vl = "vitamahjongweb_uuid",
    _l = "vitamahjongweb_user_type",
    Il = { version: "1.2.0" },
    Sl = [];
  function Ll(e) {
    Il = c(c({}, Il), e);
  }
  function Al(e, t) {
    // 本地版不收集或发送统计事件。
  }
  window && (window.logEvent = Al);
  var El,
    Cl,
    wl,
    bl,
    Tl,
    Ml,
    Dl,
    kl,
    Bl,
    Ol,
    Pl,
    Rl,
    Nl,
    xl,
    Fl,
    Hl,
    Gl,
    Ul,
    Kl,
    Vl,
    Jl = class extends Error {
      constructor(e, t) {
        super(t), p(this, "code"), (this.name = "PenpalError"), (this.code = e);
      }
    },
    Wl = (e) => ({
      name: e.name,
      message: e.message,
      stack: e.stack,
      penpalCode: e instanceof Jl ? e.code : void 0,
    }),
    jl = Symbol("Reply"),
    ql =
      ((Cl = class {
        constructor(e, t) {
          p(this, "value"),
            p(this, "transferables"),
            m(this, El, jl),
            (this.value = e),
            (this.transferables = null == t ? void 0 : t.transferables);
        }
      }),
        (El = new WeakMap()),
        Cl),
    Yl = "penpal",
    zl = (e) => "object" == typeof e && null !== e,
    Ql = (e) => "function" == typeof e,
    $l = (e) => "SYN" === e.type,
    Zl = (e) => "ACK1" === e.type,
    Xl = (e) => "ACK2" === e.type,
    eh = (e) => "CALL" === e.type,
    th = (e) => "REPLY" === e.type,
    ih = (e, t = []) => {
      const i = [];
      for (const n of Object.keys(e)) {
        const s = e[n];
        Ql(s) ? i.push([...t, n]) : zl(s) && i.push(...ih(s, [...t, n]));
      }
      return i;
    },
    nh = (e) => e.join("."),
    sh = (e, t, i) =>
      c(
        { namespace: Yl, channel: e, type: "REPLY", callId: t, isError: !0 },
        i instanceof Error
          ? { value: Wl(i), isSerializedErrorInstance: !0 }
          : { value: i }
      ),
    ah = (e, t, i, n) => {
      let s = !1;
      const a = (a) =>
        _(void 0, null, function* () {
          if (s) return;
          if (!eh(a)) return;
          null == n || n(`Received ${nh(a.methodPath)}() call`, a);
          const { methodPath: r, args: o, id: l } = a;
          let h, c;
          try {
            const e = ((e, t) => {
              const i = e.reduce((e, t) => (zl(e) ? e[t] : void 0), t);
              return Ql(i) ? i : void 0;
            })(r, t);
            if (!e)
              throw new Jl(
                "METHOD_NOT_FOUND",
                `Method \`${nh(r)}\` is not found.`
              );
            let n = yield e(...o);
            n instanceof ql && ((c = n.transferables), (n = yield n.value)),
              (h = {
                namespace: Yl,
                channel: i,
                type: "REPLY",
                callId: l,
                value: n,
              });
          } catch (e) {
            h = sh(i, l, e);
          }
          if (!s)
            try {
              null == n || n(`Sending ${nh(r)}() reply`, h),
                e.sendMessage(h, c);
            } catch (t) {
              throw (
                ("DataCloneError" === t.name &&
                  ((h = sh(i, l, t)),
                    null == n || n(`Sending ${nh(r)}() reply`, h),
                    e.sendMessage(h)),
                  t)
              );
            }
        });
      return (
        e.addMessageHandler(a),
        () => {
          (s = !0), e.removeMessageHandler(a);
        }
      );
    },
    rh =
      null != (bl = null == (wl = crypto.randomUUID) ? void 0 : wl.bind(crypto))
        ? bl
        : () =>
          new Array(4)
            .fill(0)
            .map(() =>
              Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)
            )
            .join("-"),
    oh = Symbol("CallOptions"),
    lh =
      ((Ml = class {
        constructor(e) {
          p(this, "transferables"),
            p(this, "timeout"),
            m(this, Tl, oh),
            (this.transferables = null == e ? void 0 : e.transferables),
            (this.timeout = null == e ? void 0 : e.timeout);
        }
      }),
        (Tl = new WeakMap()),
        Ml),
    hh = new Set(["apply", "call", "bind"]),
    ch = (e, t, i = []) =>
      new Proxy(i.length ? () => { } : Object.create(null), {
        get(n, s) {
          if ("then" !== s)
            return i.length && hh.has(s)
              ? Reflect.get(n, s)
              : ch(e, t, [...i, s]);
        },
        apply: (t, n, s) => e(i, s),
      }),
    dh = (e) =>
      new Jl(
        "CONNECTION_DESTROYED",
        `Method call ${nh(e)}() failed due to destroyed connection`
      ),
    uh = (e, t, i) => {
      let n = !1;
      const s = new Map(),
        a = (e) => {
          if (!th(e)) return;
          const {
            callId: t,
            value: n,
            isError: a,
            isSerializedErrorInstance: r,
          } = e,
            o = s.get(t);
          o &&
            (s.delete(t),
              null == i || i(`Received ${nh(o.methodPath)}() call`, e),
              a
                ? o.reject(
                  r
                    ? (({ name: e, message: t, stack: i, penpalCode: n }) => {
                      const s = n ? new Jl(n, t) : new Error(t);
                      return (s.name = e), (s.stack = i), s;
                    })(n)
                    : n
                )
                : o.resolve(n));
        };
      e.addMessageHandler(a);
      return {
        remoteProxy: ch((a, r) => {
          if (n) throw dh(a);
          const o = rh(),
            l = r[r.length - 1],
            h = l instanceof lh,
            { timeout: c, transferables: d } = h ? l : {},
            u = h ? r.slice(0, -1) : r;
          return new Promise((n, r) => {
            const l =
              void 0 !== c
                ? window.setTimeout(() => {
                  s.delete(o),
                    r(
                      new Jl(
                        "METHOD_CALL_TIMEOUT",
                        `Method call ${nh(a)}() timed out after ${c}ms`
                      )
                    );
                }, c)
                : void 0;
            s.set(o, { methodPath: a, resolve: n, reject: r, timeoutId: l });
            try {
              const n = {
                namespace: Yl,
                channel: t,
                type: "CALL",
                id: o,
                methodPath: a,
                args: u,
              };
              null == i || i(`Sending ${nh(a)}() call`, n), e.sendMessage(n, d);
            } catch (e) {
              r(new Jl("TRANSMISSION_FAILED", e.message));
            }
          });
        }, i),
        destroy: () => {
          (n = !0), e.removeMessageHandler(a);
          for (const { methodPath: e, reject: t, timeoutId: i } of s.values())
            clearTimeout(i), t(dh(e));
          s.clear();
        },
      };
    },
    ph = () => {
      let e, t;
      return {
        promise: new Promise((i, n) => {
          (e = i), (t = n);
        }),
        resolve: e,
        reject: t,
      };
    },
    gh = class extends Error {
      constructor(e) {
        super(
          `You've hit a bug in Penpal. Please file an issue with the following information: ${e}`
        );
      }
    },
    fh = "deprecated-penpal",
    mh = (e) => e.join("."),
    yh = (e) => new gh(`Unexpected message to translate: ${JSON.stringify(e)}`),
    vh = ({ messenger: e, methods: t, timeout: i, channel: n, log: s }) => {
      const a = rh();
      let r;
      const o = [];
      let l = !1;
      const h = ih(t),
        { promise: c, resolve: d, reject: u } = ph(),
        p =
          void 0 !== i
            ? setTimeout(() => {
              u(
                new Jl(
                  "CONNECTION_TIMEOUT",
                  `Connection timed out after ${i}ms`
                )
              );
            }, i)
            : void 0,
        g = () => {
          for (const e of o) e();
        },
        f = () => {
          if (l) return;
          o.push(ah(e, t, n, s));
          const { remoteProxy: i, destroy: a } = uh(e, n, s);
          o.push(a),
            clearTimeout(p),
            (l = !0),
            d({ remoteProxy: i, destroy: g });
        },
        m = () => {
          const t = {
            namespace: Yl,
            type: "SYN",
            channel: n,
            participantId: a,
          };
          null == s || s("Sending handshake SYN", t);
          try {
            e.sendMessage(t);
          } catch (e) {
            u(new Jl("TRANSMISSION_FAILED", e.message));
          }
        },
        y = (t) => {
          $l(t) &&
            ((t) => {
              if (
                (null == s || s("Received handshake SYN", t),
                  t.participantId === r && r !== fh)
              )
                return;
              if (((r = t.participantId), m(), !(a > r || r === fh))) return;
              const i = {
                namespace: Yl,
                channel: n,
                type: "ACK1",
                methodPaths: h,
              };
              null == s || s("Sending handshake ACK1", i);
              try {
                e.sendMessage(i);
              } catch (e) {
                return void u(new Jl("TRANSMISSION_FAILED", e.message));
              }
            })(t),
            Zl(t) &&
            ((t) => {
              null == s || s("Received handshake ACK1", t);
              const i = { namespace: Yl, channel: n, type: "ACK2" };
              null == s || s("Sending handshake ACK2", i);
              try {
                e.sendMessage(i);
              } catch (e) {
                return void u(new Jl("TRANSMISSION_FAILED", e.message));
              }
              f();
            })(t),
            Xl(t) &&
            ((e) => {
              null == s || s("Received handshake ACK2", e), f();
            })(t);
        };
      return (
        e.addMessageHandler(y), o.push(() => e.removeMessageHandler(y)), m(), c
      );
    },
    _h = (e) => {
      let t,
        i = !1;
      return (...n) => (i || ((i = !0), (t = e(...n))), t);
    },
    Ih = new WeakSet(),
    Sh = ({
      messenger: e,
      methods: t = {},
      timeout: i,
      channel: n,
      log: s,
    }) => {
      if (!e) throw new Jl("INVALID_ARGUMENT", "messenger must be defined");
      if (Ih.has(e))
        throw new Jl(
          "INVALID_ARGUMENT",
          "A messenger can only be used for a single connection"
        );
      Ih.add(e);
      const a = [e.destroy],
        r = _h((t) => {
          if (t) {
            const t = { namespace: Yl, channel: n, type: "DESTROY" };
            try {
              e.sendMessage(t);
            } catch (e) { }
          }
          for (const e of a) e();
          null == s || s("Connection destroyed");
        }),
        o = (e) => ((e) => zl(e) && e.namespace === Yl)(e) && e.channel === n;
      return {
        promise: _(void 0, null, function* () {
          try {
            e.initialize({ log: s, validateReceivedMessage: o }),
              e.addMessageHandler((e) => {
                ((e) => "DESTROY" === e.type)(e) && r(!1);
              });
            const { remoteProxy: l, destroy: h } = yield vh({
              messenger: e,
              methods: t,
              timeout: i,
              channel: n,
              log: s,
            });
            return a.push(h), l;
          } catch (e) {
            throw (r(!0), e);
          }
        }),
        destroy: () => {
          r(!0);
        },
      };
    },
    Lh =
      ((Vl = class {
        constructor({ remoteWindow: e, allowedOrigins: t }) {
          if (
            (m(this, Dl, void 0),
              m(this, kl, void 0),
              m(this, Bl, void 0),
              m(this, Ol, void 0),
              m(this, Pl, void 0),
              m(this, Rl, new Set()),
              m(this, Nl, void 0),
              m(this, xl, !1),
              p(this, "initialize", ({ log: e, validateReceivedMessage: t }) => {
                y(this, Bl, e),
                  y(this, Ol, t),
                  window.addEventListener("message", f(this, Ul));
              }),
              p(this, "sendMessage", (e, t) => {
                if ($l(e)) {
                  const i = f(this, Hl).call(this, e);
                  f(this, Dl).postMessage(e, { targetOrigin: i, transfer: t });
                } else if (Zl(e) || f(this, xl)) {
                  const i = f(this, xl)
                    ? ((e) => {
                      if (Zl(e))
                        return {
                          penpal: "synAck",
                          methodNames: e.methodPaths.map(mh),
                        };
                      if (eh(e))
                        return {
                          penpal: "call",
                          id: e.id,
                          methodName: mh(e.methodPath),
                          args: e.args,
                        };
                      if (th(e))
                        return e.isError
                          ? c(
                            {
                              penpal: "reply",
                              id: e.callId,
                              resolution: "rejected",
                            },
                            e.isSerializedErrorInstance
                              ? {
                                returnValue: e.value,
                                returnValueIsError: !0,
                              }
                              : { returnValue: e.value }
                          )
                          : {
                            penpal: "reply",
                            id: e.callId,
                            resolution: "fulfilled",
                            returnValue: e.value,
                          };
                      throw yh(e);
                    })(e)
                    : e,
                    n = f(this, Hl).call(this, e);
                  f(this, Dl).postMessage(i, { targetOrigin: n, transfer: t });
                } else if (Xl(e)) {
                  const { port1: i, port2: n } = new MessageChannel();
                  y(this, Nl, i),
                    i.addEventListener("message", f(this, Kl)),
                    i.start();
                  const s = [n, ...(t || [])],
                    a = f(this, Hl).call(this, e);
                  f(this, Dl).postMessage(e, { targetOrigin: a, transfer: s });
                } else {
                  if (!f(this, Nl)) throw new gh("Port is undefined");
                  f(this, Nl).postMessage(e, { transfer: t });
                }
              }),
              p(this, "addMessageHandler", (e) => {
                f(this, Rl).add(e);
              }),
              p(this, "removeMessageHandler", (e) => {
                f(this, Rl).delete(e);
              }),
              p(this, "destroy", () => {
                window.removeEventListener("message", f(this, Ul)),
                  f(this, Gl).call(this),
                  f(this, Rl).clear();
              }),
              m(this, Fl, (e) =>
                f(this, kl).some((t) =>
                  t instanceof RegExp ? t.test(e) : t === e || "*" === t
                )
              ),
              m(this, Hl, (e) => {
                if ($l(e)) return "*";
                if (!f(this, Pl)) throw new gh("Concrete remote origin not set");
                return "null" === f(this, Pl) && f(this, kl).includes("*")
                  ? "*"
                  : f(this, Pl);
              }),
              m(this, Gl, () => {
                var e, t;
                null == (e = f(this, Nl)) ||
                  e.removeEventListener("message", f(this, Kl)),
                  null == (t = f(this, Nl)) || t.close(),
                  y(this, Nl, void 0);
              }),
              m(this, Ul, ({ source: e, origin: t, ports: i, data: n }) => {
                var s, a, r;
                if (
                  e === f(this, Dl) &&
                  (((e) => zl(e) && "penpal" in e)(n) &&
                    (null == (s = f(this, Bl)) ||
                      s.call(
                        this,
                        "Please upgrade the child window to the latest version of Penpal."
                      ),
                      y(this, xl, !0),
                      (n = ((e) => {
                        if ("syn" === e.penpal)
                          return {
                            namespace: Yl,
                            channel: void 0,
                            type: "SYN",
                            participantId: fh,
                          };
                        if ("ack" === e.penpal)
                          return { namespace: Yl, channel: void 0, type: "ACK2" };
                        if ("call" === e.penpal)
                          return {
                            namespace: Yl,
                            channel: void 0,
                            type: "CALL",
                            id: e.id,
                            methodPath: ((t = e.methodName), t.split(".")),
                            args: e.args,
                          };
                        var t;
                        if ("reply" === e.penpal)
                          return "fulfilled" === e.resolution
                            ? {
                              namespace: Yl,
                              channel: void 0,
                              type: "REPLY",
                              callId: e.id,
                              value: e.returnValue,
                            }
                            : c(
                              {
                                namespace: Yl,
                                channel: void 0,
                                type: "REPLY",
                                callId: e.id,
                                isError: !0,
                              },
                              e.returnValueIsError
                                ? {
                                  value: e.returnValue,
                                  isSerializedErrorInstance: !0,
                                }
                                : { value: e.returnValue }
                            );
                        throw yh(e);
                      })(n))),
                    null == (a = f(this, Ol)) ? void 0 : a.call(this, n))
                )
                  if (f(this, Fl).call(this, t)) {
                    if (
                      ($l(n) && (f(this, Gl).call(this), y(this, Pl, t)),
                        Xl(n) && !f(this, xl))
                    ) {
                      if ((y(this, Nl, i[0]), !f(this, Nl)))
                        throw new gh("No port received on ACK2");
                      f(this, Nl).addEventListener("message", f(this, Kl)),
                        f(this, Nl).start();
                    }
                    for (const e of f(this, Rl)) e(n);
                  } else
                    null == (r = f(this, Bl)) ||
                      r.call(
                        this,
                        `Received a message from origin \`${t}\` which did not match allowed origins \`[${f(
                          this,
                          kl
                        ).join(", ")}]\``
                      );
              }),
              m(this, Kl, ({ data: e }) => {
                var t;
                if (null == (t = f(this, Ol)) ? void 0 : t.call(this, e))
                  for (const t of f(this, Rl)) t(e);
              }),
              !e)
          )
            throw new Jl("INVALID_ARGUMENT", "remoteWindow must be defined");
          y(this, Dl, e),
            y(this, kl, (null == t ? void 0 : t.length) ? t : [window.origin]);
        }
      }),
        (Dl = new WeakMap()),
        (kl = new WeakMap()),
        (Bl = new WeakMap()),
        (Ol = new WeakMap()),
        (Pl = new WeakMap()),
        (Rl = new WeakMap()),
        (Nl = new WeakMap()),
        (xl = new WeakMap()),
        (Fl = new WeakMap()),
        (Hl = new WeakMap()),
        (Gl = new WeakMap()),
        (Ul = new WeakMap()),
        (Kl = new WeakMap()),
        Vl),
    Ah = Lh,
    Eh = "notFreeByCover",
    Ch = "notFreeByLeftRight",
    wh = "removePairs",
    bh = "nextLevel",
    Th = "tileSelectChange",
    Mh = "tileRemove",
    Dh = "gameOver",
    kh = "changeBgOn",
    Bh = "changeSoundOn",
    Oh = "comboChange",
    Ph = "scoreChange",
    Rh = "gameStart",
    Nh = "tileShuffle",
    xh = "tileHint",
    Fh = "undoChange",
    Hh = "remoteDoHint",
    Gh = "adOver",
    Uh = "showDcDayCompleteAnim",
    Kh = "showDcMonthCompleteAnim",
    Vh = class e extends Laya.EventDispatcher {
      constructor() {
        super();
      }
      static getInstance() {
        return e._instance || (e._instance = new e()), e._instance;
      }
      init() {
        // 原站父页面通信只用于广告、外层背景及同步通知；独立版无需握手。
        return Promise.resolve();
      }
      get remote() {
        return this._remote;
      }
    },
    Jh = [
      {
        id: "4",
        q: "000,8.20,2,6,8.40,3,5,8.60,2,6,8;100,8.20,2,6,8.40,3,5,8;200,8.21,7.40,3,5,8:YQDQMC4Q4GFQJDFJMMCWGDYDNOMNWWWO",
      },
      {
        id: "6",
        q: "000,2,6,8.20,3,5,8.41,3,5,7.60,3,5,8;100,2,6,8.23,5.42,6.60,8;200,2,6,8:VGCVKWOEWWPGCCGPOWOCGETK3Z3ZTO",
      },
    ],
    Wh = [{ id: "testdie", q: "000,2,8;101,6,8:BABAYY" }],
    jh = [
      {
        id: "14v1q1804",
        q: "006,8,A,C.22,6,C,G.40,2,4,6,C,E,G,I.60,2,4,6,8,A,C,E,G,I.82,4,7,B,E,G.A1,4,7,9,B,E,H.C1,5,7,9,B,D,H.E1,3,5,7,B,D,F,H;107,9,B.32,6,C,G.50,3,F,I.65,7,9,B,D.72,G.94,7,B,E.B1,8,A,H.D1,5,7,B,D,H;208,A.66,8,A,C.B9.C1,H.D6,C;309.67,B:JGKA1L71OWB2K2I3E8ZFZZFZA6T7POTBXN6XNC5BVSXJ31SN4I87AL2LS6CWDITJUN7JEGCSOW9LM4B25UI3AVTOX6UU1CM93WPD",
      },
      {
        id: "14v1q1805",
        q: "004,6,8,A,C,E.24,6,8,A,C,E.40,2,4,6,8,A,C,E,G,I.61,3,6,8,A,C,F,H.83,5,7,B,D,F.A3,5,7,9,B,D,F.C1,3,5,7,B,D,F,H.E7,B;107,9,B.14,E.27,B.35,9,D.43,7,B,F.51,9,H.67,B.84,6,C,E.B4,7,B,E.C2,G.D7,B;208,A.36,C.57,B.85,D.C7,B:M51D62OKTNDFXCNNN6DPGHW6EK7828HURMDUVBATJ1AJS7KV4TY8SZTKWBRFAPHWJ1WVJIMOV2M5GGYUEC4XGZHU16A28I",
      },
      {
        id: "14v1q1806",
        q: "002,4,6,8,A,C,E,G.24,6,8,A,C,E.42,4,6,8,A,C,E,G.62,6,8,A,C,G.84,6,8,A,C,E.A0,2,4,6,8,A,C,E,G,I;103,5,7,9,B,D,F.25,7,9,B,D.43,5,7,B,D,F.59.78,A.85,D.98,A.A1,3,5,D,F,H;215,7,9,B,D.35,7,B,D.79.95,9,D.A2,G;316,8,A,C.36,C:H3F6LDLYXUU6TRREZZ63TPNESN9ZX21LGJ2AKYDNM5D47QU3KSDR1HUIM6MTGSLXE84QT9W5JHF2WQQ8A27H39SIPXMR9ZNE",
      },
      {
        id: "14v1q1807",
        q: "000,2,4,6,8,A,C,E,G,I,K.20,2,4,6,8,A,C,E,G,I,K.40,2,6,E,I,K.58,A,C.60,2,6,E,I,K.80,4,6,8,A,C,E,G,K.A4,6,A,E,G;103,H.10,5,7,9,B,D,F,K.23,H.30,6,E,K.57,9,B,D.61,J.76,E.89,B.94,6,E,G;213,8,A,C,H.20,6,E,K.58,A,C.86,A,E:NBVGQDDLFJAH7Y9P9Y7B8CE1LVYUPQGUK5297143QTMSRAWVJS8HM5F2BVBQCU2T3KWS5J8NFC42U5ETEE9FCSTJR1A8A7Y1",
      },
      {
        id: "14v1q1808",
        q: "007,9,B.20,3,9,F,I.40,3,5,7,9,B,D,F,I.60,2,5,7,9,B,D,G,I.80,2,5,7,9,B,D,G,I.A0,2,5,7,9,B,D,G,I.C0,2,4,7,9,B,E,G,I;108,A.30,9,I.44,E.56,8,A,C.61,H.76,C.88,A.90,2,5,D,G,I.B7,9,B.C1,3,F,H;209.49.66,C.89.91,H.B8,A.C2,G:RL9K95BLWCOPRPX5MVQO2R3CAGXVEC323DFCOANBYGF21IT4EUNANVUUYTEQFLLBE6RF9OVID5YGWN125M34G96WYKBUWA",
      },
      {
        id: "14v1q1809",
        q: "000,K.16,E.20,2,4,G,I,K.36,8,A,C,E.40,2,4,G,I,K.56,8,A,C,E.60,2,4,G,I,K.76,A,E.80,4,G,K.96,8,A,C,E.B6,A,E;110,K.26,E.30,3,H,K.46,8,A,C,E.51,3,H,J.66,A,E.70,K.85,F.97,9,B,D;220,K.36,E.49,B.52,6,E,I.98,A,C;346,E.99,B:1JS8PT1DXAYRRYG42Y4LEPLLP7978BW68XHQ65KYGD2TB2AB6F4WIKHGE94TL1JQXZPDEUT81A5UQDS6XIKZKGFQB2AE",
      },
      {
        id: "14v1q1810",
        q: "000,2,4,6,8,C,E,G,I,K.20,2,6,A,E,I,K.40,2,4,6,8,A,C,E,G,I,K.64,6,8,A,C,E,G.8A.93,5,7,D,F,H.AA.B5,7,D,F.CA.D3,5,7,D,F,H;101,3,5,7,D,F,H,J.30,2,A,I,K.47,D.54,A,G.67,D.7A.94,A,G.A6,E.BA.C5,7,D,F;202,4,6,E,G,I.31,J.4A.57,D.8A.AA.B6,E:QD9NCNARXRYA4VXL53H9SWXZ5T8GIRPPSRW8BQTS19N32DJHJ4IZ2CI2ZGDZ52LTL3Q48J8NDVE6TE11I95GQLE6G1CBSXJY4C3E",
      },
      {
        id: "14v1q1811",
        q: "000,2,4,E,G,I.19.20,2,4,6,C,E,G,I.39.40,2,4,E,G,I.57,9,B.60,2,4,E,G,I.79.80,2,4,6,C,E,G,I.A2,4,6,8,A,C,E,G;101,H.13,F.21,5,9,D,H.33,F.49.50,2,4,E,G,I.69.70,3,F,I.93,5,D,F.A7,9,B;211,H.23,F.39.51,3,9,F,H.94,E.A8,A;349.52,G.A9:DL77KXBANRFED4WKGL25BPCXHQ3IAVR3UOR4XXFP3C1R1CI1OVBYD276AFELYNOSBGWG1YNK7QPK23PLSOG5AFEUDY2NHEC6",
      },
      {
        id: "14v1q1812",
        q: "002,4,6,8,A,C,E,G.24,6,8,A,C,E.42,4,6,8,A,C,E,G.60,2,4,6,8,A,C,E,G,I.82,4,8,A,E,G.A2,4,8,A,E,G.C2,G;114,6,9,C,E.34,6,8,A,C,E.55,7,9,B,D.61,3,F,H.78,A.92,4,E,G.A9.B2,G;225,9,D.48,A.56,C.62,8,A,G.93,F;339.57,9,B:OBIM6JJXH96IB2X8623I6A7FVGVB37JK9EUZLYD8114DS51FJF9YZUI718KGMVE48VBHAYELL54E57DDSA4YL9F5XAOX",
      },
      {
        id: "14v1q1813",
        q: "007,9,B.20,5,7,9,B,D,I.40,3,5,7,9,B,D,F,I.60,2,4,7,9,B,E,G,I.80,2,4,6,8,A,C,E,G,I.A0,2,4,8,A,E,G,I.C2,8,A,G.E6,8,A,C;117,9,B.30,5,7,9,B,D,I.54,E.61,8,A,H.73,F.90,2,4,8,A,E,G,I.B2,8,A,G.D9.E7,B;218,A.36,8,A,C.69.83,F.99.A2,G.B9:2X1Q4PQO9PVZNORNKSD69Z5FSMVR2RQAHAK976N814THRWL8XOYBAV4T8W149M256KDQYPB81XZW2OA5ZXN7F3LSK5DYS6V3PWDY",
      },
      {
        id: "14v1q1814",
        q: "002,8,A,G.20,2,4,6,8,A,C,E,G,I.40,4,7,9,B,E,I.60,2,4,6,9,C,E,G,I.82,4,9,E,G.A0,2,4,7,9,B,E,G,I.C0,2,4,9,E,G,I;109.21,3,5,7,9,B,D,F,H.48,A.50,4,E,I.72,4,9,E,G.92,4,E,G.A8,A.B3,F.C1,H;219.22,4,6,C,E,G.38,A.64,E.93,F.A9;323,5,D,F:REQGGA3KMMK3WRBHU36UF6XY9CLSB7KCWQE4TPTFQE62ENJ29NMNL59WST6NYWX3UUB7MP4KCATYQ5AHFC47YRL7J4GRGABFL229",
      },
      {
        id: "14v1q1815",
        q: "004,6,8,C,E,G.20,2,4,6,8,A,C,E,G,I,K.40,2,4,6,8,A,C,E,G,I,K.60,2,4,6,A,E,G,I,K.82,4,8,A,C,G,I.A6,8,A,C,E.C4,6,8,C,E,G;105,7,D,F.27,D.31,4,A,G,J.47,D.55,A,F.61,3,H,J.7A.83,H.98,A,C.B7,D.C5,F;206,E.37,D.4A.62,A,I.8A:3TXZT1U3OACCAO3LZE9AZQPPLUQHVLSMJIUZSDHHNWBNXVID14PBK7JWNAN7D6J9WI1M6KDHXJLEUY1VIKB8VK834BPYWX",
      },
      {
        id: "14v1q1816",
        q: "008,A.10,2,4,6,C,E,G,I.28,A.30,2,6,C,G,I.48,A.50,2,4,6,C,E,G,I.68,A.70,2,4,E,G,I.92,4,6,8,A,C,E,G;118,A.20,2,6,C,G,I.38,A.40,2,6,C,G,I.59.60,2,4,E,G,I.83,F.95,7,9,B,D;219.21,H.37,B.41,9,H.61,H.73,F.96,8,A,C;331,H.51,H.97,B:II72UCQLVDTU2L9L2UQ6H5FGU8GPT1M7HJAVBZ681CWF9YAWS1JSZY4EJQG779VRXN5PD25PFFEQGMRLV519W4HJXNRHWBPR",
      },
      {
        id: "14v1q1817",
        q: "002,4,6,8,A,C,E,G,I.22,4,6,8,A,C,E,G,I.40,2,4,6,8,A,C,E,G,I,K.62,4,6,8,A,C,E,G,I.88,A,C.91,5,F,J.B1,3,5,7,9,B,D,F,H,J;103,H.15,7,A,D,F.33,5,8,A,C,F,H.41,J.53,5,A,F,H.67,D.7A.A1,5,F,J.B8,A,C;216,E.34,9,B,G.42,I.54,G.B9,B:XCL5L42MD9RD737K1OYRJFAAFHUMU5TYJ3PPHIK6O3Q1G2GFTDKUY98DSV98VLGY12UXLO94MV51CCSZXSV5IMF3K2ZSXC6OQG",
      },
      {
        id: "14v1q1604",
        q: "001,3,D,F.21,5,7,9,B,F.41,3,5,7,9,B,D,F.60,2,4,7,9,C,E,G.80,2,4,6,8,A,C,E,G.A0,2,4,6,8,A,C,E,G.C6,8,A.E6,A;102,E.28.31,6,A,F.48.51,3,D,F.70,8,G.83,D.90,6,8,A,G.A3,D.C7,9;237,9.41,F.80,8,G.93,D:TTHQAP28JI5MV51TZ791UKKHO8L58JPPUZ97FMFZFJVWS6CQSTISZ7W2LF2IWO3A58JCPHX267QKHIXWQS3K",
      },
      {
        id: "14v1q1605",
        q: "006,8,A,C.22,4,6,8,A,C,E,G.46,8,A,C.52,4,E,G.66,8,A,C.70,2,4,E,G,I.86,8,A,C.92,G.A4,6,8,A,C,E.B2,G.C6,C;109.17,B.23,5,9,D,F.47,9,B.62,4,9,E,G.76,C.82,G.96,8,A,C.A2,G.B6,C;219.24,E.48,A.72,G.86,C.92,9,G.A6,C:H7N275A6PR75O5HPPB528IHRFDVR1ALRAND931166GZVEZI18V3HV69LKYFEDG3B7KTWDYLYOTTPBFWTYZ3AFBZL",
      },
      {
        id: "14v1q1606",
        q: "001,3,5,7,9,B,D,F,H.21,3,F,H.36,8,A,C.41,H.54,6,8,A,C,E.74,6,8,A,C,E.90,2,4,6,8,A,C,E,G,I;102,4,6,8,A,C,E,G.22,G.37,B.49.65,8,A,D.89.91,3,5,7,B,D,F,H;203,5,7,9,B,D,F.59.79.92,4,6,C,E,G:LOAVH3I5TUD1WU9GK7P5SXXVRTWI3YXFORF1HNN9PT9LOWSAD7RU1T579SFCK5WGVUD1PDKKS7PRXFYVOC",
      },
      {
        id: "14v1q1607",
        q: "004,6,8,A,C.20,6,8,A,G.40,4,6,8,A,C,G.60,2,4,6,8,A,C,E,G.80,2,4,6,8,A,C,E,G.A0,2,E,G;105,7,9,B.27,9.30,G.50,4,7,9,C,G.70,3,6,8,A,D,G.90,2,E,G;206,8,A.28.40,G.60,7,9,G.80,G;307,9.50,G.70,G:ABNMQJ5YDTL4BRJ1IKIFCC8WPBYTIWF8NLP3NSCJRA82SKFIMTQV8MRYKF3BTU1ACNUA52JYKSDRV1M41S",
      },
      {
        id: "14v1q1608",
        q: "002,4,6,8,A,C,E,G.22,4,6,8,A,C,E,G.40,2,6,8,A,C,G,I.60,2,4,8,A,E,G,I.82,4,9,E,G.A4,6,C,E;103,5,7,B,D,F.19.23,5,D,F.37,9,B.41,H.58,A.61,3,F,H.79.94,E;204,6,C,E.24,9,E.48,A.51,H.69;305,D.39.59:T1JMIIJXLWFM1I8Q92O1IJ7UD73LORVNEOWDVYPSP2NTJ13FUUWVLW8U9QLQ7937NXDYQPXD3XNOR9VSPE",
      },
      {
        id: "14v1q1609",
        q: "003,5,7,9,B.21,3,7,B,D.40,2,7,C,E.60,2,5,7,9,C,E.80,2,4,6,8,A,C,E.A0,2,4,6,8,A,C,E.C0,2,4,6,8,A,C,E;104,6,8,A.31,7,D.57.61,D.75,9.81,7,D.94,A.A1,7,D.B3,B.C1,5,7,9,D;205,7,9.47.71,D.91,7,D.B1,D:6U1JX94PKKRYIFM2IQP7NEZZ3WB8CUNJF1BB5V6J35ZFJ7PV87MXYQUC7PNI6IXBREZNX6WU2MRKRYFK4Y9M",
      },
      {
        id: "14v1q1610",
        q: "004,E.22,4,7,B,E,G.40,2,4,7,9,B,E,G,I.60,2,4,7,9,B,E,G,I.82,4,7,9,B,E,G.A0,4,7,9,B,E,I.C0,2,4,9,E,G,I;114,E.32,4,E,G.48,A.50,2,4,E,G,I.73,7,9,B,F.94,7,9,B,E.B0,4,9,E,I;224,E.42,4,9,E,G.63,F.88,A.A4,9,E:ZIVA6FQYWOEKYZJJQ9HIWPG4H8NY1KOH5CJ1R3K5HP2BVLBE9IQYVW8EJKQVZ1AZC3B2IG4RGAE665363GWBFLA51N",
      },
    ],
    qh = [
      {
        id: "15v6q892",
        q: "000,2,4,6,8,A.20,2,8,A.34,6.40,2,8,A.54,6.60,2,8,A.74,6.80,2,8,A.94,6.A0,2,8,A.B4,6;101,3,7,9.30,2,8,A.44,6.50,2,8,A.64,6.70,2,8,A.84,6.90,2,8,A.A4,6;202,8.31,9.54,6.60,2,8,A.74,6.80,2,8,A.94,6;371,3,7,9:12345667357829ABC6DEC7FGDH3AFG5IHI6BJKLMCZ9KOPZJPHQ8C7HOR8Z2D38ELKSS49KZI21QBD95IREBEM",
      },
      {
        id: "15v6q893",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.82,4,6,8.A0,2,4,6,8,A.C0,2,4,6,8,A;110,2,4,6,8,A.30,2,4,6,8,A.54,6.61,9.73,7.93,7.A1,9.B4,6.C1,9;211,3,7,9.31,3,7,9.83,7.B1,9;321,3,7,9:123456789ABCD99EFCZD97HCIJE1EAK41LFMK3NILI58O3COMN2PIZPPQRKRBKL3SSQE2Z2ZJTRRH6T1LP",
      },
      {
        id: "15v6q894",
        q: "004,6.G0,2,8,A.20,2,4,6,8,A.42,4,6,8.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C0,2,4,6,8,A.E0,2,4,6,8,A;1G1,9.14,6.21,9.33,7.53,7.61,9.73,7.90,3,7,A.C1,3,7,9.E1,3,7,9;243,7.63,7.83,7.C2,8.E2,8;353,7.73,7.D2,8:12LHJ134516728958ABCDCEEC9FGHE4FICAJJIBFK8L6KFSDH4I3MNO9E2PQMNJQ27RH9OQ341OOG8R3PTQTGGIS",
      },
      {
        id: "15v6q895",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A2,4,6,8;110,2,4,6,8,A.30,2,4,6,8,A.50,2,4,6,8,A.70,2,4,6,8,A.92,4,6,8;220,2,4,6,8,A.40,2,4,6,8,A.61,3,7,9.83,7;331,3,7,9.51,3,7,9.73,7:Z234Z567489AB3CZD8E8FD7GHCFIJHDA5KAKBLDMIELNOPM62KNAQ69KFGGOJFI8E6MHREPMSRLZCLICQGOOJTTJSH",
      },
      {
        id: "15v6q896",
        q: "001,3,5,7,9,B.21,3,5,7,9,B.41,3,5,7,9,B.61,3,5,7,9,B.80,2,4,8,A,C.A0,2,4,8,A,C.C0,4,8,C;102,4,8,A.32,4,8,A.52,4,8,A.72,4,8,A.90,2,4,8,A,C.B0,4,8,C;203,9.42,4,8,A.63,9.83,9.91,B.A4,8;343,9.73,9:12Z4567879AB8CDDCE4FEGGFFHHIJJKLMNO55EIKHOBP9QORLFQANMLGGR1LSSJ2Z2THE52SSUV6UJTV77OP",
      },
      {
        id: "15v6q897",
        q: "000,2,4,6,8,A.G0,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A2,4,6,8.C2,4,6,8.E0,2,8,A;110,2,4,6,8,A.31,3,7,9.51,3,7,9.70,3,7,A.92,4,6,8.B2,4,6,8.D2,8.F0,A;222,8.42,8.63,7.93,7.B3,7;332,8.A3,7:12Z4561E7899AB4CD7AEEA8BCFGHAI9JKDDKLCZ9MLNOP4QJNR2CDFRHR4LJ1JGZ56NSZ5OPPMLOSIT5OQTEN1RP",
      },
      {
        id: "15v6q898",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C0,A;111,3,7,9.30,2,4,6,8,A.50,2,4,6,8,A.74,6.81,9.94,6.A1,9;222,8.40,2,4,6,8,A.64,6.84,6.91,9;341,3,7,9.74,6:12344Z6617898ABCDAEFA1G7AHZ6IJ4ZKFZ3LKMMJNOOCDKLH6EP4QBG8Q2BIJRK98L2N2R1RPBSLJSMRM",
      },
      {
        id: "15v6q899",
        q: "000,2,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C0,2,4,6,8,A;110,2,8,A.30,2,4,6,8,A.50,2,4,6,8,A.70,A.83,7.A1,3,7,9.C1,3,7,9;220,A.33,7.40,A.53,7.60,A.A2,8.C2,8;330,A.43,7.50,A.B2,8:1234567893ABCZ97EFGC5HEICJ5KL41BMLZJCGF4ZN1OPM43J3P56GJKOOLFANEQ8GINQR1882NPFQZPHEHHQLAROA",
      },
      {
        id: "15v6q900",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,8,A.C2,4,6,8;110,2,4,6,8,A.30,2,4,6,8,A.50,A.63,7.70,A.83,7.90,A.B2,8;211,3,7,9.31,3,7,9.60,A.73,7.80,A;321,3,7,9.70,A:123245678489A7BCADE93F6G59F29H6ZJKL818MHEG2AD6FHN51FZCAOPBONKQ5KLDPLR3KMLDHRZQJ1Z3",
      },
      {
        id: "15v6q901",
        q: "004,6.G0,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.64,6.80,2,4,6,8,A.A0,2,4,6,8,A.C0,2,4,6,8,A.E0,2,4,6,8,A;114,6.30,3,7,A.54,6.74,6.90,2,4,6,8,A.B1,9.C3,7.D1,9.F1,3,7,9;264,6.84,6.91,9.C1,9.E1,9;374,6.D1,9:12PKMNOE345678719Z5B5CCDEF48FDG2816HIJKZLJMNOGIDD3Q7QIJ922L87JLRQI3HLKSPTKR5UBQUBT3SB1",
      },
      {
        id: "15v6q902",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.82,4,6,8.A2,4,6,8.C0,2,4,6,8,A;110,2,4,6,8,A.31,3,7,9.51,4,6,9.72,4,6,8.92,4,6,8.B2,4,6,8;213,7.21,9.41,9.64,6.83,7.A2,4,6,8;331,9.93,7:123415436789ABA89C7B12D4E5FGHIFJ8IFFK8LDMC4IHZOK6OKP1GEDQQDQIP79ARSJMLTQKSRLLT9A7Z",
      },
      {
        id: "15v6q903",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C0,2,8,A;101,3,7,9.21,3,7,9.43,7.50,A.63,7.71,9.83,7.91,9.A3,7.B1,9;211,3,7,9.33,7.53,7.73,7.81,9.93,7.A1,9;312,8.43,7.63,7.82,8:1234565789ABC2DE8FGH76HIJKLLKJ221H5G6A7FD6KMJ91NGMAO5BP13OJ4EQQCPBFZ4SDO4NDSGOPPF7HZIKBA",
      },
      {
        id: "15v6q904",
        q: "002,4,6,8.20,2,8,A.40,2,4,6,8,A.60,2,8,A.74,6.80,2,8,A.A0,2,4,6,8,A.C0,2,4,6,8,A.E0,2,8,A;103,7.21,9.50,2,8,A.70,2,8,A.90,2,8,A.B0,2,4,6,8,A.D0,2,8,A;261,9.81,9.A1,9.C0,2,8,A;371,9.91,9.B1,9:12324456789ABCDE2C2F5GHD3HBDEI6JFA8EKLK4ZKKBLNGH8JO363NNP9D8EC4QPIQQHFC1OB7FZG6NQG",
      },
      {
        id: "15v6q905",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C4,6;110,2,4,6,8,A.30,2,4,6,8,A.50,2,4,6,8,A.70,2,4,6,8,A.90,2,4,6,8,A.B4,6;213,7.21,9.33,7.41,9.53,7.61,9.80,2,4,6,8,A.A4,6:123Z567891ABC28DZEEC9CC6F57215GHIAJEBKL6MNLBE5MIOOG7MKNF3JPD6PQOH2NNLM7R8QSJQJSTQT8SBL1SRO",
      },
      {
        id: "15v6q906",
        q: "000,2,4,8,A,C.20,2,A,C.35,7.40,C.53,5,7,9.60,C.73,5,7,9.91,3,5,7,9,B.B1,3,5,7,9,B.D3,5,7,9;101,3,9,B.21,B.45,7.50,C.63,5,7,9.83,5,7,9.A1,3,5,7,9,B.C3,5,7,9;211,B.55,7.74,8.94,8.A2,A.B4,8;384,8.A3,9:123456789ABCDE15ABFGH98BIJAKKJLIHLM6NL7NOPGG67OFLZBRRG2S41PEMA57Z6S5PKS3TTMK1CDOSMOP",
      },
      {
        id: "15v6q907",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C0,A;111,3,7,9.31,3,7,9.50,2,4,6,8,A.70,2,4,6,8,A.90,3,7,A.B0,A;212,8.32,8.53,7.60,A.73,7.80,A.A0,A;322,8.63,7.70,A.90,A:12343567Z9A9BCDEFAG44DEHIJGJH913ZAFKLAMZNOPQOZ7R47CNR2ICK96SSCQ37LH6BTP6NFF5TMIQHILQLN",
      },
      {
        id: "15v6q908",
        q: "000,A.20,4,6,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A2,4,6,8.C0,2,4,6,8,A.E4,6;110,A.30,4,6,A.50,2,4,6,8,A.71,3,7,9.93,7.B2,4,6,8.D4,6;220,A.40,4,6,A.61,3,7,9.83,7.A3,7.C4,6;330,A.62,8.93,7:123422563789ABBA5CD6EFG8CHCIGJKL4MJJNM7OP1ZZEFNHIGJNL8MCN8RRFE9ZOSGSDKTDTEZPDOM2FO",
      },
      {
        id: "15v6q909",
        q: "002,8.20,2,4,6,8,A.40,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C0,2,4,6,8,A.E2,8;112,8.30,A.50,A.70,2,4,6,8,A.90,2,4,6,8,A.B0,2,4,6,8,A.D2,8;240,A.60,A.80,2,4,6,8,A.A0,2,4,6,8,A.C2,8;350,A.81,3,7,9.A1,3,7,9:1233456726Z394AZBCAD46EDAAFD7B945GH9IJKELMEDNGHBKFCOPBQ2OPILM277GRSREK91K63INTS151TJLLIGQ5",
      },
      {
        id: "15v6q910",
        q: "000,2,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C0,2,4,6,8,A;101,9.21,3,7,9.41,3,7,9.61,3,7,9.81,3,7,9.B0,3,7,A;211,9.31,3,7,9.51,3,7,9.71,3,7,9;321,9.42,8.62,8:12314567869AAB21CB46D54DA8EF9GHIIBJEK9FLC51MNO8PQ7AE54KN6BR9RJQI3SLIJHPSMOJG8GCEGC",
      },
      {
        id: "15v6q911",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,8,A.C2,8;101,3,7,9.21,3,7,9.50,2,4,6,8,A.70,2,4,6,8,A.90,2,8,A.B2,8;202,8.22,8.60,2,4,6,8,A.80,2,8,A.A2,8;312,8.61,3,7,9.81,9:Z23456789ABC3DEA9FGD4EH6G584IJG2KJ7B8L55HM8ZNIHKA43C7GO2MZFOPAQQLRSNS2HZTQOQC3SOTRS7CP",
      },
      {
        id: "15v6q912",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.82,4,6,8.A2,4,6,8.C4,6;110,2,4,6,8,A.30,2,4,6,8,A.50,2,4,6,8,A.72,4,6,8.92,4,6,8.B4,6;211,9.23,7.31,9.43,7.51,9.63,7.83,7.A4,6;321,9.33,7.41,9.53,7.73,7:Z2345678294AB2CDEFGHCDE4I7FJZIDBEKA3LMNOP295ZKLML8HQL53AARJJ5I6SIGORDNP34OOGTSBGZETJQUBU",
      },
      {
        id: "15v6q913",
        q: "000,A.G4,6.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C0,2,4,6,8,A.E2,4,6,8;121,9.34,6.41,9.61,3,7,9.81,3,7,9.B0,2,4,6,8,A.D2,4,6,8.F4,6;231,9.62,8.82,8.B1,3,7,9.D3,7;372,8.B2,8:12ON345678393A1BCDE9AZCC47DG5HIIJKH34ELAGM6NNO2GL7CPZB6QMRL7J1LQ4RKQG8BQSP1BA88S6JNOJO",
      },
      {
        id: "15v6q914",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,4,6,A.C2,4,6,8;101,3,7,9.21,3,7,9.41,3,7,9.70,2,4,6,8,A.90,4,6,A.B4,6;211,3,7,9.31,3,7,9.71,3,7,9.A4,6;321,3,7,9.72,8:123456789186ABCDEF67848GH7Z3BGJFZJKLHMCHBHDA2N2N6NFJOB52P5QKAROJN5EQFRA4L7P4Q1QM19",
      },
      {
        id: "15v6q915",
        q: "000,2,4,6.G2,4.20,2,4,6.40,2,4,6.60,2,4,6.80,2,4,6.A2,4.C2,4.E0,2,4,6;110,2,4,6.30,2,4,6.50,2,4,6.70,2,4,6.92,4.B2,4.D2,4.F2,4;220,2,4,6.40,2,4,6.60,2,4,6.82,4.A2,4.C2,4.E2,4;330,2,4,6.50,2,4,6.72,4.92,4.B2,4.D2,4:12342Z45ZZ7899ABCDE72FAZG2HI5JIK71FD5817K5LMAMNGOAMFPQOBQPE43CHGPIP4HFLIENQG1RHEOSMDQOJSDR",
      },
      {
        id: "15v6q916",
        q: "000,2,4,6,8,A.G0,2,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.82,4,6,8.A0,2,4,6,8,A.C0,2,4,6,8,A.E0,A;111,4,6,9.30,2,4,6,8,A.51,4,6,9.83,7.B0,2,4,6,8,A.D0,A.F0,A;221,9.33,7.41,9.B1,3,7,9.E0,A;332,8.B2,8:123454NNO86789ABC2D54E3FG3HIJZL1B3EDBMA9EJJEG7CP7HIZF46DQPRPRNR7ZGDCCPS1SM5BTQNLRT1GJ5ZO",
      },
      {
        id: "15v6q917",
        q: "001,3,9,B.21,3,5,7,9,B.41,3,5,7,9,B.61,3,5,7,9,B.83,5,7,9.90,C.B0,2,4,8,A,C.D0,2,4,8,A,C;111,3,9,B.31,3,5,7,9,B.51,3,5,7,9,B.73,5,7,9.A0,C.C1,3,9,B;222,A.42,4,8,A.63,5,7,9.C2,A;332,A.53,9:12314345567849ABC75365DC7AEFGHBI3JGK9LLH1C7MN6O26N2C8JKNFP2IQQMO4QRRMNEM1FPQRFSRSD",
      },
      {
        id: "15v6q918",
        q: "003,5,7,9.23,5,7,9.30,C.45,7.50,2,A,C.65,7.70,2,A,C.90,2,4,8,A,C.B0,2,4,8,A,C.D0,2,4,8,A,C;104,8.24,8.40,C.55,7.60,2,A,C.80,2,A,C.A1,3,9,B.C0,2,4,8,A,C;214,8.61,B.81,B.A2,A.C1,3,9,B;371,B.B2,A:1234556784459ABBCZE92B9FGH1IF9GG5JK2LHII7ZMCZ73M6GL1JANOIKCPOFH2C8884NMEB7MPZ1QFHQ",
      },
      {
        id: "15v6q919",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,4,6,A.C0,4,6,A;110,3,7,A.30,2,4,6,8,A.51,4,6,9.71,4,6,9.90,4,6,A.B0,4,6,A;220,3,7,A.41,4,6,9.61,4,6,9.84,6.A0,4,6,A;351,4,6,9.74,6.94,6:12ZZ145678874197AB2CA6C4DE1FG9HBGIJGEK47LJEIFMHGFN2OI9EO5PMKNN2DQQ5LIZRJ9R5PQJRKKDCCQFDZNR",
      },
      {
        id: "15v6q920",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,8,A.C2,8;101,3,7,9.21,3,7,9.50,2,4,6,8,A.70,2,4,6,8,A.90,2,8,A.B2,8;202,8.22,8.53,7.61,9.73,7.81,9.A2,8;312,8.63,7.71,9:123456789A9BCDDDE31A2831FE5G4FG59H9HZBJJK4B5LHZ4DZ3ZE1GMMGL77N6CJEB6NO7NLO6FFNHJKL",
      },
      {
        id: "15v6q921",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A;110,2,4,6,8,A.30,2,4,6,8,A.50,2,4,6,8,A.70,2,4,6,8,A.90,2,4,6,8,A;211,3,7,9.41,3,7,9.61,3,7,9.81,3,7,9:12Z45267789Z48ABCD2EFAB9DGC7AH4IG7JEKLM9KNOJG9I2MPHFA54PPCCKO6JKPJH1QRSTLTTQGSHRNT",
      },
      {
        id: "15v6q922",
        q: "004,6.10,2,8,A.24,6.30,2,8,A.44,6.50,2,8,A.64,6.70,2,8,A.84,6.92,8.A4,6.B0,2,8,A.C4,6;111,3,7,9.34,6.40,2,8,A.54,6.60,2,8,A.74,6.82,8.94,6.A2,8.B4,6;212,8.41,3,7,9.61,3,7,9.83,7.A3,7;342,8.62,8.93,7:1234356789ABC7DE94FG1FAHEEE3GIA617JF12K9IHB4HA53I5H5CIDFD4LML2MGBBMMNDZZJNG27P8KP9",
      },
      {
        id: "15v6q923",
        q: "000,2,4,8,A,C.G1,3,5,7,9,B.20,2,4,8,A,C.43,5,7,9.63,5,7,9.81,3,5,7,9,B.A3,5,7,9.C3,5,7,9.E1,3,5,7,9,B;101,B.14,8.21,B.34,8.53,5,7,9.82,4,8,A.B3,5,7,9.D4,8.F2,4,8,A;211,B.24,8.54,8.83,9.C4,8.E4,8:123425B9MOA761748769ABCD6EBFAGHIGJKLMNDA5FOE1PQHD3MRS1HHIS4N8CZ67IZBLJMRP8P3PDI4KQ38",
      },
      {
        id: "15v6q924",
        q: "000,6.G2,4.20,2,4,6.40,2,4,6.60,2,4,6.80,2,4,6.A0,2,4,6.C0,2,4,6.E0,2,4,6;110,6.30,2,4,6.50,2,4,6.70,2,4,6.90,2,4,6.B0,2,4,6.D0,2,4,6.F2,4;220,6.40,2,4,6.60,2,4,6.80,2,4,6.A0,2,4,6.C0,2,4,6.E2,4:12BJ3456789A259B1CDZAC6FGHF8IF1FAKLAM8GGMZ7H1NOPQ8J4PLCQR3ROZ22SDQLNJIBCJZOGQOKLSTBT",
      },
      {
        id: "15v6q925",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.82,4,6,8.A0,2,4,6,8,A.C0,2,4,6,8,A;101,3,7,9.31,4,6,9.50,2,4,6,8,A.73,7.92,4,6,8.B0,2,4,6,8,A;202,8.51,3,7,9.83,7.A3,7.B1,9;352,8.93,7:123425467839ABCDEF9FFEDF9577GDHI8JKA4H27LMNNLINOPIB5CDB45Q8IL8GOPB1CM2J9KN11CL6Q33",
      },
      {
        id: "15v6q926",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A;101,9.14,6.21,9.34,6.41,9.54,6.70,2,4,6,8,A.90,2,4,6,8,A;211,9.24,6.31,9.44,6.64,6.80,2,4,6,8,A;321,9.34,6.54,6.74,6.81,9:12213456789AZCDEAEFGD9HIJKZCL52MN8E43MOI2HPPP7NO4NELKLQR5SG5FNJTL6SRPTKM4ZUQIUGTITMKGZ",
      },
      {
        id: "15v6q927",
        q: "001,3,5,7,9,B.21,3,5,7,9,B.43,5,7,9.61,3,5,7,9,B.83,5,7,9.90,C.A3,5,7,9.B0,C.C3,5,7,9.D0,C.F0,2,4,8,A,C;111,3,5,7,9,B.44,8.62,4,8,A.94,8.A0,C.B4,8.C0,C.F1,3,9,B;212,4,8,A.54,8.A4,8.B0,C.F2,A:123454623578972AAZ7CDEEFGH5IJG1Z1KA3LMIKJDN68O4PIH43MFAFZNQCPLN2159QIRRRNOZMFM7RLL",
      },
      {
        id: "15v6q928",
        q: "000,6.20,2,4,6.40,2,4,6.60,2,4,6.80,2,4,6.A0,2,4,6.C0,2,4,6.E0,2,4,6;110,6.30,2,4,6.50,2,4,6.70,2,4,6.90,2,4,6.B1,5.D0,2,4,6;220,6.40,2,4,6.60,2,4,6.80,2,4,6.A1,5.C1,5;330,6.51,5.70,2,4,6.91,5.B1,5:12345645Z89Z3AABCDE4DF8GHG1F1HIIJ64CB921KL2MKLKHNNGOPQFG2JKEEMROSENRNPOMHFMPOSRQPRTT",
      },
      {
        id: "15v6q929",
        q: "005,7.10,2,A,C.25,7.30,2,A,C.45,7.61,3,5,7,9,B.81,3,5,7,9,B.A1,3,5,7,9,B.C3,5,7,9;111,5,7,B.31,5,7,B.55,7.71,3,5,7,9,B.91,3,5,7,9,B.B3,5,7,9;221,5,7,B.45,7.65,7.81,3,5,7,9,B.A3,5,7,9;335,7.55,7.75,7.93,5,7,9:12324567839A2BCD4BE69F7GH8I847JG5K7ZM9DA8ZGZG3NJOEOIPNF3P9QC4RISJN1ENMRQJ2MOIMECOKQ1S1CZHQ",
      },
      {
        id: "15v6q930",
        q: "000,2,4,6,8,A.20,2,8,A.34,6.40,2,8,A.54,6.60,2,8,A.74,6.80,2,8,A.94,6.A0,2,8,A.C0,2,4,6,8,A.E0,2,4,6,8,A;101,3,7,9.21,9.33,7.41,9.53,7.71,3,7,9.93,7.A1,9.C1,9.D4,6.E1,9;202,8.31,9.43,7.63,7.83,7.B1,9.D1,9:12345678299ABCDECAFG1HIGJKKL3MNB6OB94NKMO5N9I2AHP6QHDMHNR6S27MQBPLQ8S5R1DQF5IAFI1DJEFK",
      },
      {
        id: "15v6q931",
        q: "000,2,8,A.20,2,8,A.40,2,8,A.60,2,4,6,8,A.80,4,6,A.A0,2,4,6,8,A.C0,2,4,6,8,A;110,2,8,A.30,2,8,A.50,2,8,A.70,4,6,A.90,4,6,A.B0,2,4,6,8,A;211,9.31,9.51,9.80,4,6,A.A0,4,6,A;321,9.41,9.90,4,6,A:112234567894ABCDBE8F7G8BHC368EH69IJ4K7LMZ21ILOJPOQD5AQ94B91GPPFRSAZTA2MTT7SZK6ZTRP",
      },
      {
        id: "15v6q932",
        q: "000,A.20,2,4,6,8,A.40,2,4,6,8,A.60,4,6,A.80,2,4,6,8,A.A0,4,6,A.C0,2,4,6,8,A;110,A.30,2,4,6,8,A.50,4,6,A.70,4,6,A.90,4,6,A.B0,4,6,A;231,3,7,9.60,4,6,A.80,4,6,A.A0,4,6,A;332,8.70,4,6,A.90,4,6,A:123456788596ABC8A9BD4E3DD29EFG17B3HIBCJKL3AFMLNOLDZQKFRLQJMNGA9S8S1S1RESZTTOH22EIUUF",
      },
      {
        id: "15v6q933",
        q: "002,4,6,8.G0,2,4,6,8,A.22,4,6,8.40,2,4,6,8,A.60,2,4,6,8,A.82,4,6,8.A0,2,4,6,8,A.C2,4,6,8.E0,2,4,6,8,A;1G1,3,7,9.13,7.33,7.41,9.53,7.61,9.73,7.93,7.A1,9.C3,7.E1,3,7,9;223,7.52,8.83,7.D3,7.F1,3,7,9;3E3,7:12343MN8LG56517896ABC472AB9DEZ496GHIJKZE5HDL84OIGP7OIPQ9GNM3O6MNIRPN7K53PRSJQTCM8ROTSR",
      },
      {
        id: "15v6q934",
        q: "002,4,6,8.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.84,6.90,2,8,A.B0,2,4,6,8,A.D0,2,4,6,8,A.F0,2,4,6,8,A;103,7.23,7.30,A.43,7.50,A.63,7.A0,2,8,A.C1,3,7,9.E1,3,7,9;213,7.33,7.40,A.53,7.B2,8.D1,3,7,9;323,7.43,7.C2,8:12345677258699657A3BC62DE1F5GHB11IGBCJA2K4LLI4C3CIMHKB4J8NLOPAQRFNRPHJQSIHTOJEDTUUTMLTA73S",
      },
      {
        id: "15v6q935",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.62,4,6,8.82,4,6,8.A4,6.C2,4,6,8;110,2,4,6,8,A.30,2,4,6,8,A.52,4,6,8.72,4,6,8.94,6.B4,6;220,2,4,6,8,A.42,4,6,8.62,4,6,8.84,6.A4,6;321,3,7,9.43,7.63,7.94,6:Z234567289A67B89CDEFGH2AIJKLLL9MDZ4CJIDZB3JK2GNINHOP6336PFE5LOPC79JDNMNQOQ7ZPORCIRBB",
      },
      {
        id: "15v6q936",
        q: "000,2,6,8.G1,7.21,3,5,7.41,3,5,7.61,3,5,7.81,3,5,7.A1,3,5,7.C1,3,5,7.E1,7;111,7.31,3,5,7.51,3,5,7.71,3,5,7.91,3,5,7.B1,3,5,7.D1,7.F1,7;232,6.52,6.81,3,5,7.A1,3,5,7.C1,7.E1,7;342,6.82,6.A2,6.D1,7:1234JK56789AB3CDBB9B7EZDAGZE9HI4LC3M89NOJJIO6MHC4GK4GGHO1HPCPEQ5NNPQRNP32EROJILLLI",
      },
      {
        id: "15v6q937",
        q: "004,6.24,6.40,4,6,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C0,2,4,6,8,A.E2,4,6,8;114,6.34,6.50,A.63,7.70,A.83,7.90,A.A3,7.B0,A.C3,7.E3,7;224,6.60,A.73,7.80,A.93,7.A0,A.B3,7.D3,7;370,A.83,7.90,A.A3,7.C3,7:123456789AABC169DEF1GHIB37EZ5IBK1HLCMCNOGPPQARQ8AKMBNRRD2RSTZTZ2LSDOFU2QD4UVVHQZLHCL",
      },
      {
        id: "15v6q938",
        q: "002,4,6,8.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A2,4,6,8.C0,2,4,6,8,A;112,4,6,8.31,9.43,7.51,9.63,7.71,9.83,7.A3,7.C1,3,7,9;213,7.41,9.53,7.61,9.73,7.93,7.B3,7;351,9.63,7.83,7.A3,7:123456278933ABCDE1BFCDG6A481HHCEI6H9JK3L6K5M1J5F487NNGJ8O54PJN7I7OPHLQQNPRFCMPF2R2",
      },
      {
        id: "15v6q939",
        q: "000,2,8,A.G0,2,8,A.20,2,4,6,8,A.42,4,6,8.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C0,2,8,A.E0,2,8,A;101,9.21,3,7,9.43,7.71,3,7,9.91,3,7,9.B0,2,8,A.D0,2,8,A.F0,2,8,A;222,8.82,8.A1,9.C1,9.E1,9:1234E4AF56789AB3CDEFGHIJ437IHK1L6G3M8GNN11MKOPDQODE55277CQQ4ROAKGAEO9DJBKRQ5BLBPSS",
      },
      {
        id: "15v6q940",
        q: "000,4,6,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.82,4,6,8.A0,2,4,6,8,A.C0,2,4,6,8,A.E0,2,4,6,8,A;110,A.23,7.31,9.43,7.51,9.63,7.83,7.A1,3,7,9.C1,9.D4,6.E1,9;233,7.41,9.53,7.73,7.93,7.B1,9.D1,9;342,8.63,7.83,7.C1,9:12345678976A8B2CBDD8EF5G3ZIAJKLMC29F9KNJ8AAMOLB1GE7PI9N7OQRBZ4LMSOQPNRNR3S2TZQMTRZQUSL3SOU",
      },
      {
        id: "15v6q941",
        q: "000,2,4,6,8,A.20,2,4,6,8,A.40,2,4,6,8,A.60,2,4,6,8,A.80,2,4,6,8,A.A0,2,4,6,8,A.C2,8;111,4,6,9.30,2,4,6,8,A.50,2,4,6,8,A.70,2,4,6,8,A.93,7.A1,9;221,4,6,9.40,2,4,6,8,A.60,2,4,6,8,A.83,7:Z234567829AB4789CDE392EEFGH4GI3HJ2KLGMNOIPAD9FZQO4H5RNKRBC6AIMSR3SASZHJQGMZPILESMR",
      },
      {
        id: "15v6q942",
        q: "000,2,4,6.20,2,4,6.40,2,4,6.60,2,4,6.80,2,4,6.A0,2,4,6.C0,2,4,6.E0,6;111,5.30,2,4,6.50,2,4,6.70,2,4,6.90,2,4,6.B0,2,4,6.D0,6;221,5.40,2,4,6.60,2,4,6.80,2,4,6.A0,2,4,6.C0,6;331,5.50,2,4,6.70,2,4,6.90,2,4,6.B0,6:1213456782679AA43B3CDEFAGEF29A7HF3IJ482KEZCMN8DI9GB4ENOGHF1G1P7QOJRH8P9RZMOJNSOCQKCJNMHM5S",
      },
    ];
  function Yh(e) {
    let t = [];
    const [i, n] = e.split(":"),
      s = (function (e) {
        const t = [];
        return (
          e.split(";").forEach((e) => {
            const i = Qh(e[0]);
            e.slice(1)
              .split(".")
              .forEach((e) => {
                const n = Qh(e.slice(0, 1));
                e.slice(1)
                  .split(",")
                  .forEach((e) => {
                    const s = Qh(e);
                    t.push([s, n, i]);
                  });
              });
          }),
          t
        );
      })(i);
    return (t = n.split("").map((e, t) => [...s[t], Qh(e)])), t;
  }
  function zh(e) {
    return 2 === e
      ? function (e) {
        return Yh(e);
      }
      : function (e) {
        return (function (e) {
          const t = [];
          return (
            e
              .split(";")
              .filter((e) => e)
              .forEach((e) => {
                const [i, n] = e.split(","),
                  s = Number.parseInt(i),
                  a = Math.floor(s / 1e4),
                  r = Math.floor((s % 1e4) / 100),
                  o = s % 100;
                t.push([o, r, a, Qh(n)]);
              }),
            t
          );
        })(e);
      };
  }
  function Qh(e) {
    if (/^\d+$/.test(e)) return Number.parseInt(e, 10);
    return e.toUpperCase().charCodeAt(0) - 55;
  }
  var $h = class e extends Laya.Script {
    static getInstance() {
      return e._instance || (e._instance = new e()), e._instance;
    }
    init() {
      this._isMobile = window.innerWidth / window.innerHeight <= I.breakpoint;
    }
    get srcOfSettingDialog() {
      return this._isMobile
        ? "resources/settingDialogMobile.lh"
        : "resources/settingDialog.lh";
    }
    get srcOfRuleDialog() {
      return this._isMobile
        ? "resources/ruleDialogMobile.lh"
        : "resources/ruleDialog.lh";
    }
    get srcOfNoneMatchDialog() {
      return this._isMobile
        ? "resources/noneMatchDialogMobile.lh"
        : "resources/noneMatchDialog.lh";
    }
    get srcOfPlayInfo() {
      return this._isMobile
        ? "resources/playInfoMobile.lh"
        : "resources/playInfo.lh";
    }
    get srcOfIconBtn() {
      return this._isMobile
        ? "resources/iconBtnMobile.lh"
        : "resources/iconBtn.lh";
    }
    get srcOfTrophyCheckDialog() {
      return this._isMobile, "resources/trophyCheck.lh";
    }
    get srcOfTrophyGetDialog() {
      return this._isMobile, "resources/trophyGet.lh";
    }
    get srcOfHomeSpine() {
      return this._isMobile
        ? "spine/home-mobile/Home.skel"
        : "spine/home/HomeUI.skel";
    }
    get srcOfHomeLeafSpine() {
      return this._isMobile
        ? "spine/home-mobile/fx_lizi.skel"
        : "spine/home/fx_lizi.skel";
    }
    get srcOfDc() {
      return this._isMobile ? "resources/dcMobile.lh" : "resources/dc.lh";
    }
    get isMobile() {
      return this._isMobile;
    }
  },
    Zh = {
      0: "cardface_pic_reddragon",
      1: "cardface_pic_greendragon",
      2: "cardface_pic_whitedragon",
      100: "cardface_pic_bamboos_1",
      200: "cardface_pic_bamboos_2",
      300: "cardface_pic_bamboos_3",
      400: "cardface_pic_bamboos_4",
      500: "cardface_pic_bamboos_5",
      600: "cardface_pic_bamboos_6",
      700: "cardface_pic_bamboos_7",
      800: "cardface_pic_bamboos_8",
      900: "cardface_pic_bamboos_9",
      1100: "cardface_pic_characters_1",
      1200: "cardface_pic_characters_2",
      1300: "cardface_pic_characters_3",
      1400: "cardface_pic_characters_4",
      1500: "cardface_pic_characters_5",
      1600: "cardface_pic_characters_6",
      1700: "cardface_pic_characters_7",
      1800: "cardface_pic_characters_8",
      1900: "cardface_pic_characters_9",
      2100: "cardface_pic_dots_1",
      2200: "cardface_pic_dots_2",
      2300: "cardface_pic_dots_3",
      2400: "cardface_pic_dots_4",
      2500: "cardface_pic_dots_5",
      2600: "cardface_pic_dots_6",
      2700: "cardface_pic_dots_7",
      2800: "cardface_pic_dots_8",
      2900: "cardface_pic_dots_9",
      5100: "cardface_pic_south",
      5200: "cardface_pic_east",
      5300: "cardface_pic_north",
      5400: "cardface_pic_west",
    },
    Xh = {
      3e3: "cardface_pic_flowers_1",
      3001: "cardface_pic_flowers_2",
      3002: "cardface_pic_flowers_3",
      3003: "cardface_pic_flowers_4",
      4e3: "cardface_pic_seasons_1",
      4001: "cardface_pic_seasons_2",
      4002: "cardface_pic_seasons_3",
      4003: "cardface_pic_seasons_4",
    },
    ec = class e {
      constructor() {
        this._randomSkinMap = {};
      }
      static getInstance() {
        return e.instance || (e.instance = new e()), e.instance;
      }
      init() { }
      static loadTileTextures() {
        for (const t in Zh) {
          const i = `${e.ASSETS_PATH}/${Zh[t]}.png`;
          Laya.loader.load(i);
        }
        for (const t in Xh) {
          const i = `${e.ASSETS_PATH}/${Xh[t]}.png`;
          Laya.loader.load(i);
        }
      }
      getSkinPath(t) {
        const i = Zh[t] || Xh[t];
        return (
          i || console.error(`Skin ${t} not found`), `${e.ASSETS_PATH}/${i}.png`
        );
      }
      genRandomSkin(e) {
        const t = Object.keys(Zh).map(Number),
          i = e.length;
        this._randomSkinMap = {};
        for (let n = 0; n < i; n++) {
          const i = Math.floor(Math.random() * t.length),
            s = t[i];
          t.splice(i, 1), (this._randomSkinMap[e[n]] = s);
        }
      }
      getSpecialSkin(e) {
        const t = Math.random() < 0.5 ? 3 : 4,
          i = [];
        for (let n = 0; n < e; n++) {
          const e = 1e3 * t + n;
          i.push(e);
        }
        return i;
      }
      get randomSkinMap() {
        return this._randomSkinMap;
      }
    };
  ec.ASSETS_PATH = "atlas/skins/CardFace1";
  var tc = ec,
    ic = class { },
    nc = class {
      constructor() {
        (this.selectedTileIndex = -1), (this.tiles = []);
      }
    },
    sc = class e {
      constructor() {
        this._gameType = "classic";
      }
      static getInstance() {
        return e.instance || (e.instance = new e()), e.instance;
      }
      init() {
        (this._gameSettings = new ic()),
          (this._state = new nc()),
          (this.skinManager = tc.getInstance()),
          (this.levelManager = Bd.getInstance()),
          (this.gameSettings = {
            tileWidth: I.tileWidth,
            tileHeight: I.tileHeight,
            tileStep: I.tileStep,
            scale: I.scale,
            shuffle: I.times.normal.shuffle,
            hint: I.times.normal.hint,
          });
      }
      resetState({
        score: e = 0,
        tiles: t = [],
        hintTimes: i,
        shuffleTimes: n,
      }) {
        "dc" === this.gameType
          ? (this.gameSettings = d(c({}, this.gameSettings), {
            shuffle: I.times.dc.shuffle,
            hint: I.times.dc.hint,
          }))
          : (this.gameSettings = d(c({}, this.gameSettings), {
            shuffle: I.times.normal.shuffle,
            hint: I.times.normal.hint,
          })),
          (this._state = new nc()),
          (this._state.selectedTileIndex = -1),
          (this._state.isDie = !1),
          (this._state.isWin = !1),
          (this._state.undos = []),
          (this._state.combo = 0),
          (this._state.useShuffle = !1),
          (this._state.useRestart = !1),
          (this._state.score = e),
          (this._state.tiles = t),
          (this._state.shuffleTimes =
            void 0 !== n ? n : this._gameSettings.shuffle),
          (this._state.hintTimes = void 0 !== i ? i : this._gameSettings.hint),
          0 === t.length && this.initTiles();
      }
      initTiles() {
        const { positions: e, level: t } = this._levelSettings;
        this.dyeing(e);
        const i = this.skinManager.randomSkinMap;
        let n = e.map((e, t) => {
          const [n, s, a, r] = e;
          return {
            position: [n, s, a],
            type: r,
            texture: i[r],
            status: "unselected",
            index: t,
          };
        });
        (t >= 7 || "dc" === this.gameType) &&
          (n = this.replaceToSpecialSkin(n)),
          (this._state.tiles = n);
      }
      replaceToSpecialSkin(e) {
        const { positions: t } = this._levelSettings,
          i = t.reduce((e, t) => {
            const i = String(t[3]);
            return (e[i] = (e[i] || 0) + 1), e;
          }, {}),
          n = Object.keys(i),
          s = n[Math.floor(Math.random() * n.length)],
          a = i[s],
          r = this.skinManager.getSpecialSkin(a);
        let o = 0;
        return e.map(
          (e) => (e.type === Number(s) && ((e.texture = r[o]), o++), e)
        );
      }
      dyeing(e) {
        const t = [...new Set(e.map((e) => e[3]))];
        this.skinManager.genRandomSkin(t);
      }
      getTileByPosition(e) {
        return this._state.tiles.find(
          (t) =>
            t.position[0] === e[0] &&
            t.position[1] === e[1] &&
            t.position[2] === e[2]
        );
      }
      get state() {
        return this._state;
      }
      set state(e) {
        this._state = e;
      }
      get gameSettings() {
        return this._gameSettings;
      }
      set gameSettings(e) {
        this._gameSettings = e;
      }
      get levelSettings() {
        return this._levelSettings;
      }
      set levelSettings(e) {
        var t;
        null == (t = this._levelSettings) || t.level,
          this.levelManager.currentLevel,
          (this._levelSettings = e);
      }
      get tiles() {
        return this._state.tiles;
      }
      set tiles(e) {
        this._state.tiles = e;
      }
      addTile(e) {
        this._state.tiles.push(e);
      }
      get gameType() {
        return this._gameType;
      }
      set gameType(e) {
        this._gameType = e;
      }
    };
  var ac = class e {
    constructor() {
      (this.visited = new Set()),
        (this.dataManager = sc.getInstance()),
        (this.eventManager = Vh.getInstance()),
        (this.levelManager = Bd.getInstance()),
        (this.storageManager = Dd.getInstance());
    }
    static getInstance() {
      return e.instance || (e.instance = new e()), e.instance;
    }
    get gameSettings() {
      return this.dataManager.gameSettings;
    }
    get levelSettings() {
      return this.dataManager.levelSettings;
    }
    get state() {
      return this.dataManager.state;
    }
    shuffleTiles() {
      const e = this.state.tiles.filter((e) => "removed" !== e.status),
        t = this.state.tiles.map((e) => c({}, e));
      let i = this.getCanRemoveTilesPure(t).map((e) => e.position);
      const n = {};
      for (; i.length >= 2;) {
        const s = Math.floor(Math.random() * i.length),
          a = i.splice(s, 1)[0],
          r = Math.floor(Math.random() * i.length),
          o = i.splice(r, 1)[0],
          l = Math.floor(Math.random() * e.length),
          h = e.splice(l, 1)[0],
          d = e.findIndex((e) => e.type === h.type),
          u = e.splice(d, 1)[0],
          p = t.findIndex((e) => e.position.join(",") === a.join(",")),
          g = t.findIndex((e) => e.position.join(",") === o.join(","));
        (t[p].status = "removed"),
          (t[g].status = "removed"),
          (n[a.join(",")] = c({}, h)),
          (n[o.join(",")] = c({}, u)),
          i.length < 2 &&
          (i = this.getCanRemoveTilesPure(t).map((e) => e.position));
      }
      for (const e of this.state.tiles) {
        if ("removed" === e.status) continue;
        const t = n[e.position.join(",")];
        t && ((e.type = t.type), (e.texture = t.texture));
      }
      this.setCanRemovePairs(), this.dispatch({ type: "TILE_SHUFFLE" });
    }
    getPathToRemoveAll() {
      const e = JSON.parse(JSON.stringify(this.state.tiles)).filter(
        (e) => "removed" !== e.status
      );
      return this.search(e, []);
    }
    search(e, t) {
      if (0 === e.length) return t;
      const i = e.map((e) => e.index).join(",");
      if (this.visited.has(i)) return null;
      this.visited.add(i);
      const n = this.getCanRemoveTilesPure(e),
        s = this.findAllPairs(n);
      if (0 === s.length) return null;
      for (const [i, n] of s) {
        const s = e.filter((e) => e.index !== i && e.index !== n),
          a = this.search(s, t.concat([[i, n]]));
        if (a) return a;
      }
      return null;
    }
    findAllPairs(e) {
      const t = new Map();
      for (const i of e)
        t.has(i.type) || t.set(i.type, []), t.get(i.type).push(i.index);
      const i = [];
      for (const e of t.values())
        for (let t = 0; t < e.length; t++)
          for (let n = t + 1; n < e.length; n++) i.push([e[t], e[n]]);
      return i;
    }
    isFreeLeftPure(e, t) {
      const i = this.gameSettings.tileStep,
        [n, s, a] = e.position,
        r = t.find((e) => {
          const [t, r, o] = e.position;
          return (
            t === n - i &&
            Math.abs(r - s) < i &&
            o === a &&
            "removed" !== e.status
          );
        });
      return [!r, r];
    }
    isFreeRightPure(e, t) {
      const i = this.gameSettings.tileStep,
        [n, s, a] = e.position,
        r = t.find((e) => {
          const [t, r, o] = e.position;
          return (
            t === n + i &&
            Math.abs(r - s) < i &&
            o === a &&
            "removed" !== e.status
          );
        });
      return [!r, r];
    }
    isCoveredPure(e, t) {
      const i = this.gameSettings.tileStep,
        [n, s, a] = e.position,
        r = t.filter((e) => {
          const [t, r, o] = e.position;
          return (
            Math.abs(t - n) < i &&
            Math.abs(r - s) < i &&
            o === a + 1 &&
            "removed" !== e.status
          );
        });
      return [r.length > 0, r[0]];
    }
    canBeRemovedPure(e, t) {
      const [i] = this.isFreeLeftPure(e, t),
        [n] = this.isFreeRightPure(e, t),
        [s] = this.isCoveredPure(e, t);
      return !s && (i || n);
    }
    getCanRemoveTilesPure(e) {
      return e.filter(
        (t) => this.canBeRemovedPure(t, e) && "removed" !== t.status
      );
    }
    isFreeLeft(e) {
      const t = this.gameSettings.tileStep,
        i = this.state.tiles[e],
        [n, s, a] = i.position,
        r = this.state.tiles.find((e) => {
          const [i, r, o] = e.position;
          return (
            i === n - t &&
            Math.abs(r - s) < t &&
            o === a &&
            "removed" !== e.status
          );
        });
      return [!r, r];
    }
    isFreeRight(e) {
      const t = this.gameSettings.tileStep,
        i = this.state.tiles[e],
        [n, s, a] = i.position,
        r = this.state.tiles.find((e) => {
          const [i, r, o] = e.position;
          return (
            i === n + t &&
            Math.abs(r - s) < t &&
            o === a &&
            "removed" !== e.status
          );
        });
      return [!r, r];
    }
    isCovered(e) {
      const t = this.gameSettings.tileStep,
        i = this.state.tiles[e],
        [n, s, a] = i.position,
        r = this.state.tiles.filter((e) => {
          const [i, r, o] = e.position;
          return (
            Math.abs(i - n) < t &&
            Math.abs(r - s) < t &&
            o === a + 1 &&
            "removed" !== e.status
          );
        });
      return [r.length > 0, r[0]];
    }
    cellIsActive(e) {
      return "removed" !== this.state.tiles[e].status;
    }
    canBeRemoved(e) {
      const [t] = this.isFreeLeft(e),
        [i] = this.isFreeRight(e),
        [n] = this.isCovered(e);
      return !n && (t || i);
    }
    makeSelected(e) {
      const [t] = this.isFreeLeft(e),
        [i] = this.isFreeRight(e);
      this.dispatch({
        type: "SELECT_TILE",
        payload: { tileIndex: e, isFreeLeft: t, isFreeRight: i },
      });
    }
    makeDeselected(e) {
      this.dispatch({ type: "UNSELECT_TILE", payload: { tileIndex: e } });
    }
    selectTile(e) {
      const t = this.state.tiles[e],
        [i, n] = this.isCovered(e),
        [s, a] = this.isFreeLeft(e),
        [r, o] = this.isFreeRight(e);
      return i
        ? (this.eventManager.event(Eh, [t, n]),
          this.dispatch({ type: "CLEAR_COMBO" }),
          { canRemove: !1, canSelect: !1 })
        : s || r
          ? -1 !== this.dataManager.state.selectedTileIndex &&
            e !== this.dataManager.state.selectedTileIndex
            ? this.removeTile(this.dataManager.state.selectedTileIndex, e)
            : e !== this.dataManager.state.selectedTileIndex
              ? (this.makeSelected(e), { canRemove: !1, canSelect: !0 })
              : (this.makeDeselected(e), { canRemove: !1, canSelect: !0 })
          : (-1 !== this.dataManager.state.selectedTileIndex &&
            this.makeDeselected(this.dataManager.state.selectedTileIndex),
            this.eventManager.event(Ch, [t, a, o]),
            this.dispatch({ type: "CLEAR_COMBO" }),
            { canRemove: !1, canSelect: !1 });
    }
    isEqual(e, t) {
      return e.type === t.type;
    }
    removeTile(e, t) {
      return this.canBeRemoved(t) &&
        this.canBeRemoved(e) &&
        this.isEqual(this.state.tiles[e], this.state.tiles[t])
        ? (this.dispatch({
          type: "REMOVE_TILE",
          payload: { selectedTileIndex: e, tileIndex: t },
        }),
          this.setCanRemovePairs(),
          { canRemove: !0, canSelect: !1 })
        : (this.makeDeselected(e),
          this.makeSelected(t),
          { canRemove: !1, canSelect: !0 });
    }
    dispatch({ type: e, payload: t }) {
      switch (e) {
        case "INIT_BOARD":
          this.state.tiles = t.tiles;
          break;
        case "SELECT_TILE":
          (this.state.selectedTileIndex = t.tileIndex),
            (this.state.tiles[t.tileIndex].status = "selected"),
            this.eventManager.event(Th, {
              tileStates: [this.state.tiles[t.tileIndex]],
              isFreeLeft: t.isFreeLeft,
              isFreeRight: t.isFreeRight,
            });
          break;
        case "REMOVE_TILE": {
          (this.state.selectedTileIndex = -1),
            (this.state.tiles[t.tileIndex].status = "removed"),
            (this.state.tiles[t.selectedTileIndex].status = "removed"),
            this.state.combo++;
          const e = 200 + 40 * Math.min(this.state.combo, 10);
          (this.state.score += e),
            this.state.undos.push({
              removedPairs: [
                this.state.tiles[t.tileIndex],
                this.state.tiles[t.selectedTileIndex],
              ],
              deltaScore: e,
            }),
            this.eventManager.event(Fh, this.state.undos.length),
            this.eventManager.event(Oh, {
              combo: this.state.combo,
              isGameOver: !1,
            }),
            this.eventManager.event(Ph, this.state.score),
            this.eventManager.event(Mh, [
              t.tileIndex,
              t.selectedTileIndex,
              e,
            ]);
          break;
        }
        case "UNDO":
          if (this.state.undos.length > 0) {
            const { removedPairs: e, deltaScore: t } = this.state.undos.pop();
            (this.state.score -= t),
              (this.state.combo = 0),
              (e[0].status = "unselected"),
              (e[1].status = "unselected"),
              this.eventManager.event(Th, {
                tileStates: [e[0], e[1]],
                isFreeLeft: !0,
                isFreeRight: !0,
              }),
              this.setCanRemovePairs(),
              this.eventManager.event(Fh, this.state.undos.length),
              this.eventManager.event(Oh, {
                combo: this.state.combo,
                isGameOver: !1,
              }),
              this.eventManager.event(Ph, [this.state.score, !1]);
          }
          break;
        case "CLEAR_COMBO": {
          this.state.combo = 0;
          const e = (null == t ? void 0 : t.isGameOver) || !1;
          this.eventManager.event(Oh, {
            combo: this.state.combo,
            isGameOver: e,
          });
          break;
        }
        case "UNSELECT_TILE":
          (this.state.selectedTileIndex = -1),
            (this.state.tiles[t.tileIndex].status = "unselected"),
            this.eventManager.event(Th, {
              tileStates: [this.state.tiles[t.tileIndex]],
              isFreeLeft: !0,
              isFreeRight: !0,
            });
          break;
        case "RESET_BOARD":
          break;
        case "GAME_OVER":
          (this.state.isDie = !0),
            (this.state.isWin = this.state.tiles.every(
              (e) => "removed" === e.status
            )),
            this.state.isWin &&
            (this.dispatch({
              type: "CLEAR_COMBO",
              payload: { isGameOver: !0 },
            }),
              this.state.useRestart || this.state.useShuffle
                ? this.levelManager.difficulty > 1 &&
                (this.levelManager.difficulty -= 1)
                : this.levelManager.difficulty < 3 &&
                (this.levelManager.difficulty += 1)),
            this.eventManager.event(Dh, {
              isWin: this.state.isWin,
              isDie: this.state.isDie,
            });
          break;
        case "SET_CAN_REMOVE_PAIRS":
          (this.state.canRemovePairs = t.canRemovePairs),
            (this.state.canRemoveTilesMap = t.canRemoveTilesMap),
            this.eventManager.event(wh, {
              canRemovePairs: t.canRemovePairs,
              canRemoveTilesMap: t.canRemoveTilesMap,
            });
          break;
        case "START_GAME":
          this.dataManager.resetState({
            score: t.score,
            tiles: t.tiles,
            hintTimes: t.hintTimes,
            shuffleTimes: t.shuffleTimes,
          }),
            this.setCanRemovePairs(),
            t.restart && (this.state.useRestart = !0),
            this.eventManager.event(Rh),
            this.eventManager.event(Fh, this.state.undos.length);
          break;
        case "TILE_SHUFFLE":
          (this.state.useShuffle = !0),
            this.state.shuffleTimes > 0 && this.state.shuffleTimes--,
            this.eventManager.event(Nh);
          break;
        case "HINT":
          this.state.hintTimes > 0 && this.state.hintTimes--,
            this.eventManager.event(xh);
      }
    }
    hint() {
      this.dispatch({ type: "HINT" });
    }
    undo() {
      this.dispatch({ type: "UNDO" });
    }
    getCanRemoveTiles() {
      return this.state.tiles.filter(
        (e) => this.canBeRemoved(e.index) && "removed" !== e.status
      );
    }
    start(e = !1, t = 0, i = [], n = void 0, s = void 0) {
      this.dispatch({
        type: "START_GAME",
        payload: {
          restart: e,
          score: t,
          tiles: i,
          hintTimes: n,
          shuffleTimes: s,
        },
      });
    }
    setCanRemovePairs() {
      const e = this.getCanRemoveTiles(),
        t = {};
      e.forEach((e) => {
        t[e.type] ? t[e.type].push(e) : (t[e.type] = [e]);
      });
      let i = 0;
      for (const e in t) i += Math.floor(t[e].length / 2);
      i > 0
        ? this.dispatch({
          type: "SET_CAN_REMOVE_PAIRS",
          payload: { canRemovePairs: i, canRemoveTilesMap: t },
        })
        : (this.dispatch({
          type: "SET_CAN_REMOVE_PAIRS",
          payload: { canRemovePairs: 0, canRemoveTilesMap: {} },
        }),
          this.dispatch({ type: "GAME_OVER" }));
    }
  },
    rc = class e {
      constructor() {
        (this._open = !1),
          (this._isGuiding = !1),
          (this._guideLevel = ""),
          (this._isFirstGuideFinished = !1),
          (this._is4GuideFinished = !1),
          (this._is6GuideFinished = !1),
          (this.guideInfo = {
            "1_1": [
              [0, 0, 0, 1],
              [2, 0, 0, 1],
            ],
            "1_2": [
              [0, 0, 0, 1],
              [2, 0, 0, 1],
              [4, 0, 0, 2],
              [1, 0, 1, 2],
            ],
            "1_3": [
              [0, 0, 0, 1],
              [2, 0, 0, 2],
              [4, 0, 0, 2],
              [6, 0, 0, 1],
              [1, 0, 1, 3],
              [5, 0, 1, 3],
            ],
            4: [
              [0, 0, 0, 34],
              [8, 0, 0, 26],
              [0, 2, 0, 13],
              [2, 2, 0, 26],
              [6, 2, 0, 22],
              [8, 2, 0, 12],
              [0, 4, 0, 4],
              [3, 4, 0, 26],
              [5, 4, 0, 4],
              [8, 4, 0, 16],
              [0, 6, 0, 15],
              [2, 6, 0, 26],
              [6, 6, 0, 19],
              [8, 6, 0, 13],
              [0, 0, 1, 15],
              [8, 0, 1, 19],
              [0, 2, 1, 22],
              [2, 2, 1, 22],
              [6, 2, 1, 12],
              [8, 2, 1, 32],
              [0, 4, 1, 16],
              [3, 4, 1, 13],
              [5, 4, 1, 34],
              [8, 4, 1, 13],
              [0, 0, 2, 23],
              [8, 0, 2, 24],
              [1, 2, 2, 22],
              [7, 2, 2, 23],
              [0, 4, 2, 32],
              [3, 4, 2, 32],
              [5, 4, 2, 32],
              [8, 4, 2, 24],
              [0, 4, 3, 1],
              [3, 4, 3, 1],
              [5, 4, 3, 1],
              [8, 4, 3, 1],
            ],
            6: [
              [0, 0, 0, 31],
              [2, 0, 0, 16],
              [6, 0, 0, 12],
              [8, 0, 0, 31],
              [0, 2, 0, 20],
              [3, 2, 0, 32],
              [5, 2, 0, 24],
              [8, 2, 0, 14],
              [1, 4, 0, 32],
              [3, 4, 0, 32],
              [5, 4, 0, 25],
              [7, 4, 0, 16],
              [0, 6, 0, 12],
              [3, 6, 0, 12],
              [5, 6, 0, 16],
              [8, 6, 0, 25],
              [0, 0, 1, 24],
              [2, 0, 1, 32],
              [6, 0, 1, 24],
              [8, 0, 1, 12],
              [3, 2, 1, 16],
              [5, 2, 1, 14],
              [2, 4, 1, 29],
              [6, 4, 1, 20],
              [0, 6, 1, 3],
              [8, 6, 1, 35],
              [0, 0, 2, 3],
              [2, 0, 2, 35],
              [6, 0, 2, 29],
              [8, 0, 2, 24],
              [0, 0, 3, 1],
              [2, 0, 3, 1],
              [6, 0, 3, 1],
              [8, 0, 3, 1],
            ],
          });
      }
      init() {
        (this.levelManager = Bd.getInstance()),
          (this.storageManager = Dd.getInstance()),
          (this._open = I.openGuide),
          (this._isFirstGuideFinished = this.storageManager.guideFinished);
      }
      static getInstance() {
        return e.instance || (e.instance = new e()), e.instance;
      }
      updateGuideLevel() {
        if (!this._open)
          return (this._isGuiding = !1), void (this._guideLevel = "");
        const e = this.levelManager.currentLevel;
        1 !== e || this._isFirstGuideFinished || "" !== this._guideLevel
          ? "1_1" === this._guideLevel
            ? (this._guideLevel = "1_2")
            : "1_2" === this._guideLevel
              ? ((this._guideLevel = "1_3"),
                this.storageManager.saveGuideData(),
                (this._isFirstGuideFinished = !0))
              : 4 !== e || this._is4GuideFinished
                ? 6 !== e || this._is6GuideFinished
                  ? ((this._guideLevel = ""), (this._isGuiding = !1))
                  : ((this._guideLevel = e.toString()),
                    (this._isGuiding = !0),
                    (this._is6GuideFinished = !0))
                : ((this._guideLevel = e.toString()),
                  (this._isGuiding = !0),
                  (this._is4GuideFinished = !0))
          : ((this._isGuiding = !0), (this._guideLevel = "1_1"));
      }
      bindTexture(e) {
        switch (this._guideLevel) {
          case "1_1":
            e[0].texture = e[1].texture = 0;
            break;
          case "1_2":
            (e[0].texture = e[1].texture = 100),
              (e[2].texture = e[3].texture = 2100);
            break;
          case "1_3":
            (e[0].texture = e[3].texture = 100),
              (e[1].texture = e[2].texture = 2100),
              (e[4].texture = e[5].texture = 0);
            break;
          case "4":
            (e[e.length - 4].texture = 3e3),
              (e[e.length - 3].texture = 3001),
              (e[e.length - 2].texture = 3002),
              (e[e.length - 1].texture = 3003);
            break;
          case "6":
            (e[e.length - 4].texture = 4e3),
              (e[e.length - 3].texture = 4001),
              (e[e.length - 2].texture = 4002),
              (e[e.length - 1].texture = 4003);
        }
      }
      get canPlayGuide() {
        return this._isGuiding && this._open;
      }
      get guideLevel() {
        return this._guideLevel;
      }
      get open() {
        return this._open;
      }
      get guideFinished() {
        return this._isFirstGuideFinished;
      }
    },
    oc = class e {
      constructor() {
        (this._isSoundOn = !0), (this._isBgOn = !1);
      }
      static getInstance() {
        return e.instance || (e.instance = new e()), e.instance;
      }
      init() {
        this.eventManager = Vh.getInstance();
      }
      get isBgOn() {
        return this._isBgOn;
      }
      get isSoundOn() {
        return this._isSoundOn;
      }
      set isBgOn(e) {
        this._isBgOn !== e &&
          ((this._isBgOn = e), this.eventManager.event(kh, this._isBgOn));
      }
      set isSoundOn(e) {
        this._isSoundOn !== e &&
          ((this._isSoundOn = e), this.eventManager.event(Bh, this._isSoundOn));
      }
    },
    lc = class e {
      static getInstance() {
        return e.instance || (e.instance = new e()), e.instance;
      }
      init() {
        (Laya.SoundManager.useAudioMusic = !1),
          (this.settingManager = oc.getInstance()),
          (this.eventManager = Vh.getInstance()),
          this.eventManager.on(kh, this, this.switchBg);
      }
      playSound(e) {
        return _(this, null, function* () {
          return new Promise((t) => {
            this.settingManager.isSoundOn
              ? Laya.SoundManager.playSound(e, 1, () => {
                t(!0);
              })
              : t(!1);
          });
        });
      }
      switchBg(e) {
        e ? this.playBg() : this.stopBg();
      }
      playBg() {
        this._bgChannel
          ? this._bgChannel.resume()
          : (this._bgChannel = Laya.SoundManager.playMusic(
            "sounds/bgm.ogg",
            0,
            null,
            0
          ));
      }
      stopBg() {
        this._bgChannel && this._bgChannel.pause();
      }
    },
    hc = class e {
      static getInstance() {
        return e.instance || (e.instance = new e()), e.instance;
      }
      init() {
        return _(this, null, function* () {
          (this.storageManager = Dd.getInstance()),
            (this.eventManager = Vh.getInstance()),
            (this.levelManager = Bd.getInstance()),
            yield this.syncUserData();
        });
      }
      syncUserData() {
        return null; /*_(this, null, function* () {
          try {
            const { data: e } = yield (function () {
                return _(this, null, function* () {
                  let e = null;
                  const t = yield fetch(`${A}/v1/uc/gamedata`, {
                    method: "GET",
                  })
                    .then((e) =>
                      _(this, null, function* () {
                        if (!e.ok) throw yield e.json();
                        return e.json();
                      })
                    )
                    .catch((t) => (console.log(t), (e = t), null));
                  if (e) throw e;
                  return t;
                });
              })(),
              { game_data: t } = e,
              { level: i, dc: n, classic: s } = t;
            this.storageManager.syncSaveData(i, n, s),
              this.levelManager.initLevel();
          } catch (e) {
            console.error("syncUserData", e);
          }
        });*/
      }
      saveUserData() {
        return _(this, null, function* () {
          var e;
          // Skip HTTP request - just save to localStorage
          console.log("[Offline Mode] saveUserData - data saved locally only");
          null == (e = this.eventManager.remote) ||
            e.message({ type: "saveUserData" });
        });
      }
    },
    { regClass: cc, property: dc } = Laya,
    uc = class extends Laya.Script {
      constructor() {
        super(...arguments),
          (this.fullDate = null),
          (this.isFinished = !1),
          (this.index = -1);
      }
      onAwake() {
        this.owner.on(Laya.Event.CLICK, this, this.onDateClick);
      }
      onDateClick() {
        if (
          this.fullDate &&
          (this.number.text || this.finishedIcon.visible) &&
          this.fullDate.getTime() !== uc.chosenDate.getTime()
        ) {
          lc.getInstance().playSound("sounds/dc_click.ogg");
          const e = uc.chosenDateIndex;
          (uc.chosenDate = this.fullDate),
            (uc.chosenDateIndex = this.index),
            (Td.getInstance().chosenDate = this.fullDate),
            this.dateChangedCallback.runWith([e, this.index]);
        }
      }
      updateChosenStatus() {
        if (
          this.fullDate &&
          this.fullDate.getTime() === uc.chosenDate.getTime()
        ) {
          this.chosenBg.visible = !0;
          try {
            this.chosenBg
              .getComponent(Laya.Spine2DRenderNode)
              .play("Appear", !1);
          } catch (e) {
            console.debug("updateChosenStatus::: error", e);
          }
        } else this.chosenBg.visible = !1;
      }
      static setToday(e) {
        this.today = e;
      }
      static setChosenDate(e, t) {
        (this.chosenDate = t), (this.chosenDateIndex = e);
      }
      updateFinishedStatus() {
        (this.isFinished = !0),
          (this.finishedIcon.visible = !0),
          (this.number.text = ""),
          (this.numberLight.text = ""),
          this.isFinished && this.playFinishedAnim();
      }
      setDate(e, t, i, n) {
        if (
          ((this.index = e),
            (this.fullDate = t),
            (this.isFinished = n),
            this.fullDate)
        ) {
          const e = t.getDate();
          i
            ? ((this.number.text = n ? "" : `${e}`),
              (this.numberLight.text = ""),
              (this.finishedIcon.visible = n),
              (this.number.visible = !n),
              (this.numberLight.visible = !1))
            : ((this.number.text = ""),
              (this.numberLight.text = `${e}`),
              (this.numberLight.visible = !0),
              (this.finishedIcon.visible = !1),
              (this.number.visible = !1)),
            (this.owner.mouseEnabled = !0);
        } else
          (this.number.text = ""),
            (this.numberLight.text = ""),
            (this.owner.mouseEnabled = !1),
            (this.finishedIcon.visible = !1),
            (this.number.visible = !1),
            (this.numberLight.visible = !1);
        this.updateChosenStatus();
      }
      setDateChangedCallback(e) {
        this.dateChangedCallback || (this.dateChangedCallback = e);
      }
      playFinishedAnim() {
        this.finishedIcon
          .getComponent(Laya.Spine2DRenderNode)
          .play("Appear", !1);
      }
    };
  (uc.chosenDateIndex = -1),
    u([dc(Laya.Label)], uc.prototype, "number", 2),
    u([dc(Laya.Label)], uc.prototype, "numberLight", 2),
    u([dc(Laya.Image)], uc.prototype, "finishedIcon", 2),
    u([dc(Laya.Image)], uc.prototype, "chosenBg", 2),
    (uc = u([cc("piDI4Qf-Sx-3tsNl2wm7pg")], uc));
  var { regClass: pc, property: gc } = Laya,
    fc = class extends Laya.Script {
      constructor() {
        super(...arguments),
          (this.offset = 0),
          (this._pageYear = 0),
          (this._pageMonth = 0),
          (this.latestDay = 0),
          (this.daysInMonth = 0),
          (this.startPoint = [0, 0]),
          (this.startDragTime = 0),
          (this.endPoint = [0, 0]),
          (this.endDragTime = 0),
          (this.originalCursor = ""),
          (this.MIN_SWIPE_DISTANCE = 50),
          (this.MIN_SWIPE_SPEED = 0.5);
      }
      onAwake() {
        (this.dcManager = Td.getInstance()),
          (this.uiManager = wd.getInstance()),
          this.prevBtn.on(Laya.Event.CLICK, this, this.onPrevBtnClick),
          this.nextBtn.on(Laya.Event.CLICK, this, this.onNextBtnClick),
          this.bindEvents();
      }
      bindEvents() {
        this.dateList.on(Laya.Event.MOUSE_OVER, this, () => {
          Laya.Mouse.cursor = "grab";
        }),
          this.dateList.on(Laya.Event.MOUSE_OUT, this, () => {
            Laya.Mouse.cursor = "default";
          }),
          this.dateList.on(Laya.Event.MOUSE_DOWN, this, () => {
            (this.startPoint = [Laya.stage.mouseX, Laya.stage.mouseY]),
              (this.startDragTime = Date.now());
          }),
          this.dateList.on(Laya.Event.MOUSE_DRAG_END, this, (e) => {
            (this.endPoint = [e.stageX, e.stageY]),
              (this.endDragTime = Date.now());
            const t = this.endDragTime - this.startDragTime,
              i = this.endPoint[0] - this.startPoint[0],
              n = this.endPoint[1] - this.startPoint[1],
              s = i / t,
              a = Math.abs(i) > Math.abs(n),
              r = Math.abs(i) > this.MIN_SWIPE_DISTANCE,
              o = Math.abs(s) > this.MIN_SWIPE_SPEED;
            a &&
              r &&
              o &&
              (i > 0 && this.canShowPrev()
                ? this.onPrevBtnClick()
                : i < 0 && this.canShowNext() && this.onNextBtnClick());
          });
      }
      calendarInit(e = true) {
        if (!this.dcManager) {
          this.dcManager = Td.getInstance();
        }

        uc.setToday(this.dcManager.today);

        this.todayYear = this.dcManager.todayYear;
        this.todayMonth = this.dcManager.todayMonth;
        this.todayDay = this.dcManager.todayDay;

        // Ensure page values are ALWAYS initialized
        if (this._pageYear == null || this._pageMonth == null) {
          this._pageYear = this.todayYear;
          this._pageMonth = this.todayMonth;
        }

        this.nextBtn.visible = this.canShowNext();
        this.prevBtn.visible = this.canShowPrev();

        // ✅ USE THE SAME VARIABLES YOU SET
        const month = this._pageMonth;
        const year = this._pageYear;

        this.monthLabel.text = `${String(month).padStart(2, "0")}/${year}`;

        this.updateDateList(e);
      }

      canShowNext() {
        return (
          0 !==
          this.compareDate(
            this._pageYear,
            this.todayYear,
            this.pageMonth,
            this.todayMonth
          )
        );
      }
      canShowPrev() {
        return (
          0 !==
          this.compareDate(
            this._pageYear,
            this.dcManager.FIRST_YEAR,
            this.pageMonth,
            this.dcManager.FIRST_MONTH
          )
        );
      }
      updateDateList(e = !1) {
        const t = new Date(this.pageYear, this.pageMonth - 1, 1);
        (this.offset = t.getDay()),
          (this.daysInMonth = new Date(
            this.pageYear,
            this.pageMonth,
            0
          ).getDate()),
          0 ===
            this.compareDate(
              this.pageYear,
              this.todayYear,
              this.pageMonth,
              this.todayMonth
            )
            ? (this.latestDay = this.todayDay)
            : (this.latestDay = this.daysInMonth);
        let i = -1;
        const n = [];
        for (let e = 0; e < this.offset; e++)
          n.push({ index: e, date: null, past: !1, isFinished: !1 });
        for (let e = this.offset; e < this.latestDay + this.offset; e++) {
          const t = new Date(
            this.pageYear,
            this.pageMonth - 1,
            e - this.offset + 1
          ),
            s = this.dcManager.isDateFinished(t);
          s || (i = e - this.offset + 1),
            n.push({ index: e, date: t, past: !0, isFinished: s });
        }
        for (
          let e = this.latestDay + this.offset;
          e < this.daysInMonth + this.offset;
          e++
        )
          n.push({
            index: e,
            date: new Date(
              this.pageYear,
              this.pageMonth - 1,
              e - this.offset + 1
            ),
            past: !1,
            isFinished: !1,
          });
        for (let e = this.daysInMonth + this.offset; e < 42; e++)
          n.push({ index: e, date: null, past: !1, isFinished: !1 });
        if (!e) {
          const e =
            i > 0 ? i + this.offset - 1 : this.latestDay + this.offset - 1;
          uc.setChosenDate(e, n[e].date),
            (this.dcManager.chosenDate = n[e].date);
        }
        (this.dateList.array = n),
          this.setDateDataFromList(this.dateList.array);
      }
      setDateDataFromList(e) {
        e.forEach((e, t) => {
          const i = this.dateList.getChildAt(0).getChildAt(t).getComponent(uc);
          i &&
            (i.setDateChangedCallback(
              Laya.Handler.create(this, this.onDateChanged, null, !1)
            ),
              i.setDate(e.index, e.date, e.past, e.isFinished));
        });
      }
      updateFinishedStatusByDateStr(e) {
        if (e.slice(4, 6) !== this.pageMonth.toString().padStart(2, "0"))
          return;
        const t = (Number(e) % 100) + this.offset - 1;
        this.dateList.array[t].isFinished = !0;
        const i = this.dateList.getCell(t).getComponent(uc);
        i && i.updateFinishedStatus(),
          this.uiManager.dc.updateTrophy(),
          this.uiManager.dc.updatePlayBtnText(),
          this.updateChosenDate();
      }
      updateChosenDate() {
        for (let e = this.latestDay + this.offset - 1; e >= this.offset; e--) {
          const t = this.dateList.array[e];
          if (!t.isFinished) {
            const i = uc.chosenDateIndex;
            uc.setChosenDate(e, t.date),
              (this.dcManager.chosenDate = t.date),
              this.onDateChanged(i, e);
            break;
          }
        }
      }
      onDateChanged(e, t) {
        const i = this.dateList.getCell(e).getComponent(uc),
          n = this.dateList.getCell(t).getComponent(uc);
        i.updateChosenStatus(),
          n.updateChosenStatus(),
          this.uiManager.dc.updatePlayBtnText();
      }
      onPrevBtnClick() {
        1 === this.pageMonth && this._pageYear--,
          (this._pageMonth = ((this._pageMonth - 2 + 12) % 12) + 1),
          (this.monthLabel.text = `${this.pageMonth
            .toString()
            .padStart(2, "0")}/${this.pageYear}`),
          0 ===
          this.compareDate(
            this._pageYear,
            this.dcManager.FIRST_YEAR,
            this.pageMonth,
            this.dcManager.FIRST_MONTH
          ) && (this.prevBtn.visible = !1),
          (this.nextBtn.visible = !0),
          this.refresh();
      }
      onNextBtnClick() {
        12 === this.pageMonth && this._pageYear++,
          (this._pageMonth = (this._pageMonth % 12) + 1),
          (this.monthLabel.text = `${this.pageMonth
            .toString()
            .padStart(2, "0")}/${this.pageYear}`),
          0 ===
          this.compareDate(
            this._pageYear,
            this.todayYear,
            this.pageMonth,
            this.todayMonth
          ) && (this.nextBtn.visible = !1),
          (this.prevBtn.visible = !0),
          this.refresh();
      }
      refresh() {
        this.updateDateList(),
          this.monthChangedHandler.run(),
          this.uiManager.dc.updatePlayBtnText();
      }
      setMonthChangedHandler(e) {
        this.monthChangedHandler = e;
      }
      compareDate(e, t, i, n, s, a) {
        const r = new Date(e, i - 1, s || 1),
          o = new Date(t, n - 1, a || 1);
        return r.getTime() - o.getTime();
      }
      get pageYear() {
        return this._pageYear;
      }
      get pageMonth() {
        return this._pageMonth;
      }
      set pageYear(e) {
        this._pageYear = e;
      }
      set pageMonth(e) {
        this._pageMonth = e;
      }
    };
  u([gc(Laya.Label)], fc.prototype, "monthLabel", 2),
    u([gc(Laya.List)], fc.prototype, "dateList", 2),
    u([gc(Laya.Button)], fc.prototype, "prevBtn", 2),
    u([gc(Laya.Button)], fc.prototype, "nextBtn", 2),
    (fc = u([pc("qzg64mNyRD2YdR-jLciidA")], fc));
  var { regClass: mc, property: yc } = Laya,
    vc = class extends Laya.Script {
      setNumber(e, t = !1, i = !1) {
        if (i)
          return (
            (this.number.text = ""),
            (this.endless.visible = !1),
            (this.adIcon.visible = !1),
            void (this.number.visible = !1)
          );
        e > 0 &&
          ((this.number.text = e.toString()),
            (this.endless.visible = !1),
            (this.adIcon.visible = !1),
            (this.number.visible = !0),
            (this.owner.visible = !0)),
          0 === e &&
          ((this.number.text = e.toString()),
            (this.endless.visible = !1),
            t
              ? ((this.adIcon.visible = !0), (this.number.visible = !1))
              : ((this.adIcon.visible = !1), (this.number.visible = !0)),
            (this.owner.visible = !0)),
          -1 === e &&
          ((this.endless.visible = !0),
            (this.number.visible = !1),
            (this.adIcon.visible = !1),
            (this.owner.visible = !0));
      }
    };
  u([yc(Laya.Image)], vc.prototype, "endless", 2),
    u([yc(Laya.Image)], vc.prototype, "adIcon", 2),
    u([yc(Laya.Label)], vc.prototype, "number", 2),
    (vc = u([mc("tCV1mc_MQaeMqM-NRfB9Hw")], vc));
  var { regClass: _c, property: Ic } = Laya,
    Sc = class extends Laya.Script {
      constructor() {
        super(...arguments), (this._disabled = !1);
      }
      setDisabled(e, t) {
        (this.btn.skin = t), (this._disabled = e);
      }
      setNumber(e, t = !1, i = !1) {
        i && (this.badge.owner.visible = !1), this.badge.setNumber(e, t, i);
      }
      get disabled() {
        return this._disabled;
      }
    };
  u([Ic(Laya.Button)], Sc.prototype, "btn", 2),
    u([Ic(vc)], Sc.prototype, "badge", 2),
    (Sc = u([_c("Blk29PxBRT6u63btRBg8xQ")], Sc));
  var { regClass: Lc, property: Ac } = Laya,
    Ec = class extends Laya.Script {
      onAwake() {
        this.closeBtn.on(Laya.Event.CLICK, this, () => {
          this.disappear();
        });
      }
      disappear() {
        this.owner.close();
      }
      show(e, t) {
        this.owner.show(),
          (this.vBox.scaleX = 1),
          (this.vBox.scaleY = 1),
          (this.trophy.skin = e),
          (this.label.text = t);
      }
    };
  u([Ac(Laya.VBox)], Ec.prototype, "vBox", 2),
    u([Ac(Laya.Image)], Ec.prototype, "trophy", 2),
    u([Ac(Laya.Label)], Ec.prototype, "label", 2),
    u([Ac(Laya.Button)], Ec.prototype, "closeBtn", 2),
    (Ec = u([Lc("D4yIBV2WRfqSDnm1fzqnYQ")], Ec));
  var { regClass: Cc, property: wc } = Laya,
    bc = class extends Laya.Script {
      constructor() {
        super(...arguments),
          (this._tweens = []),
          (this._timelines = []),
          (this.flag = !1);
      }
      show(e, t) {
        Al("h5_dlg_show", {
          dlg_name: "calendar",
          source: "receive_badge",
          badge_month: t,
        }),
          Laya.timer.clearAll(this),
          (this.owner.visible = !0),
          (this.trophy.skin = e),
          (this.trophy.visible = !1),
          (this.mask.alpha = 0),
          (this.mask.visible = !0),
          (this.spine.visible = !0),
          (this.spine.scaleX = 1),
          (this.spine.scaleY = 1),
          (this.flag = !1),
          this._timelines.length > 0 &&
          this._timelines.forEach((e) => {
            e.destroy();
          }),
          (this._timelines = []);
        const i = new Laya.TimeLine();
        this._timelines.push(i),
          i.to(this.mask, { alpha: 1 }, 150, Laya.Ease.sineOut),
          i.play(0);
        const n = this.spine.getComponent(Laya.Spine2DRenderNode);
        n.play("Appear", !1);
        let s = "Appear";
        Laya.timer.once(1200, this, () => {
          this.playTrophyAnim(),
            (this.stars.visible = !0),
            this.stars
              .getComponent(Laya.Spine2DRenderNode)
              .play("Light_Appear", !0);
        }),
          this.spine.on(Laya.Event.END, this, () => {
            "Appear" === s &&
              (Laya.timer.once(0, this, () => {
                n.play("Loop", !0);
              }),
                (s = "Loop"),
                this.owner.once(Laya.Event.CLICK, this, () => {
                  this.disappear();
                }));
          }),
          Laya.timer.once(6200, this, () => {
            this.flag || this.disappear();
          });
      }
      disappear() {
        (this.flag = !0),
          this._tweens.length > 0 &&
          this._tweens.forEach((e) => {
            e.kill();
          }),
          this._timelines.length > 0 &&
          this._timelines.forEach((e) => {
            e.destroy();
          }),
          (this._timelines = []),
          (this._tweens = []),
          this._tweens.push(
            Laya.Tween.create(this.trophy)
              .to("scaleX", 0)
              .to("scaleY", 0)
              .duration(200)
          );
        const e = this.spine.getComponent(Laya.Spine2DRenderNode);
        (this.stars.visible = !1),
          e.play("Disaaper", !1),
          this._tweens.push(
            Laya.Tween.create(this.mask).to("alpha", 0).duration(200)
          ),
          Laya.timer.once(200, this, () => {
            (this.owner.visible = !1),
              lc.getInstance().playSound("sounds/dc_trophy_unlock_sd.ogg");
          });
      }
      playTrophyAnim() {
        (this.trophy.visible = !0),
          (this.trophy.scaleX = 0.35),
          (this.trophy.scaleY = 0.35),
          (this.trophy.mouseEnabled = !1),
          this._tween && this._tween.kill(),
          (this._tween = Laya.Tween.create(this.trophy)),
          this._tween
            .to("scaleX", 1.13)
            .to("scaleY", 1.13)
            .duration(200)
            .then(() => {
              (this._tween = Laya.Tween.create(this.trophy)),
                this._tween.to("scaleX", 1).to("scaleY", 1).duration(230);
            });
      }
    };
  u([wc(Laya.Image)], bc.prototype, "trophy", 2),
    u([wc(Laya.Sprite)], bc.prototype, "mask", 2),
    u([wc(Laya.Image)], bc.prototype, "spine", 2),
    u([wc(Laya.Image)], bc.prototype, "stars", 2),
    (bc = u([Cc("64xsGZaIQqqnso-iTR25iA")], bc));
  var { regClass: Tc, property: Mc } = Laya,
    Dc = class extends Laya.Script {
      constructor() {
        super(...arguments),
          (this.MONTH_TEXT = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]);
      }
      onAwake() {
        (this.uiManager = wd.getInstance()),
          this.owner.on(Laya.Event.CLICK, this, this.onTrophyClick);
      }
      onTrophyClick() {
        this.hasTrophy
          ? this.uiManager.dc.showTrophyCheckDialog(
            this.flower.skin,
            `${this.year}/${this.month}`
          )
          : ((this.uiManager.calendar.pageYear = this.year),
            (this.uiManager.calendar.pageMonth = this.month),
            this.uiManager.calendar.calendarInit(!1),
            this.uiManager.trophyRoom.clear(),
            this.uiManager.goToDailyChallenge());
      }
      setData(e, t) {
        (this.year = t),
          (this.month = e.month),
          (this.monthText.text = this.MONTH_TEXT[e.month - 1]);
        const i = e.month.toString().padStart(4, "0");
        (this.hasTrophy = e.hasTrophy),
          e.hasTrophy
            ? ((this.flower.skin = `atlas/images/dc/trophy/dc_trophy_icon_${i}.png`),
              (this.flower.visible = !0),
              (this.bottom.skin = "atlas/images/dc/dc_pic_0003.png"))
            : ((this.flower.visible = !1),
              (this.bottom.skin = "atlas/images/dc/dc_pic_0004.png"));
      }
    };
  u([Mc(Laya.Image)], Dc.prototype, "bottom", 2),
    u([Mc(Laya.Label)], Dc.prototype, "monthText", 2),
    u([Mc(Laya.Image)], Dc.prototype, "flower", 2),
    (Dc = u([Tc("juJ42NIvSResuFH7gdNJww")], Dc));
  var { regClass: kc, property: Bc } = Laya,
    Oc = class extends Laya.Script {
      constructor() {
        super(...arguments),
          (this.TROPHY_WIDTH = 300),
          (this.TROPHY_HEIGHT = 449),
          (this.HOLDER_HEIGHT = 92),
          (this.HOLDER_Y = 275),
          (this.H_SPACING = 126),
          (this.TROPHIES_PER_ROW = 4),
          (this.BOX_WIDTH = 1920),
          (this.BOX_PADDING_X = 171),
          (this.BOX_SPACING_Y = 60),
          (this.H_SPACING_MOBILE = 34),
          (this.TROPHIES_PER_ROW_MOBILE = 3),
          (this.BOX_WIDTH_MOBILE = 1080),
          (this.BOX_PADDING_X_MOBILE = 56),
          (this.BOX_SPACING_Y_MOBILE = 33);
      }
      getSizeData() {
        return $h.getInstance().isMobile
          ? {
            H_SPACING: this.H_SPACING_MOBILE,
            TROPHIES_PER_ROW: this.TROPHIES_PER_ROW_MOBILE,
            BOX_WIDTH: this.BOX_WIDTH_MOBILE,
            BOX_PADDING_X: this.BOX_PADDING_X_MOBILE,
            BOX_SPACING_Y: this.BOX_SPACING_Y_MOBILE,
          }
          : {
            H_SPACING: this.H_SPACING,
            TROPHIES_PER_ROW: this.TROPHIES_PER_ROW,
            BOX_WIDTH: this.BOX_WIDTH,
            BOX_PADDING_X: this.BOX_PADDING_X,
            BOX_SPACING_Y: this.BOX_SPACING_Y,
          };
      }
      setData(e) {
        return _(this, null, function* () {
          (this.sizeData = this.getSizeData()),
            (this.yearText.text = e.year.toString()),
            this.trophiesBox.removeChildren();
          let t = null,
            i = 0,
            n = 0;
          const s = e.monthSlots;
          yield Laya.loader.load("resources/trophy.lh").then((a) => {
            for (let r = 0; r < s.length; r++) {
              const o = s[r];
              if (r % this.sizeData.TROPHIES_PER_ROW === 0) {
                (t = new Laya.Box()),
                  t.size(this.sizeData.BOX_WIDTH, this.TROPHY_HEIGHT),
                  t.pos(
                    0,
                    n * (this.TROPHY_HEIGHT + this.sizeData.BOX_SPACING_Y)
                  ),
                  this.trophiesBox.addChild(t),
                  (i = 0),
                  n++;
                const e = new Laya.Image("atlas/images/dc/dc_pic_0002.png");
                e.size(this.sizeData.BOX_WIDTH, this.HOLDER_HEIGHT),
                  e.pos(0, this.HOLDER_Y),
                  t.addChild(e);
              }
              const l = a.create();
              l.size(this.TROPHY_WIDTH, this.TROPHY_HEIGHT),
                l.pos(
                  this.sizeData.BOX_PADDING_X +
                  i * (this.TROPHY_WIDTH + this.sizeData.H_SPACING),
                  0
                );
              if (
                (l.getComponent(Dc).setData(o, e.year),
                  t.addChild(l),
                  i++,
                  e.year === Td.getInstance().todayYear &&
                  r + 1 === Td.getInstance().todayMonth)
              )
                break;
            }
            this.trophiesBox.size(
              this.sizeData.BOX_WIDTH,
              n * (this.TROPHY_HEIGHT + this.sizeData.BOX_SPACING_Y)
            ),
              this.owner.size(
                this.sizeData.BOX_WIDTH,
                this.trophiesBox.y + this.trophiesBox.height
              );
          });
        });
      }
    };
  u([Bc(Laya.Label)], Oc.prototype, "yearText", 2),
    u([Bc(Laya.Box)], Oc.prototype, "trophiesBox", 2),
    (Oc = u([kc("qO8S3QiUToKYmuC3EZZMaw")], Oc));
  var { regClass: Pc, property: Rc } = Laya,
    Nc = class extends Laya.Script {
      constructor() {
        super(...arguments), (this.YEAR_SPACING = 60), (this.PADDING_TOP = 180);
      }
      onAwake() {
        (this.dcManager = Td.getInstance()),
          this.backBtn.on(Laya.Event.CLICK, this, this.onBackBtnClick);
      }
      onStart() { }
      updateYearPanel() {
        this.dcManager || (this.dcManager = Td.getInstance());
        const e = this.dcManager.yearList;
        0 === this.yearPanel.numChildren
          ? this.setYearData(e)
          : this.updateYearData(e);
      }
      setYearData(e) {
        return _(this, null, function* () {

          // ✅ SAFETY CHECK (MANDATORY)
          if (!Array.isArray(e)) {
            console.warn("setYearData called with invalid data:", e);
            return;
          }

          const t = [];
          let i;
          let n = 0;

          const s = yield Laya.loader.load("resources/trophiesInYear.lh");

          for (let a = 0; a < e.length; a++) {
            const r = e[a];

            i = s.create();
            t.push(i);
            this.yearPanel.addChild(i);

            const o = i.getComponent(Oc);
            if (!o) continue;

            yield o.setData(r);

            i.y = a * this.YEAR_SPACING + n + this.PADDING_TOP;
            n += i.height;
          }
        });
      }

      updateYearData(e) {
        let t;
        for (let i = 0; i < e.length; i++) {
          const n = e[i];
          if (((t = this.yearPanel.getChildAt(i)), t)) {
            const e = t.getComponent(Oc);
            e && e.setData(n);
          }
        }
      }
      clear() {
        this.owner.visible = !1;
      }
      onBackBtnClick() {
        this.clear();
      }
    };
  u([Rc(Laya.Panel)], Nc.prototype, "yearPanel", 2),
    u([Rc(Laya.Button)], Nc.prototype, "backBtn", 2),
    (Nc = u([Pc("FieIPs7xTXaG5iMu9Hct5Q")], Nc));
  var { regClass: xc, property: Fc } = Laya,
    Hc = class extends Laya.Script {
      constructor() {
        super(...arguments), (this._monthFinishedCache = {});
      }
      onAwake() {
        (this.uiManager = wd.getInstance()),
          (this.dcManager = Td.getInstance()),
          (this.responsiveManager = $h.getInstance()),
          this.trophyBtn.on(Laya.Event.CLICK, this, this.onTrophyBtnClick),
          this.trophy.on(Laya.Event.CLICK, this, this.onTrophyBtnClick),
          this.backBtn.on(Laya.Event.CLICK, this, this.onBackBtnClick),
          this.playBtn.on(Laya.Event.CLICK, this, this.onPlayBtnClick),
          (this._index = this.owner.parent.getChildIndex(this.owner));
      }
      onStart() {
        this.dcManager.yearList &&
          this.dcManager.yearList.length > 0 &&
          this.dcManager.yearList.forEach((e) => {
            e.monthSlots.forEach((t) => {
              this._monthFinishedCache[
                `${e.year}${t.month.toString().padStart(2, "0")}`
              ] = t.hasTrophy;
            });
          });
      }
      updateTrophy() {
        var e;
        const t = this.dcManager.chosenDate.getFullYear(),
          i = this.dcManager.chosenDate.getMonth() + 1,
          n =
            null == (e = this.dcManager.yearList.find((e) => e.year === t))
              ? void 0
              : e.monthSlots[i - 1].hasTrophy,
          s = `atlas/images/dc/trophy/dc_trophy_icon_${i
            .toString()
            .padStart(4, "0")}.png`;
        this.trophy.skin = s;
        this._monthFinishedCache[`${t}${i.toString().padStart(2, "0")}`] !==
          n &&
          ((this._monthFinishedCache[`${t}${i.toString().padStart(2, "0")}`] =
            n),
            n &&
            Laya.timer.once(300, this, () => {
              lc.getInstance().playSound("sounds/dc_trophy_dlg_sd.ogg"),
                this.showGetTrophyAnim(
                  s,
                  `${t}-${i.toString().padStart(2, "0")}`
                );
            })),
          n ? this.removeMask() : this.updateMask();
      }
      updatePlayBtnText() {
        const e = Dd.getDateFinishedStatus(this.dcManager.chosenDateStr);
        1 === e || 3 === e
          ? (this.playBtnText.text = "Restart")
          : 0 === e
            ? (this.playBtnText.text = "Play")
            : this.dcManager.currentDCDate === this.dcManager.chosenDateStr
              ? (this.playBtnText.text = "Continue")
              : (this.playBtnText.text = "Play");
      }
      addMask() {
        const e = this.trophy;
        (this.mask = new Laya.Image()),
          (this.mask.sizeGrid = this.trophy.sizeGrid),
          (this.mask.width = e.width),
          (this.mask.height = e.height),
          (this.mask.alpha = 0.5);
        const t = new Laya.ColorFilter([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        ]);
        (this.mask.filters = [t]),
          (this.mask.visible = !1),
          e.addChild(this.mask);
      }
      updateMask() {
        this.mask || this.addMask(),
          (this.mask.skin = this.trophy.skin),
          (this.mask.visible = !0);
      }
      removeMask() {
        this.mask && (this.mask.visible = !1);
      }
      onTrophyBtnClick() {
        (this.trophyRoom.owner.visible = !0),
          Al("h5_page_show", { page_name: "badge_room" });
      }
      onBackBtnClick() {
        this.hide(), this.uiManager.goToHome();
      }
      onPlayBtnClick() {
        let e = !1;
        this.dcManager.currentDCDate === this.dcManager.chosenDateStr &&
          (e = !0),
          (this.dcManager.currentDCDate = this.dcManager.chosenDateStr),
          this.uiManager.gameController.clearUIState("Date"),
          this.uiManager.gameController.startDcGame(e, "calendar"),
          this.hide();
      }
      showGetTrophyAnim(e, t) {
        this.trophyGetDialog.show(e, t);
      }
      showTrophyCheckDialog(e, t) {
        const i = Laya.loader
          .getRes(this.responsiveManager.srcOfTrophyCheckDialog)
          .create(),
          n = i.getComponent(Ec);
        this.responsiveManager.isMobile && ((i.scaleX = 2), (i.scaleY = 2)),
          (i.onClosed = () => {
            this.uiManager.mask.hide();
          }),
          n.show(e, t),
          this.uiManager.mask.show();
      }
      show() {
        this.uiManager.root.addChildAt(this.owner, this._index),
          (this.owner.visible = !0);
      }
      hide() {
        (this.owner.visible = !1), this.owner.removeSelf();
      }
    };
  function Gc(e) {
    const t = [],
      i = new Map(),
      n = new Map();
    for (const t of e) {
      const [s, a] = t.position,
        r = e.filter((e) => {
          const [t, i] = e.position;
          return (
            (i === a - 2 && t >= s - 2 && t <= s + 1) ||
            (t === s - 2 && i >= a - 2 && i <= a + 1)
          );
        });
      i.set(t, r), n.set(t, r.length);
    }
    for (const i of e) 0 === n.get(i) && t.push(i);
    const s = [];
    for (; t.length > 0;) {
      const e = t.shift();
      s.push(e);
      for (const [s, a] of i.entries()) {
        const i = a.indexOf(e);
        if (i > -1) {
          a.splice(i, 1);
          const e = n.get(s) - 1;
          n.set(s, e), 0 === e && t.push(s);
        }
      }
    }
    return s;
  }
  u([Fc(Laya.Button)], Hc.prototype, "trophyBtn", 2),
    u([Fc(Laya.Image)], Hc.prototype, "trophy", 2),
    u([Fc(Laya.Button)], Hc.prototype, "backBtn", 2),
    u([Fc(Laya.Button)], Hc.prototype, "playBtn", 2),
    u([Fc(Laya.Text)], Hc.prototype, "playBtnText", 2),
    u([Fc(fc)], Hc.prototype, "calendar", 2),
    u([Fc(Nc)], Hc.prototype, "trophyRoom", 2),
    u([Fc(bc)], Hc.prototype, "trophyGetDialog", 2),
    u([Fc(Ec)], Hc.prototype, "trophyCheckDialog", 2),
    (Hc = u([xc("NdRmOkoySvKqrr7ewN8H0w")], Hc));
  var { regClass: Uc, property: Kc } = Laya,
    Vc = class extends Laya.Script {
      constructor() {
        super(...arguments), (this._handlers = {});
      }
      onAwake() {
        (this.uiManager = wd.getInstance()),
          (this.gameStateManager = ac.getInstance()),
          (this.adManager = Od.getInstance()),
          (this.dataManager = sc.getInstance());
      }
      onEnable() {
        this.adManager.open && 0 === this.gameStateManager.state.shuffleTimes
          ? ((this.subtitle.text = "Out of Shuffles"),
            (this.getOneShuffleBtn.visible = !0),
            (this.shuffleBtn.visible = !1),
            Al("h5_ad_show_timing", {
              placement: "reward",
              position: "fail",
              game_type: this.dataManager.gameType,
            }))
          : 0 === this.gameStateManager.state.shuffleTimes
            ? ((this.subtitle.text = "Out of Shuffles"),
              (this.getOneShuffleBtn.visible = !1),
              (this.shuffleBtn.visible = !1))
            : ((this.subtitle.text = "Use shuffle?"),
              (this.getOneShuffleBtn.visible = !1),
              (this.shuffleBtn.visible = !0)),
          this.closeBtn.on(Laya.Event.CLICK, this, () => {
            this.owner.close(),
              this.uiManager.mask.hide(),
              this.owner.destroy(!0);
          }),
          this.shuffleBtn.on(Laya.Event.CLICK, this, () => {
            Al("h5_btn_click", {
              btn_name: "revive_shuffle",
              source: "fail_dlg",
            }),
              this.owner.close(),
              this.uiManager.mask.hide(),
              (this.owner.onClosed = () => {
                var e;
                null == (e = this._handlers.shuffle) || e.run(),
                  this.owner.destroy(!0);
              });
          }),
          this.getOneShuffleBtn.on(Laya.Event.CLICK, this, () =>
            _(this, null, function* () {
              Al("h5_btn_click", {
                btn_name: "revive_reward",
                source: "fail_dlg",
              });
              const e = () => {
                this.owner.close(),
                  this.uiManager.mask.hide(),
                  (this.owner.onClosed = () => {
                    var e;
                    null == (e = this._handlers.shuffle) || e.run(),
                      this.owner.destroy(!0);
                  });
              };
              if (this.adManager.ready)
                this.adManager.showAd({
                  type: "reward",
                  name: "none_match",
                  beforeReward: (e) => {
                    e();
                  },
                  adViewed: () => {
                    Al("h5_reward_received", { reward_type: "revive" }), e();
                  },
                  adDismissed: () => { },
                  afterAd: () => {
                    Al("h5_ad_show", {
                      placement: "reward",
                      position: "fail",
                      ad_network: "google",
                      ad_slot: null,
                    });
                  },
                  adBreakDone: (t) =>
                    _(this, null, function* () {
                      console.log("adBreakDone:::none_match", t);
                      const { breakStatus: i } = t;
                      if (this.adManager.isException(i)) {
                        Al("h5_ad_show", {
                          placement: "reward",
                          position: "fail",
                          ad_network: "google",
                          ad_slot: null,
                        });
                        const { viewed: t } =
                          yield this.adManager.showCustomAd();
                        t && e();
                      }
                    }),
                });
              else {
                Al("h5_ad_show", {
                  placement: "reward",
                  position: "fail",
                  ad_network: "learnings",
                  ad_slot: null,
                });
                const { viewed: t } = yield this.adManager.showCustomAd();
                t && e();
              }
            })
          ),
          this.restartBtn.on(Laya.Event.CLICK, this, () => {
            this.owner.close(),
              this.uiManager.mask.hide(),
              (this.owner.onClosed = () => {
                var e;
                null == (e = this._handlers.restart) || e.run(),
                  this.owner.destroy(!0);
              });
          });
      }
      setHandler(e, t, i) {
        this._handlers[e] = Laya.Handler.create(t, i, null, !1);
      }
      removeHandler(e) {
        this._handlers[e] &&
          (this._handlers[e].clear(), delete this._handlers[e]);
      }
      show() {
        this.owner.show(), this.uiManager.mask.show();
      }
      onDestroy() {
        Object.keys(this._handlers).forEach((e) => {
          this.removeHandler(e);
        });
      }
    };
  u([Kc(Laya.Sprite)], Vc.prototype, "closeBtn", 2),
    u([Kc(Laya.Button)], Vc.prototype, "shuffleBtn", 2),
    u([Kc(Laya.Button)], Vc.prototype, "getOneShuffleBtn", 2),
    u([Kc(Laya.Button)], Vc.prototype, "restartBtn", 2),
    u([Kc(Laya.Label)], Vc.prototype, "subtitle", 2),
    (Vc = u([Uc("mlSqSkLXQo-N9JQEOzH3jw")], Vc));
  var { regClass: Jc } = Laya,
    Wc = class extends Laya.Script {
      onStart() { }
      setProps(e) {
        (this.index = e.index),
          (this.zOrder = e.zOrder),
          (this.originalPos = e.pos),
          (this.owner.visible = !0);
      }
      setPos(e) {
        this.owner.pos(e.x, e.y);
      }
      setHandler(e, t) {
        this._handler = Laya.Handler.create(e, t, null, !1);
      }
      getCenterPosition() {
        return [this.owner.x, this.owner.y];
      }
      moveToPosition(e = null, t = null, i = 200, n) {
        return new Promise((s) => {
          const a = {};
          t && (a.y = t),
            e && (a.x = e),
            Laya.Tween.to(
              this.owner,
              a,
              i,
              n,
              Laya.Handler.create(this, () => {
                s();
              })
            );
        });
      }
      setPosition(e, t, i = !1, n = 100, s = Laya.Ease.linear) {
        i ? this.moveToPosition(e, t, n, s) : this.owner.pos(e, t);
      }
      removeSelf() {
        this.owner.visible = !1;
      }
      removeToPool() {
        this.owner.removeSelf(), Laya.Pool.recover(Wc.POOL_SIGN, this.owner);
      }
    };
  (Wc.POOL_SIGN = "Shadow"), (Wc = u([Jc("KS8bXSo0RzGHN5ZAhUXymw")], Wc));
  var { regClass: jc, property: qc } = Laya,
    Yc = class extends Laya.Script {
      constructor() {
        super(...arguments), (this.isHighlight = !1), (this.isShowTip = !1);
      }
      onAwake() { }
      onStart() {
        this.bindClickEvent();
      }
      setProps(e) {
        (this.type = e.type),
          (this.index = e.index),
          (this.texture = e.texture),
          (this.zOrder = e.zOrder),
          (this.originalPos = e.pos),
          (this.originalXYZ = e.originalXYZ),
          (this.owner.visible = !0),
          this.setTip(!1),
          this.setHighlight(!1),
          this.setTipSpine(!1),
          this.hideDieMask(),
          (this._shakeTimeline = null);
      }
      setHighlight(e, t = !1, i = !1, n = !1) {
        (this.isHighlight = e),
          (this.highlight.visible = e),
          (this.hlBg.visible = e),
          (this.hlSpine.visible = e),
          t && !i
            ? (this.setPosition(
              n ? this.originalPos.x : this.originalPos.x - 20,
              null,
              !0
            ),
              this.shadowComp.setPosition(
                n ? this.originalShadowPos.x : this.originalShadowPos.x - 20,
                null,
                !0
              ))
            : !t &&
            i &&
            (this.setPosition(
              n ? this.originalPos.x : this.originalPos.x + 20,
              null,
              !0
            ),
              this.shadowComp.setPosition(
                n ? this.originalShadowPos.x : this.originalShadowPos.x + 20,
                null,
                !0
              )),
          t &&
          i &&
          (this.setPosition(this.originalPos.x, this.owner.y),
            this.shadowComp.setPosition(
              this.originalShadowPos.x,
              this.originalShadowPos.y
            ));
      }
      setTip(e) {
        (this.isShowTip = e),
          (this.tip.visible = e),
          (this.tipSpine.visible = e),
          e ? this.playTipAnim() : (this.stopTipAnim(), (this.tip.alpha = 0.5));
      }
      setTipSpine(e) {
        (this.specialTipSpine.active = e),
          (this.specialTipSpine.visible = e),
          e ? this.playSpecialShakeAnim() : this.stopSpecialShakeAnim();
      }
      playTipAnim() {
        Laya.Tween.kill(this._tipTween),
          (this._tipTween = Laya.Tween.to(
            this.tip,
            { alpha: 0 },
            2e3,
            Laya.Ease.sineInOut,
            Laya.Handler.create(this, () => {
              this._tipTween = Laya.Tween.to(
                this.tip,
                { alpha: 0.5 },
                2e3,
                Laya.Ease.sineInOut,
                Laya.Handler.create(this, this.playTipAnim)
              );
            })
          ));
      }
      stopTipAnim() {
        Laya.Tween.kill(this._tipTween);
      }
      remove(e) {
        return _(this, null, function* () {
          yield this.playDestroyAnim(e);
        });
      }
      setPosition(e, t, i = !1, n = 100, s = Laya.Ease.linear) {
        i ? this.moveToPosition(e, t, n, s) : this.owner.pos(e, t);
      }
      shake() {
        const e = this.originalPos.x,
          t = this.originalShadowPos.x,
          i = 50;
        (this._shakeTimeline = new Laya.TimeLine()),
          (this._shadowShakeTimeline = new Laya.TimeLine());
        for (let n = 0; n < 4; n++)
          this._shakeTimeline
            .to(this.owner, { x: e - 4 }, i)
            .to(this.owner, { x: e + 4 }, i),
            this._shadowShakeTimeline
              .to(this.shadow, { x: t - 4 }, i)
              .to(this.shadow, { x: t + 4 }, i);
        this._shakeTimeline.to(this.owner, { x: e }, i),
          this._shadowShakeTimeline.to(this.shadow, { x: t }, i),
          this._shakeTimeline.play(0),
          this._shadowShakeTimeline.play(0);
      }
      playSpecialShakeAnim() {
        Laya.Tween.kill(this._specialShakeTween),
          Laya.Tween.kill(this._shadowSpecialShakeTween);
        const e = this.originalPos.y,
          t = this.owner.rotation,
          i = this.originalShadowPos.y,
          n = this.shadow.rotation;
        (this._specialShakeTween = Laya.Tween.to(
          this.owner,
          {},
          400,
          null,
          Laya.Handler.create(this, () => {
            this._specialShakeTween = Laya.Tween.to(
              this.owner,
              { y: e - 25 },
              250,
              Laya.Ease.sineOut,
              Laya.Handler.create(this, () => {
                this._specialShakeTween = Laya.Tween.to(
                  this.owner,
                  { rotation: -10 },
                  100,
                  Laya.Ease.sineInOut,
                  Laya.Handler.create(this, () => {
                    this._specialShakeTween = Laya.Tween.to(
                      this.owner,
                      { rotation: 10 },
                      100,
                      Laya.Ease.sineInOut,
                      Laya.Handler.create(this, () => {
                        this._specialShakeTween = Laya.Tween.to(
                          this.owner,
                          { rotation: -6 },
                          100,
                          Laya.Ease.sineInOut,
                          Laya.Handler.create(this, () => {
                            this._specialShakeTween = Laya.Tween.to(
                              this.owner,
                              { rotation: 6 },
                              100,
                              Laya.Ease.sineInOut,
                              Laya.Handler.create(this, () => {
                                this._specialShakeTween = Laya.Tween.to(
                                  this.owner,
                                  { rotation: t },
                                  100,
                                  Laya.Ease.sineInOut,
                                  Laya.Handler.create(this, () => {
                                    this._specialShakeTween = Laya.Tween.to(
                                      this.owner,
                                      { y: e },
                                      250,
                                      Laya.Ease.sineIn,
                                      Laya.Handler.create(this, () => {
                                        this._specialShakeTween = Laya.Tween.to(
                                          this.owner,
                                          {},
                                          750,
                                          Laya.Ease.sineIn,
                                          Laya.Handler.create(this, () => {
                                            this.playSpecialShakeAnim();
                                          })
                                        );
                                      })
                                    );
                                  })
                                );
                              })
                            );
                          })
                        );
                      })
                    );
                  })
                );
              })
            );
          })
        )),
          (this._shadowSpecialShakeTween = Laya.Tween.to(
            this.shadow,
            {},
            400,
            null,
            Laya.Handler.create(this, () => {
              this._shadowSpecialShakeTween = Laya.Tween.to(
                this.shadow,
                { y: i - 25 },
                250,
                Laya.Ease.sineOut,
                Laya.Handler.create(this, () => {
                  this._shadowSpecialShakeTween = Laya.Tween.to(
                    this.shadow,
                    { rotation: -10 },
                    100,
                    Laya.Ease.sineInOut,
                    Laya.Handler.create(this, () => {
                      this._shadowSpecialShakeTween = Laya.Tween.to(
                        this.shadow,
                        { rotation: 10 },
                        100,
                        Laya.Ease.sineInOut,
                        Laya.Handler.create(this, () => {
                          this._shadowSpecialShakeTween = Laya.Tween.to(
                            this.shadow,
                            { rotation: -6 },
                            100,
                            Laya.Ease.sineInOut,
                            Laya.Handler.create(this, () => {
                              this._shadowSpecialShakeTween = Laya.Tween.to(
                                this.shadow,
                                { rotation: 6 },
                                100,
                                Laya.Ease.sineInOut,
                                Laya.Handler.create(this, () => {
                                  this._shadowSpecialShakeTween = Laya.Tween.to(
                                    this.shadow,
                                    { rotation: n },
                                    100,
                                    Laya.Ease.sineInOut,
                                    Laya.Handler.create(this, () => {
                                      this._shadowSpecialShakeTween =
                                        Laya.Tween.to(
                                          this.shadow,
                                          { y: i },
                                          250,
                                          Laya.Ease.sineIn,
                                          Laya.Handler.create(this, () => {
                                            this._shadowSpecialShakeTween =
                                              Laya.Tween.to(
                                                this.shadow,
                                                {},
                                                750,
                                                Laya.Ease.sineIn,
                                                Laya.Handler.create(
                                                  this,
                                                  () => {
                                                    this.playSpecialShakeAnim();
                                                  }
                                                )
                                              );
                                          })
                                        );
                                    })
                                  );
                                })
                              );
                            })
                          );
                        })
                      );
                    })
                  );
                })
              );
            })
          ));
      }
      stopSpecialShakeAnim() {
        Laya.Tween.kill(this._specialShakeTween),
          Laya.Tween.kill(this._shadowSpecialShakeTween),
          (this.owner.y = this.originalPos.y),
          this.originalShadowPos && (this.shadow.y = this.originalShadowPos.y),
          (this.owner.rotation = 0),
          (this.shadow.rotation = 0);
      }
      playDestroyAnim(e) {
        this.shadowComp.removeSelf();
        const [t, i] = e,
          n = 2 * Math.abs(t.x - i.x) * 0.07,
          s = t.x > i.x;
        return new Promise((e) => {
          Laya.Tween.to(
            this.owner,
            { x: t.x, y: t.y, anchorX: s ? 1 : 0 },
            250,
            Laya.Ease.sineOut,
            Laya.Handler.create(this, () => {
              Laya.Tween.to(
                this.owner,
                { x: i.x, y: i.y, anchorX: s ? 0 : 1 },
                n,
                Laya.Ease.sineIn,
                Laya.Handler.create(this, () => {
                  this.fadeOut(), e();
                })
              );
            })
          );
        });
      }
      undoRemoveSelf() {
        (this.owner.visible = !0), (this.shadow.visible = !0);
      }
      getCenterPosition() {
        return [this.owner.x, this.owner.y];
      }
      moveToPosition(e = null, t = null, i = 200, n) {
        return new Promise((s) => {
          const a = {};
          t && (a.y = t),
            e && (a.x = e),
            Laya.Tween.to(
              this.owner,
              a,
              i,
              n,
              Laya.Handler.create(this, () => {
                s();
              })
            );
        });
      }
      bindClickEvent() {
        this.owner.on(Laya.Event.CLICK, this, this.onClick);
      }
      onClick() {
        var e;
        null == (e = this._handler) || e.runWith(this);
      }
      setHandler(e, t) {
        this._handler = Laya.Handler.create(e, t, null, !1);
      }
      fadeOut() {
        Laya.Tween.to(
          this.owner,
          { alpha: 0, scaleX: 0.7, scaleY: 0.7 },
          150,
          Laya.Ease.linear,
          Laya.Handler.create(this, () => {
            this.removeSelf(),
              (this.owner.alpha = 1),
              (this.owner.scaleX = 1),
              (this.owner.scaleY = 1),
              (this.owner.anchorX = 0.5),
              (this.owner.x = this.originalPos.x),
              (this.owner.y = this.originalPos.y),
              (this.owner.zOrder = this.zOrder);
          })
        );
      }
      removeSelf() {
        this.owner.visible = !1;
      }
      removeToPool() {
        this.owner.removeSelf(), Laya.Pool.recover(Yc.POOL_SIGN, this.owner);
      }
      onDestroy() {
        var e;
        null == (e = this._handler) || e.clear(), (this._handler = null);
      }
      showDieMask() {
        Laya.Tween.to(
          this.skin,
          { color: "#7b7b7b" },
          1e3,
          Laya.Ease.linearIn
        ).interp(Laya.Tween.seperateChannel);
      }
      hideDieMask() {
        this.skin.color = "#ffffff";
      }
    };
  (Yc.POOL_SIGN = "Tile"),
    u([qc(Laya.Image)], Yc.prototype, "skin", 2),
    u([qc(Laya.Sprite)], Yc.prototype, "highlight", 2),
    u([qc(Laya.Sprite)], Yc.prototype, "hlBg", 2),
    u([qc(Laya.Sprite)], Yc.prototype, "hlSpine", 2),
    u([qc(Laya.Sprite)], Yc.prototype, "tip", 2),
    u([qc(Laya.Sprite)], Yc.prototype, "tipSpine", 2),
    u([qc(Laya.Sprite)], Yc.prototype, "specialTipSpine", 2),
    (Yc = u([jc("FofFFElcTl2UurlIESikgQ")], Yc));
  var { regClass: zc, property: Qc } = Laya,
    $c = class extends Laya.Script {
      constructor() {
        super(...arguments),
          (this._maxScale = 0.8),
          (this._finalScale = 0),
          (this.safeWidth = 50),
          (this.safeHeight = 50),
          (this.specialTileIndices = new Set()),
          (this._lockTimeline = []),
          (this._currentShowTipTilesIndex = []);
      }
      onAwake() {
        (this.uiManager = wd.getInstance()),
          (this.soundManager = lc.getInstance()),
          (this.dataManager = sc.getInstance()),
          (this.gameController = this.owner.parent.getComponent(ud)),
          (this.responsiveManager = $h.getInstance());
      }
      preheat() {
        return _(this, null, function* () {
          const e = [];
          for (let t = 0; t < 100; t++)
            e.push({
              position: [2, 0, 0],
              type: 24,
              texture: 900,
              status: "unselected",
              index: t,
            });
          yield this.renderBoardAndTiles(e, !1), this.clear();
        });
      }
      start(e) {
        return _(this, null, function* () {
          this.clear(), yield this.renderBoardAndTiles(e);
        });
      }
      clear() {
        if (this.tilesDict) {
          for (const e of this.tilesDict.values()) {
            e.shadow.getComponent(Wc).removeToPool(), e.removeToPool();
          }
          this.tilesDict.clear(), this.specialTileIndices.clear();
        }
      }
      getTile() {
        return _(this, null, function* () {
          return Laya.Pool.getItemByCreateFun(
            Yc.POOL_SIGN,
            () =>
              _(this, null, function* () {
                return Laya.loader.getRes("resources/tile.lh").create();
              }),
            this
          );
        });
      }
      getShadow() {
        return _(this, null, function* () {
          return Laya.Pool.getItemByCreateFun(
            Wc.POOL_SIGN,
            () =>
              _(this, null, function* () {
                return Laya.loader.getRes("resources/shadow.lh").create();
              }),
            this
          );
        });
      }
      renderBoardAndTiles(e, t = !0) {
        return _(this, null, function* () {
          var i;
          (this.lockMask.visible = !0), (this.tilesDict = new Map());
          const {
            tileWidth: n,
            tileHeight: s,
            tileStep: a,
          } = sc.getInstance().gameSettings,
            r = this.owner.width / 2,
            o = this.owner.height / 2,
            l = n + -15,
            h = s + -20;
          let c = 0,
            d = 0,
            u = 0,
            p = 0,
            g = 0;
          for (const t of e) {
            const { position: e } = t,
              [i, n, s] = e;
            (c = Math.max(c, i)),
              (d = Math.max(d, n)),
              (u = Math.max(u, s)),
              0 === i && (p = Math.max(p, 25 * s)),
              0 === n && (g = Math.max(g, 30 * s));
          }
          const f = ((c + a) * l) / a + p - -15,
            m = ((d + a) * h) / a + g - -20,
            y = Math.min(
              (this.owner.width - this.safeWidth) / f,
              (this.owner.height - this.safeHeight) / m,
              this._maxScale
            );
          (this._finalScale = y), this.owner.scale(y, y);
          const v = r - ((c * l) / a + p - -15) / 2,
            _ = o - ((d * h) / a + g - -20) / 2,
            I = (function (e) {
              const t = [],
                i = [];
              for (const t of e) {
                const e = t.position[2];
                i[e] || (i[e] = []), i[e].push(t);
              }
              for (const e of i.filter((e) => !!e)) {
                const i = Gc(e);
                t.push(...i);
              }
              return t;
            })(e.filter((e) => "removed" !== e.status)),
            S = [];
          for (const [e, t] of I.entries()) {
            const i = t.position[2];
            S[i] || (S[i] = []), S[i].push({ zOrder: e, tile: t });
          }
          for (let e = 0; e < S.length; e++) {
            const t = S[e],
              n = 2 * t[0].zOrder,
              s = [];
            for (const { tile: e } of t) {
              const { position: t, index: i } = e,
                [r, o, c] = t,
                d = new Laya.Point(
                  (r * l) / a + v - 25 * c - 3 + p,
                  (o * h) / a + _ - 30 * c - 2 + g
                ),
                u = { index: i, zOrder: n, pos: d },
                f = yield this.getShadow(),
                m = f.getComponent(Wc);
              m.setProps(u),
                m.owner.pos(d.x, d.y),
                (m.owner.zOrder = n),
                (m.owner.mouseEnabled = !1),
                s.push(f),
                this.owner.addChild(f);
            }
            for (const { zOrder: e, tile: n } of t) {
              const t = s.shift(),
                { position: r, index: o, texture: c } = n,
                d = tc.getInstance().getSkinPath(c),
                [u, f, m] = r,
                y = new Laya.Point(
                  (u * l) / a + v - 25 * m + p,
                  (f * h) / a + _ - 30 * m + g
                ),
                I = {
                  type: n.type,
                  index: o,
                  texture: c,
                  zOrder: 2 * e + 1,
                  pos: y,
                  originalXYZ: r,
                },
                S = yield this.getTile(),
                L = S.getComponent(Yc);
              (L.shadow = t),
                (L.shadowComp = t.getComponent(Wc)),
                (L.originalShadowPos = L.shadowComp.originalPos),
                L.setProps(I),
                L.setHandler(this, this.onTileClick),
                (L.skin.skin = d),
                (L.owner.zOrder = 2 * e + 1),
                [4, 6].includes(
                  null == (i = this.dataManager.levelSettings)
                    ? void 0
                    : i.level
                ) &&
                [3e3, 3001, 3002, 3003, 4e3, 4001, 4002, 4003].includes(c) &&
                (L.setTipSpine(!0), this.specialTileIndices.add(o)),
                L.owner.pos(y.x, y.y),
                this.tilesDict.set(o, L),
                this.owner.addChild(S);
            }
          }
          return (
            (this.lockMask.visible = !1),
            t && (yield this.playGameStartAnimation()),
            Promise.resolve()
          );
        });
      }
      showSpecialMask(e) {
        const t = new Laya.Point(0, 0),
          i = this.owner.localToGlobal(t);
        (this.overlayMask = new Laya.Sprite()),
          this.overlayMask.size(
            Laya.stage.width / this._finalScale,
            Laya.stage.height / this._finalScale
          ),
          this.overlayMask.graphics.clear(),
          this.overlayMask.graphics.drawRect(
            0,
            0,
            Laya.stage.width / this._finalScale,
            Laya.stage.height / this._finalScale,
            "#000000"
          ),
          (this.overlayMask.alpha = 0.6),
          (this.overlayMask.zOrder = e),
          this.overlayMask.pos(
            -i.x / this._finalScale,
            -i.y / this._finalScale
          ),
          this.owner.addChild(this.overlayMask),
          (this.overlayMask.mouseEnabled = !0),
          (this.overlayMask.mouseThrough = !1),
          Laya.stage.on(Laya.Event.RESIZE, this, this.resizeSpecialMask);
      }
      resizeSpecialMask() {
        Laya.timer.frameOnce(2, this, () => {
          const e = new Laya.Point(0, 0),
            t = this.owner.localToGlobal(e);
          this.overlayMask.graphics.clear(),
            this.overlayMask.graphics.drawRect(
              0,
              0,
              Laya.stage.width / this._finalScale,
              Laya.stage.height / this._finalScale,
              "#000000"
            ),
            this.overlayMask.size(
              Laya.stage.width / this._finalScale,
              Laya.stage.height / this._finalScale
            ),
            this.overlayMask.pos(
              -t.x / this._finalScale,
              -t.y / this._finalScale
            );
        });
      }
      hideSpecialMask() {
        Laya.stage.off(Laya.Event.RESIZE, this, this.resizeSpecialMask),
          this.overlayMask.removeSelf(),
          (this.overlayMask = null);
      }
      playGameStartAnimation() {
        return _(this, null, function* () {
          const e = this.owner.width / 2;
          let t = 0;
          this.soundManager.playSound("sounds/mahjong_show_sd1.ogg");
          for (const i of this.tilesDict.values()) {
            const n = i.originalPos,
              s = i.shadow.getComponent(Wc),
              a = s.originalPos,
              r =
                ((this.owner.width / 2) * (1 - this._finalScale)) /
                this._finalScale;
            n.x < e
              ? (i.owner.pos(0 - (e - n.x) - r, n.y),
                s.owner.pos(0 - (e - a.x) - r, a.y))
              : (i.owner.pos(this.owner.width + (n.x - e) + r, n.y),
                s.owner.pos(this.owner.width + (a.x - e) + r, a.y)),
              i.moveToPosition(n.x, n.y, 300 + 2 * t, Laya.Ease.linear),
              s.moveToPosition(a.x, a.y, 300 + 2 * t, Laya.Ease.linear),
              t++;
          }
          const i = 2 * t + 300;
          return new Promise((e) => {
            Laya.timer.once(i, this, e);
          });
        });
      }
      onTileClick(e) {
        const { canRemove: t, canSelect: i } =
          this.gameController.onTileClick(e);
        t
          ? this.soundManager.playSound("sounds/tile_right_click_sd.wav")
          : i
            ? this.soundManager.playSound("sounds/tile_click_sd.wav")
            : this.soundManager.playSound("sounds/mahjong_deselect_sd.ogg");
      }
      onTileSelectChange({ tileStates: e, isFreeLeft: t, isFreeRight: i }) {
        for (const n of e) {
          const e = this.tilesDict.get(n.index),
            s = this.specialTileIndices.has(n.index);
          e && "selected" === n.status
            ? e.setHighlight(!0, t, i, s)
            : e &&
            "unselected" === n.status &&
            (e.undoRemoveSelf(),
              e.setHandler(this, this.onTileClick),
              e.setHighlight(!1, t, i, s));
        }
      }
      addTip(e, t) {
        const i = this.tilesDict.get(e),
          n = this.tilesDict.get(t);
        this.soundManager.playSound("sounds/hint_use_sd.ogg"),
          i &&
          n &&
          (this.clearCurrentTipTiles(),
            i.setTip(!0),
            n.setTip(!0),
            (this._currentShowTipTilesIndex = [e, t]));
      }
      clearCurrentTipTiles() {
        this._currentShowTipTilesIndex.forEach((e) => {
          this.tilesDict.get(e).setTip(!1);
        }),
          (this._currentShowTipTilesIndex = []);
      }
      onTileRemove(e, t, i) {
        return _(this, null, function* () {
          const n = this.tilesDict.get(e),
            s = this.tilesDict.get(t);
          n &&
            s &&
            (n.setHighlight(!1),
              s.setHighlight(!1),
              n.setTip(!1),
              s.setTip(!1),
              n.setHandler(this, null),
              s.setHandler(this, null),
              (this._currentShowTipTilesIndex.includes(e) ||
                this._currentShowTipTilesIndex.includes(t)) &&
              this.clearCurrentTipTiles());
          const [a, r] = n.getCenterPosition(),
            [o, l] = s.getCenterPosition(),
            h = (a + o) / 2,
            c = (r + l) / 2,
            d = 1.5 * n.owner.width,
            u = [
              [Math.min(a, o) - d, c],
              [Math.max(a, o) + d, c],
            ],
            p = a === o ? (r > l ? u[0] : u[1]) : a < h ? u[0] : u[1],
            g = a === o ? (r > l ? u[1] : u[0]) : o < h ? u[0] : u[1];
          (n.owner.zOrder = 1e3),
            (s.owner.zOrder = 1e3),
            yield Promise.all([
              n.remove([
                { x: p[0], y: p[1] },
                { x: h, y: c },
              ]),
              s.remove([
                { x: g[0], y: g[1] },
                { x: h, y: c },
              ]),
            ]);
          const f = new Laya.Point(h, c);
          return (
            this.playMagicAnim(f),
            this.playScoreAnim(f, i),
            this.soundManager.playSound("sounds/mahjong_match_sd.wav"),
            Promise.resolve()
          );
        });
      }
      autoPlay(e, t) {
        const i = this.tilesDict.get(e),
          n = this.tilesDict.get(t);
        i.owner.event(Laya.Event.CLICK), n.owner.event(Laya.Event.CLICK);
      }
      playMagicAnim(e) {
        sc.getInstance().state.combo <= 2
          ? ((this.magic.visible = !0),
            (this.magic.zOrder = 1e3),
            this.magic.pos(e.x, e.y),
            this.magic.scale(1.5 / this._finalScale, 1.5 / this._finalScale),
            this.magic.getComponent(Laya.Spine2DRenderNode).play("Appear", !1))
          : sc.getInstance().state.combo > 2 &&
          ((this.flowerMagic.visible = !0),
            (this.flowerMagic.zOrder = 1e3),
            this.flowerMagic.pos(e.x, e.y),
            this.flowerMagic.scale(
              1.5 / this._finalScale,
              1.5 / this._finalScale
            ),
            this.flowerMagic
              .getComponent(Laya.Spine2DRenderNode)
              .play("Appear", !1));
      }
      playScoreAnim(e, t) {
        const i = 1.2 / this._finalScale,
          n = 1 / this._finalScale,
          s = e.y - 100 / this._finalScale,
          a = e.y - 110 / this._finalScale,
          r = e.y - 130 / this._finalScale,
          o = e.y - 140 / this._finalScale;
        (this.deltaScore.zOrder = 1e3),
          this.deltaScore.pos(e.x, s),
          (this.deltaScore.text = `+${t}`),
          this.deltaScore.scale(n, n),
          this.deltaScoreTimeline && this.deltaScoreTimeline.destroy(),
          (this.deltaScoreTimeline = new Laya.TimeLine()),
          this.deltaScoreTimeline.to(
            this.deltaScore,
            { y: a, scaleX: i, scaleY: i, alpha: 1 },
            100,
            Laya.Ease.linear
          ),
          this.deltaScoreTimeline.to(
            this.deltaScore,
            { y: r, scaleX: n, scaleY: n },
            200,
            Laya.Ease.linear
          ),
          this.deltaScoreTimeline.to(
            this.deltaScore,
            { y: o, alpha: 0 },
            200,
            Laya.Ease.linearOut
          ),
          this.deltaScoreTimeline.play(0);
      }
      onNotFreeByCover(e, t) {
        const i = this.tilesDict.get(e),
          n = this.tilesDict.get(t);
        if (i && n) {
          const e = this.owner.width / 2,
            t = this.owner.height / 2,
            n = i.owner.x,
            s = i.owner.y,
            a = e + (n - e) * this._finalScale,
            r =
              t +
              (s - t) * this._finalScale +
              (i.owner.height / 4) * this._finalScale,
            o = a + this.owner.x - e,
            l = r + this.owner.y - t - (i.owner.height / 2) * this._finalScale;
          this.uiManager.showToast(
            "Locked by above tiles",
            new Laya.Point(o, l)
          ),
            i.shake();
        }
      }
      onNotFreeByLeftRight(e, t, i) {
        const n = this.tilesDict.get(e),
          s = this.tilesDict.get(t),
          a = this.tilesDict.get(i);
        if (n && s && a) {
          const e = this.owner.width / 2,
            t = this.owner.height / 2,
            i = n.owner.x,
            s = n.owner.y,
            a = e + (i - e) * this._finalScale,
            r =
              t +
              (s - t) * this._finalScale +
              (n.owner.height / 4) * this._finalScale,
            o = new Laya.Point(i - n.owner.width / 2, s),
            l = new Laya.Point(i + (n.owner.width - 30) / 2, s),
            h = a + this.owner.x - e,
            c = r + this.owner.y - t - (n.owner.height / 2) * this._finalScale;
          this.playLockAnim(o, l),
            this.uiManager.showToast(
              "Locked by left and right",
              new Laya.Point(h, c)
            ),
            n.shake();
        }
      }
      die() {
        (this.lockMask.visible = !0),
          Laya.timer.once(600, this, () =>
            _(this, null, function* () {
              this.tilesDict.forEach((e) => {
                e.showDieMask();
              }),
                this.soundManager.playSound("sounds/no_match_sd.wav"),
                Laya.timer.once(1500, this, () =>
                  _(this, null, function* () {
                    const e = Laya.loader
                      .getRes(this.responsiveManager.srcOfNoneMatchDialog)
                      .create()
                      .getComponent(Vc);
                    e.setHandler("shuffle", this.gameController, () => {
                      this.gameController.shuffle();
                    }),
                      e.setHandler("restart", this.gameController, () => {
                        this.gameController.restart("fail");
                      }),
                      e.show();
                  })
                );
            })
          );
      }
      updateSkinsAfterShuffle() {
        for (const [e, t] of this.tilesDict.entries()) {
          const i = sc.getInstance().tiles.find((t) => t.index === e);
          if (!i) continue;
          const { texture: n } = i,
            s = tc.getInstance().getSkinPath(n);
          t.skin.skin = s;
        }
      }
      playShuffleAnim() {
        Laya.timer.once(300, this, () => {
          this.soundManager.playSound("sounds/shuffle_use_sd.wav");
        }),
          this.gameController.clearSelectedTiles(),
          (this.lockMask.visible = !1);
        const e = this.owner.width / 2,
          t = this.owner.height / 2,
          i = new Map();
        for (const n of this.tilesDict.values()) {
          (n.shadow.visible = !1), n.setTip(!1), n.hideDieMask();
          const s = n.owner;
          i.set(s, { x: s.x, y: s.y }),
            Laya.Tween.to(s, { x: e, y: t }, 500, Laya.Ease.backIn);
        }
        Laya.timer.once(800, this, () => {
          this.updateSkinsAfterShuffle();
          for (const e of this.tilesDict.values()) {
            const t = e.owner,
              n = i.get(t);
            n &&
              Laya.Tween.to(
                t,
                { x: n.x, y: n.y },
                500,
                Laya.Ease.backOut,
                Laya.Handler.create(this, () => {
                  t.visible &&
                    ((e.shadow.alpha = 0),
                      (e.shadow.visible = !0),
                      Laya.Tween.to(
                        e.shadow,
                        { alpha: 1 },
                        250,
                        Laya.Ease.linear,
                        Laya.Handler.create(this, () => {
                          this.gameController.owner.mouseEnabled = !0;
                        })
                      ));
                })
              );
          }
        });
      }
      playLockAnim(e, t) {
        this.leftLock.pos(e.x, e.y),
          this.rightLock.pos(t.x, t.y),
          (this.leftLock.zOrder = 1e3),
          (this.rightLock.zOrder = 1e3);
        const i = 15;
        this._lockTimeline.length > 0
          ? this._lockTimeline.forEach((e) => {
            e.play(0);
          })
          : ((this._lockTimeline = [new Laya.TimeLine(), new Laya.TimeLine()]),
            this._lockTimeline[0].to(
              this.leftLock,
              { scaleX: 1.2, scaleY: 1.2, alpha: 1 },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[0].to(
              this.leftLock,
              { rotation: -15 },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[0].to(
              this.leftLock,
              { rotation: i },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[0].to(
              this.leftLock,
              { rotation: -15 },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[0].to(
              this.leftLock,
              { rotation: i },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[0].to(
              this.leftLock,
              { rotation: 0 },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[0].to(
              this.leftLock,
              { scaleX: 0, scaleY: 0, alpha: 0 },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[1].to(
              this.rightLock,
              { scaleX: 1.2, scaleY: 1.2, alpha: 1 },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[1].to(
              this.rightLock,
              { rotation: -15 },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[1].to(
              this.rightLock,
              { rotation: i },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[1].to(
              this.rightLock,
              { rotation: -15 },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[1].to(
              this.rightLock,
              { rotation: i },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[1].to(
              this.rightLock,
              { rotation: 0 },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[1].to(
              this.rightLock,
              { scaleX: 0, scaleY: 0, alpha: 0 },
              200,
              Laya.Ease.linear
            ),
            this._lockTimeline[0].play(0),
            this._lockTimeline[1].play(0));
      }
      drawCircle(e, t, i, n = "#FF0000") {
        const s = new Laya.Sprite();
        return (
          (s.name = "circle"),
          s.size(2 * i, 2 * i),
          s.pos(e, t),
          s.graphics.drawCircle(0, 0, i, n),
          (s.zOrder = 2e3),
          this.owner.addChild(s),
          s
        );
      }
      clearCircle() {
        this.owner.children.forEach((e) => {
          e instanceof Laya.Sprite && "circle" === e.name && (e.visible = !1);
        });
      }
    };
  u([Qc({ type: Laya.Sprite, private: !1 })], $c.prototype, "lockMask", 2),
    u([Qc({ type: Laya.Label, private: !1 })], $c.prototype, "deltaScore", 2),
    u([Qc({ type: Laya.Sprite, private: !1 })], $c.prototype, "magic", 2),
    u([Qc({ type: Laya.Sprite, private: !1 })], $c.prototype, "flowerMagic", 2),
    u([Qc(Laya.Sprite)], $c.prototype, "leftLock", 2),
    u([Qc(Laya.Sprite)], $c.prototype, "rightLock", 2),
    ($c = u([zc("venbAdQlQ0ObkHlxzIwNUQ")], $c));
  var { regClass: Zc, property: Xc } = Laya,
    ed = class extends Laya.Script {
      setNum(e) {
        this.numBox.removeChildren();
        for (let t = 0; t < e.toString().length; t++) {
          const i = new Laya.Image(),
            n =
              Number(e.toString()[t]) + 2 > 9
                ? Number(e.toString()[t]) + 2
                : `0${Number(e.toString()[t]) + 2}`;
          (i.anchorX = 0.5),
            (i.anchorY = 0.5),
            (i.skin = `atlas/images/play/play_pic_word_00${n}.png`),
            this.numBox.addChild(i);
        }
        e.toString().length > 1
          ? this.spine.pos(560, 77)
          : this.spine.pos(510, 77),
          this.playComboAnim();
      }
      playComboAnim() {
        this._textTimeline && this._textTimeline.destroy(),
          this._numTimeline && this._numTimeline.destroy(),
          (this.text.scaleX = 0),
          (this.text.scaleY = 0),
          (this.text.alpha = 1),
          (this.numBox.scaleX = 2),
          (this.numBox.scaleY = 2),
          (this.numBox.alpha = 1),
          (this._textTimeline = new Laya.TimeLine()),
          (this._numTimeline = new Laya.TimeLine()),
          this._textTimeline.to(
            this.text,
            { scaleX: 1, scaleY: 1 },
            300,
            Laya.Ease.backOut
          ),
          this._textTimeline.to(
            this.text,
            { alpha: 0 },
            300,
            Laya.Ease.linearIn,
            400
          ),
          this._numTimeline.to(
            this.numBox,
            { scaleX: 1, scaleY: 1 },
            300,
            Laya.Ease.backOut
          ),
          this._numTimeline.to(
            this.numBox,
            { alpha: 0 },
            300,
            Laya.Ease.linearIn,
            400
          ),
          this._textTimeline.play(0),
          this._numTimeline.play(0),
          this.spine.getComponent(Laya.Spine2DRenderNode).play("combo", !1);
      }
    };
  u([Xc(Laya.Image)], ed.prototype, "text", 2),
    u([Xc(Laya.Box)], ed.prototype, "numBox", 2),
    u([Xc(Laya.Image)], ed.prototype, "spine", 2),
    (ed = u([Zc("off1rxwoSC-L0VVWRrvW9w")], ed));
  var { regClass: td, property: id } = Laya,
    nd = class extends Laya.Script {
      constructor() {
        super(...arguments),
          (this.CONTINUE_BTN_INDEX = 0),
          (this._tips = [
            "Nice Try! You're a genius!",
            "Your logic skills were greatly improved!",
            "Amazing victory! You're a true Mahjong master! ",
            "Steady Mind! Keep up your unbeatable focus! ",
          ]),
          (this._titles = [
            "Strategic!",
            "Perceptive!",
            "Intelligent!",
            "Mental Giant!",
          ]),
          (this._lastTitleIndex = -1),
          (this._lastTipsIndex = -1);
      }
      onStart() {
        (this.owner.visible = !1),
          (this.gameController = this.owner.parent.getComponent(ud)),
          this.nextLevelBtn.on(Laya.Event.CLICK, this, this.onContinueBtnClick),
          this.dcBtn.on(Laya.Event.CLICK, this, this.onDcBtnClick),
          (this.soundManager = lc.getInstance()),
          (this.dataManager = sc.getInstance()),
          (this.dcManager = Td.getInstance()),
          (this.uiManager = wd.getInstance()),
          (this.responsiveManager = $h.getInstance()),
          (this.eventManager = Vh.getInstance());
      }
      onContinueBtnClick() {
        "dc" === this.dataManager.gameType
          ? (this.uiManager.goToDailyChallenge("dc_success"),
            (this.owner.visible = !1),
            Laya.timer.once(300, this, () => {
              this.eventManager.event(Uh, {
                dateStr: this.dcManager.currentDCDate,
              });
            }))
          : this.gameController.nextLevel(!0);
      }
      onDcBtnClick() {
        if (
          (this.gameController.nextLevel(!1),
            Al("h5_btn_click", { btn_name: "dc", source: "classic_success" }),
            this.dcManager.isDateFinished(this.dcManager.today))
        )
          this.uiManager.goToDailyChallenge("classic_success");
        else {
          this.dcManager.currentDCDate = this.dcManager.dateToString(
            this.dcManager.today
          );
          const e = Number(this.dcManager.currentDCDate.slice(0, 4)),
            t = Number(this.dcManager.currentDCDate.slice(4, 6));
          (this.uiManager.calendar.pageMonth = t),
            (this.uiManager.calendar.pageYear = e),
            this.uiManager.calendar.calendarInit(!1),
            (this.owner.visible = !1),
            this.uiManager.gameController.clearUIState("Date"),
            this.uiManager.gameController.startDcGame(!0, "success");
        }
        this.owner.visible = !1;
      }
      getRandomStringNonRepeating(e, t) {
        if (!e || 0 === e.length) return { text: "", index: -1 };
        if (1 === e.length) return { text: e[0], index: 0 };
        const i = [];
        for (let n = 0; n < e.length; n++) n !== t && i.push(n);
        const n = i[Math.floor(Math.random() * i.length)];
        return { text: e[n], index: n };
      }
      moveElementUp(e, t = 20, i = 500, n = 0) {
        return new Promise((s) => {
          const a = e.y;
          Laya.Tween.to(
            e,
            { y: a - t },
            i,
            Laya.Ease.quadOut,
            Laya.Handler.create(this, s),
            n
          );
        });
      }
      showResult({ score: e }) {
        if (
          (this.soundManager.playSound("sounds/success_sd.ogg"),
            "dc" === this.dataManager.gameType)
        )
          (this.nextLevelLabel.text = "Continue"),
            (this.nextLevelBtn.centerX = 0),
            (this.dcBtn.visible = !1),
            (this.tips.text = this.dcManager.currentDCDate.replace(
              /(\d{4})(\d{2})(\d{2})/,
              "$1/$2/$3"
            ));
        else {
          (this.nextLevelLabel.text = "Next Level"),
            (this.nextLevelBtn.centerX = this.responsiveManager.isMobile
              ? 0
              : 256),
            (this.dcBtn.visible = !0);
          const e = this.getRandomStringNonRepeating(
            this._tips,
            this._lastTipsIndex
          );
          (this.tips.text = e.text), (this._lastTipsIndex = e.index);
        }
        (this.score.text = `${e}`), (this.owner.visible = !0);
        const t = this.flower.getComponent(Laya.Spine2DRenderNode);
        t.play("Appear", !1);
        this.petal.getComponent(Laya.Spine2DRenderNode).play("Loop", !0),
          Laya.timer.once(1e3, this, () => {
            t.play("Loop", !0);
          });
        const i = this.getRandomStringNonRepeating(
          this._titles,
          this._lastTitleIndex
        );
        (this.title.text = i.text), (this._lastTitleIndex = i.index);
      }
    };
  u([id(Laya.Label)], nd.prototype, "title", 2),
    u([id(Laya.Label)], nd.prototype, "tips", 2),
    u([id(Laya.Sprite)], nd.prototype, "flower", 2),
    u([id(Laya.Sprite)], nd.prototype, "petal", 2),
    u([id(Laya.Label)], nd.prototype, "score", 2),
    u([id(Laya.Button)], nd.prototype, "nextLevelBtn", 2),
    u([id(Laya.Label)], nd.prototype, "nextLevelLabel", 2),
    u([id(Laya.Button)], nd.prototype, "dcBtn", 2),
    (nd = u([td("qI6U-I_KQ8OZGWIx1Km5Pg")], nd));
  var { regClass: sd, property: ad } = Laya,
    rd = class extends Laya.Script {
      constructor() {
        super(...arguments), (this._sortedTiles = []);
      }
      onAwake() {
        (this.owner.zOrder = 9999), (this.eventManager = Vh.getInstance());
      }
      showGuide(e, t) {
        switch (e) {
          case "1_1": {
            (this.guideTextInfo.text =
              "Match [color=#ffe117]two of the same[/color] tile!"),
              (this.guideTextBox.visible = !0);
            const i = t.getTileComponent(0);
            this.showHand(i),
              this.eventManager.once(Th, this, (i) => {
                const { tileStates: n } = i;
                if (0 === n[0].index && "1_1" === e) {
                  const e = t.getTileComponent(1);
                  this.showHand(e);
                }
              }),
              this.eventManager.once(Mh, this, () => {
                this.hand.visible = !1;
              });
            break;
          }
          case "1_2":
            (this.guideTextInfo.text =
              "Match [color=#ffe117]the top tiles[/color] to unlock other tiles!"),
              (this.guideTextBox.visible = !0);
            break;
          case "1_3":
            (this.guideTextInfo.text =
              "Match [color=#ffe117]the tiles on the side[/color] to unlock other tiles!"),
              (this.guideTextBox.visible = !0);
            break;
          case "4":
          case "6": {
            const e = t.getSpecialTileComponents();
            this._sortedTiles = [...e].sort((e, t) => e.owner.x - t.owner.x);
            const i = this._sortedTiles[0],
              n = this._sortedTiles[3],
              s = new Laya.Point(0, i.owner.height),
              a = new Laya.Point(n.owner.width, n.owner.height),
              r = i.owner.localToGlobal(s),
              o = n.owner.localToGlobal(a),
              l = (r.x + o.x) / 2,
              h = r.y + 40;
            this.specialGuideBox.pos(l, h),
              (this.specialGuideBox.visible = !0),
              Laya.stage.on(
                Laya.Event.RESIZE,
                this,
                this.resizeSpecialGuideBox
              );
            break;
          }
        }
      }
      hideGuide() {
        (this.guideTextBox.visible = !1),
          (this.specialGuideBox.visible = !1),
          Laya.stage.off(Laya.Event.RESIZE, this, this.resizeSpecialGuideBox);
      }
      resizeSpecialGuideBox() {
        Laya.timer.frameOnce(2, this, () => {
          const e = this._sortedTiles[0],
            t = this._sortedTiles[3],
            i = new Laya.Point(0, e.owner.height),
            n = new Laya.Point(t.owner.width, t.owner.height),
            s = e.owner.localToGlobal(i),
            a = t.owner.localToGlobal(n),
            r = (s.x + a.x) / 2,
            o = s.y + 40;
          this.specialGuideBox.pos(r, o);
        });
      }
      showHand(e) {
        const t = new Laya.Point(0, 0),
          i = e.owner.localToGlobal(t),
          n = i.x + e.owner.width / 2,
          s = i.y + e.owner.height / 2;
        this.hand.pos(n, s),
          (this.hand.visible = !0),
          this.handSpine.play("Click", !1);
      }
    };
  u([ad(Laya.Box)], rd.prototype, "guideTextBox", 2),
    u([ad(Laya.Label)], rd.prototype, "guideTextInfo", 2),
    u([ad(Laya.Box)], rd.prototype, "specialGuideBox", 2),
    u([ad(Laya.Sprite)], rd.prototype, "hand", 2),
    u([ad(Laya.Spine2DRenderNode)], rd.prototype, "handSpine", 2),
    (rd = u([sd("4Hj3KMPXQNSbk0r8zi5lYA")], rd));
  var { regClass: od, property: ld } = Laya,
    hd = class extends Laya.Script {
      setNum(e) {
        this.num.text = e.toString();
      }
      setDateStr(e) {
        const t = `${e.substring(4, 6)}/${e.substring(6, 8)}`;
        this.num.text = t;
      }
      setTitle(e) {
        this.title.text = e;
      }
      setNumWithAnim(e) {
        const t = Number.parseInt(this.num.text) || 0;
        Laya.Tween.create(null)
          .duration(300)
          .go(null, t, e)
          .ease(Laya.Ease.linear)
          .onUpdate((e) => {
            this.num.text = e.value.nums[0].toFixed(0).toString();
          });
      }
    };
  u([ld(Laya.Label)], hd.prototype, "num", 2),
    u([ld(Laya.Label)], hd.prototype, "title", 2),
    (hd = u([od("Iv_t96aoRHyWK2I27JI-uQ")], hd));
  var { regClass: cd, property: dd } = Laya,
    ud = class extends Laya.Script {
      constructor() {
        super(...arguments), (this.autoPath = []);
      }
      onStart() {
        (this.actionsBox = this.owner.getChildByName("Actions")),
          (this.backBtn = this.owner.getChildByName("Back")),
          (this.settingBtn = this.owner.getChildByName("Settings")),
          (this.ruleBtn = this.owner.getChildByName("Rule")),
          (this.levelNum = this.owner
            .getChildByName("Infos")
            .getChildByName("Level")
            .getChildByName("Num")),
          (this.gameStateManager = ac.getInstance()),
          (this.eventManager = Vh.getInstance()),
          (this.levelManager = Bd.getInstance()),
          (this.dataManager = sc.getInstance()),
          (this.guideManager = rc.getInstance()),
          (this.storageManager = Dd.getInstance()),
          (this.adManager = Od.getInstance()),
          (this.uiManager = wd.getInstance()),
          (this.soundManager = lc.getInstance()),
          (this.settingManager = oc.getInstance()),
          (this.responsiveManager = $h.getInstance()),
          (this.dcManager = Td.getInstance()),
          (this.syncManager = hc.getInstance()),
          this.bindEvents();
      }
      startDcGame(e = !1, t = "") {
        return _(this, null, function* () {
          yield this.beforeStartDcGame(e, t),
            (this.levelNum.visible = !0),
            (this.actionsBox.visible = !0),
            (this.backBtn.visible = !0),
            (this.settingBtn.visible = !0),
            this.responsiveManager.isMobile || (this.ruleBtn.visible = !0),
            this.adManager.canShowInterstitialAd() &&
              !this.guideManager.canPlayGuide
              ? (Al("h5_ad_show_timing", {
                placement: "inter",
                position: "game_start",
                game_type: this.dataManager.gameType,
              }),
                this.adManager.showAd({
                  type: "next",
                  name: "game_start",
                  afterAd: () => {
                    Al("h5_ad_show", {
                      placement: "inter",
                      position: "game_start",
                      ad_network: "adsense",
                      ad_slot: null,
                    });
                  },
                  adBreakDone: (e) =>
                    _(this, null, function* () {
                      console.log("adBreakDone:::game_start", e),
                        yield this.board.start(this.dataManager.tiles),
                        this.afterStartGame();
                    }),
                }))
              : (yield this.board.start(this.dataManager.tiles),
                this.afterStartGame());
        });
      }
      beforeStartDcGame(e = !1, t) {
        return _(this, null, function* () {
          (this.dataManager.gameType = "dc"),
            this.dcManager.getDCPositions(),
            (this.dataManager.levelSettings = {
              dcLevel: this.dcManager.currentDCDate,
              positions: this.dcManager.dcLevelPositions,
            });
          const i = Dd.getDcSaveDataByDateStr(this.dcManager.currentDCDate);
          i && e
            ? (Al("h5_game_start", {
              dc_level: this.dcManager.currentDCDate,
              type: "continue",
              source: t,
              game_type: this.dataManager.gameType,
            }),
              this.gameStateManager.start(
                !1,
                i.score,
                i.tiles,
                i.hintTimes,
                i.shuffleTimes
              ))
            : (Al("h5_game_start", {
              dc_level: this.dcManager.currentDCDate,
              type: "new",
              source: t,
              game_type: this.dataManager.gameType,
            }),
              this.gameStateManager.start(!1));
          const n = this.dcManager.currentDCDate.slice(4, 6),
            s = this.dcManager.currentDCDate.slice(6, 8);
          this.setUIState(`${n}/${s}`), (this.startTime = Date.now());
        });
      }
      afterStartDcGame() {
        console.log("afterStartDcGame:::");
      }
      startGame(e = "") {
        return _(this, null, function* () {
          this.beforeStartGame(e),
            this.guideManager.canPlayGuide &&
              1 === this.levelManager.currentLevel
              ? ((this.levelNum.visible = !1),
                (this.actionsBox.visible = !1),
                (this.backBtn.visible = !1),
                (this.settingBtn.visible = !1),
                (this.ruleBtn.visible = !1))
              : ((this.levelNum.visible = !0),
                (this.actionsBox.visible = !0),
                (this.backBtn.visible = !0),
                (this.settingBtn.visible = !0),
                this.responsiveManager.isMobile || (this.ruleBtn.visible = !0)),
            this.adManager.canShowInterstitialAd() &&
              !this.guideManager.canPlayGuide
              ? (Al("h5_ad_show_timing", {
                placement: "inter",
                position: "game_start",
                game_type: this.dataManager.gameType,
              }),
                this.adManager.showAd({
                  type: "next",
                  name: "game_start",
                  afterAd: () => {
                    Al("h5_ad_show", {
                      placement: "inter",
                      position: "game_start",
                      ad_network: "adsense",
                      ad_slot: null,
                    });
                  },
                  adBreakDone: (e) =>
                    _(this, null, function* () {
                      console.log("adBreakDone:::game_start", e),
                        yield this.board.start(this.dataManager.tiles),
                        this.afterStartGame();
                    }),
                }))
              : (yield this.board.start(this.dataManager.tiles),
                this.afterStartGame());
        });
      }
      beforeStartGame(e = "") {
        (this.dataManager.gameType = "classic"),
          this.guideManager.updateGuideLevel();
        const t = [];
        this.guideManager.canPlayGuide
          ? t.push(...this.guideManager.guideInfo[this.guideManager.guideLevel])
          : t.push(...this.levelManager.levelPositions),
          (this.dataManager.levelSettings = {
            level: this.levelManager.currentLevel,
            positions: t,
          }),
          this.guideManager.canPlayGuide
            ? this.gameStateManager.start(!1)
            : "home" === e &&
              this.storageManager.hasSave() &&
              this.storageManager.tiles.length > 0
              ? (Al("h5_game_start", {
                classic_level: this.levelManager.currentLevel,
                type: "continue",
                source: e,
                game_type: this.dataManager.gameType,
              }),
                this.gameStateManager.start(
                  !1,
                  this.storageManager.score,
                  this.storageManager.tiles,
                  this.storageManager.hintTimes,
                  this.storageManager.shuffleTimes
                ))
              : (Al("h5_game_start", {
                classic_level: this.levelManager.currentLevel,
                type: "new",
                source: e,
                game_type: this.dataManager.gameType,
              }),
                this.gameStateManager.start(!1)),
          this.guideManager.canPlayGuide &&
          this.guideManager.bindTexture(this.dataManager.tiles),
          this.setUIState(this.levelManager.currentLevel),
          (this.startTime = Date.now());
      }
      afterStartGame() {
        if (
          this.guideManager.canPlayGuide &&
          (4 === this.levelManager.currentLevel ||
            6 === this.levelManager.currentLevel)
        ) {
          const e = this.dataManager.tiles.length,
            t = 2 * this.dataManager.tiles[e - 4].index;
          this.board.showSpecialMask(t);
        }
        this.guide.showGuide(this.guideManager.guideLevel, this);
      }
      setUIState(e) {
        (this.scoreSpine.visible = !1),
          this.shuffleBtn
            .getComponent(Sc)
            .setNumber(
              this.gameStateManager.state.shuffleTimes,
              this.adManager.open
            ),
          this.tipBtn
            .getComponent(Sc)
            .setNumber(
              this.gameStateManager.state.hintTimes,
              this.adManager.open
            ),
          0 === this.gameStateManager.state.shuffleTimes &&
          Al("h5_ad_show_timing", {
            placement: "reward",
            position: "shuffle",
            game_type: this.dataManager.gameType,
          }),
          0 === this.gameStateManager.state.hintTimes &&
          Al("h5_ad_show_timing", {
            placement: "reward",
            position: "hint",
            game_type: this.dataManager.gameType,
          }),
          this.setScore(this.gameStateManager.state.score),
          this.setLevel(
            e,
            "dc" === this.dataManager.gameType ? "Date" : "Level"
          ),
          (this.scoreInfo.num.color = "#ffffd6"),
          (this.board.deltaScore.color = "#FFEBCC");
      }
      onClickUndo() {
        if (
          (Al("h5_btn_click", {
            btn_name: "undo",
            source:
              "dc" === this.dataManager.gameType
                ? "dc_gameplay"
                : "classic_gameplay",
          }),
            this.undoBtn.getComponent(Sc).disabled)
        ) {
          const e = Laya.stage.width / 2,
            t = Laya.stage.height / 2;
          this.uiManager.showToast(
            "It's the last step now.",
            new Laya.Point(e, t)
          );
        } else
          this.soundManager.playSound("sounds/undo_use_sd.wav"),
            this.gameStateManager.undo();
      }
      onTileClick(e) {
        return this.gameStateManager.selectTile(e.index);
      }
      onTileSelectChanged(e) {
        this.board.onTileSelectChange(e);
      }
      onTileRemove(e, t, i) {
        if (
          4 !== this.levelManager.currentLevel &&
          6 !== this.levelManager.currentLevel
        )
          this.board.onTileRemove(e, t, i);
        else {
          const n = this.board.specialTileIndices;
          if (n.has(e) && n.has(t)) {
            for (const e of n) {
              const t = this.board.tilesDict.get(e);
              t && t.setTipSpine(!1);
            }
            this.board.specialTileIndices.clear(),
              this.guideManager.updateGuideLevel(),
              this.board.hideSpecialMask(),
              this.guide.hideGuide();
          }
          this.board.onTileRemove(e, t, i);
        }
      }
      onGameOver({ isWin: e, isDie: t }) {
        "classic" === this.dataManager.gameType
          ? e
            ? this.guideManager.canPlayGuide
              ? ((this.dataManager.state.score = 0),
                this.guide.hideGuide(),
                Laya.timer.once(1e3, this, () => {
                  this.startGame("");
                }))
              : (Al("h5_game_end", {
                classic_level: this.levelManager.currentLevel,
                score: this.dataManager.state.score,
                game_type: this.dataManager.gameType,
                time_spent: ((Date.now() - this.startTime) / 1e3).toFixed(0),
              }),
                this.levelManager.levelsCompleted++,
                this.levelManager.getNextLevelPositions(),
                Laya.timer.once(500, this, () => {
                  this.gameResult.showResult({
                    nextLevel: this.levelManager.currentLevel + 1,
                    score: this.dataManager.state.score,
                  });
                }))
            : t &&
            (Al("h5_game_fail", {
              classic_level: this.levelManager.currentLevel,
              game_type: this.dataManager.gameType,
            }),
              this.board.die())
          : e
            ? (Al("h5_game_end", {
              dc_level: this.dcManager.currentDCDate,
              score: this.dataManager.state.score,
              game_type: this.dataManager.gameType,
              time_spent: ((Date.now() - this.startTime) / 1e3).toFixed(0),
            }),
              Laya.timer.once(500, this, () => {
                this.gameResult.showResult({
                  nextLevel: -1,
                  score: this.dataManager.state.score,
                });
              }))
            : t &&
            (Al("h5_game_fail", {
              dc_level: this.dcManager.currentDCDate,
              game_type: this.dataManager.gameType,
            }),
              this.board.die()),
          e && this.syncManager.saveUserData();
      }
      bindEvents() {
        this.eventManager.on(Th, this.onTileSelectChanged.bind(this)),
          this.eventManager.on(Mh, this.onTileRemove.bind(this)),
          this.eventManager.on(Dh, this.onGameOver.bind(this)),
          this.eventManager.on(Eh, this.onNotFreeByCover.bind(this)),
          this.eventManager.on(Ch, this.onNotFreeByLeftRight.bind(this)),
          this.eventManager.on(Oh, this.onComboChange.bind(this)),
          this.eventManager.on(Ph, this.onScoreChange.bind(this)),
          this.eventManager.on(wh, this.onRemovePairs.bind(this)),
          this.eventManager.on(Fh, this.onUndoChange.bind(this)),
          this.eventManager.on(xh, () => {
            this.tipBtn
              .getComponent(Sc)
              .setNumber(
                this.gameStateManager.state.hintTimes,
                this.adManager.open
              );
          }),
          this.eventManager.on(Nh, () => {
            this.shuffleBtn
              .getComponent(Sc)
              .setNumber(
                this.gameStateManager.state.shuffleTimes,
                this.adManager.open
              );
          }),
          this.eventManager.on(Hh, this.tip.bind(this)),
          this.autoBtn.on(Laya.Event.CLICK, this, this.onAutoBtnClick),
          this.tipBtn.on(Laya.Event.CLICK, this, this.checkHintTimeAndDoHint),
          this.undoBtn.on(Laya.Event.CLICK, this, this.onClickUndo),
          this.shuffleBtn.on(
            Laya.Event.CLICK,
            this,
            this.checkShuffleTimeAndDoShuffle
          );
      }
      onUndoChange(e) {
        e > 0
          ? this.undoBtn
            .getComponent(Sc)
            .setDisabled(!1, "atlas/images/play/play_btn_pic_0001.png")
          : this.undoBtn
            .getComponent(Sc)
            .setDisabled(!0, "atlas/images/play/play_btn_pic_0005.png");
      }
      onAutoBtnClick1() {
        if (this.autoPath.length) {
          const e = this.autoPath.shift();
          e && this.board.autoPlay(e[0], e[1]);
        } else {
          this.autoPath = this.gameStateManager.getPathToRemoveAll();
          const e = this.autoPath.shift();
          e && this.board.autoPlay(e[0], e[1]);
        }
      }
      onAutoBtnClick() {
        const { canRemoveTilesMap: e } = this.gameStateManager.state;
        let t = null;
        for (const i in e)
          if (e[i].length >= 2) {
            t = e[i];
            break;
          }
        if (!t) return;
        const [i, n] = t;
        this.board.autoPlay(i.index, n.index);
      }
      onRemovePairs(e) {
        const { canRemovePairs: t } = e;
        this.matchInfo.setNum(t);
      }
      onComboChange({ combo: e, isGameOver: t }) {
        t ||
          (e > 2
            ? ((this.scoreSpine.visible = !0),
              (this.scoreInfo.num.color = "#FDDE0F"),
              (this.board.deltaScore.color = "#FDDE0F"),
              Laya.Tween.to(this.scoreSpine, { alpha: 1 }, 500))
            : ((this.scoreSpine.alpha = 0),
              (this.scoreSpine.visible = !1),
              (this.scoreInfo.num.color = "#ffffd6"),
              (this.board.deltaScore.color = "#FFEBCC")),
            Laya.timer.once(500, this, () => {
              e > 2 && this.combo.setNum(e);
            }));
      }
      onScoreChange(e, t = !0) {
        t
          ? Laya.timer.once(500, this, () => {
            this.scoreInfo.setNumWithAnim(e);
          })
          : this.scoreInfo.setNum(e);
      }
      onNotFreeByCover(...e) {
        const [t, i] = e;
        this.board.onNotFreeByCover(t.index, i.index);
      }
      onNotFreeByLeftRight(...e) {
        const [t, i, n] = e;
        this.board.onNotFreeByLeftRight(t.index, i.index, n.index);
      }
      restart(e) {
        const t = {
          type: "restart",
          source: e,
          game_type: this.dataManager.gameType,
        };
        if (
          ((this.scoreSpine.visible = !1),
            (this.scoreInfo.num.color = "#ffffd6"),
            (this.board.deltaScore.color = "#FFEBCC"),
            "dc" === this.dataManager.gameType
              ? (t.dc_level = this.dcManager.currentDCDate)
              : (t.classic_level = this.levelManager.currentLevel),
            Al("h5_game_start", c({}, t)),
            this.gameStateManager.start(
              !0,
              0,
              [],
              this.gameStateManager.state.hintTimes,
              this.gameStateManager.state.shuffleTimes
            ),
            this.board.start(this.gameStateManager.state.tiles),
            "dc" === this.dataManager.gameType)
        ) {
          const e = this.dcManager.currentDCDate.slice(4, 6),
            t = this.dcManager.currentDCDate.slice(6, 8);
          this.setUIState(`${e}/${t}`);
        } else this.setUIState(this.levelManager.currentLevel);
      }
      onNextLevel() {
        this.clearUIState("Level"),
          (this.dataManager.state.score = 0),
          this.startGame("success");
      }
      clearUIState(e) {
        this.setLevel("", e),
          this.setScore(""),
          this.setMatch(""),
          (this.scoreSpine.visible = !1),
          this.shuffleBtn.getComponent(Sc).setNumber(0, !1, !0),
          this.tipBtn.getComponent(Sc).setNumber(0, !1, !0);
      }
      setMatch(e) {
        this.matchInfo.setNum(e);
      }
      setLevel(e, t = "Level") {
        this.levelInfo.setTitle(t), this.levelInfo.setNum(e);
      }
      setScore(e) {
        this.scoreInfo.setNum(e);
      }
      nextLevel(e) {
        (() => {
          const { isBgOn: t } = this.settingManager;
          t && this.soundManager.playBg(),
            this.levelManager.nextLevelLock
              ? (this.levelManager.nextLevelCallback = () => {
                (this.gameResult.owner.visible = !1),
                  this.levelManager.nextLevel(),
                  e && this.onNextLevel();
              })
              : ((this.gameResult.owner.visible = !1),
                this.levelManager.nextLevel(),
                e && this.onNextLevel());
        })();
      }
      checkShuffleTimeAndDoShuffle() {
        return _(this, null, function* () {
          Al("h5_btn_click", {
            btn_name: "shuffle",
            source:
              "dc" === this.dataManager.gameType
                ? "dc_gameplay"
                : "classic_gameplay",
          });
          const e = this.gameStateManager.state.shuffleTimes;
          if (!e && this.adManager.open)
            if (this.adManager.ready)
              this.adManager.showAd({
                type: "reward",
                name: "hint",
                beforeReward: (e) => {
                  e();
                },
                adViewed: () => {
                  Al("h5_reward_received", { reward_type: "shuffle" }),
                    this.shuffle();
                },
                adDismissed: () => { },
                afterAd: () => {
                  Al("h5_ad_show", {
                    placement: "reward",
                    position: "shuffle",
                    ad_network: "adsense",
                    ad_slot: null,
                  });
                },
                adBreakDone: (e) =>
                  _(this, null, function* () {
                    console.log("adBreakDone:::shuffle", e);
                    const { breakStatus: t } = e;
                    if (this.adManager.isException(t)) {
                      Al("h5_ad_show", {
                        placement: "reward",
                        position: "shuffle",
                        ad_network: "adsense",
                        ad_slot: null,
                      });
                      const { viewed: e } = yield this.adManager.showCustomAd();
                      e && this.shuffle();
                    }
                  }),
              });
            else {
              Al("h5_ad_show", {
                placement: "reward",
                position: "shuffle",
                ad_network: "learnings",
                ad_slot: null,
              });
              const { viewed: e } = yield this.adManager.showCustomAd();
              e &&
                (Al("h5_reward_received", { reward_type: "shuffle" }),
                  this.shuffle());
            }
          else if (0 === e) {
            const e = Laya.stage.width / 2,
              t = Laya.stage.height / 2;
            this.uiManager.showToast("No shuffle left.", new Laya.Point(e, t));
          } else this.shuffle();
        });
      }
      checkHintTimeAndDoHint() {
        return _(this, null, function* () {
          Al("h5_btn_click", {
            btn_name: "hint",
            source:
              "dc" === this.dataManager.gameType
                ? "dc_gameplay"
                : "classic_gameplay",
          });
          const e = this.gameStateManager.state.hintTimes;
          if (!e && this.adManager.open)
            if (this.adManager.ready)
              this.adManager.showAd({
                type: "reward",
                name: "hint",
                beforeReward: (e) => {
                  console.log("beforeReward"), e();
                },
                adViewed: () => {
                  Al("h5_reward_received", { reward_type: "hint" }), this.tip();
                },
                afterAd: () => {
                  Al("h5_ad_show", {
                    placement: "reward",
                    position: "hint",
                    ad_network: "adsense",
                    ad_slot: null,
                  });
                },
                adDismissed: () => { },
                adBreakDone: (e) =>
                  _(this, null, function* () {
                    console.log("adBreakDone:::hint", e);
                    const { breakStatus: t } = e;
                    if (this.adManager.isException(t)) {
                      Al("h5_ad_show", {
                        placement: "reward",
                        position: "hint",
                        ad_network: "adsense",
                        ad_slot: null,
                      });
                      const { viewed: e } = yield this.adManager.showCustomAd();
                      e && this.tip();
                    }
                  }),
              });
            else {
              Al("h5_ad_show", {
                placement: "reward",
                position: "hint",
                ad_network: "learnings",
                ad_slot: null,
              });
              const { viewed: e } = yield this.adManager.showCustomAd();
              e &&
                (Al("h5_reward_received", { reward_type: "hint" }), this.tip());
            }
          else if (0 === e) {
            const e = Laya.stage.width / 2,
              t = Laya.stage.height / 2;
            this.uiManager.showToast("No hint left.", new Laya.Point(e, t));
          } else this.tip();
        });
      }
      shuffle() {
        (this.owner.mouseEnabled = !1),
          this.gameStateManager.shuffleTiles(),
          this.board.playShuffleAnim();
      }
      tip() {
        const { canRemoveTilesMap: e } = this.gameStateManager.state,
          t = [];
        for (const i in e) e[i].length >= 2 && t.push(e[i]);
        if (!t) return;
        const i = Math.floor(Math.random() * t.length),
          [n, s] = t[i];
        this.gameStateManager.hint(), this.board.addTip(n.index, s.index);
      }
      clearSelectedTiles() {
        const { selectedTileIndex: e } = this.gameStateManager.state;
        -1 !== e && this.gameStateManager.selectTile(e);
      }
      getTileComponent(e) {
        return this.board.tilesDict.get(e);
      }
      getSpecialTileComponents() {
        const e = [];
        for (const t of this.board.specialTileIndices)
          e.push(this.getTileComponent(t));
        return e;
      }
    };
  u([dd({ type: $c, private: !1 })], ud.prototype, "board", 2),
    u([dd(ed)], ud.prototype, "combo", 2),
    u([dd(hd)], ud.prototype, "levelInfo", 2),
    u([dd(hd)], ud.prototype, "matchInfo", 2),
    u([dd(hd)], ud.prototype, "scoreInfo", 2),
    u([dd(nd)], ud.prototype, "gameResult", 2),
    u([dd(rd)], ud.prototype, "guide", 2),
    u([dd(fc)], ud.prototype, "calendar", 2),
    u([dd(Hc)], ud.prototype, "dc", 2),
    u([dd(Laya.Sprite)], ud.prototype, "scoreSpine", 2),
    u([dd(Laya.Button)], ud.prototype, "autoBtn", 2),
    u([dd({ type: Laya.Sprite, private: !1 })], ud.prototype, "tipBtn", 2),
    u([dd({ type: Laya.Sprite, private: !1 })], ud.prototype, "undoBtn", 2),
    u([dd({ type: Laya.Sprite, private: !1 })], ud.prototype, "shuffleBtn", 2),
    (ud = u([cd("-1hIKbjyTIqx6WpR7M62YQ")], ud));
  var { regClass: pd } = Laya,
    gd = class extends Laya.Script {
      onAwake() {
        this.owner.visible = !1;
      }
      show() {
        this.owner.visible = !0;
      }
      hide() {
        this.owner.visible = !1;
      }
    };
  gd = u([pd("kyivLdmaSIiSUwhdKDq6MA")], gd);
  var { regClass: fd, property: md } = Laya,
    yd = class extends Laya.Script {
      onAwake() {
        this.owner.zOrder = 1e3;
      }
      onStart() {
        this.owner.zOrder = 1e3;
      }
      showToast(e, t, i = 2e3) {
        (this.text.text = e),
          this.owner.scale(0.6, 0.6),
          this.owner.pos(t.x, t.y),
          (this.owner.alpha = 0),
          this._animTimeline && this._animTimeline.destroy(),
          (this._animTimeline = new Laya.TimeLine()),
          this._animTimeline.to(
            this.owner,
            { alpha: 1 },
            100,
            Laya.Ease.strongIn
          ),
          this._animTimeline.to(
            this.owner,
            { y: this.owner.y - 80 },
            i,
            Laya.Ease.strongOut
          ),
          this._animTimeline.to(
            this.owner,
            { alpha: 0 },
            300,
            Laya.Ease.linear
          ),
          this._animTimeline.play(0);
      }
    };
  u([md(Laya.Label)], yd.prototype, "text", 2),
    (yd = u([fd("UCFXAHruS5KMnGisDcoVDw")], yd));
  var { regClass: vd, property: _d } = Laya,
    Id = class extends Laya.Script {
      onAwake() {
        (this.uiManager = wd.getInstance()),
          (this.levelManager = Bd.getInstance()),
          (this.soundManager = lc.getInstance()),
          (this.adManager = Od.getInstance()),
          (this.eventManager = Vh.getInstance()),
          (this.responsiveManager = $h.getInstance()),
          (this.dcManager = Td.getInstance());
      }
      homeInit() {
        this.openDoorBtn.on(Laya.Event.CLICK, this, this.onOpenDoorBtnClick),
          this.feedbackBtn.on(Laya.Event.CLICK, this, this.onFeedbackBtnClick),
          this.ruleBtn.on(Laya.Event.CLICK, this, this.onRuleBtnClick),
          this.dcBtn.on(Laya.Event.CLICK, this, this.onDcBtnClick),
          (this.owner.visible = !0),
          (this.openDoorBtn.visible = !0),
          (this.dcBtn.visible = !0),
          (this.logo.visible = !0),
          (this.feedbackBtn.visible = !0),
          this.responsiveManager.isMobile || (this.ruleBtn.visible = !0),
          (this.levelLabel.text = "Play Now"),
          this.appearAnimation();
      }
      onDcBtnClick() {
        (() => {
          if (
            (this.soundManager.playSound("sounds/open_door_sd.ogg"),
              (this.dcBtn.mouseEnabled = !1),
              this.doorSpine.play("Disappear", !1),
              this.leafSpine.play("Disappear", !1),
              Al("h5_btn_click", { btn_name: "dc", source: "home" }),
              this.dcManager.isDateFinished(this.dcManager.today))
          )
            this.uiManager.goToDailyChallenge("home"),
              Laya.timer.once(2e3, this, () => {
                (this.owner.visible = !1), this.homeClear();
              });
          else {
            this.dcManager.currentDCDate = this.dcManager.dateToString(
              this.dcManager.today
            );
            const e = Number(this.dcManager.currentDCDate.slice(0, 4)),
              t = Number(this.dcManager.currentDCDate.slice(4, 6));
            (this.uiManager.calendar.pageYear = e),
              (this.uiManager.calendar.pageMonth = t),
              this.uiManager.calendar.calendarInit(!1),
              this.uiManager.gameController.clearUIState("Date"),
              Laya.timer.once(2e3, this, () => {
                var e;
                null == (e = this.eventManager.remote) ||
                  e.message({
                    type: "changeBgColor",
                    data: { color: "#104331", duration: 500 },
                  }),
                  (this.owner.visible = !1),
                  this.uiManager.gameController.startDcGame(!0, "home"),
                  this.homeClear();
              });
          }
          this.disappearAnimation();
        })();
      }
      onOpenDoorBtnClick() {
        (() => {
          this.soundManager.playSound("sounds/open_door_sd.ogg"),
            (this.openDoorBtn.mouseEnabled = !1),
            this.doorSpine.play("Disappear", !1),
            this.leafSpine.play("Disappear", !1),
            this.uiManager.gameController.clearUIState("Level"),
            Laya.timer.once(2e3, this, () => {
              var e;
              null == (e = this.eventManager.remote) ||
                e.message({
                  type: "changeBgColor",
                  data: { color: "#104331", duration: 500 },
                }),
                (this.owner.visible = !1),
                this.uiManager.gameController.startGame("home"),
                this.homeClear();
            }),
            this.disappearAnimation();
        })();
      }
      onFeedbackBtnClick() {
        Al("h5_btn_click", { btn_name: "feedback", source: "home" }),
          window.open(new URL("local-info.html", document.baseURI).href, "_blank", "noopener");
      }
      closeDoor() {
        return _(this, null, function* () {
          return new Promise((e) => {
            (this.owner.mouseEnabled = !1),
              this.doorSpine.play("Appear", !1),
              this.leafSpine.play("Appear", !1),
              Laya.timer.once(1e3, this, () => {
                e(),
                  (this.owner.mouseEnabled = !0),
                  this.doorSpine.play("Loop", !0),
                  this.leafSpine.play("Loop", !0);
              });
          });
        });
      }
      appearAnimation() {
        (this.openDoorBtn.alpha = 0),
          (this.openDoorBtn.mouseEnabled = !1),
          (this.dcBtn.alpha = 0),
          (this.dcBtn.mouseEnabled = !1),
          (this.logo.scaleX = 1.5),
          (this.logo.scaleY = 1.5),
          (this.logo.alpha = 0),
          (this.feedbackBtn.mouseEnabled = !1),
          (this.feedbackBtn.scaleX = 1),
          (this.feedbackBtn.scaleY = 1),
          (this.feedbackBtn.alpha = 0),
          (this.ruleBtn.mouseEnabled = !1),
          (this.ruleBtn.scaleX = 1),
          (this.ruleBtn.scaleY = 1),
          (this.ruleBtn.alpha = 0),
          Laya.timer.once(360, this, () => {
            Laya.Tween.to(
              this.logo,
              { alpha: 1, scaleX: 0.9, scaleY: 0.9 },
              190,
              null,
              Laya.Handler.create(this, () => {
                Laya.Tween.to(
                  this.logo,
                  { scaleX: 1.02, scaleY: 1.02 },
                  160,
                  null,
                  Laya.Handler.create(this, () => {
                    Laya.Tween.to(this.logo, { scaleX: 1, scaleY: 1 }, 150);
                  })
                );
              })
            );
          }),
          Laya.timer.once(550, this, () => {
            Laya.Tween.to(
              this.openDoorBtn,
              { alpha: 1 },
              200,
              null,
              Laya.Handler.create(this, () => { })
            ),
              (this.openDoorBtn.mouseEnabled = !0);
          }),
          Laya.timer.once(550, this, () => {
            Laya.Tween.to(
              this.dcBtn,
              { alpha: 1 },
              200,
              null,
              Laya.Handler.create(this, () => { })
            ),
              (this.dcBtn.mouseEnabled = !0);
          }),
          Laya.timer.once(550, this, () => {
            Laya.Tween.to(
              this.feedbackBtn,
              { alpha: 1 },
              200,
              null,
              Laya.Handler.create(this, () => { })
            ),
              (this.feedbackBtn.mouseEnabled = !0);
          }),
          Laya.timer.once(550, this, () => {
            Laya.Tween.to(
              this.ruleBtn,
              { alpha: 1 },
              200,
              null,
              Laya.Handler.create(this, () => { })
            ),
              (this.ruleBtn.mouseEnabled = !0);
          });
      }
      disappearAnimation() {
        Laya.Tween.to(
          this.logo,
          { scaleX: 1.08, scaleY: 1.08 },
          130,
          Laya.Ease.sineOut,
          Laya.Handler.create(this, () => {
            Laya.Tween.to(
              this.logo,
              { alpha: 0, scaleX: 0.6, scaleY: 0.6 },
              270,
              Laya.Ease.sineInOut,
              Laya.Handler.create(this, () => {
                this.logo.visible = !1;
              })
            );
          })
        ),
          Laya.timer.once(130, this, () => {
            Laya.Tween.to(
              this.openDoorBtn,
              { alpha: 0 },
              270,
              null,
              Laya.Handler.create(this, () => {
                this.openDoorBtn.visible = !1;
              })
            );
          }),
          Laya.timer.once(130, this, () => {
            Laya.Tween.to(
              this.dcBtn,
              { alpha: 0 },
              270,
              null,
              Laya.Handler.create(this, () => {
                this.dcBtn.visible = !1;
              })
            );
          }),
          Laya.timer.once(130, this, () => {
            Laya.Tween.to(
              this.feedbackBtn,
              { alpha: 0 },
              270,
              null,
              Laya.Handler.create(this, () => {
                this.feedbackBtn.visible = !1;
              })
            );
          }),
          Laya.timer.once(130, this, () => {
            Laya.Tween.to(
              this.ruleBtn,
              { alpha: 0 },
              270,
              null,
              Laya.Handler.create(this, () => {
                this.ruleBtn.visible = !1;
              })
            );
          });
      }
      homeClear() {
        this.openDoorBtn.off(Laya.Event.CLICK, this, this.onOpenDoorBtnClick),
          this.feedbackBtn.off(Laya.Event.CLICK, this, this.onFeedbackBtnClick),
          this.dcBtn.off(Laya.Event.CLICK, this, this.onDcBtnClick),
          Laya.timer.clearAll(this);
      }
      onRuleBtnClick() {
        Al("h5_btn_click", { btn_name: "how_to_play", source: "home" });
        Laya.loader
          .getRes(this.responsiveManager.srcOfRuleDialog)
          .create()
          .show();
        this.uiManager.mask.show();
      }
    };
  u([_d(Laya.Spine2DRenderNode)], Id.prototype, "doorSpine", 2),
    u([_d(Laya.Spine2DRenderNode)], Id.prototype, "leafSpine", 2),
    u([_d(Laya.Button)], Id.prototype, "openDoorBtn", 2),
    u([_d(Laya.Button)], Id.prototype, "dcBtn", 2),
    u([_d(Laya.Button)], Id.prototype, "feedbackBtn", 2),
    u([_d(Laya.Image)], Id.prototype, "logo", 2),
    u([_d(Laya.Label)], Id.prototype, "levelLabel", 2),
    u([_d(Laya.Sprite)], Id.prototype, "ruleBtn", 2),
    (Id = u([vd("U7w2y39TRL6fjIIk732zsA")], Id));
  var { regClass: Sd, property: Ld } = Laya,
    Ad = class extends Laya.Script {
      constructor() {
        super(...arguments),
          (this.barWidth = 0),
          (this.barIconX = 0),
          (this._progress = 0.75),
          (this._progressSpeed = 2);
      }
      onAwake() {
        (this.eventManager = Vh.getInstance()),
          (this.PROGRESS_BAR_FULL_WIDTH = this.progressBarBg.width),
          (this.PROGRESS_BAR_ICON_FULL_WIDTH =
            this.PROGRESS_BAR_FULL_WIDTH - this.progressBarIcon.width),
          (this.PROGRESS_BAR_ICON_START_X = this.progressBarIcon.x),
          Laya.timer.frameLoop(1, this, this.updateProgressSmoothly);
      }
      updateProgressSmoothly() {
        (this.progressBarIcon.rotation += Math.max(
          2,
          (this.barWidth - this.progressBar.width) / 10
        )),
          (this.progressBar.width = this.barWidth),
          (this.progressBarIcon.x = this.barIconX);
      }
      setProgress(e) {
        (this.barWidth = this.PROGRESS_BAR_FULL_WIDTH * e),
          (this.barIconX =
            this.PROGRESS_BAR_ICON_START_X +
            this.PROGRESS_BAR_ICON_FULL_WIDTH * e);
      }
      get progress() {
        return this._progress;
      }
      set progress(e) {
        (this._progress = Math.min(1, Math.max(0, e))),
          (this.progressBarIcon.rotation += this._progressSpeed),
          (this.progressBar.width =
            this.PROGRESS_BAR_FULL_WIDTH * this._progress),
          (this.progressBarIcon.x =
            this.PROGRESS_BAR_ICON_START_X +
            this.PROGRESS_BAR_ICON_FULL_WIDTH * this._progress);
      }
      onDestroy() {
        return _(this, null, function* () {
          return (
            Laya.timer.frameLoop(1, this, () => {
              this.progressBarIcon.rotation += this._progressSpeed;
            }),
            yield new Promise((e) => {
              Laya.timer.once(100, this, () => {
                var t;
                null == (t = this.eventManager.remote) ||
                  t.message({
                    type: "changeBgColor",
                    data: { color: "#381705", duration: 1e3 },
                  }),
                  Laya.timer.clearAll(this),
                  this.setProgress(0),
                  this.owner.destroy(),
                  e();
              });
            })
          );
        });
      }
    };
  u([Ld(Laya.Image)], Ad.prototype, "bg", 2),
    u([Ld(Laya.Image)], Ad.prototype, "logo", 2),
    u([Ld(Laya.Image)], Ad.prototype, "progressBarBg", 2),
    u([Ld(Laya.Image)], Ad.prototype, "progressBar", 2),
    u([Ld(Laya.Image)], Ad.prototype, "progressBarIcon", 2),
    (Ad = u([Sd("GBxdDSxAQuKbpX-WhOPO5g")], Ad));
  var { regClass: Ed, property: Cd } = Laya,
    wd = class extends Laya.Script {
      constructor() {
        super(...arguments), (this.debug = !1);
      }
      onAwake() {
        (wd._instance = this),
          (this.soundManager = lc.getInstance()),
          (this.responsiveManager = $h.getInstance()),
          (this.root = this.owner.parent);
      }
      init() {
        return _(this, null, function* () {
          I.skipHome
            ? ((this.play.visible = !0),
              this.gameController.startGame("home"),
              this.DCInit())
            : (yield this.DCInit(),
              this.home.homeInit(),
              this.board.preheat(),
              yield this.home.closeDoor(),
              (this.play.visible = !0),
              Al("h5_homepage_show")),
            this.debug && this.showDebug();
        });
      }
      DCInit() {
        return _(this, null, function* () {
          var e;
          const t = Laya.loader.getRes(this.responsiveManager.srcOfDc).create();
          this.root.addChildAt(t, 3),
            (this.dc = t.getComponent(Hc)),
            (this.calendar = this.dc.calendar),
            (this.trophyRoom = this.dc.trophyRoom),
            this.dc.hide(),
            this.calendar.setMonthChangedHandler(
              new Laya.Handler(this.dc, this.dc.updateTrophy)
            ),
            this.calendar.calendarInit(!1),
            null == (e = this.trophyRoom) || e.updateYearPanel();
        });
      }
      showDebug() {
        Laya.loader.load("resources/debug.lh").then((e) => {
          const t = e.create();
          (t.zOrder = 1e4), this.root.addChild(t);
        });
      }
      goToHome() {
        this.home.homeInit(),
          this.soundManager.playSound("sounds/close_door_sd.ogg"),
          this.home.closeDoor(),
          this.board.clear();
      }
      static getInstance() {
        return wd._instance;
      }
      showToast(e, t, i = 1e3) {
        this.toast.showToast(e, t, i);
      }
      goToDailyChallenge(e) {
        this.board.clear(),
          this.dc.updateTrophy(),
          this.dc.updatePlayBtnText(),
          this.dc.show(),
          e &&
          Al("h5_page_show", {
            page_name: "calendar",
            source: e,
            cal_month: `${this.calendar.pageYear}-${this.calendar.pageMonth
              .toString()
              .padStart(2, "0")}`,
          });
      }
    };
  u([Cd(gd)], wd.prototype, "mask", 2),
    u([Cd(ud)], wd.prototype, "gameController", 2),
    u([Cd(Id)], wd.prototype, "home", 2),
    u([Cd(Ad)], wd.prototype, "loading", 2),
    u([Cd(Laya.Sprite)], wd.prototype, "play", 2),
    u([Cd($c)], wd.prototype, "board", 2),
    u([Cd(yd)], wd.prototype, "toast", 2),
    u([Cd(rd)], wd.prototype, "guide", 2),
    u([Cd(Hc)], wd.prototype, "dc", 2),
    u([Cd(fc)], wd.prototype, "calendar", 2),
    u([Cd({ type: Boolean })], wd.prototype, "debug", 2),
    u([Cd(Nc)], wd.prototype, "trophyRoom", 2),
    (wd = u([Ed("06kddef3SiCybxozfHSpBQ")], wd));
  var bd = zh(2),
    Td = class e {
      constructor() {
        (this.FIRST_YEAR = 2024),
          (this.FIRST_MONTH = 1),
          (this._orderRule = "466566566H"),
          (this._first6Rule = "456566"),
          (this._currentDCDateStr = ""),
          (this._dcLevelPositions = []),
          (this._difficulty = 1),
          (this._questions = []);
      }
      static getInstance() {
        return e.instance || (e.instance = new e()), e.instance;
      }
      init() {
        this.responsiveManager = $h.getInstance();
        this.eventManager = Vh.getInstance();
        this.uiManager = wd.getInstance();
        const today = new Date();
        this.todayYear = today.getFullYear();
        this.todayMonth = today.getMonth() + 1;
        this.todayDay = today.getDate();
        this.today = today;
        this.chosenDate = today;
        this.currentDCDate = this.dateToString(today);
        this._questions = (this.responsiveManager.isMobile ? qh : jh).slice(0, 10);
        this.generateYearList();
        this.bindEvents();
      }
      bindEvents() {
        this.eventManager.on(Uh, ({ dateStr: e }) => {
          this.generateYearList(),
            this.uiManager.calendar.updateFinishedStatusByDateStr(e);
        }),
          this.eventManager.on(Kh, ({ dateStrArray: e }) => {
            this.generateYearList(),
              e.forEach((e) => {
                this.uiManager.calendar.updateFinishedStatusByDateStr(e);
              });
          });
      }
      dateToString(e) {
        return `${e.getFullYear()}${(e.getMonth() + 1)
          .toString()
          .padStart(2, "0")}${e.getDate().toString().padStart(2, "0")}`;
      }
      generateYearList() {
        var e;
        const t = [];
        for (let e = this.todayYear; e >= this.FIRST_YEAR; e--)
          t.push({ year: e, monthSlots: this.generateMonthSlots(e) });
        (this._yearList = t),
          null == (e = this.uiManager.trophyRoom) || e.updateYearPanel();
      }
      generateMonthSlots(e) {
        const t = [];
        for (let i = 1; i <= 12; i++) {
          const n = `${e}${i.toString().padStart(2, "0")}`,
            s = Dd.getMonthFinishedDays()[n],
            a = new Date(e, i, 0).getDate();
          t.push({ month: i, hasTrophy: !(!s || s.length !== a) });
        }
        return t;
      }
      isDateFinished(e) {
        const t = this.dateToString(e),
          i = Dd.getDateFinishedStatus(t);
        return 1 === i || 3 === i;
      }
      get yearList() {
        return this._yearList;
      }
      get chosenDate() {
        return this._chosenDate;
      }
      get chosenDateStr() {
        return this._chosenDateStr;
      }
      set chosenDate(e) {
        (this._chosenDate = e), (this._chosenDateStr = this.dateToString(e));
      }
      getSomeQuestions() {
        // 只使用原包已有的备用题库，不伪造线上题目。
        const data = this.responsiveManager.isMobile ? qh : jh;
        return Promise.resolve({ data: data.slice(0, 10) });
      }
      getDCData(e, t = !0) {
        const i = Number.parseInt(e) % 10;
        if (I.debug) {
          const i = Dd.getDcSaveDataByDateStr(e);
          if (t && i && i.positions.length > 0) return i.positions;
          const n = Math.floor(Math.random() * Wh.length);
          return bd(Wh[n].q);
        }
        const n = Dd.getDcSaveDataByDateStr(e);
        if (t && n && n.positions.length > 0) return n.positions;
        const s = this._questions[i];
        if (s) {
          const t = bd(s.q);
          return Dd.setDcPositionByDateStr(e, t), t;
        }
        {
          console.error("获取DC关卡数据失败，使用备用关卡");
          const t = this.responsiveManager.isMobile ? qh : jh,
            i = Math.floor(Math.random() * t.length);
          return Dd.setDcPositionByDateStr(e, bd(t[i].q)), bd(t[i].q);
        }
      }
      getDCPositions(e = !0) {
        const t = this.getDCData(this.currentDCDate, e);
        (this._dcLevelPositions = t),
          this.getSomeQuestions()
            .then((e) => {
              this._questions = e.data;
            })
            .catch((e) => {
              console.error("refresh获取关卡数据失败", e);
            });
      }
      get currentDCDate() {
        return this._currentDCDateStr;
      }
      set currentDCDate(e) {
        this._currentDCDateStr = e;
      }
      get dcLevelPositions() {
        return this._dcLevelPositions;
      }
      set difficulty(e) {
        this._difficulty = e;
      }
      get difficulty() {
        return this._difficulty;
      }
    },
    Md = class e {
      static getInstance() {
        return e.instance || (e.instance = new e()), e.instance;
      }
      init() {
        (this.dataManager = sc.getInstance()),
          (this.eventManager = Vh.getInstance()),
          (this.levelManager = Bd.getInstance()),
          (this.dcManager = Td.getInstance()),
          (this.syncManager = hc.getInstance());
        try {
          JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY));
        } catch (e) {
          console.error("存档数据格式异常", e), this.clearSave();
        }
        this.eventManager.on(Rh, this, this.saveGameData),
          this.eventManager.on(bh, this, this.saveGameData),
          this.eventManager.on(Ph, this, this.saveGameData),
          this.eventManager.on(Nh, this, this.saveGameData),
          this.eventManager.on(Dh, this, this.onGameOver);
      }
      syncSaveData(t, i = {}, n = {}) {
        let s = {},
          a = {},
          r = { level: 1 },
          o = !1;
        try {
          (s =
            JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_CLASSIC_LEVEL)) ||
            {}),
            (a = JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_MONTH)) || {}),
            (r = JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY)) || {
              level: 1,
            });
        } catch (e) {
          console.error("存档数据格式异常", e), this.clearSave();
        }
        if (
          (Laya.LocalStorage.setItem(
            e.SAVE_KEY_CLASSIC_LEVEL,
            JSON.stringify(c(c({}, s), n))
          ),
            Object.keys(i).length > 0)
        ) {
          const t = JSON.stringify(a);
          Object.keys(i).forEach((e) => {
            a[e] ? (a[e] = [...new Set([...a[e], ...i[e]])]) : (a[e] = i[e]);
          }),
            t !== JSON.stringify(a) && (o = !0),
            Laya.LocalStorage.setItem(e.SAVE_KEY_MONTH, JSON.stringify(a));
        }
        t > r.level
          ? Laya.LocalStorage.setItem(
            e.SAVE_KEY,
            JSON.stringify(
              d(c({}, r), { level: t, tiles: [], score: 0, positions: [] })
            )
          )
          : t < r.level && (o = !0),
          o && this.syncManager.saveUserData();
      }
      isSpecialLevel() {
        return (
          I.openGuide &&
          (1 === this.dataManager.levelSettings.level ||
            4 === this.dataManager.levelSettings.level ||
            6 === this.dataManager.levelSettings.level) &&
          "classic" === this.dataManager.gameType
        );
      }
      saveGameData() {
        let t = null;
        (t = this.isSpecialLevel()
          ? {
            level:
              this.dataManager.levelSettings.level ||
              this.dataManager.levelSettings.dcLevel,
            score:
              1 === this.dataManager.levelSettings.level && this.guideFinished
                ? this.dataManager.state.score
                : 0,
            tiles:
              1 === this.dataManager.levelSettings.level && this.guideFinished
                ? this.dataManager.tiles
                : [],
            positions:
              1 === this.dataManager.levelSettings.level
                ? this.levelManager.levelPositions
                : this.dataManager.levelSettings.positions,
            difficulty: this.levelManager.difficulty,
            hintTimes: this.dataManager.state.hintTimes,
            shuffleTimes: this.dataManager.state.shuffleTimes,
          }
          : {
            level:
              this.dataManager.levelSettings.level ||
              this.dataManager.levelSettings.dcLevel,
            score: this.dataManager.state.score,
            tiles: this.dataManager.tiles,
            positions: this.dataManager.levelSettings.positions,
            difficulty: this.levelManager.difficulty,
            hintTimes: this.dataManager.state.hintTimes,
            shuffleTimes: this.dataManager.state.shuffleTimes,
          }),
          "dc" === this.dataManager.gameType
            ? Laya.LocalStorage.setItem(
              e.SAVE_KEY_DC,
              JSON.stringify(
                d(
                  c({}, JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_DC))),
                  { [this.dcManager.currentDCDate]: c({}, t) }
                )
              )
            )
            : Laya.LocalStorage.setItem(e.SAVE_KEY, JSON.stringify(t));
      }
      saveGuideData() {
        Laya.LocalStorage.setItem(e.SAVE_KEY_GUIDE, "1");
      }
      onGameOver({ isWin: t }) {
        if (t) {
          const t = {
            level: this.dataManager.levelSettings.level + 1,
            score: 0,
            tiles: [],
            positions: [],
            difficulty: this.levelManager.difficulty,
            hintTimes: this.dataManager.gameSettings.hint,
            shuffleTimes: this.dataManager.gameSettings.shuffle,
          };
          "dc" === this.dataManager.gameType
            ? (Laya.LocalStorage.setItem(
              e.SAVE_KEY_DC,
              JSON.stringify(
                d(
                  c({}, JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_DC))),
                  {
                    [this.dcManager.currentDCDate]: d(c({}, t), {
                      level: this.dcManager.currentDCDate,
                    }),
                  }
                )
              )
            ),
              this.updateMonthFinishedDays(this.dcManager.currentDCDate))
            : (Laya.LocalStorage.setItem(
              e.SAVE_KEY_CLASSIC_LEVEL,
              JSON.stringify(
                d(
                  c(
                    {},
                    JSON.parse(
                      Laya.LocalStorage.getItem(e.SAVE_KEY_CLASSIC_LEVEL)
                    )
                  ),
                  {
                    [this.dataManager.levelSettings.level]:
                      this.dataManager.state.score,
                  }
                )
              )
            ),
              Laya.LocalStorage.setItem(e.SAVE_KEY, JSON.stringify(t)));
        } else {
          const t = {
            level: this.dataManager.levelSettings.level,
            score: this.dataManager.state.score,
            tiles: [],
            positions: this.dataManager.levelSettings.positions,
            difficulty: this.levelManager.difficulty,
            hintTimes: this.dataManager.gameSettings.hint,
            shuffleTimes: this.dataManager.gameSettings.shuffle,
          };
          "dc" === this.dataManager.gameType
            ? Laya.LocalStorage.setItem(
              e.SAVE_KEY_DC,
              JSON.stringify(
                d(
                  c({}, JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_DC))),
                  {
                    [this.dcManager.currentDCDate]: d(c({}, t), {
                      level: this.dcManager.currentDCDate,
                    }),
                  }
                )
              )
            )
            : Laya.LocalStorage.setItem(e.SAVE_KEY, JSON.stringify(t));
        }
      }
      updateMonthFinishedDays(t) {
        const i = JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_MONTH)) || {};
        (Array.isArray(t) ? t : [t]).forEach((t) => {
          const n = t.slice(0, 6);
          i[n] || (i[n] = []),
            i[n].includes(t) ||
            (i[n].push(t),
              Laya.LocalStorage.setItem(e.SAVE_KEY_MONTH, JSON.stringify(i)));
        });
      }
      clearSave() {
        Laya.LocalStorage.removeItem(e.SAVE_KEY);
      }
      hasSave() {
        return null !== Laya.LocalStorage.getItem(e.SAVE_KEY);
      }
      hasDateSave(t) {
        return null !== JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_DC))[t];
      }
      get difficulty() {
        try {
          return JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY)).difficulty;
        } catch (e) {
          return console.error("读取存档失败", e), this.clearSave(), 1;
        }
      }
      get level() {
        try {
          return JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY)).level;
        } catch (e) {
          return console.error("读取存档失败", e), this.clearSave(), null;
        }
      }
      get score() {
        try {
          return JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY)).score;
        } catch (e) {
          return console.error("读取存档失败", e), this.clearSave(), 0;
        }
      }
      get tiles() {
        try {
          return JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY)).tiles;
        } catch (e) {
          return console.error("读取存档失败", e), this.clearSave(), [];
        }
      }
      get positions() {
        try {
          return JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY)).positions;
        } catch (e) {
          return console.error("读取存档失败", e), this.clearSave(), [];
        }
      }
      get guideFinished() {
        try {
          return "1" === Laya.LocalStorage.getItem(e.SAVE_KEY_GUIDE);
        } catch (e) {
          return console.error("读取存档失败", e), !1;
        }
      }
      get hintTimes() {
        try {
          return JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY)).hintTimes;
        } catch (e) {
          return console.error("读取存档失败", e), this.clearSave(), 0;
        }
      }
      get shuffleTimes() {
        try {
          return JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY)).shuffleTimes;
        } catch (e) {
          return console.error("读取存档失败", e), this.clearSave(), 0;
        }
      }
      static getMonthFinishedDays() {
        return JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_MONTH)) || {};
      }
      static getAllDcSaveData() {
        return JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_DC));
      }
      static getDateFinishedStatus(t) {
        var i;
        const n = JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_MONTH)) || {},
          s = t.slice(0, 6),
          a = e.getDcSaveDataByDateStr(t),
          r = n[s] && n[s].includes(t),
          o =
            (null == (i = null == a ? void 0 : a.tiles) ? void 0 : i.length) >
            0;
        return r && o ? 3 : r && !o ? 1 : !r && o ? 2 : void 0;
      }
      static getDcSaveDataByDateStr(t) {
        return (JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_DC)) || {})[t];
      }
      static setDcPositionByDateStr(t, i) {
        const n = JSON.parse(Laya.LocalStorage.getItem(e.SAVE_KEY_DC)) || {};
        n[t] ? (n[t].positions = i) : (n[t] = { positions: i }),
          Laya.LocalStorage.setItem(e.SAVE_KEY_DC, JSON.stringify(n));
      }
    };
  (Md.SAVE_KEY = "mahjong_save_data"),
    (Md.SAVE_KEY_GUIDE = "mahjong_is_guide_finished"),
    (Md.SAVE_KEY_DC = "mahjong_dc"),
    (Md.SAVE_KEY_MONTH = "mahjong_dc_month"),
    (Md.SAVE_KEY_CLASSIC_LEVEL = "mahjong_classic_level");
  var Dd = Md,
    kd = zh(2),
    Bd = class e {
      constructor() {
        (this._currentLevelIndex = 1),
          (this._levelsCompleted = 0),
          (this._nextLevelPositions = []),
          (this.nextLevelLock = !0),
          (this.nextLevelCallback = () => { }),
          (this._levelPositions = []),
          (this._difficulty = 1),
          (this._orderRule = "466566566H"),
          (this._first6Rule = "456566");
      }
      static getInstance() {
        return e.instance || (e.instance = new e()), e.instance;
      }
      init() {
        (this.responsiveManager = $h.getInstance()), this.initLevel();
      }
      initLevel() {
        const e = Dd.getInstance();
        e.hasSave() && e.level
          ? ((this.currentLevel = e.level),
            (this.difficulty = e.difficulty || 1))
          : ((this.currentLevel = 1), (this.difficulty = 1));
      }
      getQuestionParams(e) {
        let t, i;
        if (e <= 6) (t = this._first6Rule[e - 1]), (i = 1);
        else {
          const n = e % 10;
          (t = this._orderRule[n]), (i = this.difficulty);
        }
        return { rule: t, difficulty: i };
      }
      getLevelData(e, t = !1) {
        return new Promise((i) => {
          if (I.debug) {
            if (4 === e) return void i(kd(Jh[0].q));
            if (6 === e) return void i(kd(Jh[1].q));
            if (
              t &&
              Dd.getInstance().hasSave() &&
              Dd.getInstance().positions.length > 0
            )
              return void i(Dd.getInstance().positions);
            const n = Math.floor(Math.random() * Wh.length);
            return void i(kd(Wh[n].q));
          }
          if (4 === e) return void i(kd(Jh[0].q));
          if (6 === e) return void i(kd(Jh[1].q));
          if (
            t &&
            Dd.getInstance().hasSave() &&
            Dd.getInstance().positions.length > 0
          )
            return void i(Dd.getInstance().positions);
          // Use local fallback data instead of HTTP request
          const fallbackData = this.responsiveManager.isMobile ? qh : jh,
            randomIndex = Math.floor(Math.random() * fallbackData.length);
          i(kd(fallbackData[randomIndex].q));
        });
      }
      getLevelPositions(e = !1) {
        return _(this, null, function* () {
          const t = yield this.getLevelData(this.currentLevel, e);
          this._levelPositions = t;
        });
      }
      getNextLevelPositions() {
        return _(this, null, function* () {
          this.nextLevelLock = !0;
          const e = yield this.getLevelData(this.currentLevel + 1);
          (this._nextLevelPositions = e),
            this.nextLevelCallback(),
            (this.nextLevelLock = !1),
            (this.nextLevelCallback = () => { });
        });
      }
      nextLevel() {
        this._currentLevelIndex++,
          (this._levelPositions = this._nextLevelPositions);
      }
      get currentLevel() {
        return this._currentLevelIndex;
      }
      set currentLevel(e) {
        this._currentLevelIndex = e;
      }
      set difficulty(e) {
        this._difficulty = e;
      }
      get difficulty() {
        return this._difficulty;
      }
      get levelPositions() {
        return this._levelPositions;
      }
      get nextLevelPositions() {
        return this._nextLevelPositions;
      }
      get levelsCompleted() {
        return this._levelsCompleted;
      }
      set levelsCompleted(e) {
        this._levelsCompleted = e;
      }
    },
    Od = class e {
      constructor() {
        (this._open = !1), (this._ready = !1), (this._isShowingAd = !1);
      }
      static getInstance() {
        return this._instance || (this._instance = new e()), this._instance;
      }
      init() {
        this.settingManager = oc.getInstance();
        this.levelManager = Bd.getInstance();
        this.eventManager = Vh.getInstance();
        this._open = true;
        this._ready = true;
      }
      showAd(e) {
        const { beforeAd: t, afterAd: i } = e,
          n = this.settingManager.isBgOn,
          s = d(c({}, e), {
            beforeAd: () => {
              n && (this.settingManager.isBgOn = !1), null == t || t();
            },
            afterAd: () => {
              n && (this.settingManager.isBgOn = !0), null == i || i();
            },
          });
        window.adBreak
          ? window.adBreak(s)
          : console.log("adBreak is not defined");
      }
      get open() {
        return this._open;
      }
      set open(e) {
        this._open = e;
      }
      get ready() {
        return this._ready;
      }
      set ready(e) {
        this._ready = e;
      }
      canShowInterstitialAd() {
        return false;
      }
      isException(e) {
        return [
          "notReady",
          "timeout",
          "invalid",
          "error",
          "noAdPreloaded",
          "frequencyCapped",
          "ignored",
          "other",
        ].includes(e);
      }
      showCustomAd(e) {
        return window.VitaLocalAds.customReward();
      }
    },
    Pd = class e extends Laya.DialogManager {
      static getInstance() {
        return e._instance || (e._instance = new e()), e._instance;
      }
      constructor() {
        super();
      }
      init() {
        (Laya.Dialog.manager = e.getInstance()),
          (this.popupEffect = (e) => {
            const t = e.scaleX,
              i = e.scaleY;
            e.scale(0.9 * t, 0.9 * i),
              (e.alpha = 0),
              e.pos(Laya.stage.width / 2, Laya.stage.height / 2),
              (e.anchorX = 0.5),
              (e.anchorY = 0.5),
              null !== e._effectTween && Laya.Tween.kill(e._effectTween),
              null !== e._opacityTween && Laya.Tween.kill(e._opacityTween),
              (e._opacityTween = Laya.Tween.to(
                e,
                { alpha: 1 },
                66,
                Laya.Ease.cubicOut
              )),
              (e._effectTween = Laya.Tween.to(
                e,
                { scaleX: 1.025 * t, scaleY: 1.025 * i, alpha: 1 },
                133,
                Laya.Ease.cubicOut,
                Laya.Handler.create(this, () => {
                  e._effectTween = Laya.Tween.to(
                    e,
                    { scaleX: 1 * t, scaleY: 1 * i },
                    166,
                    Laya.Ease.sineInOut,
                    Laya.Handler.create(this, this.doOpen, [e])
                  );
                })
              ));
          }),
          (this.closeEffect = (e) => {
            const t = e.scaleX,
              i = e.scaleY;
            null != e._effectTween && Laya.Tween.kill(e._effectTween),
              (e._effectTween = Laya.Tween.to(
                e,
                {
                  x: Laya.stage.width / 2,
                  y: Laya.stage.height / 2,
                  scaleX: 0.925 * t,
                  scaleY: 0.925 * i,
                  alpha: 0,
                },
                133,
                Laya.Ease.sineOut,
                Laya.Handler.create(this, this.doClose, [e])
              ));
          }),
          (this.popupEffectHandler = new Laya.Handler(this, this.popupEffect)),
          (this.closeEffectHandler = new Laya.Handler(this, this.closeEffect));
      }
    };
  var Rd = class e {
    constructor() {
      (this.minLoadDuration = 2500),
        (this.levelManager = Bd.getInstance()),
        (this.responsiveManager = $h.getInstance());
    }
    static getInstance() {
      return e.instance || (e.instance = new e()), e.instance;
    }
    init(e) {
      return _(this, null, function* () {
        Laya.loader.on(Laya.Event.ERROR, this, (e) => {
          console.error("资源加载错误:", e);
        });
        const t = [
          {
            url: "atlas/images/home/common_btn_0010.png",
            type: Laya.Loader.IMAGE,
            lazy: I.skipHome,
          },
          {
            url: "atlas/images/home/home_btn_0001.png",
            type: Laya.Loader.IMAGE,
            lazy: I.skipHome,
          },
          {
            url: "atlas/images/common_pic_0010.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/common_pic_0011.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/common_pic_0001.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/common_btn_0002.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/common_btn_0004.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/common_btn_0005.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/settings_pic_0005.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/common_btn_0003.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/settings_pic_0006.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/common_pic_0002.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/settings_bg_0001.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/settings_pic_0007.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/settings_icon_feedback_0001.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/common_btn_0006.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/settings/common_pic_0003.png",
            type: Laya.Loader.IMAGE,
            lazy: !0,
          },
          {
            url: "atlas/images/play/cardface_pic_shadow.png",
            type: Laya.Loader.IMAGE,
          },
          {
            url: this.responsiveManager.srcOfHomeSpine,
            type: Laya.Loader.SPINE,
            lazy: I.skipHome,
          },
          {
            url: this.responsiveManager.srcOfHomeLeafSpine,
            type: Laya.Loader.SPINE,
            lazy: I.skipHome,
          },
          { url: "spine/guide/Hand.skel", type: Laya.Loader.SPINE, lazy: !0 },
          {
            url: "spine/guide/Light.skel",
            type: Laya.Loader.SPINE,
            lazy: !0,
          },
          {
            url: "spine/play/Selected.skel",
            type: Laya.Loader.SPINE,
            lazy: !0,
          },
          { url: "spine/play/Light.skel", type: Laya.Loader.SPINE, lazy: !0 },
          {
            url: "spine/play/victory_settlement.skel",
            type: Laya.Loader.SPINE,
            lazy: !0,
          },
          {
            url: "spine/play/victory_settlement.skel",
            type: Laya.Loader.SPINE,
            lazy: !0,
          },
          {
            url: "spine/dialog/HTP1.skel",
            type: Laya.Loader.SPINE,
            lazy: !0,
          },
          {
            url: "spine/dialog/HTP2.skel",
            type: Laya.Loader.SPINE,
            lazy: !0,
          },
          {
            url: "spine/dialog/HTP3.skel",
            type: Laya.Loader.SPINE,
            lazy: !0,
          },
          {
            url: "spine/dialog/HTP4.skel",
            type: Laya.Loader.SPINE,
            lazy: !0,
          },
          {
            url: "spine/dc/CalendarMarkers.skel",
            type: Laya.Loader.SPINE,
            lazy: !0,
          },
          { url: "sounds/bgm.ogg", type: Laya.Loader.SOUND, lazy: !0 },
          {
            url: "sounds/hint_use_sd.ogg",
            type: Laya.Loader.SOUND,
            lazy: !0,
          },
          { url: "sounds/mahjong_click_sd.wav", type: Laya.Loader.SOUND },
          { url: "sounds/mahjong_deselect_sd.ogg", type: Laya.Loader.SOUND },
          { url: "sounds/mahjong_match_sd.wav", type: Laya.Loader.SOUND },
          { url: "sounds/mahjong_show_sd1.ogg", type: Laya.Loader.SOUND },
          {
            url: "sounds/no_match_sd.wav",
            type: Laya.Loader.SOUND,
            lazy: !0,
          },
          {
            url: "sounds/shuffle_use_sd.wav",
            type: Laya.Loader.SOUND,
            lazy: !0,
          },
          { url: "sounds/tile_click_sd.wav", type: Laya.Loader.SOUND },
          { url: "sounds/tile_right_click_sd.wav", type: Laya.Loader.SOUND },
          {
            url: "sounds/undo_use_sd.wav",
            type: Laya.Loader.SOUND,
            lazy: !0,
          },
          {
            url: "sounds/close_door_sd.ogg",
            type: Laya.Loader.SOUND,
            lazy: I.skipHome,
          },
          {
            url: "sounds/open_door_sd.ogg",
            type: Laya.Loader.SOUND,
            lazy: I.skipHome,
          },
          { url: "sounds/success_sd.ogg", type: Laya.Loader.SOUND, lazy: !0 },
          { url: "sounds/dc_click.ogg", type: Laya.Loader.SOUND, lazy: !0 },
          {
            url: "sounds/dc_trophy_dlg_sd.ogg",
            type: Laya.Loader.SOUND,
            lazy: !0,
          },
          {
            url: "sounds/dc_trophy_unlock_sd.ogg",
            type: Laya.Loader.SOUND,
            lazy: !0,
          },
          { url: this.responsiveManager.srcOfSettingDialog },
          { url: this.responsiveManager.srcOfRuleDialog },
          { url: this.responsiveManager.srcOfNoneMatchDialog },
          { url: this.responsiveManager.srcOfTrophyCheckDialog },
          { url: this.responsiveManager.srcOfTrophyGetDialog },
          { url: this.responsiveManager.srcOfDc },
          { url: "resources/tile.lh" },
          { url: "resources/shadow.lh" },
        ];
        yield this.loadWithMinDuration(t, e);
      });
    }
    loadWithMinDuration(e, t) {
      return _(this, null, function* () {
        yield this.loadResourcesAndPositions(e, (e) => {
          t(e);
        });
      });
    }
    loadResourcesAndPositions(e, t) {
      return _(this, null, function* () {
        const i = e.filter((e) => e.lazy),
          n = e.filter((e) => !e.lazy);
        let s = 0,
          a = 0,
          r = !1,
          o = !1;
        const l = new Promise((e) => {
          Laya.timer.frameLoop(1, this, () => {
            (a = (function (e, t) {
              if (e < 0.9) return e + 0.02;
              if (t < 1) return e + 0.05 * (1 - e);
              return (s = 1), (i = e + 0.02) < (n = 0) ? n : i > s ? s : i;
              var i, n, s;
            })(a, s)),
              t(a),
              r && o && 1 === a && (Laya.timer.clearAll(this), e());
          });
        }),
          h = new Promise((e, t) => {
            this.levelManager
              .getLevelPositions(!0)
              .then(() => {
                (o = !0), e(null);
              })
              .catch((e) => {
                t(e);
              });
          }),
          c = new Promise((e) => {
            Laya.loader.load(
              n,
              Laya.Handler.create(this, () => {
                (r = !0), (s = 1), e(null);
              }),
              Laya.Handler.create(
                this,
                (e) => {
                  s = e;
                },
                null,
                !1
              )
            );
          });
        yield Promise.allSettled([c, h, l]).then(() => {
          i.length > 0 && Laya.loader.load(i);
        });
      });
    }
  },
    { regClass: Nd } = Laya,
    xd = class extends Laya.Script {
      onAwake() {
        xd._instance = this;
      }
      onStart() {
        (this.dataManager = sc.getInstance()),
          (this.levelManager = Bd.getInstance()),
          (this.skinManager = tc.getInstance()),
          (this.soundManager = lc.getInstance()),
          (this.settingManager = oc.getInstance()),
          (this.uiManager = wd.getInstance()),
          (this.dcManager = Td.getInstance()),
          (this.storageManager = Dd.getInstance()),
          (this.preloadManager = Rd.getInstance()),
          (this.dialogManager = Pd.getInstance()),
          (this.guideManager = rc.getInstance()),
          (this.eventManager = Vh.getInstance()),
          (this.adManager = Od.getInstance()),
          (this.responsiveManager = $h.getInstance()),
          (this.syncManager = hc.getInstance()),
          this.initManagers();
      }
      initManagers() {
        return _(this, null, function* () {
          this.syncManager.init(),
            this.eventManager.init(),
            this.dialogManager.init(),
            this.dataManager.init(),
            this.dcManager.init(),
            this.soundManager.init(),
            this.levelManager.init(),
            this.skinManager.init(),
            this.settingManager.init(),
            this.storageManager.init(),
            this.guideManager.init(),
            this.adManager.init(),
            this.responsiveManager.init(),
            yield this.preloadManager.init((e) => {
              this.uiManager.loading.setProgress(e);
            }),
            yield this.uiManager.loading.onDestroy(),
            this.uiManager.init();
        });
      }
    };
  xd = u([Nd("e60XQm7tTY2BwFAdxb8D1g")], xd);
  var { regClass: Fd, property: Hd } = Laya,
    Gd = class extends Laya.Script {
      constructor() {
        super(...arguments), (this.isOn = !1);
      }
      setBtnState(e) {
        (this.isOn = e), this.updateButtonUI();
      }
      onStart() {
        this.updateButtonUI();
      }
      updateButtonUI() {
        this.isOn
          ? ((this.bg.skin = "atlas/images/settings/common_btn_0003.png"),
            (this.label.text = "ON"),
            this.knob.pos(107, this.knob.y),
            this.label.pos(60, this.label.y))
          : ((this.bg.skin = "atlas/images/settings/common_btn_0004.png"),
            (this.label.text = "OFF"),
            this.knob.pos(0, this.knob.y),
            this.label.pos(135, this.label.y));
      }
    };
  u([Hd(Laya.Image)], Gd.prototype, "bg", 2),
    u([Hd(Laya.Image)], Gd.prototype, "knob", 2),
    u([Hd(Laya.Text)], Gd.prototype, "label", 2),
    (Gd = u([Fd("iYYoFogSRpSryVeb1xzDwA")], Gd));
  var { regClass: Ud, property: Kd } = Laya,
    Vd = class extends Laya.Script {
      constructor() {
        super(...arguments), (this._handlers = {});
      }
      onAwake() {
        (this.responsiveManager = $h.getInstance()),
          (this.musicButtonComponent = this.musicBtn.getComponent(Gd)),
          (this.soundButtonComponent = this.soundBtn.getComponent(Gd)),
          this.responsiveManager.isMobile &&
          (this.ruleBox = this.owner
            .getChildByName("InfoBox")
            .getChildByName("RuleBox"));
      }
      onEnable() {
        this.musicBtn.on(Laya.Event.CLICK, this, this.onMusicClick),
          this.soundBtn.on(Laya.Event.CLICK, this, this.onSoundClick),
          this.restartBtn.on(Laya.Event.CLICK, this, this.onRestartClick),
          this.closeBtn.on(Laya.Event.CLICK, this, this.onCloseBtnClick),
          this.responsiveManager.isMobile &&
          this.ruleBox.on(Laya.Event.CLICK, this, this.onRuleBtnClick),
          this.feedbackBox.on(Laya.Event.CLICK, this, this.onFeedbackBtnClick),
          this.policyLink.on(Laya.Event.LINK, this, (e) => {
            window.open(new URL("local-info.html", document.baseURI).href, "_blank", "noopener");
          }),
          this.serviceLink.on(Laya.Event.LINK, this, (e) => {
            window.open(new URL("local-info.html", document.baseURI).href, "_blank", "noopener");
          });
      }
      onDisable() {
        this.musicBtn.off(Laya.Event.CLICK, this, this.onSoundClick),
          this.soundBtn.off(Laya.Event.CLICK, this, this.onMusicClick),
          this.restartBtn.off(Laya.Event.CLICK, this, this.onRestartClick),
          this.closeBtn.off(Laya.Event.CLICK, this, this.onCloseBtnClick),
          this.feedbackBox.off(Laya.Event.CLICK, this, this.onFeedbackBtnClick),
          this.responsiveManager.isMobile &&
          this.ruleBox.off(Laya.Event.CLICK, this, this.onRuleBtnClick);
      }
      onDestroy() {
        Object.keys(this._handlers).forEach((e) => {
          this.removeHandler(e);
        });
      }
      onSoundClick() {
        var e;
        null == (e = this._handlers.sound) || e.run();
      }
      onMusicClick() {
        var e;
        null == (e = this._handlers.music) || e.run();
      }
      onFeedbackBtnClick() {
        Al("h5_btn_click", { btn_name: "feedback", source: "settings" }),
          window.open(new URL("local-info.html", document.baseURI).href, "_blank", "noopener");
      }
      onRestartClick() {
        this.close(),
          (this.owner.onClosed = () => {
            var e;
            null == (e = this._handlers.restart) || e.run(),
              this.owner.destroy(!0);
          });
      }
      onCloseBtnClick() {
        this.close(),
          (this.owner.onClosed = () => {
            this.owner.destroy(!0);
          });
      }
      onRuleBtnClick() {
        Al("h5_btn_click", { btn_name: "how_to_play", source: "settings" }),
          this.close(),
          (this.owner.onClosed = () => {
            Laya.loader
              .getRes(this.responsiveManager.srcOfRuleDialog)
              .create()
              .show();
            wd.getInstance().mask.show(), this.owner.destroy(!0);
          });
      }
      close() {
        this.owner.close();
        wd.getInstance().mask.hide();
      }
      updateSoundUI(e) {
        const t = e ? "6" : "7";
        (this.soundImg.skin = `atlas/images/settings/settings_pic_000${t}.png`),
          this.soundButtonComponent.setBtnState(e);
      }
      updateBgUI(e) {
        const t = e ? "4" : "5";
        (this.musicImg.skin = `atlas/images/settings/settings_pic_000${t}.png`),
          this.musicButtonComponent.setBtnState(e);
      }
      setHandler(e, t, i) {
        this._handlers[e] = Laya.Handler.create(t, i, null, !1);
      }
      removeHandler(e) {
        this._handlers[e] &&
          (this._handlers[e].clear(), delete this._handlers[e]);
      }
    };
  u([Kd(Laya.Sprite)], Vd.prototype, "closeBtn", 2),
    u([Kd(Laya.Box)], Vd.prototype, "musicBtn", 2),
    u([Kd(Laya.Box)], Vd.prototype, "soundBtn", 2),
    u([Kd(Laya.Image)], Vd.prototype, "soundImg", 2),
    u([Kd(Laya.Image)], Vd.prototype, "musicImg", 2),
    u([Kd(Laya.Button)], Vd.prototype, "restartBtn", 2),
    u([Kd(Laya.Box)], Vd.prototype, "feedbackBox", 2),
    u([Kd(Laya.Text)], Vd.prototype, "policyLink", 2),
    u([Kd(Laya.Text)], Vd.prototype, "serviceLink", 2),
    (Vd = u([Ud("FyqBchM2Ts6MBQqTi1j-fw")], Vd));
  var { regClass: Jd, property: Wd } = Laya,
    jd = class extends Laya.Script {
      onAwake() {
        (this.settingManager = oc.getInstance()),
          (this.uiManager = wd.getInstance()),
          this.dialog.setHandler("sound", this, this.toggleSound),
          this.dialog.setHandler("music", this, this.toggleBgMusic),
          this.dialog.setHandler("restart", this.uiManager.gameController, () =>
            this.uiManager.gameController.restart("option")
          );
      }
      onStart() {
        const e = this.settingManager.isSoundOn,
          t = this.settingManager.isBgOn;
        this.dialog.updateSoundUI(e), this.dialog.updateBgUI(t);
      }
      toggleSound() {
        (this.settingManager.isSoundOn = !this.settingManager.isSoundOn),
          this.dialog.updateSoundUI(this.settingManager.isSoundOn);
      }
      toggleBgMusic() {
        (this.settingManager.isBgOn = !this.settingManager.isBgOn),
          this.dialog.updateBgUI(this.settingManager.isBgOn);
      }
    };
  u([Wd(Vd)], jd.prototype, "dialog", 2),
    (jd = u([Jd("sEnCXKBDQyWtBr_EWgX3kg")], jd));
  var { regClass: qd } = Laya,
    Yd = class extends Laya.Script {
      onStart() {
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize), this.resize();
      }
      resize() {
        try {
          const e = this.owner,
            t = Math.max(
              Laya.stage.width / e.width,
              Laya.stage.height / e.height
            );
          e.scale(t, t), e.pos(0, 0);
        } catch (e) {
          console.error(e);
        }
      }
    };
  Yd = u([qd("yJ5DnoikRaWx9ohwf7p30Q")], Yd);
  var { regClass: zd } = Laya,
    Qd = class extends Laya.Script {
      onStart() {
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize), this.resize();
      }
      resize() {
        try {
          const e = this.owner,
            t = Math.max(
              Laya.stage.width / e.width,
              Laya.stage.height / e.height
            );
          e.scale(t, t), e.pos(0, 0);
        } catch (e) {
          console.error(e);
        }
      }
    };
  Qd = u([zd("XkWAnOgDQM6aIV5LLic82Q")], Qd);
  var { regClass: $d } = Laya,
    Zd = class extends Laya.Script {
      onStart() {
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize), this.resize();
      }
      resize() {
        try {
          const e = this.owner,
            t = Math.max(e.parent.width / e.width, e.parent.height / e.height);
          e.scale(t, t);
        } catch (e) {
          console.error(e);
        }
      }
    };
  Zd = u([$d("ugK3sA4eSNaW3W6jKv2g6g")], Zd);
  var { regClass: Xd } = Laya,
    eu = class extends Laya.Script {
      onStart() {
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize), this.resize();
      }
      resize() {
        this.owner.bottom = Laya.stage.designHeight - Laya.stage.height;
      }
      onDestroy() {
        Laya.stage.off(Laya.Event.RESIZE, this, this.resize);
      }
    };
  eu = u([Xd("tTa5L06ORWqNC6AFs09XfQ")], eu);
  var { regClass: tu } = Laya,
    iu = class extends Laya.Script {
      onStart() {
        const e = new Laya.GlowFilter("#145c26", 4, 0, 2);
        this.owner.text.filters = [e];
      }
    };
  iu = u([tu("dV8LmaPnRwidTKrOWP2VhA")], iu);
  var { regClass: nu, property: su } = Laya,
    au = class extends Laya.Script {
      constructor() {
        super(...arguments),
          (this.openClickEffect = !0),
          (this.openHoverMask = !0),
          (this.openHoverHand = !0);
      }
      onStart() {
        const { overlay1: e, overlay2: t } = this.createCombinedOverlay(
          this.target,
          this.img2Box,
          this.img1,
          this.img2
        );
        (this.overlay1 = e),
          (this.overlay2 = t),
          this.target.addChildAt(e, this.target.getChildIndex(this.img2Box)),
          this.target.addChild(t),
          this.target.on(Laya.Event.MOUSE_DOWN, this, this.onDown),
          this.target.on(Laya.Event.MOUSE_UP, this, this.onUp),
          this.target.on(Laya.Event.MOUSE_OVER, this, this.onOver),
          this.target.on(Laya.Event.MOUSE_OUT, this, this.onOut);
      }
      onDestroy() {
        (Laya.Mouse.cursor = "default"),
          this.target.off(Laya.Event.MOUSE_DOWN, this, this.onDown),
          this.target.off(Laya.Event.MOUSE_UP, this, this.onUp),
          this.target.off(Laya.Event.MOUSE_OVER, this, this.onOver),
          this.target.off(Laya.Event.MOUSE_OUT, this, this.onOut);
      }
      onDown() {
        if (!this.openClickEffect) return;
        const e = new Laya.ColorFilter([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        ]);
        (this.overlay1.filters = [e]),
          (this.overlay1.alpha = 0.4),
          (this.overlay2.filters = [e]),
          (this.overlay2.alpha = 0.4),
          (this.overlay1.visible = !0),
          (this.overlay2.visible = this.img2Box.visible),
          this.target.scale(0.95, 0.95);
      }
      onUp() {
        this.openClickEffect &&
          ((this.overlay1.visible = !1),
            (this.overlay2.visible = !1),
            this.target.scale(1, 1));
      }
      onOver() {
        if (this.openHoverMask) {
          const e = new Laya.ColorFilter([
            0, 0, 0, 0, 255, 0, 0, 0, 0, 255, 0, 0, 0, 0, 255, 0, 0, 0, 0.2, 0,
          ]);
          (this.overlay1.filters = [e]),
            (this.overlay2.filters = [e]),
            (this.overlay1.visible = !0),
            (this.overlay2.visible = this.img2Box.visible);
        }
        this.openHoverHand && (Laya.Render.canvas.style.cursor = "pointer");
      }
      onOut() {
        (Laya.Render.canvas.style.cursor = ""),
          (this.overlay1.visible = !1),
          (this.overlay2.visible = !1);
      }
      createCombinedOverlay(e, t, i, n) {
        const s = new Laya.Image();
        (s.skin = i.skin),
          (s.width = i.width),
          (s.height = i.height),
          (s.mouseEnabled = !1),
          (s.visible = !1),
          (s.zOrder = i.zOrder);
        const a = new Laya.Image();
        return (
          (a.skin = n.skin),
          (a.width = n.width),
          (a.height = n.height),
          a.pos(t.x, t.y),
          a.scale(t.scaleX, t.scaleY),
          (a.mouseEnabled = !1),
          (a.visible = !1),
          (a.zOrder = n.zOrder),
          { overlay1: s, overlay2: a }
        );
      }
    };
  u([su({ type: Boolean })], au.prototype, "openClickEffect", 2),
    u([su({ type: Boolean })], au.prototype, "openHoverMask", 2),
    u([su({ type: Boolean })], au.prototype, "openHoverHand", 2),
    u([su(Laya.Box)], au.prototype, "target", 2),
    u([su(Laya.Box)], au.prototype, "img2Box", 2),
    u([su(Laya.Image)], au.prototype, "img1", 2),
    u([su(Laya.Image)], au.prototype, "img2", 2),
    (au = u([nu("lVBSOC2uQvCIGR8O3MVZMg")], au));
  var { regClass: ru, property: ou } = Laya,
    lu = class extends Laya.Script {
      constructor() {
        super(...arguments),
          (this.scaleXInit = 1),
          (this.scaleYInit = 1),
          (this.openClickEffect = !0),
          (this.openHoverMask = !0),
          (this.openHoverHand = !0),
          (this.originalCursor = "");
      }
      onAwake() {
        const e = this.owner;
        (this.scaleXInit = e.scaleX),
          (this.scaleYInit = e.scaleY),
          (this.overlay = new Laya.Image()),
          (this.overlay.skin = e.skin),
          (this.overlay.sizeGrid = e.sizeGrid),
          (this.overlay.width = e.width),
          (this.overlay.height = e.height),
          (this.overlay.alpha = 0.4),
          (this.overlay.mouseEnabled = !1),
          (this.overlay.visible = !1),
          (this.overlay.zOrder = 999),
          e.addChild(this.overlay),
          e.on(Laya.Event.MOUSE_DOWN, this, this.onDown),
          e.on(Laya.Event.MOUSE_UP, this, this.onUp),
          e.on(Laya.Event.MOUSE_OVER, this, this.onOver),
          e.on(Laya.Event.MOUSE_OUT, this, this.onOut),
          Laya.timer.callLater(null, () => {
            (this.overlay.x = 0), (this.overlay.y = 0);
          });
      }
      onDown() {
        if (!this.openClickEffect) return;
        const e = new Laya.ColorFilter([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        ]);
        (this.overlay.filters = [e]),
          (this.overlay.visible = !0),
          this.owner.scale(0.95 * this.scaleXInit, 0.95 * this.scaleYInit);
      }
      onUp() {
        this.openClickEffect &&
          ((this.overlay.visible = !1),
            this.owner.scale(this.scaleXInit, this.scaleYInit),
            (Laya.Mouse.cursor = "default"));
      }
      onOver() {
        if (this.openHoverMask) {
          const e = new Laya.ColorFilter([
            0, 0, 0, 0, 255, 0, 0, 0, 0, 255, 0, 0, 0, 0, 255, 0, 0, 0, 0.2, 0,
          ]);
          (this.overlay.filters = [e]), (this.overlay.visible = !0);
        }
        this.openHoverHand &&
          ((this.originalCursor = Laya.Render.canvas.style.cursor),
            (Laya.Render.canvas.style.cursor = "pointer"));
      }
      onOut() {
        (Laya.Render.canvas.style.cursor = this.originalCursor || ""),
          (this.overlay.visible = !1);
      }
      onDestroy() {
        (Laya.Mouse.cursor = "default"),
          this.owner.off(Laya.Event.MOUSE_DOWN, this, this.onDown),
          this.owner.off(Laya.Event.MOUSE_UP, this, this.onUp),
          this.owner.off(Laya.Event.MOUSE_OVER, this, this.onOver),
          this.owner.off(Laya.Event.MOUSE_OUT, this, this.onOut);
      }
    };
  u([ou({ type: Boolean })], lu.prototype, "openClickEffect", 2),
    u([ou({ type: Boolean })], lu.prototype, "openHoverMask", 2),
    u([ou({ type: Boolean })], lu.prototype, "openHoverHand", 2),
    (lu = u([ru("Ji9oMDD6Rw2KSbsnAP_2Ew")], lu));
  var { regClass: hu, property: cu } = Laya,
    du = class extends Laya.Script {
      onAwake() {
        (this.uiManager = wd.getInstance()),
          (this.gameController = this.uiManager.gameController),
          (this.eventManager = Vh.getInstance()),
          (this.storageManager = Dd.getInstance()),
          (this.dcManager = Td.getInstance()),
          (this.responsiveManager = $h.getInstance()),
          this.bindEvents();
      }
      onStart() {
        this.responsiveManager.isMobile
          ? ((this.owner.scaleX = 1.5),
            (this.owner.scaleY = 1.5),
            this.owner.pos(Laya.stage.width - 1.5 * this.owner.width, 150))
          : this.owner.pos(0, Laya.stage.height - this.owner.height - 20);
      }
      bindEvents() {
        this.autoRemoveBtn.on(Laya.Event.CLICK, this, () => {
          this.gameController.onAutoBtnClick();
        }),
          this.autoRemoveBtnAdvance.on(Laya.Event.CLICK, this, () => {
            this.gameController.onAutoBtnClick1();
          }),
          this.autoCompleteBtn.on(Laya.Event.CLICK, this, () => {
            const e = this.monthText.text;
            if (
              (8 === e.length &&
                (this.storageManager.updateMonthFinishedDays(e),
                  this.eventManager.event(Uh, { dateStr: e }),
                  this.uiManager.calendar.refresh()),
                6 === e.length)
            ) {
              const t = e.slice(0, 4),
                i = e.slice(4, 6),
                n = new Date(Number(t), Number(i), 0).getDate(),
                s = [];
              for (let e = 1; e <= n; e++)
                s.push(`${t}${i}${e.toString().padStart(2, "0")}`);
              this.storageManager.updateMonthFinishedDays(s),
                this.eventManager.event(Kh, {
                  year: t,
                  month: i,
                  dateStrArray: s,
                }),
                this.uiManager.calendar.refresh();
            }
          }),
          this.autoRemoveMonthBtn.on(Laya.Event.CLICK, this, () => {
            const e = this.monthText.text,
              t = JSON.parse(Laya.LocalStorage.getItem(Dd.SAVE_KEY_MONTH));
            if (8 === e.length) {
              const i = t[e.slice(0, 6)];
              i.includes(e) && i.splice(i.indexOf(e), 1),
                Laya.LocalStorage.setItem(Dd.SAVE_KEY_MONTH, JSON.stringify(t)),
                this.uiManager.calendar.refresh();
            }
            if (6 === e.length) {
              const i = e.slice(0, 4),
                n = e.slice(4, 6),
                s = new Date(Number(i), Number(n), 0).getDate(),
                a = [];
              for (let e = 1; e <= s; e++)
                a.push(`${i}${n}${e.toString().padStart(2, "0")}`);
              delete t[e.slice(0, 6)],
                Laya.LocalStorage.setItem(Dd.SAVE_KEY_MONTH, JSON.stringify(t)),
                this.dcManager.generateYearList(),
                this.uiManager.calendar.refresh();
            }
          }),
          this.appearBtn.on(Laya.Event.CLICK, this, () => {
            this.uiManager.dc.showGetTrophyAnim(
              "atlas/images/dc/trophy/dc_trophy_icon_0001.png",
              "2025-05"
            );
          }),
          this.disappearBtn.on(Laya.Event.CLICK, this, () => {
            this.uiManager.dc.trophyGetDialog.disappear();
          });
      }
    };
  u([cu(Laya.Button)], du.prototype, "autoRemoveBtn", 2),
    u([cu(Laya.Button)], du.prototype, "autoRemoveBtnAdvance", 2),
    u([cu(Laya.Button)], du.prototype, "autoCompleteBtn", 2),
    u([cu(Laya.Button)], du.prototype, "autoRemoveMonthBtn", 2),
    u([cu(Laya.TextInput)], du.prototype, "monthText", 2),
    u([cu(Laya.Button)], du.prototype, "appearBtn", 2),
    u([cu(Laya.Button)], du.prototype, "disappearBtn", 2),
    (du = u([hu("BVBcmFhFR5eCM3_uthZt5Q")], du));
  var { regClass: uu } = Laya,
    pu = class extends Laya.Script {
      onAwake() {
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize), this.resize();
      }
      resize() {
        const e = Math.min(
          (Laya.stage.width - 72) / this.owner.width,
          (Laya.stage.height - 72) / this.owner.height
        );
        this.owner.scale(e, e);
      }
      onDestroy() {
        Laya.stage.off(Laya.Event.RESIZE, this, this.resize);
      }
    };
  pu = u([uu("oZjkqhVBRDKyTEPrOz-vfg")], pu);
  var { regClass: gu, property: fu } = Laya,
    mu = class extends Laya.Script {
      onStart() {
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize), this.resize();
      }
      resize() {
        try {
          (this.owner.bottom = Laya.stage.designHeight - Laya.stage.height),
            (this.boardBg.height =
              1526 - (Laya.stage.designHeight - Laya.stage.height)),
            (this.board.height =
              1526 - (Laya.stage.designHeight - Laya.stage.height)),
            (this.board.y = 163 + this.board.height / 2),
            Laya.stage.height -
              432 -
              this.nxtLevelButton.height * this.nxtLevelButton.scaleY <
              1100
              ? ((this.nxtLevelButton.bottom = null),
                (this.nxtLevelButton.y = 1100))
              : (this.nxtLevelButton.bottom = 432),
            Laya.stage.height - 215 - this.dcBtn.height * this.dcBtn.scaleY <
              1317
              ? ((this.dcBtn.bottom = null), (this.dcBtn.y = 1317))
              : (this.dcBtn.bottom = 215);
        } catch (e) {
          console.error(e);
        }
      }
      onDestroy() {
        Laya.stage.off(Laya.Event.RESIZE, this, this.resize);
      }
    };
  u([fu(Laya.Box)], mu.prototype, "boardBg", 2),
    u([fu(Laya.Box)], mu.prototype, "board", 2),
    u([fu(Laya.Button)], mu.prototype, "nxtLevelButton", 2),
    u([fu(Laya.Button)], mu.prototype, "dcBtn", 2),
    (mu = u([gu("t_HNfeMvRgyldZA6kkoK-w")], mu));
  var { regClass: yu, property: vu } = Laya,
    _u = class extends Laya.Script {
      constructor() {
        super(...arguments), (this.isPlayingSpineLoop = !1);
      }
      onAwake() {
        var e, t, i;
        null == (e = this.ruleSpine1) || e.stop(),
          null == (t = this.ruleSpine3) || t.stop(),
          null == (i = this.ruleSpine4) || i.stop();
      }
      onEnable() {
        var e;
        (this.btnBox.visible = !1),
          (this.nextBtn.visible = !0),
          this.closeBtn.on(Laya.Event.CLICK, this, this.close),
          this.nextBtn.on(Laya.Event.CLICK, this, this.onNextBtnClick),
          this.backBtn.on(Laya.Event.CLICK, this, this.onBackBtnClick),
          this.okBtn.on(Laya.Event.CLICK, this, this.close),
          null == (e = this.ruleSpine1) || e.play("Appear", !0, !0, 0);
      }
      onDisable() {
        this.closeBtn.off(Laya.Event.CLICK, this, this.close),
          this.nextBtn.off(Laya.Event.CLICK, this, this.onNextBtnClick),
          this.backBtn.off(Laya.Event.CLICK, this, this.onBackBtnClick),
          this.okBtn.off(Laya.Event.CLICK, this, this.close);
      }
      onNextBtnClick() {
        this.ruleSpine1.play("Appear", !1, !0, 0),
          this.ruleSpine1.stop(),
          this.toggleButtonsUI(),
          Laya.timer.clearAll(this),
          Laya.Tween.to(
            this.rulePanel.hScrollBar,
            { value: this.rulePanel.hScrollBar.max },
            500,
            Laya.Ease.cubicInOut
          ),
          Laya.timer.once(500, this, () => {
            this.isPlayingSpineLoop = !0;
            const e = () => {
              this.isPlayingSpineLoop &&
                (this.ruleSpine3.play("Appear", !1, !0, 0),
                  Laya.timer.once(2700, this, () => {
                    this.ruleSpine4.play("Appear", !1, !0, 0),
                      Laya.timer.once(7400, this, e);
                  }));
            };
            e();
          });
      }
      onBackBtnClick() {
        this.ruleSpine3.play("Appear", !1, !0, 0),
          this.ruleSpine4.play("Appear", !1, !0, 0),
          this.ruleSpine3.stop(),
          this.ruleSpine4.stop(),
          Laya.timer.clearAll(this),
          (this.isPlayingSpineLoop = !1),
          this.toggleButtonsUI(),
          Laya.Tween.to(
            this.rulePanel.hScrollBar,
            { value: 0 },
            500,
            Laya.Ease.cubicInOut
          ),
          Laya.timer.once(500, this, () => {
            this.ruleSpine1.play("Appear", !0);
          });
      }
      close() {
        this.owner.close();
        wd.getInstance().mask.hide(), this.owner.destroy(!0);
      }
      toggleButtonsUI() {
        (this.btnBox.visible = !this.btnBox.visible),
          (this.nextBtn.visible = !this.nextBtn.visible);
      }
    };
  u([vu(Laya.Button)], _u.prototype, "closeBtn", 2),
    u([vu(Laya.Panel)], _u.prototype, "rulePanel", 2),
    u([vu(Laya.Box)], _u.prototype, "btnBox", 2),
    u([vu(Laya.Button)], _u.prototype, "nextBtn", 2),
    u([vu(Laya.Button)], _u.prototype, "backBtn", 2),
    u([vu(Laya.Button)], _u.prototype, "okBtn", 2),
    u([vu(Laya.Spine2DRenderNode)], _u.prototype, "ruleSpine1", 2),
    u([vu(Laya.Spine2DRenderNode)], _u.prototype, "ruleSpine3", 2),
    u([vu(Laya.Spine2DRenderNode)], _u.prototype, "ruleSpine4", 2),
    (_u = u([yu("uCKwKhtXTSSvkLMCaVm63Q")], _u));
  var { regClass: Iu, property: Su } = Laya,
    Lu = class extends Laya.Script {
      onAwake() {
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize), this.resize();
      }
      onStart() {
        this.resize();
      }
      resize() {
        (this.owner.bottom = Laya.stage.designHeight - Laya.stage.height),
          this.calendarWrapper.height - 221 < 1180
            ? ((this.playBtn.bottom = null), (this.playBtn.y = 1180))
            : (this.playBtn.bottom = 221);
      }
      onDestroy() {
        Laya.stage.off(Laya.Event.RESIZE, this, this.resize);
      }
    };
  u([Su(Laya.Box)], Lu.prototype, "calendarWrapper", 2),
    u([Su(Laya.Button)], Lu.prototype, "playBtn", 2),
    (Lu = u([Iu("FwvECxY9RYWCgqMJr4UgKQ")], Lu));
  var { regClass: Au, property: Eu } = Laya,
    Cu = class extends Laya.Script {
      onAwake() {
        (this.uiManager = wd.getInstance()),
          (this.eventManager = Vh.getInstance()),
          (this.responsiveManager = $h.getInstance()),
          (this.dataManager = sc.getInstance()),
          (this._isMobile = this.responsiveManager.isMobile),
          this.backBtn.on(Laya.Event.CLICK, this, this.onBackBtnClick),
          this.settingBtn.on(Laya.Event.CLICK, this, this.onSettingBtnClick),
          this._isMobile ||
          this.ruleBtn.on(Laya.Event.CLICK, this, this.onRuleBtnClick);
      }
      onBackBtnClick() {
        var e;
        Al("h5_btn_click", {
          btn_name: "back",
          source:
            "dc" === this.dataManager.gameType
              ? "dc_gameplay"
              : "classic_gameplay",
        }),
          null == (e = this.eventManager.remote) ||
          e.message({
            type: "changeBgColor",
            data: { color: "#381705", duration: 1e3 },
          }),
          this.uiManager.guide.hideGuide(),
          "dc" === this.dataManager.gameType
            ? this.uiManager.goToDailyChallenge()
            : this.uiManager.goToHome();
      }
      onSettingBtnClick() {
        Al("h5_btn_click", {
          btn_name: "option",
          source:
            "dc" === this.dataManager.gameType
              ? "dc_gameplay"
              : "classic_gameplay",
        });
        Laya.loader
          .getRes(this.responsiveManager.srcOfSettingDialog)
          .create()
          .show();
        this.uiManager.mask.show();
      }
      onRuleBtnClick() {
        Al("h5_btn_click", {
          btn_name: "how_to_play",
          source:
            "dc" === this.dataManager.gameType
              ? "dc_gameplay"
              : "classic_gameplay",
        });
        Laya.loader
          .getRes(this.responsiveManager.srcOfRuleDialog)
          .create()
          .show();
        this.uiManager.mask.show();
      }
    };
  u([Eu(Laya.Sprite)], Cu.prototype, "backBtn", 2),
    u([Eu(Laya.Sprite)], Cu.prototype, "settingBtn", 2),
    u([Eu(Laya.Sprite)], Cu.prototype, "ruleBtn", 2),
    (Cu = u([Au("gARNxCp_TSaC3Li3W_bV9w")], Cu)),
    Laya.addBeforeInitCallback((e) => {
      const { breakpoint: t } = I;
      window.innerWidth / window.innerHeight <= t
        ? ((e.designWidth = 1080),
          (e.designHeight = 1920),
          (e.scaleMode = "fixedwidth"))
        : ((e.designWidth = 1920),
          (e.designHeight = 1080),
          (e.scaleMode = "fixedauto"));
    }),
    (window.$_main_ = function () {
      return _(this, null, function* () {
        const { breakpoint: e } = I;
        tc.loadTileTextures(),
          window.innerWidth / window.innerHeight <= e
            ? (console.log("mobile"), Laya.Scene.open("SceneMobile.ls"))
            : (console.log("pc"), Laya.Scene.open("Scene.ls"));
      });
    });
})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/analytics/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/analytics/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-c92d61ad.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/performance/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
