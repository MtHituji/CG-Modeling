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
            tweeninfo.scale = 10.0;
            const tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__.Tween(tweeninfo)
                .to({ scale: 10 }, 500)
                .onUpdate(updateScale);
            const tweenBack = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__.Tween(tweeninfo)
                .to({ scale: 0.0 }, 500)
                .onUpdate(updateScale);
            tween.chain(tweenBack);
            return tween;
        };
        const createTween1 = () => {
            tweeninfo.scale = 0.0;
            const tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__.Tween(tweeninfo)
                .to({ scale: 10 }, 500)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NncHJlbmRlcmluZy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcbmltcG9ydCB7IFJlZmxlY3RvciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9vYmplY3RzL1JlZmxlY3Rvci5qcyc7XG5pbXBvcnQgKiBhcyBUV0VFTiBmcm9tIFwiQHR3ZWVuanMvdHdlZW4uanNcIjtcblxuXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcbiAgICBwcml2YXRlIHNjZW5lOiBUSFJFRS5TY2VuZTtcbiAgICBwcml2YXRlIGxpZ2h0OiBUSFJFRS5MaWdodDtcbiAgICBwcml2YXRlIGNhbWVyYTpUSFJFRS5DYW1lcmE7XG4gICAgcHJpdmF0ZSB0ZXh0ZXM6IFRIUkVFLk9iamVjdDNEW10gPSBbXTtcbiAgICBwcml2YXRlIGNvdW50ID0gMDtcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICAvLyDnlLvpnaLpg6jliIbjga7kvZzmiJAo6KGo56S644GZ44KL5p6g44GU44Go44GrKSpcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTsgLy/jgrfjg6Pjg4njgqbjg57jg4Pjg5fjgpLmnInlirnjgavjgZnjgotcblxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHModGhpcy5jYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XG5cbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH1cblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgICAgICBjb25zdCBsb2FkZXIgPSBuZXcgVEhSRUUuRm9udExvYWRlcigpO1xuICAgICAgICBsZXQgYWRkVGV4dDEgPSAoKCk9PntcbiAgICAgICAgICAgIGxvYWRlci5sb2FkKCdodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzL2ZvbnRzL2hlbHZldGlrZXJfcmVndWxhci50eXBlZmFjZS5qc29uJywgZm9udCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9uckdlbyA9IG5ldyBUSFJFRS5UZXh0R2VvbWV0cnkoXCJDb252ZXJnZW5jZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQ6IGZvbnQsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IDAuNSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwLjEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9udE1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0TWVzaCA9IG5ldyBUSFJFRS5NZXNoKGZvbnJHZW8sIGZvbnRNYXQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRleHRNZXNoLnBvc2l0aW9uLnNldCgtMi4xLCAxLjAsIDIuMCk7XG4gICAgICAgICAgICAgICAgdGV4dE1lc2gubmFtZSA9IFwiY29udmVyZ2VuY2VcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0ZXh0TWVzaCk7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ZXMucHVzaCh0ZXh0TWVzaCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGJvcmQgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg1LjAsMS4wLDAuMyksXG4gICAgICAgICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OnRydWUsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTowLjNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGJvcmQucG9zaXRpb24uc2V0KDAuMCwxLjIsMi4wKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoYm9yZCk7XG4gICAgICAgIGFkZFRleHQxKCk7XG5cbiAgICAgICAgbGV0IGFkZFRleHQyID0gKCgpPT57XG4gICAgICAgICAgICBsb2FkZXIubG9hZCgnaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy9mb250cy9oZWx2ZXRpa2VyX3JlZ3VsYXIudHlwZWZhY2UuanNvbicsIGZvbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvbnJHZW8gPSBuZXcgVEhSRUUuVGV4dEdlb21ldHJ5KFwiRGl2ZXJnZW5jZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQ6IGZvbnQsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IDAuNSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwLjEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9udE1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0TWVzaCA9IG5ldyBUSFJFRS5NZXNoKGZvbnJHZW8sIGZvbnRNYXQpO1xuICAgICAgICAgICAgICAgIHRleHRNZXNoLm5hbWUgPSBcImRpdmVyZ2VuY2VcIjtcbiAgICAgICAgICAgICAgICB0ZXh0TWVzaC5wb3NpdGlvbi5zZXQoLTEuNywgMS4wLCAyLjApO1xuICAgICAgICAgICAgICAgIHRleHRNZXNoLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0ZXh0TWVzaCk7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ZXMucHVzaCh0ZXh0TWVzaCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFRleHQyKCk7XG5cbiAgICAgICAgLy/ljYrpgI/mmI7jga7luorjgpLkvZzjgotcbiAgICAgICAgY29uc3QgcG1hdCA9IG5ldyBUSFJFRS5NZXNoUGh5c2ljYWxNYXRlcmlhbCh7XG4gICAgICAgICAgICBjb2xvcjoweDBhMGEwYSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OnRydWUsXG4gICAgICAgICAgICBvcGFjaXR5OjAuNyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHBnZW8gPSBuZXcgVEhSRUUuQ2lyY2xlR2VvbWV0cnkoMTAsNjQpO1xuICAgICAgICBjb25zdCBwbGFuZSA9IG5ldyBUSFJFRS5NZXNoKHBnZW8scG1hdCk7XG4gICAgICAgIHBsYW5lLnJvdGF0ZVgoLU1hdGguUEkvMik7XG4gICAgICAgIHBsYW5lLnBvc2l0aW9uLnNldFkoMC4xKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocGxhbmUpO1xuICAgICAgICAvLypcbiAgICAgICAgY29uc3QgbWlycm9yID0gbmV3IFJlZmxlY3RvcihwZ2VvLCB7XG4gICAgICAgICAgICBjbGlwQmlhczogMC4wMDEsXG4gICAgICAgICAgICB0ZXh0dXJlV2lkdGg6IDUxMixcbiAgICAgICAgICAgIHRleHR1cmVIZWlnaHQ6IDUxMixcbiAgICAgICAgICAgIGNvbG9yOiAweGFiYWJhYixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBcbiAgICAgICAgbWlycm9yLnJvdGF0ZVgoLU1hdGguUEkvMik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG1pcnJvcik7Ly8qL1xuXG4gICAgICAgIC8v5pif56m644KSUGxhbmXjgafkvZzjgoso5Zue6Lui44Gn5YWJ44Gj44Gf44KK5YWJ44KJ44Gq44GL44Gj44Gf44KK44GV44Gb44KLKVxuICAgICAgICAvLypcbiAgICAgICAgY29uc3Qgc2t5ID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgICAgIGxldCBwbGFuZWluZGV4ID0gMTAwMDtcbiAgICAgICAgbGV0IHBsYW5lcyA9IFtdO1xuICAgICAgICBsZXQgcGxhbmVSb3RhdGU6VEhSRUUuVmVjdG9yM1tdID0gW107XG4gICAgICAgIGxldCB0d2VlbmluZm8gPSB7c2NhbGU6MC4wfTtcbiAgICAgICAgY29uc3QgcGxhbmVHZW8gPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgwLjA3LDAuMDcpO1xuICAgICAgICBjb25zdCBwbGFuZU1hdCA9IG5ldyBUSFJFRS5NZXNoUGh5c2ljYWxNYXRlcmlhbCgge1xuICAgICAgICAgICAgY29sb3I6MHhmZmZmZmZmLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6dHJ1ZSxcbiAgICAgICAgICAgIHJvdWdobmVzczowLjEsXG4gICAgICAgICAgICBvcGFjaXR5OjAuOSxcbiAgICAgICAgICAgIGlvcjoxLjMxLFxuICAgICAgICAgICAgZW1pc3NpdmU6IDB4ZmZmZmZmLFxuICAgICAgICAgICAgZW1pc3NpdmVJbnRlbnNpdHk6IDAuNSxcbiAgICAgICAgfSApO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpPHBsYW5laW5kZXg7IGkrKyl7XG4gICAgICAgICAgICBwbGFuZXMucHVzaChuZXcgVEhSRUUuTWVzaChwbGFuZUdlbyxwbGFuZU1hdCkpO1xuICAgICAgICAgICAgbGV0IHUgPSAyKk1hdGgucmFuZG9tKCkqTWF0aC5QSTtcbiAgICAgICAgICAgIGxldCB2ID0gKE1hdGgucmFuZG9tKCktMC41KSpNYXRoLlBJO1xuICAgICAgICAgICAgcGxhbmVzW2ldLnBvc2l0aW9uLnNldCgxMCpNYXRoLmNvcyh1KSpNYXRoLmNvcyh2KSxcbiAgICAgICAgICAgICAgICAxMCpNYXRoLmNvcyh2KSpNYXRoLnNpbih1KSsyLjAsXG4gICAgICAgICAgICAgICAgMTAqTWF0aC5zaW4odikpO1xuICAgICAgICAgICAgcGxhbmVSb3RhdGUucHVzaChuZXcgVEhSRUUuVmVjdG9yMygoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAxLCAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAxLChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuMDEpKTtcbiAgICAgICAgICAgIHNreS5hZGQocGxhbmVzW2ldKTtcbiAgICAgICAgfS8vKi9cbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoc2t5KTtcblxuICAgICAgICBsZXQgdXBkYXRlU2NhbGUgPSgpPT57XG4gICAgICAgICAgICBza3kuc2NhbGUueCA9IHR3ZWVuaW5mby5zY2FsZTtcbiAgICAgICAgICAgIHNreS5zY2FsZS55ID0gdHdlZW5pbmZvLnNjYWxlO1xuICAgICAgICAgICAgc2t5LnNjYWxlLnogPSB0d2VlbmluZm8uc2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjcmVhdGVUd2VlbjAgPSAoKSA9PntcbiAgICAgICAgICAgIHR3ZWVuaW5mby5zY2FsZSA9IDEwLjA7XG4gICAgICAgICAgICBjb25zdCB0d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm8pXG4gICAgICAgICAgICAgICAgLnRvKHsgc2NhbGU6IDEwIH0sIDUwMClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUodXBkYXRlU2NhbGUpO1xuXG4gICAgICAgICAgICBjb25zdCB0d2VlbkJhY2sgPSBuZXcgVFdFRU4uVHdlZW4odHdlZW5pbmZvKVxuICAgICAgICAgICAgICAgIC50byh7IHNjYWxlOiAwLjAgfSwgNTAwKVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh1cGRhdGVTY2FsZSk7XG5cbiAgICAgICAgICAgIHR3ZWVuLmNoYWluKHR3ZWVuQmFjayk7XG4gICAgICAgICAgICByZXR1cm4gdHdlZW47XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY3JlYXRlVHdlZW4xID0gKCkgPT57XG4gICAgICAgICAgICB0d2VlbmluZm8uc2NhbGUgPSAwLjA7XG4gICAgICAgICAgICBjb25zdCB0d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm8pXG4gICAgICAgICAgICAgICAgLnRvKHsgc2NhbGU6IDEwIH0sIDUwMClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUodXBkYXRlU2NhbGUpO1xuICAgICAgICAgICAgcmV0dXJuIHR3ZWVuO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgLy/lkajjgorjga7jg5Xjgrfjgq7jgq/jg6vjgq/jg6vjgq3jg6Xjg7zjg5bjgpLkvZzjgotcbiAgICAgICAgLy8qXG4gICAgICAgIGxldCBjdWJlaW5kZXggPSA1MDtcbiAgICAgICAgbGV0IGN1YmVzID0gW107XG4gICAgICAgIGxldCBjdWJlUm90YXRlOlRIUkVFLlZlY3RvcjNbXSA9IFtdO1xuICAgICAgICBjb25zdCBjdWJlR2VvID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMDUsMC4wNSwwLjA1KTtcbiAgICAgICAgY29uc3QgY3ViZU1hdCA9IG5ldyBUSFJFRS5NZXNoUGh5c2ljYWxNYXRlcmlhbCgge1xuICAgICAgICAgICAgY29sb3I6MHhmZmZmZmZmLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6dHJ1ZSxcbiAgICAgICAgICAgIHJvdWdobmVzczowLjEsXG4gICAgICAgICAgICBvcGFjaXR5OjAuNyxcbiAgICAgICAgICAgIGlvcjoxLjMxLFxuICAgICAgICAgICAgZW1pc3NpdmU6IDB4ZmZmZmZmLFxuICAgICAgICAgICAgZW1pc3NpdmVJbnRlbnNpdHk6IDAuNSxcbiAgICAgICAgfSApO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpPGN1YmVpbmRleDsgaSsrKXtcbiAgICAgICAgICAgIGN1YmVzLnB1c2gobmV3IFRIUkVFLk1lc2goY3ViZUdlbyxjdWJlTWF0KSk7XG4gICAgICAgICAgICBjdWJlc1tpXS5wb3NpdGlvbi5zZXQoMS4yKk1hdGguc2luKE1hdGguUEkqaS9jdWJlaW5kZXgpKk1hdGguc2luKDQqaS9jdWJlaW5kZXgqTWF0aC5QSSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpL2N1YmVpbmRleCozLjUrMC4yNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEuMipNYXRoLnNpbihNYXRoLlBJKmkvY3ViZWluZGV4KSpNYXRoLmNvcyg0KmkvY3ViZWluZGV4Kk1hdGguUEkpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY3ViZVJvdGF0ZS5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuMDEsIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuMDEsKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4wMSkpO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoY3ViZXNbaV0pO1xuICAgICAgICB9Ly8qL1xuXG4gICAgICAgIC8v44K744O844OW44Od44Kk44Oz44OI44Gu5rC05pm25L2T44KS5L2c44KLXG4gICAgICAgIC8vKlxuICAgICAgICBsZXQgdmVydGljZXMgPSBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgICAgICAwLjAsIDEuNSwgMC4wLCAgLy8wXG4gICAgICAgICAgICAgMS4wLCAwLjAsIDAuMCwgIC8vMVxuICAgICAgICAgICAgIDAuMCwgMC4wLC0xLjAsIC8vMlxuICAgICAgICAgICAgLTEuMCwgMC4wLCAwLjAsIC8vM1xuICAgICAgICAgICAgIDAuMCwgMC4wLCAxLjAsICAvLzRcbiAgICAgICAgICAgICAwLjAsLTEuNSwgMC4wICAvLzVcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgaW5kaWNlcyA9IFtcbiAgICAgICAgICAgIDAsMSwyLCAwLDIsMywgMCwzLDQsIDAsNCwxLFxuICAgICAgICAgICAgNSwxLDIsIDUsMiwzLCA1LDMsNCwgNSw0LDEsXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCB2ZXJ0aWNlcywgMyApICk7XG4gICAgICAgIGdlb21ldHJ5LmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKCk7IFxuICAgICAgICBnZW9tZXRyeS5zZXRJbmRleChpbmRpY2VzKTtcblxuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGh5c2ljYWxNYXRlcmlhbCgge1xuICAgICAgICAgICAgY29sb3I6MHgwMDMzZmYsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDp0cnVlLFxuICAgICAgICAgICAgcm91Z2huZXNzOjAuMSxcbiAgICAgICAgICAgIG9wYWNpdHk6MC44LFxuICAgICAgICAgICAgaW9yOjEuMzEsXG4gICAgICAgICAgICBzaWRlOlRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgICAgICBlbWlzc2l2ZTogMHhmZmZmZmYsXG4gICAgICAgICAgICBlbWlzc2l2ZUludGVuc2l0eTogMC4xLFxuICAgICAgICB9ICk7XG5cbiAgICAgICAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcbiAgICAgICAgbWVzaC5wb3NpdGlvbi5zZXQoMCwyLjAsMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG1lc2gpOy8vKi9cblxuLypkZWJ1Z1xuICAgICAgICAvLyDjgrDjg6rjg4Pjg4nooajnpLpcbiAgICAgICAgY29uc3QgZ3JpZEhlbHBlciA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKCAxMCwpO1xuICAgICAgICAvL3RoaXMuc2NlbmUuYWRkKCBncmlkSGVscGVyICk7ICBcblxuICAgICAgICAvLyDou7jooajnpLpcbiAgICAgICAgY29uc3QgYXhlc0hlbHBlciA9IG5ldyBUSFJFRS5BeGVzSGVscGVyKCA1ICk7XG4gICAgICAgIC8vdGhpcy5zY2VuZS5hZGQoIGF4ZXNIZWxwZXIgKTtcbiAgICAgICAgLy8qL1xuICAgICAgICAvL+ODqeOCpOODiOOBruioreWumlxuICAgICAgICBsZXQgbGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMS4wKTtcbiAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KDMsMywzKTsgIFxuICAgICAgICB0aGlzLnNjZW5lLmFkZChsaWdodCk7XG5cbiAgICAgICAgY29uc3QgcmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpO1xuICAgICAgICBjb25zdCBtb3VzZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IChldmVudC50YXJnZXQgYXMgSFRNTENhbnZhc0VsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbW91c2UueCA9ICgoZXZlbnQuY2xpZW50WCAtIGNhbnZhcy5sZWZ0KSAvIGNhbnZhcy53aWR0aCkgKiAyIC0gMTtcbiAgICAgICAgICAgIG1vdXNlLnkgPSAtKChldmVudC5jbGllbnRZIC0gY2FudmFzLnRvcCkgLyBjYW52YXMuaGVpZ2h0KSAqIDIgKyAxO1xuXG4gICAgICAgICAgICByYXljYXN0ZXIuc2V0RnJvbUNhbWVyYShtb3VzZSx0aGlzLmNhbWVyYSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGludGVyc2VjdCA9IHJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3RzKFtib3JkXSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGludGVyc2VjdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb3VudCUyID09IDEpe1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVUd2VlbjAoKS5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcmdlbmNlVGV4dCA9IHRoaXMuc2NlbmUuZ2V0T2JqZWN0QnlOYW1lKFwiY29udmVyZ2VuY2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGl2ZXJnZW5jZVRleHQgPSB0aGlzLnNjZW5lLmdldE9iamVjdEJ5TmFtZShcImRpdmVyZ2VuY2VcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXZlcmdlbmNlVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udmVyZ2VuY2VUZXh0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdmVyZ2VuY2VUZXh0LnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVR3ZWVuMSgpLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVyZ2VuY2VUZXh0ID0gdGhpcy5zY2VuZS5nZXRPYmplY3RCeU5hbWUoXCJjb252ZXJnZW5jZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXZlcmdlbmNlVGV4dCA9IHRoaXMuc2NlbmUuZ2V0T2JqZWN0QnlOYW1lKFwiZGl2ZXJnZW5jZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnZlcmdlbmNlVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udmVyZ2VuY2VUZXh0LnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGl2ZXJnZW5jZVRleHQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIGNvbnN0IGZpeGVkVGltZVN0ZXAgPSAxLjAgLyA2MC4wOyAvLyDnp5JcbiAgICAgICAgY29uc3QgbWF4U3ViU3RlcHMgPSAzO1xuXG4gICAgICAgIGxldCBsYXN0VGltZTogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgdXBkYXRlOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICAvL09yYml0Q29udHJvbHMudXBkYXRlKCk7XG4gICAgICAgICAgICBpZiAobGFzdFRpbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gKHRpbWUgLSBsYXN0VGltZSkgLyAxMDAwOyAvLyBtcyDihpIgc1xuICAgICAgICAgICAgICAgIC8vd29ybGQuc3RlcChmaXhlZFRpbWVTdGVwLCBkZWx0YSwgbWF4U3ViU3RlcHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdFRpbWUgPSB0aW1lO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgICAgICAgICBUV0VFTi51cGRhdGUodGltZSk7XG4vLypcbiAgICAgICAgICAgIG1lc2gucG9zaXRpb24uc2V0WSgyLjArMC4xKk1hdGguc2luKHRpbWUvMjAwMCpNYXRoLlBJKSk7XG4gICAgICAgICAgICBtZXNoLnJvdGF0ZVkoTWF0aC5QSS8yMDApOy8vKi9cbi8vKlxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaTxjdWJlaW5kZXg7IGkrKyl7XG4gICAgICAgICAgICBjdWJlc1tpXS5wb3NpdGlvbi5zZXQoMS4yKk1hdGguc2luKE1hdGguUEkqaS9jdWJlaW5kZXgpKk1hdGguc2luKDQqKC1pLXRpbWUvNTAwKS9jdWJlaW5kZXgqTWF0aC5QSSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpL2N1YmVpbmRleCozLjUrMC4yNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEuMipNYXRoLnNpbihNYXRoLlBJKmkvY3ViZWluZGV4KSpNYXRoLmNvcyg0KigtaS10aW1lLzUwMCkvY3ViZWluZGV4Kk1hdGguUEkpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy/jg6njg7Pjg4Djg6Djgarlm57ou6LjgafkuI3mgJ3orbDmhJ/jgpLlh7rjgZlcbiAgICAgICAgICAgIGN1YmVzW2ldLnJvdGF0ZVgoY3ViZVJvdGF0ZVtpXS54KTtcbiAgICAgICAgICAgIGN1YmVzW2ldLnJvdGF0ZVkoY3ViZVJvdGF0ZVtpXS55KTtcbiAgICAgICAgICAgIGN1YmVzW2ldLnJvdGF0ZVooY3ViZVJvdGF0ZVtpXS56KTtcbiAgICAgICAgICAgIH0vLypcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGk8cGxhbmVpbmRleDsgaSsrKXtcbiAgICAgICAgICAgICAgICBwbGFuZXNbaV0ucm90YXRlWChwbGFuZVJvdGF0ZVtpXS54KTtcbiAgICAgICAgICAgICAgICBwbGFuZXNbaV0ucm90YXRlWShwbGFuZVJvdGF0ZVtpXS55KTtcbiAgICAgICAgICAgICAgICBwbGFuZXNbaV0ucm90YXRlWihwbGFuZVJvdGF0ZVtpXS56KTtcbiAgICAgICAgICAgIH0vLyovXG4gICAgICAgICAgICBza3kucm90YXRlWChNYXRoLlBJLzEwMDAwKTtcbiAgICAgICAgICAgIHNreS5yb3RhdGVZKE1hdGguUEkvMTAwMDApO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgIH1cbiAgICBcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuXG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKDY0MCwgNDgwLCBuZXcgVEhSRUUuVmVjdG9yMygwLDIsMTApKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdHdlZW5qc190d2Vlbl9qc19kaXN0X3R3ZWVuX2VzbV9qcy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyLTg0Mzk4NVwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==