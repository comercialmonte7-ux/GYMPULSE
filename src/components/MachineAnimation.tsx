import React from 'react';
import { motion } from 'motion/react';

interface MachineAnimationProps {
  machineId: string;
  videoUrl?: string;
}

const TechnicalAvatar: React.FC<{ type: string }> = ({ type }) => {
  // Freeletics animations are highly academic, smooth, clean vector loops.
  // We represent them using double-jointed human bone chains, depth shading (active vs background limbs),
  // and direct dynamic muscle swelling linked to the motion curve.
  
  return (
    <g className="stroke-zinc-500 stroke-[1.5] fill-none stroke-linecap-round stroke-linejoin-round">
      {/* Platform/Floor Grid */}
      <path d="M 15 88 L 85 88" className="stroke-zinc-800 stroke-[2]" />
      <path d="M 25 88 L 30 93 M 35 88 L 40 93 M 45 88 L 50 93 M 55 88 L 60 93 M 65 88 L 70 93 M 75 88 L 80 93" className="stroke-zinc-900/40 stroke-[1]" />

      {type === 'squat' ? (
        <g>
          {/* Depth Shading Leg (Far side) */}
          <motion.path
            d="M 45 45 L 58 65 L 50 85"
            animate={{
              d: [
                "M 45 45 L 58 65 L 50 85", // Standing
                "M 45 58 L 64 71 L 50 85", // Quarter squat
                "M 45 70 L 67 76 L 50 85", // Deep squat
                "M 45 58 L 64 71 L 50 85", // Standing up
                "M 45 45 L 58 65 L 50 85"  // Standing
              ]
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-zinc-700 stroke-[1.5]"
          />

          {/* Active Target Quadriceps Muscle Swell */}
          <motion.path
            d="M 45 45 Q 53 50 58 65"
            animate={{
              d: [
                "M 45 45 Q 52 50 58 65", // Flat standing
                "M 45 58 Q 58 59 64 71", // Mid stress
                "M 45 70 Q 61 68 67 76", // Deep peak swell
                "M 45 58 Q 58 59 64 71", // Under tension
                "M 45 45 Q 52 50 58 65"
              ],
              strokeWidth: [1, 3.5, 6, 3.5, 1],
              stroke: ["rgba(163,230,53,0.1)", "rgba(163,230,53,0.4)", "rgba(163,230,53,0.95)", "rgba(163,230,53,0.4)", "rgba(163,230,53,0.1)"]
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="fill-none"
          />

          {/* Active Target Glute Muscle Swell */}
          <motion.ellipse
            cx="42" cy="51" rx="4" ry="4"
            animate={{
              cx: [43, 41, 39, 41, 43],
              cy: [49, 61, 73, 61, 49],
              scale: [1, 1.25, 1.6, 1.25, 1],
              fill: ["rgba(163,230,53,0.0)", "rgba(163,230,53,0.25)", "rgba(163,230,53,0.6)", "rgba(163,230,53,0.25)", "rgba(163,230,53,0.0)"]
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-lime-400 stroke-0"
          />

          {/* Primary Human Skeletal Model (Near side) */}
          {/* Flat feet */}
          <path d="M 47 85 L 53 85" className="stroke-zinc-300 stroke-[2.5]" />
          
          {/* Leg bone chain */}
          <motion.path
            d="M 45 45 L 58 65 L 50 85"
            animate={{
              d: [
                "M 45 45 L 58 65 L 50 85", // Standing
                "M 45 58 L 64 71 L 50 85", // Quarter
                "M 45 70 L 67 76 L 50 85", // Deep squat
                "M 45 58 L 64 71 L 50 85", // Up
                "M 45 45 L 58 65 L 50 85"  // Standing
              ]
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-lime-400 stroke-[3]"
          />

          {/* Torso & Head */}
          <motion.g
            animate={{
              y: [0, 13, 25, 13, 0],
              x: [0, -4, -13, -4, 0]
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Spine */}
            <path d="M 45 45 L 42 21" className="stroke-zinc-300 stroke-[2.5]" />
            {/* Head */}
            <circle cx="41.5" cy="14" r="5" className="stroke-zinc-100 fill-zinc-950 stroke-[2]" />
            {/* Hands extended for balance */}
            <path d="M 43 28 L 59 28" className="stroke-zinc-400 stroke-[2]" />
            {/* Load indicator dumbbell / barbell */}
            <circle cx="59" cy="28" r="2.5" className="fill-zinc-700 stroke-zinc-500" />
            <path d="M 59 23 L 59 33" className="stroke-zinc-600 stroke-[1.5]" />
          </motion.g>

          {/* Biomechanical Joint Highlights */}
          <motion.g
            animate={{
              y: [0, 13, 25, 13, 0],
              x: [0, -4, -13, -4, 0]
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Hip Joint */}
            <circle cx="45" cy="45" r="2.5" className="fill-zinc-950 stroke-lime-400 stroke-[1.5]" />
          </motion.g>

          <motion.circle
            cx="58" cy="65" r="2.5"
            animate={{
              cx: [58, 64, 67, 64, 58],
              cy: [65, 71, 76, 71, 65]
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="fill-zinc-950 stroke-lime-400 stroke-[1.5]"
          />
          {/* Ankle Joint */}
          <circle cx="50" cy="85" r="2.5" className="fill-zinc-950 stroke-zinc-400 stroke-[1.5]" />
        </g>
      ) : type === 'biceps' ? (
        <g>
          {/* Seat frame & Stool background */}
          <path d="M 30 78 L 70 78 M 40 78 L 40 45" className="stroke-zinc-800 stroke-[2]" />
          <path d="M 33 45 L 43 45" className="stroke-zinc-800 stroke-[2.5]" />
          
          {/* Seated Spine & Torso */}
          <path d="M 41 45 L 41 72" className="stroke-zinc-400 stroke-[3]" />
          {/* Head looking forward */}
          <circle cx="41" cy="37" r="5.5" className="stroke-zinc-300 fill-zinc-950 stroke-[2]" />
          
          {/* Upper Arm (fixed rest on preacher bench) */}
          <path d="M 41 48 L 54 58" className="stroke-zinc-400 stroke-[2.5]" />
          <circle cx="41" cy="48" r="2" className="fill-zinc-950 stroke-zinc-500" />

          {/* Preacher pad outline */}
          <path d="M 39 48 L 55 60" className="stroke-zinc-800/65 stroke-[2]" />

          {/* Dynamic Bicep contraction visualization */}
          <motion.path
            d="M 41 48 Q 47 53 54 58"
            animate={{
              d: [
                "M 41 48 Q 47 53 54 58", // Relaxed
                "M 41 48 Q 45 48 54 58", // Contracting (bicep bulge!)
                "M 41 48 Q 42 45 54 58", // Peak contraction swell
                "M 41 48 Q 45 48 54 58", // Releasing
                "M 41 48 Q 47 53 54 58"
              ],
              strokeWidth: [1, 3.5, 7.5, 3.5, 1],
              stroke: ["rgba(163,230,53,0.1)", "rgba(163,230,53,0.4)", "rgba(163,230,53,0.95)", "rgba(163,230,53,0.4)", "rgba(163,230,53,0.1)"]
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="fill-none"
          />

          {/* Rotating Forearm + Dumbbell */}
          <motion.g
            animate={{ rotate: [0, -38, -85, -38, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "54px", originY: "58px" }}
          >
            {/* Forearm bone */}
            <path d="M 54 58 L 74 53" className="stroke-lime-400 stroke-[3]" />
            {/* Wrist joint */}
            <circle cx="74" cy="53" r="2.5" className="fill-zinc-950 stroke-lime-400 stroke-[1.5]" />
            {/* Hand gripping bar */}
            <circle cx="74" cy="53" r="4.5" className="stroke-zinc-300 stroke-[1]" />
            {/* Weight dumbbell bar and plates */}
            <path d="M 74 42 L 74 64" className="stroke-zinc-200 stroke-[2]" />
            <rect x="71" y="38" width="6" height="4" rx="1.5" className="fill-zinc-700 stroke-zinc-600" />
            <rect x="71" y="64" width="6" height="4" rx="1.5" className="fill-zinc-700 stroke-zinc-600" />
          </motion.g>

          {/* Elbow Joint Pivot */}
          <circle cx="54" cy="58" r="2.5" className="fill-zinc-950 stroke-zinc-400 stroke-[1.5]" />
        </g>
      ) : type === 'leg-press' ? (
        <g>
          {/* Massive 45 degree angle sled frame background */}
          <path d="M 23 76 L 46 44 M 23 76 L 46 76" className="stroke-zinc-800 stroke-[3]" />
          <path d="M 42 35 L 75 68" className="stroke-zinc-900/45 stroke-[2] stroke-dasharray-[2,2]" />
          
          {/* Seated Back support pad */}
          <path d="M 26 71 L 44 46" className="stroke-zinc-700 stroke-[3]" />

          {/* Torso resting on seat */}
          <path d="M 31 66 L 43 50" className="stroke-zinc-300 stroke-[2.5]" />
          {/* Head resting against cushion */}
          <circle cx="47" cy="45" r="4.5" className="stroke-zinc-200 fill-zinc-950 stroke-[2]" />
          
          {/* Leg Muscle contraction glow underneath bone */}
          <motion.path
            d="M 40 67 L 54 53 L 64 43"
            animate={{
              d: [
                "M 40 67 L 46 51 L 50 39", // Flexed
                "M 40 67 L 56 61 L 70 55", // Extension
                "M 40 67 L 46 51 L 50 39"
              ],
              strokeWidth: [1, 5, 8, 5, 1],
              stroke: ["rgba(163,230,53,0.1)", "rgba(163,230,53,0.5)", "rgba(163,230,53,0.95)", "rgba(163,230,53,0.5)", "rgba(163,230,53,0.1)"]
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="fill-none"
          />

          {/* Double linkage leg bones */}
          {/* Hip is at (40, 67) */}
          <motion.path
            d="M 40 67 L 54 53 L 64 43"
            animate={{
              d: [
                "M 40 67 L 46 51 L 50 39", // Fully flexed load (concentric starting)
                "M 40 67 L 56 61 L 70 55", // Leg lockout push
                "M 40 67 L 46 51 L 50 39"  // Restored
              ]
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-lime-400 stroke-[3]"
          />

          {/* Sled platform and weights sliding along track */}
          <motion.g
            animate={{
              x: [0, 20, 0],
              y: [0, 16, 0]
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Foot plate carriage */}
            <path d="M 44 32 L 56 44" className="stroke-zinc-500 stroke-[3.5]" />
            {/* Sliding weights */}
            <rect x="49" y="31" width="6" height="7" rx="1" className="fill-zinc-700 stroke-zinc-600" />
            <rect x="46" y="28" width="12" height="3" rx="0.5" className="fill-zinc-800 stroke-zinc-600" />
          </motion.g>

          {/* Hip Joint pivot */}
          <circle cx="40" cy="67" r="2.5" className="fill-zinc-950 stroke-zinc-500" />
          
          {/* Knees matching the animation path */}
          <motion.circle
            cx="46" cy="51"
            animate={{
              cx: [46, 56, 46],
              cy: [51, 61, 51]
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="fill-zinc-950 stroke-lime-400 stroke-[1.5]"
            r="2.5"
          />

          {/* Ankle joint */}
          <motion.circle
            cx="50" cy="39"
            animate={{
              cx: [50, 70, 50],
              cy: [39, 55, 39]
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="fill-zinc-950 stroke-lime-400 stroke-[1.5]"
            r="2"
          />
        </g>
      ) : type === 'leg-extension' ? (
        <g>
          {/* Seated hydraulic gym bench structure */}
          <path d="M 34 56 L 62 56 L 62 82" className="stroke-zinc-800 stroke-[3]" />
          <path d="M 41 56 L 41 28" className="stroke-zinc-800 stroke-[2.5]" />
          
          {/* Sitting Torso */}
          <path d="M 42 54 L 42 30" className="stroke-zinc-400 stroke-[2.5]" />
          {/* Head looking forward */}
          <circle cx="42" cy="23" r="5" className="stroke-zinc-300 fill-zinc-950 stroke-[2]" />
          {/* Thigh (neutral flat) */}
          <path d="M 42 54 L 62 54" className="stroke-zinc-400 stroke-[3]" />

          {/* Target core Quadricep muscle swelling above thigh bone */}
          <motion.path
            d="M 42 54 Q 52 54 62 54"
            animate={{
              d: [
                "M 42 54 Q 52 54 62 54", // Sitting relaxed
                "M 42 54 Q 52 48 62 54", // Pulling up
                "M 42 54 Q 52 44 62 54", // Lockout peak quad hump!
                "M 42 54 Q 52 48 62 54", // Slowly lowering
                "M 42 54 Q 52 54 62 54"
              ],
              strokeWidth: [1, 4, 8, 4, 1],
              stroke: ["rgba(163,230,53,0.1)", "rgba(163,230,53,0.45)", "rgba(163,230,53,0.95)", "rgba(163,230,53,0.45)", "rgba(163,230,53,0.1)"]
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="fill-none"
          />

          {/* Rotating swinging leg bone */}
          <motion.g
            animate={{ rotate: [0, -42, -85, -42, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "62px", originY: "54px" }}
          >
            {/* Shin bone */}
            <path d="M 62 54 L 62 76" className="stroke-lime-400 stroke-[3]" />
            {/* Ankle roller cushioning */}
            <circle cx="62" cy="72" r="3.5" className="fill-zinc-600 stroke-zinc-500" />
            <path d="M 58 72 L 66 72" className="stroke-zinc-400 stroke-[1.5]" />
            {/* Foot vector */}
            <path d="M 62 76 L 68 76" className="stroke-zinc-300 stroke-[1.5]" />
          </motion.g>

          {/* Pivot knee joint */}
          <circle cx="62" cy="54" r="2.5" className="fill-zinc-950 stroke-lime-400 stroke-[1.5]" />
          <circle cx="42" cy="54" r="2.5" className="fill-zinc-500" />
        </g>
      ) : type === 'chest-bench' ? (
        <g>
          {/* Gym bench support structure */}
          <path d="M 12 70 L 88 70" className="stroke-zinc-800 stroke-[3]" />
          <path d="M 22 70 L 22 88 M 78 70 L 78 88" className="stroke-zinc-850" />
          
          {/* Lying down profile */}
          {/* Spine on flat bench */}
          <path d="M 32 66 L 68 66" className="stroke-zinc-500 stroke-[3]" />
          {/* Hips and resting leg */}
          <path d="M 68 66 L 76 75 L 76 88" className="stroke-zinc-500 stroke-[2]" />
          <circle cx="68" cy="66" r="2" className="fill-zinc-600" />
          {/* Head on bench */}
          <circle cx="26" cy="65" r="5" className="stroke-zinc-300 fill-zinc-950 stroke-[2]" />

          {/* Active Chest muscle swelling */}
          <motion.ellipse
            cx="44" cy="63" rx="5" ry="3.5"
            animate={{
              scale: [1, 1.4, 1.8, 1.4, 1],
              fill: ["rgba(163,230,53,0.0)", "rgba(163,230,53,0.4)", "rgba(163,230,53,0.9)", "rgba(163,230,53,0.4)", "rgba(163,230,53,0.0)"]
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-lime-400 stroke-0"
          />

          {/* Double jointed shoulders to arms pressing */}
          <motion.g
            animate={{
              y: [0, -11, -22, -11, 0]
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Barbell shaft moving up and down */}
            <path d="M 16 46 L 72 46" className="stroke-zinc-400 stroke-[1.5]" />
            {/* Dynamic load plates */}
            <rect x="11" y="38" width="5" height="16" rx="1.5" className="fill-zinc-700 stroke-zinc-650" />
            <rect x="72" y="38" width="5" height="16" rx="1.5" className="fill-zinc-700 stroke-zinc-650" />
          </motion.g>

          {/* Double arm linkages holding barbell */}
          <motion.path
            d="M 38 66 L 49 55 L 43 46"
            animate={{
              d: [
                "M 38 66 L 49 57 L 43 46", // Low barbell (on chest stretch)
                "M 38 66 L 45 44 L 43 35", // Concentric active
                "M 38 66 L 41 33 L 43 24", // Tricep lock high barbell
                "M 38 66 L 45 44 L 43 35", // Eccentrics control
                "M 38 66 L 49 57 L 43 46"
              ]
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-lime-400 stroke-[2.5]"
          />

          {/* Shoulder pivot (stationary on bench) */}
          <circle cx="38" cy="66" r="2.5" className="fill-zinc-950 stroke-zinc-400 stroke-[1.5]" />

          {/* Elbow Joint tracker */}
          <motion.circle
            cx="49" cy="57"
            animate={{
              cx: [49, 45, 41, 45, 49],
              cy: [57, 44, 33, 44, 57]
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="fill-zinc-950 stroke-lime-400 stroke-[1.5]"
            r="2"
          />

          {/* Wrist holding barbell tracking */}
          <motion.circle
            cx="43" cy="46"
            animate={{
              cy: [46, 35, 24, 35, 46]
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="fill-zinc-100 stroke-zinc-800"
            r="2"
          />
        </g>
      ) : type === 'back-pull' ? (
        <g>
          {/* Pulley column vertical track */}
          <path d="M 68 12 L 68 85 M 30 79 L 60 79" className="stroke-zinc-800 stroke-[2]" />
          
          {/* Seated back torso */}
          <path d="M 45 79 L 45 48" className="stroke-zinc-400 stroke-[3]" />
          <path d="M 45 79 L 36 88" className="stroke-zinc-500 stroke-[2]" />
          {/* Head looking forward */}
          <circle cx="45" cy="40" r="5" className="stroke-zinc-200 fill-zinc-950 stroke-[2]" />

          {/* Active Lat muscle wings flaring outwards */}
          <motion.path
            d="M 44 51 Q 40 60 45 70"
            animate={{
              d: [
                "M 44 51 Q 40 60 45 70", // Reach stretched
                "M 44 51 Q 35 60 45 70", // Pull flaring
                "M 44 51 Q 31 60 45 70", // Peak retraction squeeze!
                "M 44 51 Q 35 60 45 70", // Releasing
                "M 44 51 Q 40 60 45 70"
              ],
              strokeWidth: [1, 4, 8, 4, 1],
              stroke: ["rgba(163,230,53,0.1)", "rgba(163,230,53,0.45)", "rgba(163,230,53,0.95)", "rgba(163,230,53,0.45)", "rgba(163,230,53,0.1)"]
            }}
            transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut" }}
            className="fill-none"
          />

          {/* High pulley cable wire path from top roller to wrist */}
          <circle cx="68" cy="14" r="3" className="fill-zinc-800 stroke-zinc-500" />
          <motion.path
            d="M 68 14 L 62 20"
            animate={{
              d: [
                "M 68 14 L 62 20", // Top extended
                "M 68 14 L 56 42", // Middle
                "M 68 14 L 51 52", // Down-pulled
                "M 68 14 L 56 42",
                "M 68 14 L 62 20"
              ]
            }}
            transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-zinc-550 stroke-[1] stroke-dasharray-[1,1]"
          />

          {/* Pulling bar handle */}
          <motion.g
            animate={{
              x: [0, -11, -11, -11, 0],
              y: [0, 22, 32, 22, 0]
            }}
            transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M 52 20 L 72 20" className="stroke-zinc-300 stroke-[2.5]" />
          </motion.g>

          {/* Double jointed pulling arms */}
          <motion.path
            d="M 45 48 L 54 34 L 62 20"
            animate={{
              d: [
                "M 45 48 L 54 34 L 62 20", // Peak high reach stretch
                "M 45 48 L 48 44 L 56 42", // Concentric midway
                "M 45 48 L 43 56 L 51 52", // Pulled down to collarbone peak row contraction!
                "M 45 48 L 48 44 L 56 42", // Releasing
                "M 45 48 L 54 34 L 62 20"
              ]
            }}
            transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-lime-400 stroke-[2.8]"
          />

          {/* Rotating Joints */}
          <circle cx="45" cy="48" r="2.5" className="fill-zinc-950 stroke-zinc-500 stroke-[1.5]" />
          
          <motion.circle
            cx="54" cy="34"
            animate={{
              cx: [54, 48, 43, 48, 54],
              cy: [34, 44, 56, 44, 34]
            }}
            transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut" }}
            className="fill-zinc-950 stroke-lime-400 stroke-[1.5]"
            r="2"
          />

          <motion.circle
            cx="62" cy="20"
            animate={{
              cx: [62, 56, 51, 56, 62],
              cy: [20, 42, 52, 42, 20]
            }}
            transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut" }}
            className="fill-zinc-50 stroke-lime-400 stroke-[1.5]"
            r="1.5"
          />
        </g>
      ) : type === 'shoulders' ? (
        <g>
          {/* Seat details */}
          <path d="M 33 80 L 67 80 M 50 80 L 50 48" className="stroke-zinc-800 stroke-[2]" />
          
          {/* Torso straight erect */}
          <path d="M 50 78 L 50 48" className="stroke-zinc-400 stroke-[2.5]" />
          <circle cx="50" cy="41" r="5" className="stroke-zinc-300 fill-zinc-950 stroke-[2]" />

          {/* Active shoulder deltoids glow on both sides */}
          <motion.ellipse
            cx="44.5" cy="48" rx="3.5" ry="3"
            animate={{
              scale: [1, 1.35, 1.7, 1.35, 1],
              fill: ["rgba(163,230,53,0.0)", "rgba(163,230,53,0.4)", "rgba(163,230,53,0.95)", "rgba(163,230,53,0.4)", "rgba(163,230,53,0.0)"]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-lime-400 stroke-0"
          />
          <motion.ellipse
            cx="55.5" cy="48" rx="3.5" ry="3"
            animate={{
              scale: [1, 1.35, 1.7, 1.35, 1],
              fill: ["rgba(163,230,53,0.0)", "rgba(163,230,53,0.4)", "rgba(163,230,53,0.95)", "rgba(163,230,53,0.4)", "rgba(163,230,53,0.0)"]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-lime-400 stroke-0"
          />

          {/* Overhead weights path guide */}
          <path d="M 32 18 L 32 50 M 68 18 L 68 50" className="stroke-zinc-900/30 stroke-[1.5] stroke-dasharray-[2,2]" />

          {/* Dumbbells pushing vertically */}
          <motion.g
            animate={{
              y: [0, -14, -28, -14, 0]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Dumbbells */}
            <circle cx="32" cy="46" r="3" className="fill-zinc-650 stroke-zinc-500" />
            <path d="M 28 46 L 36 46" className="stroke-zinc-350 stroke-[1.5]" />
            
            <circle cx="68" cy="46" r="3" className="fill-zinc-650 stroke-zinc-500" />
            <path d="M 64 46 L 72 46" className="stroke-zinc-350 stroke-[1.5]" />
          </motion.g>

          {/* Dual jointed arms (Left) */}
          <motion.path
            d="M 47 48 L 37 54 L 32 46"
            animate={{
              d: [
                "M 47 48 L 37 54 L 32 46", // Lower load on delts
                "M 47 48 L 38 38 L 32 32", // Active drive
                "M 47 48 L 41 26 L 32 18", // Overhead lockout top squeeze!
                "M 47 48 L 38 38 L 32 32", // Controlled descent
                "M 47 48 L 37 54 L 32 46"
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-lime-400 stroke-[2.2]"
          />

          {/* Dual jointed arms (Right) */}
          <motion.path
            d="M 53 48 L 63 54 L 68 46"
            animate={{
              d: [
                "M 53 48 L 63 54 L 68 46",
                "M 53 48 L 62 38 L 68 32",
                "M 53 48 L 59 26 L 68 18",
                "M 53 48 L 62 38 L 68 32",
                "M 53 48 L 63 54 L 68 46"
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-lime-400 stroke-[2.2]"
          />

          {/* Fixed Shoulder joint pivots on body frame */}
          <circle cx="47" cy="48" r="2" className="fill-zinc-950 stroke-zinc-500" />
          <circle cx="53" cy="48" r="2" className="fill-zinc-950 stroke-zinc-500" />
          
          {/* Active tracking elbow points */}
          <motion.circle
            cx="37" cy="54"
            animate={{
              cx: [37, 38, 41, 38, 37],
              cy: [54, 38, 26, 38, 54]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="fill-zinc-950 stroke-lime-400 stroke-[1.2]"
            r="1.8"
          />
          <motion.circle
            cx="63" cy="54"
            animate={{
              cx: [63, 62, 59, 62, 63],
              cy: [54, 38, 26, 38, 54]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="fill-zinc-950 stroke-lime-400 stroke-[1.2]"
            r="1.8"
          />
        </g>
      ) : type === 'cardio' ? (
        <g>
          {/* Treadmill support chassis details */}
          <path d="M 20 80 L 80 80 M 74 80 L 80 52 L 68 52" className="stroke-zinc-800 stroke-[2]" />
          
          {/* Running Dynamic Human Body Bouncing slightly vertically */}
          <motion.g
            animate={{ y: [-1.8, 1.8, -1.8] }}
            transition={{ duration: 0.42, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Torso spine running posture lean */}
            <path d="M 44 65 L 48 40" className="stroke-zinc-300 stroke-[2.5]" />
            {/* Head looking forward */}
            <circle cx="50" cy="34" r="5" className="stroke-zinc-200 fill-zinc-950 stroke-[2]" />

            {/* Arm swinging set 1 (active foreground) */}
            <motion.path
              d="M 46 44 L 38 52 L 48 57"
              animate={{
                d: [
                  "M 46 44 L 38 52 L 48 57", // Back elbow pull
                  "M 46 44 L 54 48 L 58 56", // Forward reach drive
                  "M 46 44 L 38 52 L 48 57"
                ]
              }}
              transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
              className="stroke-zinc-400 stroke-[2]"
            />
          </motion.g>

          {/* Running Legs Stride cycling 1 (Lime green foreground) */}
          <motion.path
            d="M 44 65 L 38 72 L 31 78"
            animate={{
              d: [
                "M 44 65 L 36 71 L 28 77", // Extension / push-off stride
                "M 44 65 L 44 59 L 55 64", // Knee chamber lift
                "M 44 65 L 53 71 L 62 79", // Landing shock absorption
                "M 44 65 L 36 71 L 28 77"
              ]
            }}
            transition={{ duration: 0.55, repeat: Infinity, ease: "linear" }}
            className="stroke-lime-400 stroke-[3]"
          />

          {/* Running Legs Stride cycling 2 (Muted background - 180 deg out of phase) */}
          <motion.path
            d="M 44 65 L 53 71 L 62 79"
            animate={{
              d: [
                "M 44 65 L 53 71 L 62 79", // Landing
                "M 44 65 L 36 71 L 28 77", // Extension push
                "M 44 65 L 44 59 L 55 64", // Chamber high knee
                "M 44 65 L 53 71 L 62 79"
              ]
            }}
            transition={{ duration: 0.55, repeat: Infinity, ease: "linear" }}
            className="stroke-zinc-700 stroke-[2]"
          />

          {/* Running speed horizontal line particles */}
          <motion.path
            d="M 72 80 L 60 80"
            animate={{ x: [-42, 16] }}
            transition={{ duration: 0.48, repeat: Infinity, ease: "linear" }}
            className="stroke-lime-400/40 stroke-[2] stroke-dasharray-[4,4]"
          />
          <motion.path
            d="M 68 83 L 52 83"
            animate={{ x: [-36, 22] }}
            transition={{ duration: 0.38, repeat: Infinity, ease: "linear" }}
            className="stroke-lime-500/20 stroke-[1] stroke-dasharray-[2,2]"
          />
        </g>
      ) : (
        <g>
          {/* Dynamic Balanced Kinetic Core Breathing Loop */}
          {/* Head */}
          <circle cx="50" cy="28" r="6" className="stroke-zinc-300 fill-zinc-950 stroke-[2]" />
          {/* Spine */}
          <path d="M 50 34 L 50 63" className="stroke-zinc-400 stroke-[2.5]" />
          
          {/* Active core breath loop glowing halos */}
          <motion.path
            d="M 50 49 Q 38 49 50 49"
            animate={{
              d: [
                "M 50 49 Q 50 49 50 49", // Neutral
                "M 50 49 Q 34 49 50 49", // Expand
                "M 50 49 Q 30 49 50 49", // Full oxygen squeeze!
                "M 50 49 Q 34 49 50 49", // Relax
                "M 50 49 Q 50 49 50 49"
              ],
              strokeWidth: [1, 4, 8, 4, 1],
              stroke: ["rgba(163,230,53,0.1)", "rgba(163,230,53,0.45)", "rgba(163,230,53,0.95)", "rgba(163,230,53,0.45)", "rgba(163,230,53,0.1)"]
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="fill-none"
          />

          <motion.ellipse
            cx="50" cy="49" rx="4" ry="4"
            animate={{
              scale: [1, 1.45, 1.9, 1.45, 1],
              fill: ["rgba(163,230,53,0.05)", "rgba(163,230,53,0.3)", "rgba(163,230,53,0.75)", "rgba(163,230,53,0.3)", "rgba(163,230,53,0.05)"]
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="stroke-lime-400 stroke-0"
          />

          {/* Balanced resting limbs */}
          <path d="M 50 41 L 34 48 M 50 41 L 66 48" className="stroke-zinc-500 stroke-[2]" />
          <path d="M 50 63 L 38 84 M 50 63 L 62 84" className="stroke-zinc-500 stroke-[2]" />
          <circle cx="34" cy="48" r="1.5" className="fill-zinc-700" />
          <circle cx="66" cy="48" r="1.5" className="fill-zinc-700" />
        </g>
      )}
    </g>
  );
};

export const MachineAnimation: React.FC<MachineAnimationProps> = ({ machineId, videoUrl }) => {
  const [showVideo, setShowVideo] = React.useState(false);
  
  const id = machineId.toLowerCase();
  
  const getAvatarType = () => {
    if (id.includes('curl') || id.includes('biceps') || id.includes('bicep') || id.includes('martillo') || id.includes('predicador') || id.includes('spider')) {
      return 'biceps';
    }
    if (id.includes('prensa') || id.includes('leg-press') || id.includes('prensa-piernas')) {
      return 'leg-press';
    }
    if (id.includes('extension-piernas') || id.includes('cuadriceps') || id.includes('pantorrillas') || id.includes('talones') || id.includes('extension')) {
      return 'leg-extension';
    }
    if (id.includes('squat') || id.includes('sentadilla') || id.includes('bulgara') || id.includes('zancadas') || id.includes('lunges') || id.includes('goblet') || id.includes('peso-muerto') || id.includes('rdl')) {
      return 'squat';
    }
    if (id.includes('pecho') || id.includes('banca') || id.includes('chest') || id.includes('peck') || id.includes('aperturas') || id.includes('cruces') || id.includes('pullover') || id.includes('flexiones') || id.includes('lagartijas') || id.includes('pushup')) {
      return 'chest-bench';
    }
    if (id.includes('jalon') || id.includes('row') || id.includes('remo') || id.includes('dominadas') || id.includes('pull') || id.includes('dorsal') || id.includes('back') || id.includes('lumbares') || id.includes('lat')) {
      return 'back-pull';
    }
    if (id.includes('hombr') || id.includes('shoulder') || id.includes('militar') || id.includes('laterales') || id.includes('arnold') || id.includes('face-pull') || id.includes('pajaros') || id.includes('neck') || id.includes('deltoide')) {
      return 'shoulders';
    }
    if (id.includes('cardio') || id.includes('treadmill') || id.includes('correr') || id.includes('bike') || id.includes('bicicleta') || id.includes('cycle') || id.includes('eliptica') || id.includes('caminar') || id.includes('walking')) {
      return 'cardio';
    }
    return 'default';
  };

  const avatarType = getAvatarType();

  const getKineticsLabel = () => {
    switch (avatarType) {
      case 'biceps': return 'Bicep_Contraction';
      case 'leg-press': return 'Quads_Pressweight';
      case 'leg-extension': return 'Shin_Extension';
      case 'squat': return 'Closed_Kinetic_Squat';
      case 'chest-bench': return 'Pectoral_Extension';
      case 'back-pull': return 'Latissimus_Retraction';
      case 'shoulders': return 'Overhead_Deltoid_Press';
      case 'cardio': return 'Aerobic_Cadence';
      default: return 'Kinetics_Active';
    }
  };

  const isPress = avatarType === 'chest-bench' || avatarType === 'shoulders' || avatarType === 'leg-press';
  const isPull = avatarType === 'back-pull' || avatarType === 'biceps';

  return (
    <div className="w-full h-full bg-surface rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden group border border-zinc-900">
      
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

      {videoUrl && showVideo ? (
        <div className="absolute inset-0 w-full h-full bg-black z-20">
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoUrl}?rel=0&autoplay=1&mute=1&playlist=${videoUrl}&loop=1`}
            title="Video de técnica"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
            
            {/* Technical Labels */}
            <div className="absolute top-8 left-8 space-y-1">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Análisis Técnico</span>
                </div>
                <div className="text-[9px] font-mono text-zinc-500">REF: {machineId.toUpperCase()}</div>
            </div>
 
            <div className="relative w-full max-w-[280px] h-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    {/* Machine Frame / Context */}
                    {(isPress || isPull) && (
                        <g opacity="0.1">
                           <rect x="20" y="20" width="10" height="70" rx="2" fill="white" />
                           <path d="M25 20 L80 20" stroke="white" strokeDasharray="2 2" />
                        </g>
                    )}

                    {/* Jointed Model */}
                    <TechnicalAvatar type={avatarType} />

                    {/* Vector Lines */}
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="stroke-lime-400/20 stroke-[1] fill-none"
                    >
                        <motion.path 
                            d={avatarType === 'squat' ? "M50 90 L50 20" : isPress ? "M40 40 L90 40" : isPull ? "M40 45 L40 10" : "M50 50 L80 50"} 
                            strokeDasharray="4 2"
                            animate={avatarType === 'squat' ? { y: [0, 20, 0] } : isPress ? { x: [0, 20, 0] } : isPull ? { y: [10, -10, 10] } : { scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </motion.g>

                    {/* Callouts */}
                    <g className="text-[4px] font-mono fill-zinc-600 font-bold uppercase">
                        <text x="10" y="15">rango_máx</text>
                        <text x="80" y="85">alineación</text>
                    </g>
                </svg>

                {/* Live Data Badge Overlay */}
                <div className="absolute bottom-4 right-0 flex flex-col items-end text-right">
                    <div className="bg-lime-400 text-black text-[8px] font-mono px-2 py-0.5 rounded-sm flex items-center gap-1.5 mb-1 font-bold">
                        <span className="w-1 h-1 bg-black rounded-full animate-pulse" />
                        BIO_DYNAMIC_OK
                    </div>
                    <div className="text-[10px] font-bold text-lime-400 tabular-nums uppercase tracking-tighter">
                        {getKineticsLabel()}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Control Overlay */}
      <div className="absolute top-6 right-6 flex gap-2 z-30">
        {videoUrl && (
            <button 
                onClick={() => setShowVideo(!showVideo)}
                className={`px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer ${
                    showVideo 
                    ? 'bg-lime-400 text-black border-lime-400' 
                    : 'bg-zinc-950 text-lime-400 border-zinc-800 hover:border-lime-500/30'
                }`}
            >
                {showVideo ? 'Ver Simulación' : 'Ver Video'}
            </button>
        )}
      </div>

      <div className="absolute bottom-6 left-8 flex items-center gap-3 z-30">
        <div className="flex gap-0.5">
            {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-lime-400/20 rounded-full" />)}
        </div>
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
            {showVideo ? 'VIDEO_REAL' : 'SIMULACIÓN_BIO'}
        </span>
      </div>
    </div>
  );
};
