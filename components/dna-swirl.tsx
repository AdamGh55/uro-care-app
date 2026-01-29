"use client"

import React, { useEffect, useRef } from "react"

export function DnaSwirl() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []

        // Configuration
        const particleCount = 4000
        const rungParticleCount = 3500 // Increased: 3500 for solids rungs
        const totalRungs = 45 // Increased for ~40px spacing
        const particlesPerRung = Math.floor(rungParticleCount / totalRungs)

        const helixRadius = 300
        const helixLength = 1800
        const rotationSpeed = 0.00002 // Extremely slow (~160s loop)

        // Position offsets
        const offsetX = -200
        const offsetY = -50

        // Tilt Configuration
        const tiltAngle = 13 * (Math.PI / 180) // +13 degrees (Top Left leaning)
        const sinTilt = Math.sin(tiltAngle)
        const cosTilt = Math.cos(tiltAngle)

        class Particle {
            helixProgress: number
            angleOffset: number
            radiusOffset: number

            x: number = 0
            y: number = 0
            z: number = 0

            size: number
            color: string
            baseAlpha: number

            type: 'strandA' | 'strandB' | 'rung'
            rungPos: number = 0

            constructor(i: number, isRung = false) {
                this.type = isRung ? 'rung' : (i % 2 === 0 ? 'strandA' : 'strandB')

                if (this.type === 'rung') {
                    // Group particles into distinct rungs
                    const rungIndex = Math.floor(i / particlesPerRung)
                    // Add slight jitter to rung position so it's not a razor sharp line
                    // Reduced jitter for thinner, clearer rungs
                    const jitter = (Math.random() - 0.5) * 0.002
                    this.helixProgress = (rungIndex / totalRungs) + jitter

                    const turns = 3
                    const angle = this.helixProgress * Math.PI * 2 * turns
                    this.angleOffset = angle

                    this.rungPos = Math.random() // Uniform distribution along rung
                    this.radiusOffset = 0
                    this.size = Math.random() * 0.8 + 0.5 // Finer dots for rungs
                    this.baseAlpha = 0.30 // Increased visibility for solid rungs
                    this.color = "255, 255, 255"

                } else {
                    // Strands (continuous)
                    this.helixProgress = i / particleCount

                    const turns = 3
                    const angle = this.helixProgress * Math.PI * 2 * turns
                    const strandPhase = this.type === 'strandA' ? 0 : Math.PI

                    this.angleOffset = angle + strandPhase
                    this.radiusOffset = (Math.random() - 0.5) * 50 // Volumetric strands
                    this.size = Math.random() * 2 + 1

                    // Strand B slightly dimmer base
                    this.baseAlpha = this.type === 'strandA' ? 0.25 : 0.20

                    const colors = [
                        "14, 165, 233", // Sky blue
                        "56, 189, 248", // Light blue
                        "255, 255, 255" // White
                    ]
                    this.color = colors[Math.floor(Math.random() * colors.length)]
                }
            }

            updateModel(time: number) {
                const currentAngle = this.angleOffset + time * rotationSpeed * 10

                let r = helixRadius + this.radiusOffset

                // Curve the whole DNA
                const curveY = Math.sin(this.helixProgress * Math.PI) * 120
                const curveZ = Math.cos(this.helixProgress * Math.PI) * 40

                const baseX = (this.helixProgress - 0.5) * helixLength

                if (this.type === 'rung') {
                    // Rungs interpolate between the two helix positions at this angle
                    // Pos1 = Angle, Pos2 = Angle + PI
                    // We use linear interpolation (lerp) based on rungPos

                    // Re-calculate the two strand positions for this exact progress/time
                    const angleA = currentAngle
                    const angleB = currentAngle + Math.PI

                    const rA = helixRadius // Simple radius for rungs, ignore volume offset for cleaner lines
                    const yA = Math.sin(angleA) * rA
                    const zA = Math.cos(angleA) * rA

                    const yB = Math.sin(angleB) * rA
                    const zB = Math.cos(angleB) * rA

                    // Lerp
                    const t = this.rungPos
                    const localY = yA + (yB - yA) * t
                    const localZ = zA + (zB - zA) * t

                    this.x = baseX
                    this.y = localY + curveY
                    this.z = localZ + curveZ

                } else {
                    // Strands
                    this.x = baseX
                    this.y = Math.sin(currentAngle) * r + curveY
                    this.z = Math.cos(currentAngle) * r + curveZ
                }
            }
        }

        const init = () => {
            canvas.width = canvas.parentElement?.clientWidth || 1000
            canvas.height = canvas.parentElement?.clientHeight || 600
            particles = []
            // Continuous Strands
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(i, false))
            }
            // Distinct Rungs
            for (let i = 0; i < rungParticleCount; i++) {
                particles.push(new Particle(i, true))
            }
        }

        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach(p => p.updateModel(time))
            particles.sort((a, b) => a.z - b.z)

            const centerX = canvas.width / 2 + offsetX
            const centerY = canvas.height / 2 + offsetY
            const perspective = 800
            const cameraZ = 1000

            particles.forEach(p => {
                const depth = p.z
                const scale = perspective / (perspective + ((cameraZ - depth) * 0.5))

                // 1. Calculate Standard 2D Position
                let screenX = p.x * scale
                let screenY = p.y * scale

                // 2. Apply Global Rotation (Tilt) at Center
                // We rotate the (x, y) vector
                const tiltedX = screenX * cosTilt - screenY * sinTilt
                const tiltedY = screenX * sinTilt + screenY * cosTilt

                // 3. Offset to screen position
                const finalX = centerX + tiltedX
                const finalY = centerY + tiltedY

                const r = p.size * scale

                // Depth-based Opacity Calculation
                let alpha = p.baseAlpha

                const depthNorm = (p.z + 300) / 600

                if (p.type === 'rung') {
                    alpha = Math.max(0.04, p.baseAlpha * depthNorm)
                    // Soft blur for rungs to make them feel integrated
                    ctx.shadowBlur = 0.5
                    ctx.shadowColor = `rgba(${p.color}, 0.5)`
                } else {
                    ctx.shadowBlur = 0
                    // Strands
                    // Sharper falloff for back strand
                    if (p.z < 0) {
                        // Back
                        alpha = 0.08 + (depthNorm * 0.05) // Range ~0.08 to 0.13
                    } else {
                        // Front
                        alpha = 0.14 + (depthNorm * 0.06) // Range ~0.14 to 0.20
                    }
                }

                // Global Fade
                alpha *= 0.8

                if (alpha < 0.005) return

                ctx.beginPath()
                ctx.arc(finalX, finalY, r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${p.color}, ${alpha})`
                ctx.fill()

                // Reset shadow
                if (p.type === 'rung') ctx.shadowBlur = 0
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        window.addEventListener("resize", init)
        animationFrameId = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener("resize", init)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div className="absolute inset-x-0 -top-24 h-[140%] w-full pointer-events-none select-none -z-10 opacity-100 mix-blend-screen">
            <canvas ref={canvasRef} className="w-full h-full" />
            {/* Vignette/Masking for soft edges */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#050A1F]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050A1F] via-transparent to-[#050A1F]" />
        </div>
    )
}
