---
layout: page
title: OLED Display AI Flow Channel Generation
description: PPO Reinforcement Learning for susceptor heat exchanger design in CVD manufacturing
img: assets/img/oled_display/fig_learning_progress.png
importance: 3
category: Thermo-fluid devices
year: 2022
---

## Challenge

**OLED display manufacturing** requires precise temperature uniformity during the plasma CVD (Chemical Vapor Deposition) process. The susceptor heat exchanger must maintain uniform temperature across large glass substrates, but traditional design methods rely on engineer experience and repetitive manual analysis.

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="eager" path="assets/img/oled_display/fig_susceptor_system.png" title="Susceptor System" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Susceptor system schematic: Galinstan liquid metal circulation via electromagnetic pump
</div>

---

## Approach: PPO Reinforcement Learning

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="eager" path="assets/img/oled_display/fig_rl_environment.png" title="RL Environment" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Reinforcement learning environment with General, Record, and FDM spaces
</div>

### Flow Channel Optimization
- **PPO algorithm** with discrete action space (up/down/left/right)
- **FDM-based thermal simulation** for fast iteration (100,000+ episodes)
- **4-way symmetry** exploited to minimize computational domain
- **Reward function**: Temperature uniformity improvement

### Electromagnetic Pump Design
- **Helical-type EM pump** for high-pressure Galinstan delivery (10 bar)
- **FEM simulation** using COMSOL for MHD analysis
- Sm₂Co₁₇ permanent magnets with magnetic shielding

---

## Results

### Susceptor Heat Exchanger

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="eager" path="assets/img/oled_display/fig_learning_progress.png" title="Learning Progress" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Flow path evolution during RL training: paths become more complex as learning progresses
</div>

- Achieved **uniform temperature distribution** across susceptor surface
- **Adaptable design** framework for varying panel sizes and process conditions

### Electromagnetic Pump

<div class="row justify-content-center">
    <div class="col-sm-7">
        {% include figure.liquid loading="eager" path="assets/img/oled_display/fig_em_pump_pressure.png" title="EM Pump Results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Helical EM pump analysis: magnetic flux density distribution (left) and pressure distribution achieving 10 bar (right)
</div>

- Validated for **10 bar** discharge pressure at 2 kg/s flow rate
- Average magnetic field intensity: **0.25 T** (max 0.4 T)

---

## Publications

**Peer-reviewed Journal**
- **G. Lee**, T. Kim, Y. Kim, K. Kim, "Design and Analysis of an OLED Display Susceptor System Using Reinforcement Learning," *Korean Journal of Applied Artificial Intelligence*, 2025.

**Conferences**
- **G. Lee**, T. Kim, "Formation of the LCD susceptor heat exchanger path using the deep reinforcement learning," *2nd Applied Artificial Intelligence Conference*, 2023.
- **G. Lee**, Y. Yu, T. Kim, S. Kim, "Formation of a thermofluid temperature equalization flow path using reinforcement learning," *1st Applied Artificial Intelligence Conference*, 2022.

---

## Program

- **G. Lee**, Y. Yu, T. Kim, "Heat exchanger path generation program through reinforcement learning," Republic of Korea – Registration No.: C-2022-149451, 2022.

---

## Research Project

**(2022)** Technical support for the application of artificial intelligence to lower module temperature uniformity on next-generation display manufacturing systems, KAERI.
