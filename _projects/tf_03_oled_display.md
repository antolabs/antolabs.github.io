---
layout: project
title: OLED display AI flow-channel generation
description: Reinforcement learning for temperature uniformity in display-manufacturing susceptors.
img: assets/img/oled_display/fig_learning_progress.png
importance: 3
category: Thermo-fluid devices
year: "2022"
body_class: "project-view"
footer_static: true
card_title: "Flow-channel design for OLED manufacturing"
institution: "KAERI"
project_group: "Thermal-fluid engineering"
summary: "Reinforcement learning for temperature uniformity in display-manufacturing susceptors."
detail_intro: "I designed susceptor flow channels using reinforcement learning and analyzed the liquid-metal circulation system."
detail_summary_label: Design study
detail_summary: "Flow-channel layouts targeting temperature uniformity in a susceptor thermal model."
contribution: "Designed susceptor flow channels using reinforcement learning and analyzed the liquid-metal circulation system."
evidence: "Design & simulation"
outcome: "Generated heat-exchanger flow paths targeting a more uniform susceptor temperature."
---

<div class="project-overview">
  <section class="project-overview-purpose" aria-labelledby="project-purpose">
    <h2 id="project-purpose">Purpose</h2>
    <p>Susceptor heat exchangers in plasma chemical vapor deposition (CVD) manufacturing need to maintain a uniform temperature across large glass substrates. This study investigates flow-channel design as an alternative to repeated manual layout and thermal analysis.</p>
  </section>
  <section class="project-overview-approach" aria-labelledby="project-approach">
    <h2 id="project-approach">Approach</h2>
    <p>Proximal policy optimization (PPO) generates channel layouts evaluated with a finite-difference thermal model. Coupled electromagnetic and flow simulations assess the pump supplying the Galinstan circulation loop.</p>
  </section>
</div>

## Susceptor system

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="eager" path="assets/img/oled_display/fig_susceptor_system.png" zoomable=true alt="Susceptor System" title="Susceptor System" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Susceptor system schematic: Galinstan liquid metal circulation via electromagnetic pump
</div>

## Channel design and liquid-metal circulation

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="lazy" path="assets/img/oled_display/fig_rl_environment.png" zoomable=true alt="RL Environment" title="RL Environment" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Reinforcement learning environment with General, Record, and FDM spaces
</div>

### Flow-channel optimization

- PPO agent with a discrete action space (up, down, left, right)
- Finite-difference thermal model for fast evaluation (more than 100,000 episodes)
- Four-way symmetry to reduce the computational domain
- Reward based on the improvement in temperature uniformity

### Electromagnetic pump design

- Helical-type EM pump to deliver Galinstan at 10 bar
- MHD analysis by finite-element simulation in COMSOL
- Sm₂Co₁₇ permanent magnets with magnetic shielding

## Simulation results

### Susceptor heat exchanger

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/oled_display/fig_learning_progress.png" zoomable=true alt="Learning Progress" title="Learning Progress" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Flow path evolution during RL training: paths become more complex as learning progresses
</div>

- Generated flow-channel layouts targeting a more uniform susceptor temperature in the thermal model
- Investigated reinforcement learning as an alternative to repeated manual channel design

### Electromagnetic pump

<div class="row justify-content-center">
    <div class="col-sm-7">
        {% include figure.liquid loading="lazy" path="assets/img/oled_display/fig_em_pump_pressure.png" zoomable=true alt="EM Pump Results" title="EM Pump Results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Helical EM pump analysis: magnetic flux density distribution (left) and pressure distribution reaching 10 bar (right)
</div>

- Predicted **10 bar** discharge pressure at 2 kg/s flow rate through MHD simulation
- Simulated average magnetic flux density: **0.25 T** (max 0.4 T)

---

## Publications

**Peer-reviewed Journal**

- **G. Lee**, T. Kim, Y. Kim, G. Kim, "Design and Analysis of an OLED Display Susceptor System Using Reinforcement Learning," _Journal of Korean Applied Artificial Intelligence_, 1(2), 1-6, 2025. [DOI](https://doi.org/10.23343/JAAI.2025.1.2.1)

**Conferences**

- **G. Lee**, T. Kim, "Formation of the LCD susceptor heat exchanger path using the deep reinforcement learning," _2nd Applied Artificial Intelligence Conference_, 2023.
- **G. Lee**, Y. Yu, T. Kim, S. Kim, "Formation of a thermofluid temperature equalization flow path using reinforcement learning," _1st Applied Artificial Intelligence Conference_, 2022.

---

## Software registration

- **G. Lee**, Y. Yu, T. Kim, "Heat exchanger path generation program through reinforcement learning," Republic of Korea, Registration No. C-2022-049451, 2022.

---

## Research project

**(2022)** Technical Support for AI-Based Improvement of Temperature Uniformity in Next-Generation Display Manufacturing Systems, KAERI.
