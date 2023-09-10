import { proxy } from "valtio";

const state = proxy({
// whatever you define here will be able to be utilized throughout our code. they are basically default values in the app
intro: true,
color: '#EFBD48',
isLogoTexture: true,
isFullTexture: false,
logoDecal: './threejs.png',
fullDecal: './threejs.png'
})

export default state;