# 🏛️ The Antigravity UI/UX Masterclass: Designing at $150k+ Agency Standards

Welcome to the **Lumina Library Engineering Guide to High-End Interface Design**. This document provides an exhaustive, practical handbook on how to invoke and apply our specialized frontend design directives—specifically **`@/soft-skill` (High-End Visual Design)** and **`@/minimalist-skill` (Premium Utilitarian Minimalism)**—to elevate ordinary functional interfaces into high-end, tactile, and highly emotional user experiences.

---

## 💎 SECTION 1: Understanding specialized "Skills"

In the Antigravity developer environment, **Skills** represent encapsulated repositories of professional-tier knowledge, design systems, architectural guardrails, and behavioral guidelines. They instruct our agentic AI to override default LLM biases (such as generic cards-inside-cards layouts, standard Inter typography, and default gray borders) in favor of elite, design patterns.

You can explicitly trigger these skills in your prompts by referencing them with special syntax:
* **`@/soft-skill`** (aliases: `high-end-visual-design`, `@/soft-skill`)
* **`@/minimalist-skill`** (aliases: `minimalist-ui`, `@/minimalist-skill`)

---

## 🎨 SECTION 2: Masterclass on `@/soft-skill` (High-End Visual Design)

The primary objective of the **High-End Visual Design** skill is to engineer Awwwards-tier digital experiences that exude **haptic depth, tactile spatial rhythm, and kinetic motion**. It is heavily inspired by modern design houses like Apple, Linear, and Vercel.

### 🚫 The "Absolute Zero" Banned Elements (Anti-Patterns)
If any of these defaults slip into your codebase, the high-end illusion instantly breaks:
* **Banned Fonts:** `Inter`, `Roboto`, `Arial`, `Open Sans`, `Helvetica` (always use premium, geometric, or editorial serifs).
* **Banned Icons:** Thick-stroked standard Lucide or Material Icons. (Instead, use ultra-light, precise 1px/1.5px vector strokes).
* **Banned Borders/Shadows:** Default 1px solid gray borders (`border-stone-200`) or harsh, dark shadows (`shadow-md`).
* **Banned Layouts:** Edge-to-edge sticky navbars glued to the screen top; generic, symmetrical grid columns without macro-whitespace.
* **Banned Motion:** Default `linear` or `ease-in-out` transitions.

---

### 🏛️ The Core Architectural Archetypes

Before writing a single line of CSS or React, `@/soft-skill` evaluates the semantic context and rolls its **Creative Variance Engine** to adopt a specific visual personality:

```mermaid
graph TD
    A[Creative Variance Engine] --> B(Texture Archetypes)
    A --> C(Layout Archetypes)
    
    B --> B1["1. Ethereal Glass (OLED Black + Glassmorphism)"]
    B --> B2["2. Editorial Luxury (Creams + Film-Grain + High-Contrast Serif)"]
    B --> B3["3. Soft Structuralism (Silver-Grey Canvas + Ambient Shadows)"]
    
    C --> C1["1. Asymmetrical Bento (Masonry Grid & Layout Variance)"]
    C --> C2["2. Z-Axis Cascade (Physical Layer Overlaps + Light Rotations)"]
    C --> C3["3. Editorial Split (Bold Type Left + Scrollable Cards Right)"]
```

---

### 🛠️ Key Signature Components & Implementing Code

#### A. The "Double-Bezel" (Doppelrand Container)
Never place cards or containers flatly on a background. They must look like physical, machined hardware panels nested elegantly into a tray.

```jsx
// Premium Doppelrand (Double-Bezel) Card Architecture
const PremiumCard = ({ children }) => {
  return (
    /* Outer Shell: Provides outer margin/padding, structural radius, and deep ambient shadow */
    <div className="bg-stone-900/5 dark:bg-white/5 p-2 rounded-[2rem] ring-1 ring-black/5 dark:ring-white/10 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
      
      {/* Inner Core: Hosts the actual content, custom top-bezel highlight, and mathematical squircle curve alignment */}
      <div className="bg-white dark:bg-stone-950 p-8 rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] border border-stone-200/40 dark:border-stone-800">
        {children}
      </div>
    </div>
  );
};
```

