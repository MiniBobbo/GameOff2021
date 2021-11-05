import Phaser from 'phaser'; 

export class BlurShaderObj extends Phaser.Display.BaseShader {
    constructor() {
        super('blur', 
        `
        precision mediump float;

        uniform sampler2D uMainSampler;
        uniform vec2 resolution;
        varying vec2 outTexCoord;
        varying float outTintEffect;
        varying vec4 outTint;


        precision mediump float;

        // The sampler object
         
        // Texture coordinate passed from vertex shader
        varying  vec2 vTexCoordinate;
         
        // This is the value that needs to be added(subtracted) to a 
        // texture point to get the next(previous) pixel in the X direction
        // This value can be calculated as 1/texturewidth
        // const float uXPixelDistance;
         
        // This is the value that needs to be added(subtracted) to a
        // texture point to get the next(previous) pixel in the Y direction
        // This value can be calculated as 1/textureheight
        // const float uYPixelDistance;
         
        // How to jump to next pixel, 1 means the very next pixel,
        // 2 means the 2th pixel, and so on.
        const float jump = 2.0;
         
        // Number of points around the current point
        const float pointRange = 10.0;
         
        void main() {
            float uXPixelDistance = 1.0 / 960.0;
            float uYPixelDistance = 1.0 / 540.0;

            vec4 color = vec4(0, 0, 0, 0);
            vec2 point;
            int count = 0;
          
            // Calculate the total color intensity around the pixel
            // In this case we are calculating pixel intensity around 10 pixels
            for(float u = -pointRange; u < pointRange ; u+=jump) {
                for(float v = -pointRange ; v < pointRange ; v+=jump) {
                    point.x = outTexCoord.x  + u * uXPixelDistance;
                    point.y = outTexCoord.y  + v * uYPixelDistance;
                     
                    // If the point is within the range[0, 1]
                    if (point.y >= 0.0 && point.x >= 0.0 &&
                        point.y <= 1.0 && point.x <= 1.0 ) {
                        ++count;
                        color += texture2D(uMainSampler, point.xy);
                    }
                }
            }
             
            // Take the average intensity for the region
            color = color / float(count);
          
            gl_FragColor = vec4(color.xyz, 1.0);
        }                     
        `,`
        #define SHADER_NAME PHASER_SINGLE_VS

        precision mediump float;
        
        uniform mat4 uProjectionMatrix;
        uniform mat4 uViewMatrix;
        uniform mat4 uModelMatrix;
        
        attribute vec2 inPosition;
        attribute vec2 inTexCoord;
        attribute float inTintEffect;
        attribute vec4 inTint;
        
        varying vec2 outTexCoord;
        varying float outTintEffect;
        varying vec4 outTint;
        
        void main ()
        {
            gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(inPosition, 1.0, 1.0);
        
            outTexCoord = inTexCoord;
            outTint = inTint;
            outTintEffect = inTintEffect;
        }
        `, {


        }
         
        
        
        
        );
    }
}