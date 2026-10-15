!(function (e, t) {
  "use strict";
  var i, a, r;
  (e.Particle2DSimulationSpace = void 0),
    ((i = e.Particle2DSimulationSpace || (e.Particle2DSimulationSpace = {}))[
      (i.Local = 0)
    ] = "Local"),
    (i[(i.World = 1)] = "World"),
    (e.Particle2DScalingMode = void 0),
    ((a = e.Particle2DScalingMode || (e.Particle2DScalingMode = {}))[
      (a.Hierarchy = 0)
    ] = "Hierarchy"),
    (a[(a.Local = 1)] = "Local");
  class s {
    get startSizeX() {
      return this._startSizeX;
    }
    set startSizeX(e) {
      (this._startSizeX = e), (this._startSizeY.mode = e.mode);
    }
    get startSizeY() {
      return this._startSizeY;
    }
    set startSizeY(e) {
      (this._startSizeY = e), (this._startSizeX.mode = e.mode);
    }
    get startSize() {
      return this.startSizeX;
    }
    set startSize(e) {
      this.startSizeX = e;
    }
    get maxParticles() {
      return this._maxParticles;
    }
    set maxParticles(e) {
      this._maxParticles = Math.floor(e);
    }
    constructor() {
      (this.duration = 5),
        (this.looping = !0),
        (this.playOnAwake = !0),
        (this.startDelay = new t.ParticleMinMaxCurve()),
        (this.startLifetime = new t.ParticleMinMaxCurve()),
        (this.startSpeed = new t.ParticleMinMaxCurve()),
        (this.startSize2D = !1),
        (this._startSizeX = new t.ParticleMinMaxCurve()),
        (this._startSizeY = new t.ParticleMinMaxCurve()),
        (this.startRotation = new t.ParticleMinMaxCurve()),
        (this.startColor = new t.ParticleMinMaxGradient()),
        (this._gravity = new t.Vector2()),
        (this.gravityModifier = 0),
        (this._spriteRotAndScale = new t.Vector4()),
        (this._spriteTranslateAndSpace = new t.Vector3()),
        (this.simulationSpace = e.Particle2DSimulationSpace.Local),
        (this.simulationSpeed = 1),
        (this.scaleMode = e.Particle2DScalingMode.Local),
        (this._maxParticles = 100),
        (this.autoRandomSeed = !0),
        (this.randomSeed = 0),
        (this.unitPixels = 50),
        (this.startDelay.mode = t.ParticleMinMaxCurveMode.Constant),
        (this.startDelay.constant = 0),
        (this.startLifetime.mode = t.ParticleMinMaxCurveMode.Constant),
        (this.startLifetime.constant = 5),
        (this.startSpeed.mode = t.ParticleMinMaxCurveMode.Constant),
        (this.startSpeed.constant = 5),
        (this.startSizeX.mode = t.ParticleMinMaxCurveMode.Constant),
        (this.startSizeX.constant = 0.5),
        (this.startSizeY.mode = t.ParticleMinMaxCurveMode.Constant),
        (this.startSizeY.constant = 0.5),
        (this.startRotation.mode = t.ParticleMinMaxCurveMode.Constant),
        (this.startRotation.constant = 0),
        (this.startColor.mode = t.ParticleMinMaxGradientMode.Color),
        this.startColor.color.setValue(1, 1, 1, 1);
    }
    cloneTo(e) {
      (e.duration = this.duration),
        (e.looping = this.looping),
        (e.playOnAwake = this.playOnAwake),
        this.startDelay.cloneTo(e.startDelay),
        this.startLifetime.cloneTo(e.startLifetime),
        this.startSpeed.cloneTo(e.startSpeed),
        (e.startSize2D = this.startSize2D),
        this.startSizeX.cloneTo(e.startSizeX),
        this.startSizeY.cloneTo(e.startSizeY),
        (e.startRotation = this.startRotation),
        this.startColor.cloneTo(e.startColor),
        (e.gravityModifier = this.gravityModifier),
        (e.simulationSpace = this.simulationSpace),
        (e.simulationSpeed = this.simulationSpeed),
        (e.scaleMode = this.scaleMode),
        (e.maxParticles = this.maxParticles),
        (e.autoRandomSeed = this.autoRandomSeed),
        (e.randomSeed = this.randomSeed),
        (e.unitPixels = this.unitPixels);
    }
    clone() {
      let e = new s();
      return this.cloneTo(e), e;
    }
  }
  class n {
    constructor() {
      (this.enable = !0),
        (this.angularVelocity = new t.ParticleMinMaxCurve()),
        (this.angularVelocity.mode = t.ParticleMinMaxCurveMode.Constant),
        (this.angularVelocity.constantMin = 45),
        (this.angularVelocity.constantMax = 45),
        this.angularVelocity.curveMin.add(0, 45),
        this.angularVelocity.curveMin.add(1, 45),
        this.angularVelocity.curveMax.add(0, 45),
        this.angularVelocity.curveMax.add(1, 45);
    }
    cloneTo(e) {
      (e.enable = this.enable), this.angularVelocity.cloneTo(e.angularVelocity);
    }
    clone() {
      let e = new n();
      return this.cloneTo(e), e;
    }
  }
  (e.Base2DShapeType = void 0),
    ((r = e.Base2DShapeType || (e.Base2DShapeType = {}))[(r.Fan = 0)] = "Fan"),
    (r[(r.Circle = 1)] = "Circle"),
    (r[(r.Box = 2)] = "Box"),
    (r[(r.Semicircle = 3)] = "Semicircle"),
    (r[(r.None = 4)] = "None");
  class o {
    constructor(i) {
      (this.type = e.Base2DShapeType.None),
        (this.posAndDir = new t.Vector4()),
        (this.type = i);
    }
  }
  const l = Math.PI / 180;
  var c, m, h;
  (e.FanShapeEmitType = void 0),
    ((c = e.FanShapeEmitType || (e.FanShapeEmitType = {}))[(c.Base = 0)] =
      "Base"),
    (c[(c.Area = 1)] = "Area");
  class u extends o {
    constructor() {
      super(e.Base2DShapeType.Fan),
        (this.angle = 25),
        (this.radius = 1),
        (this.emitType = e.FanShapeEmitType.Base),
        (this.length = 5);
    }
    getPositionAndDirection() {
      let t = this.radius,
        i = 2 * Math.random() - 1,
        a = this.angle * i * l,
        r = Math.sin(a),
        s = Math.cos(a),
        n = 0,
        o = i * t;
      switch (this.emitType) {
        case e.FanShapeEmitType.Area:
          (n = this.length * Math.random()), (o += n * Math.tan(a));
        case e.FanShapeEmitType.Base:
      }
      let c = this.posAndDir;
      return c.setValue(o, n, r, s), c;
    }
    cloneTo(e) {
      (e.angle = this.angle),
        (e.radius = this.radius),
        (e.emitType = this.emitType),
        (e.length = this.length);
    }
    clone() {
      let e = new u();
      return this.cloneTo(e), e;
    }
  }
  class d {
    constructor() {
      (this.enable = !0), (this.shape = new u());
    }
    cloneTo(e) {
      (e.enable = this.enable), this.shape.cloneTo(e.shape);
    }
    clone() {
      let e = new d();
      return this.cloneTo(e), e;
    }
  }
  class f extends o {
    constructor() {
      super(e.Base2DShapeType.Box),
        (this.size = new t.Vector2(1, 1)),
        (this.randomDirection = !1);
    }
    getPositionAndDirection() {
      let e = Math.random() * this.size.x + -0.5 * this.size.x,
        t = Math.random() * this.size.y + -0.5 * this.size.y,
        i = 0,
        a = 1;
      if (this.randomDirection) {
        let e = Math.random() * Math.PI * 2;
        (i = Math.sin(e)), (a = Math.cos(e));
      }
      return this.posAndDir.setValue(e, t, i, a), this.posAndDir;
    }
    cloneTo(e) {
      this.size.cloneTo(e.size), (e.randomDirection = this.randomDirection);
    }
    clone() {
      let e = new f();
      return this.cloneTo(e), e;
    }
  }
  class M extends o {
    constructor() {
      super(e.Base2DShapeType.Circle),
        (this.radius = 1),
        (this.emitFromEdge = !1),
        (this.randomDirction = !1);
    }
    getPositionAndDirection() {
      let e = Math.random() * Math.PI * 2,
        t = Math.sin(e),
        i = Math.cos(e),
        a = 0,
        r = 0;
      if (this.emitFromEdge) (a = t * this.radius), (r = i * this.radius);
      else {
        let e = Math.random() * this.radius;
        (a = t * e), (r = i * e);
      }
      if (this.randomDirction) {
        let e = Math.random() * Math.PI * 2;
        (t = Math.sin(e)), (i = Math.cos(e));
      }
      return this.posAndDir.setValue(a, r, t, i), this.posAndDir;
    }
    cloneTo(e) {
      (e.radius = this.radius),
        (e.emitFromEdge = this.emitFromEdge),
        (e.randomDirction = this.randomDirction);
    }
    clone() {
      let e = new M();
      return this.cloneTo(e), e;
    }
  }
  class v extends o {
    constructor() {
      super(e.Base2DShapeType.Semicircle),
        (this.radius = 1),
        (this.emitFromEdge = !1),
        (this.randomDirction = !1);
    }
    getPositionAndDirection() {
      let e = Math.random() * Math.PI - 0.5 * Math.PI,
        t = Math.sin(e),
        i = Math.cos(e),
        a = 0,
        r = 0;
      if (this.emitFromEdge) (a = t * this.radius), (r = i * this.radius);
      else {
        let e = Math.random() * this.radius;
        (a = t * e), (r = i * e);
      }
      if (this.randomDirction) {
        let e = Math.random() * Math.PI - 0.5 * Math.PI;
        (t = Math.sin(e)), (i = Math.cos(e));
      }
      return this.posAndDir.setValue(a, r, t, i), this.posAndDir;
    }
    cloneTo(e) {
      (e.radius = this.radius),
        (e.emitFromEdge = this.emitFromEdge),
        (e.randomDirction = this.randomDirction);
    }
    clone() {
      let e = new v();
      return this.cloneTo(e), e;
    }
  }
  class D {
    get x() {
      return this._x;
    }
    set x(e) {
      (this._x = e), (this._y.mode = e.mode);
    }
    get y() {
      return this._y;
    }
    set y(e) {
      (this._y = e), (this._x.mode = e.mode);
    }
    get size() {
      return this.x;
    }
    set size(e) {
      this.x = e;
    }
    constructor() {
      (this.enable = !0),
        (this.separateAxes = !1),
        (this._x = new t.ParticleMinMaxCurve()),
        (this._y = new t.ParticleMinMaxCurve()),
        (this.x.mode = t.ParticleMinMaxCurveMode.Constant),
        (this.x.constantMin = 1),
        (this.x.constantMax = 1),
        this.x.curveMin.add(0, 0),
        this.x.curveMin.add(1, 1),
        this.x.curveMax.add(0, 0),
        this.x.curveMax.add(1, 1),
        (this.y.mode = t.ParticleMinMaxCurveMode.Constant),
        (this.y.constantMin = 1),
        (this.y.constantMax = 1),
        this.y.curveMin.add(0, 0),
        this.y.curveMin.add(1, 1),
        this.y.curveMax.add(0, 0),
        this.y.curveMax.add(1, 1);
    }
    cloneTo(e) {
      (e.enable = this.enable),
        (e.separateAxes = this.separateAxes),
        this.x.cloneTo(e.x),
        this.y.cloneTo(e.y);
    }
    clone() {
      let e = new D();
      return this.cloneTo(e), e;
    }
  }
  (e.Velocity2DSimulateSpace = void 0),
    ((m = e.Velocity2DSimulateSpace || (e.Velocity2DSimulateSpace = {}))[
      (m.Local = 0)
    ] = "Local"),
    (m[(m.World = 1)] = "World");
  class y {
    get x() {
      return this._x;
    }
    set x(e) {
      (this._x = e), (this._y.mode = e.mode);
    }
    get y() {
      return this._y;
    }
    set y(e) {
      (this._y = e), (this._x.mode = e.mode);
    }
    constructor() {
      (this.enable = !0),
        (this.space = e.Velocity2DSimulateSpace.Local),
        (this._x = new t.ParticleMinMaxCurve()),
        (this._y = new t.ParticleMinMaxCurve());
    }
    cloneTo(e) {
      (e.enable = this.enable),
        (e.space = this.space),
        this.x.cloneTo(e.x),
        this.y.cloneTo(e.y);
    }
    clone() {
      let e = new y();
      return this.cloneTo(e), e;
    }
  }
  class x {
    constructor(e, i, a) {
      (this.maxParitcleCount = 0),
        (this.maxParitcleCount = e),
        (this.bufferState = t.LayaGL.renderDeviceFactory.createBufferState());
      {
        let r = 4 * (e += 1),
          s = (this.particleBuffer =
            t.LayaGL.renderDeviceFactory.createVertexBuffer(
              t.BufferUsage.Dynamic
            ));
        s.vertexDeclaration = i;
        let n = i.vertexStride / 4,
          o = (this.particleDatas = new Float32Array(r * n));
        s.setDataLength(o.byteLength);
        let l = t.LayaGL.renderDeviceFactory.createVertexBuffer(
          t.BufferUsage.Static
        );
        l.vertexDeclaration = a;
        let c = a.vertexStride / 4,
          m = new Float32Array(r * c);
        for (let t = 0; t < e; t++) {
          let e = 4 * t * c,
            i = e;
          (m[i + 0] = -0.5), (m[i + 1] = -0.5), (m[i + 2] = 0), (m[i + 3] = 0);
          let a = e + c;
          (m[a + 0] = 0.5), (m[a + 1] = -0.5), (m[a + 2] = 1), (m[a + 3] = 0);
          let r = e + 2 * c;
          (m[r + 0] = 0.5), (m[r + 1] = 0.5), (m[r + 2] = 1), (m[r + 3] = 1);
          let s = e + 3 * c;
          (m[s + 0] = -0.5), (m[s + 1] = 0.5), (m[s + 2] = 0), (m[s + 3] = 1);
        }
        l.setDataLength(m.byteLength), l.setData(m.buffer, 0, 0, m.byteLength);
        let h,
          u = (this.indexBuffer =
            t.LayaGL.renderDeviceFactory.createIndexBuffer(
              t.BufferUsage.Static
            )),
          d = 6 * e,
          f = r > 65535 ? t.IndexFormat.UInt32 : t.IndexFormat.UInt16;
        h = f == t.IndexFormat.UInt16 ? new Uint16Array(d) : new Uint32Array(d);
        const M = [0, 1, 2, 0, 2, 3];
        for (let t = 0; t < e; t++) {
          let e = 6 * t;
          (h[e + 0] = M[0] + 4 * t),
            (h[e + 1] = M[1] + 4 * t),
            (h[e + 2] = M[2] + 4 * t),
            (h[e + 3] = M[3] + 4 * t),
            (h[e + 4] = M[4] + 4 * t),
            (h[e + 5] = M[5] + 4 * t);
        }
        (u.indexCount = d),
          (u.indexType = f),
          u._setIndexDataLength(h.byteLength),
          u._setIndexData(h, 0),
          this.bufferState.applyState([l, s], u);
      }
      {
        let e = t.LayaGL.renderDeviceFactory.createRenderGeometryElement(
          t.MeshTopology.Triangles,
          t.DrawType.DrawElement
        );
        (e.indexFormat = this.indexBuffer.indexType),
          (e.bufferState = this.bufferState),
          (this.geometry = e);
      }
    }
    destroy() {
      this.geometry.destroy(), this.bufferState.destroy();
    }
  }
  class S {
    static init() {
      const e =
          t.LayaGL.renderDeviceFactory.createGlobalUniformMap("_Particle2D"),
        i = (i, a) => {
          let r = t.Shader3D.propertyNameToID(i);
          return e.addShaderUniform(r, i, a), r;
        };
      (S.CurrentTime = i("u_CurrentTime", t.ShaderDataType.Float)),
        (S.UnitPixels = i("u_UnitPixels", t.ShaderDataType.Float)),
        (S.ColorOverLifetimeDef =
          t.Shader3D.getDefineByName("COLOROVERLIFETIME")),
        (S.ColorOverLifetimeRandom = t.Shader3D.getDefineByName(
          "COLOROVERLIFETIME_RANDOM"
        )),
        (S.ColorOVerLifetimeColorKey_8 = t.Shader3D.getDefineByName(
          "COLOROVERLIFETIME_COLORKEY_8"
        )),
        (S.GradientRGB = i("u_GradientRGB", t.ShaderDataType.Buffer)),
        (S.GradientAlpha = i("u_GradientAlpha", t.ShaderDataType.Buffer)),
        (S.GradientTimeRange = i(
          "u_GradientTimeRange",
          t.ShaderDataType.Vector4
        )),
        (S.GradientMaxRGB = i("u_GradientMaxRGB", t.ShaderDataType.Buffer)),
        (S.GradientMaxAlpha = i("u_GradientMaxAlpha", t.ShaderDataType.Buffer)),
        (S.GradientMaxTimeRange = i(
          "u_GradientMaxTimeRange",
          t.ShaderDataType.Vector4
        )),
        (S.VelocityOverLifetimeDef = t.Shader3D.getDefineByName(
          "VELOCITYOVERLIFETIME"
        )),
        (S.VelocityCurveMinX = i(
          "u_VelocityCurveMinX",
          t.ShaderDataType.Buffer
        )),
        (S.VelocityCurveMinY = i(
          "u_VelocityCurveMinY",
          t.ShaderDataType.Buffer
        )),
        (S.VelocityCurveMaxX = i(
          "u_VelocityCurveMaxX",
          t.ShaderDataType.Buffer
        )),
        (S.VelocityCurveMaxY = i(
          "u_VelocityCurveMaxY",
          t.ShaderDataType.Buffer
        )),
        (S.VelocityOverLifetimeSpace = i(
          "u_VelocityOverLifetimeSpace",
          t.ShaderDataType.Float
        )),
        (S.SizeOverLifetimeDef =
          t.Shader3D.getDefineByName("SIZEOVERLIFETIME")),
        (S.SizeCurveMinX = i("u_SizeCurveMinX", t.ShaderDataType.Buffer)),
        (S.SizeCurveMinY = i("u_SizeCurveMinY", t.ShaderDataType.Buffer)),
        (S.SizeCurveMinTimeRange = i(
          "u_SizeCurveMinTimeRange",
          t.ShaderDataType.Vector4
        )),
        (S.SizeCurveMaxX = i("u_SizeCurveMaxX", t.ShaderDataType.Buffer)),
        (S.SizeCurveMaxY = i("u_SizeCurveMaxY", t.ShaderDataType.Buffer)),
        (S.SizeCurveMaxTimeRange = i(
          "u_SizeCurveMaxTimeRange",
          t.ShaderDataType.Vector4
        )),
        (S.RotationOverLifetimeDef = t.Shader3D.getDefineByName(
          "ROTATIONOVERLIFETIME"
        )),
        (S.RotationCurveMin = i("u_RotationCurveMin", t.ShaderDataType.Buffer)),
        (S.RotationCurveMax = i("u_RotationCurveMax", t.ShaderDataType.Buffer)),
        (S.TextureSheetAnimationDef = t.Shader3D.getDefineByName(
          "TEXTURESHEETANIMATION"
        )),
        (S.TextureSheetFrameData = i(
          "u_TextureSheetFrameData",
          t.ShaderDataType.Vector4
        )),
        (S.TextureSheetFrame = i(
          "u_TextureSheetFrame",
          t.ShaderDataType.Buffer
        )),
        (S.TextureSheetFrameMax = i(
          "u_TextureSheetFrameMax",
          t.ShaderDataType.Buffer
        )),
        (S.TextureSheetFrameRange = i(
          "u_TextureSheetFrameRange",
          t.ShaderDataType.Vector4
        ));
    }
  }
  (e.Particle2DVertex = void 0),
    ((h = e.Particle2DVertex || (e.Particle2DVertex = {}))[
      (h.PositionAndUV = 0)
    ] = "PositionAndUV"),
    (h[(h.SheetFrameData = 7)] = "SheetFrameData"),
    (h[(h.DirectionAndPosition = 8)] = "DirectionAndPosition"),
    (h[(h.SizeAndTimes = 9)] = "SizeAndTimes"),
    (h[(h.SpeedSpaceAndRot = 10)] = "SpeedSpaceAndRot"),
    (h[(h.StartColor = 11)] = "StartColor"),
    (h[(h.RotationAndScale = 12)] = "RotationAndScale"),
    (h[(h.TransAndGravity = 13)] = "TransAndGravity"),
    (h[(h.Random0 = 14)] = "Random0"),
    (h[(h.Random1 = 15)] = "Random1");
  class p {
    constructor() {
      let e = _.Particle2DDeclaration.vertexStride,
        t = new ArrayBuffer(e);
      this.data = new Float32Array(t);
    }
    setDirection(e, t) {
      (this.data[0] = e), (this.data[1] = t);
    }
    setPosition(e, t) {
      (this.data[2] = e), (this.data[3] = t);
    }
    setSize(e, t) {
      (this.data[4] = e), (this.data[5] = t);
    }
    setEmitTime(e) {
      this.data[6] = e;
    }
    setLifetime(e) {
      this.data[7] = e;
    }
    setSpeed(e) {
      this.data[8] = e;
    }
    setSimulationSpace(e) {
      this.data[9] = e;
    }
    setRot(e, t) {
      (this.data[10] = e), (this.data[11] = t);
    }
    setColor(e, t, i, a) {
      (this.data[12] = e),
        (this.data[13] = t),
        (this.data[14] = i),
        (this.data[15] = a);
    }
    setSpriteRotAndScale(e, t, i, a) {
      (this.data[16] = e),
        (this.data[17] = t),
        (this.data[18] = i),
        (this.data[19] = a);
    }
    setSpriteTrans(e, t) {
      (this.data[20] = e), (this.data[21] = t);
    }
    setGravity(e, t) {
      (this.data[22] = e), (this.data[23] = t);
    }
    setRandom(e, t, i, a) {
      (this.data[24] = e),
        (this.data[25] = t),
        (this.data[26] = i),
        (this.data[27] = a);
    }
    setRandom1(e, t, i, a) {
      (this.data[28] = e),
        (this.data[29] = t),
        (this.data[30] = i),
        (this.data[31] = a);
    }
    setSheetFrameData(e, t, i, a) {
      (this.data[32] = e),
        (this.data[33] = t),
        (this.data[34] = i),
        (this.data[35] = a);
    }
  }
  class _ {
    static init() {
      let i = [
        {
          usage: e.Particle2DVertex.DirectionAndPosition,
          format: t.VertexElementFormat.Vector4,
        },
        {
          usage: e.Particle2DVertex.SizeAndTimes,
          format: t.VertexElementFormat.Vector4,
        },
        {
          usage: e.Particle2DVertex.SpeedSpaceAndRot,
          format: t.VertexElementFormat.Vector4,
        },
        {
          usage: e.Particle2DVertex.StartColor,
          format: t.VertexElementFormat.Vector4,
        },
        {
          usage: e.Particle2DVertex.RotationAndScale,
          format: t.VertexElementFormat.Vector4,
        },
        {
          usage: e.Particle2DVertex.TransAndGravity,
          format: t.VertexElementFormat.Vector4,
        },
        {
          usage: e.Particle2DVertex.Random0,
          format: t.VertexElementFormat.Vector4,
        },
        {
          usage: e.Particle2DVertex.Random1,
          format: t.VertexElementFormat.Vector4,
        },
        {
          usage: e.Particle2DVertex.SheetFrameData,
          format: t.VertexElementFormat.Vector4,
        },
      ];
      _.Particle2DDeclaration = C(i);
      let a = [
        {
          usage: e.Particle2DVertex.PositionAndUV,
          format: t.VertexElementFormat.Vector4,
        },
      ];
      (_.Particle2DMeshDeclaration = C(a)), (_.TempParticle2D = new p());
      let r = (_.Particle2DInfo = new t.ParticleInfo()),
        s = _.Particle2DDeclaration;
      (r.timeIndex =
        s.getVertexElementByUsage(e.Particle2DVertex.SizeAndTimes).offset / 4 +
        2),
        (r.lifetimeIndex =
          s.getVertexElementByUsage(e.Particle2DVertex.SizeAndTimes).offset /
            4 +
          3);
    }
  }
  function g(e) {
    switch (e) {
      case t.VertexElementFormat.Vector4:
        return 16;
      case t.VertexElementFormat.Vector3:
        return 12;
      case t.VertexElementFormat.Vector2:
        return 8;
      default:
        throw new Error("Unkonw vertex format.");
    }
  }
  function C(e) {
    let i = 0,
      a = [];
    for (let r = 0; r < e.length; r++) {
      let s = e[r],
        n = i,
        o = g(s.format);
      o > 0 && (a.push(new t.VertexElement(n, s.format, s.usage)), (i += o));
    }
    return new t.VertexDeclaration(i, a);
  }
  const P = new t.Point();
  var T;
  (e.Particle2DSystemDirtyFlagBits = void 0),
    ((T =
      e.Particle2DSystemDirtyFlagBits ||
      (e.Particle2DSystemDirtyFlagBits = {}))[
      (T.Velocity2DOverLifetimeBit = 1)
    ] = "Velocity2DOverLifetimeBit"),
    (T[(T.ColorOverLifetimeBit = 2)] = "ColorOverLifetimeBit"),
    (T[(T.Size2DOverLifetimeBit = 4)] = "Size2DOverLifetimeBit"),
    (T[(T.Rotation2DOverLifetimeBit = 8)] = "Rotation2DOverLifetimeBit"),
    (T[(T.TextureSheetAnimationBit = 16)] = "TextureSheetAnimationBit");
  class B extends t.ParticleControler {
    get main() {
      return this._main;
    }
    get emission() {
      return this._emission;
    }
    get velocity2DOverLifetime() {
      return this._velocity2DOverLifetime;
    }
    set velocity2DOverLifetime(t) {
      (this._velocity2DOverLifetime = t),
        (this._dirtyFlags |=
          e.Particle2DSystemDirtyFlagBits.Velocity2DOverLifetimeBit);
    }
    get colorOverLifetime() {
      return this._colorOverLifetime;
    }
    set colorOverLifetime(t) {
      (this._colorOverLifetime = t),
        (this._dirtyFlags |=
          e.Particle2DSystemDirtyFlagBits.ColorOverLifetimeBit);
    }
    get size2DOverLifetime() {
      return this._size2DOverLifetime;
    }
    set size2DOverLifetime(t) {
      (this._size2DOverLifetime = t),
        (this._dirtyFlags |=
          e.Particle2DSystemDirtyFlagBits.Size2DOverLifetimeBit);
    }
    get rotation2DOverLifetime() {
      return this._rotation2DOverLifetime;
    }
    set rotation2DOverLifetime(t) {
      (this._rotation2DOverLifetime = t),
        (this._dirtyFlags |=
          e.Particle2DSystemDirtyFlagBits.Rotation2DOverLifetimeBit);
    }
    get textureSheetAnimation() {
      return this._textureSheetAnimation;
    }
    set textureSheetAnimation(t) {
      (this._textureSheetAnimation = t),
        (this._dirtyFlags |=
          e.Particle2DSystemDirtyFlagBits.TextureSheetAnimationBit);
    }
    _initParticleData(e, t) {
      let i = this.main.maxParticles;
      this._initParticlePool(i, e, t);
    }
    constructor() {
      super(),
        (this._dirtyFlags = -1),
        (this._main = new s()),
        (this._emission = new t.EmissionModule()),
        (this._dirtyFlags = -1);
    }
    play() {
      super.play();
      let e = P;
      this.owner.globalTrans.getPos(e),
        this.emission._lastPosition.setValue(e.x, e.y, 0);
    }
    getPositionAndDirection() {
      return this.shape && this.shape.enable && this.shape.shape
        ? this.shape.shape.getPositionAndDirection()
        : t.Vector4.UnitW;
    }
    _emit(e, i) {
      if (this.particlePool.activeParticleCount >= this.main.maxParticles)
        return !1;
      const a = this.main;
      let r = _.TempParticle2D,
        s = a.duration,
        n = this.time / s,
        o = L(a.startLifetime.mode) ? Math.random() : 0,
        l = a.startLifetime.evaluate(n, o),
        c = L(a.startDelay.mode) ? Math.random() : 0,
        m = a.startDelay.evaluate(n, c),
        h = L(a.startSpeed.mode) ? Math.random() : 0,
        u = a.startSpeed.evaluate(n, h),
        d = L(a.startSizeX.mode) ? Math.random() : 0,
        f = a.startSizeX.evaluate(n, d),
        M = f;
      if (a.startSize2D) {
        let e = L(a.startSizeY.mode) ? Math.random() : 0;
        M = a.startSizeY.evaluate(n, e);
      }
      let v = L(a.startRotation.mode) ? Math.random() : 0,
        D = (-a.startRotation.evaluate(n, v) * Math.PI) / 180;
      r.setEmitTime(e + m), r.setLifetime(l);
      let y = this.getPositionAndDirection();
      r.setPosition(y.x, y.y),
        r.setDirection(y.z, y.w),
        r.setSize(f, M),
        r.setSpeed(u),
        r.setGravity(a._gravity.x, a._gravity.y),
        r.setRot(Math.cos(D), Math.sin(D));
      let x = 0;
      if (this.colorOverLifetime && this.colorOverLifetime.enable) {
        if (
          this.colorOverLifetime.color.mode ===
          t.ParticleMinMaxGradientMode.TwoGradients
        )
          x = Math.random();
      }
      let S = 0,
        p = 0;
      if (this.velocity2DOverLifetime && this.velocity2DOverLifetime.enable) {
        switch (this.velocity2DOverLifetime.x.mode) {
          case t.ParticleMinMaxCurveMode.TwoConstants:
          case t.ParticleMinMaxCurveMode.TwoCurves:
            (S = Math.random()), (p = Math.random());
        }
      }
      let g = 0;
      if (this.rotation2DOverLifetime && this.rotation2DOverLifetime.enable) {
        switch (this.rotation2DOverLifetime.angularVelocity.mode) {
          case t.ParticleMinMaxCurveMode.TwoConstants:
          case t.ParticleMinMaxCurveMode.TwoCurves:
            g = Math.random();
        }
      }
      r.setRandom(x, S, p, g);
      let C = 0,
        P = 0;
      if (this.size2DOverLifetime && this.size2DOverLifetime.enable) {
        switch (this.size2DOverLifetime.size.mode) {
          case t.ParticleMinMaxCurveMode.Constant:
            if (this.size2DOverLifetime.separateAxes) {
              let e = this.size2DOverLifetime.x.constant,
                t = this.size2DOverLifetime.y.constant;
              r.setSize(f * e, M * t);
            } else {
              let e = this.size2DOverLifetime.size.constant;
              r.setSize(f * e, M * e);
            }
            break;
          case t.ParticleMinMaxCurveMode.TwoConstants:
            if (this.size2DOverLifetime.separateAxes) {
              let e = this.size2DOverLifetime.x.constantMin,
                t = this.size2DOverLifetime.y.constantMin,
                i = this.size2DOverLifetime.x.constantMax,
                a = this.size2DOverLifetime.y.constantMax,
                s = e + Math.random() * (i - e),
                n = t + Math.random() * (a - t);
              r.setSize(f * s, M * n);
            } else {
              let e = this.size2DOverLifetime.size.constantMin,
                t = this.size2DOverLifetime.size.constantMax,
                i = e + Math.random() * (t - e);
              r.setSize(f * i, M * i);
            }
            break;
          case t.ParticleMinMaxCurveMode.TwoCurves:
            this.size2DOverLifetime.separateAxes
              ? ((C = Math.random()), (P = Math.random()))
              : (C = P = Math.random());
        }
      }
      let T = 0;
      if (this.textureSheetAnimation && this.textureSheetAnimation.enable) {
        switch (this.textureSheetAnimation.frame.mode) {
          case t.ParticleMinMaxCurveMode.TwoConstants:
          case t.ParticleMinMaxCurveMode.TwoCurves:
            T = Math.random();
        }
      }
      r.setRandom1(C, P, T, 0);
      let B = a._spriteRotAndScale;
      r.setSpriteRotAndScale(B.x, B.y, B.z, B.w);
      let V = a._spriteTranslateAndSpace;
      r.setSpriteTrans(V.x, V.y), r.setSimulationSpace(V.z);
      let O = (function (e) {
          switch (e) {
            case t.ParticleMinMaxGradientMode.TwoColors:
            case t.ParticleMinMaxGradientMode.TwoGradients:
              return !0;
            default:
              return !1;
          }
        })(a.startColor.mode)
          ? Math.random()
          : 0,
        R = a.startColor.evaluate(n, O);
      if (
        (r.setColor(R.r, R.g, R.b, R.a),
        this.textureSheetAnimation && this.textureSheetAnimation.enable)
      ) {
        this.textureSheetAnimation._calculateSheetFrameData();
        let e = this.textureSheetAnimation._sheetFrameData;
        r.setSheetFrameData(e.x, e.y, e.z, e.w);
      }
      return this.particlePool.addParticleData(r.data), !0;
    }
    _emitOverTime(e) {
      let t = this.totalTime,
        i = this._lastEmitTime,
        a = t - i,
        r = this.emission._emissionInterval;
      if (a >= r) {
        let e = Math.floor(a / r);
        for (let a = 1; a <= e; a++) {
          let e = a * r + i,
            s = t - e;
          this._emit(e, s), (this._lastEmitTime = e);
        }
      }
    }
    _emitOverDistance() {
      let e = this.emission;
      if (e.rateOverDistance <= 0) return;
      let t = (1 / e.rateOverDistance) * this.main.unitPixels;
      if (this._emitDistance >= t) {
        let e = Math.floor(this._emitDistance / t);
        for (let i = 1; i <= e; i++) {
          let e = this.totalTime,
            i = 0;
          this._emit(e, i), (this._emitDistance -= t);
        }
      }
    }
    _emitBurst(e, t) {
      e.time;
      let i = e.count,
        a = this.totalTime - t;
      for (let e = 0; e < i && this._emit(t, a); e++);
    }
    _emitBursts() {
      let e = this.emission._sortedBursts,
        t = e ? e.length : 0,
        i = this.main.duration;
      for (let a = this._nextBurstIndex; a < t; a++) {
        let r = e[a];
        if (r.time > i) break;
        let s = this._burstLoopCount * i + r.time;
        s <= this.totalTime &&
          (this._emitBurst(r, s),
          (this._nextBurstIndex = a + 1),
          this._nextBurstIndex >= t &&
            ((this._nextBurstIndex = (a + 1) % t), this._burstLoopCount++));
      }
    }
    _update(e) {
      if (this.isPlaying) {
        e *= this.main.simulationSpeed;
        if (e <= 0) return;
        (this.time += e),
          (this.totalTime += e),
          this.time >= this.main.duration &&
            (this.main.looping
              ? (this.time -= this.main.duration)
              : ((this._isEmitting = !1),
                this.particlePool.activeParticleCount <= 0 && this.stop())),
          this.particlePool.retireParticles(this.totalTime),
          this.emission.enable &&
            this.isEmitting &&
            (this._emitOverTime(e),
            this._emitOverDistance(),
            this._emitBursts());
      }
    }
    simulate(e, t = !0) {
      this.isPlaying &&
        (t && (this.stop(), this.play()), this._update(e), this.pause());
    }
    cloneTo(e) {
      this.main.cloneTo(e.main),
        this.emission.cloneTo(e.emission),
        this.shape.cloneTo(e.shape),
        this.velocity2DOverLifetime.cloneTo(e.velocity2DOverLifetime),
        this.colorOverLifetime.cloneTo(e.colorOverLifetime),
        this.size2DOverLifetime.cloneTo(e.size2DOverLifetime),
        this.rotation2DOverLifetime.cloneTo(e.rotation2DOverLifetime),
        this.textureSheetAnimation.cloneTo(e.textureSheetAnimation);
    }
    clone() {
      let e = new B();
      return this.cloneTo(e), e;
    }
    destroy() {
      super.destroy(),
        this.particlePool &&
          (this.particlePool.destroy(), (this.particlePool = null));
    }
  }
  function L(e) {
    switch (e) {
      case t.ParticleMinMaxCurveMode.TwoConstants:
      case t.ParticleMinMaxCurveMode.TwoCurves:
        return !0;
      default:
        return !1;
    }
  }
  const V = new t.Vector3(),
    O = new t.Vector3(),
    R = new t.Vector4(),
    z = (e, t) => {
      let i = Math.min(e.colorRGBKeysCount, 8);
      if (1 == i) {
        e._rgbElements[0];
        let i = e._rgbElements[1],
          a = e._rgbElements[2],
          r = e._rgbElements[3];
        (t[0] = 0),
          (t[1] = i),
          (t[2] = a),
          (t[3] = r),
          (t[4] = 1),
          (t[5] = i),
          (t[6] = a),
          (t[7] = r);
      } else {
        let i = Math.min(e._rgbElements.length, 32),
          a = new Float32Array(e._rgbElements.buffer, 0, i);
        t.set(a);
      }
      return i <= 4 ? new Float32Array(t.buffer, 0, 16) : t;
    },
    F = (e, t) => {
      let i = Math.min(e.colorAlphaKeysCount, 8);
      if (1 == i) {
        e._alphaElements[0];
        let i = e._alphaElements[1];
        (t[0] = 0), (t[1] = i), (t[2] = 1), (t[3] = i);
      } else {
        let i = Math.min(e._alphaElements.length, 16),
          a = new Float32Array(e._alphaElements.buffer, 0, i);
        t.set(a);
      }
      return i <= 4 ? new Float32Array(t.buffer, 0, 8) : t;
    },
    A = (e, t, i) => {
      let a = 0,
        r = 1,
        s = Math.min(e.colorRGBKeysCount, i);
      if (1 == s) (a = 0), (r = 1);
      else {
        (a = 1), (r = 0);
        for (let t = 0; t < s; t++) {
          let i = e._rgbElements[4 * t];
          (a = Math.min(a, i)), (r = Math.max(r, i));
        }
      }
      let n = 0,
        o = 1;
      if (((s = Math.min(e.colorAlphaKeysCount, i)), 1 == s)) (n = 0), (o = 1);
      else {
        (n = 1), (o = 0);
        for (let t = 0; t < s; t++) {
          let i = e._alphaElements[2 * t];
          (n = Math.min(n, i)), (o = Math.max(o, i));
        }
      }
      t.setValue(a, r, n, o);
    },
    w = (e, t, i) => {
      let a = 1,
        r = 0,
        s = Math.min(e.gradientCount, 4);
      if (1 == s) (a = 0), (r = 1);
      else {
        let t = e.getKeyByIndex(0);
        (a = Math.min(a, t)), (r = Math.max(r, t));
        for (let i = 1; i < s; i++) {
          let s = e.getKeyByIndex(i);
          s > t && ((a = Math.min(a, s)), (r = Math.max(r, s)), (t = s));
        }
      }
      let n = 1,
        o = 0;
      if (((s = Math.min(t.gradientCount, 4)), 1 == s)) (n = 0), (o = 1);
      else {
        let e = t.getKeyByIndex(0);
        (n = Math.min(n, e)), (o = Math.max(o, e));
        for (let i = 1; i < s; i++) {
          let a = t.getKeyByIndex(i);
          a > e && ((n = Math.min(n, a)), (o = Math.max(o, a)), (e = a));
        }
      }
      i.setValue(a, r, n, o);
    },
    E = (e, t, i, a, r, s) => {
      let n = e * i,
        o = new Float32Array(a.buffer, n, t);
      for (let i = 0; i < r; i++) {
        let a = (e * r + i) * t;
        s.set(o, a);
      }
    };
  function b(e, t) {
    e._elements.fill(0),
      (e._elements[0] = 0),
      (e._elements[1] = t),
      (e._elements[2] = 1),
      (e._elements[3] = t);
  }
  class G extends t.BaseRenderNode2D {
    get particleSystem() {
      return this._particleSystem;
    }
    _setOwner(e) {
      super._setOwner(e), (this.particleSystem.owner = e);
    }
    get sharedMaterial() {
      return super.sharedMaterial;
    }
    set sharedMaterial(e) {
      (super.sharedMaterial = e), this._createRenderElements();
    }
    constructor() {
      super(),
        (this._gradientRGBBuffer = new Float32Array(32)),
        (this._gradientAlphaBuffer = new Float32Array(16)),
        (this._gradientTimeRange = new t.Vector4()),
        (this._gradientMaxRGBBuffer = new Float32Array(32)),
        (this._gradientMaxAlphaBuffer = new Float32Array(16)),
        (this._gradientMaxTimeRange = new t.Vector4()),
        (this._updateMark = -1),
        (this._renderElements = []),
        (this._materials = []),
        (this._particleSystem = new B()),
        this._spriteShaderData.addDefine(
          t.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D
        );
    }
    _getcommonUniformMap() {
      return ["BaseRender2D", "_Particle2D"];
    }
    setParticleColorOverLifetime(e) {
      let i = this.particleSystem;
      if (i.colorOverLifetime && i.colorOverLifetime.enable) {
        e.addDefine(S.ColorOverLifetimeDef);
        let a,
          r,
          s = i.colorOverLifetime.color,
          n = s.gradientMin,
          o = s.gradientMax,
          l = s.mode,
          c = z(n, this._gradientRGBBuffer),
          m = F(n, this._gradientAlphaBuffer),
          h = !1;
        switch (
          (32 == c.length || 16 == m.length
            ? ((h = !0), A(n, this._gradientTimeRange, 8))
            : A(n, this._gradientTimeRange, 4),
          e.setVector(S.GradientTimeRange, this._gradientTimeRange),
          l)
        ) {
          case t.ParticleMinMaxGradientMode.Gradient:
            e.removeDefine(S.ColorOverLifetimeRandom);
            break;
          case t.ParticleMinMaxGradientMode.TwoGradients:
            e.addDefine(S.ColorOverLifetimeRandom),
              (a = z(o, this._gradientMaxRGBBuffer)),
              (r = F(o, this._gradientMaxAlphaBuffer)),
              32 == a.length || 16 == r.length
                ? ((h = !0),
                  e.setBuffer(S.GradientMaxRGB, this._gradientMaxRGBBuffer),
                  e.setBuffer(S.GradientMaxAlpha, this._gradientMaxAlphaBuffer),
                  A(o, this._gradientMaxTimeRange, 8))
                : (e.setBuffer(S.GradientMaxRGB, a),
                  e.setBuffer(S.GradientMaxAlpha, r),
                  A(o, this._gradientMaxTimeRange, 4)),
              e.setVector(S.GradientMaxTimeRange, this._gradientMaxTimeRange);
        }
        h
          ? (e.addDefine(S.ColorOVerLifetimeColorKey_8),
            e.setBuffer(S.GradientRGB, this._gradientRGBBuffer),
            e.setBuffer(S.GradientAlpha, this._gradientAlphaBuffer))
          : (e.setBuffer(S.GradientRGB, c), e.setBuffer(S.GradientAlpha, m));
      } else
        e.removeDefine(S.ColorOverLifetimeDef),
          e.removeDefine(S.ColorOverLifetimeRandom),
          e.removeDefine(S.ColorOVerLifetimeColorKey_8);
    }
    setParticleVelocityOverLifetime(i) {
      let a = this.particleSystem;
      if (a.velocity2DOverLifetime && a.velocity2DOverLifetime.enable) {
        i.addDefine(S.VelocityOverLifetimeDef);
        let r = a.velocity2DOverLifetime.x,
          s = a.velocity2DOverLifetime.y;
        switch (r.mode) {
          case t.ParticleMinMaxCurveMode.Constant: {
            let e = r.constant,
              t = s.constant;
            b(r.curve, e),
              b(s.curve, t),
              i.setBuffer(S.VelocityCurveMinX, r.curve._elements),
              i.setBuffer(S.VelocityCurveMinY, s.curve._elements),
              i.setBuffer(S.VelocityCurveMaxX, r.curve._elements),
              i.setBuffer(S.VelocityCurveMaxY, s.curve._elements);
            break;
          }
          case t.ParticleMinMaxCurveMode.TwoConstants: {
            let e = r.constantMin,
              t = s.constantMin,
              a = r.constantMax,
              n = s.constantMax;
            b(r.curveMin, e),
              b(s.curveMin, t),
              b(r.curveMax, a),
              b(s.curveMax, n),
              i.setBuffer(S.VelocityCurveMinX, r.curveMin._elements),
              i.setBuffer(S.VelocityCurveMinY, s.curveMin._elements),
              i.setBuffer(S.VelocityCurveMaxX, r.curveMax._elements),
              i.setBuffer(S.VelocityCurveMaxY, s.curveMax._elements);
            break;
          }
          case t.ParticleMinMaxCurveMode.Curve:
            r.curve._formatData(),
              s.curve._formatData(),
              i.setBuffer(S.VelocityCurveMinX, r.curve._elements),
              i.setBuffer(S.VelocityCurveMinY, s.curve._elements),
              i.setBuffer(S.VelocityCurveMaxX, r.curve._elements),
              i.setBuffer(S.VelocityCurveMaxY, s.curve._elements);
            break;
          case t.ParticleMinMaxCurveMode.TwoCurves:
            r.curveMin._formatData(),
              s.curveMin._formatData(),
              r.curveMax._formatData(),
              s.curveMax._formatData(),
              i.setBuffer(S.VelocityCurveMinX, r.curveMin._elements),
              i.setBuffer(S.VelocityCurveMinY, s.curveMin._elements),
              i.setBuffer(S.VelocityCurveMaxX, r.curveMax._elements),
              i.setBuffer(S.VelocityCurveMaxY, s.curveMax._elements);
        }
        switch (a.velocity2DOverLifetime.space) {
          case e.Velocity2DSimulateSpace.Local:
            i.setNumber(S.VelocityOverLifetimeSpace, 0);
            break;
          case e.Velocity2DSimulateSpace.World:
            i.setNumber(S.VelocityOverLifetimeSpace, 1);
        }
      } else i.removeDefine(S.VelocityOverLifetimeDef);
    }
    setSize2DOverLifetime(e) {
      let i = this.particleSystem;
      if (i.size2DOverLifetime && i.size2DOverLifetime.enable) {
        let a = i.size2DOverLifetime.x,
          r = i.size2DOverLifetime.y;
        switch (a.mode) {
          case t.ParticleMinMaxCurveMode.Curve:
            if (
              (e.addDefine(S.SizeOverLifetimeDef),
              i.size2DOverLifetime.separateAxes)
            ) {
              a.curve._formatData(),
                r.curve._formatData(),
                e.setBuffer(S.SizeCurveMinX, a.curve._elements),
                e.setBuffer(S.SizeCurveMinY, r.curve._elements),
                e.setBuffer(S.SizeCurveMaxX, a.curve._elements),
                e.setBuffer(S.SizeCurveMaxY, r.curve._elements);
              let t = R;
              w(a.curve, r.curve, t),
                e.setVector(S.SizeCurveMinTimeRange, t),
                e.setVector(S.SizeCurveMaxTimeRange, t);
            } else {
              a.curve._formatData(),
                e.setBuffer(S.SizeCurveMinX, a.curve._elements),
                e.setBuffer(S.SizeCurveMinY, a.curve._elements),
                e.setBuffer(S.SizeCurveMaxX, a.curve._elements),
                e.setBuffer(S.SizeCurveMaxY, a.curve._elements);
              let t = R;
              w(a.curve, a.curve, t),
                e.setVector(S.SizeCurveMinTimeRange, t),
                e.setVector(S.SizeCurveMaxTimeRange, t);
            }
            break;
          case t.ParticleMinMaxCurveMode.TwoCurves:
            if (
              (e.addDefine(S.SizeOverLifetimeDef),
              i.size2DOverLifetime.separateAxes)
            ) {
              a.curveMin._formatData(),
                a.curveMax._formatData(),
                r.curveMin._formatData(),
                a.curveMax._formatData(),
                e.setBuffer(S.SizeCurveMinX, a.curveMin._elements),
                e.setBuffer(S.SizeCurveMinY, r.curveMin._elements),
                e.setBuffer(S.SizeCurveMaxX, a.curveMax._elements),
                e.setBuffer(S.SizeCurveMaxY, r.curveMax._elements);
              let t = R;
              w(a.curveMin, r.curveMin, t),
                e.setVector(S.SizeCurveMinTimeRange, t),
                w(a.curveMax, r.curveMax, t),
                e.setVector(S.SizeCurveMaxTimeRange, t);
            } else {
              a.curveMin._formatData(),
                a.curveMax._formatData(),
                e.setBuffer(S.SizeCurveMinX, a.curveMin._elements),
                e.setBuffer(S.SizeCurveMinY, a.curveMin._elements),
                e.setBuffer(S.SizeCurveMaxX, a.curveMax._elements),
                e.setBuffer(S.SizeCurveMaxY, a.curveMax._elements);
              let t = R;
              w(a.curveMin, a.curveMin, t),
                e.setVector(S.SizeCurveMinTimeRange, t),
                w(a.curveMax, a.curveMax, t),
                e.setVector(S.SizeCurveMaxTimeRange, t);
            }
            break;
          case t.ParticleMinMaxCurveMode.Constant:
          case t.ParticleMinMaxCurveMode.TwoConstants:
          default:
            e.removeDefine(S.SizeOverLifetimeDef);
        }
      } else e.removeDefine(S.SizeOverLifetimeDef);
    }
    setRotationOverlifetime(e) {
      let i = this.particleSystem;
      if (i.rotation2DOverLifetime && i.rotation2DOverLifetime.enable) {
        e.addDefine(S.RotationOverLifetimeDef);
        let a = i.rotation2DOverLifetime.angularVelocity;
        switch (a.mode) {
          case t.ParticleMinMaxCurveMode.Constant: {
            let t = a.constant;
            b(a.curve, t),
              e.setBuffer(S.RotationCurveMin, a.curve._elements),
              e.setBuffer(S.RotationCurveMax, a.curve._elements);
            break;
          }
          case t.ParticleMinMaxCurveMode.Curve:
            a.curve._formatData(),
              e.setBuffer(S.RotationCurveMin, a.curve._elements),
              e.setBuffer(S.RotationCurveMax, a.curve._elements);
            break;
          case t.ParticleMinMaxCurveMode.TwoConstants: {
            let t = a.constantMin,
              i = a.constantMax;
            b(a.curveMin, t),
              b(a.curveMax, i),
              e.setBuffer(S.RotationCurveMin, a.curveMin._elements),
              e.setBuffer(S.RotationCurveMax, a.curveMax._elements);
            break;
          }
          case t.ParticleMinMaxCurveMode.TwoCurves:
            a.curveMin._formatData(),
              a.curveMax._formatData(),
              e.setBuffer(S.RotationCurveMin, a.curveMin._elements),
              e.setBuffer(S.RotationCurveMax, a.curveMax._elements);
        }
      } else e.removeDefine(S.RotationOverLifetimeDef);
    }
    setTextureSheetAnimation(e) {
      let i = this.particleSystem;
      if (i.textureSheetAnimation && i.textureSheetAnimation.enable) {
        e.addDefine(S.TextureSheetAnimationDef);
        let a = i.textureSheetAnimation.tiles,
          r = i.textureSheetAnimation.cycles,
          s = R;
        s.setValue(a.x, a.y, r, 0), e.setVector(S.TextureSheetFrameData, s);
        let n = i.textureSheetAnimation.frame;
        switch (i.textureSheetAnimation.frame.mode) {
          case t.ParticleMinMaxCurveMode.Constant: {
            let t = n.constant;
            b(n.curve, t),
              e.setBuffer(S.TextureSheetFrame, n.curve._elements),
              e.setBuffer(S.TextureSheetFrameMax, n.curve._elements);
            let i = R;
            w(n.curve, n.curve, i), e.setVector(S.TextureSheetFrameRange, i);
            break;
          }
          case t.ParticleMinMaxCurveMode.Curve: {
            n.curve._formatData(),
              e.setBuffer(S.TextureSheetFrame, n.curve._elements),
              e.setBuffer(S.TextureSheetFrameMax, n.curve._elements);
            let t = R;
            w(n.curve, n.curve, t), e.setVector(S.TextureSheetFrameRange, t);
            break;
          }
          case t.ParticleMinMaxCurveMode.TwoConstants: {
            let t = n.constantMin,
              i = n.constantMax;
            b(n.curveMin, t),
              b(n.curveMax, i),
              e.setBuffer(S.TextureSheetFrame, n.curveMin._elements),
              e.setBuffer(S.TextureSheetFrameMax, n.curveMax._elements);
            let a = R;
            w(n.curveMin, n.curveMax, a),
              e.setVector(S.TextureSheetFrameRange, a);
            break;
          }
          case t.ParticleMinMaxCurveMode.TwoCurves: {
            n.curveMin._formatData(),
              n.curveMax._formatData(),
              e.setBuffer(S.TextureSheetFrame, n.curveMin._elements),
              e.setBuffer(S.TextureSheetFrameMax, n.curveMax._elements);
            let t = R;
            w(n.curveMin, n.curveMax, t),
              e.setVector(S.TextureSheetFrameRange, t);
            break;
          }
        }
      } else e.removeDefine(S.TextureSheetAnimationDef);
    }
    setParticleData(i, a) {
      var r, s;
      let n = this.particleSystem;
      (this.particleGeometry &&
        n.main.maxParticles == this.particleGeometry.maxParitcleCount) ||
        this._createRenderGeometry(),
        i.setNumber(S.CurrentTime, n.totalTime),
        i.setNumber(S.UnitPixels, n.main.unitPixels);
      let o = a.getScaleX(),
        l = a.getScaleY(),
        c = a.a / o,
        m = a.b / o,
        h = V.z,
        u = O.z,
        d = 0;
      switch (n.main.simulationSpace) {
        case e.Particle2DSimulationSpace.Local:
          d = 0;
          break;
        case e.Particle2DSimulationSpace.World:
          d = 1;
      }
      switch (n.main.scaleMode) {
        case e.Particle2DScalingMode.Hierarchy:
          break;
        case e.Particle2DScalingMode.Local:
          (o = this.owner.scaleX * this.owner.scene.globalScaleX),
            (l = this.owner.scaleY * this.owner.scene.globalScaleY);
      }
      n.main._spriteRotAndScale.setValue(c, m, o, l),
        n.main._spriteTranslateAndSpace.setValue(h, u, d);
      const f =
          null !==
            (r =
              null === t.Physics2DOption || void 0 === t.Physics2DOption
                ? void 0
                : t.Physics2DOption.pixelRatio) && void 0 !== r
            ? r
            : 50,
        M =
          null !==
            (s =
              null === t.Physics2DOption || void 0 === t.Physics2DOption
                ? void 0
                : t.Physics2DOption.gravity) && void 0 !== s
            ? s
            : { x: 0, y: 9.8 };
      let v = n.main.unitPixels / f,
        D = M.x * v,
        y = M.y * v,
        x = n.main.gravityModifier;
      if (
        (n.main._gravity.setValue(D * x, y * x),
        n.emission.rateOverDistance >= 0)
      ) {
        let e = h,
          t = u,
          i = e - n.emission._lastPosition.x,
          a = t - n.emission._lastPosition.y,
          r = i * i + a * a;
        (r = Math.sqrt(r)),
          (n._emitDistance += r),
          n.emission._lastPosition.set(e, t, 0);
      }
      n._dirtyFlags & e.Particle2DSystemDirtyFlagBits.ColorOverLifetimeBit &&
        (this.setParticleColorOverLifetime(i),
        (n._dirtyFlags &=
          ~e.Particle2DSystemDirtyFlagBits.ColorOverLifetimeBit)),
        n._dirtyFlags &
          e.Particle2DSystemDirtyFlagBits.Velocity2DOverLifetimeBit &&
          (this.setParticleVelocityOverLifetime(i),
          (n._dirtyFlags &=
            ~e.Particle2DSystemDirtyFlagBits.Velocity2DOverLifetimeBit)),
        n._dirtyFlags & e.Particle2DSystemDirtyFlagBits.Size2DOverLifetimeBit &&
          (this.setSize2DOverLifetime(i),
          (n._dirtyFlags &=
            ~e.Particle2DSystemDirtyFlagBits.Size2DOverLifetimeBit)),
        n._dirtyFlags &
          e.Particle2DSystemDirtyFlagBits.Rotation2DOverLifetimeBit &&
          (this.setRotationOverlifetime(i),
          (n._dirtyFlags &=
            ~e.Particle2DSystemDirtyFlagBits.Rotation2DOverLifetimeBit)),
        n._dirtyFlags &
          e.Particle2DSystemDirtyFlagBits.TextureSheetAnimationBit &&
          (this.setTextureSheetAnimation(i),
          (n._dirtyFlags &=
            ~e.Particle2DSystemDirtyFlagBits.TextureSheetAnimationBit));
    }
    addCMDCall(e, i, a) {
      if (!this.particleSystem) return;
      let r = e._curMat;
      (V.x = r.a),
        (V.y = r.c),
        (V.z = i * r.a + a * r.c + r.tx),
        this._spriteShaderData.setVector3(t.BaseRenderNode2D.NMATRIX_0, V),
        (O.x = r.b),
        (O.y = r.d),
        (O.z = i * r.b + a * r.d + r.ty),
        this._spriteShaderData.setVector3(t.BaseRenderNode2D.NMATRIX_1, O),
        this._setRenderSize(e.width, e.height),
        e._copyClipInfoToShaderData(this._spriteShaderData),
        this._lightReceive && this._updateLight(),
        this.setParticleData(this._spriteShaderData, r);
    }
    _createRenderGeometry() {
      this.particleGeometry &&
        (this.particleGeometry.destroy(), (this.particleGeometry = null));
      let e = this.particleSystem.main.maxParticles,
        t = _.Particle2DDeclaration,
        i = _.Particle2DMeshDeclaration;
      (this.particleGeometry = new x(e, t, i)), this._createRenderElements();
    }
    _createRenderElements() {
      if (
        (this._renderElements.forEach((e) => {
          e.destroy();
        }),
        (this._renderElements.length = 0),
        !this.sharedMaterial)
      )
        return;
      {
        let e = _.Particle2DDeclaration,
          t = _.Particle2DInfo,
          i = e.vertexStride;
        this.particleSystem._initParticleData(i, t);
      }
      const e = (e) => {
        let i = t.LayaGL.render2DRenderPassFactory.createRenderElement2D();
        return (
          (i.geometry = e),
          (i.value2DShaderData = this._spriteShaderData),
          t.BaseRenderNode2D._setRenderElement2DMaterial(
            i,
            this.sharedMaterial
          ),
          (i.renderStateIsBySprite = !1),
          (i.nodeCommonMap = this._getcommonUniformMap()),
          i
        );
      };
      if (this.particleGeometry) {
        let t = e(this.particleGeometry.geometry);
        this._renderElements.push(t);
      }
    }
    _updateParticleBuffer(e, t) {
      let i = this.particleSystem,
        a = i.main.maxParticles,
        r = i.particlePool.particleDatas,
        s = this.particleGeometry.particleDatas,
        n = this.particleGeometry.particleBuffer,
        o = i.particlePool.particleStride,
        l = i.particlePool.particleByteStride;
      if (e <= t) {
        let i = t - e;
        for (let i = e; i <= t; i++) E(i, o, l, r, 4, s);
        let a = 4 * e * l,
          c = 4 * i * l;
        n.setData(s.buffer, a, a, c);
      } else {
        {
          for (let t = e; t <= a; t++) E(t, o, l, r, 4, s);
          let t = 4 * e * l,
            i = 4 * (a + 1 - e) * l;
          n.setData(s.buffer, t, t, i);
        }
        {
          for (let e = 0; e < t; e++) E(e, o, l, r, 4, s);
          let e = 0,
            i = 4 * t * l;
          n.setData(s.buffer, e, e, i);
        }
      }
    }
    renderUpdate(e) {
      let i = this.particleSystem;
      if (
        !(this._renderElements.length <= 0) &&
        this._updateMark != t.Stat.loopCount
      ) {
        this._updateMark = t.Stat.loopCount;
        let e = this.owner.scene.timer.delta / 1e3;
        i._update(e);
        const a = i.particlePool.updateStartIndex,
          r = i.particlePool.updateEndIndex;
        a != r && this._updateParticleBuffer(a, r);
        const s = i.particlePool.activeStartIndex,
          n = i.particlePool.activeEndIndex;
        let o = 6,
          l = i.main.maxParticles;
        if (s <= n) {
          let e = n - s;
          this._renderElements.forEach((t) => {
            t.geometry.clearRenderParams();
            let i = e * o;
            t.geometry.setDrawElemenParams(i, s * o * 2);
          });
        } else
          this._renderElements.forEach((e) => {
            e.geometry.clearRenderParams();
            let t = (l + 1 - s) * o;
            e.geometry.setDrawElemenParams(t, s * o * 2),
              (t = n * o),
              t > 0 && e.geometry.setDrawElemenParams(t, 0);
          });
      }
    }
    onEnable() {
      let e = this.particleSystem;
      t.LayaEnv.isPlaying && e.main.playOnAwake && e.play();
    }
    onDisable() {
      this.particleSystem.simulate(0, !0);
    }
    onDestroy() {
      this.particleGeometry &&
        (this.particleGeometry.destroy(), (this.particleGeometry = null)),
        this.particleSystem.destroy();
    }
    _cloneTo(e) {
      super._cloneTo(e), this.particleSystem.cloneTo(e.particleSystem);
    }
  }
  t.addAfterInitCallback(() => {
    _.init(), S.init();
  }),
    t.ClassUtils.regClass("Base2DShape", o),
    t.ClassUtils.regClass("Box2DShape", f),
    t.ClassUtils.regClass("Circle2DShape", M),
    t.ClassUtils.regClass("FanShape", u),
    t.ClassUtils.regClass("SemicircleShap", v),
    t.ClassUtils.regClass("Main2DModule", s),
    t.ClassUtils.regClass("Rotation2DOverLifetimeModule", n),
    t.ClassUtils.regClass("Shape2DModule", d),
    t.ClassUtils.regClass("Size2DOverLifetimeModule", D),
    t.ClassUtils.regClass("Velocity2DOverLifetimeModule", y),
    t.ClassUtils.regClass("ShurikenParticle2DSystem", B),
    t.ClassUtils.regClass("ShurikenParticle2DRenderer", G),
    (e.Base2DShape = o),
    (e.Box2DShape = f),
    (e.Circle2DShape = M),
    (e.FanShape = u),
    (e.Main2DModule = s),
    (e.Particle2DGeomotry = x),
    (e.Particle2DShader = S),
    (e.Particle2DVertexMesh = _),
    (e.Rotation2DOverLifetimeModule = n),
    (e.SemicircleShap = v),
    (e.Shape2DModule = d),
    (e.ShurikenParticle2DRenderer = G),
    (e.ShurikenParticle2DSystem = B),
    (e.Size2DOverLifetimeModule = D),
    (e.Velocity2DOverLifetimeModule = y);
})((window.Laya = window.Laya || {}), Laya);