#### B. The "Button-in-Button" trailing icon
Primary CTA buttons should have an isolated, highly interactive circular background enclosing their trailing action vector.

```jsx
// Button-in-Button CTA Pill
const CTAButton = ({ text }) => {
  return (
    <button className="group px-6 py-3 bg-stone-950 text-stone-100 hover:text-white text-xs font-bold rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-4 hover:bg-stone-900 active:scale-[0.98]">
      <span>{text}</span>
      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
        <svg className="w-3.5 h-3.5 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </span>
    </button>
  );
};
```

---

## ☕ SECTION 3: Masterclass on `@/minimalist-skill` (Premium Utilitarian Minimalism)

Where `@/soft-skill` brings cinematic layers and spring-loaded transitions, **`@/minimalist-skill`** introduces the clean, silent, highly disciplined **editorial-style layout** resembling physical print books and professional workspace document design.

### 🚫 Banned Elements (Anti-Patterns)
* NO gradients, neon glows, or translucent glassy overlays.
* NO `rounded-full` (pill shapes) for large cards, tables, or content wrappers.
* NO generic SaaS marketing words ("game-changing", "elevate", "seamless").
* NO heavy drop shadows. Shadows must be completely flat.

### 🎨 The Muted Pastel Palette
In minimalism, color is treated as a scarce resource, utilized only for semantic status badges or very minor text highlights.

| Accent Name | Background HEX | Text HEX | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Pale Red** | `#FDEBEC` | `#9F2F2D` | Alerts, critical states, overdue returns |
| **Pale Blue** | `#E1F3FE` | `#1F6C9F` | Informational chips, metadata markers |
| **Pale Green** | `#EDF3EC` | `#346538` | Success labels, returned books |
| **Pale Yellow** | `#FBF3DB` | `#956400` | Warning tags, pending transactions |

---

### 🛠️ Key Signature Components & Implementing Code

#### A. Flat Bento Cards & Dividers
Grid boxes use highly disciplined `1px solid #EAEAEA` lines, clean body heights, and ultra-crisp radii (`8px` to `12px`).

```jsx
// Bento Card Architecture in Premium Minimalism
const BentoCard = ({ title, category, children }) => {
  return (
    <div className="bg-[#FFFFFF] border border-stone-200 rounded-xl p-8 transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">{category}</span>
        <span className="px-2.5 py-1 text-[9px] font-bold rounded bg-[#EDF3EC] text-[#346538] uppercase tracking-wider">
          Active
        </span>
      </div>
      <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight">{title}</h3>
      <div className="text-stone-600 text-sm leading-relaxed font-sans">{children}</div>
    </div>
  );
};
```

#### B. Keystroke Micro-UIs (`<kbd>`)
To indicate keyboard interaction shortcuts elegantly, use physical `<kbd>` rendering with monospace typefaces.

```jsx
// Minimalist Search Bar with Keyboard Shortcuts
const SearchBar = () => {
  return (
    <div className="relative flex items-center border border-stone-200 rounded-lg bg-stone-50/50 px-4 py-3 w-full max-w-md">
      <input 
        type="text" 
        placeholder="Search books..." 
        className="bg-transparent border-none text-xs text-stone-900 focus:outline-none w-full font-sans" 
      />
      <div className="flex items-center gap-1">
        <kbd className="px-2 py-0.5 border border-stone-200 bg-white rounded text-[9px] font-mono text-stone-400">⌘</kbd>
        <kbd className="px-2 py-0.5 border border-stone-200 bg-white rounded text-[9px] font-mono text-stone-400">K</kbd>
      </div>
    </div>
  );
};
```

---

## ⚡ SECTION 4: How to Invoke and Configure Skills Perfectly

To trigger these systems during collaborative engineering turns, combine the **name of the skill**, a specified **visual density**, and your **layout context**.

### 🌟 Elite Prompting Formulas

