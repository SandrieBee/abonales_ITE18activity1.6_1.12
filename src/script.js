import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'


/**
 * Base
 */
// Debug GUI
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#D3D3D3')

/**
 * Fonts
 */
const fontLoader = new FontLoader()
const textGeometry = new TextGeometry('DONUT WORLD', {
    font: fontLoader.parse(typefaceFont),
    size: 5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
})

const textMaterial = new THREE.MeshStandardMaterial({ color: '#D2691E' })
const text = new THREE.Mesh(textGeometry, textMaterial)
text.position.z = 2.5


textGeometry.center()

//const axesHelper = new THREE.AxesHelper(2)
scene.add(text)


const maindonutGeometry = new THREE.TorusGeometry(3, 1.5, 50, 100)
const maindonutMaterial = new THREE.MeshStandardMaterial({ color: '#D2B48C' }) 
const maindonut = new THREE.Mesh(maindonutGeometry, maindonutMaterial)
maindonut.position.z = -2 

const icingGeometry = new THREE.TorusGeometry(3, 1.55, 50, 100) 
const icingMaterial = new THREE.MeshStandardMaterial({ color: '#FFC0CB' }) 
const icing = new THREE.Mesh(icingGeometry, icingMaterial)
icing.position.z = -1 

const donutGroup1 = new THREE.Group()
donutGroup1.add(maindonut)
donutGroup1.add(icing)

const donutGroup2 = donutGroup1.clone()
donutGroup2.position.set(10, 0, -2) 

const donutGroup3 = donutGroup1.clone()
donutGroup3.position.set(-10, 0, -2)

// Add both donut groups to the scene
scene.add(donutGroup1)
scene.add(donutGroup2)
scene.add(donutGroup3)

// Additional donuts
const numDonuts = 520
for (let i = 0; i < numDonuts; i++) {
   
    const position = {
        x: (Math.random() - 0.5) * 80, 
        y: (Math.random() - 0.3) * 80,         
        z: (Math.random() - 0.9) * 100
    }

    const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random())

    const donutGeometry = new THREE.TorusGeometry(1, 0.6, 10, 100)
    const donutMaterial = new THREE.MeshStandardMaterial({ color: randomColor, roughness: 0.6, metalness: 0.2 })
    const donut = new THREE.Mesh(donutGeometry, donutMaterial)
    donut.position.set(position.x, position.y, position.z) 
    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    scene.add(donut)
}

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.8)
pointLight.position.set(5, 3, 20)
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 20)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x202020)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    
    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
