!(function (e, t) {
  "use strict";
  class i {
    static __init__() {
      if (i._isInit) return;
      i._isInit = !0;
      let e = {
          a_position: [0, t.ShaderDataType.Vector3],
          a_linePos: [2, t.ShaderDataType.Vector4],
          a_linelength: [3, t.ShaderDataType.Float],
        },
        a = t.Shader3D.add("LineShader", !0, !1);
      a.shaderType = t.ShaderFeatureType.DEFAULT;
      let r = new t.SubShader(e, {}, {});
      a.addSubShader(r),
        r.addShaderPass(
          '#define SHADER_NAME 2DLineVS\n#include "Sprite2DVertex.glsl"\nvarying vec2 v_position;varying vec4 v_linePionts;varying float v_lineLength;varying vec2 v_linedir;varying vec3 v_dashed;varying float v_lineWidth;uniform vec3 u_dashed;uniform float u_lineWidth;void lineMat(in vec2 left,in vec2 right,inout vec3 xDir,inout vec3 yDir,float LineWidth){vec2 dir=right-left;float lineLength=length(dir)+LineWidth+2.0;dir=normalize(dir);xDir.x=dir.x*lineLength;yDir.x=dir.y*lineLength;float lineWidth=LineWidth+2.0;xDir.y=-dir.y*LineWidth;yDir.y=dir.x*LineWidth;xDir.z=(left.x+right.x)*0.5;yDir.z=(left.y+right.y)*0.5;}void main(){vec2 oriUV=(a_position.xy+vec2(0.5,0.5));oriUV.x=(oriUV.x*length(a_linePos.xy-a_linePos.zw)+a_linelength)/50.0;v_texcoord=oriUV;vec2 left,right;getGlobalPos(a_linePos.xy,left);getGlobalPos(a_linePos.zw,right);float lengthScale=length(right-left)/length(a_linePos.zw-a_linePos.xy);v_lineLength=a_linelength*lengthScale;v_dashed=vec3(u_dashed.x*lengthScale,u_dashed.y,u_dashed.z*lengthScale);v_linePionts=vec4(left,right);float lineWidth=u_lineWidth*lengthScale;v_lineWidth=lineWidth;v_linedir=normalize(right-left)*v_lineWidth*0.5;vec3 xDir;vec3 yDir;lineMat(left,right,xDir,yDir,v_lineWidth);transfrom(a_position.xy,xDir,yDir,v_position);vec2 viewPos;getViewPos(v_position,viewPos);v_cliped=getClipedInfo(viewPos);vec4 pos;getProjectPos(viewPos,pos);gl_Position=pos;}',
          '#define SHADER_NAME 2DLineFS\n#include "Sprite2DFrag.glsl"\nvarying vec2 v_position;varying vec4 v_linePionts;varying float v_lineLength;varying vec2 v_linedir;varying vec3 v_dashed;varying float v_lineWidth;uniform vec4 u_TilingOffset;vec2 dotToline(in vec2 a,vec2 b,in vec2 p){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);return ba*h+a;}void main(){vec2 p=dotToline(v_linePionts.xy,v_linePionts.zw,v_position);float d=v_lineWidth*0.5-length(p-v_position);vec2 left=v_linePionts.xy-v_linedir;vec2 p1=dotToline(left,v_linePionts.zw+v_linedir,v_position);float t=v_lineLength+length(left-p1)-v_dashed.z;d*=step(fract(t/v_dashed.x),v_dashed.y);vec2 uv=transformUV(v_texcoord.xy,u_TilingOffset);vec4 textureColor=texture2D(u_baseRender2DTexture,fract(uv));textureColor=transspaceColor(textureColor*u_baseRenderColor);gl_FragColor=vec4(textureColor.rgb,textureColor.a*smoothstep(0.0,2.0,d));}'
        ),
        (i.LINEWIDTH = t.Shader3D.propertyNameToID("u_lineWidth")),
        (i.DASHED = t.Shader3D.propertyNameToID("u_dashed")),
        (i.TILINGOFFSET = t.Shader3D.propertyNameToID("u_TilingOffset"));
      const n =
        t.LayaGL.renderDeviceFactory.createGlobalUniformMap("Line2DRender");
      n.addShaderUniform(i.LINEWIDTH, "u_lineWidth", t.ShaderDataType.Float),
        n.addShaderUniform(i.DASHED, "u_dashed", t.ShaderDataType.Vector3),
        n.addShaderUniform(
          i.TILINGOFFSET,
          "u_TilingOffset",
          t.ShaderDataType.Vector4
        );
      let s = new Float32Array([
          -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0,
        ]),
        h = new Uint16Array([0, 1, 2, 0, 2, 3]);
      var d = new t.VertexDeclaration(12, [
        new t.VertexElement(0, t.VertexElementFormat.Vector3, 0),
      ]);
      let o = (i._vbs = t.LayaGL.renderDeviceFactory.createVertexBuffer(
        t.BufferUsage.Dynamic
      ));
      (o.vertexDeclaration = d),
        (o.instanceBuffer = !1),
        o.setDataLength(s.byteLength),
        o.setData(s.buffer, 0, 0, s.byteLength);
      let l = (i._ibs = t.LayaGL.renderDeviceFactory.createIndexBuffer(
        t.BufferUsage.Dynamic
      ));
      l._setIndexDataLength(h.buffer.byteLength),
        l._setIndexData(h, 0),
        (i.linePoisitionDesc = new t.VertexDeclaration(16, [
          new t.VertexElement(0, t.VertexElementFormat.Vector4, 2),
        ])),
        (i.lineLengthDesc = new t.VertexDeclaration(4, [
          new t.VertexElement(0, t.VertexElementFormat.Single, 3),
        ]));
    }
  }
  i._isInit = !1;
  class a extends t.BaseRenderNode2D {
    static _createDefaultLineMaterial() {
      if (a.defaultLine2DMaterial) return;
      i.__init__();
      let e = (a.defaultLine2DMaterial = new t.Material());
      e.setShaderName("LineShader"),
        (e.alphaTest = !1),
        (e.depthTest = t.RenderState.DEPTHTEST_OFF),
        (e.cull = t.RenderState.CULL_NONE),
        (e.blend = t.RenderState.BLEND_ENABLE_ALL),
        e.setIntByIndex(
          t.Shader3D.BLEND_SRC,
          t.RenderState.BLENDPARAM_SRC_ALPHA
        ),
        e.setIntByIndex(
          t.Shader3D.BLEND_DST,
          t.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA
        );
    }
    get positions() {
      return this._positions;
    }
    set positions(e) {
      e.length / 4 == ((e.length / 4) | 0) &&
        ((this._positions = e), (this._needUpdate = !0));
    }
    get lineWidth() {
      return this._lineWidth;
    }
    set lineWidth(e) {
      (this._lineWidth = Math.max(1, e)),
        this._spriteShaderData.setNumber(i.LINEWIDTH, this._lineWidth);
    }
    set color(e) {
      (e = e || t.Color.BLACK).cloneTo(this._color),
        this._spriteShaderData.setColor(
          t.BaseRenderNode2D.BASERENDER2DCOLOR,
          this._color
        );
    }
    get color() {
      return this._color;
    }
    set enableDashedMode(e) {
      (this._isdashed = e), this._updateDashValue();
    }
    get enableDashedMode() {
      return this._isdashed;
    }
    set dashedLength(e) {
      null != e &&
        ((e = Math.max(0.01, e)),
        (this._dashedValue.x = e),
        this._updateDashValue());
    }
    get dashedLength() {
      return this._dashedValue.x;
    }
    set dashedPercent(e) {
      (e = Math.max(Math.min(1, e), 0)),
        (this._dashedValue.y = e),
        this._updateDashValue();
    }
    get dashedPercent() {
      return this._dashedValue.y;
    }
    set dashedOffset(e) {
      (this._dashedValue.z = e), this._updateDashValue();
    }
    get dashedOffset() {
      return this._dashedValue.z;
    }
    set texture(e) {
      e || (e = t.Texture2D.whiteTexture),
        e != this._baseRender2DTexture &&
          (this._baseRender2DTexture &&
            this._baseRender2DTexture._removeReference(1),
          e._addReference(),
          (this._baseRender2DTexture = e),
          this._spriteShaderData.setTexture(
            t.BaseRenderNode2D.BASERENDER2DTEXTURE,
            e
          ),
          1 != e.gammaCorrection
            ? this._spriteShaderData.addDefine(t.ShaderDefines2D.GAMMATEXTURE)
            : this._spriteShaderData.removeDefine(
                t.ShaderDefines2D.GAMMATEXTURE
              ));
    }
    get texture() {
      return this._baseRender2DTexture;
    }
    set tillOffset(e) {
      null == e
        ? (this._tillOffset = new t.Vector4(0, 0, 1, 1))
        : e.cloneTo(this._tillOffset),
        this._spriteShaderData.setVector(i.TILINGOFFSET, this._tillOffset);
    }
    get tillOffset() {
      return this._tillOffset;
    }
    set sharedMaterial(e) {
      (super.sharedMaterial = e),
        t.BaseRenderNode2D._setRenderElement2DMaterial(
          this._renderElements[0],
          this._materials[0] ? this._materials[0] : a.defaultLine2DMaterial
        );
    }
    _updateDashValue() {
      this._isdashed
        ? this._spriteShaderData.setVector3(i.DASHED, this._dashedValue)
        : this._spriteShaderData.setVector3(i.DASHED, a.defaultDashedValue);
    }
    _getcommonUniformMap() {
      return ["BaseRender2D", "Line2DRender"];
    }
    _changeGeometry() {
      let e = this._positions.length / 4;
      e > this._maxLineNumer &&
        ((this._maxLineNumer = (1 + ((e / this._enLarge) | 0)) * this._enLarge),
        (this._positionInstansBufferData = new Float32Array(
          4 * this._maxLineNumer
        )),
        this._positionVertexBuffer.setDataLength(16 * this._maxLineNumer),
        (this._lineLengthBufferData = new Float32Array(1 * this._maxLineNumer)),
        this._lineLengthVertexBuffer.setDataLength(4 * this._maxLineNumer),
        this._renderGeometry.bufferState.applyState(
          [i._vbs, this._positionVertexBuffer, this._lineLengthVertexBuffer],
          i._ibs
        ),
        (this._renderElements[0].geometry = this._renderGeometry)),
        this._positionInstansBufferData.set(this._positions, 0),
        this._positionVertexBuffer.setData(
          this._positionInstansBufferData.buffer,
          0,
          0,
          this._positionInstansBufferData.byteLength
        );
      {
        let i = 0;
        for (var t = 0; t < e; t++) {
          const e = 4 * t;
          (this._lineLengthBufferData[t] = i),
            (i += Math.hypot(
              this._positions[e + 2] - this._positions[e],
              this._positions[e + 3] - this._positions[e + 1]
            ));
        }
        this._lineLengthVertexBuffer.setData(
          this._lineLengthBufferData.buffer,
          0,
          0,
          this._lineLengthBufferData.byteLength
        );
      }
      this._renderGeometry.instanceCount = e;
    }
    addPoint(e, t, i, a) {
      this._positions.push(e, t, i, a), (this._needUpdate = !0);
    }
    clear() {
      (this._positions.length = 0), (this._needUpdate = !0);
    }
    addCMDCall(e, i, a) {
      let r = e._curMat,
        n = t.Vector3.TEMP;
      (n.x = r.a),
        (n.y = r.c),
        (n.z = i * r.a + a * r.c + r.tx),
        this._spriteShaderData.setVector3(t.BaseRenderNode2D.NMATRIX_0, n),
        (n.x = r.b),
        (n.y = r.d),
        (n.z = i * r.b + a * r.d + r.ty),
        this._spriteShaderData.setVector3(t.BaseRenderNode2D.NMATRIX_1, n),
        this._setRenderSize(e.width, e.height),
        e._copyClipInfoToShaderData(this._spriteShaderData);
    }
    onPreRender() {
      this._needUpdate && ((this._needUpdate = !1), this._changeGeometry());
    }
    _initRender() {
      let e = this._maxLineNumer,
        r = (this._positionVertexBuffer =
          t.LayaGL.renderDeviceFactory.createVertexBuffer(
            t.BufferUsage.Dynamic
          ));
      (r.instanceBuffer = !0),
        (r.vertexDeclaration = i.linePoisitionDesc),
        r.setDataLength(16 * e),
        (this._positionInstansBufferData = new Float32Array(4 * e)),
        r.setData(
          this._positionInstansBufferData.buffer,
          0,
          0,
          this._positionInstansBufferData.byteLength
        );
      let n = (this._lineLengthVertexBuffer =
        t.LayaGL.renderDeviceFactory.createVertexBuffer(t.BufferUsage.Dynamic));
      (n.instanceBuffer = !0),
        (n.vertexDeclaration = i.lineLengthDesc),
        n.setDataLength(4 * e),
        (this._lineLengthBufferData = new Float32Array(1 * e)),
        n.setData(
          this._lineLengthBufferData.buffer,
          0,
          0,
          this._lineLengthBufferData.byteLength
        );
      let s = (this._renderGeometry =
        t.LayaGL.renderDeviceFactory.createRenderGeometryElement(
          t.MeshTopology.Triangles,
          t.DrawType.DrawElementInstance
        ));
      (s.bufferState = t.LayaGL.renderDeviceFactory.createBufferState()),
        s.setDrawElemenParams(6, 0),
        (s.indexFormat = t.IndexFormat.UInt16),
        (s.instanceCount = 0);
      let h = [];
      h.push(i._vbs),
        h.push(this._positionVertexBuffer),
        h.push(this._lineLengthVertexBuffer),
        s.bufferState.applyState(h, i._ibs);
      let d = t.LayaGL.render2DRenderPassFactory.createRenderElement2D();
      (d.geometry = this._renderGeometry),
        (d.value2DShaderData = this._spriteShaderData),
        (d.renderStateIsBySprite = !1),
        (d.nodeCommonMap = this._getcommonUniformMap()),
        t.BaseRenderNode2D._setRenderElement2DMaterial(
          d,
          this._materials[0] ? this._materials[0] : a.defaultLine2DMaterial
        ),
        (this._renderElements[0] = d);
    }
    constructor() {
      super(),
        (this._color = new t.Color()),
        (this._positions = []),
        (this._isdashed = !1),
        (this._tillOffset = new t.Vector4(0, 0, 1, 1)),
        (this._dashedValue = new t.Vector3(20, 0.5, 0)),
        (this._needUpdate = !1),
        (this._maxLineNumer = 200),
        (this._enLarge = 100),
        (this._lineWidth = 1),
        a._createDefaultLineMaterial(),
        (this._renderElements = []),
        (this._materials = []),
        this._initRender(),
        this._spriteShaderData.addDefine(
          t.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D
        ),
        this._spriteShaderData.setColor(
          t.BaseRenderNode2D.BASERENDER2DCOLOR,
          this._color
        ),
        this._updateDashValue(),
        (this.tillOffset = null),
        (this.texture = null);
    }
  }
  (a.defaultDashedValue = new t.Vector3(20, 1, 0)),
    t.Laya.addInitCallback(() => a._createDefaultLineMaterial());
  class r extends t.Command2D {
    static create(e, i, a = t.Color.WHITE, n = 3) {
      var s = r._pool.length > 0 ? r._pool.pop() : new r();
      return (
        (s._line2DRender.color = a),
        (s._line2DRender.positions = e),
        (s._line2DRender.lineWidth = n),
        s._setMatrix(i),
        s
      );
    }
    constructor() {
      super(),
        (this._drawElementData =
          t.LayaGL.render2DRenderPassFactory.createDraw2DElementCMDData()),
        (this._line2DRender = new a()),
        (this._needUpdateElement = !0),
        (this._matrix = new t.Matrix()),
        (this._line2DRender.enableDashedMode = !1),
        this._drawElementData.setRenderelements(
          this._line2DRender._renderElements
        );
    }
    _setMatrix(e) {
      e ? e.copyTo(this._matrix) : t.Matrix.EMPTY.copyTo(this._matrix);
      let i = this._matrix,
        a = t.Vector3.TEMP;
      (a.x = i.a),
        (a.y = i.c),
        (a.z = i.tx),
        this._line2DRender._spriteShaderData.setVector3(
          t.BaseRenderNode2D.NMATRIX_0,
          a
        ),
        (a.x = i.b),
        (a.y = i.d),
        (a.z = i.ty),
        this._line2DRender._spriteShaderData.setVector3(
          t.BaseRenderNode2D.NMATRIX_1,
          a
        );
    }
    getRenderCMD() {
      return this._drawElementData;
    }
    run() {
      this._line2DRender.onPreRender(),
        this._line2DRender._setRenderSize(
          this._commandBuffer._renderSize.x,
          this._commandBuffer._renderSize.y
        );
    }
    recover() {
      r._pool.push(this), super.recover();
    }
  }
  (r._pool = []),
    (0, t.ClassUtils.regClass)("Line2DRender", a),
    (e.Draw2DLineCMD = r),
    (e.Line2DRender = a),
    (e.LineShader = i);
})((window.Laya = window.Laya || {}), Laya);