#### Example 1: Refactoring with High Visual Density & Soft Design
> `"Refactor the library's User Profile page using @/soft-skill with a VISUAL_DENSITY of 3"`
* **What this outputs:** An extremely elegant, spacious, double-bezel enclosed user dashboard. Layout columns use macro-whitespace (`py-24`), buttons morph with diagonal translation vector icons, and card containers have exaggerated radii (`rounded-[2rem]`) and radial glass glows.

#### Example 2: Flat Bento Editorial Layout
> `"Apply @/minimalist-skill to our dashboard components"`
* **What this outputs:** Flat bento layouts utilizing `#FBFBFA` bone canvas, high typographic contrast using serif headings against geometric system monospaces, ultra-crisp borders (`border-stone-200`), and semantic tags colored in washed-out pastels.

#### Example 3: The Hybrid Premium Layout
> `"Refactor this transaction feed using @/soft-skill for spring-based motions but keep the aesthetics strictly styled under @/minimalist-skill"`
* **What this outputs:** Flat, minimalist white cards with `#EAEAEA` borders and bone canvas. However, on hover, they execute spring-loaded `cubic-bezier(0.32, 0.72, 0, 1)` transitions, lifting gently with highly diffused ambient drop shadows and kinetic vector micro-movements.

---

### 📈 System Contrast Matrix: Which Skill to Choose?

| Metric | `@/soft-skill` | `@/minimalist-skill` | `@/brutalist-skill` |
| :--- | :--- | :--- | :--- |
| **Aesthetic Personality** | Ethereal Glass / Luxury Agency | Editorial Workspace / Clean Print | Swiss Industrial Print / CRT Terminal |
| **Border Radii** | Exaggerated (`rounded-[2.5rem]`) | Crisp (`rounded-xl` / `8px-12px`) | Absolute Zero (Exactly 90° Sharp) |
| **Motion Signature** | Spring-based haptic acceleration | Silent, invisible ease Reveals | Low-refresh, telemetry scan updates |
| **Canvas Palette** | OLED Dark / Rich Creams | `#FFFFFF` White / `#F7F6F3` Bone | `#F4F4F0` Paper / `#0A0A0A` CRT |
| **Color Highlights** | Radial gradients, neon accents | Muted desaturated spot pastels | `#FF2A2A` Aviation/Hazard Red |
| **Ideal For** | Landing pages, interactive dashboards | Settings page, logs, text guides | Technical telemetry feeds, database maps |

---

## 🦾 SECTION 5: Sibling Design System: `@/brutalist-skill` (Industrial Brutalism & Tactical Telemetry)

For highly technical components (like log outputs, database telemetry monitors, or system health grids), we have a third sibling design style: **`@/brutalist-skill` (Industrial Brutalism)**. It merges raw functional mid-century Swiss graphic print with retro-futuristic tactical CRT terminals.

### 🚫 Banned Elements (Anti-Patterns)
* NO rounded corners (`border-radius: 0px` is strictly enforced).
* NO translucent blurs or glass cards.
* NO shadows or multi-color pastel grids.

### 🛠️ Key Signature Components & Implementing Code

#### A. The Blueprint Grid & compartment dividers
We outline distinct grid modules with solid `1px` or `2px` black/white structural ink lines and mark intersections with technical coordinate crosshairs.

```jsx
// Swiss Brutalist Compartment Module
const BrutalistTelemetryCard = ({ unitId, status, data }) => {
  return (
    <div className="bg-[#F4F4F0] border-2 border-[#111111] p-6 font-mono text-[#111111] relative flex flex-col gap-4">
      {/* Structural Crosshair decoration */}
      <span className="absolute -top-3.5 -left-1 text-xs font-bold text-stone-400 font-sans">+</span>
      
      <div className="flex items-center justify-between border-b border-[#111111]/30 pb-2">
        <span className="text-[10px] font-black uppercase tracking-wider">[ MODULE / {unitId} ]</span>
        <span className="px-2 py-0.5 bg-[#FF2A2A] text-white text-[9px] font-black uppercase">
          {status}
        </span>
      </div>
      
      <div className="flex flex-col gap-2 font-mono text-[11px] font-semibold leading-relaxed">
        <p className="tracking-tight">{data}</p>
        <div className="mt-4 text-[9px] text-[#FF2A2A] font-black tracking-widest">
          SYSTEM_VERIFIED // REV_4.0.6
        </div>
      </div>
    </div>
  );
};
```

