/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_objects_Reflector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/objects/Reflector.js */ "./node_modules/three/examples/jsm/objects/Reflector.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");




class ThreeJSContainer {
    scene;
    light;
    camera;
    textes = [];
    count = 0;
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_3__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_3__.Color(0x000000));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        this.camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.copy(cameraPos);
        this.camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(this.camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, this.camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_3__.Scene();
        const loader = new three__WEBPACK_IMPORTED_MODULE_3__.FontLoader();
        let addText1 = (() => {
            loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
                const fonrGeo = new three__WEBPACK_IMPORTED_MODULE_3__.TextGeometry("Convergence", {
                    font: font,
                    size: 0.5,
                    height: 0.1,
                });
                const fontMat = new three__WEBPACK_IMPORTED_MODULE_3__.MeshBasicMaterial({ color: 0xffffff });
                const textMesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(fonrGeo, fontMat);
                textMesh.position.set(-2.1, 1.0, 2.0);
                textMesh.name = "convergence";
                this.scene.add(textMesh);
                this.textes.push(textMesh);
            });
        });
        const bord = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(5.0, 1.0, 0.3), new three__WEBPACK_IMPORTED_MODULE_3__.MeshBasicMaterial({
            transparent: true,
            opacity: 0.3
        }));
        bord.position.set(0.0, 1.2, 2.0);
        this.scene.add(bord);
        addText1();
        let addText2 = (() => {
            loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
                const fonrGeo = new three__WEBPACK_IMPORTED_MODULE_3__.TextGeometry("Divergence", {
                    font: font,
                    size: 0.5,
                    height: 0.1,
                });
                const fontMat = new three__WEBPACK_IMPORTED_MODULE_3__.MeshBasicMaterial({ color: 0xffffff });
                const textMesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(fonrGeo, fontMat);
                textMesh.name = "divergence";
                textMesh.position.set(-1.7, 1.0, 2.0);
                textMesh.visible = false;
                this.scene.add(textMesh);
                this.textes.push(textMesh);
            });
        });
        addText2();
        //半透明の床を作る
        const pmat = new three__WEBPACK_IMPORTED_MODULE_3__.MeshPhysicalMaterial({
            color: 0x0a0a0a,
            transparent: true,
            opacity: 0.7,
        });
        const pgeo = new three__WEBPACK_IMPORTED_MODULE_3__.CircleGeometry(10, 64);
        const plane = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(pgeo, pmat);
        plane.rotateX(-Math.PI / 2);
        plane.position.setY(0.1);
        this.scene.add(plane);
        //*
        const mirror = new three_examples_jsm_objects_Reflector_js__WEBPACK_IMPORTED_MODULE_1__.Reflector(pgeo, {
            clipBias: 0.001,
            textureWidth: 512,
            textureHeight: 512,
            color: 0xababab,
        });
        mirror.rotateX(-Math.PI / 2);
        this.scene.add(mirror); //*/
        //星空をPlaneで作る(回転で光ったり光らなかったりさせる)
        //*
        const sky = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        let planeindex = 1000;
        let planes = [];
        let planeRotate = [];
        let tweeninfo = { scale: 0.0 };
        const planeGeo = new three__WEBPACK_IMPORTED_MODULE_3__.PlaneGeometry(0.07, 0.07);
        const planeMat = new three__WEBPACK_IMPORTED_MODULE_3__.MeshPhysicalMaterial({
            color: 0xfffffff,
            transparent: true,
            roughness: 0.1,
            opacity: 0.9,
            ior: 1.31,
            emissive: 0xffffff,
            emissiveIntensity: 0.5,
        });
        for (let i = 0; i < planeindex; i++) {
            planes.push(new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(planeGeo, planeMat));
            let u = 2 * Math.random() * Math.PI;
            let v = (Math.random() - 0.5) * Math.PI;
            planes[i].position.set(10 * Math.cos(u) * Math.cos(v), 10 * Math.cos(v) * Math.sin(u) + 2.0, 10 * Math.sin(v));
            planeRotate.push(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01));
            sky.add(planes[i]);
        } //*/
        this.scene.add(sky);
        let updateScale = () => {
            sky.scale.x = tweeninfo.scale;
            sky.scale.y = tweeninfo.scale;
            sky.scale.z = tweeninfo.scale;
        };
        const createTween0 = () => {
            tweeninfo.scale = 1.0;
            const tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__.Tween(tweeninfo)
                .to({ scale: 0.0 }, 500)
                .onUpdate(updateScale);
            return tween;
        };
        const createTween1 = () => {
            tweeninfo.scale = 0.0;
            const tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__.Tween(tweeninfo)
                .to({ scale: 1.0 }, 500)
                .onUpdate(updateScale);
            return tween;
        };
        //周りのフシギクルクルキューブを作る
        //*
        let cubeindex = 50;
        let cubes = [];
        let cubeRotate = [];
        const cubeGeo = new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(0.05, 0.05, 0.05);
        const cubeMat = new three__WEBPACK_IMPORTED_MODULE_3__.MeshPhysicalMaterial({
            color: 0xfffffff,
            transparent: true,
            roughness: 0.1,
            opacity: 0.7,
            ior: 1.31,
            emissive: 0xffffff,
            emissiveIntensity: 0.5,
        });
        for (let i = 0; i < cubeindex; i++) {
            cubes.push(new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(cubeGeo, cubeMat));
            cubes[i].position.set(1.2 * Math.sin(Math.PI * i / cubeindex) * Math.sin(4 * i / cubeindex * Math.PI), i / cubeindex * 3.5 + 0.25, 1.2 * Math.sin(Math.PI * i / cubeindex) * Math.cos(4 * i / cubeindex * Math.PI));
            cubeRotate.push(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01));
            this.scene.add(cubes[i]);
        } //*/
        //セーブポイントの水晶体を作る
        //*
        let vertices = new Float32Array([
            0.0, 1.5, 0.0,
            1.0, 0.0, 0.0,
            0.0, 0.0, -1.0,
            -1.0, 0.0, 0.0,
            0.0, 0.0, 1.0,
            0.0, -1.5, 0.0 //5
        ]);
        const indices = [
            0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1,
            5, 1, 2, 5, 2, 3, 5, 3, 4, 5, 4, 1,
        ];
        const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();
        geometry.setIndex(indices);
        const material = new three__WEBPACK_IMPORTED_MODULE_3__.MeshPhysicalMaterial({
            color: 0x0033ff,
            transparent: true,
            roughness: 0.1,
            opacity: 0.8,
            ior: 1.31,
            side: three__WEBPACK_IMPORTED_MODULE_3__.DoubleSide,
            emissive: 0xffffff,
            emissiveIntensity: 0.1,
        });
        const mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geometry, material);
        mesh.position.set(0, 2.0, 0);
        this.scene.add(mesh); //*/
        /*debug
                // グリッド表示
                const gridHelper = new THREE.GridHelper( 10,);
                //this.scene.add( gridHelper );
        
                // 軸表示
                const axesHelper = new THREE.AxesHelper( 5 );
                //this.scene.add( axesHelper );
                //*/
        //ライトの設定
        let light = new three__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight(0xffffff, 1.0);
        light.position.set(3, 3, 3);
        this.scene.add(light);
        const raycaster = new three__WEBPACK_IMPORTED_MODULE_3__.Raycaster();
        const mouse = new three__WEBPACK_IMPORTED_MODULE_3__.Vector2();
        window.addEventListener("click", (event) => {
            const canvas = event.target.getBoundingClientRect();
            mouse.x = ((event.clientX - canvas.left) / canvas.width) * 2 - 1;
            mouse.y = -((event.clientY - canvas.top) / canvas.height) * 2 + 1;
            raycaster.setFromCamera(mouse, this.camera);
            const intersect = raycaster.intersectObjects([bord]);
            if (intersect.length > 0) {
                this.count++;
                if (this.count % 2 == 1) {
                    createTween0().start();
                    const convergenceText = this.scene.getObjectByName("convergence");
                    const divergenceText = this.scene.getObjectByName("divergence");
                    if (divergenceText) {
                        convergenceText.visible = false;
                        divergenceText.visible = true;
                    }
                }
                else {
                    createTween1().start();
                    const convergenceText = this.scene.getObjectByName("convergence");
                    const divergenceText = this.scene.getObjectByName("divergence");
                    if (convergenceText) {
                        convergenceText.visible = true;
                        divergenceText.visible = false;
                    }
                }
            }
        });
        const fixedTimeStep = 1.0 / 60.0; // 秒
        const maxSubSteps = 3;
        let lastTime = undefined;
        let update = (time) => {
            //OrbitControls.update();
            if (lastTime !== undefined) {
                const delta = (time - lastTime) / 1000; // ms → s
                //world.step(fixedTimeStep, delta, maxSubSteps);
            }
            lastTime = time;
            requestAnimationFrame(update);
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__.update(time);
            //*
            mesh.position.setY(2.0 + 0.1 * Math.sin(time / 2000 * Math.PI));
            mesh.rotateY(Math.PI / 200); //*/
            //*
            for (let i = 0; i < cubeindex; i++) {
                cubes[i].position.set(1.2 * Math.sin(Math.PI * i / cubeindex) * Math.sin(4 * (-i - time / 500) / cubeindex * Math.PI), i / cubeindex * 3.5 + 0.25, 1.2 * Math.sin(Math.PI * i / cubeindex) * Math.cos(4 * (-i - time / 500) / cubeindex * Math.PI));
                //ランダムな回転で不思議感を出す
                cubes[i].rotateX(cubeRotate[i].x);
                cubes[i].rotateY(cubeRotate[i].y);
                cubes[i].rotateZ(cubeRotate[i].z);
            } //*
            for (let i = 0; i < planeindex; i++) {
                planes[i].rotateX(planeRotate[i].x);
                planes[i].rotateY(planeRotate[i].y);
                planes[i].rotateZ(planeRotate[i].z);
            } //*/
            sky.rotateX(Math.PI / 10000);
            sky.rotateY(Math.PI / 10000);
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 2, 10));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-843985"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Yy9hcHAudHMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcbmltcG9ydCB7IFJlZmxlY3RvciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9vYmplY3RzL1JlZmxlY3Rvci5qcyc7XG5pbXBvcnQgKiBhcyBUV0VFTiBmcm9tIFwiQHR3ZWVuanMvdHdlZW4uanNcIjtcblxuXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcbiAgICBwcml2YXRlIHNjZW5lOiBUSFJFRS5TY2VuZTtcbiAgICBwcml2YXRlIGxpZ2h0OiBUSFJFRS5MaWdodDtcbiAgICBwcml2YXRlIGNhbWVyYTpUSFJFRS5DYW1lcmE7XG4gICAgcHJpdmF0ZSB0ZXh0ZXM6IFRIUkVFLk9iamVjdDNEW10gPSBbXTtcbiAgICBwcml2YXRlIGNvdW50ID0gMDtcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICAvLyDnlLvpnaLpg6jliIbjga7kvZzmiJAo6KGo56S644GZ44KL5p6g44GU44Go44GrKSpcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTsgLy/jgrfjg6Pjg4njgqbjg57jg4Pjg5fjgpLmnInlirnjgavjgZnjgotcblxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHModGhpcy5jYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XG5cbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH1cblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgICAgICBjb25zdCBsb2FkZXIgPSBuZXcgVEhSRUUuRm9udExvYWRlcigpO1xuICAgICAgICBsZXQgYWRkVGV4dDEgPSAoKCk9PntcbiAgICAgICAgICAgIGxvYWRlci5sb2FkKCdodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzL2ZvbnRzL2hlbHZldGlrZXJfcmVndWxhci50eXBlZmFjZS5qc29uJywgZm9udCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9uckdlbyA9IG5ldyBUSFJFRS5UZXh0R2VvbWV0cnkoXCJDb252ZXJnZW5jZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQ6IGZvbnQsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IDAuNSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwLjEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9udE1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0TWVzaCA9IG5ldyBUSFJFRS5NZXNoKGZvbnJHZW8sIGZvbnRNYXQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRleHRNZXNoLnBvc2l0aW9uLnNldCgtMi4xLCAxLjAsIDIuMCk7XG4gICAgICAgICAgICAgICAgdGV4dE1lc2gubmFtZSA9IFwiY29udmVyZ2VuY2VcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0ZXh0TWVzaCk7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ZXMucHVzaCh0ZXh0TWVzaCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGJvcmQgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg1LjAsMS4wLDAuMyksXG4gICAgICAgICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OnRydWUsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTowLjNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGJvcmQucG9zaXRpb24uc2V0KDAuMCwxLjIsMi4wKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoYm9yZCk7XG4gICAgICAgIGFkZFRleHQxKCk7XG5cbiAgICAgICAgbGV0IGFkZFRleHQyID0gKCgpPT57XG4gICAgICAgICAgICBsb2FkZXIubG9hZCgnaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy9mb250cy9oZWx2ZXRpa2VyX3JlZ3VsYXIudHlwZWZhY2UuanNvbicsIGZvbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvbnJHZW8gPSBuZXcgVEhSRUUuVGV4dEdlb21ldHJ5KFwiRGl2ZXJnZW5jZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQ6IGZvbnQsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IDAuNSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwLjEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9udE1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0TWVzaCA9IG5ldyBUSFJFRS5NZXNoKGZvbnJHZW8sIGZvbnRNYXQpO1xuICAgICAgICAgICAgICAgIHRleHRNZXNoLm5hbWUgPSBcImRpdmVyZ2VuY2VcIjtcbiAgICAgICAgICAgICAgICB0ZXh0TWVzaC5wb3NpdGlvbi5zZXQoLTEuNywgMS4wLCAyLjApO1xuICAgICAgICAgICAgICAgIHRleHRNZXNoLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0ZXh0TWVzaCk7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ZXMucHVzaCh0ZXh0TWVzaCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFRleHQyKCk7XG5cbiAgICAgICAgLy/ljYrpgI/mmI7jga7luorjgpLkvZzjgotcbiAgICAgICAgY29uc3QgcG1hdCA9IG5ldyBUSFJFRS5NZXNoUGh5c2ljYWxNYXRlcmlhbCh7XG4gICAgICAgICAgICBjb2xvcjoweDBhMGEwYSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OnRydWUsXG4gICAgICAgICAgICBvcGFjaXR5OjAuNyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHBnZW8gPSBuZXcgVEhSRUUuQ2lyY2xlR2VvbWV0cnkoMTAsNjQpO1xuICAgICAgICBjb25zdCBwbGFuZSA9IG5ldyBUSFJFRS5NZXNoKHBnZW8scG1hdCk7XG4gICAgICAgIHBsYW5lLnJvdGF0ZVgoLU1hdGguUEkvMik7XG4gICAgICAgIHBsYW5lLnBvc2l0aW9uLnNldFkoMC4xKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocGxhbmUpO1xuICAgICAgICAvLypcbiAgICAgICAgY29uc3QgbWlycm9yID0gbmV3IFJlZmxlY3RvcihwZ2VvLCB7XG4gICAgICAgICAgICBjbGlwQmlhczogMC4wMDEsXG4gICAgICAgICAgICB0ZXh0dXJlV2lkdGg6IDUxMixcbiAgICAgICAgICAgIHRleHR1cmVIZWlnaHQ6IDUxMixcbiAgICAgICAgICAgIGNvbG9yOiAweGFiYWJhYixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBcbiAgICAgICAgbWlycm9yLnJvdGF0ZVgoLU1hdGguUEkvMik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG1pcnJvcik7Ly8qL1xuXG4gICAgICAgIC8v5pif56m644KSUGxhbmXjgafkvZzjgoso5Zue6Lui44Gn5YWJ44Gj44Gf44KK5YWJ44KJ44Gq44GL44Gj44Gf44KK44GV44Gb44KLKVxuICAgICAgICAvLypcbiAgICAgICAgY29uc3Qgc2t5ID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgICAgIGxldCBwbGFuZWluZGV4ID0gMTAwMDtcbiAgICAgICAgbGV0IHBsYW5lcyA9IFtdO1xuICAgICAgICBsZXQgcGxhbmVSb3RhdGU6VEhSRUUuVmVjdG9yM1tdID0gW107XG4gICAgICAgIGxldCB0d2VlbmluZm8gPSB7c2NhbGU6MC4wfTtcbiAgICAgICAgY29uc3QgcGxhbmVHZW8gPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgwLjA3LDAuMDcpO1xuICAgICAgICBjb25zdCBwbGFuZU1hdCA9IG5ldyBUSFJFRS5NZXNoUGh5c2ljYWxNYXRlcmlhbCgge1xuICAgICAgICAgICAgY29sb3I6MHhmZmZmZmZmLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6dHJ1ZSxcbiAgICAgICAgICAgIHJvdWdobmVzczowLjEsXG4gICAgICAgICAgICBvcGFjaXR5OjAuOSxcbiAgICAgICAgICAgIGlvcjoxLjMxLFxuICAgICAgICAgICAgZW1pc3NpdmU6IDB4ZmZmZmZmLFxuICAgICAgICAgICAgZW1pc3NpdmVJbnRlbnNpdHk6IDAuNSxcbiAgICAgICAgfSApO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpPHBsYW5laW5kZXg7IGkrKyl7XG4gICAgICAgICAgICBwbGFuZXMucHVzaChuZXcgVEhSRUUuTWVzaChwbGFuZUdlbyxwbGFuZU1hdCkpO1xuICAgICAgICAgICAgbGV0IHUgPSAyKk1hdGgucmFuZG9tKCkqTWF0aC5QSTtcbiAgICAgICAgICAgIGxldCB2ID0gKE1hdGgucmFuZG9tKCktMC41KSpNYXRoLlBJO1xuICAgICAgICAgICAgcGxhbmVzW2ldLnBvc2l0aW9uLnNldCgxMCpNYXRoLmNvcyh1KSpNYXRoLmNvcyh2KSxcbiAgICAgICAgICAgICAgICAxMCpNYXRoLmNvcyh2KSpNYXRoLnNpbih1KSsyLjAsXG4gICAgICAgICAgICAgICAgMTAqTWF0aC5zaW4odikpO1xuICAgICAgICAgICAgcGxhbmVSb3RhdGUucHVzaChuZXcgVEhSRUUuVmVjdG9yMygoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAxLCAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAxLChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuMDEpKTtcbiAgICAgICAgICAgIHNreS5hZGQocGxhbmVzW2ldKTtcbiAgICAgICAgfS8vKi9cbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoc2t5KTtcblxuICAgICAgICBsZXQgdXBkYXRlU2NhbGUgPSgpPT57XG4gICAgICAgICAgICBza3kuc2NhbGUueCA9IHR3ZWVuaW5mby5zY2FsZTtcbiAgICAgICAgICAgIHNreS5zY2FsZS55ID0gdHdlZW5pbmZvLnNjYWxlO1xuICAgICAgICAgICAgc2t5LnNjYWxlLnogPSB0d2VlbmluZm8uc2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjcmVhdGVUd2VlbjAgPSAoKSA9PntcbiAgICAgICAgICAgIHR3ZWVuaW5mby5zY2FsZSA9IDEuMDtcbiAgICAgICAgICAgIGNvbnN0IHR3ZWVuPSBuZXcgVFdFRU4uVHdlZW4odHdlZW5pbmZvKVxuICAgICAgICAgICAgICAgIC50byh7IHNjYWxlOiAwLjAgfSwgNTAwKVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh1cGRhdGVTY2FsZSk7XG4gICAgICAgICAgICByZXR1cm4gdHdlZW47XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY3JlYXRlVHdlZW4xID0gKCkgPT57XG4gICAgICAgICAgICB0d2VlbmluZm8uc2NhbGUgPSAwLjA7XG4gICAgICAgICAgICBjb25zdCB0d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm8pXG4gICAgICAgICAgICAgICAgLnRvKHsgc2NhbGU6IDEuMCB9LCA1MDApXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKHVwZGF0ZVNjYWxlKTtcbiAgICAgICAgICAgIHJldHVybiB0d2VlbjtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIC8v5ZGo44KK44Gu44OV44K344Ku44Kv44Or44Kv44Or44Kt44Ol44O844OW44KS5L2c44KLXG4gICAgICAgIC8vKlxuICAgICAgICBsZXQgY3ViZWluZGV4ID0gNTA7XG4gICAgICAgIGxldCBjdWJlcyA9IFtdO1xuICAgICAgICBsZXQgY3ViZVJvdGF0ZTpUSFJFRS5WZWN0b3IzW10gPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGN1YmVHZW8gPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4wNSwwLjA1LDAuMDUpO1xuICAgICAgICBjb25zdCBjdWJlTWF0ID0gbmV3IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsKCB7XG4gICAgICAgICAgICBjb2xvcjoweGZmZmZmZmYsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDp0cnVlLFxuICAgICAgICAgICAgcm91Z2huZXNzOjAuMSxcbiAgICAgICAgICAgIG9wYWNpdHk6MC43LFxuICAgICAgICAgICAgaW9yOjEuMzEsXG4gICAgICAgICAgICBlbWlzc2l2ZTogMHhmZmZmZmYsXG4gICAgICAgICAgICBlbWlzc2l2ZUludGVuc2l0eTogMC41LFxuICAgICAgICB9ICk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGk8Y3ViZWluZGV4OyBpKyspe1xuICAgICAgICAgICAgY3ViZXMucHVzaChuZXcgVEhSRUUuTWVzaChjdWJlR2VvLGN1YmVNYXQpKTtcbiAgICAgICAgICAgIGN1YmVzW2ldLnBvc2l0aW9uLnNldCgxLjIqTWF0aC5zaW4oTWF0aC5QSSppL2N1YmVpbmRleCkqTWF0aC5zaW4oNCppL2N1YmVpbmRleCpNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkvY3ViZWluZGV4KjMuNSswLjI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMS4yKk1hdGguc2luKE1hdGguUEkqaS9jdWJlaW5kZXgpKk1hdGguY29zKDQqaS9jdWJlaW5kZXgqTWF0aC5QSSkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjdWJlUm90YXRlLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4wMSwgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4wMSwoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAxKSk7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChjdWJlc1tpXSk7XG4gICAgICAgIH0vLyovXG5cbiAgICAgICAgLy/jgrvjg7zjg5bjg53jgqTjg7Pjg4jjga7msLTmmbbkvZPjgpLkvZzjgotcbiAgICAgICAgLy8qXG4gICAgICAgIGxldCB2ZXJ0aWNlcyA9IG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAgICAgIDAuMCwgMS41LCAwLjAsICAvLzBcbiAgICAgICAgICAgICAxLjAsIDAuMCwgMC4wLCAgLy8xXG4gICAgICAgICAgICAgMC4wLCAwLjAsLTEuMCwgLy8yXG4gICAgICAgICAgICAtMS4wLCAwLjAsIDAuMCwgLy8zXG4gICAgICAgICAgICAgMC4wLCAwLjAsIDEuMCwgIC8vNFxuICAgICAgICAgICAgIDAuMCwtMS41LCAwLjAgIC8vNVxuICAgICAgICBdKTtcblxuICAgICAgICBjb25zdCBpbmRpY2VzID0gW1xuICAgICAgICAgICAgMCwxLDIsIDAsMiwzLCAwLDMsNCwgMCw0LDEsXG4gICAgICAgICAgICA1LDEsMiwgNSwyLDMsIDUsMyw0LCA1LDQsMSxcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoICdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIHZlcnRpY2VzLCAzICkgKTtcbiAgICAgICAgZ2VvbWV0cnkuY29tcHV0ZVZlcnRleE5vcm1hbHMoKTsgXG4gICAgICAgIGdlb21ldHJ5LnNldEluZGV4KGluZGljZXMpO1xuXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsKCB7XG4gICAgICAgICAgICBjb2xvcjoweDAwMzNmZixcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OnRydWUsXG4gICAgICAgICAgICByb3VnaG5lc3M6MC4xLFxuICAgICAgICAgICAgb3BhY2l0eTowLjgsXG4gICAgICAgICAgICBpb3I6MS4zMSxcbiAgICAgICAgICAgIHNpZGU6VEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgICAgIGVtaXNzaXZlOiAweGZmZmZmZixcbiAgICAgICAgICAgIGVtaXNzaXZlSW50ZW5zaXR5OiAwLjEsXG4gICAgICAgIH0gKTtcblxuICAgICAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuICAgICAgICBtZXNoLnBvc2l0aW9uLnNldCgwLDIuMCwwKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobWVzaCk7Ly8qL1xuXG4vKmRlYnVnXG4gICAgICAgIC8vIOOCsOODquODg+ODieihqOekulxuICAgICAgICBjb25zdCBncmlkSGVscGVyID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoIDEwLCk7XG4gICAgICAgIC8vdGhpcy5zY2VuZS5hZGQoIGdyaWRIZWxwZXIgKTsgIFxuXG4gICAgICAgIC8vIOi7uOihqOekulxuICAgICAgICBjb25zdCBheGVzSGVscGVyID0gbmV3IFRIUkVFLkF4ZXNIZWxwZXIoIDUgKTtcbiAgICAgICAgLy90aGlzLnNjZW5lLmFkZCggYXhlc0hlbHBlciApO1xuICAgICAgICAvLyovXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIGxldCBsaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAxLjApO1xuICAgICAgICBsaWdodC5wb3NpdGlvbi5zZXQoMywzLDMpOyAgXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGxpZ2h0KTtcblxuICAgICAgICBjb25zdCByYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKCk7XG4gICAgICAgIGNvbnN0IG1vdXNlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MQ2FudmFzRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBtb3VzZS54ID0gKChldmVudC5jbGllbnRYIC0gY2FudmFzLmxlZnQpIC8gY2FudmFzLndpZHRoKSAqIDIgLSAxO1xuICAgICAgICAgICAgbW91c2UueSA9IC0oKGV2ZW50LmNsaWVudFkgLSBjYW52YXMudG9wKSAvIGNhbnZhcy5oZWlnaHQpICogMiArIDE7XG5cbiAgICAgICAgICAgIHJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKG1vdXNlLHRoaXMuY2FtZXJhKTtcblxuICAgICAgICAgICAgY29uc3QgaW50ZXJzZWN0ID0gcmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMoW2JvcmRdKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoaW50ZXJzZWN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnQrKztcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvdW50JTIgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVR3ZWVuMCgpLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVyZ2VuY2VUZXh0ID0gdGhpcy5zY2VuZS5nZXRPYmplY3RCeU5hbWUoXCJjb252ZXJnZW5jZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXZlcmdlbmNlVGV4dCA9IHRoaXMuc2NlbmUuZ2V0T2JqZWN0QnlOYW1lKFwiZGl2ZXJnZW5jZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpdmVyZ2VuY2VUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJnZW5jZVRleHQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGl2ZXJnZW5jZVRleHQudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlVHdlZW4xKCkuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb252ZXJnZW5jZVRleHQgPSB0aGlzLnNjZW5lLmdldE9iamVjdEJ5TmFtZShcImNvbnZlcmdlbmNlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpdmVyZ2VuY2VUZXh0ID0gdGhpcy5zY2VuZS5nZXRPYmplY3RCeU5hbWUoXCJkaXZlcmdlbmNlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udmVyZ2VuY2VUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJnZW5jZVRleHQudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXZlcmdlbmNlVGV4dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgY29uc3QgZml4ZWRUaW1lU3RlcCA9IDEuMCAvIDYwLjA7IC8vIOenklxuICAgICAgICBjb25zdCBtYXhTdWJTdGVwcyA9IDM7XG5cbiAgICAgICAgbGV0IGxhc3RUaW1lOiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIC8vT3JiaXRDb250cm9scy51cGRhdGUoKTtcbiAgICAgICAgICAgIGlmIChsYXN0VGltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSAodGltZSAtIGxhc3RUaW1lKSAvIDEwMDA7IC8vIG1zIOKGkiBzXG4gICAgICAgICAgICAgICAgLy93b3JsZC5zdGVwKGZpeGVkVGltZVN0ZXAsIGRlbHRhLCBtYXhTdWJTdGVwcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0VGltZSA9IHRpbWU7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgICAgIFRXRUVOLnVwZGF0ZSh0aW1lKTtcbi8vKlxuICAgICAgICAgICAgbWVzaC5wb3NpdGlvbi5zZXRZKDIuMCswLjEqTWF0aC5zaW4odGltZS8yMDAwKk1hdGguUEkpKTtcbiAgICAgICAgICAgIG1lc2gucm90YXRlWShNYXRoLlBJLzIwMCk7Ly8qL1xuLy8qXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpPGN1YmVpbmRleDsgaSsrKXtcbiAgICAgICAgICAgIGN1YmVzW2ldLnBvc2l0aW9uLnNldCgxLjIqTWF0aC5zaW4oTWF0aC5QSSppL2N1YmVpbmRleCkqTWF0aC5zaW4oNCooLWktdGltZS81MDApL2N1YmVpbmRleCpNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkvY3ViZWluZGV4KjMuNSswLjI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMS4yKk1hdGguc2luKE1hdGguUEkqaS9jdWJlaW5kZXgpKk1hdGguY29zKDQqKC1pLXRpbWUvNTAwKS9jdWJlaW5kZXgqTWF0aC5QSSkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL+ODqeODs+ODgOODoOOBquWbnui7ouOBp+S4jeaAneitsOaEn+OCkuWHuuOBmVxuICAgICAgICAgICAgY3ViZXNbaV0ucm90YXRlWChjdWJlUm90YXRlW2ldLngpO1xuICAgICAgICAgICAgY3ViZXNbaV0ucm90YXRlWShjdWJlUm90YXRlW2ldLnkpO1xuICAgICAgICAgICAgY3ViZXNbaV0ucm90YXRlWihjdWJlUm90YXRlW2ldLnopO1xuICAgICAgICAgICAgfS8vKlxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaTxwbGFuZWluZGV4OyBpKyspe1xuICAgICAgICAgICAgICAgIHBsYW5lc1tpXS5yb3RhdGVYKHBsYW5lUm90YXRlW2ldLngpO1xuICAgICAgICAgICAgICAgIHBsYW5lc1tpXS5yb3RhdGVZKHBsYW5lUm90YXRlW2ldLnkpO1xuICAgICAgICAgICAgICAgIHBsYW5lc1tpXS5yb3RhdGVaKHBsYW5lUm90YXRlW2ldLnopO1xuICAgICAgICAgICAgfS8vKi9cbiAgICAgICAgICAgIHNreS5yb3RhdGVYKE1hdGguUEkvMTAwMDApO1xuICAgICAgICAgICAgc2t5LnJvdGF0ZVkoTWF0aC5QSS8xMDAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxuICAgIFxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XG5cbiAgICBsZXQgdmlld3BvcnQgPSBjb250YWluZXIuY3JlYXRlUmVuZGVyZXJET00oNjQwLCA0ODAsIG5ldyBUSFJFRS5WZWN0b3IzKDAsMiwxMCkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190d2VlbmpzX3R3ZWVuX2pzX2Rpc3RfdHdlZW5fZXNtX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHItODQzOTg1XCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9