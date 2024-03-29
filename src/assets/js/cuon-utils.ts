/* eslint-disable */
// cuon-utils.js (c) 2012 kanda and matsuda
/**
 * Create a program object and make current
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true, if the program object was created and successfully made current 
 */

import WebGLUtils from './webgl-utils';
import WebGLDebugUtils from './webgl-debug';

export function initShaders(gl: WebGLRenderingContext, vshader: string, fshader: string) {

    const program = createProgram(gl, vshader, fshader);
    if (!program) {
        console.log('Failed to create program');
        return {isinit: false};
    }
  
    gl.useProgram(program);

    return {program, isinit: true};
}
  
/**
   * Create the linked program object
   * @param gl GL context
   * @param vshader a vertex shader program (string)
   * @param fshader a fragment shader program (string)
   * @return created program object, or null if the creation has failed
   */
 export function createProgram(gl: WebGLRenderingContext, vshader: string, fshader: string) {
    // Create shader object
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    if (!vertexShader || !fragmentShader) {
        return null;
    }
  
    // Create a program object
    var program = gl.createProgram();
    if (!program) {
        return null;
    }
  
    // Attach the shader objects
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
  
    // Link the program object
    gl.linkProgram(program);
  
    // Check the result of linking
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = gl.getProgramInfoLog(program);
        console.log('Failed to link program: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    return program;
}
  
/**
   * Create a shader object
   * @param gl GL context
   * @param type the type of the shader object to be created
   * @param source shader program (string)
   * @return created shader object, or null if the creation has failed.
   */
 export function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
    // Create shader object
    var shader = gl.createShader(type);
    if (shader == null) {
        console.log('unable to create shader');
        return null;
    }
  
    // Set the shader program
    gl.shaderSource(shader, source);
  
    // Compile the shader
    gl.compileShader(shader);
  
    // Check the result of compilation
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        console.log('Failed to compile shader: ' + error);
        gl.deleteShader(shader);
        return null;
    }
  
    return shader;
}
  
/** 
   * Initialize and get the rendering for WebGL
   * @param canvas <cavnas> element
   * @param opt_debug flag to initialize the context for debugging
   * @return the rendering context for WebGL
   */

export function getWebGLContext(canvas: HTMLCanvasElement | null, opt_debug = false) {
    if (!canvas) {
        return {gl: null};
    }
    // Get the rendering context for WebGL
    var gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) return {gl: null};
  
    // if opt_debug is explicitly false, create the context for debugging
    if (arguments.length < 2 || opt_debug) {
        return {
            gl,
            debugContext: WebGLDebugUtils.makeDebugContext(gl)
        };
    }
  
    return {gl, debugContext: null};
}