---

## 🗃️ SECTION 6: The Global Antigravity Skill Registry

In addition to visual frameworks, our ecosystem contains specialized technical and engineering pipelines. Here is your full global registry:

### 1. 🖼️ Visual Refactoring & Styling
* **`@/redesign-skill` (Redesign Existing Projects):** Use this to audit and upscale existing functional code bases to high-end design standards without breaking routing or database features.
* **`ckm:ui-styling` (shadcn/ui styling integration):** Automates the inclusion of accessible Radix UI primitives and shadcn setups under consistent theme profiles.
* **`frontend-design`:** Produces beautiful, high-quality production code from scratch that avoids standard boring AI template patterns.

### 2. 🗂️ Asset Generation & Mocking
* **`brandkit`:** Generates high-end logo systems, brand guideline boards, and product world presentations.
* **`ckm:design`:** Generates SVG icons, social banners, and corporate identity program mockups.
* **`ckm:banner-design`:** Automates banner creations across website heroes, YouTube, X/Twitter, and prints.

### 3. 🔍 Multimodal Reference & Automation
* **`image-to-code`:** An elite pipeline where the AI generates visual design mockups, analyzes structural wireframes, and compiles complete functional frontends matching them perfectly.
* **`git-automator`:** Automatically scans active repository workspace diffs and compiles perfect Conventional Commit messages on behalf of the developer.
* **`full-output-enforcement`:** A truncation-prevention protocol. When writing massive files, this ensures the AI delivers comprehensive, complete code without placeholders or lazy `// rest of code` blocks.

---

## 🎯 SECTION 7: Master Step-by-Step Invocation Guide

Follow this 5-step checklist to achieve flawless visual and operational execution with specialized skills:

```mermaid
graph TD
    S1[Step 1: Choose Your Directives] --> S2[Step 2: Calibrate Density & Canvas]
    S2 --> S3[Step 3: Define Functional Constraints]
    S3 --> S4[Step 4: Request Truncation Protection]
    S4 --> S5[Step 5: Code Audit & Verification]
```

### 1️⃣ Step 1: Choose Your Skill Directives
Explicitly invoke the skill alias inside brackets (`[]`) or as tags (`@`) to trigger specialized instruction folders:
* *For luxury SaaS and kinetic animation:* Use `@/soft-skill`.
* *For clean, documentation-tier bento setups:* Use `@/minimalist-skill`.
* *For high-density logs and terminal screens:* Use `@/brutalist-skill`.

### 2️⃣ Step 2: Calibrate Your Density & Canvas
Explicitly provide a **VISUAL_DENSITY** value (1 to 5 scale, where 1 is compact and 5 is massive macro-whitespace) and declare light/dark preferences:
* *Example prompt:* `"Refactor the User Profile using @/soft-skill with a VISUAL_DENSITY of 3 and Ethereal Glass dark mode textures."`

### 3️⃣ Step 3: Define Functional Constraints
Inform the agent about critical system parameters to protect state integrity:
* State that the database structure, API syncs, and routing layers must remain **fully untouched and intact**.
* *Example prompt:* `"Modernize the cards using @/minimalist-skill without altering the active dynamic state, useEffect endpoints, or API integrations."`

### 4️⃣ Step 4: Request Truncation Protection
To prevent the model from leaving placeholders inside large pages, append the `full-output-enforcement` directive:
* *Example prompt:* `"Provide the complete React page. Keep imports and layout fully intact. Apply full-output-enforcement to deliver complete, unabridged code."`

### 5️⃣ Step 5: Code Audit & Verification
Once the code is generated:
1. Run local builds (`npm run build` or `mvnw compile`) to ensure zero packaging warnings.
2. Confirm there are no banned elements (like Inter/Roboto text classes or transparent color shades like `850`) that break rendering.

---

*This guide was generated by Antigravity in cooperation with Lumina Library to maintain an elite standard of digital craftsmanship across all codebase assets. Maintain documentation integrity at all times.*
