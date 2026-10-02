---
layout: project
title: "Thermal-structural engineering at FRIB"
description: Thermal-structural analysis projects including rotating beam dump, post-target shielding, plasma chamber, and target systems at FRIB
importance: 99
category: Thermo-fluid devices
year: "2024 - 2026"
body_class: "project-view"
footer_static: true
card_title: "Thermal-structural engineering at FRIB"
institution: "FRIB"
project_group: "Thermal-fluid engineering"
summary: "Thermal and structural analysis of beam-intercepting devices, shielding, and target systems."
contribution: "Performed thermal-fluid and structural analyses to support design reviews, operating limits, and device qualification."
evidence: "Engineering analysis & validation"
outcome: "Simulation evidence and experimental comparisons supporting FRIB device design and operation."
---

## Rotating Beam Dump (2024-2026)

<div class="row justify-content-center">
    <div class="col-sm-10">
        {% include figure.liquid loading="eager" path="assets/img/project/tf_other/rotating_beam_dump.png" zoomable=true alt="Rotating Beam Dump Multi-physics Analysis" title="Rotating Beam Dump Multi-physics Analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Rotating beam dump multi-physics analysis: magnetic flux density, coolant pressure, and temperature distribution
</div>

High-power beam interception motivates the study of water-cooled rotating designs. Thermal-structural analysis evaluates heat deposition and stress, alongside electromagnetic effects from nearby dipole magnets.

---

## Post-Target Shielding (2025-2026)

<div class="row justify-content-center">
    <div class="col-sm-10">
        {% include figure.liquid loading="lazy" path="assets/img/project/tf_other/pts_thermal.png" zoomable=true alt="PTS Thermal-Structural Analysis" title="PTS Thermal-Structural Analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Post-target shielding analysis: cooling channel geometry, temperature distribution, and von Mises stress
</div>

As FRIB ramps up power, the post-target shielding (PTS) requires optimized cooling channel design and structural stress analysis due to thermal stresses. The heat distribution calculated from PHITS Monte Carlo simulations was coupled with COMSOL to minimize stress and develop a practical design for field implementation.

---

## Plasma Chamber (2025-2026)

<div class="project-media-grid">
    <div>
        {% include figure.liquid loading="lazy" path="assets/img/project/tf_other/plasmachamber.png" zoomable=true alt="Plasma Chamber Temperature Comparison" title="Plasma Chamber Temperature Comparison" class="img-fluid rounded z-depth-1" %}
        <p class="caption">Plasma-chamber temperature predictions compared between ANSYS and COMSOL.</p>
    </div>
    <figure class="project-demo">
        <video data-project-animation controls muted loop playsinline preload="metadata" width="640" height="480" poster="{{ '/assets/img/project/tf_other/plasma-chamber-fitting-poster.webp' | relative_url }}" aria-label="Plasma chamber interference-fitting thermal analysis" aria-describedby="plasma-fitting-caption">
            <source src="{{ '/assets/video/plasma-chamber-fitting.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support embedded video.
        </video>
        <figcaption class="caption" id="plasma-fitting-caption">Transient temperature during the interference-fitting analysis.</figcaption>
    </figure>
</div>

Thermal and structural analyses in ANSYS and COMSOL were compared to assess RF-power thermal limits. This is a cross-code comparison, distinct from experimental validation. Transient analysis also evaluated the temperature and assembly time needed for interference fitting of the cooling-channel components.

---

## Low-Power Charge Selector (2025-2026)

<div class="project-media-grid">
    <figure class="project-demo">
        <video data-project-animation controls muted loop playsinline preload="metadata" width="640" height="480" poster="{{ '/assets/img/project/tf_other/lpcs-transient-poster.webp' | relative_url }}" aria-label="Low-power charge selector transient thermal analysis" aria-describedby="lpcs-transient-caption">
            <source src="{{ '/assets/video/lpcs-transient.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support embedded video.
        </video>
        <figcaption class="caption" id="lpcs-transient-caption">Predicted transient temperature of the LPCS drift tube.</figcaption>
    </figure>
    <div>
        {% include figure.liquid loading="lazy" path="assets/img/project/tf_other/lpcs_temperature.png" zoomable=true alt="LPCS Temperature Comparison" title="LPCS Temperature Comparison" class="img-fluid rounded z-depth-1" %}
        <p class="caption">Simulated and measured temperatures used to estimate beam energy deposition.</p>
    </div>
</div>

Performed transient and stationary thermal simulations of the Low-Power Charge Selector (LPCS) to determine power limits based on thermal stress. By comparing simulation results with experimental measurements, the beam deposit on the drift tube was predicted.

---

## Target System (2024-2025)

<div class="row justify-content-center">
    <div class="col-sm-10">
        {% include figure.liquid loading="lazy" path="assets/img/project/tf_other/target_door.png" zoomable=true alt="Target System Temperature Distribution" title="Target System Temperature Distribution" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Target system temperature distribution: graphite target (left), target door (middle), and bearing system (right)
</div>

Performed system-level thermal analysis for the graphite-based rotating target, including radiation effects on the target door cooling and flow rate requirements. Simulations and experiments were conducted to evaluate the thermal conductance and operational limits of the bearing system.
